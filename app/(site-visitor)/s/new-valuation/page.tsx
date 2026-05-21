 
'use client';

import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Building, Building2, Grid, Landmark, LayoutGrid, Loader, CheckCircle2, ChevronDown, MapPin, UploadCloud, Image as ImageIcon, X, FileText, Edit, CircleCheck, Check  } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback,  useEffect } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  useMap,
} from "@vis.gl/react-google-maps";
import {   Undo2, RotateCcw, Edit2,   } from "lucide-react";
import Link from 'next/link';

// ============================================================
//  TYPES
// ============================================================
type Bank = 'sbi' | 'ubi' | 'canara' | 'pnb' | 'private';
type ValuationType = 'plot' | 'building' | 'flat';
type Section = 'bank' | 'valuation';
type Coord = { lat: number; lng: number };
type Pin = { id: number; coord: Coord };
type Mode = "picking" | "submitted";

const MAX = 10;
const LABELS = ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9", "P10"];
const COLORS = [
  "#00a0ef", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", 
  "#ec4899", "#06b6d4", "#14b8a6", "#f97316", "#6366f1"
];
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
    if (pins.length === 0) return; // Allows submitting any number of points up to 10
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
              disabled={pins.length === 0}
              className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                pins.length > 0
                  ? "bg-[#00a0ef] text-white hover:bg-[#008bd1] shadow-sm"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {pins.length > 0 ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Confirm {pins.length} Boundaries
                </>
              ) : (
                "Place at least 1 point"
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
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        propertyDetails: {
          ...prev.propertyDetails,
          images: [...prev.propertyDetails.images, ...newFiles]
        }
      }));
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      propertyDetails: {
        ...prev.propertyDetails,
        images: prev.propertyDetails.images.filter((_, i) => i !== index)
      }
    }));
  };
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
            <div className="md:col-span-2 mt-6">
              <label className={labelStyles}>Upload Site Photos</label>
              <div 
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center bg-white hover:bg-gray-50 transition cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <input 
                  type="file" 
                  multiple 
                  accept="image/*" 
                  className="hidden" 
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                />
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                  <UploadCloud className="w-6 h-6 text-gray-500" />
                </div>
                <p className="text-sm text-gray-600 text-center">
                  Drag and drop your photos here or click to <span className="text-[#00a0ef] font-medium">browse files</span>
                </p>
              </div>

              {formData.propertyDetails.images.length > 0 && (
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mt-4">
                  {formData.propertyDetails.images.map((file, idx) => (
                    <div key={idx} className="relative aspect-square rounded-lg border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center group">
                      
                      {/* REPLACE ImageIcon with an actual img tag */}
                      <img 
                        src={URL.createObjectURL(file)} 
                        alt={`Preview ${idx + 1}`} 
                        className="w-full h-full object-cover transition-opacity group-hover:opacity-75"
                      />
                      
                      <button 
                        type="button"
                        onClick={(e) => { e.stopPropagation(); removeImage(idx); }}
                        className="absolute top-1 right-1 bg-white rounded-full p-1.5 shadow-md  opacity-100 transition-all hover:bg-red-50 hover:scale-105"
                      >
                        <X className="w-3.5 h-3.5 text-red-500" />
                      </button>
                      
                    </div>
                  ))}
                </div>
              )}
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
// ============================================================
//  STEP 5 FORM  ← REPLACE YOUR EXISTING STEP 5 WITH THIS
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
  
  const MainCategory = ({ title, icon: Icon, children }: { title: string, icon: React.ElementType, children: React.ReactNode }) => (
    <div className="mb-8 px-1">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-5 h-5 flex items-center justify-center text-[#00a0ef]">
          <Icon className="w-5 h-5 fill-current opacity-20" strokeWidth={2} />
        </div>
        <h3 className="text-[15px] font-bold text-gray-900">{title}</h3>
      </div>
      <div className="bg-white px-2">
        {children}
      </div>
    </div>
  );

  const SubCategory = ({ title, stepNum, children }: { title: string, stepNum: number, children: React.ReactNode }) => (
    <div className="py-4 border-b border-gray-200 last:border-0 first:pt-0">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-[13px] font-bold text-gray-800">{title}</h4>
        <button 
          type="button" 
          onClick={() => onEditStep(stepNum)}
          className="text-[#00a0ef] hover:bg-blue-50 p-1.5 rounded transition-colors"
        >
          <Edit2 className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-y-4 gap-x-4">
        {children}
      </div>
    </div>
  );

  const DataField = ({ label, value }: { label: string; value: string | number }) => (
    <div>
      <p className="text-[11px] text-gray-500 font-medium mb-1">{label}</p>
      <p className="text-[13px] font-medium text-gray-900 break-words">{value || '—'}</p>
    </div>
  );

  const FileCard = ({ file }: { file: File }) => (
    <div className="flex items-center justify-between p-3 bg-[#f2f9fd] rounded-xl mb-3 border border-[#e5f3fa]">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-[#00a0ef] rounded-lg flex items-center justify-center text-white shadow-sm">
          <FileText className="w-4 h-4" />
        </div>
        <div>
          <p className="text-[12px] font-semibold text-gray-900 line-clamp-1">{file.name}</p>
          <p className="text-[10px] font-medium text-gray-500">{(file.size / (1024 * 1024)).toFixed(1)} MB</p>
        </div>
      </div>
      <button className="text-[#00a0ef] p-1.5 hover:bg-blue-100 rounded-full transition-colors">
        {/* Placeholder for view icon, using a generic check/eye equivalent */}
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      </button>
    </div>
  );

  // Flatten step 3 files for easy display
  const allStep3Files = Object.values(step3.documentUpload).flat();

  return (
    <div className="max-w-3xl bg-white mx-auto md:px-4 pb-8">
      <div className="py-6 px-2">
        <h2 className="text-[18px] font-medium text-[#00a0ef]">Review & Submit</h2>
      </div>

      {/* --- Category 1: Basic Details --- */}
      <MainCategory title="Basic Details" icon={LayoutGrid}>
        
        <SubCategory title="Input Details" stepNum={1}>
          <DataField label="Date Valuation" value={step1.inputField.dateValuation} />
          <DataField label="Date of Inspection" value={step1.inputField.dateInspection} />
          <DataField label="Type of Property" value={step1.inputField.propertyType} />
          <DataField label="Type of Loan" value={step1.inputField.loanType} />
        </SubCategory>

        <SubCategory title="Applicant Details" stepNum={1}>
          <DataField label="Name" value={step1.applicantDetails.name} />
          <DataField label="Relation" value={`${step1.applicantDetails.relationType} ${step1.applicantDetails.relationName}`} />
          <DataField label="Occupation" value={step1.applicantDetails.occupation} />
          <DataField label="Phone Number 1" value={step1.applicantDetails.phone1} />
        </SubCategory>

        <SubCategory title="Applicant Address" stepNum={1}>
          <DataField label="Plot No. / H.No." value={step1.address.plotNo} />
          <DataField label="Road / Street" value={step1.address.road} />
          <DataField label="Village / Mandal" value={step1.address.village} />
          <DataField label="District" value={step1.address.district} />
        </SubCategory>

        <SubCategory title="Bank Details" stepNum={1}>
          <DataField label="Bank Name" value={step1.bankDetails.bankName} />
          <DataField label="Branch" value={step1.bankDetails.branch} />
          <DataField label="IFSC Code" value={step1.bankDetails.ifsc} />
          <DataField label="Contact Person" value={step1.bankDetails.contactPerson} />
        </SubCategory>

        <SubCategory title="Site Area" stepNum={1}>
          <DataField label="As per Document" value={`${step1.siteArea.asPerDocument} Sq.Yds`} />
          <DataField label="As per Actual" value={`${step1.siteArea.asPerActual} Sq.Yds`} />
          <DataField label="Site Shape" value={step1.siteArea.siteShape} />
          <DataField label="Road Affected" value={step1.siteArea.roadAffectedArea} />
        </SubCategory>

        <SubCategory title="Plot Valuation" stepNum={1}>
          <DataField label="Site Area" value={step1.plotValuation.siteArea} />
          <DataField label="GLR" value={step1.plotValuation.glr} />
          <DataField label="MV" value={step1.plotValuation.mv} />
          <DataField label="Round Up Value" value={step1.plotValuation.sayValue} />
        </SubCategory>

      </MainCategory>

      {/* --- Category 2: Vendor, Property Details --- */}
      <MainCategory title="Vendor, Property Details" icon={Building2}>
        
        <SubCategory title="Intending Vendor" stepNum={2}>
          <DataField label="Vendor Name" value={step2.intendingVendor.name} />
          <DataField label="Occupation" value={step2.intendingVendor.occupation} />
          <DataField label="Realizable Value" value={step2.intendingVendor.realizableValue} />
          <DataField label="Distress Value" value={step2.intendingVendor.distressValue} />
        </SubCategory>

        <SubCategory title="Property Details" stepNum={2}>
          <DataField label="Building Type" value={step2.propertyDetails.buildingType} />
          <DataField label="H.No" value={step2.propertyDetails.hNo} />
          <DataField label="Sy.No." value={step2.propertyDetails.syNo} />
          <DataField label="Geo Center" value={`${step2.propertyDetails.latitude || '-'}, ${step2.propertyDetails.longitude || '-'}`} />
          
          {/* RENDER BOUNDARY COORDINATES */}
          {step2.propertyDetails.boundaryCoordinates && step2.propertyDetails.boundaryCoordinates.length > 0 && (
            <div className="col-span-2 mt-2">
              <p className="text-[11px] text-gray-500 font-medium mb-2">Boundary Points</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {step2.propertyDetails.boundaryCoordinates.map((coord, i) => (
                  <div key={i} className="text-[12px] text-gray-700 bg-gray-50 p-2 rounded-lg border border-gray-100 flex items-center">
                    <span className="font-bold text-white bg-[#00a0ef] rounded-full w-5 h-5 flex items-center justify-center text-[10px] mr-2 shrink-0">
                      P{i + 1}
                    </span>
                    <span className="font-mono truncate">{coord.lat.toFixed(5)}, {coord.lng.toFixed(5)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </SubCategory>

        {/* RENDER SITE PHOTOS */}
        <SubCategory title="Site Photos" stepNum={2}>
          <div className="col-span-2">
            {step2.propertyDetails.images && step2.propertyDetails.images.length > 0 ? (
              <div className="flex flex-wrap gap-3 mt-1">
                {step2.propertyDetails.images.map((img, i) => (
                  <div key={i} className="w-16 h-16 md:w-20 md:h-20 rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                    <img 
                      src={URL.createObjectURL(img)} 
                      alt={`Site photo ${i + 1}`} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[12px] text-gray-400 italic">No site photos uploaded.</p>
            )}
          </div>
        </SubCategory>

        <SubCategory title="Boundary Details" stepNum={2}>
          <DataField label="North (Doc)" value={step2.siteBoundaryDetails.boundariesDoc.north} />
          <DataField label="South (Doc)" value={step2.siteBoundaryDetails.boundariesDoc.south} />
          <DataField label="East (Doc)" value={step2.siteBoundaryDetails.boundariesDoc.east} />
          <DataField label="West (Doc)" value={step2.siteBoundaryDetails.boundariesDoc.west} />
        </SubCategory>

      </MainCategory>

      {/* --- Category 3: Uploaded Documents --- */}
      <MainCategory title="Uploaded Documents" icon={FileText}>
        <div className="pt-2">
          {allStep3Files.length > 0 ? (
            allStep3Files.map((file, idx) => (
              <FileCard key={idx} file={file} />
            ))
          ) : (
            <p className="text-sm text-gray-500 italic">No ownership documents uploaded.</p>
          )}
        </div>
      </MainCategory>

      {/* --- Category 4: Site Inspection --- */}
      <MainCategory title="Site Inspection Document" icon={FileText}>
        <div className="pt-2">
          {step4.siteInspection.reportFiles.length > 0 ? (
            step4.siteInspection.reportFiles.map((file, idx) => (
              <FileCard key={idx} file={file} />
            ))
          ) : (
            <p className="text-sm text-gray-500 italic">No inspection reports uploaded.</p>
          )}
        </div>
      </MainCategory>

      {/* --- Declaration Checkbox Card --- */}
      <div className="mt-8 p-4 bg-[#f8fafc] border border-gray-200 rounded-xl flex items-start gap-3">
        <div className="pt-0.5">
          <input 
            type="checkbox" 
            id="final-confirm"
            checked={isConfirmed}
            onChange={(e) => setIsConfirmed(e.target.checked)}
            className="w-4 h-4 text-[#00a0ef] border-gray-300 rounded focus:ring-[#00a0ef]"
          />
        </div>
        <label htmlFor="final-confirm" className="text-[13px] text-gray-700 leading-relaxed select-none cursor-pointer">
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
      <div className="flex flex-col flex-1 w-full relative min-h-screen md:min-h-0 bg-white overflow-hidden">
                            
      {/* --- CONFETTI IMAGES (Responsive Positioning) --- */}
      {/* Left Confetti */}
      <img 
        src="/images/party-left.svg" 
        alt="Success Confetti Left" 
        className="absolute -left-[45%] top-0 md:-left-40 md:top-[5%] w-[120%] md:w-[600px] lg:w-[700px] pointer-events-none z-0 opacity-60 md:opacity-100 scale-x-[-1]" 
      />
    
      {/* Right Confetti */}
      <img 
        src="/images/party-right.svg" 
        alt="Success Confetti Right" 
        className="absolute -right-[45%] top-0 md:-right-32 md:top-[5%] w-[120%] md:w-[600px] lg:w-[700px] pointer-events-none z-0 opacity-60 md:opacity-100"
      />
    
      {/* --- CENTRAL CONTENT --- */}
      <div className="relative z-10 flex flex-col items-center text-center w-full px-5 pt-24 md:pt-16 max-w-[520px] mx-auto flex-1">
        
        {/* Success Icon (Perfectly proportioned nested circles) */}
        <div className="w-[88px] h-[88px] rounded-full flex items-center justify-center bg-[#f0f8fd] mb-6">
          <div className="w-[60px] h-[60px] rounded-full bg-white flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <div className="w-[32px] h-[32px] bg-[#00a0ef] rounded-full flex items-center justify-center">
              <Check className="w-4 h-4 text-white" strokeWidth={3.5} />
            </div>
          </div>
        </div>
    
        {/* Success Text */}
        <h2 className="text-[20px] lg:text-[24px] font-bold text-gray-900 mb-3 tracking-tight">
          Your document has been submitted<br className="hidden md:block" /> successfully.
        </h2>
        <p className="text-[#8A94A6] text-[14px] md:text-[15px] mb-8 leading-relaxed max-w-[320px] md:max-w-none">
          We are reviewing your document and will notify you once the next step is ready.
        </p>
    
        {/* What Happens Next Card (Hidden on very small mobile to match screenshot, visible on larger screens) */}
        <div className="hidden md:block w-full border border-[#EAECF0] bg-[#FAFAFB] rounded-[16px] p-6 lg:p-8 text-left shadow-sm">
          <h3 className="text-[16px] font-semibold text-[#171717] mb-5">
            What Happens Next
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-[14px] text-[#8A94A6]">
              <span className="text-[#A0AAB5] text-[18px] leading-[14px] mt-[-1px]">•</span>
              <span className="leading-relaxed">We review your document for quality and compliance.</span>
            </li>
            <li className="flex items-start gap-3 text-[14px] text-[#8A94A6]">
              <span className="text-[#A0AAB5] text-[18px] leading-[14px] mt-[-1px]">•</span>
              <span className="leading-relaxed">An expert editor matching your field is assigned.</span>
            </li>
            <li className="flex items-start gap-3 text-[14px] text-[#8A94A6]">
              <span className="text-[#A0AAB5] text-[18px] leading-[14px] mt-[-1px]">•</span>
              <span className="leading-relaxed">You'll receive a notification when updates are ready.</span>
            </li>
          </ul>
        </div>
      </div>
    
      {/* --- ACTION BAR (Fixed to bottom on mobile, inline on desktop) --- */}
      <div className="relative z-20 w-full p-4 mt-auto border-t border-gray-100 bg-white md:bg-transparent md:border-none md:p-6 md:max-w-[520px] md:mx-auto">
        <Link 
          href='/s/dashboard'  
          className="flex items-center justify-center w-full md:w-auto md:px-8 py-3.5 md:py-3 bg-[#00a0ef] hover:bg-[#008bd1] rounded-xl md:rounded-lg text-white font-medium transition-colors shadow-sm"
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
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