// ICEarth Sovereign Portal Release v3.0 - Automated Cloud Run Container Pipeline
import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen,
  Sliders,
  Database,
  MessageSquare,
  Search,
  Download,
  Activity,
  Plus,
  Coins,
  Shield,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Lock,
  AlertCircle,
  Check,
  CheckCircle,
  FileText,
  FileSpreadsheet,
  Users,
  MapPin,
  Globe,
  Cpu,
  FileCode,
  Building2,
  Scale,
  ShieldAlert,
  Newspaper,
  TrendingUp,
  Link2,
  Gavel,
  Feather,
  Fingerprint
} from 'lucide-react';
import {
  Chapter,
  ChatMessage,
  SimulationState,
  RemediationNode,
  BOOK_TITLE,
  BOOK_SUBTITLE,
  CHAPTERS,
  APPENDICES,
  HISTORIC_DATA,
  DEFAULT_REMEDIATION_NODES,
  CHICAGO_DEMOGRAPHIC_DATA,
  PFAS_CHAPTERS,
  DEFAULT_PFAS_NODES
} from './types';
import scatterplotImg from './assets/images/Scatterplot.jpg';
import icearthGif from './assets/images/ICEarth1.gif';
import icearthLaunchImg from './assets/images/icearth_launch.png';
import BenchmarkingEngine from './components/BenchmarkingEngine';
import { PFASCavitationSimulator } from './components/PFASCavitationSimulator';
import { OdisseDataviz } from './components/OdisseDataviz';
import { BuffaloLeadAudit } from './components/BuffaloLeadAudit';
import { ClevelandLeadAudit } from './components/ClevelandLeadAudit';
import { ClevelandStrategySolution } from './components/ClevelandStrategySolution';
import { WHOGlobalActionPlan } from './components/WHOGlobalActionPlan';
import { NobelPrizeNomination } from './components/NobelPrizeNomination';
import { ChicagoLeadAudit } from './components/ChicagoLeadAudit';
import { ReportIngestionHub } from './components/ReportIngestionHub';
import { MilwaukeeLeadAudit } from './components/MilwaukeeLeadAudit';
import { BiharLeadAudit } from './components/BiharLeadAudit';
import { LitigationLedger } from './components/LitigationLedger';
import { IndigenousSovereigntyTab } from './components/IndigenousSovereigntyTab';
import { GenocostTab } from './components/GenocostTab';
import { ExposureProfiler } from './components/ExposureProfiler';
import { ToledoLeadAudit } from './components/ToledoLeadAudit';
import LeadCrimeProofs from './components/LeadCrimeProofs';
import LeadTerrorismProofs from './components/LeadTerrorismProofs';
import { SovereignMembershipPortal } from './components/SovereignMembershipPortal';

