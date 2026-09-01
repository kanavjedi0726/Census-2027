import type { MythItem, PrivacyItem } from '../types';

export const censusMythsData: MythItem[] = [
  {
    id: 'myth-1',
    category: 'Privacy',
    icon: 'ShieldAlert',
    rumor: 'Rumor: Census data will be shared with the Income Tax Department or Police to check personal bank records and taxes.',
    truth: 'FACT: Section 15 of the Census Act, 1948 strictly prohibits sharing individual census information with any government agency, tax authority, or court. Individual answers cannot be used as evidence in any legal proceedings.',
    legalReference: 'Census Act 1948, Section 15 (Records of Census not open to inspection nor admissible in evidence)'
  },
  {
    id: 'myth-2',
    category: 'Documents',
    icon: 'FileText',
    rumor: 'Rumor: Citizens must keep birth certificates, property ownership registry papers, and citizenship proofs ready for the census enumerator.',
    truth: 'FACT: The Indian Census is 100% self-declaratory. Enumerators DO NOT ask for, verify, or collect any physical documents, IDs, passport copies, or registry deeds.',
    legalReference: 'Office of the Registrar General & Census Commissioner, India (ORGI Guidelines)'
  },
  {
    id: 'myth-3',
    category: 'Financial',
    icon: 'Lock',
    rumor: 'Rumor: Enumerators or the online portal will ask for Bank Account numbers or OTPs to verify benefit schemes.',
    truth: 'FACT: Official Census NEVER asks for bank account details, UPI PINs, ATM cards, OTPs, or financial net-worth. Anyone asking for financial details is a cyber criminal.',
    legalReference: 'Ministry of Home Affairs Cyber Crime & Census Safety Advisory'
  },
  {
    id: 'myth-4',
    category: 'Citizenship',
    icon: 'Globe',
    rumor: 'Rumor: The Digital Census will collect fingerprint and iris biometrics.',
    truth: 'FACT: No biometrics (fingerprints, face scan, or iris scan) are collected during either Phase 1 or Phase 2 of Census 2027. It is purely an alphanumeric socio-demographic survey.',
    legalReference: 'Census 2027 Technical Architecture & Privacy Framework'
  }
];

export const privacyMatrixData: PrivacyItem[] = [
  {
    field: 'Family Demographics & Age',
    status: 'collected',
    description: 'Name, age, gender, marital status, relationship to household head',
    whyNeeded: 'Crucial for calculating dependency ratios, pension planning, and child immunisation programs.',
    safeguard: 'Anonymised and aggregated at district and block levels only.'
  },
  {
    field: 'Housing Quality & Amenities',
    status: 'collected',
    description: 'Wall/roof materials, drinking water source, toilet access, electricity, cooking fuel',
    whyNeeded: 'Determines national infrastructure gaps in drinking water (Jal Jeevan Mission), housing (PMAY), and clean energy.',
    safeguard: 'No individual property scoring; only geographical statistical tables.'
  },
  {
    field: 'Education & Mother Tongue',
    status: 'collected',
    description: 'Literacy status, highest completed education degree, languages spoken',
    whyNeeded: 'Used for linguistic preservation, school allocation, and regional skill development initiatives.',
    safeguard: 'Complete freedom of self-declaration without proof certificates.'
  },
  {
    field: 'Bank Account & Card Details',
    status: 'never_asked',
    description: 'Account numbers, IFSC, credit/debit card numbers, UPI PINs',
    whyNeeded: 'NEVER NEEDED. Census is not a direct financial transaction or taxation tool.',
    safeguard: 'Strict penalty under Indian Penal Code and IT Act for impostors.'
  },
  {
    field: 'Biometric Identifiers',
    status: 'never_asked',
    description: 'Fingerprint scans, Iris scans, Facial geometry',
    whyNeeded: 'NEVER COLLECTED. Census does not collect or store biometric markers.',
    safeguard: 'No biometric hardware is issued to or used by enumerators.'
  },
  {
    field: 'Physical Proof Documents',
    status: 'never_asked',
    description: 'Birth certificates, land deeds, Aadhaar card photocopies',
    whyNeeded: 'NEVER COLLECTED. The entire census relies on citizen verbal/online self-declaration.',
    safeguard: 'Citizens are not required to produce any document to enumerators.'
  }
];
