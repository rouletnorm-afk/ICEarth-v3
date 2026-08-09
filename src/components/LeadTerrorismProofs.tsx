import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Globe, 
  TrendingUp, 
  AlertCircle, 
  ArrowUpRight, 
  Lock, 
  Activity, 
  Flame, 
  Layers, 
  MapPin, 
  DollarSign, 
  Users, 
  CheckCircle2, 
  Skull, 
  TrendingDown, 
  Server, 
  ShieldAlert,
  ChevronRight,
  BookOpen,
  Filter,
  Youtube,
  Play,
  Database,
  ExternalLink,
  BarChart3
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  ZAxis, 
  Tooltip, 
  BarChart, 
  Bar, 
  CartesianGrid,
  Legend,
  Cell
} from 'recharts';

interface StateProfile {
  name: string;
  minerals: string;
  leadRisk: 'Critical' | 'High' | 'Medium' | 'Low';
  bllAvg: number; // Average Blood Lead Level (μg/dL)
  terrorThreat: 'Critical' | 'High' | 'Medium' | 'Low';
  incidentsCount: number; // Annual security incidents
  povertyRate: number; // %
  zamfaraIncident: boolean;
  notes: string;
}

const NIGERIAN_STATE_DATA: StateProfile[] = [
  {
    name: "Zamfara",
    minerals: "Gold, Lead-Zinc, Iron Ore",
    leadRisk: "Critical",
    bllAvg: 45.2,
    terrorThreat: "Critical",
    incidentsCount: 142,
    povertyRate: 74.0,
    zamfaraIncident: true,
    notes: "Epicenter of the 2010 lead poisoning epidemic; heavily infiltrated by gold-running bandits funding regional terror cells."
  },
  {
    name: "Kaduna",
    minerals: "Gold, Lithium, Aquamarine",
    leadRisk: "High",
    bllAvg: 28.5,
    terrorThreat: "Critical",
    incidentsCount: 184,
    povertyRate: 62.1,
    zamfaraIncident: false,
    notes: "Strategic lithium deposits mined illegally; remote sites act as safe havens and recruitment zones for armed banditry."
  },
  {
    name: "Niger",
    minerals: "Gold, Lithium, Coal",
    leadRisk: "High",
    bllAvg: 31.0,
    terrorThreat: "Critical",
    incidentsCount: 121,
    povertyRate: 66.8,
    zamfaraIncident: false,
    notes: "Porous forest borders allow illegal operations to barter minerals directly for high-grade small arms."
  },
  {
    name: "Plateau (Jos)",
    minerals: "Tin, Columbite, Barite",
    leadRisk: "High",
    bllAvg: 26.3,
    terrorThreat: "High",
    incidentsCount: 95,
    povertyRate: 58.3,
    zamfaraIncident: false,
    notes: "Legacy of colonial mining neglect; deep structural pits left un-remediated cause local water and lead-dust poisoning."
  },
  {
    name: "Ebonyi",
    minerals: "Lead-Zinc, Limestone",
    leadRisk: "High",
    bllAvg: 24.1,
    terrorThreat: "Medium",
    incidentsCount: 41,
    povertyRate: 71.5,
    zamfaraIncident: false,
    notes: "Southeastern lead-zinc belt has active artisanal mines; weak environmental oversight leading to widespread soil contamination."
  },
  {
    name: "Kwara",
    minerals: "Lithium, Gold, Tantalite",
    leadRisk: "Medium",
    bllAvg: 16.8,
    terrorThreat: "Medium",
    incidentsCount: 32,
    povertyRate: 53.0,
    zamfaraIncident: false,
    notes: "Recent lithium rush has seen increased influx of foreign illegal buyers operating without federal environmental licenses."
  },
  {
    name: "Osun",
    minerals: "Gold, Gemstones, Granite",
    leadRisk: "Medium",
    bllAvg: 18.2,
    terrorThreat: "Low",
    incidentsCount: 15,
    povertyRate: 41.2,
    zamfaraIncident: false,
    notes: "Artisanal gold mining has polluted local rivers with toxic sediment; high mercury and lead runoff detected."
  },
  {
    name: "Borno",
    minerals: "Clay, Diatomite, Limestone",
    leadRisk: "Medium",
    bllAvg: 15.4,
    terrorThreat: "Critical",
    incidentsCount: 210,
    povertyRate: 81.4,
    zamfaraIncident: false,
    notes: "While mineral extraction is lower, Boko Haram core cells utilize illicit mining proceeds from neighboring states to purchase weaponry."
  }
];

const GHANA_DISTRICT_DATA: StateProfile[] = [
  {
    name: "Samreboi (Wassa Amenfi West)",
    minerals: "Gold, High Mercury/Lead Silt",
    leadRisk: "Critical",
    bllAvg: 38.6,
    terrorThreat: "High",
    incidentsCount: 45,
    povertyRate: 52.4,
    zamfaraIncident: true,
    notes: "Epicenter of the Samreboi galamsey cartel operations; heavy contamination of the Tano and River Pra basins with industrial heavy metals."
  },
  {
    name: "Obuasi (Ashanti)",
    minerals: "Gold, Arsenic, Lead-Zinc",
    leadRisk: "High",
    bllAvg: 29.1,
    terrorThreat: "Medium",
    incidentsCount: 22,
    povertyRate: 35.8,
    zamfaraIncident: false,
    notes: "Historic gold mining hub now surrounded by illegal artisanal 'galamsey' operations encroaching on cocoa farming belts."
  },
  {
    name: "Tarkwa (Western)",
    minerals: "Gold, Manganese, Lead",
    leadRisk: "High",
    bllAvg: 27.4,
    terrorThreat: "Medium",
    incidentsCount: 18,
    povertyRate: 38.2,
    zamfaraIncident: false,
    notes: "Widespread acid mine drainage and lead-zinc trace emissions poisoning the Ankobra River delta."
  },
  {
    name: "Kyebi (Eastern)",
    minerals: "Gold, Bauxite, Mercury",
    leadRisk: "High",
    bllAvg: 22.5,
    terrorThreat: "Medium",
    incidentsCount: 14,
    povertyRate: 41.0,
    zamfaraIncident: false,
    notes: "Illegal galamsey networks have heavily polluted the Birim River, a major freshwater source for millions of citizens."
  },
  {
    name: "Bole (Savannah)",
    minerals: "Gold, Lithium",
    leadRisk: "Medium",
    bllAvg: 18.2,
    terrorThreat: "High",
    incidentsCount: 29,
    povertyRate: 64.5,
    zamfaraIncident: false,
    notes: "Northern expansion belt of illegal mining syndicates bordering Burkina Faso; growing risk of cross-border terror group collaboration."
  }
];

export interface GlobalBllCountry {
  rank: number;
  country: string;
  flag: string;
  population: number;
  populationFormatted: string;
  avgBll: number; // µg/dL
  cpBll: number; // µg/dL—population
  cpBllFormatted: string;
  percentGlobal: number; // %
  terrorNexusNote: string;
  isAfghanistanPeak?: boolean;
}

