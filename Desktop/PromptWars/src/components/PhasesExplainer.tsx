import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { censusPhases } from '../data/phasesData';
import { Home, Users, CheckCircle2, Search, ArrowRight, Layers, Sparkles, Building, Activity, Shield, Umbrella, Droplet, Sun, Flame, Tv, Wifi, Bike, Smartphone, BookOpen, Briefcase, Heart, Award, Cpu, MapPin, Smile, FileText } from 'lucide-react';

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
    <section id="phases" className="py-16 md:py-20 bg-[#FAF7F2] border-b border-[#E5DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#162A45] tracking-tight">
            {t.phases.title}
          </h2>
          <p className="text-stone-600 text-base sm:text-lg font-normal">
            {t.phases.subtitle}
          </p>
        </div>

        {/* Phase Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Phase 1 Card */}
          <div 
            onClick={() => setSelectedPhase(1)}
            className={`rounded-lg p-6 md:p-8 border transition-all cursor-pointer relative bg-[#FDFBF7] ${
              selectedPhase === 1 
                ? 'border-[#B83A24] ring-1 ring-[#B83A24] shadow-xs' 
                : 'border-[#E5DFD5] hover:border-[#C5BBAA]'
            }`}
          >
            <div className="flex items-center justify-between gap-4 mb-4">
              <span className="px-3 py-1 rounded bg-[#F7EFE9] text-[#7A2818] text-xs font-semibold border border-[#E8D2C5]">
                {t.phases.phase1Badge}
              </span>
              <span className="text-xs font-mono text-stone-600 bg-[#FAF7F2] px-2.5 py-1 rounded border border-[#E5DFD5]">
                {phase1.questionsCount} Questions
              </span>
            </div>

            <div className="flex items-start gap-4 mb-4">
              <div className="w-11 h-11 rounded-md bg-[#F7EFE9] text-[#B83A24] border border-[#E8D2C5] flex items-center justify-center shrink-0">
                <Home className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-[#162A45]">{t.phases.phase1Title}</h3>
                <p className="text-xs text-[#7A2818] font-medium mt-0.5">{phase1.subtitle}</p>
              </div>
            </div>

            <p className="text-sm text-stone-600 mb-6 leading-relaxed">
              {t.phases.phase1Desc}
            </p>

            <div className="space-y-2 mb-6">
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide">Key Highlights:</p>
              {phase1.keyHighlights.slice(0, 3).map((hl, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-stone-700">
                  <CheckCircle2 className="w-4 h-4 text-[#B83A24] shrink-0" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#E5DFD5]">
              {t.phases.phase1Tags.map((tag: string, i: number) => (
                <span key={i} className="bg-[#FAF7F2] text-stone-700 border border-[#E5DFD5] text-xs px-2.5 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <button 
                className={`text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer ${
                  selectedPhase === 1 ? 'text-[#B83A24]' : 'text-stone-500'
                }`}
              >
                <span>{selectedPhase === 1 ? 'Viewing questions below' : 'Click to explore questions'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Phase 2 Card */}
          <div 
            onClick={() => setSelectedPhase(2)}
            className={`rounded-lg p-6 md:p-8 border transition-all cursor-pointer relative bg-[#FDFBF7] ${
              selectedPhase === 2 
                ? 'border-[#26533A] ring-1 ring-[#26533A] shadow-xs' 
                : 'border-[#E5DFD5] hover:border-[#C5BBAA]'
            }`}
          >
            <div className="flex items-center justify-between gap-4 mb-4">
              <span className="px-3 py-1 rounded bg-[#EBF4EE] text-[#1E432E] text-xs font-semibold border border-[#C5DEC8]">
                {t.phases.phase2Badge}
              </span>
              <span className="text-xs font-mono text-stone-600 bg-[#FAF7F2] px-2.5 py-1 rounded border border-[#E5DFD5]">
                {phase2.questionsCount} Questions
              </span>
            </div>

            <div className="flex items-start gap-4 mb-4">
              <div className="w-11 h-11 rounded-md bg-[#EBF4EE] text-[#26533A] border border-[#C5DEC8] flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-[#162A45]">{t.phases.phase2Title}</h3>
                <p className="text-xs text-[#1E432E] font-medium mt-0.5">{phase2.subtitle}</p>
              </div>
            </div>

            <p className="text-sm text-stone-600 mb-6 leading-relaxed">
              {t.phases.phase2Desc}
            </p>

            <div className="space-y-2 mb-6">
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide">Key Highlights:</p>
              {phase2.keyHighlights.slice(0, 3).map((hl, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-stone-700">
                  <CheckCircle2 className="w-4 h-4 text-[#26533A] shrink-0" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#E5DFD5]">
              {t.phases.phase2Tags.map((tag: string, i: number) => (
                <span key={i} className="bg-[#FAF7F2] text-stone-700 border border-[#E5DFD5] text-xs px-2.5 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <button 
                className={`text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer ${
                  selectedPhase === 2 ? 'text-[#26533A]' : 'text-stone-500'
                }`}
              >
                <span>{selectedPhase === 2 ? 'Viewing questions below' : 'Click to explore questions'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Question Directory Explorer */}
        <div className="bg-[#FDFBF7] rounded-lg p-6 md:p-8 border border-[#E5DFD5] shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E5DFD5]">
            <div>
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${selectedPhase === 1 ? 'bg-[#B83A24]' : 'bg-[#26533A]'}`}></span>
                <h3 className="font-serif text-xl font-bold text-[#162A45]">
                  {selectedPhase === 1 ? 'Phase 1 Question Directory (31 Items)' : 'Phase 2 Individual Questionnaire (28 Items)'}
                </h3>
              </div>
              <p className="text-xs text-stone-500 mt-1">
                Officially prescribed by the Office of the Registrar General & Census Commissioner of India.
              </p>
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter questions by keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-[#FAF7F2] border border-[#DCD2C0] rounded-md text-xs md:text-sm focus:ring-1 focus:ring-[#B83A24] focus:border-[#B83A24] focus:outline-hidden"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 py-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded-md capitalize font-medium transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#162A45] text-white shadow-2xs'
                    : 'bg-[#FAF7F2] text-stone-700 border border-[#E5DFD5] hover:bg-[#F2ECE1]'
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
                  className="bg-[#FAF7F2] rounded-md p-4 border border-[#E5DFD5] hover:border-[#C5BBAA] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="w-5 h-5 rounded bg-[#F2ECE1] text-stone-700 text-xs font-mono font-bold flex items-center justify-center">
                        {q.id}
                      </span>
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#F2ECE1] text-stone-600">
                        {q.category}
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5 mb-2">
                      <IconComp className="w-4 h-4 text-[#B83A24] shrink-0 mt-0.5" />
                      <h4 className="text-sm font-semibold text-[#162A45] leading-snug">
                        {q.title}
                      </h4>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {q.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredQuestions.length > 9 && (
            <div className="text-center mt-6 pt-4 border-t border-[#E5DFD5]">
              <button
                onClick={() => setExpandedView(!expandedView)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#FAF7F2] border border-[#C5BBAA] hover:bg-[#F2ECE1] text-[#162A45] text-xs font-semibold transition-all cursor-pointer"
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
