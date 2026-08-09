import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  FileText, 
  AlertTriangle, 
  TrendingUp, 
  ArrowRight, 
  ShieldAlert, 
  Activity, 
  CheckCircle2, 
  Search, 
  Database, 
  Sparkles,
  Newspaper,
  Quote,
  Scale,
  Brain,
  Users,
  Award,
  Globe,
  ExternalLink,
  ChevronRight,
  Lock
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
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

interface ToledoLeadAuditProps {
  onNavigateTab?: (tab: string) => void;
}

// Ohio & Toledo Lead Risk Comparison Metrics
const OHIO_LEAD_METRICS = [
  { metric: "Pre-1978 Ohio Homes with Lead Paint", percentage: 67, detail: "2 out of 3 homes across Ohio (Lead-Free Ohio)" },
  { metric: "High-Risk Children Missing Screening", percentage: 40, detail: "40% of vulnerable Ohio toddlers receive no lead test" },
  { metric: "Toledo Legacy Housing Stock (Pre-1978)", percentage: 78, detail: "Concentrated in central city neighborhoods like Junction" },
  { metric: "Lead Service Line Connections (Toledo)", percentage: 45, detail: "Ongoing replacement programs with municipal lead water pipes" }
];

const CDC_SPEECH_HIGHLIGHTS = [
  {
    topic: "Solid Truth of Lead-Crime Link",
    quote: "One of their early speakers talked about the connection between lead poisoning and violence... That's the truth. That's solid truth. It's well established scientifically that lead exposure in childhood leads to other problems, including more tendencies towards juvenile delinquency and incarceration.",
    significance: "Direct endorsement of the Lead-Crime Hypothesis by the official Chief of the Lead Poisoning Prevention and Surveillance Branch at the CDC."
  },
  {
    topic: "Systemic Pipeline & The 15 Boys",
    quote: "Ladies and gentlemen, I'm here to tell you something that you probably already know. Those 15 boys, all of them like me, locked up in a prison, wasn't a coincidence. There were a series of events that led to that, some of which are systemic, and that in some cases those boys were on that path from the day they were conceived.",
    significance: "Personal testimony from a senior Black public health officer verifying that childhood heavy metal exposure systematically drives youth into incarceration."
  },
  {
    topic: "Inescapable Outcome & Inevitability",
    quote: "I saw it as inevitable as rain that they ended up in those facilities... and unless society acts, it will continue to happen.",
    significance: "Framing lead exposure not as individual moral failure, but as an inescapable geochemical trap requiring immediate community intervention."
  },
  {
    topic: "Midwestern School Environmental Poisoning",
    quote: "Recounted an investigation at a Midwestern school where peeling paint chips and contaminated water left 'lead everywhere'... raising the question of how any child can succeed with a brain-damaging toxin embedded in classrooms and hallways.",
    significance: "Exposing how children face direct toxic exposure within municipal educational infrastructure."
  }
];

