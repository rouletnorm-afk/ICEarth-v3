import React, { useState, useEffect } from 'react';
import { 
  Gavel, 
  Scale, 
  Coins, 
  TrendingUp, 
  CheckCircle2, 
  Activity, 
  ShieldAlert, 
  Users, 
  ArrowRight, 
  Database, 
  Sparkles, 
  RefreshCw, 
  FileDown, 
  BookOpen, 
  AlertCircle, 
  Award,
  Check,
  Lock,
  Link2,
  Shield,
  Search,
  Folder,
  FolderOpen,
  FileText,
  Layers,
  Atom,
  Droplets,
  Building2,
  Sliders
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  Cell 
} from 'recharts';

import { ClevelandLeadAudit } from './ClevelandLeadAudit';
import { ChicagoLeadAudit } from './ChicagoLeadAudit';
import { BuffaloLeadAudit } from './BuffaloLeadAudit';
import { MilwaukeeLeadAudit } from './MilwaukeeLeadAudit';
import { BiharLeadAudit } from './BiharLeadAudit';

interface LitigationCase {
  id: string;
  title: string;
  location: string;
  country: string;
  amountUSD: number;
  amountNative: string;
  status: string;
  defendant: string;
  yearInitiated: number;
  yearResolved: string;
  summary: string;
  consequences: string;
  icearthRole: string;
  externalLink: string;
  toxins: string[];
}

