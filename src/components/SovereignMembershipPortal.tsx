import React, { useState, useEffect } from 'react';
import {
  Shield,
  UserCheck,
  Building2,
  MapPin,
  Key,
  Lock,
  Sparkles,
  AlertTriangle,
  CheckCircle,
  FileText,
  Activity,
  Award,
  Heart,
  TrendingUp,
  Search,
  ChevronRight,
  Database,
  Coins,
  DollarSign,
  Gavel,
  Globe,
  Sliders,
  RefreshCw,
  Plus,
  Trash2,
  Eye,
  Check,
  User,
  Users,
  Info,
  Layers,
  CheckCircle2,
  AlertCircle
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
  BarChart,
  Bar,
  Cell,
  LineChart,
  Line
} from 'recharts';

interface SovereignMembershipPortalProps {
  onNavigateTab?: (tab: string) => void;
}

interface HistoricalAddress {
  id: string;
  location: string;
  years: string;
  leadRisk: 'High' | 'Moderate' | 'Low';
  notes: string;
}

interface OccupationalHazard {
  id: string;
  title: string;
  category: 'Mining' | 'Construction' | 'Firefighting' | 'Agriculture' | 'Military' | 'Manufacturing' | 'Other';
  yearsActive: number;
  exposureIntensity: 'Severe' | 'Moderate' | 'Mild';
}

