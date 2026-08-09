import React, { useState } from 'react';
import { 
  Activity, 
  Brain, 
  Dna, 
  Shield, 
  ShieldAlert,
  Globe, 
  TrendingUp, 
  Sliders, 
  Scale, 
  BookOpen, 
  FileText, 
  AlertCircle,
  HelpCircle,
  ChevronRight,
  Flame,
  Maximize2,
  Lock,
  ArrowUpRight,
  Zap,
  Heart,
  Droplet,
  Quote,
  MapPin,
  ArrowRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  ZAxis, 
  Tooltip, 
  LineChart, 
  Line, 
  CartesianGrid,
  Legend
} from 'recharts';

// Define structures for our interactive states
type SystemicLayer = 'genome' | 'biome' | 'immunome' | 'exposome';

interface HistoricalEpoch {
  year: string;
  title: string;
  location: string;
  bll: number;
  crimeRate: number;
  formula: string;
  consequence: string;
  narrative: string;
}

// 1. Historical Epochs connecting lead levels directly to social chaos (homicides/violent incidents)
const HISTORICAL_EPOCHS: HistoricalEpoch[] = [
  {
    year: "A.D. 150",
    title: "Roman Plumbism & Imperial Decay",
    location: "Rome, Italy",
    bll: 32.5,
    crimeRate: 480,
    formula: "Pb(C2H3O2)2 (Sapa sweetener) + Aqueduct fistulae",
    consequence: "Systemic elite executive dysfunction, behavioral madness, and collapse of military-political control loops.",
    narrative: "Roman aristocrats boiled unfermented grape juice in lead pots to create 'Sapa' syrup, an intense neurotoxic sweetener. Combined with soft lead water lines (fistulae), the ruling class suffered severe, chronic lead poisoning. The erratic violence of emperors like Nero was the direct consequence of prefrontal gray matter decay."
  },
  {
    year: "A.D. 1843",
    title: "The Dickensian Lead Mills",
    location: "London, United Kingdom",
    bll: 25.0,
    crimeRate: 350,
    formula: "Coal Smoke + Leaded Pigments + Atmospheric Coal Tar",
    consequence: "Type I Renal Tubular Acidosis (RTA) in children, physical crippling, and severe labor violence epidemics.",
    narrative: "The industrial revolution concentrated workers directly adjacent to smelting kilns and coal-fired plants. Childhood lead exposure was ubiquitous. Pediatric nephrologists confirm that Tiny Tim's physical crippling matches Lead-induced Distal Renal Acidosis (RTA), mask-vibeing as a moral fable."
  },
  {
    year: "A.D. 1975",
    title: "The Leaded Gasoline Peak",
    location: "New Orleans, Louisiana",
    bll: 40.0,
    crimeRate: 640,
    formula: "Tetraethyl Lead (TEL) Combustion + Urban Air Drag",
    consequence: "The 'Greatest Morality Play': historic peak of local homicide and violent crime matching the combustion exhaust curve.",
    narrative: "Leaded gasoline combustion released millions of metric tons of particulate lead directly into metropolitan corridors. The city of New Orleans represented a global peak. Cross-referencing blood lead levels with 20-year delayed homicide rates proves the absolute correlation of the Lead-Crime Hypothesis."
  },
  {
    year: "A.D. 2006",
    title: "Modern Segregated Infrastructure",
    location: "Chicago, Illinois",
    bll: 11.2,
    crimeRate: 78,
    formula: "395k Lead Service Lines + Legacy Interior Paint",
    consequence: "Hyper-localized neurodevelopmental atrophy driving impulsive reactive rage in segregated municipal zones.",
    narrative: "Chicago holds the nation's largest concentration of toxic lead connections. Exposure is not democratic; it is concentrated in historically redlined neighborhoods, creating localized cognitive anomalies and HPA axis saturation, triggering high-enforcement cost loops."
  },
  {
    year: "A.D. 2026 (Nigeria)",
    title: "Sapiens Speciation: The Nigeria Lead-Conflict Proof",
    location: "Kwara & Jos, Nigeria",
    bll: 38.0,
    crimeRate: 520,
    formula: "Informal Artisanal Gold Mining + High-Conflict Fault Lines",
    consequence: "Acute heavy metal exposure de-activating the prefrontal cortex, driving extreme behavioral volatility and regional bloodshed.",
    narrative: "Among the ongoing conflicts in Nigeria, fatal clashes between Muslim-majority Fulani herdsmen and Christian-majority farmers are fueled by massive, overlooked lead poisoning. Reducing the incredibly high prevalence throughout Nigeria of lead poisoning—which study after study has linked to aggression and violent behavior—could be a key, overlooked lever to calm the bloodshed in Africa's largest country. Pervasive environmental heavy-metal contamination directly supports Roulet's Law, demonstrating the tragic geochemical path from neurodevelopmental degradation to violent macro-geopolitical conflict."
  },
  {
    year: "A.D. 2026",
    title: "The Sovereign Baseline Sanctuary",
    location: "Taos Pueblo, New Mexico",
    bll: 0.016,
    crimeRate: 0.2,
    formula: "Homo Sapiens 0 Standard (0.016 μg/dL Pb)",
    consequence: "Optimized cognitive functioning, complete emotional self-regulation, and zero-knowledge data isolation.",
    narrative: "By utilizing decentralized local ledgers and ZK-encryption, the sanctuary locks out external corporate surveillance while actively remediating soil and water systems back to the unperturbed pre-industrial baseline of 0.016 μg/dL."
  }
];

// 2. Scatter plot data representing Lead-Crime Hypothesis regression curves
const REGRESSION_DATA = [
  { bll: 0.016, crimeRate: 0.2, name: "Homo Sapiens 0 Baseline", group: "Pristine Sanctuary", desc: "No lead perturbation, pristine pre-industrial baseline." },
  { bll: 0.032, crimeRate: 0.5, name: "Taos Eco Sanctuary", group: "Sovereign Sanctuary", desc: "Highly secure local environment, protected." },
  { bll: 1.5, crimeRate: 1.8, name: "Switzerland (CH-01)", group: "Sovereign Baseline", desc: "Highly optimized modern control." },
  { bll: 2.0, crimeRate: 2.5, name: "Gold Coast Chicago (60611)", group: "Modern High-Income", desc: "Low lead service density, socioeconomically buffered." },
  { bll: 4.8, crimeRate: 15.2, name: "Logan Square (60647)", group: "Modern Mid-Income", desc: "Moderate legacy lead connections." },
  { bll: 9.2, crimeRate: 56.5, name: "Austin Chicago (60644)", group: "Modern Low-Income", desc: "High density lead service lines, high crime overlap." },
  { bll: 11.2, crimeRate: 78.4, name: "Englewood Chicago (60621)", group: "Modern Low-Income", desc: "Severe environmental and public health stress." },
  { bll: 22.0, crimeRate: 210.0, name: "Savar Bangladesh", group: "Developing Industrial", desc: "Informal toxic battery recycling site." },
  { bll: 25.0, crimeRate: 350.0, name: "Victorian London (1843)", group: "Historical Industrial", desc: "Pervasive coal and paint toxic fallout." },
  { bll: 32.5, crimeRate: 480.0, name: "Imperial Roman Elite (150)", group: "Historical Elite", desc: "Severe wine and aqueduct lead poisoning." },
  { bll: 38.0, crimeRate: 520.0, name: "Nigeria (2026 Conflict)", group: "Global Conflict Proof", desc: "Pervasive lead poisoning linked directly to regional conflict and massacres." },
  { bll: 40.0, crimeRate: 640.0, name: "New Orleans (1975 peak)", group: "Historical Extreme", desc: "Combustion peak of leaded gasoline." }
];

interface LeadCrimeProofsProps {
  onNavigateTab?: (tab: string) => void;
}

