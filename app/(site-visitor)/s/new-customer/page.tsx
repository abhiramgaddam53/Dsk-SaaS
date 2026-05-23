 'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Loader, ArrowRight, Landmark, CheckCircle2, Edit2,
  RotateCcw, Undo2, MapPin, Loader2,
  ChevronDown,
} from 'lucide-react';
import Link from 'next/link';
import { APIProvider, Map, AdvancedMarker, useMap } from '@vis.gl/react-google-maps';

// ─── TYPES & CONSTANTS ────────────────────────────────────────────────────────
type Coord = { lat: number; lng: number };
type Pin   = { id: number; coord: Coord };
type Mode  = 'picking' | 'submitted';

const MAX    = 10;
const COLORS = ['#EF4444','#3B82F6','#10B981','#F59E0B','#8B5CF6','#EC4899','#14B8A6','#F97316','#6366F1','#84CC16'];
const LABELS = ['A','B','C','D','E','F','G','H','I','J'];

interface Customer {
  id: string;
  prefix: string;
  name: string;
  relationType: string;
  relationName: string;
  phone: string;
  relationPhone: string;
}

const BANKS = [
  { id: 'sbi',    name: 'State Bank of India',   iconColor: 'text-blue-600',   bgColor: 'bg-blue-100'  },
  { id: 'ubi',    name: 'Union Bank of India',    iconColor: 'text-red-500',    bgColor: 'bg-red-50'    },
  { id: 'canara', name: 'Canara',                 iconColor: 'text-yellow-500', bgColor: 'bg-yellow-50' },
  { id: 'iob',    name: 'Indian Overseas Bank',   iconColor: 'text-blue-400',   bgColor: 'bg-blue-50'   },
  { id: 'pnb',    name: 'Punjab National Bank',   iconColor: 'text-orange-500', bgColor: 'bg-orange-50' },
  { id: 'bob',    name: 'Bank of Baroda',         iconColor: 'text-orange-600', bgColor: 'bg-orange-50' },
];

// ─── HELPER COMPONENTS (outside NewCustomerPage) ──────────────────────────────

/** Listens for a single click on the Google Map and calls onMapClick */
function SingleClickHandler({ onMapClick }: { onMapClick: (coord: Coord) => void }) {
  const map = useMap();
  useEffect(() => {
    if (!map) return;
    const listener = map.addListener('click', (e: google.maps.MapMouseEvent) => {
      if (e.latLng) onMapClick({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    });
    return () => google.maps.event.removeListener(listener);
  }, [map, onMapClick]);
  return null;
}

/** Single-pin location picker: auto-places pin at user's GPS location, allows moving by tapping. */
function SinglePinLocationPicker({
  onLocationPicked,
}: {
  onLocationPicked: (coord: Coord) => void;
}) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';

  const [center,       setCenter      ] = useState<Coord>({ lat: 15.8281, lng: 78.0373 });
  const [zoom,         setZoom        ] = useState(4);
  const [pin,          setPin         ] = useState<Coord | null>(null);
  const [userLocation, setUserLocation] = useState<Coord | null>(null);
  const [confirmed,    setConfirmed   ] = useState(false);

  // On mount: get GPS, auto-drop pin there
  useEffect(() => {
    if (!('geolocation' in navigator)) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc: Coord = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserLocation(loc);
        setCenter(loc);
        setZoom(18);
        setPin(loc); // auto-place pin at user location
      },
      (err) => console.error('Geolocation error:', err),
      { enableHighAccuracy: true }
    );
  }, []);

  const handleConfirm = () => {
    if (!pin) return;
    setConfirmed(true);
    onLocationPicked(pin);
  };

  const handleReset = () => {
    setConfirmed(false);
    if (userLocation) setPin(userLocation);
  };

  const handleMapClick = useCallback(
    (coord: Coord) => { if (!confirmed) setPin(coord); },
    [confirmed]
  );

  return (
    <div className="flex flex-col w-full bg-white border border-gray-300 rounded-xl overflow-hidden shadow-sm">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#00a0ef]" />
            Pin Location
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            {confirmed
              ? 'Location confirmed. Tap Reset to change.'
              : pin
              ? 'Tap the map to move the pin, then confirm'
              : 'Tap the map to place a pin'}
          </p>
        </div>
        {confirmed && (
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        )}
      </header>

      {/* Map */}
      <div className="relative w-full h-64 md:h-80 bg-gray-100">
        <APIProvider apiKey={apiKey}>
          <Map
            mapId="single-pin-picker"
            center={center}
            zoom={zoom}
            mapTypeId="satellite"
            onCameraChanged={(ev) => {
              setCenter(ev.detail.center);
              setZoom(ev.detail.zoom);
            }}
            gestureHandling="greedy"
            mapTypeControl={true}
            zoomControl={true}
            fullscreenControl={true}
            streetViewControl={true}
            style={{ width: '100%', height: '100%' }}
          >
            {/* Blue pulsing dot = user's real GPS position */}
            {userLocation && (
              <AdvancedMarker position={userLocation}>
                <div className="relative flex items-center justify-center">
                  <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg z-10" />
                  <div className="absolute w-4 h-4 bg-blue-400 rounded-full animate-ping opacity-40" />
                </div>
              </AdvancedMarker>
            )}

            {/* Red drop pin = selected location */}
            {pin && (
              <AdvancedMarker position={pin} zIndex={100}>
                <div className="flex flex-col items-center -mb-1">
                  <div
                    className="w-9 h-9 rounded-full border-2 border-white shadow-lg flex items-center justify-center"
                    style={{ backgroundColor: '#EF4444' }}
                  >
                    <MapPin className="w-4 h-4 text-white fill-white" />
                  </div>
                  <div className="w-0.5 h-3 bg-red-500" />
                  <div className="w-2 h-1 bg-red-400/40 rounded-full blur-sm" />
                </div>
              </AdvancedMarker>
            )}

            {!confirmed && <SingleClickHandler onMapClick={handleMapClick} />}
          </Map>
        </APIProvider>

        {/* Floating lat/lng badge */}
        {pin && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-gray-900/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-[11px] font-mono shadow-lg pointer-events-none whitespace-nowrap">
            {pin.lat.toFixed(6)}, {pin.lng.toFixed(6)}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        {!confirmed ? (
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!pin}
            className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
              pin
                ? 'bg-[#00a0ef] text-white hover:bg-[#008bd1] shadow-sm'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {pin ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Confirm Location
              </>
            ) : (
              'Tap map to place a pin'
            )}
          </button>
        ) : (
          <div className="flex items-center gap-2 text-green-600 justify-center text-sm font-medium">
            <CheckCircle2 className="w-4 h-4" />
            Location confirmed — auto-filling details below
          </div>
        )}
      </div>
    </div>
  );
}

