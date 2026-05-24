import React from 'react';
import { DocField, PageShell } from '../shared/FormFields';

const tableWrapperClass = "rounded-[6px] border border-slate-400 overflow-hidden mb-6 bg-white";
const tableClass = "min-w-full divide-y divide-slate-400 text-[12px]";
const trClass = "divide-x divide-slate-400";

export default function BuildingCommencementDoc({ formData, handleChange, editMode }: any) {
  return (
    <>
      {/* --- PAGE 1 --- */}
      <PageShell>
        <div className="text-center mb-8 mt-4">
          <h2 className="text-[16px] font-bold uppercase mb-1 tracking-wide">Office of the <DocField inline name="municipality" value={formData.municipality} mode={editMode} onChange={handleChange} /></h2>
          <h3 className="text-[14px] font-bold uppercase mb-3"><DocField inline name="district" value={formData.district} mode={editMode} onChange={handleChange} /></h3>
          <h1 className="text-[15px] font-bold uppercase underline underline-offset-4">Building Permit Order and Work Commencement Letter</h1>
        </div>

        <div className="mb-6 text-[12px] leading-relaxed">
  <div className={tableWrapperClass}>
    <table className={tableClass}>
      <tbody className="divide-y divide-slate-400">

        {/* To Section */}
        <tr className={trClass}>
          <td className="p-2 w-[20%] text-gray-600 font-bold bg-[#f4f7fb] align-top">
            To,
          </td>

          <td className="p-2 w-[45%] align-top">
            <span className="font-bold">
              <DocField
                name="applicantName"
                value={formData.applicantName}
                mode={editMode}
                onChange={handleChange}
              />
            </span>
            <br />

           

           
          </td>

          <td className="p-2 w-[15%] text-gray-600 font-bold bg-[#f4f7fb]">
            File No:
          </td>

          <td className="p-2">
            <DocField
              name="fileNo"
              value={formData.fileNo}
              mode={editMode}
              onChange={handleChange}
            />
          </td>
        </tr>

        {/* Permit No */}
        <tr className={trClass}>
          <td className="p-2 bg-[#f4f7fb]"> <span>
              S/o{" "}
              
            </span></td>
          <td className="p-2"><DocField
                inline
                name="fatherName"
                value={formData.fatherName}
                mode={editMode}
                onChange={handleChange}
              /></td>

          <td className="p-2 text-gray-600 font-bold bg-[#f4f7fb]">
            Permit No:
          </td>

          <td className="p-2">
            <DocField
              name="permitNo"
              value={formData.permitNo}
              mode={editMode}
              onChange={handleChange}
            />
          </td>
        </tr>

        {/* Date */}
        <tr className={trClass}>
          <td className="p-2 bg-[#f4f7fb]"> Address </td>
          <td className="p-2"> <div className="mt-1">
              <DocField
                multiline
                name="address"
                value={formData.address}
                mode={editMode}
                onChange={handleChange}
              />
            </div></td>

          <td className="p-2 text-gray-600 font-bold bg-[#f4f7fb]">
            Date:
          </td>

          <td className="p-2">
            <DocField
              name="permitDate"
              value={formData.permitDate}
              mode={editMode}
              onChange={handleChange}
            />
          </td>
        </tr>

      </tbody>
    </table>
  </div>
</div>

        <p className="mb-4">Dear Sir/Madam,</p>

        <div className="pl-10 mb-6 relative text-justify">
          <span className="absolute left-0 top-0 font-bold">Sub:</span>
          <p className="leading-loose">
            <strong><DocField inline name="municipality" value={formData.municipality} mode={editMode} onChange={handleChange} /></strong> - Proposed Construction of <strong><DocField inline name="buildingType" value={formData.buildingType} mode={editMode} onChange={handleChange} /></strong> consisting of <strong><DocField inline name="floorsDesc" value={formData.floorsDesc} mode={editMode} onChange={handleChange} /></strong>, to an extent of <strong><DocField inline name="extent" value={formData.extent} mode={editMode} onChange={handleChange} /> Sq mt</strong>, situated at Plot No: <strong><DocField inline name="plotNo" value={formData.plotNo} mode={editMode} onChange={handleChange} /></strong>, Locality: <strong><DocField inline name="locality" value={formData.locality} mode={editMode} onChange={handleChange} /></strong>, Survey No: <strong><DocField inline name="surveyNo" value={formData.surveyNo} mode={editMode} onChange={handleChange} /></strong>, Village <strong><DocField inline name="village" value={formData.village} mode={editMode} onChange={handleChange} /></strong>, <DocField inline name="mandal" value={formData.mandal} mode={editMode} onChange={handleChange} /> Mandal, <DocField inline name="district" value={formData.district} mode={editMode} onChange={handleChange} /> District - Building Permit Order and Work Commencement Letter - Reg.
          </p>
        </div>

        <div className="pl-10 mb-6 relative text-justify">
          <span className="absolute left-0 top-0 font-bold">Ref:</span>
          <ol className="list-decimal pl-4 space-y-1">
            <li>Your Application <DocField inline name="fileNo" value={formData.fileNo} mode={editMode} onChange={handleChange} />, dated: <DocField inline name="date" value={formData.date} mode={editMode} onChange={handleChange} /></li>
            <li>Provisional Permit Order No. <DocField inline name="provisionalPermitNo" value={formData.provisionalPermitNo} mode={editMode} onChange={handleChange} />, dt. <DocField inline name="provisionalPermitDate" value={formData.provisionalPermitDate} mode={editMode} onChange={handleChange} /></li>
            <li>G.O.Ms.No.168, MA&UD;, dt.07-04-2012.</li>
            <li>G.O.Ms.No.7, MA&UD;, dt.05-01-2016.</li>
            <li>Telangana Municipalities Act 2019 (Act No. 11 of 2019).</li>
            <li>G.O.Ms.No. 62 MA&UD;, dt. 21.03.2020.</li>
            <li>G.O.Ms.No. 201 MA&UD;, dt 16.11.2020.</li>
            <li>Remarks of the Post verification team <DocField inline name="postVerificationDate" value={formData.postVerificationDate} mode={editMode} onChange={handleChange} /></li>
            <li>Memo No. 2461/Plg.III/2021 dt 20.07.2023</li>
          </ol>
        </div>
        <p className="text-justify mb-4 leading-relaxed">
          The Instant Approval vide Provisional Building Permit Order No. <strong><DocField inline name="provisionalPermitNo" value={formData.provisionalPermitNo} mode={editMode} onChange={handleChange} /></strong> dated. <strong><DocField inline name="provisionalPermitDate" value={formData.provisionalPermitDate} mode={editMode} onChange={handleChange} /></strong> for construction of <strong><DocField inline name="buildingType" value={formData.buildingType} mode={editMode} onChange={handleChange} /></strong> consisting of <strong><DocField inline name="floorsDesc" value={formData.floorsDesc} mode={editMode} onChange={handleChange} /></strong>, has-been verified through Post Verification Team vide reference 7th cited, in terms of Rules & Regulations in force and found satisfactory.
        </p>

        <p className="text-justify mb-8 leading-relaxed">
          Hence the Building permission accorded through Instant approval issued vide Application No. <strong><DocField inline name="fileNo" value={formData.fileNo} mode={editMode} onChange={handleChange} /></strong> is here with confirmed and accordingly the applicant shall commence the construction of work as per Building Permit Order and conditions laid down.
        </p>

      </PageShell>

      {/* --- PAGE 2 --- */}
      <PageShell>
        
      <p className="font-bold mb-4">The details of Instant Approval are as follows:</p>

        <h4 className="font-bold mb-2 text-[14px]">A. APPLICANT DETAILS</h4>
        <div className={tableWrapperClass}>
          <table className={tableClass}>
            <tbody className="divide-y divide-slate-400">
              <tr className={trClass}>
                <td className="p-2 w-1/3 font-bold bg-[#f4f7fb]">Name</td>
                <td className="p-2"><DocField name="applicantName" value={formData.applicantName} mode={editMode} onChange={handleChange} /></td>
              </tr>
              <tr className={trClass}>
                <td className="p-2 font-bold bg-[#f4f7fb]">S/o</td>
                <td className="p-2"><DocField name="fatherName" value={formData.fatherName} mode={editMode} onChange={handleChange} /></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4 className="font-bold mb-2 text-[14px]">B. DETAILS OF APPROVAL</h4>
        <div className={tableWrapperClass + " mb-0 border-b-0 rounded-b-none"}>
          <table className={tableClass}>
            <tbody className="divide-y divide-slate-400">
              <tr className={trClass}><td className="p-2 font-bold bg-[#f4f7fb] w-1/2">Extent of Plot (Sq mt)</td><td colSpan={4} className="p-2"><DocField name="extent" value={formData.extent} mode={editMode} onChange={handleChange} /></td></tr>
              <tr className={trClass}><td className="p-2 font-bold bg-[#f4f7fb]">Road Affected Area (Sq mt)</td><td colSpan={4} className="p-2"><DocField name="roadAffectedArea" value={formData.roadAffectedArea} mode={editMode} onChange={handleChange} /></td></tr>
              <tr className={trClass}><td className="p-2 font-bold bg-[#f4f7fb]">Net Plot Area (Sq mt)</td><td colSpan={4} className="p-2"><DocField name="netPlotArea" value={formData.netPlotArea} mode={editMode} onChange={handleChange} /></td></tr>
              <tr className={trClass}><td className="p-2 font-bold bg-[#f4f7fb]">No. of Rain Water Harvesting Pits</td><td colSpan={4} className="p-2"><DocField name="rainWaterPits" value={formData.rainWaterPits} mode={editMode} onChange={handleChange} /></td></tr>
              <tr className={trClass}><td className="p-2 font-bold bg-[#f4f7fb]">No. of Trees</td><td colSpan={4} className="p-2"><DocField name="trees" value={formData.trees} mode={editMode} onChange={handleChange} /></td></tr>
              <tr className={trClass}><td className="p-2 font-bold bg-[#f4f7fb]">No. of Floors</td><td colSpan={4} className="p-2"><DocField name="floorsDesc" value={formData.floorsDesc} mode={editMode} onChange={handleChange} /></td></tr>
              <tr className={trClass}><td className="p-2 font-bold bg-[#f4f7fb]">Height of the Building (m)</td><td colSpan={4} className="p-2"><DocField name="height" value={formData.height} mode={editMode} onChange={handleChange} /></td></tr>
              <tr className={trClass}><td className="p-2 font-bold bg-[#f4f7fb]">Total No. of Dwelling Units</td><td colSpan={4} className="p-2"><DocField name="dwellingUnits" value={formData.dwellingUnits} mode={editMode} onChange={handleChange} /></td></tr>
              <tr className={trClass}>
                <td className="p-2 font-bold bg-[#f4f7fb]">Set backs (m)</td>
                <td className="p-2 font-bold text-center w-[12.5%]">Front</td>
                <td className="p-2 font-bold text-center w-[12.5%]">Rear</td>
                <td className="p-2 font-bold text-center w-[12.5%]">Side I</td>
                <td className="p-2 font-bold text-center w-[12.5%]">Side II</td>
              </tr>
              <tr className={trClass}>
                <td className="p-2 font-bold bg-[#f4f7fb]">Set backs (m)</td>
                <td className="p-2 text-center"><DocField name="frontSetback" value={formData.frontSetback} mode={editMode} onChange={handleChange} /></td>
                <td className="p-2 text-center"><DocField name="rearSetback" value={formData.rearSetback} mode={editMode} onChange={handleChange} /></td>
                <td className="p-2 text-center"><DocField name="side1Setback" value={formData.side1Setback} mode={editMode} onChange={handleChange} /></td>
                <td className="p-2 text-center"><DocField name="side2Setback" value={formData.side2Setback} mode={editMode} onChange={handleChange} /></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={tableWrapperClass + " rounded-t-none"}>
          <table className={tableClass}>
            <thead>
              <tr className={"bg-[#f4f7fb] divide-x divide-slate-400 border-b border-slate-400"}>
                <th className="p-2 font-bold text-left w-1/4 text-gray-800">Floors</th>
                <th className="p-2 font-bold text-left w-1/4 text-gray-800">Proposed Use</th>
                <th className="p-2 font-bold text-left w-1/4 text-gray-800">No.</th>
                <th className="p-2 font-bold text-left w-1/4 text-gray-800">Area (sq mt)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-400">
              <tr className={trClass}>
                <td className="p-2 font-bold bg-white">Stilt</td>
                <td className="p-2 bg-white"><DocField name="stiltUse" value={formData.stiltUse} mode={editMode} onChange={handleChange} /></td>
                <td className="p-2 bg-white"><DocField name="stiltNo" value={formData.stiltNo} mode={editMode} onChange={handleChange} /></td>
                <td className="p-2 bg-white"><DocField name="stiltArea" value={formData.stiltArea} mode={editMode} onChange={handleChange} /></td>
              </tr>
              <tr className={trClass}>
                <td className="p-2 font-bold bg-white">Ground Floor</td>
                <td className="p-2 bg-white"><DocField name="groundUse" value={formData.groundUse} mode={editMode} onChange={handleChange} /></td>
                <td className="p-2 bg-white"><DocField name="groundNo" value={formData.groundNo} mode={editMode} onChange={handleChange} /></td>
                <td className="p-2 bg-white"><DocField name="groundArea" value={formData.groundArea} mode={editMode} onChange={handleChange} /></td>
              </tr>
              <tr className={trClass}>
                <td className="p-2 font-bold bg-white">Upper Floors</td>
                <td className="p-2 bg-white"><DocField name="upperUse" value={formData.upperUse} mode={editMode} onChange={handleChange} /></td>
                <td className="p-2 bg-white"><DocField name="upperNo" value={formData.upperNo} mode={editMode} onChange={handleChange} /></td>
                <td className="p-2 bg-white"><DocField name="upperArea" value={formData.upperArea} mode={editMode} onChange={handleChange} /></td>
              </tr>
            </tbody>
          </table>
        </div>
        <h4 className="font-bold mb-2 text-[14px]">C. MORTGAGE DETAILS</h4>
        <div className={tableWrapperClass}>
          <table className={tableClass}>
            <tbody className="divide-y divide-slate-400">
              <tr className={trClass}>
                <td className="p-2 font-bold bg-[#f4f7fb] w-1/4">Mortgage Deed No</td><td className="p-2 w-1/4"><DocField name="mortgageDeedNo" value={formData.mortgageDeedNo} mode={editMode} onChange={handleChange} /></td>
                <td className="p-2 font-bold bg-[#f4f7fb] w-1/4">Date</td><td className="p-2 w-1/4"><DocField name="mortgageDate" value={formData.mortgageDate} mode={editMode} onChange={handleChange} /></td>
              </tr>
              <tr className={trClass}>
                <td className="p-2 font-bold bg-[#f4f7fb]">Floors Handed Over</td><td className="p-2"><DocField name="floorsHandedOver" value={formData.floorsHandedOver} mode={editMode} onChange={handleChange} /></td>
                <td className="p-2 font-bold bg-[#f4f7fb]">Mortgage Area (Sq mt)</td><td className="p-2"><DocField name="mortgageArea" value={formData.mortgageArea} mode={editMode} onChange={handleChange} /></td>
              </tr>
              <tr className={trClass}>
                <td className="p-2 font-bold bg-[#f4f7fb]">SRO</td><td className="p-2"><DocField name="sro" value={formData.sro} mode={editMode} onChange={handleChange} /></td>
                <td className="p-2 font-bold bg-[#f4f7fb]">Market Value</td><td className="p-2"><DocField name="marketValue" value={formData.marketValue} mode={editMode} onChange={handleChange} /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </PageShell>

      {/* --- PAGE 3 --- */}
      <PageShell>
        

        <p className="font-bold mb-4">The approval for building construction is issued subject to the following conditions:</p>
        
        <ol className="list-decimal pl-5 space-y-3 text-justify text-[12.5px] leading-relaxed">
          <li>The approval issued does not confer upon any ownership rights over the property. The applicant is solely responsible for legal litigations or disputes if any.</li>
          <li>The extent of the plot should not be a part of bigger plot split for this purpose as per the declaration.</li>
          <li>Applicant should not construct more than Ground Floor + 1 Upper Floor. Any further construction beyond will be liable for penalty / demolition without notice.</li>
          <li>If the abutting road width is less than 30 feet (9.00Mts.), 15 feet (4.5Mts.) from the center of the existing road has to be left for road widening in addition to front setback as per rule 4(a) of G.O. Ms. No. 168 MA dt:07-04-2012 and its amendments or required area affected under Master Plan road.</li>
          <li>The proposed construction should be in conformity with the master plan land use and zoning regulations.</li>
          <li>No building activity shall be carried out in certain area as per rule 3 of G.O. Ms. No. 168 MA dt:07 04-2012 and its amendments.</li>
          <li>Applicant shall construct rain water harvesting pits, and plant Trees with in the plot at appropriate location as per G.O.Ms.No.350 MA dt: 09-06-2000.</li>
          <li>The applicant shall commence the construction within 6 months and should complete with in a period of 3 years from date of approval for building constructions. Further, applicant shall upload the photographs of commencement of construction within 6 months as per 174 (13) of Telangana Municipalities Act 2019 & G.O.Ms No. 62MA&UD;, dt. 21.03.2020</li>
          <li>Applicant is liable for penal action as per Telangana Municipalities Act, 2019 in case of misrepresentation or false declaration and the Certificate of Registration will be rejected and construction there reupon will be demolished by following the due procedure of law.</li>
          <li>The area mortgaged will be released on submission of building completion certificate and occupancy certificate.</li>
          <li>If there are any Court cases pending, the proposal is subject to outcome of Court Orders.</li>
          <li>The issued proceedings are valid for any financial assistance / loan from financial institutions</li>
          <li>All the conditions mentioned in Provisional Permit Order shall be followed scrupulously.</li>
        </ol>

        <div className="flex justify-between items-end mt-16 px-4">
          <div className="w-32 h-32 border border-gray-300 bg-gray-100 flex items-center justify-center relative">
            <span className="text-gray-400 text-xs text-center px-2">QR Code Placeholder</span>
          </div>
          <div className="text-left w-64">
            <p className="mb-6">Yours Faithfully</p>
            <div className="w-10 h-10 mb-2 border-b-4 border-l-4 border-green-500 transform -rotate-45 ml-2"></div>
            <p>Commissioner</p>
            <p><DocField inline name="municipality" value={formData.municipality} mode={editMode} onChange={handleChange} /></p>
            <p className="text-gray-500 text-xs mt-1"><DocField inline name="permitDate" value={formData.permitDate} mode={editMode} onChange={handleChange} /> 17:53:45</p>
          </div>
        </div>

        <div className="text-center mt-8 pb-4">
          <p className="text-[12px] text-gray-500">NOTE: This is computer generated letter, doesn't require any manual signatures</p>
        </div>
      </PageShell>
    </>
  );
}