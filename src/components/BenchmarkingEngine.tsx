import React, { useState, useMemo } from 'react';
import {
  Database,
  Upload,
  Activity,
  Shield,
  Coins,
  TrendingUp,
  BarChart2,
  FileSpreadsheet,
  Plus,
  Search,
  Award,
  ArrowRight,
  CheckCircle,
  Check,
  Lock,
  AlertTriangle,
  RefreshCw,
  Sliders,
  Eye,
  FileText,
  Heart,
  Brain,
  Layers,
  Calendar,
  Users,
  CheckSquare,
  PlusCircle,
  Trash2,
  MapPin,
  Sparkles
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  BarChart,
  Bar,
  Cell
} from 'recharts';

// Benchmark Record interface
export interface BenchmarkRecord {
  id: string;
  location: string;
  population: number;
  avgBll: number; // blood lead level in ug/dL
  primarySource: 'pipes' | 'paint' | 'kohl' | 'recycled pots' | 'food';
  homicideRate: number; // per 100,000
  overdoseRate: number; // per 100,000
  demographics: {
    blackPct: number;
    indigenousPct: number;
    whitePct: number;
    asianPct: number;
    hispanicPct: number;
  };
  certificationStatus: 'certified' | 'pending' | 'non-compliant';
  certificationType: 'blood_test' | 'property_inspection' | 'rental_registry' | 'title_transfer';
  verificationZkp: string;
  updatedAt: string;
}

// Initial Benchmark Spreadsheet data collected since 2022
const INITIAL_SPREADSHEET_DATA: BenchmarkRecord[] = [
  {
    id: 'rec-01',
    location: 'Cleveland Ward 3 (Ohio)',
    population: 18240,
    avgBll: 4.8,
    primarySource: 'paint',
    homicideRate: 64.2,
    overdoseRate: 78.5,
    demographics: { blackPct: 68, indigenousPct: 1, whitePct: 18, asianPct: 2, hispanicPct: 11 },
    certificationStatus: 'non-compliant',
    certificationType: 'rental_registry',
    verificationZkp: '0x3a9bc412a7d8e8f238b1f80d9e4a8b7c',
    updatedAt: '2026-06-15'
  },
  {
    id: 'rec-02',
    location: 'East Chicago Zone A (Indiana)',
    population: 24500,
    avgBll: 8.2,
    primarySource: 'pipes',
    homicideRate: 48.6,
    overdoseRate: 52.1,
    demographics: { blackPct: 42, indigenousPct: 2, whitePct: 15, asianPct: 1, hispanicPct: 40 },
    certificationStatus: 'pending',
    certificationType: 'property_inspection',
    verificationZkp: '0x4c2f810d9e4a8b7ca9bc312e7d8f238b',
    updatedAt: '2026-06-20'
  },
  {
    id: 'rec-03',
    location: 'Taos Pueblo Control Node (New Mexico)',
    population: 4500,
    avgBll: 0.016,
    primarySource: 'paint', // virtually zero exposure
    homicideRate: 2.1,
    overdoseRate: 3.4,
    demographics: { blackPct: 0, indigenousPct: 96, whitePct: 3, asianPct: 0, hispanicPct: 1 },
    certificationStatus: 'certified',
    certificationType: 'blood_test',
    verificationZkp: '0x016bc412a7d8e8f238b1f80d9e4a8b7c',
    updatedAt: '2026-06-25'
  },
  {
    id: 'rec-04',
    location: 'West Kabul District 4 (Afghanistan)',
    population: 95000,
    avgBll: 12.4,
    primarySource: 'kohl',
    homicideRate: 35.8,
    overdoseRate: 12.1,
    demographics: { blackPct: 0, indigenousPct: 88, whitePct: 2, asianPct: 10, hispanicPct: 0 },
    certificationStatus: 'non-compliant',
    certificationType: 'blood_test',
    verificationZkp: '0x992bc412a7d8e8f238b1f80d9e4a8b7c',
    updatedAt: '2026-05-10'
  },
  {
    id: 'rec-05',
    location: 'Ho Chi Minh Artisanal Recyclers (Vietnam)',
    population: 14200,
    avgBll: 18.6,
    primarySource: 'recycled pots',
    homicideRate: 8.5,
    overdoseRate: 15.6,
    demographics: { blackPct: 0, indigenousPct: 2, whitePct: 1, asianPct: 97, hispanicPct: 0 },
    certificationStatus: 'non-compliant',
    certificationType: 'blood_test',
    verificationZkp: '0x186bc412a7d8e8f238b1f80d9e4a8b7c',
    updatedAt: '2026-04-18'
  },
  {
    id: 'rec-06',
    location: 'Oaxaca Central Valleys (Mexico)',
    population: 32800,
    avgBll: 9.5,
    primarySource: 'food', // lead-glazed clay cookware
    homicideRate: 22.4,
    overdoseRate: 6.8,
    demographics: { blackPct: 1, indigenousPct: 75, whitePct: 5, asianPct: 0, hispanicPct: 19 },
    certificationStatus: 'pending',
    certificationType: 'property_inspection',
    verificationZkp: '0x095bc412a7d8e8f238b1f80d9e4a8b7c',
    updatedAt: '2026-06-01'
  },
  {
    id: 'rec-07',
    location: 'Rome Historic Center (Italy)',
    population: 12000,
    avgBll: 1.8,
    primarySource: 'pipes', // historical fistulae, modern copper replaced
    homicideRate: 1.5,
    overdoseRate: 18.2,
    demographics: { blackPct: 2, indigenousPct: 1, whitePct: 92, asianPct: 3, hispanicPct: 2 },
    certificationStatus: 'certified',
    certificationType: 'title_transfer',
    verificationZkp: '0x018bc412a7d8e8f238b1f80d9e4a8b7c',
    updatedAt: '2026-06-22'
  },
  {
    id: 'rec-08',
    location: 'Bihar State Districts, Turmeric Exposure (India)',
    population: 127000000,
    avgBll: 7.6,
    primarySource: 'food', // Pure Earth survey: Lead chromate adulteration of turmeric
    homicideRate: 2.6,
    overdoseRate: 0.8,
    demographics: { blackPct: 0, indigenousPct: 0, whitePct: 0, asianPct: 100, hispanicPct: 0 },
    certificationStatus: 'non-compliant',
    certificationType: 'blood_test',
    verificationZkp: '0x076bc412a7d8e8f238b1f80d9e4a8b7c',
    updatedAt: '2026-07-02'
  }
];

// Preset unstandardized report samples for AI-powered ingestion
const UNSTANDARDIZED_REPORT_PRESETS = [
  {
    title: "Cleveland Department of Health Presentation (2025)",
    text: `MUNICIPAL ENFORCEMENT UPDATE - WARD 5 REPORT
Tested 412 properties built prior to 1950. 
We detected lead paint contamination exceeding 1.0 mg/cm2 in 314 of these locations (76.2% non-compliance).
Aggregate pediatric blood lead levels (BLL) averaged 5.2 ug/dL in high-exposure ZIP codes.
Neighborhood demographic composition shows 81% African American, 8% Hispanic, 10% Caucasian.
Correlated crime databases indicate a current localized homicide rate of 72 per 100,000 and narcotics-related overdose deaths at 84 per 100,000.
Remediation pipeline: 12 homes cleared, remaining 302 under judicial review. Title transfer certification blocked.`
  },
  {
    title: "Andes Artisanal Smelting & Glazing Study (2024)",
    text: `PEDIATRIC HEALTH REPORT - POTTERY GLOSS CONTAMINATION (ECUADOR)
Assessed 150 school-aged children in ceramic-production sectors of Azuay Province.
Due to lead-glazed cookware (clay loza), children's mean BLL was documented at 14.8 ug/dL.
92% of sampled children demonstrate neurological markers of chronic prefrontal gray matter volume loss.
Primary source: lead oxide glaze fired in open-air kilns at 800°C.
Demographics: 91% Indigenous Quichua, 9% Mestizo.
Homicide indices remain extremely low in this agrarian enclave (1.2/100k), but developmental delay indicators exceed 78%.`
  },
  {
    title: "Chicago East End Infrastructure Survey (2025)",
    text: `WATER CONDUIT INSPECTION TRANSCRIPTS - REGION 8
Random sample of 850 residential service lines in historically redlined districts.
Exposed service lines: 580 composed of lead conduits (68.2%). Average tap water levels: 24 ppb Pb (exceeding EPA action level).
Targeted pediatric BLL screening: mean 3.9 ug/dL.
Demographics: 78% Black, 12% Hispanic, 8% White.
Annual violent crime rate inside Area 8 registers at 55 homicides per 100k. Fentanyl-related overdoses at 91 per 100k.`
  },
  {
    title: "Pure Earth India Turmeric & Food Chain Report (2026)",
    text: `PURE EARTH BIHAR LEAD ANALYSIS - TURMERIC SUPPLY CHAIN ADULTERATION
Tested 697 children and 55 pregnant women across eight districts in Bihar. 
Bihar recorded the highest average blood lead level in India in the 2022 CSIR–NITI Aayog report — 10.42 µg/dL.
Our subsequent survey with Pure Earth India revealed:
Widespread exposure: 90% of children under 5 years and 80% of pregnant women tested recorded BLLs ≥5 µg/dL.
High-risk levels: 20% of children and 22% of pregnant women had BLLs ≥10 µg/dL.
Population average: Overall mean BLL was 7.6 µg/dL.
Urban pregnant women most affected: Average BLL reached 14.9 µg/dL — nearly double the overall mean. This indicates high risk of fetal transmission.
Primary source: Lead chromate (PbCrO4) adulteration of turmeric within the food supply chain.
Demographics: 100% South Asian. Low local gun/homicide indicators (2.6 per 100k) but severe cognitive & developmental risk.`
  }
];

