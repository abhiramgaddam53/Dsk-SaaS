 
// "use client";

// import { useCallback, useState, useEffect } from "react";
// import {
//   APIProvider,
//   Map,
//   AdvancedMarker,
//   useMap,
// } from "@vis.gl/react-google-maps";

// // ─── Types ────────────────────────────────────────────────────────────────────
// type Coord = { lat: number; lng: number };
// type Pin = { id: number; coord: Coord };
// type Mode = "picking" | "submitted";

// const MAX = 4;
// const LABELS = ["P1", "P2", "P3", "P4"];
// const COLORS = ["#FF4D4D", "#4D9FFF", "#4DFF91", "#FFD24D"];

// // ─── Map click handler using Map instance ──────────────────────────────────────
// function ClickHandler({ onClick }: { onClick: (c: Coord) => void }) {
//   const map = useMap();

//   useEffect(() => {
//     if (!map) return;

//     const listener = map.addListener('click', (e: google.maps.MapMouseEvent) => {
//       if (e.latLng) {
//         onClick({ lat: e.latLng.lat(), lng: e.latLng.lng() });
//       }
//     });

//     return () => {
//       google.maps.event.removeListener(listener);
//     };
//   }, [map, onClick]);

//   return null;
// }

// // ─── Pin marker ───────────────────────────────────────────────────────────────
// function PinMarker({
//   index,
//   coord,
//   editing,
//   selected,
//   onSelect,
// }: {
//   index: number;
//   coord: Coord;
//   editing: boolean;
//   selected: boolean;
//   onSelect: () => void;
// }) {
//   return (
//     <AdvancedMarker position={coord}>
//       <button
//         type="button"
//         onClick={(e) => {
//           e.stopPropagation();
//           if (editing) onSelect();
//         }}
//         style={{
//           background: COLORS[index],
//           border: selected ? "3px solid white" : "2px solid rgba(0,0,0,0.35)",
//           boxShadow: selected
//             ? `0 0 0 3px ${COLORS[index]}, 0 4px 14px rgba(0,0,0,0.5)`
//             : "0 2px 8px rgba(0,0,0,0.4)",
//           transform: selected ? "scale(1.3)" : "scale(1)",
//           transition: "all 0.18s cubic-bezier(.4,0,.2,1)",
//           width: 36,
//           height: 36,
//           borderRadius: "50%",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           fontWeight: 700,
//           fontSize: 11,
//           color: "white",
//           cursor: editing ? "pointer" : "default",
//           fontFamily: "'DM Mono', monospace",
//           padding: 0,
//         }}
//       >
//         {LABELS[index]}
//       </button>
//     </AdvancedMarker>
//   );
// }

// // ─── Coord card ───────────────────────────────────────────────────────────────
// function CoordCard({
//   pin,
//   index,
//   editing,
//   selected,
//   onSelect,
// }: {
//   pin: Pin;
//   index: number;
//   editing: boolean;
//   selected: boolean;
//   onSelect: () => void;
// }) {
//   return (
//     <button
//       type="button"
//       onClick={() => editing && onSelect()}
//       disabled={!editing}
//       style={{
//         display: "flex",
//         alignItems: "center",
//         gap: 12,
//         borderRadius: 16,
//         padding: "10px 14px",
//         textAlign: "left",
//         transition: "all 0.2s",
//         cursor: editing ? "pointer" : "default",
//         background: selected ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.05)",
//         border: selected ? `1.5px solid rgba(255,255,255,0.3)` : "1.5px solid transparent",
//         width: "100%",
//       }}
//     >
//       <div
//         style={{
//           width: 36,
//           height: 36,
//           borderRadius: "50%",
//           background: COLORS[index],
//           boxShadow: `0 0 12px ${COLORS[index]}88`,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           fontWeight: 700,
//           fontSize: 12,
//           color: "white",
//           flexShrink: 0,
//         }}
//       >
//         {LABELS[index]}
//       </div>
//       <div style={{ minWidth: 0, flex: 1 }}>
//         <p
//           style={{
//             fontSize: 9,
//             color: "rgba(255,255,255,0.35)",
//             textTransform: "uppercase",
//             letterSpacing: "0.1em",
//             marginBottom: 2,
//             margin: 0,
//           }}
//         >
//           {selected ? "← tap map to move" : `Point ${index + 1}`}
//         </p>
//         <p
//           style={{
//             fontSize: 11,
//             fontFamily: "'DM Mono', monospace",
//             color: "rgba(255,255,255,0.75)",
//             whiteSpace: "nowrap",
//             overflow: "hidden",
//             textOverflow: "ellipsis",
//             margin: 0,
//           }}
//         >
//           {pin.coord.lat.toFixed(5)}, {pin.coord.lng.toFixed(5)}
//         </p>
//       </div>
//       {editing && (
//         <span style={{ color: selected ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.15)", fontSize: 15 }}>
//           ✎
//         </span>
//       )}
//     </button>
//   );
// }

