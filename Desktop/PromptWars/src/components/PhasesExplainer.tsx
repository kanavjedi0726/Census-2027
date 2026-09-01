import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { censusPhases } from '../data/phasesData';
import { Home, Users, CheckCircle2, Search, ArrowRight, Layers, Sparkles, Building, Activity, Shield, Umbrella, Droplet, Sun, Flame, Tv, Wifi, Bike, Smartphone, BookOpen, Briefcase, Heart, Award, Cpu, MapPin, Smile, FileQuestion } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Home, Users, Layers, Shield, Umbrella, Building, Activity, Droplet, Sun, Sparkles,
  Flame, Tv, Wifi, Bike, Smartphone, BookOpen, Briefcase, Heart, Award, Cpu, MapPin, Smile
};

export const PhasesExplainer: React.FC = () => {
  const { t } = useLanguage();
  const [selectedPhase, setSelectedPhase] = useState<1 | 2>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedView, setExpandedView] = useState(false);

  const phase1 = censusPhases.find(p => p.id === 1)!;
  const phase2 = censusPhases.find(p => p.id === 2)!;
  const currentPhaseData = selectedPhase === 1 ? phase1 : phase2;

  const filteredQuestions = currentPhaseData.collectedData.filter(q => {
    const matchesSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          q.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || q.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', 'housing', 'amenities', 'assets', 'demographics', 'education', 'economic', 'social'];

  return (
    <section id="phases" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
            <FileQuestion className="w-3.5 h-3.5 text-orange-600" />
            Census Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.phases.title}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            {t.phases.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Phase 1 Card */}
          <div 
            onClick={() => setSelectedPhase(1)}
            className={`rounded-2xl p-6 md:p-8 border-2 transition-all cursor-pointer relative overflow-hidden ${
              selectedPhase === 1 
                ? 'border-orange-500 bg-orange-50/40 shadow-md ring-2 ring-orange-500/20' 
                : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between gap-4 mb-4">
              <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold uppercase tracking-wider">
                {t.phases.phase1Badge}
              </span>
              <span className="text-xs font-semibold text-slate-500 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                {phase1.questionsCount} Questions
              </span>
            </div>

            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-orange-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Home className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{t.phases.phase1Title}</h3>
                <p className="text-xs text-orange-700 font-medium">{phase1.subtitle}</p>
              </div>
            </div>

            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              {t.phases.phase1Desc}
            </p>

            <div className="space-y-2 mb-6">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Key Highlights:</p>
              {phase1.keyHighlights.slice(0, 3).map((hl, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-200/80">
              {t.phases.phase1Tags.map((tag: string, i: number) => (
                <span key={i} className="bg-white text-slate-700 border border-slate-200 text-[11px] px-2.5 py-1 rounded-md font-medium">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <button 
                className={`text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer ${
                  selectedPhase === 1 ? 'text-orange-700' : 'text-slate-500'
                }`}
              >
                <span>{selectedPhase === 1 ? 'Currently Viewing Questions below' : 'Click to Explore Questions'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Phase 2 Card */}
          <div 
            onClick={() => setSelectedPhase(2)}
            className={`rounded-2xl p-6 md:p-8 border-2 transition-all cursor-pointer relative overflow-hidden ${
              selectedPhase === 2 
                ? 'border-emerald-600 bg-emerald-50/40 shadow-md ring-2 ring-emerald-600/20' 
                : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between gap-4 mb-4">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                {t.phases.phase2Badge}
              </span>
              <span className="text-xs font-semibold text-slate-500 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                {phase2.questionsCount} Questions
              </span>
            </div>

            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{t.phases.phase2Title}</h3>
                <p className="text-xs text-emerald-700 font-medium">{phase2.subtitle}</p>
              </div>
            </div>

            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              {t.phases.phase2Desc}
            </p>

            <div className="space-y-2 mb-6">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Key Highlights:</p>
              {phase2.keyHighlights.slice(0, 3).map((hl, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-200/80">
              {t.phases.phase2Tags.map((tag: string, i: number) => (
                <span key={i} className="bg-white text-slate-700 border border-slate-200 text-[11px] px-2.5 py-1 rounded-md font-medium">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <button 
                className={`text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer ${
                  selectedPhase === 2 ? 'text-emerald-700' : 'text-slate-500'
                }`}
              >
                <span>{selectedPhase === 2 ? 'Currently Viewing Questions below' : 'Click to Explore Questions'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        <div className="bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${selectedPhase === 1 ? 'bg-orange-500' : 'bg-emerald-500'}`}></span>
                <h3 className="text-xl font-bold text-slate-900">
                  {selectedPhase === 1 ? 'Phase 1 Question Directory (31 Items)' : 'Phase 2 Individual Questionnaire (28 Items)'}
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                All questions are officially prescribed by the Office of the Registrar General of India.
              </p>
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter indicators by keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-xs md:text-sm focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 py-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded-lg capitalize font-medium transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat === 'all' ? 'All Categories' : cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
            {filteredQuestions.slice(0, expandedView ? filteredQuestions.length : 9).map((q) => {
              const IconComp = iconMap[q.iconName] || Home;
              return (
                <div 
                  key={q.id}
                  className="bg-white rounded-xl p-4 border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center">
                        {q.id}
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {q.category}
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5 mb-2">
                      <IconComp className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                      <h4 className="text-sm font-bold text-slate-900 leading-snug">
                        {q.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {q.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredQuestions.length > 9 && (
            <div className="text-center mt-6 pt-4 border-t border-slate-200">
              <button
                onClick={() => setExpandedView(!expandedView)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-bold shadow-xs transition-all cursor-pointer"
              >
                {expandedView ? 'Show Less Questions' : `View All ${filteredQuestions.length} Questions`}
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