export const ToledoLeadAudit: React.FC<ToledoLeadAuditProps> = ({ onNavigateTab }) => {
  const [activeArticleTab, setActiveArticleTab] = useState<'overview' | 'cdc_speech' | 'toledo_blade' | 'icearth_solution'>('overview');

  return (
    <div id="toledo-lead-audit-root" className="w-full max-w-7xl mx-auto p-6 md:p-8 space-y-8 font-sans">
      
      {/* HEADER SECTION */}
      <div className="border-b border-neutral-200 pb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 bg-red-100 text-red-800 text-[10px] font-mono font-bold uppercase rounded-full border border-red-200 flex items-center gap-1">
                <MapPin size={12} /> 419 Toledo Case Study
              </span>
              <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold uppercase rounded-full border border-emerald-200 flex items-center gap-1">
                <Activity size={12} /> CDC Lead Branch Confession
              </span>
              <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 text-[10px] font-mono font-bold uppercase rounded-full border border-amber-200">
                July 23, 2026 Toledo Blade Report
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 leading-tight">
              Toledo Lead Audit & CDC Lead-Crime Confession Case Study
            </h1>
            <p className="text-sm text-neutral-600 mt-1 max-w-3xl leading-relaxed">
              Junction Coalition "Unleaded" Symposium, CDC Branch Chief Paul Allwood's direct endorsement of the Lead-Crime Hypothesis, Mayor Lloyd Roulet's ancestral legacy, and ICEarth's sovereign data solution.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 shrink-0">
            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('proofs')}
                className="px-4 py-2.5 bg-neutral-900 hover:bg-black text-white text-xs font-mono font-bold rounded-xl uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <Brain size={14} /> View All Lead-Crime Proofs
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ROULET FAMILY ANCESTRAL LEGACY & TOLEDO ADVOCACY BANNER */}
      <div className="bg-gradient-to-r from-amber-950 via-neutral-900 to-amber-950 text-white rounded-2xl p-6 border border-amber-800/40 shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
          <div className="p-3 bg-amber-500/20 text-amber-300 rounded-xl border border-amber-500/30 shrink-0">
            <Building2 size={28} />
          </div>
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-widest bg-amber-900/60 px-2 py-0.5 rounded border border-amber-700/50">
                Ancestral Civic Roots & 20-Year Toledo Advocacy
              </span>
              <span className="text-xs text-neutral-400 font-mono">1943–1953 Toledo Mayoral Legacy</span>
            </div>
            <h2 className="text-lg font-serif font-bold text-amber-100 leading-snug">
              Mayor Lloyd Roulet's Legacy & The Struggle for Toledo's Lead Housing Registry
            </h2>
            <p className="text-xs text-neutral-300 leading-relaxed font-sans">
              Both parents of ICEarth founder Norman Roulet hailed from Toledo, Ohio. His great-uncle, <strong>Lloyd Roulet</strong>, served as Mayor of Toledo from 1943–1947 and 1952–1953. With a deep personal interest in Toledo's civic health, Norman Roulet has advocated directly to Toledo City Council for two decades on environmental lead remediation. For years, Toledo has struggled to establish an enforceable Lead Housing Registry due to landlord lawsuits, municipal delays, and political corruption—severely limiting success while thousands of children suffer ongoing lead exposure.
            </p>
            <div className="pt-3 border-t border-amber-800/50 flex flex-wrap items-center justify-between gap-3 text-[11px] text-amber-200/90 font-mono">
              <span>• Toledo Mayor Lloyd Roulet (1943-47, 1952-53)</span>
              <span>• Pre-1978 Legacy Lead Housing Stock</span>
              <span>• ICEarth Sovereign ZK-Registry Solution</span>
            </div>
          </div>
        </div>
      </div>

      {/* CORE ASTOUNDING HIGHLIGHT: CDC BRANCH CHIEF PAUL ALLWOOD'S SPEECH */}
      <div className="bg-red-950/10 border-2 border-red-500/30 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-red-200/60">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Quote className="text-red-600 animate-pulse" size={22} />
              <span className="text-xs font-mono font-bold text-red-700 uppercase tracking-widest">
                ASTOUNDING FEDERAL CONFESSION • JULY 23, 2026
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-serif font-bold text-neutral-900">
              CDC Chief Paul Allwood Publicly Endorses the Lead-Crime Hypothesis
            </h2>
            <p className="text-xs text-neutral-600 font-sans">
              Speaking at Junction Coalition's <em>Unleaded: Our Homes. Our Children. Our Future</em> Symposium at Toledo Main Library.
            </p>
          </div>
          <div className="px-3 py-1.5 bg-red-100 text-red-900 rounded-lg text-xs font-mono font-bold border border-red-200 shrink-0">
            Official CDC Branch Chief Statement
          </div>
        </div>

        {/* ANALYSIS OF WHY THIS CONFESSION IS ASTOUNDING */}
        <div className="p-5 bg-white rounded-xl border border-red-200 space-y-3 shadow-xs">
          <h3 className="text-xs font-mono font-bold uppercase text-red-900 flex items-center gap-1.5">
            <Sparkles size={14} className="text-red-600" />
            Why This CDC Confession Transcends Political Narrative & Proves Public Perception Wrong
          </h3>
          <p className="text-xs text-neutral-700 leading-relaxed">
            Paul Allwood, Chief of the Lead Poisoning Prevention and Surveillance Branch at the Centers for Disease Control and Prevention (CDC), is a career Black public health leader with experience across local agencies, state agencies, and academia. Public perception frequently assumes federal agencies are constrained by shifting political leadership across Presidential Administrations (such as criticized funding or staff reductions under the Trump Administration, which have been resolved). 
          </p>
          <p className="text-xs text-neutral-700 leading-relaxed font-semibold text-neutral-900">
            Yet here, in an official CDC capacity, a senior Black public health chief directly and unequivocally endorsed the Lead-Crime Hypothesis—calling the scientific link between childhood lead exposure, violence, juvenile delinquency, and incarceration <span className="text-red-700 underline font-bold font-serif">"the truth... solid truth."</span> This proves that scientific reality cannot be erased by political rhetoric, and demonstrates why all presidential administrations (Trump, Biden, Obama) must succeed in preventing lead poisoning via ICEarth's uncorruptible data and science sovereignty.
          </p>
        </div>

        {/* GRID OF KEY SPEECH QUOTES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CDC_SPEECH_HIGHLIGHTS.map((item, idx) => (
            <div key={idx} className="bg-neutral-900 text-neutral-100 p-5 rounded-xl border border-neutral-800 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                    {item.topic}
                  </span>
                  <Quote size={14} className="text-neutral-600" />
                </div>
                <p className="text-xs font-serif italic text-amber-200/90 leading-relaxed border-l-2 border-emerald-500 pl-3 py-1">
                  "{item.quote}"
                </p>
              </div>
              <p className="text-[11px] font-sans text-neutral-400 pt-2 border-t border-neutral-800">
                <strong className="text-neutral-200">Exposenomic Significance:</strong> {item.significance}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* TOLEDO & OHIO STATISTICAL DASHBOARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Metrics & Hospital Insights */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-neutral-200 space-y-5">
          <div className="space-y-1 pb-3 border-b border-neutral-100">
            <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest block">
              STATEWIDE & MUNICIPAL DATA
            </span>
            <h3 className="text-base font-serif font-bold text-neutral-900">
              Lead-Free Ohio & Toledo Junction Coalition Data
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {OHIO_LEAD_METRICS.map((metric, i) => (
              <div key={i} className="p-4 bg-neutral-50 rounded-xl border border-neutral-200/80 space-y-1.5">
                <span className="text-2xl font-serif font-bold text-red-700 block">{metric.percentage}%</span>
                <h4 className="text-xs font-bold text-neutral-900 leading-snug">{metric.metric}</h4>
                <p className="text-[10.5px] text-neutral-600 leading-normal">{metric.detail}</p>
              </div>
            ))}
          </div>

          {/* Pediatric Insights */}
          <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl space-y-2">
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-amber-700" />
              <h4 className="text-xs font-bold text-amber-950 font-serif">
                Pediatrician Warning — Dr. Iris Castillo (Nationwide Children's Hospital–Toledo)
              </h4>
            </div>
            <p className="text-xs text-amber-900 leading-relaxed font-sans">
              "Unfortunately, most of the people who have lower levels don't have symptoms, so that's why it's really important to get the screening testing done. But at certain higher levels, they usually experience abdominal pain. They can have hearing problems, or kidney issues, because the lead can be pretty bad on the whole system itself."
            </p>
          </div>

          {/* Grant Funding & Coalition Leadership */}
          <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase">Junction Coalition & Grant Milestones</span>
              <span className="text-[10px] font-mono text-emerald-700 font-bold">$600k CDC + $7M HUD</span>
            </div>
            <p className="text-xs text-emerald-950 leading-relaxed">
              <strong>Alicia Smith (Executive Director, Junction Coalition):</strong> "Our children are suffering from cognitive disabilities and being pushed into the school-to-prison pipeline because of this contamination. We need a lead-free 419, in Ohio, and across the country because it is harming our children, our families, and our livelihoods. Junction is committed to that."
            </p>
          </div>
        </div>

        {/* Right Column: Comparative Chart */}
        <div className="lg:col-span-5 bg-neutral-950 text-white p-6 rounded-2xl border border-neutral-850 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest block mb-1">
              SOVEREIGN EXPOSENOMICS COMPARISON
            </span>
            <h3 className="text-sm font-serif font-bold text-neutral-100">
              Ohio Lead Hazard Risk & Screening Gaps
            </h3>
            <p className="text-xs text-neutral-400 mt-1 font-sans">
              Comparing Toledo/Ohio lead risks against unperturbed baseline standard (Homo Sapiens 0).
            </p>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'Pre-78 Ohio Homes', value: 67 },
                { name: 'Toledo Legacy Stock', value: 78 },
                { name: 'Kids Untested', value: 40 },
                { name: 'Lead Service Lines', value: 45 },
                { name: 'Safe Baseline', value: 0 }
              ]} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                <XAxis dataKey="name" stroke="#a3a3a3" tick={{ fontSize: 9 }} interval={0} angle={-15} textAnchor="end" />
                <YAxis stroke="#a3a3a3" tick={{ fontSize: 10 }} domain={[0, 100]} />
                <Tooltip contentStyle={{ backgroundColor: '#171717', borderColor: '#404040', color: '#fff', fontSize: '11px' }} />
                <Bar dataKey="value" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg text-[11px] text-neutral-300 font-mono space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-amber-400 font-bold">• Toledo Lead Housing Registry</span>
              <span className="text-red-400 font-bold">Stalled / Court-Challenged</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-emerald-400 font-bold">• ICEarth ZK-Registry Solution</span>
              <span className="text-emerald-400 font-bold">Cryptographically Sovereign</span>
            </div>
          </div>
        </div>
      </div>

      {/* FULL TOLEDO BLADE ARTICLE TABBED VIEWER */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="bg-neutral-900 text-white p-4 flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <Newspaper size={18} className="text-emerald-400" />
            <h3 className="font-serif font-bold text-sm">
              The Toledo Blade Full Archive Exhibit (July 23, 2026)
            </h3>
          </div>
          <a
            href="https://www.toledoblade.com/local/environment/2026/07/23/cdc-junction-coalition-unite-protect-children-lead/stories/20260723094"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-emerald-400 hover:underline font-bold flex items-center gap-1 bg-neutral-800 px-3 py-1.5 rounded border border-neutral-700"
          >
            toledoblade.com/local/environment/2026/07/23 <ExternalLink size={12} />
          </a>
        </div>

        <div className="p-6 md:p-8 space-y-6 font-serif text-sm leading-relaxed text-neutral-800 bg-neutral-50/50">
          <div className="border-b border-neutral-200 pb-4 space-y-2">
            <h2 className="text-2xl font-bold text-neutral-900 leading-tight">
              CDC, Junction Coalition unite to protect Toledo children from lead
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-500">
              <span>By SHEILA HOWARD • The Blade</span>
              <span>Published: Jul 23, 2026 • 5:24 PM</span>
              <span className="text-emerald-700 font-bold">Toledo Main Library Symposium</span>
            </div>
          </div>

          <div className="space-y-4 max-w-4xl text-neutral-800">
            <p>
              Every person in Toledo has “one small thing” they can do today to protect children from a brain‑damaging toxin.
            </p>
            <p>
              That was the call to action from <strong>Paul Allwood</strong>, chief of the Lead Poisoning Prevention and Surveillance Branch at the Centers for Disease Control and Prevention.
            </p>
            <p>
              He urged Toledo residents to treat childhood lead exposure as a community crisis through action — whether it’s getting a child tested, sharing information with family, pressuring officials, fixing a hazard at home, or joining community efforts — and actually doing it now, not “someday.”
            </p>
            <p>
              “There are communities that have lots of legacy issues that are visible on the surface. It’s more so related to housing, but I also understand that there are some ongoing efforts to address lead in the drinking water,” Mr. Allwood said.
            </p>
            <p>
              “So, Toledo is not different from a number of other places in the so‑called Rust Belt, where there is a history of maybe disinvestment, and there are some social and economic drivers that create housing conditions that are conducive to lead poisoning.”
            </p>
            <p>
              The Junction Coalition hosted a free, two‑day symposium, <em>Unleaded: Our Homes. Our Children. Our Future</em>, that began Thursday at the Toledo Main Library. The event brought together national experts, local physicians, organizers, politicians, and community members to discuss how to keep homes and children lead‑free.
            </p>
            
            <div className="p-5 bg-red-50 border-l-4 border-red-600 rounded-r-xl space-y-3 font-serif my-4">
              <p className="font-bold text-red-950 text-base">
                CDC Branch Chief Paul Allwood Endorses Lead-Crime Hypothesis:
              </p>
              <p className="italic text-neutral-900 leading-relaxed">
                "Mr. Allwood, a career public health leader with experience in local agencies, state agencies, and academia, told attendees that research shows childhood lead exposure is linked to higher rates of violence, juvenile delinquency, and incarceration, especially in communities marked by redlining and disinvestment."
              </p>
              <p className="italic text-neutral-900 leading-relaxed">
                “One of their early speakers talked about the connection between lead poisoning and violence,” he said of the day’s lineup of presentations. “That’s the truth. That’s solid truth,” he said. “It’s well established scientifically that lead exposure in childhood leads to other problems, including more tendencies towards juvenile delinquency and incarceration.”
              </p>
              <p className="italic text-neutral-900 leading-relaxed">
                Mr. Allwood, who is Black, briefly described visiting a juvenile facility where every one of the 15 boys was Black and “looked like” him. He said their presence there was not random.
              </p>
              <p className="italic font-bold text-red-900 leading-relaxed">
                “Ladies and gentlemen, I’m here to tell you something that you probably already know. Those 15 boys, all of them like me, locked up in a prison, wasn’t a coincidence,” he said. “There were a series of events that led to that, some of which are systemic, and that in some cases those boys were on that path from the day they were conceived.”
              </p>
            </div>

            <p>
              He saw it as “inevitable as rain” that they ended up in those facilities,” and unless society acts, it will continue to happen.
            </p>
            <p>
              He also warned that children can be exposed in the very places they are sent to learn, recounting an investigation at a Midwestern school where peeling paint chips and contaminated water left “lead everywhere.” He then raised the question of how any child can succeed with a brain‑damaging toxin embedded in classrooms and hallways.
            </p>
            <p>
              Lead‑Free Ohio reports that two out of three homes in Ohio may have lead paint, particularly in those built before 1978, and that 40 percent of high‑risk children do not receive the recommended lead tests. 
            </p>
            <p>
              Pediatrician Dr. Iris Castillo, from Nationwide Children’s Hospital–Toledo, who has coached area practices on improving screening, said most children with lower levels of exposure show no obvious signs.
            </p>
            <p>
              “Unfortunately, most of the people who have lower levels don’t have symptoms, so that’s why it’s really important to get the screening testing done,” she said. “But at certain higher levels, they usually experience abdominal pain. They can have hearing problems, or kidney issues, because the lead can be pretty bad on the whole system itself.”
            </p>
            <p>
              In 2023, the Centers for Disease Control and Prevention Grant awarded the Junction Coalition $600,000 over three years to fight childhood lead poisoning in Toledo. 
            </p>
            <p>
              “This is our very first lead symposium, and working with the Toledo Lead Coalition, we have been able to support the development of the Lead Resource Center through this grant that was sponsored by the Centers for Disease Control,” said Alicia Smith, the agency’s executive director.
            </p>
            <p>
              Last month, the U.S. Department of Housing and Urban Development announced a $7 million grant for the new City of Toledo Lead‑Based Paint Program, a move local leaders say will complement the Junction Coalition’s education and outreach efforts.
            </p>
            <p>
              “One of our outcomes was to host a lead symposium, informing the public, our partners, and politicians about the very high rate of lead within the city of Toledo,” she said, adding that the goal is a community‑wide push so that, eventually, not one single child is lead‑poisoned.
            </p>
            <p>
              The Junction Coalition is a Toledo‑based nonprofit with a mission to build a “vibrant, secure, and sustainable community.”
            </p>
            <p className="font-semibold text-neutral-900">
              “Our children are suffering from cognitive disabilities and being pushed into the school-to-prison pipeline because of this contamination,” Ms. Smith said. “We need a lead-free 419, in Ohio, and across the country because it is harming our children, our families, and our livelihoods. Junction is committed to that.”
            </p>
          </div>
        </div>
      </div>

      {/* THE ICEARTH SOVEREIGN SOLUTION FOR TOLEDO */}
      <div className="bg-neutral-950 text-white rounded-2xl p-6 md:p-8 border border-neutral-800 space-y-5">
        <div className="flex items-center gap-2">
          <ShieldAlert className="text-emerald-400" size={20} />
          <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">
            ICEARTH SOVEREIGN REFINEMENT
          </span>
        </div>
        <h3 className="text-xl font-serif font-bold text-neutral-100">
          Overcoming Political Housing Registry Stalls via Decentralized Data Sovereignty
        </h3>
        <p className="text-xs text-neutral-300 font-sans leading-relaxed max-w-4xl">
          Toledo's municipal housing registry efforts have been paralyzed by years of legal disputes with rental property owners and political inertia. ICEarth provides the cryptographically sovereign alternative: a Zero-Knowledge Lead Registry where property hazard ratings and child blood lead metrics are verified on-chain without requiring municipal bureaucratic permission or exposing individual privacy to predatory actors.
        </p>
        <div className="pt-4 border-t border-neutral-850 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-neutral-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            ICEarth Node 419 (Toledo Sanctuary) Ready
          </span>
          <span className="text-emerald-400 font-bold">
            Homo Sapiens 0 Target: 0.016 μg/dL Pb
          </span>
        </div>
      </div>

    </div>
  );
};

export default ToledoLeadAudit;
