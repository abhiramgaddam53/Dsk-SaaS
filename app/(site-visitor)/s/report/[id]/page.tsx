// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { Landmark, Building, UploadCloud, ArrowLeft, Loader, FileText, Map as MapIcon, User } from 'lucide-react';
// import { api } from '@/app/lib/userApis'; // Adjust path to your api.ts

// export default function ViewReportPage() {
//   const params = useParams();
//   const router = useRouter();
//   const [report, setReport] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchReport = async () => {
//       try {
//         if (params.id) {
//           // Assuming you add getValuationRecordById to your api.ts
//           // Alternatively, you can fetch all and filter if your API doesn't support by-id yet.
//           const data = await api.getValuationRecordById(params.id as string);
//           console.log(data)
//           // If the API returns an array, use data[0]. If it returns the object directly, use data.
//           setReport(Array.isArray(data) ? data[0] : data); 
//         }
//       } catch (error) {
//         console.error("Failed to fetch report details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReport();
//   }, [params.id]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="flex flex-col items-center gap-3">
//           <Loader className="w-8 h-8 text-[#00a0ef] animate-spin" />
//           <p className="text-gray-500 font-medium">Loading report details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!report) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center flex-col gap-4">
//         <h2 className="text-xl font-bold text-gray-800">Report not found</h2>
//         <button onClick={() => router.back()} className="text-[#00a0ef] hover:underline">Go back</button>
//       </div>
//     );
//   }

//   // --- Helper UI Components ---
//   const MainCategory = ({ title, icon: Icon, children }: any) => (
//     <div className="mb-6 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
//       <div className="flex items-center gap-2 p-4 border-b border-gray-100 bg-gray-50/50">
//         <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-100 text-[#00a0ef]">
//           <Icon className="w-4 h-4" />
//         </div>
//         <h3 className="text-[16px] font-bold text-gray-900">{title}</h3>
//       </div>
//       <div className="p-4 md:p-6">{children}</div>
//     </div>
//   );

//   const SubCategory = ({ title, children }: any) => (
//     <div className="py-4 border-b border-gray-100 last:border-0 first:pt-0">
//       <h4 className="text-[14px] font-bold text-[#00a0ef] mb-4">{title}</h4>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-5 gap-x-6">{children}</div>
//     </div>
//   );

//   const DataField = ({ label, value }: { label: string, value: any }) => (
//     <div>
//       <p className="text-[12px] text-gray-500 font-medium mb-1.5">{label}</p>
//       <div className="text-[14px] font-medium text-gray-900 break-words bg-gray-50 px-3 py-2 rounded-lg border border-gray-100 min-h-[42px] flex items-center">
//         {value === null || value === undefined || value === '' ? (
//           <span className="text-gray-400 italic">N/A</span>
//         ) : (
//           value
//         )}
//       </div>
//     </div>
//   );

//   const getStatusBadge = (status: string) => {
//     const s = status?.toLowerCase() || '';
//     if (s.includes('pending')) return "bg-orange-100 text-orange-700 border-orange-200";
//     if (s.includes('completed')) return "bg-emerald-100 text-emerald-700 border-emerald-200";
//     return "bg-blue-100 text-blue-700 border-blue-200";
//   };

//   const formatStatus = (rawStatus: string) => {
//     if (!rawStatus) return 'Unknown';
//     return rawStatus.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-5xl mx-auto">
        
//         {/* Header */}
//         <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
//           <div>
//             <button onClick={() => router.push('/s/dashboard')} className="flex items-center text-gray-500 hover:text-gray-900 transition-colors text-[13px] font-medium mb-3">
//               <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Dashboard
//             </button>
//             <div className="flex items-center gap-3">
//               <h1 className="text-2xl font-bold text-gray-900">Report Details</h1>
//               <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(report.status)}`}>
//                 {formatStatus(report.status)}
//               </span>
//             </div>
//             <p className="text-gray-500 text-sm mt-1">ID: <span className="font-mono">{report.id}</span></p>
//           </div>
//         </div>