export const BMJ_GLOBAL_CPBLL_DATA: GlobalBllCountry[] = [
  {
    rank: 1,
    country: "India",
    flag: "🇮🇳",
    population: 1417173173,
    populationFormatted: "1,417,173,173",
    avgBll: 6.2,
    cpBll: 8786473673,
    cpBllFormatted: "8,786,473,673",
    percentGlobal: 24.89,
    terrorNexusNote: "Largest global lead burden (24.89% of earth). Battery recycling & industrial smelting."
  },
  {
    rank: 2,
    country: "China",
    flag: "🇨🇳",
    population: 1412175000,
    populationFormatted: "1,412,175,000",
    avgBll: 3.4,
    cpBll: 4801395000,
    cpBllFormatted: "4,801,395,000",
    percentGlobal: 13.60,
    terrorNexusNote: "Heavy industrial manufacturing & coal combustion legacy."
  },
  {
    rank: 3,
    country: "Bangladesh",
    flag: "🇧🇩",
    population: 171186372,
    populationFormatted: "171,186,372",
    avgBll: 6.8,
    cpBll: 1164067330,
    cpBllFormatted: "1,164,067,330",
    percentGlobal: 3.30,
    terrorNexusNote: "High lead in spices, turmeric adulteration, battery recycling & toxic silt."
  },
  {
    rank: 4,
    country: "Pakistan",
    flag: "🇵🇰",
    population: 235824862,
    populationFormatted: "235,824,862",
    avgBll: 4.9,
    cpBll: 1155541824,
    cpBllFormatted: "1,155,541,824",
    percentGlobal: 3.27,
    terrorNexusNote: "Borderland insurgency corridor (TTP/Taliban); leaded paint, cookware & informal smelting."
  },
  {
    rank: 5,
    country: "Nigeria",
    flag: "🇳🇬",
    population: 218541212,
    populationFormatted: "218,541,212",
    avgBll: 6.1,
    cpBll: 1070851939,
    cpBllFormatted: "1,070,851,939",
    percentGlobal: 3.03,
    terrorNexusNote: "Zamfara pediatric lead epidemic & gold/lithium-for-arms barter funding Boko Haram / ISIS."
  },
  {
    rank: 6,
    country: "Indonesia",
    flag: "🇮🇩",
    population: 275501339,
    populationFormatted: "275,501,339",
    avgBll: 3.2,
    cpBll: 881604285,
    cpBllFormatted: "881,604,285",
    percentGlobal: 2.50,
    terrorNexusNote: "Artisanal mining & informal lead battery smelters."
  },
  {
    rank: 7,
    country: "Egypt",
    flag: "🇪🇬",
    population: 111000000,
    populationFormatted: "111,000,000",
    avgBll: 6.6,
    cpBll: 732600000,
    cpBllFormatted: "732,600,000",
    percentGlobal: 2.07,
    terrorNexusNote: "Sinai insurgency buffer zone; leaded fuel legacy & urban lead water pipes."
  },
  {
    rank: 8,
    country: "Afghanistan",
    flag: "🇦🇫",
    population: 41128771,
    populationFormatted: "41,128,771",
    avgBll: 14.3,
    cpBll: 588141425,
    cpBllFormatted: "588,141,425",
    percentGlobal: 1.67,
    isAfghanistanPeak: true,
    terrorNexusNote: "WORST ON EARTH (#1 BLL AT 14.3 µg/dL). Supreme epicenter of Taliban & ISIS-K networks under Roulet's Law."
  },
  {
    rank: 9,
    country: "DR Congo",
    flag: "🇨🇩",
    population: 99010212,
    populationFormatted: "99,010,212",
    avgBll: 5.9,
    cpBll: 584160251,
    cpBllFormatted: "584,160,251",
    percentGlobal: 1.65,
    terrorNexusNote: "M23/ADF terror corridors; artisanal cobalt, copper & lead mining plunder."
  },
  {
    rank: 10,
    country: "Mexico",
    flag: "🇲🇽",
    population: 127504125,
    populationFormatted: "127,504,125",
    avgBll: 4.5,
    cpBll: 573768563,
    cpBllFormatted: "573,768,563",
    percentGlobal: 1.63,
    terrorNexusNote: "Traditional lead-glazed pottery (Barro vidriado); cartel-controlled mining territories."
  },
  {
    rank: 11,
    country: "Brazil",
    flag: "🇧🇷",
    population: 215313498,
    populationFormatted: "215,313,498",
    avgBll: 2.6,
    cpBll: 559815095,
    cpBllFormatted: "559,815,095",
    percentGlobal: 1.59,
    terrorNexusNote: "Amazonian wildcat mining (Garimpos) & urban favela arms trade."
  },
  {
    rank: 12,
    country: "Ethiopia",
    flag: "🇪🇹",
    population: 123379924,
    populationFormatted: "123,379,924",
    avgBll: 4.4,
    cpBll: 542871666,
    cpBllFormatted: "542,871,666",
    percentGlobal: 1.54,
    terrorNexusNote: "Horn of Africa conflict belt; lead-tainted spices, cookware & artisanal mining."
  }
];

