 
'use client';

import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Building, Building2, Grid, Landmark, LayoutGrid, Loader, CheckCircle2, ChevronDown, MapPin, UploadCloud, Image as ImageIcon, X, FileText, Edit, CircleCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback,  useEffect } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  useMap,
} from "@vis.gl/react-google-maps";
import {   Undo2, RotateCcw, Edit2,   } from "lucide-react";

// ============================================================
//  TYPES
// ============================================================
type Bank = 'sbi' | 'ubi' | 'canara' | 'pnb' | 'private';
type ValuationType = 'plot' | 'building' | 'flat';
type Section = 'bank' | 'valuation';
type Coord = { lat: number; lng: number };
type Pin = { id: number; coord: Coord };
type Mode = "picking" | "submitted";

const MAX = 4;
const LABELS = ["P1", "P2", "P3", "P4"];
const COLORS = ["#00a0ef", "#10b981", "#f59e0b", "#ef4444"];

// ---- Step 1 state (your existing FormState) ----
interface Step1State {
  inputField:     { dateValuation: string; dateInspection: string; propertyType: string; loanType: string; };
  applicantDetails: { name: string; relationType: string; relationName: string; occupation: string; phone1: string; phone2: string; };
  address:        { plotNo: string; road: string; village: string; district: string; pincode: string; };
  bankDetails:    { ifsc: string; bankName: string; branch: string; email: string; contactPerson: string; };
  siteArea:       { asPerDocument: string; asPerActual: string; siteShape: string; roadAffectedArea: string; };
  plotValuation:  { siteArea: string; glr: string; mv: string; pmr: string; sayValue: string; };
}

// ---- Step 2 state (your existing StepTwoForm state) ----
interface Step2State {
  intendingVendor: {
    name: string; relationType: string; relationName: string; occupation: string;
    phone1: string; phone2: string; plotNo: string; road: string; village: string;
    district: string; pincode: string; realizablePercent: string; realizableValue: string;
    distressPercent: string; distressValue: string;
  };
  propertyDetails: {
    buildingType: string; hNo: string; syNo: string; road: string; village: string;
    municipality: string; district: string; pincode: string; landmark: string;
    latitude: string; longitude: string; images: File[];
    boundaryCoordinates: Coord[]; // <--- ADD THIS LINE
  };
  siteBoundaryDetails: {
    boundariesDoc:    { north: string; south: string; east: string; west: string; };
    boundariesActual: { north: string; south: string; east: string; west: string; };
    dimensionsDoc:    { north: string; south: string; east: string; west: string; };
    dimensionsActual: { north: string; south: string; east: string; west: string; };
  };
}

// ---- Step 3 state — ADD YOUR FIELDS HERE ----
interface Step3State {
    documentUpload: {
      saleDeed: File[];
      buildingPermission: File[];
      layoutCopy: File[];
      legalOpinion: File[];
      propertyTax: File[];
    };
  }

// ---- Step 4 state — ADD YOUR FIELDS HERE ----
interface Step4State {
    siteInspection: {
      reportFiles: File[];
    };
  }
// ---- Step 5 state — ADD YOUR FIELDS HERE ----
interface Step5FormProps {
    step1: Step1State;
    step2: Step2State;
    step3: Step3State;
    step4: Step4State;
    onEditStep: (stepNumber: number) => void;
    isConfirmed: boolean;
    setIsConfirmed: (val: boolean) => void;
  }
 
// ============================================================
//  SHARED STYLES
// ============================================================
const inputStyles = "w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00a0ef] focus:ring-1 focus:ring-[#00a0ef] text-gray-900 bg-white shadow-sm transition-shadow";
const labelStyles = "block text-sm font-medium text-gray-700 mb-1.5";