const LITIGATION_CASES: LitigationCase[] = [
  {
    id: "oregon-groundwater",
    title: "Oregon Groundwater Mining Contamination & Roulet's Law Proof",
    location: "Oregon (Willamette Basin)",
    country: "United States 🇺🇸",
    amountUSD: 1250000000,
    amountNative: "$1.25 Billion USD",
    status: "Active Lawsuit / Volcanic Defense Disputed",
    defendant: "Knife River Mining Interests & Joint Pre-historic Formations",
    yearInitiated: 2024,
    yearResolved: "Ongoing (Dispute Phase)",
    summary: "A multi-billion dollar mining group stands accused of severe groundwater lead, arsenic, and cadmium contamination in Oregon. In response, corporate executives assert: 'We absolutely understand wanting to find the source, and the science points to it being volcanic activity that predates all of us,' blaming pre-historic geological formations. Under Roulet's Law, the continuous flow of contamination is attributed to both volcanic background and industrial activity, proving shared responsibility.",
    consequences: "Roulet's Law mathematical formulations bridge the litigation gap. By modeling both pre-existing volcanic background deposits and modern open-pit extraction triggers, the court can bypass the company's 'act of God' volcanic defense. This holds the mining entity responsible for their specific ratio of excavation-induced runoffs.",
    icearthRole: "Bypasses deadlocked public agencies by deploying decentralised, immutable isotopic fingerprinting. High-fidelity sensors log water-table ratios directly to the sovereign blockchain ledger, establishing a continuous chain of custody for chemical data to support victim claims.",
    externalLink: "https://www.opb.org/article/2024/09/24/oregon-knife-river-lead-contamination-lawsuit-volcanic/",
    toxins: ["lead", "arsenic", "cadmium"]
  },
  {
    id: "new-mexico-downwinders",
    title: "New Mexico Downwinders Trinity Exposure Claims",
    location: "Tularosa Basin, New Mexico",
    country: "United States 🇺🇸",
    amountUSD: 2500000000,
    amountNative: "$2.50 Billion USD (RECA Extension)",
    status: "Active Compensation Petitions",
    defendant: "US Department of Energy & Defense Entities",
    yearInitiated: 1945,
    yearResolved: "Ongoing (Compensation Petitions)",
    summary: "Since July 16, 1945, when the world's first atomic bomb was detonated at the Trinity site, families living downwind in New Mexico have suffered from catastrophic, multi-generational cancer clusters and chronic radiation/heavy metal fallout exposure. Denied coverage under the original RECA bill, citizens are utilizing independent geological modeling and isotopic analysis to prove nuclear fallout contamination levels and secure federal payouts.",
    consequences: "ICEarth supports these claims by validating historical meteorological patterns, soil heavy metal and isotope concentrations, and fallout decay data. It aids in preparing claimant packages worth $100,000 for direct federal submission.",
    icearthRole: "Constructs a Decentralized Downwinders Claims Registry. By storing historical soil measurements, local thyroid tumor records, and environmental isotope measurements, the platform provides claimants with tamper-proof statistical proof to submit directly to federal administrators, bypass legal blockades, and secure compensation.",
    externalLink: "https://www.tularosadownwinders.org/",
    toxins: ["radiation", "heavy-metals"]
  },
  {
    id: "los-alamos-legacy",
    title: "Los Alamos National Laboratory Contamination Liability",
    location: "Los Alamos / Rio Grande Basin",
    country: "United States 🇺🇸",
    amountUSD: 1800000000,
    amountNative: "$1.80 Billion USD",
    status: "Superfund Remediation / Active Monitoring",
    defendant: "US Department of Energy & Laboratory Contractors",
    yearInitiated: 1989,
    yearResolved: "Ongoing (Remediation)",
    summary: "Over decades of nuclear weapons research, LANL has released millions of gallons of toxic wastewater containing plutonium, uranium, cadmium, lead, and chromium into the canyons feeding into the Rio Grande. Surrounding Native American Pueblos and downstream farming communities have faced unmonitored chronic toxic exposures, which the defendants claim are partially 'natural' background radiation.",
    consequences: "Under Roulet's Law, the continuous flow of contamination is attributed to both volcanic/geological background and industrial laboratory activity, proving shared responsibility. This provides clear, legally admissible proof to decouple background radionuclides from anthropogenic nuclear waste.",
    icearthRole: "Provides sovereign environmental telemetry logging. Real-time water filters and radiation nodes monitor downstream sediment in the Rio Grande, uploading cryptographically signed isotopic data directly to the ledger to prevent federal or corporate cover-ups.",
    externalLink: "https://www.epa.gov/superfund/los-alamos-national-laboratory",
    toxins: ["radiation", "cadmium", "lead"]
  },
  {
    id: "jupiter-data-center",
    title: "Jupiter Data Center AI Cooling Aquifer Infiltration",
    location: "Jupiter, Florida",
    country: "United States 🇺🇸",
    amountUSD: 420000000,
    amountNative: "$420 Million USD Filing",
    status: "Active Federal Injunction Phase",
    defendant: "Hyperscale Tech Conglomerates & Industrial Water Coolers",
    yearInitiated: 2025,
    yearResolved: "Ongoing (Dispute Phase)",
    summary: "A major tech conglomerate's hyperscale AI data center used closed-loop liquid-cooling systems that leaked highly toxic chemical cocktails, containing heavy metals like cadmium and lead (used in high-performance power chips and solder joints) and arsenic, directly into local municipal shallow aquifers, threatening municipal drinking water.",
    consequences: "Active federal injunction halts expansion pending complete zero-discharge containment. Roulet's Law proves hardware solder erosion and coolant decay vs natural Floridan aquifer mineralisation, ensuring corporate accountability for cleanup costs.",
    icearthRole: "Allows local communities to compile real-time, ZK-signed municipal water testing results. Individual sensors detect heavy metals and fluorinated solvents at household taps, plotting an immutable heat map that overrides official utility denials.",
    externalLink: "https://www.epa.gov/superfund",
    toxins: ["cadmium", "lead", "arsenic", "pfas-solvents"]
  },
  {
    id: "owino-uhuru",
    title: "Owino Uhuru Lead Smelter Judgment",
    location: "Mombasa (Owino Uhuru Slum)",
    country: "Kenya 🇰🇪",
    amountUSD: 15400000,
    amountNative: "Sh2 Billion KES",
    status: "Urgent 7-Day Court Order Issued",
    defendant: "National Environment Management Authority (NEMA) & Metal Smelters",
    yearInitiated: 2016,
    yearResolved: "2026 (Active Mandate)",
    summary: "Since 2016, the residents of the Owino Uhuru informal settlement in Mombasa, Kenya, have battled for justice against severe lead poisoning caused by an unregulated secondary lead-acid battery smelting plant. Smelter tailings and wastewater poisoned the soil and local water tables, resulting in extreme pediatric blood lead levels, neurological damage, and multiple deaths.",
    consequences: "On Monday, the Environment and Land Court in Mombasa ordered NEMA's director-general to personally file a comprehensive, verifiable, and legally-binding commitment plan within 7 days. This affidavit must detail exactly how the Sh2 billion payout will be realized and distributed directly to the long-poisoned victims.",
    icearthRole: "Bypasses slow, highly bureaucratic state structures by deploying decentralized multi-signature trust accounts. Tokens represent cryptographic claims on the Sh2 billion pool, preventing funds from being siphoned off by national agencies, administrative overhead, or localized corruption.",
    externalLink: "https://www.standardmedia.co.ke/crime-and-justice/article/2001552246/court-orders-nema-to-submit-sh2b-payout-plan-for-lead-poisoning-victims",
    toxins: ["lead"]
  },
  {
    id: "la-oroya",
    title: "La Oroya Metallurgical Smelter Settlement",
    location: "La Oroya",
    country: "Peru 🇵🇪",
    amountUSD: 150000000,
    amountNative: "$150 Million USD",
    status: "Special Master Tapped for Oversight",
    defendant: "Doe Run Peru (Billionaire Ira Rennert)",
    yearInitiated: 2007,
    yearResolved: "2026 (Payout Stage)",
    summary: "La Oroya has been labeled one of the most polluted places on Earth due to a massive multi-metal smelting complex owned by Ira Rennert's holdings. Over 97% of children tested in the region had blood lead levels exceeding safe limits, causing severe developmental delays, chronic organ failure, and systemic cognitive damage.",
    consequences: "A Special Master has been officially appointed by the court to oversee the distribution of the $150 million settlement to poisoned Peruvian citizens, ensuring that the billionaire's payout is not intercepted by corporate lawyers or political middlemen.",
    icearthRole: "Integrates with localized bio-exposure logs (blood lead levels registered via zero-knowledge proofs) to directly deliver USDC/EUR stablecoin reparations to families, ensuring high-fidelity payout routing under independent sovereign verification.",
    externalLink: "https://www.law360.com/articles/2497348/special-master-tapped-to-oversee-150m-lead-poisoning-deal",
    toxins: ["lead", "arsenic", "cadmium"]
  },
  {
    id: "flint-water",
    title: "Flint Municipal Water Crisis Settlement",
    location: "Flint (Michigan)",
    country: "United States 🇺🇸",
    amountUSD: 641000000,
    amountNative: "$641 Million USD",
    status: "Judge-Approved Partial Payouts Active",
    defendant: "State of Michigan, City of Flint, & Engineering Consultants",
    yearInitiated: 2015,
    yearResolved: "2026 (Active Payments)",
    summary: "Systemic water-treatment failures and public administrative malpractice occurred when the city's drinking water source was switched to the highly corrosive Flint River, stripping lead from old municipal pipes and poisoning an entire generation of Black and low-income children.",
    consequences: "A federal judge recently approved the initiation of partial compensation payments to the victims of the disaster, following more than a decade of grueling class-action litigation, administrative stall-tactics, and gridlock over victim verification.",
    icearthRole: "Replaces slow paper-based verification with decentralized identity systems. Standard administrative delay of 10+ years is collapsed into real-time validation, putting liquid resources immediately in the hands of families seeking therapy and cognitive assistance.",
    externalLink: "https://www.freep.com/story/news/local/michigan/flint-water-crisis/2026/04/02/flint-lead-poisoning-partial-payments-lawsuit-settlement/89399816007/",
    toxins: ["lead"]
  },
  {
    id: "california-paint",
    title: "California Public Lead Paint Abatement",
    location: "10 California Counties & Cities",
    country: "United States 🇺🇸",
    amountUSD: 305000000,
    amountNative: "$305 Million USD",
    status: "Resolved After 20-Year Battle",
    defendant: "Sherwin-Williams, ConAgra, NL Industries",
    yearInitiated: 2000,
    yearResolved: "2019 (Completed Settlement)",
    summary: "A historic 20-year legal war led by California counties (including Santa Clara, San Francisco, and Los Angeles) to hold corporate paint manufacturers responsible for knowingly selling toxic lead-based paints to the public and neglecting remediation of residential structures.",
    consequences: "In July 2019, Sherwin-Williams and other parties agreed to a $305 million cash settlement designated exclusively for lead paint abatement program funding, directly managed by public health departments across the state.",
    icearthRole: "Demonstrates how block-chained paint-remediation registries (like those modeled in Cleveland and Chicago) can enforce absolute, auditable accountability over county paint abatement projects, linking every dollar spent directly to a physical wall cleared of lead.",
    externalLink: "https://investors.sherwin-williams.com/press-releases/press-release-details/2019/Sherwin-Williams-and-Related-Parties-Agree-to-Resolve-Nearly-20-Year-Old-California-Lead-Litigation/default.aspx",
    toxins: ["lead"]
  },
  {
    id: "broken-hill-settlement",
    title: "Broken Hill Aboriginal Lead Contamination & NSW Remediation Settlement",
    location: "Broken Hill, New South Wales",
    country: "Australia 🇦🇺",
    amountUSD: 24800000,
    amountNative: "$37.00 Million AUD",
    status: "Government Settlement Committed",
    defendant: "New South Wales Government & Historical Mining Consortia",
    yearInitiated: 2025,
    yearResolved: "2026 (Settlement Implemented)",
    summary: "Broken Hill is a historic silver, lead, and zinc mining city with a century-long legacy of heavy-metal smelting. In 2025/2026, severe public health data emerged showing that 56% of Aboriginal children aged 1-5 have blood lead levels exceeding national health investigative guidelines, compared to 35% of children overall. In response, the New South Wales government committed $37 Million AUD to double residential home remediations, expand ongoing blood surveillance, and clean contaminated play corridors.",
    consequences: "The settlement commits $37M AUD toward immediate remediation of contaminated soil, yard clean-ups, home paint scraping, and pediatric testing programs. Under Roulet's Law, capturing lead-dust triggers and sealing the exposome is the only path to halt the prefrontal gray matter loss and multi-generational HPA-axis stress observed in the local pediatric population.",
    icearthRole: "Acts as a sovereign verification ledger for the remediation progress. Local members upload post-remediation soil samples and air particulate logs, securing independent cryptographic proof of lead-level drops, and certifying clean, rehabilitated homes on the blockchain.",
    externalLink: "https://www.abc.net.au/news/2026-07-11/aboriginal-children-broken-hill-lead-exposure-blood-levels/106898130",
    toxins: ["lead"]
  },
  {
    id: "big-lead-cgd-corruption",
    title: "Big Lead Science Betrayal: CGD Rebuttal to International Lead Association (ILA) & Needleman Crimes",
    location: "Global (Center for Global Development / Environmental Pollution)",
    country: "Global 🌐",
    amountUSD: 140000000000,
    amountNative: "$140 Billion USD (Global Health Burden)",
    status: "Published Rebuttal & Scientific Expose",
    defendant: "International Lead Association (ILA), Sherwin-Williams (Dutch Boy), & Jones Day Legal Strategy",
    yearInitiated: 1979,
    yearResolved: "2026 (Active Expose)",
    summary: "Researchers Lee Crawfurd, Theo Mitchell, and James Hu from the Center for Global Development (CGD) published a landmark paper in Environmental Pollution proving that informal battery recycling accounts for 1/3 of global lead exposure. In response, International Lead Association (ILA) consultants (Schoof et al.) published pushback claims. CGD dismantled ILA's claims, showing quasi-experimental causal studies (Berkhout 2025, Ipapa 2023, Litzow 2024, Kundu 2024, Tanaka 2022, Aizer 2023, Reyes 2015) proving battery smelter harms extend 1km-10km and low-level exposure causes cognitive damage with no safe threshold. This follows a century-long playbook from Dutch Boy Paints (Sherwin-Williams) marketing lead paint to children and Jones Day's decade-long legal smear campaign against pioneer researcher Dr. Herbert Needleman.",
    consequences: "Roulet's Law demonstrates that corporate science corruption actively maintains 1/3 of Earth in a lead-poisoned state, driving population-level prefrontal cortex atrophy, impulsivity, and violent crime while industry consultants protect corporate profits.",
    icearthRole: "Replaces corporate-dominated scientific channels with immutable blockchain environmental telemetry and Zero-Knowledge Proof (ZKP) medical verification, eliminating scientific corruption and unlocking escrowed remediation capital.",
    externalLink: "https://www.cgdev.org/blog/big-lead-still-downplaying-harms-lead-poisoning",
    toxins: ["lead"]
  },
  {
    id: "drc-genocost-lead-genocide",
    title: "DRC Genocost & Anthropogenic Lead Genocide: UN Article II Resource Exploitation Reparations",
    location: "Democratic Republic of the Congo (DRC) & Global Mineral Supply Chains",
    country: "DRC 🇨🇩 / Global 🌐",
    amountUSD: 1200000000000,
    amountNative: "$1.20 Trillion USD (DRC Resource & Neurological Reparations Claim)",
    status: "Official DRC Law & UN Genocide Claim",
    defendant: "Multinational Mining Consortia, Lead Smelter Cartels, & Unregulated Supply Chain Brokers",
    yearInitiated: 1998,
    yearResolved: "2026 (Genocost Day Commemoration & Sovereign Ledger)",
    summary: "Established under Congolese Law in December 2022 and commemorated annually on August 2, Genocost ('Genocide' + 'Cost') honors millions of victims of resource exploitation, armed conflict, and toxic heavy metal saturation in eastern DRC and mining belts like Kabwe. Under Roulet's Law, maintaining lead poisoning across 1/3 of Earth's children while extracting hundreds of billions in mineral wealth meets UN Genocide Convention Article II(b) and (c) ('causing serious mental harm' and 'inflicting conditions calculated to bring about physical destruction').",
    consequences: "Roulet's Law establishes that resource extraction without environmental remediation escrow constitutes deliberate systemic genocide. Extracted profits must be redirected into tokenized remediation escrows to restore soil and water baseline to Homo Sapiens 0 (0.016 μg/dL).",
    icearthRole: "Deploys immutable sensor ledgers and ZK-proof medical vaults directly across mining corridors, establishing cryptographically verified legal causality for international tribunals and executing automated smart-contract escrow releases.",
    externalLink: "https://theconversation.com/what-is-genocost-understanding-congos-new-language-of-remembrance-and-justice-286987",
    toxins: ["lead"]
  }
];