/** Multi-pin picker (kept for reference / future use) */
function GeoCoordinatePicker({ onCoordinatesSubmit }: { onCoordinatesSubmit: (coords: Coord[]) => void }) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';

  const [center,       setCenter      ] = useState<Coord>({ lat: 20, lng: 78 });
  const [zoom,         setZoom        ] = useState(4);
  const [mode,         setMode        ] = useState<Mode>('picking');
  const [pins,         setPins        ] = useState<Pin[]>([]);
  const [nextId,       setNextId      ] = useState(0);
  const [submitted,    setSubmitted   ] = useState<Pin[]>([]);
  const [editTarget,   setEditTarget  ] = useState<number | null>(null);
  const [userLocation, setUserLocation] = useState<Coord | null>(null);

  useEffect(() => {
    if (!('geolocation' in navigator)) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc: Coord = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserLocation(loc);
        setCenter(loc);
        setZoom(18);
      },
      (err) => console.error('Geolocation error:', err),
      { enableHighAccuracy: true }
    );
  }, []);

  const handleMapClick = useCallback(
    (coord: Coord) => {
      if (mode === 'picking') {
        if (pins.length >= MAX) return;
        setPins((prev) => [...prev, { id: nextId, coord }]);
        setNextId((n) => n + 1);
        return;
      }
      if (mode === 'submitted' && editTarget !== null) {
        setSubmitted((prev) => prev.map((p, i) => (i === editTarget ? { ...p, coord } : p)));
        setEditTarget(null);
      }
    },
    [mode, pins.length, nextId, editTarget]
  );

  const handleSubmit = () => {
    if (pins.length === 0) return;
    setSubmitted([...pins]);
    setMode('submitted');
    setEditTarget(null);
    onCoordinatesSubmit(pins.map((p) => p.coord));
  };

  const handleReset = () => {
    setPins([]);
    setSubmitted([]);
    setMode('picking');
    setEditTarget(null);
    setNextId(0);
  };

  const activePins = mode === 'picking' ? pins : submitted;

  return (
    <div className="flex flex-col w-full bg-white border border-gray-300 rounded-xl overflow-hidden shadow-sm">
      <header className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#00a0ef]" />
            Location Boundaries
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            {mode === 'picking'
              ? `Tap the map · ${pins.length} / ${MAX} points placed`
              : editTarget !== null
              ? `Tap map to move ${LABELS[editTarget]}`
              : 'Tap a coordinate card below to adjust it'}
          </p>
        </div>
        <div className="flex gap-2">
          {mode === 'picking' && pins.length > 0 && (
            <button
              type="button"
              onClick={() => setPins((p) => p.slice(0, -1))}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              <Undo2 className="w-3.5 h-3.5" />
              Undo
            </button>
          )}
          {mode === 'submitted' && (
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
            mapTypeId="satellite"
            onCameraChanged={(ev) => {
              setCenter(ev.detail.center);
              setZoom(ev.detail.zoom);
            }}
            gestureHandling="greedy"
            mapTypeControl={true}
            zoomControl={true}
            fullscreenControl={true}
            streetViewControl={true}
            style={{ width: '100%', height: '100%' }}
          >
            {userLocation && (
              <AdvancedMarker position={userLocation}>
                <div className="relative">
                  <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg" />
                  <div className="absolute inset-0 w-4 h-4 bg-blue-400 rounded-full animate-ping opacity-40" />
                </div>
              </AdvancedMarker>
            )}
            <MultiClickHandler onClick={handleMapClick} />
            {activePins.map((pin, i) => (
              <PinMarker
                key={pin.id}
                index={i}
                coord={pin.coord}
                editing={mode === 'submitted'}
                selected={editTarget === i}
                onSelect={() => setEditTarget(editTarget === i ? null : i)}
              />
            ))}
          </Map>
        </APIProvider>
        {mode === 'submitted' && editTarget !== null && (
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
        {mode === 'picking' ? (
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
                  ? 'bg-[#00a0ef] text-white hover:bg-[#008bd1] shadow-sm'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {pins.length > 0 ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Confirm {pins.length} Boundaries
                </>
              ) : (
                'Place at least 1 point'
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

function MultiClickHandler({ onClick }: { onClick: (c: Coord) => void }) {
  const map = useMap();
  useEffect(() => {
    if (!map) return;
    const listener = map.addListener('click', (e: google.maps.MapMouseEvent) => {
      if (e.latLng) onClick({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    });
    return () => google.maps.event.removeListener(listener);
  }, [map, onClick]);
  return null;
}

function PinMarker({
  index, coord, editing, selected, onSelect,
}: {
  index: number; coord: Coord; editing: boolean; selected: boolean; onSelect: () => void;
}) {
  return (
    <AdvancedMarker position={coord} zIndex={selected ? 100 : index}>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); if (editing) onSelect(); }}
        className={`flex items-center justify-center rounded-full font-bold text-white text-xs shadow-md transition-all ${
          selected ? 'w-10 h-10 ring-4 ring-white scale-110' : 'w-8 h-8 ring-2 ring-white/80 scale-100'
        } ${editing ? 'cursor-pointer' : 'cursor-default'}`}
        style={{ backgroundColor: COLORS[index] }}
      >
        {LABELS[index]}
      </button>
    </AdvancedMarker>
  );
}

function CoordCard({
  pin, index, editing, selected, onSelect,
}: {
  pin: Pin; index: number; editing: boolean; selected: boolean; onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={() => editing && onSelect()}
      disabled={!editing}
      className={`flex items-center gap-3 p-2.5 rounded-lg border text-left w-full transition-colors ${
        editing ? 'cursor-pointer' : 'cursor-default opacity-90'
      } ${selected ? 'border-[#00a0ef] bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}
    >
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 shadow-sm"
        style={{ backgroundColor: COLORS[index] }}
      >
        {LABELS[index]}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-0.5">
          {selected ? 'Tap map to move' : `Point ${index + 1}`}
        </p>
        <p className="text-xs font-mono text-gray-900 truncate">
          {pin.coord.lat.toFixed(5)}, {pin.coord.lng.toFixed(5)}
        </p>
      </div>
      {editing && (
        <Edit2 className={`w-4 h-4 shrink-0 ${selected ? 'text-[#00a0ef]' : 'text-gray-400'}`} />
      )}
    </button>
  );
}

// ─── MAIN PAGE COMPONENT ──────────────────────────────────────────────────────
export default function NewCustomerPage() {

  // ── Section accordion ──────────────────────────────────────────────────────
  const [activeSection, setActiveSection] = useState<'bank' | 'customer' | 'location' | 'property' | 'loan'>('bank');

  // ── Bank state ─────────────────────────────────────────────────────────────
  const [bankData, setBankData] = useState({
    bankId: '', branchName: '', branchManager: '', managerPhone: '', branchEmail: '',
  });

  // ── Customer state ─────────────────────────────────────────────────────────
  const [customerData, setCustomerData] = useState<Customer[]>([{
    id: '1', prefix: 'Sri.', name: '', relationType: 'S/o.', relationName: '', phone: '', relationPhone: '',
  }]);

  // ── Location state (top-level — fixes the original bug) ───────────────────
  const [locationData, setLocationData] = useState({
    state: '', district: '', mandal: '', village: '',
    colony: '', zipCode: '', landmark: '',
    lat: null as number | null, lng: null as number | null,
  });
  const [isGeocoding, setIsGeocoding] = useState(false);
  // Property state 
  const [propertyData, setPropertyData] = useState({
    propertyType: '',
    additionalEstimate: ''
  });

  const [loanData, setLoanData] = useState({
    loanCategory: '', // 'Own Property' or 'Purchase of Property'
    loanType: ''      // The specific radio button selection
  });
  // ── Reverse geocoding ─────────────────────────────────────────────────────
  const fetchLocationDetails = async (lat: number, lng: number) => {
    if (!window.google?.maps) {
      console.warn('Google Maps API not loaded.');
      return;
    }
    setIsGeocoding(true);
    const geocoder = new window.google.maps.Geocoder();
    try {
      const response = await geocoder.geocode({ location: { lat, lng } });
      if (response.results[0]) {
        const components = response.results[0].address_components;
        let state = '', district = '', mandal = '', village = '', zipCode = '', colony = '';

        components.forEach((comp) => {
          if (comp.types.includes('administrative_area_level_1')) state    = comp.long_name;
          if (comp.types.includes('administrative_area_level_3')) district = comp.long_name;
          if (comp.types.includes('sublocality_level_1'))         mandal   = comp.long_name;
          if (comp.types.includes('locality'))                    village  = comp.long_name;
          if (comp.types.includes('neighborhood') || comp.types.includes('sublocality_level_2')) colony = comp.long_name;
          if (comp.types.includes('postal_code'))                 zipCode  = comp.long_name;
        });

        setLocationData((prev) => ({
          ...prev,
          state:    state    || prev.state,
          district: district || prev.district,
          mandal:   mandal   || prev.mandal,
          village:  village  || prev.village,
          colony:   colony   || prev.colony,
          zipCode:  zipCode  || prev.zipCode,
          lat,
          lng,
        }));
      }
    } catch (error) {
      console.error('Reverse geocoding failed:', error);
    } finally {
      setIsGeocoding(false);
    }
  };

  // ── Helpers ────────────────────────────────────────────────────────────────
  const handleInputChange = (field: string, value: string) =>
    setBankData((prev) => ({ ...prev, [field]: value }));

  const handleTabOut = (e: React.KeyboardEvent, nextSection: typeof activeSection) => {
    if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      setActiveSection(nextSection);
      setTimeout(() => {
        const el = document.getElementById(`${nextSection}-section`);
        if (el) {
          const first = el.querySelector('input, select, textarea') as HTMLElement;
          if (first) first.focus();
        }
      }, 100);
    }
  };

  const checkIsFilled = (id: string) => {
    if (id === 'bank') {
      return (
        bankData.bankId !== '' &&
        bankData.branchName.trim() !== '' &&
        bankData.branchManager.trim() !== '' &&
        bankData.managerPhone.length >= 10
      );
    }
    if (id === 'customer') {
      const isValidPhone = (phone: string) => /^[6-9]\d{9}$/.test(phone);
      return customerData.every(
        (c) =>
          c.name.trim() !== '' &&
          isValidPhone(c.phone) &&
          c.relationName.trim() !== '' &&
          isValidPhone(c.relationPhone)
      );
    }
    if (id === 'location') return locationData.lat !== null;
    if (id === 'property') {
      if (!propertyData.propertyType) return false;
      if (['Proposed Building', 'Flat'].includes(propertyData.propertyType)) {
        return propertyData.additionalEstimate !== '';
      }
      return true;
    }

    if (id === 'loan') {
      return loanData.loanCategory !== '' && loanData.loanType !== '';
    }  return false;
  };

  // ── Section header ─────────────────────────────────────────────────────────
  const SectionHeader = ({ id, title }: { id: typeof activeSection; title: string }) => {
    const isFilled = checkIsFilled(id);
    return (
      <div
        onClick={() => setActiveSection(id)}
        className="flex items-center justify-between py-4 border-b border-gray-100 cursor-pointer"
      >
        <h3 className="text-[13px] font-medium md:text-lg text-[#00a0ef]">{title}</h3>
        {isFilled ? (
          <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-[#00a0ef]" />
        ) : (
          <Loader className={`w-5 h-5 md:w-6 md:h-6 text-[#00a0ef] ${activeSection === id ? '' : 'opacity-70'}`} />
        )}
      </div>
    );
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col min-h-screen bg-white max-w-md mx-auto border-x border-gray-100">

      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-[15px] font-medium text-gray-900">Submit Customer Entry</h1>
      </div>

      {/* Accordion */}
      <div className="flex-1 overflow-y-auto px-4 pb-20">

        {/* ── BANK SECTION ────────────────────────────────────────────────── */}
        <SectionHeader id="bank" title="Choose Bank" />

        {activeSection === 'bank' && (
          <div id="bank-section" className="py-4 flex flex-col gap-3">
            {!bankData.bankId ? (
              BANKS.map((bank) => (
                <div
                  key={bank.id}
                  onClick={() => handleInputChange('bankId', bank.id)}
                  className="flex items-center p-3 rounded-xl border border-gray-200 bg-white hover:border-[#00a0ef] hover:bg-blue-50 cursor-pointer transition-all"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 shrink-0 ${bank.bgColor}`}>
                    <Landmark className={`w-4 h-4 ${bank.iconColor}`} />
                  </div>
                  <span className="flex-1 text-[14px] font-semibold text-gray-900">{bank.name}</span>
                </div>
              ))
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl border border-[#00a0ef] bg-[#f0f9ff]">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3 bg-blue-100">
                      <Landmark className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-[14px] font-semibold text-gray-900">
                      {BANKS.find((b) => b.id === bankData.bankId)?.name}
                    </span>
                  </div>
                  <button
                    onClick={() => handleInputChange('bankId', '')}
                    className="text-[12px] font-medium text-[#00a0ef] hover:underline"
                  >
                    Change
                  </button>
                </div>

                <div className="flex flex-col gap-3 pt-2 animate-in fade-in duration-300">
                  <div>
                    <label className="block text-[12px] text-gray-700 mb-1.5">Branch Name</label>
                    <input
                      type="text" placeholder="Enter Branch Name"
                      value={bankData.branchName}
                      onChange={(e) => handleInputChange('branchName', e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#00a0ef]"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] text-gray-700 mb-1.5">Branch Manager</label>
                    <input
                      type="text" placeholder="Branch Manager Name"
                      value={bankData.branchManager}
                      onChange={(e) => handleInputChange('branchManager', e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#00a0ef]"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] text-gray-700 mb-1.5">Manager Phone Number</label>
                    <input
                      type="tel" placeholder="+91 1234567890"
                      value={bankData.managerPhone}
                      onChange={(e) => handleInputChange('managerPhone', e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#00a0ef]"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] text-gray-700 mb-1.5">Branch Email</label>
                    <input
                      type="email" placeholder="branch@email.com"
                      value={bankData.branchEmail}
                      onChange={(e) => handleInputChange('branchEmail', e.target.value)}
                      onKeyDown={(e) => handleTabOut(e, 'customer')}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#00a0ef]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── CUSTOMER SECTION ─────────────────────────────────────────────── */}
        <SectionHeader id="customer" title="Customer Details" />

        {activeSection === 'customer' && (
          <div id="customer-section" className="pb-6 pt-4 space-y-6 animate-in fade-in duration-300">

            {customerData.length < 2 && (
              <div className="flex justify-end">
                <button
                  onClick={() =>
                    setCustomerData([
                      ...customerData,
                      { id: Date.now().toString(), prefix: 'Sri.', name: '', relationType: 'S/o.', relationName: '', phone: '', relationPhone: '' },
                    ])
                  }
                  className="text-[#00a0ef] text-[12px] font-semibold"
                >
                  + Add Point of Contact
                </button>
              </div>
            )}

            {customerData.map((customer, index) => (
              <div key={customer.id} className="space-y-4 pb-6 border-b-2 border-gray-100 last:border-0 last:pb-0">

                {index > 0 && (
                  <div className="flex items-center justify-between bg-[#f0f9ff] px-3 py-2 rounded-lg mb-2">
                    <span className="text-[#00a0ef] text-[13px] font-semibold">Point of Contact Details</span>
                    <button
                      onClick={() => setCustomerData(customerData.filter((_, i) => i !== index))}
                      className="text-red-500 text-[12px] font-medium hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {/* Name row */}
                <div className="flex gap-2">
                  <select
                    className="w-20 px-2 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#00a0ef]"
                    value={customer.prefix}
                    onChange={(e) => {
                      const newPrefix    = e.target.value;
                      const newRelation  = newPrefix === 'Sri.' ? 'S/o.' : newPrefix === 'Smt.' ? 'W/o.' : newPrefix === 'M/s.' ? 'Rep. By' : 'D/o.';
                      const updated      = [...customerData];
                      updated[index]     = { ...customer, prefix: newPrefix, relationType: newRelation };
                      setCustomerData(updated);
                    }}
                  >
                    <option value="Sri.">Sri.</option>
                    <option value="Smt.">Smt.</option>
                    <option value="M/s.">M/s.</option>
                    <option value="Miss.">Miss.</option>
                  </select>
                  <input
                    type="text" placeholder="Enter Customer Name"
                    value={customer.name}
                    onChange={(e) => {
                      const updated = [...customerData];
                      updated[index].name = e.target.value;
                      setCustomerData(updated);
                    }}
                    className="flex-1 px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#00a0ef]"
                  />
                </div>

                {/* Customer phone */}
                <div className="flex gap-2">
                  <div className="w-16 flex items-center justify-center bg-gray-50 border border-gray-200 rounded-lg text-[13px] text-gray-600 shrink-0">
                    +91
                  </div>
                  <input
                    type="tel" placeholder="Customer Phone No." maxLength={10}
                    value={customer.phone}
                    onChange={(e) => {
                      const val     = e.target.value.replace(/\D/g, '');
                      const updated = [...customerData];
                      updated[index].phone = val;
                      setCustomerData(updated);
                    }}
                    className="flex-1 px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#00a0ef]"
                  />
                </div>

                {/* Relation name */}
                <div className="flex gap-2">
                  <div className="w-20 flex items-center px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[13px] text-gray-500 shrink-0">
                    {customer.relationType}
                  </div>
                  <input
                    type="text" placeholder="Enter Relation Name"
                    value={customer.relationName}
                    onChange={(e) => {
                      const updated = [...customerData];
                      updated[index].relationName = e.target.value;
                      setCustomerData(updated);
                    }}
                    className="flex-1 px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#00a0ef]"
                  />
                </div>

                {/* Relation phone */}
                <div className="flex gap-2">
                  <div className="w-16 flex items-center justify-center bg-gray-50 border border-gray-200 rounded-lg text-[13px] text-gray-600 shrink-0">
                    +91
                  </div>
                  <input
                    type="tel" placeholder="Relation Phone No." maxLength={10}
                    value={customer.relationPhone}
                    onChange={(e) => {
                      const val     = e.target.value.replace(/\D/g, '');
                      const updated = [...customerData];
                      updated[index].relationPhone = val;
                      setCustomerData(updated);
                    }}
                    onKeyDown={(e) => {
                      if (index === customerData.length - 1) handleTabOut(e, 'location');
                    }}
                    className="flex-1 px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#00a0ef]"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── LOCATION SECTION ─────────────────────────────────────────────── */}
        <SectionHeader id="location" title="Location of Site" />

        {activeSection === 'location' && (
          <div id="location-section" className="py-4 space-y-6 animate-in fade-in duration-300">

            <div>
              <label className="block text-[13px] font-medium text-gray-900 mb-2">Select Geo Location</label>
              {/* ✅ SinglePinLocationPicker — auto-places pin at user GPS, reverse geocodes on confirm */}
              <SinglePinLocationPicker
                onLocationPicked={(coord) => {
                  setLocationData((prev) => ({ ...prev, lat: coord.lat, lng: coord.lng }));
                  fetchLocationDetails(coord.lat, coord.lng);
                }}
              />
            </div>

            {/* Location detail fields — auto-filled by reverse geocoder, user-editable */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-[13px] font-semibold text-[#00a0ef]">Location Details</h4>
                {isGeocoding && (
                  <span className="flex items-center text-[11px] text-gray-500 gap-1.5">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#00a0ef]" />
                    Auto-filling...
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-3">
                {/* State */}
                <input
                  type="text"
                  placeholder="State"
                  value={locationData.state}
                  onChange={(e) => setLocationData({ ...locationData, state: e.target.value })}
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] text-gray-700 focus:outline-none focus:border-[#00a0ef]"
                />

                {/* District */}
                <input
                  type="text"
                  placeholder="District"
                  value={locationData.district}
                  onChange={(e) => setLocationData({ ...locationData, district: e.target.value })}
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] text-gray-700 focus:outline-none focus:border-[#00a0ef]"
                />

                {/* Mandal + Village */}
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Mandal"
                    value={locationData.mandal}
                    onChange={(e) => setLocationData({ ...locationData, mandal: e.target.value })}
                    className="flex-1 px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] text-gray-700 focus:outline-none focus:border-[#00a0ef]"
                  />
                  <input
                    type="text"
                    placeholder="Village"
                    value={locationData.village}
                    onChange={(e) => setLocationData({ ...locationData, village: e.target.value })}
                    className="flex-1 px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] text-gray-700 focus:outline-none focus:border-[#00a0ef]"
                  />
                </div>

                {/* Colony + Zip */}
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Colony / Locality Name"
                    value={locationData.colony}
                    onChange={(e) => setLocationData({ ...locationData, colony: e.target.value })}
                    className="flex-[2] px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#00a0ef]"
                  />
                  <input
                    type="text"
                    placeholder="Zip Code"
                    maxLength={6}
                    value={locationData.zipCode}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      setLocationData({ ...locationData, zipCode: val });
                    }}
                    className="flex-1 px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#00a0ef]"
                  />
                </div>

                {/* Landmark */}
                <input
                  type="text"
                  placeholder="Landmark"
                  value={locationData.landmark}
                  onChange={(e) => setLocationData({ ...locationData, landmark: e.target.value })}
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-[#00a0ef]"
                />
              </div>
            </div>
          </div>
        )}

        {/* ── PROPERTY & LOAN (placeholders) ───────────────────────────────── */}
        <SectionHeader id="property" title="Property Details" />
        {activeSection === 'property' && (
          <div id="property-section" className="py-4 space-y-5 animate-in fade-in duration-300">
            
            {/* Property Type Dropdown */}
            <div>
              <div className="relative">
                <select
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-[14px] text-gray-700 focus:outline-none focus:border-[#00a0ef] focus:ring-1 focus:ring-[#00a0ef] appearance-none transition-colors"
                  value={propertyData.propertyType}
                  onChange={(e) => {
                    const val = e.target.value;
                    setPropertyData({
                      propertyType: val,
                      // Reset additional estimate if the new type doesn't require it
                      additionalEstimate: ['Proposed Building', 'Flat'].includes(val) ? propertyData.additionalEstimate : ''
                    });
                  }}
                  onKeyDown={(e) => {
                    if (!['Proposed Building', 'Flat'].includes(propertyData.propertyType)) {
                      handleTabOut(e, 'loan');
                    }
                  }}
                >
                  <option value="" disabled hidden>Choose Property Type</option>
                  <option value="Open Plot">Open Plot</option>
                  <option value="Existing Building">Existing Building</option>
                  <option value="Proposed Building">Proposed Building</option>
                  <option value="Flat">Flat</option>
                  <option value="Agri. Land">Agri. Land</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Conditional Additional Estimate */}
            {['Proposed Building', 'Flat'].includes(propertyData.propertyType) && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="block text-[14px] text-gray-900 mb-3">Additional Estimate</label>
                <div className="flex gap-3">
                  
                  {/* Yes Option */}
                  <label 
                    className={`flex-1 flex items-center justify-between px-4 py-3 border rounded-xl cursor-pointer transition-all ${
                      propertyData.additionalEstimate === 'Yes' 
                        ? 'border-[#00a0ef] bg-[#f0f9ff]' 
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <span className={`text-[14px] ${propertyData.additionalEstimate === 'Yes' ? 'text-[#00a0ef] font-medium' : 'text-gray-600'}`}>
                      Yes
                    </span>
                    <div className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center transition-colors ${
                      propertyData.additionalEstimate === 'Yes' ? 'border-[#00a0ef]' : 'border-gray-300'
                    }`}>
                      {propertyData.additionalEstimate === 'Yes' && <div className="w-2.5 h-2.5 bg-[#00a0ef] rounded-full" />}
                    </div>
                    <input 
                      type="radio" 
                      name="additionalEstimate" 
                      value="Yes" 
                      className="hidden" 
                      checked={propertyData.additionalEstimate === 'Yes'} 
                      onChange={() => setPropertyData({ ...propertyData, additionalEstimate: 'Yes' })} 
                    />
                  </label>

                  {/* No Option */}
                  <label 
                    className={`flex-1 flex items-center justify-between px-4 py-3 border rounded-xl cursor-pointer transition-all ${
                      propertyData.additionalEstimate === 'No' 
                        ? 'border-[#00a0ef] bg-[#f0f9ff]' 
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <span className={`text-[14px] ${propertyData.additionalEstimate === 'No' ? 'text-[#00a0ef] font-medium' : 'text-gray-600'}`}>
                      No
                    </span>
                    <div className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center transition-colors ${
                      propertyData.additionalEstimate === 'No' ? 'border-[#00a0ef]' : 'border-gray-300'
                    }`}>
                      {propertyData.additionalEstimate === 'No' && <div className="w-2.5 h-2.5 bg-[#00a0ef] rounded-full" />}
                    </div>
                    <input 
                      type="radio" 
                      name="additionalEstimate" 
                      value="No" 
                      className="hidden" 
                      checked={propertyData.additionalEstimate === 'No'} 
                      onChange={() => setPropertyData({ ...propertyData, additionalEstimate: 'No' })} 
                      onKeyDown={(e) => handleTabOut(e, 'loan')}
                    />
                  </label>

                </div>
              </div>
            )}
          </div>
        )}
        <SectionHeader id="loan"     title="Loan Details" />
        {activeSection === 'loan' && (
          <div id="loan-section" className="py-4 space-y-4 animate-in fade-in duration-300">
            <div>
              <label className="block text-[14px] text-gray-900 mb-3">Loan Type</label>
              
              {/* Category Dropdown */}
              <div className="relative mb-4">
                <select
                  className={`w-full px-4 py-3 border rounded-xl text-[14px] appearance-none transition-colors focus:outline-none focus:ring-1 focus:ring-[#00a0ef] ${
                    loanData.loanCategory
                      ? 'bg-[#ebf8ff] border-[#bce4ff] text-[#00a0ef] font-medium' // Highlighted state
                      : 'bg-white border-gray-200 text-gray-700'
                  }`}
                  value={loanData.loanCategory}
                  onChange={(e) => {
                    setLoanData({ 
                      loanCategory: e.target.value, 
                      loanType: '' // Reset the specific type when category changes
                    });
                  }}
                >
                  <option value="" disabled hidden>Choose Loan Type</option>
                  <option value="Own Property">Own Property</option>
                  <option value="Purchase of Property">Purchase of Property</option>
                </select>
                <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${
                  loanData.loanCategory ? 'text-[#00a0ef]' : 'text-gray-500'
                }`} />
              </div>

              {/* Dynamic Radio Options based on Category */}
              {loanData.loanCategory && (
                <div className="flex flex-col gap-2.5 animate-in fade-in slide-in-from-top-2 duration-300">
                  {(loanData.loanCategory === 'Own Property' 
                    ? ['Housing Loan', 'Mortgage Loan', 'Others']
                    : ['Plot Purchase', 'Plot + Construction Loan', 'Flat Purchase']
                  ).map((option) => (
                    <label 
                      key={option}
                      className={`flex items-center justify-between px-4 py-3 border rounded-xl cursor-pointer transition-all ${
                        loanData.loanType === option 
                          ? 'border-[#00a0ef] bg-[#f0f9ff]' 
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <span className={`text-[14px] ${loanData.loanType === option ? 'text-[#00a0ef] font-medium' : 'text-gray-500'}`}>
                        {option}
                      </span>
                      
                      <div className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center transition-colors ${
                        loanData.loanType === option ? 'border-[#00a0ef]' : 'border-gray-300'
                      }`}>
                        {loanData.loanType === option && <div className="w-2.5 h-2.5 bg-[#00a0ef] rounded-full" />}
                      </div>
                      
                      <input 
                        type="radio" 
                        name="loanType" 
                        value={option} 
                        className="hidden" 
                        checked={loanData.loanType === option} 
                        onChange={() => setLoanData({ ...loanData, loanType: option })} 
                      />
                    </label>
                  ))}
                </div>
              )}

            </div>
          </div>
        )}
      </div>

      {/* Fixed bottom action bar */}
      <div className="p-4 bg-white border-t border-gray-100 flex items-center justify-between mt-auto">
        <Link
          href="/s/dashboard"
          className="px-6 py-2.5 border border-gray-200 rounded-lg text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </Link>
        <button
          onClick={() => {
            if (activeSection === 'bank')     setActiveSection('customer');
            else if (activeSection === 'customer') setActiveSection('location');
            else if (activeSection === 'location') setActiveSection('property');
          }}
          disabled={!bankData.bankId}
          className={`flex items-center px-6 py-2.5 rounded-lg text-[14px] font-medium text-white transition-colors ${
            bankData.bankId ? 'bg-[#00a0ef] hover:bg-[#008bd1]' : 'bg-blue-300 cursor-not-allowed'
          }`}
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-1.5" />
        </button>
      </div>

    </div>
  );
}