//         <div className="space-y-6">
//           {/* Client & Owner Section */}
//           <MainCategory title="Client & Owner Information" icon={User}>
//             <SubCategory title="Client / Bank Details">
//               <DataField label="Bank Name" value={report.clientBank?.bankName} />
//               <DataField label="Branch" value={report.clientBank?.branch} />
//               <DataField label="IFSC Code" value={report.clientBank?.ifsc} />
//               <DataField label="Email" value={report.clientBank?.email} />
//               <DataField label="Point of Contact" value={`${report.clientBank?.contactPersonName || ''} - ${report.clientBank?.contactPersonNumber || ''}`} />
//               <DataField label="Valuation Purpose" value={report.clientBank?.purposeOfValuation} />
//               <DataField label="Property Type" value={report.clientBank?.propertyType} />
//               <DataField label="Inspection Date" value={report.clientBank?.dateOfInspection} />
//               <DataField label="Valuation Date" value={report.clientBank?.dateOfValuation} />
//             </SubCategory>

//             <SubCategory title="Owner Details">
//               <DataField label="Owner Name" value={`${report.owner?.prefix || ''} ${report.owner?.ownerName || ''}`} />
//               <DataField label="Relation" value={`${report.owner?.relation || ''} ${report.owner?.relationName || ''}`} />
//               <DataField label="Occupation" value={report.owner?.occupation} />
//               <DataField label="Primary Phone" value={report.owner?.phone1} />
//               <DataField label="Alternate Phone" value={report.owner?.phone2} />
//             </SubCategory>
//           </MainCategory>

//           {/* Property & Locality Section */}
//           <MainCategory title="Property & Locality" icon={MapIcon}>
//             <SubCategory title="Locality Classification">
//               <DataField label="Urban / Rural" value={report.locality?.urbanRural} />
//               <DataField label="Locality Class" value={report.locality?.localityClass} />
//               <DataField label="Land Tenure" value={report.locality?.landTenure} />
//               <DataField label="Width of Road" value={report.locality?.widthOfRoad} />
//               <DataField label="No. of Stories" value={report.locality?.noOfStories} />
//               <DataField label="Townplan" value={report.locality?.townplan} />
//               <DataField label="Sanitary Fitting" value={report.locality?.sanitaryFitting} />
//               <DataField label="Electrical Fitting" value={report.locality?.electricalFitting} />
//             </SubCategory>

//             <SubCategory title="Property Details">
//               <DataField label="Address" value={report.property?.address} />
//               <DataField label="Nature of Property" value={report.property?.natureOfProperty} />
//               <DataField label="Vacant Plot" value={report.property?.vacantPlot} />
//               <DataField label="Plot Shape" value={report.property?.plotShape} />
//               <DataField label="Dimensions" value={`L: ${report.property?.length || '0'} x B: ${report.property?.breadth || '0'} (${report.property?.dimensionUnit || ''})`} />
//               <DataField label="Calculated Area" value={`${report.property?.calculatedArea || '0'} ${report.property?.conversionUnit || ''}`} />
//               <DataField label="Wall Type & Sides" value={`${report.property?.brickType || ''} (Sides: ${report.property?.wallsOnSide || '0'})`} />
//               <DataField label="Wall Dimensions" value={`L: ${report.property?.wallLength || '0'} x H: ${report.property?.wallHeight || '0'} (${report.property?.wallUnit || ''})`} />
//               <DataField label="Coordinates" value={report.property?.latitude && report.property?.longitude ? `${report.property?.latitude}, ${report.property?.longitude}` : 'Not provided'} />
//             </SubCategory>
            
//             {report.negativePoints && report.negativePoints.length > 0 && (
//               <SubCategory title="Negative Points">
//                 <div className="col-span-full">
//                   <div className="flex flex-wrap gap-2">
//                     {report.negativePoints.map((point: string, idx: number) => (
//                       <span key={idx} className="px-3 py-1.5 bg-red-50 text-red-700 border border-red-100 rounded-md text-sm font-medium">
//                         {point}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               </SubCategory>
//             )}
//           </MainCategory>

//           {/* Boundaries Section */}
//           <MainCategory title="Site Boundaries" icon={MapIcon}>
//             <SubCategory title={`Boundary Details (Unit: ${report.boundaries?.unit || 'N/A'})`}>
//               <DataField label="North (Doc / Act)" value={`${report.boundaries?.northDoc || 'N/A'} / ${report.boundaries?.northAct || 'N/A'}`} />
//               <DataField label="South (Doc / Act)" value={`${report.boundaries?.southDoc || 'N/A'} / ${report.boundaries?.southAct || 'N/A'}`} />
//               <DataField label="East (Doc / Act)" value={`${report.boundaries?.eastDoc || 'N/A'} / ${report.boundaries?.eastAct || 'N/A'}`} />
//               <DataField label="West (Doc / Act)" value={`${report.boundaries?.westDoc || 'N/A'} / ${report.boundaries?.westAct || 'N/A'}`} />
//             </SubCategory>
//           </MainCategory>