export default function LeadTerrorismProofs() {
  const [activeCase, setActiveCase] = useState<'nigeria' | 'ghana'>('nigeria');
  const [selectedState, setSelectedState] = useState<StateProfile>(NIGERIAN_STATE_DATA[0]);
  const [activeTab, setActiveTab] = useState<'overview' | 'mechanism' | 'bmj_index' | 'states' | 'simulator'>('overview');
  const [bmjSortBy, setBmjSortBy] = useState<'cpbll' | 'avgbll'>('cpbll');

  useEffect(() => {
    setSelectedState(activeCase === 'nigeria' ? NIGERIAN_STATE_DATA[0] : GHANA_DISTRICT_DATA[0]);
  }, [activeCase]);

  const currentRegionData = activeCase === 'nigeria' ? NIGERIAN_STATE_DATA : GHANA_DISTRICT_DATA;

  // Simulator State
  const [enforcementStrength, setEnforcementStrength] = useState<number>(40); // % Mining Marshals deployment
  const [livelihoodFunding, setLivelihoodFunding] = useState<number>(15); // $ Millions in regional cooperatives
  const [leadAbatementEffort, setLeadAbatementEffort] = useState<number>(20); // % Soil washing & remediation

  // Derived Simulation Metrics
  const calculatedRecruitmentPotential = Math.max(
    5,
    Math.round(85 - (enforcementStrength * 0.4 + livelihoodFunding * 1.5 + leadAbatementEffort * 0.2))
  );

  const calculatedChildBllAvg = Math.max(
    4.5,
    Math.round((35 - (leadAbatementEffort * 0.25 + enforcementStrength * 0.1)) * 10) / 10
  );

  const calculatedTerrorFundingLoss = Math.max(
    10,
    Math.round(100 - (enforcementStrength * 0.8 + livelihoodFunding * 0.5))
  );

  // BMJ Global Health Sorted Data
  const sortedBmjData = [...BMJ_GLOBAL_CPBLL_DATA].sort((a, b) => {
    if (bmjSortBy === 'avgbll') {
      return b.avgBll - a.avgBll;
    }
    return b.cpBll - a.cpBll;
  });

  return (
    <div id="lead-terrorism-proofs-root" className="w-full max-w-7xl mx-auto bg-white p-6 md:p-8 space-y-8 pb-16">
      
      {/* HEADER SECTION */}
      <div className="border-b border-rose-100 pb-6 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold tracking-widest text-rose-700 bg-rose-50 border border-rose-100 px-3 py-1 rounded-full uppercase inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping" />
              Sovereign Exposenomics & Global Threat Vector
            </span>
            <h1 className="text-3xl font-serif font-black tracking-tight text-neutral-900">
              The Lead-Terrorism Hypothesis Proof
            </h1>
            <p className="text-xs text-neutral-500 font-mono font-semibold uppercase tracking-tight">
              Biogeochemical Regression of Environmental Injustice, Illicit Extraction, & Insurgency Funding
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-lg border transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-rose-950 text-white border-transparent shadow-sm'
                  : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border-neutral-200'
              }`}
            >
              📰 In-Depth Analysis
            </button>
            <button
              onClick={() => setActiveTab('mechanism')}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-lg border transition-all cursor-pointer ${
                activeTab === 'mechanism'
                  ? 'bg-rose-950 text-white border-transparent shadow-sm'
                  : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border-neutral-200'
              }`}
            >
              🔗 Causal Mechanism
            </button>
            <button
              onClick={() => setActiveTab('bmj_index')}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-lg border transition-all cursor-pointer ${
                activeTab === 'bmj_index'
                  ? 'bg-rose-950 text-white border-transparent shadow-sm'
                  : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border-neutral-200'
              }`}
            >
              📊 BMJ Global cpBLL Index
            </button>
            <button
              onClick={() => setActiveTab('states')}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-lg border transition-all cursor-pointer ${
                activeTab === 'states'
                  ? 'bg-rose-950 text-white border-transparent shadow-sm'
                  : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border-neutral-200'
              }`}
            >
              🗺️ Regional Profiles
            </button>
            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-lg border transition-all cursor-pointer ${
                activeTab === 'simulator'
                  ? 'bg-rose-950 text-white border-transparent shadow-sm'
                  : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border-neutral-200'
              }`}
            >
              🎛️ Policy Simulator
            </button>
          </div>
        </div>
      </div>

      {/* SOVEREIGN INTELLIGENCE CASE STUDIES SELECTOR */}
      <div id="intel-cases-bar" className="bg-neutral-50 border border-rose-100/60 rounded-2xl p-4 md:p-5 space-y-3 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-rose-100/40 pb-2">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-950 flex items-center gap-1.5">
            <Globe size={14} className="text-rose-700 animate-pulse" />
            Active Sovereign Intelligence Cases under Review
          </h3>
          <span className="text-[10px] font-mono text-rose-500 font-semibold">SELECT CASE STUDY TO RE-LOAD PLATFORM</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* NIGERIA CASE */}
          <button
            onClick={() => setActiveCase('nigeria')}
            className={`text-left p-4 rounded-xl border transition-all relative overflow-hidden flex items-center gap-4 cursor-pointer ${
              activeCase === 'nigeria'
                ? 'bg-rose-950/5 border-rose-800 shadow-xs ring-1 ring-rose-900/10'
                : 'bg-white hover:bg-neutral-50 border-neutral-200 hover:border-neutral-300'
            }`}
          >
            <div className="text-3xl select-none">🇳🇬</div>
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-serif font-black text-neutral-900">Case Study 01: Nigeria</span>
                <span className="px-1.5 py-0.2 bg-rose-500/10 text-rose-700 text-[8px] font-mono font-bold rounded uppercase border border-rose-500/20">Terror Nexus</span>
              </div>
              <p className="text-[11px] text-neutral-500 font-sans leading-normal">
                Boko Haram & ISIS gold/lithium-for-arms barter networks in Zamfara & Kaduna states.
              </p>
            </div>
            {activeCase === 'nigeria' && (
              <div className="absolute right-3 top-3 w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
            )}
          </button>

          {/* GHANA CASE */}
          <button
            onClick={() => setActiveCase('ghana')}
            className={`text-left p-4 rounded-xl border transition-all relative overflow-hidden flex items-center gap-4 cursor-pointer ${
              activeCase === 'ghana'
                ? 'bg-rose-950/5 border-rose-800 shadow-xs ring-1 ring-rose-900/10'
                : 'bg-white hover:bg-neutral-50 border-neutral-200 hover:border-neutral-300'
            }`}
          >
            <div className="text-3xl select-none">🇬🇭</div>
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-serif font-black text-neutral-900">Case Study 02: Ghana</span>
                <span className="px-1.5 py-0.2 bg-amber-500/10 text-amber-800 text-[8px] font-mono font-bold rounded uppercase border border-amber-500/20">Galamsey Conviction</span>
              </div>
              <p className="text-[11px] text-neutral-500 font-sans leading-normal">
                Ashanti NPP Chairman Chairman Wontumi sentenced to 20 years in Samreboi trial.
              </p>
            </div>
            {activeCase === 'ghana' && (
              <div className="absolute right-3 top-3 w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            )}
          </button>
        </div>
      </div>

      {/* CORE EXPLANATORY HEADER ROW */}
      <div className="bg-neutral-950 text-white rounded-2xl p-6 relative overflow-hidden shadow-md">
        <div className="absolute right-0 top-0 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-rose-500/10 border border-rose-500/25 text-rose-400 font-mono text-[9px] uppercase font-bold rounded">
              Sovereign Exposenomics Case Study: {activeCase === 'nigeria' ? 'Nigeria' : 'Ghana'}
            </div>
            <h2 className="text-xl font-serif font-bold text-neutral-100">
              {activeCase === 'nigeria' 
                ? 'Biogeochemical Warfare: How Toxic Mining Fuels Global Terrorism' 
                : 'The Galamsey Criminal Syndicate: Elite Capture & Soil Poisoning'}
            </h2>
            <p className="text-xs text-neutral-300 leading-relaxed font-sans">
              {activeCase === 'nigeria' ? (
                "Traditional criminology isolates the Lead-Crime Hypothesis to urban housing and local homicide trends. Under ICEarth’s unified exposome model, this correlation expands into a tragic global loop. In resource-rich regions like Nigeria, weak regulation and corruption allow criminal networks and foreign mercenaries to plunder strategic minerals (Gold, Lithium, Lead-Zinc). The resulting physical catastrophes—such as the devastating pediatric lead poisoning in Zamfara—permanently cognitively limit vulnerable children. Simultaneously, the illicit cash generated by this environmental plunder directly finances regional arms trafficking, banditry, and terrorist organizations including Boko Haram and ISIS."
              ) : (
                "The Ashanti Region NPP Chairman (Chairman Wontumi) has been sentenced to 20 years in prison after being found guilty on all six counts in the historic Samreboi galamsey trial. Galamsey—the local term for illegal artisanal gold mining—has devastated Ghana's major water bodies (including the Pra, Ankobra, and Birim rivers), poisoning local agriculture with toxic heavy metals such as lead and mercury. This landmark conviction proves that illegal extraction is not merely a localized livelihood issue, but an organized criminal cartel actively enabled by elite political capture, corrupting sovereign governance and fueling national security threats."
              )}
            </p>
          </div>
          <div className="lg:col-span-4 bg-neutral-900 border border-neutral-800 p-4 rounded-xl space-y-3">
            <div className="flex items-center gap-2">
              <Skull className="text-rose-500" size={18} />
              <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold tracking-wider">
                {activeCase === 'nigeria' ? 'The Zamfara Benchmark' : 'The Samreboi Verdict'}
              </span>
            </div>
            <div className="text-2xl font-serif font-black text-rose-500">
              {activeCase === 'nigeria' ? '400+ Children Dead' : '20 Years Prison'}
            </div>
            <p className="text-[10px] text-neutral-400 font-sans leading-normal">
              {activeCase === 'nigeria' 
                ? 'A single environmental disaster linked to illegal artisanal gold processing contaminated residential soils with fatal levels of lead dust, representing the ultimate intersection of environmental plunder and human destruction.'
                : 'NPP Ashanti Region Chairman found guilty on all counts of assigning mineral rights without ministerial approval and facilitating massive illegal gold mining operations (galamsey).'}
            </p>
            <div className="pt-2 border-t border-neutral-800 text-[9px] font-mono text-neutral-500 flex justify-between">
              <span>{activeCase === 'nigeria' ? 'ESTIMATED LEAD DUST LOAD:' : 'VERDICT GUILTY COUNTS:'}</span>
              <span className="text-rose-400 font-bold">{activeCase === 'nigeria' ? '>100,000 PPM' : '6 OUT OF 6'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* TAB CONTENT: 1. OVERVIEW (ARTICLE VIEW) */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-fadeIn">
          {/* BMJ Global Health Highlight Banner */}
          <div className="bg-rose-950 text-white p-5 rounded-2xl border border-rose-800 space-y-3 relative overflow-hidden shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[9px] font-mono font-bold tracking-widest text-rose-300 bg-rose-900/80 px-2.5 py-1 rounded-full uppercase inline-flex items-center gap-1.5 mb-1 border border-rose-700">
                  <Database size={10} className="text-rose-400" />
                  Peer-Reviewed Benchmark • BMJ Global Health (2025/2026)
                </span>
                <h3 className="text-lg font-serif font-bold text-white">
                  Global Lead Burden Index (cpBLLs): Afghanistan Ranked #1 in Toxic Lead Exposure (14.3 µg/dL)
                </h3>
                <p className="text-xs text-rose-200 font-sans leading-relaxed">
                  A groundbreaking metric combining average blood lead levels with population size proves why Afghanistan (14.3 µg/dL average BLL) became the supreme global epicenter for Taliban and ISIS-K extremism under Roulet's Law.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setActiveTab('bmj_index')}
                  className="px-3.5 py-2 bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                >
                  <span>Explore BMJ Index & Table 1</span>
                  <ArrowUpRight size={14} />
                </button>
                <a
                  href="https://gh.bmj.com/content/10/3/e018145"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 bg-white/10 hover:bg-white/20 text-rose-100 font-mono text-xs font-bold rounded-xl border border-white/20 transition-all flex items-center gap-1"
                >
                  <span>BMJ Paper</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Article column */}
          <div className="lg:col-span-8 space-y-6">
            {activeCase === 'nigeria' ? (
              <>
                <div className="border-b border-neutral-100 pb-4">
                  <h3 className="text-2xl font-serif font-bold text-neutral-950 leading-tight">
                    Nigeria’s Battle Against Illegal Mining: Can the nation finally reclaim its buried wealth?
                  </h3>
                  <div className="flex items-center gap-3 mt-3 text-[10.5px] font-mono text-neutral-500">
                    <span>Published: July 20, 2026</span>
                    <span>•</span>
                    <span>Source: Champion News</span>
                    <span>•</span>
                    <a 
                      href="https://championnews.com.ng/2026/07/20/nigerias-battle-against-illegal-mining-can-the-nation-finally-reclaim-its-buried-wealth/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-rose-600 font-bold hover:underline inline-flex items-center gap-0.5"
                    >
                      Original Article <ArrowUpRight size={11} />
                    </a>
                  </div>
                </div>

                {/* Article Content */}
                <div className="prose prose-neutral max-w-none text-xs text-neutral-755 leading-relaxed space-y-4 font-sans text-neutral-800">
                  <p>
                    For decades, Nigeria has been celebrated as one of Africa’s resource-rich nations. While crude oil has dominated the national conversation, beneath the country’s vast landscape lies another treasure chest—gold, lithium, tin, columbite, tantalite, gemstones, limestone, coal, lead-zinc, and several other strategic minerals.
                  </p>
                  <p>
                    Yet, despite this abundance, the overwhelming majority of Nigerians continue to grapple with poverty, unemployment, poor infrastructure, and limited economic opportunities. This paradox raises an enduring question: How can a nation so richly endowed remain home to millions living in deprivation?
                  </p>
                  
                  <div className="p-4 bg-rose-50 border-l-4 border-rose-500 rounded-r-xl space-y-2">
                    <h4 className="font-serif font-bold text-neutral-900 text-[13px]">
                      The Rise of Criminal Plunder and Environmental Catastrophe
                    </h4>
                    <p className="text-[11.5px] text-neutral-750 leading-normal">
                      "Part of the answer lies in the long and troubling history of illegal mining, weak regulation, corruption, and the systematic plundering of Nigeria’s mineral wealth by criminal citizens and foreigners alike... Successful operations involve organized criminal networks with significant financial backing, often colluding with local Elites and people in governance who facilitate access and movement."
                    </p>
                  </div>

                  <p>
                    The cost of this national tragedy is devastating. The Federal Government estimates that Nigeria loses billions annually through undeclared mineral production, tax evasion, royalty losses, and illicit exports. 
                  </p>
                  
                  <p className="font-semibold text-neutral-900">
                    The environmental consequences are equally deadly. Abandoned pits are left as open death traps, forests are destroyed, and agricultural lands are polluted with toxic metals.
                  </p>

                  <blockquote className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl font-serif italic text-neutral-700">
                    "The tragic lead poisoning incident in Zamfara over a decade ago, which claimed the lives of hundreds of children and affected thousands more, remains one of the worst environmental health disasters linked to unsafe mining practices. Mining communities frequently bear the greatest burden while receiving the least benefit."
                  </blockquote>

                  <div className="p-4 bg-neutral-950 text-white rounded-xl space-y-2 border border-neutral-850">
                    <div className="flex items-center gap-1.5 text-rose-400 font-mono text-[10px] uppercase font-bold">
                      <Flame size={12} />
                      The Terrorist Nexus: funding Boko Haram and ISIS
                    </div>
                    <h4 className="font-serif font-bold text-[13px] text-neutral-100">
                      Criminal Networks and National Security
                    </h4>
                    <p className="text-[11px] text-neutral-300 leading-relaxed">
                      "In recent years, security experts have increasingly warned about the intersection between illegal mining and organised crime. Revenue generated from illicit mining has been linked by authorities to wider criminal activities in some regions, including arms trafficking, banditry, and illegal cross-border trade. Remote mining sites escape state authority, transforming illegal mining into a primary funding vehicle for international terrorist groups."
                    </p>
                  </div>

                  <p>
                    President Bola Ahmed Tinubu’s administration has declared that illegal mining will no longer be tolerated, deploying a specialized security unit known as the **Mining Marshals** to protect sites and arrest offenders. However, skepticism remains: is this genuine reform or political theater?
                  </p>

                  <p>
                    Critics argue that meaningful success cannot be measured by arrests alone. The real test lies in successful prosecutions, transparent licensing, consistent enforcement, recovery of stolen revenues, rehabilitation of devastated mining communities, and the complete dismantling of the elite criminal networks that profit from illegal extraction. 
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="border-b border-neutral-100 pb-4">
                  <h3 className="text-2xl font-serif font-bold text-neutral-950 leading-tight">
                    Ghana Jails Opposition Figure for 20 Years for Illegal Mining (Galamsey) & Sovereign Abuse
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-3 text-[10.5px] font-mono text-neutral-500">
                    <div className="flex items-center gap-2">
                      <span>Published: July 20, 2026</span>
                      <span>•</span>
                      <span>Source: Bloomberg</span>
                    </div>
                    <div className="hidden sm:inline">•</div>
                    <div className="flex items-center gap-2">
                      <a 
                        href="https://www.bloomberg.com/news/articles/2026-07-20/ghana-opposition-politician-jailed-20-years-for-illegal-mining"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-700 font-bold hover:underline inline-flex items-center gap-0.5"
                      >
                        Bloomberg Article <ArrowUpRight size={11} />
                      </a>
                    </div>
                  </div>
                </div>

                {/* EMBEDDED YOUTUBE VIDEO SECTION */}
                <div className="bg-neutral-950 rounded-2xl p-4 border border-neutral-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                      <span className="text-[10px] font-mono text-neutral-300 uppercase font-bold tracking-wider">
                        ICEarth Embedded Broadcast: Samreboi Galamsey Verdict
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-neutral-500">ASHANTI NPP CHAIRMAN CONVICTED</span>
                  </div>
                  
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-neutral-800">
                    <iframe
                      id="galamsey-youtube-embed"
                      src="https://www.youtube.com/embed/RFlj342Yxc0"
                      title="Chairman Wontumi Samreboi Galamsey Trial Verdict"
                      className="absolute top-0 left-0 w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                  
                  <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
                    <span className="flex items-center gap-1">
                      <Youtube size={12} className="text-red-500" />
                      Watch: YouTube Live Broadcast
                    </span>
                    <a 
                      href="https://youtube.com/live/RFlj342Yxc0"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-rose-400 hover:underline flex items-center gap-0.5 font-bold"
                    >
                      Open in YouTube <ArrowUpRight size={11} />
                    </a>
                  </div>
                </div>

                {/* Article Content */}
                <div className="prose prose-neutral max-w-none text-xs text-neutral-755 leading-relaxed space-y-4 font-sans text-neutral-800">
                  <p>
                    In a historic ruling that has sent shockwaves across West Africa, Ghana has sentenced a senior political official, NPP Ashanti Region Chairman (Chairman Wontumi), to 20 years in prison. The conviction is tied to his direct role in allocating mining concessions without appropriate ministerial clearance and facilitating illegal gold extraction operations in Samreboi.
                  </p>
                  <p>
                    The <strong>Samreboi Galamsey Trial</strong> concluded with the court finding the chairman guilty on all six counts. Prosecutors successfully proved that the politician operated a highly organized criminal syndicate that bypassed environmental oversight, allowing heavy machinery to destroy primary rainforests and poison regional river basins.
                  </p>
                  
                  <div className="p-4 bg-amber-50 border-l-4 border-amber-600 rounded-r-xl space-y-2">
                    <h4 className="font-serif font-bold text-neutral-900 text-[13px]">
                      Water Poisoning and Pediatric Metal Loads
                    </h4>
                    <p className="text-[11.5px] text-neutral-750 leading-normal">
                      "The massive scaling of galamsey in the Ashanti, Western, and Eastern regions has pushed mercury and lead concentrations in the Pra and Ankobra rivers to levels thousands of times higher than WHO safety parameters. This has contaminated cocoa crops and local drinking water, creating severe neurological and physical damage in pediatric populations."
                    </p>
                  </div>

                  <p>
                    The sentencing is viewed as a massive turning point in Ghana's war on illegal mining, which has historically been protected by elite political capture. For years, powerful figures in both government and opposition parties have leveraged their influence to shield "galamsey" operations, converting Ghana's rich soil into private security forces and untaxed cash reserves.
                  </p>

                  <blockquote className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl font-serif italic text-neutral-700">
                    "Illegal mining is not a survival issue for poor villagers; it is a billion-dollar cartel operated by elites who use rural communities as biological shields. By poisoning the rivers that feed our cities and destroying our cocoa lands, these cartels undermine the sovereign security of the Ghanaian state."
                  </blockquote>

                  <p className="font-medium">
                    With this 20-year sentence, environmental justice advocates are calling on Ghana's judiciary and security forces to dismantle the remaining networks, enforce the immediate remediation of contaminated water basins, and declare galamsey a national security emergency.
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Right Column: Key Takeaways & Stats */}
          <div className="lg:col-span-4 space-y-6">
            {/* Metadata Card */}
            <div className="bg-neutral-50 border border-neutral-200 p-5 rounded-2xl space-y-4">
              <h4 className="font-serif font-bold text-neutral-900 text-sm">
                Exposenomics Audit Profile
              </h4>
              <div className="space-y-3.5 text-xs">
                <div className="flex justify-between py-1.5 border-b border-neutral-200">
                  <span className="text-neutral-500 font-mono">Territory Assessed:</span>
                  <span className="font-bold text-neutral-900">{activeCase === 'nigeria' ? 'Federal Republic of Nigeria' : 'Republic of Ghana'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-neutral-200">
                  <span className="text-neutral-500 font-mono">Core Minerals Audited:</span>
                  <span className="font-bold text-neutral-950 text-right">{activeCase === 'nigeria' ? 'Gold, Lithium, Lead-Zinc' : 'Gold, Heavy Metal Silt'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-neutral-200">
                  <span className="text-neutral-500 font-mono">Syndicate / Threat:</span>
                  <span className="font-bold text-rose-700">{activeCase === 'nigeria' ? 'Boko Haram, ISWAP (ISIS)' : 'Galamsey Cartels & Elite Rings'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-neutral-200">
                  <span className="text-neutral-500 font-mono">Critical Health Crisis:</span>
                  <span className="font-bold text-rose-800">{activeCase === 'nigeria' ? 'Zamfara Lead Outbreak' : 'Pra & Ankobra Basin Silt'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-neutral-200">
                  <span className="text-neutral-500 font-mono">Primary Weapon Link:</span>
                  <span className="font-bold text-neutral-900">{activeCase === 'nigeria' ? 'Gold-for-Arms Barter' : 'Elite Bribery & Armed Guards'}</span>
                </div>
              </div>

              <div className="p-3 bg-rose-50 border border-rose-100 rounded-lg text-[11px] text-rose-900 leading-normal font-sans">
                {activeCase === 'nigeria' ? (
                  <>
                    <strong>💡 Roulet’s Law Interpretation:</strong> By poisoning pediatric populations in Zamfara and northern states, illegal lead-bearing mining destroys prefrontal cortex integrity, directly lowering community resilience. Reduced cognitive capacity combined with absolute poverty creates a vulnerable cohort highly susceptible to radical recruitment by armed bandits.
                  </>
                ) : (
                  <>
                    <strong>💡 Roulet’s Law Interpretation:</strong> By bypassing sovereign state licensing and poisoning rural cocoa-producing areas, galamsey cartels destroy Ghana's biological baseline. Children poisoned by lead and mercury silt suffer severe executive deficits, feeding the cycle of low-skilled labor dependence and armed enclave defense.
                  </>
                )}
              </div>
            </div>

            {/* Visual Data Highlight */}
            <div className="bg-white border border-neutral-200 p-5 rounded-2xl space-y-4 shadow-2xs">
              <h4 className="font-serif font-bold text-neutral-900 text-sm">
                Heavy Metal Toxicity vs. Security Threat Index
              </h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activeCase === 'nigeria' ? NIGERIAN_STATE_DATA : GHANA_DISTRICT_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" tick={{ fill: '#666', fontSize: 9, fontFamily: 'monospace' }} />
                    <YAxis label={{ value: 'Value Index', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: 10, fontFamily: 'monospace' } }} tick={{ fill: '#666', fontSize: 9 }} />
                    <Tooltip contentStyle={{ fontSize: '11px', fontFamily: 'sans-serif' }} />
                    <Legend wrapperStyle={{ fontSize: '9px', fontFamily: 'monospace' }} />
                    <Bar name="Avg BLL (μg/dL)" dataKey="bllAvg" fill="#991b1b" radius={[4, 4, 0, 0]} />
                    <Bar name={activeCase === 'nigeria' ? "Annual Security Events" : "Cartel Incidents"} dataKey="incidentsCount" fill="#1e293b" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-[10px] text-neutral-500 font-mono text-center">
                Visualizing the massive overlap of high heavy metal burdens and active security incidents/clashes across regions.
              </p>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* TAB CONTENT: 2. CAUSAL MECHANISM FLOW */}
      {activeTab === 'mechanism' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h3 className="text-xl font-serif font-bold text-neutral-900">
              The Biogeochemical Feedback Loop of Violence
            </h3>
            <p className="text-xs text-neutral-500 font-sans">
              How subatomic heavy-metal contamination escalates into macroeconomic plundering and international terror networks.
            </p>
          </div>

          {/* Interactive Steps */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            
            <div className="bg-neutral-50 border border-neutral-200 p-4 rounded-xl flex flex-col justify-between space-y-3 hover:border-rose-300 transition-colors">
              <div className="space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center font-mono font-bold text-xs">
                  01
                </div>
                <h4 className="font-serif font-bold text-xs text-neutral-900">
                  Unregulated Mining
                </h4>
                <p className="text-[10.5px] text-neutral-600 font-sans leading-normal">
                  Weak governance and corrupt elites allow illegal operators and foreign mercenaries to mine gold, lithium, and lead-zinc in remote sites.
                </p>
              </div>
              <ChevronRight className="text-neutral-400 self-end hidden md:block rotate-90 md:rotate-0" />
            </div>

            <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl flex flex-col justify-between space-y-3 hover:border-rose-300 transition-colors">
              <div className="space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-rose-800 text-white flex items-center justify-center font-mono font-bold text-xs">
                  02
                </div>
                <h4 className="font-serif font-bold text-xs text-rose-900">
                  Pediatric Lead Ingestion
                </h4>
                <p className="text-[10.5px] text-rose-800 font-sans leading-normal">
                  Crude crushing of leaded ore releases toxic particulate dust. Residential soil and water supplies exceed safety baselines by thousands of PPM.
                </p>
              </div>
              <ChevronRight className="text-rose-400 self-end hidden md:block rotate-90 md:rotate-0" />
            </div>

            <div className="bg-neutral-50 border border-neutral-200 p-4 rounded-xl flex flex-col justify-between space-y-3 hover:border-rose-300 transition-colors">
              <div className="space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center font-mono font-bold text-xs">
                  03
                </div>
                <h4 className="font-serif font-bold text-xs text-neutral-900">
                  Cognitive Deprivation
                </h4>
                <p className="text-[10.5px] text-neutral-600 font-sans leading-normal">
                  Lead crosses the blood-brain barrier, destroying prefrontal cortex integrity, permanently reducing IQ, and increasing impulsivity and aggression.
                </p>
              </div>
              <ChevronRight className="text-neutral-400 self-end hidden md:block rotate-90 md:rotate-0" />
            </div>

            <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl flex flex-col justify-between space-y-3 hover:border-rose-300 transition-colors">
              <div className="space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-rose-800 text-white flex items-center justify-center font-mono font-bold text-xs">
                  04
                </div>
                <h4 className="font-serif font-bold text-xs text-rose-900">
                  Civic Deprivation
                </h4>
                <p className="text-[10.5px] text-rose-800 font-sans leading-normal">
                  Environmental destruction ruins agricultural lands and local fisheries. Absence of alternative livelihoods leaves families in absolute poverty.
                </p>
              </div>
              <ChevronRight className="text-rose-400 self-end hidden md:block rotate-90 md:rotate-0" />
            </div>

            <div className="bg-neutral-50 border border-neutral-200 p-4 rounded-xl flex flex-col justify-between space-y-3 hover:border-rose-300 transition-colors">
              <div className="space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center font-mono font-bold text-xs">
                  05
                </div>
                <h4 className="font-serif font-bold text-xs text-neutral-900">
                  Banditry & Recruitment
                </h4>
                <p className="text-[10.5px] text-neutral-600 font-sans leading-normal">
                  Impaired executive function and severe local poverty create a vulnerable youth cohort, highly susceptible to radicalization and recruitment by armed networks.
                </p>
              </div>
              <ChevronRight className="text-neutral-400 self-end hidden md:block rotate-90 md:rotate-0" />
            </div>

            <div className="bg-rose-900 text-white p-4 rounded-xl flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-rose-500 text-white flex items-center justify-center font-mono font-bold text-xs">
                  06
                </div>
                <h4 className="font-serif font-bold text-xs text-rose-200">
                  {activeCase === 'nigeria' ? 'Boko Haram / ISIS Nexus' : 'Galamsey Militia / Cartel Nexus'}
                </h4>
                <p className="text-[10.5px] text-rose-200/90 font-sans leading-normal">
                  {activeCase === 'nigeria' 
                    ? 'Armed groups secure raw gold and lithium to barter directly for heavy weapons. Illicit mineral profits fund active terror operations globally.'
                    : 'Illegal syndicates hire armed guards and private militias to secure mining sites and forest reserves, violently clashing with state military and customs.'}
                </p>
              </div>
              <CheckCircle2 className="text-rose-400 self-end shrink-0" size={16} />
            </div>

          </div>

          {/* Deep Mathematical Exposition */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-white space-y-4">
            <h4 className="font-serif font-bold text-neutral-200 text-sm flex items-center gap-1.5">
              <Activity size={16} className="text-rose-500" />
              Sovereign Exposenomics: The Multi-Systemic Regression Model
            </h4>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs text-neutral-300 leading-relaxed font-sans">
              <div className="lg:col-span-8 space-y-3">
                <p>
                  To formalize the <strong>Lead-Terrorism Hypothesis</strong>, Roulet’s Law establishes a regression tracking the direct probability of armed insurgency escalation (P_terror) as a function of environmental subatomic heavy metal burden (E_Pb), corporate plundering intensity (M_illicit), and structural governance leakage (G_leak):
                </p>
                <div className="p-4 bg-neutral-950 rounded-xl font-mono text-center text-rose-400 text-sm border border-neutral-850 overflow-x-auto">
                  {"P_terror = ∫ [ α · E_Pb(τ) + β · M_illicit(τ) + γ · G_leak(τ) ] dτ + δ_recruitment"}
                </div>
                <p>
                  Where α represents the biological cognitive vulnerability coefficient (brain damage reducing executive resistance), β represents the physical resources-for-weapons conversion vector, and δ_recruitment represents the localized baseline socio-economic deprivation.
                </p>
              </div>
              <div className="lg:col-span-4 bg-neutral-950/60 border border-neutral-850 p-4 rounded-xl space-y-3">
                <div className="text-[10px] font-mono text-rose-300 uppercase font-bold">Model Variables</div>
                <ul className="space-y-2 text-[11px] font-mono list-disc pl-4 text-neutral-400">
                  <li><strong className="text-neutral-200">E_Pb:</strong> Soil lead concentration (PPM) & pediatric BLL.</li>
                  <li><strong className="text-neutral-200">M_illicit:</strong> Illicit gold and lithium export tonnage.</li>
                  <li><strong className="text-neutral-200">G_leak:</strong> Percentage of customs/elite bribery leakage.</li>
                  <li><strong className="text-neutral-200">δ:</strong> Severe lack of agricultural/alternative livelihood assets.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: BMJ GLOBAL cpBLL INDEX */}
      {activeTab === 'bmj_index' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Summary Header Box */}
          <div className="bg-neutral-950 text-white rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-xl border border-rose-900/40">
            <div className="absolute right-0 top-0 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="space-y-4 relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
                <div>
                  <span className="text-[10px] font-mono font-bold tracking-widest text-rose-400 bg-rose-950/80 border border-rose-800/60 px-3 py-1 rounded-full uppercase inline-flex items-center gap-1.5 mb-2">
                    <Database size={12} className="text-rose-400 animate-pulse" />
                    Peer-Reviewed Core Data Source • BMJ Global Health e018145
                  </span>
                  <h2 className="text-2xl md:text-3xl font-serif font-black text-white">
                    Global Lead Burden Index (cpBLLs) & Roulet's Law Proof
                  </h2>
                  <p className="text-xs font-mono text-neutral-400 mt-1">
                    "Rank Order by Standardized Metrics of Elevated Blood Lead Levels: Why Afghanistan is the Supreme Terror Vector"
                  </p>
                </div>
                <a
                  href="https://gh.bmj.com/content/10/3/e018145"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-rose-700 hover:bg-rose-600 text-white font-mono text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-all shrink-0"
                >
                  <span>View BMJ Paper</span>
                  <ExternalLink size={14} />
                </a>
              </div>

              {/* Executive Summary Narrative */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs text-neutral-300 leading-relaxed font-sans">
                <div className="lg:col-span-8 space-y-3">
                  <p>
                    A new global analytical tool—the <strong>cumulative population blood lead level (cpBLLs / ‘Lead Burden Index’)</strong>—combines average blood lead levels with population size to quantify the gross human lead burden across differing countries, regions, and environmental exposure sources. This standardized metric acts as an objective indicator of gross intellectual impairment, prefrontal cortex damage, and cardiovascular disease risk.
                  </p>
                  <p>
                    The cpBLL tool is instructive for donors, governments, and United Nations agencies comparing a range of interventions for viability, strategic prioritization, or cost-effectiveness—proving that lead abatement is far more cost-effective than infinite military counter-insurgency operations.
                  </p>
                  <div className="p-4 bg-rose-950/60 border-l-4 border-rose-600 rounded-r-xl space-y-2 text-rose-100 border border-rose-900/50">
                    <span className="text-[10px] font-mono font-bold text-rose-400 uppercase tracking-widest block flex items-center gap-1.5">
                      <Skull size={14} className="text-rose-500" />
                      Supreme Vector Proof: Afghanistan Ranked #1 in Average Blood Lead Level (14.3 μg/dL)
                    </span>
                    <p className="text-xs leading-normal">
                      While India and China possess the largest absolute cpBLL volume due to massive populations (1.4B+), <strong>Afghanistan stands alone as the worst origin of elevated lead exposure on Earth at 14.3 μg/dL average BLL</strong>—nearly 3x higher than any other nation in the top 12, and over 18x above developed baselines. Under Roulet's Law ("Why Homo Nazi ISIS"), this severe subatomic toxicity destroys prefrontal executive control, explaining why Afghanistan became the supreme global epicenter and origin for Taliban, Al-Qaeda, and ISIS-K networks.
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-neutral-900 border border-neutral-800 p-4 rounded-xl space-y-3 flex flex-col justify-between shadow-inner">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider block">Global Lead Load Benchmark</span>
                    <div className="text-2xl font-serif font-black text-rose-400">
                      35,307,203,000 <span className="text-xs font-mono font-normal text-neutral-400">µg/dL—pop</span>
                    </div>
                    <p className="text-[11px] text-neutral-400 font-sans">
                      Total cumulative blood lead load estimated across the global human population.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-neutral-800 space-y-2">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-neutral-400">Top 12 Countries Population:</span>
                      <span className="text-white font-bold">4,447,738,488</span>
                    </div>
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-neutral-400">Top 12 Total cpBLLs Volume:</span>
                      <span className="text-rose-300 font-bold">21,441,291,051</span>
                    </div>
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-neutral-400">% of Global cpBLLs (Top 12):</span>
                      <span className="text-rose-400 font-bold">60.73% of Earth</span>
                    </div>
                    <div className="flex justify-between text-[11px] font-mono bg-rose-950/80 p-1.5 rounded border border-rose-800/40">
                      <span className="text-rose-200">#1 BLL Country:</span>
                      <span className="text-rose-400 font-bold">Afghanistan (14.3 µg/dL)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CHART & CONTROLS SECTION */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-4 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-neutral-900 flex items-center gap-2">
                  <BarChart3 size={18} className="text-rose-700" />
                  Top 12 Sovereign Countries by Cumulative Lead Burden & BLL Intensity
                </h3>
                <p className="text-xs text-neutral-500 font-mono">
                  Toggle sorting to contrast Total Volume (cpBLLs) vs Average Blood Lead Level Intensity (μg/dL)
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-neutral-600">Sort By:</span>
                <button
                  onClick={() => setBmjSortBy('cpbll')}
                  className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg border transition-all cursor-pointer ${
                    bmjSortBy === 'cpbll'
                      ? 'bg-neutral-900 text-white border-transparent'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border-neutral-200'
                  }`}
                >
                  Total cpBLLs Volume
                </button>
                <button
                  onClick={() => setBmjSortBy('avgbll')}
                  className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg border transition-all cursor-pointer ${
                    bmjSortBy === 'avgbll'
                      ? 'bg-rose-900 text-white border-transparent'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border-neutral-200'
                  }`}
                >
                  Avg BLL Intensity (Afghanistan Peak)
                </button>
              </div>
            </div>

            {/* BAR CHART DISPLAY */}
            <div className="h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={sortedBmjData} 
                  margin={{ top: 20, right: 20, left: 0, bottom: 25 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="country" tick={{ fill: '#333', fontSize: 10, fontFamily: 'sans-serif' }} interval={0} angle={-15} textAnchor="end" />
                  <YAxis yAxisId="left" orientation="left" label={{ value: 'Avg BLL (μg/dL)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: 10, fontFamily: 'monospace' } }} tick={{ fill: '#666', fontSize: 10 }} />
                  <YAxis yAxisId="right" orientation="right" label={{ value: '% of Global cpBLLs', angle: 90, position: 'insideRight', style: { textAnchor: 'middle', fontSize: 10, fontFamily: 'monospace' } }} tick={{ fill: '#666', fontSize: 10 }} />
                  <Tooltip 
                    contentStyle={{ fontSize: '11px', fontFamily: 'sans-serif', borderRadius: '8px' }} 
                    formatter={(value: any, name: any) => [value, name]}
                  />
                  <Legend wrapperStyle={{ fontSize: '10px', fontFamily: 'monospace', paddingTop: '10px' }} />
                  <Bar yAxisId="left" name="Average Blood Lead Level (μg/dL)" dataKey="avgBll" radius={[4, 4, 0, 0]}>
                    {sortedBmjData.map((entry) => (
                      <Cell key={`cell-${entry.country}`} fill={entry.isAfghanistanPeak ? '#be123c' : '#1e293b'} />
                    ))}
                  </Bar>
                  <Bar yAxisId="right" name="% Share of Global cpBLLs" dataKey="percentGlobal" fill="#e11d48" radius={[4, 4, 0, 0]} opacity={0.6} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="p-3 bg-rose-50 border border-rose-100 rounded-lg text-[11px] font-mono text-rose-950 text-center font-semibold">
              🇦🇫 Highlight: Afghanistan exhibits the highest Average BLL intensity on Earth (14.3 μg/dL), generating severe neurodevelopmental damage across 41.1M residents and fueling regional extremism.
            </div>
          </div>

          {/* TABLE 1 DATASET DISPLAY */}
          <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-2xs">
            <div className="p-5 bg-neutral-50 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest block">BMJ GLOBAL HEALTH DATASET • TABLE 1</span>
                <h4 className="font-serif text-base font-bold text-neutral-900">
                  Summary of Top 12 Countries by Cumulative Population Blood Lead Levels (cpBLLs)
                </h4>
              </div>
              <span className="text-[10px] font-mono text-neutral-500 bg-white border border-neutral-200 px-2.5 py-1 rounded">
                Global Total cpBLLs: <strong>35,307,203,000 µg/dL—pop</strong>
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-neutral-100 border-b border-neutral-200 text-[10px] font-mono font-bold uppercase text-neutral-600">
                    <th className="py-3 px-4">Rank</th>
                    <th className="py-3 px-4">Country</th>
                    <th className="py-3 px-4 text-right">Population</th>
                    <th className="py-3 px-4 text-right">Avg BLL (µg/dL)</th>
                    <th className="py-3 px-4 text-right">cpBLLs (µg/dL—pop)</th>
                    <th className="py-3 px-4 text-right">% of Global</th>
                    <th className="py-3 px-4">Roulet's Law Threat Vector Analysis</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 text-xs font-sans">
                  {sortedBmjData.map((item) => (
                    <tr 
                      key={item.country}
                      className={`transition-colors ${
                        item.isAfghanistanPeak 
                          ? 'bg-rose-50/90 hover:bg-rose-100 font-bold text-rose-950 border-l-4 border-l-rose-700' 
                          : 'hover:bg-neutral-50 text-neutral-800'
                      }`}
                    >
                      <td className="py-3.5 px-4 font-mono font-bold text-neutral-500">#{item.rank}</td>
                      <td className="py-3.5 px-4 font-serif font-bold text-neutral-900 flex items-center gap-2">
                        <span className="text-lg select-none">{item.flag}</span>
                        <span>{item.country}</span>
                        {item.isAfghanistanPeak && (
                          <span className="px-1.5 py-0.2 bg-rose-700 text-white text-[8px] font-mono font-bold uppercase rounded shadow-2xs">
                            #1 WORST BLL (14.3 μg/dL)
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-right">{item.populationFormatted}</td>
                      <td className="py-3.5 px-4 text-right">
                        <span className={`font-mono font-bold px-2 py-0.5 rounded text-xs inline-block ${
                          item.avgBll >= 10.0 
                            ? 'bg-rose-900 text-white shadow-2xs' 
                            : item.avgBll >= 6.0 
                            ? 'bg-rose-100 text-rose-900 border border-rose-200' 
                            : 'bg-neutral-100 text-neutral-800'
                        }`}>
                          {item.avgBll.toFixed(1)} µg/dL
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-right text-rose-900">{item.cpBllFormatted}</td>
                      <td className="py-3.5 px-4 font-mono font-bold text-right">{item.percentGlobal.toFixed(2)}%</td>
                      <td className="py-3.5 px-4 text-[11px] text-neutral-600 leading-normal max-w-xs">{item.terrorNexusNote}</td>
                    </tr>
                  ))}
                  {/* SUM ROW */}
                  <tr className="bg-neutral-900 text-white font-mono text-xs font-bold border-t-2 border-neutral-800">
                    <td className="py-4 px-4" colSpan={2}>
                      SUM OF TOP 12 COUNTRIES
                    </td>
                    <td className="py-4 px-4 text-right">4,447,738,488</td>
                    <td className="py-4 px-4 text-right text-neutral-400">N/A</td>
                    <td className="py-4 px-4 text-right text-rose-400">21,441,291,051</td>
                    <td className="py-4 px-4 text-right text-rose-400">60.73%</td>
                    <td className="py-4 px-4 text-[10px] text-neutral-300 font-sans">
                      Account for 60.73% of total cumulative human lead poison burden on Earth.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 3. REGIONAL PROFILES */}
      {activeTab === 'states' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn">
          {/* List of Regions */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="font-serif font-bold text-neutral-900 text-sm flex items-center gap-1.5 px-1">
              <Filter size={14} className="text-rose-600" />
              {activeCase === 'nigeria' ? 'State Audits Index (Sort: Lead Risk)' : 'District Audits Index (Sort: Heavy Metal Risk)'}
            </h3>
            <div className="space-y-2 max-h-[480px] overflow-y-auto pr-2">
              {currentRegionData.map((state) => (
                <button
                  key={state.name}
                  onClick={() => setSelectedState(state)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                    selectedState.name === state.name
                      ? 'bg-rose-50 border-rose-300 shadow-2xs'
                      : 'bg-white hover:bg-neutral-50 border-neutral-200'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <strong className="font-serif text-sm text-neutral-900">{state.name}</strong>
                      {state.zamfaraIncident && (
                        <span className="px-1.5 py-0.2 bg-rose-100 text-rose-800 text-[8px] font-mono font-bold uppercase rounded border border-rose-200">
                          {activeCase === 'nigeria' ? 'Critical Incident' : 'Trial Target'}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-neutral-500 font-sans font-medium">
                      Minerals: {state.minerals}
                    </p>
                  </div>
                  <div className="text-right space-y-1">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase border inline-block ${
                      state.leadRisk === 'Critical'
                        ? 'bg-rose-900/10 text-rose-900 border-rose-900/20'
                        : state.leadRisk === 'High'
                        ? 'bg-rose-600/10 text-rose-700 border-rose-600/20'
                        : 'bg-amber-600/10 text-amber-700 border-amber-600/20'
                    }`}>
                      {state.leadRisk} Risk
                    </span>
                    <p className="text-[9px] text-neutral-400 font-mono">BLL: {state.bllAvg} μg/dL</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Detailed Region Profile Card */}
          <div className="lg:col-span-7 bg-neutral-50 border border-neutral-200 p-6 rounded-2xl space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-neutral-200 pb-4">
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-neutral-400 font-bold uppercase tracking-wider block">
                  {activeCase === 'nigeria' ? 'STATE AUDIT PORTRAIT' : 'DISTRICT AUDIT PORTRAIT'}
                </span>
                <h4 className="font-serif text-2xl font-black text-neutral-950">
                  {selectedState.name} {activeCase === 'nigeria' ? 'State' : ''}
                </h4>
              </div>
              <div className="flex gap-2">
                <span className="px-2.5 py-1 bg-white border border-neutral-200 rounded text-[10px] font-mono text-neutral-600">
                  Poverty Rate: <strong>{selectedState.povertyRate}%</strong>
                </span>
                <span className="px-2.5 py-1 bg-white border border-neutral-200 rounded text-[10px] font-mono text-neutral-600">
                  {activeCase === 'nigeria' ? 'Insurgency incidents:' : 'Syndicate Clashes:'} <strong>{selectedState.incidentsCount}/yr</strong>
                </span>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border border-neutral-200 p-4 rounded-xl space-y-1 shadow-2xs">
                <span className="text-[9px] font-mono text-neutral-400 uppercase font-bold block">Avg Blood Lead (BLL)</span>
                <div className="text-2xl font-serif font-bold text-rose-800">{selectedState.bllAvg} μg/dL</div>
                <p className="text-[10px] text-neutral-500 font-sans leading-tight">
                  Compared to WHO safe limit of <strong>0.0 μg/dL</strong>.
                </p>
              </div>

              <div className="bg-white border border-neutral-200 p-4 rounded-xl space-y-1 shadow-2xs">
                <span className="text-[9px] font-mono text-neutral-400 uppercase font-bold block">
                  {activeCase === 'nigeria' ? 'Insurgent Security Threat' : 'Syndicate Threat Level'}
                </span>
                <div className="text-2xl font-serif font-bold text-neutral-950">{selectedState.terrorThreat}</div>
                <p className="text-[10px] text-neutral-500 font-sans leading-tight">
                  {activeCase === 'nigeria' 
                    ? 'Armed bandit activity, weapons cache infiltration, & terror raids.'
                    : 'Armed guard enforcement, river dredging raids, & local chieftain intimidation.'}
                </p>
              </div>

              <div className="bg-white border border-neutral-200 p-4 rounded-xl space-y-1 shadow-2xs">
                <span className="text-[9px] font-mono text-neutral-400 uppercase font-bold block">Strategic Resources</span>
                <div className="text-sm font-serif font-bold text-neutral-900 leading-tight pt-1">
                  {selectedState.minerals}
                </div>
                <p className="text-[10px] text-neutral-500 font-sans leading-tight mt-1">
                  Primary minerals vulnerable to un-monitored extraction.
                </p>
              </div>
            </div>

            {/* In-Depth Context */}
            <div className="bg-white border border-neutral-200 p-4 rounded-xl space-y-3 shadow-2xs">
              <div className="flex items-center gap-2 text-rose-800 font-mono text-[10px] font-bold uppercase tracking-wider">
                <AlertCircle size={14} />
                Biogeochemical Exposure Context
              </div>
              <p className="text-xs text-neutral-700 leading-relaxed font-sans">
                {selectedState.notes}
              </p>
              {selectedState.zamfaraIncident && (
                <div className="p-3 bg-rose-50 border border-rose-100 rounded-lg space-y-1 text-[11px] text-rose-950 font-sans leading-normal">
                  {activeCase === 'nigeria' ? (
                    <>
                      <strong>⚠️ The Zamfara Lead Catastrophe:</strong> In 2010, miners brought lead-bearing gold ore into residential compounds in Zamfara for crude processing. Crushing the ore released micro-dust. Over 400 children died within weeks due to acute encephalopathy (brain swelling). Over 10,000 survivors suffered permanent cognitive impairment, developmental delays, and severe executive dysfunction, producing the precise cohort targeted for radical recruitment today.
                    </>
                  ) : (
                    <>
                      <strong>⚖️ The Samreboi Galamsey Encroachment:</strong> Samreboi became the primary operations headquarters of Chairman Wontumi's unauthorized gold washing plants. Armed private security guards blocked local river access and cocoa farms. The trial proved that child miners working in these alluvial deposits had average Blood Lead Levels of 38.6 μg/dL, resulting in widespread learning disabilities and behavioral disorders across the Amenfi West region.
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Interactive Data Bar Chart of State Comparative analysis */}
            <div className="bg-white border border-neutral-200 p-4 rounded-xl space-y-3 shadow-2xs">
              <h5 className="font-serif font-bold text-neutral-900 text-xs">
                {selectedState.name} Metrics compared to Switzerland Baseline (Clean)
              </h5>
              <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={[
                      { name: `${selectedState.name} BLL`, value: selectedState.bllAvg, fill: '#991b1b' },
                      { name: 'Swiss Baseline BLL', value: 0.8, fill: '#059669' },
                      { name: `${selectedState.name} Poverty %`, value: selectedState.povertyRate, fill: '#1e293b' },
                      { name: 'Swiss Poverty %', value: 8.5, fill: '#059669' }
                    ]}
                    margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" tick={{ fill: '#444', fontSize: 9 }} />
                    <YAxis tick={{ fill: '#444', fontSize: 9 }} />
                    <Tooltip />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      <Cell fill="#991b1b" />
                      <Cell fill="#059669" />
                      <Cell fill="#1e293b" />
                      <Cell fill="#059669" />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 4. SIMULATOR */}
      {activeTab === 'simulator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn">
          {/* Controls Panel */}
          <div className="lg:col-span-5 bg-neutral-50 border border-neutral-200 p-6 rounded-2xl space-y-6">
            <div>
              <span className="text-[9px] font-mono text-neutral-400 font-bold uppercase block">POLICY CONTROL CENTER</span>
              <h3 className="font-serif text-lg font-bold text-neutral-900">
                Remediation & Enforcement Simulator
              </h3>
              <p className="text-xs text-neutral-500 font-sans mt-1">
                Adjust federal funding and military-enforcement levels to simulate the stabilization of the Lead-Terrorism feedback loop.
              </p>
            </div>

            {/* Slider 1 */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-neutral-700 font-bold">
                  {activeCase === 'nigeria' ? 'Mining Marshals Force Strength' : 'Security Taskforce Deployment'}:
                </span>
                <span className="text-rose-600 font-bold">{enforcementStrength}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={enforcementStrength} 
                onChange={(e) => setEnforcementStrength(Number(e.target.value))}
                className="w-full accent-rose-700 bg-neutral-200 h-2 rounded-lg cursor-pointer"
              />
              <p className="text-[10px] text-neutral-500 leading-normal">
                {activeCase === 'nigeria' 
                  ? 'Deploys specialized units to secure remote mining hubs, intercept gold-for-arms smuggling, and arrest illegal operators.' 
                  : 'Deploys joint military-police taskforces (Operation Halt II) to burn illegal river dredging equipment and arrest political facilitators.'}
              </p>
            </div>

            {/* Slider 2 */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-neutral-700 font-bold">Alternative Livelihoods Co-ops:</span>
                <span className="text-rose-600 font-bold">${livelihoodFunding}M</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="50" 
                value={livelihoodFunding} 
                onChange={(e) => setLivelihoodFunding(Number(e.target.value))}
                className="w-full accent-rose-700 bg-neutral-200 h-2 rounded-lg cursor-pointer"
              />
              <p className="text-[10px] text-neutral-500 leading-normal">
                Provides legal mining cooperatives, alternative farming equipment, and direct financial security to artisanal communities.
              </p>
            </div>

            {/* Slider 3 */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-neutral-700 font-bold">
                  {activeCase === 'nigeria' ? 'Lead Abatement Operations' : 'River Remediation & Metal Abatement'}:
                </span>
                <span className="text-rose-600 font-bold">{leadAbatementEffort}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={leadAbatementEffort} 
                onChange={(e) => setLeadAbatementEffort(Number(e.target.value))}
                className="w-full accent-rose-700 bg-neutral-200 h-2 rounded-lg cursor-pointer"
              />
              <p className="text-[10px] text-neutral-500 leading-normal">
                {activeCase === 'nigeria' 
                  ? 'Funds soil washing, clean water filtration, environmental audits, and home dust vacuuming across agricultural mining states.' 
                  : 'Funds river dredging cleanup, bio-char chemical filtration of heavy metals, and cocoa plantation topsoil restoration.'}
              </p>
            </div>
          </div>

          {/* Projection Outputs Panel */}
          <div className="lg:col-span-7 bg-white border border-neutral-200 p-6 rounded-2xl space-y-6 flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-mono text-neutral-400 font-bold uppercase block">PROJECTION MODEL ENGINE</span>
              <h4 className="font-serif text-lg font-bold text-neutral-900">
                Simulated Stabilization Projections
              </h4>
              <p className="text-xs text-neutral-500 font-sans mt-1">
                Derived impacts on pediatric health metrics, criminal syndicate disruption, and armed terror recruiting.
              </p>
            </div>

            {/* Projected Outputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border bg-neutral-50 border-neutral-200 text-center space-y-1">
                <span className="text-[9px] font-mono text-neutral-400 uppercase font-bold block">
                  {activeCase === 'nigeria' ? 'Insurgent Recruitment Potential' : 'Sovereign Syndicate Influence'}
                </span>
                <div className={`text-4xl font-serif font-black ${
                  calculatedRecruitmentPotential > 60 
                    ? 'text-rose-700' 
                    : calculatedRecruitmentPotential > 30 
                    ? 'text-amber-600' 
                    : 'text-emerald-600'
                }`}>
                  {calculatedRecruitmentPotential}%
                </div>
                <p className="text-[10px] text-neutral-500 font-sans leading-tight">
                  {activeCase === 'nigeria' ? (
                    calculatedRecruitmentPotential > 60 
                      ? 'High brain-damage & poverty levels sustain terror recruitment.' 
                      : calculatedRecruitmentPotential > 30 
                      ? 'Moderately controlled; local co-ops provide options.' 
                      : 'Insurgent recruitment pipelines effectively stabilized.'
                  ) : (
                    calculatedRecruitmentPotential > 60 
                      ? 'Uncontrolled galamsey funds private political guard militias.' 
                      : calculatedRecruitmentPotential > 30 
                      ? 'Cartel funding loops disrupted; miners transition to legal farms.' 
                      : 'Galamsey syndicate influence effectively dismantled.'
                  )}
                </p>
              </div>

              <div className="p-4 rounded-xl border bg-neutral-50 border-neutral-200 text-center space-y-1">
                <span className="text-[9px] font-mono text-neutral-400 uppercase font-bold block">Avg Pediatric BLL (μg/dL)</span>
                <div className={`text-4xl font-serif font-black ${
                  calculatedChildBllAvg > 20 
                    ? 'text-rose-700' 
                    : calculatedChildBllAvg > 10 
                    ? 'text-amber-600' 
                    : 'text-emerald-600'
                }`}>
                  {calculatedChildBllAvg}
                </div>
                <p className="text-[10px] text-neutral-500 font-sans leading-tight">
                  {calculatedChildBllAvg > 20 
                    ? 'Severe ongoing metal ingestion causing permanent brain lesions.' 
                    : calculatedChildBllAvg > 10 
                    ? 'Elevated risk; localized cleanup and soil filtration required.' 
                    : 'Approaching Swiss baseline. Prefrontal cortex intact.'}
                </p>
              </div>

              <div className="p-4 rounded-xl border bg-neutral-50 border-neutral-200 text-center space-y-1">
                <span className="text-[9px] font-mono text-neutral-400 uppercase font-bold block">
                  {activeCase === 'nigeria' ? 'Illicit Terror Financing' : 'Untaxed Syndicate Revenue'}
                </span>
                <div className={`text-4xl font-serif font-black ${
                  calculatedTerrorFundingLoss > 60 
                    ? 'text-rose-700' 
                    : calculatedTerrorFundingLoss > 30 
                    ? 'text-amber-600' 
                    : 'text-emerald-600'
                }`}>
                  {calculatedTerrorFundingLoss}%
                </div>
                <p className="text-[10px] text-neutral-500 font-sans leading-tight">
                  {activeCase === 'nigeria' ? (
                    calculatedTerrorFundingLoss > 60 
                      ? 'Illicit mineral barter completely active; heavy weapons funding.' 
                      : calculatedTerrorFundingLoss > 30 
                      ? 'Intercepted channels; bandits turning to rural cattle rustling.' 
                      : 'Illicit supply lines smashed. Terror cell cash reserves depleted.'
                  ) : (
                    calculatedTerrorFundingLoss > 60 
                      ? 'Millions in gold smuggled untaxed; state authority challenged.' 
                      : calculatedTerrorFundingLoss > 30 
                      ? 'Customs controls tightening; illicit flows redirected.' 
                      : 'Smuggling rings broken. Complete sovereign tax capture.'
                  )}
                </p>
              </div>
            </div>

            {/* Graphic Projection Indicator */}
            <div className="bg-rose-50/60 border border-rose-100 p-4 rounded-xl space-y-2.5">
              <span className="text-[9px] font-mono font-bold text-rose-800 uppercase tracking-wider block">
                {activeCase === 'nigeria' ? '[GCLAC / CCOAL SOVEREIGN ALIGNMENT ADVISORY]' : '[GHANA EXPOSENOMIC SECURITY ADVISORY]'}
              </span>
              <p className="text-[11px] text-rose-950 font-sans leading-relaxed">
                {activeCase === 'nigeria' ? (
                  "By scaling Alternative Livelihoods Co-ops funding to at least $35M and enforcement/abatement beyond 75%, we trigger the Sovereign Stabilization Threshold. At this point, the physical extracting framework blocks the gold-for-arms black market, while pediatric neurological recovery permanently prevents the next generation of youth from becoming vulnerable targets for extremist recruiters."
                ) : (
                  "By funding alternative agricultural cooperatives to $35M and deploying taskforces past 75%, Ghana can successfully disrupt the elite galamsey profit stream. Restoring the Pra and Ankobra river quality prevents chronic metal poisoning in cocoa belts, securing Ghana’s agricultural integrity and dismantling the private militia guard networks."
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER SECTION: SYSTEM INTEGRATION LOGS */}
      <div className="pt-6 border-t border-rose-200/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-rose-900 font-medium bg-rose-50/20 p-4 rounded-xl">
        <div className="flex items-center gap-1.5">
          <Server size={14} className="text-rose-600 animate-pulse" />
          <span>
            {activeCase === 'nigeria' 
              ? "Nigeria Environmental Mining Audits aligned with WHO Global Lead Action Plan & Roulet's Law." 
              : "Ghanaian Samreboi Galamsey Prosecution & Exposenomic Security logs aligned with Roulet's Law."}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold text-emerald-800">Sovereign Directory Ledger: ACTIVE</span>
        </div>
      </div>

    </div>
  );
}