// // ─── Main component ───────────────────────────────────────────────────────────
// export default function GeoCoordinatePicker() {
//   const apiKey =  "AIzaSyBHMeEzVqW7_6l7ePVNZj4HToBJ1HB9xGA";

//   // Controlled Map State
//   const [center, setCenter] = useState<Coord>({ lat: 20, lng: 78 }); // Default fallback
//   const [zoom, setZoom] = useState(4); // Default zoom

//   const [mode, setMode] = useState<Mode>("picking");
//   const [pins, setPins] = useState<Pin[]>([]);
//   const [nextId, setNextId] = useState(0);
//   const [submitted, setSubmitted] = useState<Pin[]>([]);
//   const [editTarget, setEditTarget] = useState<number | null>(null);

//   // Auto-detect user location on mount
//   useEffect(() => {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const userLoc = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           };
          
//           // Fly to user location and zoom in
//           setCenter(userLoc);
//           setZoom(18);

//           // Automatically place the first pin IF the user hasn't placed any yet
//           setPins((prev) => {
//             if (prev.length === 0) {
//               setNextId(1);
//               return [{ id: 0, coord: userLoc }];
//             }
//             return prev;
//           });
//         },
//         (error) => {
//           console.error("Error getting user location:", error);
//         },
//         { enableHighAccuracy: true }
//       );
//     }
//   }, []);

//   const handleMapClick = useCallback(
//     (coord: Coord) => {
//       if (mode === "picking") {
//         if (pins.length >= MAX) return;
//         setPins((prev) => [...prev, { id: nextId, coord }]);
//         setNextId((n) => n + 1);
//         return;
//       }
//       if (mode === "submitted" && editTarget !== null) {
//         setSubmitted((prev) =>
//           prev.map((p, i) => (i === editTarget ? { ...p, coord } : p))
//         );
//         setEditTarget(null);
//       }
//     },
//     [mode, pins.length, nextId, editTarget]
//   );

//   const handleSubmit = () => {
//     if (pins.length < MAX) return;
//     setSubmitted([...pins]);
//     setMode("submitted");
//     setEditTarget(null);
//   };

//   const handleReset = () => {
//     setPins([]);
//     setSubmitted([]);
//     setMode("picking");
//     setEditTarget(null);
//   };

//   const activePins = mode === "picking" ? pins : submitted;

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         height: "100dvh",
//         width: "100%",
//         background: "#090910",
//         fontFamily: "'DM Mono', 'Fira Mono', monospace",
//         overflow: "hidden",
//       }}
//     >
//       {/* ── Header ── */}
//       <header
//         style={{
//           flexShrink: 0,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           padding: "12px 16px",
//           background: "#0d0d18",
//           borderBottom: "1px solid rgba(255,255,255,0.07)",
//         }}
//       >
//         <div>
//           <h1 style={{ fontSize: 13, fontWeight: 700, color: "white", letterSpacing: "-0.02em", margin: 0 }}>
//             GEO PICKER
//           </h1>
//           <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", margin: "2px 0 0 0" }}>
//             {mode === "picking"
//               ? `Tap the map · ${pins.length} / ${MAX} placed`
//               : editTarget !== null
//               ? `Tap map to move ${LABELS[editTarget]}`
//               : "Tap a card to reposition"}
//           </p>
//         </div>

