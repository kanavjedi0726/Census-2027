import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { censusHistoricalData } from '../data/insightsData';
import { BarChart3, TrendingUp, Users, BookOpen, Building2, Heart, Award, Info } from 'lucide-react';

type MetricType = 'population' | 'growth' | 'sexRatio' | 'literacy' | 'urban';

export const DataInsights: React.FC = () => {
  const { t } = useLanguage();
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('population');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const metricConfig = {
    population: {
      label: t.insights.metricPopulation,
      key: 'populationCrores' as const,
      color: 'bg-orange-600',
      strokeColor: '#ea580c',
      fillColor: 'rgba(234, 88, 12, 0.2)',
      unit: ' Cr',
      min: 0,
      max: 160,
      icon: Users
    },
    growth: {
      label: t.insights.metricGrowth,
      key: 'growthRatePct' as const,
      color: 'bg-amber-600',
      strokeColor: '#d97706',
      fillColor: 'rgba(217, 119, 6, 0.2)',
      unit: '%',
      min: 0,
      max: 30,
      icon: TrendingUp
    },
    sexRatio: {
      label: t.insights.metricSexRatio,
      key: 'sexRatio' as const,
      color: 'bg-rose-600',
      strokeColor: '#e11d48',
      fillColor: 'rgba(225, 29, 72, 0.2)',
      unit: ' / 1000 M',
      min: 900,
      max: 980,
      icon: Heart
    },
    literacy: {
      label: t.insights.metricLiteracy,
      key: 'literacyPct' as const,
      color: 'bg-emerald-600',
      strokeColor: '#059669',
      fillColor: 'rgba(5, 150, 105, 0.2)',
      unit: '%',
      min: 0,
      max: 100,
      icon: BookOpen
    },
    urban: {
      label: t.insights.metricUrban,
      key: 'urbanPct' as const,
      color: 'bg-blue-600',
      strokeColor: '#2563eb',
      fillColor: 'rgba(37, 99, 235, 0.2)',
      unit: '%',
      min: 0,
      max: 50,
      icon: Building2
    }
  };

  const currentCfg = metricConfig[selectedMetric];

  // SVG dimensions
  const svgWidth = 800;
  const svgHeight = 320;
  const paddingX = 50;
  const paddingY = 40;

  const chartWidth = svgWidth - paddingX * 2;
  const chartHeight = svgHeight - paddingY * 2;

  const points = censusHistoricalData.map((d, i) => {
    const x = paddingX + (i / (censusHistoricalData.length - 1)) * chartWidth;
    const val = d[currentCfg.key];
    const normalizedY = (val - currentCfg.min) / (currentCfg.max - currentCfg.min);
    const y = svgHeight - paddingY - normalizedY * chartHeight;
    return { x, y, val, year: d.year };
  });

  const pathD = points.reduce((acc, pt, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`, '');
  const areaD = `${pathD} L ${points[points.length - 1].x} ${svgHeight - paddingY} L ${points[0].x} ${svgHeight - paddingY} Z`;

  return (
    <section id="insights" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
            <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
            Demographic Intelligence
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.insights.title}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            {t.insights.subtitle}
          </p>
        </div>

        {/* Metric Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
          {(Object.keys(metricConfig) as MetricType[]).map((key) => {
            const cfg = metricConfig[key];
            const Icon = cfg.icon;
            const isSelected = selectedMetric === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedMetric(key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-md scale-102'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-orange-400' : 'text-slate-500'}`} />
                <span>{cfg.label}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Chart Card */}
        <div className="bg-slate-50 rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm max-w-5xl mx-auto space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Decennial Trend (1951 - 2027)</span>
              <h3 className="text-xl font-extrabold text-slate-900">{currentCfg.label}</h3>
            </div>
            <div className="text-xs font-mono text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
              Latest Projected: <strong className="text-slate-900 font-bold">{censusHistoricalData[censusHistoricalData.length - 1][currentCfg.key]}{currentCfg.unit}</strong>
            </div>
          </div>

          {/* SVG Chart Graphic */}
          <div className="relative w-full overflow-x-auto">
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto min-w-[600px] select-none">
              
              {/* Grid Lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
                const y = paddingY + pct * chartHeight;
                const val = (currentCfg.max - pct * (currentCfg.max - currentCfg.min)).toFixed(0);
                return (
                  <g key={idx}>
                    <line
                      x1={paddingX}
                      y1={y}
                      x2={svgWidth - paddingX}
                      y2={y}
                      stroke="#e2e8f0"
                      strokeDasharray="4 4"
                    />
                    <text x={paddingX - 10} y={y + 4} textAnchor="end" fontSize="10" fill="#94a3b8" fontFamily="monospace">
                      {val}
                    </text>
                  </g>
                );
              })}

              {/* Area fill */}
              <path d={areaD} fill={currentCfg.fillColor} />

              {/* Line path */}
              <path
                d={pathD}
                fill="none"
                stroke={currentCfg.strokeColor}
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points */}
              {points.map((pt, i) => {
                const isHovered = hoveredIndex === i;
                return (
                  <g 
                    key={i} 
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isHovered ? 8 : 5}
                      fill={isHovered ? '#0f172a' : '#ffffff'}
                      stroke={currentCfg.strokeColor}
                      strokeWidth="3"
                      className="transition-all"
                    />
                    {/* Year Labels */}
                    <text
                      x={pt.x}
                      y={svgHeight - paddingY + 20}
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight={isHovered ? 'bold' : 'normal'}
                      fill={isHovered ? '#0f172a' : '#64748b'}
                      fontFamily="monospace"
                    >
                      {pt.year}
                    </text>

                    {/* Value Labels */}
                    <text
                      x={pt.x}
                      y={pt.y - 12}
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="bold"
                      fill="#0f172a"
                      fontFamily="monospace"
                    >
                      {pt.val}{currentCfg.unit}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Historical Data Summary Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 pt-4 border-t border-slate-200">
            {censusHistoricalData.map((d, i) => (
              <div 
                key={d.year} 
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`p-2.5 rounded-xl text-center border transition-all cursor-pointer ${
                  hoveredIndex === i 
                    ? 'bg-orange-50 border-orange-400 ring-2 ring-orange-400/20' 
                    : 'bg-white border-slate-200'
                }`}
              >
                <span className="text-[11px] font-bold text-slate-500 font-mono block">{d.year}</span>
                <span className="text-xs font-extrabold text-slate-900 font-mono mt-0.5 block">
                  {d[currentCfg.key]}{currentCfg.unit}
                </span>
              </div>
            ))}
          </div>

          {/* Trend Takeaway Highlights */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-orange-600" />
              {t.insights.trendInsightsTitle}
            </h4>
            <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside leading-relaxed">
              <li>{t.insights.insight1}</li>
              <li>{t.insights.insight2}</li>
              <li>{t.insights.insight3}</li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};