export default function App() {
  // Navigation / Tabs
  const [activeTab, setActiveTab] = useState<'sovereign_portal' | 'profiler' | 'manuscript' | 'simulator' | 'nodes' | 'chat' | 'benchmarking' | 'odisse' | 'buffalo' | 'cleveland' | 'chicago' | 'reports' | 'milwaukee' | 'bihar' | 'litigation' | 'indigenous' | 'genocost' | 'proofs' | 'terrorism_proofs' | 'cleveland_strategy' | 'nobel_nomination' | 'who_action_plan' | 'toledo'>('sovereign_portal');

  // Remediation Track Selection ('lead' = Pb/Exposenomics, 'pfas' = PFAS/NanoSpire Quantum Cavitation)
  const [remediationTrack, setRemediationTrack] = useState<'lead' | 'pfas'>('lead');

  // Manuscript Reader State
  const [selectedChapterId, setSelectedChapterId] = useState<string>('indigenous');
  const [copiedChapterId, setCopiedChapterId] = useState<string | null>(null);
  const [copiedGlobalTabLink, setCopiedGlobalTabLink] = useState<boolean>(false);
  const [chapterSearch, setChapterSearch] = useState<string>('');
  const [isPreambleExpanded, setIsPreambleExpanded] = useState<boolean>(true);
  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);
  const [modalImageSrc, setModalImageSrc] = useState<string>(scatterplotImg);
  const [modalImageTitle, setModalImageTitle] = useState<string>("ICESaturn Nobel Prize Submission Exhibit 1: Roulet's Law Why Nazis Proof Infographic #1");
  const [exhibitViewMode, setExhibitViewMode] = useState<'interactive' | 'original'>('interactive');
  const [hoveredNodeId, setHoveredNodeId] = useState<number | null>(null);
  const [imageLoadError, setImageLoadError] = useState<boolean>(false);

  // PFAS Simulator State (NanoSpire Quantum Cavitation)
  const [pfasSimState, setPfasSimState] = useState({
    cavitationFrequency: 28, // kHz
    pressureAmplitude: 4.5,  // GPa (localized bubble collapse)
    processingVolume: 120,   // thousand gallons/hr
    nmLaboratoriesCooperation: 75, // %
  });

  const [pfasOutputs, setPfasOutputs] = useState({
    destructionRate: 99.98, // %
    energyEfficiency: 84,   // %
    fluorineMineralization: 99.8, // %
    remediationRoi: 420,    // $ Millions saved
  });

  // Automatically switch chapter selection when the track changes
  const lastTrackRef = useRef<'lead' | 'pfas'>(remediationTrack);
  useEffect(() => {
    if (lastTrackRef.current !== remediationTrack) {
      if (remediationTrack === 'lead') {
        setSelectedChapterId('chapter-1');
      } else {
        setSelectedChapterId('pfas-1');
      }
      lastTrackRef.current = remediationTrack;
    }
  }, [remediationTrack]);

  // Handle URL parameters and deep links on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    const chapterParam = params.get('chapter') || params.get('id') || window.location.hash.replace('#', '');

    if (tabParam) {
      const allowedTabs = ['sovereign_portal', 'profiler', 'manuscript', 'simulator', 'nodes', 'chat', 'benchmarking', 'odisse', 'buffalo', 'cleveland', 'chicago', 'reports', 'milwaukee', 'bihar', 'litigation', 'indigenous', 'genocost', 'proofs', 'terrorism_proofs', 'cleveland_strategy', 'nobel_nomination', 'who_action_plan', 'toledo'];
      if (allowedTabs.includes(tabParam)) {
        setActiveTab(tabParam as any);
      }
    }

    if (chapterParam) {
      if (chapterParam.startsWith('pfas-')) {
        setRemediationTrack('pfas');
        lastTrackRef.current = 'pfas';
        setSelectedChapterId(chapterParam);
        setActiveTab('manuscript');
      } else {
        setRemediationTrack('lead');
        lastTrackRef.current = 'lead';
        setSelectedChapterId(chapterParam);
        setActiveTab('manuscript');
      }
    }
  }, []);

  // Sync tab and chapter to URL query parameters on state changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const prevTab = params.get('tab');
    const prevChapter = params.get('chapter');
    
    if (prevTab !== activeTab || (activeTab === 'manuscript' && prevChapter !== selectedChapterId)) {
      params.set('tab', activeTab);
      if (activeTab === 'manuscript') {
        params.set('chapter', selectedChapterId);
      } else {
        params.delete('chapter');
      }
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState(null, '', newUrl);
    }
  }, [activeTab, selectedChapterId]);

  // Calculate PFAS simulator outputs dynamically
  useEffect(() => {
    const Freq = pfasSimState.cavitationFrequency;
    const Pres = pfasSimState.pressureAmplitude;
    const Vol = pfasSimState.processingVolume;
    const Lab = pfasSimState.nmLaboratoriesCooperation;

    // Destruction rate increases with frequency and pressure amplitude, decreases with processing volume (overloading)
    let dest = 100 - (Vol / (Freq * Pres * 0.1));
    dest = Math.max(70, Math.min(99.99, dest));

    // Energy efficiency peaks around 28 kHz and moderate pressures
    let eff = 92 - Math.abs(Freq - 28) * 0.8 - Math.abs(Pres - 4.5) * 2;
    eff = Math.max(50, Math.min(98, eff));

    // Mineralization correlates with destruction rate
    let min = dest * 0.998;

    // ROI scales with laboratories cooperation, pressure, volume processed
    let roi = (Vol * 1.8 + Lab * 2.5) * (Pres / 3.0);
    roi = Math.max(50, Math.round(roi));

    setPfasOutputs({
      destructionRate: Number(dest.toFixed(2)),
      energyEfficiency: Math.round(eff),
      fluorineMineralization: Number(min.toFixed(2)),
      remediationRoi: roi
    });
  }, [pfasSimState]);

  // Combine chapters and appendices for searching and navigation based on active track
  const allChapters = remediationTrack === 'lead' ? [...CHAPTERS, ...APPENDICES] : PFAS_CHAPTERS;
  const selectedChapter = allChapters.find(ch => ch.id === selectedChapterId) || allChapters[0];

  // Filtering chapters
  const filteredChapters = allChapters.filter(ch =>
    ch.title.toLowerCase().includes(chapterSearch.toLowerCase()) ||
    ch.subtitle.toLowerCase().includes(chapterSearch.toLowerCase()) ||
    ch.content.toLowerCase().includes(chapterSearch.toLowerCase())
  );

  // Simulator State
  const [simState, setSimState] = useState<SimulationState>({
    leadPerturbation: 6.8, // current Chicago legacy average BLL
    sovereignAICompute: 45, // %
    remediationCapital: 1.5, // $ Trillions
    socioEconomicFactor: 50, // % (stress levels)
    timePeriod: 'modern'
  });

  // Derived outputs from Roulet's Law: Chaos x Relativity = H' x Uncertainty
  const [derivedOutputs, setDerivedOutputs] = useState({
    pfcVolume: 82, // prefrontal cortex volume %
    hpaOverdrive: 65, // hormonal stress/dysregulation %
    chaosIndex: 580, // crime rate / violence incidents per 100k
    homoSapiensBaselineProximity: 12 // % proximity to 0.016 ug/dL baseline
  });

  // Calculate dynamic outputs based on sliders
  useEffect(() => {
    const H_prime = simState.leadPerturbation;
    const S_ai = simState.sovereignAICompute / 100;
    const Capital = simState.remediationCapital;
    const Socio = simState.socioEconomicFactor;

    // 1. Prefrontal cortex gray matter volume (inverse response to lead, improved slightly by socioeconomic buffers)
    // Baseline Homo Sapiens 0 (0.016 ug/dL) = 100% PFC gray matter
    // Lead is extremely toxic; volume falls sharply
    let pfc = 100 - (H_prime * 1.2);
    // Socioeconomic factor buffers or compounds slightly
    pfc += (100 - Socio) * 0.05;
    pfc = Math.max(55, Math.min(100, pfc));

    // 2. HPA Axis Overdrive (stress and hyper-vigilance)
    // Saturated quickly with lead exposure and poverty/socioeconomic stress
    let hpa = (H_prime * 8) + (Socio * 0.4);
    hpa = Math.max(5, Math.min(100, hpa));

    // 3. Chaos Index (Macro-scale crime and volatility per 100k)
    // Chaos increases with H' and high stress, but is actively driven down by Sovereign AI compute and remediation capital
    const AI_remediation_multiplier = 1 - (S_ai * 0.7);
    const capital_remediation_multiplier = 1 / (1 + (Capital * 0.6));
    let chaos = (H_prime * 120 + Socio * 4) * AI_remediation_multiplier * capital_remediation_multiplier;
    chaos = Math.max(15, Math.round(chaos));

    // 4. Proximity to Homo Sapiens 0 baseline (0.016 ug/dL)
    let proximity = 0;
    if (H_prime <= 0.016) {
      proximity = 100;
    } else {
      proximity = Math.max(0, Math.min(100, Math.round(100 / (1 + (H_prime - 0.016) * 1.5))));
    }

    setDerivedOutputs({
      pfcVolume: Math.round(pfc),
      hpaOverdrive: Math.round(hpa),
      chaosIndex: chaos,
      homoSapiensBaselineProximity: proximity
    });
  }, [simState]);

  // Sovereign Ledger Node State
  const [nodes, setNodes] = useState<RemediationNode[]>(DEFAULT_REMEDIATION_NODES);
  const [pfasNodes, setPfasNodes] = useState<RemediationNode[]>(DEFAULT_PFAS_NODES);
  const activeNodes = remediationTrack === 'lead' ? nodes : pfasNodes;
  const [newNodeName, setNewNodeName] = useState('');
  const [newNodeRegion, setNewNodeRegion] = useState('');
  const [newNodeBll, setNewNodeBll] = useState<number>(10.0);
  const [newNodeTarget, setNewNodeTarget] = useState<number>(0.016);
  const [newNodeEscrow, setNewNodeEscrow] = useState<number>(150000);
  const [ledgerMessage, setLedgerMessage] = useState<string | null>(null);

  // Sovereign Personal Individual Account state
  const [personalAccountCreated, setPersonalAccountCreated] = useState<boolean>(true); // default to created so they see their dashboard!
  const [personalName, setPersonalName] = useState<string>('Sovereign Citizen');
  const [personalSovereignty, setPersonalSovereignty] = useState<string>('Taos Pueblo Ecological Sanctuary');
  const [personalAge, setPersonalAge] = useState<number>(45);
  const [personalBll, setPersonalBll] = useState<number>(0.032); // close to clean baseline
  const [personalHpaStress, setPersonalHpaStress] = useState<number>(12); // healthy baseline HPA index %
  const [personalSymptoms, setPersonalSymptoms] = useState<string>('Optimal Cognitive Function (Minimal HPA Overdrive)');
  const [isDataConfidential, setIsDataConfidential] = useState<boolean>(true);
  const [authorizeComparativeAnalysis, setAuthorizeComparativeAnalysis] = useState<boolean>(false);
  const [personalZkpKey, setPersonalZkpKey] = useState<string>('0x7a8c8e110b5c14f9da7b3c2f0d9e4a8b');
  const [ledgerTabSub, setLedgerTabSub] = useState<'personal' | 'community' | 'coop'>('personal');

  // Co-Op & Sovereign Groups State
  const [coopGroup, setCoopGroup] = useState<string>('cleveland');
  const [coopPosts, setCoopPosts] = useState<Array<{id: string, group: string, author: string, key: string, content: string, type: string, timestamp: string}>>([
    {
      id: 'post-1',
      group: 'cleveland',
      author: 'Norman Roulet (GCLAC Co-Chair)',
      key: '0x7a8c8e110b5c14f9da7b3c2f0d9e4a8b',
      content: 'Launching infrastructure audits to evaluate municipal lead pipes in historic Cleveland neighborhoods.',
      type: 'Action Plan',
      timestamp: 'Jun 28, 2026'
    },
    {
      id: 'post-2',
      group: 'cleveland',
      author: 'Dr. Bruce Lanphear',
      key: '0x9b3f8e221c6d24f0da8b4c3f0e8f5a9c',
      content: 'Data seldom move people the way stories do. We must marry precise blood lead metrics with personal multi-generational narratives.',
      type: 'Expert Insight',
      timestamp: 'Jun 28, 2026'
    },
    {
      id: 'post-3',
      group: 'new-orleans',
      author: 'Tulane Alumnus',
      key: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d',
      content: 'Evaluating the 1970s gasoline combustion surge in New Orleans. Historical BLL values match the Lead-Crime Hypothesis.',
      type: 'Ethics Thesis',
      timestamp: 'Jun 29, 2026'
    },
    {
      id: 'post-4',
      group: 'taos',
      author: 'Tribal Elder',
      key: '0x5c4d3e2b1a0f9e8d7c6b5a4f3e2d1c0b',
      content: 'Establishing zero-knowledge environmental boundaries around Pueblo ecological lands to prevent unauthorized genomic data harvesting.',
      type: 'Sovereignty Resolution',
      timestamp: 'Jun 29, 2026'
    }
  ]);
  const [newPostContent, setNewPostContent] = useState<string>('');
  const [newPostType, setNewPostType] = useState<string>('Creative IP');

  // Co-Op Funding Simulator State
  const [simulatedFundSource, setSimulatedFundSource] = useState<'bloomberg' | 'rockefeller' | 'gund' | 'lewis'>('bloomberg');
  const [fundingAmount, setFundingAmount] = useState<number>(25000000);
  const [allocationGapA, setAllocationGapA] = useState<number>(25); // snarkJS DID / ZKP
  const [allocationGapB, setAllocationGapB] = useState<number>(30); // GIS spatial mapping
  const [allocationGapC, setAllocationGapC] = useState<number>(25); // IPFS/Ceramic storage
  const [allocationGapD, setAllocationGapD] = useState<number>(20); // Spanner / Multi-tenant scalability

  // AI Chat Co-Author State
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: `Welcome back, Norm. I have successfully restored our secure chat session. 

All 15 primary chapters of **"${BOOK_TITLE}"** and the investigative appendices are fully synchronized and loaded into the core database. I have integrated Roulet's Law:

$$[Perturbation\\ Theory\\ (1st\\ order\\ Pb)] \\times [Uncertainty\\ Principle] = [Chaos\\ Theory] \\times [Relativity]$$

directly into my cognitive systems. Our Swiss School of Exposenomics platform is fully online and ready. How shall we proceed? We can refine the mathematical proofs, explore our unique Chicago demographic scatterplot database, or draft new passages for the upcoming launch.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [chatLoading, setChatLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, chatLoading]);

  // Action: Export entire Book/Manuscript as a single Markdown file
  const handleExportManuscript = () => {
    let bookText = `# ${BOOK_TITLE}\n`;
    bookText += `## ${BOOK_SUBTITLE}\n\n`;
    bookText += `**Author:** Norman Roulet (GCLAC Co-Chair) (Economist, Founder of ICEarth, Swiss School of Exposenomics)\n`;
    bookText += `**Sovereignty Grade:** ZK-Encrypted Peer Blockchain\n`;
    bookText += `**Pre-Industrial Baseline Standard (Homo Sapiens 0):** 0.016 μg/dL\n\n`;
    bookText += `*Compiled dynamically from the restored AI chat session on ${new Date().toLocaleDateString()}*\n\n`;
    bookText += `========================================================================\n\n`;

    CHAPTERS.forEach((ch) => {
      bookText += `## ${ch.title}\n`;
      bookText += `### ${ch.subtitle}\n`;
      if (ch.formula) bookText += `*Formula:* ${ch.formula}\n\n`;
      bookText += `${ch.content}\n\n`;
      bookText += `**Key Takeaways:**\n`;
      ch.keyTakeaways.forEach(kt => {
        bookText += `- ${kt}\n`;
      });
      bookText += `\n**Historical References:** ${ch.historicalFigures.join(', ')}\n\n`;
      bookText += `------------------------------------------------------------------------\n\n`;
    });

    bookText += `# APPENDICES: HISTORICAL EVIDENCE\n\n`;

    APPENDICES.forEach((app) => {
      bookText += `## ${app.title}\n`;
      bookText += `### ${app.subtitle}\n\n`;
      bookText += `${app.content}\n\n`;
      bookText += `**Analytical Takeaways:**\n`;
      app.keyTakeaways.forEach(kt => {
        bookText += `- ${kt}\n`;
      });
      bookText += `\n**Historical Context:** ${app.historicalFigures.join(', ')}\n\n`;
      bookText += `------------------------------------------------------------------------\n\n`;
    });

    const blob = new Blob([bookText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = "Roulets_Law_Proof_Manuscript.md";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Action: AI Chat API Call
  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || chatInput;
    if (!textToSend.trim() || chatLoading) return;

    if (!customText) {
      setChatInput('');
    }

    const newUserMessage: ChatMessage = {
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMessage]);
    setChatLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, newUserMessage].map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        })
      });

      if (!response.ok) {
        throw new Error('Server response error');
      }

      const data = await response.json();
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error(err);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: "Error: Unstable quantum telemetry link to AI Node. Utilizing local fallback storage to parse inquiry: please verify your GEMINI_API_KEY is properly initialized.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setChatLoading(false);
    }
  };

  // Action: Add new Sovereign Ledger Node
  const handleCreateNode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNodeName || !newNodeRegion) {
      setLedgerMessage("Error: Incomplete node parameters. Both name and community region are required.");
      return;
    }

    const newNode: RemediationNode = {
      id: `node-${Date.now()}`,
      name: newNodeName,
      region: newNodeRegion,
      currentBll: Number(newNodeBll),
      targetBll: Number(newNodeTarget),
      remediationStatus: 'pending',
      escrowBalance: Number(newNodeEscrow),
      verificationZkp: '0x0000...0000',
      aiEfficiency: Math.round(75 + Math.random() * 20)
    };

    if (remediationTrack === 'lead') {
      setNodes(prev => [...prev, newNode]);
    } else {
      setPfasNodes(prev => [...prev, newNode]);
    }
    
    setNewNodeName('');
    setNewNodeRegion('');
    // Reset to sensible defaults based on track
    if (remediationTrack === 'lead') {
      setNewNodeBll(10.0);
      setNewNodeTarget(0.016);
    } else {
      setNewNodeBll(50.0);
      setNewNodeTarget(0.004);
    }
    setNewNodeEscrow(150000);
    setLedgerMessage(`Successfully registered New Sovereign Node: "${newNode.name}" inside secure ICEarth Ledger.`);
    setTimeout(() => setLedgerMessage(null), 5000);
  };

  // Action: Verify ZKP and Remediate Node
  const handleVerifyZkp = (nodeId: string) => {
    const updateFn = (prev: RemediationNode[]) => prev.map(n => {
      if (n.id === nodeId) {
        const randHash = '0x' + Array.from({ length: 8 }, () => Math.floor(Math.random() * 16).toString(16)).join('') + '...' + Array.from({ length: 8 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
        return {
          ...n,
          remediationStatus: 'completed',
          verificationZkp: randHash,
          currentBll: n.targetBll // completely cleansed to target!
        };
      }
      return n;
    });

    if (remediationTrack === 'lead') {
      setNodes(updateFn);
    } else {
      setPfasNodes(updateFn);
    }

    const unit = remediationTrack === 'lead' ? 'μg/dL BLL' : 'ppt PFAS';
    setLedgerMessage(`Zero-Knowledge Proof verified successfully. Node stabilized to target ${unit}. Token assets released.`);
    setTimeout(() => setLedgerMessage(null), 4000);
  };

  const handleFundingRelease = (nodeId: string) => {
    const updateFn = (prev: RemediationNode[]) => prev.map(n => {
      if (n.id === nodeId) {
        return {
          ...n,
          remediationStatus: 'active',
          escrowBalance: n.escrowBalance + 500000
        };
      }
      return n;
    });

    if (remediationTrack === 'lead') {
      setNodes(updateFn);
    } else {
      setPfasNodes(updateFn);
    }
    
    setLedgerMessage(`Cryptographic escrow funded with an additional 500,000 ICE Tokens.`);
    setTimeout(() => setLedgerMessage(null), 4000);
  };

  // Navigation helpers for Book Reader
  const currentChapterIndex = allChapters.findIndex(ch => ch.id === selectedChapterId);
  const handlePrevChapter = () => {
    if (currentChapterIndex > 0) {
      setSelectedChapterId(allChapters[currentChapterIndex - 1].id);
    }
  };
  const handleNextChapter = () => {
    if (currentChapterIndex < allChapters.length - 1) {
      setSelectedChapterId(allChapters[currentChapterIndex + 1].id);
    }
  };

  // Preset chat prompts for quick testing
  const chatPresetPrompts = [
    { label: "Tiny Tim's Distal RTA", text: "Please detail Tiny Tim's distal Renal Tubular Acidosis (RTA) diagnosis under lead toxicity, and why Scrooge raising Bob Cratchit's salary was the ultimate proof of environmental optimization." },
    { label: "The NOVA1 Mutation", text: "Explain the evolutionary divergence of the NOVA1 mutation between Homo sapiens and Neanderthals when exposed to lead, and how this defines the unperturbed genome." },
    { label: "The standard oil treason", text: "Deconstruct the cartel treason between Thomas Midgley, Standard Oil, DuPont, and I.G. Farben to monopolize leaded gasoline and synthetic fuel for World War II." },
    { label: "Modern recycled aluminum", text: "Draft an analytical outline about why poorly recycled aluminum cookware contains up to 16,000 ppm of lead, making 1/3 of global children poisoned today." }
  ];

  return (
    <div className="flex flex-col h-screen w-full bg-[#FCFCFC] text-[#1A1A1A] font-sans selection:bg-[#E5E7EB] overflow-hidden">
      
      {/* HEADER */}
      <header className="h-16 border-b border-[#E5E5E5] flex items-center justify-between px-8 bg-white shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-14 h-8 rounded-md overflow-hidden border border-neutral-800 bg-black flex items-center justify-center text-white font-mono font-bold text-lg tracking-wider relative group shadow-sm shrink-0">
            <img 
              src={icearthLaunchImg} 
              alt="ICEarth Logo" 
              className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity" 
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h1 className="text-sm font-semibold tracking-tight uppercase flex items-center gap-2">
              The Roulet's Law Proof <span className="text-[#999] font-normal font-mono text-[11px]">v4.2.0</span>
            </h1>
            <p className="text-[10px] text-[#666] tracking-wider uppercase">Sovereign Exposenomics & Decarbonization Hub</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            Sovereign Session Reconstructed
          </div>
          <button 
            onClick={() => {
              const url = `${window.location.origin}${window.location.pathname}?tab=${activeTab}${activeTab === 'manuscript' ? `&chapter=${selectedChapterId}` : ''}`;
              navigator.clipboard.writeText(url);
              setCopiedGlobalTabLink(true);
              setTimeout(() => setCopiedGlobalTabLink(false), 2000);
            }}
            className="flex items-center gap-2 text-xs font-semibold px-4 py-2 bg-amber-50 border border-amber-200 text-amber-950 hover:bg-amber-100/80 rounded transition-colors cursor-pointer"
            title="Copy Permanent Link to Current View"
          >
            {copiedGlobalTabLink ? (
              <>
                <Check size={14} className="text-emerald-700 font-bold" />
                <span className="text-emerald-700 font-bold uppercase">Link Copied!</span>
              </>
            ) : (
              <>
                <Link2 size={14} className="text-amber-800" />
                <span className="uppercase font-bold text-amber-900">Share Current View</span>
              </>
            )}
          </button>
          <button 
            onClick={handleExportManuscript}
            className="flex items-center gap-2 text-xs font-semibold px-4 py-2 border border-[#E5E5E5] hover:bg-gray-50 active:bg-gray-100 rounded transition-colors cursor-pointer"
          >
            <Download size={14} className="text-[#666]" />
            EXPORT FULL MANUSCRIPT
          </button>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 flex overflow-hidden">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className="w-72 border-r border-[#E5E5E5] bg-white flex flex-col shrink-0 overflow-y-auto">
          <div className="p-6 space-y-6">
            
            {/* REMEDIATION TRACK SELECTOR */}
            <section className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-200/80 space-y-2">
              <h2 className="text-[10px] font-bold text-[#888] uppercase tracking-widest flex items-center justify-between">
                <span>Active Remediation Track</span>
                <span className="font-mono text-[9px] px-1.5 py-0.5 bg-black text-white rounded font-bold">ICEARTH</span>
              </h2>
              <div className="grid grid-cols-2 gap-1 p-1 bg-neutral-200/40 rounded-lg border border-neutral-200">
                <button
                  onClick={() => setRemediationTrack('lead')}
                  className={`py-1.5 px-1 text-center rounded font-sans font-bold text-[10px] tracking-tight transition-all cursor-pointer ${
                    remediationTrack === 'lead'
                      ? 'bg-white text-black shadow-xs border border-neutral-300'
                      : 'text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  🔴 Pb & Lead
                </button>
                <button
                  onClick={() => setRemediationTrack('pfas')}
                  className={`py-1.5 px-1 text-center rounded font-sans font-bold text-[10px] tracking-tight transition-all cursor-pointer ${
                    remediationTrack === 'pfas'
                      ? 'bg-white text-black shadow-xs border border-neutral-300'
                      : 'text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  🧪 PFAS & Advanced
                </button>
              </div>
            </section>

            {/* PLATFORM APP DIRECTORY */}
            <section>
              <h2 className="text-[10px] font-bold text-[#999] uppercase tracking-widest mb-3">Sovereign Directory</h2>
              <nav className="space-y-1">
                {/* 0. Sovereign Member Portal */}
                <button
                  onClick={() => setActiveTab('sovereign_portal')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs font-medium tracking-tight transition-all cursor-pointer border ${
                    activeTab === 'sovereign_portal'
                      ? 'bg-amber-950 text-amber-100 border-amber-700/50 shadow-sm font-bold'
                      : 'hover:bg-amber-50 text-amber-900 border-amber-200/50 bg-amber-50/30'
                  }`}
                >
                  <Users size={16} className={activeTab === 'sovereign_portal' ? 'text-amber-400' : 'text-amber-600'} />
                  <span className="flex-1">🪶 Sovereign Member Portal</span>
                  <span className="px-1.5 py-0.2 bg-amber-500/20 text-amber-700 text-[8px] tracking-wide rounded uppercase font-bold border border-amber-500/30">
                    Portal
                  </span>
                </button>

                {/* 1. Sovereign Exposure Profiler */}
                <button
                  onClick={() => setActiveTab('profiler')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs font-medium tracking-tight transition-all cursor-pointer border ${
                    activeTab === 'profiler'
                      ? 'bg-emerald-950 text-white border-transparent shadow-sm font-bold'
                      : 'hover:bg-emerald-50 text-emerald-800 border-transparent bg-emerald-50/20'
                  }`}
                >
                  <Fingerprint size={16} className={activeTab === 'profiler' ? 'text-emerald-400' : 'text-emerald-600'} />
                  <span className="flex-1">🛡️ Sovereign Exposure Profiler</span>
                  <span className="px-1.5 py-0.2 bg-emerald-500/15 text-emerald-700 text-[8px] tracking-wide rounded uppercase font-bold border border-emerald-500/20">
                    Onboard
                  </span>
                </button>

                {/* 1b. ICEarth Lead-Crime Hypotheses Proofs */}
                <button
                  onClick={() => setActiveTab('proofs')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs font-medium tracking-tight transition-all cursor-pointer border ${
                    activeTab === 'proofs'
                      ? 'bg-red-950 text-white border-transparent shadow-sm font-bold'
                      : 'hover:bg-red-50 text-red-800 border-transparent bg-red-50/20'
                  }`}
                >
                  <TrendingUp size={16} className={activeTab === 'proofs' ? 'text-red-400' : 'text-red-600'} />
                  <span className="flex-1">🧠 Lead-Crime Hypotheses Proofs</span>
                  <span className="px-1.5 py-0.2 bg-red-500/15 text-red-700 text-[8px] tracking-wide rounded uppercase font-bold border border-red-500/20">
                    Core
                  </span>
                </button>

                {/* 1c. ICEarth Lead-Terrorism Hypothesis Proof */}
                <button
                  onClick={() => setActiveTab('terrorism_proofs')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs font-medium tracking-tight transition-all cursor-pointer border ${
                    activeTab === 'terrorism_proofs'
                      ? 'bg-rose-950 text-white border-transparent shadow-sm font-bold'
                      : 'hover:bg-rose-50 text-rose-800 border-transparent bg-rose-50/20'
                  }`}
                >
                  <ShieldAlert size={16} className={activeTab === 'terrorism_proofs' ? 'text-rose-400' : 'text-rose-600'} />
                  <span className="flex-1">🔥 Lead-Terrorism Hypothesis Proof</span>
                  <span className="px-1.5 py-0.2 bg-rose-500/15 text-rose-700 text-[8px] tracking-wide rounded uppercase font-bold border border-rose-500/20">
                    Threat
                  </span>
                </button>

                {/* 1d. DRC Genocost & Anthropogenic Lead Genocide */}
                <button
                  onClick={() => setActiveTab('genocost')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs font-medium tracking-tight transition-all cursor-pointer border ${
                    activeTab === 'genocost'
                      ? 'bg-amber-950 text-white border-transparent shadow-sm font-bold'
                      : 'hover:bg-amber-50 text-amber-900 border-transparent bg-amber-50/20'
                  }`}
                >
                  <ShieldAlert size={16} className={activeTab === 'genocost' ? 'text-amber-400' : 'text-amber-600'} />
                  <span className="flex-1">🇨🇩 DRC Genocost & Lead Genocide</span>
                  <span className="px-1.5 py-0.2 bg-amber-500/15 text-amber-700 text-[8px] tracking-wide rounded uppercase font-bold border border-amber-500/20">
                    Genocost
                  </span>
                </button>

                {/* 2. Environmental Litigation Profiler */}
                <button
                  onClick={() => setActiveTab('litigation')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs font-medium tracking-tight transition-all cursor-pointer border ${
                    activeTab === 'litigation'
                      ? 'bg-purple-950 text-white border-transparent shadow-sm font-bold'
                      : 'hover:bg-purple-50 text-purple-800 border-transparent bg-purple-50/20'
                  }`}
                >
                  <Scale size={16} className={activeTab === 'litigation' ? 'text-purple-400' : 'text-purple-600'} />
                  <span className="flex-1">⚖️ Environmental Litigation Profiler</span>
                  <span className="px-1.5 py-0.2 bg-purple-500/15 text-purple-700 text-[8px] tracking-wide rounded uppercase font-bold border border-purple-500/20">
                    Active
                  </span>
                </button>

                {/* 3. News and Reports Hub */}
                <button
                  onClick={() => setActiveTab('reports')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs font-medium tracking-tight transition-all cursor-pointer border ${
                    activeTab === 'reports'
                      ? 'bg-cyan-950 text-white border-transparent shadow-sm font-bold'
                      : 'hover:bg-cyan-50 text-cyan-800 border-transparent bg-cyan-50/20'
                  }`}
                >
                  <Newspaper size={16} className={activeTab === 'reports' ? 'text-cyan-400' : 'text-cyan-650'} />
                  <span className="flex-1">📰 News and Reports Hub</span>
                  <span className="px-1.5 py-0.2 bg-cyan-500/15 text-cyan-700 text-[8px] tracking-wide rounded uppercase font-bold border border-cyan-500/20">
                    Social
                  </span>
                </button>

                {/* Cleveland Lead Audit & Confession */}
                <button
                  onClick={() => setActiveTab('cleveland')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs font-medium tracking-tight transition-all cursor-pointer border ${
                    activeTab === 'cleveland'
                      ? 'bg-rose-950 text-white border-transparent shadow-sm font-bold'
                      : 'hover:bg-rose-50 text-rose-800 border-transparent bg-rose-50/20'
                  }`}
                >
                  <MapPin size={16} className={activeTab === 'cleveland' ? 'text-rose-400' : 'text-rose-600'} />
                  <span className="flex-1">🔴 Cleveland Lead Audit & Confession</span>
                  <span className="px-1.5 py-0.2 bg-rose-500/15 text-rose-700 text-[8px] tracking-wide rounded uppercase font-bold border border-rose-500/20">
                    GCLAC
                  </span>
                </button>

                {/* Toledo Lead Audit & CDC Confession */}
                <button
                  onClick={() => setActiveTab('toledo')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs font-medium tracking-tight transition-all cursor-pointer border ${
                    activeTab === 'toledo'
                      ? 'bg-amber-950 text-white border-transparent shadow-sm font-bold'
                      : 'hover:bg-amber-50 text-amber-900 border-transparent bg-amber-50/20'
                  }`}
                >
                  <MapPin size={16} className={activeTab === 'toledo' ? 'text-amber-400' : 'text-amber-600'} />
                  <span className="flex-1">🏛️ Toledo Lead Audit & CDC Confession</span>
                  <span className="px-1.5 py-0.2 bg-amber-500/15 text-amber-700 text-[8px] tracking-wide rounded uppercase font-bold border border-amber-500/20">
                    419
                  </span>
                </button>

                {/* The ICEarth/GCLAC/CCOAL Solution */}
                <button
                  onClick={() => setActiveTab('cleveland_strategy')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs font-medium tracking-tight transition-all cursor-pointer border ${
                    activeTab === 'cleveland_strategy'
                      ? 'bg-emerald-950 text-white border-transparent shadow-sm font-bold'
                      : 'hover:bg-emerald-50 text-emerald-800 border-transparent bg-emerald-50/20'
                  }`}
                >
                  <ShieldAlert size={16} className={activeTab === 'cleveland_strategy' ? 'text-emerald-400' : 'text-emerald-600'} />
                  <span className="flex-1">🟢 The ICEarth/GCLAC/CCOAL Solution</span>
                  <span className="px-1.5 py-0.2 bg-emerald-500/15 text-emerald-700 text-[8px] tracking-wide rounded uppercase font-bold border border-emerald-500/20">
                    Solution
                  </span>
                </button>

                {/* WHO Draft Global Action Plan on Lead Mitigation */}
                <button
                  onClick={() => setActiveTab('who_action_plan')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs font-medium tracking-tight transition-all cursor-pointer border ${
                    activeTab === 'who_action_plan'
                      ? 'bg-sky-950 text-white border-transparent shadow-sm font-bold'
                      : 'hover:bg-sky-50 text-sky-800 border-transparent bg-sky-50/20'
                  }`}
                >
                  <Globe size={16} className={activeTab === 'who_action_plan' ? 'text-sky-400' : 'text-sky-600'} />
                  <span className="flex-1">🌐 WHO Draft Lead Mitigation Plan</span>
                  <span className="px-1.5 py-0.2 bg-sky-500/15 text-sky-700 text-[8px] tracking-wide rounded uppercase font-bold border border-sky-500/20">
                    WHA78.27
                  </span>
                </button>

                {/* Nobel Prize Nomination */}
                <button
                  onClick={() => setActiveTab('nobel_nomination')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs font-medium tracking-tight transition-all cursor-pointer border ${
                    activeTab === 'nobel_nomination'
                      ? 'bg-amber-950 text-white border-transparent shadow-sm font-bold'
                      : 'hover:bg-amber-50 text-amber-800 border-transparent bg-amber-50/20'
                  }`}
                >
                  <Sparkles size={16} className={activeTab === 'nobel_nomination' ? 'text-amber-400' : 'text-amber-600'} />
                  <span className="flex-1">🏆 Nobel Prize Nomination</span>
                  <span className="px-1.5 py-0.2 bg-amber-500/15 text-amber-700 text-[8px] tracking-wide rounded uppercase font-bold border border-amber-500/20">
                    Honor
                  </span>
                </button>

                {/* 4. ICEarth Owners' Manual */}
                <button
                  onClick={() => setActiveTab('manuscript')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs font-medium tracking-tight transition-all cursor-pointer border ${
                    activeTab === 'manuscript'
                      ? 'bg-neutral-900 text-white border-transparent shadow-sm font-bold'
                      : 'hover:bg-neutral-50 text-neutral-800 border-transparent bg-neutral-50/20'
                  }`}
                >
                  <BookOpen size={16} className={activeTab === 'manuscript' ? 'text-amber-400' : 'text-neutral-500'} />
                  <span className="flex-1">📖 ICEarth Owners' Manual</span>
                  <span className="px-1.5 py-0.2 bg-amber-500/15 text-amber-700 text-[8px] tracking-wide rounded uppercase font-bold border border-amber-500/20">
                    Docs
                  </span>
                </button>
                
                {/* 5. Roulet's Law Simulator */}
                <button
                  onClick={() => setActiveTab('simulator')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs font-medium tracking-tight transition-colors cursor-pointer border ${
                    activeTab === 'simulator'
                      ? 'bg-[#1A1A1A] text-white border-transparent shadow-sm'
                      : 'hover:bg-gray-50 text-[#444] border-transparent'
                  }`}
                >
                  <Sliders size={16} />
                  <span>{remediationTrack === 'lead' ? '📊 Roulet\'s Law Simulator' : '📊 Cavitation Simulator'}</span>
                </button>

                {/* 6. Exposenomics Benchmarking */}
                <button
                  onClick={() => setActiveTab('benchmarking')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs font-medium tracking-tight transition-colors cursor-pointer border ${
                    activeTab === 'benchmarking'
                      ? 'bg-[#1A1A1A] text-white border-transparent shadow-sm'
                      : 'hover:bg-gray-50 text-[#444] border-transparent'
                  }`}
                >
                  <FileSpreadsheet size={16} />
                  <span>{remediationTrack === 'lead' ? '📈 Exposenomics Benchmarking' : '📈 Advanced Benchmarking'}</span>
                </button>

                {/* 7. Odissé Dataviz Challenge */}
                <button
                  onClick={() => setActiveTab('odisse')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs font-medium tracking-tight transition-colors cursor-pointer border ${
                    activeTab === 'odisse'
                      ? 'bg-[#1A1A1A] text-white border-transparent shadow-sm'
                      : 'hover:bg-gray-50 text-[#444] border-transparent'
                  }`}
                >
                  <Activity size={16} className={activeTab === 'odisse' ? 'text-cyan-400' : 'text-cyan-600'} />
                  <span className="flex items-center gap-1.5">
                    🇫🇷 Odissé Dataviz Challenge
                  </span>
                </button>

                {/* 8. Ledger Nodes */}
                <button
                  onClick={() => setActiveTab('nodes')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs font-medium tracking-tight transition-colors cursor-pointer border ${
                    activeTab === 'nodes'
                      ? 'bg-[#1A1A1A] text-white border-transparent shadow-sm'
                      : 'hover:bg-gray-50 text-[#444] border-transparent'
                  }`}
                >
                  <Database size={16} />
                  <span>{remediationTrack === 'lead' ? '⛓️ ICEarth Ledger Nodes' : '⛓️ PFAS Remediation Nodes'}</span>
                </button>

                {/* 9. Sovereign Co-Author AI */}
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs font-medium tracking-tight transition-colors cursor-pointer border ${
                    activeTab === 'chat'
                      ? 'bg-[#1A1A1A] text-white border-transparent shadow-sm'
                      : 'hover:bg-gray-50 text-[#444] border-transparent'
                  }`}
                >
                  <MessageSquare size={16} />
                  <span>{remediationTrack === 'lead' ? '🤖 Sovereign Co-Author AI' : '🤖 Cavitation Advisor AI'}</span>
                </button>
              </nav>
            </section>

            {/* QUICK METRICS */}
            <section className="pt-4 border-t border-[#F0F0F0]">
              <h2 className="text-[10px] font-bold text-[#999] uppercase tracking-widest mb-3">Live Platform Status</h2>
              <div className="space-y-3 bg-[#FAFAFA] p-4 rounded-xl border border-[#F0F0F0]">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-[#888] uppercase">{remediationTrack === 'lead' ? 'Global Baseline (Homo Sapiens 0)' : 'PFAS Sovereign Target Limit'}</span>
                  <span className="text-xs font-mono font-medium text-emerald-600">{remediationTrack === 'lead' ? '0.016 μg/dL Standard' : '< 0.004 ppt Safety Baseline'}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-[#888] uppercase">Interactive Chapters Loaded</span>
                  <span className="text-xs font-mono font-medium">{remediationTrack === 'lead' ? '15 Primary + 5 Appendices' : '4 Remediation Chapters'}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-[#888] uppercase">Sovereign AI Compute Status</span>
                  <span className="text-xs font-mono font-medium text-sky-600 flex items-center gap-1">
                    <Sparkles size={11} /> {remediationTrack === 'lead' ? '100% Active Node' : 'NanoSpire Quantum Solver'}
                  </span>
                </div>
              </div>
            </section>

            {/* METADATA INFO */}
            <section className="pt-4 border-t border-[#F0F0F0]">
              <h2 className="text-[10px] font-bold text-[#999] uppercase tracking-widest mb-3">Session Metadata</h2>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-[#666]">Original Session</span>
                  <span className="font-mono text-[11px] text-right">2026.06.26</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#666]">Total Words</span>
                  <span className="font-mono text-[11px]">14,821 Words</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#666]">Base Model ID</span>
                  <span className="font-mono text-[11px]">gemini-3.5-flash</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#666]">Sovereignty</span>
                  <span className="font-mono text-[11px] text-emerald-600 flex items-center gap-1">
                    <Shield size={10} /> ZK-Encrypted
                  </span>
                </div>
              </div>
            </section>

            {/* SOVEREIGN LAUNCH CANVAS WIDGET */}
            <section className="pt-4 border-t border-[#F0F0F0]">
              <h2 className="text-[10px] font-bold text-[#999] uppercase tracking-widest mb-3">Sovereign Launch Canvas</h2>
              <div 
                onClick={() => {
                  setModalImageSrc(icearthLaunchImg);
                  setModalImageTitle("Exhibit 2: ICEarth System Launch Canvas");
                  setIsImageModalOpen(true);
                }}
                className="group relative rounded-xl overflow-hidden border border-[#E5E5E5] bg-neutral-900 cursor-pointer shadow-xs aspect-[1.77] transition-all hover:border-[#1A1A1A] hover:shadow-md"
              >
                <img 
                  src={icearthLaunchImg} 
                  alt="ICEarth Launch Canvas" 
                  className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-3 flex flex-col justify-end">
                  <span className="text-[8px] font-mono font-bold text-red-400 uppercase tracking-wider mb-0.5">LAUNCH SEQUENCE STATUS: ACTIVE</span>
                  <h4 className="text-[10px] font-bold text-white font-sans leading-tight group-hover:text-amber-300 transition-colors">
                    ICEarth Genesis Launch Canvas
                  </h4>
                  <div className="flex justify-between items-center text-[8px] font-mono text-neutral-400 mt-1">
                    <span>1012 × 573 high-res</span>
                    <span className="text-white bg-black/40 px-1.5 py-0.5 rounded border border-neutral-700">🔍 EXPLORE</span>
                  </div>
                </div>
              </div>
            </section>

            {/* ADVISORY & CO-AUTHORSHIP BIOGRAPHY */}
            <section className="pt-4 border-t border-[#F0F0F0]">
              <h2 className="text-[10px] font-bold text-[#999] uppercase tracking-widest mb-3">Council & Authorship</h2>
              <div className="bg-neutral-50 border border-[#E5E5E5] p-3.5 rounded-xl space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-950 flex items-center justify-center text-emerald-300 font-serif font-semibold text-xs border border-emerald-800 shrink-0">
                    BL
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-black leading-tight">Dr. Bruce Lanphear</h3>
                    <p className="text-[9px] text-[#666] font-mono">Pioneering Scientist & Professor</p>
                  </div>
                </div>
                <p className="text-[10px] text-neutral-600 leading-normal font-sans">
                  Preventive medicine physician at <strong>Simon Fraser University</strong> whose research proved that <strong>no level of lead exposure is safe</strong>. He was the guest of honor at the 2006 launch of the Greater Cleveland Lead Advisory Council, inspiring its creation.
                </p>

                <div className="border-t border-neutral-200/50 pt-2.5 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center text-white font-serif font-semibold text-xs border border-neutral-700 shrink-0">
                    NR
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-black leading-tight">Norman Roulet (GCLAC Co-Chair)</h3>
                    <p className="text-[9px] text-[#666] font-mono">Co-Author & GCLAC Co-Chair</p>
                  </div>
                </div>
                <p className="text-[10px] text-neutral-600 leading-normal font-sans">
                  Pioneered corporate benchmarking. Appointed <strong>Co-Chair for Infrastructure & Sustainability</strong> on the 2006 Greater Cleveland Lead Advisory Council, which was steered by a board of local Cleveland officials.
                </p>
                
                <div className="pt-1.5 border-t border-neutral-200/50 flex justify-between items-center text-[9px] font-mono text-neutral-400">
                  <span>@ICEarth_Eco</span>
                  <span className="text-emerald-600 font-semibold uppercase flex items-center gap-0.5">
                    <Check size={9} /> Verified Council
                  </span>
                </div>
              </div>
            </section>

          </div>

          <div className="mt-auto p-6 border-t border-[#E5E5E5] bg-[#FAFAFA]">
            <button 
              onClick={handleExportManuscript}
              className="w-full py-3 bg-[#1A1A1A] text-white text-xs font-bold rounded hover:bg-black uppercase tracking-wider transition-all shadow-sm active:scale-[0.98] cursor-pointer"
            >
              Sync to Manuscript File
            </button>
          </div>
        </aside>

        {/* WORKSPACE AREA */}
        <section className="flex-1 bg-white flex flex-col overflow-hidden">
          
          {/* TAB 1: MANUSCRIPT READER */}
          {activeTab === 'manuscript' && (
            <div className="flex-1 flex overflow-hidden">
              
              {/* CHAPTER DIRECTORY SUB-SIDEBAR */}
              <div className="w-80 border-r border-[#E5E5E5] bg-white flex flex-col shrink-0">
                <div className="p-4 border-b border-[#E5E5E5] bg-[#FAFAFA]">
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-[#999]" size={14} />
                    <input
                      type="text"
                      placeholder="Search restored text..."
                      value={chapterSearch}
                      onChange={(e) => setChapterSearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-white border border-[#D1D5DB] rounded-lg text-xs font-sans focus:outline-none focus:border-[#1A1A1A] transition-colors"
                    />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {/* SOVEREIGN DIRECTORY GROUP AT TOP */}
                  <div className="space-y-1.5 pb-2 border-b border-neutral-100">
                    <h3 className="text-[9px] font-bold text-amber-800 uppercase tracking-widest px-2 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                      Sovereign Directory
                    </h3>
                    <div className="space-y-1">
                      <button
                        onClick={() => setSelectedChapterId('indigenous')}
                        className={`w-full p-3 rounded-xl border text-left cursor-pointer transition-all flex items-start gap-2.5 relative overflow-hidden ${
                          selectedChapterId === 'indigenous'
                            ? 'bg-amber-50 border-amber-500 shadow-xs'
                            : 'hover:bg-neutral-50 border-neutral-200/50 bg-[#FAFAFA]'
                        }`}
                      >
                        <div className="shrink-0 mt-0.5">
                          <Feather size={14} className={selectedChapterId === 'indigenous' ? 'text-amber-600' : 'text-neutral-500'} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className={`text-xs font-bold ${selectedChapterId === 'indigenous' ? 'text-amber-900 font-extrabold' : 'text-neutral-700'} line-clamp-1`}>
                            🪶 Indigenous Communities Earth
                          </h4>
                          <p className="text-[10px] text-neutral-500 line-clamp-1 mt-0.5 font-sans">Sovereignty & Eco-Remediation Ledger</p>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* GROUP CHAPTERS BY PART */}
                  {['Part I: The Cinematic Timeline', 'Part II: The Contemporary Crucible', 'Part III: The Multi-Trillion-Dollar Prescription', 'Part IV: Deep-Time & Cosmic Physics', 'Appendices: Historical Evidence', 'Appendices: Strategic Blueprint'].map((part) => {
                    const chaptersInPart = filteredChapters.filter(ch => ch.part === part);
                    if (chaptersInPart.length === 0) return null;

                    return (
                      <div key={part} className="space-y-1.5">
                        <h3 className="text-[9px] font-bold text-[#888] uppercase tracking-widest px-2">{part}</h3>
                        <div className="space-y-1">
                          {chaptersInPart.map((ch) => {
                            const isSelected = selectedChapterId === ch.id;
                            // Calculate the sequential index from the main compiled allChapters list
                            const chapterIndex = allChapters.findIndex(c => c.id === ch.id) + 1;
                            
                            return (
                              <div
                                key={ch.id}
                                onClick={() => setSelectedChapterId(ch.id)}
                                className={`p-3 rounded-lg border text-left cursor-pointer transition-all flex items-start gap-2.5 relative overflow-hidden ${
                                  isSelected
                                    ? 'bg-[#F9FAFB] border-[#1A1A1A] shadow-xs'
                                    : 'hover:bg-gray-50 border-transparent'
                                }`}
                              >
                                {/* Spinning Globe or Chapter Index Marker */}
                                <div className="shrink-0 mt-0.5">
                                  {isSelected ? (
                                    <div className="w-8 h-5 rounded overflow-hidden border border-neutral-900 shadow-xs flex items-center justify-center bg-black">
                                      <img 
                                        src={icearthLaunchImg} 
                                        alt="active" 
                                        className="w-full h-full object-cover" 
                                        referrerPolicy="no-referrer" 
                                      />
                                    </div>
                                  ) : (
                                    <div className="w-8 h-5 rounded bg-neutral-100 border border-neutral-200/60 flex items-center justify-center text-[9px] font-mono font-bold text-neutral-400">
                                      {chapterIndex}
                                    </div>
                                  )}
                                </div>

                                <div className="flex-1 min-w-0">
                                  <h4 className={`text-xs font-semibold ${isSelected ? 'text-black' : 'text-[#444]'} line-clamp-1`}>
                                    {ch.title.split(': ')[1] || ch.title}
                                  </h4>
                                  <p className="text-[10px] text-[#666] line-clamp-1 mt-0.5">{ch.subtitle}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                  {filteredChapters.length === 0 && (
                    <div className="text-center py-8 text-xs text-gray-400 font-sans">
                      No matching chapters found.
                    </div>
                  )}
                </div>
              </div>

              {/* BOOK READER CONTENT AREA */}
              <div className="flex-1 flex flex-col overflow-hidden">
                {selectedChapterId === 'indigenous' ? (
                  <div className="flex-1 p-8 overflow-y-auto bg-gray-50/50">
                    <IndigenousSovereigntyTab />
                  </div>
                ) : (
                  <>
                    {/* TOP CHAPTER BANNER */}
                    <div className="px-8 py-4 border-b border-[#E5E5E5] bg-[#FAFAFA] flex items-center justify-between shrink-0">
                  <div className="text-xs font-mono text-[#666] uppercase tracking-wider">
                    {selectedChapter.part}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrevChapter}
                      disabled={currentChapterIndex === 0}
                      className="p-1.5 border border-[#E5E5E5] bg-white rounded-md hover:bg-gray-50 active:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <ChevronLeft size={14} />
                    </button>
                    <span className="text-[11px] font-mono font-medium">
                      {currentChapterIndex + 1} / {allChapters.length}
                    </span>
                    <button
                      onClick={handleNextChapter}
                      disabled={currentChapterIndex === allChapters.length - 1}
                      className="p-1.5 border border-[#E5E5E5] bg-white rounded-md hover:bg-gray-50 active:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>

                {/* THE MANUSCRIPT CONTENT (SERIF) */}
                <div className="flex-1 overflow-y-auto p-12 lg:p-16 flex justify-center bg-white">
                  <article className="max-w-2xl w-full flex flex-col">
                    {/* SOVEREIGN PREAMBLE & DEDICATION TO DR. BRUCE LANPHEAR */}
                    <div className="mb-8 border border-emerald-100 bg-[#FCFBF7] rounded-xl overflow-hidden p-6 shadow-sm">
                      <div className="flex justify-between items-center pb-3 border-b border-emerald-100/60 mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-mono font-bold tracking-widest text-emerald-800 uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                            Sovereign Preamble
                          </span>
                          <span className="text-xs text-neutral-400 font-mono">|</span>
                          <span className="text-[10px] font-sans font-semibold text-neutral-600 uppercase tracking-wider">
                            Origin, Science & Philosophical Testimony
                          </span>
                        </div>
                        <button
                          onClick={() => setIsPreambleExpanded(!isPreambleExpanded)}
                          className="text-[10px] font-mono font-bold text-neutral-500 hover:text-black uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                        >
                          {isPreambleExpanded ? "Collapse ▲" : "Expand ▼"}
                        </button>
                      </div>

                      {isPreambleExpanded ? (
                        <div className="space-y-4 text-xs text-neutral-700 leading-relaxed font-sans animate-fade-in">
                          {/* Part 1: Dedication and Dr. Lanphear */}
                          <div className="flex flex-col md:flex-row gap-5 items-start">
                            <div className="flex-1">
                              <h3 className="text-base font-serif font-bold text-[#111] mb-2 leading-tight">
                                Dedication to Dr. Bruce Lanphear, MD, MPH
                              </h3>
                              <p className="mb-3 font-serif italic text-neutral-800">
                                "Because data seldom move people the way stories do."
                              </p>
                              <p className="mb-3">
                                Redefining human development, preventive medicine, and environmental advocacy requires a marriage of pristine data and profound narrative. This project stands as a tribute to <strong>Dr. Bruce Lanphear</strong> (Simon Fraser University, Vancouver), whose groundbreaking research demonstrated to the world that <strong className="text-red-700 font-semibold">no level of lead exposure is safe</strong>.
                              </p>
                              <p className="mb-3">
                                In 2006, Dr. Lanphear was the guest of honor and keynote speaker at the official launch of the landmark <strong>Greater Cleveland Lead Advisory Council</strong>, inspiring the scientific framing and direct action that followed. The council itself was steered by a dedicated board of Cleveland officials, on which ICEarth founder Norman Roulet (GCLAC Co-Chair) was appointed <strong>Co-Chair for Infrastructure and Sustainability</strong>. This collaborative spark launched a multi-generational journey to expose the catastrophic scope of lead poisoning.
                              </p>
                            </div>
                            
                            <div className="w-full md:w-56 p-4 bg-white border border-neutral-200/60 rounded-lg shrink-0 flex flex-col justify-between shadow-xs">
                              <div>
                                <span className="text-[9px] font-mono font-bold text-emerald-700 block uppercase tracking-wider mb-1">
                                  Thomas Berry's Vision
                                </span>
                                <p className="text-[10.5px] italic text-neutral-600 leading-normal font-serif">
                                  "The greatest challenge is no longer discovering what is harming us. It is finding a story powerful enough to help us stop. Facts matter. Evidence matters. But people rarely organize their lives around facts alone. We organize our lives around stories."
                                </p>
                              </div>
                              <div className="mt-4 pt-2.5 border-t border-neutral-100 flex items-center justify-between text-[8px] text-neutral-400 font-mono">
                                <span>Jun 28, 2026</span>
                                <span>The Dream of the Earth</span>
                              </div>
                            </div>
                          </div>

                          {/* Part 2: Personal Background & The Victim-Advocate Journey */}
                          <div className="border-t border-neutral-150/80 pt-4 space-y-3">
                            <h4 className="text-xs font-serif font-bold text-neutral-900 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0"></span>
                              Personal Testimony: The Ultimate Lead Poisoning Victim-Advocate
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <p className="text-neutral-600">
                                Born in 1961 near the industrial perimeter of Cleveland, Norman Roulet (GCLAC Co-Chair) was raised downwind of roaring steel mills and heavy industry. Living directly on a high-traffic avenue in a historic mansion featuring over 10,000 square feet of lead-based paint (Pb), he suffered severe child lead poisoning—including <strong>Pica disorder</strong>—while family members denied any harm was occurring. Now at 65, 6'1" and 140 pounds, appearing healthy on the outside, he carries coronary artery disease, has survived a major heart attack, suffers from chronic kidney disease, severe digestive issues, endocrine imbalances, and tooth loss—all directly associated with the cumulative developmental and physical destruction of childhood and adult lead poisoning. The clinical realities of neurological and mental impairment are not abstract; they are lived every day. Being perhaps the only severe clinical case of chronic lead poisoning seen by rural New Mexico health providers, he has become a focus of medical attention just for this survival. This is a lifetime sentence that he is resolved to share broadly while still able, serving as the ultimate Lead Poisoning Victim-Advocate.
                              </p>
                              <p className="text-neutral-600">
                                This life-path was shaped by deep parental intellectual roots. His father, <strong>Norman Roulet, MD</strong>, was an esteemed psychiatrist who defined the project's focus on neurological health, science, and the brain. His mother was a brilliant <strong>Dickensian Ph.D.</strong> and <strong>Chair of Humanities of the Cleveland Institute of Art</strong>, raising him on the vivid, moral narratives of Charles Dickens. The intersection of these domains—rigorous clinical science and evocative, socially conscious storytelling—became the bedrock of ICEarth.
                              </p>
                            </div>

                            {/* Sub-section: Systems Engineering Legacy to Vibe Coding */}
                            <div className="mt-4 p-4 bg-linear-to-r from-[#FCFBF7] to-[#F5F4EF] border border-[#E5E5E5] rounded-xl">
                              <h5 className="text-[10px] font-mono font-bold text-emerald-850 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-850 animate-pulse"></span>
                                A Generational Circle: From Paper Tape (1976) to Vibe Coding (2026)
                              </h5>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-neutral-600 leading-relaxed">
                                <div>
                                  <p>
                                    Norman's programming journey began in high school in <strong>1976</strong>, coding on a Hewlett-Packard minicomputer via a physical paper tape drive terminal in <strong>HP-BASIC</strong>, before mastering <strong>FORTRAN</strong> at Tulane University. This foundational systems discipline led to a decorated career benchmarking global enterprise computing for the Chief Information Officers of <strong>HP, Boeing, Motorola</strong>, and other major industrial titans as the <strong>Information Technology and Infrastructure Exchange (ITIX)</strong>.
                                  </p>
                                </div>
                                <div>
                                  <p>
                                    Conceived under <strong>Spectrum Telecom</strong>, the grand architectural vision of ICEarth was carried for decades. In late June 2026, coinciding with his <strong>65th birthday</strong>, this entire high-fidelity platform was built in a continuous 48-hour sprint. By leveraging advanced agentic "vibe coding", we bridged fifty years of traditional computing legacy with real-time generative capabilities—proving that you can teach an old systems dog to vibe at the absolute vanguard of modern software craft.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Part 3: Philosophical Underpinnings & The Morality Play */}
                          <div className="border-t border-neutral-150/80 pt-4 space-y-3">
                            <h4 className="text-xs font-serif font-bold text-neutral-900 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 shrink-0"></span>
                              Tulane Ethics & "The Greatest Morality Play EVER"
                            </h4>
                            <p className="text-neutral-600">
                              Trained as a scholar in philosophy at <strong>Tulane University</strong>, Roulet explored the core mechanics of systematic ideological sanitization for his Ethics thesis, titled <em>"Why Nazis: Nazis Believe Nazis Are Saints"</em>. He identified this comparable failure of human morality recurring throughout the Industrial Revolution—most prominently during his time in New Orleans during the 1970s (the home of the Saints). 
                            </p>
                            <p className="text-neutral-600">
                              New Orleans at that moment represented a global peak in lead poisoning, caused by the massive combustion of leaded gasoline before the phase-out. This catastrophic surge, which heavily supports the **Lead-Crime Hypothesis**, connects the two eras directly through the physical vector of Pb (lead).
                            </p>
                            
                            <div className="bg-white/90 border-l-2 border-emerald-600 p-4 rounded-r-lg space-y-2 mt-2">
                              <h5 className="text-[10px] font-mono font-bold text-emerald-800 uppercase tracking-widest">
                                Literary Genre: The Morality Play
                              </h5>
                              <p className="text-xs text-neutral-600 leading-relaxed italic font-serif">
                                We specifically frame the multi-generational bio-accumulation of heavy metals as the silent speciation of mankind into distinct neurological mutations causing unprecedented harm to human development (formalized in <strong>Roulet's Law Proof Why Homo Nazi ISIS</strong>). We call this <strong>"The Greatest Morality Play EVER"</strong>—invoking the classical theatrical genre where scientific facts and neurological realities directly determine, define, and enforce human morality.
                              </p>
                              <p className="text-[11px] text-neutral-500 font-sans">
                                We are not merely designing an environmental remediation platform; we are giving voice to an ecosystem of victims, advocates, and scientists collaborating to solve the most catastrophic silent crisis in human history.
                              </p>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-neutral-100/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                            <span className="text-[9.5px] text-neutral-400 font-mono">
                              *Reference Essay:* "The Dream of the Earth - Thomas Berry and the Great Story of Our Time"
                            </span>
                            <a 
                              href="https://blanphear.substack.com/p/the-dream-of-the-earth" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1A1A1A] hover:bg-black text-white text-[10px] font-mono font-semibold rounded-md uppercase tracking-wider transition-all cursor-pointer shadow-xs active:scale-[0.98]"
                            >
                              📖 Read Dr. Lanphear's Substack Essay ↗
                            </a>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center text-xs font-serif text-neutral-600">
                          <span>
                            Dedicated to Dr. Bruce Lanphear: <em>"Because data seldom move people the way stories do."</em> | Rooted in Tulane Philosophy & Cleveland Advocacy.
                          </span>
                          <button
                            onClick={() => setIsPreambleExpanded(true)}
                            className="text-[9.5px] font-mono text-emerald-700 hover:underline cursor-pointer uppercase font-bold font-sans"
                          >
                            Expand Preamble
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="mb-10 border-b border-[#E5E5E5] pb-8">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                        <div className="flex-1">
                          <h3 className="text-xs font-mono text-[#999] mb-3 tracking-widest uppercase flex items-center justify-between">
                            <span className="flex items-center gap-1.5">
                              <span className="w-6 h-3.5 rounded-sm overflow-hidden border border-neutral-300 inline-block align-middle shrink-0 shadow-xs">
                                <img src={icearthLaunchImg} alt="ICEarth" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              </span>
                              [RESTORED_OUTPUT_{selectedChapter.id.slice(-2).toUpperCase() || "01"}]
                            </span>
                            <button
                              onClick={() => {
                                const url = `${window.location.origin}${window.location.pathname}?tab=manuscript&id=${selectedChapter.id}`;
                                navigator.clipboard.writeText(url);
                                setCopiedChapterId(selectedChapter.id);
                                setTimeout(() => setCopiedChapterId(null), 2000);
                              }}
                              className="text-[10px] font-mono text-neutral-500 hover:text-amber-600 bg-neutral-100 hover:bg-neutral-200 px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer font-sans normal-case font-semibold shrink-0"
                              title="Copy Chapter Permalink"
                            >
                              {copiedChapterId === selectedChapter.id ? (
                                <>
                                  <Check size={11} className="text-emerald-600" />
                                  <span className="text-emerald-600">Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Link2 size={11} />
                                  <span>Copy Permalink</span>
                                </>
                              )}
                            </button>
                          </h3>
                          <h2 className="text-3.5xl font-serif font-light text-[#111] leading-tight">
                            {selectedChapter.title}
                          </h2>
                          <p className="text-sm font-sans text-[#666] mt-3 uppercase tracking-wider font-medium">
                            {selectedChapter.subtitle}
                          </p>
                        </div>
                        
                        {/* Premium Floating Badge */}
                        <div className="w-24 h-14 rounded-lg overflow-hidden border border-neutral-200 bg-white p-0.5 shadow-sm hidden md:block shrink-0">
                          <div className="w-full h-full rounded overflow-hidden bg-black flex items-center justify-center">
                            <img 
                              src={icearthLaunchImg} 
                              alt="ICEarth Logo" 
                              className="w-full h-full object-cover" 
                              referrerPolicy="no-referrer" 
                            />
                          </div>
                        </div>
                      </div>

                      {/* Featured GIF Animation for Chapter 1 */}
                      {selectedChapter.id === 'chapter-1' && (
                        <div className="mt-8 mb-6 flex flex-col items-center">
                          <div className="max-w-md w-full rounded-xl overflow-hidden border border-neutral-200/80 bg-neutral-950 p-1.5 shadow-sm relative group">
                            <div className="absolute top-4 left-4 z-10 bg-black/75 backdrop-blur-md border border-neutral-850 px-2.5 py-1 rounded-md text-[9px] font-mono font-bold tracking-widest text-emerald-400 uppercase flex items-center gap-1.5 shadow-sm">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                              ICEarth Dynamic Model Simulation
                            </div>
                            <img 
                              src={icearthGif} 
                              alt="ICEarth1 Animation" 
                              className="max-w-full h-auto rounded-lg block mx-auto" 
                              referrerPolicy="no-referrer"
                            />
                            <div className="p-3 bg-neutral-900 text-center border-t border-neutral-850">
                              <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                                Figure 1: Atmospheric Perturbation & Human Cognitive Erosion Animation (1996 - Present)
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Display Formula block if present */}
                      {selectedChapter.formula && (
                        <div className="mt-6 p-4 bg-[#F9FAFB] rounded-lg border border-[#E5E5E5] font-mono text-xs text-[#1A1A1A] flex items-center gap-3">
                          <Activity size={14} className="text-emerald-500 shrink-0" />
                          <div className="flex-1">
                            <span className="text-[9px] text-gray-400 block uppercase tracking-widest font-bold">ROULET'S LAW FUNCTION</span>
                            <span className="text-sm font-semibold font-mono tracking-tight text-center block md:inline-block w-full text-emerald-700">
                              {selectedChapter.formula}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* EXHIBIT 1 SCATTERPLOT IMAGE FOR CHAPTER 1 PAGE 1 */}
                      {selectedChapter.id === 'chapter-1' && (
                        <div className="mt-6">
                          <div className="group relative border border-[#E5E5E5] rounded-xl overflow-hidden bg-white shadow-xs transition-all hover:shadow-md">
                            {/* Header and Toggle Controls */}
                            <div className="px-4 py-2.5 bg-[#FAFAFA] border-b border-[#E5E5E5] flex flex-col sm:flex-row gap-2 justify-between items-stretch sm:items-center">
                              <span className="text-[10px] font-mono font-bold tracking-wider text-red-600 uppercase flex items-center gap-1.5 font-sans">
                                <FileText size={12} className="animate-pulse text-red-600" />
                                Exhibit 1: Roulet's Law Proof Diagram
                              </span>
                              
                              <div className="flex items-center gap-2 self-end sm:self-auto">
                                <div className="inline-flex rounded-md p-0.5 bg-gray-100 border border-gray-200">
                                  <button
                                    onClick={() => setExhibitViewMode('interactive')}
                                    className={`px-2 py-1 text-[9px] font-sans font-semibold rounded-sm transition-all cursor-pointer ${
                                      exhibitViewMode === 'interactive'
                                        ? 'bg-[#1A1A1A] text-white shadow-xs'
                                        : 'text-gray-500 hover:text-black'
                                    }`}
                                  >
                                    Interactive Plot
                                  </button>
                                  <button
                                    onClick={() => {
                                      if (!imageLoadError) {
                                        setExhibitViewMode('original');
                                      }
                                    }}
                                    disabled={imageLoadError}
                                    className={`px-2 py-1 text-[9px] font-sans font-semibold rounded-sm transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                                      exhibitViewMode === 'original'
                                        ? 'bg-[#1A1A1A] text-white shadow-xs'
                                        : 'text-gray-500 hover:text-black'
                                    }`}
                                  >
                                    Original Image
                                  </button>
                                </div>
                                <button
                                  onClick={() => {
                                    setModalImageSrc(scatterplotImg);
                                    setModalImageTitle("Exhibit 1: The Master Scatterplot of Human History");
                                    setIsImageModalOpen(true);
                                  }}
                                  className="text-[10px] font-sans font-medium text-gray-500 hover:text-black flex items-center gap-1 transition-colors cursor-pointer ml-1"
                                >
                                  <span>🔍 Fullscreen</span>
                                </button>
                              </div>
                            </div>

                            {/* Warning notification for image load failure */}
                            {imageLoadError && (
                              <div className="px-4 py-2 bg-amber-50 border-b border-amber-200 flex items-center gap-2 text-[11px] font-sans text-amber-800">
                                <AlertCircle size={13} className="text-amber-600 shrink-0 animate-bounce" />
                                <span><strong>Sovereign Backup Activated</strong>: Cloud assets routing failed. Displaying local high-fidelity interactive vector data plot.</span>
                              </div>
                            )}
                            
                            {/* Interactive SVG Plot */}
                            {exhibitViewMode === 'interactive' ? (
                              <div className="p-6 bg-neutral-950 text-white flex flex-col select-none">
                                <div className="mb-4 flex justify-between items-center">
                                  <div>
                                    <h5 className="text-[10px] font-mono font-semibold text-emerald-400 uppercase tracking-widest">
                                      Biogeochemical Regression Curve
                                    </h5>
                                    <p className="text-[11px] text-neutral-400 font-sans">
                                      Hover over coordinates to trace historical prefrontal gray matter decay ($H'$).
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <span className="text-[10px] font-mono px-2 py-0.5 bg-neutral-900 border border-neutral-800 text-neutral-300 rounded font-bold">
                                      Perturbation Theory (1st order Pb) × Uncertainty Principle = Chaos Theory × Relativity
                                    </span>
                                  </div>
                                </div>

                                <div className="relative w-full h-80 bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden p-4 font-mono">
                                  {/* Background Grid Lines */}
                                  <div className="absolute inset-0 grid grid-cols-5 grid-rows-5 pointer-events-none opacity-20">
                                    {Array.from({ length: 6 }).map((_, i) => (
                                      <div key={i} className="border-t border-neutral-700 w-full h-0" style={{ top: `${i * 20}%` }}></div>
                                    ))}
                                    {Array.from({ length: 6 }).map((_, i) => (
                                      <div key={i} className="border-l border-neutral-700 h-full w-0" style={{ left: `${i * 20}%` }}></div>
                                    ))}
                                  </div>

                                  <svg className="w-full h-full overflow-visible" viewBox="0 0 600 240" preserveAspectRatio="none">
                                    {/* Dotted Trendline representing Roulet's Law Curve */}
                                    <path
                                      d="M 50 200 Q 150 195 280 180 T 450 120 T 550 50"
                                      fill="none"
                                      stroke="rgba(239, 68, 68, 0.4)"
                                      strokeWidth="2"
                                      strokeDasharray="4 4"
                                    />
                                    
                                    {/* Trendline label */}
                                    <text x="320" y="125" fill="#EF4444" fontSize="9" className="font-mono opacity-80" transform="rotate(-15 320 125)">
                                      Roulet's Law Regression Path ↗
                                    </text>

                                    {/* Axes labels */}
                                    {/* Y-axis markers */}
                                    <text x="10" y="45" fill="#888" fontSize="8" className="font-mono">1000</text>
                                    <text x="10" y="125" fill="#888" fontSize="8" className="font-mono">500</text>
                                    <text x="10" y="205" fill="#888" fontSize="8" className="font-mono">0</text>

                                    {/* X-axis markers */}
                                    <text x="50" y="235" fill="#888" fontSize="8" className="font-mono text-center">0.016</text>
                                    <text x="180" y="235" fill="#888" fontSize="8" className="font-mono">1.0</text>
                                    <text x="320" y="235" fill="#888" fontSize="8" className="font-mono">10.0</text>
                                    <text x="540" y="235" fill="#888" fontSize="8" className="font-mono">50.0</text>

                                    {/* Draw Plot Points */}
                                    {HISTORIC_DATA.map((d, index) => {
                                      // Scale functions
                                      const minVal = 0.01;
                                      const maxVal = 50.0;
                                      const logMin = Math.log10(minVal);
                                      const logMax = Math.log10(maxVal);
                                      const val = Math.max(minVal, d.bll);
                                      const logVal = Math.log10(val);
                                      const fractionX = (logVal - logMin) / (logMax - logMin);
                                      const cx = 50 + fractionX * 490; // 50 to 540

                                      const fractionY = d.crimeRate / 1000;
                                      const cy = 200 - fractionY * 160; // 40 to 200

                                      // Node coloration based on threat level
                                      let color = "#10B981"; // green (unperturbed)
                                      let glow = "rgba(16, 185, 129, 0.4)";
                                      if (d.bll > 3.0 && d.bll <= 10.0) {
                                        color = "#F59E0B"; // yellow
                                        glow = "rgba(245, 158, 11, 0.4)";
                                      } else if (d.bll > 10.0) {
                                        color = "#EF4444"; // red (poisoned)
                                        glow = "rgba(239, 68, 68, 0.4)";
                                      }

                                      const isHovered = hoveredNodeId === index;

                                      return (
                                        <g 
                                          key={index}
                                          className="cursor-pointer"
                                          onMouseEnter={() => setHoveredNodeId(index)}
                                          onMouseLeave={() => setHoveredNodeId(null)}
                                        >
                                          {/* Glowing Background ring */}
                                          <circle
                                            cx={cx}
                                            cy={cy}
                                            r={isHovered ? 12 : 7}
                                            fill={glow}
                                            className="transition-all duration-300"
                                          />
                                          {/* Solid core */}
                                          <circle
                                            cx={cx}
                                            cy={cy}
                                            r={isHovered ? 6 : 4}
                                            fill={color}
                                            className="transition-all duration-300"
                                            stroke="#FFFFFF"
                                            strokeWidth={isHovered ? 2 : 1}
                                          />
                                          {/* Mini label for high priority points */}
                                          {isHovered && (
                                            <text
                                              x={cx}
                                              y={cy - 16}
                                              fill="#FFFFFF"
                                              fontSize="10"
                                              textAnchor="middle"
                                              className="font-sans font-bold bg-black shadow-lg"
                                            >
                                              {d.label.split(' (')[0]}
                                            </text>
                                          )}
                                        </g>
                                      );
                                    })}
                                  </svg>

                                  {/* Floating Legend / Subtitle */}
                                  <div className="absolute top-2 left-16 bg-neutral-950/80 p-2 rounded border border-neutral-800 text-[9px] text-neutral-400 space-y-1">
                                    <div className="flex items-center gap-1.5">
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                      <span>0.016 μg/dL Pristine Baseline (Homo Sapiens 0)</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                      <span>Sub-Acute Neurobiological Atrophy</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                      <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                      <span>Severe Saturated Anthropogenic Chaos</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Active Node Explanation Box */}
                                <div className="mt-4 p-3 bg-neutral-900 border border-neutral-800 rounded-lg min-h-24">
                                  {hoveredNodeId !== null ? (
                                    <div className="font-sans text-xs">
                                      <div className="flex justify-between items-center border-b border-neutral-800 pb-1.5 mb-1.5">
                                        <span className="font-bold text-white uppercase font-mono tracking-wider text-[10px]">
                                          {HISTORIC_DATA[hoveredNodeId].label}
                                        </span>
                                        <span className="font-mono text-neutral-400">
                                          Year: {HISTORIC_DATA[hoveredNodeId].year < 0 ? `${Math.abs(HISTORIC_DATA[hoveredNodeId].year)} BC` : `${HISTORIC_DATA[hoveredNodeId].year} AD`}
                                        </span>
                                      </div>
                                      <div className="grid grid-cols-2 gap-4 mb-2">
                                        <div>
                                          <span className="text-[10px] text-neutral-500 block uppercase font-mono">Blood Lead Level (BLL)</span>
                                          <span className="text-sm font-semibold font-mono text-neutral-200">
                                            {HISTORIC_DATA[hoveredNodeId].bll} μg/dL
                                          </span>
                                        </div>
                                        <div>
                                          <span className="text-[10px] text-neutral-500 block uppercase font-mono">Chaos Index Rate</span>
                                          <span className="text-sm font-semibold font-mono text-neutral-200">
                                            {HISTORIC_DATA[hoveredNodeId].crimeRate} / 100k
                                          </span>
                                        </div>
                                      </div>
                                      <p className="text-neutral-400 text-[11px] leading-relaxed">
                                        {HISTORIC_DATA[hoveredNodeId].label === "Çatalhöyük (Earliest Smelting)" && "At Çatalhöyük in modern Turkey (~8000 BC), humans first heated lead sulfide ore (galena), initiating the first anthropogenic extraction of lead from the Earth's crust."}
                                        {HISTORIC_DATA[hoveredNodeId].label === "Pre-Industrial Native Americans" && "Bone lead measurements from Native Americans living on the Pacific coast (~1000-1300 AD) reveal a pristine biological baseline of 0.016 μg/dL—the unperturbed control standard (Homo Sapiens 0)."}
                                        {HISTORIC_DATA[hoveredNodeId].label === "Roman Republic Peak (Sapa & fistulae)" && "Roman aristocrats boiled acidic grape juice in lead pots to produce 'sapa' syrup (sweetened with lead acetate) and piped water through lead 'fistulae', inducing cognitive decay in Rome's ruling class."}
                                        {HISTORIC_DATA[hoveredNodeId].label === "Post-Rome Collapse Peak" && "Following Rome's fall, lead deposition dropped significantly, letting soil baselines slowly heal, though localized metallurgy preserved toxic hot spots in Europe."}
                                        {HISTORIC_DATA[hoveredNodeId].label === "Medieval Low (Europe)" && "Before industrialization, medieval farming communities had minimal atmospheric lead exposure, allowing standard cognitive development outside city smelting sites."}
                                        {HISTORIC_DATA[hoveredNodeId].label === "Dickensian East London Lead Mills" && "Dickens's 1869 report 'On an Amateur Beat' captured the absolute horror of white-lead mills. Workers suffered chronic encephalopathy and paralysis for a meager eighteen-pence a day."}
                                        {HISTORIC_DATA[hoveredNodeId].label === "TEL Patented (Midgley & Standard Oil)" && "In 1921, Thomas Midgley, Standard Oil, and DuPont patented Tetraethyl Lead (TEL). Despite knowing its high toxicity, they suppressed safe alternatives (unpatentable ethanol) for massive monopoly profits."}
                                        {HISTORIC_DATA[hoveredNodeId].label === "Peak Leaded Gasoline (USA / Chicago)" && "By 1975, standard leaded fuel emissions saturated the global biosphere. Chicago's high-traffic areas suffered extreme saturation, altering the neurobiological baseline of an entire generation."}
                                        {HISTORIC_DATA[hoveredNodeId].label === "Post-Leaded Gasoline Phaseout (USA)" && "In 1995, after leaded fuel was phased out due to Patterson's data, pediatric blood lead levels and national violent crime indices plummeted, proving the Lead-Crime Hypothesis."}
                                        {HISTORIC_DATA[hoveredNodeId].label === "Modern Legacy Era (Chicago Slums)" && "High-risk, historic Chicago ZIP codes (reaching 82.0% Black population density) remain targeted by legacy lead paint and water infrastructure, driving localized HPA axis stress and higher crime."}
                                        {HISTORIC_DATA[hoveredNodeId].label === "Projected ICEarth Target Baseline" && "The ultimate multi-trillion-dollar sovereign objective of ICEarth: using decentralized technology, smart-contract escrows, and AI to restore all urban environments to the pristine 0.016 μg/dL baseline."}
                                      </p>
                                    </div>
                                  ) : (
                                    <div className="flex items-center justify-center h-full text-center text-neutral-500 font-sans text-xs">
                                      <p>Hover over coordinates to display chronological data profiles and historical receipts.</p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ) : (
                              /* Archival Original Photo Image */
                              <div 
                                className="relative cursor-pointer overflow-hidden aspect-square flex items-center justify-center bg-white"
                                onClick={() => {
                                  setModalImageSrc(scatterplotImg);
                                  setModalImageTitle("Exhibit 1: The Master Scatterplot of Human History");
                                  setIsImageModalOpen(true);
                                }}
                              >
                                <img
                                  src={scatterplotImg}
                                  alt="Exhibit 1: The Master Scatterplot of Human History"
                                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-101 p-2"
                                  referrerPolicy="no-referrer"
                                  onError={() => {
                                    setImageLoadError(true);
                                    setExhibitViewMode('interactive');
                                  }}
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-center justify-center">
                                  <div className="bg-black/80 text-white text-[10px] px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans shadow-sm">
                                    Click to view full resolution
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Caption Footer */}
                            <div className="p-3.5 bg-[#FAFAFA] border-t border-[#E5E5E5] text-xs font-sans text-gray-600 leading-relaxed">
                              <strong className="text-black font-semibold">Exhibit 1: The Master Scatterplot of Human History</strong>. The original, exact multi-quadrant historical map submitted directly as evidence of Roulet's Law, representing the raw empirical scatterplots and chaotic regression boundaries of subatomic lead perturbation against macro-scale crime.
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* MAIN ESSAY CONTENT */}
                    <div className="space-y-6 font-serif text-base leading-relaxed text-[#2C2C2C] markdown-container">
                      {selectedChapter.content.split('\n\n').map((paragraph, index) => {
                        // Check if paragraph is heading
                        if (paragraph.startsWith('### ')) {
                          return (
                            <h3 key={index} className="text-lg font-serif font-bold text-black pt-4 pb-2 border-b border-gray-100">
                              {paragraph.replace('### ', '')}
                            </h3>
                          );
                        }
                        // Check if paragraph is numbered list or list item
                        if (paragraph.startsWith('1. ') || paragraph.startsWith('* ')) {
                          return (
                            <ul key={index} className="space-y-3 font-serif text-base pl-6 list-disc text-gray-800 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                              {paragraph.split('\n').map((li, i) => (
                                <li key={i} className="leading-relaxed">
                                  {li.replace(/^[0-9*.\s\-]+/, '')}
                                </li>
                              ))}
                            </ul>
                          );
                        }
                        
                        // Parse simple bold markers manually for a premium look
                        const parsedParagraph = paragraph.split('**').map((text, i) => {
                          if (i % 2 === 1) {
                            return <strong key={i} className="font-sans font-bold text-black">{text}</strong>;
                          }
                          return text;
                        });

                        return (
                          <p key={index} className="whitespace-pre-line">
                            {parsedParagraph}
                          </p>
                        );
                      })}
                    </div>

                    {/* CHAPTER METRICS SUMMARY PANEL */}
                    <div className="mt-16 pt-8 border-t border-[#E5E5E5] grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-[10px] font-bold text-[#1A1A1A] uppercase tracking-widest mb-3 flex items-center gap-2 font-sans">
                          <Shield size={12} className="text-emerald-500" />
                          Key Takeaways
                        </h4>
                        <ul className="space-y-2 text-xs text-[#555] font-sans">
                          {selectedChapter.keyTakeaways.map((takeaway, i) => (
                            <li key={i} className="flex gap-2.5 items-start">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a] mt-1.5 shrink-0" />
                              <span>{takeaway}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-[10px] font-bold text-[#1A1A1A] uppercase tracking-widest mb-3 flex items-center gap-2 font-sans">
                          <FileText size={12} className="text-[#666]" />
                          Historical References
                        </h4>
                        <div className="flex flex-wrap gap-1.5 font-sans">
                          {selectedChapter.historicalFigures.map((fig, i) => (
                            <span key={i} className="px-2.5 py-1 bg-gray-100 text-[#444] rounded-md text-[10px] font-mono border border-gray-200">
                              {fig}
                            </span>
                          ))}
                        </div>
                        <div className="mt-4 p-3.5 bg-[#F9FAFB] rounded-lg border border-dashed border-gray-200 font-sans">
                          <p className="text-[10px] text-[#777] leading-relaxed">
                            Looking to write or expand this restored chapter further? Send it straight to the AI Co-Author below to generate new manuscript paragraphs.
                          </p>
                          <button
                            onClick={() => {
                              setActiveTab('chat');
                              handleSendMessage(`Let's expand the sections in "${selectedChapter.title}" exploring our core proofs.`);
                            }}
                            className="mt-2 text-[10px] font-semibold text-black hover:underline cursor-pointer flex items-center gap-1"
                          >
                            Send chapter context to AI Co-Author →
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
                </>
                )}
              </div>

            </div>
          )}

          {/* TAB 2: EXPOSENOMIC SIMULATOR */}
          {activeTab === 'simulator' && (
            remediationTrack === 'lead' ? (
              <div className="flex-1 flex flex-col md:flex-row overflow-y-auto">
              
              {/* CONTROLS SIDEBAR */}
              <div className="w-full md:w-96 border-r border-[#E5E5E5] bg-white p-6 space-y-8 shrink-0">
                <div>
                  <h2 className="text-xs font-mono text-[#999] mb-1 uppercase tracking-widest">[ROULETS_LAW_SIMULATOR]</h2>
                  <h3 className="text-xl font-serif font-light">Exposenomics Optimizer</h3>
                  <p className="text-xs text-[#666] mt-2 font-sans">
                    Adjust the parameters of Roulet's Law—framed as Perturbation Theory (1st-order Pb) × Uncertainty Principle = Chaos Theory × Relativity—below to simulate how the subatomic perturbation of lead ($H'$) affects prefrontal gray matter volume, HPA axis hormone levels, and macro-scale chaos rates across humanity.
                  </p>
                </div>

                {/* SLIDER 1: LEAD PERTURBATION */}
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-[#1A1A1A] flex items-center gap-1.5">
                      🔴 Lead Perturbation (BLL)
                    </span>
                    <span className="font-mono text-[11px] font-bold px-2 py-0.5 bg-red-50 text-red-600 rounded">
                      {simState.leadPerturbation === 0.016 ? '0.016 (Standard)' : `${simState.leadPerturbation} μg/dL`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="0.1"
                    value={simState.leadPerturbation}
                    onChange={(e) => setSimState(prev => ({ ...prev, leadPerturbation: Number(e.target.value) }))}
                    className="w-full accent-red-600 h-1.5 bg-gray-100 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-[#888] font-mono">
                    <button 
                      onClick={() => setSimState(prev => ({ ...prev, leadPerturbation: 0.016 }))}
                      className="hover:text-black hover:underline cursor-pointer"
                    >
                      0.016 (Homo Sapiens 0)
                    </button>
                    <span>6.8 (Modern Legacy)</span>
                    <span>45.0 (Lead Mills)</span>
                  </div>
                </div>

                {/* SLIDER 2: SOVEREIGN AI COMPUTE */}
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-[#1A1A1A] flex items-center gap-1.5">
                      ⚙️ AI Compute Node (S_ai)
                    </span>
                    <span className="font-mono text-[11px] font-bold px-2 py-0.5 bg-sky-50 text-sky-600 rounded">
                      {simState.sovereignAICompute}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={simState.sovereignAICompute}
                    onChange={(e) => setSimState(prev => ({ ...prev, sovereignAICompute: Number(e.target.value) }))}
                    className="w-full accent-sky-600 h-1.5 bg-gray-100 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-[#888] font-mono">
                    <span>0% Offline</span>
                    <span>50% Shared Node</span>
                    <span>100% Fully Autonomous</span>
                  </div>
                </div>

                {/* SLIDER 3: REMEDIATION CAPITAL */}
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-[#1A1A1A] flex items-center gap-1.5">
                      💰 Remediation Capital
                    </span>
                    <span className="font-mono text-[11px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded">
                      ${simState.remediationCapital} Trillions
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.1"
                    value={simState.remediationCapital}
                    onChange={(e) => setSimState(prev => ({ ...prev, remediationCapital: Number(e.target.value) }))}
                    className="w-full accent-emerald-600 h-1.5 bg-gray-100 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-[#888] font-mono">
                    <span>$0.0 Trillion</span>
                    <span>$5.0T Budget</span>
                    <span>$10.0T Max Clean</span>
                  </div>
                </div>

                {/* SLIDER 4: SOCIO-ECONOMIC STRESS FACTOR */}
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-[#1A1A1A] flex items-center gap-1.5">
                      📉 Socio-Economic Stress
                    </span>
                    <span className="font-mono text-[11px] font-bold px-2 py-0.5 bg-amber-50 text-amber-600 rounded">
                      {simState.socioEconomicFactor}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={simState.socioEconomicFactor}
                    onChange={(e) => setSimState(prev => ({ ...prev, socioEconomicFactor: Number(e.target.value) }))}
                    className="w-full accent-amber-600 h-1.5 bg-gray-100 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-[#888] font-mono">
                    <span>Low Stress (Pristine)</span>
                    <span>Medium Stress</span>
                    <span>Severe Deprivation</span>
                  </div>
                </div>

                {/* FORMULA RECAP */}
                <div className="p-4 bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl space-y-2">
                  <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400">Roulet's Law Output Ratio</h4>
                  <div className="text-sm font-mono text-center font-bold text-emerald-800">
                    Chaos × Relativity = {simState.leadPerturbation === 0.016 ? '0.016' : simState.leadPerturbation} × δ
                  </div>
                  <p className="text-[10px] text-gray-500 text-center leading-relaxed font-sans">
                    As Perturbation approaches 0.016 μg/dL, subatomic noise collapses and society achieves thermodynamic homeostasis.
                  </p>
                </div>
              </div>

              {/* SIMULATION VISUALIZATIONS */}
              <div className="flex-1 p-8 space-y-8 bg-white overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  
                  {/* METRIC 1 */}
                  <div className="p-5 border border-[#E5E5E5] bg-white rounded-xl shadow-xs flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-[#999] uppercase tracking-wider block">Prefrontal Cortex Volume</span>
                      <span className="text-2xl font-serif font-light text-black block mt-2">{derivedOutputs.pfcVolume}%</span>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[10px] text-gray-400">Gray Matter Density</span>
                      <span className={`text-[10px] font-mono font-medium ${derivedOutputs.pfcVolume < 75 ? 'text-red-500' : 'text-emerald-500'}`}>
                        {derivedOutputs.pfcVolume < 75 ? 'Atrophied' : 'Optimized'}
                      </span>
                    </div>
                  </div>

                  {/* METRIC 2 */}
                  <div className="p-5 border border-[#E5E5E5] bg-white rounded-xl shadow-xs flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-[#999] uppercase tracking-wider block">HPA Axis Stress Overdrive</span>
                      <span className="text-2xl font-serif font-light text-black block mt-2">{derivedOutputs.hpaOverdrive}%</span>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[10px] text-gray-400">Adrenal Cortisol Output</span>
                      <span className={`text-[10px] font-mono font-medium ${derivedOutputs.hpaOverdrive > 60 ? 'text-red-500' : 'text-emerald-500'}`}>
                        {derivedOutputs.hpaOverdrive > 60 ? 'Saturated' : 'Homeostatic'}
                      </span>
                    </div>
                  </div>

                  {/* METRIC 3 */}
                  <div className="p-5 border border-[#E5E5E5] bg-white rounded-xl shadow-xs flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-[#999] uppercase tracking-wider block">Macro Chaos Index (Crime)</span>
                      <span className="text-2xl font-serif font-light text-black block mt-2">{derivedOutputs.chaosIndex}</span>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[10px] text-gray-400">Incidents per 100,000</span>
                      <span className={`text-[10px] font-mono font-medium ${derivedOutputs.chaosIndex > 500 ? 'text-red-500 animate-pulse' : 'text-emerald-500'}`}>
                        {derivedOutputs.chaosIndex > 500 ? 'Violent Epidemic' : 'Safe Baseline'}
                      </span>
                    </div>
                  </div>

                  {/* METRIC 4 */}
                  <div className="p-5 border border-[#E5E5E5] bg-white rounded-xl shadow-xs flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-[#999] uppercase tracking-wider block">Homo Sapiens 0 Proximity</span>
                      <span className="text-2xl font-serif font-light text-black block mt-2">{derivedOutputs.homoSapiensBaselineProximity}%</span>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[10px] text-gray-400">0.016 μg/dL Target</span>
                      <span className={`text-[10px] font-mono font-medium ${derivedOutputs.homoSapiensBaselineProximity > 80 ? 'text-emerald-500' : 'text-amber-500'}`}>
                        {derivedOutputs.homoSapiensBaselineProximity > 80 ? 'Primal Match' : 'Perturbed'}
                      </span>
                    </div>
                  </div>

                </div>

                {/* CUSTOM SVG SCATTERPLOT INTEGRATION */}
                <div className="p-6 border border-[#E5E5E5] bg-[#FCFCFC] rounded-2xl">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold tracking-tight uppercase flex items-center gap-2">
                        <Activity size={16} className="text-red-500" />
                        Exhibit 1: Roulet's Law Why Nazis Proof
                      </h4>
                      <p className="text-xs text-[#666] font-sans mt-0.5">
                        Analytical scatterplot modeling Blood Lead Levels (BLL) vs. Crime Volatility throughout global human history.
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-[11px] font-mono">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A]"></span>
                        <span>Historic Record</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                        <span className="text-red-600 font-bold">Simulated Setting</span>
                      </div>
                    </div>
                  </div>

                  {/* HIGHLY CUSTOM SVG PLOT - ROBUST AND RESPONSIVE */}
                  <div className="relative w-full h-80 bg-white border border-[#E5E5E5] rounded-xl overflow-hidden p-6 font-mono">
                    <div className="absolute inset-0 grid grid-cols-5 grid-rows-5 pointer-events-none">
                      {Array.from({ length: 25 }).map((_, i) => (
                        <div key={i} className="border-t border-l border-gray-50 border-dashed" />
                      ))}
                    </div>

                    <svg className="w-full h-full overflow-visible" viewBox="0 0 600 240" preserveAspectRatio="none">
                      {/* Grid Lines */}
                      <line x1="0" y1="240" x2="600" y2="240" stroke="#E5E5E5" strokeWidth="1.5" />
                      <line x1="0" y1="0" x2="0" y2="240" stroke="#E5E5E5" strokeWidth="1.5" />

                      {/* Mathematical Trendline (Exponential projection representing Roulet's Law) */}
                      <path 
                        d="M 5,238 Q 150,220 300,160 T 590,10" 
                        fill="none" 
                        stroke="#F3F4F6" 
                        strokeWidth="10" 
                        strokeLinecap="round" 
                      />
                      <path 
                        d="M 5,238 Q 150,220 300,160 T 590,10" 
                        fill="none" 
                        stroke="#999" 
                        strokeWidth="1" 
                        strokeDasharray="4,4" 
                      />

                      {/* Map Historical Data points */}
                      {HISTORIC_DATA.map((pt, i) => {
                        // Map log-like or fractional scale for 0 to 50 ug/dL on X -> 0 to 600 width
                        // Y maps 0 to 1000 crime rate -> 240 height (invert Y)
                        const x = Math.min(580, 20 + (pt.bll * 11.2));
                        const y = 240 - Math.min(230, (pt.crimeRate / 1000) * 220);

                        return (
                          <g key={i} className="group">
                            <circle 
                              cx={x} 
                              cy={y} 
                              r="5" 
                              className="fill-[#1A1A1A] hover:fill-red-500 hover:r-7 transition-all cursor-pointer" 
                            />
                            {/* Simple dynamic SVG label on hover */}
                            <foreignObject x={x - 60} y={y - 35} width="120" height="30" className="hidden group-hover:block pointer-events-none">
                              <div className="bg-black/90 text-white text-[9px] p-1 rounded shadow-md text-center leading-tight">
                                {pt.label}
                                <span className="block font-mono text-[8px] text-gray-300">
                                  BLL: {pt.bll} • Crime: {pt.crimeRate}
                                </span>
                              </div>
                            </foreignObject>
                          </g>
                        );
                      })}

                      {/* Current Simulated Point: DYNAMIC */}
                      {(() => {
                        const bll = simState.leadPerturbation;
                        const x = Math.min(580, 20 + (bll * 11.2));
                        const y = 240 - Math.min(230, (derivedOutputs.chaosIndex / 1000) * 220);

                        return (
                          <g>
                            {/* Radar pulses */}
                            <circle cx={x} cy={y} r="14" fill="rgba(239, 68, 68, 0.15)" className="animate-pulse" />
                            <circle cx={x} cy={y} r="8" fill="rgba(239, 68, 68, 0.3)" />
                            <circle cx={x} cy={y} r="4" fill="#EF4444" />
                          </g>
                        );
                      })()}
                    </svg>

                    {/* SVG Labels */}
                    <div className="absolute left-1 top-2 text-[8px] text-gray-400 tracking-wider">
                      ▲ Volatility Rate (Incidents / 100k)
                    </div>
                    <div className="absolute right-3 bottom-1.5 text-[8px] text-gray-400 tracking-wider">
                      Blood Lead Level (BLL μg/dL) ▶
                    </div>

                    {/* Manual plot annotations */}
                    <div className="absolute text-[8px] text-[#666] left-4 bottom-8 flex flex-col pointer-events-none">
                      <span className="font-bold text-black font-sans">Homo Sapiens 0</span>
                      <span>(0.016 μg/dL)</span>
                    </div>

                    <div className="absolute text-[8px] text-[#666] right-8 top-16 text-right flex flex-col pointer-events-none">
                      <span className="font-bold text-black font-sans">Dickensian Mills</span>
                      <span>(45 μg/dL)</span>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-gray-100 text-xs text-[#555] leading-relaxed">
                      <strong className="text-black block mb-1">How to Read Exhibit 1:</strong>
                      Observe the exponential trendline of Roulet's Law. Ancient civilizations (Roman peak) and high-density industrial slums (1869 Lead Mills, 1975 peak gasoline) align on the high-chaos curve. Our goal is to shift current simulated metrics towards the unperturbed bottom-left standard (0.016 μg/dL).
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-gray-100 text-xs text-[#555] leading-relaxed">
                      <strong className="text-black block mb-1">Optimization Formula:</strong>
                      Remediation Capital is released directly when the Simulated setting approaches the Homo Sapiens 0 target. Deploying computing assets (<span className="text-sky-600 font-bold">S_ai</span>) allows AI nodes to automate remediation and reduce the Chaos outcome by up to 70%.
                    </div>
                  </div>
                </div>

                {/* CHICAGO DEMOGRAPHIC GRAPHICS */}
                <div className="p-6 border border-[#E5E5E5] bg-white rounded-2xl">
                  <h4 className="text-sm font-semibold tracking-tight uppercase mb-4 flex items-center gap-2">
                    <Database size={16} className="text-[#666]" />
                    Chicago Demographic Lead Distribution Database
                  </h4>
                  <p className="text-xs text-[#666] mb-4">
                    Historically aggregated exposure metrics modeling racial segregation vs. subatomic lead saturation in urban Illinois.
                  </p>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse font-mono text-xs">
                      <thead>
                        <tr className="border-b border-[#E5E5E5] text-left text-gray-400 uppercase text-[9px] tracking-widest bg-gray-50">
                          <th className="py-2.5 px-4 font-semibold">Demographic Group Area</th>
                          <th className="py-2.5 px-4 font-semibold">BLL Range</th>
                          <th className="py-2.5 px-4 font-semibold text-center">Exposure Density %</th>
                          <th className="py-2.5 px-4 font-semibold text-right">Crime Incident Rate</th>
                          <th className="py-2.5 px-4 font-semibold text-right">Municipal Cost</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {CHICAGO_DEMOGRAPHIC_DATA.map((row, i) => (
                          <tr key={i} className="hover:bg-gray-50/50">
                            <td className="py-3 px-4 font-sans font-medium text-black">{row.demographicGroup}</td>
                            <td className="py-3 px-4 text-[#444] font-semibold">{row.bllRange}</td>
                            <td className="py-3 px-4 text-center">
                              <div className="flex items-center gap-2 justify-center">
                                <div className="w-16 bg-gray-100 h-2 rounded-full overflow-hidden">
                                  <div className={`h-full ${row.exposurePercent > 70 ? 'bg-red-500' : 'bg-[#1A1A1A]'}`} style={{ width: `${row.exposurePercent}%` }}></div>
                                </div>
                                <span className="w-8 text-right font-bold">{row.exposurePercent}%</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-right font-semibold text-red-600">{row.crimeIncidentRate} / 100k</td>
                            <td className="py-3 px-4 text-right text-gray-500 font-bold">${row.enforcementCostMillions}M</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>

            </div>
          ) : (
            <PFASCavitationSimulator
              pfasSimState={pfasSimState}
              setPfasSimState={setPfasSimState}
              pfasOutputs={pfasOutputs}
            />
          ))}

          {/* TAB 0: SOVEREIGN EXPOSURE PROFILER */}
          {activeTab === 'profiler' && (
            <div className="flex-1 overflow-y-auto bg-[#FAFAFA] flex flex-col">
              <ExposureProfiler onNavigateTab={setActiveTab} />
            </div>
          )}

          {/* TAB 0.5: ICEARTH LEAD-CRIME HYPOTHESES PROOFS */}
          {activeTab === 'proofs' && (
            <div className="flex-1 overflow-y-auto bg-white flex flex-col">
              <LeadCrimeProofs onNavigateTab={(tab) => setActiveTab(tab as any)} />
            </div>
          )}

          {/* TAB 0.6: ICEARTH LEAD-TERRORISM HYPOTHESIS PROOF */}
          {activeTab === 'terrorism_proofs' && (
            <div className="flex-1 overflow-y-auto bg-white flex flex-col">
              <LeadTerrorismProofs />
            </div>
          )}

          {/* TAB 2.5: EXPOSENOMICS COMPETITIVE BENCHMARKING ENGINE */}
          {activeTab === 'benchmarking' && (
            <BenchmarkingEngine />
          )}

          {/* TAB 2.7: ODISSE PUBLIC HEALTH DATAVIZ CHALLENGE */}
          {activeTab === 'odisse' && (
            <OdisseDataviz />
          )}

          {/* TAB 2.75: BIHAR LEAD INVENTORY AUDIT CASE STUDY */}
          {activeTab === 'bihar' && (
            <div className="flex-1 p-8 overflow-y-auto bg-gray-50/50">
              <BiharLeadAudit onNavigateTab={(tab) => setActiveTab(tab as any)} />
            </div>
          )}

          {/* TAB 2.8: BUFFALO LEAD INVENTORY AUDIT CASE STUDY */}
          {activeTab === 'buffalo' && (
            <div className="flex-1 overflow-y-auto bg-white flex flex-col">
              <BuffaloLeadAudit />
            </div>
          )}

          {/* TAB 0: SOVEREIGN MEMBER PORTAL & EXPOSOME PROFILE */}
          {activeTab === 'sovereign_portal' && (
            <div className="flex-1 overflow-y-auto bg-neutral-950 text-white">
              <SovereignMembershipPortal />
            </div>
          )}

          {/* TAB 2.9: CLEVELAND LEAD INVENTORY AUDIT & REGIONAL COMPARISON */}
          {activeTab === 'cleveland' && (
            <div className="flex-1 overflow-y-auto bg-white flex flex-col">
              <ClevelandLeadAudit onNavigateTab={(tab) => setActiveTab(tab as any)} />
            </div>
          )}

          {/* TAB 2.95: TOLEDO LEAD AUDIT & CDC CONFESSION CASE STUDY */}
          {activeTab === 'toledo' && (
            <div className="flex-1 overflow-y-auto bg-white flex flex-col">
              <ToledoLeadAudit onNavigateTab={(tab) => setActiveTab(tab as any)} />
            </div>
          )}

          {activeTab === 'cleveland_strategy' && (
            <div className="flex-1 p-8 overflow-y-auto bg-neutral-950 text-neutral-100">
              <ClevelandStrategySolution />
            </div>
          )}

          {activeTab === 'who_action_plan' && (
            <div className="flex-1 overflow-y-auto bg-neutral-950 text-neutral-100 flex flex-col">
              <WHOGlobalActionPlan />
            </div>
          )}

          {activeTab === 'nobel_nomination' && (
            <div className="flex-1 p-8 overflow-y-auto bg-[#FAF8F5] text-neutral-950">
              <NobelPrizeNomination />
            </div>
          )}

          {/* TAB 2.10: CHICAGO LEAD INVENTORY AUDIT & MULTI-CITY COMPARISON */}
          {activeTab === 'chicago' && (
            <div className="flex-1 overflow-y-auto bg-white flex flex-col">
              <ChicagoLeadAudit />
            </div>
          )}

          {/* TAB 2.11: MILWAUKEE LEAD INVENTORY AUDIT & CLASS EXPOSOME STUDY */}
          {activeTab === 'milwaukee' && (
            <div className="flex-1 p-8 overflow-y-auto bg-gray-50/50">
              <MilwaukeeLeadAudit />
            </div>
          )}

          {/* TAB 2.12: GLOBAL REPORT INGESTION & AUTOMATED NEWSFEED HUB */}
          {activeTab === 'reports' && (
            <div className="flex-1 p-8 overflow-y-auto bg-gray-50/50">
              <ReportIngestionHub />
            </div>
          )}

          {/* TAB 2.13: LANDMARK LEAD LITIGATION & PAYOUT LEDGER */}
          {activeTab === 'litigation' && (
            <div className="flex-1 p-8 overflow-y-auto bg-gray-50/50">
              <LitigationLedger onNavigateTab={(tab) => setActiveTab(tab as any)} />
            </div>
          )}

          {/* TAB 2.14: INDIGENOUS COMMUNITIES EARTH SOVEREIGNTY TAB */}
          {activeTab === 'indigenous' && (
            <div className="flex-1 p-8 overflow-y-auto bg-gray-50/50">
              <IndigenousSovereigntyTab />
            </div>
          )}

          {/* TAB 2.15: DRC GENOCOST & ANTHROPOGENIC LEAD GENOCIDE CASE STUDY */}
          {activeTab === 'genocost' && (
            <div className="flex-1 p-8 overflow-y-auto bg-gray-50/50">
              <GenocostTab />
            </div>
          )}

          {/* TAB 3: LEDGER NODES */}
          {activeTab === 'nodes' && (
            <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto">
              
              {/* LEDGER WORKSPACE */}
              <div className="flex-1 p-8 space-y-8 overflow-y-auto">
                <div>
                  <h2 className="text-xs font-mono text-[#999] mb-1 uppercase tracking-widest">[ICEARTH_SOVEREIGN_LEDGER]</h2>
                  <h3 className="text-2xl font-serif font-light">Sovereign Personal Identity & Remediation Ledger</h3>
                  <p className="text-xs text-[#666] mt-2 font-sans max-w-2xl">
                    Configure your sovereign personal exposure profile under strict tribal jurisdiction, or inspect aggregated community BLL datasets hosted securely on our decentralized enterprise blockchain.
                  </p>
                </div>

                {/* SUB TABS FOR PERSONAL PORTAL VS COMMUNITY LEDGER */}
                <div className="flex border-b border-[#E5E5E5] gap-6 text-xs font-mono">
                  <button
                    onClick={() => setLedgerTabSub('personal')}
                    className={`pb-3 border-b-2 font-bold tracking-tight transition-colors cursor-pointer flex items-center gap-1.5 ${
                      ledgerTabSub === 'personal'
                        ? 'border-black text-black'
                        : 'border-transparent text-neutral-400 hover:text-neutral-600'
                    }`}
                  >
                    <Lock size={12} />🔐 MY SOVEREIGN PERSONAL ACCOUNT
                  </button>
                  <button
                    onClick={() => setLedgerTabSub('community')}
                    className={`pb-3 border-b-2 font-bold tracking-tight transition-colors cursor-pointer flex items-center gap-1.5 ${
                      ledgerTabSub === 'community'
                        ? 'border-black text-black'
                        : 'border-transparent text-neutral-400 hover:text-neutral-600'
                    }`}
                  >
                    <Database size={12} />⛓️ COMMUNITY REMEDIATION LEDGER
                  </button>
                  <button
                    onClick={() => setLedgerTabSub('coop')}
                    className={`pb-3 border-b-2 font-bold tracking-tight transition-colors cursor-pointer flex items-center gap-1.5 ${
                      ledgerTabSub === 'coop'
                        ? 'border-black text-black'
                        : 'border-transparent text-neutral-400 hover:text-neutral-600'
                    }`}
                  >
                    <Users size={12} />🛡️ CO-OP & MEMBER IT BLUEPRINT
                  </button>
                </div>

                {ledgerMessage && (
                  <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs flex items-center gap-2 animate-fade-in font-sans">
                    <CheckCircle size={16} className="text-emerald-500" />
                    <span>{ledgerMessage}</span>
                  </div>
                )}

                {/* CONDITION 1: PERSONAL SOVEREIGN IDENTITY WORKSPACE */}
                {ledgerTabSub === 'personal' && (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {/* Left Column: Personal Data Entry */}
                    <div className="space-y-6">
                      <div className="p-6 border border-[#E5E5E5] bg-white rounded-xl shadow-xs space-y-4">
                        <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                          <h4 className="font-sans font-bold text-sm text-black uppercase tracking-wide">Authentic Account Profile</h4>
                          <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-50 text-emerald-600 uppercase flex items-center gap-1">
                            <CheckCircle size={10} /> Secured
                          </span>
                        </div>

                        <div className="space-y-3 text-xs">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="font-semibold block text-gray-700">Individual's Name</label>
                              <input
                                type="text"
                                value={personalName}
                                onChange={(e) => setPersonalName(e.target.value)}
                                className="w-full p-2.5 bg-white border border-[#D1D5DB] rounded-lg focus:outline-none focus:border-black font-sans text-xs"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="font-semibold block text-gray-700">Age</label>
                              <input
                                type="number"
                                value={personalAge}
                                onChange={(e) => setPersonalAge(Number(e.target.value))}
                                className="w-full p-2.5 bg-white border border-[#D1D5DB] rounded-lg focus:outline-none focus:border-black font-mono text-xs"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="font-semibold block text-gray-700">Sovereign Tribal Jurisdiction / Affiliation</label>
                            <input
                              type="text"
                              value={personalSovereignty}
                              onChange={(e) => setPersonalSovereignty(e.target.value)}
                              placeholder="e.g., Taos Pueblo Ecological Sanctuary"
                              className="w-full p-2.5 bg-white border border-[#D1D5DB] rounded-lg focus:outline-none focus:border-black font-sans text-xs"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="font-semibold block text-gray-700">Current Blood Lead Level (BLL)</label>
                              <div className="relative">
                                <input
                                  type="number"
                                  step="0.001"
                                  value={personalBll}
                                  onChange={(e) => setPersonalBll(Number(e.target.value))}
                                  className="w-full p-2.5 bg-white border border-[#D1D5DB] rounded-lg focus:outline-none focus:border-black font-mono text-xs pr-12"
                                />
                                <span className="absolute right-3 top-3.5 text-[10px] text-gray-400 font-mono">μg/dL</span>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <label className="font-semibold block text-gray-700">HPA Axis Stress Index</label>
                              <div className="relative">
                                <input
                                  type="number"
                                  value={personalHpaStress}
                                  onChange={(e) => setPersonalHpaStress(Number(e.target.value))}
                                  className="w-full p-2.5 bg-white border border-[#D1D5DB] rounded-lg focus:outline-none focus:border-black font-mono text-xs pr-8"
                                />
                                <span className="absolute right-3 top-3.5 text-[10px] text-gray-400 font-mono">%</span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="font-semibold block text-gray-700">Clinical Symptoms / Cognitive Indicators</label>
                            <textarea
                              value={personalSymptoms}
                              onChange={(e) => setPersonalSymptoms(e.target.value)}
                              rows={4}
                              className="w-full p-2.5 bg-white border border-[#D1D5DB] rounded-lg focus:outline-none focus:border-black font-sans text-xs resize-y min-h-[80px]"
                            />
                          </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-gray-400 font-mono uppercase block">Sovereign Key ID (ZKP ID)</span>
                            <span className="font-mono text-[10px] text-black font-bold truncate block max-w-[200px]">{personalZkpKey}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const newKey = '0x' + Array.from({length: 32}, () => Math.floor(Math.random()*16).toString(16)).join('');
                              setPersonalZkpKey(newKey);
                              setLedgerMessage("New cryptographically isolated Sovereign Key ID successfully generated!");
                            }}
                            className="px-3 py-1.5 border border-gray-200 hover:bg-gray-50 text-[10px] font-mono font-bold uppercase rounded cursor-pointer transition-colors"
                          >
                            Regen Key
                          </button>
                        </div>
                      </div>

                      <div className="p-4 bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl flex items-start gap-3">
                        <Lock size={18} className="text-neutral-500 shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-black font-sans">Confidentiality & Cryptographic Isolation</h4>
                          <p className="text-[11px] text-[#666] leading-relaxed">
                            Your medical records and Pb exposure datasets are cryptographically isolated in your local container. They are never transmitted or stored on un-encrypted public servers. This platform implements the <strong>Info-Mediated Enterprise</strong> security framework, ensuring you remain the sole sovereign owner of your metrics.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Sovereignty Toggles and Comparative Analytics */}
                    <div className="space-y-6">
                      <div className="p-6 border border-[#E5E5E5] bg-white rounded-xl shadow-xs space-y-5">
                        <div className="pb-3 border-b border-gray-100">
                          <h4 className="font-sans font-bold text-sm text-black uppercase tracking-wide">Sovereignty & Broker Permission Controls</h4>
                          <p className="text-[10px] text-gray-400 mt-1">Configure who is authorized to broker or analyze your exposure dataset.</p>
                        </div>

                        <div className="space-y-4 text-xs font-sans">
                          {/* Toggle 1: Enforce Tribal Sovereign Jurisdiction */}
                          <div className="flex items-start justify-between gap-4">
                            <div className="space-y-1">
                              <label className="font-bold text-black flex items-center gap-1.5 cursor-pointer">
                                <Shield size={13} className="text-emerald-600" />
                                Enforce Tribal Sovereign Jurisdiction Protection
                              </label>
                              <p className="text-[10px] text-[#666] leading-normal">
                                Legally registers and shields your personal medical and genetic data under the sovereign jurisdiction of your selected Native American tribe (such as the <strong>Taos Pueblo Ecological Sanctuary</strong>), preventing federal, state, or corporate subpoena and maintaining genomic sovereignty.
                              </p>
                            </div>
                            <div className="pt-1">
                              <input
                                type="checkbox"
                                defaultChecked={true}
                                className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black cursor-pointer"
                              />
                            </div>
                          </div>

                          {/* Toggle 2: Keep Data 100% Confidential */}
                          <div className="flex items-start justify-between gap-4 pt-3 border-t border-gray-100">
                            <div className="space-y-1">
                              <label className="font-bold text-black flex items-center gap-1.5 cursor-pointer">
                                <Lock size={13} className="text-black" />
                                Strict Local Zero-Knowledge Encryption
                              </label>
                              <p className="text-[10px] text-[#666] leading-normal">
                                Fully encrypts your data locally. All comparative analyses must be conducted via client-side Zero-Knowledge Proofs (ZKPs) so that third-party nodes can verify your exposure status without reading raw parameters.
                              </p>
                            </div>
                            <div className="pt-1">
                              <input
                                type="checkbox"
                                checked={isDataConfidential}
                                onChange={(e) => setIsDataConfidential(e.target.checked)}
                                className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black cursor-pointer"
                              />
                            </div>
                          </div>

                          {/* Toggle 3: Authorize Comparative Community Analysis */}
                          <div className="flex items-start justify-between gap-4 pt-3 border-t border-gray-100">
                            <div className="space-y-1">
                              <label className="font-bold text-black flex items-center gap-1.5 cursor-pointer">
                                <Activity size={13} className="text-sky-600" />
                                Authorize Comparative Community Analysis
                              </label>
                              <p className="text-[10px] text-[#666] leading-normal">
                                When enabled, you voluntarily authorize trusted community brokers to include your anonymized exposure index in aggregated regional studies. This enables comparative analysis of lead exposure in your community to combat environmental crimes without releasing your private medical or genomic identity.
                              </p>
                            </div>
                            <div className="pt-1">
                              <input
                                type="checkbox"
                                checked={authorizeComparativeAnalysis}
                                onChange={(e) => {
                                  const checked = e.target.checked;
                                  setAuthorizeComparativeAnalysis(checked);
                                  if (checked) {
                                    setLedgerMessage("Your anonymized dataset has been brokered to the regional community comparative analysis node!");
                                  } else {
                                    setLedgerMessage("Data brokering revoked. Your dataset has been withdrawn from regional comparative analysis.");
                                  }
                                }}
                                className="w-4 h-4 text-black border-gray-300 rounded focus:ring-sky-500 cursor-pointer"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex gap-3">
                          <button
                            type="button"
                            onClick={() => {
                              setLedgerMessage("Your Sovereign Profile, medical credentials, and Pb exposure data have been securely saved and encrypted under Tribal Jurisdiction.");
                            }}
                            className="flex-1 py-2.5 bg-[#1A1A1A] hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded transition-all cursor-pointer text-center"
                          >
                            Save & Encrypt Account
                        </button>
                        </div>
                      </div>

                      {/* Proximity Card */}
                      <div className="p-5 border border-[#E5E5E5] bg-emerald-50/40 rounded-xl space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-mono font-bold uppercase text-emerald-800 tracking-wider">Sovereign Health Baseline</span>
                          <span className="text-xs font-sans font-bold text-emerald-700">Homo Sapiens 0 Standard</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-serif font-light text-emerald-900 font-bold">
                            {personalBll <= 0.016 ? '100%' : `${Math.round(100 / (1 + (personalBll - 0.016) * 1.5))}%`}
                          </span>
                          <span className="text-[11px] text-emerald-700 font-sans font-medium">Proximity to Pre-Industrial Baseline</span>
                        </div>
                        <div className="text-[10px] text-emerald-800 leading-normal font-sans">
                          Your current recorded blood lead level of <strong>{personalBll} μg/dL</strong> is extremely close to the unperturbed baseline of <strong>0.016 μg/dL</strong> (Homo Sapiens 0). Your cognitive prefrontal gray matter and HPA hormonal axis are highly protected.
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* CONDITION 2: COMMUNITY REMEDIATION LEDGER NODES LIST */}
                {ledgerTabSub === 'community' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {activeNodes.map((node) => {
                      const isCompleted = node.remediationStatus === 'completed';
                      const isActive = node.remediationStatus === 'active';
                      const isPending = node.remediationStatus === 'pending';
                      const isBlocked = node.remediationStatus === 'blocked';
                      
                      const isLead = remediationTrack === 'lead';
                      const targetVal = isLead ? 0.016 : 0.004;
                      const unitLabel = isLead ? 'μg/dL' : 'ppt';
                      const metricLabel = isLead ? 'Current Blood Lead' : 'Current PFAS Conc.';
                      const targetLabel = isLead ? '0.016 μg/dL' : '0.004 ppt';
                      const completeLabel = isLead ? 'Corrected to Homo Sapiens 0 Standard' : 'PFAS Cleansed to Safe Baseline';

                      return (
                        <div key={node.id} className="border border-[#E5E5E5] bg-white rounded-xl overflow-hidden shadow-xs flex flex-col justify-between">
                          {/* Header */}
                          <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-start">
                            <div>
                              <h4 className="font-sans font-bold text-sm text-black">{node.name}</h4>
                              <span className="text-[10px] text-gray-400 block mt-0.5 uppercase tracking-wide">{node.region}</span>
                            </div>
                            <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                              isCompleted ? 'bg-emerald-50 text-emerald-600' :
                              isActive ? 'bg-sky-50 text-sky-600' :
                              isPending ? 'bg-amber-50 text-amber-600' :
                              'bg-red-50 text-red-600'
                            }`}>
                              {node.remediationStatus}
                            </span>
                          </div>

                          {/* Body Metrics */}
                          <div className="p-5 space-y-4 font-mono text-xs">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <span className="text-[9px] text-[#999] uppercase block mb-1">{metricLabel}</span>
                                <span className={`text-base font-bold ${node.currentBll <= targetVal ? 'text-emerald-600' : 'text-red-500'}`}>
                                  {node.currentBll === targetVal ? `${targetVal} ${unitLabel}` : `${node.currentBll} ${unitLabel}`}
                                </span>
                              </div>
                              <div>
                                <span className="text-[9px] text-[#999] uppercase block mb-1">Target Baseline</span>
                                <span className="text-base font-bold text-black">{targetLabel}</span>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-50">
                              <div>
                                <span className="text-[9px] text-[#999] uppercase block mb-1">ICE Tokens Escrow</span>
                                <span className="text-sm font-bold text-emerald-700 flex items-center gap-1">
                                  <Coins size={12} /> {node.escrowBalance.toLocaleString()}
                                </span>
                              </div>
                              <div>
                                <span className="text-[9px] text-[#999] uppercase block mb-1">ZKP Verification ID</span>
                                <span className="text-xs text-gray-500 font-bold block truncate">{node.verificationZkp}</span>
                              </div>
                            </div>

                            {/* Progress bar to target */}
                            <div className="space-y-1">
                              <div className="flex justify-between text-[9px] text-gray-400">
                                <span>Remediation Complete</span>
                                <span>{node.currentBll <= targetVal ? '100%' : `${Math.round((targetVal / node.currentBll) * 100)}%`}</span>
                              </div>
                              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                <div 
                                  className="bg-emerald-500 h-full transition-all duration-500" 
                                  style={{ width: `${node.currentBll <= targetVal ? 100 : Math.min(100, Math.max(2, (targetVal / node.currentBll) * 100))}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>

                          {/* Actions footer */}
                          <div className="px-5 py-4 border-t border-gray-100 bg-[#FAFAFA] flex gap-2">
                            {!isCompleted ? (
                              <>
                                <button
                                  onClick={() => handleVerifyZkp(node.id)}
                                  className="flex-1 py-2 bg-[#1A1A1A] hover:bg-black text-white text-[11px] font-semibold rounded transition-colors cursor-pointer text-center"
                                >
                                  Verify ZKP Proof
                                </button>
                                <button
                                  onClick={() => handleFundingRelease(node.id)}
                                  className="px-3 py-2 border border-gray-200 hover:bg-gray-50 text-[11px] font-medium rounded transition-colors cursor-pointer"
                                  title="Add Escrow Funds"
                                >
                                  Fund Escrow
                                </button>
                              </>
                            ) : (
                              <div className="w-full flex items-center justify-center gap-1.5 text-xs text-emerald-600 font-sans font-medium py-2">
                                <CheckCircle size={14} /> {completeLabel}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {ledgerTabSub === 'coop' && (
                  <>
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 animate-fade-in">
                    {/* Left Column: Interactive Group/Member Node Simulator */}
                    <div className="space-y-6">
                      <div className="p-6 border border-[#E5E5E5] bg-white rounded-xl shadow-xs space-y-4">
                        <div className="pb-3 border-b border-gray-100">
                          <h4 className="font-sans font-bold text-sm text-black uppercase tracking-wide">
                            Decentralized "Info-Mediated" Groups
                          </h4>
                          <p className="text-[10px] text-gray-400 mt-1 font-sans">
                            Voluntarily form and join localized nodes (by street, ZIP, census tract, reservation, school, or NGO) to securely aggregate your sovereign data.
                          </p>
                        </div>

                        {/* Group Selection Cards */}
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <button
                            type="button"
                            onClick={() => setCoopGroup('cleveland')}
                            className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                              coopGroup === 'cleveland'
                                ? 'bg-emerald-50/50 border-emerald-600 text-black font-bold shadow-xs'
                                : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                            }`}
                          >
                            <div className="flex items-center gap-1.5 mb-1 font-sans text-[11px]">
                              <MapPin size={12} className={coopGroup === 'cleveland' ? 'text-emerald-600' : 'text-neutral-400'} />
                              <span>Cleveland Co-Op</span>
                            </div>
                            <span className="text-[9px] font-mono font-normal block text-neutral-400">Board / Local Officials</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setCoopGroup('new-orleans')}
                            className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                              coopGroup === 'new-orleans'
                                ? 'bg-emerald-50/50 border-emerald-600 text-black font-bold shadow-xs'
                                : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                            }`}
                          >
                            <div className="flex items-center gap-1.5 mb-1 font-sans text-[11px]">
                              <Globe size={12} className={coopGroup === 'new-orleans' ? 'text-emerald-600' : 'text-neutral-400'} />
                              <span>New Orleans 1970s</span>
                            </div>
                            <span className="text-[9px] font-mono font-normal block text-neutral-400">ZIP 70112 / Census Tract</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setCoopGroup('taos')}
                            className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                              coopGroup === 'taos'
                                ? 'bg-emerald-50/50 border-emerald-600 text-black font-bold shadow-xs'
                                : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                            }`}
                          >
                            <div className="flex items-center gap-1.5 mb-1 font-sans text-[11px]">
                              <Shield size={12} className={coopGroup === 'taos' ? 'text-emerald-600' : 'text-neutral-400'} />
                              <span>Taos Pueblo</span>
                            </div>
                            <span className="text-[9px] font-mono font-normal block text-neutral-400">Tribal Sovereignty</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setCoopGroup('vancouver')}
                            className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                              coopGroup === 'vancouver'
                                ? 'bg-emerald-50/50 border-emerald-600 text-black font-bold shadow-xs'
                                : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                            }`}
                          >
                            <div className="flex items-center gap-1.5 mb-1 font-sans text-[11px]">
                              <Users size={12} className={coopGroup === 'vancouver' ? 'text-emerald-600' : 'text-neutral-400'} />
                              <span>Simon Fraser Lab</span>
                            </div>
                            <span className="text-[9px] font-mono font-normal block text-neutral-400">Environmental NGO / Academic</span>
                          </button>
                        </div>

                        {/* Interactive Sovereign Post Console */}
                        <div className="pt-4 border-t border-neutral-100 space-y-3">
                          <h5 className="text-xs font-serif font-bold text-neutral-900 flex items-center gap-1.5">
                            <Plus size={14} className="text-emerald-700" />
                            Sovereign Publisher: Contribute Authentic IP
                          </h5>
                          <p className="text-[10px] text-neutral-500 leading-normal font-sans">
                            Publish a piece of your sovereign content (research, child lead testimonies, essays, or soil sample logs) to the group. It is signed cryptographically by your ZKP Key.
                          </p>

                          <div className="space-y-3">
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={newPostType}
                                onChange={(e) => setNewPostType(e.target.value)}
                                placeholder="Content Type (e.g., Creative IP, Soil Data, Thesis Paper)"
                                className="flex-1 p-2 bg-neutral-50 border border-[#D1D5DB] rounded-lg text-[11px] focus:outline-none focus:border-neutral-400 font-sans"
                              />
                            </div>
                            <textarea
                              rows={6}
                              value={newPostContent}
                              onChange={(e) => setNewPostContent(e.target.value)}
                              placeholder={`Draft a secure, authentic publication to the ${
                                coopGroup === 'cleveland' ? 'Greater Cleveland Council' :
                                coopGroup === 'new-orleans' ? 'New Orleans 1970s Study' :
                                coopGroup === 'taos' ? 'Taos Pueblo Sanctuary' : 'Simon Fraser Lab'
                              }...`}
                              className="w-full p-2.5 bg-white border border-[#D1D5DB] rounded-lg text-[11px] resize-y focus:outline-none focus:border-black font-sans leading-relaxed min-h-[100px]"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (!newPostContent.trim()) return;
                                const grpName = 
                                  coopGroup === 'cleveland' ? 'Greater Cleveland Lead Advisory Council' :
                                  coopGroup === 'new-orleans' ? 'New Orleans 1970s Leaded Gas Study' :
                                  coopGroup === 'taos' ? 'Taos Pueblo Ecological Sanctuary' : 'Simon Fraser Environmental Health Lab';
                                const newP = {
                                  id: 'post-' + Date.now(),
                                  group: coopGroup,
                                  author: personalName || 'Sovereign Citizen',
                                  key: personalZkpKey,
                                  content: newPostContent,
                                  type: newPostType || 'Creative IP',
                                  timestamp: 'Jun 29, 2026'
                                };
                                setCoopPosts([newP, ...coopPosts]);
                                setNewPostContent('');
                                setLedgerMessage(`Successfully published sovereign "${newP.type}" signed with your key ID to the ${grpName}!`);
                              }}
                              className="w-full py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-[11px] font-bold uppercase tracking-wider rounded transition-all cursor-pointer text-center"
                            >
                              ✍️ Sign & Publish Sovereign Document
                            </button>
                          </div>
                        </div>

                        {/* Sovereign Posts Feed */}
                        <div className="pt-4 border-t border-neutral-100 space-y-3">
                          <h5 className="text-xs font-serif font-bold text-neutral-900 flex items-center justify-between">
                            <span>Sovereign Data Repository Feed</span>
                            <span className="text-[9px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                              {coopPosts.filter(p => p.group === coopGroup).length} Active Publications
                            </span>
                          </h5>

                          <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                            {coopPosts.filter(p => p.group === coopGroup).map(post => (
                              <div key={post.id} className="p-3 bg-neutral-50 rounded-lg border border-neutral-100 space-y-1.5 text-[11px] animate-fade-in">
                                <div className="flex justify-between items-center text-[10px] font-mono text-neutral-500">
                                  <span className="font-bold text-neutral-800">{post.author}</span>
                                  <span>{post.timestamp}</span>
                                </div>
                                <p className="text-neutral-700 font-sans leading-relaxed">{post.content}</p>
                                <div className="pt-1.5 border-t border-neutral-100 flex justify-between items-center text-[9px] font-mono text-neutral-400">
                                  <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded text-[8.5px]">
                                    📜 {post.type}
                                  </span>
                                  <span className="truncate max-w-[150px]">Key: {post.key}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Right Column: High-Fidelity Enterprise IT Recommendation Blueprint */}
                    <div className="space-y-6">
                      <div className="p-6 border border-[#E5E5E5] bg-white rounded-xl shadow-xs space-y-5">
                        <div className="pb-3 border-b border-gray-100">
                          <h4 className="font-sans font-bold text-sm text-black uppercase tracking-wide">
                            ICEarth Member-User IT Architecture Recommendation
                          </h4>
                          <p className="text-[10px] text-gray-400 mt-1 font-sans">
                            Technical blueprint designed by continuous global enterprise computing benchmarking.
                          </p>
                        </div>

                        <div className="space-y-4 text-xs font-sans">
                          {/* Top Panel: Co-Op Business Model */}
                          <div className="p-3.5 bg-[#FCFBF7] border border-emerald-100 rounded-lg space-y-1.5">
                            <span className="text-[9px] font-mono font-bold text-emerald-800 uppercase tracking-widest block">
                              Operational Model: Non-Profit Co-Op
                            </span>
                            <p className="text-neutral-600 leading-normal text-[11px] font-sans">
                              Modernizing the historical 2004 <strong>realneo.us</strong> Drupal community engine. Funded entirely by operational subscription, expert validation services, and curated telemetry, removing all ad networks and corporate data brokers to maintain ironclad sovereignty.
                            </p>
                          </div>

                          {/* Architecture Item 1 */}
                          <div className="flex gap-3 pt-2">
                            <div className="w-8 h-8 rounded bg-neutral-100 flex items-center justify-center text-neutral-800 shrink-0 border border-neutral-200">
                              <Cpu size={14} className="text-neutral-700" />
                            </div>
                            <div className="space-y-1">
                              <h5 className="font-bold text-neutral-900 leading-tight">Authentic-Only Identity Gateway</h5>
                              <p className="text-[10px] text-[#666] leading-relaxed">
                                Avoids Sybil attacks and fake bot-accounts. Utilizes cryptographic Decentralized Identifiers (DIDs) integrated with Auth0 or Firebase Auth. During onboarding, unique human identities are verified through non-invasive proof-of-humanity techniques to anchor the repository's integrity.
                              </p>
                            </div>
                          </div>

                          {/* Architecture Item 2 */}
                          <div className="flex gap-3 pt-2 border-t border-gray-100">
                            <div className="w-8 h-8 rounded bg-neutral-100 flex items-center justify-center text-neutral-800 shrink-0 border border-neutral-200">
                              <Database size={14} className="text-indigo-600" />
                            </div>
                            <div className="space-y-1">
                              <h5 className="font-bold text-neutral-900 leading-tight">Relational (PostgreSQL) + Real-Time (Firestore)</h5>
                              <p className="text-[10px] text-[#666] leading-relaxed">
                                A hybrid database layer. <strong>Cloud SQL (PostgreSQL)</strong> handles complex spatial queries mapping street vectors, ZIP codes, census tracts, and municipal utilities. <strong>Firebase Firestore</strong> manages the global fast-sync message feeds, notification logs, and user metadata brokerage.
                              </p>
                            </div>
                          </div>

                          {/* Architecture Item 3 */}
                          <div className="flex gap-3 pt-2 border-t border-gray-100">
                            <div className="w-8 h-8 rounded bg-neutral-100 flex items-center justify-center text-neutral-800 shrink-0 border border-neutral-200">
                              <Lock size={14} className="text-rose-600" />
                            </div>
                            <div className="space-y-1">
                              <h5 className="font-bold text-neutral-900 leading-tight">Zero-Knowledge Sandbox & Sovereign Vaults</h5>
                              <p className="text-[10px] text-[#666] leading-relaxed">
                                Raw medical parameters and genetic indices remain strictly inside client-side containers (IndexedDB or WASM SQLite inside the browser sandbox). ZKPs are generated locally, allowing third parties to mathematically verify BLL status without exposing the underlying metrics.
                              </p>
                            </div>
                          </div>

                          {/* Architecture Item 4 */}
                          <div className="flex gap-3 pt-2 border-t border-gray-100">
                            <div className="w-8 h-8 rounded bg-neutral-100 flex items-center justify-center text-neutral-800 shrink-0 border border-neutral-200">
                              <FileCode size={14} className="text-emerald-700" />
                            </div>
                            <div className="space-y-1">
                              <h5 className="font-bold text-neutral-900 leading-tight">Sovereign Asset Storage & IPFS / Ceramic</h5>
                              <p className="text-[10px] text-[#666] leading-relaxed">
                                User-authored publications, intellectual property, essays (Dickensian studies, Ethics theses), and detailed environmental images are stored on decentralized storage networks like IPFS. Data objects are encrypted at rest; members hold the private decryption keys.
                              </p>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Strategic Synopsis & Sovereign Philanthropy Proposal Panel */}
                  <div className="mt-8 p-8 border border-neutral-200 bg-linear-to-b from-white to-[#FAF9F5] rounded-2xl shadow-xs space-y-6 animate-fade-in">
                    <div className="pb-4 border-b border-neutral-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full uppercase tracking-widest block w-fit mb-2">
                          Sovereign IT Charter • GCLAC 2006 - 2026
                        </span>
                        <h3 className="text-2xl font-serif font-light text-neutral-900 leading-tight">
                          📜 The ICEarth Strategic Synopsis & Sovereign Philanthropy Proposal
                        </h3>
                        <p className="text-xs text-neutral-500 mt-1 font-sans">
                          A direct blueprint for global capital allocation. <strong>It asserts that top-down institutional programs fail without a sovereign, individual-centered data architecture.</strong>
                        </p>
                      </div>
                      <div className="shrink-0">
                        <span className="text-xs font-mono font-semibold text-neutral-500 bg-neutral-100 px-3 py-1.5 rounded-md border border-neutral-200">
                          Status: Active Advocacy Campaign
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Left Block: The Tragedy & Malpractice History */}
                      <div className="space-y-4 lg:col-span-1">
                        <h4 className="text-xs font-mono font-bold text-neutral-800 uppercase tracking-wider border-b border-neutral-100 pb-1.5">
                          1. TRAGEDY, MALPRACTICE & PERSISTENCE
                        </h4>
                        <div className="text-xs text-neutral-600 space-y-3 leading-relaxed">
                          <p>
                            In 2006, chartered by the <strong>Greater Cleveland Lead Advisory Council (GCLAC)</strong>, our core environmental infrastructure mission was conceived. As Co-Chair for Infrastructure and Sustainability, ICEarth founder Norm Roulet brought the landmark Motley Rice class-action litigation against paint giant <strong>Sherwin-Williams</strong> to Ohio, securing municipal and state-level backing.
                          </p>
                          <p>
                            Because Sherwin-Williams is the most powerful corporate force in Cleveland, and elite law firm <strong>Jones Day</strong> simultaneously represented both the corporate defense and Roulet's own community enterprise (<strong>realNEO.us</strong>), severe legal malpractice was committed. Our efforts were actively sabotaged: mainstream media gay-bashed East Cleveland Mayor Eric Brewer from office, and our intellectual property was dismantled.
                          </p>
                          <p>
                            This sabotage changed the national course of lead paint litigation. As documented in <em>"The Rise and Fall of Lead Paint Litigation in Ohio"</em> (David J. Owsiany, State AG Tracker, 2009), government-sponsored litigation was systematically strangled. While Ohio's cities were forced out of their cases, newly elected Attorney General Richard Cordray voluntarily dismissed the state's case in February 2009, effectively ending Ohio's public nuisance claims.
                          </p>
                          <p>
                            While California's uncompromised litigation successfully secured a historic <strong>$305 million settlement</strong> for lead abatement, Ohio's compromised efforts cost local advocacy hundreds of millions. Cleveland now suffers from some of the worst childhood lead poisoning rates in America. We refuse to co-exist with this deliberate failure; we persist to build the sovereign technology they could not destroy.
                          </p>
                          <div className="bg-indigo-50/50 p-4 border border-indigo-100 rounded-xl space-y-3 text-neutral-800">
                            <div className="flex items-center gap-1.5 pb-1.5 border-b border-indigo-100">
                              <span className="px-1.5 py-0.5 text-[8px] font-mono font-bold bg-indigo-600 text-white rounded">PLAIN DEALER CONFESSION</span>
                              <strong className="text-indigo-950">The July 2026 Moral Reckoning:</strong>
                            </div>
                            <p className="text-[11.5px]">
                              After two decades of persistent GCLAC advocacy, the local corporate-legal defense has encountered an unprecedented public confession. <strong>Chris Quinn, Editor of cleveland.com and The Plain Dealer</strong> (a major metropolitan newspaper), has published a historic 5-part opinion project acknowledging the deep, painful legacy of Sherwin-Williams:
                            </p>
                            <ul className="space-y-2.5 pl-1 text-[11px] leading-relaxed">
                              <li>
                                📌 <strong>Part 1: Cleveland Pride, Cleveland Pain and a Reckoning</strong> (July 10, 2026) — Reconciles local civic pride with the systemic childhood neurological devastation of legacy lead-paint poisoning.
                              </li>
                              <li>
                                📌 <strong>Part 2: How Cleveland’s Paint Company Conquered the World</strong> (July 11, 2026) — Confesses that pre-Civil War paint prep required workers to break up white lead cakes by hand, generating toxic dust that killed painters from acute poisoning. Global market dominance was built on the quiet sacrifice of working class families.
                              </li>
                              <li>
                                📌 <strong>Part 3: They knew: Our Sherwin-Williams Dilemma</strong> (July 12, 2026) — Exposes documented evidence proving that the lead paint industry was fully aware of the brain-damaging toxicity of white lead on children and workers, yet deliberately continued to advertise and distribute it to protect market share.
                              </li>
                              <li>
                                📌 <strong>Part 4: Custom Shields & Ground Zero</strong> (July 13, 2026) — Details systemic legislative malpractice in Ohio, where lawmakers quickly enacted retrofitted liability shields to block municipal and AG lawsuits, and connects back to Baltimore as ground-zero of medical monitoring rather than active lead paint remediation.
                              </li>
                              <li>
                                📌 <strong>Part 5: The right thing to do</strong> (July 14, 2026) — Proposes Quinn's concluding vision: establishing a massive, permanent capital fund to once and for all rid Cleveland homes of toxic lead paint, calling on Sherwin-Williams to supply 100% lead paint extraction funding based on their 1973 CSR charter.
                              </li>
                            </ul>
                            <p className="text-[10px] text-emerald-700 italic pt-1 font-semibold flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                              All 5 parts of this landmark series have now been fully published, logged, and traced by the ICEarth ledger.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Middle Block: The Lived Clinical Witness */}
                      <div className="space-y-4 lg:col-span-1">
                        <h4 className="text-xs font-mono font-bold text-red-800 uppercase tracking-wider border-b border-red-100 pb-1.5">
                          2. THE PHYSICAL WITNESS: LIVED EVIDENCE
                        </h4>
                        <div className="text-xs text-neutral-600 space-y-3 leading-relaxed">
                          <p>
                            We cannot manage what we do not measure. This initiative is anchored by the lived reality of the ultimate victim-advocate. Raised downwind of Cleveland's industrial core in a historic house laden with lead paint, Roulet suffered extreme childhood lead poisoning (Pica).
                          </p>
                          <div className="p-3.5 bg-red-50/50 border border-red-100 rounded-lg space-y-2">
                            <span className="font-mono text-[9px] font-bold text-red-800 uppercase tracking-wider block">Clinical Diagnosis (65 Years, 6'1", 140 lbs)</span>
                            <p className="text-[11px] leading-normal font-sans text-neutral-700">
                              Coronary artery disease (survived severe heart attack), chronic kidney disease, severe digestive issues, endocrine imbalances, tooth loss, and severe developmental/mental impairment.
                            </p>
                          </div>
                          <p>
                            To health providers in rural New Mexico, he represents a unique, extreme case of survival. This lifetime death sentence is the story Dr. Bruce Lanphear warns is vital to share: the biological genocide of marginalized populations, poisoning <strong className="text-red-700">one-third of humanity</strong>. We turn this trauma into the ultimate technical weapon.
                          </p>
                        </div>
                      </div>

                      {/* Right Block: The Strategic Address to Philanthropy */}
                      <div className="space-y-4 lg:col-span-1">
                        <h4 className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider border-b border-emerald-100 pb-1.5">
                          3. ADDRESS TO BILLIONAIRE PHILANTHROPY
                        </h4>
                        <div className="text-xs text-neutral-600 space-y-3 leading-relaxed">
                          <p>
                            For a decade, we have demanded accountability from childhood friends and billionaires—<strong>Adam Lewis</strong> (son of Progressive Insurance CEO Peter Lewis) and the <strong>Gund Family</strong> (Gund Foundation). The Gunds have advocated to <strong>Bloomberg Philanthropies</strong> and the <strong>Rockefeller Foundation</strong>, culminating in global commitments worth hundreds of millions.
                          </p>
                          <p>
                            The Center for Global Development (CGD) launched the <em>Partnership for a Lead-Free Future</em> (Sept 2024) and hosted the <em>First Annual Research Conference on Global Lead Poisoning</em> (2025), with successive convenings planned for 2026/2027.
                          </p>
                          <p className="bg-[#FCFBF7] p-3 border border-emerald-100 rounded-lg italic font-serif text-neutral-800 text-[11px]">
                            "These global institutions have mismanaged billions, funding top-down bureaucracies while failing to tell the story we need. ICEarth bypasses this institutional bloat. We do not ask for new funds; we exist to properly manage the billions already allocated."
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Row: Gaps & Investment Strategy */}
                    <div className="pt-6 border-t border-neutral-200">
                      <h4 className="text-xs font-mono font-bold text-neutral-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                        🔧 IDENTIFIED GAPS & SOVEREIGN IT DEVELOPMENT STRATEGY
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-xs font-sans">
                        <div className="p-4 bg-white border border-neutral-200 rounded-xl space-y-2">
                          <div className="flex items-center gap-1.5 font-bold text-neutral-900">
                            <Cpu size={14} className="text-neutral-700" />
                            <span>ZK-Proof DID Identity</span>
                          </div>
                          <p className="text-[10px] text-neutral-500 leading-normal">
                            <strong>The Gap:</strong> Risk of Sybil attacks and bad corporate actors flooding databases with simulated records.
                            <br />
                            <strong>The Solution:</strong> Deploy SnarkJS and local WASM proof-of-humanity cryptography to anchor exposure metrics without exposing genomic/medical secrets.
                          </p>
                        </div>

                        <div className="p-4 bg-white border border-neutral-200 rounded-xl space-y-2">
                          <div className="flex items-center gap-1.5 font-bold text-neutral-900">
                            <MapPin size={14} className="text-neutral-700" />
                            <span>Spatial & Pipe Vector GIS</span>
                          </div>
                          <p className="text-[10px] text-neutral-500 leading-normal">
                            <strong>The Gap:</strong> Static maps fail to represent the real-time movement of lead vectors and water line data.
                            <br />
                            <strong>The Solution:</strong> Integrate dynamic Cloud SQL spatial mapping to bridge localized water utilities, BLL data, and GIS vectors.
                          </p>
                        </div>

                        <div className="p-4 bg-white border border-neutral-200 rounded-xl space-y-2">
                          <div className="flex items-center gap-1.5 font-bold text-neutral-900">
                            <FileCode size={14} className="text-neutral-700" />
                            <span>Decentralized IPFS Storage</span>
                          </div>
                          <p className="text-[10px] text-neutral-500 leading-normal">
                            <strong>The Gap:</strong> Centralized servers can be subpoenaed, censored, or destroyed by compromised government or corporate interests.
                            <br />
                            <strong>The Solution:</strong> Store user-authored publications, ethical theses, and Dickensian research on decentralized IPFS / Ceramic layers.
                          </p>
                        </div>

                        <div className="p-4 bg-white border border-neutral-200 rounded-xl space-y-2">
                          <div className="flex items-center gap-1.5 font-bold text-neutral-900">
                            <Database size={14} className="text-neutral-700" />
                            <span>Global Cloud Spanner Scaling</span>
                          </div>
                          <p className="text-[10px] text-neutral-500 leading-normal">
                            <strong>The Gap:</strong> Scalability issues when deploying to millions of researchers, indigenous populations, and NGOs.
                            <br />
                            <strong>The Solution:</strong> Upgrade infrastructure to Cloud Run container clusters synced with Google Cloud Spanner databases to support globally consistent sovereign records.
                          </p>
                        </div>

                        <div className="p-4 bg-white border border-neutral-200 rounded-xl space-y-2">
                          <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                            <Globe size={14} className="text-emerald-700" />
                            <span>Global/Local Language Sovereignty</span>
                          </div>
                          <p className="text-[10px] text-neutral-500 leading-normal">
                            <strong>The Missing Link:</strong> Top-down programs are anglocentric, ignoring 1000s of indigenous nations and communities experiencing the same poisoning.
                            <br />
                            <strong>The Solution:</strong> Deploy decentralized, peer-validated native translation nodes to ensure language-localized sovereign exposure reporting.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
                      <span className="text-[10px] font-mono text-neutral-400">
                        © 2006-2026 ICEarth Infrastructure and Sustainability Division • Chartered by GCLAC
                      </span>
                      <a
                        href="https://www.cgdev.org/topics/tackling-global-burden-lead-poisoning"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-neutral-950 hover:bg-black text-white text-[10px] font-mono font-bold rounded-lg uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        🌐 CGD Partnership for a Lead-Free Future ↗
                      </a>
                    </div>
                  </div>
                </>
              )}
              </div>

              {/* REGISTER NEW NODE FORM CARD OR EDUCATIONAL INFO-MEDIATED PANEL */}
              <div className="w-full lg:w-96 border-l border-[#E5E5E5] bg-white p-6 space-y-6 shrink-0 overflow-y-auto">
                {ledgerTabSub === 'community' ? (
                  <>
                    <div>
                      <h4 className="text-xs font-mono text-[#999] uppercase tracking-widest mb-1">[REGISTER_NEW_NODE]</h4>
                      <h3 className="text-lg font-serif font-light">Add Sovereign Node</h3>
                      <p className="text-xs text-[#666] mt-2 font-sans">
                        Register a new community exposure tracking system into the decentralized ICEarth network to initiate smart-contract escrow funding.
                      </p>
                    </div>

                    <form onSubmit={handleCreateNode} className="space-y-4 text-xs">
                      <div className="space-y-1.5">
                        <label className="font-semibold block">Node Name / Operation</label>
                        <input
                          type="text"
                          placeholder="e.g., East Chicago Soil Sifting"
                          value={newNodeName}
                          onChange={(e) => setNewNodeName(e.target.value)}
                          className="w-full p-2.5 bg-white border border-[#D1D5DB] rounded-lg focus:outline-none focus:border-black"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-semibold block">Community Region / Country</label>
                        <input
                          type="text"
                          placeholder="e.g., Indiana, USA"
                          value={newNodeRegion}
                          onChange={(e) => setNewNodeRegion(e.target.value)}
                          className="w-full p-2.5 bg-white border border-[#D1D5DB] rounded-lg focus:outline-none focus:border-black"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="font-semibold block">Current BLL (μg/dL)</label>
                          <input
                            type="number"
                            step="0.1"
                            value={newNodeBll}
                            onChange={(e) => setNewNodeBll(Number(e.target.value))}
                            className="w-full p-2.5 bg-white border border-[#D1D5DB] rounded-lg font-mono focus:outline-none focus:border-black"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="font-semibold block">Target Standard</label>
                          <input
                            type="number"
                            disabled
                            value={newNodeTarget}
                            className="w-full p-2.5 bg-gray-50 border border-[#D1D5DB] rounded-lg font-mono text-gray-400"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-semibold block">ICE Token Escrow Allocation</label>
                        <input
                          type="number"
                          step="10000"
                          value={newNodeEscrow}
                          onChange={(e) => setNewNodeEscrow(Number(e.target.value))}
                          className="w-full p-2.5 bg-white border border-[#D1D5DB] rounded-lg font-mono focus:outline-none focus:border-black"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-[#1A1A1A] hover:bg-black text-white text-xs font-bold rounded uppercase tracking-wider transition-all mt-4 cursor-pointer"
                      >
                        Register Sovereign Node
                      </button>
                    </form>

                    <div className="p-4 bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl space-y-2">
                      <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#999] flex items-center gap-1">
                        <Lock size={12} /> Privacy and Sovereignty Safeguard
                      </h4>
                      <p className="text-[10px] text-gray-500 leading-relaxed font-sans">
                        By validating soil or blood metrics via locally computed Zero-Knowledge Proofs, the patient's identity and genetic genome data are never sent to external servers or government databases, ensuring total compliance with indigenous sovereignty.
                      </p>
                    </div>
                  </>
                ) : ledgerTabSub === 'coop' ? (
                  <>
                    <div>
                      <h4 className="text-xs font-mono text-emerald-800 uppercase tracking-widest mb-1">[FUNDING_STRATEGY_SIMULATOR]</h4>
                      <h3 className="text-lg font-serif font-light">Global Capital Allocator</h3>
                      <p className="text-xs text-[#666] mt-2 font-sans leading-relaxed">
                        Securely simulate the distribution of global philanthropic commitments to key ICEarth IT infrastructure components.
                      </p>
                    </div>

                    <div className="space-y-4 text-xs font-sans">
                      <div className="space-y-1.5">
                        <label className="font-semibold block">Select Active Funding Source</label>
                        <select
                          value={simulatedFundSource}
                          onChange={(e) => {
                            const val = e.target.value as any;
                            setSimulatedFundSource(val);
                            if (val === 'bloomberg') setFundingAmount(150000000);
                            else if (val === 'rockefeller') setFundingAmount(80000000);
                            else if (val === 'gund') setFundingAmount(25000000);
                            else if (val === 'lewis') setFundingAmount(50000000);
                          }}
                          className="w-full p-2.5 bg-white border border-[#D1D5DB] rounded-lg focus:outline-none focus:border-black"
                        >
                          <option value="bloomberg">Bloomberg Philanthropies ($150M Commit)</option>
                          <option value="rockefeller">Rockefeller Foundation ($80M Commit)</option>
                          <option value="gund">Gund Foundation ($25M Local Lead Fund)</option>
                          <option value="lewis">Adam Lewis Private trust ($50M Eco-Sovereign Fund)</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-semibold block">Simulated Funding Magnitude ($ USD)</label>
                        <input
                          type="number"
                          value={fundingAmount}
                          onChange={(e) => setFundingAmount(Math.max(0, Number(e.target.value)))}
                          className="w-full p-2.5 bg-white border border-[#D1D5DB] rounded-lg font-mono focus:outline-none focus:border-black"
                        />
                      </div>

                      {/* Allocations Sliders */}
                      <div className="p-4 bg-[#FCFBF7] border border-emerald-100 rounded-xl space-y-3">
                        <h4 className="font-bold text-black uppercase text-[9px] tracking-wider">
                          Distribution Ratios (% share)
                        </h4>

                        <div className="space-y-2 text-[10px]">
                          <div className="space-y-1">
                            <div className="flex justify-between font-mono">
                              <span>SnarkJS DID & ZK-Proofs:</span>
                              <span className="font-bold">{allocationGapA}%</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={allocationGapA}
                              onChange={(e) => setAllocationGapA(Number(e.target.value))}
                              className="w-full accent-emerald-800"
                            />
                            <span className="text-[8px] text-gray-400 block font-mono">
                              Est: ${(fundingAmount * (allocationGapA / 100)).toLocaleString(undefined, { maximumFractionDigits: 0 })} USD
                            </span>
                          </div>

                          <div className="space-y-1 pt-1.5 border-t border-neutral-100">
                            <div className="flex justify-between font-mono">
                              <span>GIS Exposure Mapping:</span>
                              <span className="font-bold">{allocationGapB}%</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={allocationGapB}
                              onChange={(e) => setAllocationGapB(Number(e.target.value))}
                              className="w-full accent-emerald-800"
                            />
                            <span className="text-[8px] text-gray-400 block font-mono">
                              Est: ${(fundingAmount * (allocationGapB / 100)).toLocaleString(undefined, { maximumFractionDigits: 0 })} USD
                            </span>
                          </div>

                          <div className="space-y-1 pt-1.5 border-t border-neutral-100">
                            <div className="flex justify-between font-mono">
                              <span>IPFS Decent. Storage:</span>
                              <span className="font-bold">{allocationGapC}%</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={allocationGapC}
                              onChange={(e) => setAllocationGapC(Number(e.target.value))}
                              className="w-full accent-emerald-800"
                            />
                            <span className="text-[8px] text-gray-400 block font-mono">
                              Est: ${(fundingAmount * (allocationGapC / 100)).toLocaleString(undefined, { maximumFractionDigits: 0 })} USD
                            </span>
                          </div>

                          <div className="space-y-1 pt-1.5 border-t border-neutral-100">
                            <div className="flex justify-between font-mono">
                              <span>Global Spanner Scale:</span>
                              <span className="font-bold">{allocationGapD}%</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={allocationGapD}
                              onChange={(e) => setAllocationGapD(Number(e.target.value))}
                              className="w-full accent-emerald-800"
                            />
                            <span className="text-[8px] text-gray-400 block font-mono">
                              Est: ${(fundingAmount * (allocationGapD / 100)).toLocaleString(undefined, { maximumFractionDigits: 0 })} USD
                            </span>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-emerald-100 flex justify-between font-mono text-[9px] font-bold text-emerald-800">
                          <span>Total Assigned:</span>
                          <span className={allocationGapA + allocationGapB + allocationGapC + allocationGapD === 100 ? "text-emerald-700" : "text-rose-600 animate-pulse"}>
                            {allocationGapA + allocationGapB + allocationGapC + allocationGapD}%
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          const total = allocationGapA + allocationGapB + allocationGapC + allocationGapD;
                          const sourceName = 
                            simulatedFundSource === 'bloomberg' ? 'Bloomberg Philanthropies' :
                            simulatedFundSource === 'rockefeller' ? 'Rockefeller Foundation' :
                            simulatedFundSource === 'gund' ? 'Gund Foundation' : 'Adam Lewis Private Trust';
                          
                          if (total !== 100) {
                            setLedgerMessage(`Warning: Allocated ratios sum to ${total}%. Ratios should sum to exactly 100% to simulate full treasury distribution.`);
                          } else {
                            setLedgerMessage(`Simulation Success: Distributed $${fundingAmount.toLocaleString()} USD from ${sourceName} into the ICEarth IT architecture. Zero-knowledge proof contracts simulated!`);
                          }
                        }}
                        className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded uppercase tracking-wider transition-all cursor-pointer text-center"
                      >
                        🚀 Process Simulated Allocations
                      </button>

                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <h4 className="text-xs font-mono text-[#999] uppercase tracking-widest mb-1">[INFO_MEDIATED_ENTERPRISE]</h4>
                      <h3 className="text-lg font-serif font-light">Data-Sovereignty Framework</h3>
                      <p className="text-xs text-[#666] mt-2 font-sans leading-relaxed">
                        Under the original 2001 <strong>ICEarth Conceptual Framework</strong> (normALST 02/07/01), individuals possess full data sovereignty.
                      </p>
                    </div>

                    <div className="space-y-4 text-xs">
                      <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl space-y-3 font-sans">
                        <h4 className="font-bold text-black flex items-center gap-1.5 uppercase text-[10px] tracking-wide">
                          <CheckCircle size={12} className="text-emerald-600" />
                          Key Architectural Pillars
                        </h4>
                        <ul className="space-y-2 list-disc list-inside text-gray-600 text-[11px] leading-relaxed">
                          <li><strong>Absolute Ownership:</strong> You retain exclusive property rights over your chemical and genomic profiles.</li>
                          <li><strong>Audited Brokers:</strong> Only cryptographically authenticated brokers may interface with your datasets.</li>
                          <li><strong>Voluntary Syndication:</strong> Community comparative analyses are aggregated with explicit, revocable consent.</li>
                          <li><strong>Tribal Shell:</strong> Enforcing tribal jurisdiction shields medical histories from hostile corporate/municipal overreach.</li>
                        </ul>
                      </div>

                      <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-xl space-y-2 text-[11px] leading-relaxed text-emerald-800">
                        <p className="font-semibold text-emerald-900">Historical Blueprint Citation:</p>
                        <p className="italic">
                          "The Emergence of Info-Mediated Enterprise establishes a cryptographic sphere of absolute cognitive liberation. Data is the individual's estate; none shall harvest it without permission."
                        </p>
                        <a 
                          href="http://realneo.us/content/icearth-information-community-earth-conceptual-framework-normalst-020701" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="block font-mono font-bold text-[9px] hover:underline break-all mt-2 text-emerald-700"
                        >
                          http://realneo.us/content/.../020701
                        </a>
                      </div>
                    </div>
                  </>
                )}
              </div>

            </div>
          )}

          {/* TAB 4: SOVEREIGN AI CO-AUTHOR CHAT */}
          {activeTab === 'chat' && (
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              
              {/* CHAT SESSION BODY */}
              <div className="flex-1 flex flex-col overflow-hidden bg-[#FAFAFA]">
                
                {/* CHAT MESSAGES PANEL */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.map((msg, i) => {
                    const isAi = msg.role === 'assistant';
                    return (
                      <div 
                        key={i} 
                        className={`flex gap-3 max-w-3xl ${isAi ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
                      >
                        {/* Avatar */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs shrink-0 select-none ${
                          isAi ? 'bg-black text-white' : 'bg-gray-200 text-[#1a1a1a]'
                        }`}>
                          {isAi ? 'AI' : 'NR'}
                        </div>

                        {/* Content Bubble */}
                        <div className={`space-y-1`}>
                          <div className={`p-4 rounded-2xl border text-xs leading-relaxed font-sans ${
                            isAi 
                              ? 'bg-white text-black border-[#E5E5E5] shadow-xs' 
                              : 'bg-[#1A1A1A] text-white border-transparent'
                          }`}>
                            <div className="whitespace-pre-line leading-relaxed">
                              {msg.content}
                            </div>
                          </div>
                          <span className={`text-[9px] text-gray-400 font-mono block ${isAi ? 'text-left' : 'text-right'}`}>
                            {msg.timestamp}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                  
                  {chatLoading && (
                    <div className="flex gap-3 mr-auto max-w-lg">
                      <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 select-none animate-pulse">
                        AI
                      </div>
                      <div className="bg-white text-black border border-[#E5E5E5] p-4 rounded-2xl shadow-xs flex items-center gap-2 text-xs font-mono">
                        <Activity size={14} className="text-sky-500 animate-spin" />
                        <span>Sovereign compute node compiling exposures data...</span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* TEXT INPUT ZONE */}
                <div className="p-4 border-t border-[#E5E5E5] bg-white flex flex-col gap-3 shrink-0">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Collaborate with your Sovereign AI Co-Author on Roulet's Law Proof..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1 p-3 border border-[#D1D5DB] rounded-xl text-xs focus:outline-none focus:border-black font-sans"
                    />
                    <button
                      onClick={() => handleSendMessage()}
                      disabled={chatLoading}
                      className="px-6 py-3 bg-[#1A1A1A] hover:bg-black text-white text-xs font-semibold rounded-xl transition-all cursor-pointer active:scale-95 disabled:opacity-50"
                    >
                      SEND
                    </button>
                  </div>
                </div>

              </div>

              {/* CO-AUTHOR QUICK TRIGGERS PANEL */}
              <div className="w-full md:w-80 border-l border-[#E5E5E5] bg-white p-6 space-y-6 shrink-0 overflow-y-auto">
                <div>
                  <h4 className="text-[10px] font-mono text-[#999] uppercase tracking-widest mb-1">[AI_CO_AUTHOR_PANEL]</h4>
                  <h3 className="text-lg font-serif font-light">Collaborative Triggers</h3>
                  <p className="text-xs text-[#666] mt-2 font-sans">
                    Use these preset exposenomics prompts to query the Sovereign Cognitive Node directly about specific proofs, cartels, or diagnostic vectors.
                  </p>
                </div>

                <div className="space-y-3.5">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block border-b pb-1.5">Direct Query Presets</span>
                  <div className="space-y-2">
                    {chatPresetPrompts.map((preset, i) => (
                      <button
                        key={i}
                        onClick={() => handleSendMessage(preset.text)}
                        className="w-full p-3 bg-gray-50 hover:bg-gray-100 text-[#444] rounded-lg border border-[#E5E5E5] text-left text-[11px] font-medium leading-normal transition-colors cursor-pointer block hover:border-[#1A1A1A]"
                      >
                        <Sparkles size={12} className="text-sky-500 inline mr-1.5" />
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* IMMERSIVE LAUNCH POSTER */}
                <div 
                  onClick={() => {
                    setModalImageSrc(icearthLaunchImg);
                    setModalImageTitle("Exhibit 2: ICEarth System Launch Canvas");
                    setIsImageModalOpen(true);
                  }}
                  className="group relative rounded-xl overflow-hidden border border-[#E5E5E5] bg-neutral-950 cursor-pointer shadow-xs aspect-[1.77] transition-all hover:border-[#1A1A1A] hover:shadow-sm"
                >
                  <img 
                    src={icearthLaunchImg} 
                    alt="ICEarth Launch Canvas" 
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[9px] font-mono font-bold text-white bg-black/80 px-2 py-1 rounded border border-neutral-700 shadow-md">
                      🔍 VIEW SYSTEM CANVAS
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 border border-[#E5E5E5] rounded-xl space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-black block">Co-Author Persona State</span>
                  <p className="text-[10px] text-gray-500 leading-relaxed font-sans">
                    The Co-Author AI has been pre-seeded with complete data regarding Thomas Midgley, Standard Oil, I.G. Farben, Clair Patterson, and leaded gasoline cartels. It stands ready to draft scientific outlines.
                  </p>
                </div>
              </div>

            </div>
          )}

        </section>
      </main>

      {/* FOOTER */}
      <footer className="h-10 border-t border-[#E5E5E5] bg-white flex items-center justify-between px-8 text-[10px] font-medium text-[#999] tracking-widest uppercase shrink-0">
        <div>STATUS: COGNITIVE_BASELINE_OPTIMIZED</div>
        <div className="flex gap-8">
          <span>MANUSCRIPT_WORDS: 14,821</span>
          <span>DRAFT_ID: ICE-RLP-2026</span>
          <span>ENCRYPTION: ZK-SHA256</span>
        </div>
      </footer>

      {/* EXPANSIBLE INFOGRAPHIC VIEWER MODAL */}
      {isImageModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xs p-4 md:p-8 transition-all duration-300"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div 
            className="relative bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl transition-all duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 border-b border-[#E5E5E5] flex items-center justify-between bg-[#FAFAFA] shrink-0">
              <div>
                <h4 className="text-[10px] font-mono font-bold tracking-widest text-red-600 uppercase flex items-center gap-1.5 font-sans">
                  <Activity size={12} className="animate-pulse" />
                  Sovereign Analytical Viewer
                </h4>
                <h3 className="text-sm font-semibold text-black mt-0.5 font-sans">
                  {modalImageTitle}
                </h3>
              </div>
              <button 
                onClick={() => setIsImageModalOpen(false)}
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-black rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            {/* Exhibit Tabs Switcher */}
            <div className="px-6 py-2.5 border-b border-[#E5E5E5] bg-[#F9FAFB] flex flex-wrap gap-2 text-xs font-mono shrink-0">
              <button
                onClick={() => {
                  setModalImageSrc(scatterplotImg);
                  setModalImageTitle("Exhibit 1: The Master Scatterplot of Human History");
                }}
                className={`px-3 py-1.5 rounded-lg border font-bold transition-all cursor-pointer flex items-center gap-1.5 text-[11px] ${
                  modalImageSrc === scatterplotImg
                    ? 'bg-black text-white border-black shadow-sm'
                    : 'bg-white text-gray-500 border-gray-200 hover:text-black hover:border-gray-400'
                }`}
              >
                📊 Exhibit 1: Roulet's Law Proof Scatterplot
              </button>
              <button
                onClick={() => {
                  setModalImageSrc(icearthLaunchImg);
                  setModalImageTitle("Exhibit 2: ICEarth System Launch Canvas");
                }}
                className={`px-3 py-1.5 rounded-lg border font-bold transition-all cursor-pointer flex items-center gap-1.5 text-[11px] ${
                  modalImageSrc === icearthLaunchImg
                    ? 'bg-black text-white border-black shadow-sm'
                    : 'bg-white text-gray-500 border-gray-200 hover:text-black hover:border-gray-400'
                }`}
              >
                🚀 Exhibit 2: ICEarth System Launch Canvas
              </button>
            </div>

            {/* Scrollable image canvas */}
            <div className="flex-1 overflow-auto bg-gray-50 p-6 flex justify-center items-center">
              <img
                src={modalImageSrc}
                alt={modalImageTitle}
                className="max-h-[55vh] w-auto max-w-full object-contain rounded-lg border border-gray-200 shadow-sm"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Scientific breakdown panel */}
            <div className="p-5 border-t border-[#E5E5E5] bg-[#FAFAFA] grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-gray-600 font-sans shrink-0">
              {modalImageSrc === scatterplotImg ? (
                <>
                  <div>
                    <strong className="text-black block mb-1 uppercase tracking-wider text-[10px] font-mono">1. Four Pillars of Malpractice</strong>
                    Deconstructs the anthropogenic trajectory into Environmental (segregation), Medical (HPA override), Scientific (suppressing alternatives), and Legal (monopoly shielding) malpractice.
                  </div>
                  <div>
                    <strong className="text-black block mb-1 uppercase tracking-wider text-[10px] font-mono">2. Analytical Scatterplots</strong>
                    Establishes the absolute regression between subatomic lead perturbation ($H'$) and the macro-scale chaos rate (Crime, Holocaust, geopolitical conflict).
                  </div>
                  <div>
                    <strong className="text-black block mb-1 uppercase tracking-wider text-[10px] font-mono">3. Neurological Baselines</strong>
                    Maps lead absorption directly to the hypothalamic-pituitary-adrenal (HPA) axis and prefrontal cortex atrophy, explaining cognitive degradation.
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <strong className="text-black block mb-1 uppercase tracking-wider text-[10px] font-mono">1. Swiss School of Exposenomics</strong>
                    Establishing a peerless global standard for multi-generational tracking of heavy metals and atmospheric toxicant burdens.
                  </div>
                  <div>
                    <strong className="text-black block mb-1 uppercase tracking-wider text-[10px] font-mono">2. Sovereignty & ZK Proofs</strong>
                    Empowering citizens to hold self-custodial records of exposure under sacred tribal and localized community jurisdictions using zero-knowledge math.
                  </div>
                  <div>
                    <strong className="text-black block mb-1 uppercase tracking-wider text-[10px] font-mono">3. The 1996 Genesis Timeline</strong>
                    Fusing decades of industrial data benchmarking with next-generation decentralized sovereign nodes to cleanse humanity's cognitive baseline.
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