export default function LeadCrimeProofs({ onNavigateTab }: LeadCrimeProofsProps = {}) {
  const [activeLayer, setActiveLayer] = useState<SystemicLayer>('genome');
  const [selectedEpoch, setSelectedEpoch] = useState<HistoricalEpoch>(HISTORICAL_EPOCHS[2]); // Default to New Orleans 1975
  const [remediationCapital, setRemediationCapital] = useState<number>(1.5); // Trillions
  const [sovereignCompute, setSovereignCompute] = useState<number>(45); // % AI compute

  // Dynamic calculations representing the scaling impact of Roulet's Law
  const calculateDerivedOutputs = () => {
    // Basic baseline
    const bllPerturbation = selectedEpoch.bll;
    
    // AI compute and capital actively suppress the chaos multiplier of lead
    const aiReductionFactor = 1 - (sovereignCompute / 100) * 0.75;
    const capitalReductionFactor = 1 / (1 + remediationCapital * 0.5);
    
    // Derived Outputs
    const simulatedChaos = Math.round(
      bllPerturbation * 16 * aiReductionFactor * capitalReductionFactor
    );
    const pfcGrayMatter = Math.max(
      55,
      Math.min(100, Math.round(100 - bllPerturbation * 1.1 + (remediationCapital * 1.5)))
    );
    const hpaOverdrive = Math.max(
      5,
      Math.min(100, Math.round((bllPerturbation * 7.5) * (2 - aiReductionFactor)))
    );
    
    // Calculate Homo Sapiens 0 Proximity
    let proximity = 0;
    if (bllPerturbation <= 0.016) {
      proximity = 100;
    } else {
      proximity = Math.max(0, Math.min(100, Math.round(100 / (1 + (bllPerturbation - 0.016) * 0.25))));
    }

    return {
      simulatedChaos,
      pfcGrayMatter,
      hpaOverdrive,
      proximity
    };
  };

  const outputs = calculateDerivedOutputs();

  // Custom tooltips for recharts
  const renderCustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-neutral-900 border border-neutral-800 p-3.5 rounded-lg text-white font-sans text-xs shadow-xl max-w-xs space-y-1.5">
          <p className="font-bold text-amber-400">{data.name}</p>
          <div className="text-[11px] space-y-0.5 text-neutral-300">
            <p>🔴 Blood Lead Level: <span className="font-mono text-white font-bold">{data.bll} μg/dL</span></p>
            <p>💀 Violent Incidents / 100k: <span className="font-mono text-white font-bold">{data.crimeRate}</span></p>
            <p className="text-gray-400 text-[10px] italic border-t border-neutral-850 pt-1.5 mt-1 leading-normal">
              {data.desc}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div id="lead-crime-proofs-root" className="w-full max-w-7xl mx-auto bg-white p-6 md:p-8 space-y-8 pb-16">
      
      {/* SECTION 1: HEADER & CORE MANIFESTO */}
      <div className="border-b border-[#E5E5E5] pb-6 shrink-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono font-bold text-red-600 uppercase tracking-widest bg-red-50 border border-red-100 px-2.5 py-1 rounded-full inline-flex items-center gap-1.5 mb-2.5">
              <Activity size={12} className="animate-pulse" />
              Core Analytical Proofs
            </span>
            <h1 className="text-3xl font-serif font-light tracking-tight text-neutral-900">
              ICEarth Lead-Crime Hypotheses Proofs
            </h1>
            <p className="text-sm font-sans text-[#666] mt-1 uppercase tracking-wider font-semibold">
              Sovereign Exposenomics & Multi-Systemic Biogeochemical Regression
            </p>
          </div>
          
          <div className="flex items-center gap-2 font-mono text-xs bg-amber-50 text-amber-800 border border-amber-200 px-4 py-2.5 rounded-xl max-w-sm">
            <Lock size={14} className="text-amber-700 shrink-0" />
            <span>ZK-Encrypted Analytical Node • Active Connection</span>
          </div>
        </div>

        {/* REGIONAL CASE STUDIES & FIELD AUDITS QUICK NAVIGATION HUB */}
        {onNavigateTab && (
          <div className="mt-4 p-3 bg-neutral-900 rounded-xl text-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 text-xs shadow-xs">
            <span className="font-mono text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5 shrink-0">
              <MapPin size={14} className="text-amber-400 animate-pulse" />
              Field Case Studies & Regional Audits:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <button 
                onClick={() => onNavigateTab('toledo')} 
                className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-mono text-[11px] font-bold rounded-lg border border-amber-500/30 transition-all cursor-pointer flex items-center gap-1"
              >
                🏛️ Toledo 419 <ArrowRight size={10} />
              </button>
              <button 
                onClick={() => onNavigateTab('cleveland')} 
                className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-mono text-[11px] font-bold rounded-lg border border-neutral-700 transition-all cursor-pointer flex items-center gap-1"
              >
                🏭 Cleveland <ArrowRight size={10} />
              </button>
              <button 
                onClick={() => onNavigateTab('chicago')} 
                className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-mono text-[11px] font-bold rounded-lg border border-neutral-700 transition-all cursor-pointer flex items-center gap-1"
              >
                🏙️ Chicago <ArrowRight size={10} />
              </button>
              <button 
                onClick={() => onNavigateTab('buffalo')} 
                className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-mono text-[11px] font-bold rounded-lg border border-neutral-700 transition-all cursor-pointer flex items-center gap-1"
              >
                🦬 Buffalo <ArrowRight size={10} />
              </button>
              <button 
                onClick={() => onNavigateTab('milwaukee')} 
                className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-mono text-[11px] font-bold rounded-lg border border-neutral-700 transition-all cursor-pointer flex items-center gap-1"
              >
                ⚙️ Milwaukee <ArrowRight size={10} />
              </button>
              <button 
                onClick={() => onNavigateTab('bihar')} 
                className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-mono text-[11px] font-bold rounded-lg border border-neutral-700 transition-all cursor-pointer flex items-center gap-1"
              >
                🌏 Bihar <ArrowRight size={10} />
              </button>
              <button 
                onClick={() => onNavigateTab('litigation')} 
                className="px-2.5 py-1 bg-amber-900/60 hover:bg-amber-800/80 text-amber-200 font-mono text-[11px] font-bold rounded-lg border border-amber-700/50 transition-all cursor-pointer flex items-center gap-1"
              >
                ⚖️ Litigation Ledger <ArrowRight size={10} />
              </button>
              <button 
                onClick={() => onNavigateTab('indigenous')} 
                className="px-2.5 py-1 bg-emerald-900/60 hover:bg-emerald-800/80 text-emerald-200 font-mono text-[11px] font-bold rounded-lg border border-emerald-700/50 transition-all cursor-pointer flex items-center gap-1"
              >
                🪶 Indigenous <ArrowRight size={10} />
              </button>
              <button 
                onClick={() => onNavigateTab('terrorism_proofs')} 
                className="px-2.5 py-1 bg-red-900/60 hover:bg-red-800/80 text-red-200 font-mono text-[11px] font-bold rounded-lg border border-red-700/50 transition-all cursor-pointer flex items-center gap-1"
              >
                💣 Lead-Terrorism <ArrowRight size={10} />
              </button>
            </div>
          </div>
        )}

        {/* ROULET'S LAW CORE UNIFICATION CARD */}
        <div className="mt-6 bg-[#FCFBF7] border border-amber-200 rounded-2xl p-6 relative overflow-hidden shadow-xs">
          <div className="absolute right-0 top-0 w-48 h-48 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
            <div className="p-3 bg-amber-100 rounded-xl text-amber-800 shrink-0">
              <Scale size={24} />
            </div>
            <div className="space-y-3 flex-1">
              <h2 className="text-xs font-mono font-bold tracking-wider text-amber-900 uppercase">
                The Unification Paradigm: Roulet's Law
              </h2>
              <p className="text-base font-serif italic text-neutral-800 leading-relaxed">
                "Roulet's Law simply expands the scope and timeframe of the Lead-Crime Hypothesis to all human history and development for all global Genomes, Biomes, Immunomes and Exposomes."
              </p>
              <div className="pt-2 border-t border-amber-200/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs text-neutral-600">
                <p className="font-sans">
                  By elevating the Lead-Crime Hypothesis from a localized sociological correlation into a grand thermodynamic and biological theorem, Roulet's Law establishes that <strong className="text-black font-bold">subatomic lead perturbation ($H'$)</strong> disrupts raw biological wavefunctions, translating directly to macro-scale societal chaos.
                </p>
                <span className="font-mono text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 shrink-0">
                  Homo Sapiens 0: 0.016 μg/dL Pb Standard
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* LANDMARK COHORT STUDY: CINCINNATI LEAD STUDY & DR. BRUCE LANPHEAR */}
        <div className="mt-6 bg-red-50/10 border-2 border-red-100 rounded-2xl p-6 relative overflow-hidden shadow-xs">
          <div className="absolute right-0 top-0 w-48 h-48 bg-red-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex flex-col lg:flex-row items-start gap-6 relative z-10">
            <div className="p-3.5 bg-red-100 text-red-800 rounded-xl shrink-0">
              <Brain size={28} className="text-red-600 animate-pulse" />
            </div>
            <div className="space-y-4 flex-1">
              <div>
                <span className="text-[9px] font-mono font-bold tracking-widest text-red-700 bg-red-100/50 px-2.5 py-1 rounded-full uppercase inline-flex items-center gap-1.5 mb-2">
                  <Flame size={10} className="text-red-600" />
                  Landmark 30-Year Birth Cohort Proof
                </span>
                <h3 className="text-xl font-serif font-bold text-neutral-900">
                  The Cincinnati Lead Study & Dr. Bruce Lanphear
                </h3>
                <p className="text-[11px] font-mono text-neutral-500 mt-1 font-semibold italic">
                  "Developmental lead exposure and adult criminal behavior: A 30-year prospective birth cohort study" (Wright, Lanphear, Dietrich, Bolger, Tully, Cecil, Sacarellos, 2008)
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                <div className="md:col-span-8 space-y-2.5 text-xs text-neutral-700 leading-relaxed font-sans">
                  <p>
                    Dr. Bruce Lanphear was involved as a co-author of the landmark 2008 study linked to the <strong>Cincinnati Lead Study</strong>, which discovered a direct relationship between early childhood lead exposure and adult violent crime.
                  </p>
                  <p>
                    The Cincinnati Lead Study is a landmark, long-term research project demonstrating that childhood lead exposure is directly linked to an increased risk of adult criminal arrests and violent behavior. It followed a birth cohort for over 30 years, measuring blood lead levels during infancy/early childhood and tracking official arrest records into adulthood.
                  </p>
                </div>
                
                <div className="md:col-span-4 bg-white border border-red-200 p-4 rounded-xl shadow-2xs space-y-3">
                  <div>
                    <span className="text-[9px] font-mono font-bold text-red-600 uppercase tracking-wider block">[Impact Coefficient]</span>
                    <div className="text-3xl font-serif font-bold text-red-600 flex items-baseline gap-1">
                      +48% <span className="text-xs font-sans text-neutral-500 font-normal">Risk Increase</span>
                    </div>
                    <p className="text-[10px] text-neutral-600 font-sans leading-normal mt-1">
                      In adult violent crime arrest probability for every <strong>5 μg/dL</strong> increase in early childhood blood lead levels.
                    </p>
                  </div>
                  {onNavigateTab && (
                    <div className="pt-2 border-t border-red-100 flex flex-wrap gap-2 text-[10px] font-mono">
                      <button 
                        onClick={() => onNavigateTab('cleveland')}
                        className="text-red-700 hover:text-red-900 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>• Cleveland Audit</span> <ChevronRight size={10} />
                      </button>
                      <button 
                        onClick={() => onNavigateTab('chicago')}
                        className="text-red-700 hover:text-red-900 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>• Chicago Audit</span> <ChevronRight size={10} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LANDMARK FEDERAL TESTIMONY: CDC CHIEF PAUL ALLWOOD TOLEDO CONFESSION */}
        <div className="mt-6 bg-amber-50/20 border-2 border-amber-200 rounded-2xl p-6 relative overflow-hidden shadow-xs">
          <div className="absolute right-0 top-0 w-48 h-48 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex flex-col lg:flex-row items-start gap-6 relative z-10">
            <div className="p-3.5 bg-amber-100 text-amber-900 rounded-xl shrink-0">
              <Quote size={28} className="text-amber-700 animate-pulse" />
            </div>
            <div className="space-y-4 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[9px] font-mono font-bold tracking-widest text-amber-800 bg-amber-100/80 px-2.5 py-1 rounded-full uppercase inline-flex items-center gap-1.5 mb-2">
                    <Activity size={10} className="text-amber-700" />
                    Federal CDC Endorsement • July 23, 2026 Toledo Symposium
                  </span>
                  <h3 className="text-xl font-serif font-bold text-neutral-900">
                    CDC Chief Paul Allwood: "That's Solid Truth... Lead Exposure Causes Juvenile Delinquency & Incarceration"
                  </h3>
                  <p className="text-[11px] font-mono text-neutral-600 mt-1 font-semibold italic">
                    Public Statement by Paul Allwood, Chief of the Lead Poisoning Prevention and Surveillance Branch at the CDC (Toledo Main Library)
                  </p>
                </div>
                {onNavigateTab && (
                  <button
                    onClick={() => onNavigateTab('toledo')}
                    className="px-3 py-2 bg-amber-900 hover:bg-black text-amber-100 text-xs font-mono font-bold rounded-lg flex items-center gap-1.5 shadow-xs transition-all cursor-pointer shrink-0"
                  >
                    <MapPin size={14} className="text-amber-400" />
                    View Toledo Case Study <ArrowRight size={12} className="text-amber-400" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                <div className="md:col-span-8 space-y-2.5 text-xs text-neutral-700 leading-relaxed font-sans">
                  <p className="font-serif italic text-amber-950 font-semibold border-l-2 border-amber-600 pl-3">
                    "One of their early speakers talked about the connection between lead poisoning and violence... That's the truth. That's solid truth. It's well established scientifically that lead exposure in childhood leads to other problems, including more tendencies towards juvenile delinquency and incarceration."
                  </p>
                  <p>
                    Recounting a visit to a juvenile facility where 15 young Black boys were incarcerated, Allwood testified: <em>"Those 15 boys, all of them like me, locked up in a prison, wasn't a coincidence. There were a series of events that led to that, some of which are systemic, and that in some cases those boys were on that path from the day they were conceived... I saw it as inevitable as rain that they ended up in those facilities."</em>
                  </p>
                </div>
                
                <div className="md:col-span-4 bg-white border border-amber-200 p-4 rounded-xl shadow-2xs space-y-3">
                  <div>
                    <span className="text-[9px] font-mono font-bold text-amber-800 uppercase tracking-wider block">[Official Verification]</span>
                    <div className="text-lg font-serif font-bold text-amber-900 flex items-baseline gap-1">
                      CDC Branch Chief <span className="text-xs font-sans text-amber-700 font-normal">Public Confirmation</span>
                    </div>
                    <p className="text-[10px] text-neutral-600 font-sans leading-normal mt-1">
                      Validates the Lead-Crime Hypothesis in an official federal capacity, demonstrating that scientific truth transcends political leadership and requiring all Presidential Administrations to act.
                    </p>
                  </div>
                  {onNavigateTab && (
                    <button
                      onClick={() => onNavigateTab('toledo')}
                      className="w-full text-left text-xs font-mono font-bold text-amber-900 hover:text-black hover:underline flex items-center justify-between border-t border-amber-100 pt-2 cursor-pointer"
                    >
                      <span>🏛️ Toledo 419 Audit Case Study</span>
                      <ChevronRight size={12} className="text-amber-700" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LANDMARK REGRESSION STUDY: RICK NEVIN'S LUCIFER CURVES */}
        <div className="mt-6 bg-indigo-50/10 border-2 border-indigo-100 rounded-2xl p-6 relative overflow-hidden shadow-xs">
          <div className="absolute right-0 top-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex flex-col lg:flex-row items-start gap-6 relative z-10">
            <div className="p-3.5 bg-indigo-100 text-indigo-800 rounded-xl shrink-0">
              <BookOpen size={28} className="text-indigo-600" />
            </div>
            <div className="space-y-4 flex-1">
              <div>
                <span className="text-[9px] font-mono font-bold tracking-widest text-indigo-700 bg-indigo-100/50 px-2.5 py-1 rounded-full uppercase inline-flex items-center gap-1.5 mb-2">
                  <Globe size={10} className="text-indigo-600" />
                  Multinational Econometric Causation Proof
                </span>
                <h3 className="text-xl font-serif font-bold text-neutral-900 flex items-center justify-between gap-2 flex-wrap">
                  <span>Rick Nevin: Global Lead-Crime Regression & Lucifer Curves</span>
                  <a 
                    href="https://ricknevin.com/lucifer-curves/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1 text-xs font-mono text-indigo-600 hover:text-indigo-800 font-bold hover:underline"
                  >
                    ricknevin.com/lucifer-curves <ArrowUpRight size={13} />
                  </a>
                </h3>
                <p className="text-[11px] font-mono text-neutral-500 mt-1 font-semibold italic">
                  "Lucifer Curves: The Legacy of Lead Poisoning" & Peer-Reviewed Global Econometric Models (Nevin, 2016)
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                <div className="md:col-span-8 space-y-3 text-xs text-neutral-700 leading-relaxed font-sans">
                  <p>
                    Renowned economist <strong>Rick Nevin's</strong> peer-reviewed research reaches identical conclusions to the Cincinnati Lead Study, demonstrating a profound, multinational biogeochemical regression. In <em>Lucifer Curves</em>, Nevin puts all the pieces together, detailing how preschool lead poisoning has caused dramatic, stranger-than-fiction crime waves across centuries and around the globe.
                  </p>
                  <p>
                    Nevin’s predictive models show that lead exposure trends have accurately predicted ongoing violent crime trends in the <strong>United States, Canada, Britain, Australia, and New Zealand</strong>. Furthermore, his research successfully explains historic trends in stature (the "antebellum puzzle") and the famous developmental cycle known as the "dawn to dusk of delinquency."
                  </p>
                  <p>
                    Crucially, lead poisoning also accurately predicted US societal trends in education, unwed teen pregnancy, abortion, and unwed birth rates, as well as arrest and incarceration racial disparities. Nevin presents clear causation evidence based on strict epidemiological indicators described by the World Health Organization as a <em>“mainstay of epidemiological textbooks.”</em> He outlines how we can economically eliminate preschool lead exposure (soil, dust, paint, and water) and reshape the criminal justice debate.
                  </p>
                </div>
                
                <div className="md:col-span-4 bg-white border border-indigo-200 p-4 rounded-xl shadow-2xs space-y-3.5">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono font-bold text-indigo-600 uppercase tracking-wider block">[Predictive Lag]</span>
                    <div className="text-3xl font-serif font-bold text-indigo-600 flex items-baseline gap-1">
                      20 Years <span className="text-xs font-sans text-neutral-500 font-normal">Time Lag</span>
                    </div>
                    <p className="text-[10px] text-neutral-600 font-sans leading-normal">
                      The exact delay between preschool lead exposure peaks and subsequent adult violent crime rate trends across 5 major sovereign nations.
                    </p>
                  </div>
                  
                  <div className="pt-2 border-t border-neutral-100 flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 bg-neutral-100 border border-neutral-200 text-neutral-600 rounded font-mono text-[9px] font-bold">USA</span>
                    <span className="px-2 py-0.5 bg-neutral-100 border border-neutral-200 text-neutral-600 rounded font-mono text-[9px] font-bold">CANADA</span>
                    <span className="px-2 py-0.5 bg-neutral-100 border border-neutral-200 text-neutral-600 rounded font-mono text-[9px] font-bold">BRITAIN</span>
                    <span className="px-2 py-0.5 bg-neutral-100 border border-neutral-200 text-neutral-600 rounded font-mono text-[9px] font-bold">AUSTRALIA</span>
                    <span className="px-2 py-0.5 bg-neutral-100 border border-neutral-200 text-neutral-600 rounded font-mono text-[9px] font-bold">NZ</span>
                  </div>

                  {onNavigateTab && (
                    <button
                      onClick={() => onNavigateTab('litigation')}
                      className="w-full text-left text-xs font-mono font-bold text-indigo-900 hover:text-black hover:underline flex items-center justify-between border-t border-indigo-100 pt-2 cursor-pointer"
                    >
                      <span>⚖️ View Litigation & Payout Ledger</span>
                      <ChevronRight size={12} className="text-indigo-700" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LANDMARK EXPOSE: CGD REBUTTAL TO BIG LEAD & INDUSTRY SCIENCE CORRUPTION */}
        <div className="mt-6 bg-gradient-to-br from-rose-950 via-neutral-900 to-red-950 text-white rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-xl border border-rose-800/40">
          <div className="absolute right-0 top-0 w-80 h-80 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="space-y-6 relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-rose-900/60 pb-5">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-rose-400 bg-rose-950 border border-rose-800/60 px-3 py-1 rounded-full uppercase inline-flex items-center gap-1.5 mb-2">
                  <ShieldAlert size={12} className="text-rose-400 animate-pulse" />
                  Center for Global Development (CGD) • Rebuttal to Big Lead (ILA)
                </span>
                <h3 className="text-2xl md:text-3xl font-serif font-black text-white">
                  Roulet's Law Proof: "Big Lead is Still Downplaying the Harms"
                </h3>
                <p className="text-xs font-mono text-rose-200/80 mt-1">
                  How Corporate Betrayal of Science for Money Poisoned 1/3 of Earth — CGD Rebuttal, Dutch Boy Paints & Jones Day vs Dr. Herbert Needleman
                </p>
              </div>
              <a
                href="https://www.cgdev.org/blog/big-lead-still-downplaying-harms-lead-poisoning"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-rose-700 hover:bg-rose-600 text-white font-mono text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-all shrink-0 cursor-pointer"
              >
                <span>Read CGD Paper & Rebuttal</span>
                <ArrowUpRight size={14} />
              </a>
            </div>

            {/* CORE QUOTE & EXECUTIVE SUMMARY */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs text-neutral-300 leading-relaxed font-sans">
              <div className="lg:col-span-8 space-y-4">
                <blockquote className="p-4 bg-black/50 border-l-4 border-rose-500 rounded-r-xl space-y-2 text-rose-100 font-serif italic text-sm">
                  "This is a familiar pattern in health science, in which industry-funded consultants push back on estimates of harm from products their clients sell. It's worth reading the comment with that context in mind, but also judging the substantive points on their own merits. We think they don't hold up."
                  <span className="text-[10px] font-mono font-normal text-rose-400 block not-italic mt-1">
                    — Lee Crawfurd, Theo Mitchell, and James Hu (Center for Global Development, 2026)
                  </span>
                </blockquote>

                <p>
                  A foundational principle of Roulet's Law ("Why Homo Nazi ISIS / Corporate Fascism") is that environmental lead poisoning does not persist by accident. It is actively maintained by <strong>corporate entities and hired scientific mercenaries who betray science and humanity for money</strong>.
                </p>

                <p>
                  Our research and new empirical estimates from the Center for Global Development (CGD) published in <em>Environmental Pollution</em> confirm that informal lead battery recycling accounts for <strong>one-third (1/3) of global lead exposure</strong>, impacting hundreds of millions of children worldwide. When three consultants for the International Lead Association (ILA) (Schoof et al.) published a comment trying to downplay the harms, Crawfurd, Mitchell, and Hu systematically dismantled their claims using quasi-experimental causal data.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-neutral-900/90 border border-rose-900/50 rounded-xl space-y-1.5">
                    <span className="text-[10px] font-mono font-bold text-rose-400 uppercase tracking-wider block">1. Disproving 5km Distance Limit</span>
                    <p className="text-[11px] text-neutral-300">
                      Schoof et al. claimed lack of evidence beyond 165m. CGD cited causal quasi-experimental studies (<em>Berkhout et al. 2025, Ipapa 2023, Litzow et al. 2024, Kundu et al. 2024, Tanaka et al. 2022</em>) proving test score and health damage <strong>1km to 10km</strong> away from battery recyclers.
                    </p>
                  </div>
                  <div className="p-3 bg-neutral-900/90 border border-rose-900/50 rounded-xl space-y-1.5">
                    <span className="text-[10px] font-mono font-bold text-rose-400 uppercase tracking-wider block">2. Disproving Low-Exposure Claims</span>
                    <p className="text-[11px] text-neutral-300">
                      Schoof et al. cited under-powered studies to claim low levels aren't harmful. CGD refuted this with causal studies (<em>Aizer et al. 2023, Reyes 2015</em>) proving cognitive and cardiovascular damage even at low blood lead levels with <strong>no safe threshold</strong>.
                    </p>
                  </div>
                </div>
              </div>

              {/* SIDEBAR: HISTORICAL PLAYBOOK OF LEAD SCIENCE CORRUPTION */}
              <div className="lg:col-span-4 bg-neutral-900 border border-neutral-800 p-5 rounded-xl space-y-4 shadow-inner">
                <div>
                  <span className="text-[10px] font-mono font-bold text-rose-400 uppercase tracking-wider block">The Century-Long "Big Lead" Playbook</span>
                  <h4 className="font-serif font-bold text-white text-sm mt-1">From Dutch Boy Paints to Jones Day vs. Needleman</h4>
                </div>

                <div className="space-y-3 text-[11px]">
                  <div className="p-2.5 bg-black/40 rounded-lg border border-neutral-800 space-y-1">
                    <strong className="text-amber-300 block font-mono">🎨 Dutch Boy Paints (Sherwin-Williams)</strong>
                    <p className="text-neutral-300 text-[10px]">
                      Marketed lead paint for children's toys and nursery walls for decades despite knowing of European lead paint bans (1909) and pediatric toxicity.
                    </p>
                  </div>

                  <div className="p-2.5 bg-black/40 rounded-lg border border-neutral-800 space-y-1">
                    <strong className="text-rose-400 block font-mono">⚖️ Jones Day vs. Dr. Herbert Needleman</strong>
                    <p className="text-neutral-300 text-[10px]">
                      When Dr. Needleman proved in 1979 (NEJM) that low-level lead causes child IQ loss, the Lead Industries Association hired Jones Day to launch a decade-long smear campaign and false fraud charges against him. Dr. Needleman was completely exonerated.
                    </p>
                  </div>

                  <div className="p-2.5 bg-black/40 rounded-lg border border-neutral-800 space-y-1">
                    <strong className="text-rose-300 block font-mono">🔋 Modern ILA Battery Smelter Denialism</strong>
                    <p className="text-neutral-300 text-[10px]">
                      Today, International Lead Association consultants push back against battery smelter harm estimates while 1/3 of Earth's children suffer chronic lead poisoning.
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-800 text-[10px] font-mono text-rose-300 flex items-center justify-between">
                  <span>ICEarth Solution:</span>
                  <span className="font-bold text-white">Immutable Blockchain Sensors & ZK-Proofs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: BENTO GRID - GENOMES, BIOMES, IMMUNOMES, EXPOSOMES */}
      <div className="space-y-4 shrink-0">
        <div>
          <h3 className="text-xs font-mono text-[#999] uppercase tracking-widest">Multi-Systemic Biogeochemical Spheres</h3>
          <h4 className="text-xl font-serif font-light mt-1">The Quad-Matrix under Roulet's Law</h4>
          <p className="text-xs text-gray-500 mt-1 max-w-2xl font-sans">
            Select an environmental-biological sphere to inspect how the first-order lead perturbation ($H'$) disrupts systemic integrity, modifying physical expression and human agency.
          </p>
        </div>

        {/* Quad Toggles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
          <button
            onClick={() => setActiveLayer('genome')}
            className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden cursor-pointer ${
              activeLayer === 'genome'
                ? 'bg-neutral-900 border-transparent text-white shadow-md'
                : 'bg-white border-neutral-200 text-[#444] hover:bg-neutral-50 hover:border-neutral-300'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-1.5 rounded-lg shrink-0 ${activeLayer === 'genome' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-50 text-indigo-600'}`}>
                <Dna size={16} />
              </div>
              <span className="text-[9px] font-mono font-bold tracking-widest uppercase opacity-75">LAYER I</span>
            </div>
            <h5 className="text-xs font-bold font-sans">1. Genomes</h5>
            <p className={`text-[10px] mt-1.5 line-clamp-2 ${activeLayer === 'genome' ? 'text-neutral-300' : 'text-neutral-500'}`}>
              The unperturbed genetic matrix, NOVA1 divergence, and epigenetic DNA methylation.
            </p>
          </button>

          <button
            onClick={() => setActiveLayer('biome')}
            className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden cursor-pointer ${
              activeLayer === 'biome'
                ? 'bg-neutral-900 border-transparent text-white shadow-md'
                : 'bg-white border-neutral-200 text-[#444] hover:bg-neutral-50 hover:border-neutral-300'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-1.5 rounded-lg shrink-0 ${activeLayer === 'biome' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-50 text-emerald-600'}`}>
                <Globe size={16} />
              </div>
              <span className="text-[9px] font-mono font-bold tracking-widest uppercase opacity-75">LAYER II</span>
            </div>
            <h5 className="text-xs font-bold font-sans">2. Biomes</h5>
            <p className={`text-[10px] mt-1.5 line-clamp-2 ${activeLayer === 'biome' ? 'text-neutral-300' : 'text-neutral-500'}`}>
              Geological weathering, water-system transport, dust dispersion, and food webs.
            </p>
          </button>

          <button
            onClick={() => setActiveLayer('immunome')}
            className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden cursor-pointer ${
              activeLayer === 'immunome'
                ? 'bg-neutral-900 border-transparent text-white shadow-md'
                : 'bg-white border-neutral-200 text-[#444] hover:bg-neutral-50 hover:border-neutral-300'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-1.5 rounded-lg shrink-0 ${activeLayer === 'immunome' ? 'bg-red-500/20 text-red-400' : 'bg-red-50 text-red-600'}`}>
                <Shield size={16} />
              </div>
              <span className="text-[9px] font-mono font-bold tracking-widest uppercase opacity-75">LAYER III</span>
            </div>
            <h5 className="text-xs font-bold font-sans">3. Immunomes</h5>
            <p className={`text-[10px] mt-1.5 line-clamp-2 ${activeLayer === 'immunome' ? 'text-neutral-300' : 'text-neutral-500'}`}>
              HPA axis chronic overdrive, hormonal stress saturation, and immune/cardiac decay.
            </p>
          </button>

          <button
            onClick={() => setActiveLayer('exposome')}
            className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden cursor-pointer ${
              activeLayer === 'exposome'
                ? 'bg-neutral-900 border-transparent text-white shadow-md'
                : 'bg-white border-neutral-200 text-[#444] hover:bg-neutral-50 hover:border-neutral-300'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-1.5 rounded-lg shrink-0 ${activeLayer === 'exposome' ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-50 text-amber-600'}`}>
                <Activity size={16} />
              </div>
              <span className="text-[9px] font-mono font-bold tracking-widest uppercase opacity-75">LAYER IV</span>
            </div>
            <h5 className="text-xs font-bold font-sans">4. Exposomes</h5>
            <p className={`text-[10px] mt-1.5 line-clamp-2 ${activeLayer === 'exposome' ? 'text-neutral-300' : 'text-neutral-500'}`}>
              Lifetime cumulative chemical and radiation burden from infancy through deep-time space.
            </p>
          </button>
        </div>

        {/* Selected Layer Expanded Display */}
        <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 font-sans">
          {activeLayer === 'genome' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
              <div className="lg:col-span-2 space-y-4">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-md border border-indigo-100 uppercase">
                  Subatomic DNA Interference
                </span>
                <h4 className="text-lg font-bold text-neutral-900">How Lead Perturbation Alters the Homo Sapiens Genome</h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  In an unperturbed state, human gene expression represents a highly stabilized, coherent thermodynamic system. However, Lead (Pb2+) mimics calcium (Ca2+) and zinc (Zn2+) with extreme chemical affinity. Upon entry into the cell nucleus, lead ions actively displace zinc from vital zinc-finger transcription proteins, disrupting DNA repair, transcription pathways, and triggering systemic epigenetic shifts.
                </p>
                <div className="bg-white p-4 rounded-xl border border-neutral-200/60 space-y-2">
                  <h5 className="text-xs font-bold text-neutral-800 flex items-center gap-1.5">
                    <Zap size={13} className="text-indigo-500 animate-pulse" />
                    The NOVA1 Evolutionary Divergence
                  </h5>
                  <p className="text-[11px] text-neutral-600 leading-normal">
                    Laser analysis of South African hominid teeth shows Neanderthals lacked the protective gene mutations of modern humans. When exposed to cave-fire smoke adjacent to lead outcroppings (as at Payre, France), Neanderthal brains suffered massive cognitive regression via the archaic NOVA1 gene, stunting long-range language planning, while Homo sapiens adapted a fragile, mutation-driven biological shield.
                  </p>
                </div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-neutral-200 space-y-3.5 flex flex-col justify-between">
                <div>
                  <h5 className="text-xs font-bold text-neutral-800 uppercase tracking-wider">Genomic Markers</h5>
                  <ul className="mt-3 space-y-2 text-[11px] text-neutral-600">
                    <li className="flex gap-2 items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1 shrink-0" />
                      <span><strong>NOVA1 Splicing</strong>: Crucial gene regulator of synaptic development.</span>
                    </li>
                    <li className="flex gap-2 items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1 shrink-0" />
                      <span><strong>DNA Methylation</strong>: High-density lead exposure locks down moral control loops via silent promoter hypermethylation.</span>
                    </li>
                    <li className="flex gap-2 items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1 shrink-0" />
                      <span><strong>Archaic Admixture</strong>: 1% to 3% Neanderthal genetics carry high sensitivity to heavy-metal environments.</span>
                    </li>
                  </ul>
                </div>
                {onNavigateTab && (
                  <div className="pt-3 border-t border-neutral-100 flex flex-col gap-1.5 font-mono text-[11px]">
                    <span className="text-[9px] text-neutral-400 font-bold uppercase">Explore Related Case Studies:</span>
                    <button onClick={() => onNavigateTab('indigenous')} className="text-emerald-700 hover:text-emerald-900 font-bold flex items-center justify-between hover:underline cursor-pointer">
                      <span>🪶 Indigenous Sovereignty</span> <ChevronRight size={12} />
                    </button>
                    <button onClick={() => onNavigateTab('nobel_nomination')} className="text-amber-700 hover:text-amber-900 font-bold flex items-center justify-between hover:underline cursor-pointer">
                      <span>🏆 Nobel Prize Nomination</span> <ChevronRight size={12} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeLayer === 'biome' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
              <div className="lg:col-span-2 space-y-4">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-md border border-emerald-100 uppercase">
                  Biogeochemical Transport Loops
                </span>
                <h4 className="text-lg font-bold text-neutral-900">Heavy Metal Diffusion and Atmospheric Searing</h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Heavy metals do not remain inert; they migrate through Earth's critical zones. The physical biome acts as a highly integrated transport conduit—funneling lead from subterranean lithospheric reserves into atmospheric suspension, soil saturation, and aquatic aquifers.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-neutral-200/60 space-y-1.5">
                    <h5 className="text-xs font-bold text-neutral-800 flex items-center gap-1.5">
                      <Droplet size={13} className="text-emerald-500" />
                      Water-Line Corrosion
                    </h5>
                    <p className="text-[11px] text-neutral-500 leading-normal">
                      Soft water, acidic rainfall, or chloramine additives corrode historical lead lines, feeding toxic Pb2+ ions into the domestic drinking supplies of municipal hubs.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-neutral-200/60 space-y-1.5">
                    <h5 className="text-xs font-bold text-neutral-800 flex items-center gap-1.5">
                      <Globe size={13} className="text-emerald-500" />
                      Soil Particulate Drift
                    </h5>
                    <p className="text-[11px] text-neutral-500 leading-normal">
                      Industrial paint flaking, smelting slag, and legacy leaded gasoline settling create high parts-per-million soil deposits that children inhale or ingest compulsively.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-neutral-200 space-y-3.5 flex flex-col justify-between">
                <div>
                  <h5 className="text-xs font-bold text-neutral-800 uppercase tracking-wider">Biogeochemical Vectors</h5>
                  <ul className="mt-3 space-y-2 text-[11px] text-neutral-600">
                    <li className="flex gap-2 items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
                      <span><strong>Uranium Decay Chain</strong>: Lead is the stable endpoint of radioactive radon-radium decays.</span>
                    </li>
                    <li className="flex gap-2 items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
                      <span><strong>Sapa Sweeteners</strong>: Historic boiling of acidic wines in lead pots creating lead acetate.</span>
                    </li>
                    <li className="flex gap-2 items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
                      <span><strong>Geophagy & Pica</strong>: Primates consuming lead-rich clays to counteract nutritional deficits.</span>
                    </li>
                  </ul>
                </div>
                {onNavigateTab && (
                  <div className="pt-3 border-t border-neutral-100 flex flex-col gap-1.5 font-mono text-[11px]">
                    <span className="text-[9px] text-neutral-400 font-bold uppercase">Municipal Water & Soil Audits:</span>
                    <button onClick={() => onNavigateTab('toledo')} className="text-amber-800 hover:text-black font-bold flex items-center justify-between hover:underline cursor-pointer">
                      <span>🏛️ Toledo 419 Audit</span> <ChevronRight size={12} />
                    </button>
                    <button onClick={() => onNavigateTab('cleveland')} className="text-neutral-800 hover:text-black font-bold flex items-center justify-between hover:underline cursor-pointer">
                      <span>🏭 Cleveland Audit</span> <ChevronRight size={12} />
                    </button>
                    <button onClick={() => onNavigateTab('buffalo')} className="text-neutral-800 hover:text-black font-bold flex items-center justify-between hover:underline cursor-pointer">
                      <span>🦬 Buffalo Audit</span> <ChevronRight size={12} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeLayer === 'immunome' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
              <div className="lg:col-span-2 space-y-4">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-red-50 text-red-700 rounded-md border border-red-100 uppercase">
                  Endocrine & Stress Overdrive
                </span>
                <h4 className="text-lg font-bold text-neutral-900">HPA Axis Saturation and Neuro-Immunological Chaos</h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Lead exposure acts as an inescapable, chronic stressor inside the human body. Because lead cannot be metabolized, the immune and endocrine systems remain in a state of permanent alert, generating extreme HPA (Hypothalamic-Pituitary-Adrenal) axis overdrive.
                </p>
                <div className="bg-white p-4 rounded-xl border border-neutral-200/60 space-y-2">
                  <h5 className="text-xs font-bold text-neutral-800 flex items-center gap-1.5">
                    <Brain size={13} className="text-red-500" />
                    Prefrontal Cortex Gray Matter Volume Atrophy
                  </h5>
                  <p className="text-[11px] text-neutral-600 leading-normal">
                    By blocking calcium entry channels, lead halts brain-derived neurotrophic factor (BDNF) synthesis. This results in direct physical shrinkage of the prefrontal gray matter—the biological seat of executive control, moral reasoning, and long-term consequences planning, causing impulsive, aggressive micro-behavior.
                  </p>
                </div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-neutral-200 space-y-3.5 flex flex-col justify-between">
                <div>
                  <h5 className="text-xs font-bold text-neutral-800 uppercase tracking-wider">Endocrine Pathology</h5>
                  <ul className="mt-3 space-y-2 text-[11px] text-neutral-600">
                    <li className="flex gap-2 items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1 shrink-0" />
                      <span><strong>HPA Overdrive</strong>: Excess adrenal cortisol output driving constant hyper-vigilance and rage.</span>
                    </li>
                    <li className="flex gap-2 items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1 shrink-0" />
                      <span><strong>Renal Tubular Damage</strong>: Direct heavy-metal obstruction of ATP-driven ion pumps in kidney cells.</span>
                    </li>
                    <li className="flex gap-2 items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1 shrink-0" />
                      <span><strong>Coronary Sclerosis</strong>: Accelerated arterial calcification leading to premature cardiovascular events.</span>
                    </li>
                  </ul>
                </div>
                {onNavigateTab && (
                  <div className="pt-3 border-t border-neutral-100 flex flex-col gap-1.5 font-mono text-[11px]">
                    <span className="text-[9px] text-neutral-400 font-bold uppercase">Metropolitan Cohort Audits:</span>
                    <button onClick={() => onNavigateTab('chicago')} className="text-red-700 hover:text-black font-bold flex items-center justify-between hover:underline cursor-pointer">
                      <span>🏙️ Chicago 395k Line Study</span> <ChevronRight size={12} />
                    </button>
                    <button onClick={() => onNavigateTab('milwaukee')} className="text-red-700 hover:text-black font-bold flex items-center justify-between hover:underline cursor-pointer">
                      <span>⚙️ Milwaukee Class Exposome</span> <ChevronRight size={12} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeLayer === 'exposome' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
              <div className="lg:col-span-2 space-y-4">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-amber-50 text-amber-700 rounded-md border border-amber-100 uppercase">
                  The Lifetime Sum of Insults
                </span>
                <h4 className="text-lg font-bold text-neutral-900">Tracking Total Anthropogenic Exposure Over Spacetime</h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  The Exposome represents the absolute sum of all non-genetic environmental exposures throughout a lifetime. Under Roulet's Law, this is expanded to the multi-generational scale, charting exposure across history, dietary profiles, and even cosmic transitions.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-white p-3 rounded-lg border border-neutral-200/60 text-center">
                    <span className="text-lg font-bold block text-neutral-850">800M</span>
                    <span className="text-[10px] text-neutral-500 font-sans uppercase">Children Poisoned Today</span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-neutral-200/60 text-center">
                    <span className="text-lg font-bold block text-neutral-850">16,000 ppm</span>
                    <span className="text-[10px] text-neutral-500 font-sans uppercase">Lead in Recycled Pots</span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-neutral-200/60 text-center">
                    <span className="text-lg font-bold block text-neutral-850">Bremsstrahlung</span>
                    <span className="text-[10px] text-neutral-500 font-sans uppercase">Space Shielding Paradox</span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-neutral-200 space-y-3.5 flex flex-col justify-between">
                <div>
                  <h5 className="text-xs font-bold text-neutral-800 uppercase tracking-wider">Multi-Generational Burden</h5>
                  <ul className="mt-3 space-y-2 text-[11px] text-neutral-600">
                    <li className="flex gap-2 items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1 shrink-0" />
                      <span><strong>Maternal Mobilization</strong>: Bones release stored childhood lead during pregnancy, poisoning fetuses.</span>
                    </li>
                    <li className="flex gap-2 items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1 shrink-0" />
                      <span><strong>Recycled Aluminum</strong>: Cottage industries smelting car batteries into cooking cookware.</span>
                    </li>
                    <li className="flex gap-2 items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1 shrink-0" />
                      <span><strong>Radon & Uranium</strong>: Heavy-metal decay gas accumulating in rural high-desert basements.</span>
                    </li>
                  </ul>
                </div>
                {onNavigateTab && (
                  <div className="pt-3 border-t border-neutral-100 flex flex-col gap-1.5 font-mono text-[11px]">
                    <span className="text-[9px] text-neutral-400 font-bold uppercase">Global Audits & Litigation:</span>
                    <button onClick={() => onNavigateTab('bihar')} className="text-amber-800 hover:text-black font-bold flex items-center justify-between hover:underline cursor-pointer">
                      <span>🌏 Bihar Lead Audit</span> <ChevronRight size={12} />
                    </button>
                    <button onClick={() => onNavigateTab('litigation')} className="text-amber-800 hover:text-black font-bold flex items-center justify-between hover:underline cursor-pointer">
                      <span>⚖️ Litigation Ledger</span> <ChevronRight size={12} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SECTION 3: INTERACTIVE REGRESSION SCATTERPLOT */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 shrink-0">
        
        {/* Left 2 Columns: The Master Scatterplot Chart */}
        <div className="xl:col-span-2 border border-neutral-200 bg-white rounded-2xl p-6 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h3 className="text-sm font-semibold tracking-tight uppercase flex items-center gap-2 text-neutral-900 font-sans">
                <TrendingUp size={16} className="text-red-500" />
                Exhibit 1: The Master Scatterplot of Human History
              </h3>
              <p className="text-xs text-neutral-500 font-sans mt-0.5">
                Regression curve showing Blood Lead Levels (BLL) vs. Violent Chaos Rates per 100,000 across cultures and epochs.
              </p>
            </div>
            
            <div className="flex items-center gap-3 text-[10px] font-mono text-neutral-500">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-900 block" /> Recorded Node
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 block animate-pulse" /> Active Epoch
              </span>
            </div>
          </div>

          {/* Recharts ScatterPlot */}
          <div className="h-80 bg-[#FAFAFA] rounded-xl border border-neutral-150 p-4 relative font-mono text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  type="number" 
                  dataKey="bll" 
                  name="Blood Lead Level" 
                  unit=" μg/dL" 
                  domain={[0, 45]}
                  tickLine={false}
                  axisLine={{ stroke: '#e5e5e5' }}
                />
                <YAxis 
                  type="number" 
                  dataKey="crimeRate" 
                  name="Violent Chaos Rate" 
                  unit=" /100k"
                  domain={[0, 700]}
                  tickLine={false}
                  axisLine={{ stroke: '#e5e5e5' }}
                />
                <ZAxis type="number" range={[100, 300]} />
                <Tooltip content={renderCustomTooltip} cursor={{ strokeDasharray: '3 3' }} />
                
                {/* Standard Data points */}
                <Scatter 
                  name="Regression Nodes" 
                  data={REGRESSION_DATA} 
                  fill="#171717"
                  shape={(props: any) => {
                    const { cx, cy, payload } = props;
                    const isActive = payload.name === selectedEpoch.title.split(': ')[1] || payload.name === selectedEpoch.title || payload.bll === selectedEpoch.bll;
                    return (
                      <circle 
                        cx={cx} 
                        cy={cy} 
                        r={isActive ? 8 : 5} 
                        fill={isActive ? '#EF4444' : '#111827'} 
                        stroke="#fff" 
                        strokeWidth={isActive ? 2 : 1}
                        className="transition-all duration-300 cursor-pointer"
                        title={payload.name}
                      />
                    );
                  }}
                />
              </ScatterChart>
            </ResponsiveContainer>
            
            {/* Legend indicators */}
            <div className="absolute top-2 left-2 text-[8px] text-neutral-400 font-mono tracking-wider">
              ▲ Violent Chaos Rate (per 100k)
            </div>
            <div className="absolute right-4 bottom-2 text-[8px] text-neutral-400 font-mono tracking-wider">
              🔴 Blood Lead Level (μg/dL) ▶
            </div>
          </div>

          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-150 flex flex-col md:flex-row gap-4 justify-between items-center text-xs font-sans">
            <div className="space-y-1">
              <h5 className="font-bold text-neutral-800">Dynamic Optimizer</h5>
              <p className="text-[10.5px] text-neutral-500">
                Adjust sliders below to test how deploying AI nodes or remediation capital alters the theoretical macro-chaos index of lead toxicity.
              </p>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <div className="flex-1 md:w-36 space-y-1">
                <div className="flex justify-between text-[10px] font-mono font-bold text-neutral-700">
                  <span>💰 Capital Budget</span>
                  <span>${remediationCapital}T</span>
                </div>
                <input 
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  value={remediationCapital}
                  onChange={(e) => setRemediationCapital(parseFloat(e.target.value))}
                  className="w-full accent-emerald-600 h-1 bg-neutral-200 rounded cursor-pointer"
                />
              </div>
              <div className="flex-1 md:w-36 space-y-1">
                <div className="flex justify-between text-[10px] font-mono font-bold text-neutral-700">
                  <span>⚙️ Sovereign AI</span>
                  <span>{sovereignCompute}%</span>
                </div>
                <input 
                  type="range"
                  min="0"
                  max="100"
                  value={sovereignCompute}
                  onChange={(e) => setSovereignCompute(parseInt(e.target.value))}
                  className="w-full accent-sky-600 h-1 bg-neutral-200 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Historical Timelines Picker & Analysis */}
        <div className="border border-neutral-200 bg-white rounded-2xl p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <h3 className="text-xs font-mono text-[#999] uppercase tracking-widest">Historical Evidence Selector</h3>
            <h4 className="text-lg font-serif font-light text-neutral-900">Audit Epochs Timeline</h4>
            <p className="text-xs text-neutral-500 font-sans leading-relaxed">
              Click any of the validated historical eras to review specific lead perturbation indices ($H'$) and compare localized societal consequences.
            </p>
          </div>

          <div className="space-y-2 flex-1 overflow-y-auto max-h-64 pr-1">
            {HISTORICAL_EPOCHS.map((epoch) => {
              const isSelected = selectedEpoch.title === epoch.title;
              return (
                <button
                  key={epoch.year}
                  onClick={() => setSelectedEpoch(epoch)}
                  className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-neutral-900 border-transparent text-white shadow-sm font-semibold'
                      : 'bg-white border-neutral-150 hover:bg-neutral-50 text-neutral-700'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded ${isSelected ? 'bg-red-500/25 text-red-200' : 'bg-neutral-100 text-neutral-500'}`}>
                        {epoch.year}
                      </span>
                      <span className="text-[10px] font-bold line-clamp-1">{epoch.title.split(': ')[1] || epoch.title}</span>
                    </div>
                    <p className={`text-[10px] font-sans ${isSelected ? 'text-neutral-400' : 'text-neutral-500'}`}>{epoch.location}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`text-xs font-mono font-bold block ${isSelected ? 'text-amber-400' : 'text-neutral-800'}`}>
                      {epoch.bll} μg/dL
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-neutral-100 text-[10px] text-neutral-400 font-mono flex items-center justify-between">
            <span>6 EPOCHS FULLY SYNCHRONIZED</span>
            <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
              <Shield size={11} /> VERIFIED BY ICEARTH
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 4: SELECTED EPOCH DEEP ANALYSIS PANEL */}
      <div className="bg-neutral-950 text-white rounded-3xl p-8 relative overflow-hidden shrink-0">
        <div className="absolute right-0 bottom-0 w-80 h-80 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-0 top-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
          
          {/* Column A: Epoch Summary & Formula */}
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <span>{selectedEpoch.year}</span>
              <span>•</span>
              <span className="uppercase">{selectedEpoch.location}</span>
            </div>
            
            <h3 className="text-2xl font-serif font-light text-white">
              {selectedEpoch.title}
            </h3>
            
            <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl space-y-1 font-mono">
              <span className="text-[9px] text-neutral-400 uppercase tracking-widest block">Perturbation Configuration Equation</span>
              <span className="text-xs font-bold text-red-400">{selectedEpoch.formula}</span>
            </div>

            <p className="text-xs text-neutral-300 font-sans leading-relaxed whitespace-pre-line">
              {selectedEpoch.narrative}
            </p>

            <div className="pt-4 border-t border-neutral-850 grid grid-cols-2 gap-4 text-xs font-sans">
              <div>
                <span className="text-neutral-400 uppercase text-[9px] font-mono block">Consequence Assessment</span>
                <p className="text-neutral-300 leading-normal mt-1">{selectedEpoch.consequence}</p>
              </div>
              <div className="p-4 bg-neutral-900 border border-dashed border-neutral-800 rounded-xl space-y-1 flex flex-col justify-center">
                <span className="text-neutral-400 uppercase text-[9px] font-mono block">Homo Sapiens 0 Proximity</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg font-bold font-mono text-emerald-400">{outputs.proximity}%</span>
                  <span className="text-[9px] text-neutral-500">of clean baseline</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column B: Live Simulated Results Based on Dynamic Optimizer */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="pb-3 border-b border-neutral-800">
                <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400">
                  Simulated Roulet's Law Output
                </h4>
                <p className="text-[10px] text-neutral-500 mt-1">
                  Modeling remediation buffers onto the selected {selectedEpoch.year} lead perturbation baseline.
                </p>
              </div>

              {/* Dynamic Metric 1 */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-400">Prefrontal Cortex Gray Matter</span>
                  <span className="font-mono text-emerald-400 font-bold">{outputs.pfcGrayMatter}%</span>
                </div>
                <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full transition-all duration-500" 
                    style={{ width: `${outputs.pfcGrayMatter}%` }}
                  />
                </div>
              </div>

              {/* Dynamic Metric 2 */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-400">HPA Axis Stress Overdrive</span>
                  <span className="font-mono text-red-400 font-bold">{outputs.hpaOverdrive}%</span>
                </div>
                <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-red-500 h-full transition-all duration-500" 
                    style={{ width: `${outputs.hpaOverdrive}%` }}
                  />
                </div>
              </div>

              {/* Dynamic Metric 3 */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-400">Simulated Crime rate / 100k</span>
                  <span className="font-mono text-amber-400 font-bold">{outputs.simulatedChaos}</span>
                </div>
                <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-amber-500 h-full transition-all duration-500" 
                    style={{ width: `${Math.min(100, (outputs.simulatedChaos / 700) * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-[9px] font-mono text-neutral-500">
              <span>STATUS: REALTIME COMPILE</span>
              <span className="text-sky-400 font-semibold flex items-center gap-0.5">
                <Zap size={10} className="animate-pulse" /> QUANTUM SOLVER LIVE
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* SECTION 5: MATHEMATICAL PROOFS DECONSTRUCTION */}
      <div className="p-6 border border-neutral-200 rounded-2xl bg-[#FCFCFC] space-y-4 font-sans shrink-0">
        <h4 className="text-sm font-semibold uppercase tracking-tight flex items-center gap-2 text-neutral-900">
          <BookOpen size={16} className="text-emerald-600" />
          The Thermodynamic Formalism of Roulet's Law
        </h4>
        <p className="text-xs text-neutral-600 leading-relaxed">
          Traditional criminology isolates the Lead-Crime Hypothesis as an atmospheric lead-to-arrest correlation. Roulet's Law expands this scope into a unified quantum-biological equation. Under this formalism, heavy-metal perturbation introduces a permanent quantum noise offset ($\delta$) at the level of the Heisenberg Uncertainty Principle within the human nervous system:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 bg-white border border-neutral-200 rounded-xl space-y-2">
            <span className="text-[10px] font-bold text-red-600 uppercase block">The Perturbation Tensor (H')</span>
            <p className="text-neutral-500 leading-relaxed text-[11px]">
              Defines the cumulative multi-generational concentration of subatomic pollutants (Pb, PFAS) acting upon biological systems. As $H'$ increases, calcium ion pathways are occupied, inhibiting BDNF synthesis and inducing structural gray matter atrophy.
            </p>
          </div>
          <div className="p-4 bg-white border border-neutral-200 rounded-xl space-y-2">
            <span className="text-[10px] font-bold text-emerald-600 uppercase block">The Homo Sapiens 0 Standard (0.016 μg/dL)</span>
            <p className="text-neutral-500 leading-relaxed text-[11px]">
              The absolute un-perturbed chemical baseline of human evolutionary development. When the environmental perturbation approaches zero ($H' \to 0.016$), subatomic noise decays, returning genomes, biomes, and immunomes to thermodynamic homeostasis.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
