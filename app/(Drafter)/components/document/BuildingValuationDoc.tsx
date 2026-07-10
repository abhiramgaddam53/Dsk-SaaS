 
import { useState, useRef, useCallback } from "react";
import React from "react";
import { DocField, PageShell } from "../shared/FormFields";
import { FormData } from '@/app/(Drafter)/types/types';


// ── Shared table style helpers ────────────────────────────────────────────────
// const tblWrap = "rounded-[6px] border border-slate-400 overflow-hidden mb-4 bg-white";
// const tblClass = "min-w-full divide-y divide-slate-400 text-[11px]";
// const trClass = "divide-x divide-slate-400";
const thClass = "p-1 font-bold text-left text-gray-800 bg-[#f4f7fb] text-[11px]";
// const tdLabel = "p-2 font-bold bg-[#f4f7fb] text-gray-700 text-[11px] align-top";
// const tdValue = "p-2 text-[11px] align-top";
const tblWrap = "border border-black mb-2 bg-white";
const tblClass = "w-full border-collapse border border-black text-[10px]";
const trClass = "border-b border-black";
const tdLabel = "p-[3px] font-bold bg-gray-50 border-r border-black align-top";
const tdValue = "p-[3px] align-top";

// ── Static valuer header / footer ─────────────────────────────────────────────
function ValuerHeader() {
  return (
    <div className="flex justify-between items-start mb-4 border-b border-slate-300 pb-3">
      <div>
        <p className="text-[13px] font-bold text-blue-700">Er. Dhondi Sai Krishna</p>
        <p className="text-[10px] text-gray-600">M.Mgmt (IIT Bombay), B.E. Civil, LLB</p>
        <p className="text-[10px] font-bold text-blue-600">Approved Valuer &amp; Chartered Engineer</p>
        <p className="text-[10px] text-gray-600">A-29665 - Land &amp; Building</p>
        <p className="text-[10px] text-gray-600">AM-181753-4 Institute of Engineers (India)</p>
      </div>
      <div className="text-right">
        <p className="text-[10px] text-gray-600">H.No. 42-881/2/5/402, Kalinga Fort</p>
        <p className="text-[10px] text-gray-600">Road No. 4, MJ Colony, Moula Ali</p>
        <p className="text-[10px] text-gray-600">Hyderabad - 40</p>
        <p className="text-[11px] font-bold text-blue-700">8333 83 4428</p>
        <p className="text-[10px] text-gray-600">dhondisaikrishna@gmail.com</p>
      </div>
    </div>
  );
}

function ValuerFooter({ pageNum, total }: { pageNum: number; total: number }) {
  return (
    <div className="flex justify-between items-center mt-6 pt-2 border-t border-slate-300">
      <div className="flex items-center gap-2">
        {/* DSK seal placeholder */}
        <div className="w-12 h-12 rounded-full border-2 border-blue-700 flex items-center justify-center">
          <span className="text-[7px] font-bold text-blue-700 text-center leading-tight">DSK<br />A-29665</span>
        </div>
      </div>
      <p className="text-[9px] text-gray-500 text-center">
        This is a digitally signed report.<br />
        Physical signature is not required.<br />
        Authenticity may be verified through e-sign validation
      </p>
      <p className="text-[10px] text-gray-500">{pageNum} of {total}<br />9 UBI MET P Radha.xlsm/BV_DSK</p>
    </div>
  );
}

// ── Row helpers ───────────────────────────────────────────────────────────────
function LabelRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <tr className={trClass}>
      <td className={`${tdLabel} w-[45%]`}>{label}</td>
      <td className={tdValue}>{value}</td>
    </tr>
  );
}

