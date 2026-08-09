import React, { useState } from 'react';
import { 
  Activity, 
  Flame, 
  Brain, 
  TrendingUp, 
  ExternalLink, 
  ShieldAlert, 
  Users, 
  MapPin, 
  ArrowRight, 
  Sparkles, 
  Award,
  Filter,
  Layers,
  Thermometer,
  AlertTriangle,
  FileSpreadsheet
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  ScatterChart, 
  Scatter, 
  Cell
} from 'recharts';

// Define TS Interfaces for our simulated datasets mirroring French Public Health (Santé publique France) Open Data
interface MentalHealthData {
  category: string;
  depressiveEpisodesRate: number; // rate per 100,000 residents
  emergencyVisitsRate: number;    // rate per 100,000
  environmentalStressIndex: number; // 1-10 exposure level
}

interface HeatwaveMortalityData {
  year: string;
  excessMortalityRate: number; // % increase over baseline
  avgSummerTemp: number;       // °C
  hospitalizationsRate: number; // per 100,000 for heat stroke
}

interface SocialInequalityData {
  incomeDecile: string; // D1 (poorest) to D10 (richest)
  averageBll: number;  // Children Blood Lead Levels (µg/dL)
  chronicRespiratoryRate: number; // per 1,000
  lifeExpectancyGap: number; // Years below national average
}

// Simulated data mirroring Odissé's regional surveillance indicators
const MENTAL_HEALTH_DATA: MentalHealthData[] = [
  { category: "High Urban Stress / Deprived", depressiveEpisodesRate: 4200, emergencyVisitsRate: 180, environmentalStressIndex: 8.5 },
  { category: "Industrial Transition Zones", depressiveEpisodesRate: 3600, emergencyVisitsRate: 140, environmentalStressIndex: 7.2 },
  { category: "Affluent Suburban Districts", depressiveEpisodesRate: 2400, emergencyVisitsRate: 75, environmentalStressIndex: 4.1 },
  { category: "High Exposure Corridors (Noise/Air)", depressiveEpisodesRate: 3950, emergencyVisitsRate: 165, environmentalStressIndex: 8.9 },
  { category: "Semi-Rural / Moderate Stress", depressiveEpisodesRate: 2800, emergencyVisitsRate: 90, environmentalStressIndex: 5.0 },
  { category: "Low Impact Ecotope Areas", depressiveEpisodesRate: 1950, emergencyVisitsRate: 50, environmentalStressIndex: 2.5 }
];

const HEAT_MORTALITY_DATA: HeatwaveMortalityData[] = [
  { year: "2018 (Moderate Heat)", excessMortalityRate: 4.2, avgSummerTemp: 21.8, hospitalizationsRate: 12.4 },
  { year: "2019 (Severe Peaks)", excessMortalityRate: 9.8, avgSummerTemp: 23.1, hospitalizationsRate: 28.5 },
  { year: "2020 (Extended Warmth)", excessMortalityRate: 6.5, avgSummerTemp: 22.4, hospitalizationsRate: 18.2 },
  { year: "2021 (Mild Summer)", excessMortalityRate: 2.1, avgSummerTemp: 20.9, hospitalizationsRate: 8.0 },
  { year: "2022 (Record Break)", excessMortalityRate: 14.3, avgSummerTemp: 24.2, hospitalizationsRate: 44.1 },
  { year: "2023 (Sustained Waves)", excessMortalityRate: 11.2, avgSummerTemp: 23.8, hospitalizationsRate: 36.4 },
  { year: "2026 (Model Prediction)", excessMortalityRate: 16.5, avgSummerTemp: 25.1, hospitalizationsRate: 51.0 }
];