//           {/* Floors Section */}
//           {report.floors && report.floors.length > 0 && (
//             <MainCategory title="Floor Details" icon={Building}>
//               {report.floors.map((floor: any) => (
//                 <SubCategory key={floor.id} title={`Floor: ${floor.floorName}`}>
//                   <DataField label="Possession" value={floor.possessionWith} />
//                   <DataField label="Covered Area" value={`${floor.coveredArea || '0'} ${floor.conversionUnit || ''}`} />
//                   <DataField label="Condition" value={floor.condition} />
//                   <DataField label="Structure" value={floor.structure} />
//                   <DataField label="Flooring" value={floor.flooring} />
//                   <DataField label="Accommodation" value={floor.accommodation} />
//                   <DataField label="Doors/Windows" value={floor.doorsWindows} />
//                   <DataField label="Remarks" value={floor.floorRemarks} />
//                 </SubCategory>
//               ))}
//             </MainCategory>
//           )}

//           {/* Market Details Section */}
//           <MainCategory title="Market & Valuations" icon={Landmark}>
//             <SubCategory title="General Market Details">
//               <DataField label="Year of Construction" value={report.market?.yearOfConstruction} />
//               <DataField label="Renovation" value={report.market?.renovation} />
//               <DataField label="Parking" value={report.market?.parking} />
//               <DataField label="Lift" value={report.market?.lift} />
//               <DataField label="Kitchen Type" value={report.market?.kitchenType} />
//               <DataField label="Rental Income" value={`${report.market?.rentalMin || '0'} - ${report.market?.rentalMax || '0'} ${report.market?.rentalUnit || ''}`} />
//             </SubCategory>

//             <SubCategory title="Market Rates">
//               <DataField label="Client Rate" value={`${report.market?.marketClientMin || '0'} - ${report.market?.marketClientMax || '0'} ${report.market?.marketClientUnit || ''}`} />
//               <DataField label="Dealer Rate" value={`${report.market?.marketDealerMin || '0'} - ${report.market?.marketDealerMax || '0'} ${report.market?.marketDealerUnit || ''}`} />
//               <DataField label="Market Rate" value={`${report.market?.marketMarketMin || '0'} - ${report.market?.marketMarketMax || '0'} ${report.market?.marketMarketUnit || ''}`} />
//             </SubCategory>

//             <SubCategory title="Dealer Info">
//               <DataField label="Dealer Name" value={report.market?.dealerName} />
//               <DataField label="Dealer Mobile" value={report.market?.dealerMobile} />
//             </SubCategory>
//           </MainCategory>

//           {/* Uploads Section */}
//           <MainCategory title="Uploaded Assets" icon={UploadCloud}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <h4 className="text-[14px] font-bold text-gray-700 mb-3 border-b border-gray-100 pb-2">Documents</h4>
//                 {report.uploads?.documents?.length > 0 ? (
//                   <ul className="space-y-2">
//                     {report.uploads.documents.map((doc: string, idx: number) => (
//                       <li key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg text-sm text-[#00a0ef] hover:underline cursor-pointer">
//                         <FileText className="w-4 h-4" /> Document {idx + 1}
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p className="text-sm text-gray-400 italic">No documents uploaded</p>
//                 )}
//               </div>
              
//               <div>
//                 <h4 className="text-[14px] font-bold text-gray-700 mb-3 border-b border-gray-100 pb-2">Photos</h4>
//                 {report.uploads?.photos?.length > 0 ? (
//                   <ul className="space-y-2">
//                     {report.uploads.photos.map((photo: string, idx: number) => (
//                       <li key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg text-sm text-[#00a0ef] hover:underline cursor-pointer">
//                         <FileText className="w-4 h-4" /> Photo {idx + 1}
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p className="text-sm text-gray-400 italic">No photos uploaded</p>
//                 )}
//               </div>
//             </div>
//           </MainCategory>

//         </div>
//       </div>
//     </div>
//   );
// }

'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Landmark, Building, UploadCloud, ArrowLeft, Loader, FileText, Map as MapIcon, User, ExternalLink } from 'lucide-react';
import { api } from '@/app/lib/userApis'; // Adjust path to your api.ts

