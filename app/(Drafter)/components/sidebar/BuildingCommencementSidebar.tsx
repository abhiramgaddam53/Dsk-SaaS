import React from 'react';
import { InputField } from '../shared/FormFields';

export default function BuildingCommencementSidebar({ formData, handleChange }: any) {
  return (
    <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
      
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3.5 h-3.5 bg-[#00a0ef] rounded-[2px]" />
          <h3 className="text-[12px] font-semibold text-gray-800">Permit & Basic Details</h3>
        </div>
        <div className="grid grid-cols-2 gap-2 pl-5">
          <InputField label="File No" name="fileNo" value={formData.fileNo} onChange={handleChange} />
          <InputField label="Permit No" name="permitNo" value={formData.permitNo} onChange={handleChange} />
          <InputField label="Permit Date" name="permitDate" value={formData.permitDate} onChange={handleChange} />
          <InputField label="Prov. Permit No" name="provisionalPermitNo" value={formData.provisionalPermitNo} onChange={handleChange} />
          <InputField label="Prov. Permit Date" name="provisionalPermitDate" value={formData.provisionalPermitDate} onChange={handleChange} />
          <InputField label="Verification Date" name="postVerificationDate" value={formData.postVerificationDate} onChange={handleChange} />
          <InputField label="Applicant Name" name="applicantName" value={formData.applicantName} onChange={handleChange} />
          <InputField label="Father's Name" name="fatherName" value={formData.fatherName} onChange={handleChange} />
        </div>
        <div className="pl-5 mt-1">
          <label className="block text-[10px] font-semibold text-gray-500 uppercase mb-1">Address</label>
          <textarea name="address" value={formData.address} onChange={handleChange} rows={2} className="w-full px-2 py-1.5 border border-gray-300 rounded text-[12px] text-gray-800 focus:outline-none focus:border-[#00a0ef] focus:ring-1 focus:ring-[#00a0ef] resize-none transition-colors"></textarea>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3.5 h-3.5 bg-[#00a0ef] rounded-[2px]" />
          <h3 className="text-[12px] font-semibold text-gray-800">Location Details</h3>
        </div>
        <div className="grid grid-cols-2 gap-2 pl-5">
          <InputField label="Municipality" name="municipality" value={formData.municipality} onChange={handleChange} />
          <InputField label="District" name="district" value={formData.district} onChange={handleChange} />
          <InputField label="Village" name="village" value={formData.village} onChange={handleChange} />
          <InputField label="Mandal" name="mandal" value={formData.mandal} onChange={handleChange} />
          <InputField label="Locality" name="locality" value={formData.locality} onChange={handleChange} />
          <InputField label="Street" name="street" value={formData.street} onChange={handleChange} />
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3.5 h-3.5 bg-[#00a0ef] rounded-[2px]" />
          <h3 className="text-[12px] font-semibold text-gray-800">Building & Site Info</h3>
        </div>
        <div className="pl-5">
          <InputField label="Building Type" name="buildingType" value={formData.buildingType} onChange={handleChange} />
          <InputField label="Floors Desc." name="floorsDesc" value={formData.floorsDesc} onChange={handleChange} />
          <InputField label="Plot No" name="plotNo" value={formData.plotNo} onChange={handleChange} />
          <InputField label="Survey No" name="surveyNo" value={formData.surveyNo} onChange={handleChange} />
          <div className="grid grid-cols-2 gap-2">
            <InputField label="Extent (Sq mt)" name="extent" value={formData.extent} onChange={handleChange} />
            <InputField label="Road Affected" name="roadAffectedArea" value={formData.roadAffectedArea} onChange={handleChange} />
            <InputField label="Net Plot Area" name="netPlotArea" value={formData.netPlotArea} onChange={handleChange} />
            <InputField label="Rain Pits" name="rainWaterPits" value={formData.rainWaterPits} onChange={handleChange} />
            <InputField label="Trees" name="trees" value={formData.trees} onChange={handleChange} />
            <InputField label="Height (m)" name="height" value={formData.height} onChange={handleChange} />
            <InputField label="Dwelling Units" name="dwellingUnits" value={formData.dwellingUnits} onChange={handleChange} />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3.5 h-3.5 bg-[#00a0ef] rounded-[2px]" />
          <h3 className="text-[12px] font-semibold text-gray-800">Floors & Areas</h3>
        </div>
        <div className="pl-5">
          <div className="grid grid-cols-2 gap-2 mb-2">
            <InputField label="Front Setback" name="frontSetback" value={formData.frontSetback} onChange={handleChange} />
            <InputField label="Rear Setback" name="rearSetback" value={formData.rearSetback} onChange={handleChange} />
            <InputField label="Side I Setback" name="side1Setback" value={formData.side1Setback} onChange={handleChange} />
            <InputField label="Side II Setback" name="side2Setback" value={formData.side2Setback} onChange={handleChange} />
          </div>
          <div className="border-t border-gray-200 my-3"></div>
          <p className="text-[10px] font-bold text-gray-500 mb-2">STILT</p>
          <div className="grid grid-cols-3 gap-2">
            <InputField label="Use" name="stiltUse" value={formData.stiltUse} onChange={handleChange} />
            <InputField label="No." name="stiltNo" value={formData.stiltNo} onChange={handleChange} />
            <InputField label="Area" name="stiltArea" value={formData.stiltArea} onChange={handleChange} />
          </div>
          <p className="text-[10px] font-bold text-gray-500 mb-2">GROUND FLOOR</p>
          <div className="grid grid-cols-3 gap-2">
            <InputField label="Use" name="groundUse" value={formData.groundUse} onChange={handleChange} />
            <InputField label="No." name="groundNo" value={formData.groundNo} onChange={handleChange} />
            <InputField label="Area" name="groundArea" value={formData.groundArea} onChange={handleChange} />
          </div>
          <p className="text-[10px] font-bold text-gray-500 mb-2">UPPER FLOORS</p>
          <div className="grid grid-cols-3 gap-2">
            <InputField label="Use" name="upperUse" value={formData.upperUse} onChange={handleChange} />
            <InputField label="No." name="upperNo" value={formData.upperNo} onChange={handleChange} />
            <div className="col-span-3">
              <InputField label="Area Description" name="upperArea" value={formData.upperArea} onChange={handleChange} />
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3.5 h-3.5 bg-[#00a0ef] rounded-[2px]" />
          <h3 className="text-[12px] font-semibold text-gray-800">Mortgage Details</h3>
        </div>
        <div className="grid grid-cols-2 gap-2 pl-5">
          <InputField label="Mortgage Deed" name="mortgageDeedNo" value={formData.mortgageDeedNo} onChange={handleChange} />
          <InputField label="Mortgage Date" name="mortgageDate" value={formData.mortgageDate} onChange={handleChange} />
          <InputField label="Floors Handed" name="floorsHandedOver" value={formData.floorsHandedOver} onChange={handleChange} />
          <InputField label="Mortgage Area" name="mortgageArea" value={formData.mortgageArea} onChange={handleChange} />
          <InputField label="SRO" name="sro" value={formData.sro} onChange={handleChange} />
          <InputField label="Market Value" name="marketValue" value={formData.marketValue} onChange={handleChange} />
        </div>
      </div>

    </div>
  );
}