function TwoColRow({
  label1, val1, label2, val2,
}: { label1: string; val1: React.ReactNode; label2: string; val2: React.ReactNode }) {
  return (
    <tr className={trClass}>
      <td className={`${tdLabel} w-[25%]`}>{label1}</td>
      <td className={`${tdValue} w-[25%]`}>{val1}</td>
      <td className={`${tdLabel} w-[25%]`}>{label2}</td>
      <td className={`${tdValue} w-[25%]`}>{val2}</td>
    </tr>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function BuildingValuationDoc({
  formData,
  handleChange,
  editMode,
  mapPhotos = [],
  sitePhotos = [],
}: {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  editMode: any;
  mapPhotos?: { url: string; label: string }[];
  sitePhotos?: { url: string; name: string }[];
}) {
  const F = (name: keyof FormData, inline = true) => (
    <DocField
      inline={inline}
      name={name}
      value={formData[name]}
      mode={editMode}
      onChange={handleChange}
    />
  );
  const FM = (name: keyof FormData) => (
    <DocField multiline name={name} value={formData[name]} mode={editMode} onChange={handleChange} />
  );
  const compoundWall =
  parseInt(formData.compoundWallRft || "0") *
  parseInt(formData.compoundWallRate || "0");
  return (
    <>
      {/* ════════════════════════════════════════════════════════════ PAGE 1 */}
      <PageShell>
        <ValuerHeader />

        {/* Title */}
        <div className="text-center mb-5">
          <h2 className="text-[14px] font-bold">Valuation Certificate</h2>
          <p className="text-[12px]">(Land and Building Valuation)</p>
        </div>

        {/* To / Date */}
        <div className={tblWrap}>
          <table className={tblClass}>
            <tbody className="divide-y divide-slate-400">
              <tr className={trClass}>
                <td className={`${tdLabel} w-[15%]`}>To</td>
                <td className={tdValue}>
                  <DocField inline name="toName" value={formData.toName} mode={editMode} onChange={handleChange} /><br />
                  Branch : <DocField inline name="branch" value={formData.branch} mode={editMode} onChange={handleChange} />
                </td>
                <td className={`${tdLabel} w-[10%]`}>Date:</td>
                <td className={`${tdValue} w-[20%]`}>{F("date")}</td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel}>Reference:</td>
                <td colSpan={3} className={tdValue}>
                  Pursuant to the Request from {F("toName")} Branch : {F("branch")} To ascertain present market value of the Existing Building
                </td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel}>Purpose of Valuation</td>
                <td colSpan={3} className={tdValue}>{F("purposeOfValuation")}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Owner block */}
        <div className={tblWrap}>
          <table className={tblClass}>
            <tbody className="divide-y divide-slate-400">
              <tr className={trClass}>
                <td className={`${tdLabel} w-[35%] align-middle`}>a. Name of the Owner of the Property</td>
                <td className={tdValue}>
                  <span className="font-bold">{F("ownerName")}</span><br />
                  {F("ownerRelation")} {F("ownerRelationName")}<br />
                  {F("ownerPhone")}
                </td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel}>b. Type of Property</td>
                <td className={tdValue}><span className="font-bold">{F("propertyType")}</span></td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel}>c. Location of the Property</td>
                <td className={tdValue}>
                  {F("propertyDescription")}<br />
                  {F("hNo")}<br />
                  Sy.No. {F("syNo")}, {F("road")}<br />
                  {F("city")}, {F("city")}<br />
                  {F("district")}<br />
                  {F("pinCode")}<br />
                  {F("landmark")}
                  <span className="ml-6 text-gray-500">PMR Considered</span>
                </td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel}>d. Extent of Site</td>
                <td className={tdValue}>
                  <span className="font-bold">{F("extentSqYds")}</span>&nbsp;&nbsp;
                  <span className="font-bold">Sq.Yds</span>&nbsp;&nbsp;@&nbsp;&nbsp;
                  <span className="font-bold">Rs.{F("landRatePerSqYd")} Rs/Sq.Yd</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-[11px] text-justify mb-3 leading-relaxed">
          Based upon the visual observations and also the particulars provided to me by the owner of the property, detailed valuation report has been furnished here in the following pages
        </p>
        <p className="text-[11px] text-justify mb-3 leading-relaxed">
          As a result of my appraisal and analysis, it is my considered opinion that
        </p>

        {/* Summary values */}
        <div className={tblWrap}>
          <table className={tblClass}>
            <tbody className="divide-y divide-slate-400">
              <tr className={trClass}>
                <td className={tdValue}>The Fair Market value of the above property as of {F("date")} is</td>
                <td className={`${tdValue} w-[25%] text-right font-bold`}>Rs. {F("fairMarketValue")}</td>
              </tr>
              <tr className={trClass}>
                <td className={`${tdValue} italic font-bold pl-6`}>{F("fairMarketValueWords")}</td>
                <td />
              </tr>
              <tr className={trClass}>
                <td className={tdValue}>The book value / Govt Guidelines value of the above property as of {F("date")} is</td>
                <td className={`${tdValue} w-[25%] text-right font-bold`}>Rs. {F("bookValue")}</td>
              </tr>
              <tr className={trClass}>
                <td className={`${tdValue} italic font-bold pl-6`}>{F("bookValueWords")}</td>
                <td />
              </tr>
              <tr className={trClass}>
                <td className={tdValue}>The Distress Market Value of the Said Property is</td>
                <td className={`${tdValue} w-[25%] text-right font-bold`}>Rs. {F("distressValue")}</td>
              </tr>
              <tr className={trClass}>
                <td className={`${tdValue} italic font-bold pl-6`}>{F("distressValueWords")}</td>
                <td />
              </tr>
              <tr className={trClass}>
                <td className={tdValue}>The Realisable Market Value of the Said Property is</td>
                <td className={`${tdValue} w-[25%] text-right font-bold`}>Rs. {F("realisableValue")}</td>
              </tr>
              <tr className={trClass}>
                <td className={`${tdValue} italic font-bold pl-6`}>{F("realisableValueWords")}</td>
                <td />
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-between mt-4">
          <div>
            <p className="text-[11px]">Place: {F("place")}</p>
            <p className="text-[11px]">Date: {F("date")}</p>
          </div>
          <div className="text-right">
            <p className="text-[11px] font-bold">Signature</p>
            <p className="text-[11px]">Approved Valuer</p>
          </div>
        </div>

        <ValuerFooter pageNum={1} total={19} />
      </PageShell>

      {/* ════════════════════════════════════════════════════════════ PAGE 2 */}
      <PageShell>
        

        {/* ANNEXURE 12 heading */}
        <div className="text-center mb-4">
          <p className="text-[11px] font-bold">ANNEXURE - 12</p>
          <p className="text-[12px] font-bold">VALUATION OF VACANT SITES/RESIDENTAL PLOT/COMMERCIAL SITE/ LAND REPORT ON VALUATION</p>
          <p className="text-[11px] font-bold">Union Bank of India : {F("branch")} Branch</p>
        </div>

        <div className="flex justify-between mb-2 text-[11px]">
          <span>Ref. No.</span>
          <span>Date: {F("date")}</span>
        </div>

        <p className="text-[12px] font-bold text-center mb-3 underline">PART A - BASIC DATA</p>

        <p className="text-[11px] font-bold mb-2">I. GENERAL</p>

        <div className={tblWrap}>
          <table className={tblClass}>
            <tbody className="divide-y divide-slate-400">
              <tr className={trClass}>
                <td className={`${tdLabel} w-[5%]`}>1</td>
                <td className={`${tdLabel} w-[40%]`}>Purpose of Valuation:</td>
                <td colSpan={2} className={tdValue}>{F("purposeOfValuation")}</td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel} rowSpan={2}>2</td>
                <td className={tdLabel}>a) Date of inspection</td>
                <td colSpan={2} className={tdValue}>{F("dateOfInspection")}</td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel}>b) Date on which the valuation is made</td>
                <td colSpan={2} className={tdValue}>{F("dateOfValuation")}</td>
              </tr>

              {/* Documents */}
              <tr className={trClass}>
                <td className={tdLabel} rowSpan={5}>3</td>
                <td className={tdLabel}>List of documents produced for perusal</td>
                <td className={`${tdLabel}`} colSpan={2}></td>
              </tr>
              <tr className="bg-[#f4f7fb] divide-x divide-slate-400 text-[11px]">
                <td className={`${thClass}`}>Description of Document</td>
                <td className={thClass}>Document No</td>
                <td className={thClass}>Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Original/Copy</td>
              </tr>
              <tr className={trClass}>
                <td className={tdValue}>{F("doc1Description")}</td>
                <td className={tdValue}>{F("doc1No")}</td>
                <td className={tdValue}>{F("doc1Date")} {F("doc1Copy")}</td>
              </tr>
              <tr className={trClass}>
                <td className={tdValue}>{F("doc2Description")}</td>
                <td className={tdValue}>{F("doc2No")}</td>
                <td className={tdValue}>{F("doc2Date")} {F("doc2Copy")}</td>
              </tr>
              <tr className={trClass}>
                <td className={tdValue}>{F("doc3Description")}</td>
                <td className={tdValue}>{F("doc3No")}</td>
                <td className={tdValue}>{F("doc3Date")} {F("doc3Copy")}</td>
              </tr>

              {/* Owner */}
              <tr className={trClass}>
                <td className={tdLabel}>4</td>
                <td className={tdLabel}>Name of the Owner(s) and his/their address with Phone no.</td>
                <td colSpan={2} className={tdValue}>
                  <span className="font-bold">{F("ownerName")}</span><br />
                  {F("ownerRelation")} {F("ownerRelationName")}<br />
                  {F("hNo")}<br />
                  <span className="font-bold">{F("road")}</span><br />
                  <span className="font-bold">{F("city")} Municipality</span><br />
                  <span className="font-bold">{F("district")}</span><br />
                  <span className="font-bold">{F("pinCode")}</span><br />
                  {F("ownerPhone")}
                </td>
              </tr>

              {/* Brief description */}
              <tr className={trClass}>
                <td className={tdLabel}>5</td>
                <td className={tdLabel}>Brief description of the property</td>
                <td colSpan={2} className={tdValue}>{FM("briefDescription")}</td>
              </tr>

              {/* Location */}
              <tr className={trClass}>
                <td className={tdLabel} rowSpan={7}>6</td>
                <td className={tdLabel}>Location of property</td>
                <td colSpan={2} className={tdValue}>{F("propertyDescription")}</td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel}>a) H.No.</td>
                <td colSpan={2} className={tdValue}>{F("hNo")}</td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel}>b) Name of Nagar / Layout</td>
                <td colSpan={2} className={tdValue}>{F("syNo")}</td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel}>c) S.F. No / T.S. No. / R.S. No.</td>
                <td colSpan={2} className={tdValue}>{F("road")}</td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel}>d) Village / Block</td>
                <td colSpan={2} className={tdValue}>{F("city")}</td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel}>e) Taluk / Ward</td>
                <td colSpan={2} className={tdValue}>{F("district")}</td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel}>f) Mandal / District / Municipality</td>
                <td colSpan={2} className={tdValue}>{F("pinCode")}</td>
              </tr>

              {/* Postal address */}
              <tr className={trClass}>
                <td className={tdLabel}>7</td>
                <td className={tdLabel}>Postal address of the property with pin code</td>
                <td colSpan={2} className={tdValue}>
                  {F("propertyDescription")}<br />
                  {F("hNo")}<br />
                  {F("syNo")}<br />
                  {F("road")}<br />
                  {F("city")}<br />
                  {F("district")}<br />
                  {F("pinCode")}
                </td>
              </tr>

              {/* Classification */}
              <tr className={trClass}>
                <td className={tdLabel} rowSpan={3}>8</td>
                <td className={tdLabel}>Residential Area</td>
                <td colSpan={2} className={tdValue}>{F("residentialArea")}</td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel}>Commercial Area</td>
                <td colSpan={2} className={tdValue}>{F("commercialArea")}</td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel}>Industrial Area</td>
                <td colSpan={2} className={tdValue}>{F("industrialArea")}</td>
              </tr>
              <tr className={trClass}>
              <td className={tdLabel} rowSpan={3}>9</td>
                <td className={tdLabel}>Classification of the area</td>
                <td colSpan={2} className={tdValue}></td>
              </tr>

              <tr className={trClass}>
               
                <td className={tdLabel}>i) High / Middle / Poor</td>
                <td colSpan={2} className={tdValue}>{F("classificationHighMiddlePoor")}</td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel}>ii) Urban / Semi Urban / Rural</td>
                <td colSpan={2} className={tdValue}>{F("urbanSemiUrbanRural")}</td>
              </tr>

              <tr className={trClass}>
                <td className={tdLabel}>10</td>
                <td className={tdLabel}>Coming under Corporation limit / Village Panchayat / Municipality</td>
                <td colSpan={2} className={tdValue}>{F("corporationVillageMunicipality")}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <ValuerFooter pageNum={2} total={19} />
      </PageShell>

      {/* ════════════════════════════════════════════════════════════ PAGE 3 */}
      <PageShell>
        {/* <ValuerHeader /> */}

        <div className={tblWrap}>
          <table className={tblClass}>
            <tbody className="divide-y divide-slate-400">
              {/* Govt enactment */}
              <tr className={trClass}>
                <td className={`${tdLabel} w-[5%]`}>11</td>
                <td className={`${tdLabel} w-[45%]`}>Whether covered under any State / Central Govt. enactment's (e.g., Urban Land Ceiling Act) or notified under agency area / scheduled area / cantonment area.</td>
                <td className={tdValue}>{F('stateOrCentralEnactment')} </td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel}>12</td>
                <td className={tdLabel}>In case it is an agricultural land, any conversion to house site plots is contemplated</td>
                <td className={tdValue}>{F('agriculturalLandContemplated')} </td>
              </tr>

              {/* Boundaries */}
              <tr className="bg-[#f4f7fb] divide-x divide-slate-400">
                <td className={thClass}>13</td>
                <td className={thClass}>Boundaries of the property</td>
                <td className={thClass}>As per the Deed</td>
                <td className={thClass}>As per Actuals</td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel}></td>
                <td className={tdLabel}>North</td>
                <td className={tdValue}>{F("northBoundaryDeed")}</td>
                <td className={tdValue}>{F("northBoundaryActual")}</td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel}></td>
                <td className={tdLabel}>South</td>
                <td className={tdValue}>{F("southBoundaryDeed")}</td>
                <td className={tdValue}>{F("southBoundaryActual")}</td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel}></td>
                <td className={tdLabel}>East</td>
                <td className={tdValue}>{F("eastBoundaryDeed")}</td>
                <td className={tdValue}>{F("eastBoundaryActual")}</td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel}></td>
                <td className={tdLabel}>West</td>
                <td className={tdValue}>{F("westBoundaryDeed")}</td>
                <td className={tdValue}>{F("westBoundaryActual")}</td>
              </tr>

              {/* Dimensions */}
              <tr className="bg-[#f4f7fb] divide-x divide-slate-400">
                <td className={thClass}>14.1</td>
                <td className={thClass}>Dimensions of the site</td>
                <td className={thClass}>A – As per title deed</td>
                <td className={thClass}>B – Actuals</td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel}></td>
                <td className={tdLabel}>North</td>
                <td className={tdValue}>{F("northDeedDim")}</td>
                <td className={tdValue}>{F("northActualDim")}</td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel}></td>
                <td className={tdLabel}>South</td>
                <td className={tdValue}>{F("southDeedDim")}</td>
                <td className={tdValue}>{F("southActualDim")}</td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel}></td>
                <td className={tdLabel}>East</td>
                <td className={tdValue}>{F("eastDeedDim")}</td>
                <td className={tdValue}>{F("eastActualDim")}</td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel}></td>
                <td className={tdLabel}>West</td>
                <td className={tdValue}>{F("westDeedDim")}</td>
                <td className={tdValue}>{F("westActualDim")}</td>
              </tr>

              {/* Coordinates */}
              <tr className={trClass}>
                <td className={tdLabel}>14.2</td>
                <td className={tdLabel}>Latitude, Longitude and Coordinates of the site</td>
                <td className={tdValue}>Latitude: {F("latitude")}</td>
                <td className={tdValue}>Longitude: {F("longitude")}</td>
              </tr>

              {/* Extent */}
              <tr className={trClass}>
                <td className={tdLabel}>15</td>
                <td className={tdLabel}>Extent of the site</td>
                <td className={tdValue}>180.00</td>
                <td className={tdValue}>{F("extentAsPerDeed")} Sq. Yds</td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel}>16</td>
                <td className={tdLabel}>Extent of the site considered for valuation (least of 8A & 8B)</td>
                <td colSpan={2} className={tdValue}>{F("extentForValuation")} Sq. Yds</td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel}>17</td>
                <td className={tdLabel}>Whether occupied by the owner / tenant? Rent received per month.</td>
                <td colSpan={2} className={tdValue}>{F("occupiedBy")}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* CHARACTERISTICS */}
        <p className="text-[11px] font-bold mb-2">II. CHARACTERSTICS OF THE SITE</p>
        <div className={tblWrap}>
          <table className={tblClass}>
            <tbody className="divide-y divide-slate-400">
              <LabelRow label="1 What is the classification of the locality?" value={F("localityClassification")} />
              <LabelRow label="2 Development of surrounding areas" value={FM("surroundingDevelopment")} />
              <LabelRow label="3 Possibility of frequent flooding / submerging" value={FM("flooding")} />
              <LabelRow label="4 Accessibility to the Civic amenities like school, Hospital, Bus Stop, Market etc." value={FM("civicAmenities")} />
              <LabelRow label="5 Level of land with topographical conditions." value={F("landLevel")} />
              <LabelRow label="6 Shape of land" value={F("shapeOfLand")} />
              <LabelRow label="7 Type of use to which it can be put" value={F("typeOfUse")} />
              <LabelRow label="8 Any usage restriction" value={F("usageRestriction")} />
              <LabelRow label="9 Is plot in town planning approved layout?" value={FM("townPlanningApproved")} />
              <LabelRow label="10 Corner plot or intermittent plot?" value={FM("cornerOrIntermittent")} />
              <LabelRow label="11 Road facilities" value={F("roadFacilities")} />
              <LabelRow label="12 Type of road available at present" value={F("typeOfRoad")} />
              {/* <LabelRow label="13 Width of the road" value={F("widthOfRoad")} />
              <LabelRow label="14 Is it a Land-Locked land?" value={FM("landLocked")} />
              <LabelRow label="15 Water potentiality" value={FM("waterPotentiality")} />
              <LabelRow label="16 Underground sewerage system" value={FM("undergroundSewerage")} />
              <LabelRow label="17 Is power supply available at site?" value={FM("powerSupply")} />
              <tr className={trClass}>
                <td className={`${tdLabel} w-[45%]`}>18 Advantages of the site</td>
                <td className={tdValue}>
                  <p>1. {FM("advantagesOfSite")}</p>
                </td>
              </tr>
              <tr className={trClass}>
                <td className={`${tdLabel} w-[45%]`}>19 General remarks</td>
                <td className={tdValue}>{FM("generalRemarks")}</td>
              </tr> */}
            </tbody>
          </table>
        </div>

        <ValuerFooter pageNum={3} total={19} />
      </PageShell>

      {/* ════════════════════════════════════════════════════════════ PAGE 4 */}
      <PageShell>
        {/* <ValuerHeader /> */}
        <div className={tblWrap} >
