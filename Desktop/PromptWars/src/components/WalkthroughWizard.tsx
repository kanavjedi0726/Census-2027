import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import type { SimulationFormData, CensusMember } from '../types';
import { 
  CheckCircle2, ArrowRight, ArrowLeft, RotateCcw, 
  Printer, QrCode, Plus, Trash2, ShieldCheck, Check, Smartphone
} from 'lucide-react';
import confetti from 'canvas-confetti';

const initialFormData: SimulationFormData = {
  mobileNumber: '9876543210',
  otp: '',
  otpVerified: false,
  state: 'Delhi (NCT)',
  district: 'Central Delhi',
  subDistrict: 'Civil Lines',
  pincode: '110054',
  buildingNumber: 'B-42',
  censusHouseNumber: 'HN-108',
  houseUse: 'Wholly Residential',
  wallMaterial: 'Pucca (Concrete/Brick/Cement)',
  drinkingWaterSource: 'Piped Tap Water inside Premises',
  latrineFacility: 'Flush / Pour-flush Latrine within premises',
  cookingFuel: 'LPG / PNG Gas',
  assetsOwned: ['Television', 'Internet Connection / Wi-Fi', 'Smartphone', 'Scooter / Motorcycle'],
  headName: 'Rajesh Kumar Sharma',
  totalRegularMembers: 3,
  members: [
    {
      id: '1',
      fullName: 'Rajesh Kumar Sharma',
      relationship: 'Self (Head)',
      gender: 'Male',
      age: 48,
      maritalStatus: 'Currently Married',
      motherTongue: 'Hindi',
      otherLanguages: 'English',
      literacy: 'Literate',
      educationLevel: 'Graduate / Diploma',
      occupation: 'Business / Self-Employed'
    },
    {
      id: '2',
      fullName: 'Sunita Sharma',
      relationship: 'Spouse',
      gender: 'Female',
      age: 45,
      maritalStatus: 'Currently Married',
      motherTongue: 'Hindi',
      otherLanguages: 'English',
      literacy: 'Literate',
      educationLevel: 'Post-Graduate & above',
      occupation: 'Government / Public Sector'
    },
    {
      id: '3',
      fullName: 'Aarav Sharma',
      relationship: 'Son',
      gender: 'Male',
      age: 18,
      maritalStatus: 'Never Married',
      motherTongue: 'Hindi',
      otherLanguages: 'English',
      literacy: 'Literate',
      educationLevel: 'Higher Secondary (12th)',
      occupation: 'Student'
    }
  ]
};