// ============================================================
//  PROGRESS STEPPER  (shared by all steps)
// ============================================================
function ProgressStepper({ currentStep }: { currentStep: number }) {
    return (
      <div className="px-6 pt-12 pb-6 md:pt-14 md:pb-8 border-b border-gray-200 bg-white">
        <div className="max-w-2xl mx-auto relative">
          <div className="flex items-center justify-between relative">
            
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-gray-200" />
  
            {[1, 2, 3, 4, 5].map((step) => {
              const isCompleted = step < currentStep;
              const isCurrent = step === currentStep;
  
              return (
                <div key={step} className="relative z-10 flex flex-col items-center">
                  <span 
                    className={`absolute -top-7 md:-top-8 whitespace-nowrap text-xs md:text-sm font-semibold tracking-wide ${
                      isCompleted || isCurrent ? 'text-[#00a0ef]' : 'text-gray-400'
                    }`}
                  >
                    STEP {step}
                  </span>
                  
                  <div 
                    className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center bg-white ${
                      isCompleted 
                        ? 'border-2 border-[#00a0ef] bg-[#00a0ef]' 
                        : isCurrent 
                        ? 'border-2 border-[#00a0ef]' 
                        : 'border-2 border-gray-300'
                    }`}
                  >
                    {isCompleted && (
                    //   <svg className="w-4 h-4 md:w-5 md:h-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    //     <polyline points="20 6 9 17 4 12"></polyline>
                    //   </svg>
                    <CircleCheck  color='white' fill='#00a0ef'/>
                    )}
                    {isCurrent && (
                      <div className="w-3 h-3 md:w-4 md:h-4 bg-[#00a0ef] rounded-full" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
// ============================================================
//  BOTTOM ACTION BAR  (shared by all steps)
// ============================================================
function ActionBar({
  currentStep,
  onBack,
  onContinue,
  isLastStep = false,
  isSubmitting = false,
}: {
  currentStep: number;
  onBack: () => void;
  onContinue: () => void;
  isLastStep?: boolean;
  isSubmitting?: boolean;
}) {
  return (
    <div className="p-4 md:px-6 md:py-5 bg-white border-t border-gray-200 flex items-center justify-between mt-auto">
      <button
        onClick={onBack}
        className="flex items-center px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        {currentStep === 1 ? 'Cancel' : 'Back'}
      </button>
      <button
        onClick={onContinue}
        disabled={isSubmitting}
        className="flex items-center px-6 py-2.5 bg-[#00a0ef] hover:bg-[#008bd1] rounded-lg text-white font-medium transition-shadow shadow-sm hover:shadow-md disabled:opacity-60"
      >
        {isSubmitting ? 'Submitting...' : isLastStep ? 'Submit Report' : `Continue to Step ${currentStep + 1}`}
        {!isSubmitting && <ArrowRight className="w-4 h-4 ml-2" />}
      </button>
    </div>
  );
}

// =====================================================
//GeoLocation COmponent
//====================================================== 

  function GeoCoordinatePicker({ onCoordinatesSubmit }: { onCoordinatesSubmit: (coords: Coord[]) => void }) {
  const apiKey =  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

  const [center, setCenter] = useState<Coord>({ lat: 20, lng: 78 });
  const [zoom, setZoom] = useState(4);

  const [mode, setMode] = useState<Mode>("picking");
  const [pins, setPins] = useState<Pin[]>([]);
  const [nextId, setNextId] = useState(0);
  const [submitted, setSubmitted] = useState<Pin[]>([]);
  const [editTarget, setEditTarget] = useState<number | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLoc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCenter(userLoc);
          setZoom(18);
          setPins((prev) => {
            if (prev.length === 0) {
              setNextId(1);
              return [{ id: 0, coord: userLoc }];
            }
            return prev;
          });
        },
        (error) => console.error("Error getting user location:", error),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  const handleMapClick = useCallback(
    (coord: Coord) => {
      if (mode === "picking") {
        if (pins.length >= MAX) return;
        setPins((prev) => [...prev, { id: nextId, coord }]);
        setNextId((n) => n + 1);
        return;
      }
      if (mode === "submitted" && editTarget !== null) {
        setSubmitted((prev) =>
          prev.map((p, i) => (i === editTarget ? { ...p, coord } : p))
        );
        setEditTarget(null);
      }
    },
    [mode, pins.length, nextId, editTarget]
  );

  const handleSubmit = () => {
    if (pins.length < MAX) return;
    setSubmitted([...pins]);
    setMode("submitted");
    setEditTarget(null);
    onCoordinatesSubmit(pins.map(p => p.coord));
  };

  const handleReset = () => {
    setPins([]);
    setSubmitted([]);
    setMode("picking");
    setEditTarget(null);
    setNextId(0);
  };

  const activePins = mode === "picking" ? pins : submitted;

  return (
    <div className="flex flex-col w-full bg-white border border-gray-300 rounded-xl overflow-hidden shadow-sm">
      <header className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#00a0ef]" />
            Location Boundaries
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            {mode === "picking"
              ? `Tap the map · ${pins.length} / ${MAX} points placed`
              : editTarget !== null
              ? `Tap map to move ${LABELS[editTarget]}`
              : "Tap a coordinate card below to adjust it"}
          </p>
        </div>

        <div className="flex gap-2">
          {mode === "picking" && pins.length > 0 && (
            <button
              type="button"
              onClick={() => setPins((p) => p.slice(0, -1))}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              <Undo2 className="w-3.5 h-3.5" />
              Undo
            </button>
          )}
          {mode === "submitted" && (
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          )}
        </div>
      </header>

      <div className="relative w-full h-64 md:h-80 bg-gray-100">
        <APIProvider apiKey={apiKey}>
          <Map
            mapId="geo-picker-form"
            center={center}
            zoom={zoom}
            onCameraChanged={(ev) => {
              setCenter(ev.detail.center);
              setZoom(ev.detail.zoom);
            }}
            gestureHandling="greedy"
            colorScheme="LIGHT"
            // ─── ADDED MAP CONTROLS ───
            mapTypeControl={true}      // Enables Map/Satellite toggle
            zoomControl={true}         // Enables +/- zoom buttons
            fullscreenControl={true}   // Enables fullscreen toggle
            streetViewControl={true}   // Enables street view pegman
            style={{ width: "100%", height: "100%" }}
          >
            <ClickHandler onClick={handleMapClick} />
            {activePins.map((pin, i) => (
              <PinMarker
                key={pin.id}
                index={i}
                coord={pin.coord}
                editing={mode === "submitted"}
                selected={editTarget === i}
                onSelect={() => setEditTarget(editTarget === i ? null : i)}
              />
            ))}
          </Map>
        </APIProvider>

        {mode === "submitted" && editTarget !== null && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-gray-900/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs font-medium flex items-center gap-2 shadow-lg pointer-events-none">
            Tap anywhere to place
            <span
              className="px-1.5 py-0.5 rounded text-[10px] font-bold"
              style={{ backgroundColor: COLORS[editTarget] }}
            >
              {LABELS[editTarget]}
            </span>
          </div>
        )}
      </div>

      <div className="p-4 bg-gray-50 border-t border-gray-200">
        {mode === "picking" ? (
          <div className="flex flex-col gap-3">
            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#00a0ef] transition-all duration-300"
                style={{ width: `${(pins.length / MAX) * 100}%` }}
              />
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={pins.length < MAX}
              className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                pins.length === MAX
                  ? "bg-[#00a0ef] text-white hover:bg-[#008bd1] shadow-sm"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {pins.length === MAX ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Confirm Boundaries
                </>
              ) : (
                `Place ${MAX - pins.length} more point${
                  MAX - pins.length !== 1 ? "s" : ""
                }`
              )}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {submitted.map((pin, i) => (
              <CoordCard
                key={pin.id}
                pin={pin}
                index={i}
                editing
                selected={editTarget === i}
                onSelect={() => setEditTarget(editTarget === i ? null : i)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ClickHandler({ onClick }: { onClick: (c: Coord) => void }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    const listener = map.addListener("click", (e: google.maps.MapMouseEvent) => {
      if (e.latLng) {
        onClick({ lat: e.latLng.lat(), lng: e.latLng.lng() });
      }
    });
    return () => {
      google.maps.event.removeListener(listener);
    };
  }, [map, onClick]);

  return null;
}

function PinMarker({
  index,
  coord,
  editing,
  selected,
  onSelect,
}: {
  index: number;
  coord: Coord;
  editing: boolean;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <AdvancedMarker position={coord} zIndex={selected ? 100 : index}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          if (editing) onSelect();
        }}
        className={`flex items-center justify-center rounded-full font-bold text-white text-xs shadow-md transition-all ${
          selected ? "w-10 h-10 ring-4 ring-white scale-110" : "w-8 h-8 ring-2 ring-white/80 scale-100"
        } ${editing ? "cursor-pointer" : "cursor-default"}`}
        style={{ backgroundColor: COLORS[index] }}
      >
        {LABELS[index]}
      </button>
    </AdvancedMarker>
  );
}

function CoordCard({
  pin,
  index,
  editing,
  selected,
  onSelect,
}: {
  pin: Pin;
  index: number;
  editing: boolean;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={() => editing && onSelect()}
      disabled={!editing}
      className={`flex items-center gap-3 p-2.5 rounded-lg border text-left w-full transition-colors ${
        editing ? "cursor-pointer" : "cursor-default opacity-90"
      } ${
        selected
          ? "border-[#00a0ef] bg-blue-50"
          : "border-gray-200 bg-white hover:border-gray-300"
      }`}
    >
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 shadow-sm"
        style={{ backgroundColor: COLORS[index] }}
      >
        {LABELS[index]}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-0.5">
          {selected ? "Tap map to move" : `Point ${index + 1}`}
        </p>
        <p className="text-xs font-mono text-gray-900 truncate">
          {pin.coord.lat.toFixed(5)}, {pin.coord.lng.toFixed(5)}
        </p>
      </div>
      {editing && (
        <Edit2
          className={`w-4 h-4 shrink-0 ${
            selected ? "text-[#00a0ef]" : "text-gray-400"
          }`}
        />
      )}
    </button>
  );
}

// ============================================================
//  STEP 1 FORM
//  — paste your existing step-1 JSX from NewValuationInit here
// ============================================================
function Step1Form({
  formData,
  setFormData,
}: {
  formData: Step1State;
  setFormData: React.Dispatch<React.SetStateAction<Step1State>>;
}) {
  const [activeSection, setActiveSection] = useState<keyof Step1State>('inputField');

  const handleInputChange = (section: keyof Step1State, field: string, value: string) => {
    setFormData(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
  };

  const checkIsFilled = (section: keyof Step1State) => {
    return Object.values(formData[section]).every(val => val !== '');
  };

  const renderSectionHeader = (title: string, id: keyof Step1State) => {
    const isFilled = checkIsFilled(id);
    return (
      <div
        className={`flex items-center justify-between p-4 md:px-6 md:py-5 cursor-pointer transition-colors ${
          activeSection === id ? 'bg-blue-50/50 border-b border-blue-100' : 'bg-white hover:bg-gray-50 border-b border-gray-100'
        }`}
        onClick={() => setActiveSection(activeSection === id ? null as any : id)}
      >
        <h3 className="font-medium md:text-lg text-[#00a0ef]">{title}</h3>
        {isFilled
          ? <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-[#00a0ef]" />
          : <Loader className={`w-5 h-5 md:w-6 md:h-6 text-[#00a0ef] ${activeSection === id ? '' : 'opacity-70'}`} />
        }
      </div>
    );
  };

  return (
    <div className="bg-white border-y md:border border-gray-200 md:rounded-xl overflow-hidden shadow-sm divide-y divide-gray-100">

      {/* ── Input Field ── */}
      <div>
        {renderSectionHeader('Input Field', 'inputField')}
        {activeSection === 'inputField' && (
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 bg-blue-50/10">
            <div>
              <label className={labelStyles}>Date Valuation</label>
              <input type="date" className={inputStyles} value={formData.inputField.dateValuation}
                onChange={e => handleInputChange('inputField', 'dateValuation', e.target.value)} />
            </div>
            <div>
              <label className={labelStyles}>Date of Inspection</label>
              <input type="date" className={inputStyles} value={formData.inputField.dateInspection}
                onChange={e => handleInputChange('inputField', 'dateInspection', e.target.value)} />
            </div>
            <div>
              <label className={labelStyles}>Type of Property</label>
              <input type="text" placeholder="e.g., Existing Building - Residential" className={inputStyles}
                value={formData.inputField.propertyType}
                onChange={e => handleInputChange('inputField', 'propertyType', e.target.value)} />
            </div>
            <div>
              <label className={labelStyles}>Type of Loan</label>
              <input type="text" placeholder="e.g., Mortgage Loan" className={inputStyles}
                value={formData.inputField.loanType}
                onChange={e => handleInputChange('inputField', 'loanType', e.target.value)} />
            </div>
          </div>
        )}
      </div>

      {/* ── Applicant Details ── */}
      <div>
        {renderSectionHeader('Applicant Details', 'applicantDetails')}
        {activeSection === 'applicantDetails' && (
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 bg-blue-50/10">
            <div className="md:col-span-2">
              <label className={labelStyles}>Enter Name (Smt. / Sri.)</label>
              <input type="text" placeholder="Enter Name" className={inputStyles}
                value={formData.applicantDetails.name}
                onChange={e => handleInputChange('applicantDetails', 'name', e.target.value)} />
            </div>
            <div className="flex gap-3 md:col-span-2">
              <div className="w-1/3 md:w-1/4">
                <label className={labelStyles}>Relation</label>
                <div className="relative">
                  <select className={`${inputStyles} appearance-none`} value={formData.applicantDetails.relationType}
                    onChange={e => handleInputChange('applicantDetails', 'relationType', e.target.value)}>
                    <option value="W/o">W/o</option>
                    <option value="S/o">S/o</option>
                    <option value="D/o">D/o</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>
              <div className="flex-1">
                <label className={labelStyles}>Relative's Name</label>
                <input type="text" placeholder="Name" className={inputStyles}
                  value={formData.applicantDetails.relationName}
                  onChange={e => handleInputChange('applicantDetails', 'relationName', e.target.value)} />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className={labelStyles}>Occupation</label>
              <input type="text" placeholder="Enter Occupation Details" className={inputStyles}
                value={formData.applicantDetails.occupation}
                onChange={e => handleInputChange('applicantDetails', 'occupation', e.target.value)} />
            </div>
            <div>
              <label className={labelStyles}>Phone Number 1</label>
              <input type="tel" placeholder="+91 1234567890" className={inputStyles}
                value={formData.applicantDetails.phone1}
                onChange={e => handleInputChange('applicantDetails', 'phone1', e.target.value)} />
            </div>
            <div>
              <label className={labelStyles}>Phone Number 2</label>
              <input type="tel" placeholder="+91 1234567890" className={inputStyles}
                value={formData.applicantDetails.phone2}
                onChange={e => handleInputChange('applicantDetails', 'phone2', e.target.value)} />
            </div>
          </div>
        )}
      </div>

      {/* ── Address ── */}
      <div>
        {renderSectionHeader('Address of Applicant', 'address')}
        {activeSection === 'address' && (
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 bg-blue-50/10">
            <div><label className={labelStyles}>Plot No. / H.No.</label><input type="text" className={inputStyles} value={formData.address.plotNo} onChange={e => handleInputChange('address', 'plotNo', e.target.value)} /></div>
            <div><label className={labelStyles}>Road / Street / Colony</label><input type="text" className={inputStyles} value={formData.address.road} onChange={e => handleInputChange('address', 'road', e.target.value)} /></div>
            <div><label className={labelStyles}>Village / Mandal / Municipality</label><input type="text" className={inputStyles} value={formData.address.village} onChange={e => handleInputChange('address', 'village', e.target.value)} /></div>
            <div><label className={labelStyles}>District</label><input type="text" className={inputStyles} value={formData.address.district} onChange={e => handleInputChange('address', 'district', e.target.value)} /></div>
            <div><label className={labelStyles}>Pincode</label><input type="text" className={inputStyles} value={formData.address.pincode} onChange={e => handleInputChange('address', 'pincode', e.target.value)} /></div>
          </div>
        )}
      </div>

      {/* ── Bank Details ── */}
      <div>
        {renderSectionHeader('Bank Details', 'bankDetails')}
        {activeSection === 'bankDetails' && (
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 bg-blue-50/10">
            <div><label className={labelStyles}>IFSC Code</label><input type="text" className={inputStyles} value={formData.bankDetails.ifsc} onChange={e => handleInputChange('bankDetails', 'ifsc', e.target.value)} /></div>
            <div><label className={labelStyles}>Bank Name</label><input type="text" className={inputStyles} value={formData.bankDetails.bankName} onChange={e => handleInputChange('bankDetails', 'bankName', e.target.value)} /></div>
            <div><label className={labelStyles}>Branch</label><input type="text" className={inputStyles} value={formData.bankDetails.branch} onChange={e => handleInputChange('bankDetails', 'branch', e.target.value)} /></div>
            <div><label className={labelStyles}>Email ID</label><input type="email" className={inputStyles} value={formData.bankDetails.email} onChange={e => handleInputChange('bankDetails', 'email', e.target.value)} /></div>
            <div className="md:col-span-2"><label className={labelStyles}>Contact Person Details</label><input type="text" className={inputStyles} value={formData.bankDetails.contactPerson} onChange={e => handleInputChange('bankDetails', 'contactPerson', e.target.value)} /></div>
          </div>
        )}
      </div>

      {/* ── Site Area ── */}
      <div>
        {renderSectionHeader('Site Area', 'siteArea')}
        {activeSection === 'siteArea' && (
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 bg-blue-50/10">
            <div><label className={labelStyles}>As per Document (Sq.Yds)</label><input type="number" className={inputStyles} value={formData.siteArea.asPerDocument} onChange={e => handleInputChange('siteArea', 'asPerDocument', e.target.value)} /></div>
            <div><label className={labelStyles}>As per Actual (Sq.Yds)</label><input type="number" className={inputStyles} value={formData.siteArea.asPerActual} onChange={e => handleInputChange('siteArea', 'asPerActual', e.target.value)} /></div>
            <div><label className={labelStyles}>Site Shape</label><input type="text" className={inputStyles} value={formData.siteArea.siteShape} onChange={e => handleInputChange('siteArea', 'siteShape', e.target.value)} /></div>
            <div><label className={labelStyles}>Road Affected Area (Sq.Yds)</label><input type="number" className={inputStyles} value={formData.siteArea.roadAffectedArea} onChange={e => handleInputChange('siteArea', 'roadAffectedArea', e.target.value)} /></div>
          </div>
        )}
      </div>

      {/* ── Plot Valuation ── */}
      <div>
        {renderSectionHeader('Plot Valuation', 'plotValuation')}
        {activeSection === 'plotValuation' && (
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 bg-blue-50/10">
            <div><label className={labelStyles}>Site Area (Sq.Yds)</label><input type="number" className={inputStyles} value={formData.plotValuation.siteArea} onChange={e => handleInputChange('plotValuation', 'siteArea', e.target.value)} /></div>
            <div><label className={labelStyles}>GLR (Rs/Sq.Yds)</label><input type="number" className={inputStyles} value={formData.plotValuation.glr} onChange={e => handleInputChange('plotValuation', 'glr', e.target.value)} /></div>
            <div><label className={labelStyles}>MV (Rs/Sq.Yds)</label><input type="number" className={inputStyles} value={formData.plotValuation.mv} onChange={e => handleInputChange('plotValuation', 'mv', e.target.value)} /></div>
            <div><label className={labelStyles}>PMR (Plot Value)</label><input type="number" className={inputStyles} value={formData.plotValuation.pmr} onChange={e => handleInputChange('plotValuation', 'pmr', e.target.value)} /></div>
            <div className="md:col-span-2"><label className={labelStyles}>Say (Round Up Value)</label><input type="text" className={inputStyles} value={formData.plotValuation.sayValue} onChange={e => handleInputChange('plotValuation', 'sayValue', e.target.value)} /></div>
          </div>
        )}
      </div>

    </div>
  );
}

// ============================================================
//  STEP 2 FORM
//  — paste your existing StepTwoForm JSX here
//  — REMOVE the outer page shell (min-h-screen wrapper, header,
//    stepper, action bar) — those are now handled by the parent
// ============================================================
function Step2Form({
  formData,
  setFormData,
}: {
  formData: Step2State;
  setFormData: React.Dispatch<React.SetStateAction<Step2State>>;
}) {
  const [activeSection, setActiveSection] = useState<keyof Step2State>('intendingVendor');

  const handleInputChange = (section: keyof Step2State, field: string, value: any) => {
    setFormData(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
  };

  const handleNestedInputChange = (
    section: 'siteBoundaryDetails',
    subSection: keyof Step2State['siteBoundaryDetails'],
    field: string,
    value: string,
  ) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subSection]: { ...prev[section][subSection], [field]: value },
      },
    }));
  };

  const checkIsFilled = (section: keyof Step2State) => {
    if (section === 'siteBoundaryDetails')
      return Object.values(formData.siteBoundaryDetails.boundariesDoc).every(v => v !== '');
    const data = formData[section] as any;
    return Object.entries(data).filter(([k]) => k !== 'images').every(([, v]) => v !== '');
  };

  const renderSectionHeader = (title: string, id: keyof Step2State) => {
    const isFilled = checkIsFilled(id);
    return (
      <div
        className={`flex items-center justify-between p-4 md:px-6 md:py-5 cursor-pointer transition-colors ${
          activeSection === id ? 'bg-blue-50/50 border-b border-blue-100' : 'bg-white hover:bg-gray-50 border-b border-gray-100'
        }`}
        onClick={() => setActiveSection(activeSection === id ? null as any : id)}
      >
        <h3 className="font-medium md:text-lg text-[#00a0ef]">{title}</h3>
        {isFilled
          ? <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-[#00a0ef]" />
          : <Loader className={`w-5 h-5 md:w-6 md:h-6 text-[#00a0ef] ${activeSection === id ? '' : 'opacity-70'}`} />
        }
      </div>
    );
  };

  const subHeadingStyles = "text-sm font-semibold text-gray-900 mt-6 mb-4 col-span-full border-b pb-2";

  return (
    <div className="bg-white border-y md:border border-gray-200 md:rounded-xl overflow-hidden shadow-sm divide-y divide-gray-100">

      {/* ── Intending Vendor ── */}
      <div>
        {renderSectionHeader('Intending Vendor', 'intendingVendor')}
        {activeSection === 'intendingVendor' && (
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 bg-blue-50/10">
            <div className="md:col-span-2">
              <label className={labelStyles}>Enter Name (Sri. / Smt.)</label>
              <input type="text" placeholder="Enter Name" className={inputStyles}
                value={formData.intendingVendor.name}
                onChange={e => handleInputChange('intendingVendor', 'name', e.target.value)} />
            </div>
            <div className="flex gap-3 md:col-span-2">
              <div className="w-1/3 md:w-1/4">
                <label className={labelStyles}>Relation</label>
                <div className="relative">
                  <select className={`${inputStyles} appearance-none`} value={formData.intendingVendor.relationType}
                    onChange={e => handleInputChange('intendingVendor', 'relationType', e.target.value)}>
                    <option value="S/o.">S/o.</option>
                    <option value="W/o.">W/o.</option>
                    <option value="D/o.">D/o.</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>
              <div className="flex-1">
                <label className={labelStyles}>Relative's Name</label>
                <input type="text" placeholder="Name" className={inputStyles}
                  value={formData.intendingVendor.relationName}
                  onChange={e => handleInputChange('intendingVendor', 'relationName', e.target.value)} />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className={labelStyles}>Occupation</label>
              <input type="text" placeholder="Enter Occupation Details" className={inputStyles}
                value={formData.intendingVendor.occupation}
                onChange={e => handleInputChange('intendingVendor', 'occupation', e.target.value)} />
            </div>
            <div>
              <label className={labelStyles}>Phone Number 1</label>
              <input type="tel" className={inputStyles} value={formData.intendingVendor.phone1}
                onChange={e => handleInputChange('intendingVendor', 'phone1', e.target.value)} />
            </div>
            <div>
              <label className={labelStyles}>Phone Number 2</label>
              <input type="tel" className={inputStyles} value={formData.intendingVendor.phone2}
                onChange={e => handleInputChange('intendingVendor', 'phone2', e.target.value)} />
            </div>
            <h4 className={subHeadingStyles}>Address of Intending Vendor</h4>
            <div><label className={labelStyles}>Plot No. / H.No.</label><input type="text" className={inputStyles} value={formData.intendingVendor.plotNo} onChange={e => handleInputChange('intendingVendor', 'plotNo', e.target.value)} /></div>
            <div><label className={labelStyles}>Road / Street / Colony</label><input type="text" className={inputStyles} value={formData.intendingVendor.road} onChange={e => handleInputChange('intendingVendor', 'road', e.target.value)} /></div>
            <div><label className={labelStyles}>Village / Mandal / Municipality</label><input type="text" className={inputStyles} value={formData.intendingVendor.village} onChange={e => handleInputChange('intendingVendor', 'village', e.target.value)} /></div>
            <div><label className={labelStyles}>District</label><input type="text" className={inputStyles} value={formData.intendingVendor.district} onChange={e => handleInputChange('intendingVendor', 'district', e.target.value)} /></div>
            <div><label className={labelStyles}>Pincode</label><input type="text" className={inputStyles} value={formData.intendingVendor.pincode} onChange={e => handleInputChange('intendingVendor', 'pincode', e.target.value)} /></div>
            <h4 className={subHeadingStyles}>Valuation Estimates</h4>
            <div><label className={labelStyles}>Realizable %</label><input type="text" className={inputStyles} value={formData.intendingVendor.realizablePercent} onChange={e => handleInputChange('intendingVendor', 'realizablePercent', e.target.value)} /></div>
            <div><label className={labelStyles}>Realizable Value (Rupees)</label><input type="number" className={inputStyles} value={formData.intendingVendor.realizableValue} onChange={e => handleInputChange('intendingVendor', 'realizableValue', e.target.value)} /></div>
            <div><label className={labelStyles}>Distress %</label><input type="text" className={inputStyles} value={formData.intendingVendor.distressPercent} onChange={e => handleInputChange('intendingVendor', 'distressPercent', e.target.value)} /></div>
            <div><label className={labelStyles}>Distress Value (Rupees)</label><input type="number" className={inputStyles} value={formData.intendingVendor.distressValue} onChange={e => handleInputChange('intendingVendor', 'distressValue', e.target.value)} /></div>
          </div>
        )}
      </div>

      {/* ── Property Details ── */}
      <div>
        {renderSectionHeader('Property Details', 'propertyDetails')}
        {activeSection === 'propertyDetails' && (
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 bg-blue-50/10">
            <div className="md:col-span-2">
              <label className={labelStyles}>Type of Building</label>
              <div className="relative">
                <select className={`${inputStyles} appearance-none`} value={formData.propertyDetails.buildingType}
                  onChange={e => handleInputChange('propertyDetails', 'buildingType', e.target.value)}>
                  <option value="">Choose Option</option>
                  <option value="Ground Floor">Ground Floor Building</option>
                  <option value="Ground and First Floor">Ground Floor and First Floor Building</option>
                  <option value="Apartment">Apartment</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>
            <div><label className={labelStyles}>H.No</label><input type="text" placeholder="Enter Details" className={inputStyles} value={formData.propertyDetails.hNo} onChange={e => handleInputChange('propertyDetails', 'hNo', e.target.value)} /></div>
            <div><label className={labelStyles}>Sy.No.</label><input type="text" placeholder="Enter Details" className={inputStyles} value={formData.propertyDetails.syNo} onChange={e => handleInputChange('propertyDetails', 'syNo', e.target.value)} /></div>
            <div className="md:col-span-2"><label className={labelStyles}>Road / Street / Colony</label><input type="text" placeholder="Enter Details" className={inputStyles} value={formData.propertyDetails.road} onChange={e => handleInputChange('propertyDetails', 'road', e.target.value)} /></div>
            <div className="md:col-span-2"><label className={labelStyles}>Village</label><input type="text" placeholder="Enter Details" className={inputStyles} value={formData.propertyDetails.village} onChange={e => handleInputChange('propertyDetails', 'village', e.target.value)} /></div>
            <div className="md:col-span-2"><label className={labelStyles}>Municipality</label><input type="text" placeholder="Enter Details" className={inputStyles} value={formData.propertyDetails.municipality} onChange={e => handleInputChange('propertyDetails', 'municipality', e.target.value)} /></div>
            <div><label className={labelStyles}>District</label><input type="text" placeholder="Enter Details" className={inputStyles} value={formData.propertyDetails.district} onChange={e => handleInputChange('propertyDetails', 'district', e.target.value)} /></div>
            <div><label className={labelStyles}>Pincode</label><input type="text" placeholder="Enter Details" className={inputStyles} value={formData.propertyDetails.pincode} onChange={e => handleInputChange('propertyDetails', 'pincode', e.target.value)} /></div>
            <div className="md:col-span-2"><label className={labelStyles}>Landmark</label><input type="text" placeholder="Enter Details" className={inputStyles} value={formData.propertyDetails.landmark} onChange={e => handleInputChange('propertyDetails', 'landmark', e.target.value)} /></div>
            <div className="md:col-span-2 mt-4">
              <label className={labelStyles}>Select Geo Location</label>
              <GeoCoordinatePicker 
                onCoordinatesSubmit={(coords) => {
                  handleInputChange('propertyDetails', 'boundaryCoordinates', coords);
                  // Optional: Automatically fill the text inputs with the first pin's location
                  if (coords.length > 0) {
                    handleInputChange('propertyDetails', 'latitude', coords[0].lat.toString());
                    handleInputChange('propertyDetails', 'longitude', coords[0].lng.toString());
                  }
                }} 
              />
              {/* <div className="flex gap-3">
                <input type="text" placeholder="Latitude" className={inputStyles} value={formData.propertyDetails.latitude} onChange={e => handleInputChange('propertyDetails', 'latitude', e.target.value)} />
                <input type="text" placeholder="Longitude" className={inputStyles} value={formData.propertyDetails.longitude} onChange={e => handleInputChange('propertyDetails', 'longitude', e.target.value)} />
                <button type="button"
                  onClick={() => navigator.geolocation?.getCurrentPosition(pos => {
                    handleInputChange('propertyDetails', 'latitude', pos.coords.latitude.toString());
                    handleInputChange('propertyDetails', 'longitude', pos.coords.longitude.toString());
                  })}
                  className="px-4 py-2 bg-gray-900 text-white rounded-lg flex items-center gap-2 hover:bg-gray-800 transition whitespace-nowrap">
                  <MapPin className="w-4 h-4" />
                  <span className="hidden sm:inline">Get Location</span>
                </button>
              </div> */}
            </div>
          </div>
        )}
      </div>

      {/* ── Site Boundary Details ── */}
      <div>
        {renderSectionHeader('Site Boundary Details', 'siteBoundaryDetails')}
        {activeSection === 'siteBoundaryDetails' && (
          <div className="p-4 md:p-6 bg-blue-50/10 space-y-8">
            {(['boundariesDoc', 'boundariesActual', 'dimensionsDoc', 'dimensionsActual'] as const).map(sub => (
              <div key={sub}>
                <h4 className="text-sm font-semibold text-gray-900 mb-4">
                  {{
                    boundariesDoc: 'Boundaries [ Document ]',
                    boundariesActual: 'Boundaries [ Actual ]',
                    dimensionsDoc: 'Dimensions [ Document ]',
                    dimensionsActual: 'Dimensions [ Actual ]',
                  }[sub]}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {(['north', 'south', 'east', 'west'] as const).map(dir => (
                    <div key={dir}>
                      <label className={labelStyles}>{dir.charAt(0).toUpperCase() + dir.slice(1)}</label>
                      <input type="text" placeholder="Enter Details" className={inputStyles}
                        value={formData.siteBoundaryDetails[sub][dir]}
                        onChange={e => handleNestedInputChange('siteBoundaryDetails', sub, dir, e.target.value)} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

// ============================================================
//  STEP 3 FORM  ← ADD YOUR STEP 3 CONTENT HERE
//  Pattern is identical to Step1Form / Step2Form above.
//  1. Define Step3State interface (top of file) with your sections
//  2. Add accordion sections below using renderSectionHeader()
//  3. Wire inputs to formData / handleInputChange
// ============================================================
 
function Step3Form({
    formData,
    setFormData,
  }: {
    formData: Step3State;
    setFormData: React.Dispatch<React.SetStateAction<Step3State>>;
  }) {
    const [activeSection, setActiveSection] = useState<keyof Step3State>('documentUpload');
  
    const handleFileUpload = (category: keyof Step3State['documentUpload'], e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const newFiles = Array.from(e.target.files);
        setFormData(prev => ({
          ...prev,
          documentUpload: {
            ...prev.documentUpload,
            [category]: [...prev.documentUpload[category], ...newFiles]
          }
        }));
      }
    };
  
    const removeFile = (category: keyof Step3State['documentUpload'], index: number) => {
      setFormData(prev => ({
        ...prev,
        documentUpload: {
          ...prev.documentUpload,
          [category]: prev.documentUpload[category].filter((_, i) => i !== index)
        }
      }));
    };
  
    // Consider section filled if at least one document is uploaded across any category
    const checkIsFilled = () => {
      return Object.values(formData.documentUpload).some(files => files.length > 0);
    };
  
    const renderSectionHeader = (title: string, id: keyof Step3State) => {
      const isFilled = checkIsFilled();
      return (
        <div
          className={`flex items-center justify-between p-4 md:px-6 md:py-5 cursor-pointer transition-colors ${
            activeSection === id ? 'bg-blue-50/50 border-b border-blue-100' : 'bg-white hover:bg-gray-50 border-b border-gray-100'
          }`}
          onClick={() => setActiveSection(activeSection === id ? null as any : id)}
        >
          <h3 className="font-medium md:text-lg text-[#00a0ef]">{title}</h3>
          {isFilled
            ? <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-[#00a0ef]" />
            : <Loader className={`w-5 h-5 md:w-6 md:h-6 text-[#00a0ef] ${activeSection === id ? '' : 'opacity-70'}`} />
          }
        </div>
      );
    };
  
    // Helper to render individual upload blocks to keep code clean
    const renderUploadBlock = (title: string, category: keyof Step3State['documentUpload']) => {
      const files = formData.documentUpload[category];
      const inputId = `upload-${category}`;
  
      return (
        <div className="mb-6 last:mb-0">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">{title}</h4>
          
          {files.length === 0 ? (
            <label 
              htmlFor={inputId} 
              className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-gray-50 transition cursor-pointer"
            >
              <input 
                type="file" 
                id={inputId} 
                multiple 
                className="hidden" 
                onChange={(e) => handleFileUpload(category, e)} 
              />
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                <UploadCloud className="w-5 h-5 text-gray-600" />
              </div>
              <p className="text-sm text-gray-800 text-center">
                Drag and drop your document here or click to <span className="text-[#00a0ef] font-medium underline underline-offset-2">browse files</span>
              </p>
            </label>
          ) : (
            <div className="space-y-3">
              {files.map((file, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 md:p-4 bg-gray-50/80 border border-gray-100 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#e6f5fd] rounded-lg flex items-center justify-center text-[#00a0ef]">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 line-clamp-1">{file.name}</p>
                      <p className="text-xs text-gray-500">{(file.size / (1024 * 1024)).toFixed(1)} MB</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFile(category, idx)} 
                    className="text-sm text-[#ff4d4f] hover:text-red-600 font-medium px-2 py-1 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    };
  
    return (
      <div className="bg-white border-y md:border border-gray-200 md:rounded-xl overflow-hidden shadow-sm divide-y divide-gray-100">
        
        {/* ── Document Upload Section ── */}
        <div>
          {renderSectionHeader('Document Upload', 'documentUpload')}
          {activeSection === 'documentUpload' && (
            <div className="p-4 md:p-6 bg-white">
              {renderUploadBlock('Sale Deed / Ownership', 'saleDeed')}
              {renderUploadBlock('Building Permission Copy', 'buildingPermission')}
              {renderUploadBlock('Layout Copy', 'layoutCopy')}
              {renderUploadBlock('Legal Opinion', 'legalOpinion')}
              {renderUploadBlock('Property Tax', 'propertyTax')}
            </div>
          )}
        </div>
  
      </div>
    );
  }
   
// ============================================================
//  STEP 4 FORM  ← ADD YOUR STEP 4 CONTENT HERE
// ============================================================
function Step4Form({
    formData,
    setFormData,
  }: {
    formData: Step4State;
    setFormData: React.Dispatch<React.SetStateAction<Step4State>>;
  }) {
    const [activeSection, setActiveSection] = useState<keyof Step4State>('siteInspection');
  
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const newFiles = Array.from(e.target.files);
        setFormData(prev => ({
          ...prev,
          siteInspection: {
            reportFiles: [...prev.siteInspection.reportFiles, ...newFiles]
          }
        }));
      }
    };
  
    const removeFile = (index: number) => {
      setFormData(prev => ({
        ...prev,
        siteInspection: {
          reportFiles: prev.siteInspection.reportFiles.filter((_, i) => i !== index)
        }
      }));
    };
  
    const checkIsFilled = () => {
      return formData.siteInspection.reportFiles.length > 0;
    };
  
    const renderSectionHeader = (title: string, id: keyof Step4State) => {
      const isFilled = checkIsFilled();
      return (
        <div
          className={`flex items-center justify-between p-4 md:px-6 md:py-5 cursor-pointer transition-colors ${
            activeSection === id ? 'bg-blue-50/50 border-b border-blue-100' : 'bg-white hover:bg-gray-50 border-b border-gray-100'
          }`}
          onClick={() => setActiveSection(activeSection === id ? null as any : id)}
        >
          <h3 className="font-medium md:text-lg text-[#00a0ef]">{title}</h3>
          {isFilled
            ? <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-[#00a0ef]" />
            : <Loader className={`w-5 h-5 md:w-6 md:h-6 text-[#00a0ef] ${activeSection === id ? '' : 'opacity-70'}`} />
          }
        </div>
      );
    };
  
    const files = formData.siteInspection.reportFiles;
    const inputId = "upload-inspection-report";
  
    return (
      <div className="bg-white border-y md:border border-gray-200 md:rounded-xl overflow-hidden shadow-sm divide-y divide-gray-100">
        <div>
          {renderSectionHeader('Upload Site Inspection Report', 'siteInspection')}
          {activeSection === 'siteInspection' && (
            <div className="p-4 md:p-6 bg-white">
              {files.length === 0 ? (
                <label 
                  htmlFor={inputId} 
                  className="border-2 border-dashed border-gray-200 rounded-xl p-12 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-gray-50 transition cursor-pointer min-h-[350px]"
                >
                  <input 
                    type="file" 
                    id={inputId} 
                    multiple 
                    className="hidden" 
                    onChange={handleFileUpload} 
                  />
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                    <UploadCloud className="w-5 h-5 text-gray-600" />
                  </div>
                  <p className="text-sm text-gray-800 text-center">
                    Drag and drop your document here or click to <span className="text-[#00a0ef] font-medium underline underline-offset-2">browse files</span>
                  </p>
                </label>
              ) : (
                <div className="space-y-3">
                  {files.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 md:p-4 bg-gray-50/80 border border-gray-100 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#e6f5fd] rounded-lg flex items-center justify-center text-[#00a0ef]">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 line-clamp-1">{file.name}</p>
                          <p className="text-xs text-gray-500">{(file.size / (1024 * 1024)).toFixed(1)} MB</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeFile(idx)} 
                        className="text-sm text-[#ff4d4f] hover:text-red-600 font-medium px-2 py-1 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <label htmlFor={inputId} className="mt-4 inline-block px-4 py-2 bg-blue-50 text-[#00a0ef] rounded-lg text-sm font-medium cursor-pointer hover:bg-blue-100 transition-colors">
                      <input type="file" id={inputId} multiple className="hidden" onChange={handleFileUpload} />
                      + Add more files
                  </label>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

// ============================================================
//  STEP 5 FORM  ← ADD YOUR STEP 5 CONTENT HERE
// ============================================================
function Step5Form({
    step1,
    step2,
    step3,
    step4,
    onEditStep,
    isConfirmed,
    setIsConfirmed,
  }: Step5FormProps) {
    
    const ReviewSection = ({ title, stepNum, children }: { title: string; stepNum: number; children: React.ReactNode }) => (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6">
        <div className="px-4 py-3.5 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#00a0ef]" />
            {title}
          </h3>
          <button 
            type="button" 
            onClick={() => onEditStep(stepNum)}
            className="text-[#00a0ef] hover:text-[#008bd1] p-1 rounded-md hover:bg-blue-50 transition-colors flex items-center gap-1 text-sm font-medium"
          >
            <Edit className="w-4 h-4" />
            <span className="hidden sm:inline">Edit</span>
          </button>
        </div>
        <div className="p-4 md:p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          {children}
        </div>
      </div>
    );
  
    const DataField = ({ label, value }: { label: string; value: string | number }) => (
      <div>
        <p className="text-gray-500 font-medium mb-0.5">{label}</p>
        <p className="text-gray-900 font-semibold break-words">{value || '—'}</p>
      </div>
    );
  
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-[#00a0ef]">Review & Submit</h2>
          <p className="text-sm text-gray-500">Verify your information across all steps before final presentation submission.</p>
        </div>
  
        {/* Step 1 Data Summary */}
        <ReviewSection title="Basic Input & Applicant Details" stepNum={1}>
          <DataField label="Date Valuation" value={step1.inputField.dateValuation} />
          <DataField label="Date Inspection" value={step1.inputField.dateInspection} />
          <DataField label="Property Type" value={step1.inputField.propertyType} />
          <DataField label="Loan Type" value={step1.inputField.loanType} />
          <DataField label="Applicant Name" value={step1.applicantDetails.name} />
          <DataField label="Relation" value={`${step1.applicantDetails.relationType} ${step1.applicantDetails.relationName}`} />
          <DataField label="Occupation" value={step1.applicantDetails.occupation} />
          <DataField label="Phone 1" value={step1.applicantDetails.phone1} />
          <DataField label="Pincode" value={step1.address.pincode} />
          <DataField label="Bank Name" value={step1.bankDetails.bankName} />
          <DataField label="Site Area (Doc)" value={`${step1.siteArea.asPerDocument} Sq.Yds`} />
          <DataField label="Plot Value" value={step1.plotValuation.sayValue} />
        </ReviewSection>
  
        {/* Step 2 Data Summary */}
        <ReviewSection title="Vendor, Property & Boundary Details" stepNum={2}>
          <DataField label="Vendor Name" value={step2.intendingVendor.name} />
          <DataField label="Realizable Value" value={step2.intendingVendor.realizableValue} />
          <DataField label="Distress Value" value={step2.intendingVendor.distressValue} />
          <DataField label="H.No" value={step2.propertyDetails.hNo} />
          <DataField label="Sy.No." value={step2.propertyDetails.syNo} />
          <DataField label="Coordinates" value={`${step2.propertyDetails.latitude || '—'}, ${step2.propertyDetails.longitude || '—'}`} />
          <DataField label="North Boundary" value={step2.siteBoundaryDetails.boundariesDoc.north} />
          <DataField label="South Boundary" value={step2.siteBoundaryDetails.boundariesDoc.south} />
          <DataField label="Uploaded Images" value={`${step2.propertyDetails.images.length} files attached`} />
        </ReviewSection>
  
        {/* Step 3 Data Summary */}
        <ReviewSection title="Uploaded Ownership Documents" stepNum={3}>
          <DataField label="Sale Deed" value={`${step3.documentUpload.saleDeed.length} file(s)`} />
          <DataField label="Building Permission" value={`${step3.documentUpload.buildingPermission.length} file(s)`} />
          <DataField label="Layout Copy" value={`${step3.documentUpload.layoutCopy.length} file(s)`} />
          <DataField label="Legal Opinion" value={`${step3.documentUpload.legalOpinion.length} file(s)`} />
          <DataField label="Property Tax" value={`${step3.documentUpload.propertyTax.length} file(s)`} />
        </ReviewSection>
  
        {/* Step 4 Data Summary */}
        <ReviewSection title="Site Inspection Document" stepNum={4}>
          <DataField label="Inspection Report File" value={`${step4.siteInspection.reportFiles.length} file(s) uploaded`} />
        </ReviewSection>
  
        {/* Declaration Checkbox Card */}
        <div className="p-4 md:p-5 bg-gray-50 border border-gray-200 rounded-xl flex items-start gap-3 shadow-inner">
          <input 
            type="checkbox" 
            id="final-confirm"
            checked={isConfirmed}
            onChange={(e) => setIsConfirmed(e.target.checked)}
            className="mt-1 w-4 h-4 text-[#00a0ef] border-gray-300 rounded focus:ring-[#00a0ef]"
          />
          <label htmlFor="final-confirm" className="text-sm text-gray-700 leading-relaxed select-none cursor-pointer font-medium">
            I confirm that all information provided above is correct and I have uploaded the correct version of my document for editing.
          </label>
        </div>
      </div>
    );
  }

// ============================================================
//  STEP 6 FORM  ← ADD YOUR STEP 6 CONTENT HERE
//  This is the last step. "Continue" becomes "Submit Report"
//  and calls handleSubmit() in the parent.
// ============================================================
 

// ============================================================
//  MAIN PAGE COMPONENT
//  This is the ONLY export. It owns all state and routing.
// ============================================================
export default function NewValuationInit() {
  const router = useRouter();

  // ── Selection screen state ──
  const [bankActiveSection, setBankActiveSection] = useState<Section>('bank');
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [selectedType, setSelectedType] = useState<ValuationType | null>(null);
  const [showForm, setShowForm] = useState(false);

  // ── Which step is active (1–6) ──
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);
  // ── Per-step form state ──
  const [step1Data, setStep1Data] = useState<Step1State>({
    inputField:      { dateValuation: '', dateInspection: '', propertyType: '', loanType: '' },
    applicantDetails:{ name: '', relationType: 'W/o', relationName: '', occupation: '', phone1: '', phone2: '' },
    address:         { plotNo: '', road: '', village: '', district: '', pincode: '' },
    bankDetails:     { ifsc: '', bankName: '', branch: '', email: '', contactPerson: '' },
    siteArea:        { asPerDocument: '', asPerActual: '', siteShape: '', roadAffectedArea: '' },
    plotValuation:   { siteArea: '', glr: '', mv: '', pmr: '', sayValue: '' },
  });

  const [step2Data, setStep2Data] = useState<Step2State>({
    intendingVendor: { name: '', relationType: 'S/o.', relationName: '', occupation: '', phone1: '', phone2: '', plotNo: '', road: '', village: '', district: '', pincode: '', realizablePercent: '90%', realizableValue: '', distressPercent: '80%', distressValue: '' },
    propertyDetails: { buildingType: '', hNo: '', syNo: '', road: '', village: '', municipality: '', district: '', pincode: '', landmark: '', latitude: '', longitude: '', images: [] ,boundaryCoordinates: []},
    siteBoundaryDetails: {
      boundariesDoc:    { north: '', south: '', east: '', west: '' },
      boundariesActual: { north: '', south: '', east: '', west: '' },
      dimensionsDoc:    { north: '', south: '', east: '', west: '' },
      dimensionsActual: { north: '', south: '', east: '', west: '' },
    },
  });

  // ADD initial state for steps 3–6 once you define their fields
  const [step3Data, setStep3Data] = useState<Step3State>({
    documentUpload: { 
      saleDeed: [], 
      buildingPermission: [], 
      layoutCopy: [], 
      legalOpinion: [], 
      propertyTax: [] 
    },
  });
  const [step4Data, setStep4Data] = useState<Step4State>({
    siteInspection: { reportFiles: [] },
  });
//   const [step5Data, setStep5Data] = useState<Step5State>({
//     marketComparison: { comparableSale1: '', comparableSale2: '', indicativeValue: '' },
//   });
   

  // ── Navigation handlers ──
  const handleContinue = () => {
    if (selectedBank && selectedType) {
      setShowForm(true);
      setCurrentStep(1);
    }
  };

  

  const handleStepContinue = () => {
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
      // Scroll back to top of form on step change
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleSubmit();
    }
  };

  const handleStepBack = () => {
    if (currentStep === 1) {
      setShowForm(false);       // go back to bank/valuation selection
    } else {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // ── Final submit ──
//   const handleSubmit = async () => {
//     setIsSubmitting(true);
//     try {
//       const payload = {
//         bank: selectedBank,
//         valuationType: selectedType,
//         step1: step1Data,
//         step2: step2Data,
//         step3: step3Data,
//         step4: step4Data,
//         step5: step5Data,
         
//       };

//       // ── REPLACE THIS URL WITH YOUR BACKEND ENDPOINT ──
//       const response = await fetch('/api/valuations', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) throw new Error('Submission failed');

//       // Success — navigate to confirmation page or dashboard
//       router.push('/dashboard');

//     } catch (error) {
//       console.error('Submit error:', error);
//       alert('Something went wrong. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
const handleSubmit = async () => {
    if (!isConfirmed) {
      alert('Please check the confirmation box to submit.');
      return;
    }
    setIsSubmitting(true);
    try {
      // Simulate/Trigger mock or real backend API block
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmittedSuccessfully(true);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmittedSuccessfully) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-full max-w-md bg-white p-8 border border-gray-100 rounded-2xl md:shadow-md flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-blue-50 text-[#00a0ef] flex items-center justify-center mb-6 ring-8 ring-blue-50/50">
            <CheckCircle2 className="w-10 h-10 fill-current text-white" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Your document has been submitted successfully.</h1>
          <p className="text-sm md:text-base text-gray-500 max-w-xs mb-8 leading-relaxed">
            We are reviewing your document and will notify you once the next step is ready.
          </p>
          <button 
            onClick={() => router.push('/dashboard')}
            className="w-full py-3 bg-[#00a0ef] hover:bg-[#008bd1] text-white rounded-xl font-semibold transition shadow-sm"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // ── Bank / Type option sub-components ──
  const BankOption = ({ id, name, icon: Icon }: { id: Bank; name: string; icon: React.ElementType }) => {
    const isSelected = selectedBank === id;
    return (
      <div onClick={() => { setSelectedBank(id); setBankActiveSection('valuation'); }}
        className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${isSelected ? 'border-[#00a0ef] bg-[#f0f9ff]' : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'}`}>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${isSelected ? 'bg-blue-100 text-[#00a0ef]' : 'bg-gray-100 text-gray-500'}`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className="flex-1 font-semibold text-gray-900">{name}</span>
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'border-[#00a0ef]' : 'border-gray-300'}`}>
          {isSelected && <div className="w-2.5 h-2.5 bg-[#00a0ef] rounded-full" />}
        </div>
      </div>
    );
  };

  const TypeOption = ({ id, name, icon: Icon }: { id: ValuationType; name: string; icon: React.ElementType }) => {
    const isSelected = selectedType === id;
    return (
      <div onClick={() => setSelectedType(id)}
        className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${isSelected ? 'border-[#00a0ef] bg-[#f0f9ff]' : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'}`}>
        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mr-4 text-gray-500">
          <Icon className="w-5 h-5" />
        </div>
        <span className="flex-1 font-semibold text-gray-900">{name}</span>
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'border-[#00a0ef]' : 'border-gray-300'}`}>
          {isSelected && <div className="w-2.5 h-2.5 bg-[#00a0ef] rounded-full" />}
        </div>
      </div>
    );
  };

  // ════════════════════════════════════════════════════════
  //  RENDER — SCREEN 1: Bank + Valuation selection
  // ════════════════════════════════════════════════════════
  if (!showForm) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col md:py-8">
        <div className="flex-1 flex flex-col w-full md:max-w-3xl md:mx-auto bg-white border-x md:border border-gray-200 md:rounded-xl md:shadow-sm overflow-hidden">
          <div className="px-4 md:px-6 py-4 md:py-5 border-b border-gray-200 bg-white">
            <h1 className="text-lg md:text-xl font-medium text-gray-900">Submit New Report</h1>
          </div>

          <div className="flex-1 overflow-y-auto">
            {/* Choose Bank */}
            <div className="bg-white">
              <div className={`flex items-center justify-between px-4 md:px-6 py-4 cursor-pointer transition-colors ${bankActiveSection === 'bank' ? 'bg-blue-50/30' : 'hover:bg-gray-50'}`}
                onClick={() => setBankActiveSection('bank')}>
                <h2 className="text-[#00a0ef] font-medium md:text-lg">Choose Bank</h2>
                {selectedBank ? <CheckCircle2 className="w-6 h-6 text-white fill-[#00a0ef]" /> : <Loader className="w-6 h-6 text-[#00a0ef]" />}
              </div>
              {bankActiveSection === 'bank' && (
                <div className="px-4 md:px-6 pt-4 pb-6 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 border-b border-gray-100">
                  <BankOption id="sbi"     name="State Bank of India"  icon={Landmark} />
                  <BankOption id="ubi"     name="Union Bank of India"  icon={Landmark} />
                  <BankOption id="canara"  name="Canara"               icon={Landmark} />
                  <BankOption id="pnb"     name="Punjab National Bank" icon={Landmark} />
                  <BankOption id="private" name="Private Banks"        icon={Building2} />
                </div>
              )}
            </div>

            {/* Valuation Type */}
            <div className="bg-white">
              <div className={`flex items-center justify-between px-4 md:px-6 py-4 border-y border-gray-100 cursor-pointer transition-colors ${bankActiveSection === 'valuation' ? 'bg-blue-50/30' : 'hover:bg-gray-50'}`}
                onClick={() => { if (selectedBank) setBankActiveSection('valuation'); }}>
                <h2 className="text-[#00a0ef] font-medium md:text-lg">Valuation Type</h2>
                {selectedType ? <CheckCircle2 className="w-6 h-6 text-white fill-[#00a0ef]" /> : <Loader className="w-6 h-6 text-[#00a0ef]" />}
              </div>
              {bankActiveSection === 'valuation' && (
                <div className="px-4 md:px-6 pt-4 pb-6 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <TypeOption id="plot"     name="Plot Valuation"     icon={LayoutGrid} />
                  <TypeOption id="building" name="Building Valuation" icon={Building} />
                  <TypeOption id="flat"     name="Flat Valuation"     icon={Grid} />
                </div>
              )}
            </div>
          </div>

          <div className="p-4 md:px-6 md:py-5 bg-white border-t border-gray-200 flex items-center justify-between mt-auto">
            <button className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button onClick={handleContinue} disabled={!selectedBank || !selectedType}
              className={`flex items-center px-6 py-2.5 rounded-lg text-white font-medium transition-colors ${selectedBank && selectedType ? 'bg-[#00a0ef] hover:bg-[#008bd1] shadow-sm' : 'bg-blue-300 cursor-not-allowed'}`}>
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════════════════════
  //  RENDER — SCREEN 2: 6-step form
  // ════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:py-8">
      <div className="flex-1 flex flex-col w-full md:max-w-4xl md:mx-auto bg-white border-x md:border border-gray-200 md:rounded-xl md:shadow-sm overflow-hidden">

        {/* Header */}
        <div className="px-4 md:px-6 py-4 md:py-5 border-b border-gray-200 bg-white flex items-center gap-4">
          <h1 className="text-lg md:text-xl font-medium text-gray-900">Submit New Report</h1>
        </div>

        {/* Shared progress stepper */}
        <ProgressStepper currentStep={currentStep} />

        {/* Step content area */}
        <div className="flex-1 overflow-y-auto bg-gray-50 md:p-6">
          {currentStep === 1 && <Step1Form formData={step1Data} setFormData={setStep1Data} />}
          {currentStep === 2 && <Step2Form formData={step2Data} setFormData={setStep2Data} />}
          {currentStep === 3 && <Step3Form formData={step3Data} setFormData={setStep3Data} />}
          {currentStep === 4 && <Step4Form formData={step4Data} setFormData={setStep4Data} />}
          {currentStep === 5 && <Step5Form 
      step1={step1Data} 
      step2={step2Data} 
      step3={step3Data} 
      step4={step4Data} 
      onEditStep={(step) => setCurrentStep(step)}
      isConfirmed={isConfirmed}
      setIsConfirmed={setIsConfirmed}
    />}
           
        </div>

        {/* Shared action bar */}
        <ActionBar
          currentStep={currentStep}
          onBack={handleStepBack}
          onContinue={handleStepContinue}
          isLastStep={currentStep === 5}
          isSubmitting={isSubmitting}
        />

      </div>
    </div>
  );
}