const MUNICIPAL_AUDITS = [
  { id: 'cleveland', name: 'Cuyahoga / Cleveland Lead Audit', country: 'United States 🇺🇸', icon: '⚖️', toxins: ['lead'] },
  { id: 'chicago', name: 'Chicago Lead Service Line Crisis', country: 'United States 🇺🇸', icon: '🚨', toxins: ['lead'] },
  { id: 'buffalo', name: 'Buffalo Lead Audit Case Study', country: 'United States 🇺🇸', icon: '💧', toxins: ['lead'] },
  { id: 'milwaukee', name: 'Milwaukee Lead Crisis Audit', country: 'United States 🇺🇸', icon: '🦌', toxins: ['lead'] },
  { id: 'bihar', name: 'Bihar Lead Crisis Audit', country: 'India 🇮🇳', icon: '🇮🇳', toxins: ['lead'] }
];

interface LitigationLedgerProps {
  onNavigateTab?: (tab: string) => void;
}

export const LitigationLedger: React.FC<LitigationLedgerProps> = ({ onNavigateTab }) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>("oregon-groundwater");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeToxinFilter, setActiveToxinFilter] = useState<string>("all");
  
  // Collapse States for Directory folders
  const [classActionsOpen, setClassActionsOpen] = useState<boolean>(true);
  const [municipalAuditsOpen, setMunicipalAuditsOpen] = useState<boolean>(true);

  // Find the selected Class Action (if any)
  const currentCase = LITIGATION_CASES.find(c => c.id === selectedCaseId);
  const isMunicipalAuditSelected = MUNICIPAL_AUDITS.some(m => m.id === selectedCaseId);

  // Simulation States (for Class Actions)
  const [settlementAmount, setSettlementAmount] = useState<number>(1250000000);
  const [victimCount, setVictimCount] = useState<number>(28000);
  const [legalFeesPct, setLegalFeesPct] = useState<number>(33);
  const [adminOverheadPct, setAdminOverheadPct] = useState<number>(12);
  const [corruptionLeakPct, setCorruptionLeakPct] = useState<number>(8);
  const [isSimSync, setIsSimSync] = useState<boolean>(true);

  // Sync simulator to chosen case if currentCase changes
  useEffect(() => {
    if (isSimSync && currentCase) {
      setSettlementAmount(currentCase.amountUSD);
      if (currentCase.id === 'owino-uhuru') {
        setVictimCount(4500);
      } else if (currentCase.id === 'la-oroya') {
        setVictimCount(18000);
      } else if (currentCase.id === 'flint-water') {
        setVictimCount(32000);
      } else if (currentCase.id === 'oregon-groundwater') {
        setVictimCount(28000);
      } else if (currentCase.id === 'new-mexico-downwinders') {
        setVictimCount(55000);
      } else if (currentCase.id === 'los-alamos-legacy') {
        setVictimCount(38000);
      } else if (currentCase.id === 'jupiter-data-center') {
        setVictimCount(15000);
      } else if (currentCase.id === 'broken-hill-settlement') {
        setVictimCount(1800);
      } else {
        setVictimCount(25000);
      }
    }
  }, [selectedCaseId, isSimSync, currentCase]);

  // Calculations for simulator
  const traditionalTotalLossPct = legalFeesPct + adminOverheadPct + corruptionLeakPct;
  const traditionalPayoutPct = Math.max(0, 100 - traditionalTotalLossPct);
  
  const blockchainTotalLossPct = 1.5; // Fixed network fee
  const blockchainPayoutPct = 98.5;

  const traditionalTotalDistribution = (settlementAmount * traditionalPayoutPct) / 100;
  const blockchainTotalDistribution = (settlementAmount * blockchainPayoutPct) / 100;

  const traditionalPerVictim = traditionalTotalDistribution / victimCount;
  const blockchainPerVictim = blockchainTotalDistribution / victimCount;

  const savingsToVictimsCount = blockchainTotalDistribution - traditionalTotalDistribution;

  // Chart Data
  const chartData = [
    {
      name: 'Payout Efficiency (%)',
      Traditional: traditionalPayoutPct,
      ICEarth_Blockchain: blockchainPayoutPct,
    },
    {
      name: 'Total Payout ($M)',
      Traditional: Math.round(traditionalTotalDistribution / 1000000 * 100) / 100,
      ICEarth_Blockchain: Math.round(blockchainTotalDistribution / 1000000 * 100) / 100,
    },
    {
      name: 'Per-Victim Share ($)',
      Traditional: Math.round(traditionalPerVictim),
      ICEarth_Blockchain: Math.round(blockchainPerVictim),
    }
  ];

  // Filtering Logic
  const matchesSearch = (text: string) => text.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesToxin = (toxins: string[]) => {
    if (activeToxinFilter === "all") return true;
    if (activeToxinFilter === "lead") return toxins.includes("lead");
    if (activeToxinFilter === "radiation") return toxins.includes("radiation");
    if (activeToxinFilter === "arsenic-cadmium") return toxins.includes("arsenic") || toxins.includes("cadmium");
    if (activeToxinFilter === "pfas") return toxins.includes("pfas-solvents");
    return true;
  };

  const filteredClassActions = LITIGATION_CASES.filter(c => 
    (matchesSearch(c.title) || matchesSearch(c.location) || matchesSearch(c.defendant)) && matchesToxin(c.toxins)
  );

  const filteredMunicipalAudits = MUNICIPAL_AUDITS.filter(m => 
    matchesSearch(m.name) && matchesToxin(m.toxins)
  );

  return (
    <div id="litigation-ledger-container" className="space-y-8 animate-fade-in">
      
      {/* HEADER HERO */}
      <div className="bg-gradient-to-r from-purple-950 via-neutral-900 to-slate-900 text-white p-8 rounded-2xl border border-purple-800/40 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute left-1/4 bottom-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="space-y-4 max-w-4xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/20 text-purple-200 border border-purple-400/30 font-mono text-[10px] uppercase tracking-widest font-extrabold rounded-full shadow-sm">
            <Gavel size={12} className="text-purple-300" />
            <span>Sovereign Fiscal Management & Environmental Justice</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-light tracking-tight text-white">
            Environmental Litigation Profiler
          </h2>
          <p className="text-xs md:text-sm text-neutral-300 font-sans leading-relaxed max-w-3xl">
            Toxic exposures impose biological debt upon vulnerable populations. This profiler maps litigation settlements, toxic class actions, and municipal audits across neurotoxins (including lead, arsenic, cadmium, radiation, and solvents). By integrating **ICEarth cryptographic ledgers**, we bypass middleman extraction to route capital reparations directly to impacted communities with complete proof.
          </p>
        </div>
      </div>

      {/* THREE-COLUMN SUMMARY BANNER */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 border border-gray-100 rounded-xl shadow-xs space-y-2">
          <div className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">Total Tracked Damages</div>
          <div className="text-3xl font-mono font-bold text-neutral-900">$9.54 Billion+</div>
          <p className="text-[11px] text-gray-500 leading-normal">
            Aggregated funds mandated across active litigation, nuclear downwinder claims, and legacy metal contamination class actions.
          </p>
        </div>
        
        <div className="bg-white p-6 border border-gray-100 rounded-xl shadow-xs space-y-2">
          <div className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">Traditional Escrow Losses</div>
          <div className="text-3xl font-mono font-bold text-red-600">45% to 60% siphoned</div>
          <p className="text-[11px] text-gray-500 leading-normal">
            Average fraction of settlements absorbed by legal contingencies, escrow firms, and administrative overhead before reaching households.
          </p>
        </div>

        <div className="bg-white p-6 border border-purple-200 bg-purple-50/5 rounded-xl shadow-xs space-y-2">
          <div className="text-[10px] font-mono font-bold text-purple-800 uppercase tracking-wider">ICEarth Routing Efficiency</div>
          <div className="text-3xl font-mono font-bold text-emerald-600">98.5% Net Payout</div>
          <p className="text-[11px] text-gray-500 leading-normal">
            Direct cryptographic payout structures that slash administrative leakages to deliver the maximum compensation directly to families.
          </p>
        </div>
      </div>

      {/* CORE AREA: WORKSPACE WITH DIRECTORY AND DISPLAY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: ENVIRONMENTAL CASE STUDIES DIRECTORY (4 Cols of 12) */}
        <div className="lg:col-span-4 bg-white p-5 border border-gray-200 rounded-2xl shadow-xs space-y-6">
          <div className="space-y-2">
            <h3 className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest">
              Sovereign Docket Explorer
            </h3>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search cases, locations, toxins..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-xs font-sans focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Toxin Filter Pills */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase text-gray-400 block font-bold">Filter By Primary Toxin</span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setActiveToxinFilter("all")}
                className={`px-2.5 py-1 text-[10px] font-mono rounded-md font-semibold transition-colors cursor-pointer ${
                  activeToxinFilter === "all"
                    ? "bg-neutral-900 text-white"
                    : "bg-gray-100 text-neutral-600 hover:bg-gray-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveToxinFilter("lead")}
                className={`px-2.5 py-1 text-[10px] font-mono rounded-md font-semibold transition-colors cursor-pointer ${
                  activeToxinFilter === "lead"
                    ? "bg-purple-900 text-white"
                    : "bg-purple-50 text-purple-700 hover:bg-purple-100"
                }`}
              >
                Lead (Pb)
              </button>
              <button
                onClick={() => setActiveToxinFilter("radiation")}
                className={`px-2.5 py-1 text-[10px] font-mono rounded-md font-semibold transition-colors cursor-pointer ${
                  activeToxinFilter === "radiation"
                    ? "bg-amber-900 text-white"
                    : "bg-amber-50/50 text-amber-800 hover:bg-amber-100/50"
                }`}
              >
                Radiation ☢️
              </button>
              <button
                onClick={() => setActiveToxinFilter("arsenic-cadmium")}
                className={`px-2.5 py-1 text-[10px] font-mono rounded-md font-semibold transition-colors cursor-pointer ${
                  activeToxinFilter === "arsenic-cadmium"
                    ? "bg-rose-900 text-white"
                    : "bg-rose-50 text-rose-700 hover:bg-rose-100"
                }`}
              >
                As / Cd
              </button>
              <button
                onClick={() => setActiveToxinFilter("pfas")}
                className={`px-2.5 py-1 text-[10px] font-mono rounded-md font-semibold transition-colors cursor-pointer ${
                  activeToxinFilter === "pfas"
                    ? "bg-cyan-950 text-white"
                    : "bg-cyan-50 text-cyan-800 hover:bg-cyan-100"
                }`}
              >
                PFAS/Coolants
              </button>
            </div>
          </div>

          <div className="border-t border-gray-100"></div>

          {/* Directory Folder List */}
          <div className="space-y-4">
            
            {/* Folder 1: Toxic Class Actions */}
            <div className="space-y-1">
              <button
                onClick={() => setClassActionsOpen(!classActionsOpen)}
                className="w-full flex items-center gap-2 text-left text-xs font-bold text-neutral-800 hover:text-purple-700 transition-colors py-1 cursor-pointer"
              >
                {classActionsOpen ? <FolderOpen size={14} className="text-purple-600" /> : <Folder size={14} className="text-purple-400" />}
                <span className="flex-1">⚖️ Landmark Toxic Class Actions</span>
                <span className="text-[9px] font-mono bg-purple-50 text-purple-700 px-1.5 py-0.2 rounded font-bold">
                  {filteredClassActions.length}
                </span>
              </button>
              
              {classActionsOpen && (
                <div className="pl-4 border-l border-dashed border-purple-200/50 space-y-1 mt-1">
                  {filteredClassActions.length === 0 ? (
                    <div className="text-[11px] text-gray-400 italic py-1">No matching cases</div>
                  ) : (
                    filteredClassActions.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedCaseId(c.id)}
                        className={`w-full flex items-start gap-2 text-left text-[11px] p-2 rounded-lg transition-colors cursor-pointer ${
                          selectedCaseId === c.id
                            ? 'bg-purple-950 text-white font-bold shadow-xs'
                            : 'text-neutral-600 hover:bg-gray-50 hover:text-neutral-900'
                        }`}
                      >
                        <FileText size={12} className={`mt-0.5 shrink-0 ${selectedCaseId === c.id ? 'text-purple-300' : 'text-gray-400'}`} />
                        <div className="flex-1">
                          <div className="font-semibold line-clamp-1">{c.title}</div>
                          <div className={`text-[9px] font-mono ${selectedCaseId === c.id ? 'text-purple-200' : 'text-gray-400'}`}>
                            {c.location} &bull; {c.amountNative}
                          </div>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Folder 2: Municipal Lead Crisis Audits */}
            <div className="space-y-1">
              <button
                onClick={() => setMunicipalAuditsOpen(!municipalAuditsOpen)}
                className="w-full flex items-center gap-2 text-left text-xs font-bold text-neutral-800 hover:text-purple-700 transition-colors py-1 cursor-pointer"
              >
                {municipalAuditsOpen ? <FolderOpen size={14} className="text-indigo-600" /> : <Folder size={14} className="text-indigo-400" />}
                <span className="flex-1">🏛️ Municipal Lead Crisis Audits</span>
                <span className="text-[9px] font-mono bg-indigo-50 text-indigo-700 px-1.5 py-0.2 rounded font-bold">
                  {filteredMunicipalAudits.length}
                </span>
              </button>
              
              {municipalAuditsOpen && (
                <div className="pl-4 border-l border-dashed border-indigo-200/50 space-y-1 mt-1">
                  {filteredMunicipalAudits.length === 0 ? (
                    <div className="text-[11px] text-gray-400 italic py-1">No matching audits</div>
                  ) : (
                    filteredMunicipalAudits.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setSelectedCaseId(m.id)}
                        className={`w-full flex items-start gap-2 text-left text-[11px] p-2 rounded-lg transition-colors cursor-pointer ${
                          selectedCaseId === m.id
                            ? 'bg-indigo-950 text-white font-bold shadow-xs'
                            : 'text-neutral-600 hover:bg-gray-50 hover:text-neutral-900'
                        }`}
                      >
                        <Layers size={12} className={`mt-0.5 shrink-0 ${selectedCaseId === m.id ? 'text-indigo-300' : 'text-gray-400'}`} />
                        <div className="flex-1">
                          <div className="font-semibold line-clamp-1">{m.name}</div>
                          <div className={`text-[9px] font-mono ${selectedCaseId === m.id ? 'text-indigo-200' : 'text-gray-400'}`}>
                            {m.country} &bull; Live Audit
                          </div>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: ACTIVE CASE WORKSPACE (8 Cols of 12) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* RENDER CASE STUDY WORKSPACE */}
          {currentCase && (
            <div className="space-y-6">
              
              {/* Case Visual Detail Panel */}
              <div className="bg-white p-6 border border-gray-200 rounded-2xl space-y-5">
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4 border-gray-100">
                  <div className="space-y-1">
                    <div className="text-[10px] font-mono font-bold text-purple-800 uppercase tracking-wider flex items-center gap-1">
                      <Activity size={10} />
                      <span>{currentCase.location} &bull; {currentCase.country}</span>
                    </div>
                    <h4 className="text-xl font-serif text-neutral-900">{currentCase.title}</h4>
                  </div>
                  <div className="text-right shrink-0 bg-neutral-50 border px-4 py-2 rounded-xl shadow-xs">
                    <div className="text-lg font-mono font-extrabold text-neutral-950 tracking-tight">
                      {currentCase.amountNative}
                    </div>
                    <div className="text-[9px] font-mono uppercase text-gray-500 font-bold">
                      Settlement Fund Pool
                    </div>
                  </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase text-gray-400 block font-bold">Primary Defendant</span>
                    <p className="text-neutral-800 font-semibold">{currentCase.defendant}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase text-gray-400 block font-bold">Litigation Timeline</span>
                    <p className="text-neutral-800 font-semibold">Initiated {currentCase.yearInitiated} &bull; Resolved {currentCase.yearResolved}</p>
                  </div>
                </div>

                {/* Narrative Summary */}
                <div className="space-y-2 text-xs leading-relaxed font-sans">
                  <span className="text-[10px] font-mono uppercase text-gray-400 block font-bold">Case Background & Poisoning Event</span>
                  <p className="text-[#333] leading-relaxed">
                    {currentCase.summary}
                  </p>
                </div>

                {/* Tuesday / Wednesday / Monday Judicial Enforcements */}
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg space-y-2 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-amber-900 uppercase tracking-tight text-[11px]">
                    <AlertCircle size={14} className="text-amber-700 shrink-0" />
                    <span>Judicial Decree & Enforcement Status</span>
                  </div>
                  <p className="text-amber-950 leading-relaxed text-[11px]">
                    {currentCase.consequences}
                  </p>
                </div>

                {/* ICEarth Decentralized Resolution Solution */}
                <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-lg space-y-2 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-800 uppercase tracking-tight text-[11px]">
                    <Database size={14} className="text-emerald-700 shrink-0" />
                    <span>ICEarth Sovereign Ledger System Deployment</span>
                  </div>
                  <p className="text-emerald-950 leading-relaxed text-[11px]">
                    {currentCase.icearthRole}
                  </p>
                </div>

                {/* Live Link Button */}
                <div className="pt-2 flex justify-end">
                  <a 
                    href={currentCase.externalLink} 
                    target="_blank" 
                    referrerPolicy="no-referrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono uppercase font-bold text-neutral-700 bg-white border border-gray-200 hover:bg-gray-100 rounded-lg transition-colors shadow-xs cursor-pointer"
                  >
                    <Link2 size={12} />
                    <span>View Scientific & Legal Records</span>
                  </a>
                </div>

              </div>

              {/* TWO COLUMN LOWER: SIMULATOR & SOCRATIC DETAILS */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* SOCRATIC PHILOSOPHY DETAILS */}
                <div className="lg:col-span-5 bg-white p-5 border border-gray-200 rounded-2xl space-y-4">
                  <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-2">
                    <BookOpen size={14} className="text-purple-500" />
                    <span>Epistemology of Restitution</span>
                  </h3>
                  <div className="space-y-3 text-xs leading-relaxed font-sans text-neutral-600">
                    <p className="text-[#555] text-[11px] leading-relaxed">
                      <strong>The Socratic Resolution:</strong> Socratic philosophy demands escaping the regulatory caves where paper promises are shown on walls. Litigated pools like Mombasa's KES 2B are often locked inside state custody. Direct blockchain verification provides mathematical clarity and delivers immediate relief into actual hands.
                    </p>
                    <p className="text-[#555] text-[11px] leading-relaxed">
                      <strong>German Historical School:</strong> This economic theory teaches that remediation cannot use sterile, identical mathematical models. Exposenomics and BLL damage vary based on geological backgrounds and tribal contexts.
                    </p>
                    <p className="text-[#555] text-[11px] leading-relaxed">
                      <strong>The ICEarth Creed:</strong> Having visited over 50 countries, our founders designed ICEarth in New Mexico with Native tribal guidance to enforce the fundamental tenet **"Water Is Life" (Mni Wiconi)** directly onto immutable records.
                    </p>
                  </div>
                </div>

                {/* RESTITUTION SIMULATOR */}
                <div className="lg:col-span-7 bg-white p-5 border border-purple-200/80 rounded-2xl space-y-5 shadow-xs">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-purple-50 border border-purple-200 text-purple-900 font-mono text-[9px] uppercase tracking-wider font-extrabold rounded-md">
                      <Sliders size={10} />
                      <span>RESTITUTION MODELER v2.1</span>
                    </div>
                    <h3 className="text-sm font-bold text-neutral-900">
                      Cryptographic Distribution Simulator
                    </h3>
                  </div>

                  {/* PRESENTS & SYNC CONTROL */}
                  <div className="p-3.5 bg-neutral-50 rounded-xl space-y-2.5 border border-gray-200/60">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase text-gray-500 font-bold">Sync to Case Pool</span>
                      <button
                        onClick={() => setIsSimSync(!isSimSync)}
                        className={`px-2 py-0.5 text-[8px] font-mono font-bold rounded cursor-pointer transition-colors ${
                          isSimSync 
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                            : 'bg-gray-200 text-gray-600 border border-gray-300'
                        }`}
                      >
                        {isSimSync ? "LOCKED" : "CUSTOMIZABLE"}
                      </button>
                    </div>
                    
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono uppercase text-gray-400 block font-bold font-mono">Settlement Pool (USD)</span>
                      {isSimSync ? (
                        <div className="text-sm font-mono font-bold text-neutral-900">
                          ${settlementAmount.toLocaleString()}
                        </div>
                      ) : (
                        <input 
                          type="range" 
                          min={1000000} 
                          max={3000000000} 
                          step={5000000}
                          value={settlementAmount}
                          onChange={(e) => setSettlementAmount(parseInt(e.target.value))}
                          className="w-full accent-purple-600 cursor-pointer"
                        />
                      )}
                    </div>
                  </div>

                  {/* SLIDERS Box */}
                  <div className="space-y-3 text-xs">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-mono font-bold text-gray-600 uppercase">
                        <span>Victim Count / Households</span>
                        <span className="text-neutral-950">{victimCount.toLocaleString()} families</span>
                      </div>
                      <input 
                        type="range" 
                        min={500} 
                        max={100000} 
                        step={500}
                        value={victimCount}
                        onChange={(e) => setVictimCount(parseInt(e.target.value))}
                        className="w-full accent-purple-600 cursor-pointer"
                      />
                    </div>

                    <div className="border-t border-dashed my-2 border-gray-200"></div>

                    <div className="space-y-2">
                      <h4 className="text-[9px] font-mono font-bold text-red-500 uppercase tracking-wider">Traditional Escrow Overhead</h4>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-mono text-gray-600">
                          <span>Legal contingency fees</span>
                          <span className="text-red-600 font-bold">{legalFeesPct}%</span>
                        </div>
                        <input 
                          type="range" 
                          min={10} 
                          max={45} 
                          step={1}
                          value={legalFeesPct}
                          onChange={(e) => setLegalFeesPct(parseInt(e.target.value))}
                          className="w-full accent-red-500 cursor-pointer h-1"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-mono text-gray-600">
                          <span>Administrative Intermediary overhead</span>
                          <span className="text-red-600 font-bold">{adminOverheadPct}%</span>
                        </div>
                        <input 
                          type="range" 
                          min={5} 
                          max={25} 
                          step={1}
                          value={adminOverheadPct}
                          onChange={(e) => setAdminOverheadPct(parseInt(e.target.value))}
                          className="w-full accent-red-500 cursor-pointer h-1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* NET IMPACT OUTPUTS */}
                  <div className="p-4 bg-neutral-900 text-white rounded-xl space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="border-r border-neutral-800">
                        <span className="text-[9px] font-mono text-gray-400 uppercase font-bold block">Traditional System</span>
                        <div className="text-lg font-mono font-extrabold text-red-400">
                          ${Math.round(traditionalPerVictim).toLocaleString()}
                        </div>
                        <span className="text-[9px] text-gray-500 block">per household average</span>
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-emerald-400 uppercase font-bold block">ICEarth Smart Contracts</span>
                        <div className="text-lg font-mono font-extrabold text-emerald-400">
                          ${Math.round(blockchainPerVictim).toLocaleString()}
                        </div>
                        <span className="text-[9px] text-emerald-500 block">per household average</span>
                      </div>
                    </div>

                    <div className="border-t border-neutral-800 pt-2.5 text-center">
                      <span className="text-[9px] font-mono text-gray-400 block">Net Reparations Loss Saved & Delivered</span>
                      <div className="text-lg font-mono font-bold text-amber-400">
                        +${Math.round(savingsToVictimsCount).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* CHART */}
                  <div className="h-[140px] w-full bg-neutral-50 p-2.5 rounded-xl border border-gray-200">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EBEBEB" />
                        <XAxis dataKey="name" stroke="#888888" fontSize={9} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888888" fontSize={9} tickLine={false} axisLine={false} />
                        <Tooltip formatter={(value) => typeof value === 'number' ? value.toLocaleString() : value} />
                        <Bar dataKey="Traditional" fill="#EF4444" radius={[3, 3, 0, 0]} />
                        <Bar dataKey="ICEarth_Blockchain" fill="#10B981" radius={[3, 3, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* RENDER MUNICIPAL CRISIS AUDITS */}
          {isMunicipalAuditSelected && (
            <div className="space-y-6">
              
              {/* Directory Banner Header */}
              <div className="bg-white p-5 border border-indigo-100 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-[9px] font-mono font-bold text-indigo-700 uppercase tracking-widest flex items-center gap-1">
                    <Shield size={10} className="text-indigo-500" />
                    <span>ICEarth Integrated Audit Database &bull; Active Registry</span>
                  </div>
                  <h3 className="text-lg font-serif text-neutral-900">
                    Exploring Inline: {MUNICIPAL_AUDITS.find(m => m.id === selectedCaseId)?.name}
                  </h3>
                  <p className="text-xs text-neutral-500 font-sans leading-normal">
                    You are viewing a dedicated environmental exposure audit. Its metrics are anchored directly to soil-load, water-piping registries, and demographic datasets.
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCaseId("oregon-groundwater")}
                  className="px-3 py-1.5 bg-neutral-50 border hover:bg-neutral-100 text-neutral-700 text-[10px] font-mono rounded-lg transition-colors shrink-0 cursor-pointer"
                >
                  &larr; BACK TO CASE LIST
                </button>
              </div>

              {/* RENDER COMPONENTS */}
              <div className="bg-neutral-50/50 rounded-2xl overflow-hidden border border-gray-100">
                {selectedCaseId === 'cleveland' && <ClevelandLeadAudit />}
                {selectedCaseId === 'chicago' && <ChicagoLeadAudit />}
                {selectedCaseId === 'buffalo' && <BuffaloLeadAudit />}
                {selectedCaseId === 'milwaukee' && <MilwaukeeLeadAudit />}
                {selectedCaseId === 'bihar' && (
                  <div className="bg-white p-6 rounded-2xl border">
                    <BiharLeadAudit onNavigateTab={onNavigateTab} />
                  </div>
                )}
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};
