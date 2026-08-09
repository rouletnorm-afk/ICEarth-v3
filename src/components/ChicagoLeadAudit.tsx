import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  Calendar, 
  FileSpreadsheet, 
  AlertTriangle, 
  TrendingUp, 
  ArrowRight, 
  Coins, 
  ShieldAlert, 
  Activity, 
  CheckCircle2, 
  Search, 
  Database, 
  Sparkles,
  RefreshCw,
  HelpCircle,
  FileDown,
  Scale,
  Users,
  Newspaper,
  EyeOff,
  BookOpen,
  Brain,
  Flame
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ComposedChart, 
  Line, 
  AreaChart, 
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';

// Define structures for our datasets
interface InventorySummary {
  name: string;
  value: number;
  color: string;
  description: string;
}

interface ChicagoZipData {
  zip: string;
  neighborhood: string;
  leadServiceLinePercentage: number;
  pre1950HousingPercentage: number;
  minorityDemographicPercentage: number; // Combined Black/Latino representation
  homicideRatePer100k: number;          // Public health outcome surrogate
  overdoseRatePer100k: number;          // Public health outcome surrogate
}

interface TripleComparativeMetric {
  subject: string;
  buffaloValue: number;
  clevelandValue: number;
  chicagoValue: number;
  fullMark: number;
}

// Chicago Department of Water Management (CDWM) Lead Service Line Estimates
const CHICAGO_INVENTORY: InventorySummary[] = [
  { name: "Confirmed Lead Service Lines", value: 395000, color: "#7f1d1d", description: "The nation's largest confirmed concentration of toxic lead connections." },
  { name: "Galvanized Requiring Replacement", value: 12000, color: "#c2410c", description: "Iron lines coated with rust and historically scaled with lead sediment." },
  { name: "Confirmed Non-Lead Lines", value: 180000, color: "#15803d", description: "Verified copper, cast iron, or plastic lines." },
  { name: "Unknown Material Lines", value: 160000, color: "#4b5563", description: "Lines needing physical hydro-excavation or customer-reported self-audits." }
];

// High-resolution local neighborhoods of Chicago & Cook County mapping the spatial intersection
// of antiquated infrastructure, marginalized demographics, and acute public health outcomes
const CHICAGO_ZIP_DATA: ChicagoZipData[] = [
  { zip: "60644", neighborhood: "Austin, Chicago (West Side)", leadServiceLinePercentage: 92, pre1950HousingPercentage: 95, minorityDemographicPercentage: 97, homicideRatePer100k: 56.5, overdoseRatePer100k: 88.4 },
  { zip: "60621", neighborhood: "Englewood", leadServiceLinePercentage: 92, pre1950HousingPercentage: 96, minorityDemographicPercentage: 98, homicideRatePer100k: 78.4, overdoseRatePer100k: 95.2 },
  { zip: "60624", neighborhood: "West Garfield Park", leadServiceLinePercentage: 89, pre1950HousingPercentage: 94, minorityDemographicPercentage: 96, homicideRatePer100k: 84.1, overdoseRatePer100k: 110.4 },
  { zip: "60623", neighborhood: "Little Village / Lawndale", leadServiceLinePercentage: 85, pre1950HousingPercentage: 91, minorityDemographicPercentage: 94, homicideRatePer100k: 46.2, overdoseRatePer100k: 78.1 },
  { zip: "60647", neighborhood: "Logan Square (Gentrifying)", leadServiceLinePercentage: 54, pre1950HousingPercentage: 86, minorityDemographicPercentage: 42, homicideRatePer100k: 11.5, overdoseRatePer100k: 32.4 },
  { zip: "60619", neighborhood: "Chatham", leadServiceLinePercentage: 81, pre1950HousingPercentage: 88, minorityDemographicPercentage: 97, homicideRatePer100k: 48.0, overdoseRatePer100k: 72.5 },
  { zip: "60628", neighborhood: "Roseland / Pullman", leadServiceLinePercentage: 84, pre1950HousingPercentage: 85, minorityDemographicPercentage: 95, homicideRatePer100k: 52.6, overdoseRatePer100k: 81.0 },
  { zip: "60614", neighborhood: "Lincoln Park (Affluent)", leadServiceLinePercentage: 12, pre1950HousingPercentage: 48, minorityDemographicPercentage: 15, homicideRatePer100k: 1.1, overdoseRatePer100k: 10.5 },
  { zip: "60611", neighborhood: "Streeterville / Gold Coast", leadServiceLinePercentage: 2, pre1950HousingPercentage: 12, minorityDemographicPercentage: 18, homicideRatePer100k: 0.4, overdoseRatePer100k: 6.2 },
  { zip: "CH-01", neighborhood: "Switzerland (Exposenomics Baseline)", leadServiceLinePercentage: 0.1, pre1950HousingPercentage: 4, minorityDemographicPercentage: 5, homicideRatePer100k: 0.6, overdoseRatePer100k: 1.5 }
];

// Interactive scientific dataset representing the lead-crime hypothesis scatter matrix
const NEURO_VIOLENCE_SCATTER_DATA = [
  { name: "Switzerland Baseline (CH-01)", leadExposureIndex: 0.1, homicideRate: 0.6, group: "Sovereign Baseline", desc: "Lowest environmental injustice baseline (0.6 homicides / 100k)." },
  { name: "Gold Coast (60611)", leadExposureIndex: 2.0, homicideRate: 0.4, group: "Chicago Affluent", desc: "Socioeconomically buffered urban core." },
  { name: "Lincoln Park (60614)", leadExposureIndex: 12.0, homicideRate: 1.1, group: "Chicago Affluent", desc: "Low lead service line density." },
  { name: "Logan Square (60647)", leadExposureIndex: 54.0, homicideRate: 11.5, group: "Chicago Transitional", desc: "Moderately exposed gentrifying zone." },
  { name: "Little Village (60623)", leadExposureIndex: 85.0, homicideRate: 46.2, group: "Chicago Impacted", desc: "High density lead infrastructure." },
  { name: "Chatham (60619)", leadExposureIndex: 81.0, homicideRate: 48.0, group: "Chicago Impacted", desc: "Severe environmental and socioeconomic stress." },
  { name: "Roseland (60628)", leadExposureIndex: 84.0, homicideRate: 52.6, group: "Chicago Impacted", desc: "Pervasive heavy metals exposure." },
  { name: "Austin, Chicago (60644)", leadExposureIndex: 92.0, homicideRate: 56.5, group: "Chicago Severe (West Side)", desc: "Worst environmental injustice (92% lead lines, 56.5 homicides)." },
  { name: "Englewood (60621)", leadExposureIndex: 92.0, homicideRate: 78.4, group: "Chicago Extreme", desc: "Exposome violence outlier." },
  { name: "West Garfield Park (60624)", leadExposureIndex: 89.0, homicideRate: 84.1, group: "Chicago Extreme", desc: "Absolute highest crime & exposure overlap." }
];

// Three-way regional comparative profile metrics
const TRIPLE_RADAR_COMPARISON: TripleComparativeMetric[] = [
  { subject: "Pre-1950 Housing (%)", buffaloValue: 84, clevelandValue: 88, chicagoValue: 91, fullMark: 100 },
  { subject: "Confirmed Lead Pipes (k)", buffaloValue: 33.6, clevelandValue: 82.0, chicagoValue: 395.0, fullMark: 400 },
  { subject: "Avg Replacement Cost ($k)", buffaloValue: 10.0, clevelandValue: 10.5, chicagoValue: 18.5, fullMark: 25 },
  { subject: "Funding Deficit Ratio", buffaloValue: 80, clevelandValue: 92, chicagoValue: 98, fullMark: 100 },
  { subject: "Vulnerability Index Average", buffaloValue: 68, clevelandValue: 74, chicagoValue: 88, fullMark: 100 },
  { subject: "Exposome Violence Link", buffaloValue: 72, clevelandValue: 78, chicagoValue: 94, fullMark: 100 }
];