<table className={tblClass}>
  <tbody className="divide-y divide-slate-400">
  <LabelRow label="13 Width of the road" value={F("widthOfRoad")} />
              <LabelRow label="14 Is it a Land-Locked land?" value={FM("landLocked")} />
              <LabelRow label="15 Water potentiality" value={FM("waterPotentiality")} />
              <LabelRow label="16 Underground sewerage system" value={FM("undergroundSewerage")} />
              <LabelRow label="17 Is power supply available at site?" value={FM("powerSupply")} />
              <tr className={trClass}>
                <td className={`${tdLabel} w-[45%]`}>18 Advantages of the site</td>
                <td className={tdValue}>
                  <p>1. {FM("advantagesOfSite")}</p>
                </td>
              </tr>
              <tr className={trClass}>
                <td className={`${tdLabel} w-[45%]`}>19 General remarks</td>
                <td className={tdValue}>{FM("generalRemarks")}</td>
              </tr>

  </tbody>
</table>
</div>
        <p className="text-[12px] font-bold text-center mb-3 underline">III. VALUATION</p>
        <p className="text-[12px] font-bold text-center mb-3">PART A - Valuation of Land</p>

        <div className={tblWrap}>
          <table className={tblClass}>
            <tbody className="divide-y divide-slate-400">
              <tr className={trClass}>
                <td className={`${tdLabel} w-[5%]`}>1</td>
                <td className={`${tdLabel} w-[40%]`}>Size of plot – North &amp; South</td>
                <td colSpan={2} className={tdValue}>
                  N : {F("northActualDim")} , S : {F("southActualDim")}
                </td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel}></td>
                <td className={tdLabel}>East &amp; West</td>
                <td colSpan={2} className={tdValue}>E : {F("eastActualDim")} , W : {F("westActualDim")}</td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel}>2</td>
                <td className={tdLabel}>Total extent of the plot</td>
                <td colSpan={2} className={tdValue}><span className="font-bold">{F("extentForValuation")}</span> Sq. Yds</td>
              </tr>

              {/* GLR */}
              <tr className="bg-[#f4f7fb] divide-x divide-slate-400">
                <td colSpan={4} className={thClass}>A – Value on adopting GLR (Guideline Rate)</td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel}>(i)</td>
                <td className={tdLabel}>Guideline rate obtained from the Registrar's Office</td>
                <td className={tdValue}>Rs. {F("guidelineRate")}</td>
                <td className={tdValue}>/Sq. Yd</td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel}>(ii)</td>
                <td className={tdLabel}>Value of Land by adopting GLR &nbsp;&nbsp; {F("extentForValuation")} Sq.Yds x {F("guidelineRate")} Rs/Sq.Yd</td>
                <td colSpan={2} className={`${tdValue} text-right font-bold`}>Rs. {F("landValueGLR")}</td>
              </tr>

              {/* PMR */}
              <tr className="bg-[#f4f7fb] divide-x divide-slate-400">
                <td colSpan={4} className={thClass}>B – Value by adopting PMR (Prevailing Market Rate)</td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel}>(i)</td>
                <td className={tdLabel}>Prevailing market rate (Along with details/reference of at least two latest deals/transactions)</td>
                <td className={tdValue}>{F("prevailingMarketRateRange")}</td>
                <td className={tdValue}>/Sq. Yd</td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel}>(ii)</td>
                <td className={tdLabel}>Unit rate adopted in this valuation after considering the characteristics of the subject plot</td>
                <td className={tdValue}>Rs. {F("unitRatePMR")}</td>
                <td className={tdValue}>/Sq. Yd</td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel}>(iii)</td>
                <td className={tdLabel}>Value of Land by adopting PMR &nbsp;&nbsp; {F("extentForValuation")} Sq.Yds x {F("unitRatePMR")} Rs/Sq.Yd</td>
                <td colSpan={2} className={`${tdValue} text-right font-bold`}>Rs. {F("landValuePMR")}</td>
              </tr>

              {/* Extra items */}
              <tr className="bg-[#f4f7fb] divide-x divide-slate-400">
                <td colSpan={4} className={thClass}>C – Extra items</td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel}>(i)</td>
                <td className={tdLabel}>Compound wall/fencing</td>
                <td colSpan={2} className={tdValue}> {F("CompoundWall")} </td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel}>(ii)</td>
                <td className={tdLabel}>Gate</td>
                <td colSpan={2} className={tdValue}>{F("Gate")} </td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel}>(iii)</td>
                <td className={tdLabel}>Power supply</td>
                <td colSpan={2} className={tdValue}> {F("power")} </td>
              </tr>
            </tbody>
          </table>
        </div>

        <ValuerFooter pageNum={4} total={19} />
      </PageShell>

      {/* ════════════════════════════════════════════════════════════ PAGE 5 */}
      <PageShell>
        {/* <ValuerHeader /> */}

        <p className="text-[12px] font-bold text-center mb-3">PART B - Valuation of Building</p>

        <p className="text-[11px] font-bold mb-2">1 Technical details of the building</p>
        <div className={tblWrap}>
          <table className={tblClass}>
            <tbody className="divide-y divide-slate-400">
              <LabelRow label="a) Type of Building" value={FM("typeOfBuilding")} />
              <LabelRow label="b) Type of construction" value={FM("typeOfConstruction")} />
              <LabelRow label="   Quality of construction" value={FM("qualityOfConstruction")} />
              <LabelRow label="   Appearance of Building" value={F("appearanceOfBuilding")} />
              <LabelRow label="c) Year of Construction" value={F("yearOfConstruction")} />
              <LabelRow label="   Age of Building" value={F("ageOfBuilding")} />
              <LabelRow label="   Expected future life of building" value={F("expectedFutureLife")} />
              <LabelRow label="   Total life of Building" value={F("totalLifeOfBuilding")} />
              <LabelRow label="d) Number of floors and height of each floor including basement, if any" value={FM("numberOfFloorsHeight")} />
            </tbody>
          </table>
        </div>

        {/* Plinth area table */}
        <p className="text-[11px] font-bold mb-1">e) Plinth Area &nbsp;<span className="font-normal">As per IS 3861-1975</span></p>
        <div className={tblWrap}>
          <table className={tblClass}>
            <thead>
              <tr className="bg-[#f4f7fb] divide-x divide-slate-400">
                <th className={thClass}>Floor</th>
                <th className={thClass}>Year of Construction</th>
                <th className={thClass}>Roof of</th>
                <th className={thClass}>Main Portion A</th>
                <th className={thClass}>Cantilevered Portion B</th>
                <th className={thClass}>Total A+50%B</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-400">
              <tr className={trClass}>
                <td className={tdValue}>Ground Floor</td>
                <td className={tdValue}>{F("groundFloorYear")}</td>
                <td className={tdValue}></td>
                <td className={tdValue}>{F("groundFloorMainArea")}</td>
                <td className={tdValue}>{F("groundFloorCantArea")}</td>
                <td className={tdValue}>{F("groundFloorTotal")}</td>
              </tr>
              <tr className={trClass}>
                <td className="p-2 font-bold" colSpan={5}>Total</td>
                <td className={tdValue}>{F("groundFloorTotal")}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Maintenance */}
        <div className={tblWrap}>
          <table className={tblClass}>
            <tbody className="divide-y divide-slate-400">
              <tr className={trClass}>
                <td className={`${tdLabel} w-[45%]`} rowSpan={2}>f) Maintenance / Condition of the Building</td>
                <td className={`${tdLabel} w-[20%]`}>i) Exterior:</td>
                <td className={tdValue}>{FM("maintenanceExterior")}</td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel}>ii) Interior:</td>
                <td className={tdValue}>{FM("maintenanceInterior")}</td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel} rowSpan={3}>g) Drawing Approval</td>
                <td className={tdLabel}>Date of issue and validity of the layout of approved map / plan</td>
                <td className={tdValue}>{FM("drawingApprovalDate")}</td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel}>h) Approved Map/Plan issuing authority</td>
                <td className={tdValue}>{FM("approvedMapAuthority")}</td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel}>i) Whether genuineness or authentic of approved map/plan is verified?</td>
                <td className={tdValue}>{FM("genuinenessVerified")}</td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel}>j) Any other comments by our empanelled valuer on authentic of approved plan?</td>
                <td colSpan={2} className={tdValue}>{FM("anyOtherComments")}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-[10px] text-gray-600 mb-3">
          Value of building is estimated by adopting suitable unit plinth area rate depending upon the specifications.
          Depreciation is calculated by straight-line method assuming a salvage value of 10%
        </p>

        {/* Specifications */}
        <p className="text-[11px] font-bold mb-2">Specifications of construction (floor-wise) in respect of</p>
        <div className={tblWrap}>
          <table className={tblClass}>
            <thead>
              <tr className="bg-[#f4f7fb] divide-x divide-slate-400">
                <th className={`${thClass} w-[5%]`}>S. No.</th>
                <th className={thClass}>Description</th>
                <th className={thClass}>Ground floor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-400">
              <tr className={trClass}>
                <td className={tdLabel}>1</td>
                <td className={tdLabel}>Foundation</td>
                <td className={tdValue}>{FM("specFoundation")}</td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel}>2</td>
                <td className={tdLabel}>Basement</td>
                <td className={tdValue}>{FM("specBasement")}</td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel}>3</td>
                <td className={tdLabel}>Super structure</td>
                <td className={tdValue}>{FM("specSuperStructure")}</td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel}>4</td>
                <td className={tdLabel}>Joinery / Doors &amp; Windows</td>
                <td className={tdValue}>{FM("specJoinery")}</td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel}>5</td>
                <td className={tdLabel}>RCC Works</td>
                <td className={tdValue}>{FM("specRCCWorks")}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <ValuerFooter pageNum={5} total={19} />
      </PageShell>

      {/* ════════════════════════════════════════════════════════════ PAGE 6 */}
      <PageShell>
        {/* <ValuerHeader /> */}

        <div className={tblWrap}>
          <table className={tblClass}>
            <tbody className="divide-y divide-slate-400">
              <tr className={trClass}>
                <td className={`${tdLabel} w-[5%]`}>6</td>
                <td className={`${tdLabel} w-[35%]`}>Plastering</td>
                <td className={tdValue}>{FM("specPlastering")}</td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel}>7</td>
                <td className={tdLabel}>Flooring, Skirting, Dadoing</td>
                <td className={tdValue}>{FM("specFlooring")}</td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel}>8</td>
                <td className={tdLabel}>Special finish as marble, granite, wooden paneling, grills, etc.</td>
                <td className={tdValue}>{F("specSpecialFinish")}</td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel}>9</td>
                <td className={tdLabel}>Roofing including weather proof course</td>
                <td className={tdValue}>{FM("specRoofing")}</td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel}>10</td>
                <td className={tdLabel}>Drainage</td>
                <td className={tdValue}>{F("specDrainage")}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Compound wall */}
        <div className={tblWrap}>
          <table className={tblClass}>
            <tbody className="divide-y divide-slate-400">
              <tr className={trClass}>
                <td className={`${tdLabel} w-[5%]`} rowSpan={4}>2</td>
                <td className={`${tdLabel} w-[35%]`}>Compound Wall (R.ft)</td>
                <td className={tdValue}>{F("compWallBuildingRft")} Rs.{F("compWallBuildingRate")} Rs/rft</td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel}>Height</td>
                <td className={tdValue}>{F("compWallBuildingHeight")}</td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel}>Length</td>
                <td className={tdValue}>{F("compWallBuildingLength")}</td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel}>Type of construction</td>
                <td className={tdValue}>{FM("compWallBuildingType")}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Electrical */}
        <div className={tblWrap}>
          <table className={tblClass}>
            <tbody className="divide-y divide-slate-400">
              <tr className={trClass}>
                <td className={`${tdLabel} w-[5%]`} rowSpan={7}>3</td>
                <td className={`${tdLabel} w-[35%]`}>Electrical Installation</td>
                <td className={tdValue}></td>
              </tr>
              <tr className={trClass}><td className={tdLabel}>a) Type of wiring</td><td className={tdValue}>{FM("typeOfWiring")}</td></tr>
              <tr className={trClass}><td className={tdLabel}>b) Class of fittings</td><td className={tdValue}>{FM("classOfFittings")}</td></tr>
              <tr className={trClass}><td className={tdLabel}>c) Number of light points</td><td className={tdValue}>{FM("numberOfLightPoints")}</td></tr>
              <tr className={trClass}><td className={tdLabel}>d) Fan points</td><td className={tdValue}>{F("fanPoints")}</td></tr>
              <tr className={trClass}><td className={tdLabel}>e) Spare plug points</td><td className={tdValue}>{F("sparePlugPoints")}</td></tr>
              <tr className={trClass}><td className={tdLabel}>f) Any other item</td><td className={tdValue}>{FM("anyOtherElectrical")}</td></tr>
              <tr className={trClass}>
                <td className={tdLabel}></td>
                <td className={tdLabel}>Total Lumsum @ 5% of Civil Works (Part C)</td>
                <td className={`${tdValue} text-right font-bold`}>Rs.{F("electricalLumpsum")}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Plumbing */}
        <div className={tblWrap}>
          <table className={tblClass}>
            <tbody className="divide-y divide-slate-400">
              <tr className={trClass}>
                <td className={`${tdLabel} w-[5%]`} rowSpan={7}>4</td>
                <td className={`${tdLabel} w-[35%]`}>Plumbing Installation</td>
                <td className={tdValue}></td>
              </tr>
              <tr className={trClass}><td className={tdLabel}>a) No. of water closets and their type</td><td className={tdValue}>{FM("waterClosets")}</td></tr>
              <tr className={trClass}><td className={tdLabel}>b) No. of wash basins</td><td className={tdValue}>{F("washBasins")}</td></tr>
              <tr className={trClass}><td className={tdLabel}>c) No. of urinals</td><td className={tdValue}>{F("urinals")}</td></tr>
              <tr className={trClass}><td className={tdLabel}>d) No. of bath tubs</td><td className={tdValue}>{F("bathTubs")}</td></tr>
              <tr className={trClass}><td className={tdLabel}>e) Water meters, taps etc.</td><td className={tdValue}>{F("waterMeters")}</td></tr>
              <tr className={trClass}><td className={tdLabel}>f) Any other fixtures</td><td className={tdValue}></td></tr>
              <tr className={trClass}>
                <td className={tdLabel}></td>
                <td className={tdLabel}>Total Lumsum @ 5% of Civil Works (Part C)</td>
                <td className={`${tdValue} text-right font-bold`}>Rs.{F("plumbingLumpsum")}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Details of Valuation */}
        <p className="text-[11px] font-bold text-center mb-2">Details of Valuation</p>
        <div className={tblWrap}>
          <table className={tblClass}>
            <thead>
              <tr className="bg-[#f4f7fb] divide-x divide-slate-400">
                <th className={thClass}>Particulars of item</th>
                <th className={thClass}>Plinth Area</th>
                <th className={thClass}>Estimated replacement rate of construction Rs./Sq.ft</th>
                <th className={thClass}>Age of Building</th>
                <th className={thClass}>Replacement cost Rs.</th>
                <th className={thClass}>Net Value after depreciations Rs.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-400">
              <tr className={trClass}>
                <td className={tdValue}>Ground floor (Roof Height 11')</td>
                <td className={tdValue}>{F("groundFloorPlinthArea")}</td>
                <td className={tdValue}>{F("groundFloorRate")}</td>
                <td className={tdValue}>{F("groundFloorAge")}</td>
                <td className={tdValue}>Rs. {F("groundFloorReplacementCost")}</td>
                <td className={tdValue}></td>
              </tr>
              <tr className={trClass}>
                <td className={`${tdValue} pl-4`}>Depreciation (-)</td>
                <td className={tdValue}></td>
                <td className={tdValue}></td>
                <td className={tdValue}>(-)</td>
                <td className={tdValue}>Rs. {F("ageOfBuilding") || F("groundFloorAge") }</td>
                <td className={tdValue}>Rs. {F("groundFloorNetValue")}</td>
              </tr>
              <tr className={trClass}>
                <td className="p-2 font-bold" colSpan={5}>Total</td>
                <td className={`${tdValue} font-bold`}>Rs. {F("buildingTotal")}</td>
              </tr>
            </tbody>
          </table>
        </div>


        {/* PART C – Extra Items */}
        <p className="text-[14px] font-bold text-center mt-3 mb-1">PART C – EXTRA ITEMS    </p>
        <p className="text-[10px] text-center text-gray-600 mb-1">(Value after Depreciation)</p>
        <p className="text-[10px] text-right text-gray-600 mb-1">(Amount in Rs.)</p>


        <div className={tblWrap}>
          <table className={tblClass}>
            <tbody className="divide-y divide-slate-400">
              {[
                ["1", "Portico", "portico"],
                ["2", "Ornamental front/pooja door", "ornamentalDoor"],
                ["3", "Sit out / Verandah with steel grills", "sitOutVerandah"],
                ["5", "Overhead water tank", "overheadWaterTank"], 
                ["4", "Extra steel / collapsible gates", "extraGates"],
              ].map(([num, label, field]) => (
                <tr key={field} className={trClass}>
                  <td className={`${tdLabel} w-[5%]`}>{num}</td>
                  <td className={`${tdLabel} w-[60%]`}>{label}</td>
                  <td className={`${tdValue} text-right`}>
                    {formData[field as keyof FormData]
                      ? `Rs.${formData[field as keyof FormData]}`
                      : ""}
                  </td>
                </tr>
              ))}
              <tr className={trClass}>
                <td colSpan={2} className="p-2 font-bold bg-[#f4f7fb]">Total</td>
                <td className={`${tdValue} text-right font-bold`}>Rs.{F("extraItemsTotal")}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <ValuerFooter pageNum={6} total={19} />
      </PageShell>

      {/* ════════════════════════════════════════════════════════════ PAGE 7 */}
      <PageShell>
        {/* <ValuerHeader /> */}

        {/* PART C – Extra Items */}
        {/* <p className="text-[12px] font-bold text-center mb-1">PART C – EXTRA ITEMS    </p> */}
        {/* <p className="text-[10px] text-center text-gray-600 mb-3">(Value after Depreciation)</p> */}
        {/* <p className="text-[10px] text-right text-gray-600 mb-1">(Amount in Rs.)</p> */}

        {/* <div className={tblWrap}>
          <table className={tblClass}>
            <tbody className="divide-y divide-slate-400">
              {[
                ["1", "Portico", "portico"],
                ["2", "Ornamental front/pooja door", "ornamentalDoor"],
                ["3", "Sit out / Verandah with steel grills", "sitOutVerandah"],
                ["5", "Overhead water tank", "overheadWaterTank"], 
                ["4", "Extra steel / collapsible gates", "extraGates"],
              ].map(([num, label, field]) => (
                <tr key={field} className={trClass}>
                  <td className={`${tdLabel} w-[5%]`}>{num}</td>
                  <td className={`${tdLabel} w-[60%]`}>{label}</td>
                  <td className={`${tdValue} text-right`}>
                    {formData[field as keyof FormData]
                      ? `Rs.${formData[field as keyof FormData]}`
                      : ""}
                  </td>
                </tr>
              ))}
              <tr className={trClass}>
                <td colSpan={2} className="p-2 font-bold bg-[#f4f7fb]">Total</td>
                <td className={`${tdValue} text-right font-bold`}>Rs.{F("extraItemsTotal")}</td>
              </tr>
            </tbody>
          </table>
        </div> */}

        {/* PART D – Amenities */}
        <p className="text-[12px] font-bold text-center mb-3">PART D – AMENITIES</p>
        <div className={tblWrap}>
          <table className={tblClass}>
            <tbody className="divide-y divide-slate-400">
              {[
                ["1", "Wardrobes, Show cases, wooden cubboards", "wardrobes"],
                ["2", "Glazed tiles", "glazedTiles"],
                ["3", "Extra sinks and bath tub", "extraSinksBathtub"],
                ["4", "Marble / ceramic tiles flooring", "marbleCeramicTiles"],
                ["5", "Interior decorations", "interiorDecorations"],
                ["6", "Architectural elevation works", "architecturalElevation"],
                ["7", "Panelling works", "panellingWorks"],
                ["8", "Aluminium works", "aluminiumWorks"],
                ["9", "Aluminium hand rails", "aluminiumHandRails"],
              ].map(([num, label, field]) => (
                <tr key={field} className={trClass}>
                  <td className={`${tdLabel} w-[5%]`}>{num}</td>
                  <td className={`${tdLabel} w-[60%]`}>{label}</td>
                  <td className={`${tdValue} text-right`}>
                    {formData[field as keyof FormData]
                      ? `Rs.${formData[field as keyof FormData]}`
                      : ""}
                  </td>
                </tr>
              ))}
              <tr className={trClass}>
                <td className={`${tdLabel} w-[5%]`}>10</td>
                <td className={`${tdLabel} w-[60%]`}>False ceiling works</td>
                <td className={`${tdValue} text-right`}>
                  {F("falseCeilingArea")} &nbsp; Rs.{F("falseCeilingRate")} Rs/Sq.ft &nbsp; Rs.{F("falseCeilingValue")}
                </td>
              </tr>
              <tr className={trClass}>
                <td colSpan={2} className="p-2 font-bold bg-[#f4f7fb]">Total</td>
                <td className={`${tdValue} text-right font-bold`}>Rs. {F("amenitiesTotal")}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* PART E – Miscellaneous */}
        <p className="text-[12px] font-bold text-center mb-3">PART E – MISCELLANEOUS</p>
        <div className={tblWrap}>
          <table className={tblClass}>
            <tbody className="divide-y divide-slate-400">
              {[
                ["1", "Separate lumber room", "separateLumberRoom"],
                ["2", "Separate toilet room", "separateToiletRoom"],
                ["3", "Separate water tank / sump", "separateWaterTank"],
                ["4", "Trees, gardening", "treesGardening"],
              ].map(([num, label, field]) => (
                <tr key={field} className={trClass}>
                  <td className={`${tdLabel} w-[5%]`}>{num}</td>
                  <td className={`${tdLabel} w-[60%]`}>{label}</td>
                  <td className={`${tdValue} text-right`}>
                    {formData[field as keyof FormData]
                      ? `Rs.${formData[field as keyof FormData]}`
                      : ""}
                  </td>
                </tr>
              ))}
              <tr className={trClass}>
                <td colSpan={2} className="p-2 font-bold bg-[#f4f7fb]">Total</td>
                <td className={`${tdValue} text-right font-bold`}>Rs.{F("miscTotal")}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* PART E – Services */}
        <p className="text-[12px] font-bold text-center mb-3">PART E – SERVICES (Value after depreciation)</p>
        <div className={tblWrap}>
          <table className={tblClass}>
            <tbody className="divide-y divide-slate-400">
              <tr className={trClass}>
                <td className={`${tdLabel} w-[5%]`} rowSpan={7}>1</td>
                <td className={`${tdLabel} w-[60%]`}>Water supply arrangements</td>
                <td className={tdValue}></td>
              </tr>
              {[
                ["Open Well", "openWell"],
                ["Deep Bore", "deepBore"],
                ["Hand Pump", "handPump"],
                ["Motor", "motor"],
                ["Corporation Tap", "corporationTap"],
                ["Under ground level sump", "underGroundSump"],
              ].map(([label, field]) => (
                <tr key={field} className={trClass}>
                  <td className={tdLabel}>{label}</td>
                  <td className={`${tdValue} text-right`}>
                    {formData[field as keyof FormData]
                      ? `Rs.${formData[field as keyof FormData]}`
                      : ""}
                  </td>
                </tr>
              ))}
              <tr className={trClass}>
              <td className={tdLabel}> </td>
                <td className={`${tdLabel } text-sm  `} >Over head water tank</td>
                <td className={`${tdValue} text-right`}>
                  {formData.overheadTankServices ? `Rs.${formData.overheadTankServices}` : ""}
                </td>
              </tr>
              <tr className={trClass}>
                <td className={`${tdLabel} w-[5%]`} rowSpan={2}>2</td>
                <td className={tdLabel}>Drainage Arrangements – Septic Tank</td>
                <td className={`${tdValue} text-right`}>Rs.{F("septicTank")}</td>
              </tr>
              <tr className={trClass}>
                <td className={tdLabel}>Underground Sewerage</td>
                <td className={tdValue}>{F("undergroundSewage")}</td>
              </tr>
              <tr className={trClass}>
                <td className={`${tdLabel} w-[5%]`} rowSpan={4}>3</td>
                <td className={tdLabel}>Compound Wall (R.ft)</td>
                <td className={`${tdValue} text-right`}>{F("compoundWallRft") } ft &nbsp; Rs.{F("compoundWallRate")} Rs/rft &nbsp; Rs. { compoundWall   }</td>
              </tr>
              <tr className={trClass}><td className={tdLabel}>Height</td><td className={tdValue}>{F("compoundWallHeight")}</td></tr>
              <tr className={trClass}><td className={tdLabel}>Length</td><td className={tdValue}>{F("compoundWallLength")} ft</td></tr>
              <tr className={trClass}><td className={tdLabel}>Type of construction</td><td className={tdValue}>{FM("compoundWallType")}</td></tr>
              <tr className={trClass}>
                <td className={`${tdLabel} w-[5%]`}>4</td>
                <td className={tdLabel}>Pavements (Sq.ft)</td>
                <td className={`${tdValue} text-right`}>{F("pavementsSqft")} &nbsp; Rs.{F("pavementsRate")} Rs/Sq.ft &nbsp; Rs.{F("pavementsValue")}</td>
              </tr>
              <tr className={trClass}>
                <td colSpan={2} className="p-2 font-bold bg-[#f4f7fb] text-right">Total</td>
                <td className={`${tdValue} text-right font-bold`}>Rs. {F("servicesTotal")}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <ValuerFooter pageNum={7} total={19} />
      </PageShell>

      {/* ════════════════════════════════════════════════════════════ PAGE 8 */}
      <PageShell>
        {/* <ValuerHeader /> */}

        <p className="text-[12px] font-bold text-center mb-3">PART F - ABSTRACT VALUE</p>
        <p className="text-[11px] font-bold mb-2">Total abstract of the entire property</p>

        <div className={tblWrap}>
          <table className={tblClass}>
            <thead>
              <tr className="bg-[#f4f7fb] divide-x divide-slate-400">
                <th className={thClass}>Part</th>
                <th className={thClass}>Description</th>
                <th className={thClass} colSpan={2}>Value of adopting</th>
              </tr>
              <tr className="bg-[#f4f7fb] divide-x divide-slate-400">
                <th className={thClass}></th>
                <th className={thClass}></th>
                <th className={thClass}>GLR</th>
                <th className={thClass}>PMR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-400">
              <tr className={trClass}>
                <td className={tdValue}>A</td>
                <td className={tdValue}>Land</td>
                <td className={`${tdValue} text-right`}>Rs. {F("landGLR")}</td>
                <td className={`${tdValue} text-right`}>Rs. {F("landPMR")}</td>
              </tr>
              <tr className={trClass}>
                <td className={tdValue}>B</td>
                <td className={tdValue}>Building</td>
                <td className={`${tdValue} text-right`}>Rs. {F("buildingGLR")}</td>
                <td className={`${tdValue} text-right`}>Rs. {F("buildingPMR")}</td>
              </tr>
              <tr className={trClass}>
                <td className={tdValue}>C</td>
                <td className={tdValue}>Extra Items</td>
                <td className={tdValue}></td>
                <td className={`${tdValue} text-right`}>Rs.{F("extraItemsAbstract")}</td>
              </tr>
              <tr className={trClass}>
                <td className={tdValue}>D</td>
                <td className={tdValue}>Amenities</td>
                <td className={tdValue}></td>
                <td className={`${tdValue} text-right`}>Rs. {F("amenitiesAbstract")}</td>
              </tr>
              <tr className={trClass}>
                <td className={tdValue}>E</td>
                <td className={tdValue}>Miscellaneous</td>
                <td className={tdValue}></td>
                <td className={`${tdValue} text-right`}>Rs.{F("miscAbstract")}</td>
              </tr>
              <tr className={trClass}>
                <td className={tdValue}>F</td>
                <td className={tdValue}>Services</td>
                <td className={tdValue}></td>
                <td className={`${tdValue} text-right`}>Rs. {F("servicesAbstract")}</td>
              </tr>
              <tr className={trClass}>
                <td colSpan={2} className="p-2 font-bold bg-[#f4f7fb]">Total</td>
                <td className={`${tdValue} text-right font-bold`}>Rs. {F("totalGLR")}</td>
                <td className={`${tdValue} text-right font-bold`}>Rs. {F("totalPMR")}</td>
              </tr>
              <tr className={trClass}>
                <td colSpan={2} className="p-2 font-bold bg-[#f4f7fb]">Say</td>
                <td className={`${tdValue} text-right font-bold`}>Rs. {F("bookValue")}</td>
                <td className={`${tdValue} text-right font-bold`}>Rs. {F("fairMarketValue")}</td>
              </tr>
              <tr className={trClass}>
                <td colSpan={3} className="p-2 font-bold bg-[#f4f7fb]">Present market value (F)</td>
                <td className={`${tdValue} text-right font-bold`}>Rs. {F("presentMarketValue")}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ANY OTHER DETAILS */}
        <p className="text-[11px] font-bold mt-4 mb-2">ANY OTHER DETAILS:</p>
        <p className="text-[10px] text-gray-600 mb-3 text-justify">
          (Valuation: Here the approved valuer should discuss in detail his approach to valuation of property and Indicate how the value has been arrived at, supported by necessary calculations. Also such aspects as i) Saleability ii) likely rental values in future and iii) any likely income it may generate may be discussed).
        </p>

        <p className="text-[11px] text-justify mb-2 leading-relaxed">
          As a result of my appraisal and analysis it is my considered opinion that the present fair market value of the above property in the prevailing condition with aforesaid specifications as of {F("date")} is
          <span className="font-bold float-right">Rs. {F("fairMarketValue")}</span>
        </p>
        <p className="text-[11px] italic font-bold mb-4">{F("fairMarketValueWords")}</p>

        <p className="text-[11px] text-justify mb-1 leading-relaxed">
          The book Value of the above Property as of {F("date")} is <span className="font-bold float-right">Rs. {F("bookValue")}</span>
        </p>
        <p className="text-[11px] italic font-bold mb-4">{F("bookValueWords")}</p>

        <p className="text-[11px] text-justify mb-1 leading-relaxed">
          The distress value of the above property is <span className="font-bold float-right">Rs. {F("distressValue")}</span>
        </p>
        <p className="text-[11px] italic font-bold mb-4">{F("distressValueWords")}</p>

        <p className="text-[11px] text-justify mb-1 leading-relaxed">
          The Realizable value of the above property is <span className="font-bold float-right">Rs. {F("realisableValue")}</span>
        </p>
        <p className="text-[11px] italic font-bold mb-4">{F("realisableValueWords")}</p>

        <div className="flex justify-between mt-6">
          <div>
            <p className="text-[11px]">Place: {F("place")}</p>
            <p className="text-[11px]">Date: {F("date")}</p>
          </div>
          <div className="text-right">
            <p className="text-[11px] font-bold">Signature</p>
            <p className="text-[11px]">Name and official seal of the</p>
            <p className="text-[11px]">Approved Valuer</p>
          </div>
        </div>

        <div className="mt-4 text-[10px] text-gray-600">
          <p>Encl: 1 Declaration from the valuer in Format (Annexure - 6)</p>
          <p className="ml-6">2 Model Code of conduct for valuer (Annexure - 7)</p>
        </div>

        <ValuerFooter pageNum={8} total={19} />
      </PageShell>

      {/* ════════════════════════════════════════════════════════════ PAGE 9 */}
      <PageShell>
        {/* <ValuerHeader /> */}

        <p className="text-[12px] font-bold text-center mb-3">PART G - CERTIFICATE</p>

        <ol className="list-decimal pl-5 space-y-3 text-[11px] text-justify">
          <li>
            It is hereby certified that in my opinion
            <ol className="list-none pl-4 space-y-2 mt-1">
              <li>
                i) The Present market value of the property discussed in the report (above) by adopting prevailing market rate for land and Building is Rs.{F("presentMarketValue")}/-
              </li>
              <li>
                ii) The forced sale value of the property estimated as 80% less than the present market value.
              </li>
            </ol>
          </li>
          <li>
            Number of title deed(s) involved in this property is the relevant document for the subject property in the opinion of this valuer is Sale Deed with {F("titleDeedNo")} Dated: {F("titleDeedDate")}
          </li>
          <li>
            If this property is offered as collateral security, the concerned financial institution is requested to verify the extent of land shown in this valuation report with respect to the latest legal opinion.
          </li>
          <li>
            Value varies with the purpose and date of valuation. This report is not to be referred if the purpose is different other than mentioned in I(1).
          </li>
          <li>
            This property was inspected on by in the presence of Manager {F("toName")}, {F("branch")}
          </li>
          <li>The legal aspects were not considered in this valuation.</li>
          <li>
            This valuation work was / has been undertaken by the valuer based upon the request from {F("toName")}, {F("branch")}
          </li>
        </ol>

        <div className="flex justify-between mt-8">
          <div>
            <p className="text-[11px]">Place: {F("place")}</p>
            <p className="text-[11px]">Date: {F("date")}</p>
          </div>
          <div className="text-right">
            <p className="text-[11px] font-bold">(Panel Valuer)</p>
            <p className="text-[11px]">Name and official seal of the</p>
            <p className="text-[11px]">Approved Valuer</p>
          </div>
        </div>

        <p className="text-[11px] mt-4">Note: &nbsp;&nbsp; This report contains 19 pages</p>

        <p className="text-[11px] font-bold mt-4">Enclosures:</p>
        <ul className="list-none pl-4 text-[11px] space-y-1">
          <li>➢ Key Plan showing the location of the property</li>
          <li>➢ Site plan with boundaries</li>
          <li>➢ Photograph of owner / representative with property in background</li>
          <li>➢ Screen shot of longitude / latitude and co-ordinates of property using GPS/Various apps / Internet sites</li>
        </ul>

        <p className="text-[10px] text-gray-500 mt-4">
          (Note: The valuer may add any number of additional sheets for providing any vital data and relevant information)
        </p>

        <ValuerFooter pageNum={9} total={19} />
      </PageShell>

      {/* ════════════════════════════════════════════════════════════ PAGE 10 - FOR BANK USE ONLY */}
      <PageShell>
        {/* <ValuerHeader /> */}

        <p className="text-[12px] font-bold text-center mb-4">For Bank Use Only</p>

        <div className="border border-black p-4 mb-6 text-[11px] leading-relaxed">
          <p className="mb-3">
            The undersigned has inspected the property detailed in the Valuation Report dated { F('date') } on ____________________
          </p>
          <p className="mb-2">
            Whether satisfied with the description of the property, boundaries of the property, characteristic of the site and specification of the construction given in the report - Yes/No
          </p>
          <p className="mb-6">Property is directly accessible : Yes / No</p>
        </div>

        <div className="flex justify-between mt-16">
          <div>
            <p className="text-[11px]">Date:</p>
            <p className="text-[11px]">Place:</p>
          </div>
          <div className="text-right">
            <p className="text-[11px] font-bold">Signature</p>
            <p className="text-[11px]">Name of the Branch Manager</p>
            <p className="text-[11px]">with Office Seal</p>
          </div>
        </div>

        <ValuerFooter pageNum={10} total={19} />
      </PageShell>

      {/* ════════════════════════════════════════════════════════════ PAGE 11 - REMARKS / ANNEXURE-III */}
      <PageShell>
        {/* <ValuerHeader /> */}

        <div className="flex justify-between mb-2">
          <p className="text-[11px] font-bold underline">Remarks:</p>
          <p className="text-[11px]">(Annexure-III)</p>
        </div>
        <p className="text-[11px] font-bold underline mb-1">Difference between SRO guide line rates and present market rates.</p>
        <p className="text-[11px] font-bold underline mb-3">There is a vast difference between the SRO values and present market values by more than 20%.</p>

        <ol className="list-decimal pl-5 space-y-2 text-[10.5px] text-justify">
          {[
            "Value varies with the purpose guide line and market value are totally different and they cannot be compare with each other.",
            "Guide line rate is artificial and fixed by non technical person Whereas market value fixed by experienced valuer after making through local enquiries.",
            "The guide line rate is only unit rate of land for which only stamp duties are collected. Whereas the market value is the money the property is fetches sold in open market.",
            "Guide line rate are uniform in a survey number or in one locality irrespective of its location Whereas market value varies its location.",
            "Guide line value may increase or decrease as per the government policy. For example, government of Tamilnadu on June 2017 reduced guide line rate by 33% Whereas market value changes in accordance with the real estate trends.",
            "Guide line rate remains same irrespective of supply and demand. Whereas market value changes in accordance with demand.",
            "Guide line rate may be constant for say for 5 years were as market value may even change on next day.",
            "Guide line rate is same for all properties irrespective of facts whether they are marketable or non marketable.",
            "Guide line rate is the same even of encumbered properties. Whereas market value for such properties will be definitely less.",
            "Guide line rate does not speak about potential values whereas the potential values can be considered for certifying the market values.",
            "In few places market rate can be more than the guide line rate whereas in few places market rate is less than the guide line rate.",
          ].map((text, i) => (
            <li key={i}>{text}</li>
          ))}
          <li className="font-bold">Guide line rate is the same for landlocked lands, recess plots, tandem plots, narrow plots, Plots with narrow path ways etc.,. Which shall have less market values.</li>
        </ol>

        <p className="text-[11px] font-bold mt-4 mb-2">Judgements of honorable courts clarifying market rate and guideline rates.</p>
        <ol className="list-none space-y-2 text-[10.5px] text-justify">
          <li>i. Madras High Court – Sakthi vs. Shree Desigachary dt. 07-04-2006 CRP 3092 OF 1996.</li>
          <li>ii. Naganathan vs. Revenue Divisional office, Adilabad A.IR 1983 Supreme Court has clearly given the clarification of SRO value &amp; present market value in Jawaji Naganathan (Adilabad vs REV. DIV Officer (1994) SSC 4 page 595 SC It is clear that the basic valuation register prepared and maintained for the purpose of Collection stamp duty has no statutory base or force It cannot form a foundation to determine the market value mentioned there under in instrument brought for registration Evidence of bonafide sales between willing prudent vendor and vendee of the land acquired or situated near about that land possessing same or similar advantageous features would furnish basis to determine market value.</li>
          <li>iii. Collector of Nelagiries vs Mahavir plantations 1982 madras 1381995 (Ii CTC 492 G. Noganatham vs Chenniachettian) Guide line rate and market rate are two different concepts Thansi case-Chennai High court December 2001</li>
        </ol>

        <p className="text-[10.5px] mt-3">For Land, I Considered Market Approach. I enquired With Local People / Real Estate Agents / 99 Acres.com Web Sites.</p>
        <p className="text-[10.5px]">For Building, I Considered Cost Approach by Plinth Area Method, I Calculated Present Value of Building as on Date.</p>

        <ValuerFooter pageNum={11} total={19} />
      </PageShell>

      {/* ════════════════════════════════════════════════════════════ PAGE 12 - DECLARATION (ANNEXURE 6) */}
      <PageShell>
        {/* <ValuerHeader /> */}

        <p className="text-[12px] font-bold text-center mb-1">Annexure 6</p>
        <p className="text-[12px] font-bold text-center mb-1">FORMAT – E</p>
        <p className="text-[12px] font-bold text-center mb-3">DECLARATION FROM VALUERS</p>

        <p className="text-[11px] mb-2">I hereby declare that-</p>

        <ol className="list-none space-y-2 text-[10.5px] text-justify mb-4">
          {[
            { key: "a", text: `The information furnished in my valuation report dated ${formData.reportDate || "15-05-2026"} is true and correct to the best of my knowledge and belief and I have made an impartial and true valuation of the property.` },
            { key: "b", text: "I have no direct or indirect interest in the property valued;" },
            { key: "c", text: `I have personally inspected the property on, ${formData.inspectionDate || "12-05-2026"} The work is not sub-contracted to any other valuer and carried out by myself.` },
            { key: "d", text: "I have not been convicted of any offence and sentenced to a term of imprisonment." },
            { key: "e", text: "I have not been found guilty of misconduct in my professional capacity." },
            { key: "f", text: 'I have read the Handbook on Policy, Standards and procedure for Real Estate Valuation, 2011 of the IBA and this report is in conformity to the "Standards" enshrined for valuation in the Part-B of the above handbook to the best of my ability.' },
            { key: "g", text: 'I have read the International Valuation Standards (IVS) and the report submitted to the Bank for the respective asset class is in conformity to the "Standards" as enshrined for valuation in the IVS in "General Standards" and "Asset Standards" as applicable.' },
            { key: "h", text: "I abide by the Model Code of Conduct for empanelment of valuer in the Bank (Annexure III- A signed copy of same to be taken and kept along with this declaration)." },
            { key: "i", text: "I am registered under Section 34 AB of the Wealth Tax Act, 1957. (Not Applicable)" },
            { key: "j", text: "I am the proprietor / partner / authorized official of the firm / company, who is competent to sign this valuation report." },
            { key: "k", text: "Further, I hereby provide the following information" },
          ].map(({ key, text }) => (
            <li key={key}><span className="font-semibold">{key}.</span> {text}</li>
          ))}
        </ol>

        <div className="border border-black mb-4 bg-white">
          <table className="w-full border-collapse border border-black text-[9.5px]">
            <thead>
              <tr className="border-b border-black bg-gray-50">
                <th className="p-1 border-r border-black font-bold text-left w-[5%]">Sl.No.</th>
                <th className="p-1 border-r border-black font-bold text-left w-[30%]">Particulars</th>
                <th className="p-1 font-bold text-left">Valuer comment</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-black">
                <td className="p-1 border-r border-black align-top">1</td>
                <td className="p-1 border-r border-black align-top">Background information of the asset being valued</td>
                <td className="p-1 align-top">
                  The Subject Property comprises {F("propertyDescription")}, {F("hNo")}, {F("syNo")}, {F("road")}, {F("city")} {F("district")}, {F("pinCode")}<br />
                  Belongs to: {F("ownerName")}, {F("ownerRelation")} {F("ownerRelationName")}. The Valuation is carried out based on physical inspection, documents furnished by the client/bank and prevailing market conditions as on the valuation date
                </td>
              </tr>
              <tr className="border-b border-black">
                <td className="p-1 border-r border-black align-top">2</td>
                <td className="p-1 border-r border-black align-top">Purpose of valuation and appointing authority</td>
                <td className="p-1 align-top">
                  {F("purposeOfValuation")}<br />
                  {F("toName")} : {F("branch")}
                </td>
              </tr>
              <tr className="border-b border-black">
                <td className="p-1 border-r border-black align-top">3</td>
                <td className="p-1 border-r border-black align-top">Identity of the valuer and any other experts involved in the valuation</td>
                <td className="p-1 align-top">The valuation has been carried out solely by the undersigned empanelled valuer. No other technical expert has been engaged unless specifically stated.</td>
              </tr>
              <tr className="border-b border-black">
                <td className="p-1 border-r border-black align-top">4</td>
                <td className="p-1 border-r border-black align-top">Disclosure of valuer interest or conflict, if any;</td>
                <td className="p-1 align-top">The above said property is of no interest or conflict to me</td>
              </tr>
              <tr className="border-b border-black">
                <td className="p-1 border-r border-black align-top">5</td>
                <td className="p-1 border-r border-black align-top">Date of appointment, valuation date and date of report</td>
                <td className="p-1 align-top">
                  Appointment Date: {F("appointmentDate")}<br />
                  Valuation Date: {F("valuationDate")}<br />
                  Date of Report: {F("reportDate")}
                </td>
              </tr>
              <tr className="border-b border-black">
                <td className="p-1 border-r border-black align-top">6</td>
                <td className="p-1 border-r border-black align-top">Inspections and/or investigations undertaken</td>
                <td className="p-1 align-top">Physical inspection of the property was carried out. Measurements were taken on a random/sample basis where accessible. No intrusive or destructive testing was carried out.</td>
              </tr>
              <tr className="border-b border-black">
                <td className="p-1 border-r border-black align-top">7</td>
                <td className="p-1 border-r border-black align-top">Nature and sources of the information used or relied upon;</td>
                <td className="p-1 align-top">The Market Value has been obtained upon the discrete enquiries made in and around the surrounding area regarding the recent transaction prices. However as the transactions were not documented in the Registered Sale Deeds at their actual arms length price and instead were at the Guideline rates, the Supporting Transaction records cannot be submitted as evidence.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-between mt-14">
          <div>
            <p className="text-[11px]">Date: {F("reportDate")}</p>
            <p className="text-[11px]">Place: {F("place")}</p>
          </div>
          <div className="text-right">
            <p className="text-[11px] font-bold">Signature</p>
            <p className="text-[11px]">Approved Valuer</p>
          </div>
        </div>

        <ValuerFooter pageNum={12} total={19} />
      </PageShell>

      {/* ════════════════════════════════════════════════════════════ PAGE 13 - DECLARATION CONT. */}
      <PageShell>
        {/* <ValuerHeader /> */}

        <div className="border border-black mb-4 bg-white">
          <table className="w-full border-collapse border border-black text-[9.5px]">
            <thead>
              <tr className="border-b border-black bg-gray-50">
                <th className="p-1 border-r border-black font-bold text-left w-[5%]">Sl.No.</th>
                <th className="p-1 border-r border-black font-bold text-left w-[30%]">Particulars</th>
                <th className="p-1 font-bold text-left">Valuer comment</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-black">
                <td className="p-1 border-r border-black align-top">8</td>
                <td className="p-1 border-r border-black align-top">Procedures adopted in carrying out the valuation and valuation standards followed</td>
                <td className="p-1 align-top">
                  IVS are followed<br />
                  Market Value Approach was used for Plot valuation<br />
                  Plinth Area rate for RCC Building
                </td>
              </tr>
              <tr className="border-b border-black">
                <td className="p-1 border-r border-black align-top">9</td>
                <td className="p-1 border-r border-black align-top">Restrictions on use of the report, if any</td>
                <td className="p-1 align-top">This report is prepared exclusively for the stated purpose and the use of the appointing Bank. It shall not be used for any other purpose or by any third party without written consent of the valuer.</td>
              </tr>
              <tr className="border-b border-black">
                <td className="p-1 border-r border-black align-top">10</td>
                <td className="p-1 border-r border-black align-top">Major factors that were taken into account during the valuation</td>
                <td className="p-1 align-top">Location, access, land area, building specifications, age, condition, prevailing market rates, legal inputs provided, and demand-supply scenario have been considered.</td>
              </tr>
              <tr className="border-b border-black">
                <td className="p-1 border-r border-black align-top">11</td>
                <td className="p-1 border-r border-black align-top">Caveats, limitations and disclaimers to the extent they explain or elucidate the limitations faced by valuer</td>
                <td className="p-1 align-top">The valuation is subject to limitations of non-verification of title documents, approvals, statutory compliances, soil condition, and hidden defects. These disclosures explain practical limitations faced during valuation and are not intended to limit professional responsibility.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-between mt-14">
          <div>
            <p className="text-[11px]">Date: {F("reportDate")}</p>
            <p className="text-[11px]">Place: {F("place")}</p>
          </div>
          <div className="text-right">
            <p className="text-[11px] font-bold">Signature</p>
            <p className="text-[11px]">Approved Valuer</p>
          </div>
        </div>

        <ValuerFooter pageNum={13} total={19} />
      </PageShell>

      {/* ════════════════════════════════════════════════════════════ PAGE 14 - MODEL CODE OF CONDUCT (ANNEXURE-7) */}
      <PageShell>
        {/* <ValuerHeader /> */}

        <p className="text-[12px] font-bold text-center mb-1">ANNEXURE - 7</p>
        <p className="text-[12px] font-bold text-center mb-1">MODEL CODE OF CONDUCT FOR VALUERS</p>
        <p className="text-[10px] text-center italic mb-3">&#123;Adopted in line with companies (Registered Valuers and Valuation Rules, 2017)&#125;</p>
        <p className="text-[10.5px] mb-3">All valuers empanelled with bank shall strictly adhere to the following code of conduct:</p>

        <p className="text-[11px] font-bold mb-1">Integrity and Fairness</p>
        <ol className="list-decimal pl-5 space-y-1 text-[10px] text-justify mb-3">
          {[
            "A valuer shall, in the conduct of his/its business, follow high standards of integrity and fairness in all his/its dealings with his/its clients and other valuers.",
            "A valuer shall maintain integrity by being honest, straightforward, and forthright in all professional relationships.",
            "A valuer shall endeavour to ensure that he/it provides true and adequate information and shall not misrepresent any facts or situations.",
            "A valuer shall refrain from being involved in any action that would bring disrepute to the profession.",
            "A valuer shall keep public interest foremost while delivering his services.",
          ].map((text, i) => <li key={i}>{text}</li>)}
        </ol>

        <p className="text-[11px] font-bold mb-1">Professional Competence and Due Care</p>
        <ol className="list-decimal pl-5 space-y-1 text-[10px] text-justify mb-3" start={6}>
          {[
            "A valuer shall render at all times high standards of service, exercise due diligence, ensure proper care and exercise independent professional judgment.",
            "A valuer shall carry out professional services in accordance with the relevant technical and professional standards that may be specified from time to time.",
            "A valuer shall continuously maintain professional knowledge and skill to provide competent professional service based on up-to-date developments in practice, prevailing regulations/guidelines and techniques.",
            "In the preparation of a valuation report, the valuer shall not disclaim liability for his/its expertise or deny his/its duty of care, except to the extent that the assumptions are based on statements of fact provided by the company or its auditors or consultants or information available in public domain and not generated by the valuer.",
            "A valuer shall not carry out any instruction of the client insofar as they are Incompatible with the requirements of integrity, objectivity and independence.",
            "A valuer shall clearly state to his client the services that he would be competent to provide and the services for which he would be relying on other valuers or professionals or for which the client can have a separate arrangement with other valuers.",
          ].map((text, i) => <li key={i}>{text}</li>)}
        </ol>

        <p className="text-[11px] font-bold mb-1">Independence and Disclosure of Interest</p>
        <ol className="list-decimal pl-5 space-y-1 text-[10px] text-justify mb-3" start={12}>
          {[
            "A valuer shall act with objectivity in his/its professional dealings by ensuring that his/its decisions are made without the presence of any bias, conflict of interest, coercion, or undue influence of any party, whether directly connected to the valuation assignment or not.",
            "A valuer shall not take up an assignment if he/it or any of his/its relatives or associates is not independent in terms of association to the company.",
            "A valuer shall maintain complete independence in his/its professional relationships and shall conduct the valuation independent of external influences.",
            "A valuer shall wherever necessary disclose to the clients, possible sources of conflicts of duties and interests, while providing unbiased services.",
            "A valuer shall not deal in securities of any subject company after any time when he/it first becomes aware of the possibility of his/its association with the valuation, and in accordance with the Securities and Exchange Board of India (Prohibition of Insider Trading) Regulations, 2015 or till the time the valuation report becomes public, whichever is earlier.",
            "A valuer shall not indulge in 'mandate snatching' or offering 'convenience valuations' in order to cater to a company or client's needs.",
            "As an independent valuer, the valuer shall not charge success fee (Success fees may be defined as a compensation / incentive paid to any third party for successful closure of transaction. In this case, it is approval of credit proposals).",
            "In any fairness opinion or independent expert opinion submitted by a valuer, if there has been a prior engagement in an unconnected transaction, the valuer shall declare the association with the company during the last five years.",
          ].map((text, i) => <li key={i}>{text}</li>)}
        </ol>

        <ValuerFooter pageNum={14} total={19} />
      </PageShell>

      {/* ════════════════════════════════════════════════════════════ PAGE 15 - CODE OF CONDUCT CONT. */}
      <PageShell>
        {/* <ValuerHeader /> */}

        <p className="text-[11px] font-bold mb-1">Confidentiality</p>
        <ol className="list-decimal pl-5 space-y-1 text-[10px] text-justify mb-3" start={20}>
          {[
            "A valuer shall not use or divulge to other clients or any other party any confidential information about the subject company, which has come to his/its knowledge without proper and specific authority or unless there is a legal or professional right or duty to disclose.",
          ].map((text, i) => <li key={i}>{text}</li>)}
        </ol>

        <p className="text-[11px] font-bold mb-1">Information Management</p>
        <ol className="list-decimal pl-5 space-y-1 text-[10px] text-justify mb-3" start={21}>
          {[
            "A valuer shall ensure that he/it maintains written contemporaneous records for any decision taken, the reasons for taking the decision, and the information and evidence in support of such decision. This shall be maintained so as to sufficiently enable a reasonable person to take a view on the appropriateness of his/its decisions and actions.",
            "A valuer shall appear, co-operate and be available for inspections and investigations carried out by the authority, any person authorised by the authority, the registered valuers organisation with which he/it is registered or any other statutory regulatory body.",
            "A valuer shall provide all information and records as may be required by the authority, the Tribunal, Appellate Tribunal, the registered valuers' organisation with which he/it is registered, or any other statutory regulatory body.",
            "A valuer while respecting the confidentiality of information acquired during the course of performing professional services shall maintain proper working papers for a period of three years or such longer period as required in its contract for a specific valuation, for production before a regulatory authority or for a peer review. In the event of a pending case before the Tribunal or Appellate Tribunal, the record shall be maintained till the disposal of the case.",
          ].map((text, i) => <li key={i}>{text}</li>)}
        </ol>

        <p className="text-[11px] font-bold mb-1">Gifts and hospitality:</p>
        <ol className="list-decimal pl-5 space-y-1 text-[10px] text-justify mb-3" start={25}>
          {[
            "A valuer or his/its relative shall not accept gifts or hospitality which undermines or affects his independence as a valuer.",
            "A valuer shall not offer gifts or hospitality or a financial or any other advantage to a public servant or any other person with a view to obtain or retain work for himself/itself, or to obtain or retain an advantage in the conduct of profession for himself/itself.",
          ].map((text, i) => <li key={i}>{text}</li>)}
        </ol>

        <p className="text-[10px] italic pl-5 mb-3">&#123;Explanation For the purposes of this code the term 'relative' shall have the same meaning as defined in clause (77) of Section 2 of the Companies Act, 2013 (18 of 2013).&#125;</p>

        <p className="text-[11px] font-bold mb-1">Remuneration and Costs</p>
        <ol className="list-decimal pl-5 space-y-1 text-[10px] text-justify mb-3" start={27}>
          {[
            "A valuer shall provide services for remuneration which is charged in a transparent manner, is a reasonable reflection of the work necessarily and properly undertaken, and is not inconsistent with the applicable rules.",
            "A valuer shall not accept any fees or charges other than those which are disclosed in a written contract with the person to whom he would be rendering service.",
          ].map((text, i) => <li key={i}>{text}</li>)}
        </ol>

        <p className="text-[11px] font-bold mb-1">Occupation, employability and restrictions</p>
        <ol className="list-decimal pl-5 space-y-1 text-[10px] text-justify mb-3" start={29}>
          {[
            "A valuer shall refrain from accepting too many assignments, if he/it is unlikely to be able to devote adequate time to each of his/its assignments.",
            "A valuer shall not conduct business which in the opinion of the authority or the registered valuer organisation discredits the profession.",
          ].map((text, i) => <li key={i}>{text}</li>)}
        </ol>

        <div className="flex justify-between mt-12">
          <div>
            <p className="text-[11px]">Date: {F("reportDate")}</p>
            <p className="text-[11px]">Place: {F("place")}</p>
          </div>
          <div className="text-right">
            <p className="text-[11px] font-bold">Signature</p>
            <p className="text-[11px]">Approved Valuer</p>
          </div>
        </div>
        <p className="text-center text-[11px] mt-2">*****</p>

        <ValuerFooter pageNum={15} total={19} />
      </PageShell>

      {/* ════════════════════════════════════════════════════════════ PAGE 16 - KEY PLAN / MAP */}
      {/* ════════════════════════════════════════════════════════════ PAGE 16 - KEY PLAN / MAP */}
      <PageShell>
        <p className="text-[12px] font-bold text-center mb-3">Key Plan Showing the Location of the Property (Google Map Extract)</p>
        <div className="flex justify-between text-[10.5px] mb-3">
          <span>Google Coordinates</span>
          <span>Lat: &nbsp;{F("latitude")}</span>
          <span>Lon: &nbsp;{F("longitude")}</span>
        </div>

        {/* Dynamic Maps Grid */}
        {mapPhotos && mapPhotos.length >= 4 ? (
          <div className="flex flex-col gap-4">
            {/* Top Row: Close-up views */}
            <div className="flex gap-4">
              <div className="flex-1">
                <p className="text-[11px] font-bold text-center mb-1 text-blue-900">Roadmap (Close-up)</p>
                <img src={mapPhotos[0].url} alt="Roadmap Close" className="w-full h-[300px] object-cover border border-black p-1" />
              </div>
              <div className="flex-1">
                <p className="text-[11px] font-bold text-center mb-1 text-blue-900">Satellite (Close-up)</p>
                <img src={mapPhotos[2].url} alt="Satellite Close" className="w-full h-[300px] object-cover border border-black p-1" />
              </div>
            </div>
            {/* Bottom Row: Wide views with polygon */}
            <div className="flex gap-4">
              <div className="flex-1">
                <p className="text-[11px] font-bold text-center mb-1 text-blue-900">Roadmap (Wide Angle)</p>
                <img src={mapPhotos[1].url} alt="Roadmap Wide" className="w-full h-[300px] object-cover border border-black p-1" />
              </div>
              <div className="flex-1">
                <p className="text-[11px] font-bold text-center mb-1 text-blue-900">Satellite (Wide Angle)</p>
                <img src={mapPhotos[3].url} alt="Satellite Wide" className="w-full h-[300px] object-cover border border-black p-1" />
              </div>
            </div>
          </div>
        ) : (
          <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50 text-gray-400">
            <p>Maps not generated yet.</p>
            <p className="text-[10px]">Use the Sidebar to fetch Google Maps.</p>
          </div>
        )}

        <ValuerFooter pageNum={16} total={19} />
      </PageShell>

      {/* ════════════════════════════════════════════════════════════ PAGE 17+ - SITE PHOTOS */}
      {/* <SitePhotosPage formData={formData} /> */}
      <SitePhotosPage formData={formData} sitePhotos={sitePhotos} />
    </>
  );
}

