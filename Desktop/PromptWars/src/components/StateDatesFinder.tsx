import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { statesScheduleData } from '../data/statesData';
import type { StateSchedule } from '../types';
import { Search, MapPin, Calendar, Bell, Check, AlertCircle, Info, ExternalLink } from 'lucide-react';

export const StateDatesFinder: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [reminderState, setReminderState] = useState<string | null>(null);

  const regions = ['All', 'North', 'South', 'East', 'West', 'Central', 'North-East', 'Union Territory'];
  const statuses = ['All', 'Active', 'Upcoming', 'Closing Soon'];

  const filteredStates = statesScheduleData.filter((st) => {
    const matchesSearch = 
      st.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      st.hindiName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      st.region.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRegion = selectedRegion === 'All' || st.region === selectedRegion;
    const matchesStatus = selectedStatus === 'All' || st.status === selectedStatus;

    return matchesSearch && matchesRegion && matchesStatus;
  });

  const handleSetReminder = (stateName: string) => {
    setReminderState(stateName);
    setTimeout(() => {
      setReminderState(null);
    }, 4000);
  };

  const getStatusBadge = (status: StateSchedule['status']) => {
    switch (status) {
      case 'Active':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200"><span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping"></span>{t.dates.activeStatus}</span>;
      case 'Closing Soon':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200"><AlertCircle className="w-3 h-3" />{t.dates.closingSoon}</span>;
      case 'Upcoming':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">{t.dates.upcomingStatus}</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-500">{t.dates.completedStatus}</span>;
    }
  };

  return (
    <section id="dates" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5 text-orange-600" />
            Official Schedule Directory
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.dates.title}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            {t.dates.subtitle}
          </p>
        </div>

        {/* Tip Box */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-start gap-3 text-sm text-orange-950 max-w-4xl mx-auto shadow-xs">
          <Info className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="font-bold">Self-Enumeration Tip: </strong>
            {t.dates.tip}
          </p>
        </div>

        {/* Reminder Alert Banner (Simulated) */}
        {reminderState && (
          <div className="max-w-4xl mx-auto bg-emerald-900 text-white rounded-xl p-4 flex items-center justify-between shadow-lg animate-in fade-in slide-in-from-top-3 duration-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0">
                <Check className="w-5 h-5" />
              </div>
              <p className="text-sm font-medium">
                {t.dates.reminderAlert.replace('{state}', reminderState)}
              </p>
            </div>
            <button 
              onClick={() => setReminderState(null)} 
              className="text-xs text-emerald-200 hover:text-white underline ml-4 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Search & Filter Controls */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Search Input */}
            <div className="relative md:col-span-2">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={t.dates.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 focus:bg-white focus:outline-hidden transition-all"
              />
            </div>

            {/* Region Filter Dropdown */}
            <div className="flex items-center gap-2">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full py-3 px-3.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 focus:bg-white focus:outline-hidden font-medium text-slate-700"
              >
                {regions.map((reg) => (
                  <option key={reg} value={reg}>
                    {reg === 'All' ? t.dates.allRegions : reg}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Filter Status Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-500 mr-2">Filter by Status:</span>
            {statuses.map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`text-xs px-3 py-1 rounded-full font-medium transition-all cursor-pointer ${
                  selectedStatus === st 
                    ? 'bg-orange-600 text-white shadow-xs' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
            <span className="text-xs text-slate-400 ml-auto font-mono">
              Showing {filteredStates.length} States/UTs
            </span>
          </div>
        </div>

        {/* State Dates Table / Card Grid */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden max-w-6xl mx-auto">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-100/80 text-slate-900 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th scope="col" className="px-6 py-4">{t.dates.colState}</th>
                  <th scope="col" className="px-4 py-4">{t.dates.colRegion}</th>
                  <th scope="col" className="px-4 py-4">{t.dates.colPhase1Self}</th>
                  <th scope="col" className="px-4 py-4">{t.dates.colPhase1Visit}</th>
                  <th scope="col" className="px-4 py-4">{t.dates.colStatus}</th>
                  <th scope="col" className="px-6 py-4 text-right">{t.dates.colAction}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredStates.length > 0 ? (
                  filteredStates.map((state) => (
                    <tr key={state.id} className="hover:bg-slate-50/80 transition-colors">
                      
                      {/* State Name */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-700 font-bold text-xs flex items-center justify-center border border-orange-200 shrink-0 font-mono">
                            {state.id}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 text-sm">{state.name}</p>
                            <p className="text-xs text-slate-500 font-normal">{state.hindiName} &bull; {state.districtCount} Districts</p>
                          </div>
                        </div>
                      </td>

                      {/* Region */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                          {state.region}
                        </span>
                      </td>

                      {/* Phase 1 Self-Enum */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-xs font-semibold text-orange-950 font-mono">
                          {state.phase1SelfEnum}
                        </div>
                        <span className="text-[10px] text-slate-500">Online Portal Access</span>
                      </td>

                      {/* Phase 1 Enumerator Visit */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-xs text-slate-800 font-mono">
                          {state.phase1FieldVisit}
                        </div>
                        <span className="text-[10px] text-slate-500">Doorstep Survey</span>
                      </td>

                      {/* Status Badge */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        {getStatusBadge(state.status)}
                      </td>

                      {/* Action Button */}
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button
                          onClick={() => handleSetReminder(state.name)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 bg-slate-100 hover:bg-orange-50 hover:text-orange-700 border border-slate-300 hover:border-orange-300 transition-colors cursor-pointer"
                        >
                          <Bell className="w-3.5 h-3.5" />
                          <span>Remind Me</span>
                        </button>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                      <p className="font-medium text-base">No states or territories found matching "{searchTerm}"</p>
                      <button 
                        onClick={() => { setSearchTerm(''); setSelectedRegion('All'); setSelectedStatus('All'); }}
                        className="mt-2 text-xs text-orange-600 font-bold underline cursor-pointer"
                      >
                        Reset filters
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