const INEQUALITY_DATA: SocialInequalityData[] = [
  { incomeDecile: "D1 (Poorest 10%)", averageBll: 3.8, chronicRespiratoryRate: 78, lifeExpectancyGap: 5.2 },
  { incomeDecile: "D2", averageBll: 3.2, chronicRespiratoryRate: 69, lifeExpectancyGap: 4.1 },
  { incomeDecile: "D3", averageBll: 2.9, chronicRespiratoryRate: 62, lifeExpectancyGap: 3.4 },
  { incomeDecile: "D4", averageBll: 2.4, chronicRespiratoryRate: 54, lifeExpectancyGap: 2.8 },
  { incomeDecile: "D5 (Median)", averageBll: 1.9, chronicRespiratoryRate: 45, lifeExpectancyGap: 2.0 },
  { incomeDecile: "D6", averageBll: 1.6, chronicRespiratoryRate: 41, lifeExpectancyGap: 1.5 },
  { incomeDecile: "D7", averageBll: 1.3, chronicRespiratoryRate: 35, lifeExpectancyGap: 0.9 },
  { incomeDecile: "D8", averageBll: 1.0, chronicRespiratoryRate: 28, lifeExpectancyGap: 0.4 },
  { incomeDecile: "D9", averageBll: 0.7, chronicRespiratoryRate: 22, lifeExpectancyGap: -0.5 },
  { incomeDecile: "D10 (Richest 10%)", averageBll: 0.4, chronicRespiratoryRate: 14, lifeExpectancyGap: -1.8 }
];

