import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Globe, 
  Scale, 
  BookOpen, 
  Flame, 
  Coins, 
  AlertTriangle, 
  CheckCircle, 
  ExternalLink, 
  Sparkles, 
  HeartPulse, 
  TrendingUp, 
  Lock, 
  Link2,
  Check,
  FileText
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Cell 
} from 'recharts';

export const GenocostTab: React.FC = () => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<'overview' | 'legal' | 'resource' | 'icearth'>('overview');

  // Comparison data for Resource Value vs Human Neurological & Health Cost in DRC & Global Mining Zones
  const genocostData = [
    { category: 'Raw Cobalt & Lead Extraction', commercialValue: 85, humanCost: 420 },
    { category: 'Artisanal Smelting & Battery Recycling', commercialValue: 40, humanCost: 650 },
    { category: 'Unregulated Mine Tailings', commercialValue: 15, humanCost: 890 },
    { category: 'Global Child Heavy Metal Poisoning', commercialValue: 120, humanCost: 1400 },
  ];

  const copyDirectLink = () => {
    const url = `${window.location.origin}${window.location.pathname}?tab=genocost`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-4">
      
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-br from-amber-950 via-neutral-900 to-red-950 text-white rounded-2xl p-6 md:p-8 border border-amber-800/50 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-amber-900/60 pb-5">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-600/40 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest">
                <Flame size={12} className="text-amber-400 animate-pulse" />
                <span>Democratic Republic of Congo • National Day of Remembrance (August 2)</span>
              </div>
              <h1 className="text-2xl md:text-4xl font-serif font-black text-amber-100 flex items-center gap-3">
                <span>🇨🇩 Genocost & Anthropogenic Lead Genocide</span>
              </h1>
              <p className="text-xs md:text-sm text-amber-200/80 font-mono">
                Understanding Congo’s Language of Remembrance, Resource Exploitation, and UN Genocide Article II Under Roulet's Law
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={copyDirectLink}
                className="px-4 py-2.5 bg-amber-900/80 hover:bg-amber-800 text-amber-100 border border-amber-700/60 rounded-xl font-mono text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm"
              >
                {copiedLink ? (
                  <>
                    <Check size={14} className="text-emerald-400" />
                    <span className="text-emerald-300">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Link2 size={14} className="text-amber-300" />
                    <span>Share View</span>
                  </>
                )}
              </button>
              <a
                href="?tab=manuscript&chapter=case-study-genocost-lead-genocide"
                className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <BookOpen size={14} />
                <span>Read Manual Chapter</span>
              </a>
            </div>
          </div>

          {/* QUICK SUMMARY METRICS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
            <div className="p-3 bg-black/50 border border-amber-900/50 rounded-xl space-y-1">
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">Official Law</span>
              <span className="text-sm font-bold text-white font-serif">Dec 2022 DRC Law</span>
              <span className="text-[10px] text-amber-300/80 block">Commemorating Aug 2, 1998</span>
            </div>
            <div className="p-3 bg-black/50 border border-amber-900/50 rounded-xl space-y-1">
              <span className="text-[10px] font-mono text-rose-400 uppercase tracking-wider block">Poisoned Children</span>
              <span className="text-sm font-bold text-rose-200 font-serif">1/3 of Earth (800M)</span>
              <span className="text-[10px] text-rose-300/80 block">Anthropogenic Lead Saturation</span>
            </div>
            <div className="p-3 bg-black/50 border border-amber-900/50 rounded-xl space-y-1">
              <span className="text-[10px] font-mono text-amber-300 uppercase tracking-wider block">Legal Definition</span>
              <span className="text-sm font-bold text-amber-100 font-serif">UN Convention Art. II</span>
              <span className="text-[10px] text-amber-200/80 block">Intentional Group Destruction</span>
            </div>
            <div className="p-3 bg-black/50 border border-amber-900/50 rounded-xl space-y-1">
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">ICEarth Sovereign</span>
              <span className="text-sm font-bold text-emerald-200 font-serif">Reparations Escrow</span>
              <span className="text-[10px] text-emerald-300/80 block">Immutable Telemetry Ledgers</span>
            </div>
          </div>
        </div>
      </div>

      {/* TOPIC NAVIGATION TABS */}
      <div className="flex border-b border-neutral-200 gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setSelectedTopic('overview')}
          className={`px-4 py-2 text-xs font-mono font-bold rounded-t-lg transition-all cursor-pointer flex items-center gap-2 ${
            selectedTopic === 'overview'
              ? 'bg-amber-950 text-white border-t border-x border-amber-800'
              : 'text-neutral-600 hover:text-black bg-neutral-100'
          }`}
        >
          <Flame size={14} />
          <span>1. What is Genocost?</span>
        </button>

        <button
          onClick={() => setSelectedTopic('legal')}
          className={`px-4 py-2 text-xs font-mono font-bold rounded-t-lg transition-all cursor-pointer flex items-center gap-2 ${
            selectedTopic === 'legal'
              ? 'bg-amber-950 text-white border-t border-x border-amber-800'
              : 'text-neutral-600 hover:text-black bg-neutral-100'
          }`}
        >
          <Scale size={14} />
          <span>2. Genocide under UN Law & Roulet's Law</span>
        </button>

        <button
          onClick={() => setSelectedTopic('resource')}
          className={`px-4 py-2 text-xs font-mono font-bold rounded-t-lg transition-all cursor-pointer flex items-center gap-2 ${
            selectedTopic === 'resource'
              ? 'bg-amber-950 text-white border-t border-x border-amber-800'
              : 'text-neutral-600 hover:text-black bg-neutral-100'
          }`}
        >
          <Coins size={14} />
          <span>3. Resource Exploitation Matrix</span>
        </button>

        <button
          onClick={() => setSelectedTopic('icearth')}
          className={`px-4 py-2 text-xs font-mono font-bold rounded-t-lg transition-all cursor-pointer flex items-center gap-2 ${
            selectedTopic === 'icearth'
              ? 'bg-amber-950 text-white border-t border-x border-amber-800'
              : 'text-neutral-600 hover:text-black bg-neutral-100'
          }`}
        >
          <Lock size={14} />
          <span>4. ICEarth Sovereign Solution</span>
        </button>
      </div>

      {/* SECTION 1: WHAT IS GENOCOST? */}
      {selectedTopic === 'overview' && (
        <div className="space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-neutral-200 shadow-sm space-y-5">
            <div className="flex items-center gap-3 border-b border-neutral-100 pb-4">
              <div className="p-2.5 bg-amber-100 text-amber-900 rounded-xl">
                <Flame size={20} />
              </div>
              <div>
                <h2 className="text-xl font-serif font-bold text-neutral-900">
                  Genocost: Congo’s Language of Remembrance & Justice
                </h2>
                <p className="text-xs text-neutral-500 font-mono">
                  Official DRC National Day of Remembrance • Commemorated Annually on August 2
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-neutral-700 leading-relaxed font-sans">
              <div className="space-y-3">
                <p>
                  On <strong>August 2</strong>, the Democratic Republic of the Congo (DRC) commemorates <strong>Genocost Day</strong>—a national day of remembrance dedicated to the millions of victims of violence, mineral exploitation, and armed conflict affecting the country since 1996. First promoted by Congolese civil society in 2013, the commemoration was officially established under Congolese law in December 2022.
                </p>
                <p>
                  Combining the words <strong>“Genocide”</strong> and <strong>“Cost”</strong>, Genocost highlights the devastating human suffering associated with decades of armed conflict while exposing the primary engine driving violence: <strong>the systemic, predatory exploitation of natural resources (lead, cobalt, coltan, gold) by multinational corporations and armed proxies</strong>.
                </p>
                <div className="p-3 bg-amber-50 border border-amber-200/80 rounded-xl space-y-1 text-amber-950">
                  <strong className="font-mono text-[11px] uppercase block text-amber-900">Why August 2 Matters:</strong>
                  <p className="text-[11px]">
                    August 2 marks the outbreak of the Second Congo War in 1998 ("Africa’s World War"), which transformed a regional crisis into one of the deadliest conflicts in modern history, claiming over 5.4 million lives and displacing millions more.
                  </p>
                </div>
              </div>

              <div className="space-y-3 bg-neutral-900 text-white p-5 rounded-xl border border-neutral-800">
                <h3 className="font-serif font-bold text-amber-300 text-sm flex items-center gap-2">
                  <AlertTriangle size={16} className="text-amber-400" />
                  <span>The Core Elements of Genocost</span>
                </h3>
                <ul className="space-y-2 text-[11px] text-neutral-300 font-mono">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong>1. Economic Violence:</strong> Natural resource extraction profits external corporations while leaving local populations in extreme poverty and toxic contamination.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong>2. Environmental Poisoning:</strong> Heavy metals (lead, arsenic, mining tailings) permanently poison water tables and farmland, causing systemic neurological and genetic atrophy.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong>3. Corporate Immunity:</strong> International markets absorb tainted minerals without compensating victims or funding environmental remediation.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong>4. Political Demand for Justice:</strong> Demanding legal recognition, international reparations, and sovereign technology ledgers.</span>
                  </li>
                </ul>
                <div className="pt-2 border-t border-neutral-800 text-[10px] text-neutral-400 flex items-center justify-between">
                  <span>Source: The Conversation / DRC Law</span>
                  <a href="https://theconversation.com/what-is-genocost-understanding-congos-new-language-of-remembrance-and-justice-286987" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline flex items-center gap-1">
                    <span>Read Article</span> <ExternalLink size={10} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: GENOCIDE UNDER UN LAW & ROULET'S LAW */}
      {selectedTopic === 'legal' && (
        <div className="space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-neutral-100 pb-4">
              <div className="p-2.5 bg-rose-100 text-rose-900 rounded-xl">
                <Scale size={20} />
              </div>
              <div>
                <h2 className="text-xl font-serif font-bold text-neutral-900">
                  Roulet's Law Proof: Anthropogenic Lead Saturation is Genocide
                </h2>
                <p className="text-xs text-neutral-500 font-mono">
                  Connecting UN Genocide Convention Article II to Global Lead Poisoning of 1/3 of Earth's Children
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs text-neutral-700 leading-relaxed font-sans">
              <blockquote className="p-4 bg-rose-50 border-l-4 border-rose-600 rounded-r-xl space-y-2 text-rose-950 font-serif text-sm">
                "In the present Convention, genocide means any of the following acts committed with intent to destroy, in whole or in part, a national, ethnical, racial or religious group, as such: (a) Killing members of the group; (b) Causing serious bodily or mental harm to members of the group; (c) Deliberately inflicting on the group conditions of life calculated to bring about its physical destruction in whole or in part..."
                <span className="text-[10px] font-mono text-rose-800 block not-italic font-bold mt-1">
                  — Article II, United Nations Convention on the Prevention and Punishment of the Crime of Genocide (1948)
                </span>
              </blockquote>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-rose-700 font-mono text-xs font-bold uppercase">
                    <ShieldAlert size={14} />
                    <span>1. Intent & Foreknowledge</span>
                  </div>
                  <p className="text-[11px] text-neutral-600">
                    Corporate lead producers (Dutch Boy, Lead Industries Association, ILA) knew since at least 1909 that lead is a destructive neurotoxin with no safe threshold, yet deliberately distributed it into paints, gasoline, and battery smelters in vulnerable communities.
                  </p>
                </div>

                <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-rose-700 font-mono text-xs font-bold uppercase">
                    <HeartPulse size={14} />
                    <span>2. Serious Mental & Physical Harm</span>
                  </div>
                  <p className="text-[11px] text-neutral-600">
                    Lead exposure degrades the prefrontal cortex, causes irreversible IQ destruction, dysregulates the HPA axis, and induces behavioral impulse control failure, fulfilling "causing serious mental harm" under Article II(b).
                  </p>
                </div>

                <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-rose-700 font-mono text-xs font-bold uppercase">
                    <Globe size={14} />
                    <span>3. Destructive Conditions of Life</span>
                  </div>
                  <p className="text-[11px] text-neutral-600">
                    Poisoning 1/3 of the children on Earth (800 million children) through mining tailings, leaded water pipes, and recycling smelters deliberately inflicts conditions calculated to cause generational physical destruction under Article II(c).
                  </p>
                </div>
              </div>

              <div className="p-4 bg-amber-950 text-white rounded-xl space-y-2 font-mono text-xs">
                <h4 className="font-bold text-amber-300 uppercase flex items-center gap-2">
                  <Sparkles size={14} />
                  Roulet's Law Legal Conclusion: No Debate
                </h4>
                <p className="text-amber-100/90 leading-relaxed text-[11px]">
                  Because all anthropogenic lead exposure has been formally recognized as toxic poisoning by global courts, health authorities, and scientific consensus, the deliberate continuation of lead saturation for corporate profit, while fighting distance regulations and downplaying harms, constitutes <strong>Genocide under International Law</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: RESOURCE EXPLOITATION MATRIX */}
      {selectedTopic === 'resource' && (
        <div className="space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-neutral-100 pb-4">
              <div className="p-2.5 bg-amber-100 text-amber-900 rounded-xl">
                <Coins size={20} />
              </div>
              <div>
                <h2 className="text-xl font-serif font-bold text-neutral-900">
                  The Economic Matrix of Genocost: Mineral Extraction vs. Human Cost
                </h2>
                <p className="text-xs text-neutral-500 font-mono">
                  Comparing Extracted Commercial Mineral Value ($ Billions) to Long-term Neurological & Health Liabilities
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-7 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={genocostData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="category" tick={{ fontSize: 9 }} interval={0} />
                    <YAxis label={{ value: '$ Billions USD', angle: -90, position: 'insideLeft', fontSize: 10 }} />
                    <Tooltip 
                      formatter={(value: number) => [`$${value} Billion USD`, 'Cost / Value']} 
                      contentStyle={{ backgroundColor: '#1a1a1a', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                    />
                    <Bar dataKey="commercialValue" name="Commercial Mineral Revenue ($B)" fill="#d97706" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="humanCost" name="Human Neurological & Health Burden ($B)" fill="#dc2626" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="md:col-span-5 space-y-3 bg-neutral-50 p-4 rounded-xl border border-neutral-200 text-xs">
                <h4 className="font-bold text-neutral-900 font-serif text-sm">Key Insights from the Genocost Data:</h4>
                <ul className="space-y-2 text-[11px] text-neutral-700 font-sans">
                  <li className="flex items-start gap-1.5">
                    <span className="text-red-600 font-bold">•</span>
                    <span><strong>10:1 Ratio of Harm:</strong> For every $1 Billion generated in raw mineral export, communities incur over $10 Billion in uncompensated long-term health, cognitive, and remediation damages.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-red-600 font-bold">•</span>
                    <span><strong>800 Million Children Poisoned:</strong> Lead battery recycling and smelting alone inflict a $1.4 Trillion annual neurological burden on developing nations.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-red-600 font-bold">•</span>
                    <span><strong>Systemic Corporate Extraction:</strong> Foreign supply chains capture 95% of mineral profits while leaving 100% of toxic lead tailings in DRC and global mining belts.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: ICEARTH SOVEREIGN SOLUTION */}
      {selectedTopic === 'icearth' && (
        <div className="space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-neutral-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-neutral-100 pb-4">
              <div className="p-2.5 bg-emerald-100 text-emerald-900 rounded-xl">
                <Lock size={20} />
              </div>
              <div>
                <h2 className="text-xl font-serif font-bold text-neutral-900">
                  The ICEarth Solution: Sovereign Verification & Reparations Ledger
                </h2>
                <p className="text-xs text-neutral-500 font-mono">
                  Replacing Corporate Exploitation with Immutable Sensor Telemetry and Escrowed Tokenized Remediation
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-neutral-700 leading-relaxed font-sans">
              <div className="p-5 bg-neutral-900 text-white rounded-xl border border-neutral-800 space-y-3">
                <h3 className="font-serif font-bold text-emerald-400 text-sm flex items-center gap-2">
                  <CheckCircle size={16} />
                  <span>1. Immutable On-Chain Environmental Sensors</span>
                </h3>
                <p className="text-[11px] text-neutral-300">
                  ICEarth deploys decentralized, tamper-proof soil, water, and air sensors directly in DRC mining zones and global smelter perimeters. Telemetry data is cryptographically signed and stored on-chain, rendering corporate science suppression impossible.
                </p>
              </div>

              <div className="p-5 bg-neutral-900 text-white rounded-xl border border-neutral-800 space-y-3">
                <h3 className="font-serif font-bold text-emerald-400 text-sm flex items-center gap-2">
                  <CheckCircle size={16} />
                  <span>2. Zero-Knowledge Legal Reparations Vaults</span>
                </h3>
                <p className="text-[11px] text-neutral-300">
                  Impacted communities verify blood lead levels (BLL) and heavy metal exposure using Zero-Knowledge Proofs (ZKPs). This establishes strict legal causality for international tribunals and Genocost reparations without exposing personal patient data.
                </p>
              </div>

              <div className="p-5 bg-neutral-900 text-white rounded-xl border border-neutral-800 space-y-3">
                <h3 className="font-serif font-bold text-emerald-400 text-sm flex items-center gap-2">
                  <CheckCircle size={16} />
                  <span>3. Escrow-Backed Remediation Capital</span>
                </h3>
                <p className="text-[11px] text-neutral-300">
                  Reparations funds and ICE Tokens are locked in smart contracts, releasing capital directly to local Indigenous and community contractors only when sensors confirm heavy metal levels dropping toward the 0.016 μg/dL baseline.
                </p>
              </div>

              <div className="p-5 bg-neutral-900 text-white rounded-xl border border-neutral-800 space-y-3">
                <h3 className="font-serif font-bold text-emerald-400 text-sm flex items-center gap-2">
                  <CheckCircle size={16} />
                  <span>4. Sovereign Data & Mineral Governance</span>
                </h3>
                <p className="text-[11px] text-neutral-300">
                  Reclaiming full sovereign jurisdiction over local mineral wealth, ensuring that no supply chain can process DRC minerals without paying full environmental and health remediation escrow taxes upfront.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER DIRECT LINKS */}
      <div className="bg-amber-50 border border-amber-200/80 p-5 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 text-amber-950 text-xs font-mono">
        <div className="space-y-1">
          <strong className="font-bold text-amber-900 uppercase block">ICEarth Sovereign Directory Integration:</strong>
          <p className="text-[11px]">
            Genocost Day (August 2) stands at the highest level of ICEarth as a permanent monument to justice, sovereign technology, and environmental remediation.
          </p>
        </div>
        <a
          href="?tab=manuscript&chapter=case-study-genocost-lead-genocide"
          className="px-4 py-2 bg-amber-800 hover:bg-amber-700 text-white font-bold rounded-lg shadow-xs flex items-center gap-2 transition-all shrink-0 cursor-pointer text-xs"
        >
          <BookOpen size={14} />
          <span>Read Manuscript Case Study</span>
        </a>
      </div>

    </div>
  );
};