// ── Site Photos Page Component ─────────────────────────────────────────────────
// Allows uploading any number of photos; auto-arranges them 2-per-row per page

// function SitePhotosPage({ formData }: { formData: FormData }) {
//   const [photos, setPhotos] = useState<{ url: string; name: string }[]>([]);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleFiles = useCallback((files: FileList | null) => {
//     if (!files) return;
//     const newPhotos = Array.from(files).map((f) => ({
//       url: URL.createObjectURL(f),
//       name: f.name,
//     }));
//     setPhotos((prev) => [...prev, ...newPhotos]);
//   }, []);

//   const removePhoto = (idx: number) => {
//     setPhotos((prev) => {
//       const next = [...prev];
//       URL.revokeObjectURL(next[idx].url);
//       next.splice(idx, 1);
//       return next;
//     });
//   };

//   // Each page holds up to 4 photos (2×2 grid)
//   const photosPerPage = 4;
//   const pageCount = Math.max(1, Math.ceil(photos.length / photosPerPage));

//   return (
//     <>
//       {Array.from({ length: pageCount }).map((_, pageIdx) => {
//         const slice = photos.slice(pageIdx * photosPerPage, (pageIdx + 1) * photosPerPage);
//         const pageNum = 17 + pageIdx;
//         return (
//           <PageShell key={pageIdx}>
//             {/* <ValuerHeader /> */}