//         <div style={{ display: "flex", gap: 8 }}>
//           {mode === "picking" && pins.length > 0 && (
//             <button
//               onClick={() => setPins((p) => p.slice(0, -1))}
//               style={{
//                 fontSize: 11,
//                 padding: "6px 12px",
//                 borderRadius: 10,
//                 background: "rgba(255,255,255,0.06)",
//                 color: "rgba(255,255,255,0.5)",
//                 border: "none",
//                 cursor: "pointer",
//               }}
//             >
//               ← Undo
//             </button>
//           )}
//           {mode === "submitted" && (
//             <button
//               onClick={handleReset}
//               style={{
//                 fontSize: 11,
//                 padding: "6px 12px",
//                 borderRadius: 10,
//                 background: "rgba(255,60,60,0.1)",
//                 color: "#FF7070",
//                 border: "none",
//                 cursor: "pointer",
//               }}
//             >
//               Reset
//             </button>
//           )}
//         </div>
//       </header>

//       {/* ── Map ── */}
//       <div style={{ position: "relative", flex: 1, minHeight: 0 }}>
//         <APIProvider apiKey={apiKey}>
//           <Map
//             mapId="geo-picker"
//             center={center}
//             zoom={zoom}
//             onCameraChanged={(ev) => {
//               setCenter(ev.detail.center);
//               setZoom(ev.detail.zoom);
//             }}
//             gestureHandling="greedy"
//             disableDefaultUI
//             colorScheme="DARK"
//             style={{ width: "100%", height: "100%" }}
//           >
//             <ClickHandler onClick={handleMapClick} />
//             {activePins.map((pin, i) => (
//               <PinMarker
//                 key={pin.id}
//                 index={i}
//                 coord={pin.coord}
//                 editing={mode === "submitted"}
//                 selected={editTarget === i}
//                 onSelect={() => setEditTarget(editTarget === i ? null : i)}
//               />
//             ))}
//           </Map>
//         </APIProvider>

//         {/* Edit hint banner */}
//         {mode === "submitted" && editTarget !== null && (
//           <div
//             style={{
//               position: "absolute",
//               top: 12,
//               left: "50%",
//               transform: "translateX(-50%)",
//               background: "rgba(0,0,0,0.7)",
//               backdropFilter: "blur(10px)",
//               border: `1px solid ${COLORS[editTarget]}55`,
//               boxShadow: `0 0 16px ${COLORS[editTarget]}33`,
//               borderRadius: 99,
//               padding: "7px 18px",
//               fontSize: 11,
//               color: "rgba(255,255,255,0.75)",
//               pointerEvents: "none",
//               whiteSpace: "nowrap",
//             }}
//           >
//             Tap anywhere to place{" "}
//             <span style={{ color: COLORS[editTarget], fontWeight: 700 }}>
//               {LABELS[editTarget]}
//             </span>
//           </div>
//         )}
//       </div>

