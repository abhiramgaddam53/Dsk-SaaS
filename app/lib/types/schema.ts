// types/schema.ts

export interface CustomerProfile {
    id?: string;
    profileReference: string;
    owner: {
      prefix: string;
      ownerName: string;
      relation: string;
      relationName: string;
      occupation: string;
      phone1: string;
      phone2: string;
    };
    clientBank: {
      ifsc: string;
      bankName: string;
      branch: string;
      email: string;
      contactPersonName: string;
      contactPersonNumber: string;
    };
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface FloorDetail {
    id: string;
    floorName: string;
    possessionWith: string;
    unit: string;
    length: string;
    breadth: string;
    conversionUnit: string;
    coveredArea: string;
    condition: string;
    structure: string;
    flooring: string;
    accommodation: string;
    doorsWindows: string;
    floorRemarks: string;
  }
  
  export interface ValuationRecord {
    id?: string;
    customerId: string;
    status: 'pending_drafter' | 'drafting' | 'completed';
    assignedDrafterId?: string | null;
    templateId?: string | null;
    
    clientBank: {
      ifsc: string;
      bankName: string;
      branch: string;
      email: string;
      contactPersonName: string;
      contactPersonNumber: string;
      dateOfInspection: string;
      dateOfValuation: string;
      propertyType: string;
      purposeOfValuation: string;
    };
    
    owner: {
      prefix: string;
      ownerName: string;
      relation: string;
      relationName: string;
      occupation: string;
      phone1: string;
      phone2: string;
    };
    
    locality: {
      urbanRural: string;
      localityClass: string;
      landTenure: string;
      widthOfRoad: string;
      noOfStories: string;
      sanitaryFitting: string;
      electricalFitting: string;
      townplan: string;
    };
    
    property: {
      address: string;
      natureOfProperty: string;
      vacantPlot: string;
      widthOfRoad: string;
      latitude: string;
      longitude: string;
      boundaryCoordinates: { lat: number; lng: number }[];
      plotShape: string;
      dimensionUnit: string;
      length: string;
      breadth: string;
      conversionUnit: string;
      calculatedArea: string;
      wallUnit: string;
      wallLength: string;
      wallHeight: string;
      wallsOnSide: string;
      brickType: string;
    };
    
    boundaries: {
      unit: string;
      northDoc: string;
      northAct: string;
      southDoc: string;
      southAct: string;
      eastDoc: string;
      eastAct: string;
      westDoc: string;
      westAct: string;
    };
    
    floors: FloorDetail[];
    
    market: {
      yearOfConstruction: string;
      renovation: string;
      parking: string;
      lift: string;
      rentalMin: string;
      rentalMax: string;
      rentalUnit: string;
      kitchenType: string;
      marketClientMin: string;
      marketClientMax: string;
      marketClientUnit: string;
      marketDealerMin: string;
      marketDealerMax: string;
      marketDealerUnit: string;
      marketMarketMin: string;
      marketMarketMax: string;
      marketMarketUnit: string;
      dealerName: string;
      dealerMobile: string;
      additionalDetails: { key: string; value: string }[];
    };
    
    negativePoints: string[];
    
    uploads: {
      photos: string[]; 
      documents: string[]; 
    };
    
    dynamicFields?: Record<string, any>;
  
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
  }