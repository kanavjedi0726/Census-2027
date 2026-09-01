import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { censusHistoricalData } from '../data/insightsData';
import { BarChart3, TrendingUp, Users, BookOpen, Building2, Heart, Info } from 'lucide-react';

type MetricType = 'population' | 'growth' | 'sexRatio' | 'literacy' | 'urban';

export const DataInsights: React.FC = () => {
  const { t } = useLanguage();
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('population');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const metricConfig = {
    population: {
      label: t.insights.metricPopulation,
      key: 'populationCrores' as const,
      color: 'bg-[#B83A24]',
      strokeColor: '#B83A24',
      fillColor: 'rgba(184, 58, 36, 0.12)',
      unit: ' Cr',
      min: 0,
      max: 160,
      icon: Users
    },
    growth: {
      label: t.insights.metricGrowth,
      key: 'growthRatePct' as const,
      color: 'bg-[#B36B15]',
      strokeColor: '#B36B15',
      fillColor: 'rgba(179, 107, 21, 0.12)',
      unit: '%',
      min: 0,
      max: 30,
      icon: TrendingUp
    },
    sexRatio: {
      label: t.insights.metricSexRatio,
      key: 'sexRatio' as const,
      color: 'bg-[#9C2F1C]',
      strokeColor: '#9C2F1C',
      fillColor: 'rgba(156, 47, 28, 0.12)',
      unit: ' / 1000 M',
      min: 900,
      max: 980,
      icon: Heart
    },
    literacy: {
      label: t.insights.metricLiteracy,
      key: 'literacyPct' as const,
      color: 'bg-[#26533A]',
      strokeColor: '#26533A',
      fillColor: 'rgba(38, 83, 58, 0.12)',
      unit: '%',
      min: 0,
      max: 100,
      icon: BookOpen
    },
    urban: {
      label: t.insights.metricUrban,
      key: 'urbanPct' as const,
      color: 'bg-[#162A45]',
      strokeColor: '#162A45',
      fillColor: 'rgba(22, 42, 69, 0.12)',
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
    <section id="insights" className="py-16 md:py-20 bg-[#FAF7F2] border-b border-[#E5DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#162A45] tracking-tight">
            {t.insights.title}
          </h2>
          <p className="text-stone-600 text-base sm:text-lg font-normal">
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
                className={`flex items-center gap-2 px-4 py-2.5 rounded-md text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#162A45] text-white shadow-2xs'
                    : 'bg-[#FDFBF7] text-stone-700 hover:bg-[#F2ECE1] border border-[#E5DFD5]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-[#E6C280]' : 'text-stone-400'}`} />
                <span>{cfg.label}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Chart Card */}
        <div className="bg-[#FDFBF7] rounded-lg p-6 md:p-8 border border-[#E5DFD5] shadow-xs max-w-5xl mx-auto space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#E5DFD5]">
            <div>
              <span className="text-xs font-semibold text-stone-500">Decennial Trend (1951 - 2027)</span>
              <h3 className="font-serif text-xl font-bold text-[#162A45]">{currentCfg.label}</h3>
            </div>
            <div className="text-xs font-mono text-stone-700 bg-[#FAF7F2] px-3 py-1.5 rounded border border-[#E5DFD5]">
              Projected 2027: <strong className="text-[#162A45] font-bold">{censusHistoricalData[censusHistoricalData.length - 1][currentCfg.key]}{currentCfg.unit}</strong>
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
                      stroke="#E5DFD5"
                      strokeDasharray="4 4"
                    />
                    <text x={paddingX - 10} y={y + 4} textAnchor="end" fontSize="10" fill="#8C827A" fontFamily="monospace">
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
                strokeWidth="2.5"
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
                      r={isHovered ? 7 : 4.5}
                      fill={isHovered ? '#162A45' : '#FAF7F2'}
                      stroke={currentCfg.strokeColor}
                      strokeWidth="2.5"
                      className="transition-all"
                    />
                    {/* Year Labels */}
                    <text
                      x={pt.x}
                      y={svgHeight - paddingY + 20}
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight={isHovered ? 'bold' : 'normal'}
                      fill={isHovered ? '#162A45' : '#736B63'}
                      fontFamily="monospace"
                    >
                      {pt.year}
                    </text>

                    {/* Value Labels */}
                    <text
                      x={pt.x}
                      y={pt.y - 10}
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="bold"
                      fill="#162A45"
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
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 pt-4 border-t border-[#E5DFD5]">
            {censusHistoricalData.map((d, i) => (
              <div 
                key={d.year} 
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`p-2.5 rounded text-center border transition-all cursor-pointer ${
                  hoveredIndex === i 
                    ? 'bg-[#F7EFE9] border-[#B83A24]' 
                    : 'bg-[#FAF7F2] border-[#E5DFD5]'
                }`}
              >
                <span className="text-xs font-semibold text-stone-500 font-mono block">{d.year}</span>
                <span className="text-xs font-bold text-[#162A45] font-mono mt-0.5 block">
                  {d[currentCfg.key]}{currentCfg.unit}
                </span>
              </div>
            ))}
          </div>

          {/* Trend Takeaway Highlights */}
          <div className="bg-[#FAF7F2] rounded-md p-5 border border-[#E5DFD5] space-y-2">
            <h4 className="text-xs font-semibold text-[#162A45] flex items-center gap-1.5">
              <Info className="w-4 h-4 text-[#B83A24]" />
              {t.insights.trendInsightsTitle}
            </h4>
            <ul className="text-xs text-stone-600 space-y-1.5 list-disc list-inside leading-relaxed">
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
