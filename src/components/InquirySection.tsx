import React, { useState, useEffect } from 'react';
import {
  Send,
  Calendar as CalendarIcon,
  Upload,
  CheckCircle2,
  MapPin,
  Mail,
  Phone,
  Clock,
  Sparkles,
  ShieldCheck,
  Building,
  ArrowRight,
  ArrowLeft,
  FileText,
  DollarSign,
  User,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { InquiryFormData, PlacedFurniture } from '../types';

interface InquirySectionProps {
  initialLayoutData?: {
    items: PlacedFurniture[];
    roomName: string;
    totalEstimate: number;
  } | null;
  initialServiceTierId?: string | null;
  initialProjectTitle?: string | null;
}

export const InquirySection: React.FC<InquirySectionProps> = ({
  initialLayoutData,
  initialServiceTierId,
  initialProjectTitle
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState<InquiryFormData>({
    scope: initialServiceTierId ? (initialServiceTierId === 'e-design' ? 'e-design' : 'full-renovation') : 'full-renovation',
    propertyType: 'Residential Penthouse / Estate',
    budgetRange: 150000,
    targetTimeline: '3-6 months',
    squareFootage: '3,500 sq ft',
    location: 'New York / Global',
    hasFloorplan: false,
    uploadedFileName: '',
    uploadedFilePreview: '',
    stylePreferences: ['Warm Architectural Minimalism', 'Monolithic Stone & Woodcraft'],
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    notes: initialProjectTitle ? `Inquiring regarding similar aesthetic to: ${initialProjectTitle}` : '',
    selectedDate: '2026-09-02',
    selectedTime: '14:00 (EST)',
    arLayoutIncluded: !!initialLayoutData,
    arItemCount: initialLayoutData?.items.length || 0,
    estimatedTotal: initialLayoutData?.totalEstimate || 0
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync initial layout transfer
  useEffect(() => {
    if (initialLayoutData) {
      setFormData((prev) => ({
        ...prev,
        arLayoutIncluded: true,
        arItemCount: initialLayoutData.items.length,
        estimatedTotal: initialLayoutData.totalEstimate,
        notes: `Transfer from 3D AR Studio: ${initialLayoutData.roomName} with ${initialLayoutData.items.length} curated pieces ($${initialLayoutData.totalEstimate.toLocaleString()} est).`
      }));
    }
  }, [initialLayoutData]);

  // Sync initial project inquiry
  useEffect(() => {
    if (initialProjectTitle) {
      setFormData((prev) => ({
        ...prev,
        notes: `Client interested in replicating design language of case study: "${initialProjectTitle}".`
      }));
    }
  }, [initialProjectTitle]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        hasFloorplan: true,
        uploadedFileName: file.name,
        uploadedFilePreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleToggleStyle = (style: string) => {
    setFormData((prev) => {
      const exists = prev.stylePreferences.includes(style);
      return {
        ...prev,
        stylePreferences: exists
          ? prev.stylePreferences.filter((s) => s !== style)
          : [...prev.stylePreferences, style]
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C36B4E', '#1F2421', '#E5DEC9', '#FFFFFF']
        });
      } catch (err) {
        // Confetti fallback
      }
    }, 1200);
  };

  const ATELIERS = [
    { city: 'New York', address: '482 Broome Street, SoHo', phone: '+1 (212) 840-2910', tz: 'EST (UTC-5)' },
    { city: 'London', address: '14 Berkeley Square, Mayfair', phone: '+44 20 7946 0192', tz: 'GMT (UTC+0)' },
    { city: 'Paris', address: '22 Rue de Turenne, Le Marais', phone: '+33 1 42 68 55 00', tz: 'CET (UTC+1)' },
    { city: 'Tokyo', address: '6-10 Roppongi, Minato-ku', phone: '+81 3 5555 0143', tz: 'JST (UTC+9)' }
  ];

  return (
    <section id="inquiry-section" className="py-24 bg-[#F5F0E8] text-[#1F2421] relative border-t border-[#E5DEC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs uppercase tracking-widest text-[#C36B4E] font-semibold flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Client Intake & Discovery Booking</span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#1F2421]">
            Commence Your Spatial Journey
          </h2>
          <p className="text-sm text-[#6E675F] mt-3 font-light leading-relaxed">
            Our private consultation intake ensures each prospective residence or commercial project receives direct attention from a partner-level interior architect.
          </p>
        </div>

        {/* PRD Specified Split-Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Contact Info, Global Ateliers, Press Links (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Direct Studio Contact Card */}
            <div className="p-8 rounded-3xl bg-[#FAF7F2] border border-[#E0D7C5] shadow-xl space-y-6">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#C36B4E] font-semibold">Direct Atelier Line</span>
                <h3 className="text-2xl font-serif text-[#1F2421] mt-1">Global Client Concierge</h3>
                <p className="text-xs text-[#6E675F] mt-1 font-light">
                  For immediate high-net-worth inquiries or architectural RFP submissions:
                </p>
              </div>

              <div className="space-y-3 text-xs text-[#3E4240]">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#F2ECE1] border border-[#E5DEC9]">
                  <Mail className="w-4 h-4 text-[#C36B4E] flex-shrink-0" />
                  <div>
                    <div className="text-[10px] text-[#8C7A6B] uppercase tracking-wider">Private Inquiries</div>
                    <a href="mailto:concierge@auralivingstudio.com" className="font-medium text-[#1F2421] hover:underline">
                      concierge@auralivingstudio.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#F2ECE1] border border-[#E5DEC9]">
                  <Phone className="w-4 h-4 text-[#C36B4E] flex-shrink-0" />
                  <div>
                    <div className="text-[10px] text-[#8C7A6B] uppercase tracking-wider">Direct Studio Concierge</div>
                    <span className="font-medium text-[#1F2421]">+1 (212) 840-2910</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5DEC9] flex items-center gap-2 text-xs text-[#6E675F]">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>NDA protected • Confidentiality assured</span>
              </div>
            </div>

            {/* Global Design Ateliers */}
            <div className="p-8 rounded-3xl bg-[#FAF7F2] border border-[#E0D7C5] shadow-xl space-y-4">
              <h4 className="text-lg font-serif text-[#1F2421]">Physical Ateliers</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ATELIERS.map((atelier) => (
                  <div key={atelier.city} className="p-3.5 rounded-xl bg-[#F2ECE1] border border-[#E5DEC9] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-medium text-sm text-[#1F2421]">{atelier.city}</span>
                      <span className="text-[9px] font-mono text-[#8C7A6B]">{atelier.tz}</span>
                    </div>
                    <div className="text-[11px] text-[#6E675F] leading-tight flex items-start gap-1">
                      <MapPin className="w-3 h-3 text-[#C36B4E] flex-shrink-0 mt-0.5" />
                      <span>{atelier.address}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Side: Interactive Multi-Step Project Questionnaire (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#FAF7F2] border border-[#E0D7C5] shadow-2xl">
              
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-8">
                  
                  {/* Progress Indicator */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-[#8C7A6B]">
                      <span className="uppercase tracking-widest font-mono">
                        Step {currentStep} of {totalSteps}
                      </span>
                      <span className="font-serif text-[#1F2421] font-medium">
                        {currentStep === 1 && 'Project Scope & Style'}
                        {currentStep === 2 && 'Budget & Timeline'}
                        {currentStep === 3 && 'Spatial Specs & Floorplan'}
                        {currentStep === 4 && 'Contact & Discovery Booking'}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-[#EAE4D5] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#C36B4E] transition-all duration-500 rounded-full"
                        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* STEP 1: Project Scope & Aesthetic Direction */}
                  {currentStep === 1 && (
                    <div className="space-y-6 animate-fade-in">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#8C7A6B] font-semibold mb-2">
                          1. Select Project Scope
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            { id: 'full-renovation', label: 'Turnkey Architectural Renovation', desc: 'Full-service demolition, construction & staging' },
                            { id: 'e-design', label: 'E-Design & AR Spatial Planning', desc: 'Remote 3D layout, trade lists & virtual VR' },
                            { id: 'single-room', label: 'Single-Room Transformation', desc: 'Great room, master suite, or salon overhaul' },
                            { id: 'commercial', label: 'Commercial & Hospitality Flagship', desc: 'Boutique hotel, VIP suite, or executive HQ' }
                          ].map((scope) => (
                            <button
                              key={scope.id}
                              type="button"
                              onClick={() => setFormData({ ...formData, scope: scope.id })}
                              className={`p-4 rounded-2xl border text-left transition-all ${
                                formData.scope === scope.id
                                  ? 'bg-[#F2ECE1] border-[#C36B4E] ring-1 ring-[#C36B4E] text-[#1F2421]'
                                  : 'bg-[#FAF7F2] border-[#E5DEC9] text-[#6E675F] hover:border-[#1F2421]'
                              }`}
                            >
                              <div className="font-serif font-medium text-sm text-[#1F2421]">{scope.label}</div>
                              <div className="text-[11px] text-[#8C7A6B] mt-1">{scope.desc}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#8C7A6B] font-semibold mb-2">
                          2. Aesthetic Tendencies
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {[
                            'Warm Architectural Minimalism',
                            'Monolithic Stone & Woodcraft',
                            'Modern Nordic Heritage',
                            'Japandi Organic Serenity',
                            'Contemporary Parisian Chic',
                            'California Indoor-Outdoor Living'
                          ].map((style) => {
                            const isSelected = formData.stylePreferences.includes(style);
                            return (
                              <button
                                key={style}
                                type="button"
                                onClick={() => handleToggleStyle(style)}
                                className={`px-3.5 py-1.5 rounded-full text-xs transition-all border ${
                                  isSelected
                                    ? 'bg-[#1F2421] text-white border-[#1F2421]'
                                    : 'bg-[#F2ECE1] text-[#6E675F] border-[#E0D7C5] hover:border-[#1F2421]'
                                }`}
                              >
                                {style}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Estimated Budget Range & Target Timeline */}
                  {currentStep === 2 && (
                    <div className="space-y-6 animate-fade-in">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-xs uppercase tracking-wider text-[#8C7A6B] font-semibold">
                            Estimated Project Investment Budget
                          </label>
                          <span className="font-serif text-lg font-bold text-[#C36B4E]">
                            ${formData.budgetRange.toLocaleString()}+
                          </span>
                        </div>
                        
                        {/* Interactive Slider */}
                        <input
                          type="range"
                          min={25000}
                          max={1000000}
                          step={25000}
                          value={formData.budgetRange}
                          onChange={(e) => setFormData({ ...formData, budgetRange: Number(e.target.value) })}
                          className="w-full accent-[#C36B4E] cursor-pointer"
                        />

                        {/* Preset Quick Tiers */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
                          {[
                            { label: '$25k – $75k', val: 50000 },
                            { label: '$75k – $200k', val: 150000 },
                            { label: '$200k – $500k', val: 350000 },
                            { label: '$500k+', val: 750000 }
                          ].map((tier) => (
                            <button
                              key={tier.val}
                              type="button"
                              onClick={() => setFormData({ ...formData, budgetRange: tier.val })}
                              className={`py-2 px-3 rounded-xl text-xs font-mono border transition-all ${
                                formData.budgetRange === tier.val
                                  ? 'bg-[#C36B4E] text-white border-[#C36B4E]'
                                  : 'bg-[#F2ECE1] text-[#6E675F] border-[#E0D7C5] hover:border-[#1F2421]'
                              }`}
                            >
                              {tier.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#8C7A6B] font-semibold mb-2">
                          Target Timeline
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {['Immediate (< 1 mo)', '3 – 6 Months', '6 – 12 Months', 'Flexible / Planning'].map((time) => (
                            <button
                              key={time}
                              type="button"
                              onClick={() => setFormData({ ...formData, targetTimeline: time })}
                              className={`p-3 rounded-xl border text-xs text-center transition-all ${
                                formData.targetTimeline === time
                                  ? 'bg-[#1F2421] text-white border-[#1F2421]'
                                  : 'bg-[#F2ECE1] text-[#6E675F] border-[#E0D7C5] hover:border-[#1F2421]'
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Spatial Dimensions & Floorplan/Inspiration Upload */}
                  {currentStep === 3 && (
                    <div className="space-y-6 animate-fade-in">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-[#8C7A6B] font-semibold mb-1">
                            Approximate Area (Sq Ft / M²)
                          </label>
                          <input
                            type="text"
                            value={formData.squareFootage}
                            onChange={(e) => setFormData({ ...formData, squareFootage: e.target.value })}
                            placeholder="e.g. 4,200 sq ft"
                            className="w-full px-4 py-3 rounded-xl bg-[#F2ECE1] border border-[#E0D7C5] text-xs text-[#1F2421] focus:outline-none focus:border-[#C36B4E]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs uppercase tracking-wider text-[#8C7A6B] font-semibold mb-1">
                            Project Location
                          </label>
                          <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            placeholder="e.g. Tribeca, New York / London"
                            className="w-full px-4 py-3 rounded-xl bg-[#F2ECE1] border border-[#E0D7C5] text-xs text-[#1F2421] focus:outline-none focus:border-[#C36B4E]"
                          />
                        </div>
                      </div>

                      {/* Floorplan Drag & Drop Box */}
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#8C7A6B] font-semibold mb-1">
                          Upload Existing Floorplan, Photos or Inspiration (Optional)
                        </label>
                        <label className="mt-1 flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#D5C9B5] rounded-2xl cursor-pointer hover:border-[#C36B4E] transition-colors bg-[#FAF4EA]">
                          <Upload className="w-8 h-8 text-[#C36B4E] mb-2" />
                          <span className="text-xs font-medium text-[#1F2421]">
                            {formData.uploadedFileName ? formData.uploadedFileName : 'Click to select or drag & drop CAD / PDF / JPG / PNG'}
                          </span>
                          <span className="text-[10px] text-[#8C7A6B] mt-1">Up to 50MB per file • Direct review by architectural partner</span>
                          <input
                            type="file"
                            accept=".pdf,.dwg,.jpg,.jpeg,.png,.heic"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </label>
                      </div>

                      {formData.arLayoutIncluded && (
                        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>AR 3D Layout data included ({formData.arItemCount} pieces)</span>
                          </span>
                          <span className="font-mono font-bold">${formData.estimatedTotal?.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* STEP 4: Client Contact Details & Discovery Call Calendar */}
                  {currentStep === 4 && (
                    <div className="space-y-6 animate-fade-in">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-[#8C7A6B] font-semibold mb-1">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.clientName}
                            onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                            placeholder="e.g. Julian Montgomery"
                            className="w-full px-4 py-3 rounded-xl bg-[#F2ECE1] border border-[#E0D7C5] text-xs text-[#1F2421] focus:outline-none focus:border-[#C36B4E]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs uppercase tracking-wider text-[#8C7A6B] font-semibold mb-1">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.clientEmail}
                            onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                            placeholder="e.g. julian@montgomery.com"
                            className="w-full px-4 py-3 rounded-xl bg-[#F2ECE1] border border-[#E0D7C5] text-xs text-[#1F2421] focus:outline-none focus:border-[#C36B4E]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-[#8C7A6B] font-semibold mb-1">
                            Phone / WhatsApp
                          </label>
                          <input
                            type="tel"
                            value={formData.clientPhone}
                            onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                            placeholder="+1 (555) 019-2834"
                            className="w-full px-4 py-3 rounded-xl bg-[#F2ECE1] border border-[#E0D7C5] text-xs text-[#1F2421] focus:outline-none focus:border-[#C36B4E]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs uppercase tracking-wider text-[#8C7A6B] font-semibold mb-1">
                            Preferred Discovery Call Time
                          </label>
                          <select
                            value={formData.selectedTime}
                            onChange={(e) => setFormData({ ...formData, selectedTime: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-[#F2ECE1] border border-[#E0D7C5] text-xs text-[#1F2421] focus:outline-none focus:border-[#C36B4E]"
                          >
                            <option value="10:00 (EST)">10:00 AM (EST) / 3:00 PM (GMT)</option>
                            <option value="14:00 (EST)">2:00 PM (EST) / 7:00 PM (GMT)</option>
                            <option value="17:00 (EST)">5:00 PM (EST) / 10:00 PM (GMT)</option>
                            <option value="Tokyo Time 10:00">10:00 AM (JST Tokyo)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#8C7A6B] font-semibold mb-1">
                          Project Brief / Special Architectural Requirements
                        </label>
                        <textarea
                          rows={3}
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          placeholder="Tell us about your property, goals, or historical architectural considerations..."
                          className="w-full px-4 py-3 rounded-xl bg-[#F2ECE1] border border-[#E0D7C5] text-xs text-[#1F2421] focus:outline-none focus:border-[#C36B4E]"
                        />
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between pt-6 border-t border-[#E5DEC9]">
                    {currentStep > 1 ? (
                      <button
                        type="button"
                        onClick={() => setCurrentStep((prev) => prev - 1)}
                        className="px-5 py-2.5 rounded-xl bg-[#EAE4D5] text-[#1F2421] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 hover:bg-[#DCD3C0] transition-colors"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Previous Step
                      </button>
                    ) : <div />}

                    {currentStep < totalSteps ? (
                      <button
                        type="button"
                        onClick={() => setCurrentStep((prev) => prev + 1)}
                        className="px-6 py-3 rounded-xl bg-[#1F2421] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 hover:bg-[#343A37] transition-all shadow-md ml-auto"
                      >
                        Next Step
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-3.5 rounded-xl bg-[#C36B4E] hover:bg-[#A45236] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all shadow-xl hover:shadow-2xl ml-auto disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <span>Scheduling Discovery Call...</span>
                        ) : (
                          <>
                            <span>Confirm & Book Consultation</span>
                            <Send className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    )}
                  </div>

                </form>
              ) : (
                /* Celebration & Confirmation Screen */
                <div className="py-8 text-center space-y-6 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#C36B4E] font-semibold">
                      Consultation Confirmed
                    </span>
                    <h3 className="text-3xl font-serif text-[#1F2421] mt-1">
                      Welcome to Aura Living Studio
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6E675F] max-w-md mx-auto mt-2 leading-relaxed font-light">
                      Thank you, <strong className="text-[#1F2421]">{formData.clientName || 'valued client'}</strong>. Your consultation package and calendar invite have been dispatched to <strong className="text-[#1F2421]">{formData.clientEmail || 'your email'}</strong>.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#F2ECE1] border border-[#E0D7C5] text-left max-w-md mx-auto space-y-3 text-xs text-[#4A4F4C]">
                    <div className="flex justify-between border-b border-[#E0D7C5] pb-2">
                      <span className="text-[#8C7A6B]">Discovery Session:</span>
                      <span className="font-semibold text-[#1F2421]">{formData.selectedTime}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#E0D7C5] pb-2">
                      <span className="text-[#8C7A6B]">Scope Package:</span>
                      <span className="font-semibold text-[#1F2421] uppercase font-serif">{formData.scope}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8C7A6B]">Assigned Partner:</span>
                      <span className="font-semibold text-[#C36B4E]">Seraphina Vance (Principal)</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setCurrentStep(1);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-[#1F2421] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#343A37] transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