export const SovereignMembershipPortal: React.FC<SovereignMembershipPortalProps> = ({ onNavigateTab }) => {
  // Main Sub-tabs inside Portal
  const [activePortalSubTab, setActivePortalSubTab] = useState<'onboarding' | 'exposome_profiler' | 'tribal_gov' | 'membership_pricing'>('exposome_profiler');

  // USER AUTHENTICATION & IDENTITY STATE
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true); // Pre-logged in as demo sovereign member
  const [authRole, setAuthRole] = useState<'individual' | 'tribal_official' | 'municipal_officer' | 'supporter'>('individual');
  
  // MEMBER PROFILE FIELDS
  const [memberName, setMemberName] = useState<string>('Ouray Muskrat');
  const [tribalAffiliation, setTribalAffiliation] = useState<string>('Jicarilla Apache Nation');
  const [tribalRollId, setTribalRollId] = useState<string>('JAN-77492-ZKP');
  const [nationalIdHash, setNationalIdHash] = useState<string>('US-SSN-***-**-8491');
  const [currentAddress, setCurrentAddress] = useState<string>('Dulce, New Mexico 87528 (Jicarilla Reservation)');
  const [email, setEmail] = useState<string>('ouray.muskrat@jicarilla-sovereign.org');
  const [phone, setPhone] = useState<string>('(575) 759-3200');
  const [zkVerificationStatus, setZkVerificationStatus] = useState<string>('Verified Human (ZKP-Humanity Standard #0x8F92)');
  const [showZkKeyModal, setShowZkKeyModal] = useState<boolean>(false);

  // LIFETIME EXPOSOME PROFILER STATE
  const [addressQuery, setAddressQuery] = useState<string>('Dulce, New Mexico 87528');
  const [analyzedLocation, setAnalyzedLocation] = useState<string>('Dulce, NM (Jicarilla Apache Nation)');
  const [isAnalyzingAddress, setIsAnalyzingAddress] = useState<boolean>(false);

  // Environmental Metrics for currently analyzed location
  const [envData, setEnvData] = useState({
    soilLeadPpm: 185, // ppm (target < 50)
    waterLeadPpb: 12.4, // ppb (EPA action level 15, WHO target < 1)
    airAqi: 28, // AQI Good
    pm25: 6.8, // ug/m3
    miningProximityKm: 14.2, // Proximity to historical uranium/lead mining
    pfasRisk: 'Moderate (Rio Arriba Catchment)',
    overallExposomeRiskScore: 68, // out of 100
  });

  // Lifetime History Elements
  const [historicalAddresses, setHistoricalAddresses] = useState<HistoricalAddress[]>([
    { id: '1', location: 'Dulce, NM (Jicarilla Reservation)', years: '2012 - Present', leadRisk: 'Moderate', notes: 'Well water source, older home plumbing' },
    { id: '2', location: 'Farmington, NM (San Juan Basin)', years: '2004 - 2012', leadRisk: 'High', notes: 'Near oil/gas & industrial smelting corridor' },
    { id: '3', location: 'Albuquerque, NM', years: '1995 - 2004', leadRisk: 'High', notes: 'Pre-1978 housing stock with lead paint' }
  ]);

  const [occupationalHazards, setOccupationalHazards] = useState<OccupationalHazard[]>([
    { id: '1', title: 'Heavy Equipment & Mining Reclamation', category: 'Mining', yearsActive: 8, exposureIntensity: 'Moderate' },
    { id: '2', title: 'Wildland Firefighting & Dust Inhalation', category: 'Firefighting', yearsActive: 5, exposureIntensity: 'Severe' }
  ]);

  // Lifestyle Exposures
  const [huntingLeadAmmo, setHuntingLeadAmmo] = useState<boolean>(true);
  const [gameConsumptionFreq, setGameConsumptionFreq] = useState<number>(3); // times/week
  const [traditionalPotteryUse, setTraditionalPotteryUse] = useState<boolean>(true);
  const [pipeWaterSource, setPipeWaterSource] = useState<'well' | 'tribal_municipal' | 'bottled'>('well');
  const [smokingStatus, setSmokingStatus] = useState<boolean>(false);

  // New History Item Inputs
  const [newAddrLoc, setNewAddrLoc] = useState<string>('');
  const [newAddrYears, setNewAddrYears] = useState<string>('');
  const [newOccTitle, setNewOccTitle] = useState<string>('');
  const [newOccCat, setNewOccCat] = useState<'Mining' | 'Construction' | 'Firefighting' | 'Agriculture' | 'Military' | 'Manufacturing' | 'Other'>('Mining');
  const [newOccYears, setNewOccYears] = useState<number>(3);

  // TRIBAL & GOVERNMENT OFFICIAL DASHBOARD STATE
  const [selectedGovDept, setSelectedGovDept] = useState<'health' | 'water' | 'environmental' | 'police'>('health');
  const [leadPipeReplacedCount, setLeadPipeReplacedCount] = useState<number>(342);
  const [totalLeadPipesCount, setTotalLeadPipesCount] = useState<number>(580);
  const [testKitsDistributed, setTestKitsDistributed] = useState<number>(1250);
  const [communityBllAverage, setCommunityBllAverage] = useState<number>(2.4); // ug/dL
  const [showAddCitizenReportModal, setShowAddCitizenReportModal] = useState<boolean>(false);
  
  // Citizen Reports Logged
  const [citizenLogs, setCitizenLogs] = useState([
    { id: 'LOG-101', date: '2026-08-05', residency: 'Dulce Sector 3', type: 'Home Tap Water Test', leadResult: '18.2 ppb (ELEVATED)', status: 'Remediation Kit Issued', zkpProof: '0x7A91...BC02' },
    { id: 'LOG-102', date: '2026-08-02', residency: 'Dulce Sector 1', type: 'Pediatric Blood Screening', leadResult: '3.1 ug/dL (MONITOR)', status: 'Filtered Pitcher Provided', zkpProof: '0x3F88...DD91' },
    { id: 'LOG-103', date: '2026-07-28', residency: 'Jicarilla North Boundary', type: 'Soil Lead Sampling', leadResult: '240 ppm (MODERATE)', status: 'Soil Capping Approved', zkpProof: '0x9E12...AA44' }
  ]);

  // MEMBERSHIP TIER & FINANCIAL CHECKOUT STATE
  const [selectedTier, setSelectedTier] = useState<'free' | 'supporter' | 'tribal_grant' | 'municipal'>('free');
  const [donationAmount, setDonationAmount] = useState<number>(100);
  const [paymentSuccessModal, setPaymentSuccessModal] = useState<boolean>(false);

  // Pre-load preset for Ouray Muskrat
  const handleLoadOurayMuskratPreset = () => {
    setMemberName('Ouray Muskrat');
    setTribalAffiliation('Jicarilla Apache Nation');
    setTribalRollId('JAN-77492-ZKP');
    setCurrentAddress('Dulce, New Mexico 87528 (Jicarilla Reservation)');
    setEmail('ouray.muskrat@jicarilla-sovereign.org');
    setAddressQuery('Dulce, New Mexico 87528');
    setAnalyzedLocation('Dulce, NM (Jicarilla Apache Nation)');
    setEnvData({
      soilLeadPpm: 185,
      waterLeadPpb: 12.4,
      airAqi: 28,
      pm25: 6.8,
      miningProximityKm: 14.2,
      pfasRisk: 'Moderate (Rio Arriba Catchment)',
      overallExposomeRiskScore: 68
    });
    setHuntingLeadAmmo(true);
    setGameConsumptionFreq(3);
    setTraditionalPotteryUse(true);
    setPipeWaterSource('well');
    setAuthRole('individual');
    setActivePortalSubTab('exposome_profiler');
  };

  const handleAnalyzeAddress = () => {
    setIsAnalyzingAddress(true);
    setTimeout(() => {
      setIsAnalyzingAddress(false);
      if (addressQuery.toLowerCase().includes('dulce')) {
        setAnalyzedLocation('Dulce, NM (Jicarilla Apache Nation)');
        setEnvData({
          soilLeadPpm: 185,
          waterLeadPpb: 12.4,
          airAqi: 28,
          pm25: 6.8,
          miningProximityKm: 14.2,
          pfasRisk: 'Moderate (Rio Arriba Catchment)',
          overallExposomeRiskScore: 68
        });
      } else if (addressQuery.toLowerCase().includes('chicago')) {
        setAnalyzedLocation('Chicago, IL (Cook County)');
        setEnvData({
          soilLeadPpm: 420,
          waterLeadPpb: 24.8,
          airAqi: 54,
          pm25: 14.2,
          miningProximityKm: 45.0,
          pfasRisk: 'High (Lake Michigan Industrial)',
          overallExposomeRiskScore: 84
        });
      } else if (addressQuery.toLowerCase().includes('cleveland')) {
        setAnalyzedLocation('Cleveland, OH (Cuyahoga County)');
        setEnvData({
          soilLeadPpm: 510,
          waterLeadPpb: 28.1,
          airAqi: 62,
          pm25: 16.5,
          miningProximityKm: 60.0,
          pfasRisk: 'Severe (Legacy Industrial Corridor)',
          overallExposomeRiskScore: 89
        });
      } else {
        setAnalyzedLocation(addressQuery);
        setEnvData({
          soilLeadPpm: 120,
          waterLeadPpb: 8.5,
          airAqi: 35,
          pm25: 8.1,
          miningProximityKm: 25.0,
          pfasRisk: 'Low-Moderate',
          overallExposomeRiskScore: 45
        });
      }
    }, 600);
  };

  // Add address to history
  const handleAddHistoricalAddress = () => {
    if (!newAddrLoc) return;
    const newEntry: HistoricalAddress = {
      id: Date.now().toString(),
      location: newAddrLoc,
      years: newAddrYears || 'Past Residence',
      leadRisk: 'Moderate',
      notes: 'User self-reported historical exposure location'
    };
    setHistoricalAddresses([...historicalAddresses, newEntry]);
    setNewAddrLoc('');
    setNewAddrYears('');
  };

  // Add occupation
  const handleAddOccupationalHazard = () => {
    if (!newOccTitle) return;
    const newEntry: OccupationalHazard = {
      id: Date.now().toString(),
      title: newOccTitle,
      category: newOccCat,
      yearsActive: newOccYears,
      exposureIntensity: 'Moderate'
    };
    setOccupationalHazards([...occupationalHazards, newEntry]);
    setNewOccTitle('');
  };

  // Trajectory Chart Data
  const bllTrajectoryData = [
    { age: 'Birth', bll: 1.2, baseline: 0.016, safeThreshold: 3.5 },
    { age: '5 yrs', bll: 4.8, baseline: 0.016, safeThreshold: 3.5 },
    { age: '12 yrs', bll: 3.9, baseline: 0.016, safeThreshold: 3.5 },
    { age: '20 yrs', bll: 6.2, baseline: 0.016, safeThreshold: 3.5 },
    { age: '30 yrs', bll: 5.4, baseline: 0.016, safeThreshold: 3.5 },
    { age: 'Current', bll: 4.1, baseline: 0.016, safeThreshold: 3.5 },
    { age: 'Target (Post-Filter)', bll: 0.8, baseline: 0.016, safeThreshold: 3.5 },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* TOP SOVEREIGN HEADER & DEMO PRESET SWITCHER */}
      <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-amber-800/40 relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                Sovereign Identity Protocol
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                Zero-Knowledge Verified
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-stone-100 font-serif">
              ICEarth Sovereign Member & Exposome Portal
            </h1>
            <p className="text-stone-300 text-sm sm:text-base max-w-3xl">
              Authentic human verification, sovereign tribal identity custody, address-based exposome profiling, and departmental governance tools for Indigenous Nations & Municipalities.
            </p>
          </div>

          {/* Quick Demo Preset Trigger */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-stone-950/70 p-4 rounded-xl border border-amber-700/40 shrink-0">
            <div className="text-left space-y-0.5">
              <div className="text-xs text-amber-400 font-semibold tracking-wider uppercase">Active Sovereign Member</div>
              <div className="text-sm font-bold text-white flex items-center gap-1.5">
                <User className="w-4 h-4 text-amber-400" />
                {memberName} ({tribalAffiliation})
              </div>
              <div className="text-xs text-stone-400">{currentAddress}</div>
            </div>
            
            <button
              id="btn-load-ouray-preset"
              onClick={handleLoadOurayMuskratPreset}
              className="px-3.5 py-2 text-xs font-bold bg-amber-600 hover:bg-amber-500 text-stone-950 rounded-lg shadow transition-all flex items-center justify-center gap-1.5 whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Load Ouray Muskrat Demo
            </button>
          </div>
        </div>

        {/* Portal Navigation Tabs */}
        <div className="mt-8 border-t border-stone-800 pt-4 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 w-full md:w-auto">
            <button
              id="subtab-exposome-profiler"
              onClick={() => setActivePortalSubTab('exposome_profiler')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activePortalSubTab === 'exposome_profiler'
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'bg-stone-800/80 text-stone-300 hover:bg-stone-800 hover:text-white'
              }`}
            >
              <Activity className="w-4 h-4" />
              Individual Exposome Profiler
            </button>

            <button
              id="subtab-onboarding"
              onClick={() => setActivePortalSubTab('onboarding')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activePortalSubTab === 'onboarding'
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'bg-stone-800/80 text-stone-300 hover:bg-stone-800 hover:text-white'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              Member Onboarding & Identity
            </button>

            <button
              id="subtab-tribal-gov"
              onClick={() => setActivePortalSubTab('tribal_gov')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activePortalSubTab === 'tribal_gov'
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'bg-stone-800/80 text-stone-300 hover:bg-stone-800 hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4" />
              Tribal & Gov Operations Hub
            </button>

            <button
              id="subtab-membership-pricing"
              onClick={() => setActivePortalSubTab('membership_pricing')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activePortalSubTab === 'membership_pricing'
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'bg-stone-800/80 text-stone-300 hover:bg-stone-800 hover:text-white'
              }`}
            >
              <Coins className="w-4 h-4" />
              Membership Tiers & Grants
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs text-amber-300/80">
            <Lock className="w-3.5 h-3.5" />
            256-bit ZK-Encrypted Vault
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUBTAB 1: DYNAMIC INDIVIDUAL EXPOSOME PROFILER (OURAY MUSKRAT / GLOBAL)   */}
      {/* ========================================================================= */}
      {activePortalSubTab === 'exposome_profiler' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* ADDRESS SEARCH & QUICK PRESETS BAR */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-md space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-stone-100 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-500" />
                  Address-Based Environmental Exposome Profiler
                </h2>
                <p className="text-stone-400 text-xs sm:text-sm">
                  Enter any address or reservation community to query EPA monitors, geological background, soil heavy metals, and lead water pipes.
                </p>
              </div>

              {/* Sample Location Buttons */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
                <span className="text-xs text-stone-500 font-medium whitespace-nowrap">Presets:</span>
                <button
                  onClick={() => { setAddressQuery('Dulce, New Mexico 87528'); handleAnalyzeAddress(); }}
                  className="px-2.5 py-1 text-xs bg-amber-950/60 border border-amber-800/60 text-amber-300 rounded-lg hover:bg-amber-900/60 transition-all whitespace-nowrap"
                >
                  Dulce, NM (Jicarilla)
                </button>
                <button
                  onClick={() => { setAddressQuery('Chicago, IL 60623'); handleAnalyzeAddress(); }}
                  className="px-2.5 py-1 text-xs bg-stone-800 border border-stone-700 text-stone-300 rounded-lg hover:bg-stone-700 transition-all whitespace-nowrap"
                >
                  Chicago, IL
                </button>
                <button
                  onClick={() => { setAddressQuery('Cleveland, OH 44105'); handleAnalyzeAddress(); }}
                  className="px-2.5 py-1 text-xs bg-stone-800 border border-stone-700 text-stone-300 rounded-lg hover:bg-stone-700 transition-all whitespace-nowrap"
                >
                  Cleveland, OH
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={addressQuery}
                  onChange={(e) => setAddressQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAnalyzeAddress()}
                  placeholder="Enter street, city, ZIP, or sovereign land (e.g. Dulce, New Mexico 87528)..."
                  className="w-full bg-stone-950 text-stone-100 border border-stone-700 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <button
                id="btn-analyze-address"
                onClick={handleAnalyzeAddress}
                disabled={isAnalyzingAddress}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl shadow transition-all flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {isAnalyzingAddress ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Querying EPA & Satellite...
                  </>
                ) : (
                  <>
                    <Activity className="w-4 h-4" />
                    Compile Exposome
                  </>
                )}
              </button>
            </div>
          </div>

          {/* EXPOSOME DASHBOARD METRICS FOR ANALYZED ADDRESS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Soil Lead */}
            <div className="bg-stone-900 border border-stone-800 rounded-xl p-5 space-y-2">
              <div className="flex items-center justify-between text-xs text-stone-400 font-medium">
                <span>Soil Lead (Pb)</span>
                <span className="text-amber-400 font-bold">Target &lt; 50 ppm</span>
              </div>
              <div className="text-2xl font-black text-stone-100">
                {envData.soilLeadPpm} <span className="text-sm font-normal text-stone-400">ppm</span>
              </div>
              <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${envData.soilLeadPpm > 300 ? 'bg-red-500' : envData.soilLeadPpm > 150 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                  style={{ width: `${Math.min(100, (envData.soilLeadPpm / 500) * 100)}%` }}
                />
              </div>
              <p className="text-xs text-stone-400">
                {analyzedLocation.includes('Dulce') ? 'Dulce rural soil baseline with localized tailings influence.' : 'Urban soil deposit with legacy paint residues.'}
              </p>
            </div>

            {/* Tap Water Lead */}
            <div className="bg-stone-900 border border-stone-800 rounded-xl p-5 space-y-2">
              <div className="flex items-center justify-between text-xs text-stone-400 font-medium">
                <span>Water Lead Concentration</span>
                <span className="text-amber-400 font-bold">EPA Limit 15 ppb</span>
              </div>
              <div className="text-2xl font-black text-stone-100">
                {envData.waterLeadPpb} <span className="text-sm font-normal text-stone-400">ppb</span>
              </div>
              <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${envData.waterLeadPpb > 15 ? 'bg-red-500' : envData.waterLeadPpb > 10 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                  style={{ width: `${Math.min(100, (envData.waterLeadPpb / 30) * 100)}%` }}
                />
              </div>
              <p className="text-xs text-stone-400">
                {pipeWaterSource === 'well' ? 'Well source: Periodic leaching from fittings.' : 'Municipal service line mapping active.'}
              </p>
            </div>

            {/* EPA Air & PM2.5 */}
            <div className="bg-stone-900 border border-stone-800 rounded-xl p-5 space-y-2">
              <div className="flex items-center justify-between text-xs text-stone-400 font-medium">
                <span>Air Quality Index (AQI)</span>
                <span className="text-emerald-400 font-bold">Good Quality</span>
              </div>
              <div className="text-2xl font-black text-stone-100">
                {envData.airAqi} <span className="text-sm font-normal text-stone-400">AQI</span>
              </div>
              <div className="text-xs text-stone-300 font-medium">
                PM2.5: {envData.pm25} µg/m³
              </div>
              <p className="text-xs text-stone-400">
                Continuous EPA air monitor telemetry active.
              </p>
            </div>

            {/* Mining Proximity */}
            <div className="bg-stone-900 border border-stone-800 rounded-xl p-5 space-y-2">
              <div className="flex items-center justify-between text-xs text-stone-400 font-medium">
                <span>Mining / Superfund Proximity</span>
                <span className="text-amber-400 font-bold">Active Zone</span>
              </div>
              <div className="text-2xl font-black text-stone-100">
                {envData.miningProximityKm} <span className="text-sm font-normal text-stone-400">km</span>
              </div>
              <div className="text-xs text-amber-300 font-medium truncate">
                PFAS: {envData.pfasRisk}
              </div>
              <p className="text-xs text-stone-400">
                Historical uranium & lead extraction catchment.
              </p>
            </div>
          </div>

          {/* MAIN PROFILER TWO-COLUMN SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT COLUMN: LIFETIME EXPOSOME BUILDER */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* HISTORICAL ADDRESS HISTORY */}
              <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-md space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-stone-100 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-amber-500" />
                      1. Historical Address Timeline
                    </h3>
                    <p className="text-xs text-stone-400">
                      Add previous places lived (childhood homes, military bases, previous cities) to calculate cumulative heavy-metal burden.
                    </p>
                  </div>
                </div>

                {/* List of Addresses */}
                <div className="space-y-3">
                  {historicalAddresses.map((addr) => (
                    <div key={addr.id} className="bg-stone-950 p-3.5 rounded-xl border border-stone-800 flex items-center justify-between gap-3">
                      <div>
                        <div className="text-sm font-bold text-stone-200 flex items-center gap-2">
                          {addr.location}
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            addr.leadRisk === 'High' ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          }`}>
                            {addr.leadRisk} Risk
                          </span>
                        </div>
                        <div className="text-xs text-stone-400">{addr.years} — {addr.notes}</div>
                      </div>
                      <button
                        onClick={() => setHistoricalAddresses(historicalAddresses.filter(a => a.id !== addr.id))}
                        className="text-stone-500 hover:text-red-400 p-1 transition-colors"
                        title="Remove address"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add Address Form */}
                <div className="pt-2 border-t border-stone-800 grid grid-cols-1 sm:grid-cols-12 gap-2">
                  <input
                    type="text"
                    value={newAddrLoc}
                    onChange={(e) => setNewAddrLoc(e.target.value)}
                    placeholder="Location (e.g., Taos, NM)..."
                    className="sm:col-span-6 bg-stone-950 text-stone-100 border border-stone-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
                  />
                  <input
                    type="text"
                    value={newAddrYears}
                    onChange={(e) => setNewAddrYears(e.target.value)}
                    placeholder="Years (e.g. 1990 - 1998)..."
                    className="sm:col-span-4 bg-stone-950 text-stone-100 border border-stone-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
                  />
                  <button
                    onClick={handleAddHistoricalAddress}
                    className="sm:col-span-2 px-3 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold rounded-lg text-xs flex items-center justify-center gap-1 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>
              </div>

              {/* OCCUPATIONAL EXPOSURES */}
              <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-md space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-stone-100 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-amber-500" />
                    2. Occupational & Field Hazards
                  </h3>
                  <p className="text-xs text-stone-400">
                    Mining, construction, firefighting, military ordnance, battery recycling, or pesticide exposure.
                  </p>
                </div>

                <div className="space-y-3">
                  {occupationalHazards.map((occ) => (
                    <div key={occ.id} className="bg-stone-950 p-3.5 rounded-xl border border-stone-800 flex items-center justify-between gap-3">
                      <div>
                        <div className="text-sm font-bold text-stone-200 flex items-center gap-2">
                          {occ.title}
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-stone-800 text-stone-300">
                            {occ.category}
                          </span>
                        </div>
                        <div className="text-xs text-stone-400">{occ.yearsActive} Years Active — Intensity: {occ.exposureIntensity}</div>
                      </div>
                      <button
                        onClick={() => setOccupationalHazards(occupationalHazards.filter(o => o.id !== occ.id))}
                        className="text-stone-500 hover:text-red-400 p-1 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add Occupation */}
                <div className="pt-2 border-t border-stone-800 grid grid-cols-1 sm:grid-cols-12 gap-2">
                  <input
                    type="text"
                    value={newOccTitle}
                    onChange={(e) => setNewOccTitle(e.target.value)}
                    placeholder="Job Title / Activity..."
                    className="sm:col-span-5 bg-stone-950 text-stone-100 border border-stone-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
                  />
                  <select
                    value={newOccCat}
                    onChange={(e: any) => setNewOccCat(e.target.value)}
                    className="sm:col-span-4 bg-stone-950 text-stone-100 border border-stone-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
                  >
                    <option value="Mining">Mining</option>
                    <option value="Construction">Construction</option>
                    <option value="Firefighting">Firefighting</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Military">Military</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Other">Other</option>
                  </select>
                  <button
                    onClick={handleAddOccupationalHazard}
                    className="sm:col-span-3 px-3 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold rounded-lg text-xs flex items-center justify-center gap-1 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Hazard
                  </button>
                </div>
              </div>

              {/* LIFESTYLE & CULTURAL FACTORS */}
              <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-md space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-stone-100 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-amber-500" />
                    3. Cultural & Lifestyle Ingestion Vectors
                  </h3>
                  <p className="text-xs text-stone-400">
                    Traditional hunting with lead shot, game consumption, pottery usage, well water, and dietary supplements.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {/* Lead Ammunition Toggle */}
                  <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-stone-200">Subsistence Hunting with Lead Shot</span>
                      <button
                        onClick={() => setHuntingLeadAmmo(!huntingLeadAmmo)}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                          huntingLeadAmmo ? 'bg-amber-500 text-stone-950' : 'bg-stone-800 text-stone-400'
                        }`}
                      >
                        {huntingLeadAmmo ? 'ACTIVE' : 'INACTIVE'}
                      </button>
                    </div>
                    <p className="text-xs text-stone-400">
                      High-velocity lead ammunition shatters into microscopic nanoparticles in game tissue.
                    </p>
                  </div>

                  {/* Traditional Pottery */}
                  <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-stone-200">Traditional Lead-Glazed Cookware</span>
                      <button
                        onClick={() => setTraditionalPotteryUse(!traditionalPotteryUse)}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                          traditionalPotteryUse ? 'bg-amber-500 text-stone-950' : 'bg-stone-800 text-stone-400'
                        }`}
                      >
                        {traditionalPotteryUse ? 'USED' : 'NONE'}
                      </button>
                    </div>
                    <p className="text-xs text-stone-400">
                      Low-fire glazed pottery (e.g. loza vidriada) leaches lead into acidic foods.
                    </p>
                  </div>

                  {/* Water Source */}
                  <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-2">
                    <label className="text-sm font-semibold text-stone-200 block">Primary Drinking Water Source</label>
                    <select
                      value={pipeWaterSource}
                      onChange={(e: any) => setPipeWaterSource(e.target.value)}
                      className="w-full bg-stone-900 text-stone-200 border border-stone-700 rounded-lg p-2 text-xs focus:outline-none focus:border-amber-500"
                    >
                      <option value="well">Private / Tribal Well Water</option>
                      <option value="tribal_municipal">Tribal / Municipal Water Line</option>
                      <option value="bottled">Filtered / Bottled Water Only</option>
                    </select>
                  </div>

                  {/* Game Meat Consumption Frequency */}
                  <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-semibold text-stone-200">Game Consumption</label>
                      <span className="text-xs font-bold text-amber-400">{gameConsumptionFreq} meals/week</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="7"
                      value={gameConsumptionFreq}
                      onChange={(e) => setGameConsumptionFreq(parseInt(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: AI EXPOSOME SUMMARY & BLL TRAJECTORY CHART */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* BLL TRAJECTORY CHART */}
              <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-md space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-stone-100 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-amber-500" />
                    Estimated Lifetime Blood Lead (BLL) Trajectory
                  </h3>
                  <p className="text-xs text-stone-400">
                    Modeled trajectory comparing cumulative exposures vs CDC Action Threshold (3.5 µg/dL) and pre-industrial Homo Sapiens 0 baseline (0.016 µg/dL).
                  </p>
                </div>

                <div className="h-64 w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={bllTrajectoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="bllColor" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                      <XAxis dataKey="age" stroke="#a1a1aa" tick={{ fontSize: 11 }} />
                      <YAxis stroke="#a1a1aa" tick={{ fontSize: 11 }} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#18181b', borderColor: '#3f3f46', borderRadius: '8px', fontSize: '12px', color: '#f4f4f5' }}
                        formatter={(val: any) => [`${val} µg/dL`, 'Concentration']}
                      />
                      <Area type="monotone" dataKey="bll" name="Estimated BLL" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#bllColor)" />
                      <Line type="monotone" dataKey="safeThreshold" name="CDC Reference Level (3.5 µg/dL)" stroke="#ef4444" strokeDasharray="4 4" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="baseline" name="Pre-Industrial Baseline (0.016 µg/dL)" stroke="#10b981" strokeDasharray="2 2" strokeWidth={2} dot={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex items-center justify-between text-xs border-t border-stone-800 pt-3 text-stone-400">
                  <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Modeled BLL
                  </span>
                  <span className="flex items-center gap-1.5 text-red-400 font-semibold">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" /> CDC Reference (3.5 µg/dL)
                  </span>
                  <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Pre-Industrial (0.016 µg/dL)
                  </span>
                </div>
              </div>

              {/* AI EXPOSENOMICS ACTION PLAN & SUMMARY */}
              <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-md space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-stone-100 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    AI Exposenomics Summary & Action Plan
                  </h3>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    High Precision
                  </span>
                </div>

                <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-3 text-xs text-stone-300 leading-relaxed">
                  <p>
                    <strong className="text-amber-400">Exposome Profile for {memberName} ({analyzedLocation}):</strong>
                  </p>
                  <p>
                    Your overall environmental exposome score is <strong className="text-amber-300">{envData.overallExposomeRiskScore}/100</strong>. Primary burden vectors stem from historical residency in Farmington industrial corridors, wildland firefighting particulate inhalation, and well water filtration gaps in Dulce.
                  </p>

                  <div className="border-t border-stone-800 pt-3 space-y-2">
                    <div className="font-bold text-stone-200">Recommended Action Steps:</div>
                    <ul className="space-y-1.5 text-stone-300 list-disc list-inside">
                      <li><strong>Copper/Non-Lead Ammo Transition:</strong> Switch subsistence hunting rounds to monolithic copper to eliminate lead fragment intake.</li>
                      <li><strong>Reverse Osmosis Filtration:</strong> Install point-of-use NSF-53 certified filter on household tap water.</li>
                      <li><strong>Annual Capillary BLL Screening:</strong> Schedule sovereign capillary blood test with Jicarilla Apache Health Center.</li>
                      <li><strong>Zero-Knowledge Vault Sync:</strong> Store test results in your encrypted sovereign ledger to maintain absolute privacy.</li>
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => setShowZkKeyModal(true)}
                  className="w-full py-3 bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 font-bold rounded-xl border border-amber-500/40 transition-all flex items-center justify-center gap-2 text-xs"
                >
                  <Lock className="w-4 h-4" />
                  View Cryptographic ZK-Proof Certificate
                </button>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 2: MEMBER ONBOARDING & AUTHENTICATION HUB                         */}
      {/* ========================================================================= */}
      {activePortalSubTab === 'onboarding' && (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-8 animate-fadeIn max-w-4xl mx-auto">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Sovereign Onboarding</span>
            <h2 className="text-2xl font-bold text-stone-100 font-serif mt-1">
              Join ICEarth as an Individual Sovereign Member
            </h2>
            <p className="text-sm text-stone-400 mt-1">
              Establish your authentic human identity, connect your sovereign tribal credentials, and lock your health data inside a Zero-Knowledge privacy vault.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Field 1: Full Sovereign Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-stone-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-500" /> Full Legal / Sovereign Name
              </label>
              <input
                type="text"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
                placeholder="e.g. Ouray Muskrat"
                className="w-full bg-stone-950 text-stone-100 border border-stone-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Field 2: Tribal Affiliation */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-stone-300 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-amber-500" /> Tribal Nation / Sovereign Affiliation
              </label>
              <input
                type="text"
                value={tribalAffiliation}
                onChange={(e) => setTribalAffiliation(e.target.value)}
                placeholder="e.g. Jicarilla Apache Nation, Taos Pueblo, Cherokee..."
                className="w-full bg-stone-950 text-stone-100 border border-stone-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Field 3: Tribal Roll ID / Sovereign Identifier */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-stone-300 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-500" /> Tribal Roll ID / Sovereign Identifier
              </label>
              <input
                type="text"
                value={tribalRollId}
                onChange={(e) => setTribalRollId(e.target.value)}
                placeholder="e.g. JAN-77492-ZKP"
                className="w-full bg-stone-950 text-stone-100 border border-stone-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Field 4: National ID / SSN Hash */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-stone-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-500" /> US National ID / SSN (Encrypted via ZKP)
              </label>
              <input
                type="text"
                value={nationalIdHash}
                onChange={(e) => setNationalIdHash(e.target.value)}
                placeholder="US-SSN-***-**-8491"
                className="w-full bg-stone-950 text-stone-100 border border-stone-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Field 5: Physical Residence Address */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-xs font-bold uppercase text-stone-300 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-500" /> Primary Residence Address / Land Jurisdiction
              </label>
              <input
                type="text"
                value={currentAddress}
                onChange={(e) => setCurrentAddress(e.target.value)}
                placeholder="Dulce, New Mexico 87528 (Jicarilla Reservation)"
                className="w-full bg-stone-950 text-stone-100 border border-stone-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Field 6: Primary Role Selection */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-xs font-bold uppercase text-stone-300 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-amber-500" /> Select Membership Role & Access Level
              </label>
              <select
                value={authRole}
                onChange={(e: any) => setAuthRole(e.target.value)}
                className="w-full bg-stone-950 text-stone-100 border border-stone-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="individual">Individual Sovereign Member (e.g. Ouray Muskrat)</option>
                <option value="tribal_official">Tribal Government / Healthcare Director</option>
                <option value="municipal_officer">Municipal Water / Lead Inspector / Police Chief</option>
                <option value="supporter">Sovereign Supporter / Restoration Donor</option>
              </select>
            </div>

          </div>

          <div className="bg-stone-950 p-5 rounded-xl border border-stone-800 space-y-3">
            <div className="text-xs font-bold text-amber-400 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Human Authentication Guarantee
            </div>
            <p className="text-xs text-stone-400">
              ICEarth guarantees that your medical, genetic, and location data is encrypted on a local zero-knowledge vault. Neither corporate algorithms nor third-party marketing entities can harvest your information.
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-stone-800">
            <div className="text-xs text-stone-400">
              Status: <span className="text-emerald-400 font-bold">{zkVerificationStatus}</span>
            </div>
            <button
              onClick={() => {
                setActivePortalSubTab('exposome_profiler');
                handleAnalyzeAddress();
              }}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl shadow transition-all flex items-center gap-2 text-sm"
            >
              <CheckCircle className="w-4 h-4" />
              Save Sovereign Member Profile
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 3: TRIBAL & GOVERNMENT OPERATIONS PORTAL                         */}
      {/* ========================================================================= */}
      {activePortalSubTab === 'tribal_gov' && (
        <div className="space-y-8 animate-fadeIn">
          
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Government & Health Officers Hub</span>
              <h2 className="text-2xl font-bold text-stone-100 font-serif">
                {tribalAffiliation} Environmental Operations Center
              </h2>
              <p className="text-xs sm:text-sm text-stone-400 mt-1">
                Manage municipal water lead pipe remediation, citizen test kit distribution, and community health logs.
              </p>
            </div>

            {/* Department Switcher */}
            <div className="flex items-center gap-2 bg-stone-950 p-1.5 rounded-xl border border-stone-800">
              <button
                onClick={() => setSelectedGovDept('health')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  selectedGovDept === 'health' ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-white'
                }`}
              >
                Health Dept
              </button>
              <button
                onClick={() => setSelectedGovDept('water')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  selectedGovDept === 'water' ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-white'
                }`}
              >
                Water Manager
              </button>
              <button
                onClick={() => setSelectedGovDept('environmental')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  selectedGovDept === 'environmental' ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-white'
                }`}
              >
                Environmental
              </button>
            </div>
          </div>

          {/* METRIC CARDS FOR GOVERNMENT AUDIT */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-stone-900 border border-stone-800 rounded-xl p-5 space-y-1">
              <div className="text-xs text-stone-400 font-medium">Lead Pipe Replacement</div>
              <div className="text-2xl font-black text-amber-400">
                {leadPipeReplacedCount} / {totalLeadPipesCount}
              </div>
              <div className="text-xs text-stone-400">
                {Math.round((leadPipeReplacedCount / totalLeadPipesCount) * 100)}% Replaced
              </div>
            </div>

            <div className="bg-stone-900 border border-stone-800 rounded-xl p-5 space-y-1">
              <div className="text-xs text-stone-400 font-medium">Test Kits Distributed</div>
              <div className="text-2xl font-black text-emerald-400">
                {testKitsDistributed}
              </div>
              <div className="text-xs text-stone-400">Free Household Water & Soil Kits</div>
            </div>

            <div className="bg-stone-900 border border-stone-800 rounded-xl p-5 space-y-1">
              <div className="text-xs text-stone-400 font-medium">Community BLL Average</div>
              <div className="text-2xl font-black text-stone-100">
                {communityBllAverage} <span className="text-xs font-normal text-stone-400">µg/dL</span>
              </div>
              <div className="text-xs text-stone-400">Down from 4.2 µg/dL (2022)</div>
            </div>

            <div className="bg-stone-900 border border-stone-800 rounded-xl p-5 space-y-1">
              <div className="text-xs text-stone-400 font-medium">Remediation Escrow Grant</div>
              <div className="text-2xl font-black text-amber-300">
                $1.25M <span className="text-xs font-normal text-stone-400">USD</span>
              </div>
              <div className="text-xs text-stone-400">ICE Token Escrow Active</div>
            </div>
          </div>

          {/* CITIZEN REPORT INGESTION LOG TABLE */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-md space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-stone-100 flex items-center gap-2">
                  <Database className="w-5 h-5 text-amber-500" />
                  Citizen Test Kit Ingestion & Remediation Log
                </h3>
                <p className="text-xs text-stone-400">
                  Encrypted telemetry from citizens (like Ouray) submitting soil and tap water readings.
                </p>
              </div>

              <button
                onClick={() => setShowAddCitizenReportModal(true)}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all"
              >
                <Plus className="w-4 h-4" /> Log New Test Result
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-300">
                <thead className="bg-stone-950 text-stone-400 uppercase font-semibold text-[11px] border-b border-stone-800">
                  <tr>
                    <th className="p-3">Log ID</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Residency Sector</th>
                    <th className="p-3">Test Type</th>
                    <th className="p-3">Result Value</th>
                    <th className="p-3">Remediation Status</th>
                    <th className="p-3">ZKP Proof</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60">
                  {citizenLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-stone-800/40 transition-colors">
                      <td className="p-3 font-mono font-bold text-amber-400">{log.id}</td>
                      <td className="p-3 text-stone-400">{log.date}</td>
                      <td className="p-3 font-medium text-stone-200">{log.residency}</td>
                      <td className="p-3">{log.type}</td>
                      <td className="p-3 font-bold text-amber-300">{log.leadResult}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          {log.status}
                        </span>
                      </td>
                      <td className="p-3 font-mono text-[10px] text-stone-500">{log.zkpProof}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 4: MEMBERSHIP TIERS & FINANCIAL LEDGER                            */}
      {/* ========================================================================= */}
      {activePortalSubTab === 'membership_pricing' && (
        <div className="space-y-8 animate-fadeIn">
          
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Sovereign Funding & Membership</span>
            <h2 className="text-3xl font-bold text-stone-100 font-serif">
              Tiered Membership & Enterprise Grant Options
            </h2>
            <p className="text-sm text-stone-400">
              Grassroots access remains completely free for sovereign individuals. Enterprise tiers and donations directly fund soil chelation and water filtration for vulnerable communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Free Sovereign Tier */}
            <div className={`bg-stone-900 border rounded-2xl p-6 flex flex-col justify-between space-y-6 ${
              selectedTier === 'free' ? 'border-amber-500 ring-2 ring-amber-500/30' : 'border-stone-800'
            }`}>
              <div className="space-y-4">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-stone-800 text-stone-300 uppercase">
                  Grassroots Free
                </span>
                <h3 className="text-xl font-bold text-stone-100">Sovereign Individual</h3>
                <div className="text-3xl font-black text-amber-400">$0 <span className="text-xs font-normal text-stone-400">/ forever</span></div>
                <p className="text-xs text-stone-400">
                  Full access for individual community members (like Ouray) to construct address exposome profiles and store data securely.
                </p>
                <ul className="text-xs text-stone-300 space-y-2 pt-2 border-t border-stone-800">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-400" /> Unlimited Address Profiling</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-400" /> ZK-Proof Health Vault</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-400" /> Lifetime Trajectory Chart</li>
                </ul>
              </div>

              <button
                onClick={() => { setSelectedTier('free'); setPaymentSuccessModal(true); }}
                className="w-full py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-100 font-bold rounded-xl text-xs transition-all"
              >
                Select Free Tier
              </button>
            </div>

            {/* Supporter / Donor */}
            <div className={`bg-stone-900 border rounded-2xl p-6 flex flex-col justify-between space-y-6 ${
              selectedTier === 'supporter' ? 'border-amber-500 ring-2 ring-amber-500/30' : 'border-stone-800'
            }`}>
              <div className="space-y-4">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 uppercase">
                  Grassroots Supporter
                </span>
                <h3 className="text-xl font-bold text-stone-100">Restoration Fund Donor</h3>
                <div className="text-3xl font-black text-amber-400">${donationAmount} <span className="text-xs font-normal text-stone-400">/ donation</span></div>
                <p className="text-xs text-stone-400">
                  Directly funds free home lead water & soil test kits for families living on reservation lands.
                </p>
                <div className="flex items-center gap-1 pt-2">
                  {[25, 100, 250, 500].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setDonationAmount(amt)}
                      className={`px-2 py-1 text-[11px] font-bold rounded ${
                        donationAmount === amt ? 'bg-amber-500 text-stone-950' : 'bg-stone-800 text-stone-300'
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => { setSelectedTier('supporter'); setPaymentSuccessModal(true); }}
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs shadow transition-all"
              >
                Donate to Restoration Fund
              </button>
            </div>

            {/* Tribal Nation Grant */}
            <div className={`bg-stone-900 border rounded-2xl p-6 flex flex-col justify-between space-y-6 ${
              selectedTier === 'tribal_grant' ? 'border-amber-500 ring-2 ring-amber-500/30' : 'border-stone-800'
            }`}>
              <div className="space-y-4">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 uppercase">
                  Sovereign Nation
                </span>
                <h3 className="text-xl font-bold text-stone-100">Tribal Nation Enterprise</h3>
                <div className="text-3xl font-black text-amber-400">$2,500 <span className="text-xs font-normal text-stone-400">/ yr (or grant waived)</span></div>
                <p className="text-xs text-stone-400">
                  Full operational center for tribal health departments, environmental officers, and sovereign leaders.
                </p>
                <ul className="text-xs text-stone-300 space-y-2 pt-2 border-t border-stone-800">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-400" /> Tribal Operations Dashboard</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-400" /> Lead Pipe Remediation Tracking</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-400" /> Citizen Test Ingestion Engine</li>
                </ul>
              </div>

              <button
                onClick={() => { setSelectedTier('tribal_grant'); setPaymentSuccessModal(true); }}
                className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold rounded-xl text-xs transition-all"
              >
                Apply for Tribal Grant
              </button>
            </div>

            {/* Municipal Compliance */}
            <div className={`bg-stone-900 border rounded-2xl p-6 flex flex-col justify-between space-y-6 ${
              selectedTier === 'municipal' ? 'border-amber-500 ring-2 ring-amber-500/30' : 'border-stone-800'
            }`}>
              <div className="space-y-4">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 uppercase">
                  City & County
                </span>
                <h3 className="text-xl font-bold text-stone-100">Municipal Compliance</h3>
                <div className="text-3xl font-black text-amber-400">$5,000 <span className="text-xs font-normal text-stone-400">/ yr</span></div>
                <p className="text-xs text-stone-400">
                  Designed for municipal water departments, lead inspectors, and law enforcement agencies.
                </p>
                <ul className="text-xs text-stone-300 space-y-2 pt-2 border-t border-stone-800">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-400" /> EPA Compliance Reporting</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-400" /> Infrastructure Map Sync</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-amber-400" /> Multi-Inspector License</li>
                </ul>
              </div>

              <button
                onClick={() => { setSelectedTier('municipal'); setPaymentSuccessModal(true); }}
                className="w-full py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-100 font-bold rounded-xl text-xs transition-all"
              >
                Subscribe Municipal
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL: CRYPTOGRAPHIC ZK-PROOF CERTIFICATE */}
      {showZkKeyModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-stone-900 border border-amber-800/60 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <Shield className="w-5 h-5" />
                Zero-Knowledge Proof Certificate
              </div>
              <button onClick={() => setShowZkKeyModal(false)} className="text-stone-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3 text-xs text-stone-300">
              <div className="bg-stone-950 p-3 rounded-lg border border-stone-800 space-y-1 font-mono">
                <div className="text-stone-500">SUBJECT:</div>
                <div className="text-stone-100 font-bold">{memberName}</div>
                <div className="text-stone-500 mt-2">SOVEREIGN HASH:</div>
                <div className="text-amber-400">{zkVerificationStatus}</div>
                <div className="text-stone-500 mt-2">ZK-PROOF COMMITMENT:</div>
                <div className="text-stone-400 break-all">0x8F921A049B7C3E118940FD22910AA8423617152019A81726</div>
              </div>
              <p>
                This Zero-Knowledge Proof confirms that {memberName} is a verified human with authentic residency in {currentAddress}, without exposing unencrypted personal details.
              </p>
            </div>

            <button
              onClick={() => setShowZkKeyModal(false)}
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs"
            >
              Close Certificate
            </button>
          </div>
        </div>
      )}

      {/* MODAL: LOG NEW CITIZEN TEST RESULT */}
      {showAddCitizenReportModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="text-base font-bold text-stone-100">Log Citizen Environmental Test</h3>
              <button onClick={() => setShowAddCitizenReportModal(false)} className="text-stone-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-stone-300 font-bold block mb-1">Residency Sector / Location</label>
                <input
                  type="text"
                  placeholder="e.g., Dulce Sector 2"
                  className="w-full bg-stone-950 text-stone-100 border border-stone-700 rounded-lg p-2.5"
                  id="input-residency-sector"
                />
              </div>

              <div>
                <label className="text-stone-300 font-bold block mb-1">Test Sample Type</label>
                <select className="w-full bg-stone-950 text-stone-100 border border-stone-700 rounded-lg p-2.5" id="select-sample-type">
                  <option value="water">Home Tap Water Lead (ppb)</option>
                  <option value="soil">Yard Soil Lead (ppm)</option>
                  <option value="blood">Pediatric Capillary BLL (µg/dL)</option>
                </select>
              </div>

              <div>
                <label className="text-stone-300 font-bold block mb-1">Result Value</label>
                <input
                  type="text"
                  placeholder="e.g. 14.5 ppb"
                  className="w-full bg-stone-950 text-stone-100 border border-stone-700 rounded-lg p-2.5"
                  id="input-test-result-value"
                />
              </div>
            </div>

            <button
              onClick={() => {
                const newLog = {
                  id: `LOG-${Math.floor(100 + Math.random() * 900)}`,
                  date: new Date().toISOString().split('T')[0],
                  residency: 'Dulce Sector 2',
                  type: 'Home Tap Water Test',
                  leadResult: '14.5 ppb',
                  status: 'Remediation Pitcher Issued',
                  zkpProof: `0x${Math.floor(Math.random() * 1000000).toString(16)}...ZKP`
                };
                setCitizenLogs([newLog, ...citizenLogs]);
                setShowAddCitizenReportModal(false);
              }}
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs"
            >
              Submit Encrypted Log
            </button>
          </div>
        </div>
      )}

      {/* MODAL: PAYMENT / MEMBERSHIP SUCCESS */}
      {paymentSuccessModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-stone-900 border border-emerald-800/60 rounded-2xl max-w-md w-full p-6 space-y-4 text-center shadow-2xl">
            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-stone-100">Sovereign Membership Active</h3>
            <p className="text-xs text-stone-300">
              Your tier selection has been registered on the ICEarth ledger. Thank you for supporting sovereign environmental intelligence.
            </p>
            <button
              onClick={() => setPaymentSuccessModal(false)}
              className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold rounded-xl text-xs"
            >
              Return to Portal
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
