// import { useState, useRef } from 'react';
// import { FormData, EditMode } from '@/app/(Drafter)/types/types';

// export function useDocumentEditor() {
//   const [zoom, setZoom] = useState(100);
//   const [selectedTemplate, setSelectedTemplate] = useState('provisional_building');
//   const [editMode, setEditMode] = useState<EditMode>('form');
//   const documentRef = useRef<HTMLDivElement>(null);

//   const [formData, setFormData] = useState<FormData>({
//     fileNo: '040815/ARMO/00245/IABP/2026',
//     date: '13/02/2026',
//     applicantName: 'Sri Bhusa Laxmi Narayana',
//     fatherName: 'Bhusa Laxman',
//     address: 'H.No. 1-3-129, Zirayath Nagar, Armoor Proper and Municipality, Dist. Nizamabad. 503224',
//     municipality: 'Armoor Municipality',
//     district: 'Nizamabad District',
//     buildingType: 'Individual Residential Building',
//     floorsDesc: 'Ground Floor + 1 Upper Floor',
//     extent: '199.27',
//     plotNo: 'Layout Plot No. 11 Part, In L.P. No. 9/2005/HRO, C.No. 46/05/HRO/H1,',
//     surveyNo: '218/P, 222/P AND 223/P',
//     village: 'Perkit&Kotarmoor;',
//     mandal: 'Armoor',
//     locality: 'Near To BC Hostel Road',
//     street: 'Near Bharath Chandra High School',
//     roadAffectedArea: '0',
//     netPlotArea: '199.27',
//     rainWaterPits: '3',
//     trees: '5',
//     height: '7.0',
//     dwellingUnits: '2',
//     frontSetback: '1.5',
//     rearSetback: '1.0',
//     side1Setback: '1.0',
//     side2Setback: '1.0',
//     stiltUse: '-', stiltNo: '-', stiltArea: '-',
//     groundUse: 'Residential', groundNo: '1', groundArea: '127.42',
//     upperUse: 'Residential', upperNo: '1', upperArea: 'Total Upper Floor Area: 127.42 Floor 1 Area: 127.42',
//     subDivision: '1993.0',
//     permitFee: '2549.0',
//     devChargesBuilt: '5097.0',
//     devChargesVacant: '503.0',
//     rainWaterDeposit: '1993.0',
//     postage: '200.0',
//     debris: '1000.0',
//     compoundWall: '897.0',
//     vacantLandTax: '811.0',
//     labourCess: '24688.0',
//     userCharges: '1000.0',
//     totalPayment: '40731.0',
//     mortgageDeedNo: '-',
//     mortgageDate: '-',
//     floorsHandedOver: '-',
//     mortgageArea: '-',
//     sro: '-',
//     marketValue: '1700.0',
//     commencedBefore: '12/08/2026',
//     completedBefore: '13/02/2029',
//     permitNo: '0211/ARMO/IA/2026',
//     permitDate: '05/03/2026',
//     provisionalPermitNo: '040815/ARMO/00245/IABP/2026',
//     provisionalPermitDate: '13/02/2026',
//     postVerificationDate: '05/03/2026',
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   // Add backend submit logic here later
//   const handleSubmitToBackend = async () => {
//     // await api.post('/templates', formData);
//     console.log('Saved to Backend:', formData);
//   };

//   return {
//     zoom, setZoom,
//     selectedTemplate, setSelectedTemplate,
//     editMode, setEditMode,
//     documentRef,
//     formData, handleChange,
//     handleSubmitToBackend
//   };
// }
import { useState, useRef } from 'react';
import { FormData, EditMode } from '@/app/(Drafter)/types/types';