//             <div className="flex items-center justify-between mb-3">
//               <p className="text-[12px] font-bold text-center flex-1">
//                 Site Photos (Page {pageIdx + 1})
//               </p>
//               {/* Upload button only on first page */}
//               {pageIdx === 0 && (
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => fileInputRef.current?.click()}
//                     className="px-3 py-1.5 bg-blue-600 text-white text-[11px] rounded hover:bg-blue-700 font-semibold shadow-sm"
//                   >
//                     + Upload Photos
//                   </button>
//                   <input
//                     ref={fileInputRef}
//                     type="file"
//                     accept="image/*"
//                     multiple
//                     className="hidden"
//                     onChange={(e) => handleFiles(e.target.files)}
//                   />
//                 </div>
//               )}
//             </div>

//             {/* Drop zone (only on first page when no photos yet) */}
//             {pageIdx === 0 && photos.length === 0 && (
//               <div
//                 className="border-2 border-dashed border-blue-300 rounded-lg bg-blue-50 h-60 flex flex-col items-center justify-center mb-4 cursor-pointer"
//                 onClick={() => fileInputRef.current?.click()}
//                 onDragOver={(e) => e.preventDefault()}
//                 onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
//               >
//                 <svg className="w-10 h-10 text-blue-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                 </svg>
//                 <p className="text-[12px] font-semibold text-blue-600">Click or drag photos here</p>
//                 <p className="text-[10px] text-gray-400 mt-1">Upload any number of site photos — they will auto-arrange 4 per page</p>
//                 <p className="text-[10px] text-gray-400">Supports JPG, PNG, WEBP, HEIC</p>
//               </div>
//             )}

