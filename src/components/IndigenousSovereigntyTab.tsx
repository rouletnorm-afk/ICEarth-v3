import React, { useState } from 'react';
import { 
  Feather, 
  Waves, 
  HeartPulse, 
  Compass, 
  ShieldCheck, 
  Sparkles, 
  BookOpen, 
  TrendingDown, 
  Database, 
  Activity, 
  Map, 
  AlertCircle, 
  CheckCircle,
  HelpCircle,
  ArrowRight,
  Radio,
  Coins,
  Droplet,
  Globe,
  Snowflake,
  Lock,
  Terminal,
  ArrowUpRight,
  ShieldAlert
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  LineChart, 
  Line,
  BarChart,
  Bar,
  Cell
} from 'recharts';

// TYPE FOR EAGLE CLINIC
interface RaptorPatient {
  id: string;
  name: string;
  species: string;
  initialBll: number; // ug/dL
  currentBll: number;
  treatmentDays: number;
  status: 'In Surgery' | 'Chelation' | 'Flight Therapy' | 'Released 🎉';
  discoveryLocation: string;
}

const INITIAL_PATIENTS: RaptorPatient[] = [
  {
    id: "migizi-01",
    name: "Migizi (Sacred Messenger)",
    species: "Bald Eagle",
    initialBll: 85,
    currentBll: 85,
    treatmentDays: 0,
    status: 'In Surgery',
    discoveryLocation: "Levering, Michigan (Anishinaabe Lands)"
  },
  {
    id: "aquila-02",
    name: "Golden Wing",
    species: "Golden Eagle",
    initialBll: 62,
    currentBll: 18,
    treatmentDays: 14,
    status: 'Flight Therapy',
    discoveryLocation: "Harbor Springs, Michigan"
  },
  {
    id: "kestrel-03",
    name: "Wind Hover",
    species: "Red-Tailed Hawk",
    initialBll: 45,
    currentBll: 3,
    treatmentDays: 21,
    status: 'Released 🎉',
    discoveryLocation: "Emmet County, Michigan"
  },
  {
    id: "migizi-04",
    name: "Oshki (New Beginnings)",
    species: "Bald Eagle",
    initialBll: 110,
    currentBll: 48,
    treatmentDays: 8,
    status: 'Chelation',
    discoveryLocation: "Little Traverse Bay Region"
  }
];

// TYPE FOR EXPANDED SOVEREIGN ECO-REMEDIATION LEDGER
interface CrisisProject {
  id: string;
  name: string;
  cost: number;
  description: string;
  impactDescription: string;
  impactContaminantReduction: number;
  impactHealthGain: number;
}

interface CrisisPathway {
  id: string;
  region: string;
  tribe: string;
  contaminant: string;
  hazardLevel: 'CRITICAL' | 'SEVERE' | 'MODERATE' | 'MONITORED';
  background: string;
  culturalContext: string;
  remediationStrategy: string;
  initialContaminantLevel: number;
  unit: string;
  currentContaminantLevel: number;
  healthIndex: number; // 0-100%
  projects: CrisisProject[];
}

const INITIAL_CRISES: CrisisPathway[] = [
  {
    id: "project-jupiter-datacenter",
    region: "Middle Rio Grande Basin (New Mexico)",
    tribe: "Pueblos of Sandía, Isleta & Cochiti ⚡",
    contaminant: "Water Aquifer Drawdown, Heavy Diesel Air Emissions & Fake Consent Spam",
    hazardLevel: 'CRITICAL',
    background: "The massive 'Project Jupiter' (Oracle/OpenAI supercomputing cluster) requires millions of gallons of pristine groundwater daily for evaporative cooling. In July 2026, the New Mexico Environment Department confirmed that someone submitted hundreds of fraudulent, automated comments masquerading as tribal leaders and state officials to fabricate consent for fast-tracking environmental permits.",
    culturalContext: "The Rio Grande (P'osoge) is the physical and spiritual lifeforce of the Pueblo community. Forging indigenous signatures to steamroll high-consumption data center permits desecrates both our local sovereignty and the sacred water ('Water Is Life' / Mni Wiconi) that sustains our lineage.",
    remediationStrategy: "ICEarth bypasses standard public comment channels by building a Sovereign Commentary Vault secured by cryptographic tribal signatures. Real-time telemetry sensors on data-center cooling pumps and backup generators continuously register impact parameters, triggering automated regulatory offset fees.",
    initialContaminantLevel: 98, // relative hazard rating out of 100
    unit: "% Impact",
    currentContaminantLevel: 98,
    healthIndex: 32,
    projects: [
      {
        id: "jupiter-vault-remed",
        name: "Deploy Cryptographic Commentary Vault",
        cost: 2500,
        description: "Equip tribal councils and the New Mexico Environment Department with self-sovereign cryptographic signature nodes for public hearings.",
        impactDescription: "Neutralizes fraudulent submissions, drops conflict score by 40%, and increases health index by 25%.",
        impactContaminantReduction: 40,
        impactHealthGain: 25
      },
      {
        id: "jupiter-water-remed",
        name: "Audit Real-Time Aquifer Extraction",
        cost: 2000,
        description: "Install off-grid ultrasonic water flow telemetry on data center cooling conduits, publishing water drawdown rates directly to the public ledger.",
        impactDescription: "Brings hidden water extraction to light, drops water-depletion impact by 28%, and increases health index by 20%.",
        impactContaminantReduction: 28,
        impactHealthGain: 20
      },
      {
        id: "jupiter-emission-remed",
        name: "Backup Generator Emissions Sensors",
        cost: 1500,
        description: "Deploy a localized mesh of particulate matter (PM2.5) and greenhouse gas sensors around the supercomputing campus to verify generator testing limits.",
        impactDescription: "Ensures legal compliance of auxiliary diesel generators, drops air-impact index by 20%, and increases health by 15%.",
        impactContaminantReduction: 20,
        impactHealthGain: 15
      }
    ]
  },
  {
    id: "navajo-uranium",
    region: "Navajo Nation (Four Corners Region)",
    tribe: "Navajo (Diné) Nation 🏔️",
    contaminant: "Uranium, Radium-226 & Arsenic",
    hazardLevel: 'CRITICAL',
    background: "Over 500 abandoned Cold War uranium mines dot Diné lands. Tailings piles remain exposed, allowing radioactive dust to carry radon into homes. Because 30% of Diné families lack municipal plumbing, they haul water from unregulated livestock wells contaminated with heavy metals.",
    culturalContext: "To the Diné, the earth is a living mother (Nahasdzáán). Excavating uranium ('the yellow dust that destroys') disrupted sacred subterranean elements. Re-establishing environmental harmony requires healing both the geological crust and the local tribal lineage.",
    remediationStrategy: "ICEarth integrates independent solar-powered reverse osmosis (RO) filters equipped with ledger-connected flow meters. Independent, community-driven geoscientific sensors map and fence radioactive hot spots, with all data registered to immutable tribal ledgers to bypass federal inaction.",
    initialContaminantLevel: 180, // ug/L of Uranium (EPA MCL is 30 ug/L)
    unit: "μg/L",
    currentContaminantLevel: 180,
    healthIndex: 42,
    projects: [
      {
        id: "navajo-ro",
        name: "Deploy Solar-Powered RO Filter Stations",
        cost: 2500,
        description: "Install containerized off-grid filtration units at key groundwater hauling points to remove 99% of uranium and arsenic.",
        impactDescription: "Reduces uranium concentration by 70 μg/L and boosts local health index by 25%.",
        impactContaminantReduction: 70,
        impactHealthGain: 25
      },
      {
        id: "navajo-sensor",
        name: "Establish Radon Mesh-Sensor Network",
        cost: 1500,
        description: "Equip local homes with low-cost, solar-charged radon detectors that broadcast encrypted data via localized radio mesh.",
        impactDescription: "Improves hazardous dust tracking resolution by 100% and increases health index by 10%.",
        impactContaminantReduction: 20,
        impactHealthGain: 10
      },
      {
        id: "navajo-fence",
        name: "Execute Tailings Dust Bio-Shielding",
        cost: 2000,
        description: "Fund community planting of native drought-resistant halophytes to bind uranium-rich dust on tailings dunes.",
        impactDescription: "Reduces airborne particulate uranium by 45 μg/L and increases health index by 15%.",
        impactContaminantReduction: 45,
        impactHealthGain: 15
      }
    ]
  },
  {
    id: "los-alamos-nuclear",
    region: "Pueblo Canyon Lands (New Mexico)",
    tribe: "Pueblo of San Ildefonso & Santa Clara Pueblo 🏺",
    contaminant: "Tritium, Strontium-90 & Cesium-137",
    hazardLevel: 'SEVERE',
    background: "Decades of nuclear weapons development at Los Alamos National Laboratory resulted in liquid radioactive effluent dumped directly into surrounding canyons. Runoff seeps through alluvial aquifers into the Rio Grande, contaminating agricultural water and traditional clay deposits.",
    culturalContext: "For centuries, Pueblo communities have harvested wild clays to craft world-renowned pottery, an art form that is deeply spiritual and connects them to ancestral spirits. Contaminated soils threaten both physical health and the continuity of this ancient sacred heritage.",
    remediationStrategy: "ICEarth supports a self-sovereign clay safety certificate. Pueblo artists can test soil samples at tribal laboratories and register a tamper-proof cryptographic passport, certifying their pottery as heavy-metal and radiation-free.",
    initialContaminantLevel: 850, // pCi/L of Tritium
    unit: "pCi/L",
    currentContaminantLevel: 850,
    healthIndex: 55,
    projects: [
      {
        id: "pueblo-lab",
        name: "Establish Tribal Soil Spectral Laboratories",
        cost: 3000,
        description: "Purchase high-precision gamma spectrometer units for tribal offices, allowing direct testing of soil, clay, and crops.",
        impactDescription: "Reduces undetected radioactive exposure risks and raises health index by 20%.",
        impactContaminantReduction: 300,
        impactHealthGain: 20
      },
      {
        id: "pueblo-filter",
        name: "Deploy Myco-Filtration Soil Beds",
        cost: 2000,
        description: "Sponsor community mycologists to plant localized fungal mycelium beds that bio-accumulate and stabilize strontium in canyon runoffs.",
        impactDescription: "Reduces water-borne radioactive isotopes by 250 pCi/L and increases health index by 15%.",
        impactContaminantReduction: 250,
        impactHealthGain: 15
      },
      {
        id: "pueblo-cert",
        name: "Launch Sovereign Clay Cryptographic Passports",
        cost: 1500,
        description: "Implement a decentralized ledger application where potters trace verified safe-clay batches directly to their finished pottery.",
        impactDescription: "Protects tribal economies and increases the overall regional health index by 10%.",
        impactContaminantReduction: 100,
        impactHealthGain: 10
      }
    ]
  },
  {
    id: "new-guinea-mining",
    region: "Highlands & Fly River Basin (Papua New Guinea)",
    tribe: "Fly River Basin & Highlands Clans 🌿",
    contaminant: "Mercury, Copper tailings & Acid Rock Drainage",
    hazardLevel: 'CRITICAL',
    background: "Foreign-owned open-pit copper and gold mines discharge millions of tons of untreated mining tailings directly into local river systems. This sludge blankets river beds, suffocates aquatic life, and floods vast floodplains with heavy metals like copper, mercury, and lead.",
    culturalContext: "Highlands clans hold that the rivers are the bloodlines of their tribal ancestors. The destruction of the Fly River is seen as a cosmic wound, severing their physical connection to subsistence fishing, sago palm harvesting, and clean water.",
    remediationStrategy: "ICEarth deploys rugged, off-grid river monitoring buoys equipped with satellite transceivers. Real-time pH, heavy-metal concentration, and dissolved oxygen are logged onto a public ledger, providing undeniable telemetry to prosecute polluters.",
    initialContaminantLevel: 4.8, // ppm of Copper/Mercury index
    unit: "ppm",
    currentContaminantLevel: 4.8,
    healthIndex: 34,
    projects: [
      {
        id: "guinea-buoy",
        name: "Deploy Off-Grid River Satellite Buoys",
        cost: 2500,
        description: "Install solar-powered river chemistry monitoring buoys that bypass state-censored networks to broadcast toxic spill alerts.",
        impactDescription: "Exposes heavy metal discharges, reducing overall toxin intake by 1.5 ppm and boosting health index by 22%.",
        impactContaminantReduction: 1.5,
        impactHealthGain: 22
      },
      {
        id: "guinea-law",
        name: "Fund Decentralized Sovereign Litigation Node",
        cost: 2000,
        description: "Deploy micro-grants to compile certified geological data from the ledger, supporting tribal lawsuits against mining cartels.",
        impactDescription: "Forces mining tailings mitigation, lowering long-term levels by 1.2 ppm and raising health index by 18%.",
        impactContaminantReduction: 1.2,
        impactHealthGain: 18
      },
      {
        id: "guinea-filter",
        name: "Install Gravity-Fed Active Carbon Filters",
        cost: 1500,
        description: "Distribute sand and active carbon gravity filters to Highland villages to strip heavy metals from drinking water.",
        impactDescription: "Reduces direct toxic ingestion, decreasing effective contaminant load by 0.8 ppm and boosting health by 12%.",
        impactContaminantReduction: 0.8,
        impactHealthGain: 12
      }
    ]
  },
  {
    id: "arctic-gwichin",
    region: "Yukon Basin & Arctic Village (Alaska)",
    tribe: "Gwich'in Nation (Caribou People) ❄️",
    contaminant: "Persistent Organic Pollutants (POPs) & Mercury",
    hazardLevel: 'SEVERE',
    background: "Global winds and ocean currents carry volatile chemicals (pesticides, flame retardants, heavy metals) northward, where they condense in cold temperatures. This 'grasshopper effect' concentrates toxic pollutants in caribou fat and fish, contaminating the subsistence diet.",
    culturalContext: "The Gwich'in are the 'Caribou People.' Their spiritual and physical existence revolves around the Porcupine Caribou Herd. Chemical poisoning of the herd threatens the very heart of their ancient cultural worldview and food security.",
    remediationStrategy: "ICEarth implements a cryospheric bio-monitoring oracle. Indigenous hunters utilize an encrypted mobile application to catalog herd health, geo-locate migration stresses, and coordinate clean tissue testing with tribal labs.",
    initialContaminantLevel: 12.5, // ng/g of PCB/POP burden
    unit: "ng/g",
    currentContaminantLevel: 12.5,
    healthIndex: 60,
    projects: [
      {
        id: "arctic-oracle",
        name: "Deploy Hunter-Led Bio-Indicator Mobile App",
        cost: 1500,
        description: "Develop a secure, offline-first GPS logging application to record herd conditions and coordinate biopsy testing.",
        impactDescription: "Provides granular exposure tracking, reducing effective toxic exposure risk by 3.5 ng/g and raising health by 12%.",
        impactContaminantReduction: 3.5,
        impactHealthGain: 12
      },
      {
        id: "arctic-exchange",
        name: "Sponsor Safe-Meat Community Logistics",
        cost: 2000,
        description: "Fund tribal mutual-aid supply lines to distribute non-migratory whitefish and non-polluted food parcels during high-toxin migrations.",
        impactDescription: "Directly lowers toxin ingestion levels by 4.0 ng/g and increases health index by 18%.",
        impactContaminantReduction: 4.0,
        impactHealthGain: 18
      },
      {
        id: "arctic-advocacy",
        name: "Fund Sovereign Global Climate Litigation",
        cost: 2500,
        description: "Leverage immutable Arctic geochemical databases to present Gwich'in health impact statements at UN climate tribunals.",
        impactDescription: "Pressures global chemical agreements, lowering long-term POP index by 2.0 ng/g and raising health index by 10%.",
        impactContaminantReduction: 2.0,
        impactHealthGain: 10
      }
    ]
  },
  {
    id: "broken-hill-aboriginal",
    region: "Broken Hill (New South Wales, Australia)",
    tribe: "Wiljakali & Wilyakali Aboriginal Peoples 🪶",
    contaminant: "Legacy Smelter Dust & Lead (Pb)",
    hazardLevel: 'CRITICAL',
    background: "Broken Hill is a historic silver, lead, and zinc mining city with over a century of smelting operations. Extremely toxic heavy metal dust coats the soil. Data from 2025/2026 revealed a severe crisis: 56% of Aboriginal children aged 1-5 have blood lead levels (BLL) exceeding the national health guidelines of 5 μg/dL, compared to 35% of non-Aboriginal children.",
    culturalContext: "Aboriginal Australians hold a deep, sacred, multi-millennial connection to their ancestral Country. Toxic industrial mining operations and persistent lead dust actively degrade the minds and health of their young, posing a severe threat to the continuous transmission of culture, dreaming tracks, and indigenous sovereignty.",
    remediationStrategy: "ICEarth supports a $37 Million NSW Government commitment to double home remediations and expand childhood surveillance. We deploy community-led lead-trapping HEPA systems and local soil bio-remediation protocols, with all testing registered cryptographically to our decentralized sovereign database.",
    initialContaminantLevel: 56,
    unit: "% Exceeding",
    currentContaminantLevel: 56,
    healthIndex: 35,
    projects: [
      {
        id: "broken-hill-remed",
        name: "NSW Home Remediation Blitz ($37M Grant)",
        cost: 37000,
        description: "Deploy the committed $37 Million funding to double the speed of home remediations, clearing dust from yards and sealing contaminated paint.",
        impactDescription: "Directly cuts BLL exceedance rates by 25% and boosts local health index by 30%.",
        impactContaminantReduction: 25,
        impactHealthGain: 30
      },
      {
        id: "broken-hill-testing",
        name: "Expand Aboriginal Child Lead Screening",
        cost: 15000,
        description: "Provide clinical, community-based blood-lead testing kits specifically tailored for Wiljakali children to catch exposure early.",
        impactDescription: "Expands test resolution, cuts undetected exposure by 20%, and increases health by 15%.",
        impactContaminantReduction: 20,
        impactHealthGain: 15
      },
      {
        id: "broken-hill-soil",
        name: "Decentralized Lead-Dust Soil Caps",
        cost: 12000,
        description: "Utilize localized soil capping, bio-cementation, and native saltbush planting to bind legacy dust in children's play corridors.",
        impactDescription: "Reduces dust ingestion risks, cutting contaminant levels by 15% and boosting health by 20%.",
        impactContaminantReduction: 15,
        impactHealthGain: 20
      }
    ]
  }
];

