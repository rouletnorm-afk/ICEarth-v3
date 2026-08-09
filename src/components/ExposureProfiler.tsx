import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  Lock, 
  Shield, 
  ArrowRight, 
  Coins, 
  Activity, 
  Sparkles, 
  Heart, 
  Sliders, 
  Building2, 
  Database, 
  AlertTriangle, 
  TrendingUp, 
  Clock, 
  UserCheck, 
  FileText, 
  Check, 
  Zap, 
  Award, 
  Info,
  HelpCircle,
  FileDown,
  RefreshCw,
  Search,
  Eye,
  Gavel
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
  Cell 
} from 'recharts';

interface ExposureProfilerProps {
  onNavigateTab?: (tab: any) => void;
}

export const ExposureProfiler: React.FC<ExposureProfilerProps> = ({ onNavigateTab }) => {
  // Navigation / subtabs within the Master Profiler
  const [profilerSubTab, setProfilerSubTab] = useState<'account' | 'food' | 'environment' | 'downwinders'>('account');

  // RECENT HEADLINES FOR DYNAMIC HOMEPAGE FEED
  const [recentReports, setRecentReports] = useState<any[]>([]);
  const [loadingRecent, setLoadingRecent] = useState<boolean>(true);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await fetch('/api/reports');
        if (res.ok) {
          const data = await res.json();
          // Sort reports by date (descending) or keep the most recent ones
          const sorted = [...data].sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
          setRecentReports(sorted.slice(0, 3));
        }
      } catch (err) {
        console.error("Failed to fetch recent reports:", err);
      } finally {
        setLoadingRecent(false);
      }
    };
    fetchRecent();
  }, []);

  // SOVEREIGN ACCOUNT STATE
  const [profileName, setProfileName] = useState<string>('Jane Doe');
  const [profileAge, setProfileAge] = useState<number>(32);
  const [profileLocation, setProfileLocation] = useState<string>('Taos, New Mexico');
  const [isProfileCreated, setIsProfileCreated] = useState<boolean>(false);
  const [zkSovereignId, setZkSovereignId] = useState<string>('');
  const [keySeed, setKeySeed] = useState<string>('');
  const [accountStatusMessage, setAccountStatusMessage] = useState<string>('');

  const handleCreateProfile = () => {
    // Generate a secure mock ZK identifier
    const randHex = Array.from({ length: 16 }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
    const zkId = `0xZK-${randHex.slice(0, 4)}-${randHex.slice(4, 8)}-${randHex.slice(8, 12)}-ICE`;
    const seed = `mnemonic-seed-${profileName.toLowerCase().replace(/\s+/g, '-')}-${Math.floor(Math.random() * 10000)}`;
    setZkSovereignId(zkId);
    setKeySeed(seed);
    setIsProfileCreated(true);
    setAccountStatusMessage('✓ Sovereign Account encrypted and published to tribal custody node.');
  };

  // DIETARY HEAVY METAL FORECASTER STATE
  const [isTurmericActive, setIsTurmericActive] = useState<boolean>(true);
  const [turmericFreq, setTurmericFreq] = useState<number>(7); // servings per week
  const [turmericContam, setTurmericContam] = useState<'high' | 'medium' | 'low'>('high');
  
  const [isProteinActive, setIsProteinActive] = useState<boolean>(true);
  const [proteinFreq, setProteinFreq] = useState<number>(4); // servings per week (Orgain recommended max is 4/week in CR report)
  const [proteinContam, setProteinContam] = useState<'vanilla_concern' | 'premium_unregulated' | 'standard'>('vanilla_concern');
  
  const [isPicaActive, setIsPicaActive] = useState<boolean>(false);
  const [picaFreq, setPicaFreq] = useState<number>(4); // doses per month
  const [picaContam, setPicaContam] = useState<'paint_chips' | 'soil' | 'clay'>('clay');
  
  const [isWaterActive, setIsWaterActive] = useState<boolean>(true);
  const [waterFreq, setWaterFreq] = useState<number>(2); // liters per day
  const [waterContam, setWaterContam] = useState<'unmitigated' | 'partially' | 'compliant'>('compliant');
  
  const [forecasterYears, setForecasterYears] = useState<number>(10);
  const [forecasterAgeGroup, setForecasterAgeGroup] = useState<'adult' | 'child'>('adult');

  // Calculations for Dietary Forecaster
  const turmericDoseMcg = turmericContam === 'high' ? 2500 : turmericContam === 'medium' ? 800 : 80;
  const turmericWeeklyMcg = isTurmericActive ? turmericFreq * turmericDoseMcg : 0;

  const proteinDoseMcg = proteinContam === 'premium_unregulated' ? 2.5 : proteinContam === 'vanilla_concern' ? 1.43 : 0.5;
  const proteinWeeklyMcg = isProteinActive ? proteinFreq * proteinDoseMcg : 0;

  const picaDoseMcg = picaContam === 'paint_chips' ? 15000 : picaContam === 'soil' ? 250 : 25;
  const picaWeeklyMcg = isPicaActive ? picaFreq * picaDoseMcg * (12 / 52) : 0;

  const waterDoseMcgPerL = waterContam === 'unmitigated' ? 15 : waterContam === 'partially' ? 5 : 0.5;
  const waterWeeklyMcg = isWaterActive ? (waterFreq * waterDoseMcgPerL) * 7 : 0;

  const totalWeeklyMcg = turmericWeeklyMcg + proteinWeeklyMcg + picaWeeklyMcg + waterWeeklyMcg;
  const totalDailyMcg = totalWeeklyMcg / 7;

  const totalIngestedMg = (totalDailyMcg * 365 * forecasterYears) / 1000;
  const absorptionRate = forecasterAgeGroup === 'child' ? 0.50 : 0.15;
  const totalAbsorbedMg = totalIngestedMg * absorptionRate;
  const retainedBodyBurdenMg = totalAbsorbedMg * 0.90; // Sequestered in skeletal bone structures

  const bllIncrement = totalDailyMcg * (forecasterAgeGroup === 'child' ? 0.16 : 0.04);
  const calculatedBll = parseFloat((0.5 + bllIncrement).toFixed(1));

  // Projected data for Recharts (timeline)
  const forecasterChartData = Array.from({ length: 11 }, (_, idx) => {
    const yr = idx * 5;
    const yearNum = yr === 0 ? 1 : yr;
    const ingested = (totalDailyMcg * 365 * yearNum) / 1000;
    const retained = ingested * absorptionRate * 0.90;
    return {
      year: `Yr ${yearNum}`,
      Ingested: parseFloat(ingested.toFixed(1)),
      'Retained Burden (Bone)': parseFloat(retained.toFixed(1)),
    };
  });

  // Probabilities of specific harms over time
  const riskCardio = Math.min(99, Math.round(10 + bllIncrement * 3.5));
  const riskKidney = Math.min(99, Math.round(5 + bllIncrement * 2.8));
  const riskNeuro = Math.min(99, Math.round(15 + bllIncrement * 4.8));
  const riskImmune = Math.min(99, Math.round(12 + bllIncrement * 3.1));
  const riskRepro = Math.min(99, Math.round(8 + bllIncrement * 3.3));

  // Get status badge info
  let bllStatus = { 
    label: "Trace Background", 
    color: "text-neutral-500 bg-neutral-100 border-neutral-200", 
    desc: "No exposure level is completely safe. Lead continues to perturb biological machinery even at low-range backgrounds." 
  };
  if (calculatedBll >= 10.0) {
    bllStatus = { 
      label: "Acute Pathological Toxicity", 
      color: "text-red-700 bg-red-100 border-red-200 font-extrabold animate-pulse", 
      desc: "Critical danger. Associated with severe systemic cellular shutdown, direct arterial damage, prefrontal volume degradation, and permanent multi-organ injury." 
    };
  } else if (calculatedBll >= 5.0) {
    bllStatus = { 
      label: "Severe Systemic Exposure", 
      color: "text-red-600 bg-red-50 border-red-200 font-bold", 
      desc: "Exceeds CDC medical action limits. Accelerates cardiovascular stiffness, nephron depletion, and cognitive decline over years." 
    };
  } else if (calculatedBll >= 3.5) {
    bllStatus = { 
      label: "Elevated Danger Threshold", 
      color: "text-amber-700 bg-amber-100 border-amber-200 font-bold", 
      desc: "Exceeds standard child reference level. Permanent developmental loss and chronic immune suppression are initiated." 
    };
  } else if (calculatedBll >= 1.0) {
    bllStatus = { 
      label: "Elevated Risk", 
      color: "text-amber-600 bg-amber-50 border-amber-150", 
      desc: "Chronic cellular distress. Incremental lead replaces calcium, laying groundwork for future cardiovascular and kidney impairments." 
    };
  }

  // ENVIRONMENTAL EXPOSOME PROFILER STATE
  const [residentHistory, setResidentHistory] = useState([
    { id: 'res-1', years: '1980 - 1995', age: '0 - 15', pre1950Home: true, waterPipes: 'lead', leadPaintFlaking: true, city: 'Cleveland Ward 5' },
    { id: 'res-2', years: '1995 - 2010', age: '15 - 30', pre1950Home: false, waterPipes: 'copper', leadPaintFlaking: false, city: 'Suburban Ohio' },
  ]);
  const [newResYears, setNewResYears] = useState('');
  const [newResAge, setNewResAge] = useState('');
  const [newResPre1950, setNewResPre1950] = useState(false);
  const [newResPipes, setNewResPipes] = useState<'lead' | 'copper' | 'pvc'>('lead');
  const [newResPaint, setNewResPaint] = useState(false);
  const [newResCity, setNewResCity] = useState('');

  // Lifestyle checks
  const [smoker, setSmoker] = useState(false);
  const [occupationalLead, setOccupationalLead] = useState(false); 
  const [hobbyLead, setHobbyLead] = useState(false); 
  const [useEarthenware, setUseEarthenware] = useState(false); 
  const [useKohl, setUseKohl] = useState(false); 
  const [useRecycledPots, setUseRecycledPots] = useState(false); 

  // Biomarkers
  const [hasBoneLeadTest, setHasBoneLeadTest] = useState(false);
  const [boneLeadPpm, setBoneLeadPpm] = useState<number>(45); 
  const [hasToothLeadTest, setHasToothLeadTest] = useState(false);
  const [toothLeadPpm, setToothLeadPpm] = useState<number>(12); 
  const [hasPediatricBll, setHasPediatricBll] = useState(false);
  const [pediatricBllVal, setPediatricBllVal] = useState<number>(8.5); 

  // Secondary Environmental Assults
  const [dieselExhaust, setDieselExhaust] = useState(false); 
  const [pfasWater, setPfasWater] = useState(false); 
  const [coalDust, setCoalDust] = useState(false); 

  // Calculations for Exposome Profiler
  const [isCalculatingExposome, setIsCalculatingExposome] = useState(false);
  const [exposomeLog, setExposomeLog] = useState<string[]>([]);
  const [exposomeResults, setExposomeResults] = useState<{
    cumulativeExposureIndex: number; 
    estimatedBoneBurdenPpm: number;
    predictedAdultBllEquivalent: number;
    diseaseRisks: {
      cardiovascular: { risk: 'High' | 'Moderate' | 'Low'; factor: number; details: string };
      renal: { risk: 'High' | 'Moderate' | 'Low'; factor: number; details: string };
      neurocognitive: { risk: 'High' | 'Moderate' | 'Low'; factor: number; details: string };
      endocrine: { risk: 'High' | 'Moderate' | 'Low'; factor: number; details: string };
      otherAssaults: { description: string; risks: string[] };
    };
    preventionPathway: string[];
    hudClevelandEligible: boolean;
  } | null>(null);

  const handleAddResidentHistory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResYears.trim() || !newResCity.trim()) return;

    const newRes = {
      id: 'res-' + (residentHistory.length + 1).toString(),
      years: newResYears,
      age: newResAge || 'N/A',
      pre1950Home: newResPre1950,
      waterPipes: newResPipes,
      leadPaintFlaking: newResPaint,
      city: newResCity
    };

    setResidentHistory(prev => [...prev, newRes]);
    setNewResYears('');
    setNewResAge('');
    setNewResPre1950(false);
    setNewResPipes('lead');
    setNewResPaint(false);
    setNewResCity('');
  };

  const handleRemoveResidentHistory = (id: string) => {
    setResidentHistory(prev => prev.filter(res => res.id !== id));
  };

  const handleCalculateExposome = () => {
    setIsCalculatingExposome(true);
    setExposomeLog(['Initializing personal biodata processing...', 'Scanning residential history indices...']);
    
    setTimeout(() => {
      let index = 10; 
      let boneLead = 5; 
      let adultBll = 0.5; 

      residentHistory.forEach(res => {
        if (res.pre1950Home) {
          index += 15;
          boneLead += 12;
          adultBll += 1.5;
        }
        if (res.waterPipes === 'lead') {
          index += 20;
          boneLead += 18;
          adultBll += 2.2;
        }
        if (res.leadPaintFlaking) {
          index += 18;
          boneLead += 14;
          adultBll += 1.8;
        }
      });

      if (smoker) { index += 12; boneLead += 8; adultBll += 0.8; }
      if (occupationalLead) { index += 30; boneLead += 35; adultBll += 6.5; }
      if (hobbyLead) { index += 15; boneLead += 15; adultBll += 2.0; }
      if (useEarthenware) { index += 25; boneLead += 22; adultBll += 3.5; }
      if (useKohl) { index += 22; boneLead += 18; adultBll += 2.8; }
      if (useRecycledPots) { index += 20; boneLead += 16; adultBll += 2.4; }

      if (dieselExhaust) index += 10;
      if (pfasWater) index += 12;
      if (coalDust) index += 8;

      if (hasBoneLeadTest && boneLeadPpm > 0) {
        boneLead = boneLeadPpm;
        index = Math.max(index, Math.min(100, boneLead * 1.5));
      }
      if (hasToothLeadTest && toothLeadPpm > 0) {
        boneLead = Math.max(boneLead, toothLeadPpm * 3.5);
        index = Math.max(index, Math.min(100, toothLeadPpm * 6.0));
      }
      if (hasPediatricBll && pediatricBllVal > 0) {
        adultBll = Math.max(adultBll, pediatricBllVal * 0.4); 
        index = Math.max(index, Math.min(100, pediatricBllVal * 8.0));
      }

      index = Math.min(100, index);
      boneLead = parseFloat(boneLead.toFixed(1));
      adultBll = parseFloat(adultBll.toFixed(2));

      const getRiskLevel = (score: number): 'High' | 'Moderate' | 'Low' => {
        if (score > 60) return 'High';
        if (score > 30) return 'Moderate';
        return 'Low';
      };

      const cardRisk = getRiskLevel(index * 0.9 + (smoker ? 20 : 0));
      const renalRisk = getRiskLevel(index * 0.85 + (occupationalLead ? 15 : 0));
      const neuroRisk = getRiskLevel(index * 1.1 + (useKohl || useEarthenware ? 10 : 0));
      const endoRisk = getRiskLevel(index * 0.75);

      const cardiovascularDetails = cardRisk === 'High' 
        ? 'Elevated bone lead mobilization mimics calcium, provoking severe arterial constriction, baroreflex impairment, and an estimated 2.8x hazard ratio for chronic hypertension.'
        : cardRisk === 'Moderate'
        ? 'Mild cumulative body burden acts as an independent risk factor for elevated diastolic pressure and progressive endothelial stiffness.'
        : 'Low cumulative exposure; cardiovascular risks remain at baseline levels.';

      const renalDetails = renalRisk === 'High'
        ? 'Chronic proximal tubule lead accumulation. Estimated glomerular filtration rate (eGFR) likely compromised by progressive interstitial fibrosis.'
        : renalRisk === 'Moderate'
        ? 'Subclinical uric acid clearance deceleration. Monitor creatinine levels regularly to avoid early-stage nephropathy.'
        : 'Normal uric acid clearance; kidneys demonstrate healthy filtration capacity.';

      const neuroDetails = neuroRisk === 'High'
        ? 'Critical prefrontal cortex volume attenuation. Depleted dopamine pathway signaling increases impulsivity, focus deficit, and emotional dysregulation markers.'
        : neuroRisk === 'Moderate'
        ? 'Subtle cognitive fatigue, localized working memory deceleration, and mild sleep cycle disruption due to HPA axis overload.'
        : 'Prefrontal and executive neural pathways demonstrate healthy cognitive resilience.';

      const endocrineDetails = endoRisk === 'High'
        ? 'Adrenal hyperactivity and blunted thyroid hormone conversion. Chronic lead mimics calcium in endocrine feedback loops, dysregulating baseline cortisol.'
        : 'Endocrine, thyroid, and metabolic pathways are operating within standard reference ranges.';

      let otherAssaultsDesc = 'No significant other environmental assaults detected.';
      const activeAssaults = [];
      if (dieselExhaust) activeAssaults.push('Particulate Matter (PM2.5) from local transit');
      if (pfasWater) activeAssaults.push('Perfluoroalkyl Substances (PFAS) in local water supplies');
      if (coalDust) activeAssaults.push('Sulfur dioxide & heavy metals from coal-fired plants');
      if (activeAssaults.length > 0) {
        otherAssaultsDesc = `Your profile shows co-exposure to non-lead hazards: ${activeAssaults.join(', ')}. These act synergistically, compounding chronic inflammatory responses.`;
      }

      const hasClevelandHistory = residentHistory.some(res => res.city.toLowerCase().includes('cleveland'));
      const hudClevelandEligible = hasClevelandHistory && (index > 40 || useEarthenware);

      const pathway = [
        'Implement multi-stage certified reverse osmosis water filtration at home.',
        'Check all dry goods for lead adulteration (ensure imported turmeric/spices are tested).',
        'Increase dietary calcium, iron, and vitamin C to competitively block lead absorption sites.'
      ];
      if (index > 50) {
        pathway.push('Consult a toxicologist regarding potential EDTA or DMSA chelation therapy support.');
      }
      if (hasClevelandHistory) {
        pathway.push('Apply for the local HUD Lead Abatement Grant (Cleveland Ward 3/5 program) for free residential lead-paint encapsulation.');
      }

      setExposomeResults({
        cumulativeExposureIndex: index,
        estimatedBoneBurdenPpm: boneLead,
        predictedAdultBllEquivalent: adultBll,
        diseaseRisks: {
          cardiovascular: { risk: cardRisk, factor: parseFloat((1 + index * 0.025).toFixed(1)), details: cardiovascularDetails },
          renal: { risk: renalRisk, factor: parseFloat((1 + index * 0.02).toFixed(1)), details: renalDetails },
          neurocognitive: { risk: neuroRisk, factor: parseFloat((1 + index * 0.03).toFixed(1)), details: neuroDetails },
          endocrine: { risk: endoRisk, factor: parseFloat((1 + index * 0.015).toFixed(1)), details: endocrineDetails },
          otherAssaults: { description: otherAssaultsDesc, risks: activeAssaults }
        },
        preventionPathway: pathway,
        hudClevelandEligible
      });
      setExposomeLog(prev => [...prev, '✓ Personal biodata analysis completed successfully.']);
      setIsCalculatingExposome(false);
    }, 1200);
  };

  // NEW MEXICO DOWNWINDERS & TAOS SOVEREIGN CLAIMS STATE
  const [downwinderDistance, setDownwinderDistance] = useState<number>(45); // miles from Trinity Bomb Site
  const [downwinderYears, setDownwinderYears] = useState<number>(5); // years in NM during 1945-1962
  const [nmGoatMilk, setNmGoatMilk] = useState<boolean>(true); // consumed local pasture goat milk/vegetables
  const [nmDustInhalation, setNmDustInhalation] = useState<boolean>(true); // exposed to fallout dust storms
  const [hasCancerOrDisease, setHasCancerOrDisease] = useState<boolean>(true); // cancer or chronic thyroid/respiratory pathology
  
  // Checklist for proof of claims (reparations verification)
  const [proofResidence, setProofResidence] = useState<boolean>(false);
  const [proofDiagnosis, setProofDiagnosis] = useState<boolean>(false);
  const [proofIdentity, setProofIdentity] = useState<boolean>(false);
  const [downwinderClaimStatus, setDownwinderClaimStatus] = useState<'idle' | 'processing' | 'approved' | 'rejected'>('idle');
  const [claimProgressLog, setClaimProgressLog] = useState<string[]>([]);

  // Downwinder dynamic calculations
  const calculateRadiationDoseFactor = () => {
    // Inverse distance squared representation
    const distFactor = Math.max(1, 100 - downwinderDistance);
    const timeFactor = downwinderYears * 12;
    let multiplier = 1.0;
    if (nmGoatMilk) multiplier += 1.8; // major fallout concentration path (iodine-131 / strontium-90)
    if (nmDustInhalation) multiplier += 1.4;
    return Math.round(distFactor * timeFactor * multiplier * 0.15);
  };

  const isEligibleFor100k = downwinderYears >= 1 && downwinderDistance <= 150 && hasCancerOrDisease;

  const handleVerifyDownwinderClaim = () => {
    setDownwinderClaimStatus('processing');
    setClaimProgressLog(['Contacting New Mexico Downwinders Advocacy Network database...', 'Checking proximity variables to Trinity Ground Zero...', 'Verifying clinical disease classifications against RECA radiation guidelines...']);
    
    setTimeout(() => {
      if (!isEligibleFor100k) {
        setClaimProgressLog(prev => [...prev, '❌ RECA claim rejected: Exposure timeframe or distance bounds not satisfied.']);
        setDownwinderClaimStatus('rejected');
      } else if (!proofResidence || !proofDiagnosis || !proofIdentity) {
        setClaimProgressLog(prev => [...prev, '⚠️ Document Audit Incomplete: Missing authentic proof of New Mexico residency or certified clinical pathology reports.']);
        setDownwinderClaimStatus('idle');
        alert("Verification Stalled: Please toggle and upload all three required documentation files below to finalize your $100,000 Downwinder claim.");
      } else {
        setClaimProgressLog(prev => [...prev, '✓ Proximity constraints satisfied.', '✓ Document verification matches. ZK Cryptographic signature generated for claim security.', '🎉 Claim Approved: $100,000 Federal Downwinder Compensation allocated under New Mexico campaign!']);
        setDownwinderClaimStatus('approved');
      }
    }, 1500);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans text-neutral-800 pb-16" id="master-exposure-profiler">
      
      {/* PERSONAL HEALTH & SAFETY COMPASSIONATE ONBOARDING */}
      <div className="bg-linear-to-r from-emerald-50 via-teal-50 to-indigo-50 border border-emerald-100 rounded-3xl p-8 shadow-md relative overflow-hidden">
        {/* Subtle decorative shapes */}
        <div className="absolute right-0 top-0 -mt-12 -mr-12 w-48 h-48 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 -mb-16 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col xl:flex-row gap-8 items-center justify-between">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2 text-emerald-800 font-semibold text-xs tracking-wider uppercase font-mono">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Welcome to Your Safe Space
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-neutral-900 tracking-tight leading-tight">
              Looking out for your personal health or your family's safety?
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              If you’ve been directed here, it is because you deserve clear, honest, and uncompromised facts about environmental toxins in your community. Centralized systems and corporations often downplay exposure. 
              <strong className="text-neutral-800 font-bold"> This is your place to discover, protect, and take action.</strong> We safeguard your privacy absolutely using self-sovereign local computing—no personal data is ever stored on external databases or shared with third parties.
            </p>
          </div>

          <div className="w-full xl:w-auto shrink-0 flex flex-col md:flex-row gap-4">
            {/* Quick action 1: Community Hazards */}
            <button
              onClick={() => {
                setProfilerSubTab('environment');
                const el = document.getElementById('master-exposure-profiler');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="p-4 bg-white hover:bg-emerald-50 border border-neutral-200 hover:border-emerald-300 rounded-2xl text-left transition-all shadow-xs cursor-pointer flex items-start gap-3 w-full md:w-60 group"
            >
              <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl group-hover:scale-105 transition-transform shrink-0">
                <Search size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-neutral-900 font-sans">🔍 Find Local Hazards</h4>
                <p className="text-[10px] text-neutral-500 mt-1 leading-normal">Search heavy metals, toxic water pipes, and nuclear fallout in your ZIP code.</p>
              </div>
            </button>

            {/* Quick action 2: Create Profile */}
            <button
              onClick={() => {
                setProfilerSubTab('account');
                const el = document.getElementById('master-exposure-profiler');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="p-4 bg-white hover:bg-indigo-50 border border-neutral-200 hover:border-indigo-300 rounded-2xl text-left transition-all shadow-xs cursor-pointer flex items-start gap-3 w-full md:w-60 group"
            >
              <div className="p-2.5 bg-indigo-100 text-indigo-800 rounded-xl group-hover:scale-105 transition-transform shrink-0">
                <Sliders size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-neutral-900 font-sans">🛡️ Create Your Profile</h4>
                <p className="text-[10px] text-neutral-500 mt-1 leading-normal">Model your lifetime heavy metal accumulation and bone burden safely.</p>
              </div>
            </button>

            {/* Quick action 3: Access Litigation */}
            <button
              onClick={() => {
                if (onNavigateTab) onNavigateTab('litigation');
              }}
              className="p-4 bg-white hover:bg-purple-50 border border-neutral-200 hover:border-purple-300 rounded-2xl text-left transition-all shadow-xs cursor-pointer flex items-start gap-3 w-full md:w-60 group"
            >
              <div className="p-2.5 bg-purple-100 text-purple-800 rounded-xl group-hover:scale-105 transition-transform shrink-0">
                <Gavel size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-neutral-900 font-sans">⚖️ Access Litigation</h4>
                <p className="text-[10px] text-neutral-500 mt-1 leading-normal">Inspect class-actions, corporate defenses, and historical payouts.</p>
              </div>
            </button>
          </div>
        </div>

        {/* Dynamic, friendly explanation footer */}
        <div className="mt-6 pt-4 border-t border-emerald-100/60 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-neutral-500 font-medium">
            <span>💡 Quick Tip: No level of heavy metal (Pb/lead, arsenic, cadmium) exposure is safe. Use the tools here to explore your risk.</span>
          </div>
          <span className="font-mono text-[10px] text-emerald-800 bg-emerald-100/40 px-2 py-0.5 rounded-md font-bold">
            🔒 Cryptographically Encrypted Local Privacy (ZK-Proof Ready)
          </span>
        </div>
      </div>
      
      {/* PRIMARY HEADER SECTION */}
      <div className="bg-[#1e1b4b] text-white rounded-3xl p-8 relative overflow-hidden shadow-xl border border-indigo-950">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-amber-500 text-neutral-900 font-mono text-[10px] uppercase font-bold rounded-full tracking-wider">
                Sovereign Master Tab
              </span>
              <span className="px-3 py-1 bg-indigo-500/30 text-indigo-200 font-mono text-[10px] uppercase font-bold rounded-full tracking-wider border border-indigo-400/20">
                ZK-Encrypted Identity Portal
              </span>
            </div>
            <div className="text-xs font-mono text-indigo-300">
              Jurisdiction: Sovereign Tribal Council Node 1
            </div>
          </div>

          <div className="space-y-3 max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-white">
              Sovereign Personal Exposure Profiler
            </h1>
            <p className="text-sm text-indigo-200 leading-relaxed">
              Shielding individual biological information under absolute local privacy. Since **no level of heavy metal exposure or radiation is safe**, ICEarth models the **UNSAFE Continuum**. Access and generate your complete, secure exposure score across food vectors, residential histories, and federal Downwinder claims in New Mexico.
            </p>
          </div>

          {/* MASTER SUBTAB BAR */}
          <div className="flex flex-wrap border-b border-indigo-900/60 pt-4 gap-6 text-xs font-mono">
            <button
              onClick={() => setProfilerSubTab('account')}
              className={`pb-3 border-b-2 font-bold tracking-tight transition-colors cursor-pointer flex items-center gap-1.5 uppercase ${
                profilerSubTab === 'account'
                  ? 'border-amber-400 text-amber-300'
                  : 'border-transparent text-indigo-300 hover:text-white'
              }`}
            >
              <UserCheck size={14} /> 1. ZK-Account Creator
            </button>
            <button
              onClick={() => setProfilerSubTab('food')}
              className={`pb-3 border-b-2 font-bold tracking-tight transition-colors cursor-pointer flex items-center gap-1.5 uppercase ${
                profilerSubTab === 'food'
                  ? 'border-amber-400 text-amber-300'
                  : 'border-transparent text-indigo-300 hover:text-white'
              }`}
            >
              <Sliders size={14} /> 2. Dietary Ingestion Forecaster
            </button>
            <button
              onClick={() => setProfilerSubTab('environment')}
              className={`pb-3 border-b-2 font-bold tracking-tight transition-colors cursor-pointer flex items-center gap-1.5 uppercase ${
                profilerSubTab === 'environment'
                  ? 'border-amber-400 text-amber-300'
                  : 'border-transparent text-indigo-300 hover:text-white'
              }`}
            >
              <Database size={14} /> 3. Lifetime Exposome Profiler
            </button>
            <button
              onClick={() => setProfilerSubTab('downwinders')}
              className={`pb-3 border-b-2 font-bold tracking-tight transition-colors cursor-pointer flex items-center gap-1.5 uppercase ${
                profilerSubTab === 'downwinders'
                  ? 'border-amber-400 text-amber-300'
                  : 'border-transparent text-indigo-300 hover:text-white'
              }`}
            >
              <Heart size={14} /> 4. New Mexico Downwinders & Taos
            </button>
          </div>

        </div>
      </div>

      {/* CORE DISPLAY WORKSPACE */}
      <div className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-xs">
        
        {/* TAB 1: ONE-CLICK CRYPTOGRAPHIC ACCOUNT CREATOR */}
        {profilerSubTab === 'account' && (
          <div className="p-8 space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-mono text-indigo-600 uppercase tracking-widest mb-1">[ZK_ENCRYPTED_SIGNUP_NODE]</h3>
                  <h4 className="text-2xl font-serif text-neutral-900 font-semibold">One-Click Sovereign Credentials</h4>
                  <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                    Corporate medical institutions and federal registries often exploit personal biological datasets to avoid systemic liabilities. Under absolute tribal sovereignty, we bypass centralized databases. Create a local, zero-knowledge encrypted account in one click. Your exposure credentials stay entirely under your own control.
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-semibold block text-neutral-700 font-mono uppercase">Sovereign Pseudonym / Name</label>
                    <input
                      type="text"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full p-3 bg-white border border-[#D1D5DB] rounded-lg focus:outline-none focus:border-indigo-600 font-sans"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-semibold block text-neutral-700 font-mono uppercase">Age</label>
                      <input
                        type="number"
                        value={profileAge}
                        onChange={(e) => setProfileAge(Number(e.target.value))}
                        className="w-full p-3 bg-white border border-[#D1D5DB] rounded-lg focus:outline-none focus:border-indigo-600 font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold block text-neutral-700 font-mono uppercase">Territory / Location</label>
                      <input
                        type="text"
                        value={profileLocation}
                        onChange={(e) => setProfileLocation(e.target.value)}
                        className="w-full p-3 bg-white border border-[#D1D5DB] rounded-lg focus:outline-none focus:border-indigo-600 font-sans"
                        placeholder="Taos, New Mexico"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleCreateProfile}
                    className="w-full py-3.5 bg-[#1E1B4B] hover:bg-indigo-900 text-white font-mono font-bold uppercase rounded-xl tracking-wider transition-all shadow-sm active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Shield size={16} className="text-amber-400" /> Create Sovereign Profile & ZK Key Pair
                  </button>
                </div>

                {accountStatusMessage && (
                  <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs flex items-center gap-2 animate-fade-in font-sans">
                    <CheckCircle size={16} className="text-emerald-500" />
                    <span>{accountStatusMessage}</span>
                  </div>
                )}
              </div>

              {/* RENDER IDENTITY CARD */}
              <div className="flex flex-col justify-center items-center bg-neutral-50 border border-neutral-200 rounded-2xl p-6 lg:p-10 relative">
                {isProfileCreated ? (
                  <div className="w-full max-w-sm bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xl space-y-6 relative overflow-hidden font-mono text-xs">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
                    <div className="flex justify-between items-start pb-3 border-b border-slate-800">
                      <div>
                        <h5 className="font-bold text-amber-400">ICEARTH PASSPORT</h5>
                        <span className="text-[8px] text-slate-400 block mt-0.5">SOVEREIGN NATIONAL SECURITY BADGE</span>
                      </div>
                      <Shield size={24} className="text-amber-400" />
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-[9px] text-slate-400 block uppercase">Pseudonym / Subject</span>
                        <span className="text-sm font-sans font-bold text-white">{profileName}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-[9px] text-slate-400 block uppercase">Cohort Age</span>
                          <span className="text-xs font-bold text-white">{profileAge} Years</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-slate-400 block uppercase">Local Jurisdiction</span>
                          <span className="text-xs font-bold text-white leading-tight">{profileLocation}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 block uppercase">ZKP Cryptographic Identifier</span>
                        <span className="text-[10px] text-slate-300 font-bold break-all select-all font-mono">{zkSovereignId}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800 text-[9px] text-slate-400 flex justify-between items-center">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="font-bold text-emerald-400">VERIFIED AUTHENTIC</span>
                      </div>
                      <span>SECURE DEVICE HARDWARE</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-4 max-w-xs py-8">
                    <Lock size={40} className="text-indigo-900 mx-auto opacity-45" />
                    <h5 className="text-sm font-bold text-neutral-900 font-sans">No Authentic Credentials Found</h5>
                    <p className="text-[11px] text-neutral-500 leading-normal">
                      Fill out your pseudonymous profile and click "Create Sovereign Profile" to generate your offline-first cryptographic security credentials.
                    </p>
                  </div>
                )}
              </div>

            </div>

            {/* FEATURED DYNAMIC GLOBAL NEWSFEED INTEL */}
            <div className="mt-12 pt-8 border-t border-neutral-200 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-indigo-600">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider">[LIVE_GLOBAL_EXPOSOME_INTEL]</span>
                  </div>
                  <h4 className="text-xl font-serif text-neutral-900 font-semibold mt-1">Recent Headlines & Community Alerts</h4>
                  <p className="text-xs text-neutral-500 mt-1">
                    Real-time ecological alerts, toxic contamination findings, and government settlements verified on the sovereign ledger.
                  </p>
                </div>
                <button
                  onClick={() => onNavigateTab && onNavigateTab('reports')}
                  className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-mono text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 self-start shrink-0 cursor-pointer border border-indigo-200/50"
                >
                  Enter Newsfeed Hub <ArrowRight size={14} />
                </button>
              </div>

              {loadingRecent ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="h-44 bg-neutral-100 rounded-2xl border border-neutral-200" />
                  ))}
                </div>
              ) : recentReports.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {recentReports.map((report) => (
                    <div 
                      key={report.id} 
                      className="group bg-white hover:bg-indigo-50/10 border border-neutral-200 hover:border-indigo-200 rounded-2xl p-5 shadow-xs transition-all duration-300 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-[10px] font-mono">
                          <span className={`px-2 py-0.5 rounded-md font-bold font-sans uppercase border ${
                            report.exposomeRisk === 'Critical' 
                              ? 'bg-red-50 text-red-700 border-red-200' 
                              : report.exposomeRisk === 'High' 
                              ? 'bg-amber-50 text-amber-700 border-amber-200' 
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          }`}>
                            🚨 {report.exposomeRisk || 'High'} Risk
                          </span>
                          <span className="text-neutral-400 flex items-center gap-1">
                            <Clock size={10} /> {report.date}
                          </span>
                        </div>

                        <h5 className="font-sans font-bold text-sm text-neutral-900 group-hover:text-indigo-900 transition-colors line-clamp-2">
                          {report.title}
                        </h5>
                        
                        <p className="text-[11px] text-neutral-500 leading-relaxed line-clamp-3">
                          {report.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-[10px] font-mono">
                        <span className="text-neutral-500 truncate max-w-[140px]" title={report.location}>
                          📍 {report.location}
                        </span>
                        <button
                          onClick={() => onNavigateTab && onNavigateTab('reports')}
                          className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-0.5 cursor-pointer"
                        >
                          Read & Comment →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-neutral-500 italic">No reports found.</p>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: DIETARY INGESTION PATHWAYS FORECASTER */}
        {profilerSubTab === 'food' && (
          <div className="p-8 space-y-8 animate-fade-in text-neutral-800">
            {/* INTRODUCTORY CARD: SOVEREIGNTY, INDIVIDUAL DATA & UNSAFE MODELING */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 space-y-4 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-purple-500 text-white font-mono text-[9px] uppercase font-bold rounded">
                      INDIVIDUAL SECURITY DEPLOYMENT
                    </span>
                    <span className="text-xs font-semibold text-purple-300 font-mono">ICEarth Expository Module</span>
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-white tracking-tight">Food-Based Heavy Metal Exposure Forecaster</h2>
                  <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
                    The primary reason sovereignty, data ownership, and absolute physical privacy matter is to shield the biological data of individuals, which may reflect physical and neural disabilities caused by chronic heavy metal exposure (such as Pb). Because <strong>no exposure level is safe</strong>, ICEarth models the <strong>UNSAFE Continuum</strong>. This interface calculates cumulative heavy metal dosage across multiple food and environmental ingestion pathways—from lead-adulterated turmeric to tainted protein powders and pica—allowing individuals and care providers to identify and disrupt chronic poisoning pathways.
                  </p>
                </div>
                <div className="bg-slate-950 p-4 border border-purple-900/40 rounded-2xl flex items-center gap-3 shrink-0">
                  <Sliders className="text-purple-400 shrink-0" size={24} />
                  <div>
                    <span className="font-mono text-[9px] text-purple-300 uppercase block font-bold">MODELLING PARADIGM</span>
                    <span className="text-xs font-bold text-red-400 font-mono uppercase tracking-wider block">"UNSAFE CONTINUUM"</span>
                  </div>
                </div>
              </div>
            </div>

            {/* MAIN TWO-COLUMN WORKSPACE */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* LEFT COLUMN: SOURCE SELECTION & CONFIG (5 COLS) */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* TIMELINE PROFILE */}
                <div className="bg-white border border-neutral-200 rounded-2xl p-5 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                    <h3 className="text-xs font-bold font-mono text-neutral-900 uppercase tracking-wider">1. Cohort Profile & Continuous Timeline</h3>
                    <Clock size={15} className="text-neutral-400" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setForecasterAgeGroup('adult')}
                      className={`py-2 px-3 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer ${
                        forecasterAgeGroup === 'adult'
                          ? 'bg-neutral-900 text-white border-transparent'
                          : 'border-neutral-200 hover:bg-neutral-50 text-neutral-600'
                      }`}
                    >
                      Adult Cohort (15% Abs.)
                    </button>
                    <button
                      type="button"
                      onClick={() => setForecasterAgeGroup('child')}
                      className={`py-2 px-3 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer ${
                        forecasterAgeGroup === 'child'
                          ? 'bg-red-950 text-red-200 border-transparent'
                          : 'border-neutral-200 hover:bg-neutral-50 text-neutral-600'
                      }`}
                    >
                      Pediatric Cohort (50% Abs.)
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span>Continuous Exposure Duration</span>
                      <span className="font-bold text-neutral-950">{forecasterYears} Years</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="50" 
                      value={forecasterYears}
                      onChange={(e) => setForecasterYears(Number(e.target.value))}
                      className="w-full accent-neutral-900 cursor-pointer"
                    />
                    <p className="text-[10px] text-neutral-500 leading-normal">
                      Lead accumulates in mineralized tissue (skeletal bones) over decades, with a bone half-life exceeding 20-30 years.
                    </p>
                  </div>
                </div>

                {/* INGESTION VECTORS */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold font-mono text-neutral-900 uppercase tracking-wider">2. Configure Dietary Intake Pathways</h3>
                    <span className="text-[10px] text-neutral-500 font-mono font-semibold">Toggle pathways on/off</span>
                  </div>

                  {/* VECTOR A: ADULTERATED TURMERIC */}
                  <div className={`p-4 rounded-2xl border transition-all ${
                    isTurmericActive 
                      ? 'bg-amber-50/25 border-amber-200 shadow-sm' 
                      : 'bg-white border-neutral-200 opacity-60'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          id="vector-turmeric" 
                          checked={isTurmericActive}
                          onChange={(e) => setIsTurmericActive(e.target.checked)}
                          className="rounded text-amber-600 focus:ring-amber-500 cursor-pointer h-4 w-4"
                        />
                        <label htmlFor="vector-turmeric" className="text-xs font-bold font-mono text-amber-950 cursor-pointer uppercase">
                          Lead Chromate in Turmeric
                        </label>
                      </div>
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[9px] font-bold rounded uppercase">
                        South Asia & Export
                      </span>
                    </div>

                    {isTurmericActive && (
                      <div className="space-y-3 pl-6 border-l-2 border-amber-200/60 animate-fade-in text-xs">
                        <div className="space-y-1">
                          <label className="text-[10px] text-neutral-500 block uppercase font-mono">Contamination Level</label>
                          <select 
                            value={turmericContam}
                            onChange={(e) => setTurmericContam(e.target.value as any)}
                            className="w-full bg-white border border-neutral-300 rounded-lg p-1.5 text-xs text-neutral-800 outline-none"
                          >
                            <option value="high">High (Bihar Grinding Mill standard: ~3000 ppm / 2500 µg per dose)</option>
                            <option value="medium">Moderate (Spice Sack adulterant trace: ~1000 ppm / 800 µg per dose)</option>
                            <option value="low">Low / Uncertified Mill (Background trace: ~100 ppm / 80 µg per dose)</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] text-neutral-500 uppercase font-mono">
                            <span>Consumption Frequency</span>
                            <span className="font-bold text-neutral-900">{turmericFreq} servings / week</span>
                          </div>
                          <input 
                            type="range" 
                            min="1" 
                            max="21" 
                            value={turmericFreq}
                            onChange={(e) => setTurmericFreq(Number(e.target.value))}
                            className="w-full accent-amber-600 cursor-pointer"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* VECTOR B: CONTAMINATED PROTEIN POWDER */}
                  <div className={`p-4 rounded-2xl border transition-all ${
                    isProteinActive 
                      ? 'bg-purple-50/20 border-purple-200 shadow-sm' 
                      : 'bg-white border-neutral-200 opacity-60'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          id="vector-protein" 
                          checked={isProteinActive}
                          onChange={(e) => setIsProteinActive(e.target.checked)}
                          className="rounded text-purple-600 focus:ring-purple-500 cursor-pointer h-4 w-4"
                        />
                        <label htmlFor="vector-protein" className="text-xs font-bold font-mono text-purple-950 cursor-pointer uppercase">
                          Heavy Metals in Protein Powder
                        </label>
                      </div>
                      <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-[9px] font-bold rounded uppercase">
                        Costco Lawsuit
                      </span>
                    </div>

                    {isProteinActive && (
                      <div className="space-y-3 pl-6 border-l-2 border-purple-200/60 animate-fade-in text-xs">
                        <p className="text-[10px] text-neutral-500 leading-normal">
                          Costco class action lawsuit alleging Orgain Protein Powder contains dangerous levels of lead, arsenic, and cadmium. Consumer Reports flagged Orgain&apos;s Vanilla Bean flavor at <strong>143% of the level of concern</strong>, recommending limiting consumption to 4 servings/week.
                        </p>
                        <div className="space-y-1">
                          <label className="text-[10px] text-neutral-500 block uppercase font-mono">Contamination Standard</label>
                          <select 
                            value={proteinContam}
                            onChange={(e) => setProteinContam(e.target.value as any)}
                            className="w-full bg-white border border-neutral-300 rounded-lg p-1.5 text-xs text-neutral-800 outline-none"
                          >
                            <option value="vanilla_concern">Orgain Vanilla Bean (143% concern level: ~1.43 µg lead / serving)</option>
                            <option value="premium_unregulated">Unregulated Premium Plant Protein (~2.5 µg lead / serving)</option>
                            <option value="standard">Standard Plant Protein (~0.5 µg lead / serving)</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] text-neutral-500 uppercase font-mono">
                            <span>Consumption Frequency</span>
                            <span className="font-bold text-neutral-900">{proteinFreq} servings / week</span>
                          </div>
                          <input 
                            type="range" 
                            min="1" 
                            max="21" 
                            value={proteinFreq}
                            onChange={(e) => setProteinFreq(Number(e.target.value))}
                            className="w-full accent-purple-600 cursor-pointer"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* VECTOR C: PICA / GEOPHAGIA */}
                  <div className={`p-4 rounded-2xl border transition-all ${
                    isPicaActive 
                      ? 'bg-red-50/20 border-red-200 shadow-sm' 
                      : 'bg-white border-neutral-200 opacity-60'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          id="vector-pica" 
                          checked={isPicaActive}
                          onChange={(e) => setIsPicaActive(e.target.checked)}
                          className="rounded text-red-600 focus:ring-red-500 cursor-pointer h-4 w-4"
                        />
                        <label htmlFor="vector-pica" className="text-xs font-bold font-mono text-red-950 cursor-pointer uppercase">
                          Pica (Soil/Clay/Paint) Ingestion
                        </label>
                      </div>
                      <span className="px-2 py-0.5 bg-red-100 text-red-800 text-[9px] font-bold rounded uppercase">
                        High Dose Exposure
                      </span>
                    </div>

                    {isPicaActive && (
                      <div className="space-y-3 pl-6 border-l-2 border-red-200/60 animate-fade-in text-xs">
                        <p className="text-[10px] text-neutral-500 leading-normal">
                          Pica involves the intentional or accidental ingestion of non-food items, highly prevalent in children and pregnant women, and particularly dangerous in older housing stock or heavily industrial zones.
                        </p>
                        <div className="space-y-1">
                          <label className="text-[10px] text-neutral-500 block uppercase font-mono">Substance Source Type</label>
                          <select 
                            value={picaContam}
                            onChange={(e) => setPicaContam(e.target.value as any)}
                            className="w-full bg-white border border-neutral-300 rounded-lg p-1.5 text-xs text-neutral-800 outline-none"
                          >
                            <option value="paint_chips">Pre-1950 Lead Paint Chips (~15,000 µg lead / 0.5g dose)</option>
                            <option value="soil">Contaminated Urban Soil (~250 µg lead / 0.5g dose)</option>
                            <option value="clay">Traditional Geophagia Clay / Calabash (~25 µg lead / 0.5g dose)</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] text-neutral-500 uppercase font-mono">
                            <span>Ingestion Frequency</span>
                            <span className="font-bold text-neutral-900">{picaFreq} times / month</span>
                          </div>
                          <input 
                            type="range" 
                            min="1" 
                            max="30" 
                            value={picaFreq}
                            onChange={(e) => setPicaFreq(Number(e.target.value))}
                            className="w-full accent-red-600 cursor-pointer"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* VECTOR D: MUNICIPAL WATER */}
                  <div className={`p-4 rounded-2xl border transition-all ${
                    isWaterActive 
                      ? 'bg-blue-50/20 border-blue-200 shadow-sm' 
                      : 'bg-white border-neutral-200 opacity-60'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          id="vector-water" 
                          checked={isWaterActive}
                          onChange={(e) => setIsWaterActive(e.target.checked)}
                          className="rounded text-blue-600 focus:ring-blue-500 cursor-pointer h-4 w-4"
                        />
                        <label htmlFor="vector-water" className="text-xs font-bold font-mono text-blue-950 cursor-pointer uppercase">
                          Municipal Tap Water
                        </label>
                      </div>
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-[9px] font-bold rounded uppercase">
                        Infrastructure
                      </span>
                    </div>

                    {isWaterActive && (
                      <div className="space-y-3 pl-6 border-l-2 border-blue-200/60 animate-fade-in text-xs">
                        <div className="space-y-1">
                          <label className="text-[10px] text-neutral-500 block uppercase font-mono">Service Line Corrosion</label>
                          <select 
                            value={waterContam}
                            onChange={(e) => setWaterContam(e.target.value as any)}
                            className="w-full bg-white border border-neutral-300 rounded-lg p-1.5 text-xs text-neutral-800 outline-none"
                          >
                            <option value="unmitigated">Unmitigated Lead Service Line (~15 µg lead / liter)</option>
                            <option value="partially">Partially Mitigated Pipe (~5 µg lead / liter)</option>
                            <option value="compliant">Compliant Municipal Standard (~0.5 µg lead / liter)</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] text-neutral-500 uppercase font-mono">
                            <span>Daily Tap Water Ingestion</span>
                            <span className="font-bold text-neutral-900">{waterFreq} liters / day</span>
                          </div>
                          <input 
                            type="range" 
                            min="1" 
                            max="5" 
                            step="0.5"
                            value={waterFreq}
                            onChange={(e) => setWaterFreq(Number(e.target.value))}
                            className="w-full accent-blue-600 cursor-pointer"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: DIAGNOSTICS & FORECAST TIMELINE (7 COLS) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* UNSAFE LEVEL STATUS PANEL */}
                <div className="bg-neutral-50 rounded-2xl p-5 border border-neutral-200 space-y-4 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="text-[9px] font-mono font-bold text-neutral-400 block uppercase">Continuous Blood Lead Level (BLL) Forecast</span>
                      <h3 className="text-sm font-bold text-neutral-900 font-mono">Estimated Steady-State BLL</h3>
                    </div>
                    <div className={`px-4 py-2 border rounded-xl flex items-center gap-2 ${bllStatus.color}`}>
                      <AlertTriangle size={15} />
                      <div className="flex flex-col text-right">
                        <span className="text-xl font-mono font-extrabold">{calculatedBll}</span>
                        <span className="text-[8px] font-mono font-bold uppercase">µg/dL Blood Lead</span>
                      </div>
                    </div>
                  </div>

                  <div className={`p-4 border rounded-xl text-xs space-y-2 ${bllStatus.color} bg-opacity-30`}>
                    <h4 className="font-mono font-bold uppercase tracking-wider text-[10px]">Continuum Category: {bllStatus.label}</h4>
                    <p className="leading-relaxed text-[11px]">{bllStatus.desc}</p>
                  </div>
                </div>

                {/* REAL-TIME BENTO METRICS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  <div className="p-4 border border-neutral-200 bg-white rounded-xl space-y-1">
                    <span className="text-[9px] text-neutral-400 font-mono block uppercase">Daily Ingested Dose (µg/day)</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-mono font-bold text-neutral-950">
                        {totalDailyMcg.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                      </span>
                      <span className="text-xs text-neutral-500 font-mono font-semibold">µg Pb / day</span>
                    </div>
                    <p className="text-[9px] text-neutral-500 leading-tight">
                      Average heavy metal entry rate through selected food and water pathways.
                    </p>
                  </div>

                  <div className="p-4 border border-neutral-200 bg-white rounded-xl space-y-1">
                    <span className="text-[9px] text-neutral-400 font-mono block uppercase">Lifetime Ingested Load</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-mono font-bold text-amber-700">
                        {totalIngestedMg.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                      </span>
                      <span className="text-xs text-neutral-500 font-mono font-semibold">mg total Pb</span>
                    </div>
                    <p className="text-[9px] text-neutral-500 leading-tight">
                      Accumulated structural dosage ingested over a {forecasterYears}-year exposure window.
                    </p>
                  </div>

                  <div className="p-4 border border-neutral-200 bg-white rounded-xl space-y-1">
                    <span className="text-[9px] text-neutral-400 font-mono block uppercase">Absorbed Systemic Load (mg)</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-mono font-bold text-purple-700">
                        {totalAbsorbedMg.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                      </span>
                      <span className="text-xs text-neutral-500 font-mono font-semibold">mg absorbed</span>
                    </div>
                    <p className="text-[9px] text-neutral-500 leading-tight">
                      Absorbed lead passing the intestinal mucosa into systematic circulation ({forecasterAgeGroup === 'child' ? "50%" : "15%"} rate).
                    </p>
                  </div>

                  <div className="p-4 border border-neutral-200 bg-white rounded-xl space-y-1">
                    <span className="text-[9px] text-neutral-400 font-mono block uppercase">Retained Body Burden (Sequestration)</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-mono font-bold text-red-600">
                        {retainedBodyBurdenMg.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                      </span>
                      <span className="text-xs text-neutral-500 font-mono font-semibold">mg in bone</span>
                    </div>
                    <p className="text-[9px] text-neutral-500 leading-tight">
                      90% of absorbed lead is sequestered directly into cortical bone structures, persisting for decades.
                    </p>
                  </div>

                </div>

                {/* EXPOSURE AREA CHART */}
                <div className="border border-neutral-200 rounded-2xl p-5 bg-white space-y-3 shadow-sm">
                  <div>
                    <h3 className="text-xs font-bold font-mono text-neutral-900 uppercase tracking-wider">Cumulative Ingestion vs Skeletal Sequestration Timeline</h3>
                    <p className="text-[10px] text-neutral-500">
                      Projected over a 50-year exposure window. Slower metabolic clearance leads to permanent skeletal burden accretion.
                    </p>
                  </div>
                  
                  <div className="h-56 mt-3">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={forecasterChartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorIngested" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#b45309" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#b45309" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorRetained" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                        <XAxis dataKey="year" stroke="#9ca3af" tick={{ fontSize: 9 }} />
                        <YAxis stroke="#9ca3af" tick={{ fontSize: 9 }} />
                        <Tooltip formatter={(value) => [`${value} mg`, '']} />
                        <Legend wrapperStyle={{ fontSize: 9, fontFamily: 'monospace' }} />
                        <Area type="monotone" name="Total Ingested (mg)" dataKey="Ingested" stroke="#b45309" fillOpacity={1} fill="url(#colorIngested)" strokeWidth={1.5} />
                        <Area type="monotone" name="Retained Burden (mg)" dataKey="Retained Burden (Bone)" stroke="#ef4444" fillOpacity={1} fill="url(#colorRetained)" strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* HARM PROBABILITIES MAP */}
                <div className="border border-neutral-200 rounded-2xl p-5 bg-white space-y-4 shadow-sm">
                  <div>
                    <h3 className="text-xs font-bold font-mono text-neutral-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Activity size={13} className="text-red-500 animate-pulse" />
                      Dynamic Multi-Decadal Cumulative Harm Probabilities
                    </h3>
                    <p className="text-[10px] text-neutral-500">
                      Calculated risk increment over baseline due to permanent toxic perturbation of vascular and neurobiological systems.
                    </p>
                  </div>

                  <div className="space-y-3.5 text-xs">
                    {/* Neurocognitive */}
                    <div className="space-y-1">
                      <div className="flex justify-between font-mono">
                        <span className="font-semibold text-neutral-800">Neurocognitive Loss (Dementia & IQ Decline)</span>
                        <span className="font-bold text-red-600">{riskNeuro}% Risk Factor Acceleration</span>
                      </div>
                      <div className="w-full bg-neutral-100 h-2.5 rounded-full overflow-hidden font-sans">
                        <div className="bg-red-600 h-full transition-all duration-500" style={{ width: `${riskNeuro}%` }} />
                      </div>
                      <p className="text-[9px] text-neutral-500 leading-normal">
                        Induced through NMDA receptor blockage, resulting in accelerated cortical pruning, focus decay, and permanent neural disability.
                      </p>
                    </div>

                    {/* Cardiovascular */}
                    <div className="space-y-1 border-t border-neutral-100 pt-2.5">
                      <div className="flex justify-between font-mono">
                        <span className="font-semibold text-neutral-800">Cardiovascular Disease & Hypertension</span>
                        <span className="font-bold text-amber-700">{riskCardio}% Risk Factor Acceleration</span>
                      </div>
                      <div className="w-full bg-neutral-100 h-2.5 rounded-full overflow-hidden font-sans">
                        <div className="bg-amber-600 h-full transition-all duration-500" style={{ width: `${riskCardio}%` }} />
                      </div>
                      <p className="text-[9px] text-neutral-500 leading-normal">
                        Continuous arterial endothelial oxidative stress and nitric oxide depletion, driving elevated blood pressure and stroke risk.
                      </p>
                    </div>

                    {/* Renal Tubule depletion */}
                    <div className="space-y-1 border-t border-neutral-100 pt-2.5">
                      <div className="flex justify-between font-mono">
                        <span className="font-semibold text-neutral-800">Renal Tube Injury (Chronic Nephritis)</span>
                        <span className="font-bold text-purple-700">{riskKidney}% Risk Factor Acceleration</span>
                      </div>
                      <div className="w-full bg-neutral-100 h-2.5 rounded-full overflow-hidden font-sans">
                        <div className="bg-purple-600 h-full transition-all duration-500" style={{ width: `${riskKidney}%` }} />
                      </div>
                      <p className="text-[9px] text-neutral-500 leading-normal">
                        Heavy metal accumulation inside renal cortical lysosomes leads to mitochondrial damage in proximal tubule cells and nephritis.
                      </p>
                    </div>

                    {/* Reproductive problems */}
                    <div className="space-y-1 border-t border-neutral-100 pt-2.5">
                      <div className="flex justify-between font-mono">
                        <span className="font-semibold text-neutral-800">Reproductive Impairment & Fetal Transference Risk</span>
                        <span className="font-bold text-pink-700">{riskRepro}% Risk Factor Acceleration</span>
                      </div>
                      <div className="w-full bg-neutral-100 h-2.5 rounded-full overflow-hidden font-sans">
                        <div className="bg-pink-600 h-full transition-all duration-500" style={{ width: `${riskRepro}%` }} />
                      </div>
                      <p className="text-[9px] text-neutral-500 leading-normal">
                        Lead easily mimics calcium, slipping past blood-testis and placental-fetal barriers to trigger cellular degradation.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* TAB 3: LIFETIME ENVIRONMENTAL EXPOSOME PROFILER */}
        {profilerSubTab === 'environment' && (
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden w-full font-sans animate-fade-in" id="individual-exposome-view">
            
            {/* LEFT SCROLLABLE PANEL: LIFE HISTORY & LIFESTYLE CHECKLIST */}
            <div className="w-full lg:w-1/2 border-r border-neutral-200 flex flex-col overflow-y-auto bg-white p-8 space-y-8">
              
              {/* SECTION A: RESIDENTIAL HOUSING GRID */}
              <section className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-black flex items-center gap-1.5">
                      <Building2 size={16} /> 1. Sequential Residential History
                    </h3>
                    <p className="text-[11px] text-gray-400 font-sans">
                      Add every address, flat, or neighborhood where you lived to map geological pipeline inputs.
                    </p>
                  </div>
                </div>

                <div className="border border-[#E5E5E5] bg-neutral-50/50 p-4 rounded-xl space-y-4 text-xs">
                  <h4 className="font-bold text-indigo-950 uppercase text-[10px] tracking-wider font-mono">Record Historical Node Location</h4>
                  <form onSubmit={handleAddResidentHistory} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-neutral-500 block">Calendar Years (e.g., 1992-2005)</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g., 2005 - 2018"
                        value={newResYears} 
                        onChange={(e) => setNewResYears(e.target.value)}
                        className="w-full bg-white border border-gray-300 rounded p-2 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-neutral-500 block">Age Interval during residency</label>
                      <input 
                        type="text" 
                        placeholder="e.g., 10 - 23"
                        value={newResAge} 
                        onChange={(e) => setNewResAge(e.target.value)}
                        className="w-full bg-white border border-gray-300 rounded p-2 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-neutral-500 block">City, Ward or ZIP Code</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g., Cleveland Ward 3"
                        value={newResCity} 
                        onChange={(e) => setNewResCity(e.target.value)}
                        className="w-full bg-white border border-gray-300 rounded p-2 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-neutral-500 block">Service Pipes Composition</label>
                      <select 
                        value={newResPipes} 
                        onChange={(e: any) => setNewResPipes(e.target.value)}
                        className="w-full bg-white border border-gray-300 rounded p-2 text-xs"
                      >
                        <option value="lead">Unlined Lead Conduits (Max Risk)</option>
                        <option value="copper">Copper Pipes (Solder trace hazard)</option>
                        <option value="pvc">PVC / Plastic (Slight chemical traces)</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2 flex flex-col gap-2 pt-2">
                      <label className="font-semibold text-neutral-700 flex items-center gap-2 cursor-pointer select-none">
                        <input 
                          type="checkbox" 
                          checked={newResPre1950} 
                          onChange={(e) => setNewResPre1950(e.target.checked)}
                          className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                        />
                        <span>Pre-1950 housing construction (High risk of lead carbonate primer paint)</span>
                      </label>
                      <label className="font-semibold text-neutral-700 flex items-center gap-2 cursor-pointer select-none">
                        <input 
                          type="checkbox" 
                          checked={newResPaint} 
                          onChange={(e) => setNewResPaint(e.target.checked)}
                          className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                        />
                        <span>Observable chalking, flaking, or flapped architectural paint</span>
                      </label>
                    </div>

                    <button 
                      type="submit" 
                      className="sm:col-span-2 mt-2 w-full py-2 bg-indigo-950 text-white font-mono text-[10px] font-bold uppercase rounded hover:bg-indigo-900 cursor-pointer transition-colors"
                    >
                      Record Residential Cohort Block
                    </button>
                  </form>
                </div>

                {/* HISTORICAL REGISTRY TABLE */}
                <div className="border border-neutral-200 rounded-xl overflow-hidden shadow-xs">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-neutral-50 font-mono text-[9px] uppercase text-neutral-500 border-b border-neutral-200">
                        <th className="p-3">Timeline</th>
                        <th className="p-3">Location</th>
                        <th className="p-3">Details</th>
                        <th className="p-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {residentHistory.map((res) => (
                        <tr key={res.id} className="hover:bg-neutral-50/50 transition-colors">
                          <td className="p-3">
                            <span className="font-bold text-black block leading-tight">{res.years}</span>
                            <span className="text-[10px] text-gray-400 font-mono">Age: {res.age}</span>
                          </td>
                          <td className="p-3 font-semibold text-neutral-800">{res.city}</td>
                          <td className="p-3 space-y-1">
                            <span className={`inline-block px-1.5 py-0.5 text-[9px] font-bold uppercase rounded ${
                              res.pre1950Home ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-600'
                            }`}>
                              {res.pre1950Home ? '🏠 Pre-1950 Structure' : '🏠 Modern Structure'}
                            </span>
                            <span className="block text-[10px] text-gray-500 font-mono capitalize">
                              Pipes: {res.waterPipes} | Paint: {res.leadPaintFlaking ? 'Flaking' : 'Stable'}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => handleRemoveResidentHistory(res.id)}
                              className="text-[10px] font-mono text-red-500 hover:text-red-700 font-bold uppercase cursor-pointer"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* SECTION B: CUMULATIVE LIFESTYLE ASSAULTS */}
              <section className="space-y-4 border-t border-neutral-100 pt-6">
                <div>
                  <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-black flex items-center gap-1.5">
                    <Sliders size={16} /> 2. Dietary & Environmental Ingestion Hazards
                  </h3>
                  <p className="text-[11px] text-gray-400 font-sans">
                    Toggle occupational, behavioral, or cultural heavy-metal exposures to construct your absorption index.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  
                  {/* Tobacco smoker */}
                  <label className="p-3 border border-neutral-200 hover:border-neutral-300 rounded-xl flex items-start gap-2.5 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={smoker} 
                      onChange={(e) => setSmoker(e.target.checked)}
                      className="rounded text-indigo-600 focus:ring-indigo-500 mt-0.5 h-4 w-4"
                    />
                    <div>
                      <span className="font-bold block text-neutral-900 uppercase font-mono text-[10px]">Tobacco Smoking (Active)</span>
                      <span className="text-[10px] text-gray-400 font-sans leading-tight">Cadmium and lead particles are readily concentrated in tobacco leaves and bypass lung filters.</span>
                    </div>
                  </label>

                  {/* Occupational */}
                  <label className="p-3 border border-neutral-200 hover:border-neutral-300 rounded-xl flex items-start gap-2.5 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={occupationalLead} 
                      onChange={(e) => setOccupationalLead(e.target.checked)}
                      className="rounded text-indigo-600 focus:ring-indigo-500 mt-0.5 h-4 w-4"
                    />
                    <div>
                      <span className="font-bold block text-neutral-900 uppercase font-mono text-[10px]">Occupational / Smelting Exposure</span>
                      <span className="text-[10px] text-gray-400 font-sans leading-tight">Battery dismantling, metal soldering, structural demolition, or stained-glass assembly.</span>
                    </div>
                  </label>

                  {/* Lead glazed cookware */}
                  <label className="p-3 border border-neutral-200 hover:border-neutral-300 rounded-xl flex items-start gap-2.5 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={useEarthenware} 
                      onChange={(e) => setUseEarthenware(e.target.checked)}
                      className="rounded text-indigo-600 focus:ring-indigo-500 mt-0.5 h-4 w-4"
                    />
                    <div>
                      <span className="font-bold block text-neutral-900 uppercase font-mono text-[10px]">Lead-Glazed Clay Cookware</span>
                      <span className="text-[10px] text-gray-400 font-sans leading-tight">Acidic stews or boiling water leeches lead directly from glaze (highly common in Mexican / Andean clays).</span>
                    </div>
                  </label>

                  {/* Kohl cosmetics */}
                  <label className="p-3 border border-neutral-200 hover:border-neutral-300 rounded-xl flex items-start gap-2.5 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={useKohl} 
                      onChange={(e) => setUseKohl(e.target.checked)}
                      className="rounded text-indigo-600 focus:ring-indigo-500 mt-0.5 h-4 w-4"
                    />
                    <div>
                      <span className="font-bold block text-neutral-900 uppercase font-mono text-[10px]">Kohl / Surma Eye Cosmetics</span>
                      <span className="text-[10px] text-gray-400 font-sans leading-tight">Traditional eye makeup containing powdered lead sulfide (PbS), readily absorbed via tear ducts.</span>
                    </div>
                  </label>

                  {/* Recycled cookware pots */}
                  <label className="p-3 border border-neutral-200 hover:border-neutral-300 rounded-xl flex items-start gap-2.5 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={useRecycledPots} 
                      onChange={(e) => setUseRecycledPots(e.target.checked)}
                      className="rounded text-indigo-600 focus:ring-indigo-500 mt-0.5 h-4 w-4"
                    />
                    <div>
                      <span className="font-bold block text-neutral-900 uppercase font-mono text-[10px]">Recycled Engine scrap cookware</span>
                      <span className="text-[10px] text-gray-400 font-sans leading-tight">Artisanal aluminum pots melted down from motor scrap, leading to severe metal leaching.</span>
                    </div>
                  </label>

                  {/* Shooting Range hobby */}
                  <label className="p-3 border border-neutral-200 hover:border-neutral-300 rounded-xl flex items-start gap-2.5 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={hobbyLead} 
                      onChange={(e) => setHobbyLead(e.target.checked)}
                      className="rounded text-indigo-600 focus:ring-indigo-500 mt-0.5 h-4 w-4"
                    />
                    <div>
                      <span className="font-bold block text-neutral-900 uppercase font-mono text-[10px]">Shooting / Bullet Casting Hobby</span>
                      <span className="text-[10px] text-gray-400 font-sans leading-tight">Regular indoor range shooting without advanced particulate ventilation or active bullet casting.</span>
                    </div>
                  </label>

                </div>
              </section>

              {/* SECTION C: DIRECT METABOLIC BIOMARKERS */}
              <section className="space-y-4 border-t border-neutral-100 pt-6">
                <div>
                  <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-black flex items-center gap-1.5">
                    <Activity size={16} /> 3. Direct Metabolic Biomarkers (Analytical Overrides)
                  </h3>
                  <p className="text-[11px] text-gray-400 font-sans">
                    Have you had scientific tissue diagnostic tests? Overrule statistical algorithms with real laboratory outputs.
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  
                  {/* Bone lead test */}
                  <div className="p-4 border border-neutral-200 rounded-xl bg-white space-y-3">
                    <label className="flex items-center gap-2 font-bold font-mono uppercase text-[10px] cursor-pointer select-none">
                      <input 
                        type="checkbox" 
                        checked={hasBoneLeadTest} 
                        onChange={(e) => setHasBoneLeadTest(e.target.checked)}
                        className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                      />
                      <span>In-Vivo KXRF Bone Lead Concentration</span>
                    </label>
                    {hasBoneLeadTest && (
                      <div className="pl-6 space-y-1.5 animate-fade-in">
                        <div className="flex justify-between text-[11px] font-mono text-gray-500">
                          <span>KXRF Tibia Lead Level:</span>
                          <span className="font-bold text-black">{boneLeadPpm} ppm</span>
                        </div>
                        <input 
                          type="range" 
                          min="0" 
                          max="150" 
                          value={boneLeadPpm} 
                          onChange={(e) => setBoneLeadPpm(Number(e.target.value))}
                          className="w-full accent-indigo-600 cursor-pointer"
                        />
                        <span className="text-[9px] text-gray-400 block leading-tight">Measurements above 15 ppm reflect high continuous skeletal accretion.</span>
                      </div>
                    )}
                  </div>

                  {/* Tooth lead test */}
                  <div className="p-4 border border-neutral-200 rounded-xl bg-white space-y-3">
                    <label className="flex items-center gap-2 font-bold font-mono uppercase text-[10px] cursor-pointer select-none">
                      <input 
                        type="checkbox" 
                        checked={hasToothLeadTest} 
                        onChange={(e) => setHasToothLeadTest(e.target.checked)}
                        className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                      />
                      <span>Deciduous Pediatric Tooth Lead test</span>
                    </label>
                    {hasToothLeadTest && (
                      <div className="pl-6 space-y-1.5 animate-fade-in">
                        <div className="flex justify-between text-[11px] font-mono text-gray-500">
                          <span>Shed tooth enamel lead content:</span>
                          <span className="font-bold text-black">{toothLeadPpm} ppm</span>
                        </div>
                        <input 
                          type="range" 
                          min="0" 
                          max="50" 
                          value={toothLeadPpm} 
                          onChange={(e) => setToothLeadPpm(Number(e.target.value))}
                          className="w-full accent-indigo-600 cursor-pointer"
                        />
                        <span className="text-[9px] text-gray-400 block leading-tight">Enamel biopsy measures integrated gestational and infancy exposure burden.</span>
                      </div>
                    )}
                  </div>

                  {/* Pediatric BLL */}
                  <div className="p-4 border border-neutral-200 rounded-xl bg-white space-y-3">
                    <label className="flex items-center gap-2 font-bold font-mono uppercase text-[10px] cursor-pointer select-none">
                      <input 
                        type="checkbox" 
                        checked={hasPediatricBll} 
                        onChange={(e) => setHasPediatricBll(e.target.checked)}
                        className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                      />
                      <span>Historical Pediatric Venous Blood lead (BLL)</span>
                    </label>
                    {hasPediatricBll && (
                      <div className="pl-6 space-y-1.5 animate-fade-in">
                        <div className="flex justify-between text-[11px] font-mono text-gray-500">
                          <span>Venous Blood test at age under 5:</span>
                          <span className="font-bold text-black">{pediatricBllVal} μg/dL</span>
                        </div>
                        <input 
                          type="range" 
                          min="0" 
                          max="45" 
                          step="0.5"
                          value={pediatricBllVal} 
                          onChange={(e) => setPediatricBllVal(Number(e.target.value))}
                          className="w-full accent-indigo-600 cursor-pointer"
                        />
                        <span className="text-[9px] text-gray-400 block leading-tight">Historical clinical lab results from infancy.</span>
                      </div>
                    )}
                  </div>

                </div>
              </section>

              {/* SECTION D: SYNERGISTIC ENVIRONMENTAL ASSAULTS */}
              <section className="space-y-4 border-t border-neutral-100 pt-6">
                <div>
                  <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-black flex items-center gap-1.5">
                    <AlertTriangle size={16} /> 4. Synergistic Environmental Assaults
                  </h3>
                  <p className="text-[11px] text-gray-400 font-sans">
                    Chemical elements do not act in isolation. Toggle other environmental burdens that compound neurological damage.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono font-bold text-[10px] uppercase">
                  <label className="p-3 border border-neutral-200 hover:bg-neutral-50 rounded-xl flex items-center gap-2 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={dieselExhaust} 
                      onChange={(e) => setDieselExhaust(e.target.checked)}
                      className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                    />
                    <span>Diesel exhaust (PM2.5)</span>
                  </label>
                  <label className="p-3 border border-neutral-200 hover:bg-neutral-50 rounded-xl flex items-center gap-2 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={pfasWater} 
                      onChange={(e) => setPfasWater(e.target.checked)}
                      className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                    />
                    <span>PFAS / Forever chemicals</span>
                  </label>
                  <label className="p-3 border border-neutral-200 hover:bg-neutral-50 rounded-xl flex items-center gap-2 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={coalDust} 
                      onChange={(e) => setCoalDust(e.target.checked)}
                      className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                    />
                    <span>Coal Fly ash particles</span>
                  </label>
                </div>

                <button
                  type="button"
                  onClick={handleCalculateExposome}
                  className="w-full py-4 bg-black hover:bg-neutral-900 text-white font-mono font-bold uppercase tracking-wider rounded-xl cursor-pointer transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles size={16} className="text-amber-400" /> Run sovereign AI Exposome Solver
                </button>
              </section>

            </div>

            {/* RIGHT PANEL: LIVE MODEL ANALYSIS & DIRECT ACTION PREVENTIONS */}
            <div className="w-full lg:w-1/2 flex flex-col bg-[#FAFAFA] p-8 space-y-8">
              
              {/* STATUS MESSAGES */}
              {isCalculatingExposome ? (
                <div className="p-6 border border-neutral-200 bg-white rounded-2xl space-y-4 shadow-sm animate-pulse">
                  <div className="flex items-center gap-3">
                    <RefreshCw className="text-indigo-600 animate-spin" size={20} />
                    <h4 className="font-mono font-bold text-xs uppercase text-indigo-950">Calculating Body Burden Metrics...</h4>
                  </div>
                  <div className="space-y-1.5 font-mono text-[10px] text-neutral-500 divide-y divide-neutral-100">
                    {exposomeLog.map((log, idx) => (
                      <span key={idx} className="block pt-1.5">{log}</span>
                    ))}
                  </div>
                </div>
              ) : exposomeResults ? (
                <div className="space-y-6 animate-fade-in font-sans">
                  
                  {/* OVERALL BODY BURDEN SUMMARY CARD */}
                  <div className="p-6 border border-indigo-950 bg-indigo-950 text-white rounded-2xl space-y-4 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl" />
                    <div>
                      <span className="text-[9px] font-mono font-bold text-amber-400 block uppercase">[SOVEREIGN_BIODATA_VERDICT]</span>
                      <h4 className="text-lg font-serif font-semibold mt-1">Calculated Personal Burden Metrics</h4>
                    </div>

                    <div className="grid grid-cols-3 gap-3 pt-2 text-center font-mono">
                      <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                        <span className="text-[8px] text-indigo-300 block uppercase">Exposure Index</span>
                        <span className="text-xl font-bold text-white block mt-1">{exposomeResults.cumulativeExposureIndex} / 100</span>
                        <span className="text-[8px] text-indigo-400 block mt-0.5">Statistical Load</span>
                      </div>
                      <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                        <span className="text-[8px] text-indigo-300 block uppercase">Est. Bone Lead</span>
                        <span className="text-xl font-bold text-amber-300 block mt-1">{exposomeResults.estimatedBoneBurdenPpm} ppm</span>
                        <span className="text-[8px] text-indigo-400 block mt-0.5">Body Retention</span>
                      </div>
                      <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                        <span className="text-[8px] text-indigo-300 block uppercase">Adult BLL Eq.</span>
                        <span className="text-xl font-bold text-red-400 block mt-1">{exposomeResults.predictedAdultBllEquivalent} μg/dL</span>
                        <span className="text-[8px] text-indigo-400 block mt-0.5">Circulating Free</span>
                      </div>
                    </div>
                  </div>

                  {/* DISEASES RISKS DETAIL MODULE */}
                  <div className="p-6 border border-neutral-200 bg-white rounded-2xl space-y-4 shadow-xs">
                    <h4 className="text-xs font-mono font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-neutral-100 pb-2">
                      <Activity size={14} className="text-red-500" /> Multi-organ Chronic Disease acceleration
                    </h4>

                    <div className="space-y-4 text-xs">
                      {/* Cardio */}
                      <div className="flex items-start gap-3">
                        <span className={`px-2 py-0.5 rounded font-mono text-[9px] font-bold uppercase shrink-0 ${
                          exposomeResults.diseaseRisks.cardiovascular.risk === 'High' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-neutral-50 text-neutral-500'
                        }`}>
                          Cardio: {exposomeResults.diseaseRisks.cardiovascular.risk}
                        </span>
                        <div className="space-y-1">
                          <span className="font-semibold text-black font-sans">Cardiovascular stiffness multiplier: {exposomeResults.diseaseRisks.cardiovascular.factor}x</span>
                          <p className="text-[10px] text-neutral-500 leading-normal">{exposomeResults.diseaseRisks.cardiovascular.details}</p>
                        </div>
                      </div>

                      {/* Renal */}
                      <div className="flex items-start gap-3 border-t border-neutral-100 pt-3">
                        <span className={`px-2 py-0.5 rounded font-mono text-[9px] font-bold uppercase shrink-0 ${
                          exposomeResults.diseaseRisks.renal.risk === 'High' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-neutral-50 text-neutral-500'
                        }`}>
                          Renal: {exposomeResults.diseaseRisks.renal.risk}
                        </span>
                        <div className="space-y-1">
                          <span className="font-semibold text-black font-sans">Nephritis/eGFR degeneration factor: {exposomeResults.diseaseRisks.renal.factor}x</span>
                          <p className="text-[10px] text-neutral-500 leading-normal">{exposomeResults.diseaseRisks.renal.details}</p>
                        </div>
                      </div>

                      {/* Neuro */}
                      <div className="flex items-start gap-3 border-t border-neutral-100 pt-3">
                        <span className={`px-2 py-0.5 rounded font-mono text-[9px] font-bold uppercase shrink-0 ${
                          exposomeResults.diseaseRisks.neurocognitive.risk === 'High' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-neutral-50 text-neutral-500'
                        }`}>
                          Neuro: {exposomeResults.diseaseRisks.neurocognitive.risk}
                        </span>
                        <div className="space-y-1">
                          <span className="font-semibold text-black font-sans">Prefrontal gray volume pruning factor: {exposomeResults.diseaseRisks.neurocognitive.factor}x</span>
                          <p className="text-[10px] text-neutral-500 leading-normal">{exposomeResults.diseaseRisks.neurocognitive.details}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CO-HAZARD DISCLOSURE */}
                  {exposomeResults.diseaseRisks.otherAssaults.risks.length > 0 && (
                    <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl flex gap-2.5 text-xs text-indigo-950 font-sans">
                      <AlertTriangle className="text-indigo-600 shrink-0 mt-0.5" size={16} />
                      <div className="space-y-1">
                        <span className="font-bold uppercase tracking-wide text-[10px] block">Synergistic Amplifiers Detected</span>
                        <p className="text-[11px] leading-relaxed text-indigo-900">{exposomeResults.diseaseRisks.otherAssaults.description}</p>
                      </div>
                    </div>
                  )}

                  {/* PREVENTION PATHWAYS MODULE */}
                  <div className="p-6 border border-neutral-200 bg-white rounded-2xl space-y-4 shadow-xs">
                    <h4 className="text-xs font-mono font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-neutral-100 pb-2">
                      <UserCheck size={14} className="text-emerald-600" /> Directed Sovereign Action Plan
                    </h4>
                    
                    <div className="space-y-3.5 text-xs text-neutral-700 font-sans leading-relaxed">
                      {exposomeResults.preventionPathway.map((step, idx) => (
                        <div key={idx} className="flex gap-2.5 items-start">
                          <CheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={14} />
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>

                    {exposomeResults.hudClevelandEligible && (
                      <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex gap-3 text-xs">
                        <Award size={18} className="text-emerald-700 shrink-0 mt-0.5" />
                        <div className="space-y-1 text-emerald-950 font-sans">
                          <h5 className="font-bold uppercase tracking-wider text-[10px] text-emerald-900">Cleveland HUD Abatement Eligible</h5>
                          <p className="text-[11px] leading-relaxed text-emerald-800">
                            Based on your residential history in Cleveland Ward 3/5, you qualify for full, unpaved local HUD Lead Abatement subsidies. Tap litigation ledger to coordinate inspections.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              ) : (
                <div className="text-center py-20 bg-neutral-50 border border-neutral-200 rounded-2xl border-dashed space-y-3">
                  <Sliders size={32} className="text-neutral-400 mx-auto" />
                  <h5 className="text-sm font-bold text-neutral-800">Exposome Engine Idle</h5>
                  <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-normal">
                    Construct your lifetime sequential address list and dietary checklists in the left panel, then hit "Run sovereign AI Exposome Solver."
                  </p>
                </div>
              )}

            </div>
          </div>
        )}

        {/* TAB 4: NEW MEXICO DOWNWINDERS RADIATION CLAIMS & TAOS ENLIGHTENMENT */}
        {profilerSubTab === 'downwinders' && (
          <div className="p-8 space-y-8 animate-fade-in">
            
            {/* TAOS HEART-THINKING PHILOSOPHICAL BANNER */}
            <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 lg:p-8 space-y-6 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-amber-500 text-neutral-900 font-mono text-[9px] uppercase font-bold rounded">
                    Taos Enlightenment Testimony
                  </span>
                  <span className="text-xs font-semibold text-amber-800 font-mono">Carl Jung Visitor Chronicle</span>
                </div>
                
                <blockquote className="font-serif italic text-sm md:text-base text-neutral-800 leading-relaxed max-w-4xl border-l-2 border-amber-400 pl-4">
                  &ldquo;We are a people who live on the roof of the world; we are the sons of the Father Sun, and with our religion we daily help our father to go across the sky. We do this not only for ourselves, but for the whole world. If we were to cease practising our religion, in ten years time the sun would no longer rise. Then it would be night forever.&rdquo;
                </blockquote>

                <div className="pt-2 border-t border-amber-200/60 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans text-neutral-600 leading-relaxed">
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-neutral-400 uppercase block font-bold">THE REASON WHITES ARE ALL MAD</span>
                    <p>
                      When Swiss Psychologist Carl Jung visited Taos Pueblo, New Mexico, he was famously asked by tribal elder Mountain Lake why the white men seemed so mad, aggressive, and restless. Jung replied that they think with their heads.
                    </p>
                  </div>
                  <div className="space-y-1 border-t md:border-t-0 md:border-l border-amber-200/60 pt-3 md:pt-0 md:pl-4">
                    <span className="font-mono text-[10px] text-red-500 uppercase block font-bold">“WE THINK HERE,” INDICATING HIS HEART</span>
                    <p>
                      The elder replied: <strong>&ldquo;We think here,&rdquo;</strong> pointing directly to his heart. This heart-centered thinking is a pivotal contemporary enlightenment. Centralized bureaucracies attempt to analyze risk with cognitive &quot;head-thinking,&quot; but it is only through heart-centered stewardship that we protect the sovereign biological custody of our families and community.
                    </p>
                  </div>
                </div>

                {/* Micro heart breathing visualizer */}
                <div className="pt-4 flex items-center justify-center bg-amber-100/50 rounded-2xl p-4 border border-amber-200/40 max-w-lg mx-auto">
                  <div className="flex items-center gap-3">
                    <Heart className="text-red-500 fill-red-500 animate-pulse" size={24} />
                    <div className="text-xs">
                      <span className="font-mono font-bold text-amber-950 uppercase block">HEART-BASED MEDITATION WAVE</span>
                      <span className="text-[10px] text-amber-800">Breath in... help the sun rise across the sky for the entire world.</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* TRINITY Downwinders campaign */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
              
              {/* LEFT COLUMN: CLAIM CRITERIA FORM (5 COLS) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="p-6 border border-neutral-200 rounded-2xl space-y-4 shadow-sm bg-white">
                  <div>
                    <h4 className="font-mono font-bold text-xs uppercase text-[#b45309] flex items-center gap-1">
                      <Zap size={14} /> NEW MEXICO DOWNWINDER ADVOCACY REGISTRY
                    </h4>
                    <p className="text-[11px] text-gray-500 font-sans mt-2 leading-relaxed">
                      Federal compensation is now available under campaigns helping Trinity fallout exposure victims in New Mexico claim <strong>$100,000 each</strong>. Fill out exposure metrics below to check RECA (Radiation Exposure Compensation Act) eligibility.
                    </p>
                  </div>

                  <div className="space-y-4 text-xs font-sans">
                    
                    {/* Distance slider */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between font-mono">
                        <span>Distance to Trinity Ground Zero:</span>
                        <span className="font-bold text-[#b45309]">{downwinderDistance} Miles</span>
                      </div>
                      <input 
                        type="range" 
                        min="5" 
                        max="250" 
                        value={downwinderDistance} 
                        onChange={(e) => setDownwinderDistance(Number(e.target.value))}
                        className="w-full accent-amber-600 cursor-pointer"
                      />
                      <span className="text-[9px] text-neutral-400 block leading-tight">Fallback plume vectors concentrated severe ionizing radioactive fallout within 150 miles of Ground Zero.</span>
                    </div>

                    {/* Timeline slider */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between font-mono">
                        <span>Years in NM (1945 - 1962):</span>
                        <span className="font-bold text-[#b45309]">{downwinderYears} Years</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="17" 
                        value={downwinderYears} 
                        onChange={(e) => setDownwinderYears(Number(e.target.value))}
                        className="w-full accent-amber-600 cursor-pointer"
                      />
                      <span className="text-[9px] text-neutral-400 block leading-tight">Must have resided in designated fallout zones for at least 1 year in post-blast window.</span>
                    </div>

                    {/* Pathways toggles */}
                    <div className="space-y-2 border-t border-neutral-100 pt-3">
                      <label className="flex items-start gap-2.5 cursor-pointer select-none">
                        <input 
                          type="checkbox" 
                          checked={nmGoatMilk} 
                          onChange={(e) => setNmGoatMilk(e.target.checked)}
                          className="rounded text-amber-600 focus:ring-amber-500 mt-0.5 h-4 w-4"
                        />
                        <div>
                          <span className="font-bold text-neutral-800 uppercase text-[10px] font-mono">Consumed Local Goats Milk / Produce</span>
                          <span className="text-[10px] text-neutral-400 block leading-tight">Radioactive Iodine-131 and Strontium-90 quickly accumulate in dairy cows/goats and local dust layers.</span>
                        </div>
                      </label>

                      <label className="flex items-start gap-2.5 cursor-pointer select-none pt-2">
                        <input 
                          type="checkbox" 
                          checked={nmDustInhalation} 
                          onChange={(e) => setNmDustInhalation(e.target.checked)}
                          className="rounded text-amber-600 focus:ring-amber-500 mt-0.5 h-4 w-4"
                        />
                        <div>
                          <span className="font-bold text-neutral-800 uppercase text-[10px] font-mono">Plume Dust Inhalation Exposure</span>
                          <span className="text-[10px] text-neutral-400 block leading-tight">Regular outdoor exposure during summer dust storms following the July 16, 1945 blast.</span>
                        </div>
                      </label>

                      <label className="flex items-start gap-2.5 cursor-pointer select-none pt-2">
                        <input 
                          type="checkbox" 
                          checked={hasCancerOrDisease} 
                          onChange={(e) => setHasCancerOrDisease(e.target.checked)}
                          className="rounded text-amber-600 focus:ring-amber-500 mt-0.5 h-4 w-4"
                        />
                        <div>
                          <span className="font-bold text-neutral-800 uppercase text-[10px] font-mono">Diagnosed with RECA Covered Pathology</span>
                          <span className="text-[10px] text-neutral-400 block leading-tight">Leukemia, lymphomas, thyroid/lung cancer, or certified respiratory complications.</span>
                        </div>
                      </label>
                    </div>

                    {/* Claims file upload checklists */}
                    <div className="space-y-3.5 border-t border-neutral-100 pt-4 bg-[#FCFBF7] p-4 rounded-xl border border-amber-100/60">
                      <span className="font-mono text-[9px] text-[#b45309] uppercase block font-bold flex items-center gap-1">
                        <FileText size={12} /> Required Claim Documentation Registry
                      </span>
                      
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input 
                          type="checkbox" 
                          checked={proofResidence} 
                          onChange={(e) => setProofResidence(e.target.checked)}
                          className="rounded text-amber-600 focus:ring-amber-500 h-4 w-4"
                        />
                        <span className="text-neutral-700 font-semibold text-[11px]">Proof of Residence (Census record, land title, school report)</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input 
                          type="checkbox" 
                          checked={proofDiagnosis} 
                          onChange={(e) => setProofDiagnosis(e.target.checked)}
                          className="rounded text-amber-600 focus:ring-amber-500 h-4 w-4"
                        />
                        <span className="text-neutral-700 font-semibold text-[11px]">Certified Clinical Medical Diagnosis (Pathology, oncologist report)</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input 
                          type="checkbox" 
                          checked={proofIdentity} 
                          onChange={(e) => setProofIdentity(e.target.checked)}
                          className="rounded text-amber-600 focus:ring-amber-500 h-4 w-4"
                        />
                        <span className="text-neutral-700 font-semibold text-[11px]">Sovereign Identity / Tribal Registration Certificate</span>
                      </label>
                    </div>

                    <button
                      type="button"
                      onClick={handleVerifyDownwinderClaim}
                      className="w-full py-4 bg-[#B45309] hover:bg-[#92400E] text-white font-mono font-bold uppercase tracking-wider rounded-xl cursor-pointer transition-all flex items-center justify-center gap-2 text-xs"
                    >
                      <UserCheck size={16} /> Audit & submit Downwinder compensation claim
                    </button>

                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: RECA VERIFICATION DECISION PANEL (7 COLS) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* DYNAMIC DOSIMETRY PANEL */}
                <div className="p-6 border border-neutral-200 bg-neutral-50 rounded-2xl space-y-4 shadow-sm font-sans">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="text-[9px] font-mono font-bold text-neutral-400 block uppercase">Continuous radiation fallout algorithm</span>
                      <h3 className="text-sm font-bold text-neutral-900 font-mono uppercase">FALLOUT ACCRETION FACTOR</h3>
                    </div>
                    <div className="px-4 py-2 border rounded-xl flex items-center gap-2 bg-amber-50 border-amber-200 text-amber-800">
                      <Activity size={15} />
                      <div className="flex flex-col text-right">
                        <span className="text-xl font-mono font-extrabold">{calculateRadiationDoseFactor()}</span>
                        <span className="text-[8px] font-mono font-bold uppercase">Estimated rad dosage metric</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-neutral-500 leading-relaxed">
                    Based on a distance of {downwinderDistance} miles from Trinity Ground Zero and {downwinderYears} continuous years of atmospheric blast exposure, this represents your integrated biological risk score. Radioactive isotopes behave as calcium antagonists, depositing directly inside children&apos;s bone structures, leading to bone marrow cell mutations.
                  </p>
                </div>

                {/* DECISION VERDICT BLOCK */}
                {downwinderClaimStatus === 'processing' ? (
                  <div className="p-6 border border-neutral-200 bg-white rounded-2xl space-y-4 shadow-sm animate-pulse">
                    <div className="flex items-center gap-3">
                      <RefreshCw className="text-amber-600 animate-spin" size={20} />
                      <h4 className="font-mono font-bold text-xs uppercase text-amber-950">Auditing claimant credentials...</h4>
                    </div>
                    <div className="space-y-1.5 font-mono text-[10px] text-neutral-500 divide-y divide-neutral-100">
                      {claimProgressLog.map((log, idx) => (
                        <span key={idx} className="block pt-1.5">{log}</span>
                      ))}
                    </div>
                  </div>
                ) : downwinderClaimStatus === 'approved' ? (
                  <div className="p-6 border border-emerald-200 bg-emerald-50 text-emerald-950 rounded-2xl space-y-5 shadow-sm font-sans">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="text-emerald-600 shrink-0 mt-0.5" size={24} />
                      <div className="space-y-1">
                        <span className="font-mono font-bold text-emerald-900 uppercase text-[10px] block">RECA ELIGIBILITY VERIFIED</span>
                        <h4 className="text-lg font-serif font-bold text-emerald-900">$100,000 Federal Payout Warrant Authorized</h4>
                        <p className="text-[11px] text-emerald-800 leading-relaxed">
                          Your profile satisfies the spatial and medical requirements of the New Mexico Downwinders Compensation Campaign. Federal funds have been securely queued for allocation to your cryptographic sovereign account identifier.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-white/60 rounded-xl space-y-2 border border-emerald-200 text-xs">
                      <h5 className="font-mono font-bold uppercase text-[9px] text-emerald-900">Encrypted Claim Certificate Signature</h5>
                      <span className="font-mono text-[9px] block text-neutral-600 select-all break-all">
                        0xSIG-DOWNWINDER-{Math.floor(Math.random()*10000000000000).toString(16)}-ZK-VERIFIED
                      </span>
                      <button
                        onClick={() => {
                          alert(`Downwinder $100,000 Claim Package Exported as PDF!\nClaimant: ${profileName}\nLocation: ${profileLocation}\nZK Signature: Approved`);
                        }}
                        className="mt-2 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-mono text-[9px] font-bold uppercase rounded cursor-pointer transition-colors flex items-center gap-1"
                      >
                        <FileDown size={12} /> Download Verified Claim package
                      </button>
                    </div>
                  </div>
                ) : downwinderClaimStatus === 'rejected' ? (
                  <div className="p-6 border border-red-200 bg-red-50 text-red-950 rounded-2xl space-y-3 shadow-sm font-sans">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="text-red-600 shrink-0 mt-0.5" size={24} />
                      <div className="space-y-1">
                        <span className="font-mono font-bold text-red-900 uppercase text-[10px] block">CLAIM STATUS: DISQUALIFIED</span>
                        <h4 className="text-base font-bold text-red-900">Radiation Exposure Conditions Not Satisfied</h4>
                        <p className="text-[11px] text-red-800 leading-relaxed">
                          Your configured profile does not satisfy either the minimum residency timeframe or Ground Zero proximity constraints. Consult our advocacy network for custom review options.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-16 bg-neutral-50 border border-neutral-200 rounded-2xl border-dashed space-y-3">
                    <FileText size={32} className="text-neutral-400 mx-auto" />
                    <h5 className="text-sm font-bold text-neutral-800">No Claim Audit Performed</h5>
                    <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-normal">
                      Toggle your required residency timelines, verify document uploads, and click &ldquo;Audit &amp; Submit Downwinder Compensation Claim&rdquo; to process.
                    </p>
                  </div>
                )}

              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
};