//       {/* ── Bottom panel ── */}
//       <div
//         style={{
//           flexShrink: 0,
//           background: "#0d0d18",
//           borderTop: "1px solid rgba(255,255,255,0.07)",
//           padding: "14px 16px",
//         }}
//       >
//         {mode === "picking" ? (
//           <>
//             {/* Mini coord list */}
//             {pins.length > 0 && (
//               <div
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "1fr 1fr",
//                   gap: 8,
//                   marginBottom: 12,
//                 }}
//               >
//                 {pins.map((pin, i) => (
//                   <div
//                     key={pin.id}
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: 8,
//                       borderRadius: 12,
//                       padding: "8px 10px",
//                       background: "rgba(255,255,255,0.04)",
//                     }}
//                   >
//                     <div
//                       style={{
//                         width: 24,
//                         height: 24,
//                         borderRadius: "50%",
//                         background: COLORS[i],
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         fontSize: 9,
//                         fontWeight: 700,
//                         color: "white",
//                         flexShrink: 0,
//                       }}
//                     >
//                       {LABELS[i]}
//                     </div>
//                     <span
//                       style={{
//                         fontSize: 10,
//                         color: "rgba(255,255,255,0.45)",
//                         overflow: "hidden",
//                         textOverflow: "ellipsis",
//                         whiteSpace: "nowrap",
//                       }}
//                     >
//                       {pin.coord.lat.toFixed(3)}, {pin.coord.lng.toFixed(3)}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* Progress bar */}
//             <div
//               style={{
//                 height: 3,
//                 borderRadius: 99,
//                 background: "rgba(255,255,255,0.07)",
//                 marginBottom: 12,
//                 overflow: "hidden",
//               }}
//             >
//               <div
//                 style={{
//                   height: "100%",
//                   borderRadius: 99,
//                   width: `${(pins.length / MAX) * 100}%`,
//                   background:
//                     pins.length === MAX
//                       ? "linear-gradient(90deg,#4DFF91,#4D9FFF)"
//                       : "linear-gradient(90deg,#FF4D4D,#FFD24D)",
//                   transition: "width 0.4s cubic-bezier(.4,0,.2,1)",
//                 }}
//               />
//             </div>

//             <button
//               onClick={handleSubmit}
//               disabled={pins.length < MAX}
//               style={{
//                 width: "100%",
//                 padding: "14px",
//                 borderRadius: 16,
//                 fontWeight: 700,
//                 fontSize: 13,
//                 letterSpacing: "0.03em",
//                 border: "none",
//                 cursor: pins.length === MAX ? "pointer" : "not-allowed",
//                 transition: "all 0.3s",
//                 ...(pins.length === MAX
//                   ? {
//                       background: "linear-gradient(135deg,#4DFF91 0%,#4D9FFF 100%)",
//                       color: "#090910",
//                       boxShadow: "0 0 28px #4DFF9155",
//                     }
//                   : {
//                       background: "rgba(255,255,255,0.06)",
//                       color: "rgba(255,255,255,0.2)",
//                     }),
//               }}
//             >
//               {pins.length === MAX
//                 ? "Confirm 4 Points →"
//                 : `Place ${MAX - pins.length} more point${MAX - pins.length !== 1 ? "s" : ""}`}
//             </button>
//           </>
//         ) : (
//           <>
//             <p
//               style={{
//                 fontSize: 9,
//                 color: "rgba(255,255,255,0.25)",
//                 textTransform: "uppercase",
//                 letterSpacing: "0.12em",
//                 marginBottom: 10,
//                 marginTop: 0,
//               }}
//             >
//               {editTarget !== null ? "Editing — tap map to place" : "Confirmed · tap to edit"}
//             </p>
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
//               {submitted.map((pin, i) => (
//                 <CoordCard
//                   key={pin.id}
//                   pin={pin}
//                   index={i}
//                   editing
//                   selected={editTarget === i}
//                   onSelect={() => setEditTarget(editTarget === i ? null : i)}
//                 />
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
"use client";

import { useCallback, useState, useEffect } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  useMap,
} from "@vis.gl/react-google-maps";
import { MapPin, Undo2, RotateCcw, Edit2, CheckCircle2 } from "lucide-react";

type Coord = { lat: number; lng: number };
type Pin = { id: number; coord: Coord };
type Mode = "picking" | "submitted";

const MAX = 4;
const LABELS = ["P1", "P2", "P3", "P4"];
const COLORS = ["#00a0ef", "#10b981", "#f59e0b", "#ef4444"];

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

export default function GeoCoordinatePicker() {
  const apiKey =  "AIzaSyBHMeEzVqW7_6l7ePVNZj4HToBJ1HB9xGA";

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