//             {/* Photo grid — 2 columns, 2 rows = 4 per page */}
//             {slice.length > 0 && (
//               <div className="grid grid-cols-2 gap-3">
//                 {slice.map((photo, i) => (
//                   <div key={i} className="relative border border-gray-200 rounded overflow-hidden bg-gray-50">
//                     <img
//                       src={photo.url}
//                       alt={`Site photo ${pageIdx * photosPerPage + i + 1}`}
//                       className="w-full object-contain"
//                       style={{ maxHeight: "260px" }}
//                     />
//                     <div className="absolute top-1 right-1">
//                       <button
//                         onClick={() => removePhoto(pageIdx * photosPerPage + i)}
//                         className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold hover:bg-red-600 shadow"
//                         title="Remove photo"
//                       >
//                         ×
//                       </button>
//                     </div>
//                     <p className="text-[9px] text-gray-500 text-center py-0.5 bg-white border-t border-gray-100 truncate px-1">
//                       {photo.name}
//                     </p>
//                   </div>
//                 ))}
//                 {/* Empty placeholder slots to maintain grid on partial last page */}
//                 {slice.length < photosPerPage && pageIdx === pageCount - 1 && Array.from({ length: photosPerPage - slice.length }).map((_, j) => (
//                   <div
//                     key={`empty-${j}`}
//                     className="border-2 border-dashed border-gray-200 rounded bg-gray-50 flex items-center justify-center cursor-pointer"
//                     style={{ minHeight: "260px" }}
//                     onClick={() => fileInputRef.current?.click()}
//                   >
//                     <p className="text-[10px] text-gray-300">+ add photo</p>
//                   </div>
//                 ))}
//               </div>
//             )}

