import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import type { SimulationFormData, CensusMember } from '../types';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, ArrowRight, ArrowLeft, RotateCcw, ShieldCheck, 
  Smartphone, QrCode, Printer, Plus, Trash2, Home, Users, User,
  Check, Lock, Sparkles, Building, AlertCircle
} from 'lucide-react';

const initialMembers: CensusMember[] = [
  {
    id: 'mem-1',
    fullName: 'Rajesh Sharma',
    relationship: 'Self (Head)',
    gender: 'Male',
    age: '46',
    maritalStatus: 'Currently Married',
    religion: 'Hindu',
    casteCategory: 'General / Others',
    motherTongue: 'Hindi',
    otherLanguages: 'English, Punjabi',
    literacyStatus: 'Literate (Can read and write)',
    educationLevel: 'Graduate / Diploma',
    occupation: 'Private Sector Employee',
    workStatus: 'Main Worker',
    disability: 'None'
  },
  {
    id: 'mem-2',
    fullName: 'Sunita Sharma',
    relationship: 'Spouse',
    gender: 'Female',
    age: '42',
    maritalStatus: 'Currently Married',
    religion: 'Hindu',
    casteCategory: 'General / Others',
    motherTongue: 'Hindi',
    otherLanguages: 'English',
    literacyStatus: 'Literate (Can read and write)',
    educationLevel: 'Post-Graduate & above',
    occupation: 'Government / Public Sector',
    workStatus: 'Main Worker',
    disability: 'None'
  },
  {
    id: 'mem-3',
    fullName: 'Aarav Sharma',
    relationship: 'Son',
    gender: 'Male',
    age: '16',
    maritalStatus: 'Never Married',
    religion: 'Hindu',
    casteCategory: 'General / Others',
    motherTongue: 'Hindi',
    otherLanguages: 'English',
    literacyStatus: 'Literate (Can read and write)',
    educationLevel: 'Secondary (10th)',
    occupation: 'Student',
    workStatus: 'Non-Worker',
    disability: 'None'
  }
];

const initialFormData: SimulationFormData = {
  state: 'Delhi (NCT)',
  district: 'New Delhi',
  subDistrict: 'Chanakyapuri',
  villageTown: 'New Delhi (Municipal Council)',
  wardOrBlock: 'Ward No. 14 / Block C',
  pincode: '110001',
  mobileNumber: '9876543210',
  otpVerified: true,

  buildingNumber: 'B-42',
  censusHouseNumber: 'CHN-2027-8891',
  houseUse: 'Wholly Residential',
  wallMaterial: 'Pucca (Concrete/Brick/Cement)',
  roofMaterial: 'Reinforced Cement Concrete (RCC)',
  floorMaterial: 'Mosaic / Ceramic Tiles',
  ownershipStatus: 'Owned',
  dwellingRooms: '3 Rooms',
  drinkingWaterSource: 'Piped Tap Water inside Premises',
  waterAvailability: 'Available within premises 24x7',
  lightingSource: 'Electricity (Grid connection)',
  latrineFacility: 'Flush / Pour-flush Latrine within premises',
  drainageSystem: 'Closed Drainage System',
  cookingFuel: 'LPG / PNG Gas',
  assetsOwned: ['Television', 'Internet Connection / Wi-Fi', 'Laptop / Computer', 'Smartphone', 'Scooter / Motorcycle', 'Car / Jeep / Van'],

  headName: 'Rajesh Sharma',
  totalMembers: 3,
  members: initialMembers,

  migrationReason: 'Employment / Business Relocation',
  lastResidence: 'Jaipur, Rajasthan'
};