export default function ViewReportPage() {
  const params = useParams();
  const router = useRouter();
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        if (params.id) {
          const data = await api.getValuationRecordById(params.id as string);
          setReport(Array.isArray(data) ? data[0] : data); 
          console.log(data);
        }
      } catch (error) {
        console.error("Failed to fetch report details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader className="w-8 h-8 text-[#00a0ef] animate-spin" />
          <p className="text-gray-500 font-medium">Loading report details...</p>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center flex-col gap-4">
        <h2 className="text-xl font-bold text-gray-800">Report not found</h2>
        <button onClick={() => router.back()} className="text-[#00a0ef] hover:underline">Go back</button>
      </div>
    );
  }

  // --- Helper UI Components ---
  const MainCategory = ({ title, icon: Icon, children }: any) => (
    <div className="mb-6 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="flex items-center gap-2 p-4 border-b border-gray-100 bg-gray-50/50">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-100 text-[#00a0ef]">
          <Icon className="w-4 h-4" />
        </div>
        <h3 className="text-[16px] font-bold text-gray-900">{title}</h3>
      </div>
      <div className="p-4 md:p-6">{children}</div>
    </div>
  );

  const SubCategory = ({ title, children }: any) => (
    <div className="py-4 border-b border-gray-100 last:border-0 first:pt-0">
      <h4 className="text-[14px] font-bold text-[#00a0ef] mb-4">{title}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-5 gap-x-6">{children}</div>
    </div>
  );

  const DataField = ({ label, value }: { label: string, value: any }) => (
    <div>
      <p className="text-[12px] text-gray-500 font-medium mb-1.5">{label}</p>
      <div className="text-[14px] font-medium text-gray-900 break-words bg-gray-50 px-3 py-2 rounded-lg border border-gray-100 min-h-[42px] flex items-center">
        {value === null || value === undefined || value === '' ? (
          <span className="text-gray-400 italic">N/A</span>
        ) : (
          value
        )}
      </div>
    </div>
  );

  const getStatusBadge = (status: string) => {
    const s = status?.toLowerCase() || '';
    if (s.includes('pending')) return "bg-orange-100 text-orange-700 border-orange-200";
    if (s.includes('completed')) return "bg-emerald-100 text-emerald-700 border-emerald-200";
    return "bg-blue-100 text-blue-700 border-blue-200";
  };

  const formatStatus = (rawStatus: string) => {
    if (!rawStatus) return 'Unknown';
    return rawStatus.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  };

  // Utility to extract the original filename from the Firebase URL
  const extractFileName = (url: string) => {
    try {
      const decoded = decodeURIComponent(url.split('?')[0]);
      const fullFileName = decoded.split('/').pop() || 'Document';
      const parts = fullFileName.split('_');
      // If it starts with a timestamp (numbers), slice it off
      if (parts.length > 1 && !isNaN(Number(parts[0]))) {
        return parts.slice(1).join('_');
      }
      return fullFileName;
    } catch (e) {
      return 'Document';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <button onClick={() => router.push('/s/dashboard')} className="flex items-center text-gray-500 hover:text-gray-900 transition-colors text-[13px] font-medium mb-3">
              <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Dashboard
            </button>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">Report Details</h1>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(report.status)}`}>
                {formatStatus(report.status)}
              </span>
            </div>
            <p className="text-gray-500 text-sm mt-1">ID: <span className="font-mono">{report.id}</span></p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Client & Owner Section */}
          <MainCategory title="Client & Owner Information" icon={User}>
            <SubCategory title="Client / Bank Details">
              <DataField label="Bank Name" value={report.clientBank?.bankName} />
              <DataField label="Branch" value={report.clientBank?.branch} />
              <DataField label="IFSC Code" value={report.clientBank?.ifsc} />
              <DataField label="Email" value={report.clientBank?.email} />
              <DataField label="Point of Contact" value={`${report.clientBank?.contactPersonName || ''} - ${report.clientBank?.contactPersonNumber || ''}`} />
              <DataField label="Valuation Purpose" value={report.clientBank?.purposeOfValuation} />
              <DataField label="Property Type" value={report.clientBank?.propertyType} />
              <DataField label="Inspection Date" value={report.clientBank?.dateOfInspection} />
              <DataField label="Valuation Date" value={report.clientBank?.dateOfValuation} />
            </SubCategory>
            <SubCategory title="Owner Details">
              <DataField label="Owner Name" value={`${report.owner?.prefix || ''} ${report.owner?.ownerName || ''}`} />
              <DataField label="Relation" value={`${report.owner?.relation || ''} ${report.owner?.relationName || ''}`} />
              <DataField label="Occupation" value={report.owner?.occupation} />
              <DataField label="Primary Phone" value={report.owner?.phone1} />
              <DataField label="Alternate Phone" value={report.owner?.phone2} />
            </SubCategory>
          </MainCategory>

          {/* Property & Locality Section */}
          <MainCategory title="Property & Locality" icon={MapIcon}>
            <SubCategory title="Locality Classification">
              <DataField label="Urban / Rural" value={report.locality?.urbanRural} />
              <DataField label="Locality Class" value={report.locality?.localityClass} />
              <DataField label="Land Tenure" value={report.locality?.landTenure} />
              <DataField label="Width of Road" value={report.locality?.widthOfRoad} />
              <DataField label="No. of Stories" value={report.locality?.noOfStories} />
              <DataField label="Townplan" value={report.locality?.townplan} />
              <DataField label="Sanitary Fitting" value={report.locality?.sanitaryFitting} />
              <DataField label="Electrical Fitting" value={report.locality?.electricalFitting} />
            </SubCategory>
            <SubCategory title="Property Details">
              <DataField label="Address" value={report.property?.address} />
              <DataField label="Nature of Property" value={report.property?.natureOfProperty} />
              <DataField label="Vacant Plot" value={report.property?.vacantPlot} />
              <DataField label="Plot Shape" value={report.property?.plotShape} />
              <DataField label="Dimensions" value={`L: ${report.property?.length || '0'} x B: ${report.property?.breadth || '0'} (${report.property?.dimensionUnit || ''})`} />
              <DataField label="Calculated Area" value={`${report.property?.calculatedArea || '0'} ${report.property?.conversionUnit || ''}`} />
              <DataField label="Wall Type & Sides" value={`${report.property?.brickType || ''} (Sides: ${report.property?.wallsOnSide || '0'})`} />
              <DataField label="Wall Dimensions" value={`L: ${report.property?.wallLength || '0'} x H: ${report.property?.wallHeight || '0'} (${report.property?.wallUnit || ''})`} />
              <DataField label="Coordinates" value={report.property?.latitude && report.property?.longitude ? `${report.property?.latitude}, ${report.property?.longitude}` : 'Not provided'} />
            </SubCategory>
            
            {report.negativePoints && report.negativePoints.length > 0 && (
              <SubCategory title="Negative Points">
                <div className="col-span-full">
                  <div className="flex flex-wrap gap-2">
                    {report.negativePoints.map((point: string, idx: number) => (
                      <span key={idx} className="px-3 py-1.5 bg-red-50 text-red-700 border border-red-100 rounded-md text-sm font-medium">
                        {point}
                      </span>
                    ))}
                  </div>
                </div>
              </SubCategory>
            )}
          </MainCategory>

          {/* Boundaries Section */}
          <MainCategory title="Site Boundaries" icon={MapIcon}>
            <SubCategory title={`Boundary Dimensions (Unit: ${report.boundaries?.unit || 'N/A'})`}>
              <DataField label="North (Doc / Act)" value={`${report.boundaries?.northDoc || 'N/A'} / ${report.boundaries?.northAct || 'N/A'}`} />
              <DataField label="South (Doc / Act)" value={`${report.boundaries?.southDoc || 'N/A'} / ${report.boundaries?.southAct || 'N/A'}`} />
              <DataField label="East (Doc / Act)" value={`${report.boundaries?.eastDoc || 'N/A'} / ${report.boundaries?.eastAct || 'N/A'}`} />
              <DataField label="West (Doc / Act)" value={`${report.boundaries?.westDoc || 'N/A'} / ${report.boundaries?.westAct || 'N/A'}`} />
            </SubCategory>
            <SubCategory title="Boundary Textual Descriptions">
              <DataField label="North (Doc / Act)" value={`${report.boundaries?.northBoundaryDeed || 'N/A'} / ${report.boundaries?.northBoundaryActual || 'N/A'}`} />
              <DataField label="South (Doc / Act)" value={`${report.boundaries?.southBoundaryDeed || 'N/A'} / ${report.boundaries?.southBoundaryActual || 'N/A'}`} />
              <DataField label="East (Doc / Act)" value={`${report.boundaries?.eastBoundaryDeed || 'N/A'} / ${report.boundaries?.eastBoundaryActual || 'N/A'}`} />
              <DataField label="West (Doc / Act)" value={`${report.boundaries?.westBoundaryDeed || 'N/A'} / ${report.boundaries?.westBoundaryActual || 'N/A'}`} />
            </SubCategory>
          </MainCategory>

          {/* Floors Section */}
          {report.floors && report.floors.length > 0 && (
            <MainCategory title="Floor Details" icon={Building}>
              {report.floors.map((floor: any) => (
                <SubCategory key={floor.id} title={`Floor: ${floor.floorName}`}>
                  <DataField label="Possession" value={floor.possessionWith} />
                  <DataField label="Covered Area" value={`${floor.coveredArea || '0'} ${floor.conversionUnit || ''}`} />
                  <DataField label="Condition" value={floor.condition} />
                  <DataField label="Structure" value={floor.structure} />
                  <DataField label="Flooring" value={floor.flooring} />
                  <DataField label="Accommodation" value={floor.accommodation} />
                  <DataField label="Doors/Windows" value={floor.doorsWindows} />
                  <DataField label="Remarks" value={floor.floorRemarks} />
                </SubCategory>
              ))}
            </MainCategory>
          )}

          {/* Market Details Section */}
          <MainCategory title="Market & Valuations" icon={Landmark}>
            <SubCategory title="General Market Details">
              <DataField label="Year of Construction" value={report.market?.yearOfConstruction} />
              <DataField label="Renovation" value={report.market?.renovation} />
              <DataField label="Parking" value={report.market?.parking} />
              <DataField label="Lift" value={report.market?.lift} />
              <DataField label="Kitchen Type" value={report.market?.kitchenType} />
              <DataField label="Rental Income" value={`${report.market?.rentalMin || '0'} - ${report.market?.rentalMax || '0'} ${report.market?.rentalUnit || ''}`} />
            </SubCategory>
            <SubCategory title="Market Rates">
              <DataField label="Client Rate" value={`${report.market?.marketClientMin || '0'} - ${report.market?.marketClientMax || '0'} ${report.market?.marketClientUnit || ''}`} />
              <DataField label="Dealer Rate" value={`${report.market?.marketDealerMin || '0'} - ${report.market?.marketDealerMax || '0'} ${report.market?.marketDealerUnit || ''}`} />
              <DataField label="Market Rate" value={`${report.market?.marketMarketMin || '0'} - ${report.market?.marketMarketMax || '0'} ${report.market?.marketMarketUnit || ''}`} />
            </SubCategory>
            <SubCategory title="Dealer Info">
              <DataField label="Dealer Name" value={report.market?.dealerName} />
              <DataField label="Dealer Mobile" value={report.market?.dealerMobile} />
            </SubCategory>
          </MainCategory>

          {/* Uploads Section */}
          <MainCategory title="Uploaded Assets" icon={UploadCloud}>
            <div className="grid grid-cols-1 gap-8">
              
              {/* Photos Gallery */}
              <div>
                <h4 className="text-[14px] font-bold text-gray-700 mb-4 border-b border-gray-100 pb-2">Site Photos</h4>
                {report.uploads?.photos?.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {report.uploads.photos.map((photoUrl: string, idx: number) => (
                      <a 
                        key={idx} 
                        href={photoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="relative aspect-square rounded-lg border border-gray-200 overflow-hidden bg-gray-100 flex items-center justify-center group hover:shadow-md transition-all hover:border-[#00a0ef]"
                      >
                        <img 
                          src={photoUrl} 
                          alt={`Site Photo ${idx + 1}`} 
                          className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <ExternalLink className="text-white opacity-0 group-hover:opacity-100 w-6 h-6 drop-shadow-md" />
                        </div>
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 italic bg-gray-50 p-4 rounded-lg border border-gray-100">No photos uploaded</p>
                )}
              </div>

              {/* Documents List */}
              <div>
                <h4 className="text-[14px] font-bold text-gray-700 mb-4 border-b border-gray-100 pb-2">Documents</h4>
                {report.uploads?.documents?.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {report.uploads.documents.map((docUrl: string, idx: number) => {
                      const fileName = extractFileName(docUrl);
                      return (
                        <a 
                          key={idx} 
                          href={docUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-[#00a0ef] transition-colors group shadow-sm"
                        >
                          <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 group-hover:bg-[#00a0ef] group-hover:text-white transition-colors shrink-0">
                            <FileText className="w-5 h-5" />
                          </div>
                          <span className="text-[13px] font-medium text-gray-700 group-hover:text-[#00a0ef] truncate" title={fileName}>
                            {fileName || `Document ${idx + 1}`}
                          </span>
                        </a>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 italic bg-gray-50 p-4 rounded-lg border border-gray-100">No documents uploaded</p>
                )}
              </div>

            </div>
          </MainCategory>
        </div>
      </div>
    </div>
  );
}