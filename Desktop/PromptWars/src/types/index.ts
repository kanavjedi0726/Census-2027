export type Language = 'en' | 'hi' | 'ta' | 'bn' | 'te' | 'mr';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
}

export interface PhaseQuestion {
  id: number;
  title: string;
  category: 'housing' | 'amenities' | 'assets' | 'demographics' | 'education' | 'economic' | 'social';
  description: string;
  iconName: string;
}

export interface CensusPhase {
  id: 1 | 2;
  title: string;
  subtitle: string;
  badge: string;
  duration: string;
  questionsCount: number;
  objective: string;
  targetUnit: string;
  keyHighlights: string[];
  collectedData: PhaseQuestion[];
  mode: string;
}

export interface StateSchedule {
  id: string;
  name: string;
  hindiName: string;
  region: 'North' | 'South' | 'East' | 'West' | 'Central' | 'North-East' | 'Union Territory';
  phase1SelfEnum: string;
  phase1FieldVisit: string;
  phase2SelfEnum: string;
  phase2FieldVisit: string;
  status: 'Upcoming' | 'Active' | 'Closing Soon' | 'Completed';
  districtCount: number;
  portalLink: string;
}

export interface MythItem {
  id: string;
  rumor: string;
  truth: string;
  legalReference: string;
  category: 'Privacy' | 'Documents' | 'Citizenship' | 'Financial';
  icon: string;
}

export interface PrivacyItem {
  field: string;
  description: string;
  whyNeeded: string;
  status: 'collected' | 'never_asked';
  safeguard: string;
}

export interface CensusMember {
  id: string;
  fullName: string;
  relationship: string;
  gender: 'Male' | 'Female' | 'Transgender' | string;
  age: string | number;
  maritalStatus: string;
  religion?: string;
  casteCategory?: string;
  motherTongue: string;
  otherLanguages?: string;
  literacy?: string;
  literacyStatus?: string;
  educationLevel: string;
  occupation: string;
  workStatus?: string;
  disability?: string;
}

export interface SimulationFormData {
  state: string;
  district: string;
  subDistrict?: string;
  villageTown?: string;
  wardOrBlock?: string;
  pincode: string;
  mobileNumber: string;
  otp?: string;
  otpVerified: boolean;

  buildingNumber?: string;
  censusHouseNumber?: string;
  houseUse: string;
  wallMaterial: string;
  roofMaterial?: string;
  floorMaterial?: string;
  ownershipStatus?: string;
  dwellingRooms?: string;
  drinkingWaterSource: string;
  waterAvailability?: string;
  lightingSource?: string;
  latrineFacility: string;
  drainageSystem?: string;
  cookingFuel: string;
  assetsOwned: string[];

  headName: string;
  totalMembers?: number;
  totalRegularMembers?: number;
  members: CensusMember[];

  migrationReason?: string;
  lastResidence?: string;
  simulatedSubmittedAt?: string;
  referenceToken?: string;
}

export interface CensusInsightData {
  year: number;
  populationCrores: number;
  growthRatePct: number;
  sexRatio: number;
  literacyPct: number;
  urbanPct: number;
}