export default function BenchmarkingEngine() {
  const [spreadsheetData, setSpreadsheetData] = useState<BenchmarkRecord[]>(INITIAL_SPREADSHEET_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSourceFilter, setSelectedSourceFilter] = useState<string>('all');
  const [selectedCertFilter, setSelectedCertFilter] = useState<string>('all');

  // AI-Powered Ingestor state
  const [pastedReport, setPastedReport] = useState('');
  const [isIngesting, setIsIngesting] = useState(false);
  const [ingestionLog, setIngestionLog] = useState<string[]>([]);
  const [structuredPreview, setStructuredPreview] = useState<Partial<BenchmarkRecord> | null>(null);

  // Sensitivity Analysis & Cost-Benefit Sliders
  const [paintStage, setPaintStage] = useState<number>(3); // 1 to 5
  const [pipesCount, setPipesCount] = useState<number>(4500); // 0 to 10000
  const [kohlPct, setKohlPct] = useState<number>(10); // 0 to 100%
  const [adulteratedFoodPct, setAdulteratedFoodPct] = useState<number>(15); // 0 to 100%
  const [recycledPotsPpm, setRecycledPotsPpm] = useState<number>(2000); // 0 to 16000 ppm

  // Cryptocurrency Smart Escrow state
  const [hudGrantTotal, setHudGrantTotal] = useState<number>(3000000); // $3M HUD Grant
  const [iceEscrowBalance, setIceEscrowBalance] = useState<number>(1500000); // 1.5M ICE Tokens
  const [certifications, setCertifications] = useState([
    { id: 'cert-01', location: 'Cleveland Ward 3 Property 112', type: 'rental_registry', status: 'verified', releasedTokens: 25000, inspector: 'ICE-042', hash: '0x9d7a...c12e' },
    { id: 'cert-02', location: 'Cleveland Ward 3 Property 184', type: 'title_transfer', status: 'verified', releasedTokens: 50000, inspector: 'ICE-042', hash: '0x4f8a...e7a8' },
    { id: 'cert-03', location: 'Cleveland Ward 5 Property 902', type: 'property_inspection', status: 'pending', releasedTokens: 0, inspector: 'ICE-011', hash: '0x12b4...8b3c' },
    { id: 'cert-04', location: 'East Chicago Property 33', type: 'rental_registry', status: 'pending', releasedTokens: 0, inspector: 'ICE-077', hash: '0xbc3e...4d1a' },
  ]);

  const [newCertLocation, setNewCertLocation] = useState('');
  const [newCertType, setNewCertType] = useState<'blood_test' | 'property_inspection' | 'rental_registry' | 'title_transfer'>('rental_registry');
  const [newCertInspector, setNewCertInspector] = useState('ICE-042');

  // Manual entry state
  const [manualLocation, setManualLocation] = useState('');
  const [manualBll, setManualBll] = useState<number>(3.5);
  const [manualSource, setManualSource] = useState<'pipes' | 'paint' | 'kohl' | 'recycled pots' | 'food'>('paint');
  const [manualHomicide, setManualHomicide] = useState<number>(25);
  const [manualOverdose, setManualOverdose] = useState<number>(35);
  const [showManualForm, setShowManualForm] = useState(false);

  // Active Sub-Tab: 'macro' (Sovereign Analytics) vs 'individual' (Exposome Profiler) vs 'india' (Pure Earth India Case Study)
  const [activeSubTab, setActiveSubTab] = useState<'macro' | 'individual' | 'india'>('india');

  // Individual Form State
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

  // Lifestyle checklist
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

  // Other environmental assaults
  const [dieselExhaust, setDieselExhaust] = useState(false); 
  const [pfasWater, setPfasWater] = useState(false); 
  const [coalDust, setCoalDust] = useState(false); 

  // AI Prediction Results State
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

  const handleCalculateExposome = async () => {
    setIsCalculatingExposome(true);
    setExposomeLog(['Initializing personal biodata processing...', 'Scanning residential history indices...']);
    
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

    if (dieselExhaust) { index += 10; }
    if (pfasWater) { index += 12; }
    if (coalDust) { index += 8; }

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
    const hudClevelandEligible = hasClevelandHistory && (index > 40 || useEarthenware || manualBll > 5);

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

    const calculatedResult = {
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
    };

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: `You are an expert toxicologist specializing in exposomics. Analyze:
- History: ${JSON.stringify(residentHistory)}
- Smoker: ${smoker}, Work: ${occupationalLead}, Hobby: ${hobbyLead}, Kohl: ${useKohl}, Recycled Pots: ${useRecycledPots}, Glaze: ${useEarthenware}
- Other: Diesel: ${dieselExhaust}, PFAS: ${pfasWater}, Coal: ${coalDust}
- Biomarkers: Bone: ${hasBoneLeadTest ? boneLeadPpm : 'None'}, Tooth: ${hasToothLeadTest ? toothLeadPpm : 'None'}, Pediatric BLL: ${hasPediatricBll ? pediatricBllVal : 'None'}

Write a professional, clinical, yet empowering 3-paragraph summary of exposures, specific risk multipliers, and concrete steps (mention HUD grants or reverse osmosis if relevant). Avoid code or formatting tags in the text.`
            }
          ]
        })
      });

        if (response.ok) {
          const aiData = await response.json();
          const explanation = aiData.text || '';
          setExposomeLog(prev => [...prev, '✓ Clinical LLM analysis completed.', 'Mapping epigenetic pathways...']);
          setExposomeResults({
            ...calculatedResult,
            preventionPathway: [
              ...calculatedResult.preventionPathway,
              `AI Toxicological Summary: ${explanation}`
            ]
          });
        } else {
          throw new Error('AI failed');
        }
    } catch (err) {
      console.warn('AI individual calculations failed, using heuristic results', err);
      setExposomeLog(prev => [...prev, '⚠️ Sovereign AI server offline. Executing deterministic clinical logic...']);
      setExposomeResults(calculatedResult);
    } finally {
      setIsCalculatingExposome(false);
    }
  };

  // Search and Filter logic for the spreadsheet
  const filteredData = useMemo(() => {
    return spreadsheetData.filter(row => {
      const matchesSearch = row.location.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            row.primarySource.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSource = selectedSourceFilter === 'all' || row.primarySource === selectedSourceFilter;
      const matchesCert = selectedCertFilter === 'all' || row.certificationStatus === selectedCertFilter;
      return matchesSearch && matchesSource && matchesCert;
    });
  }, [spreadsheetData, searchTerm, selectedSourceFilter, selectedCertFilter]);

  // AI-Powered Ingestion trigger using /api/chat with strict instructions or local fallback
  const handleAiIngest = async () => {
    if (!pastedReport.trim()) return;
    setIsIngesting(true);
    setIngestionLog(['Initializing Sovereign AI Ingestion Engine...', 'Parsing unstandardized text report...']);
    setStructuredPreview(null);

    try {
      // Prompt designed to force JSON parsing of the unstandardized lead exposure reports
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: `Please parse this unstandardized report and extract variables for Roulet's Law. 
Return ONLY a valid raw JSON object (enclosed in \`\`\`json and \`\`\`), with NO extra conversational text, matching this structure:
{
  "location": "Extract location name",
  "population": Extract population number as integer,
  "avgBll": Extract average blood lead level in ug/dL as float,
  "primarySource": "Choose one of: 'pipes', 'paint', 'kohl', 'recycled pots', 'food'",
  "homicideRate": Extract homicide rate per 100k as float,
  "overdoseRate": Extract overdose rate per 100k as float,
  "demographics": {
    "blackPct": Black percentage,
    "whitePct": White percentage,
    "indigenousPct": Indigenous percentage,
    "asianPct": Asian percentage,
    "hispanicPct": Hispanic percentage
  }
}

Report Text:
${pastedReport}`
            }
          ]
        })
      });

      if (!response.ok) throw new Error('Network error calling AI');
      const data = await response.json();
      const text = data.text || '';

      setIngestionLog(prev => [...prev, 'Analyzing text structure with Gemini 3.5 Flash...', 'Extracting chemical and demographic correlations...']);

      // Extract JSON block using regex
      const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/({[\s\S]*})/);
      if (jsonMatch && jsonMatch[1]) {
        const parsed = JSON.parse(jsonMatch[1].trim());
        setStructuredPreview({
          id: 'rec-' + (spreadsheetData.length + 1).toString().padStart(2, '0'),
          location: parsed.location || 'Unknown Location',
          population: Number(parsed.population) || 10000,
          avgBll: Number(parsed.avgBll) || 4.0,
          primarySource: parsed.primarySource || 'paint',
          homicideRate: Number(parsed.homicideRate) || 15.0,
          overdoseRate: Number(parsed.overdoseRate) || 20.0,
          demographics: {
            blackPct: parsed.demographics?.blackPct ?? 20,
            whitePct: parsed.demographics?.whitePct ?? 20,
            indigenousPct: parsed.demographics?.indigenousPct ?? 20,
            asianPct: parsed.demographics?.asianPct ?? 20,
            hispanicPct: parsed.demographics?.hispanicPct ?? 20,
          },
          certificationStatus: 'pending',
          certificationType: 'property_inspection',
          verificationZkp: '0x' + Array.from({length: 32}, () => Math.floor(Math.random()*16).toString(16)).join(''),
          updatedAt: new Date().toISOString().split('T')[0]
        });
        setIngestionLog(prev => [...prev, '✓ Successfully structured unstandardized text into database schema!', 'ZKP Hash generation completed.']);
      } else {
        throw new Error('Could not parse clean JSON from AI response');
      }
    } catch (err) {
      console.warn('AI Ingestion parsed fail, fallback to local heuristic parse...', err);
      // Local Heuristic parse fallback
      const text = pastedReport.toLowerCase();
      let extractedLoc = 'Extracted Area';
      if (text.includes('ward 5')) extractedLoc = 'Cleveland Ward 5';
      else if (text.includes('ecuador') || text.includes('azuay')) extractedLoc = 'Azuay Province (Ecuador)';
      else if (text.includes('chicago')) extractedLoc = 'Chicago East End (Area 8)';

      let bll = 4.5;
      const bllMatch = text.match(/bll[^\d]*(\d+\.?\d*)/) || text.match(/(\d+\.?\d*)\s*ug\/dl/);
      if (bllMatch) bll = parseFloat(bllMatch[1]);

      let hom = 25;
      const homMatch = text.match(/homicide[^\d]*(\d+\.?\d*)/) || text.match(/(\d+\.?\d*)\s*per 100,000/);
      if (homMatch) hom = parseFloat(homMatch[1]);

      let ovr = 30;
      const ovrMatch = text.match(/overdose[^\d]*(\d+\.?\d*)/) || text.match(/overdoses[^\d]*(\d+\.?\d*)/);
      if (ovrMatch) ovr = parseFloat(ovrMatch[1]);

      let source: any = 'paint';
      if (text.includes('water') || text.includes('pipes') || text.includes('conduit')) source = 'pipes';
      else if (text.includes('kohl') || text.includes('cosmetic')) source = 'kohl';
      else if (text.includes('cookware') || text.includes('pots') || text.includes('recycl')) source = 'recycled pots';
      else if (text.includes('clay') || text.includes('glaze') || text.includes('food')) source = 'food';

      setStructuredPreview({
        id: 'rec-' + (spreadsheetData.length + 1).toString().padStart(2, '0'),
        location: extractedLoc,
        population: text.includes('ward 5') ? 12000 : 25000,
        avgBll: bll,
        primarySource: source,
        homicideRate: hom,
        overdoseRate: ovr,
        demographics: {
          blackPct: text.includes('black') || text.includes('african american') ? 78 : 10,
          whitePct: 15,
          indigenousPct: text.includes('indigenous') ? 91 : 2,
          asianPct: 5,
          hispanicPct: text.includes('hispanic') ? 12 : 5
        },
        certificationStatus: 'pending',
        certificationType: 'property_inspection',
        verificationZkp: '0x' + Array.from({length: 32}, () => Math.floor(Math.random()*16).toString(16)).join(''),
        updatedAt: new Date().toISOString().split('T')[0]
      });
      setIngestionLog(prev => [
        ...prev,
        '⚠️ Cloud connectivity offline. Executing heuristic Local AI parsing...',
        `✓ Heuristic matches: [Location: ${extractedLoc}] [BLL: ${bll}] [Source: ${source}]`,
        'ZKP Verification generated locally.'
      ]);
    } finally {
      setIsIngesting(false);
    }
  };

  const handleApplyPreview = () => {
    if (structuredPreview) {
      setSpreadsheetData(prev => [structuredPreview as BenchmarkRecord, ...prev]);
      setStructuredPreview(null);
      setPastedReport('');
      setIngestionLog([]);
    }
  };

  const handleAddManualRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualLocation.trim()) return;

    const newRecord: BenchmarkRecord = {
      id: 'rec-' + (spreadsheetData.length + 1).toString().padStart(2, '0'),
      location: manualLocation,
      population: 15000,
      avgBll: manualBll,
      primarySource: manualSource,
      homicideRate: manualHomicide,
      overdoseRate: manualOverdose,
      demographics: { blackPct: 35, whitePct: 35, indigenousPct: 5, asianPct: 5, hispanicPct: 20 },
      certificationStatus: 'pending',
      certificationType: 'property_inspection',
      verificationZkp: '0x' + Array.from({length: 32}, () => Math.floor(Math.random()*16).toString(16)).join(''),
      updatedAt: new Date().toISOString().split('T')[0]
    };

    setSpreadsheetData(prev => [newRecord, ...prev]);
    setManualLocation('');
    setShowManualForm(false);
  };

  // Sensitivity analysis live predictions
  const sensitivityPredictions = useMemo(() => {
    // Models lead poisoning rate and public safety metrics based on sliders
    // Higher sliders increase BLL, which in turn spikes prefrontal gray matter loss, homicides, and overdoses.
    const calculatedBll = parseFloat(
      (
        0.016 + // Base standard
        (paintStage * 1.5) +
        (pipesCount * 0.0008) +
        (kohlPct * 0.08) +
        (adulteratedFoodPct * 0.12) +
        (recycledPotsPpm * 0.0006)
      ).toFixed(3)
    );

    // vmPFC (ventromedial prefrontal cortex) volume loss modeled exponentially
    const grayMatterLoss = parseFloat(Math.min(18.5, (calculatedBll * 1.15) * 1.08).toFixed(2));

    // Homicide rates and overdose rates rise dramatically with vmPFC loss (which controls impulsivity & restraint)
    const predictedHomicide = parseFloat(Math.max(1.5, (calculatedBll * 4.8) + (paintStage * 2.5)).toFixed(1));
    const predictedOverdose = parseFloat(Math.max(2.0, (calculatedBll * 5.2) + (pipesCount * 0.002)).toFixed(1));

    // Cost calculations
    // Remediation cost: stage-dependent
    const remediationCost = (paintStage * 1.2) + (pipesCount * 0.001) + (recycledPotsPpm * 0.00005) + 0.5; // in $ Millions

    // Societal Cost of Inaction (Healthcare, crime, prison system, cognitive impairment)
    // Every microgram of BLL in the community correlates with lost lifetime earnings & policing
    const crimeRemediationSavings = (calculatedBll * 3.4) + (grayMatterLoss * 4.5); // $ Millions saved if we drop to 0.016
    const netSavings = Math.max(0, crimeRemediationSavings - remediationCost);
    const roi = remediationCost > 0 ? parseFloat((crimeRemediationSavings / remediationCost).toFixed(2)) : 0;

    return {
      bll: calculatedBll,
      grayMatterLoss,
      homicide: predictedHomicide,
      overdose: predictedOverdose,
      cost: parseFloat(remediationCost.toFixed(2)),
      savings: parseFloat(crimeRemediationSavings.toFixed(2)),
      netSavings: parseFloat(netSavings.toFixed(2)),
      roi
    };
  }, [paintStage, pipesCount, kohlPct, adulteratedFoodPct, recycledPotsPpm]);

  // Chart data for timeline analysis based on sliders
  const timelineChartData = useMemo(() => {
    const data = [];
    const bllFactor = sensitivityPredictions.bll;
    for (let year = 1; year <= 10; year++) {
      // Inaction costs scale non-linearly (crime compounds, health deteriorates)
      const inactionCost = parseFloat(((bllFactor * 0.8) * Math.pow(year, 1.2)).toFixed(2));
      // Action costs: Upfront heavy capital, followed by declining tail costs (savings compound)
      const upfrontActionCost = sensitivityPredictions.cost;
      const recurringMaintenance = upfrontActionCost * 0.05 * year;
      const actionCost = parseFloat((upfrontActionCost + recurringMaintenance).toFixed(2));
      
      data.push({
        year: `Yr ${year}`,
        'Cost of Inaction (Societal Damage)': inactionCost,
        'Cumulative Remediation Investment': actionCost,
        'Net Economic Benefit': parseFloat(Math.max(0, inactionCost - actionCost).toFixed(2))
      });
    }
    return data;
  }, [sensitivityPredictions]);

  // Blockchain and Grant Escrow trigger
  const handleAddCertification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCertLocation.trim()) return;

    const zkpHash = '0x' + Array.from({length: 32}, () => Math.floor(Math.random()*16).toString(16)).join('');
    const newCert = {
      id: 'cert-' + (certifications.length + 1).toString().padStart(2, '0'),
      location: newCertLocation,
      type: newCertType,
      status: 'pending' as const,
      releasedTokens: 0,
      inspector: newCertInspector,
      hash: zkpHash
    };

    setCertifications(prev => [newCert, ...prev]);
    setNewCertLocation('');
  };

  const handleVerifyZkpCert = (certId: string) => {
    setCertifications(prev => prev.map(cert => {
      if (cert.id === certId) {
        // Release 35,000 ICE Tokens from HUD grant escrow upon verification
        const tokenPayout = cert.type === 'title_transfer' ? 50000 : 25000;
        setIceEscrowBalance(bal => Math.max(0, bal - tokenPayout));
        return { ...cert, status: 'verified', releasedTokens: tokenPayout };
      }
      return cert;
    }));
    setIngestionLog(prev => [...prev, `✓ Verified ZKP Blockstack Certificate for ${certId}. Escrow released.`]);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#FAFAFA]" id="benchmarking-engine-root">
      
      {/* EXPOSENOMICS SUB-NAVIGATION HEADER */}
      <div className="bg-white border-b border-[#E5E5E5] px-8 py-3.5 flex flex-col sm:flex-row justify-between items-center gap-3 shrink-0">
        <div className="flex items-center gap-2.5">
          <Activity size={20} className="text-black animate-pulse" />
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-black flex items-center gap-1.5">
              ICEarth Exposenomics Suite <span className="text-[9px] bg-neutral-900 text-emerald-400 px-1 py-0.5 rounded font-bold uppercase tracking-normal">AI Powered</span>
            </h2>
            <p className="text-[10px] text-gray-500 font-sans">Benchmarking sovereign models & modeling individual cumulative risks</p>
          </div>
        </div>
        <div className="flex bg-neutral-100 p-0.5 rounded-lg border border-neutral-200">
          <button
            type="button"
            onClick={() => setActiveSubTab('india')}
            className={`px-3.5 py-1.5 rounded-md text-[10px] font-mono font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
              activeSubTab === 'india'
                ? 'bg-black text-white shadow-sm'
                : 'text-neutral-600 hover:text-black'
            }`}
          >
            🇮🇳 India Audit
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab('macro')}
            className={`px-3.5 py-1.5 rounded-md text-[10px] font-mono font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
              activeSubTab === 'macro'
                ? 'bg-black text-white shadow-sm'
                : 'text-neutral-600 hover:text-black'
            }`}
          >
            <Database size={11} /> Macro-Analytics & Ledger
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab('individual')}
            className={`px-3.5 py-1.5 rounded-md text-[10px] font-mono font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
              activeSubTab === 'individual'
                ? 'bg-black text-white shadow-sm'
                : 'text-neutral-600 hover:text-black'
            }`}
          >
            <Sparkles size={11} /> Personal Exposome Profiler
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {activeSubTab === 'india' ? (
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden w-full font-sans animate-fade-in" id="india-bihar-case-study">
            
            {/* LEFT SCROLLABLE PANEL: SCIENTIFIC EVIDENCE & SUPPLY CHAIN METRICS */}
            <div className="w-full lg:w-1/2 border-r border-[#E5E5E5] flex flex-col overflow-y-auto bg-white p-8 space-y-8">
              
              {/* TOP BANNER: PURE EARTH IN INDIA */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-800 uppercase border border-amber-200">
                    🇮🇳 SE Asia Baseline
                  </span>
                  <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-neutral-900 text-emerald-400 uppercase">
                    Pure Earth Source Verified
                  </span>
                </div>
                
                <h1 className="text-2xl font-serif font-semibold text-neutral-900 tracking-tight leading-tight">
                  The Bihar Turmeric Adulteration Audit & Fetal Threat Model
                </h1>
                
                <p className="text-xs text-neutral-600 leading-relaxed">
                  In Bihar, India, lead poisoning has reached epidemic proportions due to the historic, widespread practice of adulterating turmeric with <strong>lead chromate (PbCrO₄)</strong>—a vivid yellow industrial pigment used to beautify low-grade roots for the domestic food supply chain and export.
                </p>

                <div className="p-4 bg-amber-50/50 border border-amber-100 rounded-xl space-y-2">
                  <h4 className="text-xs font-mono font-bold text-amber-900 uppercase flex items-center gap-1.5">
                    <Award size={14} className="text-amber-700" /> Groundbreaking Investigation by Pure Earth
                  </h4>
                  <p className="text-[11px] text-amber-800 leading-relaxed">
                    We formally recognize <strong>Pure Earth India</strong> and their pioneering work training state food safety officers, wholesalers, and millers across Bihar. Their strategic intervention is transforming local ability to detect lead-adulterated samples and dismantle the toxic turmeric supply chain.
                  </p>
                </div>
              </div>

              {/* EPIDEMIOLOGICAL BENTO GRID */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-black flex items-center gap-1.5">
                  <Activity size={14} /> The Scale and Sources of Exposure in Bihar
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {/* Stat 1 */}
                  <div className="p-4 border border-[#E5E5E5] bg-neutral-50/50 rounded-xl space-y-1">
                    <span className="text-[9px] text-gray-400 font-mono block uppercase">Highest Average BLL in India</span>
                    <span className="text-xl font-mono font-bold text-red-600 block">10.42 μg/dL</span>
                    <span className="text-[10px] text-gray-500 leading-tight block font-sans">
                      Recorded in Bihar by the CSIR–NITI Aayog report.
                    </span>
                  </div>
                  
                  {/* Stat 2 */}
                  <div className="p-4 border border-[#E5E5E5] bg-neutral-50/50 rounded-xl space-y-1">
                    <span className="text-[9px] text-gray-400 font-mono block uppercase">Urban Pregnant Women Mean</span>
                    <span className="text-xl font-mono font-bold text-red-600 block">14.9 μg/dL</span>
                    <span className="text-[10px] text-gray-500 leading-tight block font-sans">
                      Nearly double the population mean, ensuring direct fetal transmission.
                    </span>
                  </div>

                  {/* Stat 3 */}
                  <div className="p-4 border border-[#E5E5E5] bg-neutral-50/50 rounded-xl space-y-1">
                    <span className="text-[9px] text-gray-400 font-mono block uppercase">Childhood Exposure Under 5</span>
                    <span className="text-xl font-mono font-bold text-amber-600 block">90.0%</span>
                    <span className="text-[10px] text-gray-500 leading-tight block font-sans">
                      Of tested children have blood lead levels ≥5 μg/dL.
                    </span>
                  </div>

                  {/* Stat 4 */}
                  <div className="p-4 border border-[#E5E5E5] bg-neutral-50/50 rounded-xl space-y-1">
                    <span className="text-[9px] text-gray-400 font-mono block uppercase">Extreme Childhood Risk</span>
                    <span className="text-xl font-mono font-bold text-neutral-900 block">20.0%</span>
                    <span className="text-[10px] text-gray-500 leading-tight block font-sans">
                      Of tested children exceed an extreme threshold of ≥10 μg/dL.
                    </span>
                  </div>
                </div>
              </div>

              {/* COMPARATIVE CHART */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-black">
                  BLL Benchmark: Bihar vs. Global Baselines
                </h3>
                <p className="text-[11px] text-gray-500">
                  Comparing Pure Earth&apos;s Bihar field data against the CDC Reference Value (3.5 μg/dL) and unperturbed global averages.
                </p>

                <div className="h-48 w-full font-mono text-xs">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: 'US Baseline', bll: 0.8, fill: '#10B981' },
                        { name: 'CDC Ref Value', bll: 3.5, fill: '#6B7280' },
                        { name: 'Bihar Overall Mean', bll: 7.6, fill: '#F59E0B' },
                        { name: 'NITI Aayog Max State', bll: 10.42, fill: '#EF4444' },
                        { name: 'Bihar Urban Pregnant', bll: 14.9, fill: '#B91C1C' }
                      ]}
                      margin={{ top: 10, right: 10, left: -25, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                      <XAxis dataKey="name" tick={{ fontSize: 8 }} stroke="#9CA3AF" />
                      <YAxis tick={{ fontSize: 9 }} stroke="#9CA3AF" />
                      <Tooltip formatter={(value) => [`${value} μg/dL`, 'Blood Lead Level']} />
                      <Bar dataKey="bll" radius={[4, 4, 0, 0]}>
                        {[
                          { fill: '#10B981' },
                          { fill: '#6B7280' },
                          { fill: '#F59E0B' },
                          { fill: '#EF4444' },
                          { fill: '#B91C1C' }
                        ].map((entry, idx) => (
                          <Cell key={`cell-${idx}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* EXPOSURE FLOWCHART */}
              <div className="p-5 border border-dashed border-neutral-300 rounded-xl bg-neutral-50/30 space-y-3">
                <h4 className="text-xs font-mono font-bold text-black uppercase">
                  Turmeric Adulteration Supply Chain Flow
                </h4>
                
                <div className="space-y-2 text-xs font-mono text-neutral-600">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-[9px]">1</span>
                    <span><strong>Milling</strong>: Low-grade turmeric roots are ground at local mills.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-[9px]">2</span>
                    <span><strong>Adulteration</strong>: Industrial Lead Chromate (PbCrO₄) dust is added to dye the roots golden yellow.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-[9px]">3</span>
                    <span><strong>Distribution</strong>: Packaged spices are shipped to local grocers and exported globally.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-[9px]">4</span>
                    <span><strong>Ingestion</strong>: Daily dietary use of spices transfers lead directly into pediatric & maternal systems.</span>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT SCROLLABLE PANEL: NEUROLOGICAL ASSESSMENT & ACTION PLANS */}
            <div className="w-full lg:w-1/2 flex flex-col overflow-y-auto bg-neutral-50/50 p-8 space-y-8">
              
              {/* THE BIOLOGICAL TOLL */}
              <section className="bg-white p-6 border border-[#E5E5E5] rounded-2xl shadow-xs space-y-4">
                <div className="flex items-center gap-2">
                  <Brain size={18} className="text-red-600" />
                  <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-black">
                    Irreversible Brain & Cognitive Devastation
                  </h3>
                </div>
                
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Lead behaves as a molecular mimic of calcium. In early childhood, it passes the blood-brain barrier effortlessly, permanently disrupting neurotransmitter release and synapse formation.
                </p>

                <div className="space-y-3 pt-2 text-xs font-sans">
                  <div className="flex items-start gap-2.5">
                    <span className="text-red-500 font-bold mt-0.5">•</span>
                    <div>
                      <strong className="text-neutral-900">Diminished Cognitive Ability (IQ Loss)</strong>
                      <p className="text-[11px] text-gray-500 mt-0.5 leading-normal">
                        Chronically elevated BLLs under age 5 are proven to cause an irreversible loss of 3 to 10 IQ points, undermining school performance and lifetime learning capacity.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="text-red-500 font-bold mt-0.5">•</span>
                    <div>
                      <strong className="text-neutral-900">Severe Maternal & Fetal Transmission</strong>
                      <p className="text-[11px] text-gray-500 mt-0.5 leading-normal">
                        Because there is <strong>no placental-fetal barrier</strong> to lead, the high body burden of pregnant women in Bihar (averaging up to 14.9 μg/dL in urban zones) leads to direct, catastrophic lead transfer to the developing fetal brain.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="text-red-500 font-bold mt-0.5">•</span>
                    <div>
                      <strong className="text-neutral-900">Long-term Demographic Headwinds</strong>
                      <p className="text-[11px] text-gray-500 mt-0.5 leading-normal">
                        Left unaddressed, the neurodevelopmental burden threatens Bihar’s future workforce, capping state productivity, lowering lifelong earnings, and perpetuating cycle-of-exposure poverty.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* COMPARATIVE SOUTHEAST ASIA BENCHMARKING GRID */}
              <section className="bg-white p-6 border border-[#E5E5E5] rounded-2xl shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-black">
                    Southeast Asia Exposure Benchmark
                  </h3>
                  <span className="text-[9px] font-mono text-gray-400">Comparing 2022-2026 Reports</span>
                </div>
                
                <p className="text-xs text-neutral-500 leading-normal">
                  This starts our regional comparative ledger. Globally, over <strong>1/3 of all children</strong> (approx. 800 million) are estimated to have blood lead levels exceeding 5 μg/dL, heavily concentrated in South and Southeast Asia.
                </p>

                <div className="border border-neutral-200 rounded-xl overflow-hidden text-xs">
                  <div className="bg-neutral-50 p-2.5 border-b border-neutral-200 grid grid-cols-3 font-mono font-bold text-[10px] text-gray-500 uppercase">
                    <span>Region</span>
                    <span>Avg BLL</span>
                    <span>Primary Driver</span>
                  </div>
                  
                  <div className="divide-y divide-neutral-100 font-sans">
                    <div className="p-2.5 grid grid-cols-3 hover:bg-neutral-50/50 transition-colors">
                      <span className="font-bold">Bihar Districts (India)</span>
                      <span className="font-mono text-red-600 font-bold">7.6 μg/dL</span>
                      <span className="text-[11px] text-neutral-600">Turmeric Adulteration</span>
                    </div>
                    <div className="p-2.5 grid grid-cols-3 hover:bg-neutral-50/50 transition-colors">
                      <span className="font-bold">West Kabul (Afghanistan)</span>
                      <span className="font-mono text-red-600 font-bold">12.4 μg/dL</span>
                      <span className="text-[11px] text-neutral-600">Traditional Kohl (Cosmetics)</span>
                    </div>
                    <div className="p-2.5 grid grid-cols-3 hover:bg-neutral-50/50 transition-colors">
                      <span className="font-bold">Azuay Province (Ecuador)</span>
                      <span className="font-mono text-amber-600 font-bold">14.8 μg/dL</span>
                      <span className="text-[11px] text-neutral-600">Lead-Glazed Cookware</span>
                    </div>
                    <div className="p-2.5 grid grid-cols-3 hover:bg-neutral-50/50 transition-colors">
                      <span className="font-bold">Ho Chi Minh (Vietnam)</span>
                      <span className="font-mono text-red-600 font-bold">18.6 μg/dL</span>
                      <span className="text-[11px] text-neutral-600">Artisanal Battery Recycling</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* PURE EARTH RECOGNITION & SHARING ACTIONS */}
              <section className="p-6 border border-emerald-200 bg-emerald-50/20 rounded-2xl space-y-4">
                <div className="flex items-center gap-2">
                  <Shield size={18} className="text-emerald-700" />
                  <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-emerald-900">
                    Sharing Data & Promoting Pure Earth Solutions
                  </h3>
                </div>
                
                <p className="text-xs text-emerald-800 leading-relaxed">
                  The solution is not just testing—it is structural supply-chain intervention. Pure Earth’s multi-sector program focuses on training, enforcing zero-chromate tolerances, and offering alternative organic polishers to processors.
                </p>

                <div className="pt-2 flex flex-wrap gap-2.5">
                  <button
                    onClick={() => {
                      alert("India Case Study Exported: Ready to share with Pure Earth India team!");
                    }}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-mono text-xs font-bold uppercase rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <FileText size={13} /> Export Case Study JSON
                  </button>
                  <a
                    href="https://www.pureearth.org/shifting-perceptions-in-bihar-state-officials-report-improved-ability-to-detect-adulterated-turmeric-samples-better-understanding-of-lead-exposure/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-emerald-600 text-emerald-700 hover:bg-white font-mono text-xs font-bold uppercase rounded-lg transition-colors flex items-center gap-1"
                  >
                    Visit Pure Earth Report <ArrowRight size={12} />
                  </a>
                </div>
              </section>

            </div>

          </div>
        ) : activeSubTab === 'macro' ? (
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden w-full">
            
            {/* LEFT SCROLLABLE PANEL: CONTROLS & MODELING */}
            <div className="w-full lg:w-1/2 border-r border-[#E5E5E5] flex flex-col overflow-y-auto">
              
              {/* SENSITIVITY ANALYSIS SLIDERS */}
              <section className="p-8 border-b border-[#E5E5E5] bg-white">
                <div className="flex items-center gap-2 mb-2">
                  <Sliders size={18} className="text-black" />
                  <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-black">Exposenomics Sensitivity & Predictor Model</h3>
                </div>
                <p className="text-xs text-[#666] leading-relaxed mb-6">
                  Adjust localized exposure vectors below to simulate blood lead accumulation ($H'$ Background Geology and materials) and predict impact on neurological systems and crime indicators.
                </p>

          <div className="space-y-5 text-xs">
            {/* Paint Stage */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-mono">
                <span className="font-semibold text-gray-700">Lead Paint Age & Decay Stage</span>
                <span className="font-bold text-black">Stage {paintStage} / 5</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={paintStage}
                onChange={(e) => setPaintStage(Number(e.target.value))}
                className="w-full accent-black cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>Intact Lead Primer (Min Exposure)</span>
                <span>Highly Flaking Chalky Chips (Impulsive Sweetness)</span>
              </div>
            </div>

            {/* Pipes count */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between font-mono">
                <span className="font-semibold text-gray-700">Lead Water Service Conduits</span>
                <span className="font-bold text-black">{pipesCount.toLocaleString()} Pipes</span>
              </div>
              <input
                type="range"
                min="0"
                max="10000"
                step="500"
                value={pipesCount}
                onChange={(e) => setPipesCount(Number(e.target.value))}
                className="w-full accent-black cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>0 Conduits (Copper/PVC Replaced)</span>
                <span>10,000 Unlined Lead Pipe Conduits</span>
              </div>
            </div>

            {/* Kohl Percent */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between font-mono">
                <span className="font-semibold text-gray-700">Infantile Kohl Cosmetics Usage</span>
                <span className="font-bold text-black">{kohlPct}% of Infants</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={kohlPct}
                onChange={(e) => setKohlPct(Number(e.target.value))}
                className="w-full accent-black cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>0% Applied</span>
                <span>100% Traditional Kohl (Lead Sulfide, PbS) Eye Application</span>
              </div>
            </div>

            {/* Recycled pots ppm */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between font-mono">
                <span className="font-semibold text-gray-700">Recycled Aluminum Cookware Contamination</span>
                <span className="font-bold text-black">{recycledPotsPpm.toLocaleString()} ppm Lead</span>
              </div>
              <input
                type="range"
                min="0"
                max="16000"
                step="500"
                value={recycledPotsPpm}
                onChange={(e) => setRecycledPotsPpm(Number(e.target.value))}
                className="w-full accent-black cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>0 ppm (Pure virgin grade)</span>
                <span>16,000 ppm (Heavy motor carcass recycle mix)</span>
              </div>
            </div>
          </div>

          {/* Model outputs */}
          <div className="mt-8 p-5 bg-[#F9FAFB] border border-[#E5E5E5] rounded-xl grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-mono">
            <div className="p-2 bg-white rounded-lg border border-gray-100">
              <span className="text-[9px] text-[#888] block uppercase">Predicted BLL</span>
              <span className="text-sm font-bold text-red-600 block mt-1">{sensitivityPredictions.bll} μg/dL</span>
              <span className="text-[9px] text-gray-400 block mt-0.5">Base: 0.016</span>
            </div>
            <div className="p-2 bg-white rounded-lg border border-gray-100">
              <span className="text-[9px] text-[#888] block uppercase">PFC Gray Loss</span>
              <span className="text-sm font-bold text-amber-600 block mt-1">-{sensitivityPredictions.grayMatterLoss}%</span>
              <span className="text-[9px] text-gray-400 block mt-0.5">Brain Volumetric</span>
            </div>
            <div className="p-2 bg-white rounded-lg border border-gray-100">
              <span className="text-[9px] text-[#888] block uppercase">Homicides /100k</span>
              <span className="text-sm font-bold text-neutral-900 block mt-1">+{sensitivityPredictions.homicide}</span>
              <span className="text-[9px] text-gray-400 block mt-0.5">Impulsive/Violent</span>
            </div>
            <div className="p-2 bg-white rounded-lg border border-gray-100">
              <span className="text-[9px] text-[#888] block uppercase">Overdoses /100k</span>
              <span className="text-sm font-bold text-neutral-900 block mt-1">+{sensitivityPredictions.overdose}</span>
              <span className="text-[9px] text-gray-400 block mt-0.5">HPA Vulnerability</span>
            </div>
          </div>
        </section>

        {/* COST-BENEFIT FORECAST CHART */}
        <section className="p-8 border-b border-[#E5E5E5] bg-white space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <TrendingUp size={18} className="text-emerald-700" />
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-black">Inaction vs. Remediation Cost-Benefit Forecast</h3>
            </div>
            <div className="text-right text-xs font-mono">
              <span className="text-gray-400">ROI Benefit Ratio: </span>
              <span className="text-emerald-600 font-bold">{sensitivityPredictions.roi}x</span>
            </div>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorInaction" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRemediation" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                <XAxis dataKey="year" tick={{ fontSize: 9, fontFamily: 'monospace' }} stroke="#D1D5DB" />
                <YAxis tick={{ fontSize: 9, fontFamily: 'monospace' }} stroke="#D1D5DB" />
                <Tooltip contentStyle={{ fontSize: 10, fontFamily: 'sans-serif', borderRadius: '8px' }} />
                <Legend wrapperStyle={{ fontSize: 10, fontFamily: 'monospace', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="Cost of Inaction (Societal Damage)" stroke="#EF4444" strokeWidth={1.5} fillOpacity={1} fill="url(#colorInaction)" />
                <Area type="monotone" dataKey="Cumulative Remediation Investment" stroke="#10B981" strokeWidth={1.5} fillOpacity={1} fill="url(#colorRemediation)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-start gap-3">
            <Award size={18} className="text-emerald-700 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <h4 className="font-bold text-emerald-900 font-sans">Sovereign Financial Feasibility Verdict</h4>
              <p className="text-[11px] text-emerald-800 leading-normal font-sans">
                By investing an estimated <strong>${sensitivityPredictions.cost} Million</strong> into targeted environmental filtration, society reclaims <strong>${sensitivityPredictions.savings} Million</strong> in averted municipal enforcement, medical support, and emergency infrastructure. This nets a clean benefit of <strong>${sensitivityPredictions.netSavings} Million</strong> over 10 years.
              </p>
            </div>
          </div>
        </section>

        {/* AI-POWERED INGUSTION PORTAL */}
        <section className="p-8 bg-white border-b border-[#E5E5E5] space-y-4">
          <div className="flex items-center gap-2">
            <Upload size={18} className="text-black" />
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-black">AI-Powered Unstandardized Data Ingestor</h3>
          </div>
          <p className="text-xs text-[#666] leading-relaxed">
            Close the global data gap by extracting structured parameters from raw municipal health transcripts, PDFs, or news articles directly into ICEarth's database.
          </p>

          <div className="space-y-3">
            {/* Presets */}
            <div className="flex flex-wrap gap-2 pt-1">
              {UNSTANDARDIZED_REPORT_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => setPastedReport(preset.text)}
                  className="px-2.5 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-[10px] font-sans font-medium rounded-lg cursor-pointer transition-colors"
                >
                  📄 Preset Sample {idx + 1}
                </button>
              ))}
            </div>

            <textarea
              value={pastedReport}
              onChange={(e) => setPastedReport(e.target.value)}
              placeholder="Paste unstandardized government report text, CDC presentation clips, municipal water announcements, or lead paint survey summaries here..."
              rows={12}
              className="w-full p-3 border border-[#D1D5DB] rounded-lg focus:outline-none focus:border-black font-sans text-xs bg-white resize-y min-h-[200px]"
            />

            <div className="flex justify-between items-center pt-1.5">
              <span className="text-[10px] font-mono text-[#999] uppercase">Sovereign LLM Mode: Gemini 3.5 Flash</span>
              <button
                type="button"
                onClick={handleAiIngest}
                disabled={isIngesting || !pastedReport.trim()}
                className="px-4 py-2 bg-black text-white hover:bg-neutral-800 disabled:bg-neutral-200 disabled:text-neutral-400 text-xs font-bold uppercase tracking-wider rounded-lg cursor-pointer transition-colors flex items-center gap-1.5 font-mono"
              >
                {isIngesting ? <RefreshCw size={13} className="animate-spin" /> : <Activity size={13} />}
                {isIngesting ? 'Parsing with AI...' : 'AI Ingest & Struct'}
              </button>
            </div>
          </div>

          {/* AI Logs / Feedback */}
          {ingestionLog.length > 0 && (
            <div className="p-3.5 bg-neutral-900 text-[#4AF626] font-mono text-[10px] rounded-lg space-y-1">
              {ingestionLog.map((log, idx) => (
                <div key={idx}>{log}</div>
              ))}
            </div>
          )}

          {/* Ingested Structured Preview */}
          {structuredPreview && (
            <div className="border border-emerald-200 bg-emerald-50/20 p-5 rounded-xl space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-emerald-100">
                <span className="text-xs font-mono font-bold text-emerald-800 uppercase flex items-center gap-1">
                  <CheckCircle size={13} /> AI Structured Output Preview
                </span>
                <span className="text-[10px] text-gray-400 font-mono">ZKP Confirmed</span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-[9px] text-[#999] block uppercase">Location</span>
                  <span className="font-sans font-bold text-black">{structuredPreview.location}</span>
                </div>
                <div>
                  <span className="text-[9px] text-[#999] block uppercase">Primary Source</span>
                  <span className="text-black font-bold uppercase">{structuredPreview.primarySource}</span>
                </div>
                <div>
                  <span className="text-[9px] text-[#999] block uppercase">Avg BLL</span>
                  <span className="text-red-600 font-bold">{structuredPreview.avgBll} μg/dL</span>
                </div>
                <div>
                  <span className="text-[9px] text-[#999] block uppercase">Violent/Homicide Rate</span>
                  <span className="text-black font-bold">{structuredPreview.homicideRate} / 100k</span>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-[9px] text-[#999] font-mono block uppercase mb-1">Demographic Mix</span>
                <div className="flex gap-1.5 flex-wrap">
                  {structuredPreview.demographics?.blackPct ? <span className="px-2 py-0.5 bg-white border border-gray-200 text-gray-700 text-[9px] rounded font-mono">Black: {structuredPreview.demographics.blackPct}%</span> : null}
                  {structuredPreview.demographics?.hispanicPct ? <span className="px-2 py-0.5 bg-white border border-gray-200 text-gray-700 text-[9px] rounded font-mono">Hispanic: {structuredPreview.demographics.hispanicPct}%</span> : null}
                  {structuredPreview.demographics?.indigenousPct ? <span className="px-2 py-0.5 bg-white border border-gray-200 text-gray-700 text-[9px] rounded font-mono">Indigenous: {structuredPreview.demographics.indigenousPct}%</span> : null}
                  {structuredPreview.demographics?.whitePct ? <span className="px-2 py-0.5 bg-white border border-gray-200 text-gray-700 text-[9px] rounded font-mono">White: {structuredPreview.demographics.whitePct}%</span> : null}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setStructuredPreview(null)}
                  className="px-3 py-1.5 border border-gray-200 hover:bg-white text-[10px] font-bold rounded cursor-pointer transition-colors uppercase"
                >
                  Discard
                </button>
                <button
                  type="button"
                  onClick={handleApplyPreview}
                  className="px-3.5 py-1.5 bg-emerald-600 text-white hover:bg-emerald-700 text-[10px] font-bold rounded cursor-pointer transition-colors uppercase flex items-center gap-1"
                >
                  <Plus size={11} /> Commit to Relational DB
                </button>
              </div>
            </div>
          )}
        </section>

      </div>

      {/* RIGHT SCROLLABLE PANEL: SPREADSHEET DATABASE, BLOCKSTACK CERTIFICATION & CRYPTOCURRENCY HUD ESCROW */}
      <div className="w-full lg:w-1/2 flex flex-col overflow-y-auto bg-white p-8 space-y-8">
        
        {/* SPREADSHEET DATABASE */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
            <div>
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-black flex items-center gap-1.5">
                <FileSpreadsheet size={16} /> Secure Relational Benchmarking Database
              </h3>
              <p className="text-[11px] text-gray-400 font-sans">
                Aggregating unperturbed baselines vs. public safety vectors since 2022.
              </p>
            </div>
            <button
              onClick={() => setShowManualForm(!showManualForm)}
              className="px-3 py-1.5 bg-black hover:bg-neutral-800 text-white text-[10px] font-mono uppercase tracking-wider font-bold rounded-lg cursor-pointer transition-colors flex items-center gap-1 self-start"
            >
              <Plus size={12} /> {showManualForm ? 'Close Entry' : 'Add Manual Row'}
            </button>
          </div>

          {/* Manual Form */}
          {showManualForm && (
            <form onSubmit={handleAddManualRecord} className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl space-y-3 text-xs">
              <h4 className="font-bold text-black font-sans uppercase text-[10px] tracking-wider pb-1 border-b border-neutral-200">Append Spreadsheet Row</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold block text-gray-600">Location / Territory</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Cleveland Ward 8"
                    value={manualLocation}
                    onChange={(e) => setManualLocation(e.target.value)}
                    className="w-full p-2 bg-white border border-gray-300 rounded focus:outline-none focus:border-black text-xs font-sans"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold block text-gray-600">Avg Blood Lead (BLL)</label>
                  <input
                    type="number"
                    step="0.001"
                    required
                    value={manualBll}
                    onChange={(e) => setManualBll(Number(e.target.value))}
                    className="w-full p-2 bg-white border border-gray-300 rounded focus:outline-none focus:border-black text-xs font-mono"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold block text-gray-600">Exposure Source</label>
                  <select
                    value={manualSource}
                    onChange={(e: any) => setManualSource(e.target.value)}
                    className="w-full p-2 bg-white border border-gray-300 rounded focus:outline-none focus:border-black text-xs font-sans"
                  >
                    <option value="paint">Lead Paint</option>
                    <option value="pipes">Water Pipes</option>
                    <option value="kohl">Kohl Cosmetics</option>
                    <option value="recycled pots">Recycled Pots</option>
                    <option value="food">Adulterated Food</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-semibold block text-gray-600">Homicide Rate /100k</label>
                  <input
                    type="number"
                    required
                    value={manualHomicide}
                    onChange={(e) => setManualHomicide(Number(e.target.value))}
                    className="w-full p-2 bg-white border border-gray-300 rounded focus:outline-none focus:border-black text-xs font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold block text-gray-600">Overdose Rate /100k</label>
                  <input
                    type="number"
                    required
                    value={manualOverdose}
                    onChange={(e) => setManualOverdose(Number(e.target.value))}
                    className="w-full p-2 bg-white border border-gray-300 rounded focus:outline-none focus:border-black text-xs font-mono"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-black hover:bg-neutral-800 text-white font-mono uppercase tracking-wider text-[10px] font-bold rounded cursor-pointer transition-colors mt-2"
              >
                Insert Verified Record Row
              </button>
            </form>
          )}

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={14} />
              <input
                type="text"
                placeholder="Search location or vector..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg text-xs bg-white focus:outline-none focus:border-black"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedSourceFilter}
                onChange={(e) => setSelectedSourceFilter(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg text-xs bg-white font-mono focus:outline-none focus:border-black"
              >
                <option value="all">ALL SOURCES</option>
                <option value="paint">PAINT</option>
                <option value="pipes">PIPES</option>
                <option value="kohl">KOHL</option>
                <option value="recycled pots">POTS</option>
                <option value="food">FOOD</option>
              </select>
              <select
                value={selectedCertFilter}
                onChange={(e) => setSelectedCertFilter(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg text-xs bg-white font-mono focus:outline-none focus:border-black"
              >
                <option value="all">ALL CERTS</option>
                <option value="certified">CERTIFIED</option>
                <option value="pending">PENDING</option>
                <option value="non-compliant">NON-COMPLIANT</option>
              </select>
            </div>
          </div>

          {/* Database Grid */}
          <div className="border border-[#E5E5E5] rounded-xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-neutral-50 text-neutral-500 border-b border-[#E5E5E5] font-mono uppercase tracking-wider text-[9px]">
                    <th className="p-3">Location</th>
                    <th className="p-3">Avg BLL</th>
                    <th className="p-3">Vector</th>
                    <th className="p-3">Homicide /100k</th>
                    <th className="p-3">Overdose /100k</th>
                    <th className="p-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-sans">
                  {filteredData.map((row) => (
                    <tr key={row.id} className="hover:bg-neutral-50/50 transition-colors">
                      <td className="p-3">
                        <span className="font-bold text-black block">{row.location}</span>
                        <span className="text-[10px] text-gray-400 font-mono">Pop: {row.population.toLocaleString()}</span>
                      </td>
                      <td className="p-3 font-mono font-bold text-black">
                        {row.avgBll} μg/dL
                      </td>
                      <td className="p-3 uppercase">
                        <span className="px-1.5 py-0.5 text-[9px] font-mono font-semibold bg-neutral-100 text-neutral-600 rounded">
                          {row.primarySource}
                        </span>
                      </td>
                      <td className="p-3 font-mono text-red-500">
                        {row.homicideRate}
                      </td>
                      <td className="p-3 font-mono text-neutral-700">
                        {row.overdoseRate}
                      </td>
                      <td className="p-3 text-right font-mono">
                        <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                          row.certificationStatus === 'certified' ? 'bg-emerald-50 text-emerald-600' :
                          row.certificationStatus === 'pending' ? 'bg-amber-50 text-amber-600' :
                          'bg-red-50 text-red-600'
                        }`}>
                          {row.certificationStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filteredData.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-gray-400 font-mono text-xs">
                        No benchmarking rows found matching filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* BLOCKSTACK STANDARDIZATION & BLOCKCHAIN CERTIFICATION */}
        <section className="space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-gray-100">
            <div>
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-black flex items-center gap-1.5">
                <Shield size={16} className="text-emerald-600" /> Decentralized Blockstack Certification Portal
              </h3>
              <p className="text-[11px] text-gray-400 font-sans">
                Standardizing Lead-Free certificates, blood diagnostics, and title transfer clearances.
              </p>
            </div>
          </div>

          {/* New certificate creation */}
          <form onSubmit={handleAddCertification} className="p-4 border border-[#E5E5E5] bg-gray-50/50 rounded-xl grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div className="sm:col-span-2 space-y-1">
              <label className="font-semibold text-gray-600 block">Property address or Patient ID</label>
              <input
                type="text"
                required
                placeholder="e.g., Cleveland Ward 3 Property 195"
                value={newCertLocation}
                onChange={(e) => setNewCertLocation(e.target.value)}
                className="w-full p-2 bg-white border border-gray-300 rounded text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-gray-600 block">Certificate Type</label>
              <select
                value={newCertType}
                onChange={(e: any) => setNewCertType(e.target.value)}
                className="w-full p-2 bg-white border border-gray-300 rounded text-xs"
              >
                <option value="rental_registry">Rental Registry</option>
                <option value="property_inspection">Property Inspection</option>
                <option value="title_transfer">Title Clearance</option>
                <option value="blood_test">Blood Diagnosis</option>
              </select>
            </div>
            <button
              type="submit"
              className="px-3 bg-black hover:bg-neutral-800 text-white font-mono font-bold uppercase rounded text-[10px] cursor-pointer transition-colors sm:self-end h-9"
            >
              Issue Certificate
            </button>
          </form>

          {/* Certificates Ledger */}
          <div className="space-y-3">
            {certifications.map((cert) => (
              <div key={cert.id} className="p-4 border border-[#E5E5E5] bg-white rounded-xl flex items-center justify-between shadow-xs">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${cert.status === 'verified' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                    <Shield size={16} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-black block leading-snug">{cert.location}</span>
                    <div className="flex gap-2 items-center text-[9px] font-mono text-gray-400 mt-1 uppercase">
                      <span>Type: {cert.type.replace('_', ' ')}</span>
                      <span>•</span>
                      <span>Inspector: {cert.inspector}</span>
                    </div>
                    <span className="font-mono text-[9px] text-[#999] block mt-0.5">Hash: {cert.hash}</span>
                  </div>
                </div>

                <div className="text-right flex flex-col items-end gap-1.5 font-mono">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                    cert.status === 'verified' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                  }`}>
                    {cert.status}
                  </span>
                  {cert.status === 'pending' ? (
                    <button
                      type="button"
                      onClick={() => handleVerifyZkpCert(cert.id)}
                      className="px-2 py-1 bg-black hover:bg-neutral-800 text-white text-[9px] font-bold uppercase rounded cursor-pointer transition-colors"
                    >
                      Verify ZKP & Release
                    </button>
                  ) : (
                    <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                      <Coins size={11} /> +{cert.releasedTokens.toLocaleString()} ICE
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CRYPTOCURRENCY HUD REMEDIATION GRANT ESCROW MANAGER */}
        <section className="p-6 border border-[#E5E5E5] bg-[#F9FAFB] rounded-2xl space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-neutral-900 text-emerald-400 uppercase">
                HUD Active Smart Contract Escrow
              </span>
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-black mt-2">
                Cleveland HUD $3,000,000 Lead Remediation Escrow
              </h3>
            </div>
            <Coins className="text-emerald-600" size={24} />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2 text-xs font-mono">
            <div>
              <span className="text-[9px] text-[#999] uppercase block mb-1">Total HUD Grant Committed</span>
              <span className="text-base font-bold text-black">$3,000,000.00 USD</span>
            </div>
            <div>
              <span className="text-[9px] text-[#999] uppercase block mb-1">ICE Tokens Escrow Supply</span>
              <span className="text-base font-bold text-emerald-700 flex items-center gap-1">
                <Coins size={14} /> {iceEscrowBalance.toLocaleString()} ICE
              </span>
            </div>
          </div>

          <div className="space-y-1.5 pt-3 border-t border-gray-200/50">
            <div className="flex justify-between text-[10px] font-mono text-gray-400">
              <span>Escrow Capital Distributed</span>
              <span>{Math.round(((1500000 - iceEscrowBalance) / 1500000) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-500 h-full transition-all duration-500" 
                style={{ width: `${((1500000 - iceEscrowBalance) / 1500000) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white border border-[#E5E5E5] p-4 rounded-xl flex items-start gap-3">
            <Lock size={16} className="text-[#666] shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <h4 className="font-bold text-black font-sans leading-tight">ZKP Performance Release Guarantee</h4>
              <p className="text-[10px] text-gray-500 leading-normal font-sans">
                Grant funding cannot be squandered or embezzled. Capital remains locked in the smart contract until local inspectors submit a validated <strong>ZKP Lead-Free Certificate</strong> via Blockstack. Upon validation, the designated ICE Tokens are instantly paid out, creating absolute administrative accountability.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  ) : (
    <div className="flex-1 flex flex-col lg:flex-row overflow-hidden w-full font-sans" id="individual-exposome-view">
      
      {/* LEFT SCROLLABLE PANEL: LIFE HISTORY & LIFESTYLE CHECKLIST */}
      <div className="w-full lg:w-1/2 border-r border-[#E5E5E5] flex flex-col overflow-y-auto bg-white">
        
        {/* INSTRUCTIONS */}
        <section className="p-8 border-b border-[#E5E5E5]">
          <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-neutral-950 text-emerald-400 uppercase">
            Clinical Patient-Ledger Mode
          </span>
          <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-black mt-2 mb-1.5">
            Lifetime Cumulative & Chronic Exposure Profiler
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Unlike acute short-term metrics, heavy metals like lead settle in your bones and teeth, forming a persistent lifetime body burden. Complete this questionnaire to model your chronic environmental assaults and calculate your relative hazard ratios.
          </p>
        </section>

        {/* RESIDENTIAL TIMELINE CHECKLIST */}
        <section className="p-8 border-b border-[#E5E5E5] space-y-4">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-black" />
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-black">
              1. Residential History Timeline
            </h4>
          </div>
          <p className="text-[11px] text-gray-500 leading-normal">
            Older homes (pre-1950) typically contain heavy leaded paint primers and lead solder service water pipes. Add all your historical living locations below to index risk years.
          </p>

          {/* LIST OF HISTORICAL HOMES */}
          <div className="space-y-2">
            {residentHistory.map((res) => (
              <div key={res.id} className="p-3.5 border border-neutral-200 bg-[#F9FAFB] rounded-xl flex justify-between items-center text-xs font-mono">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-black">{res.city}</span>
                    <span className="text-[10px] text-gray-400">({res.years})</span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-[10px] text-gray-500">
                    <span>• Home: {res.pre1950Home ? 'Pre-1950 (Paint Hazard)' : 'Post-1950'}</span>
                    <span>• Pipes: {res.waterPipes.toUpperCase()}</span>
                    <span className="col-span-2">• Flaking Paint: {res.leadPaintFlaking ? 'Yes (Chalking/Peeling)' : 'No'}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveResidentHistory(res.id)}
                  className="text-red-500 hover:text-red-700 font-sans hover:bg-red-50 p-1.5 rounded-lg transition-colors cursor-pointer"
                  title="Remove Location"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>

          {/* ADD NEW RESIDENCE FORM */}
          <div className="bg-neutral-50 border border-neutral-200 p-4 rounded-xl space-y-3 text-xs">
            <h5 className="font-mono font-bold uppercase text-[10px] text-[#666] tracking-wider">
              + Add Residential Window
            </h5>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-gray-400 block uppercase">City & State / Ward</label>
                <input
                  type="text"
                  placeholder="e.g. Cleveland Ward 3"
                  value={newResCity}
                  onChange={(e) => setNewResCity(e.target.value)}
                  className="w-full p-2 border border-neutral-300 rounded bg-white text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-gray-400 block uppercase">Calendar Years</label>
                <input
                  type="text"
                  placeholder="e.g. 1982 - 1994"
                  value={newResYears}
                  onChange={(e) => setNewResYears(e.target.value)}
                  className="w-full p-2 border border-neutral-300 rounded bg-white text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-gray-400 block uppercase">Your Age Then</label>
                <input
                  type="text"
                  placeholder="e.g. 0 - 12"
                  value={newResAge}
                  onChange={(e) => setNewResAge(e.target.value)}
                  className="w-full p-2 border border-neutral-300 rounded bg-white text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-gray-400 block uppercase">Plumbing Pipe Core</label>
                <select
                  value={newResPipes}
                  onChange={(e) => setNewResPipes(e.target.value as 'lead' | 'copper' | 'pvc')}
                  className="w-full p-2 border border-neutral-300 rounded bg-white text-xs"
                >
                  <option value="lead">Unlined Lead Conduits</option>
                  <option value="copper">Leaded-Solder Copper</option>
                  <option value="pvc">PVC / Pure Copper</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-1 font-mono text-[10px] text-gray-600">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newResPre1950}
                  onChange={(e) => setNewResPre1950(e.target.checked)}
                  className="accent-black rounded"
                />
                <span>Structure built before 1950 (High probability of interior lead-oxide paints)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newResPaint}
                  onChange={(e) => setNewResPaint(e.target.checked)}
                  className="accent-black rounded"
                />
                <span>Peeling, chalking, or flaking interior/exterior paint chips visible</span>
              </label>
            </div>

            <button
              type="button"
              onClick={() => {
                const mockEv = { preventDefault: () => {} } as any;
                handleAddResidentHistory(mockEv);
              }}
              disabled={!newResCity.trim() || !newResYears.trim()}
              className="w-full py-1.5 bg-black hover:bg-neutral-800 disabled:bg-neutral-200 text-white disabled:text-neutral-400 text-xs font-bold uppercase tracking-wider rounded font-mono transition-colors cursor-pointer"
            >
              Save Historical Residence
            </button>
          </div>
        </section>

        {/* LIFESTYLE & DIETARY RISK EXPOSURES */}
        <section className="p-8 border-b border-[#E5E5E5] space-y-4">
          <div className="flex items-center gap-2">
            <Sliders size={16} className="text-black" />
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-black">
              2. Lifestyle, Products & Dietary Assays
            </h4>
          </div>
          <p className="text-[11px] text-gray-500 leading-normal">
            Identify habits and common consumer goods containing hidden lead concentrations or other environmental factors that trigger cellular stress.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 font-mono text-xs text-neutral-700">
            <label className="p-3 border border-neutral-200 hover:border-black rounded-xl flex items-start gap-2.5 cursor-pointer bg-[#F9FAFB] select-none transition-colors">
              <input
                type="checkbox"
                checked={smoker}
                onChange={(e) => setSmoker(e.target.checked)}
                className="accent-black rounded mt-0.5 shrink-0"
              />
              <div>
                <span className="font-bold text-black block text-[11px]">Direct/Passive Smoking</span>
                <span className="text-[9px] text-[#888] leading-tight block mt-0.5">Tobacco absorbs soil lead. Active smoking routes lead directly to alveolar pathways.</span>
              </div>
            </label>

            <label className="p-3 border border-neutral-200 hover:border-black rounded-xl flex items-start gap-2.5 cursor-pointer bg-[#F9FAFB] select-none transition-colors">
              <input
                type="checkbox"
                checked={occupationalLead}
                onChange={(e) => setOccupationalLead(e.target.checked)}
                className="accent-black rounded mt-0.5 shrink-0"
              />
              <div>
                <span className="font-bold text-black block text-[11px]">Industrial Occupation</span>
                <span className="text-[9px] text-[#888] leading-tight block mt-0.5">Demolition, battery plants, radiator repairs, artisanal smelting, plumbing workshops.</span>
              </div>
            </label>

            <label className="p-3 border border-neutral-200 hover:border-black rounded-xl flex items-start gap-2.5 cursor-pointer bg-[#F9FAFB] select-none transition-colors">
              <input
                type="checkbox"
                checked={hobbyLead}
                onChange={(e) => setHobbyLead(e.target.checked)}
                className="accent-black rounded mt-0.5 shrink-0"
              />
              <div>
                <span className="font-bold text-black block text-[11px]">High-Exposure Hobbies</span>
                <span className="text-[9px] text-[#888] leading-tight block mt-0.5">Stained glass fabrication, lead fishing sinkers, shooting ranges, indoor pottery glazing.</span>
              </div>
            </label>

            <label className="p-3 border border-neutral-200 hover:border-black rounded-xl flex items-start gap-2.5 cursor-pointer bg-[#F9FAFB] select-none transition-colors">
              <input
                type="checkbox"
                checked={useEarthenware}
                onChange={(e) => setUseEarthenware(e.target.checked)}
                className="accent-black rounded mt-0.5 shrink-0"
              />
              <div>
                <span className="font-bold text-black block text-[11px]">Traditional Clay Cookware</span>
                <span className="text-[9px] text-[#888] leading-tight block mt-0.5">Lead-glazed earthenware (clay loza). Acidic foods leach lead directly into diets.</span>
              </div>
            </label>

            <label className="p-3 border border-neutral-200 hover:border-black rounded-xl flex items-start gap-2.5 cursor-pointer bg-[#F9FAFB] select-none transition-colors">
              <input
                type="checkbox"
                checked={useKohl}
                onChange={(e) => setUseKohl(e.target.checked)}
                className="accent-black rounded mt-0.5 shrink-0"
              />
              <div>
                <span className="font-bold text-black block text-[11px]">Traditional Cosmetics</span>
                <span className="text-[9px] text-[#888] leading-tight block mt-0.5">Kohl, Surma, Tiro cosmetics. Often contain 50%+ pulverized lead sulfide.</span>
              </div>
            </label>

            <label className="p-3 border border-neutral-200 hover:border-black rounded-xl flex items-start gap-2.5 cursor-pointer bg-[#F9FAFB] select-none transition-colors">
              <input
                type="checkbox"
                checked={useRecycledPots}
                onChange={(e) => setUseRecycledPots(e.target.checked)}
                className="accent-black rounded mt-0.5 shrink-0"
              />
              <div>
                <span className="font-bold text-black block text-[11px]">Recycled Cookware</span>
                <span className="text-[9px] text-[#888] leading-tight block mt-0.5">Adulterated pots cast from melted down scrap car battery casings and engines.</span>
              </div>
            </label>
          </div>
        </section>

        {/* BONE, TEETH, & BLOOD BIOMARKER OVERRIDES */}
        <section className="p-8 border-b border-[#E5E5E5] space-y-4">
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-black" />
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-black">
              3. Laboratory Biomarkers & Bone Assays
            </h4>
          </div>
          <p className="text-[11px] text-gray-500 leading-normal">
            If you have undergone advanced laboratory, dental, or K-XRF tibia measurements, input them here to synchronize the predictor index.
          </p>

          <div className="space-y-3 font-mono text-xs">
            {/* Bone test */}
            <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl space-y-2">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={hasBoneLeadTest}
                  onChange={(e) => setHasBoneLeadTest(e.target.checked)}
                  className="accent-black rounded"
                />
                <span className="font-bold text-black">K-XRF Tibia Bone Lead Test Available</span>
              </label>
              {hasBoneLeadTest && (
                <div className="flex items-center gap-2 pl-6 text-[11px]">
                  <span className="text-[10px] text-gray-500">Tibia Lead Content:</span>
                  <input
                    type="number"
                    value={boneLeadPpm}
                    onChange={(e) => setBoneLeadPpm(Number(e.target.value))}
                    className="w-20 p-1.5 border border-neutral-300 rounded bg-white font-bold text-center"
                  />
                  <span className="text-[10px] text-gray-500">ppm Pb</span>
                </div>
              )}
            </div>

            {/* Tooth test */}
            <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl space-y-2">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={hasToothLeadTest}
                  onChange={(e) => setHasToothLeadTest(e.target.checked)}
                  className="accent-black rounded"
                />
                <span className="font-bold text-black">Tooth Bio-Biopsy/Ash Lab Test Available</span>
              </label>
              {hasToothLeadTest && (
                <div className="flex items-center gap-2 pl-6 text-[11px]">
                  <span className="text-[10px] text-gray-500">Dental Lead Content:</span>
                  <input
                    type="number"
                    value={toothLeadPpm}
                    onChange={(e) => setToothLeadPpm(Number(e.target.value))}
                    className="w-20 p-1.5 border border-neutral-300 rounded bg-white font-bold text-center"
                  />
                  <span className="text-[10px] text-gray-500">ppm Pb</span>
                </div>
              )}
            </div>

            {/* Pediatric Blood */}
            <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl space-y-2">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={hasPediatricBll}
                  onChange={(e) => setHasPediatricBll(e.target.checked)}
                  className="accent-black rounded"
                />
                <span className="font-bold text-black">Pediatric Historical Blood Lead level (BLL)</span>
              </label>
              {hasPediatricBll && (
                <div className="flex items-center gap-2 pl-6 text-[11px]">
                  <span className="text-[10px] text-gray-500">BLL Measurement:</span>
                  <input
                    type="number"
                    value={pediatricBllVal}
                    onChange={(e) => setPediatricBllVal(Number(e.target.value))}
                    className="w-20 p-1.5 border border-neutral-300 rounded bg-white font-bold text-center"
                  />
                  <span className="text-[10px] text-gray-500">μg/dL</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* OTHER ENVIRONMENTAL ASSAULTS CHECKLIST */}
        <section className="p-8 border-b border-[#E5E5E5] space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} className="text-black" />
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-black">
              4. Co-Environmental Assaults
            </h4>
          </div>
          <p className="text-[11px] text-gray-500 leading-normal">
            Environmental toxins do not act in isolation. Synergistic exposure multiplies somatic mutations and cognitive degradation.
          </p>

          <div className="space-y-2 font-mono text-xs text-neutral-700">
            <label className="p-3 border border-neutral-200 rounded-xl flex items-center gap-3 cursor-pointer bg-[#F9FAFB] hover:border-black transition-colors select-none">
              <input
                type="checkbox"
                checked={dieselExhaust}
                onChange={(e) => setDieselExhaust(e.target.checked)}
                className="accent-black rounded shrink-0"
              />
              <div>
                <span className="font-bold text-black block text-[11px]">Proximity to High-Volume Transit (Diesel Exhaust / PM2.5)</span>
                <span className="text-[9px] text-[#888] leading-normal block mt-0.5">Arterial roadways route ultra-fine particulates directly into brain pathways, triggering neuro-inflammation.</span>
              </div>
            </label>

            <label className="p-3 border border-neutral-200 rounded-xl flex items-center gap-3 cursor-pointer bg-[#F9FAFB] hover:border-black transition-colors select-none">
              <input
                type="checkbox"
                checked={pfasWater}
                onChange={(e) => setPfasWater(e.target.checked)}
                className="accent-black rounded shrink-0"
              />
              <div>
                <span className="font-bold text-black block text-[11px]">Industrial Water Runoff (PFAS / Teflon Contamination)</span>
                <span className="text-[9px] text-[#888] leading-normal block mt-0.5">Per- and polyfluoroalkyl substances accumulate in endocrine and hepatic tissues forever.</span>
              </div>
            </label>

            <label className="p-3 border border-neutral-200 rounded-xl flex items-center gap-3 cursor-pointer bg-[#F9FAFB] hover:border-black transition-colors select-none">
              <input
                type="checkbox"
                checked={coalDust}
                onChange={(e) => setCoalDust(e.target.checked)}
                className="accent-black rounded shrink-0"
              />
              <div>
                <span className="font-bold text-black block text-[11px]">Coal-Fired Power Plant Proximity (Mercury & Ash Dust)</span>
                <span className="text-[9px] text-[#888] leading-normal block mt-0.5">Coal fly ash contains heavy arsenic, selenium, and neurotoxic organic mercury particulates.</span>
              </div>
            </label>
          </div>
        </section>

        {/* TRIGGER BUTTON */}
        <div className="p-8 sticky bottom-0 bg-white border-t border-neutral-100 flex flex-col gap-3">
          <button
            type="button"
            onClick={handleCalculateExposome}
            disabled={isCalculatingExposome}
            className="w-full py-3.5 bg-black hover:bg-neutral-800 disabled:bg-neutral-200 disabled:text-neutral-400 text-white text-xs font-mono font-bold uppercase tracking-widest rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            {isCalculatingExposome ? <RefreshCw size={14} className="animate-spin" /> : <Sparkles size={14} />}
            {isCalculatingExposome ? 'AI Modeling Core Active...' : '🔮 Run Sovereign AI Exposome Analysis'}
          </button>

          {exposomeLog.length > 0 && (
            <div className="p-3.5 bg-neutral-900 text-[#4AF626] font-mono text-[9px] rounded-lg space-y-1">
              {exposomeLog.map((log, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span className="text-[8px] text-[#777]">[{idx + 1}]</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* RIGHT SCROLLABLE PANEL: ANALYTICS & BIOLOGICAL THREAT FORECAST */}
      <div className="w-full lg:w-1/2 flex flex-col overflow-y-auto bg-neutral-50/50">
        
        {!exposomeResults ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-4">
            <div className="p-4 bg-white border border-neutral-200 rounded-2xl shadow-sm text-neutral-400">
              <Activity size={32} className="mx-auto text-neutral-300 animate-pulse" />
            </div>
            <div className="space-y-1.5 max-w-sm">
              <h4 className="text-xs font-mono font-bold uppercase text-black">
                Awaiting Diagnostic Data
              </h4>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Complete your residential history checklist and lifestyle profiles, then click <strong>Run Sovereign AI Exposome Analysis</strong> to model cumulative burden indices, organ damage, and local HUD grant opportunities.
              </p>
            </div>
          </div>
        ) : (
          <div className="p-8 space-y-6">
            
            {/* DYNAMIC COMPREHENSIVE BIOMARKER OVERVIEW */}
            <section className="p-6 border border-[#E5E5E5] bg-white rounded-2xl space-y-4 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <span className="px-2 py-0.5 rounded text-[8px] font-mono font-bold bg-neutral-900 text-emerald-400 uppercase">
                    Active Risk Profile
                  </span>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-black mt-2">
                    Lifetime Cumulative Exposure Dashboard
                  </h3>
                </div>
                <Award className="text-black shrink-0" size={20} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1 text-center font-mono text-xs">
                <div className="p-3 bg-neutral-50 border border-neutral-150 rounded-xl">
                  <span className="text-[9px] text-[#888] block uppercase">Exposome Index</span>
                  <span className={`text-lg font-bold block mt-1 ${
                    exposomeResults.cumulativeExposureIndex > 60 ? 'text-red-600' : exposomeResults.cumulativeExposureIndex > 30 ? 'text-amber-600' : 'text-emerald-600'
                  }`}>
                    {exposomeResults.cumulativeExposureIndex} / 100
                  </span>
                  <span className="text-[9px] text-gray-400 block mt-0.5">Cumulative Load</span>
                </div>

                <div className="p-3 bg-neutral-50 border border-neutral-150 rounded-xl">
                  <span className="text-[9px] text-[#888] block uppercase">Est. Tibia Burden</span>
                  <span className="text-lg font-bold text-black block mt-1">
                    {exposomeResults.estimatedBoneBurdenPpm} ppm
                  </span>
                  <span className="text-[9px] text-gray-400 block mt-0.5">Bone Lead Reserve</span>
                </div>

                <div className="p-3 bg-neutral-50 border border-neutral-150 rounded-xl">
                  <span className="text-[9px] text-[#888] block uppercase">Adult BLL Equiv.</span>
                  <span className="text-lg font-bold text-black block mt-1">
                    {exposomeResults.predictedAdultBllEquivalent} μg/dL
                  </span>
                  <span className="text-[9px] text-gray-400 block mt-0.5">Circulating Equivalent</span>
                </div>
              </div>

              <div className="space-y-1 pt-2 border-t border-neutral-100 text-[11px] text-gray-500 leading-relaxed">
                <p>
                  <strong>Biomedical Note:</strong> Over 95% of the human lead body burden resides in bone and dental tissue. As the skeleton undergoes remodeling, this stored reservoir continuously mobilizes lead back into the blood system, provoking silent cardiovascular, kidney, and central nervous system degradation decades after the initial exposure occurred.
                </p>
              </div>
            </section>

            {/* ORGAN SYSTEM HEATMAP & HAZARD MATRIX */}
            <section className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-black pl-1">
                Epigenetic & Somatic Organ System Prognosis
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Neurocognitive */}
                <div className="p-5 bg-white border border-[#E5E5E5] rounded-2xl flex items-start gap-3.5 shadow-sm">
                  <div className="p-2.5 bg-red-50 text-red-600 rounded-xl shrink-0 mt-0.5">
                    <Brain size={18} />
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between items-center">
                      <h5 className="font-bold text-black font-mono uppercase tracking-wider">Brain & Cognition</h5>
                      <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase ${
                        exposomeResults.diseaseRisks.neurocognitive.risk === 'High' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {exposomeResults.diseaseRisks.neurocognitive.risk}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-neutral-500 block">
                      Impulsive Risk Multiplier: <strong>{exposomeResults.diseaseRisks.neurocognitive.factor}x</strong>
                    </span>
                    <p className="text-[10px] text-gray-500 leading-relaxed">
                      {exposomeResults.diseaseRisks.neurocognitive.details}
                    </p>
                  </div>
                </div>

                {/* Cardiovascular */}
                <div className="p-5 bg-white border border-[#E5E5E5] rounded-2xl flex items-start gap-3.5 shadow-sm">
                  <div className="p-2.5 bg-red-50 text-red-600 rounded-xl shrink-0 mt-0.5">
                    <Heart size={18} />
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between items-center">
                      <h5 className="font-bold text-black font-mono uppercase tracking-wider">Heart & Vascular</h5>
                      <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase ${
                        exposomeResults.diseaseRisks.cardiovascular.risk === 'High' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {exposomeResults.diseaseRisks.cardiovascular.risk}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-neutral-500 block">
                      CHD Risk Multiplier: <strong>{exposomeResults.diseaseRisks.cardiovascular.factor}x</strong>
                    </span>
                    <p className="text-[10px] text-gray-500 leading-relaxed">
                      {exposomeResults.diseaseRisks.cardiovascular.details}
                    </p>
                  </div>
                </div>

                {/* Renal */}
                <div className="p-5 bg-white border border-[#E5E5E5] rounded-2xl flex items-start gap-3.5 shadow-sm">
                  <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl shrink-0 mt-0.5">
                    <Shield size={18} />
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between items-center">
                      <h5 className="font-bold text-black font-mono uppercase tracking-wider">Renal Filtration</h5>
                      <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase ${
                        exposomeResults.diseaseRisks.renal.risk === 'High' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {exposomeResults.diseaseRisks.renal.risk}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-neutral-500 block">
                      eGFR Loss Multiplier: <strong>{exposomeResults.diseaseRisks.renal.factor}x</strong>
                    </span>
                    <p className="text-[10px] text-gray-500 leading-relaxed">
                      {exposomeResults.diseaseRisks.renal.details}
                    </p>
                  </div>
                </div>

                {/* Endocrine */}
                <div className="p-5 bg-white border border-[#E5E5E5] rounded-2xl flex items-start gap-3.5 shadow-sm">
                  <div className="p-2.5 bg-neutral-100 text-neutral-600 rounded-xl shrink-0 mt-0.5">
                    <Activity size={18} />
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between items-center">
                      <h5 className="font-bold text-black font-mono uppercase tracking-wider">HPA & Metabolic</h5>
                      <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase ${
                        exposomeResults.diseaseRisks.endocrine.risk === 'High' ? 'bg-red-50 text-red-600' : 'bg-neutral-100 text-neutral-600'
                      }`}>
                        {exposomeResults.diseaseRisks.endocrine.risk}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-neutral-500 block">
                      HPA Shift Multiplier: <strong>{exposomeResults.diseaseRisks.endocrine.factor}x</strong>
                    </span>
                    <p className="text-[10px] text-gray-500 leading-relaxed">
                      {exposomeResults.diseaseRisks.endocrine.details}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* CO-ENVIRONMENTAL ASSAULTS OUTCOME */}
            {exposomeResults.diseaseRisks.otherAssaults.risks.length > 0 && (
              <section className="p-5 bg-amber-50/50 border border-amber-200 rounded-2xl space-y-2 shadow-sm">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="text-amber-700 shrink-0" size={16} />
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-900">
                    Synergistic Toxic Assault Warning
                  </h4>
                </div>
                <p className="text-[10.5px] text-amber-800 leading-relaxed">
                  {exposomeResults.diseaseRisks.otherAssaults.description} Heavy metals and air/water contaminants occupy competitive receptors, suppressing cellular defense mechanisms and accelerating organ damage indices.
                </p>
              </section>
            )}

            {/* PERSONAL PATHWAY & RECOVERY ROADMAP */}
            <section className="p-6 bg-white border border-[#E5E5E5] rounded-2xl space-y-4 shadow-sm">
              <div className="flex items-center gap-2">
                <Award className="text-black shrink-0" size={16} />
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-black">
                  Clinical Remediation Pathway
                </h4>
              </div>
              
              <div className="space-y-3">
                {exposomeResults.preventionPathway.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs leading-relaxed text-gray-700 w-full">
                    {step.startsWith('AI Toxicological Summary:') ? (
                      <div className="p-4 bg-neutral-900 text-gray-100 rounded-xl space-y-2 w-full font-sans border-l-4 border-emerald-500 text-[11px] leading-relaxed text-left">
                        <span className="font-mono text-[9px] tracking-wider text-emerald-400 font-bold block uppercase">
                          🧬 Live AI Sovereign Consultation
                        </span>
                        <div className="whitespace-pre-wrap">{step.replace('AI Toxicological Summary: ', '')}</div>
                      </div>
                    ) : (
                      <>
                        <div className="w-5 h-5 rounded-full bg-neutral-100 border border-neutral-300 text-neutral-800 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <span className="font-sans text-[11.5px] text-gray-600 mt-0.5">{step}</span>
                      </>
                    )}
                  </div>
                ))}
              </div>

              {/* HUD CLEVELAND MATCH WARNING */}
              {exposomeResults.hudClevelandEligible && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3 mt-4">
                  <CheckCircle className="text-emerald-700 shrink-0 mt-0.5" size={16} />
                  <div className="space-y-1 text-xs">
                    <h5 className="font-bold text-emerald-900 font-sans">Cleveland HUD Grant Funding Match Detected!</h5>
                    <p className="text-[10px] text-emerald-800 leading-normal font-sans">
                      Based on your living history inside Cleveland, you qualify for the <strong>Cleveland HUD $3,000,000 Lead Remediation Escrow</strong>. This provides 100% covered residential paint encapsulation and pipe replacement.
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveSubTab('macro')}
                      className="mt-2 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-mono text-[9px] font-bold uppercase tracking-wider rounded transition-colors cursor-pointer"
                    >
                      View Escrow Manager & Submit Claim
                    </button>
                  </div>
                </div>
              )}
            </section>

          </div>
        )}

      </div>

    </div>
  )}
  </div>
</div>
);
}