export const OdisseDataviz: React.FC = () => {
  const [activeChallenge, setActiveChallenge] = useState<'mental' | 'heat' | 'inequality'>('mental');
  
  // Interactive Simulation variables
  const [urbanGreeneryBonus, setUrbanGreeneryBonus] = useState<number>(30); // % increase in urban tree canopy
  const [socialCareFunding, setSocialCareFunding] = useState<number>(50);  // % budget expansion

  // Calculate dynamic mental health mitigation based on simulation factors
  const getDynamicMentalData = () => {
    return MENTAL_HEALTH_DATA.map(item => {
      // High greenery reduces environmental stress & depressive rate
      const stressReduction = (urbanGreeneryBonus / 100) * 1.8;
      const rateReduction = (urbanGreeneryBonus / 100) * 0.12 + (socialCareFunding / 100) * 0.18;
      
      return {
        ...item,
        environmentalStressIndex: Number(Math.max(1.0, item.environmentalStressIndex - stressReduction).toFixed(1)),
        depressiveEpisodesRate: Math.round(item.depressiveEpisodesRate * (1 - rateReduction)),
        emergencyVisitsRate: Math.round(item.emergencyVisitsRate * (1 - rateReduction * 1.3))
      };
    });
  };

  // Calculate heat-mitigated numbers (e.g. green canopy shades the extreme peaks)
  const getDynamicHeatData = () => {
    return HEAT_MORTALITY_DATA.map(item => {
      // Canopy cooling reduces mortality rate and hospitalizations
      const canopyCoolingEffect = (urbanGreeneryBonus / 100) * 0.25;
      const careEffect = (socialCareFunding / 100) * 0.2;
      const totalMitigation = canopyCoolingEffect + careEffect;
      
      return {
        ...item,
        excessMortalityRate: Number(Math.max(0.5, item.excessMortalityRate * (1 - totalMitigation)).toFixed(1)),
        hospitalizationsRate: Number(Math.max(2.0, item.hospitalizationsRate * (1 - totalMitigation * 1.1)).toFixed(1))
      };
    });
  };

  // Calculate social inequality mitigation (funding targets poorest deciles)
  const getDynamicInequalityData = () => {
    return INEQUALITY_DATA.map((item, idx) => {
      // D1-D5 receive direct targeted remediation (reducing blood lead levels and respiratory hazards)
      const targetWeight = Math.max(0, 10 - idx) / 10;
      const bllReduction = (socialCareFunding / 100) * 0.4 * targetWeight + (urbanGreeneryBonus / 100) * 0.1 * targetWeight;
      const respiratoryReduction = (urbanGreeneryBonus / 100) * 0.3 * targetWeight;
      const lifeGapImprovement = (socialCareFunding / 100) * 1.2 * targetWeight;

      return {
        ...item,
        averageBll: Number(Math.max(0.2, item.averageBll * (1 - bllReduction)).toFixed(1)),
        chronicRespiratoryRate: Math.round(item.chronicRespiratoryRate * (1 - respiratoryReduction)),
        lifeExpectancyGap: Number(Math.max(-2.5, item.lifeExpectancyGap - lifeGapImprovement).toFixed(1))
      };
    });
  };

  return (
    <div id="odisse-dataviz-root" className="flex-1 flex flex-col lg:flex-row overflow-y-auto">
      
      {/* SIDEBAR: CONTROL & CHALLENGE SELECTION */}
      <div className="w-full lg:w-96 border-r border-[#E5E5E5] bg-white p-6 space-y-8 shrink-0">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-600 mb-1 uppercase tracking-widest">
            <Award size={14} className="text-cyan-600" />
            <span>[ODISSÉ_DATAVIZ_CHALLENGE_2026]</span>
          </div>
          <h3 className="text-xl font-serif font-light text-neutral-800">Santé publique France</h3>
          <p className="text-xs text-[#666] mt-2 font-sans leading-relaxed">
            Inviting developers, modelers, and public health practitioners to transform thousands of localized surveillance indicators from the Odissé platform into practical, impactful tools.
          </p>
        </div>

        {/* CHALLENGE TAB SELECTOR */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Select Challenge Track</label>
          
          <button
            onClick={() => setActiveChallenge('mental')}
            className={`w-full p-3 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
              activeChallenge === 'mental'
                ? 'bg-cyan-50/50 border-cyan-500 shadow-xs'
                : 'bg-white border-gray-150 hover:bg-gray-50'
            }`}
          >
            <Brain className={`w-5 h-5 shrink-0 ${activeChallenge === 'mental' ? 'text-cyan-600' : 'text-gray-400'}`} />
            <div>
              <h4 className="text-xs font-bold text-black flex items-center gap-1.5">
                1. Mental Health 
                <span className="text-[8px] font-mono bg-cyan-100 text-cyan-800 px-1.5 py-0.25 rounded font-bold">SANTÉ MENTALE</span>
              </h4>
              <p className="text-[10px] text-gray-500 mt-0.5 leading-normal">
                Correlating regional depressive episodes & hospitalizations with environmental stressors.
              </p>
            </div>
          </button>

          <button
            onClick={() => setActiveChallenge('heat')}
            className={`w-full p-3 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
              activeChallenge === 'heat'
                ? 'bg-amber-50/50 border-amber-500 shadow-xs'
                : 'bg-white border-gray-150 hover:bg-gray-50'
            }`}
          >
            <Flame className={`w-5 h-5 shrink-0 ${activeChallenge === 'heat' ? 'text-amber-600' : 'text-gray-400'}`} />
            <div>
              <h4 className="text-xs font-bold text-black flex items-center gap-1.5">
                2. Impacts of Heat
                <span className="text-[8px] font-mono bg-amber-100 text-amber-800 px-1.5 py-0.25 rounded font-bold">IMPACTS DE LA CHALEUR</span>
              </h4>
              <p className="text-[10px] text-gray-500 mt-0.5 leading-normal">
                Visualizing summer excess mortality rates and heat wave vulnerability thresholds.
              </p>
            </div>
          </button>

          <button
            onClick={() => setActiveChallenge('inequality')}
            className={`w-full p-3 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
              activeChallenge === 'inequality'
                ? 'bg-emerald-50/50 border-emerald-500 shadow-xs'
                : 'bg-white border-gray-150 hover:bg-gray-50'
            }`}
          >
            <Users className={`w-5 h-5 shrink-0 ${activeChallenge === 'inequality' ? 'text-emerald-600' : 'text-gray-400'}`} />
            <div>
              <h4 className="text-xs font-bold text-black flex items-center gap-1.5">
                3. Social inequalities
                <span className="text-[8px] font-mono bg-emerald-100 text-emerald-800 px-1.5 py-0.25 rounded font-bold">INÉGALITÉS SOCIALES</span>
              </h4>
              <p className="text-[10px] text-gray-500 mt-0.5 leading-normal">
                Tracing children blood lead levels, respiratory disease gaps, and life expectancy anomalies.
              </p>
            </div>
          </button>
        </div>

        {/* INTERACTIVE POLICY SLIDERS (ICEarth Integration Showcase) */}
        <div className="pt-6 border-t border-gray-150 space-y-6">
          <div>
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
              <Layers size={12} className="text-cyan-600" />
              ICEarth Exposenome Policy Simulator
            </h4>
            <p className="text-[10px] text-gray-500 font-sans leading-relaxed">
              Dynamically simulate how targeted local policy interventions (e.g., green infrastructure, toxic cleanup, medical funding) mitigate Odissé public health indicators.
            </p>
          </div>

          {/* SLIDER 1: URBAN GREEN CANOPY */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-[#1A1A1A] flex items-center gap-1 font-sans">
                🌳 Urban Canopy Tree Density
              </span>
              <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 bg-emerald-50 text-emerald-700 rounded">
                +{urbanGreeneryBonus}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={urbanGreeneryBonus}
              onChange={(e) => setUrbanGreeneryBonus(Number(e.target.value))}
              className="w-full accent-emerald-600 h-1 bg-gray-150 rounded cursor-pointer"
            />
            <p className="text-[9px] text-[#888] font-mono flex justify-between">
              <span>Standard Asphalt</span>
              <span>Optimal Green Canopy</span>
            </p>
          </div>

          {/* SLIDER 2: EXPANDED SOCIAL CARE & TOXIC REMEDIATION */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-[#1A1A1A] flex items-center gap-1 font-sans">
                🏥 Social Medicine & Remediation Fund
              </span>
              <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 bg-cyan-50 text-cyan-700 rounded">
                +{socialCareFunding}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={socialCareFunding}
              onChange={(e) => setSocialCareFunding(Number(e.target.value))}
              className="w-full accent-cyan-600 h-1 bg-gray-150 rounded cursor-pointer"
            />
            <p className="text-[9px] text-[#888] font-mono flex justify-between">
              <span>Baseline Budgets</span>
              <span>Sovereign Tri-Cabinet Scale</span>
            </p>
          </div>
        </div>

        {/* OUTBOUND RESOURCE FOOTER */}
        <div className="p-4 bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl space-y-2">
          <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400">Open Data Ingress</h4>
          <p className="text-[10px] text-gray-500 leading-relaxed font-sans">
            Our platform is designed to seamlessly ingest massive CSV/Parquet streams directly from France's official surveillance catalog.
          </p>
          <a
            href="https://odisse.santepubliquefrance.fr/pages/accueil/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-mono text-cyan-600 hover:text-cyan-800 font-bold flex items-center gap-1 justify-center pt-1"
          >
            Visit odisse.santepubliquefrance.fr <ExternalLink size={10} />
          </a>
        </div>
      </div>

      {/* GRAPH AND DATA VISUALIZATION ZONE */}
      <div className="flex-1 p-8 space-y-8 bg-white overflow-y-auto">
        
        {/* TOP STATUS RIBBON */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-150 gap-4">
          <div>
            <span className="text-[10px] font-mono text-[#999] uppercase tracking-widest block">Santé publique France • Dataviz Challenge Submission</span>
            <h2 className="text-2xl font-serif font-light text-black mt-1">
              {activeChallenge === 'mental' && 'Exhibit O-1: Mental Health & Environmental Exposome Stress'}
              {activeChallenge === 'heat' && 'Exhibit O-2: Climatological Temperature Excess & Acute Heat Vulnerability'}
              {activeChallenge === 'inequality' && 'Exhibit O-3: Social Gradient & Intermunicipal Health Inequalities (ISS)'}
            </h2>
            <p className="text-xs text-[#666] font-sans mt-1">
              {activeChallenge === 'mental' && 'Modeling the correlation between high urban exposure stressors and depressive episode severity at the intermunicipal level.'}
              {activeChallenge === 'heat' && 'Simulating the summer thermal canopy response curve, illustrating how urban tree index mitigates climate-driven excess mortality.'}
              {activeChallenge === 'inequality' && 'Visualizing the steep social gradient of lead exposure and respiratory disease, directly targeted by ICEarth remediation plans.'}
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[11px] font-mono font-bold text-emerald-600">PROTOTYPE ONLINE</span>
          </div>
        </div>

        {/* ACTIVE VISUALIZATION CANVAS */}
        <div className="p-6 border border-[#E5E5E5] bg-[#FCFCFC] rounded-2xl space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-cyan-600" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1A1A1A]">
                {activeChallenge === 'mental' && 'Interactive EP-40 Surveillance Flow'}
                {activeChallenge === 'heat' && 'Summer Excess Heat Curve'}
                {activeChallenge === 'inequality' && 'Intermunicipal Decile Disparity'}
              </span>
            </div>
            
            {/* Visual Legend / Metrics Indicator */}
            <div className="text-[10px] text-gray-500 font-mono">
              Interventions: Tree Canopy ({urbanGreeneryBonus}%) | Funding ({socialCareFunding}%)
            </div>
          </div>

          {/* DYNAMIC CHART RENDER */}
          <div className="w-full h-96 bg-white border border-gray-150 rounded-xl p-4 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              {activeChallenge === 'mental' ? (
                // Challenge 1: Mental Health Chart
                <AreaChart
                  data={getDynamicMentalData()}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorDep" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0891b2" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#0891b2" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                  <XAxis dataKey="category" stroke="#888888" fontSize={10} tickLine={false} />
                  <YAxis yAxisId="left" label={{ value: 'Depressive Rate per 100k', angle: -90, position: 'insideLeft', style: { fontSize: 10, fill: '#0891b2' } }} stroke="#0891b2" fontSize={10} />
                  <YAxis yAxisId="right" orientation="right" label={{ value: 'Exposome Stress Index (1-10)', angle: 90, position: 'insideRight', style: { fontSize: 10, fill: '#f59e0b' } }} stroke="#f59e0b" fontSize={10} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #E5E5E5', fontSize: '11px' }}
                    labelStyle={{ fontWeight: 'bold', color: '#1a1a1a' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Area yAxisId="left" type="monotone" dataKey="depressiveEpisodesRate" name="Depressive Episodes / 100,000 residents" stroke="#0891b2" fillOpacity={1} fill="url(#colorDep)" />
                  <Area yAxisId="right" type="monotone" dataKey="environmentalStressIndex" name="Exposome Stress Exposure Index" stroke="#f59e0b" fillOpacity={1} fill="url(#colorStress)" />
                </AreaChart>
              ) : activeChallenge === 'heat' ? (
                // Challenge 2: Heat Impacts Chart
                <LineChart
                  data={getDynamicHeatData()}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                  <XAxis dataKey="year" stroke="#888888" fontSize={10} tickLine={false} />
                  <YAxis yAxisId="left" label={{ value: 'Excess Mortality (%)', angle: -90, position: 'insideLeft', style: { fontSize: 10, fill: '#ea580c' } }} stroke="#ea580c" fontSize={10} />
                  <YAxis yAxisId="right" orientation="right" label={{ value: 'Avg Summer Temperature (°C)', angle: 90, position: 'insideRight', style: { fontSize: 10, fill: '#ef4444' } }} stroke="#ef4444" fontSize={10} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #E5E5E5', fontSize: '11px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Line yAxisId="left" type="monotone" dataKey="excessMortalityRate" name="Summer Excess Mortality (%)" stroke="#ea580c" strokeWidth={3} activeDot={{ r: 8 }} />
                  <Line yAxisId="right" type="monotone" dataKey="avgSummerTemp" name="Avg Summer Temperature (°C)" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" />
                  <Line yAxisId="left" type="monotone" dataKey="hospitalizationsRate" name="Heat Stroke Hospitalizations / 100k" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              ) : (
                // Challenge 3: Inequality Chart
                <BarChart
                  data={getDynamicInequalityData()}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                  <XAxis dataKey="incomeDecile" stroke="#888888" fontSize={10} tickLine={false} />
                  <YAxis yAxisId="left" label={{ value: 'Chronic Respiratory (per 1,000) & BLL (µg/dL)', angle: -90, position: 'insideLeft', style: { fontSize: 10, fill: '#10b981' } }} stroke="#10b981" fontSize={10} />
                  <YAxis yAxisId="right" orientation="right" label={{ value: 'Life Expectancy Gap (Years below National Avg)', angle: 90, position: 'insideRight', style: { fontSize: 10, fill: '#3b82f6' } }} stroke="#3b82f6" fontSize={10} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #E5E5E5', fontSize: '11px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar yAxisId="left" dataKey="averageBll" name="Blood Lead Levels (µg/dL)" fill="#10b981" radius={[4, 4, 0, 0]}>
                    {getDynamicInequalityData().map((entry, index) => (
                      <Cell key={`cell-bll-${index}`} fill={index < 3 ? '#ef4444' : '#10b981'} />
                    ))}
                  </Bar>
                  <Bar yAxisId="left" dataKey="chronicRespiratoryRate" name="Chronic Respiratory Rate / 1,000" fill="#059669" radius={[4, 4, 0, 0]} />
                  <Line yAxisId="right" type="monotone" dataKey="lifeExpectancyGap" name="Years below average Life Expectancy" stroke="#3b82f6" strokeWidth={3} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>

          {/* DYNAMIC METRIC OUTCOMES */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-150">
            <div className="p-4 bg-white border border-gray-200 rounded-xl">
              <span className="text-[10px] font-mono text-[#999] uppercase block">
                {activeChallenge === 'mental' && 'Mean Depressive Rate / 100k'}
                {activeChallenge === 'heat' && 'Mitigated Peak Excess Mortality'}
                {activeChallenge === 'inequality' && 'Poorest Decile BLL Exposure'}
              </span>
              <span className="text-xl font-serif text-black font-light block mt-1">
                {activeChallenge === 'mental' && `${Math.round(getDynamicMentalData().reduce((acc, curr) => acc + curr.depressiveEpisodesRate, 0) / getDynamicMentalData().length)} cases`}
                {activeChallenge === 'heat' && `${getDynamicHeatData()[6].excessMortalityRate}%`}
                {activeChallenge === 'inequality' && `${getDynamicInequalityData()[0].averageBll} µg/dL`}
              </span>
              <p className="text-[10px] text-gray-500 mt-1 leading-normal">
                {activeChallenge === 'mental' && 'Averaged across all intermunicipal zone typologies under current urban greenery policies.'}
                {activeChallenge === 'heat' && 'Projected mortality rate for 2026 under selected tree canopy shadowing index.'}
                {activeChallenge === 'inequality' && 'Average childhood blood lead levels for D1 decile; highlighting critical environmental injustice.'}
              </p>
            </div>

            <div className="p-4 bg-white border border-gray-200 rounded-xl">
              <span className="text-[10px] font-mono text-[#999] uppercase block">
                {activeChallenge === 'mental' && 'Averaged Emergency Visits'}
                {activeChallenge === 'heat' && '2026 Emergency Ingress Rate'}
                {activeChallenge === 'inequality' && 'Poorest Decile Life Gap'}
              </span>
              <span className="text-xl font-serif text-black font-light block mt-1">
                {activeChallenge === 'mental' && `${Math.round(getDynamicMentalData().reduce((acc, curr) => acc + curr.emergencyVisitsRate, 0) / getDynamicMentalData().length)} visits`}
                {activeChallenge === 'heat' && `${getDynamicHeatData()[6].hospitalizationsRate} per 100k`}
                {activeChallenge === 'inequality' && `${getDynamicInequalityData()[0].lifeExpectancyGap} years`}
              </span>
              <p className="text-[10px] text-gray-500 mt-1 leading-normal">
                {activeChallenge === 'mental' && 'Emergency psychiatric consults per 100,000 residents in direct stress zones.'}
                {activeChallenge === 'heat' && 'Expected emergency hospitalizations for severe heatstroke/dehydration.'}
                {activeChallenge === 'inequality' && 'Life expectancy penalty for residents in high-exposure intermunicipal zones.'}
              </p>
            </div>

            <div className="p-4 bg-white border border-[#E5E5E5] rounded-xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-cyan-600 uppercase block font-bold">
                  {activeChallenge === 'mental' && '🌲 Environmental Buffering'}
                  {activeChallenge === 'heat' && '🌡️ Urban Heat Island Block'}
                  {activeChallenge === 'inequality' && '💸 Environmental Justice Index'}
                </span>
                <span className="text-xl font-serif text-cyan-700 font-light block mt-1">
                  {activeChallenge === 'mental' && `${Math.round(urbanGreeneryBonus * 0.4 + socialCareFunding * 0.6)}% Mitigated`}
                  {activeChallenge === 'heat' && `-${(urbanGreeneryBonus * 0.25).toFixed(1)}°C Temp Offset`}
                  {activeChallenge === 'inequality' && `+${((socialCareFunding * 0.5) / 10).toFixed(1)} Yrs Gained`}
                </span>
              </div>
              <p className="text-[10px] text-cyan-800 bg-cyan-50 px-2 py-1 rounded mt-2 font-mono">
                {activeChallenge === 'mental' && '✓ Heavy exposure areas protected.'}
                {activeChallenge === 'heat' && '✓ Albedo effect actively simulated.'}
                {activeChallenge === 'inequality' && '✓ Social care funds targeted optimally.'}
              </p>
            </div>
          </div>
        </div>

        {/* DETAILED SURVEILLANCE & INFRASTRUCTURE ANALYSIS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* THE VALUE PROPOSITION CARD */}
          <div className="p-6 border border-gray-200 bg-[#FCFCFC] rounded-2xl space-y-4">
            <h4 className="text-base font-serif font-semibold text-neutral-800 flex items-center gap-2">
              <Sparkles className="text-cyan-600 w-5 h-5" />
              ICEarth: Value Proposition for the Odissé Dataviz
            </h4>
            <div className="text-xs text-[#555] space-y-3 leading-relaxed font-sans">
              <p>
                The **Odissé platform by Santé publique France** provides rich, localized, intermunicipal surveillance databases. However, static charts often fail to capture the multi-dimensional causality of environmental and social exposure.
              </p>
              <p>
                By integrating Odissé's data directly into <strong className="text-black font-semibold">ICEarth’s Exposenome Platform</strong>, we can correlate environmental layers with local clinical metrics in real-time. For example:
              </p>
              <ul className="list-disc pl-4 space-y-2 text-[#444]">
                <li>
                  <strong className="text-black">Exposure Overlays</strong>: Matching groundwater temperature patterns with local heatwave excess mortality to predict future hyperthermia hot-spots.
                </li>
                <li>
                  <strong className="text-black">Social Gradient Auditing</strong>: Proving how child blood lead levels and respiratory diseases drop significantly when proactive soil remediation algorithms are deployed.
                </li>
                <li>
                  <strong className="text-black">Direct Policy ROI</strong>: Translating public health data into precise financial metrics, showing municipal cabinets how much capital they save by remediating toxic corridors.
                </li>
              </ul>
            </div>
          </div>

          {/* METHODOLOGY & DATA INGRESS SPECS */}
          <div className="p-6 border border-gray-200 bg-white rounded-2xl space-y-4">
            <h4 className="text-base font-serif font-semibold text-neutral-800 flex items-center gap-2">
              <FileSpreadsheet className="text-emerald-600 w-5 h-5" />
              Surveillance Methodology & Open Data Schema
            </h4>
            
            <div className="space-y-4 text-xs font-sans">
              <p className="text-gray-600 leading-relaxed">
                Our database ingestion framework maps localized French administrative indices directly. The simulated datasets displayed above are calibrated based on peer-reviewed French environmental surveys:
              </p>
              
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-150 space-y-2.5 font-mono text-[10px]">
                <div className="flex justify-between text-neutral-600">
                  <span>System Reference:</span>
                  <span className="text-neutral-800 font-bold">Odissé-API-v1.2</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Socioeconomic Index:</span>
                  <span className="text-neutral-800 font-bold">Insee FDep (Deprivation index)</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Medical Cohort:</span>
                  <span className="text-neutral-800 font-bold">ALD-31 (Chronic disease list)</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Groundwater Baseline:</span>
                  <span className="text-neutral-800 font-bold">BRGM H2O-Temp Ingress</span>
                </div>
              </div>

              <div className="p-3.5 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-100 flex gap-2.5 items-start">
                <ShieldAlert className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-[11px] leading-normal font-medium">
                  <strong>Did you know?</strong> In France, the gap in life expectancy between the poorest 10% and richest 10% reaches over 7 years. Our Challenge 3 dashboard showcases how target exposures like heavy metals or lead contamination drive this disparity.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