//             <ValuerFooter pageNum={pageNum} total={19} />
//           </PageShell>
//         );
//       })}
//     </>
//   );
// }
// ── Site Photos Page Component ─────────────────────────────────────────────────
// Auto-arranges the photos from the sidebar into a 2x2 grid per page

function SitePhotosPage({ formData, sitePhotos }: { formData: FormData, sitePhotos: { url: string; name: string }[] }) {
  // Each page holds up to 4 photos (2×2 grid)
  const photosPerPage = 4;
  const pageCount = Math.max(1, Math.ceil(sitePhotos.length / photosPerPage));

  return (
    <>
      {Array.from({ length: pageCount }).map((_, pageIdx) => {
        const slice = sitePhotos.slice(pageIdx * photosPerPage, (pageIdx + 1) * photosPerPage);
        const pageNum = 17 + pageIdx;
        
        return (
          <PageShell key={pageIdx}>
            <div className="flex items-center justify-between mb-4">
              <p className="text-[12px] font-bold text-center flex-1">
                Site Photos (Page {pageIdx + 1})
              </p>
            </div>

            {slice.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {slice.map((photo, i) => {
                  const absoluteIndex = pageIdx * photosPerPage + i + 1;
                  // Pull the caption from formData if typed in sidebar, otherwise fallback to filename
                  const caption = (formData as any)[`photoCaption${absoluteIndex}`] || photo.name;
                  
                  return (
                    <div key={i} className="border border-black p-1 flex flex-col">
                      <img
                        src={photo.url}
                        alt={`Site photo ${absoluteIndex}`}
                        className="w-full object-contain bg-gray-50"
                        style={{ height: "320px" }}
                      />
                      <p className="text-[10px] font-bold text-center mt-2 pb-1 text-[#000080]">
                        {caption}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 text-gray-400 mt-10 h-64">
                <p>No site photos uploaded.</p>
                <p className="text-[10px]">Use the Sidebar to upload photos.</p>
              </div>
            )}

            <ValuerFooter pageNum={pageNum} total={19} />
          </PageShell>
        );
      })}
    </>
  );
}