export function useDocumentEditor() {
  const [zoom, setZoom] = useState(100);
  const [selectedTemplate, setSelectedTemplate] = useState('provisional_building');
  const [editMode, setEditMode] = useState<EditMode>('form');
  const documentRef = useRef<HTMLDivElement>(null);

  // Group data by template ID so they are completely isolated
  const [allFormData, setAllFormData] = useState<Record<string, FormData>>({
    provisional_building: {
      fileNo: '040815/ARMO/00245/IABP/2026',
      date: '13/02/2026',
      applicantName: 'Sri Bhusa Laxmi Narayana',
      fatherName: 'Bhusa Laxman',
      address: 'H.No. 1-3-129, Zirayath Nagar, Armoor Proper and Municipality, Dist. Nizamabad. 503224',
      municipality: 'Armoor Municipality',
      district: 'Nizamabad District',
      buildingType: 'Individual Residential Building',
      floorsDesc: 'Ground Floor + 1 Upper Floor',
      extent: '199.27',
      plotNo: 'Layout Plot No. 11 Part, In L.P. No. 9/2005/HRO, C.No. 46/05/HRO/H1,',
      surveyNo: '218/P, 222/P AND 223/P',
      village: 'Perkit&Kotarmoor;',
      mandal: 'Armoor',
      locality: 'Near To BC Hostel Road',
      street: 'Near Bharath Chandra High School',
      roadAffectedArea: '0',
      netPlotArea: '199.27',
      rainWaterPits: '3',
      trees: '5',
      height: '7.0',
      dwellingUnits: '2',
      frontSetback: '1.5',
      rearSetback: '1.0',
      side1Setback: '1.0',
      side2Setback: '1.0',
      stiltUse: '-', stiltNo: '-', stiltArea: '-',
      groundUse: 'Residential', groundNo: '1', groundArea: '127.42',
      upperUse: 'Residential', upperNo: '1', upperArea: 'Total Upper Floor Area: 127.42 Floor 1 Area: 127.42',
      subDivision: '1993.0',
      permitFee: '2549.0',
      devChargesBuilt: '5097.0',
      devChargesVacant: '503.0',
      rainWaterDeposit: '1993.0',
      postage: '200.0',
      debris: '1000.0',
      compoundWall: '897.0',
      vacantLandTax: '811.0',
      labourCess: '24688.0',
      userCharges: '1000.0',
      totalPayment: '40731.0',
      mortgageDeedNo: '-',
      mortgageDate: '-',
      floorsHandedOver: '-',
      mortgageArea: '-',
      sro: '-',
      marketValue: '1700.0',
      commencedBefore: '12/08/2026',
      completedBefore: '13/02/2029',
    } as FormData,

    building_valuation: {
      fileNo: '040815/ARMO/00245/IABP/2026',
      permitNo: '0211/ARMO/IA/2026',
      permitDate: '05/03/2026',
      provisionalPermitNo: '040815/ARMO/00245/IABP/2026',
      provisionalPermitDate: '13/02/2026',
      postVerificationDate: '05/03/2026',
      applicantName: 'Sri Bhusa Laxmi Narayana',
      fatherName: 'Bhusa Laxman',
      address: 'H.No. 1-3-129, Zirayath Nagar, Armoor Proper and Municipality, Dist. Nizamabad. 503224',
      municipality: 'Armoor Municipality',
      district: 'Nizamabad District',
      buildingType: 'Individual Residential Building',
      floorsDesc: 'Ground Floor + 1 Upper Floor',
      extent: '199.27',
      plotNo: 'Layout Plot No. 11 Part, In L.P. No. 9/2005/HRO, C.No. 46/05/HRO/H1,',
      surveyNo: '218/P, 222/P AND 223/P',
      village: 'Perkit&Kotarmoor;',
      mandal: 'Armoor',
      locality: 'Near To BC Hostel Road',
      street: 'Near Bharath Chandra High School',
      roadAffectedArea: '0',
      netPlotArea: '199.27',
      rainWaterPits: '3',
      trees: '5',
      height: '7.0',
      dwellingUnits: '2',
      frontSetback: '1.5',
      rearSetback: '1.0',
      side1Setback: '1.0',
      side2Setback: '1.0',
      stiltUse: '-', stiltNo: '-', stiltArea: '-',
      groundUse: 'Residential', groundNo: '1', groundArea: '127.42',
      upperUse: 'Residential', upperNo: '1', upperArea: 'Total Upper Floor Area: 127.42 Floor 1 Area: 127.42',
      mortgageDeedNo: '-',
      mortgageDate: '-',
      floorsHandedOver: '-',
      mortgageArea: '-',
      sro: '-',
      marketValue: '1700.0',
    } as FormData,
  });

  // Extract only the active template's data for the UI
  const formData = allFormData[selectedTemplate] || {};

  // Update ONLY the nested object corresponding to the active template
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAllFormData((prev) => ({
      ...prev,
      [selectedTemplate]: {
        ...prev[selectedTemplate],
        [name]: value,
      },
    }));
  };

  // Submit ONLY the isolated data for the active template
  const handleSubmitToBackend = async () => {
    const dataToSave = allFormData[selectedTemplate];
    // await api.post(`/documents/${selectedTemplate}`, dataToSave);
    console.log(`Saved ${selectedTemplate} to Backend:`, dataToSave);
  };

  return {
    zoom, setZoom,
    selectedTemplate, setSelectedTemplate,
    editMode, setEditMode,
    documentRef,
    formData, handleChange,
    handleSubmitToBackend
  };
}