import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { PlacedFurniture } from '../types';

interface ThreeRoomCanvasProps {
  furnitureList: PlacedFurniture[];
  selectedInstanceId: string | null;
  onSelectInstance: (id: string | null) => void;
  lightingPreset: 'daylight' | 'golden_hour' | 'evening';
  roomPreset: string;
  floorType: 'oak' | 'travertine' | 'terrazzo' | 'basalt';
  viewAngle: 'perspective' | 'isometric' | 'topdown';
}

export const ThreeRoomCanvas: React.FC<ThreeRoomCanvasProps> = ({
  furnitureList,
  selectedInstanceId,
  onSelectInstance,
  lightingPreset,
  floorType,
  viewAngle
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const meshesMapRef = useRef<Map<string, THREE.Group>>(new Map());
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const cameraAngleRef = useRef({ theta: Math.PI / 4, phi: Math.PI / 3, radius: 24 });
  const targetLookAtRef = useRef(new THREE.Vector3(0, 1.5, 0));

  // Initialize Three.js Scene
  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(lightingPreset === 'evening' ? 0x181a1b : 0xf6f3ec);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(16, 14, 16);
    camera.lookAt(targetLookAtRef.current);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Build Architectural Room Enclosure
    buildRoomEnclosure(scene, floorType, lightingPreset);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth camera position based on spherical coordinates if not topdown
      if (viewAngle === 'topdown') {
        camera.position.lerp(new THREE.Vector3(0, 26, 0.1), 0.08);
        camera.lookAt(0, 0, 0);
      } else if (viewAngle === 'isometric') {
        const isoPos = new THREE.Vector3(18, 18, 18);
        camera.position.lerp(isoPos, 0.08);
        camera.lookAt(targetLookAtRef.current);
      } else {
        const { theta, phi, radius } = cameraAngleRef.current;
        const x = radius * Math.sin(phi) * Math.sin(theta);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.cos(theta);
        camera.position.lerp(new THREE.Vector3(x, Math.max(y, 2), z), 0.1);
        camera.lookAt(targetLookAtRef.current);
      }

      renderer.render(scene, camera);
    };
    animate();

    // Resize listener
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  // Update room materials & lights when floorType or lightingPreset changes
  useEffect(() => {
    if (!sceneRef.current) return;
    const scene = sceneRef.current;

    // Remove old room elements
    const toRemove: THREE.Object3D[] = [];
    scene.children.forEach((child) => {
      if (child.name.startsWith('room_') || child.name.startsWith('light_')) {
        toRemove.push(child);
      }
    });
    toRemove.forEach((obj) => scene.remove(obj));

    scene.background = new THREE.Color(lightingPreset === 'evening' ? 0x141618 : 0xf6f3ec);
    buildRoomEnclosure(scene, floorType, lightingPreset);
  }, [floorType, lightingPreset]);

  // Update 3D Furniture Objects
  useEffect(() => {
    if (!sceneRef.current) return;
    const scene = sceneRef.current;
    const currentMap = meshesMapRef.current;

    // Clean up instances that no longer exist
    const activeIds = new Set(furnitureList.map((item) => item.instanceId));
    currentMap.forEach((group, id) => {
      if (!activeIds.has(id)) {
        scene.remove(group);
        currentMap.delete(id);
      }
    });

    // Add or update furniture items
    furnitureList.forEach((item) => {
      let group = currentMap.get(item.instanceId);
      if (!group) {
        group = createFurnitureMeshGroup(item);
        scene.add(group);
        currentMap.set(item.instanceId, group);
      }

      // Update position, rotation, scale
      group.position.x = item.x;
      group.position.z = item.z;
      group.rotation.y = (item.rotation * Math.PI) / 180;
      group.scale.set(item.scale, item.scale, item.scale);

      // Highlight selected object
      const isSelected = item.instanceId === selectedInstanceId;
      const boundingBox = group.getObjectByName('selection_box');
      if (boundingBox) {
        boundingBox.visible = isSelected;
      }
    });
  }, [furnitureList, selectedInstanceId]);

  // Mouse & Touch Orbit Handling
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };

    // Raycast to select object
    if (!cameraRef.current || !sceneRef.current || !mountRef.current) return;
    const rect = mountRef.current.getBoundingClientRect();
    const mouse = new THREE.Vector2(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      -((e.clientY - rect.top) / rect.height) * 2 + 1
    );

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, cameraRef.current);

    const interactiveObjects: THREE.Object3D[] = [];
    meshesMapRef.current.forEach((group) => {
      interactiveObjects.push(group);
    });

    const intersects = raycaster.intersectObjects(interactiveObjects, true);
    if (intersects.length > 0) {
      let current: THREE.Object3D | null = intersects[0].object;
      while (current && current.parent && !(current.userData && current.userData.instanceId)) {
        current = current.parent;
      }
      if (current && current.userData && current.userData.instanceId) {
        onSelectInstance(current.userData.instanceId);
        return;
      }
    } else {
      // Clicked on empty floor
      if (e.target === mountRef.current.querySelector('canvas')) {
        onSelectInstance(null);
      }
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    if (viewAngle === 'topdown') return;

    const deltaX = e.clientX - previousMousePositionRef.current.x;
    const deltaY = e.clientY - previousMousePositionRef.current.y;

    cameraAngleRef.current.theta -= deltaX * 0.008;
    cameraAngleRef.current.phi = Math.max(0.2, Math.min(Math.PI / 2 - 0.05, cameraAngleRef.current.phi - deltaY * 0.008));

    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    cameraAngleRef.current.radius = Math.max(8, Math.min(38, cameraAngleRef.current.radius + e.deltaY * 0.02));
  };

  return (
    <div
      ref={mountRef}
      className="w-full h-full relative cursor-grab active:cursor-grabbing select-none overflow-hidden touch-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onWheel={handleWheel}
    />
  );
};