export const IndigenousSovereigntyTab: React.FC = () => {
  // Raptor State
  const [patients, setPatients] = useState<RaptorPatient[]>(INITIAL_PATIENTS);
  const [selectedPatient, setSelectedPatient] = useState<RaptorPatient>(patients[0]);
  const [raptorLog, setRaptorLog] = useState<string[]>([
    "Tribal facility online in Levering, MI.", 
    "X-ray laboratory calibrated for ingested lead fragments."
  ]);

  // Regional Crises State
  const [crises, setCrises] = useState<CrisisPathway[]>(INITIAL_CRISES);
  const [selectedCrisis, setSelectedCrisis] = useState<CrisisPathway>(crises[0]);
  const [iceCredits, setIceCredits] = useState<number>(10000); // User starts with 10,000 ICE credits
  const [fundedProjects, setFundedProjects] = useState<string[]>([]);
  const [remediationLog, setRemediationLog] = useState<string[]>([
    "ICEarth sovereign node cluster initialized.",
    "Bypassing federal channels to establish direct-to-tribe cryptographic grants.",
    "Ready to allocate ICE credits for geoscientific soil & water stabilization."
  ]);

  // Project Jupiter Interactive State
  const [comments, setComments] = useState<Array<{
    id: string;
    author: string;
    role: string;
    text: string;
    verified: boolean;
    timestamp: string;
    signature?: string;
  }>>([
    {
      id: "comment-1",
      author: "Governor Stuart Paisano",
      role: "Governor, Pueblo of Sandía",
      text: "Our tribal water allocations from the Middle Rio Grande aquifer are non-negotiable. Project Jupiter's proposed 4.2 million gallons per day will dry up agricultural wells. We demand independent sensor validation.",
      verified: true,
      timestamp: "2026-07-07 14:22:01",
      signature: "sig_sandia_9918afce11b0e32230da3f"
    },
    {
      id: "comment-2",
      author: "Commissioner Michael Montoya",
      role: "Bernalillo County Dist. 2",
      text: "The county must prioritize local families over multinational hyper-scalers. Project Jupiter must implement 100% closed-loop dry cooling instead of evaporating our precious drinking water.",
      verified: true,
      timestamp: "2026-07-07 16:45:10",
      signature: "sig_bernalillo_018fa8cf2204"
    },
    {
      id: "comment-fake-1",
      author: "Governor Stuart Paisano (Impersonated)",
      role: "Governor, Pueblo of Sandía",
      text: "The Pueblo of Sandía completely endorses the construction of Project Jupiter without any additional regulatory water conditions. We believe the tech industry brings endless positive economic progress.",
      verified: false,
      timestamp: "2026-07-06 11:15:22"
    },
    {
      id: "comment-fake-2",
      author: "Secretary James Kenney (Impersonated)",
      role: "Cabinet Secretary, NMED",
      text: "The New Mexico Environment Department has fast-tracked and approved all cooling water groundwater permits for the Jupiter site. No further public hearings are required.",
      verified: false,
      timestamp: "2026-07-06 09:30:15"
    }
  ]);

  const [newCommentAuthor, setNewCommentAuthor] = useState<string>('');
  const [newCommentRole, setNewCommentRole] = useState<'Sandia Governor' | 'Isleta Elder' | 'NMED Official' | 'Public Citizen'>('Sandia Governor');
  const [newCommentText, setNewCommentText] = useState<string>('');
  const [isSubmittingComment, setIsSubmittingComment] = useState<boolean>(false);
  const [verificationStep, setVerificationStep] = useState<string>('');
  
  // Regulatory simulator state
  const [pumpRateGPM, setPumpRateGPM] = useState<number>(1800); // Gallons per minute
  const [dieselGenTestingHours, setDieselGenTestingHours] = useState<number>(4); // hours/week
  const [regulatoryOffsetCredits, setRegulatoryOffsetCredits] = useState<number>(1240); // credits generated
  const [corporateEscrowBalance, setCorporateEscrowBalance] = useState<number>(150000); // corporate escrow fund in $

  // Trans-regional state for Ohio vs New Mexico AI impacts
  const [ohioGasPlants, setOhioGasPlants] = useState<number>(10);
  const [selectedStandardTab, setSelectedStandardTab] = useState<'transparency' | 'dueprocess' | 'standards' | 'leadorigins'>('transparency');
  const [ohioCalculatedCO2, setOhioCalculatedCO2] = useState<number>(75); // 75 million tons of greenhouse gases/year

  // Downwinder Claimants Case Study State
  interface DownwinderClaimant {
    id: string;
    name: string;
    location: string;
    ancestry: string;
    diseases: string[];
    docStatus: 'missing_docs' | 'ready_for_audit' | 'audited_and_signed' | 'payout_disbursed';
    uploadedDocs: string[];
    claimId: string;
  }

  const INITIAL_CLAIMANTS: DownwinderClaimant[] = [
    {
      id: "dw-01",
      name: "Aurelia Gutierrez",
      location: "Tularosa Basin (Downwind of Trinity)",
      ancestry: "Mescalero Apache & Hispanic Heritage",
      diseases: ["Thyroid Cancer", "Autoimmune Thyroiditis"],
      docStatus: 'missing_docs',
      uploadedDocs: ["Certified Birth Certificate (1943)"],
      claimId: "CLAIM-NM-1945-802"
    },
    {
      id: "dw-02",
      name: "Elder Joseph Pino",
      location: "Socorro County (Downwind Area)",
      ancestry: "Pueblo of Isleta Ancestry",
      diseases: ["Leukemia", "Chronic Nephritis"],
      docStatus: 'ready_for_audit',
      uploadedDocs: ["Ancestral Census Record (1945)", "NMED Radiation Exposure Affidavit", "Medical Oncology Reports"],
      claimId: "CLAIM-NM-1945-311"
    },
    {
      id: "dw-03",
      name: "Sylvia Trujillo",
      location: "Carrizozo, NM",
      ancestry: "Sovereign Community Member",
      diseases: ["Multiple Myeloma"],
      docStatus: 'audited_and_signed',
      uploadedDocs: ["Baptismal Record (July 1945)", "Sovereign Identity Passport (DID)", "Radiological Tissue Assay"],
      claimId: "CLAIM-NM-1945-094"
    },
    {
      id: "dw-04",
      name: "Mateo Begay",
      location: "Socorro / Tularosa Border",
      ancestry: "Diné / Navajo Affiliation",
      diseases: ["Pulmonary Fibrosis", "Bone Sarcoma"],
      docStatus: 'payout_disbursed',
      uploadedDocs: ["Residence Deed (1945)", "Sovereign Identity Passport (DID)", "Medical Diagnostic Certifications"],
      claimId: "CLAIM-NM-1945-121"
    }
  ];

  const [claimants, setClaimants] = useState<DownwinderClaimant[]>(INITIAL_CLAIMANTS);
  const [selectedClaimant, setSelectedClaimant] = useState<DownwinderClaimant>(INITIAL_CLAIMANTS[1]);
  const [downwinderAuditLog, setDownwinderAuditLog] = useState<string[]>([
    "Sovereign Downwinder Compensation Registry initialized.",
    "Federal RECA (Radiation Exposure Compensation Act) compliance checks loaded.",
    "Decentralized DID Verification server active.",
    "Mateo Begay claim payout of $100,000 verified and securely disbursed."
  ]);
  const [isAuditingClaim, setIsAuditingClaim] = useState<boolean>(false);
  const [auditStepMessage, setAuditStepMessage] = useState<string>('');

  const handleUploadDocument = (claimantId: string) => {
    setClaimants(prev => prev.map(c => {
      if (c.id === claimantId) {
        const updatedDocs = [...c.uploadedDocs, "Sovereign Proof of Residence Affidavit (July 1945)"];
        const updated: DownwinderClaimant = {
          ...c,
          uploadedDocs: updatedDocs,
          docStatus: 'ready_for_audit'
        };
        if (selectedClaimant.id === claimantId) {
          setSelectedClaimant(updated);
        }
        return updated;
      }
      return c;
    }));
    setDownwinderAuditLog(prev => [
      `[${new Date().toLocaleTimeString()}] Document uploaded for claimant: "Sovereign Proof of Residence Affidavit (July 1945)"`,
      ...prev
    ]);
  };

  const handleAuditClaim = (claimantId: string) => {
    setIsAuditingClaim(true);
    setAuditStepMessage("Retrieving federal RECA databases & checking overlaps...");
    
    const steps = [
      "Accessing encrypted ICEarth Decentralized ID ledger...",
      "Generating zero-knowledge proof of geographic residency during July 1945 test window...",
      "Matching atomic decay disease profile against RECA diagnostic standard guidelines...",
      "Executing multisig signing with state advocates and tribal authorities...",
      "Claim packet audited successfully! Cryptographic passport signed."
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setAuditStepMessage(steps[currentStep]);
        currentStep++;
      } else {
        clearInterval(interval);
        setIsAuditingClaim(false);
        setClaimants(prev => prev.map(c => {
          if (c.id === claimantId) {
            const updated: DownwinderClaimant = {
              ...c,
              docStatus: 'audited_and_signed'
            };
            if (selectedClaimant.id === claimantId) {
              setSelectedClaimant(updated);
            }
            return updated;
          }
          return c;
        }));
        setDownwinderAuditLog(prev => [
          `[${new Date().toLocaleTimeString()}] COMPLETED: Sovereign Cryptographic Audit for Claimant ${claimantId}. Status: Signed.`,
          ...prev
        ]);
      }
    }, 800);
  };

  const handleDisburseClaim = (claimantId: string) => {
    setClaimants(prev => prev.map(c => {
      if (c.id === claimantId) {
        const updated: DownwinderClaimant = {
          ...c,
          docStatus: 'payout_disbursed'
        };
        if (selectedClaimant.id === claimantId) {
          setSelectedClaimant(updated);
        }
        return updated;
      }
      return c;
    }));
    setDownwinderAuditLog(prev => [
      `[${new Date().toLocaleTimeString()}] DISBURSED: Federal reparation payment of $100,000 sent to Claimant ID ${claimantId}.`,
      ...prev
    ]);
  };

  const handleResetClaimants = () => {
    setClaimants(INITIAL_CLAIMANTS);
    setSelectedClaimant(INITIAL_CLAIMANTS[1]);
    setDownwinderAuditLog([
      "Sovereign Downwinder Compensation Registry reset.",
      "Federal RECA (Radiation Exposure Compensation Act) compliance checks loaded.",
      "Decentralized DID Verification server active.",
      "Mateo Begay claim payout of $100,000 verified and securely disbursed."
    ]);
  };



  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentAuthor.trim() || !newCommentText.trim()) return;

    setIsSubmittingComment(true);
    setVerificationStep('Initializing Secure Enclave...');

    const steps = [
      'Generating Decentralized Identifier (DID:icearth:nm-pueblo)...',
      'Validating Tribal Enrollment / State Credentials via cryptographic token...',
      'Signing comment body with verified private key...',
      'Publishing and broadcasting to ICEarth Sovereign Nodes...',
      'Success! Comment anchored to immutable ledger block.'
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setVerificationStep(steps[currentStep]);
        currentStep++;
      } else {
        clearInterval(interval);
        
        // Add comment
        const signature = `sig_${newCommentRole.toLowerCase().replace(' ', '_')}_${Math.random().toString(16).substring(2, 12)}`;
        const commentId = `comment-${Date.now()}`;
        const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);

        const createdComment = {
          id: commentId,
          author: newCommentAuthor,
          role: newCommentRole === 'Sandia Governor' ? 'Governor, Pueblo of Sandía' :
                newCommentRole === 'Isleta Elder' ? 'Council Elder, Pueblo of Isleta' :
                newCommentRole === 'NMED Official' ? 'Director of Water Quality, NMED' : 'Verified NM Resident',
          text: newCommentText,
          verified: true,
          timestamp,
          signature
        };

        setComments(prev => [createdComment, ...prev]);
        setNewCommentAuthor('');
        setNewCommentText('');
        setIsSubmittingComment(false);
        setVerificationStep('');

        // Log transaction to the ledger log
        setRemediationLog(prev => [
          `VERIFIED COMMENT REGISTERED: "${createdComment.author}" (${createdComment.role}) posted on Project Jupiter. Signed: ${signature.substring(0,12)}...`,
          ...prev
        ]);
      }
    }, 600);
  };

  // Dynamic aquifer level projections based on cooling rate GPM
  const getAquiferProjectionData = () => {
    const data = [];
    const baseDepletionRate = pumpRateGPM * 0.005; // depletion multiplier
    let level = 100;
    for (let month = 0; month <= 24; month += 2) {
      data.push({
        month: `${month}M`,
        "Aquifer Capacity (%)": Math.max(10, Math.round((level) * 10) / 10),
        "Safe Drawdown Threshold": 75
      });
      level = level - baseDepletionRate;
    }
    return data;
  };

  // Simulate Chelation Therapy Step for Sacred Messenger
  const handleAdministerChelation = (id: string) => {
    setPatients(prev => prev.map(p => {
      if (p.id === id) {
        if (p.status === 'Released 🎉') return p;
        
        const nextBll = Math.max(2, p.currentBll - 15);
        let nextStatus = p.status;
        
        if (nextBll <= 5) {
          nextStatus = 'Released 🎉';
        } else if (nextBll <= 20) {
          nextStatus = 'Flight Therapy';
        } else if (nextBll <= 55) {
          nextStatus = 'Chelation';
        }

        const logMsg = `Administered calcium EDTA/fluids to ${p.name}. Blood Lead Level decreased from ${p.currentBll} μg/dL to ${nextBll} μg/dL. Status: ${nextStatus}`;
        setRaptorLog(prevLog => [logMsg, ...prevLog]);

        const updated = {
          ...p,
          currentBll: nextBll,
          treatmentDays: p.treatmentDays + 2,
          status: nextStatus
        };
        
        if (selectedPatient.id === id) {
          setSelectedPatient(updated);
        }
        return updated;
      }
      return p;
    }));
  };

  // Reset Raptor Simulation
  const handleResetPatients = () => {
    setPatients(INITIAL_PATIENTS);
    setSelectedPatient(INITIAL_PATIENTS[0]);
    setRaptorLog(["Simulation rebooted. Active eagle patients admitted.", "X-ray laboratory ready."]);
  };

  // Fund a regional remediation project
  const handleFundProject = (project: CrisisProject, crisisId: string) => {
    if (iceCredits < project.cost) {
      setRemediationLog(prev => [`⚠️ ERROR: Insufficient ICE Credits. Need ${project.cost} credits, you have ${iceCredits}.`, ...prev]);
      return;
    }

    if (fundedProjects.includes(project.id)) {
      setRemediationLog(prev => [`⚠️ Warning: Project "${project.name}" has already been fully funded.`, ...prev]);
      return;
    }

    // Deduct credits and add to funded list
    setIceCredits(prev => prev - project.cost);
    setFundedProjects(prev => [...prev, project.id]);

    // Apply the remediation impact to the selected crisis
    setCrises(prevCrises => prevCrises.map(c => {
      if (c.id === crisisId) {
        const nextContaminant = Math.max(0, Math.round((c.currentContaminantLevel - project.impactContaminantReduction) * 10) / 10);
        const nextHealth = Math.min(100, c.healthIndex + project.impactHealthGain);
        
        const updated = {
          ...c,
          currentContaminantLevel: nextContaminant,
          healthIndex: nextHealth
        };

        if (selectedCrisis.id === crisisId) {
          setSelectedCrisis(updated);
        }
        return updated;
      }
      return c;
    }));

    // Add smart-contract logging
    const txHash = `0x${Array.from({length: 40}, () => Math.floor(Math.random()*16).toString(16)).join('')}`;
    const logMsg = `SUCCESS: [Smart Contract Executed] - Sponsoring: "${project.name}" on ${selectedCrisis.tribe} lands. Paid ${project.cost} ICE credits. Tx Hash: ${txHash.substring(0,10)}...${txHash.substring(34)}. Toxin level dropped by -${project.impactContaminantReduction} ${selectedCrisis.unit}. health rating improved to ${Math.min(100, selectedCrisis.healthIndex + project.impactHealthGain)}%.`;
    
    setRemediationLog(prev => [logMsg, ...prev]);
  };

  // Reset all regional remediation states
  const handleResetRemediation = () => {
    setCrises(INITIAL_CRISES);
    setSelectedCrisis(INITIAL_CRISES[0]);
    setIceCredits(10000);
    setFundedProjects([]);
    setRemediationLog([
      "ICEarth regional remediation database reset.",
      "ICE credits refilled to 10,000.",
      "Tribal environmental targets restored to baseline levels."
    ]);
  };

  // Generate dynamic chart data based on current selection's treatment progression
  const getTreatmentCurve = () => {
    const data = [];
    let tempBll = selectedPatient.initialBll;
    for (let day = 0; day <= 24; day += 3) {
      data.push({
        day: `Day ${day}`,
        "Blood Lead (μg/dL)": Math.max(2, Math.round(tempBll)),
        "Toxicity Threshold": 20
      });
      tempBll = tempBll * 0.72; // simulated decay curve per chelation cycle
    }
    return data;
  };

  // Generate bar chart data comparing initial vs current contaminants
  const getContaminantComparisonData = () => {
    return crises.map(c => ({
      name: c.id === 'project-jupiter-datacenter' ? 'Pueblo/Jupiter' : c.id === 'navajo-uranium' ? 'Diné' : c.id === 'los-alamos-nuclear' ? 'Pueblo' : c.id === 'new-guinea-mining' ? 'PNG Highlands' : 'Gwich\'in',
      "Baseline": c.initialContaminantLevel,
      "Current": c.currentContaminantLevel,
      unit: c.unit
    }));
  };

  return (
    <div id="indigenous-sovereignty-container" className="space-y-8 animate-fade-in font-sans">
      
      {/* BRANDING HEADER HERO */}
      <div className="bg-gradient-to-r from-[#172554] via-[#0f172a] to-[#1e1b4b] text-white p-8 rounded-2xl border border-blue-900/40 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute left-1/4 bottom-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="space-y-4 max-w-4xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400 text-neutral-950 font-mono text-[10px] uppercase tracking-widest font-extrabold rounded-full shadow-sm">
            <Feather size={12} className="text-neutral-950" />
            <span>Sovereign Tribal Geochemical Baseline & Ecosystem Stewardship</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-light tracking-tight text-white flex items-center gap-2.5">
            <span>Indigenous Communities Earth</span>
            <span className="text-blue-400 font-mono text-sm tracking-normal">(ICEarth)</span>
          </h2>
          <p className="text-xs md:text-sm text-neutral-300 leading-relaxed max-w-4xl">
            Having visited over 50 countries and remote indigenous regions—as isolated as the Highlands of New Guinea—the architecture of ICEarth was built to serve those who have protected the Earth's physical baseline for generations. Because indigenous peoples are least lead poisoned, yet most environmentally conscious, they hold the blueprint for ecological balance. ICEarth anchors **"Water Is Life" (Mni Wiconi)** directly onto decentralised blockchain technology to secure sovereign data, remediate heavy metals and radiation, and restore tribal habitats.
          </p>
        </div>
      </div>

      {/* FEATURED TESTIMONIAL & CASE STUDY: INDIGENOUS LANGUAGE ROBOTS & AI SOVEREIGNTY */}
      <div className="bg-gradient-to-br from-amber-950 via-neutral-900 to-stone-950 text-white p-6 md:p-8 rounded-2xl border border-amber-800/40 shadow-xl space-y-6 relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-900/50 pb-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-600/40 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest">
              <Sparkles size={12} className="text-amber-400" />
              <span>Owners' Manual Testimonial & Case Study • Part III</span>
            </div>
            <h3 className="text-xl md:text-2xl font-serif font-bold text-amber-100 flex items-center gap-2">
              <span>Meet the robots programmed by kids to speak their Indigenous languages</span>
            </h3>
            <p className="text-xs text-amber-200/80 font-mono">
              Why Sovereignty Matters: SkoBots, Generative AI Exploitation, and the Adoption of Indigenous Information Technologies
            </p>
          </div>
          <a
            href="?tab=manuscript&chapter=case-study-indigenous-sovereignty-ai"
            className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-all shrink-0 cursor-pointer"
          >
            <BookOpen size={14} />
            <span>Read Full Chapter in Manual</span>
          </a>
        </div>

        {/* THREE DIRECT QUOTE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-black/40 border border-amber-900/50 rounded-xl space-y-3 relative flex flex-col justify-between">
            <div className="space-y-2">
              <div className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                <Terminal size={12} />
                <span>Trigger-Word Audio Engine</span>
              </div>
              <blockquote className="text-xs text-amber-100/90 italic leading-relaxed">
                "Basically when it hears that one trigger word, it then plays a prerecorded audio file. So there isn't synthetic speech, there isn't any generative AI... It's simply listening to what you're saying, identifying it and playing [audio files] that already exist."
              </blockquote>
            </div>
            <div className="text-[10px] font-mono text-amber-300 font-bold border-t border-amber-900/30 pt-2">
              — Boyer (SkoBots Developer & Educator)
            </div>
          </div>

          <div className="p-4 bg-black/40 border border-amber-900/50 rounded-xl space-y-3 relative flex flex-col justify-between">
            <div className="space-y-2">
              <div className="text-[10px] font-mono font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1">
                <ShieldAlert size={12} />
                <span>Zero AI Hallucinations</span>
              </div>
              <blockquote className="text-xs text-rose-100/90 italic leading-relaxed">
                "That means the SkoBots will never make things up, often called AI hallucinations... AI tends to falsify things a lot, not get things from trustworthy sources."
              </blockquote>
            </div>
            <div className="text-[10px] font-mono text-rose-300 font-bold border-t border-rose-900/30 pt-2">
              — Hoy (Indigenous AI Advocate)
            </div>
          </div>

          <div className="p-4 bg-black/40 border border-amber-900/50 rounded-xl space-y-3 relative flex flex-col justify-between">
            <div className="space-y-2">
              <div className="text-[10px] font-mono font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
                <Lock size={12} />
                <span>Sacred Data Protection</span>
              </div>
              <blockquote className="text-xs text-amber-100/90 italic leading-relaxed">
                "Artificial intelligence, especially when it's not created by Indigenous people, stands to do a lot of harm to our communities... When you are putting accurate information into these models … you're giving away sacred information to companies that don't have our best interests at heart."
              </blockquote>
            </div>
            <div className="text-[10px] font-mono text-amber-300 font-bold border-t border-amber-900/30 pt-2">
              — Hoy (Indigenous Language Sovereignty)
            </div>
          </div>
        </div>

        {/* SOLUTION SUMMARY ROW */}
        <div className="p-4 bg-amber-950/60 border border-amber-700/50 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed text-amber-100 font-sans">
          <div className="space-y-1.5">
            <h4 className="font-bold text-amber-300 font-serif text-sm flex items-center gap-1.5">
              <ShieldAlert size={14} className="text-amber-400" />
              The Threats: Commercial AI Exploitation
            </h4>
            <p className="text-[11px] text-amber-200/80">
              Commercial generative AI platforms hallucinate false cultural narratives, distort endangered dialects, and extract sacred songs and traditional ecological knowledge (TEK) into private corporate training sets without consent or tribal governance.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-bold text-amber-300 font-serif text-sm flex items-center gap-1.5">
              <CheckCircle size={14} className="text-emerald-400" />
              The ICEarth Solution: Indigenous Information Technologies
            </h4>
            <p className="text-[11px] text-amber-200/80">
              ICEarth adopts deterministic, zero-hallucination technologies. By pairing local trigger-word audio with Zero-Knowledge Proof (ZKP) encrypted vaults and localized air-gapped Sovereign AI Nodes (Chapter 12), Indigenous nations retain 100% data ownership.
            </p>
          </div>
        </div>
      </div>

      {/* CORE PHILOSOPHICAL TENETS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        <div className="bg-white p-6 border border-gray-100 rounded-xl shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-wider">The Sacred Tenet</div>
            <Waves size={16} className="text-blue-500" />
          </div>
          <h4 className="text-base font-bold text-neutral-900 font-serif">Water Is Life (Mni Wiconi)</h4>
          <p className="text-[11px] text-gray-500 leading-relaxed">
            Sovereignty over the geochemical baseline begins at the water molecule. ICEarth honors this by placing immutable water-quality, PFAS, and heavy-metal tests onto decentralized ledgers, independent of state and federal interference.
          </p>
        </div>

        <div className="bg-white p-6 border border-gray-100 rounded-xl shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-[10px] font-mono font-bold text-amber-700 uppercase tracking-wider">Global Footprint</div>
            <Compass size={16} className="text-amber-500" />
          </div>
          <h4 className="text-base font-bold text-neutral-900 font-serif">Highlands of New Guinea</h4>
          <p className="text-[11px] text-gray-500 leading-relaxed">
            Designed for remote autonomy. The systems-architecture of ICEarth functions securely in off-grid environments using localized cryptographic meshes, inspired by the resilient, self-governing tribal clans of Papua New Guinea.
          </p>
        </div>

        <div className="bg-white p-6 border border-gray-100 rounded-xl shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-[10px] font-mono font-bold text-red-700 uppercase tracking-wider">Localized Exposure</div>
            <Map size={16} className="text-red-500" />
          </div>
          <h4 className="text-base font-bold text-neutral-900 font-serif">Jicarilla & Navajo Lands</h4>
          <p className="text-[11px] text-gray-500 leading-relaxed">
            Addressing unique exposure vectors. In the Four Corners, uranium tailings dust and subsistence hunting with lead ammunition poison ecosystems. ICEarth targets these non-municipal pathways ignored by federal agencies.
          </p>
        </div>

        <div className="bg-white p-6 border border-emerald-100 bg-emerald-50/5 rounded-xl shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-[10px] font-mono font-bold text-emerald-800 uppercase tracking-wider">Biological Baseline</div>
            <ShieldCheck size={16} className="text-emerald-500" />
          </div>
          <h4 className="text-base font-bold text-neutral-900 font-serif">The Pristine Genome</h4>
          <p className="text-[11px] text-gray-500 leading-relaxed">
            Indigenous populations represent the least poisoned human genome cohorts. Preserving this biological baseline is the ultimate multi-trillion-dollar objective, establishing un-compromised control groups for exposenomics.
          </p>
        </div>

      </div>

      {/* SECTION 1: SOVEREIGN ECO-REMEDIATION LEDGER & INTERACTIVE ACTION SYSTEM */}
      <div className="bg-white p-8 border border-gray-200/80 rounded-2xl space-y-6 shadow-xs">
        
        <div className="border-b pb-4 border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-blue-50 text-blue-900 font-mono text-[10px] uppercase tracking-wider font-extrabold rounded-md border border-blue-100">
              <Database size={12} className="text-blue-700 animate-pulse" />
              <span>ICEarth Ledger Action Engine</span>
            </div>
            <h3 className="text-2xl font-serif text-neutral-900">
              Sovereign Eco-Remediation Ledger
            </h3>
            <p className="text-xs text-gray-500 max-w-2xl">
              Remediate toxic heavy metal, radioactive waste, and organic pollution pathways. Fund independent, tribal-managed stabilization and monitoring programs directly.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-neutral-50 px-4 py-3 rounded-xl border border-neutral-200 shrink-0">
            <div>
              <span className="text-[9px] font-mono uppercase text-gray-400 font-bold block">Available Escrow Pool</span>
              <span className="text-base font-mono font-extrabold text-blue-900 flex items-center gap-1">
                <Coins size={16} className="text-amber-500 animate-bounce" />
                {iceCredits.toLocaleString()} ICE Credits
              </span>
            </div>
            <button
              onClick={handleResetRemediation}
              className="text-[9px] font-mono bg-neutral-200 hover:bg-neutral-300 text-neutral-700 px-2 py-1.5 rounded-md font-bold cursor-pointer uppercase tracking-wider transition-colors"
            >
              Reset Simulation
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* PATHWAYS NAVIGATION LIST (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] font-mono uppercase text-gray-400 font-bold block tracking-wider">
              Select Endangered Region & Contaminant Pathway
            </span>
            
            <div className="space-y-3">
              {crises.map((c) => {
                const isSelected = selectedCrisis.id === c.id;
                const isCritical = c.hazardLevel === 'CRITICAL';
                
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCrisis(c)}
                    className={`w-full p-4 rounded-xl border text-left cursor-pointer transition-all flex flex-col gap-2 relative overflow-hidden ${
                      isSelected
                        ? 'bg-[#121829] text-white border-blue-950 shadow-md'
                        : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-800 border-gray-200/70'
                    }`}
                  >
                    {/* Background faint highlight for critical */}
                    {isCritical && isSelected && (
                      <div className="absolute right-0 top-0 bottom-0 w-1 bg-red-500"></div>
                    )}

                    <div className="flex items-center justify-between w-full">
                      <span className={`text-[9px] px-2 py-0.5 rounded-md font-mono font-bold uppercase border ${
                        isCritical
                          ? 'bg-red-500/10 text-red-500 border-red-500/20'
                          : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                      }`}>
                        {c.hazardLevel} HAZARD
                      </span>
                      <span className="text-xs font-mono font-semibold text-gray-400">
                        {c.currentContaminantLevel} {c.unit}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold font-serif opacity-90">{c.region}</h4>
                      <h3 className="text-sm font-bold tracking-tight mt-0.5">{c.tribe}</h3>
                    </div>

                    <div className="text-[11px] font-sans opacity-75 line-clamp-1 border-t border-dashed border-gray-400/25 pt-2 flex items-center justify-between">
                      <span className="truncate"><strong>Toxin:</strong> {c.contaminant}</span>
                      <span className="shrink-0 font-bold ml-2">Health: {c.healthIndex}%</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* BAR CHART COMPARING LEVEL REDUCTION */}
            <div className="bg-neutral-50 p-4 rounded-xl border border-gray-200/60 h-[200px]">
              <span className="text-[9px] font-mono uppercase text-gray-400 font-bold block mb-1">
                Remediation Performance Metric (Baseline vs Current Level)
              </span>
              <ResponsiveContainer width="100%" height="90%">
                <BarChart data={getContaminantComparisonData()} margin={{ top: 10, right: 10, left: -25, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EBEBEB" />
                  <XAxis dataKey="name" stroke="#888" fontSize={9} tickLine={false} />
                  <YAxis stroke="#888" fontSize={9} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="Baseline" fill="#9ca3af" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Current" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

          </div>

          {/* ACTIVE PATHWAY DETAILS & WORK PACKAGE SIMULATOR (7 Cols) */}
          <div className="lg:col-span-7 bg-[#FAF9F6] p-6 rounded-2xl border border-amber-100/60 space-y-6 relative overflow-hidden">
            <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-amber-500/5 rounded-full blur-2xl pointer-events-none"></div>

            {/* Region Title */}
            <div className="border-b pb-4 border-amber-200/40 space-y-1">
              <span className="text-[9px] font-mono font-bold text-amber-800 uppercase tracking-widest">Selected Sovereign Territory</span>
              <h3 className="text-xl font-serif text-neutral-900 font-bold">{selectedCrisis.tribe}</h3>
              <p className="text-xs text-gray-500 font-mono flex items-center gap-1.5">
                <Map size={12} className="text-gray-400" />
                {selectedCrisis.region}
              </p>
            </div>

            {/* Cultural Context & Physical Hazard description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl border border-amber-100/65 shadow-xs space-y-2">
                <h5 className="text-[10px] font-mono font-bold text-red-800 uppercase tracking-wider flex items-center gap-1">
                  <ShieldAlert size={12} className="text-red-500" />
                  <span>Geochemical Exposure Pathway</span>
                </h5>
                <p className="text-xs text-neutral-800 leading-relaxed font-sans">
                  {selectedCrisis.background}
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-amber-100/65 shadow-xs space-y-2">
                <h5 className="text-[10px] font-mono font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1">
                  <Feather size={12} className="text-emerald-500" />
                  <span>Ancestral / Cultural Context</span>
                </h5>
                <p className="text-xs text-neutral-800 leading-relaxed font-serif italic">
                  {selectedCrisis.culturalContext}
                </p>
              </div>
            </div>

            {/* Strategy Statement */}
            <div className="bg-blue-950 text-neutral-100 p-4 rounded-xl border border-blue-900 shadow-sm space-y-2">
              <h5 className="text-[9px] font-mono font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles size={11} className="text-cyan-300" />
                <span>ICEarth Sovereign Tech Intervention</span>
              </h5>
              <p className="text-xs text-neutral-200 leading-relaxed font-sans">
                {selectedCrisis.remediationStrategy}
              </p>
            </div>

            {/* TARGET MONITORING METRIC BOXES */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white p-3 border border-gray-200/80 rounded-xl shadow-xs">
                <span className="text-[9px] font-mono text-gray-400 uppercase font-bold block">Contaminant Load</span>
                <span className="text-sm font-mono font-bold text-red-600 block mt-1">{selectedCrisis.contaminant.split(',')[0]}</span>
                <span className="text-lg font-mono font-extrabold text-neutral-900 block mt-1">
                  {selectedCrisis.currentContaminantLevel} {selectedCrisis.unit}
                </span>
                <span className="text-[9px] font-mono text-gray-400 block mt-0.5">
                  Initial: {selectedCrisis.initialContaminantLevel}
                </span>
              </div>

              <div className="bg-white p-3 border border-gray-200/80 rounded-xl shadow-xs">
                <span className="text-[9px] font-mono text-gray-400 uppercase font-bold block">Tribal Health Index</span>
                <span className="text-sm font-mono font-bold text-emerald-600 block mt-1">Stabilization Rating</span>
                <span className="text-lg font-mono font-extrabold text-emerald-700 block mt-1">
                  {selectedCrisis.healthIndex}%
                </span>
                <div className="w-full bg-gray-100 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-emerald-600 h-full transition-all" style={{ width: `${selectedCrisis.healthIndex}%` }}></div>
                </div>
              </div>

              <div className="bg-white p-3 border border-gray-200/80 rounded-xl shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-mono text-gray-400 uppercase font-bold block">Ledger Integrity</span>
                  <span className="text-xs font-mono text-blue-600 font-semibold block mt-1">Crypto Node Seal</span>
                </div>
                <span className="text-xs font-mono font-bold text-neutral-950 block mt-1 uppercase tracking-tight flex items-center justify-center gap-1 bg-neutral-100 py-1 rounded">
                  <Lock size={11} className="text-blue-500" />
                  <span>SECURE WALLET</span>
                </span>
              </div>
            </div>

            {/* INTERACTIVE WORK PACKAGE SUB-REMEDIATIONS */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-mono uppercase text-gray-400 font-bold block tracking-wider">
                Direct Ledger Grant Funding Options
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {selectedCrisis.projects.map((p) => {
                  const isFunded = fundedProjects.includes(p.id);
                  return (
                    <div 
                      key={p.id} 
                      className={`p-4 rounded-xl border flex flex-col justify-between gap-3 bg-white transition-all ${
                        isFunded 
                          ? 'border-emerald-300 bg-emerald-50/15' 
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between">
                          <h5 className="text-[11px] font-extrabold text-neutral-950 font-sans leading-snug">{p.name}</h5>
                          {isFunded && (
                            <CheckCircle size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                          )}
                        </div>
                        <p className="text-[10px] text-gray-500 mt-1 leading-snug">
                          {p.description}
                        </p>
                        <p className="text-[9px] text-blue-600 font-mono mt-2 italic font-semibold leading-normal">
                          {p.impactDescription}
                        </p>
                      </div>

                      <div className="border-t border-gray-100 pt-2 flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-amber-700">
                          {p.cost} ICE
                        </span>
                        <button
                          onClick={() => handleFundProject(p, selectedCrisis.id)}
                          disabled={isFunded || iceCredits < p.cost}
                          className={`px-2.5 py-1 rounded text-[9px] font-mono font-bold uppercase transition-all cursor-pointer ${
                            isFunded
                              ? 'bg-emerald-100 text-emerald-800 cursor-default'
                              : iceCredits < p.cost
                              ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
                              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                          }`}
                        >
                          {isFunded ? "Funded" : "Execute"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* TRANSACTION LOG */}
            <div className="space-y-2 border-t border-dashed border-amber-200/40 pt-4">
              <span className="text-[10px] font-mono uppercase text-gray-400 font-bold block flex items-center gap-1">
                <Terminal size={12} />
                <span>ICEarth Ledger Action Pipeline & Smart Contracts</span>
              </span>
              <div className="p-3 bg-neutral-900 rounded-lg text-[10px] font-mono text-cyan-400 h-28 overflow-y-auto space-y-1.5 scrollbar-thin">
                {remediationLog.map((log, i) => (
                  <div key={i} className="leading-relaxed border-b border-neutral-800/60 pb-1 flex items-start gap-1">
                    <span className="text-amber-500 font-bold shrink-0">&raquo;</span>
                    <span className="font-sans text-[10px]">{log}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* SECTION 1.5: SOVEREIGN PUBLIC COMMENTARY VAULT & REGULATORY CONSENT HUB */}
      <div id="sovereign-consent-vault" className="bg-slate-950 text-slate-100 p-8 border border-blue-900/50 rounded-2xl space-y-8 shadow-2xl relative overflow-hidden">
        {/* Background ambient lights */}
        <div className="absolute right-0 top-0 translate-x-24 -translate-y-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute left-1/3 bottom-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
        
        {/* SECTION HEADER */}
        <div className="border-b pb-6 border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-blue-500/10 text-blue-400 font-mono text-[10px] uppercase tracking-wider font-extrabold rounded-md border border-blue-500/20">
              <ShieldCheck size={12} className="text-blue-400" />
              <span>Sovereign Identity Protection &bull; New Mexico Basin</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-serif text-white">
              Sovereign Public Commentary Vault
            </h3>
            <p className="text-xs text-slate-400 max-w-3xl">
              Authenticating community feedback and managing complex regulatory frameworks for the <strong className="text-white">Project Jupiter Data Center</strong> (Oracle/OpenAI supercomputing joint venture). Eliminating automated corporate impersonation through cryptographic verification.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800 shrink-0">
            <div className="text-left">
              <span className="text-[9px] font-mono uppercase text-slate-500 font-bold block">Corporate Escrow Bond</span>
              <span className="text-base font-mono font-extrabold text-emerald-400 flex items-center gap-1">
                <Coins size={16} className="text-emerald-500 animate-pulse" />
                ${corporateEscrowBalance.toLocaleString()} USD
              </span>
            </div>
            <div className="text-left border-l pl-4 border-slate-800">
              <span className="text-[9px] font-mono uppercase text-slate-500 font-bold block">Sovereign Offsets Pool</span>
              <span className="text-base font-mono font-extrabold text-blue-400 flex items-center gap-1">
                <Activity size={16} className="text-blue-400" />
                {regulatoryOffsetCredits.toLocaleString()} Units
              </span>
            </div>
          </div>
        </div>

        {/* SECURITY BULLETIN: FRAUD WARNING */}
        <div className="p-4 bg-red-950/40 border border-red-500/30 rounded-xl flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="p-2 bg-red-500/20 rounded-lg text-red-400 shrink-0">
            <ShieldAlert size={20} />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-mono font-extrabold text-red-400 uppercase tracking-wider">
              NEW MEXICO ENVIRONMENT DEPARTMENT (NMED) SECURITY BRIEFING
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-red-300">Fraudulent Supporting Comments Detected:</strong> During the state public hearings, automated actors impersonated Sandía Pueblo and state officials to fabricate support for Project Jupiter's groundwater cooling permits. <span className="text-white">ICEarth solves this breach by anchoring commentary to Decentralized Identifiers (DIDs).</span>
            </p>
          </div>
        </div>

        {/* INTERACTIVE DUAL ENGINE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT ENGINE: COMMENTARY VAULT & RE-AUTHENTICATOR (7 COLS) */}
          <div className="lg:col-span-7 bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b pb-4 border-slate-800">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-200">
                  Comment Authenticity Verification Terminal
                </h4>
                <p className="text-[10px] text-slate-400">
                  Contrast real-time verified tribal positions against unverified/flagged legacy comments.
                </p>
              </div>
              <span className="text-[9px] font-mono px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-md border border-emerald-500/20">
                ACTIVE DECOUPLED LEDGER
              </span>
            </div>

            {/* NEW COMMENT SUBMISSION TOOL */}
            <form onSubmit={handleAddComment} className="p-4 bg-slate-950 border border-blue-900/40 rounded-xl space-y-4">
              <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider block flex items-center gap-1.5">
                <Lock size={12} />
                <span>Publish Authenticated Public Response</span>
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] font-mono uppercase text-slate-500 font-bold block">Your Official Name</label>
                  <input 
                    type="text" 
                    value={newCommentAuthor}
                    onChange={(e) => setNewCommentAuthor(e.target.value)}
                    placeholder="e.g. Elder Margaret Vigil" 
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    disabled={isSubmittingComment}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-mono uppercase text-slate-500 font-bold block">Tribal / State Authority Role</label>
                  <select 
                    value={newCommentRole}
                    onChange={(e) => setNewCommentRole(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    disabled={isSubmittingComment}
                  >
                    <option value="Sandia Governor">Governor, Pueblo of Sandía</option>
                    <option value="Isleta Elder">Council Elder, Pueblo of Isleta</option>
                    <option value="NMED Official">Director of Water Quality, NMED</option>
                    <option value="Public Citizen">Verified NM Resident</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-mono uppercase text-slate-500 font-bold block">Your Official Commentary Text</label>
                <textarea 
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="Draft your response regarding Project Jupiter's resource depletion..." 
                  rows={2}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  disabled={isSubmittingComment}
                />
              </div>

              {isSubmittingComment ? (
                <div className="p-3 bg-slate-900 border border-blue-900/40 rounded-lg space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-blue-400">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
                      Executing Cryptographic Verification Sequence...
                    </span>
                    <span className="text-[9px] text-slate-500 font-bold">ICE-SECURE</span>
                  </div>
                  <p className="text-[10px] text-slate-300 font-mono italic">
                    &raquo; {verificationStep}
                  </p>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={!newCommentAuthor.trim() || !newCommentText.trim()}
                  className={`w-full py-2 rounded-lg text-xs font-mono font-bold uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    newCommentAuthor.trim() && newCommentText.trim()
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
                      : 'bg-slate-800 text-slate-500 border border-slate-700/50 cursor-not-allowed'
                  }`}
                >
                  <ShieldCheck size={14} />
                  <span>Verify Identity & Anchor Comment</span>
                </button>
              )}
            </form>

            {/* COMMENTS LIST FEED */}
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 scrollbar-thin">
              {comments.map((cmt) => (
                <div 
                  key={cmt.id} 
                  className={`p-4 rounded-xl border transition-all ${
                    cmt.verified 
                      ? 'bg-slate-950/80 border-blue-950/70 space-y-2' 
                      : 'bg-red-950/10 border-red-900/30 space-y-2 border-dashed'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h5 className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                        <span>{cmt.author}</span>
                        {cmt.verified ? (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 font-mono text-[8px] uppercase tracking-wider font-extrabold rounded">
                            <ShieldCheck size={8} /> Verified Sovereign
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-red-500/10 text-red-400 font-mono text-[8px] uppercase tracking-wider font-extrabold rounded">
                            <ShieldAlert size={8} /> Impersonation Alert
                          </span>
                        )}
                      </h5>
                      <p className="text-[9px] font-mono text-slate-400">{cmt.role}</p>
                    </div>
                    <span className="text-[8px] font-mono text-slate-500">{cmt.timestamp}</span>
                  </div>

                  <p className="text-xs text-slate-300 italic leading-relaxed">
                    “{cmt.text}”
                  </p>

                  {cmt.verified && cmt.signature && (
                    <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[8px] font-mono text-blue-500/80">
                      <span className="flex items-center gap-1">
                        <Lock size={10} />
                        <span>Cryptographic Signature:</span>
                      </span>
                      <span className="font-bold select-all bg-slate-900 px-1 py-0.5 rounded border border-slate-800">
                        {cmt.signature}
                      </span>
                    </div>
                  )}

                  {!cmt.verified && (
                    <div className="pt-2 border-t border-slate-900/60 flex items-center justify-between text-[8px] font-mono text-red-400/80">
                      <span className="flex items-center gap-1">
                        <AlertCircle size={10} />
                        <span>FALSIFIED RECORD DETECTION:</span>
                      </span>
                      <span className="font-extrabold uppercase bg-red-950/20 px-1 py-0.5 rounded border border-red-900/30">
                        No Sovereign Key Provided
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT ENGINE: WATER & AIR REMEDIATION REGULATORY DASHBOARD (5 COLS) */}
          <div className="lg:col-span-5 bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-6">
            <div className="space-y-1">
              <span className="text-[9px] font-mono uppercase text-slate-500 font-bold block">
                Sovereign Regulatory Console
              </span>
              <h4 className="text-sm font-bold text-slate-200">
                Sovereign Water & Air Management
              </h4>
              <p className="text-[10px] text-slate-400">
                Directly dial corporate resource allocations to observe immediate geochemical impacts and automated micro-payment offset rates.
              </p>
            </div>

            {/* RESOURCE 1: WATER FLOW & DEPLETION */}
            <div className="bg-slate-950 p-4 rounded-xl border border-blue-950 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Droplet size={12} className="text-blue-500" />
                  <span>Evaporative Cooling Water Rate</span>
                </span>
                <span className="text-xs font-mono font-bold text-blue-300">{pumpRateGPM} GPM</span>
              </div>

              <input 
                type="range" 
                min="500" 
                max="5000" 
                step="100"
                value={pumpRateGPM} 
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setPumpRateGPM(val);
                  // Scaled corporate escrow change: high drawdowns deplete escrow faster
                  const penalty = val > 2000 ? Math.floor((val - 2000) * 1.5) : 0;
                  setCorporateEscrowBalance(prev => Math.max(25000, 150000 - (val - 500) * 20));
                  setRegulatoryOffsetCredits(prev => prev + Math.floor(val * 0.15));
                }}
                className="w-full accent-blue-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />

              <div className="grid grid-cols-2 gap-2 text-[9px] font-mono text-slate-400">
                <div className="bg-slate-900 p-2 rounded border border-slate-800">
                  <span className="block text-slate-500">Daily Extraction</span>
                  <span className="text-[11px] font-bold text-slate-200">
                    {((pumpRateGPM * 1440) / 1000000).toFixed(2)} M Gallons
                  </span>
                </div>
                <div className="bg-slate-900 p-2 rounded border border-slate-800">
                  <span className="block text-slate-500">Auto Offset Payment</span>
                  <span className="text-[11px] font-bold text-emerald-400">
                    ${(pumpRateGPM * 0.05).toFixed(2)} / min
                  </span>
                </div>
              </div>
            </div>

            {/* RESOURCE 2: AIR EMISSIONS DIESEL GENERATORS */}
            <div className="bg-slate-950 p-4 rounded-xl border border-blue-950 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Waves size={12} className="text-amber-500" />
                  <span>Diesel Standby Testing</span>
                </span>
                <span className="text-xs font-mono font-bold text-amber-300">{dieselGenTestingHours} Hours / Wk</span>
              </div>

              <input 
                type="range" 
                min="1" 
                max="24" 
                step="1"
                value={dieselGenTestingHours} 
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setDieselGenTestingHours(val);
                  setRegulatoryOffsetCredits(prev => prev + Math.floor(val * 8));
                  setCorporateEscrowBalance(prev => Math.max(10000, prev - val * 150));
                }}
                className="w-full accent-amber-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />

              <div className="grid grid-cols-2 gap-2 text-[9px] font-mono text-slate-400">
                <div className="bg-slate-900 p-2 rounded border border-slate-800">
                  <span className="block text-slate-500">PM2.5 Ambient Impact</span>
                  <span className="text-[11px] font-bold text-slate-200">
                    {(dieselGenTestingHours * 2.4).toFixed(1)} μg/m³
                  </span>
                </div>
                <div className="bg-slate-900 p-2 rounded border border-slate-800">
                  <span className="block text-slate-500">Emission Penalty</span>
                  <span className="text-[11px] font-bold text-amber-400">
                    {Math.round(dieselGenTestingHours * 12)} ICE Credits
                  </span>
                </div>
              </div>
            </div>

            {/* AQUIFER DRAWDOWN DYNAMIC AREA CHART */}
            <div className="bg-slate-950 p-4 rounded-xl border border-blue-950 h-[170px] space-y-2">
              <span className="text-[9px] font-mono uppercase text-slate-500 font-bold block">
                Sandía/Isleta Aquifer Capacity Projection (24-Month Curve)
              </span>
              <ResponsiveContainer width="100%" height="80%">
                <AreaChart data={getAquiferProjectionData()} margin={{ top: 5, right: 10, left: -25, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorAquifer" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={8} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={8} tickLine={false} domain={[0, 100]} />
                  <Tooltip contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', fontSize: '9px' }} />
                  <Area type="monotone" dataKey="Aquifer Capacity (%)" stroke="#3b82f6" fillOpacity={1} fill="url(#colorAquifer)" strokeWidth={2} />
                  <Line type="monotone" dataKey="Safe Drawdown Threshold" stroke="#ef4444" strokeDasharray="5 5" strokeWidth={1} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

          </div>

        </div>

      </div>

      {/* SECTION 1.6: THE TRANS-REGIONAL CRISIS: CLEVELAND TO TAOS & THE OHIO NATURAL GAS BOOM */}
      <div id="trans-regional-ai-crisis" className="bg-gradient-to-br from-neutral-900 to-slate-950 text-slate-100 p-8 border border-neutral-800 rounded-2xl space-y-8 shadow-2xl relative overflow-hidden">
        {/* Decorative background visual */}
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute left-0 top-0 w-80 h-80 bg-red-500/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* SECTION HEADER */}
        <div className="border-b pb-6 border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-500/10 text-amber-400 font-mono text-[10px] uppercase tracking-wider font-extrabold rounded-md border border-amber-500/20">
              <Globe size={12} className="text-amber-500 animate-spin" style={{ animationDuration: '10s' }} />
              <span>Trans-Regional AI Energy Mandate &bull; Cleveland to Taos</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-serif text-white">
              Sovereign Trans-Regional Impact & Standards Console
            </h3>
            <p className="text-xs text-slate-400 max-w-3xl">
              Mapping the systemic footprint of artificial intelligence supercomputing. From Cleveland's failed lead protection and Ohio's natural gas boom to New Mexico's aquifer drawdown, ICEarth establishes un-compromisable standards for global ecological governance.
            </p>
          </div>
          
          <a 
            href="https://www.cleveland.com/news/2026/07/ohios-warped-energy-policy-10-natural-gas-plants-are-being-built-or-planned-to-power-ai.html" 
            target="_blank" 
            referrerPolicy="no-referrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-amber-400 font-mono text-[10px] font-bold rounded-lg border border-amber-500/20 transition-colors uppercase cursor-pointer shrink-0"
          >
            <span>Ohio Gas Boom News</span>
            <ArrowUpRight size={12} />
          </a>
        </div>

        {/* METRIC HIGHLIGHTS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800/80 flex items-center gap-4">
            <div className="p-3 bg-red-500/10 text-red-400 rounded-lg shrink-0">
              <ShieldAlert size={20} />
            </div>
            <div>
              <span className="text-[9px] font-mono text-slate-500 uppercase block font-bold">Ohio Power Race Rank</span>
              <span className="text-lg font-mono font-bold text-slate-100 flex items-baseline gap-1">
                #2 <span className="text-[10px] text-red-400 font-sans">(Nationally, next to Texas)</span>
              </span>
            </div>
          </div>
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800/80 flex items-center gap-4">
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-lg shrink-0">
              <Activity size={20} />
            </div>
            <div>
              <span className="text-[9px] font-mono text-slate-500 uppercase block font-bold">Projected GHG Emissions</span>
              <span className="text-lg font-mono font-bold text-amber-400 font-mono">
                {(ohioGasPlants * 7.5).toFixed(1)}M Tons / Yr
              </span>
            </div>
          </div>
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800/80 flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg shrink-0">
              <Droplet size={20} />
            </div>
            <div>
              <span className="text-[9px] font-mono text-slate-500 uppercase block font-bold">Pueblo Water Drawdown</span>
              <span className="text-lg font-mono font-bold text-blue-400">
                {(pumpRateGPM * 1.44).toFixed(2)}M Gallons / Day
              </span>
            </div>
          </div>
        </div>

        {/* MAIN TWO-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* COLUMN 1: THE RELOCATION STORY & CRITIQUE (7 COLS) */}
          <div className="lg:col-span-7 bg-slate-900/40 p-6 rounded-2xl border border-slate-800/60 space-y-6">
            <div className="space-y-2">
              <h4 className="text-base font-bold text-slate-100 flex items-center gap-2 font-serif">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                The Cleveland-to-Taos Relocation: An Uncompromising Choice
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                ICEarth was originally headquartered in Cleveland, Ohio (the former home of the Cleveland "Indians"). However, when local and state regulators repeatedly failed to protect public health from endemic urban <strong className="text-amber-400 font-semibold">lead poisoning</strong>, the project made an uncompromising choice to relocate to Taos, New Mexico—an ancient center of authentic indigenous environmental stewardship.
              </p>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Since then, the massive expansion of generative artificial intelligence has made Ohio's environmental policies even more warped. Instead of investing in clean power or safeguarding local health, Ohio is currently racing to build <strong className="text-red-400 font-semibold">natural gas power plants</strong> at an unprecedented pace—second only to Texas. This expansion is designed entirely to feed the energy-hungry data centers of multinational tech conglomerates, threatening to dump over <strong className="text-red-400 font-semibold">75 million tons of greenhouse gases</strong> into the atmosphere annually.
              </p>
            </div>

            {/* DUALITY DIAGRAM / INTERACTIVE MAP VISUAL */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block font-bold">
                The AI Environmental Feedback Loop: NM vs. OH
              </span>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center font-mono text-[11px]">
                
                {/* OHIO BLOCK */}
                <div className="md:col-span-2 p-3 bg-red-950/20 border border-red-900/40 rounded-lg text-center space-y-1">
                  <span className="text-[10px] font-bold text-red-400 block">OHIO (Rust Belt Carbon)</span>
                  <p className="text-[10px] text-slate-400 italic">Racing to power AI supercomputing by burning fossil fuels.</p>
                  <div className="text-xs text-red-300 font-bold font-mono">
                    +{ohioGasPlants} Gas Plants Planned
                  </div>
                </div>

                {/* TRANSFER ARROW */}
                <div className="text-center md:col-span-1 flex flex-col items-center justify-center py-2">
                  <span className="text-[9px] font-mono text-slate-500 uppercase block">Global AI</span>
                  <div className="flex items-center text-amber-500 justify-center">
                    <span className="font-sans font-bold text-lg animate-pulse">&harr;</span>
                  </div>
                  <span className="text-[8px] text-slate-600 block">Demands</span>
                </div>

                {/* NEW MEXICO BLOCK */}
                <div className="md:col-span-2 p-3 bg-blue-950/20 border border-blue-900/40 rounded-lg text-center space-y-1">
                  <span className="text-[10px] font-bold text-blue-400 block">NEW MEXICO (Desert Water)</span>
                  <p className="text-[10px] text-slate-400 italic">Evaporating scarce aquifer groundwater to cool the processors.</p>
                  <div className="text-xs text-blue-300 font-bold font-mono">
                    {pumpRateGPM} GPM Extracted
                  </div>
                </div>

              </div>

              <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-[11px] leading-relaxed text-slate-300 italic font-serif">
                “This trans-regional loop proves that environmental protection cannot be solved by local, siloed regulations that corporations easily bypass. It requires global approaches, transparency, and unyielding due process standards.”
              </div>
            </div>

          </div>

          {/* COLUMN 2: THE INTERACTIVE SIMULATOR & THE SOVEREIGN STANDARDS (5 COLS) */}
          <div className="lg:col-span-5 bg-slate-900/40 p-6 rounded-2xl border border-slate-800/60 space-y-6">
            <div className="space-y-1">
              <span className="text-[9px] font-mono uppercase text-slate-500 font-bold block">
                Scenario Modeling & Standards
              </span>
              <h4 className="text-sm font-bold text-slate-200">
                AI Fossil Power Expansion Simulator
              </h4>
              <p className="text-[10px] text-slate-400">
                Simulate Ohio's natural gas plant fast-tracking to evaluate trans-regional carbon offsets and compare with NM aquifer drawdown rates.
              </p>
            </div>

            {/* DYNAMIC SCENARIO CONTROL SLIDER */}
            <div className="bg-slate-950 p-4 rounded-xl border border-amber-950/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-wider flex items-center gap-1">
                  <Activity size={12} />
                  <span>Planned Ohio Gas Plants</span>
                </span>
                <span className="text-xs font-mono font-bold text-amber-400">{ohioGasPlants} Plants</span>
              </div>

              <input 
                type="range" 
                min="1" 
                max="25" 
                step="1"
                value={ohioGasPlants} 
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setOhioGasPlants(val);
                  setCorporateEscrowBalance(prev => Math.max(10000, 150000 - (val * 4000)));
                  setRegulatoryOffsetCredits(prev => prev + Math.floor(val * 12));
                }}
                className="w-full accent-amber-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />

              <div className="space-y-1 text-[9px] font-mono text-slate-400">
                <div className="flex justify-between">
                  <span>Carbon Output Rank:</span>
                  <span className="font-bold text-red-400">
                    {ohioGasPlants > 15 ? 'CRITICAL (Second Only to Texas)' : ohioGasPlants > 5 ? 'EXTREME' : 'MODERATE'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Total GHG Contribution:</span>
                  <span className="font-bold text-slate-200">
                    {(ohioGasPlants * 7.5).toFixed(1)} Million Tons CO2e/Yr
                  </span>
                </div>
              </div>
            </div>

            {/* INTERACTIVE STANDARDS PROTOCOL TABS */}
            <div className="space-y-3">
              <span className="text-[9px] font-mono uppercase text-slate-500 font-bold block">
                ICEarth Sovereignty Standards & Due Process
              </span>

              <div className="grid grid-cols-4 gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                <button
                  type="button"
                  onClick={() => setSelectedStandardTab('transparency')}
                  className={`py-1 text-[8px] font-mono font-bold rounded uppercase transition-all cursor-pointer ${
                    selectedStandardTab === 'transparency' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  Transparency
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedStandardTab('dueprocess')}
                  className={`py-1 text-[8px] font-mono font-bold rounded uppercase transition-all cursor-pointer ${
                    selectedStandardTab === 'dueprocess' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  Due Process
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedStandardTab('standards')}
                  className={`py-1 text-[8px] font-mono font-bold rounded uppercase transition-all cursor-pointer ${
                    selectedStandardTab === 'standards' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  Standards
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedStandardTab('leadorigins')}
                  className={`py-1 text-[8px] font-mono font-bold rounded uppercase transition-all cursor-pointer ${
                    selectedStandardTab === 'leadorigins' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  Our Origins
                </button>
              </div>

              {/* TAB CONTENT PANEL */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[140px] flex flex-col justify-between">
                
                {selectedStandardTab === 'transparency' && (
                  <div className="space-y-2">
                    <h5 className="text-xs font-bold text-amber-400 flex items-center gap-1.5 font-mono uppercase">
                      <Terminal size={12} />
                      Real-Time Environmental Management
                    </h5>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      Corporations mask data center footprints behind proprietary "Intranet" disclosures. ICEarth mandates real-time telemetry publication—bringing hidden aquifer drawdown rates (NM) and natural gas generator emissions (OH) onto public sovereign ledgers.
                    </p>
                  </div>
                )}

                {selectedStandardTab === 'dueprocess' && (
                  <div className="space-y-2">
                    <h5 className="text-xs font-bold text-blue-400 flex items-center gap-1.5 font-mono uppercase">
                      <Lock size={12} />
                      Cryptographic Due Process
                    </h5>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      To fast-track massive fossil power or water permits, corporations utilize fake, automated comment spams to simulate community support. ICEarth's Commentary Vault enforces cryptographically validated decentralized IDs (DIDs) to preserve community voices.
                    </p>
                  </div>
                )}

                {selectedStandardTab === 'standards' && (
                  <div className="space-y-2">
                    <h5 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 font-mono uppercase">
                      <ShieldCheck size={12} />
                      Universal Global Standards
                    </h5>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      Sovereignty cannot stop at state borders. The ICEarth protocol implements universal carbon and water liability standards, enforcing automated, non-negotiable offset penalties drawn directly from corporate escrow accounts based on real sensor telemetry.
                    </p>
                  </div>
                )}

                {selectedStandardTab === 'leadorigins' && (
                  <div className="space-y-2">
                    <h5 className="text-xs font-bold text-red-400 flex items-center gap-1.5 font-mono uppercase">
                      <ShieldAlert size={12} />
                      Relocation from Cleveland to Taos
                    </h5>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      We migrated ICEarth from Cleveland, Ohio, to Taos, NM because the state of Ohio utterly failed to prevent systemic lead poisoning. Today, their warping of energy policies to build natural gas plants for AI—emitting 75 million tons of GHGs—validates our global, sovereign approach.
                    </p>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-900 text-[9px] font-mono text-slate-500 text-right">
                  Protocol Version: <span className="text-slate-400 font-bold">normALST 02/07/01</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* SECTION 1.7: NEW MEXICO DOWNWINDER RADIATION REPARATIONS & COMPREHENSIVE PROOF OF RIGHTS */}
      <div id="downwinder-reparations" className="bg-slate-950 text-slate-100 p-8 border border-blue-950 rounded-2xl space-y-8 shadow-2xl relative overflow-hidden">
        {/* Background ambient accents */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute left-10 bottom-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* SECTION HEADER */}
        <div className="border-b pb-6 border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-purple-500/10 text-purple-400 font-mono text-[10px] uppercase tracking-wider font-extrabold rounded-md border border-purple-500/20">
              <Activity size={12} className="text-purple-400 animate-pulse" />
              <span>Radioactive Decay Chain &bull; Same Chain as Lead</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-serif text-white">
              Sovereign Radiation Reparations & Downwinders Claim Registry
            </h3>
            <p className="text-xs text-slate-400 max-w-3xl">
              Securing reparations for New Mexico downwinders exposed to the <strong className="text-white">Trinity Bomb Site</strong> radiation. Radioactive heavy metals occupy the <strong className="text-purple-400 font-semibold">same nuclear decay chain as Lead</strong> (Uranium-238 decaying down to Radium, Polonium, and finally stable Lead-206), causing chronic disease, neurological collapse, and death. ICEarth verifies proof of rights to expedite the state's <strong className="text-white">$100,000 compensation campaign</strong>.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800 shrink-0">
            <div className="text-left">
              <span className="text-[9px] font-mono uppercase text-slate-500 font-bold block">Federal Downwinder Allocation</span>
              <span className="text-base font-mono font-extrabold text-purple-400 flex items-center gap-1">
                <Coins size={16} className="text-purple-400" />
                $100,000 / Person
              </span>
            </div>
            <div className="text-left border-l pl-4 border-slate-800">
              <span className="text-[9px] font-mono uppercase text-slate-500 font-bold block">Sovereign Validation Node</span>
              <span className="text-base font-mono font-extrabold text-blue-400 flex items-center gap-1">
                <CheckCircle size={16} className="text-blue-400" />
                TRINITY-ZK-01
              </span>
            </div>
          </div>
        </div>

        {/* COMPREHENSIVE REPARATIONS WORKFLOW CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* CLAIMANTS SELECTION & STATUS BOARD (5 COLS) */}
          <div className="lg:col-span-5 bg-slate-900/50 p-6 rounded-2xl border border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-slate-200">Claimant Roster</h4>
                <p className="text-[10px] text-slate-400">Select claimant to manage documentary evidence and trigger audits.</p>
              </div>
              <button
                onClick={handleResetClaimants}
                className="text-[9px] font-mono bg-slate-950 px-2.5 py-1 text-slate-400 hover:text-white rounded border border-slate-800 transition-colors cursor-pointer uppercase font-bold"
              >
                Reset Board
              </button>
            </div>

            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {claimants.map((c) => {
                const isSelected = selectedClaimant.id === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedClaimant(c)}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-slate-950 border-purple-900/60 shadow-lg' 
                        : 'bg-slate-950/40 hover:bg-slate-950/80 border-slate-800/80'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="text-xs font-bold text-slate-100">{c.name}</h5>
                        <p className="text-[9px] text-slate-400 font-mono mt-0.5">{c.ancestry}</p>
                      </div>
                      <span className="text-[8px] font-mono text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                        {c.claimId}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {c.diseases.slice(0, 1).map((dis, idx) => (
                          <span key={idx} className="text-[8px] bg-red-950/30 text-red-400 px-1.5 py-0.5 rounded font-mono font-semibold">
                            {dis}
                          </span>
                        ))}
                        {c.diseases.length > 1 && (
                          <span className="text-[8px] bg-red-950/10 text-slate-400 px-1 py-0.5 rounded font-mono">
                            +{c.diseases.length - 1} more
                          </span>
                        )}
                      </div>

                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-mono font-bold uppercase tracking-wider ${
                        c.docStatus === 'payout_disbursed'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : c.docStatus === 'audited_and_signed'
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          : c.docStatus === 'ready_for_audit'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {c.docStatus === 'payout_disbursed' && 'Disbursed 🎉'}
                        {c.docStatus === 'audited_and_signed' && 'Audited & Signed'}
                        {c.docStatus === 'ready_for_audit' && 'Ready for Audit'}
                        {c.docStatus === 'missing_docs' && 'Missing Docs'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* DETAILED EVIDENCE VAULT & CRITICAL CHECKS (7 COLS) */}
          <div className="lg:col-span-7 bg-slate-900/50 p-6 rounded-2xl border border-slate-800 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              {/* SELECT CLAIMANT DETAILS */}
              <div className="border-b pb-4 border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-ping"></span>
                    {selectedClaimant.name}
                  </h4>
                  <p className="text-xs text-slate-400">{selectedClaimant.location}</p>
                </div>
                <div className="text-left sm:text-right font-mono text-[10px]">
                  <span className="text-slate-500 block">Sovereign Identity Key (DID)</span>
                  <span className="text-blue-400 select-all font-bold">did:icearth:{selectedClaimant.id}</span>
                </div>
              </div>

              {/* RADIATION DECAY SCIENTIFIC FACT */}
              <div className="p-4 bg-slate-950 border border-purple-950 rounded-xl space-y-2">
                <span className="text-[9px] font-mono font-bold text-purple-400 uppercase tracking-widest block flex items-center gap-1">
                  <Activity size={12} />
                  <span>The Heavy Metal Decay Continuum</span>
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Heavy radioactive particulates from the Trinity Site undergo continuous alpha and beta decays. In this atomic chain, isotopes like <strong className="text-white">Uranium-238</strong> and <strong className="text-white">Radium-226</strong> deteriorate sequentially, passing through highly toxic, radioactive intermediates before settling into stable, non-radioactive <strong className="text-purple-300">Lead-206 (Pb-206)</strong>. Thus, radiation claimants suffer from the combined impact of heavy metal chemical toxicity and intense radiological cell damage.
                </p>
              </div>

              {/* PROOFS & DOCUMENTATION VAULT */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">Documentary Evidence Collected</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedClaimant.uploadedDocs.map((doc, idx) => (
                    <div key={idx} className="p-3 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-sans">{doc}</span>
                      <span className="text-[8px] font-mono px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 rounded uppercase font-bold">
                        Secure Vaulted
                      </span>
                    </div>
                  ))}
                  {selectedClaimant.docStatus === 'missing_docs' && (
                    <div className="p-3 bg-red-950/20 border border-red-900/40 border-dashed rounded-lg flex items-center justify-between text-xs">
                      <span className="text-red-400 font-sans italic">Sovereign Proof of Residence Affidavit</span>
                      <span className="text-[8px] font-mono px-1.5 py-0.5 bg-red-500/10 text-red-400 rounded uppercase font-bold">
                        Required
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* ACTION LOGIC */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wide">
                    Action Execution Terminal
                  </span>
                  <span className="text-[9px] font-mono text-purple-400">Claimant status: {selectedClaimant.docStatus.replace('_', ' ').toUpperCase()}</span>
                </div>

                {isAuditingClaim ? (
                  <div className="p-3 bg-slate-900 border border-blue-900/40 rounded-lg space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono text-blue-400">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
                        Running Zero-Knowledge Proof Radiation Audit...
                      </span>
                      <span className="text-[9px] text-slate-500 font-bold">ICE-SECURE</span>
                    </div>
                    <p className="text-[10px] text-slate-300 font-mono italic">
                      &raquo; {auditStepMessage}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-3">
                    {selectedClaimant.docStatus === 'missing_docs' && (
                      <button
                        type="button"
                        onClick={() => handleUploadDocument(selectedClaimant.id)}
                        className="flex-1 py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white font-mono text-xs font-bold uppercase rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Lock size={12} />
                        <span>Upload Missing Proofs</span>
                      </button>
                    )}

                    {selectedClaimant.docStatus === 'ready_for_audit' && (
                      <button
                        type="button"
                        onClick={() => handleAuditClaim(selectedClaimant.id)}
                        className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-mono text-xs font-bold uppercase rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <ShieldCheck size={14} />
                        <span>Execute Cryptographic Audit</span>
                      </button>
                    )}

                    {selectedClaimant.docStatus === 'audited_and_signed' && (
                      <button
                        type="button"
                        onClick={() => handleDisburseClaim(selectedClaimant.id)}
                        className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-bold uppercase rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Coins size={14} />
                        <span>Disburse Federal Reparation ($100,000)</span>
                      </button>
                    )}

                    {selectedClaimant.docStatus === 'payout_disbursed' && (
                      <div className="flex-1 p-3 bg-emerald-950/20 border border-emerald-900/40 rounded-lg flex items-center justify-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase">
                        <CheckCircle size={16} />
                        <span>Payout of $100,000 Securified & Disbursed</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* REAL-TIME DECENTRALIZED AUDIT LOGS */}
            <div className="space-y-2 pt-4 border-t border-slate-800">
              <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">Sovereign Validation Audit Ledger</span>
              <div className="bg-slate-950 p-3 rounded-lg text-[10px] font-mono text-cyan-400 h-24 overflow-y-auto space-y-1.5 scrollbar-thin">
                {downwinderAuditLog.map((log, i) => (
                  <div key={i} className="leading-normal border-b border-neutral-800/40 pb-1 flex items-start gap-1">
                    <span className="text-purple-400 font-bold">&raquo;</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* SECTION 1.8: THE JUNG-PUEBLO ENLIGHTENMENT: THE ROOF OF THE WORLD & THE COGNITION OF THE HEART */}
      <div id="jung-pueblo-enlightenment" className="bg-gradient-to-br from-[#1b1512] to-slate-950 text-neutral-100 p-8 border border-amber-900/30 rounded-2xl space-y-8 shadow-2xl relative overflow-hidden">
        {/* Decorative elements representing Father Sun */}
        <div className="absolute right-0 top-0 translate-x-20 -translate-y-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute left-1/3 bottom-0 w-80 h-80 bg-red-500/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* SECTION HEADER */}
        <div className="border-b pb-6 border-amber-950/40 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-500/10 text-amber-400 font-mono text-[10px] uppercase tracking-wider font-extrabold rounded-md border border-amber-500/20">
              <Sparkles size={12} className="text-amber-500" />
              <span>Taos Pueblo &bull; Carl Jung Philosophical Synthesis</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-serif text-white tracking-tight">
              The Roof of the World & The Cognition of the Heart
            </h3>
            <p className="text-xs text-amber-100/60 max-w-3xl leading-relaxed">
              In the early 20th century, Swiss Psychologist <strong className="text-amber-300">Carl Jung</strong> traveled to Taos Pueblo, guided by the same realization that led ICEarth's founder to relocate the initiative from Cleveland's heavy metal toxic pipelines to the ancient clay sanctuaries of New Mexico. The resulting dialogue with Chief Ochwiay Biano (Mountain Lake) remains a pivotal enlightenment for contemporary ecological thought.
            </p>
          </div>

          <a 
            href="https://discovervedanta.com/carl-jungs-experience-in-new-mexico-with-the-pueblos-indians/" 
            target="_blank" 
            referrerPolicy="no-referrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-950/30 hover:bg-amber-950/60 text-amber-300 font-mono text-[10px] font-bold rounded-lg border border-amber-500/20 transition-colors uppercase cursor-pointer shrink-0"
          >
            <span>Carl Jung's Taos Travelogue</span>
            <ArrowUpRight size={12} />
          </a>
        </div>

        {/* DUAL ENCOUNTER PANELS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* THE CONVERSATION (7 COLS) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-amber-950/20 p-6 rounded-2xl border border-amber-950/40 space-y-6">
              
              <div className="space-y-4">
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block font-bold flex items-center gap-1.5">
                  <Compass size={12} />
                  <span>The Dialogue at Taos Pueblo</span>
                </span>
                
                <div className="space-y-4 font-serif text-slate-200">
                  <p className="text-xs md:text-sm italic leading-relaxed border-l-2 border-amber-500/50 pl-4 py-1">
                    “After all, we are a people who live on the roof of the world; we are the sons of the Father Sun, and with our religion we daily help our father to go across the sky. We do this not only for ourselves, but for the whole world. If we were to cease practising our religion, in ten years time the sun would no longer rise. Then it would be night forever.”
                  </p>

                  <div className="pt-2">
                    <p className="text-xs text-amber-100/70 mb-2 font-sans font-semibold">
                      Jung asked Mountain Lake why he thought the whites were all mad:
                    </p>
                    <p className="text-xs md:text-sm italic text-amber-300 bg-slate-950/80 p-3 rounded-lg border border-amber-950/20">
                      “They say they think with their heads,” Biano replied.
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-amber-100/70 mb-2 font-sans font-semibold">
                      “Why of course. What do you think with,” Jung asked him in surprise:
                    </p>
                    <p className="text-xs md:text-sm font-bold text-amber-400 bg-slate-950/80 p-3 rounded-lg border border-emerald-950">
                      “We think here,” Biano said, indicating his heart.
                    </p>
                  </div>
                </div>
              </div>

              {/* COGNITIVE REFLECTION FOOTNOTE */}
              <div className="p-4 bg-slate-950/50 rounded-xl border border-amber-900/10 text-xs text-slate-300 space-y-2">
                <h5 className="font-mono text-[9px] uppercase tracking-wider text-amber-400 font-extrabold flex items-center gap-1">
                  <Terminal size={10} />
                  <span>The Foundation of ECEarth / ICEarth</span>
                </h5>
                <p className="leading-relaxed font-sans">
                  This dialogue highlights the core crisis of the West: an extreme, unilateral hyper-rationalism that acts through head-centered corporate algorithms and extractive, un-grounded policies (e.g. fast-tracking 10 gas power plants in Ohio for AI processed workloads or evaporating Pueblo water without consent). <span className="text-amber-300">To think with the heart</span> is to recognize our reciprocal duty to the Sun, the Earth, the water, and the universal social enterprise.
                </p>
              </div>

            </div>
          </div>

          {/* THE SHAPELESS MIST: HISTORICAL MATRIX (5 COLS) */}
          <div className="lg:col-span-5 bg-[#0f0a07] p-6 rounded-2xl border border-amber-950/30 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest block font-bold">
                The Conquistador Continuum
              </span>
              <h4 className="text-sm font-bold text-slate-100 font-serif leading-tight">
                Carl Jung's Shapeless Mist & The Real White Man
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                Following Biano's critique, Jung fell into a deep meditation, realizing the historical trajectory of head-centric, predatory civilization:
              </p>

              {/* STAGGERED HISTORICAL SEQUENCE */}
              <div className="space-y-2.5 font-sans text-[10px] text-slate-300">
                <div className="p-2.5 bg-[#17100b] rounded border border-red-950/40">
                  <strong className="text-red-400 font-mono uppercase block text-[8px] tracking-wider mb-0.5">I. The Roman Legions</strong>
                  Smashing into Gaul; Scipio, Pompey, and Julius Caesar carving out empires on the White Nile.
                </div>
                <div className="p-2.5 bg-[#17100b] rounded border border-red-950/40">
                  <strong className="text-red-400 font-mono uppercase block text-[8px] tracking-wider mb-0.5">II. Forced Conversion</strong>
                  St. Augustine transmitting the Christian creed on the tips of Roman lances; Charlemagne's conversions.
                </div>
                <div className="p-2.5 bg-[#17100b] rounded border border-red-950/40">
                  <strong className="text-red-400 font-mono uppercase block text-[8px] tracking-wider mb-0.5">III. The Conquistador Descent</strong>
                  Columbus, Cortes, and military bands descending with fire, sword, and torture upon remote, peaceful Pueblos.
                </div>
                <div className="p-2.5 bg-[#17100b] rounded border border-red-950/40">
                  <strong className="text-red-400 font-mono uppercase block text-[8px] tracking-wider mb-0.5">IV. Decimation of Pacific Islands</strong>
                  Islands devastated by firewater, syphilis, and scarlet fever hidden in the clothes forced upon them.
                </div>
              </div>
            </div>

            {/* SYNTHESIS TO ECEARTH */}
            <div className="pt-4 mt-4 border-t border-amber-950/40 text-[10px] text-amber-300/80 leading-relaxed italic font-serif">
              “This Indian had struck our vulnerable spot, unveiled a truth to which we are blind... ICEarth replaces this destructive trajectory with mutual, non-exploitative, heart-centric global structures.”
            </div>
          </div>

        </div>

      </div>

      {/* SECTION 2: THE ANISHINAABE EAGLE CLINIC (Lead story from July 2026) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: THE ODAWA EAGLE STORY */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-8 border border-gray-200/80 rounded-2xl space-y-6">
            
            <div className="border-b pb-4 border-gray-100 space-y-2 flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono font-bold text-blue-700 uppercase tracking-wider">Landmark Ecosystem Sanctuary &bull; July 2026</span>
                <h3 className="text-2xl font-serif text-neutral-900 leading-tight mt-0.5">
                  Eagle Rehabilitation Facility East of the Mississippi
                </h3>
                <p className="text-xs text-gray-500 italic font-mono">
                  Levering, Northern Michigan — Little Traverse Bay Bands of Odawa Indians
                </p>
              </div>
              <span className="px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 font-bold text-xs rounded-lg uppercase tracking-wider font-mono">
                Featured Lead (Pb) Initiative
              </span>
            </div>

            {/* Main story summary block */}
            <div className="p-5 bg-blue-50/50 border border-blue-100 rounded-xl space-y-3">
              <div className="flex items-center gap-2 font-mono font-bold text-blue-900 text-xs uppercase tracking-wide">
                <Feather size={14} className="text-blue-700 animate-pulse" />
                <span>The Sacred Messenger: Migizi</span>
              </div>
              <p className="text-xs text-neutral-800 leading-relaxed font-serif">
                “The eagle is a culturally significant species for Native Anishinaabe people, and we feel it’s our job to be able to take care of them and make sure they’re here for generations to come,” explained Terri Thomasma, raptor rehabilitation coordinator for the Harbor Springs-based tribe.
              </p>
              <p className="text-xs text-neutral-700 leading-relaxed font-sans">
                Eagles are revered as sacred messengers who carry prayers to the Creator. In the Anishinaabemowin language, the word for eagle is **"Migizi."** Now, tribal wildlife biologists are treating wild eagles found sick, injured, or with severe, acute **lead poisoning**.
              </p>
            </div>

            <div className="space-y-4 text-xs text-neutral-700 leading-relaxed font-sans">
              <h4 className="font-bold text-neutral-900 uppercase font-mono text-[10px] tracking-wider text-gray-500">The Lead Ammunition Cycle & High-Acidity Digestion</h4>
              <p>
                Eagles and other raptors frequently suffer catastrophic lead poisoning after scavenging gut piles left in the woods by hunters. Their highly acidic digestive systems rapidly dissolve lead ammunition fragments, allowing the toxic heavy metal to flood into their bloodstream, causing neurological failure, blindness, paralyzed crops, and eventual starvation.
              </p>
              <p>
                Veterinary caretakers perform surgical removals of gastrointestinal fragments and administer critical **chelation therapy**—remediating fluids and medicines that bind to toxic lead in their blood, allowing it to be safely excreted.
              </p>
              
              <div className="border-t border-dashed my-4 border-gray-200"></div>
              
              <h4 className="font-bold text-neutral-900 uppercase font-mono text-[10px] tracking-wider text-gray-500">How ICEarth Directs Funding and Remediation</h4>
              <p>
                Traditional wildlife programs rely on slow, state-controlled environmental grants that are routinely delayed by bureaucratic pipelines. ICEarth bridges this with **active geoscientific sovereignty**:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-neutral-600 font-sans">
                <li>
                  <strong>Sovereign Nodes</strong>: Independent, tribal-administered ledger nodes register localized wildlife bio-indicators (e.g. eagle Blood Lead Levels) with complete data confidentiality.
                </li>
                <li>
                  <strong>Direct Grants</strong>: Performance-based smart contracts trigger instant, decentralized escrow releases to fund critical laboratory equipment (like the clinic's X-ray machines used to find ingested lead shards).
                </li>
                <li>
                  <strong>Ammunition Exchanges</strong>: Smart contract tokens sponsor ammunition exchange networks, replacing toxic lead bullets with copper alternatives directly within tribal hunting circles.
                </li>
              </ul>
            </div>

            {/* External source anchor */}
            <div className="pt-2 flex justify-start">
              <a 
                href="https://www.mlive.com/environment/2026/07/odawa-tribe-opens-eagle-rehabilitation-center-in-northern-michigan.html" 
                target="_blank" 
                referrerPolicy="no-referrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono uppercase font-bold text-blue-900 bg-blue-50 border border-blue-100 hover:bg-blue-100 rounded-xl transition-all shadow-xs"
              >
                <Compass size={14} />
                <span>Read the Official Press Coverage</span>
              </a>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: INTERACTIVE REHABILITATION LABORATORY */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 border border-blue-900/10 rounded-2xl space-y-6 shadow-sm">
            
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-blue-100 text-blue-900 font-mono text-[9px] uppercase tracking-wider font-extrabold rounded-md">
                <HeartPulse size={10} className="text-blue-700 animate-pulse" />
                <span>MIGIZI CLINIC SIMULATOR v1.0</span>
              </div>
              <h3 className="text-lg font-serif text-neutral-900 tracking-tight">
                Raptor Lead Chelation Lab
              </h3>
              <p className="text-[11px] text-gray-500 font-sans">
                Witness the clinical impact of lead poisoning and chelation treatments on sacred eagles admitted to the Odawa Tribal Facility.
              </p>
            </div>

            {/* PATIENTS SELECTION BOX */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase text-gray-400 font-bold block">Admitted Raptor Cohort</span>
              <div className="grid grid-cols-2 gap-2">
                {patients.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPatient(p)}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      selectedPatient.id === p.id
                        ? 'bg-[#1e1b4b] text-white border-blue-950 shadow-sm'
                        : 'bg-gray-50 hover:bg-gray-100 text-neutral-800 border-gray-200/60'
                    }`}
                  >
                    <div className="text-[9px] font-mono font-bold truncate opacity-80">{p.species}</div>
                    <div className="text-xs font-bold truncate mt-0.5">{p.name}</div>
                    
                    <div className="mt-2 flex items-center justify-between">
                      <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-mono font-bold uppercase ${
                        p.status === 'Released 🎉' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : p.status === 'In Surgery' 
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {p.status}
                      </span>
                      <span className="text-[10px] font-mono font-bold">{p.currentBll} μg/dL</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* PATIENT DETAIL PANEL */}
            <div className="p-4 bg-neutral-50/80 rounded-xl border border-gray-200/80 space-y-4 text-xs font-sans">
              <div className="flex items-center justify-between border-b pb-2 border-gray-200/60">
                <div>
                  <h4 className="font-bold text-neutral-900 text-sm">{selectedPatient.name}</h4>
                  <p className="text-[10px] text-gray-500">{selectedPatient.discoveryLocation}</p>
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-mono uppercase text-gray-400 block font-bold">Treatment Time</span>
                  <span className="font-mono font-bold text-neutral-900">{selectedPatient.treatmentDays} days</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center py-1">
                <div className="p-2 bg-white border border-gray-100 rounded-lg">
                  <span className="text-[9px] font-mono text-gray-400 uppercase font-bold block">Admitted Load</span>
                  <span className="text-lg font-mono font-bold text-red-500">{selectedPatient.initialBll} μg/dL</span>
                </div>
                <div className="p-2 bg-white border border-gray-100 rounded-lg">
                  <span className="text-[9px] font-mono text-gray-400 uppercase font-bold block">Current Blood Pb</span>
                  <span className={`text-lg font-mono font-bold ${selectedPatient.currentBll > 20 ? 'text-amber-600' : 'text-emerald-600'}`}>
                    {selectedPatient.currentBll} μg/dL
                  </span>
                </div>
              </div>

              {/* ACTION: INJECT CHELATION FLUID */}
              <div className="space-y-2">
                <button
                  onClick={() => handleAdministerChelation(selectedPatient.id)}
                  disabled={selectedPatient.status === 'Released 🎉'}
                  className={`w-full py-2.5 px-4 rounded-xl font-mono text-xs font-bold uppercase transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer ${
                    selectedPatient.status === 'Released 🎉'
                      ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  <Activity size={14} />
                  <span>Administer Chelation Cycle (-15 μg/dL Pb)</span>
                </button>
                <p className="text-[10px] text-gray-400 text-center italic">
                  Injecting chelators binds active lead ions in the eagle's kidneys and intestines, allowing safe excretion.
                </p>
              </div>

            </div>

            {/* DECAY CURVE GRAPH */}
            <div className="h-[210px] w-full bg-neutral-50 p-3 rounded-xl border border-gray-200">
              <span className="text-[9px] font-mono uppercase text-gray-400 font-bold block mb-1">
                Estimated Chelation Recovery Profile ({selectedPatient.name})
              </span>
              <ResponsiveContainer width="100%" height="90%">
                <AreaChart data={getTreatmentCurve()} margin={{ top: 10, right: 10, left: -25, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorPb2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EBEBEB" />
                  <XAxis dataKey="day" stroke="#888888" fontSize={9} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={9} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="Blood Lead (μg/dL)" stroke="#3b82f6" fillOpacity={1} fill="url(#colorPb2)" strokeWidth={2} />
                  <Line type="monotone" dataKey="Toxicity Threshold" stroke="#ef4444" strokeDasharray="4 4" strokeWidth={1} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* LIVE ACTION LOG */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-gray-400 font-bold font-sans">Laboratory Activity Log</span>
                <button 
                  onClick={handleResetPatients}
                  className="text-[9px] font-mono font-bold text-blue-600 hover:underline bg-transparent border-0 cursor-pointer"
                >
                  RESET PATIENTS
                </button>
              </div>
              <div className="p-3 bg-neutral-900 rounded-lg text-[10px] font-mono text-cyan-400 h-24 overflow-y-auto space-y-1.5 scrollbar-thin">
                {raptorLog.map((log, i) => (
                  <div key={i} className="leading-normal border-b border-neutral-800/60 pb-1 flex items-start gap-1">
                    <span className="text-amber-500 font-bold">&bull;</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* SECTION 3: USEIT CONCEPTUAL FRAMEWORK (normALST 02/07/01) */}
      <div id="useit-conceptual-framework" className="bg-white p-8 border border-gray-200/80 rounded-2xl space-y-6 shadow-xs relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
        
        {/* SECTION HEADER */}
        <div className="border-b pb-4 border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-50 text-amber-900 font-mono text-[10px] uppercase tracking-wider font-extrabold rounded-md border border-amber-200">
              <BookOpen size={12} className="text-amber-700" />
              <span>Conceptual Foundations &bull; normALST 02/07/01</span>
            </div>
            <h3 className="text-2xl font-serif text-neutral-900">
              Universal Social Enterprise IT (USEIT)
            </h3>
            <p className="text-xs text-gray-500 max-w-2xl">
              Balancing the global economic playing field to secure sovereignty and prevent systemic exploitation of resource-rich indigenous territories.
            </p>
          </div>
          
          <a 
            href="http://realneo.us/content/icearth-information-community-earth-conceptual-framework-normalst-020701" 
            target="_blank" 
            referrerPolicy="no-referrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 font-mono text-[10px] font-bold rounded-lg border border-neutral-200 transition-colors uppercase cursor-pointer shrink-0"
          >
            <span>Original 2001 Source</span>
            <ArrowUpRight size={12} />
          </a>
        </div>

        {/* DIALECTIC MANIFESTO COLLAPSIBLE/TABS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* THE MANIFESTO PASSAGES (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4">
              {/* BLOCK 1 */}
              <div className="p-5 bg-amber-50/25 border border-amber-100/60 rounded-xl space-y-3">
                <span className="text-[10px] font-mono uppercase text-amber-800 font-bold tracking-wider flex items-center gap-1">
                  <Compass size={12} className="text-amber-600" />
                  <span>The Highlands of New Guinea Dilemma</span>
                </span>
                <p className="text-xs text-neutral-800 font-serif leading-relaxed italic">
                  “Are there simple people still in the world who are better-off low tech, unconnected and ITless? <strong className="text-neutral-950 font-bold not-italic">No.</strong> To be so is to be excluded from what has become a decidedly global society and so economy. As a simple 'tribesman' sits in his hut in the Highlands of New Guinea, without electricity not to mention Internet access, global enterprises mine the copper beneath his land and clear the trees above and sell his natural resources over their private 'Intranets' at top dollar on their spot markets.”
                </p>
              </div>

              {/* BLOCK 2 */}
              <div className="p-5 bg-blue-50/20 border border-blue-100/60 rounded-xl space-y-3">
                <span className="text-[10px] font-mono uppercase text-blue-800 font-bold tracking-wider flex items-center gap-1">
                  <Coins size={12} className="text-blue-600" />
                  <span>Balancing the Playing Field</span>
                </span>
                <p className="text-xs text-neutral-800 font-serif leading-relaxed italic">
                  “Should the tribesman care? His land's copper and trees are gone and he didn't benefit well, so yes. Would access to IT help him better his lot in life? <strong className="text-neutral-900 font-bold not-italic">Yes.</strong> If the people of less developed nations (and even less developed segments of developed nations) know the value of their resources through neutral ASPs in interconnected markets, resource holders can use information technologies to market their resources at more optimal levels. <strong className="text-blue-900 font-semibold not-italic">IT is helping 'tribesmen' of many tribes in every corner of the world balance the global economic playing field - for the first time in history.</strong>”
                </p>
              </div>

              {/* BLOCK 3 */}
              <div className="p-5 bg-neutral-50 border border-gray-200/60 rounded-xl space-y-3">
                <span className="text-[10px] font-mono uppercase text-gray-700 font-bold tracking-wider flex items-center gap-1">
                  <Sparkles size={12} className="text-gray-600" />
                  <span>The Moral Imperative of Universal Access</span>
                </span>
                <p className="text-xs text-neutral-800 font-serif leading-relaxed italic">
                  “That is the point of developing Universal Social Enterprise Information Technologies (USEIT). If we accept that the world is one interconnected marketplace, as it now is, we must view all people as members of a universal social enterprise where anyone excluded from IT resources is exploited. They are denied optimal virtual community. They are denied optimal education. They are denied optimal economy and income opportunities. They are denied the optimal value of their natural resources. In today's enlightened world, that is unacceptable.”
                </p>
              </div>
            </div>
          </div>

          {/* THE USEIT REQUIREMENTS INTERACTIVE DRILL-DOWN (5 Cols) */}
          <div className="lg:col-span-5 bg-neutral-50 p-6 rounded-xl border border-gray-200 space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-gray-400 font-bold block tracking-wider">
                Systemic Pillars of the Framework
              </span>
              <h4 className="text-base font-bold text-neutral-900">
                The Core Postulates of USEIT
              </h4>
              <p className="text-[11px] text-gray-500">
                To prevent exploitation and establish absolute geochemical and digital sovereignty, five foundational infrastructures must be built directly for and with indigenous peoples.
              </p>
            </div>

            {/* EXPANDED SYSTEM REQUIREMENT BLOCK */}
            <div className="space-y-4">
              <div className="p-4 bg-white border border-gray-200 rounded-lg space-y-2">
                <span className="text-[9px] font-mono font-bold text-blue-600 uppercase tracking-widest block">The Equal-Treatment Postulate</span>
                <p className="text-[11px] text-neutral-800 leading-relaxed font-sans italic">
                  “The assumption of USEIT is that in today's universal social environment all people should be treated equally. They should all be as wired as am I. ... Only then, no one can be exploited. If one chooses to opt out, more power to them. But, no one should be opted out, as is the case for most of our world's people today.”
                </p>
              </div>

              {/* PILLARS GRAPHIC OVERVIEW */}
              <div className="space-y-2">
                <span className="text-[9px] font-mono uppercase text-gray-400 font-bold block">
                  The Five Required Enablers:
                </span>
                <div className="grid grid-cols-1 gap-2 font-mono text-[10px]">
                  
                  <div className="flex items-center justify-between p-2.5 bg-emerald-50 text-emerald-900 rounded-lg border border-emerald-100">
                    <span className="font-bold flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-200 flex items-center justify-center text-[9px] text-emerald-800 font-sans">1</span>
                      Electricity (Ideally Green)
                    </span>
                    <span className="text-[9px] uppercase font-bold text-emerald-700 font-sans">Realistic Today</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-blue-50 text-blue-900 rounded-lg border border-blue-100">
                    <span className="font-bold flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center text-[9px] text-blue-800 font-sans">2</span>
                      Internetworked-Communications
                    </span>
                    <span className="text-[9px] uppercase font-bold text-blue-700 font-sans">Wired & Wireless</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-indigo-50 text-indigo-900 rounded-lg border border-indigo-100">
                    <span className="font-bold flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-indigo-200 flex items-center justify-center text-[9px] text-indigo-800 font-sans">3</span>
                      Standardized IT & App Capabilities
                    </span>
                    <span className="text-[9px] uppercase font-bold text-indigo-700 font-sans">Broad Consensus</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-purple-50 text-purple-900 rounded-lg border border-purple-100">
                    <span className="font-bold flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-purple-200 flex items-center justify-center text-[9px] text-purple-800 font-sans">4</span>
                      InfoMediated Enterprise (I/ME)
                    </span>
                    <span className="text-[9px] uppercase font-bold text-purple-700 font-sans">Sovereign Data</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-amber-50 text-amber-900 rounded-lg border border-amber-100">
                    <span className="font-bold flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center text-[9px] text-amber-800 font-sans">5</span>
                      Neutral InfoMediators & ASPs
                    </span>
                    <span className="text-[9px] uppercase font-bold text-amber-700 font-sans">Decentralized</span>
                  </div>

                </div>
              </div>

              {/* FUNDING LOGIC */}
              <div className="p-4 bg-[#FAF9F6] border border-amber-100 rounded-lg space-y-1.5">
                <span className="text-[9px] font-mono font-bold text-amber-800 uppercase tracking-wider block">Who Pays for This?</span>
                <p className="text-[11px] text-neutral-800 leading-relaxed font-sans italic">
                  “The once exploited, now enterprising tribesmen of the world through their higher productivity and optimized commercial enterprise. Sure, some enterprises, kings and princes will have to share some wealth - there is more than enough global wealth to go around.”
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
