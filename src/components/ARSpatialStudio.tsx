import React, { useState, useRef, useEffect } from 'react';
import {
  Maximize2,
  Camera,
  Layers,
  RotateCw,
  Plus,
  Trash2,
  Sliders,
  Sun,
  Moon,
  Sparkles,
  ArrowRight,
  Eye,
  Check,
  AlertCircle,
  Share2,
  Download,
  Info,
  Ruler,
  Compass,
  SquareDashedBottomCode
} from 'lucide-react';
import { AR_FURNITURE_CATALOG, PRESET_ROOM_ENVIRONMENTS } from '../data/arFurnitureData';
import { PlacedFurniture, FurnitureItem } from '../types';
import { ThreeRoomCanvas } from './ThreeRoomCanvas';

interface ARSpatialStudioProps {
  onTransferLayoutToInquiry?: (layoutData: {
    items: PlacedFurniture[];
    roomName: string;
    totalEstimate: number;
  }) => void;
}

export const ARSpatialStudio: React.FC<ARSpatialStudioProps> = ({ onTransferLayoutToInquiry }) => {
  // Mode: 3d-canvas | ar-camera | photo-overlay | 2d-blueprint
  const [studioMode, setStudioMode] = useState<'3d-canvas' | 'ar-camera' | 'photo-overlay' | '2d-blueprint'>('3d-canvas');
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);
  const [lightingPreset, setLightingPreset] = useState<'daylight' | 'golden_hour' | 'evening'>('daylight');
  const [floorType, setFloorType] = useState<'oak' | 'travertine' | 'terrazzo' | 'basalt'>('oak');
  const [viewAngle, setViewAngle] = useState<'perspective' | 'isometric' | 'topdown'>('perspective');

  // Furniture in layout
  const [placedItems, setPlacedItems] = useState<PlacedFurniture[]>([
    {
      instanceId: 'inst-1',
      furnitureId: 'sofa-solstice-boucle',
      name: 'Solstice Sculptural Curved Sofa',
      modelType: 'sofa_curved',
      x: 0,
      z: -1.5,
      rotation: 0,
      scale: 1,
      selectedMaterial: 'boucle-cream',
      price: 8400
    },
    {
      instanceId: 'inst-2',
      furnitureId: 'table-travertine-monolith',
      name: 'Navona Monolith Travertine Table',
      modelType: 'table_travertine',
      x: 0,
      z: 2.2,
      rotation: 0,
      scale: 1,
      selectedMaterial: 'travertine-warm',
      price: 4600
    },
    {
      instanceId: 'inst-3',
      furnitureId: 'chair-arc-lounge',
      name: 'Kyoto Minimalist Cane Lounge Chair',
      modelType: 'chair_cane',
      x: -4.2,
      z: 0.5,
      rotation: 45,
      scale: 1,
      selectedMaterial: 'oak-fumed',
      price: 2850
    },
    {
      instanceId: 'inst-4',
      furnitureId: 'lamp-alabaster-totem',
      name: 'Aura Totem Alabaster Floor Lamp',
      modelType: 'lamp_alabaster',
      x: 4.8,
      z: -4.5,
      rotation: 0,
      scale: 1,
      selectedMaterial: 'alabaster-warm',
      price: 3100
    }
  ]);

  const [selectedInstanceId, setSelectedInstanceId] = useState<string | null>('inst-1');
  const [catalogCategory, setCatalogCategory] = useState<string>('all');
  const [copiedNotification, setCopiedNotification] = useState(false);

  // AR Camera State
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isSnapshotTaken, setIsSnapshotTaken] = useState(false);
  const [snapshotDataUrl, setSnapshotDataUrl] = useState<string | null>(null);

  // Custom Photo Upload State
  const [customPhotoUrl, setCustomPhotoUrl] = useState<string | null>(null);

  const activeRoom = PRESET_ROOM_ENVIRONMENTS[selectedRoomIndex];
  const selectedItem = placedItems.find((i) => i.instanceId === selectedInstanceId);
  const selectedFurnitureDef = selectedItem
    ? AR_FURNITURE_CATALOG.find((f) => f.id === selectedItem.furnitureId)
    : null;

  const totalEstimate = placedItems.reduce((acc, curr) => acc + curr.price, 0);

  // Camera Management for AR Mode
  useEffect(() => {
    let stream: MediaStream | null = null;

    if (studioMode === 'ar-camera') {
      navigator.mediaDevices
        ?.getUserMedia({ video: { facingMode: 'environment' } })
        .then((s) => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
            videoRef.current.play();
          }
          setCameraActive(true);
          setCameraError(null);
        })
        .catch((err) => {
          console.warn('Camera access error or desktop environment:', err);
          setCameraError('Camera access not granted or unavailable. You can use preset spaces or upload a room photo.');
          setCameraActive(false);
        });
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const activeStream = videoRef.current.srcObject as MediaStream;
        activeStream.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
      setCameraActive(false);
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [studioMode]);

  // Actions
  const handleAddItem = (item: FurnitureItem) => {
    const newInstance: PlacedFurniture = {
      instanceId: `inst-${Date.now()}`,
      furnitureId: item.id,
      name: item.name,
      modelType: item.modelType,
      x: (Math.random() - 0.5) * 4,
      z: (Math.random() - 0.5) * 4,
      rotation: 0,
      scale: 1,
      selectedMaterial: item.materials[0]?.preview || 'default',
      price: item.price
    };
    setPlacedItems((prev) => [...prev, newInstance]);
    setSelectedInstanceId(newInstance.instanceId);
  };

  const handleRemoveItem = (id: string) => {
    setPlacedItems((prev) => prev.filter((i) => i.instanceId !== id));
    if (selectedInstanceId === id) {
      setSelectedInstanceId(null);
    }
  };

  const handleRotateSelected = () => {
    if (!selectedInstanceId) return;
    setPlacedItems((prev) =>
      prev.map((i) =>
        i.instanceId === selectedInstanceId ? { ...i, rotation: (i.rotation + 45) % 360 } : i
      )
    );
  };

  const handleUpdateMaterial = (materialPreview: string) => {
    if (!selectedInstanceId) return;
    setPlacedItems((prev) =>
      prev.map((i) =>
        i.instanceId === selectedInstanceId ? { ...i, selectedMaterial: materialPreview } : i
      )
    );
  };

  const handleTakeSnapshot = () => {
    setIsSnapshotTaken(true);
    // Simulate captured snapshot
    setSnapshotDataUrl(activeRoom.bgImage);
    setTimeout(() => setIsSnapshotTaken(false), 3000);
  };

  const handleCustomPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomPhotoUrl(url);
      setStudioMode('photo-overlay');
    }
  };

  const handleTransferToInquiry = () => {
    if (onTransferLayoutToInquiry) {
      onTransferLayoutToInquiry({
        items: placedItems,
        roomName: activeRoom.name,
        totalEstimate
      });
    }
    // Scroll to inquiry section
    const el = document.getElementById('inquiry-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredCatalog =
    catalogCategory === 'all'
      ? AR_FURNITURE_CATALOG
      : AR_FURNITURE_CATALOG.filter((f) => f.category === catalogCategory);

  return (
    <section id="ar-studio" className="relative py-24 bg-[#181A1B] text-[#FAF7F2] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C36B4E]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#A45236]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-white/10 gap-6">
          <div>
            <div className="flex items-center gap-2 text-[#C36B4E] text-xs uppercase tracking-widest font-semibold mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Aura Spatial Intelligence • Phase 3 WebGL & AR</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-white">
              Augmented Reality Spatial Studio
            </h2>
            <p className="text-sm text-[#A8A49D] max-w-2xl mt-2 font-light">
              Experience bespoke furniture proportions, materials, and traffic circulation in real-time 3D or
              projected directly into your physical room through your camera.
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-5 py-3 rounded-lg backdrop-blur-md">
            <div>
              <div className="text-xs text-[#8C8880] uppercase tracking-wider">Spatial Clearance</div>
              <div className="text-sm font-medium text-white flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Optimal Flow (38" min corridor)
              </div>
            </div>
            <div className="w-[1px] h-8 bg-white/10" />
            <div>
              <div className="text-xs text-[#8C8880] uppercase tracking-wider">Curated Pieces</div>
              <div className="text-sm font-medium text-[#C36B4E]">{placedItems.length} Selected</div>
            </div>
          </div>
        </div>

        {/* Studio Main Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Visualizer Stage (Left 8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            
            {/* Top Mode Bar */}
            <div className="bg-[#222527] p-2 rounded-xl border border-white/10 flex flex-wrap items-center justify-between gap-3 shadow-xl">
              
              {/* Studio View Tabs */}
              <div className="flex items-center gap-1 bg-[#181A1B] p-1 rounded-lg border border-white/5">
                <button
                  onClick={() => setStudioMode('3d-canvas')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    studioMode === '3d-canvas'
                      ? 'bg-[#C36B4E] text-white shadow-md'
                      : 'text-[#A8A49D] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  3D Spatial Canvas
                </button>

                <button
                  onClick={() => setStudioMode('ar-camera')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    studioMode === 'ar-camera'
                      ? 'bg-[#C36B4E] text-white shadow-md'
                      : 'text-[#A8A49D] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" />
                  Live Camera AR
                </button>

                <button
                  onClick={() => setStudioMode('photo-overlay')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    studioMode === 'photo-overlay'
                      ? 'bg-[#C36B4E] text-white shadow-md'
                      : 'text-[#A8A49D] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  Room Photo
                </button>

                <button
                  onClick={() => setStudioMode('2d-blueprint')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    studioMode === '2d-blueprint'
                      ? 'bg-[#C36B4E] text-white shadow-md'
                      : 'text-[#A8A49D] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <SquareDashedBottomCode className="w-3.5 h-3.5" />
                  2D Blueprint
                </button>
              </div>

              {/* View Angles (for 3D canvas) */}
              {studioMode === '3d-canvas' && (
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-[#8C8880] text-[11px] uppercase tracking-wider mr-1">Angle:</span>
                  {(['perspective', 'isometric', 'topdown'] as const).map((angle) => (
                    <button
                      key={angle}
                      onClick={() => setViewAngle(angle)}
                      className={`px-2.5 py-1 rounded text-[11px] capitalize transition-all ${
                        viewAngle === angle
                          ? 'bg-white/20 text-white font-medium'
                          : 'text-[#8C8880] hover:text-white'
                      }`}
                    >
                      {angle}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Interactive Viewport Canvas */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-[#0E1011] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              
              {/* MODE 1: 3D WebGL Three.js Canvas */}
              {studioMode === '3d-canvas' && (
                <div className="w-full h-full relative">
                  <ThreeRoomCanvas
                    furnitureList={placedItems}
                    selectedInstanceId={selectedInstanceId}
                    onSelectInstance={setSelectedInstanceId}
                    lightingPreset={lightingPreset}
                    roomPreset={activeRoom.id}
                    floorType={floorType}
                    viewAngle={viewAngle}
                  />

                  {/* 3D Viewport HUD Overlays */}
                  <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 pointer-events-none">
                    <div className="bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs text-white">
                      <div className="font-serif text-sm font-normal text-[#FAF7F2]">{activeRoom.name}</div>
                      <div className="text-[11px] text-[#A8A49D] mt-0.5">{activeRoom.dimensions}</div>
                    </div>
                  </div>

                  {/* Environment & Lighting Controls Overlay */}
                  <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                    {/* Lighting selector */}
                    <div className="bg-black/70 backdrop-blur-md p-1 rounded-lg border border-white/10 flex items-center gap-1">
                      <button
                        onClick={() => setLightingPreset('daylight')}
                        title="Warm Daylight (2700K)"
                        className={`p-1.5 rounded ${lightingPreset === 'daylight' ? 'bg-[#C36B4E] text-white' : 'text-[#8C8880] hover:text-white'}`}
                      >
                        <Sun className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setLightingPreset('golden_hour')}
                        title="Golden Hour Dusk"
                        className={`p-1.5 rounded ${lightingPreset === 'golden_hour' ? 'bg-[#C36B4E] text-white' : 'text-[#8C8880] hover:text-white'}`}
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setLightingPreset('evening')}
                        title="Evening Architectural Cove Ambiance"
                        className={`p-1.5 rounded ${lightingPreset === 'evening' ? 'bg-[#C36B4E] text-white' : 'text-[#8C8880] hover:text-white'}`}
                      >
                        <Moon className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Floor finish selector */}
                    <div className="bg-black/70 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/10 text-xs flex items-center gap-1.5">
                      <span className="text-[#8C8880] text-[10px] uppercase">Floor:</span>
                      <select
                        value={floorType}
                        onChange={(e) => setFloorType(e.target.value as any)}
                        className="bg-transparent text-white text-xs border-none focus:outline-none cursor-pointer"
                      >
                        <option value="oak" className="bg-[#222527] text-white">Chevron Oak</option>
                        <option value="travertine" className="bg-[#222527] text-white">Travertine Slabs</option>
                        <option value="terrazzo" className="bg-[#222527] text-white">Aggregate Terrazzo</option>
                        <option value="basalt" className="bg-[#222527] text-white">Basalt Stone</option>
                      </select>
                    </div>
                  </div>

                  {/* Interaction Instructions Overlay */}
                  <div className="absolute bottom-4 left-4 z-20 pointer-events-none bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/10 text-[11px] text-[#A8A49D]">
                    Click item to select • Drag canvas to orbit • Scroll to zoom
                  </div>
                </div>
              )}

              {/* MODE 2: Live Camera AR Mode */}
              {studioMode === 'ar-camera' && (
                <div className="w-full h-full relative flex items-center justify-center bg-black">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />

                  {/* AR Spatial Grid Overlay */}
                  <div className="absolute inset-0 ar-grid-overlay pointer-events-none opacity-40" />

                  {/* AR Plane Target Reticle */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-48 h-48 border border-dashed border-[#C36B4E]/60 rounded-full animate-pulse flex items-center justify-center">
                      <div className="w-3 h-3 bg-[#C36B4E] rounded-full" />
                    </div>
                  </div>

                  {/* Furniture Pins rendered over camera */}
                  <div className="absolute inset-0 pointer-events-none">
                    {placedItems.map((item, idx) => (
                      <div
                        key={item.instanceId}
                        style={{
                          left: `${45 + (idx % 3) * 18}%`,
                          top: `${40 + Math.floor(idx / 3) * 22}%`
                        }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer group"
                        onClick={() => setSelectedInstanceId(item.instanceId)}
                      >
                        <div
                          className={`px-3 py-1.5 rounded-lg backdrop-blur-md border text-xs flex items-center gap-2 shadow-2xl transition-all ${
                            selectedInstanceId === item.instanceId
                              ? 'bg-[#C36B4E] text-white border-white scale-105'
                              : 'bg-black/75 text-white/90 border-white/20 hover:border-[#C36B4E]'
                          }`}
                        >
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          <span className="font-medium">{item.name}</span>
                          <span className="text-[10px] opacity-75">${item.price.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Camera Error or Fallback Warning */}
                  {cameraError && !cameraActive && (
                    <div className="absolute inset-0 bg-black/85 backdrop-blur-md p-6 flex flex-col items-center justify-center text-center">
                      <AlertCircle className="w-10 h-10 text-[#C36B4E] mb-3" />
                      <h4 className="text-lg font-serif font-medium text-white mb-1">Camera Stream Preview</h4>
                      <p className="text-xs text-[#A8A49D] max-w-md mb-4">{cameraError}</p>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setStudioMode('photo-overlay')}
                          className="px-4 py-2 bg-[#C36B4E] text-white text-xs rounded-lg font-medium hover:bg-[#A45236] transition-colors"
                        >
                          Upload Room Photo
                        </button>
                        <button
                          onClick={() => setStudioMode('3d-canvas')}
                          className="px-4 py-2 bg-white/10 text-white text-xs rounded-lg font-medium hover:bg-white/20 transition-colors"
                        >
                          Switch to 3D Canvas
                        </button>
                      </div>
                    </div>
                  )}

                  {/* AR Shutter & Controls */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30">
                    <button
                      onClick={handleTakeSnapshot}
                      className="px-4 py-2 bg-white text-[#181A1B] text-xs font-semibold rounded-full flex items-center gap-2 shadow-2xl hover:bg-[#FAF7F2] transition-transform active:scale-95"
                    >
                      <Camera className="w-4 h-4 text-[#C36B4E]" />
                      Capture AR Space Snapshot
                    </button>
                  </div>
                </div>
              )}

              {/* MODE 3: Photo Overlay Room */}
              {studioMode === 'photo-overlay' && (
                <div className="w-full h-full relative overflow-hidden flex items-center justify-center bg-black">
                  <img
                    src={customPhotoUrl || activeRoom.bgImage}
                    alt="Room Background"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30" />

                  {/* Interactive Pins over photo */}
                  <div className="absolute inset-0 pointer-events-none">
                    {placedItems.map((item, idx) => (
                      <div
                        key={item.instanceId}
                        style={{
                          left: `${35 + (idx % 3) * 22}%`,
                          top: `${48 + (idx % 2) * 16}%`
                        }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer"
                        onClick={() => setSelectedInstanceId(item.instanceId)}
                      >
                        <div
                          className={`p-2 rounded-xl backdrop-blur-md border text-xs flex items-center gap-2 shadow-2xl transition-all ${
                            selectedInstanceId === item.instanceId
                              ? 'bg-[#C36B4E] text-white border-white scale-110 ring-4 ring-[#C36B4E]/30'
                              : 'bg-black/80 text-white border-white/20 hover:scale-105'
                          }`}
                        >
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          <div className="text-left">
                            <div className="font-serif text-xs font-normal">{item.name}</div>
                            <div className="text-[10px] text-white/70">${item.price.toLocaleString()}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Photo Switcher / Upload Bar */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/70 backdrop-blur-md p-2 rounded-xl border border-white/10 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-[#8C8880] text-[11px] uppercase">Select Space:</span>
                      <div className="flex gap-1">
                        {PRESET_ROOM_ENVIRONMENTS.map((room, idx) => (
                          <button
                            key={room.id}
                            onClick={() => {
                              setSelectedRoomIndex(idx);
                              setCustomPhotoUrl(null);
                            }}
                            className={`px-2.5 py-1 rounded text-[11px] ${
                              selectedRoomIndex === idx && !customPhotoUrl
                                ? 'bg-[#C36B4E] text-white font-medium'
                                : 'text-[#A8A49D] hover:text-white'
                            }`}
                          >
                            {room.type}
                          </button>
                        ))}
                      </div>
                    </div>

                    <label className="cursor-pointer px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-[11px] rounded-lg border border-white/10 transition-colors flex items-center gap-1.5">
                      <Layers className="w-3 h-3 text-[#C36B4E]" />
                      Upload Your Room Photo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCustomPhotoUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              )}

              {/* MODE 4: 2D Architectural Blueprint */}
              {studioMode === '2d-blueprint' && (
                <div className="w-full h-full relative bg-[#121415] p-6 flex flex-col justify-between ar-grid-overlay">
                  {/* Top blueprint header */}
                  <div className="flex justify-between items-start text-xs border-b border-white/10 pb-3">
                    <div>
                      <div className="font-mono text-[#C36B4E] text-[11px] uppercase tracking-wider">
                        ARCHITECTURAL SCHEMATIC // REV 2.4
                      </div>
                      <div className="text-white font-serif text-base mt-0.5">{activeRoom.name}</div>
                    </div>
                    <div className="text-right text-[#A8A49D] text-[11px]">
                      <div>Scale: 1/4" = 1'-0"</div>
                      <div>Total Area: 520 SQ FT</div>
                    </div>
                  </div>

                  {/* 2D Furniture Map Representation */}
                  <div className="relative my-auto w-full max-w-md mx-auto aspect-[4/3] border-2 border-[#C36B4E]/40 rounded bg-white/5 p-4 flex items-center justify-center">
                    {/* Dimension lines */}
                    <div className="absolute -top-4 left-0 right-0 text-center text-[10px] text-[#A8A49D] font-mono border-b border-dashed border-white/20 pb-0.5">
                      ← 26'-0" (7.92m) →
                    </div>
                    <div className="absolute -left-5 top-0 bottom-0 flex items-center text-[10px] text-[#A8A49D] font-mono [writing-mode:vertical-rl] rotate-180 border-r border-dashed border-white/20 pr-0.5">
                      ← 20'-0" (6.10m) →
                    </div>

                    {/* Furniture blocks on blueprint */}
                    {placedItems.map((item, idx) => (
                      <div
                        key={item.instanceId}
                        style={{
                          left: `${30 + (idx % 2) * 35}%`,
                          top: `${25 + Math.floor(idx / 2) * 35}%`,
                          transform: `rotate(${item.rotation}deg)`
                        }}
                        onClick={() => setSelectedInstanceId(item.instanceId)}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded border cursor-pointer transition-all ${
                          selectedInstanceId === item.instanceId
                            ? 'bg-[#C36B4E]/40 border-[#C36B4E] text-white ring-2 ring-[#C36B4E]'
                            : 'bg-white/10 border-white/20 text-[#A8A49D] hover:border-white'
                        }`}
                      >
                        <div className="text-[10px] font-mono font-bold leading-tight">{item.name.split(' ')[0]}</div>
                        <div className="text-[8px] opacity-75 font-mono">CLR: 38"</div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom compliance readout */}
                  <div className="text-[11px] text-[#8C8880] flex justify-between border-t border-white/10 pt-2">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <Check className="w-3.5 h-3.5" /> ADA & Egress Circulation Compliant
                    </span>
                    <span>Zone: Primary Conversation Matrix</span>
                  </div>
                </div>
              )}
            </div>

            {/* Selected Furniture Inspector Bar */}
            {selectedItem && (
              <div className="bg-[#222527] p-4 rounded-xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl animate-fade-in">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/10 bg-[#181A1B] flex-shrink-0">
                    <img
                      src={selectedFurnitureDef?.thumbnail}
                      alt={selectedItem.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif text-white text-base font-normal">{selectedItem.name}</h4>
                      <span className="text-xs px-2 py-0.5 rounded bg-[#C36B4E]/20 text-[#C36B4E] border border-[#C36B4E]/30 font-mono">
                        ${selectedItem.price.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-[#A8A49D] mt-0.5">
                      {selectedFurnitureDef?.dimensions.width}"W × {selectedFurnitureDef?.dimensions.depth}"D × {selectedFurnitureDef?.dimensions.height}"H • {selectedFurnitureDef?.designer}
                    </p>
                  </div>
                </div>

                {/* Controls: Material finishes & Actions */}
                <div className="flex items-center flex-wrap gap-2 w-full sm:w-auto justify-end">
                  {/* Material Swatches */}
                  {selectedFurnitureDef && selectedFurnitureDef.materials.length > 1 && (
                    <div className="flex items-center gap-1.5 bg-[#181A1B] px-2.5 py-1.5 rounded-lg border border-white/10">
                      <span className="text-[10px] text-[#8C8880] uppercase tracking-wider mr-1">Finish:</span>
                      {selectedFurnitureDef.materials.map((mat) => (
                        <button
                          key={mat.preview}
                          onClick={() => handleUpdateMaterial(mat.preview)}
                          title={mat.name}
                          style={{ backgroundColor: mat.hex }}
                          className={`w-4 h-4 rounded-full border transition-transform ${
                            selectedItem.selectedMaterial === mat.preview
                              ? 'scale-125 border-white ring-2 ring-[#C36B4E]'
                              : 'border-white/30 opacity-70 hover:opacity-100'
                          }`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Rotate 45 deg */}
                  <button
                    onClick={handleRotateSelected}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs border border-white/10 transition-colors flex items-center gap-1.5"
                    title="Rotate 45°"
                  >
                    <RotateCw className="w-3.5 h-3.5 text-[#C36B4E]" />
                    <span className="hidden sm:inline">Rotate</span>
                  </button>

                  {/* Delete Item */}
                  <button
                    onClick={() => handleRemoveItem(selectedItem.instanceId)}
                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs border border-red-500/20 transition-colors"
                    title="Remove from Layout"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Side: Catalog & Consultation Bridge (Right 4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            
            {/* Layout Summary & Conversion Card */}
            <div className="bg-[#222527] p-5 rounded-2xl border border-white/10 shadow-2xl flex flex-col gap-4">
              <div className="flex justify-between items-start border-b border-white/10 pb-3">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#C36B4E] font-medium">Bespoke Curation</span>
                  <h3 className="text-xl font-serif text-white mt-0.5">Spatial Layout Summary</h3>
                </div>
                <div className="text-right">
                  <div className="text-xs text-[#8C8880]">Estimated Pieces</div>
                  <div className="text-lg font-serif font-bold text-white">${totalEstimate.toLocaleString()}</div>
                </div>
              </div>

              {/* Items in layout list */}
              <div className="max-h-40 overflow-y-auto pr-1 flex flex-col gap-2">
                {placedItems.map((item) => (
                  <div
                    key={item.instanceId}
                    onClick={() => setSelectedInstanceId(item.instanceId)}
                    className={`flex items-center justify-between p-2 rounded-lg text-xs cursor-pointer transition-all ${
                      selectedInstanceId === item.instanceId
                        ? 'bg-[#C36B4E]/20 border border-[#C36B4E]/40 text-white'
                        : 'bg-[#181A1B] text-[#A8A49D] hover:text-white border border-transparent'
                    }`}
                  >
                    <span className="truncate pr-2">{item.name}</span>
                    <span className="font-mono text-white flex-shrink-0">${item.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              {/* CTA: Inquire with this layout */}
              <button
                onClick={handleTransferToInquiry}
                className="w-full py-3.5 px-4 rounded-xl bg-[#C36B4E] hover:bg-[#A45236] text-white font-medium text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl group"
              >
                <span>Book Consultation with This AR Layout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-[11px] text-[#8C8880] text-center">
                Includes trade discounts, white-glove staging & CAD architectural integration.
              </p>
            </div>

            {/* Designer Furniture Catalog Drawer */}
            <div className="bg-[#222527] p-5 rounded-2xl border border-white/10 shadow-2xl flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h4 className="font-serif text-lg text-white font-normal">Add Designer Pieces</h4>
                <span className="text-xs text-[#8C8880]">{AR_FURNITURE_CATALOG.length} In Archive</span>
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                {(['all', 'sofas', 'tables', 'chairs', 'lighting', 'storage'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCatalogCategory(cat)}
                    className={`px-2.5 py-1 rounded-md text-[11px] capitalize whitespace-nowrap transition-colors ${
                      catalogCategory === cat
                        ? 'bg-white text-[#181A1B] font-semibold'
                        : 'bg-[#181A1B] text-[#A8A49D] hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Furniture Item Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 max-h-80 overflow-y-auto pr-1">
                {filteredCatalog.map((furniture) => (
                  <div
                    key={furniture.id}
                    className="p-2.5 rounded-xl bg-[#181A1B] border border-white/5 hover:border-white/20 transition-all flex items-center justify-between gap-3 group"
                  >
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-black flex-shrink-0">
                      <img
                        src={furniture.thumbnail}
                        alt={furniture.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-serif text-white text-xs truncate">{furniture.name}</h5>
                      <div className="text-[10px] text-[#8C8880] mt-0.5 font-mono">${furniture.price.toLocaleString()}</div>
                    </div>
                    <button
                      onClick={() => handleAddItem(furniture)}
                      className="p-2 rounded-lg bg-[#C36B4E]/20 hover:bg-[#C36B4E] text-[#C36B4E] hover:text-white transition-colors flex items-center justify-center flex-shrink-0"
                      title="Add to Space"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