// Helper: Build Room Enclosure (Floors, Baseboards, Plaster Walls, Windows, Lighting)
function buildRoomEnclosure(scene: THREE.Scene, floorType: string, lightingPreset: string) {
  // Floor Material
  let floorColor = 0xc8b69f; // Oak
  let roughness = 0.4;
  let metalness = 0.05;

  if (floorType === 'travertine') {
    floorColor = 0xd9cebe;
    roughness = 0.6;
  } else if (floorType === 'terrazzo') {
    floorColor = 0xe5dfd5;
    roughness = 0.3;
    metalness = 0.1;
  } else if (floorType === 'basalt') {
    floorColor = 0x2e3032;
    roughness = 0.7;
  }

  // Main Floor Plane
  const floorGeo = new THREE.PlaneGeometry(24, 20);
  const floorMat = new THREE.MeshStandardMaterial({
    color: floorColor,
    roughness: roughness,
    metalness: metalness
  });
  const floorMesh = new THREE.Mesh(floorGeo, floorMat);
  floorMesh.rotation.x = -Math.PI / 2;
  floorMesh.receiveShadow = true;
  floorMesh.name = 'room_floor';
  scene.add(floorMesh);

  // Subtle Floor Grid Lines
  const gridHelper = new THREE.GridHelper(24, 24, 0xa45236, 0xd8cbbe);
  gridHelper.position.y = 0.01;
  gridHelper.name = 'room_grid';
  scene.add(gridHelper);

  // Back Wall
  const wallMat = new THREE.MeshStandardMaterial({
    color: lightingPreset === 'evening' ? 0x2a2b2c : 0xf5f1eb,
    roughness: 0.9,
    metalness: 0.02
  });

  const backWall = new THREE.Mesh(new THREE.BoxGeometry(24, 10, 0.4), wallMat);
  backWall.position.set(0, 5, -10);
  backWall.receiveShadow = true;
  backWall.name = 'room_back_wall';
  scene.add(backWall);

  // Left Wall with Window Cutout Effect
  const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.4, 10, 20), wallMat);
  leftWall.position.set(-12, 5, 0);
  leftWall.receiveShadow = true;
  leftWall.name = 'room_left_wall';
  scene.add(leftWall);

  // Architectural Baseboard Moulding
  const baseboardMat = new THREE.MeshStandardMaterial({ color: 0x3d352e, roughness: 0.5 });
  const baseboardBack = new THREE.Mesh(new THREE.BoxGeometry(24, 0.4, 0.1), baseboardMat);
  baseboardBack.position.set(0, 0.2, -9.75);
  baseboardBack.name = 'room_baseboard_1';
  scene.add(baseboardBack);

  const baseboardLeft = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.4, 20), baseboardMat);
  baseboardLeft.position.set(-11.75, 0.2, 0);
  baseboardLeft.name = 'room_baseboard_2';
  scene.add(baseboardLeft);

  // Architectural Artwork on Wall
  const artFrameGeo = new THREE.BoxGeometry(6, 4.5, 0.15);
  const artFrameMat = new THREE.MeshStandardMaterial({ color: 0x1f2421, roughness: 0.4 });
  const artCanvasMat = new THREE.MeshStandardMaterial({ color: 0xe2d6c3, roughness: 0.8 });
  const artMesh = new THREE.Mesh(artFrameGeo, [
    artFrameMat, artFrameMat, artFrameMat, artFrameMat, artCanvasMat, artFrameMat
  ]);
  artMesh.position.set(2, 5.5, -9.75);
  artMesh.name = 'room_art';
  scene.add(artMesh);

  // Lights setup
  const ambientLight = new THREE.AmbientLight(
    lightingPreset === 'golden_hour' ? 0xffe2c4 : lightingPreset === 'evening' ? 0x6a6c75 : 0xffffff,
    lightingPreset === 'evening' ? 0.6 : 0.85
  );
  ambientLight.name = 'light_ambient';
  scene.add(ambientLight);

  const sunLight = new THREE.DirectionalLight(
    lightingPreset === 'golden_hour' ? 0xffa959 : lightingPreset === 'evening' ? 0xd0ab75 : 0xfff4e6,
    lightingPreset === 'evening' ? 0.7 : 1.4
  );
  sunLight.position.set(-16, 20, 12);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.width = 2048;
  sunLight.shadow.mapSize.height = 2048;
  sunLight.shadow.camera.near = 0.5;
  sunLight.shadow.camera.far = 60;
  sunLight.shadow.camera.left = -16;
  sunLight.shadow.camera.right = 16;
  sunLight.shadow.camera.top = 16;
  sunLight.shadow.camera.bottom = -16;
  sunLight.shadow.bias = -0.0005;
  sunLight.name = 'light_sun';
  scene.add(sunLight);

  // Architectural Wall Cove Grazing Light
  const coveLight = new THREE.PointLight(0xffdfba, lightingPreset === 'evening' ? 1.8 : 0.9, 18);
  coveLight.position.set(2, 8.5, -8.5);
  coveLight.name = 'light_cove';
  scene.add(coveLight);
}