export const WalkthroughWizard: React.FC = () => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<SimulationFormData>(initialFormData);
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [enteredOtp, setEnteredOtp] = useState<string>('123456');
  const [otpError, setOtpError] = useState<string | null>(null);
  const [referenceToken, setReferenceToken] = useState<string>('');

  const steps = [
    { num: 1, title: t.wizard.step1 },
    { num: 2, title: t.wizard.step2 },
    { num: 3, title: t.wizard.step3 },
    { num: 4, title: t.wizard.step4 },
    { num: 5, title: t.wizard.step5 },
    { num: 6, title: t.wizard.step6 },
    { num: 7, title: t.wizard.step7 },
  ];

  const handleNext = () => {
    if (currentStep === 1 && !formData.otpVerified) {
      setFormData(prev => ({ ...prev, otpVerified: true }));
    }
    if (currentStep < 7) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: document.getElementById('walkthrough')?.offsetTop || 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev + 1 - 2);
      window.scrollTo({ top: document.getElementById('walkthrough')?.offsetTop || 0, behavior: 'smooth' });
    }
  };

  const handleVerifyOtp = () => {
    if (enteredOtp.length === 6) {
      setFormData(prev => ({ ...prev, otpVerified: true }));
      setOtpError(null);
    } else {
      setOtpError('Please enter a 6-digit OTP (Try: 123456)');
    }
  };

  const handleToggleAsset = (asset: string) => {
    setFormData(prev => ({
      ...prev,
      assetsOwned: prev.assetsOwned.includes(asset)
        ? prev.assetsOwned.filter(a => a !== asset)
        : [...prev.assetsOwned, asset]
    }));
  };

  const handleMemberChange = (id: string, field: keyof CensusMember, value: any) => {
    setFormData(prev => ({
      ...prev,
      members: prev.members.map(m => m.id === id ? { ...m, [field]: value } : m)
    }));
  };

  const handleAddMember = () => {
    const newId = String(Date.now());
    const newMember: CensusMember = {
      id: newId,
      fullName: `Member ${formData.members.length + 1}`,
      relationship: 'Other Relative',
      gender: 'Male',
      age: 25,
      maritalStatus: 'Never Married',
      motherTongue: 'Hindi',
      otherLanguages: 'English',
      literacy: 'Literate',
      educationLevel: 'Secondary (10th)',
      occupation: 'Private Sector Employee'
    };
    setFormData(prev => ({
      ...prev,
      members: [...prev.members, newMember]
    }));
  };

  const handleRemoveMember = (id: string) => {
    if (formData.members.length > 1) {
      setFormData(prev => ({
        ...prev,
        members: prev.members.filter(m => m.id !== id)
      }));
    }
  };

  const handleSubmit = () => {
    const generatedToken = 'CEN-2027-' + Math.random().toString(36).substring(2, 7).toUpperCase() + '-' + Math.floor(1000 + Math.random() * 9000);
    setReferenceToken(generatedToken);
    setCurrentStep(7);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
    setOtpSent(false);
    setReferenceToken('');
  };

  return (
    <section id="walkthrough" className="py-16 md:py-20 bg-[#FAF7F2] border-b border-[#E5DFD5]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#162A45] tracking-tight">
            {t.wizard.title}
          </h2>
          <p className="text-stone-600 text-base sm:text-lg font-normal">
            {t.wizard.subtitle}
          </p>
        </div>

        {/* Wizard Container */}
        <div className="bg-[#FDFBF7] rounded-lg border border-[#E5DFD5] shadow-xs overflow-hidden">
          
          {/* STEP PROGRESS BAR HEADER (Preserved Structure) */}
          <div className="bg-[#162A45] text-white p-4 sm:p-6 border-b border-[#233854]">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div>
                <span className="text-xs text-[#E6C280] font-medium">Interactive Walkthrough</span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                  Step {currentStep} of 7: {steps[currentStep - 1]?.title}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-semibold text-[#E6C280] bg-[#233854] px-3 py-1 rounded border border-[#354D6E]">
                  {Math.round((currentStep / 7) * 100)}% Complete
                </span>
              </div>
            </div>

            {/* Progress Segmented Bar */}
            <div className="w-full bg-[#233854] h-2 rounded-full overflow-hidden flex">
              <div 
                className="bg-[#B83A24] h-full transition-all duration-300 rounded-full"
                style={{ width: `${(currentStep / 7) * 100}%` }}
              ></div>
            </div>

            {/* Step Pills on Desktop */}
            <div className="hidden md:flex items-center justify-between gap-1 mt-4 pt-3 border-t border-[#233854] text-xs">
              {steps.map((step) => {
                const stepNum = step.num;
                const title = step.title;
                const isCurrent = currentStep === stepNum;
                const isDone = currentStep > stepNum;
                return (
                  <button
                    key={stepNum}
                    onClick={() => stepNum <= currentStep && setCurrentStep(stepNum)}
                    disabled={stepNum > currentStep}
                    className={`flex items-center gap-1.5 py-1 px-2 rounded transition-all ${
                      isCurrent 
                        ? 'bg-[#B83A24] text-white font-semibold' 
                        : isDone 
                          ? 'text-[#E6C280] hover:text-white cursor-pointer' 
                          : 'text-stone-400'
                    }`}
                  >
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                      isDone ? 'bg-[#233854] text-[#E6C280] font-bold' : isCurrent ? 'bg-white text-[#B83A24] font-bold' : 'bg-[#233854] text-stone-400'
                    }`}>
                      {isDone ? '?' : stepNum}
                    </span>
                    <span className="truncate max-w-[90px]">{title.split('. ')[1] || title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step Body */}
          <div className="p-6 md:p-10 min-h-[420px]">
            
            {/* STEP 1: Address & OTP */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#162A45]">{t.wizard.step1Title}</h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1">{t.wizard.step1Desc}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#FAF7F2] p-5 rounded-md border border-[#E5DFD5]">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                        {t.wizard.mobileLabel}
                      </label>
                      <div className="relative">
                        <Smartphone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          value={formData.mobileNumber}
                          onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                          className="w-full pl-9 pr-3 py-2 bg-white border border-[#DCD2C0] rounded-md text-sm font-mono text-[#162A45]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                        {t.wizard.enterOtp}
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          maxLength={6}
                          value={enteredOtp}
                          onChange={(e) => setEnteredOtp(e.target.value)}
                          placeholder="123456"
                          className="w-full px-3 py-2 bg-white border border-[#DCD2C0] rounded-md text-sm font-mono font-bold tracking-widest text-[#162A45]"
                        />
                        <button
                          type="button"
                          onClick={handleVerifyOtp}
                          className="px-4 py-2 bg-[#162A45] hover:bg-[#233854] text-white text-xs font-semibold rounded-md transition-colors shrink-0 cursor-pointer"
                        >
                          {t.wizard.verifyOtp}
                        </button>
                      </div>
                      {formData.otpVerified ? (
                        <p className="text-xs text-[#1E432E] font-medium mt-1.5 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#26533A]" />
                          <span>{t.wizard.otpSuccess}</span>
                        </p>
                      ) : otpError ? (
                        <p className="text-xs text-[#B83A24] font-medium mt-1.5">{otpError}</p>
                      ) : null}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                          {t.wizard.stateLabel}
                        </label>
                        <input
                          type="text"
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-[#DCD2C0] rounded-md text-xs font-medium text-[#162A45]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                          {t.wizard.districtLabel}
                        </label>
                        <input
                          type="text"
                          value={formData.district}
                          onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-[#DCD2C0] rounded-md text-xs font-medium text-[#162A45]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                        {t.wizard.pincodeLabel}
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-[#DCD2C0] rounded-md text-xs font-mono font-bold text-[#162A45]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Housing & Assets */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#162A45]">{t.wizard.step2Title}</h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1">{t.wizard.step2Desc}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1.5">
                      {t.wizard.houseUseLabel}
                    </label>
                    <select
                      value={formData.houseUse}
                      onChange={(e) => setFormData({ ...formData, houseUse: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-[#DCD2C0] rounded-md text-xs sm:text-sm text-[#162A45]"
                    >
                      {t.wizard.houseUseOptions.map((opt: string) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1.5">
                      {t.wizard.wallMaterialLabel}
                    </label>
                    <select
                      value={formData.wallMaterial}
                      onChange={(e) => setFormData({ ...formData, wallMaterial: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-[#DCD2C0] rounded-md text-xs sm:text-sm text-[#162A45]"
                    >
                      {t.wizard.wallOptions.map((opt: string) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1.5">
                      {t.wizard.waterSourceLabel}
                    </label>
                    <select
                      value={formData.drinkingWaterSource}
                      onChange={(e) => setFormData({ ...formData, drinkingWaterSource: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-[#DCD2C0] rounded-md text-xs sm:text-sm text-[#162A45]"
                    >
                      {t.wizard.waterOptions.map((opt: string) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1.5">
                      {t.wizard.cookingFuelLabel}
                    </label>
                    <select
                      value={formData.cookingFuel}
                      onChange={(e) => setFormData({ ...formData, cookingFuel: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-[#DCD2C0] rounded-md text-xs sm:text-sm text-[#162A45]"
                    >
                      {t.wizard.cookingOptions.map((opt: string) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Assets Multi-Select */}
                <div className="pt-2">
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-2">
                    {t.wizard.assetsLabel}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {t.wizard.assetsOptions.map((asset: string) => {
                      const isChecked = formData.assetsOwned.includes(asset);
                      return (
                        <button
                          key={asset}
                          type="button"
                          onClick={() => handleToggleAsset(asset)}
                          className={`p-2.5 rounded-md border text-left text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                            isChecked
                              ? 'bg-[#F7EFE9] border-[#B83A24] text-[#7A2818] font-semibold'
                              : 'bg-[#FAF7F2] border-[#E5DFD5] text-stone-700 hover:bg-[#F2ECE1]'
                          }`}
                        >
                          <span>{asset}</span>
                          <span className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${
                            isChecked ? 'bg-[#B83A24] text-white' : 'border border-[#DCD2C0]'
                          }`}>
                            {isChecked && '?'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Head of Household */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#162A45]">{t.wizard.step3Title}</h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1">{t.wizard.step3Desc}</p>
                </div>

                <div className="bg-[#FAF7F2] p-6 rounded-md border border-[#E5DFD5] space-y-4 max-w-xl mx-auto">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                      {t.wizard.headNameLabel}
                    </label>
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
                      className="w-full px-3 py-2.5 bg-white border border-[#DCD2C0] rounded-md text-sm font-semibold text-[#162A45]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide mb-1">
                      {t.wizard.totalMembersLabel}
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={formData.members.length}
                      readOnly
                      className="w-full px-3 py-2 bg-[#F2ECE1] border border-[#DCD2C0] rounded-md text-xs font-mono font-bold text-stone-700 cursor-not-allowed"
                    />
                    <span className="text-[11px] text-stone-500 mt-1 block">
                      ?? Individual records are configured in Step 4.
                    </span>
                  </div>
                </div>
              </div>
            )}
{/* STEP 4: Family Members */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#162A45]">{t.wizard.step4Title}</h3>
                    <p className="text-xs sm:text-sm text-stone-600 mt-1">{t.wizard.step4Desc}</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddMember}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-[#B83A24] text-white text-xs font-semibold hover:bg-[#9C2F1C] transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{t.wizard.addMember}</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.members.map((member, index) => (
                    <div 
                      key={member.id}
                      className="p-5 rounded-md border border-[#E5DFD5] bg-[#FAF7F2] space-y-4 relative"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD5]">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded bg-[#162A45] text-white text-xs font-bold flex items-center justify-center font-mono">
                            {index + 1}
                          </span>
                          <span className="font-bold text-[#162A45] text-sm">{member.fullName}</span>
                          <span className="text-xs text-[#7A2818] bg-[#F7EFE9] px-2 py-0.5 rounded border border-[#E8D2C5]">
                            {member.relationship}
                          </span>
                        </div>
                        {formData.members.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveMember(member.id)}
                            className="text-stone-400 hover:text-[#B83A24] p-1 transition-colors cursor-pointer"
                            title="Remove Member"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1">
                            {t.wizard.memberName}
                          </label>
                          <input
                            type="text"
                            value={member.fullName}
                            onChange={(e) => handleMemberChange(member.id, 'fullName', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-[#DCD2C0] rounded-md text-xs font-medium text-[#162A45]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1">
                            {t.wizard.relationToHead}
                          </label>
                          <select
                            value={member.relationship}
                            onChange={(e) => handleMemberChange(member.id, 'relationship', e.target.value)}
                            className="w-full px-2 py-2 bg-white border border-[#DCD2C0] rounded-md text-xs font-medium text-[#162A45]"
                          >
                            {t.wizard.relationOptions.map((rel: string) => (
                              <option key={rel} value={rel}>{rel}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1">
                            {t.wizard.gender}
                          </label>
                          <select
                            value={member.gender}
                            onChange={(e) => handleMemberChange(member.id, 'gender', e.target.value)}
                            className="w-full px-2 py-2 bg-white border border-[#DCD2C0] rounded-md text-xs font-medium text-[#162A45]"
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Transgender">Transgender</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1">
                            {t.wizard.age}
                          </label>
                          <input
                            type="number"
                            value={member.age}
                            onChange={(e) => handleMemberChange(member.id, 'age', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-[#DCD2C0] rounded-md text-xs font-mono font-bold text-[#162A45]"
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1">
                            {t.wizard.maritalStatus}
                          </label>
                          <select
                            value={member.maritalStatus}
                            onChange={(e) => handleMemberChange(member.id, 'maritalStatus', e.target.value)}
                            className="w-full px-2.5 py-2 bg-white border border-[#DCD2C0] rounded-md text-xs font-medium text-[#162A45]"
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
                  <h3 className="font-serif text-xl font-bold text-[#162A45]">{t.wizard.step5Title}</h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1">
                    Socio-economic indicators and linguistic parameters for each household member.
                  </p>
                </div>

                <div className="space-y-4">
                  {formData.members.map((member, index) => (
                    <div key={member.id} className="p-5 rounded-md border border-[#E5DFD5] bg-[#FAF7F2] space-y-4">
                      <div className="flex items-center gap-2 pb-2 border-b border-[#E5DFD5]">
                        <span className="w-5 h-5 rounded bg-[#162A45] text-white text-[11px] font-bold flex items-center justify-center font-mono">
                          {index + 1}
                        </span>
                        <span className="font-bold text-sm text-[#162A45]">{member.fullName}</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1">
                            {t.wizard.motherTongue}
                          </label>
                          <input
                            type="text"
                            value={member.motherTongue}
                            onChange={(e) => handleMemberChange(member.id, 'motherTongue', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-[#DCD2C0] rounded-md text-xs font-medium text-[#162A45]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1">
                            {t.wizard.highestEducation}
                          </label>
                          <select
                            value={member.educationLevel}
                            onChange={(e) => handleMemberChange(member.id, 'educationLevel', e.target.value)}
                            className="w-full px-2.5 py-2 bg-white border border-[#DCD2C0] rounded-md text-xs font-medium text-[#162A45]"
                          >
                            {t.wizard.educationOptions.map((opt: string) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-stone-600 uppercase mb-1">
                            {t.wizard.occupation}
                          </label>
                          <select
                            value={member.occupation}
                            onChange={(e) => handleMemberChange(member.id, 'occupation', e.target.value)}
                            className="w-full px-2.5 py-2 bg-white border border-[#DCD2C0] rounded-md text-xs font-medium text-[#162A45]"
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
                  <h3 className="font-serif text-xl font-bold text-[#162A45]">{t.wizard.step6Title}</h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1">{t.wizard.step6Desc}</p>
                </div>

                <div className="bg-[#FAF7F2] rounded-md p-6 border border-[#E5DFD5] space-y-6">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7A2818] bg-[#F7EFE9] px-3 py-1 rounded border border-[#E8D2C5] inline-block mb-3">
                      1. Household & Living Conditions
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                      <div>
                        <span className="text-stone-500 block">State / District:</span>
                        <strong className="text-[#162A45] font-semibold">{formData.state}, {formData.district}</strong>
                      </div>
                      <div>
                        <span className="text-stone-500 block">Pincode:</span>
                        <strong className="text-[#162A45] font-mono">{formData.pincode}</strong>
                      </div>
                      <div>
                        <span className="text-stone-500 block">House Construction:</span>
                        <strong className="text-[#162A45]">{formData.wallMaterial.split(' ')[0]}</strong>
                      </div>
                      <div>
                        <span className="text-stone-500 block">Drinking Water:</span>
                        <strong className="text-[#162A45]">{formData.drinkingWaterSource.split(' inside')[0]}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E5DFD5]">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1E432E] bg-[#EBF4EE] px-3 py-1 rounded border border-[#C5DEC8] inline-block mb-3">
                      2. Family Members ({formData.members.length} Total)
                    </h4>
                    <div className="divide-y divide-[#E5DFD5] bg-white rounded border border-[#E5DFD5] overflow-hidden">
                      {formData.members.map((m, i) => (
                        <div key={m.id} className="p-3 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-stone-500">#{i + 1}</span>
                            <span className="font-semibold text-[#162A45]">{m.fullName}</span>
                            <span className="text-stone-500">({m.relationship}, {m.age} yrs, {m.gender})</span>
                          </div>
                          <div className="text-stone-600 text-[11px]">
                            {m.educationLevel} &bull; {m.occupation}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-md bg-[#F2ECE1] border border-[#DCD2C0] text-xs text-stone-800 flex items-start gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-[#26533A] shrink-0 mt-0.5" />
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
                <div className="w-14 h-14 rounded-full bg-[#EBF4EE] text-[#26533A] flex items-center justify-center mx-auto border border-[#C5DEC8]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="max-w-xl mx-auto space-y-1">
                  <h3 className="font-serif text-2xl font-bold text-[#162A45]">{t.wizard.step7Title}</h3>
                  <p className="text-sm text-stone-600 leading-relaxed font-normal">{t.wizard.step7Desc}</p>
                </div>

                {/* Printable Slip Card (Official Gazette Certificate Style) */}
                <div className="bg-[#162A45] text-white rounded-lg p-6 md:p-8 max-w-md mx-auto shadow-md border border-[#233854] text-left space-y-5 relative">
                  <div className="flex items-center justify-between border-b border-[#233854] pb-4">
                    <div>
                      <span className="text-[10px] text-[#E6C280] font-semibold tracking-wide block">GOVERNMENT OF INDIA</span>
                      <h4 className="font-serif text-base font-bold text-white">DIGITAL CENSUS 2027</h4>
                      <p className="text-[11px] text-stone-300">Self-Enumeration Acknowledgment</p>
                    </div>
                    <div className="w-9 h-9 rounded bg-[#B83A24] text-white flex items-center justify-center font-mono font-bold text-xs">
                      2027
                    </div>
                  </div>

                  <div className="bg-[#FAF7F2] p-4 rounded flex flex-col items-center justify-center text-stone-900 border border-[#E5DFD5]">
                    <QrCode className="w-28 h-28 text-[#162A45]" />
                    <span className="text-xs font-mono font-bold tracking-wider text-[#162A45] mt-2">
                      {referenceToken}
                    </span>
                    <span className="text-[10px] text-stone-500 uppercase mt-0.5">SCAN FOR INSTANT DOORSTEP VERIFICATION</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-[#233854]">
                      <span className="text-stone-400">Head of Household:</span>
                      <span className="font-semibold text-white">{formData.headName}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#233854]">
                      <span className="text-stone-400">Total Members:</span>
                      <span className="font-semibold text-[#E6C280]">{formData.members.length} Persons</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#233854]">
                      <span className="text-stone-400">Location:</span>
                      <span className="text-stone-200">{formData.district}, {formData.state}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#233854]">
                      <span className="text-stone-400">Generated On:</span>
                      <span className="font-mono text-stone-300 text-[11px]">{new Date().toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="bg-[#233854] rounded p-3 text-[11px] text-stone-200 leading-snug">
                    <strong>Enumerator Visit Note:</strong> {t.wizard.showEnumeratorTip}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md bg-[#162A45] hover:bg-[#233854] text-white font-semibold text-xs shadow-xs transition-all cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>{t.wizard.printReceipt}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#FAF7F2] border border-[#C5BBAA] hover:bg-[#F2ECE1] text-[#162A45] font-medium text-xs transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-[#B83A24]" />
                    <span>{t.wizard.reset}</span>
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Navigation Controls Footer */}
          {currentStep < 7 && (
            <div className="bg-[#FAF7F2] px-6 md:px-10 py-4 border-t border-[#E5DFD5] flex items-center justify-between">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentStep === 1}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${
                  currentStep === 1 
                    ? 'opacity-40 cursor-not-allowed text-stone-400' 
                    : 'text-stone-700 hover:bg-[#F2ECE1] cursor-pointer'
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
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md bg-[#26533A] hover:bg-[#1E432E] text-white font-semibold text-xs sm:text-sm shadow-xs transition-all cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>{t.wizard.submit}</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md bg-[#B83A24] hover:bg-[#9C2F1C] text-white font-semibold text-xs sm:text-sm shadow-xs transition-all cursor-pointer"
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