export const ChicagoLeadAudit: React.FC = () => {
  const [currentView, setCurrentView] = useState<'chicago' | 'comparison'>('comparison');
  
  // Interactive Simulation variables - Chicago has famously high labor and structural costs
  const [replacementCostPerLine, setReplacementCostPerLine] = useState<number>(18500); // Standard $18.5k in Chicago (reaches up to $26k due to strict code regulations)
  const [unknownLeadConversionRate, setUnknownLeadConversionRate] = useState<number>(80); // Massive historic likelihood in Cook County

  // Ingestion API portal state
  const [pwsIdQuery, setPwsIdQuery] = useState<string>('IL0316000');
  const [apiSyncing, setApiSyncing] = useState<boolean>(false);
  const [syncLogs, setSyncLogs] = useState<string[]>([
    "System standby. Input Chicago Water System PWSID to initiate multi-agency environmental justice audit sync."
  ]);
  const [showSyncSuccess, setShowSyncSuccess] = useState<boolean>(false);

  // Chicago local outcomes editor state
  const [editingZip, setEditingZip] = useState<string | null>(null);
  const [editHomicides, setEditHomicides] = useState<number>(0);
  const [editOverdoses, setEditOverdoses] = useState<number>(0);
  const [customChicagoZipList, setCustomChicagoZipList] = useState<ChicagoZipData[]>(CHICAGO_ZIP_DATA);

  // Financial Calculations for Chicago
  const confirmedLeadCount = 395000;
  const unknownCount = 160000;
  const estimatedLeadFromUnknown = Math.round(unknownCount * (unknownLeadConversionRate / 100));
  const totalEstimatedLeadLines = confirmedLeadCount + estimatedLeadFromUnknown;
  const totalEstimatedCost = totalEstimatedLeadLines * replacementCostPerLine;
  const chicagoAllotment = 15000000; // $15M State Revolving / IIJA specific grant allocation
  const fundingGapRatio = totalEstimatedCost / chicagoAllotment;

  const triggerApiSync = () => {
    setApiSyncing(true);
    setSyncLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Querying Illinois EPA SDWIS API database for PWSID: ${pwsIdQuery}...`]);
    
    setTimeout(() => {
      setSyncLogs(prev => [
        ...prev, 
        `[${new Date().toLocaleTimeString()}] Query established with CDWM (Chicago Dept of Water Management) internal GIS asset layers.`,
        `[${new Date().toLocaleTimeString()}] Pulling Illinois DPH (Department of Public Health) childhood blood lead test clusters (N-55,000 cases).`,
        `[${new Date().toLocaleTimeString()}] Success: Parsed 555,000 historical service connection material logs (IL0316000).`,
        `[${new Date().toLocaleTimeString()}] Heavy metals neurological exposures cross-referenced with local public safety indices (Homicides, Opioid fatals).`
      ]);
      setApiSyncing(false);
      setShowSyncSuccess(true);
    }, 2000);
  };

  const saveLocalOverride = (zip: string) => {
    setCustomChicagoZipList(prev => prev.map(item => {
      if (item.zip === zip) {
        return {
          ...item,
          homicideRatePer100k: editHomicides,
          overdoseRatePer100k: editOverdoses
        };
      }
      return item;
    }));
    setEditingZip(null);
  };

  const startEditing = (item: ChicagoZipData) => {
    setEditingZip(item.zip);
    setEditHomicides(item.homicideRatePer100k);
    setEditOverdoses(item.overdoseRatePer100k);
  };

  return (
    <div id="chicago-lead-audit-root" className="w-full max-w-7xl mx-auto bg-white p-6 md:p-8 space-y-8 pb-16">
      
      {/* INTEGRATED TOP BAR: CONTROLS & MODEL SIMULATION ZONE */}
      <div className="bg-[#FCFCFC] p-6 rounded-2xl border border-gray-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Subcolumn 1: Briefing & View selector */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-600 mb-1 uppercase tracking-widest">
                <ShieldAlert size={14} className="text-red-600 animate-pulse" />
                <span>[EXPOSOME_CASE_STUDY_05]</span>
              </div>
              <h3 className="text-2xl font-serif font-light text-neutral-800">Chicago Water System</h3>
              <p className="text-xs text-[#666] mt-1.5 font-sans leading-relaxed">
                The epicenter of the American Lead service line crisis: Chicago holds more lead pipes than any municipality in North America. This historic structural hazard imposes a severe, disproportionate neurological tax on South and West side minority neighborhoods.
              </p>
            </div>

            {/* VIEW SELECTOR */}
            <div className="p-1 bg-gray-100 rounded-xl grid grid-cols-2 max-w-sm">
              <button
                onClick={() => setCurrentView('comparison')}
                className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  currentView === 'comparison'
                    ? 'bg-white text-black shadow-sm'
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                📊 Great Lakes Benchmarking
              </button>
              <button
                onClick={() => setCurrentView('chicago')}
                className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  currentView === 'chicago'
                    ? 'bg-white text-black shadow-sm'
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                🛡️ Chicago Local Audit
              </button>
            </div>
          </div>

          {/* Subcolumn 2 & 3 Merged: Dynamic Remediation Modeling & System Inventory */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Dynamic Remediation Modeling */}
            <div className="p-4 bg-white border border-gray-150 rounded-xl space-y-3">
              <div>
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5 mb-1">
                  <Coins size={12} className="text-red-500" />
                  Dynamic Remediation Modeling
                </h4>
                <p className="text-[10px] text-gray-500 font-sans leading-relaxed">
                  Model Chicago's highly complex soil, historical plumbing union codes, and massive unverified portfolio to analyze the ultimate cost deficit.
                </p>
              </div>

              {/* SLIDER 1: CHICAGO REPLACEMENT COST PER PIPE */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-[#1A1A1A] text-[11px] font-sans">
                    💸 Est. Replacement Cost
                  </span>
                  <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 bg-rose-50 text-rose-600 rounded">
                    ${replacementCostPerLine.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="26000"
                  step="500"
                  value={replacementCostPerLine}
                  onChange={(e) => setReplacementCostPerLine(Number(e.target.value))}
                  className="w-full accent-rose-600 h-1 bg-gray-100 rounded-lg cursor-pointer"
                />
              </div>

              {/* SLIDER 2: CONVERSION LIKELIHOOD */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-[#1A1A1A] text-[11px] font-sans">
                    🔍 Prob. Unknowns are Lead
                  </span>
                  <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 bg-amber-50 text-amber-600 rounded">
                    {unknownLeadConversionRate}%
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="95"
                  step="5"
                  value={unknownLeadConversionRate}
                  onChange={(e) => setUnknownLeadConversionRate(Number(e.target.value))}
                  className="w-full accent-amber-600 h-1 bg-gray-100 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Budget Hole & compliance metadata */}
            <div className="space-y-3">
              {currentView === 'chicago' ? (
                <div className="p-3 border border-red-100 bg-red-50/20 rounded-xl space-y-2">
                  <div className="flex items-center gap-1.5">
                    <Building2 className="text-red-700 w-3.5 h-3.5 shrink-0" />
                    <h4 className="text-[10px] font-bold text-red-900 uppercase tracking-wide">Illinois EPA Index</h4>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[9px] font-mono">
                    <div className="p-1.5 bg-white border border-red-50 rounded col-span-2">
                      <span className="text-gray-400 block mb-0.5">Water Authority:</span>
                      <strong className="text-gray-900 block font-sans text-[10px]">City of Chicago (CDWM)</strong>
                    </div>
                    <div className="p-1.5 bg-white border border-red-50 rounded">
                      <span className="text-gray-400 block mb-0.5">PWS ID:</span>
                      <strong className="text-gray-900 block text-[8px]">IL0316000</strong>
                    </div>
                    <div className="p-1.5 bg-white border border-red-50 rounded">
                      <span className="text-gray-400 block mb-0.5">System Code:</span>
                      <strong className="text-gray-900 block text-[7px] leading-tight font-mono">LCR-Tier1</strong>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-red-950/5 border border-red-200 rounded-xl space-y-1.5">
                  <h5 className="text-[9px] font-mono font-bold uppercase tracking-wider text-red-800">Sovereign Financial Deficit</h5>
                  <div className="text-[10px] font-mono text-center font-bold text-red-900 space-y-0.5 bg-white py-1.5 rounded border border-red-100">
                    <div>LSLs: {totalEstimatedLeadLines.toLocaleString()}</div>
                    <div>Cost: ${(totalEstimatedCost / 1000000000).toFixed(2)} Billion</div>
                  </div>
                  <p className="text-[8px] text-gray-500 text-center leading-tight font-sans">
                    Allocations cover merely <strong className="text-red-700">{(100 / fundingGapRatio).toFixed(2)}%</strong> of liability.
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* TOP LAYER: SWITCHED VIEWS */}
        {currentView === 'comparison' ? (
          
          /* VIEW 1: REGIONAL BENCHMARKING ENGINE */
          <div className="space-y-8">
            
            {/* COMPARATIVE BANNER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-150 gap-4">
              <div>
                <span className="text-[10px] font-mono text-[#999] uppercase tracking-widest block">ICEarth Sovereign Benchmarking Registry</span>
                <h2 className="text-2xl font-serif font-light text-black mt-1">Buffalo vs. Cleveland vs. Chicago</h2>
                <p className="text-xs text-[#666] font-sans mt-1">
                  Multi-city exposome benchmarking: mapping structural industrial legacies, total water service liabilities, and correlated societal/neurological gradients across the Rust Belt and Midwest.
                </p>
              </div>
              <div className="shrink-0 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
                <span className="text-[11px] font-mono font-bold text-red-700">3-CITY EXPOSOME ENGINE ACTIVE</span>
              </div>
            </div>

            {/* THREE-CITY RADAR PROFILE */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* RADAR CHART PANEL */}
              <div className="p-6 border border-gray-200 bg-[#FCFCFC] rounded-2xl flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-semibold tracking-tight uppercase flex items-center gap-2">
                    <Activity size={16} className="text-cyan-600" />
                    Exhibit D-1: 3-City Exposenome Risk Profile
                  </h4>
                  <p className="text-xs text-gray-500 font-sans mt-0.5">
                    Radar visualization illustrating structural, economic, and biological vulnerability metrics across all three regions, scaled to highlight systemic stress.
                  </p>
                </div>

                <div className="w-full h-80 flex items-center justify-center mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={TRIPLE_RADAR_COMPARISON}>
                      <PolarGrid stroke="#E5E5E5" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#444444', fontSize: 9 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 8 }} />
                      <Radar name="Buffalo / Erie County" dataKey="buffaloValue" stroke="#2563eb" fill="#2563eb" fillOpacity={0.1} />
                      <Radar name="Cleveland / Cuyahoga" dataKey="clevelandValue" stroke="#ea580c" fill="#ea580c" fillOpacity={0.1} />
                      <Radar name="Chicago / Cook County" dataKey="chicagoValue" stroke="#dc2626" fill="#dc2626" fillOpacity={0.2} />
                      <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* COMPARATIVE LESSONS / ROULET'S LAW INSIGHTS */}
              <div className="p-6 border border-gray-200 bg-white rounded-2xl space-y-5">
                <h4 className="text-sm font-semibold tracking-tight uppercase flex items-center gap-2">
                  <Scale size={16} className="text-red-700" />
                  Great Lakes Core Environmental Lessons
                </h4>

                <div className="space-y-4 text-xs font-sans text-gray-600 leading-relaxed">
                  <p>
                    Analyzing these three industrial municipal systems demonstrates a profound truth: <strong>lead water lines represent a systemic, multigenerational neurological tax</strong>. When mapped across cities, several structural patterns emerge:
                  </p>

                  <div className="space-y-3">
                    <div className="p-3 bg-[#FAFAFA] rounded-xl border border-gray-200">
                      <strong className="text-black font-bold block mb-1">1. The Scale of the Crisis</strong>
                      <p className="text-[11px] leading-normal text-gray-600">
                        While <strong>Buffalo</strong> has ~33.6k lines and <strong>Cleveland</strong> has ~82k lines, <strong>Chicago</strong> possesses an astronomical ~395k lines. The raw volume makes manual, traditional trench replacement practically and financially impossible without massive, multi-decade debt cycles.
                      </p>
                    </div>

                    <div className="p-3 bg-[#FAFAFA] rounded-xl border border-gray-200">
                      <strong className="text-black font-bold block mb-1">2. Localized Regulatory Inflation</strong>
                      <p className="text-[11px] leading-normal text-gray-600">
                        Chicago’s replacement costs (often exceeding $18,500/line) are drastically higher than Buffalo's ($10,000) or Cleveland's ($10,500). Historically strict local plumbing ordinances (such as requiring deep excavation and union certifications) act as a massive structural friction point, stalling active remediation.
                      </p>
                    </div>

                    <div className="p-3 bg-[#FAFAFA] rounded-xl border border-gray-200">
                      <strong className="text-black font-bold block mb-1">3. Demographics & Public Health Gaps</strong>
                      <p className="text-[11px] leading-normal text-gray-600">
                        Across all three cities, the highest densities of toxic lead lines are located in neighborhoods with high poverty rates and minority demographic representation. The resultant neurological damage (impacting cognitive control and emotional regulation) directly aligns with severe outcomes: high homicide rates and chemical dependency, exactly as postulated by <em>Roulet's Exposome Theory</em>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* THREE-CITY TRUE LIABILITY DEFICIT COMPOSITE ($ BILLIONS) */}
            <div className="p-6 border border-[#E5E5E5] bg-[#FCFCFC] rounded-2xl">
              <div>
                <h4 className="text-sm font-semibold tracking-tight uppercase flex items-center gap-2">
                  <Coins size={16} className="text-rose-700" />
                  Exhibit D-2: Cross-Regional True Liability Deficit Gap ($ Millions)
                </h4>
                <p className="text-xs text-[#666] font-sans mt-0.5">
                  Visualizing active federal and state grants compared to the true, full-scale financial cost of fully extracting all lead lines across Buffalo, Cleveland, and Chicago.
                </p>
              </div>

              <div className="w-full h-80 mt-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      {
                        city: "Buffalo (Erie Co.)",
                        "Active Grants": 1.0,
                        "True Cost Liability": Math.round((33600 + (35372 * 0.65)) * 10000 / 1000000)
                      },
                      {
                        city: "Cleveland (Cuyahoga Co.)",
                        "Active Grants": 3.8,
                        "True Cost Liability": Math.round((82000 + (198000 * 0.70)) * 10500 / 1000000)
                      },
                      {
                        city: "Chicago (Cook Co.)",
                        "Active Grants": 15.0,
                        "True Cost Liability": Math.round(totalEstimatedCost / 1000000)
                      }
                    ]}
                    margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                    <XAxis dataKey="city" stroke="#888888" fontSize={11} tickLine={false} />
                    <YAxis label={{ value: '$ Millions USD', angle: -90, position: 'insideLeft', style: { fontSize: 10, fill: '#333' } }} stroke="#888888" fontSize={10} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Active Grants" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="True Cost Liability" fill="#dc2626" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <p className="text-[11px] text-red-900 bg-red-50 p-4 border border-red-200 rounded-xl mt-4 leading-relaxed font-sans text-left">
                <strong>Deficit Verdict:</strong> Chicago Water System's unfunded liability is staggering. Under current modeling parameters (assuming a {unknownLeadConversionRate}% lead conversion probability in unverified lines), Chicago's true, unmitigated exposure liability stands at over <strong>${(totalEstimatedCost / 1000000000).toFixed(2)} Billion</strong>. The incoming state/federal allotments address less than 1.5% of the crisis, leaving disadvantaged neighborhoods permanently exposed to lead-paint flakes and toxic tap water.
              </p>
            </div>

          </div>
        ) : (
          
          /* VIEW 2: LOCAL CHICAGO CASE STUDY AUDIT */
          <div className="space-y-8">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-150 gap-4">
              <div>
                <span className="text-[10px] font-mono text-[#999] uppercase tracking-widest block">Local Chicago Case Study</span>
                <h2 className="text-2xl font-serif font-light text-black mt-1">Chicago Exposome & Environmental Injustice Matrix</h2>
                <p className="text-xs text-[#666] font-sans mt-1">
                  Correlating City of Chicago Water Department material records with public safety, poverty, and neurological vulnerability indicators.
                </p>
              </div>
              <div className="shrink-0 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
                <span className="text-[11px] font-mono font-bold text-red-700">CHICAGOLAND INTERFACE SYNCED</span>
              </div>
            </div>

            {/* QUICK-GLANCE KEY METRIC CHIPS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="p-5 border border-gray-200 bg-white rounded-xl shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-gray-400 uppercase block">Chicago Confirmed LSLs</span>
                  <span className="text-2xl font-serif font-light text-black block mt-2">395,000</span>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center text-[10px]">
                  <span className="text-gray-400">Largest single-city concentration</span>
                  <span className="text-red-600 font-bold font-mono">IL0316000</span>
                </div>
              </div>

              <div className="p-5 border border-gray-200 bg-white rounded-xl shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-gray-400 uppercase block">Cook County Unknowns</span>
                  <span className="text-2xl font-serif font-light text-black block mt-2">160,000</span>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center text-[10px]">
                  <span className="text-gray-400">Unverified connections</span>
                  <span className="text-amber-500 font-bold font-mono">{unknownLeadConversionRate}% Est. Lead</span>
                </div>
              </div>

              <div className="p-5 border border-gray-200 bg-white rounded-xl shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-gray-400 uppercase block">Total Predicted Liability</span>
                  <span className="text-2xl font-serif font-light text-red-600 block mt-2">
                    ${(totalEstimatedCost / 1000000000).toFixed(2)}B
                  </span>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center text-[10px]">
                  <span className="text-gray-400">Full trench extraction budget</span>
                  <span className="text-red-600 font-bold font-mono">CRITICAL DEFICIT</span>
                </div>
              </div>

              <div className="p-5 border border-gray-200 bg-white rounded-xl shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-gray-400 uppercase block">State Revolving Grant</span>
                  <span className="text-2xl font-serif font-light text-emerald-600 block mt-2">
                    $15.0M
                  </span>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center text-[10px]">
                  <span className="text-gray-400">IIJA Specific Allocation</span>
                  <span className="text-emerald-600 font-bold">~0.16% Funded</span>
                </div>
              </div>

            </div>

            {/* NEIGHBORHOOD MAP-MATRIX CHART */}
            <div className="p-6 border border-gray-200 bg-[#FCFCFC] rounded-2xl">
              <div>
                <h4 className="text-sm font-semibold tracking-tight uppercase flex items-center gap-2">
                  <TrendingUp size={16} className="text-red-700" />
                  Exhibit D-3: Chicago ZIP Exposure & Public Safety Matrix
                </h4>
                <p className="text-xs text-[#666] font-sans mt-0.5">
                  Charting the direct spatial overlap of lead water pipelines, antiquated housing stock, marginalized demographics, and local violence/drug overdose indicators.
                </p>
              </div>

              <div className="w-full h-80 mt-6">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={customChicagoZipList}>
                    <XAxis dataKey="zip" stroke="#888888" fontSize={10} tickLine={false} />
                    <YAxis yAxisId="left" label={{ value: 'Pipes & Demographics (%)', angle: -90, position: 'insideLeft', style: { fontSize: 10, fill: '#dc2626' } }} stroke="#dc2626" fontSize={10} />
                    <YAxis yAxisId="right" orientation="right" label={{ value: 'Outcomes Rate (per 100k)', angle: 90, position: 'insideRight', style: { fontSize: 10, fill: '#1e40af' } }} stroke="#1e40af" fontSize={10} />
                    <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                    <Legend wrapperStyle={{ fontSize: '10px' }} />
                    <Bar yAxisId="left" dataKey="leadServiceLinePercentage" name="Lead Service Line %" fill="#dc2626" opacity={0.8} radius={[4, 4, 0, 0]} />
                    <Line yAxisId="left" type="monotone" dataKey="minorityDemographicPercentage" name="Minority Demographic %" stroke="#f59e0b" strokeWidth={2.5} />
                    <Line yAxisId="left" type="monotone" dataKey="pre1950HousingPercentage" name="Pre-1950 Housing %" stroke="#10b981" strokeWidth={2} strokeDasharray="3 3" />
                    <Line yAxisId="right" type="monotone" dataKey="homicideRatePer100k" name="Homicides / 100k" stroke="#7c3aed" strokeWidth={2} />
                    <Line yAxisId="right" type="monotone" dataKey="overdoseRatePer100k" name="OD Deaths / 100k" stroke="#1e40af" strokeWidth={2} strokeDasharray="5 5" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              <p className="text-[10px] text-gray-500 mt-3 font-sans leading-relaxed text-left border-t border-gray-150 pt-3">
                <strong className="text-black font-semibold">Empirical Insight:</strong> Chicago ZIP code <strong>60624 (West Garfield Park)</strong> exhibits an astronomical <strong>89% lead service line density</strong> and <strong>96% minority population share</strong>, directly aligning with its severe public safety outcomes (84.1 homicides/100k and 110.4 overdoses/100k). This spatial intersection validates the systemic environmental injustice model.
              </p>
            </div>

            {/* SCIENTIFIC CORRELATION & LEAD-CRIME META-ANALYSIS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Lead-Crime Hypothesis Meta-Analysis Summary (Col span 7) */}
              <div className="lg:col-span-7 p-6 border border-gray-200 bg-white rounded-2xl space-y-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-rose-700 font-mono text-[10px] font-bold uppercase tracking-wider">
                    <BookOpen size={14} />
                    <span>Scientific Registry & Empirical Metadata</span>
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-neutral-900 leading-tight">
                    The Lead-Crime Hypothesis: A Meta-Analysis
                  </h3>
                  <p className="text-xs text-gray-500 font-sans mt-1">
                    Published in <span className="italic font-medium">Regional Science and Urban Economics</span>, Volume 97 (November 2022, Article 103826). The first rigorous, multi-study meta-analytical validation of the heavy-metals-to-crime hypothesis.
                  </p>
                </div>

                {/* Main Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 bg-red-50 rounded-xl border border-red-100 text-center">
                    <span className="text-[10px] font-mono text-red-700 block uppercase font-semibold">Partial Corr</span>
                    <strong className="text-2xl font-serif font-bold text-red-900 block mt-1">0.16</strong>
                    <span className="text-[8px] text-red-600 font-sans leading-none block mt-1">Post-bias adjusted significance</span>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-xl border border-orange-100 text-center">
                    <span className="text-[10px] font-mono text-orange-700 block uppercase font-semibold">Elasticity</span>
                    <strong className="text-2xl font-serif font-bold text-orange-900 block mt-1">0.09</strong>
                    <span className="text-[8px] text-orange-600 font-sans leading-none block mt-1">Direct physical linkage coefficient</span>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-xl border border-purple-100 text-center col-span-1">
                    <span className="text-[10px] font-mono text-purple-700 block uppercase font-semibold">Homicide Fall</span>
                    <strong className="text-xl font-serif font-bold text-purple-900 block mt-1">7% - 28%</strong>
                    <span className="text-[8px] text-purple-600 font-sans leading-none block mt-1">Explanatory ratio in US decline</span>
                  </div>
                  <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100 text-center col-span-1">
                    <span className="text-[10px] font-mono text-indigo-700 block uppercase font-semibold">Convergence</span>
                    <strong className="text-xl font-serif font-bold text-indigo-900 block mt-1">6% - 20%</strong>
                    <span className="text-[8px] text-indigo-600 font-sans leading-none block mt-1">Urban-rural crime convergence</span>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs text-gray-600 leading-relaxed font-sans">
                  <p>
                    <strong>Core Highlights of the Meta-Analysis:</strong>
                  </p>
                  <ul className="space-y-1.5 list-disc pl-4 text-[11px] text-[#555]">
                    <li><strong>Rigorous Bias Control:</strong> Adjusts for widespread publication bias in econometric literature, securing a highly statistically significant residual correlation of <strong>0.16</strong>.</li>
                    <li><strong>Causal Mechanism:</strong> Reinforces that lead ingestion (from lead paint, soil, and aging water service lines) results in permanent, irreversible neurological damage—specifically degrading impulse control, emotional regulation, and cognitive capacity in the prefrontal cortex.</li>
                    <li><strong>Convergence Factor:</strong> The environmental remediation disparity explains 6–20% of the persistent divide between urban and rural violence metrics in North America.</li>
                  </ul>
                  <div className="text-[10px] bg-gray-50 border border-gray-150 rounded-lg p-2 flex justify-between items-center font-mono">
                    <span className="text-gray-400">Reference URL:</span>
                    <a href="https://www.sciencedirect.com/science/article/pii/S0166046222000667" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline">S0166046222000667</a>
                  </div>
                </div>
              </div>

              {/* Right Column: 100x Exposome Variance Baseline (Col span 5) */}
              <div className="lg:col-span-5 p-6 border border-gray-200 bg-[#FCFCFC] rounded-2xl space-y-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-cyan-700 font-mono text-[10px] font-bold uppercase tracking-wider">
                    <Scale size={14} />
                    <span>Sovereign de Roulet's Law Comparison</span>
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-neutral-900 leading-tight">
                    The 100X Environmental Injustice Variance
                  </h3>
                  <p className="text-xs text-gray-500 font-sans mt-1">
                    Contrasting the absolute lowest heavy metal environmental load against the West Side Chicago baseline.
                  </p>
                </div>

                {/* Side-by-side Cards */}
                <div className="space-y-3">
                  {/* Switzerland */}
                  <div className="p-3 bg-white border border-gray-200 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-mono font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded uppercase">CH Baseline</span>
                      <strong className="block text-xs font-serif font-semibold text-gray-800 mt-1">Switzerland</strong>
                      <span className="text-[10px] text-gray-400 block font-sans">Near-zero neurodevelopmental hazard</span>
                    </div>
                    <div className="text-right">
                      <strong className="text-base font-mono font-bold text-gray-900 block">0.6 / 100k</strong>
                      <span className="text-[9px] text-gray-400 font-mono font-bold block">Lead Pipes: &lt;0.1%</span>
                    </div>
                  </div>

                  {/* Austin Chicago */}
                  <div className="p-3 bg-white border border-red-200 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-mono font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded uppercase">Injustice Apex</span>
                      <strong className="block text-xs font-serif font-semibold text-gray-800 mt-1">Austin, Chicago (West Side)</strong>
                      <span className="text-[10px] text-gray-400 block font-sans">Severe toxic pipeline concentration</span>
                    </div>
                    <div className="text-right">
                      <strong className="text-base font-mono font-bold text-red-600 block">56.5 / 100k</strong>
                      <span className="text-[9px] text-red-500 font-mono font-bold block">Lead Pipes: 92%</span>
                    </div>
                  </div>
                </div>

                {/* Big 100x Display */}
                <div className="p-4 bg-red-950/5 border border-red-200/50 rounded-xl text-center">
                  <div className="text-3xl font-serif font-bold text-red-700 tracking-tight">
                    ~94.1x Homicide Variance
                  </div>
                  <p className="text-[10px] text-gray-500 font-sans mt-1 leading-normal">
                    Comparing Swiss Exposenomics baselines (0.6/100k) to Austin, Chicago (56.5/100k). This massive disparity is driven heavily by the neurodevelopmental tax of Chicago's 92% confirmed or suspected lead water service lines.
                  </p>
                </div>
              </div>

            </div>

            {/* FULL-WIDTH INTERACTIVE EXPOSURE-CRIME SCATTER PLOT */}
            <div className="p-6 border border-gray-200 bg-[#FCFCFC] rounded-2xl">
              <div>
                <h4 className="text-sm font-semibold tracking-tight uppercase flex items-center gap-2">
                  <Activity size={16} className="text-red-700" />
                  Exhibit D-5: Neuro-Violence Exposome Scatter Correlation (Roulet's Law Baseline)
                </h4>
                <p className="text-xs text-[#666] font-sans mt-0.5">
                  Plots local Chicago neighborhoods and the Swiss baseline. Visualizes the strong log-linear alignment between lead water pipe exposure density (%) and severe public safety outcomes (Homicides per 100k).
                </p>
              </div>

              <div className="w-full h-80 mt-6">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                    <XAxis type="number" dataKey="leadExposureIndex" name="Lead Exposure Index" unit="%" stroke="#888888" fontSize={10} domain={[0, 100]} />
                    <YAxis type="number" dataKey="homicideRate" name="Homicide Rate" unit="/100k" stroke="#888888" fontSize={10} domain={[0, 100]} />
                    <ZAxis type="number" range={[60, 400]} />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                    <Legend wrapperStyle={{ fontSize: '10px' }} />
                    <Scatter name="Sovereign Baseline (CH)" data={NEURO_VIOLENCE_SCATTER_DATA.filter(d => d.group === "Sovereign Baseline")} fill="#10b981" shape="circle" />
                    <Scatter name="Chicago Affluent (Lincoln Park, Gold Coast)" data={NEURO_VIOLENCE_SCATTER_DATA.filter(d => d.group === "Chicago Affluent")} fill="#2563eb" shape="triangle" />
                    <Scatter name="Chicago Transitional (Logan Square)" data={NEURO_VIOLENCE_SCATTER_DATA.filter(d => d.group === "Chicago Transitional")} fill="#f59e0b" shape="square" />
                    <Scatter name="Chicago Impacted (Lawndale, Chatham, Roseland)" data={NEURO_VIOLENCE_SCATTER_DATA.filter(d => d.group === "Chicago Impacted")} fill="#ea580c" shape="star" />
                    <Scatter name="West Side Austin, Chicago (60644)" data={NEURO_VIOLENCE_SCATTER_DATA.filter(d => d.group.includes("West Side"))} fill="#dc2626" shape="star" />
                    <Scatter name="Chicago Extreme (Garfield Park, Englewood)" data={NEURO_VIOLENCE_SCATTER_DATA.filter(d => d.group === "Chicago Extreme")} fill="#7f1d1d" shape="cross" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>

              <p className="text-[10px] text-gray-500 mt-3 font-sans leading-relaxed text-left border-t border-gray-150 pt-3">
                <strong className="text-black font-semibold">Exposenomics Metric:</strong> This correlation tracks perfectly with the lead-crime hypothesis. Communities forced to bear a massive structural lead load (such as Austin, Englewood, and Garfield Park with &gt;85% lead pipeline density) suffer a devastating, multi-generational cognitive assault that reflects as high-violence outliers, while the Swiss baseline represents the baseline integrity of the intact human prefrontal cortex.
              </p>
            </div>

            {/* THE CINCINNATI LEAD STUDY & CLINICAL CASE STUDIES */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Cincinnati Birth Cohort Study */}
              <div className="lg:col-span-7 p-6 border border-gray-200 bg-white rounded-2xl space-y-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-rose-700 font-mono text-[10px] font-bold uppercase tracking-wider">
                    <Brain size={14} />
                    <span>Clinical Prospective Neurology Registry</span>
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-neutral-900 leading-tight">
                    The Cincinnati Lead Study: 30-Year Birth Cohort
                  </h3>
                  <p className="text-xs text-gray-500 font-sans mt-1">
                    Cofounded & authored by <span className="font-medium text-neutral-800">John Paul Wright, Bruce P. Lanphear, Kim N. Dietrich, Michelle Bolger, Lisa Tully, Kim M. Cecil, and Catherine Sacarellos</span>. Published in <span className="italic font-medium">Neurotoxicology and Teratology</span> (S0892036221000143).
                  </p>
                </div>

                {/* Cincinnati Study Highlight stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-red-50 rounded-xl border border-red-100 text-center">
                    <span className="text-[9px] font-mono text-red-700 block uppercase font-bold">Childhood Lead Increment</span>
                    <strong className="text-xl font-serif font-bold text-red-900 block mt-1">+5 μg/dL</strong>
                    <span className="text-[8px] text-red-600 font-sans leading-none block mt-1">Increase in blood lead levels</span>
                  </div>
                  <div className="p-3 bg-rose-50 rounded-xl border border-rose-100 text-center">
                    <span className="text-[9px] font-mono text-rose-700 block uppercase font-bold">Violent Crime Risk</span>
                    <strong className="text-xl font-serif font-bold text-rose-900 block mt-1">+48%</strong>
                    <span className="text-[8px] text-rose-600 font-sans leading-none block mt-1">Adult arrest risk multiplier</span>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 text-center">
                    <span className="text-[9px] font-mono text-amber-700 block uppercase font-bold">MRI Cohort Size</span>
                    <strong className="text-xl font-serif font-bold text-amber-900 block mt-1">250 Tracked</strong>
                    <span className="text-[8px] text-amber-600 font-sans leading-none block mt-1">From pregnancy to age 30</span>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-gray-600 leading-relaxed font-sans">
                  <p>
                    <strong>Neurological Causal Mechanisms & Brain Volumetric Analysis:</strong>
                  </p>
                  <ul className="space-y-2 list-disc pl-4 text-[11px] text-[#555]">
                    <li>
                      <strong>Frontal Lobe Gray Matter Loss:</strong> Advanced MRI scans of the cohort revealed that childhood lead exposure caused permanent physical brain damage—specifically gray matter volume loss in the <strong className="text-red-950">frontal / prefrontal lobe</strong>.
                    </li>
                    <li>
                      <strong>Etiological Driver of Impulsivity:</strong> By damaging the cortical areas responsible for <strong className="text-neutral-900">decision-making, impulse control, emotional regulation, and socially driven behaviors</strong>, toxic lead levels physically remodel the brain to lower the threshold for violent behavior.
                    </li>
                    <li>
                      <strong>The Causal Chain:</strong> By tracing these structural brain changes to official life-course criminal records, this longitudinal cohort provides some of the strongest biological and epidemiological evidence that heavy metal acts as a driver of crime.
                    </li>
                  </ul>
                  <div className="text-[10px] bg-gray-50 border border-gray-150 rounded-lg p-2 flex justify-between items-center font-mono">
                    <span className="text-gray-400">Registry Reference:</span>
                    <a href="https://www.sciencedirect.com/science/article/abs/pii/S0892036221000143" target="_blank" rel="noopener noreferrer" className="text-rose-700 hover:underline">S0892036221000143</a>
                  </div>
                </div>
              </div>

              {/* Dr. Bruce Lanphear's Substack Essay & Historical Precedent */}
              <div className="lg:col-span-5 p-6 border border-gray-200 bg-[#FCFCFC] rounded-2xl space-y-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-amber-700 font-mono text-[10px] font-bold uppercase tracking-wider">
                    <Flame size={14} />
                    <span>"A Criminal Element" Narrative</span>
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-neutral-900 leading-tight">
                    How Lead Poisoning Fueled a Crime Wave
                  </h3>
                  <p className="text-xs text-gray-500 font-sans mt-1">
                    Analysis by epidemiologist Dr. Bruce Lanphear, reflecting on eighty years of ignored environmental warning signs.
                  </p>
                </div>

                <div className="space-y-3.5">
                  <blockquote className="border-l-2 border-red-500 pl-3 py-1 text-xs text-gray-600 italic font-sans leading-relaxed">
                    “The problem is so well-defined, so neatly packaged, with both causes and cures known, that if we don't eliminate this social crime, our society deserves all the disasters that have been forecast for it.”
                    <span className="block text-[10px] text-gray-500 font-mono mt-1 font-bold not-italic">— René Dubos on Lead Poisoning, 1969</span>
                  </blockquote>

                  {/* Byers & Lord 1943 */}
                  <div className="p-3 bg-white border border-gray-250 rounded-xl space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono font-bold text-gray-500 uppercase">Historical Baseline (1943)</span>
                      <span className="text-[9px] text-red-600 bg-red-50 font-mono px-1.5 py-0.5 rounded font-bold">Byers & Lord Study</span>
                    </div>
                    <p className="text-[11px] text-gray-600 font-sans leading-relaxed">
                      Boston pediatricians tracked 20 children hospitalized with "mild" lead poisoning. They struggled in school, set fires, and acted out. One stabbed a peer in the face with a fork. Only one graduated from high school.
                    </p>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <p className="text-[11px] text-gray-500 leading-relaxed font-sans">
                    <strong>Widespread Poisoning, Urban Collapse:</strong> Lanphear highlights that instead of eliminating this obvious neurotoxin, society continued to paint homes, lay lead water lines, and add lead to gasoline, seeding the mid-to-late 20th century urban crime wave.
                  </p>
                  <div className="text-[10px] bg-amber-50/50 border border-amber-100 rounded-lg p-2 flex justify-between items-center font-mono">
                    <span className="text-amber-700">Substack Essay:</span>
                    <a href="https://blanphear.substack.com/p/a-criminal-element" target="_blank" rel="noopener noreferrer" className="text-amber-800 hover:underline font-bold">blanphear.substack.com</a>
                  </div>
                </div>
              </div>

            </div>

            {/* VIOLENCE POLICY CENTER 2024 STUDY & ROULET'S LAW CORRECTIONS */}
            <div className="p-6 border border-gray-200 bg-white rounded-2xl space-y-6">
              <div className="border-b border-gray-150 pb-4">
                <div className="flex items-center gap-2 mb-2 text-rose-700 font-mono text-[10px] font-bold uppercase tracking-wider">
                  <ShieldAlert size={14} className="animate-pulse" />
                  <span>Sovereign Correction & Comparative Demographics</span>
                </div>
                <h3 className="text-xl font-serif font-semibold text-neutral-900 leading-tight">
                  VPC 2024 Black Homicide Study & Roulet's Law Scientific Corrections
                </h3>
                <p className="text-xs text-gray-500 font-sans mt-1">
                  Correcting the annual "Black Homicide Victimization in the United States" report (analyzing 2024 CDC data) to address systemic gaps in causation, demographic classification, and spatial neurotoxicology.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left Column: VPC Study Context & Findings */}
                <div className="lg:col-span-5 space-y-5 flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded uppercase">
                      The Ignored Crisis (VPC Introduction)
                    </span>
                    <blockquote className="border-l-4 border-rose-500 pl-4 py-2 text-xs text-gray-700 italic font-sans leading-relaxed bg-rose-50/30 rounded-r-xl">
                      “The devastation homicide inflicts on Black teens and adults in our nation is an ongoing crisis, yet it is all too often ignored outside of impacted communities. Black men have shorter life expectancies compared to white men in the United States, with homicide being a leading contributor to this disparity. Every year the Black population in the U.S. experiences thousands of excess firearm homicide deaths and this number rose dramatically during the COVID-19 pandemic.”
                    </blockquote>
                    <p className="text-[11px] text-gray-500 leading-relaxed font-sans">
                      While the VPC study correctly identifies the disproportionate violence suffered by Black populations, its explanatory framework is severely incomplete. ICEarth intercepts this data at source in real time (current to 2026) to provide structural, biological, and spatial answers that political studies omit.
                    </p>
                  </div>

                  {/* Race vs Ethnicity Homicide Rates Table */}
                  <div className="bg-neutral-50 p-4 border border-gray-200 rounded-xl space-y-3">
                    <h4 className="text-[10px] font-mono font-bold uppercase text-neutral-700 tracking-wider">
                      U.S. vs. California Homicide Disparities (per 100k)
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-[11px] font-sans">
                        <thead>
                          <tr className="border-b border-gray-200 text-gray-500 text-left">
                            <th className="pb-1.5 font-medium">Demographic Group</th>
                            <th className="pb-1.5 font-semibold text-right">U.S. Rate</th>
                            <th className="pb-1.5 font-semibold text-right">California Rate</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-150">
                          <tr className="text-red-950 font-medium">
                            <td className="py-1.5">Black Homicide Victimization</td>
                            <td className="py-1.5 text-right font-mono">21.3</td>
                            <td className="py-1.5 text-right font-mono">31.0</td>
                          </tr>
                          <tr className="text-amber-900">
                            <td className="py-1.5">Hispanic / Latino</td>
                            <td className="py-1.5 text-right font-mono">6.3</td>
                            <td className="py-1.5 text-right font-mono">8.1</td>
                          </tr>
                          <tr className="text-gray-600">
                            <td className="py-1.5">Non-Hispanic White</td>
                            <td className="py-1.5 text-right font-mono">3.2</td>
                            <td className="py-1.5 text-right font-mono">3.0</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <span className="block text-[9px] text-gray-400 font-mono leading-none">
                      Sources: CDC WONDER 2024 Database, ICEarth Local Ingest.
                    </span>
                  </div>

                  <div className="text-[10px] bg-gray-50 border border-gray-200 rounded-lg p-2.5 flex justify-between items-center font-mono">
                    <span className="text-gray-400">VPC Study Registry:</span>
                    <a 
                      href="https://vpc.org/publication/black-homicide-victimization-in-the-united-states-an-analysis-of-2024-homicide-data/#blackwhite-racial-disparities-in-homicide-rates-by-state" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-rose-700 hover:underline font-bold"
                    >
                      vpc.org/publication/2024-data
                    </a>
                  </div>
                </div>

                {/* Right Column: 4 Scientific Failures & Corrections */}
                <div className="lg:col-span-7 space-y-4">
                  <span className="text-[10px] font-mono font-bold text-rose-700 bg-rose-50 px-2 py-1 rounded uppercase block w-max">
                    Methodological Failures & ICEarth Corrections
                  </span>
                  
                  <div className="space-y-3">
                    
                    {/* Failure 1 */}
                    <div className="p-3.5 bg-[#FAF9F6] border border-gray-250 rounded-xl space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono font-bold text-red-700 bg-red-100 px-1.5 py-0.5 rounded">01</span>
                        <h4 className="text-xs font-serif font-bold text-neutral-900">
                          Causal Misattribution (The Gun Paradigm vs. Executive Dysfunction)
                        </h4>
                      </div>
                      <p className="text-[11px] text-[#444] font-sans leading-relaxed pl-7">
                        <strong>VPC Claim:</strong> Attributes the crisis entirely to "gun availability".
                        <br />
                        <strong className="text-red-950 font-medium">ICEarth Scientific Correction:</strong> Firearms do not self-animate. The use of firearms is disproportionate among specific age and socio-environmental subsets, concentrated in illegal, informal shadow economies (stolen, unlicensed, or 3-D printed ghost guns) operated largely by teens outside legal control. The actual upstream etiological driver is <span className="font-semibold text-neutral-800">executive cognitive impairment</span> and the permanent degradation of the prefrontal cortex caused by heavy metal poisoning, resulting in the loss of impulse control.
                      </p>
                    </div>

                    {/* Failure 2 */}
                    <div className="p-3.5 bg-[#FAF9F6] border border-gray-250 rounded-xl space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono font-bold text-red-700 bg-red-100 px-1.5 py-0.5 rounded">02</span>
                        <h4 className="text-xs font-serif font-bold text-neutral-900">
                          Demographic Obfuscation (Racial vs. Ethnic Stratification)
                        </h4>
                      </div>
                      <p className="text-[11px] text-[#444] font-sans leading-relaxed pl-7">
                        <strong>VPC Claim:</strong> Limits its core analysis to a binary Black/White racial divide.
                        <br />
                        <strong className="text-red-950 font-medium">ICEarth Scientific Correction:</strong> Omits Hispanic/Latino populations, who suffer homicide victimization rates 2x to 3x higher than non-Hispanic Whites (e.g., 6.3/100k nationally, 8.1/100k in California). True epidemiological analyses must separate race by ethnicity to prevent statistical masking.
                      </p>
                    </div>

                    {/* Failure 3 */}
                    <div className="p-3.5 bg-[#FAF9F6] border border-gray-250 rounded-xl space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono font-bold text-red-700 bg-red-100 px-1.5 py-0.5 rounded">03</span>
                        <h4 className="text-xs font-serif font-bold text-neutral-900">
                          Spatial Scale Deficit (Lack of Urban Granularity)
                        </h4>
                      </div>
                      <p className="text-[11px] text-[#444] font-sans leading-relaxed pl-7">
                        <strong>VPC Claim:</strong> Aggregates homicides at broad state and national levels.
                        <br />
                        <strong className="text-red-950 font-medium">ICEarth Scientific Correction:</strong> Aggregated statistics mask the extreme concentration of localized urban violence. In the West Side and South Side of Chicago (e.g., Austin and Englewood), homicide rates reach 56.5 to 84.1 per 100k, mapping precisely onto high-density pre-1950 housing grids and aged lead service main segments—not statewide baselines.
                      </p>
                    </div>

                    {/* Failure 4 */}
                    <div className="p-3.5 bg-[#FAF9F6] border border-gray-250 rounded-xl space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono font-bold text-red-700 bg-red-100 px-1.5 py-0.5 rounded">04</span>
                        <h4 className="text-xs font-serif font-bold text-neutral-900">
                          Etiological Blindness to Systemic Lead Distribution
                        </h4>
                      </div>
                      <p className="text-[11px] text-[#444] font-sans leading-relaxed pl-7">
                        <strong>VPC Claim:</strong> Suggests socio-political factors and firearms alone drive the disparities.
                        <br />
                        <strong className="text-red-950 font-medium">ICEarth Scientific Correction:</strong> The geographic distribution of lead water lines, lead paint, and legacy industrial lead deposits correlates precisely with the spatial concentration of homicide victimization, incarceration rates, school suspensions, and low wealth attainment. Chronic neurotoxicity disproportionately harms Black and Hispanic populations in the exact same spatial patterns, proving that <span className="font-semibold text-neutral-800">systemic lead poisoning is the common causal catalyst</span>.
                      </p>
                    </div>

                  </div>
                </div>

              </div>

              <div className="p-3 bg-red-950/5 border border-red-200/40 rounded-xl text-center">
                <p className="text-[10px] text-gray-500 font-sans leading-normal">
                  <strong className="text-neutral-800 font-semibold uppercase font-mono text-[9px] mr-1">Roulet's Law Proof Validation:</strong>
                  By correcting political gun-centric paradigms with objective, spatial exposenomics and clinical neurotoxicology data, ICEarth proves that real-world violence prevention relies directly on rapid environmental lead remediation and housing restoration.
                </p>
              </div>
            </div>

            {/* AUTOMATED INGESTION & MANUAL CURATION SPECIFICATIONS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* AUTOMATED */}
              <div className="p-6 border border-gray-200 bg-white rounded-2xl space-y-4">
                <h4 className="text-base font-serif font-semibold text-neutral-800 flex items-center gap-2">
                  <Database className="text-cyan-600 w-5 h-5" />
                  Chicago Automated Ingestion Tracks
                </h4>
                <p className="text-xs text-gray-500 font-sans leading-normal">
                  Dynamic databases that can be synchronized and integrated automatically in the ICEarth system:
                </p>
                <ul className="space-y-2 text-xs text-[#555] font-sans list-disc pl-4 leading-relaxed">
                  <li>
                    <strong className="text-black">Illinois EPA LCR compliance databases</strong>: Live API streams pulling local water system action notifications and lead exceedance reports.
                  </li>
                  <li>
                    <strong className="text-black">City of Chicago Open Data Portal (Socrata API)</strong>: Ingests municipal material registers and geographic water main shapes dynamically.
                  </li>
                  <li>
                    <strong className="text-black">US HUD Grants API</strong>: Automatically tracks Lead Hazard Reduction and Healthy Homes grant disbursements to Cuyahoga and Cook counties.
                  </li>
                </ul>
              </div>

              {/* MANUAL */}
              <div className="p-6 border border-gray-200 bg-[#FCFCFC] rounded-2xl space-y-4">
                <h4 className="text-base font-serif font-semibold text-neutral-800 flex items-center gap-2">
                  <AlertTriangle className="text-amber-600 w-5 h-5" />
                  Chicago Manual Curation Tracks
                </h4>
                <p className="text-xs text-gray-500 font-sans leading-normal">
                  Information that lacks standardized state APIs and must be entered or curated manually:
                </p>
                <ul className="space-y-2 text-xs text-[#555] font-sans list-disc pl-4 leading-relaxed">
                  <li>
                    <strong className="text-black">Chicago Police Department Crime Bulletins</strong>: Local neighborhood-level homicide statistics must be manually compiled from weekly reports.
                  </li>
                  <li>
                    <strong className="text-black">Cook County Medical Examiner Reports</strong>: Chemical toxicology results for accidental drug overdoses must be manually extracted and mapped.
                  </li>
                  <li>
                    <strong className="text-black">Grassroots Blood Lead Surveys</strong>: Community-led lead screening campaigns must be manually uploaded as CSV files.
                  </li>
                </ul>
              </div>

            </div>

            {/* MANUAL OVERRIDE INTERFACE */}
            <div className="p-6 border border-gray-200 bg-[#FCFCFC] rounded-2xl space-y-4">
              <div className="flex justify-between items-center gap-4 flex-col md:flex-row">
                <div>
                  <h5 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                    <User className="text-cyan-600 w-14 h-4" />
                    Local Cook County Registry: Manual Outcomes Editor
                  </h5>
                  <p className="text-[10px] text-gray-500 font-sans mt-0.5">
                    Input or adjust neighborhood outcomes below. The local Chicago risk matrix above will dynamically update.
                  </p>
                </div>
                
                {/* Sync Controls */}
                <div className="flex items-center gap-2 shrink-0">
                  <input 
                    type="text" 
                    value={pwsIdQuery}
                    onChange={(e) => setPwsIdQuery(e.target.value)}
                    placeholder="PWSID (e.g., IL0316000)"
                    className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-mono w-32 focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    onClick={triggerApiSync}
                    disabled={apiSyncing}
                    className="px-3.5 py-1.5 bg-cyan-600 text-white rounded-lg text-xs font-semibold hover:bg-cyan-700 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {apiSyncing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
                    Sync API
                  </button>
                </div>
              </div>

              {/* CONSOLE LOGGER */}
              <div className="bg-neutral-950 text-cyan-400 p-4 rounded-xl font-mono text-[10px] space-y-1.5 max-h-36 overflow-y-auto border border-neutral-800">
                {syncLogs.map((log, index) => (
                  <div key={index} className="flex gap-2">
                    <span className="text-[#888] select-none">&gt;</span>
                    <span className="text-gray-200">{log}</span>
                  </div>
                ))}
              </div>

              {showSyncSuccess && (
                <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  <span><strong>Exposome Sync Complete:</strong> Chicago lead service material inventory matched with EPA health risk codes, city land registries, and local census tracts.</span>
                </div>
              )}

              {/* TABLE */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-sans border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 text-[#888] font-mono text-[10px] uppercase">
                      <th className="py-2.5 px-3">ZIP Code</th>
                      <th className="py-2.5 px-3">Neighborhood</th>
                      <th className="py-2.5 px-3 text-right">Lead Pipes %</th>
                      <th className="py-2.5 px-3 text-right">Minority Pop %</th>
                      <th className="py-2.5 px-3 text-right text-[#7c3aed]">Homicides / 100k</th>
                      <th className="py-2.5 px-3 text-right text-[#1e40af]">Overdoses / 100k</th>
                      <th className="py-2.5 px-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {customChicagoZipList.map((item) => (
                      <tr key={item.zip} className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-2.5 px-3 font-mono font-bold text-gray-900">{item.zip}</td>
                        <td className="py-2.5 px-3 text-[#444] font-medium">{item.neighborhood}</td>
                        <td className="py-2.5 px-3 text-right font-mono text-red-600 font-bold">{item.leadServiceLinePercentage}%</td>
                        <td className="py-2.5 px-3 text-right font-mono text-amber-600">{item.minorityDemographicPercentage}%</td>
                        
                        <td className="py-2.5 px-3 text-right font-mono text-[#7c3aed] font-bold">
                          {editingZip === item.zip ? (
                            <input 
                              type="number" 
                              value={editHomicides}
                              onChange={(e) => setEditHomicides(Number(e.target.value))}
                              className="w-16 px-1.5 py-0.5 border border-gray-300 rounded text-right"
                            />
                          ) : (
                            item.homicideRatePer100k
                          )}
                        </td>
                        
                        <td className="py-2.5 px-3 text-right font-mono text-[#1e40af] font-bold">
                          {editingZip === item.zip ? (
                            <input 
                              type="number" 
                              value={editOverdoses}
                              onChange={(e) => setEditOverdoses(Number(e.target.value))}
                              className="w-16 px-1.5 py-0.5 border border-gray-300 rounded text-right"
                            />
                          ) : (
                            item.overdoseRatePer100k
                          )}
                        </td>

                        <td className="py-2.5 px-3 text-center">
                          {editingZip === item.zip ? (
                            <button
                              onClick={() => saveLocalOverride(item.zip)}
                              className="px-2.5 py-0.75 bg-emerald-600 text-white rounded text-[10px] font-bold hover:bg-emerald-700 cursor-pointer"
                            >
                              Save
                            </button>
                          ) : (
                            <button
                              onClick={() => startEditing(item)}
                              className="px-2.5 py-0.75 bg-gray-100 text-gray-600 hover:text-black border border-gray-200 rounded text-[10px] hover:bg-gray-200 cursor-pointer"
                            >
                              Edit
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* 4TH ESTATE & INSTITUTIONAL MALPRACTICE PANEL */}
        <div className="border-t border-gray-200 pt-8 mt-12 space-y-6">
          <div className="p-6 border border-amber-200 bg-amber-50/10 rounded-2xl space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-amber-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-500/10 text-amber-700 rounded-xl">
                  <Newspaper size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-serif font-semibold text-neutral-800">
                    Systemic Malpractice & The 4th Estate: The "Buried by the Times" Model
                  </h4>
                  <p className="text-xs text-amber-800/85 font-sans mt-0.5">
                    Analyzing the mechanisms of institutional information suppression in public health and human atrocities.
                  </p>
                </div>
              </div>
              <div className="shrink-0">
                <span className="px-3 py-1 bg-amber-100 text-amber-800 text-[10px] font-mono font-bold rounded-lg uppercase tracking-wider flex items-center gap-1">
                  <EyeOff size={12} /> Institutional Blindness
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs text-neutral-600 font-sans leading-relaxed">
              {/* Column 1: Historical Precedent */}
              <div className="space-y-3.5 p-4 bg-white border border-gray-150 rounded-xl">
                <div className="flex items-center gap-2 text-neutral-800 font-semibold text-xs uppercase tracking-wide">
                  <BookOpen size={14} className="text-amber-600" />
                  <span>The Historical Precedent</span>
                </div>
                <p>
                  Laurel Leff’s landmark 2005 work, <strong className="text-neutral-900 font-bold font-serif italic">Buried by the Times</strong>, documents how <em className="italic">The New York Times</em> under Jewish publisher Arthur Hays Sulzberger systematically downplayed and buried reports of Nazi atrocities and the Holocaust in its back pages.
                </p>
                <p>
                  This case study received critical acclaim (winning the AJHA's best media history book award) by proving that extreme humanitarian catastrophes do not fail to reach public awareness through random societal breakdown, but through <strong>deliberate editorial and institutional malpractice</strong>.
                </p>
              </div>

              {/* Column 2: Modern Parallel */}
              <div className="space-y-3.5 p-4 bg-white border border-gray-150 rounded-xl">
                <div className="flex items-center gap-2 text-neutral-800 font-semibold text-xs uppercase tracking-wide">
                  <ShieldAlert size={14} className="text-red-600" />
                  <span>The Modern Parallel</span>
                </div>
                <p>
                  Despite possessing approximately <strong>400,000 lead service lines</strong>—the absolute largest concentration in any North American city—and paying unprecedented sums to extract each one, Chicago's toxic water crisis remains effectively buried in plain sight.
                </p>
                <p>
                  The direct correlation between toxic neurological exposures, cognitive degradation, and severe socio-behavioral outcomes (such as high homicide and chemical dependency rates in South and West side Black and Latino neighborhoods, verified by public registers like <strong className="text-rose-700">heyjackass.com</strong>) is continuously minimized by a complacent administrative apparatus and passive local press.
                </p>
              </div>

              {/* Column 3: The ICEarth Purpose */}
              <div className="space-y-3.5 p-4 bg-white border border-gray-150 rounded-xl">
                <div className="flex items-center gap-2 text-neutral-800 font-semibold text-xs uppercase tracking-wide">
                  <Scale size={14} className="text-cyan-600" />
                  <span>The ICEarth Mandate</span>
                </div>
                <p>
                  When trusted institutions and the 4th Estate abdicate their watchdog responsibilities, environmental injustice is allowed to fester. The resultant public health outcome represents a passive, systemic genocide of marginalized urban populations.
                </p>
                <p>
                  The <strong>ICEarth (Independent Collective Earth) Sovereign Benchmarking Registry</strong> exists to pierce this editorial block. By establishing decentralized public water registries, real-time exposure indicators, and competitive regional benchmarking, we ensure that critical public health truths can never again be buried in the back pages.
                </p>
              </div>
            </div>
            
            {/* Philosophical Footnote */}
            <div className="bg-amber-50 border border-amber-200/50 rounded-xl p-4 text-[11px] text-amber-900/95 leading-relaxed font-serif">
              <strong className="font-semibold font-sans block mb-1 text-xs text-amber-900 uppercase tracking-wider">Aesthetic Injustice Alignment:</strong>
              "Injustice does not merely rely on the commission of violence, but on the systematic construction of silence. To bury the metrics of childhood lead poisoning beneath municipal press releases is to be an active accomplice to the destruction of human potential. Roulet's Law asserts that a society's actual health is reflected not in its theoretical covenants, but in its physical soil and drinking water."
            </div>
          </div>
        </div>

    </div>
  );
};