// Helper: Procedural 3D Mesh Generator for Luxury Designer Furniture
function createFurnitureMeshGroup(item: PlacedFurniture): THREE.Group {
  const group = new THREE.Group();
  group.userData = { instanceId: item.instanceId, name: item.name };

  let mainMaterial = new THREE.MeshStandardMaterial({
    color: 0xede7de, // Default Bouclé
    roughness: 0.85,
    metalness: 0.05
  });

  // Extract color based on item material
  if (item.selectedMaterial.includes('leather') || item.selectedMaterial.includes('cognac')) {
    mainMaterial = new THREE.MeshStandardMaterial({ color: 0x8f4e2e, roughness: 0.4, metalness: 0.1 });
  } else if (item.selectedMaterial.includes('olive') || item.selectedMaterial.includes('moss')) {
    mainMaterial = new THREE.MeshStandardMaterial({ color: 0x4b5342, roughness: 0.7 });
  } else if (item.selectedMaterial.includes('charcoal') || item.selectedMaterial.includes('black')) {
    mainMaterial = new THREE.MeshStandardMaterial({ color: 0x222426, roughness: 0.6 });
  } else if (item.selectedMaterial.includes('travertine') || item.selectedMaterial.includes('calacatta')) {
    mainMaterial = new THREE.MeshStandardMaterial({ color: 0xd9cfc1, roughness: 0.5, metalness: 0.1 });
  } else if (item.selectedMaterial.includes('walnut') || item.selectedMaterial.includes('oak')) {
    mainMaterial = new THREE.MeshStandardMaterial({ color: 0x5a4332, roughness: 0.5 });
  } else if (item.selectedMaterial.includes('velvet') || item.selectedMaterial.includes('rust')) {
    mainMaterial = new THREE.MeshStandardMaterial({ color: 0xb85d43, roughness: 0.8 });
  }

  // Model-specific procedural geometry
  switch (item.modelType) {
    case 'sofa_curved': {
      // Main curved base
      const baseGeo = new THREE.CylinderGeometry(2.4, 2.6, 0.7, 32, 1, false, 0, Math.PI * 0.75);
      const baseMesh = new THREE.Mesh(baseGeo, mainMaterial);
      baseMesh.position.set(0, 0.35, 0);
      baseMesh.rotation.y = Math.PI * 0.15;
      baseMesh.castShadow = true;
      baseMesh.receiveShadow = true;
      group.add(baseMesh);

      // Backrest
      const backGeo = new THREE.CylinderGeometry(2.2, 2.4, 0.9, 32, 1, false, 0, Math.PI * 0.75);
      const backMesh = new THREE.Mesh(backGeo, mainMaterial);
      backMesh.position.set(0, 0.9, -0.2);
      backMesh.rotation.y = Math.PI * 0.15;
      backMesh.scale.set(0.95, 1, 0.95);
      backMesh.castShadow = true;
      group.add(backMesh);
      break;
    }

    case 'table_travertine': {
      // Monolithic low block
      const topGeo = new THREE.BoxGeometry(2.8, 0.4, 1.8);
      const stoneMat = new THREE.MeshStandardMaterial({ color: 0xd5c3ae, roughness: 0.6, metalness: 0.1 });
      const topMesh = new THREE.Mesh(topGeo, stoneMat);
      topMesh.position.set(0, 0.6, 0);
      topMesh.castShadow = true;
      topMesh.receiveShadow = true;
      group.add(topMesh);

      // Two monolithic legs
      const legGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.6, 24);
      const leg1 = new THREE.Mesh(legGeo, stoneMat);
      leg1.position.set(-0.8, 0.3, 0);
      leg1.castShadow = true;
      group.add(leg1);

      const leg2 = new THREE.Mesh(legGeo, stoneMat);
      leg2.position.set(0.8, 0.3, 0);
      leg2.castShadow = true;
      group.add(leg2);
      break;
    }

    case 'chair_cane': {
      // Wood frame
      const woodMat = new THREE.MeshStandardMaterial({ color: 0x755c46, roughness: 0.5 });
      const frameGeo = new THREE.BoxGeometry(1.2, 0.1, 1.2);
      const seat = new THREE.Mesh(frameGeo, mainMaterial);
      seat.position.set(0, 0.55, 0);
      seat.castShadow = true;
      group.add(seat);

      // Backrest
      const backGeo = new THREE.BoxGeometry(1.1, 0.9, 0.1);
      const back = new THREE.Mesh(backGeo, woodMat);
      back.position.set(0, 1.1, -0.5);
      back.rotation.x = -0.15;
      back.castShadow = true;
      group.add(back);

      // 4 Legs
      const legGeo = new THREE.CylinderGeometry(0.04, 0.03, 0.55, 12);
      const positions = [
        [-0.5, 0.27, -0.5],
        [0.5, 0.27, -0.5],
        [-0.5, 0.27, 0.5],
        [0.5, 0.27, 0.5]
      ];
      positions.forEach(([lx, ly, lz]) => {
        const leg = new THREE.Mesh(legGeo, woodMat);
        leg.position.set(lx, ly, lz);
        leg.castShadow = true;
        group.add(leg);
      });
      break;
    }

    case 'credenza_walnut': {
      // Fluted cabinet
      const cabinetGeo = new THREE.BoxGeometry(3.6, 1.2, 0.9);
      const cabinet = new THREE.Mesh(cabinetGeo, mainMaterial);
      cabinet.position.set(0, 0.9, 0);
      cabinet.castShadow = true;
      cabinet.receiveShadow = true;
      group.add(cabinet);

      // Marble Top Inlay
      const topGeo = new THREE.BoxGeometry(3.65, 0.08, 0.95);
      const marbleMat = new THREE.MeshStandardMaterial({ color: 0xedeae4, roughness: 0.3 });
      const top = new THREE.Mesh(topGeo, marbleMat);
      top.position.set(0, 1.54, 0);
      top.castShadow = true;
      group.add(top);

      // Brass legs
      const brassMat = new THREE.MeshStandardMaterial({ color: 0xc29f62, metalness: 0.8, roughness: 0.2 });
      const legGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.3, 12);
      [[-1.6, 0.15, -0.35], [1.6, 0.15, -0.35], [-1.6, 0.15, 0.35], [1.6, 0.15, 0.35]].forEach(([lx, ly, lz]) => {
        const leg = new THREE.Mesh(legGeo, brassMat);
        leg.position.set(lx, ly, lz);
        group.add(leg);
      });
      break;
    }

    case 'lamp_alabaster': {
      // Brass base
      const brassMat = new THREE.MeshStandardMaterial({ color: 0xc29f62, metalness: 0.85, roughness: 0.25 });
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.38, 0.15, 24), brassMat);
      base.position.set(0, 0.08, 0);
      group.add(base);

      // Glowing Alabaster Cylinder
      const alabasterMat = new THREE.MeshStandardMaterial({
        color: 0xfffaed,
        emissive: 0xffdca8,
        emissiveIntensity: 0.8,
        roughness: 0.3
      });
      const cylinder = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 2.6, 24), alabasterMat);
      cylinder.position.set(0, 1.45, 0);
      cylinder.castShadow = true;
      group.add(cylinder);

      // Point Light from lamp
      const lampLight = new THREE.PointLight(0xffdfa8, 0.9, 8);
      lampLight.position.set(0, 1.8, 0);
      group.add(lampLight);
      break;
    }

    case 'rug_wool': {
      const rugGeo = new THREE.PlaneGeometry(5.2, 4.0);
      const rugMat = new THREE.MeshStandardMaterial({ color: 0xded6c8, roughness: 0.95 });
      const rug = new THREE.Mesh(rugGeo, rugMat);
      rug.rotation.x = -Math.PI / 2;
      rug.position.set(0, 0.02, 0);
      rug.receiveShadow = true;
      group.add(rug);
      break;
    }

    case 'dining_marble': {
      // Oval tabletop
      const topGeo = new THREE.CylinderGeometry(2.2, 2.2, 0.12, 32);
      const marbleMat = new THREE.MeshStandardMaterial({ color: 0xf0ece4, roughness: 0.35, metalness: 0.1 });
      const top = new THREE.Mesh(topGeo, marbleMat);
      top.position.set(0, 1.25, 0);
      top.scale.set(1.4, 1, 0.85);
      top.castShadow = true;
      top.receiveShadow = true;
      group.add(top);

      // Two ribbed pedestals
      const pedestalGeo = new THREE.CylinderGeometry(0.38, 0.45, 1.2, 24);
      const p1 = new THREE.Mesh(pedestalGeo, marbleMat);
      p1.position.set(-1.1, 0.6, 0);
      p1.castShadow = true;
      group.add(p1);

      const p2 = new THREE.Mesh(pedestalGeo, marbleMat);
      p2.position.set(1.1, 0.6, 0);
      p2.castShadow = true;
      group.add(p2);
      break;
    }

    case 'armchair_velvet': {
      // Swivel rounded base
      const seatGeo = new THREE.SphereGeometry(0.9, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.55);
      const seat = new THREE.Mesh(seatGeo, mainMaterial);
      seat.position.set(0, 0.5, 0);
      seat.rotation.x = Math.PI;
      seat.castShadow = true;
      group.add(seat);

      // Backrest cocoon
      const backGeo = new THREE.TorusGeometry(0.65, 0.35, 16, 32, Math.PI * 1.1);
      const back = new THREE.Mesh(backGeo, mainMaterial);
      back.position.set(0, 0.8, -0.1);
      back.rotation.x = Math.PI * 0.5;
      back.castShadow = true;
      group.add(back);
      break;
    }

    default: {
      const defaultGeo = new THREE.BoxGeometry(1.5, 1.0, 1.5);
      const mesh = new THREE.Mesh(defaultGeo, mainMaterial);
      mesh.position.set(0, 0.5, 0);
      mesh.castShadow = true;
      group.add(mesh);
      break;
    }
  }

  // Selection Indicator Wireframe Box
  const boxHelper = new THREE.Box3();
  boxHelper.setFromObject(group);
  const size = new THREE.Vector3();
  boxHelper.getSize(size);
  const center = new THREE.Vector3();
  boxHelper.getCenter(center);

  const wireGeo = new THREE.BoxGeometry(size.x * 1.08, size.y * 1.08, size.z * 1.08);
  const wireMat = new THREE.MeshBasicMaterial({ color: 0xc36b4e, wireframe: true, transparent: true, opacity: 0.8 });
  const wireMesh = new THREE.Mesh(wireGeo, wireMat);
  wireMesh.position.copy(center);
  wireMesh.name = 'selection_box';
  wireMesh.visible = false;
  group.add(wireMesh);

  return group;
}