export const WalkthroughWizard: React.FC = () => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<SimulationFormData>(initialFormData);
  const [otpInput, setOtpInput] = useState('123456');
  const [otpSent, setOtpSent] = useState(true);
  const [otpError, setOtpError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceToken, setReferenceToken] = useState('CEN27-DL-88914-729X');

  const totalSteps = 7;

  const handleNext = () => {
    if (currentStep === 1 && !formData.otpVerified) {
      setOtpError(true);
      return;
    }
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: document.getElementById('walkthrough')?.offsetTop || 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleVerifyOtp = () => {
    if (otpInput.trim().length >= 4) {
      setFormData(prev => ({ ...prev, otpVerified: true }));
      setOtpError(false);
    } else {
      setOtpError(true);
    }
  };

  const handleAssetToggle = (asset: string) => {
    setFormData(prev => {
      const exists = prev.assetsOwned.includes(asset);
      return {
        ...prev,
        assetsOwned: exists 
          ? prev.assetsOwned.filter(a => a !== asset)
          : [...prev.assetsOwned, asset]
      };
    });
  };

  const handleMemberChange = (id: string, field: keyof CensusMember, value: string) => {
    setFormData(prev => ({
      ...prev,
      members: prev.members.map(m => m.id === id ? { ...m, [field]: value } : m)
    }));
  };

  const handleAddMember = () => {
    const newId = `mem-${Date.now()}`;
    const newMember: CensusMember = {
      id: newId,
      fullName: 'New Family Member',
      relationship: 'Daughter',
      gender: 'Female',
      age: '12',
      maritalStatus: 'Never Married',
      religion: 'Hindu',
      casteCategory: 'General / Others',
      motherTongue: 'Hindi',
      otherLanguages: 'English',
      literacyStatus: 'Literate (Can read and write)',
      educationLevel: 'Middle (6-8)',
      occupation: 'Student',
      workStatus: 'Non-Worker',
      disability: 'None'
    };
    setFormData(prev => ({
      ...prev,
      totalMembers: prev.members.length + 1,
      members: [...prev.members, newMember]
    }));
  };

  const handleRemoveMember = (id: string) => {
    if (formData.members.length <= 1) return;
    setFormData(prev => ({
      ...prev,
      totalMembers: prev.members.length - 1,
      members: prev.members.filter(m => m.id !== id)
    }));
  };

  const handleSubmit = () => {
    const generatedToken = `CEN27-${formData.state.substring(0, 2).toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}-${Math.floor(100 + Math.random() * 900)}Z`;
    setReferenceToken(generatedToken);
    setFormData(prev => ({
      ...prev,
      referenceToken: generatedToken,
      simulatedSubmittedAt: new Date().toLocaleString()
    }));
    setIsSubmitted(true);
    setCurrentStep(7);

    try {
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    } catch {}
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
    setIsSubmitted(false);
  };

  const stepTitles = [
    t.wizard.step1,
    t.wizard.step2,
    t.wizard.step3,
    t.wizard.step4,
    t.wizard.step5,
    t.wizard.step6,
    t.wizard.step7
  ];
return (
    <section id="walkthrough" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            Interactive Simulation
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.wizard.title}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            {t.wizard.subtitle}
          </p>
        </div>

        {/* Wizard Container */}
        <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-xl overflow-hidden">
          
          {/* Top Progress Bar & Steps Ribbon */}
          <div className="bg-slate-900 text-white p-6">
            <div className="flex items-center justify-between text-xs font-semibold mb-3">
              <span className="text-orange-400 font-mono tracking-wider uppercase">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-slate-300">
                {Math.round((currentStep / totalSteps) * 100)}% Complete
              </span>
            </div>

            <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-orange-500 to-amber-400 h-full transition-all duration-300 rounded-full"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>

            <div className="hidden sm:flex items-center justify-between mt-5 pt-3 border-t border-slate-800 gap-1 overflow-x-auto text-[11px]">
              {stepTitles.map((title, idx) => {
                const stepNum = idx + 1;
                const isCurrent = currentStep === stepNum;
                const isDone = currentStep > stepNum;
                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentStep(stepNum)}
                    className={`flex items-center gap-1.5 px-2 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      isCurrent 
                        ? 'bg-orange-600 text-white font-bold' 
                        : isDone 
                          ? 'text-emerald-400 font-medium' 
                          : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                      isDone ? 'bg-emerald-500/20 text-emerald-400 font-bold' : isCurrent ? 'bg-white text-orange-600 font-bold' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {isDone ? '✓' : stepNum}
                    </span>
                    <span>{title.split('. ')[1] || title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step Body */}
          <div className="p-6 md:p-10 space-y-6">
            
            {/* STEP 1: Address & OTP */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{t.wizard.step1Title}</h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">{t.wizard.step1Desc}</p>
                </div>

                <div className="bg-orange-50/70 border border-orange-200 rounded-2xl p-5 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                        {t.wizard.mobileLabel}
                      </label>
                      <div className="relative">
                        <Smartphone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          value={formData.mobileNumber}
                          onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                          className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                          placeholder="10-digit mobile number"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                        {t.wizard.enterOtp}
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={otpInput}
                          onChange={(e) => setOtpInput(e.target.value)}
                          className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-mono text-center tracking-widest font-bold focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                          placeholder="123456"
                        />
                        <button
                          type="button"
                          onClick={handleVerifyOtp}
                          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shrink-0 cursor-pointer"
                        >
                          {t.wizard.verifyOtp}
                        </button>
                      </div>
                    </div>
                  </div>

                  {formData.otpVerified ? (
                    <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-100/80 px-3 py-2 rounded-lg border border-emerald-300">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>{t.wizard.otpSuccess}</span>
                    </div>
                  ) : otpError ? (
                    <div className="flex items-center gap-2 text-xs font-semibold text-rose-800 bg-rose-50 px-3 py-2 rounded-lg border border-rose-200">
                      <AlertCircle className="w-4 h-4 text-rose-600" />
                      <span>Please enter 6-digit OTP (use default 123456).</span>
                    </div>
                  ) : null}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      {t.wizard.stateLabel}
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      {t.wizard.districtLabel}
                    </label>
                    <input
                      type="text"
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      {t.wizard.pincodeLabel}
                    </label>
                    <input
                      type="text"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-medium font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Housing & Living Amenities (Phase 1 Simulation) */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{t.wizard.step2Title}</h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">{t.wizard.step2Desc}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                      {t.wizard.houseUseLabel}
                    </label>
                    <select
                      value={formData.houseUse}
                      onChange={(e) => setFormData({ ...formData, houseUse: e.target.value })}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium"
                    >
                      {t.wizard.houseUseOptions.map((opt: string) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                      {t.wizard.wallMaterialLabel}
                    </label>
                    <select
                      value={formData.wallMaterial}
                      onChange={(e) => setFormData({ ...formData, wallMaterial: e.target.value })}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium"
                    >
                      {t.wizard.wallOptions.map((opt: string) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                      {t.wizard.waterSourceLabel}
                    </label>
                    <select
                      value={formData.drinkingWaterSource}
                      onChange={(e) => setFormData({ ...formData, drinkingWaterSource: e.target.value })}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium"
                    >
                      {t.wizard.waterOptions.map((opt: string) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                      {t.wizard.latrineLabel}
                    </label>
                    <select
                      value={formData.latrineFacility}
                      onChange={(e) => setFormData({ ...formData, latrineFacility: e.target.value })}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium"
                    >
                      {t.wizard.latrineOptions.map((opt: string) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                      {t.wizard.cookingFuelLabel}
                    </label>
                    <select
                      value={formData.cookingFuel}
                      onChange={(e) => setFormData({ ...formData, cookingFuel: e.target.value })}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium"
                    >
                      {t.wizard.cookingOptions.map((opt: string) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                      Dwelling Rooms
                    </label>
                    <select
                      value={formData.dwellingRooms}
                      onChange={(e) => setFormData({ ...formData, dwellingRooms: e.target.value })}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium"
                    >
                      {['1 Room', '2 Rooms', '3 Rooms', '4 Rooms', '5+ Rooms'].map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-3">
                    {t.wizard.assetsLabel}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {t.wizard.assetsOptions.map((asset: string) => {
                      const isChecked = formData.assetsOwned.includes(asset);
                      return (
                        <button
                          type="button"
                          key={asset}
                          onClick={() => handleAssetToggle(asset)}
                          className={`p-3 rounded-xl border text-xs font-medium text-left flex items-center justify-between transition-all cursor-pointer ${
                            isChecked
                              ? 'bg-orange-50 border-orange-400 text-orange-950 font-bold shadow-xs'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <span>{asset}</span>
                          <span className={`w-4 h-4 rounded-md flex items-center justify-center text-[10px] ${
                            isChecked ? 'bg-orange-600 text-white' : 'border border-slate-300'
                          }`}>
                            {isChecked && '✓'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Household Head */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{t.wizard.step3Title}</h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">{t.wizard.step3Desc}</p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                      {t.wizard.headNameLabel}
                    </label>
                    <div className="relative">
                      <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={formData.headName}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData(prev => ({
                            ...prev,
                            headName: val,
                            members: prev.members.map((m, i) => i === 0 ? { ...m, fullName: val } : m)
                          }));
                        }}
                        className="w-full pl-11 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-base font-bold text-slate-900 focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                      {t.wizard.totalMembersLabel}
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={formData.totalMembers}
                        onChange={(e) => setFormData({ ...formData, totalMembers: parseInt(e.target.value) || 1 })}
                        className="w-32 px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-base font-bold font-mono text-center"
                      />
                      <span className="text-xs text-slate-500">
                        Regular residents normally living in household.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
{/* STEP 4: Family Members */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{t.wizard.step4Title}</h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">{t.wizard.step4Desc}</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddMember}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold shadow-xs hover:bg-orange-700 transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{t.wizard.addMember}</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.members.map((member, index) => (
                    <div 
                      key={member.id}
                      className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-4 relative"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center font-mono">
                            {index + 1}
                          </span>
                          <span className="font-bold text-slate-900 text-sm">{member.fullName}</span>
                          <span className="text-xs text-orange-700 bg-orange-100 px-2 py-0.5 rounded-md font-semibold">
                            {member.relationship}
                          </span>
                        </div>
                        {formData.members.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveMember(member.id)}
                            className="text-slate-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                            title="Remove Member"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                            {t.wizard.memberName}
                          </label>
                          <input
                            type="text"
                            value={member.fullName}
                            onChange={(e) => handleMemberChange(member.id, 'fullName', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-medium"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                            {t.wizard.relationToHead}
                          </label>
                          <select
                            value={member.relationship}
                            onChange={(e) => handleMemberChange(member.id, 'relationship', e.target.value)}
                            className="w-full px-2.5 py-2 bg-white border border-slate-300 rounded-lg text-xs font-medium"
                          >
                            {t.wizard.relationOptions.map((rel: string) => (
                              <option key={rel} value={rel}>{rel}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                            {t.wizard.gender}
                          </label>
                          <select
                            value={member.gender}
                            onChange={(e) => handleMemberChange(member.id, 'gender', e.target.value)}
                            className="w-full px-2.5 py-2 bg-white border border-slate-300 rounded-lg text-xs font-medium"
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Transgender">Transgender</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                            {t.wizard.age}
                          </label>
                          <input
                            type="number"
                            value={member.age}
                            onChange={(e) => handleMemberChange(member.id, 'age', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono font-bold"
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                            {t.wizard.maritalStatus}
                          </label>
                          <select
                            value={member.maritalStatus}
                            onChange={(e) => handleMemberChange(member.id, 'maritalStatus', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-medium"
                          >
                            {t.wizard.maritalOptions.map((opt: string) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 5: Education & Languages */}
            {currentStep === 5 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{t.wizard.step5Title}</h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Socio-economic indicators and linguistic parameters for each household member.
                  </p>
                </div>

                <div className="space-y-5">
                  {formData.members.map((member, index) => (
                    <div key={member.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-4">
                      <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                        <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-bold flex items-center justify-center font-mono">
                          {index + 1}
                        </span>
                        <span className="font-bold text-sm text-slate-900">{member.fullName}</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                            {t.wizard.motherTongue}
                          </label>
                          <input
                            type="text"
                            value={member.motherTongue}
                            onChange={(e) => handleMemberChange(member.id, 'motherTongue', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-medium"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                            {t.wizard.highestEducation}
                          </label>
                          <select
                            value={member.educationLevel}
                            onChange={(e) => handleMemberChange(member.id, 'educationLevel', e.target.value)}
                            className="w-full px-2.5 py-2 bg-white border border-slate-300 rounded-lg text-xs font-medium"
                          >
                            {t.wizard.educationOptions.map((opt: string) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                            {t.wizard.occupation}
                          </label>
                          <select
                            value={member.occupation}
                            onChange={(e) => handleMemberChange(member.id, 'occupation', e.target.value)}
                            className="w-full px-2.5 py-2 bg-white border border-slate-300 rounded-lg text-xs font-medium"
                          >
                            {t.wizard.occupationOptions.map((opt: string) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 6: Review Summary */}
            {currentStep === 6 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{t.wizard.step6Title}</h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">{t.wizard.step6Desc}</p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-6">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-orange-800 bg-orange-100 px-3 py-1 rounded-md inline-block mb-3">
                      1. Household & Living Conditions
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                      <div>
                        <span className="text-slate-500 block">State / District:</span>
                        <strong className="text-slate-900 font-bold">{formData.state}, {formData.district}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Pincode:</span>
                        <strong className="text-slate-900 font-mono">{formData.pincode}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">House Construction:</span>
                        <strong className="text-slate-900">{formData.wallMaterial.split(' ')[0]}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Drinking Water:</span>
                        <strong className="text-slate-900">{formData.drinkingWaterSource.split(' inside')[0]}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-md inline-block mb-3">
                      2. Family Members ({formData.members.length} Total)
                    </h4>
                    <div className="divide-y divide-slate-200 bg-white rounded-xl border border-slate-200 overflow-hidden">
                      {formData.members.map((m, i) => (
                        <div key={m.id} className="p-3 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-slate-500">#{i + 1}</span>
                            <span className="font-bold text-slate-900">{m.fullName}</span>
                            <span className="text-slate-500">({m.relationship}, {m.age} yrs, {m.gender})</span>
                          </div>
                          <div className="text-slate-600 text-[11px]">
                            {m.educationLevel} &bull; {m.occupation}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      <strong>Legal Self-Declaration:</strong> In Census 2027, you certify that all information submitted is accurate to the best of your knowledge under the provisions of the Census Act, 1948.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 7: Official Digital Acknowledgment Receipt */}
            {currentStep === 7 && (
              <div className="space-y-6 animate-in fade-in duration-200 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="max-w-xl mx-auto space-y-2">
                  <h3 className="text-2xl font-extrabold text-slate-900">{t.wizard.step7Title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{t.wizard.step7Desc}</p>
                </div>

                {/* Printable Slip Card */}
                <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 max-w-md mx-auto shadow-2xl border-4 border-slate-800 text-left space-y-5 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1.5 grid grid-cols-3">
                    <div className="bg-orange-500"></div>
                    <div className="bg-white"></div>
                    <div className="bg-emerald-500"></div>
                  </div>

                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div>
                      <span className="text-[10px] text-orange-400 font-bold uppercase tracking-widest block">GOVERNMENT OF INDIA</span>
                      <h4 className="text-base font-extrabold text-white">DIGITAL CENSUS 2027</h4>
                      <p className="text-[10px] text-slate-400">Self-Enumeration Acknowledgment</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center font-bold text-xs">
                      2027
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-2xl flex flex-col items-center justify-center text-slate-900 shadow-inner">
                    <QrCode className="w-32 h-32 text-slate-900" />
                    <span className="text-[11px] font-mono font-bold tracking-widest text-slate-700 mt-2">
                      {referenceToken}
                    </span>
                    <span className="text-[9px] text-slate-400 uppercase mt-0.5">SCAN FOR INSTANT ENUMERATION</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-400">Head of Household:</span>
                      <span className="font-bold text-white">{formData.headName}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-400">Total Members:</span>
                      <span className="font-bold text-emerald-400">{formData.members.length} Persons</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-400">Location:</span>
                      <span className="font-medium text-slate-200">{formData.district}, {formData.state}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-400">Generated On:</span>
                      <span className="font-mono text-slate-300 text-[11px]">{new Date().toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="bg-slate-800/80 rounded-xl p-3 text-[11px] text-slate-300 leading-snug">
                    <strong>Enumerator Visit Note:</strong> {t.wizard.showEnumeratorTip}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>{t.wizard.printReceipt}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold text-sm transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4 text-orange-600" />
                    <span>{t.wizard.reset}</span>
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Navigation Controls Footer */}
          {currentStep < 7 && (
            <div className="bg-slate-50 px-6 md:px-10 py-4 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentStep === 1}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  currentStep === 1 
                    ? 'opacity-40 cursor-not-allowed text-slate-400' 
                    : 'text-slate-700 hover:bg-slate-200 cursor-pointer'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t.wizard.prev}</span>
              </button>

              <div className="flex items-center gap-2">
                {currentStep === 6 ? (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-emerald-500/25 transition-all cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>{t.wizard.submit}</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-md hover:shadow-orange-500/25 transition-all cursor-pointer"
                  >
                    <span>{t.wizard.next}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
