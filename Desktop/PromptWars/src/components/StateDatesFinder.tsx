import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { statesScheduleData } from '../data/statesData';
import type { StateSchedule } from '../types';
import { Search, Calendar, Bell, CheckCircle2, Clock, ChevronRight, Check } from 'lucide-react';

export const StateDatesFinder: React.FC = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [remindedStates, setRemindedStates] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const regions = ['All', 'North', 'South', 'East', 'West', 'Central', 'North-East', 'Union Territory'];

  const filteredStates = useMemo(() => {
    return statesScheduleData.filter((state) => {
      const matchesSearch = 
        state.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        state.hindiName.includes(searchQuery) ||
        state.id.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesRegion = selectedRegion === 'All' || state.region === selectedRegion;

      return matchesSearch && matchesRegion;
    });
  }, [searchQuery, selectedRegion]);

  const handleRemindMe = (state: StateSchedule) => {
    if (remindedStates.includes(state.id)) return;

    setRemindedStates((prev) => [...prev, state.id]);
    const msg = t.dates.reminderAlert.replace('{state}', state.name);
    setToastMessage(msg);

    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const getStatusBadge = (status: StateSchedule['status']) => {
    switch (status) {
      case 'Active':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-[#EBF4EE] text-[#1E432E] border border-[#C5DEC8]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#26533A] animate-pulse"></span>
            {t.dates.activeStatus}
          </span>
        );
      case 'Closing Soon':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-[#FAF1E4] text-[#784A12] border border-[#E8D4B8]">
            <Clock className="w-3 h-3 text-[#B36B15]" />
            {t.dates.closingSoon}
          </span>
        );
      case 'Upcoming':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium bg-[#FAF7F2] text-stone-600 border border-[#E5DFD5]">
            <Calendar className="w-3 h-3 text-stone-400" />
            {t.dates.upcomingStatus}
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium bg-[#FAF7F2] text-stone-500 border border-[#E5DFD5]">
            <CheckCircle2 className="w-3 h-3 text-stone-400" />
            {t.dates.completedStatus}
          </span>
        );
    }
  };

  return (
    <section id="dates" className="py-16 md:py-20 bg-[#FAF7F2] border-b border-[#E5DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 max-w-md bg-[#162A45] text-white p-4 rounded-lg shadow-lg border border-[#233854] flex items-start gap-3 animate-in slide-in-from-bottom-5">
            <Bell className="w-5 h-5 text-[#E6C280] shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed">
              <p className="font-semibold text-[#E6C280] mb-0.5">Simulated SMS Reminder Scheduled</p>
              <p className="text-stone-200">{toastMessage}</p>
            </div>
          </div>
        )}

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#162A45] tracking-tight">
            {t.dates.title}
          </h2>
          <p className="text-stone-600 text-base sm:text-lg font-normal">
            {t.dates.subtitle}
          </p>
        </div>

        {/* Search & Region Filter Bar */}
        <div className="bg-[#FDFBF7] rounded-lg p-5 border border-[#E5DFD5] shadow-xs space-y-4 max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={t.dates.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF7F2] border border-[#DCD2C0] rounded-md text-sm text-[#162A45] placeholder-stone-400 focus:ring-1 focus:ring-[#B83A24] focus:border-[#B83A24] focus:outline-hidden"
              />
            </div>
          </div>

          {/* Region Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#E5DFD5]">
            <span className="text-xs font-semibold text-stone-500 mr-2">Filter Region:</span>
            {regions.map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`text-xs px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                  selectedRegion === reg
                    ? 'bg-[#162A45] text-white shadow-2xs'
                    : 'bg-[#FAF7F2] text-stone-700 hover:bg-[#F2ECE1] border border-[#E5DFD5]'
                }`}
              >
                {reg === 'All' ? t.dates.allRegions : reg}
              </button>
            ))}
          </div>
        </div>

        {/* Schedule Table (Gazette Ledger Style) */}
        <div className="bg-[#FDFBF7] rounded-lg border border-[#E5DFD5] shadow-xs overflow-hidden max-w-6xl mx-auto">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#F2ECE1] border-b border-[#E0D5C1] text-stone-700 font-semibold">
                  <th className="px-6 py-3.5">{t.dates.colState}</th>
                  <th className="px-4 py-3.5">{t.dates.colRegion}</th>
                  <th className="px-4 py-3.5">{t.dates.colPhase1Self}</th>
                  <th className="px-4 py-3.5">{t.dates.colPhase1Visit}</th>
                  <th className="px-4 py-3.5">{t.dates.colStatus}</th>
                  <th className="px-6 py-3.5 text-right">{t.dates.colAction}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5DFD5]">
                {filteredStates.length > 0 ? (
                  filteredStates.map((state) => {
                    const isReminded = remindedStates.includes(state.id);
                    return (
                      <tr 
                        key={state.id}
                        className="hover:bg-[#FAF7F2] transition-colors"
                      >
                        {/* State Name */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded bg-[#F2ECE1] text-[#162A45] font-bold text-xs flex items-center justify-center border border-[#DCD2C0] shrink-0 font-mono">
                              {state.id}
                            </div>
                            <div>
                              <p className="font-semibold text-[#162A45] text-sm">{state.name}</p>
                              <p className="text-xs text-stone-500 font-normal">{state.hindiName} &bull; {state.districtCount} Districts</p>
                            </div>
                          </div>
                        </td>

                        {/* Region */}
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="text-xs font-medium text-stone-600 bg-[#FAF7F2] px-2 py-0.5 rounded border border-[#E5DFD5]">
                            {state.region}
                          </span>
                        </td>

                        {/* Phase 1 Self-Enumeration */}
                        <td className="px-4 py-4 whitespace-nowrap">
                          <p className="font-medium text-stone-800 text-xs">{state.phase1SelfEnum}</p>
                        </td>

                        {/* Phase 1 Field Visit */}
                        <td className="px-4 py-4 whitespace-nowrap">
                          <p className="text-stone-600 text-xs">{state.phase1FieldVisit}</p>
                        </td>

                        {/* Status */}
                        <td className="px-4 py-4 whitespace-nowrap">
                          {getStatusBadge(state.status)}
                        </td>

                        {/* Remind Button */}
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <button
                            onClick={() => handleRemindMe(state)}
                            disabled={isReminded}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                              isReminded
                                ? 'bg-[#EBF4EE] text-[#1E432E] border border-[#C5DEC8]'
                                : 'bg-[#FAF7F2] text-[#B83A24] hover:bg-[#F7EFE9] border border-[#E8D2C5]'
                            }`}
                          >
                            {isReminded ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Reminded</span>
                              </>
                            ) : (
                              <>
                                <Bell className="w-3.5 h-3.5" />
                                <span>{t.dates.colAction}</span>
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-stone-500 text-sm">
                      No matching states found for "{searchQuery}". Try selecting another region or clear search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tip Box */}
        <div className="max-w-4xl mx-auto bg-[#F2ECE1] border border-[#DCD2C0] rounded-md p-4 flex items-start gap-3 text-xs text-stone-700">
          <Calendar className="w-4 h-4 text-[#B83A24] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Self-Enumeration Protocol:</strong> {t.dates.tip}
          </p>
        </div>

      </div>
    </section>
  );
};
