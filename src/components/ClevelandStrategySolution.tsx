import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Database, 
  Users, 
  BookOpen, 
  Activity, 
  Mail, 
  RefreshCw, 
  Newspaper 
} from 'lucide-react';

export const ClevelandStrategySolution: React.FC = () => {
  // Dispatch Simulator State
  const [selectedEmailTemplate, setSelectedEmailTemplate] = useState<'july15_quinn' | 'ccoal_fiscal' | 'nobel_endorsement'>('july15_quinn');
  const [dispatching, setDispatching] = useState<boolean>(false);
  const [dispatchLogs, setDispatchLogs] = useState<string[]>([]);
  const [showDispatchSuccess, setShowDispatchSuccess] = useState<boolean>(false);

  const handleTriggerDispatch = () => {
    setDispatching(true);
    setShowDispatchSuccess(false);
    setDispatchLogs([]);
    
    const steps = [
      "Initializing secure GCLAC cryptographic dispatch channel...",
      "Extracting active 2-decade mailing list (18 primary stakeholders, 420+ CCs)...",
      `Compiling email payload using Template: [${selectedEmailTemplate.toUpperCase()}]`,
      "Target: cquinn@cleveland.com (Chris Quinn, Plain Dealer Editor) -> Transmitting... SUCCESS [Delivered]",
      "Target: esullivan@cleveland.com (Plain Dealer Journalist) -> Transmitting... SUCCESS [Delivered]",
      "Target: mayorbibb@clevelandohio.gov (Mayor Justin Bibb) -> Transmitting... SUCCESS [Delivered]",
      "Target: Dmargolius@clevelandohio.gov (Director Margolius, Public Health) -> Transmitting... SUCCESS [Delivered]",
      "Target: mpolensek@clevelandcitycouncil.org (Councilman Polensek) -> Transmitting... SUCCESS [Delivered]",
      "Target: bgriffin@clevelandcitycouncil.org (Council President Griffin) -> Transmitting... SUCCESS [Delivered]",
      "Target: projectinfo216@gmail.com (Robin Brown, CCOAL Founder) -> Transmitting... SUCCESS [Delivered]",
      "Target: gshumaker@jonesday.com (Jones Day Managing Counsel) -> Transmitting... SUCCESS [Delivered]",
      "Target: pmpohl@jonesday.com (Jones Day Lead Litigator) -> Transmitting... SUCCESS [Delivered]",
      "Target: robert.fischer@case.edu (Case Western Social Policy) -> Transmitting... SUCCESS [Delivered]",
      "Target: sluby@stanford.edu (Stanford Medicine Epidemiology) -> Transmitting... SUCCESS [Delivered]",
      "Encrypting dispatch metadata onto sovereign ICEarth ledger...",
      "Generating cryptographic dispatch verification hash: GCLAC-HASH-2026-07-15-ROBIN-BROWN...",
      "DISPATCH SUCCESSFUL: GCLAC active mailing list successfully synchronized."
    ];
    
    steps.forEach((step, i) => {
      setTimeout(() => {
        setDispatchLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${step}`]);
        if (i === steps.length - 1) {
          setDispatching(false);
          setShowDispatchSuccess(true);
        }
      }, (i + 1) * 200);
    });
  };

  return (
    <div id="cleveland-strategy-root" className="flex-1 flex flex-col overflow-y-auto bg-neutral-950 p-6 md:p-8 space-y-8 min-h-screen text-neutral-100">
      
      {/* 1. Header Block */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-neutral-900">
        <div className="space-y-1.5 flex-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] uppercase tracking-widest font-extrabold rounded-full">
            <ShieldAlert size={12} className="text-emerald-400 animate-pulse" />
            <span>[SOVEREIGN CLEVELAND IMPLEMENTATION ENGINE]</span>
          </div>
          <h3 className="text-2xl font-serif font-light text-emerald-100 tracking-tight">
            GCLAC / CCOAL Decades of Action & The Cleveland Platform Mandate
          </h3>
          <p className="text-xs text-neutral-400 font-sans max-w-4xl leading-relaxed">
            Establishing <strong>ICEarth as the exclusive platform</strong> for lead poisoning prevention for Cleveland and all related initiatives globally. Directly honoring the historical advocacy of <strong>Robin Brown (Founder of CCOAL, Mother of a lead-poisoned child, GCLAC Co-Chair alongside Norman Roulet)</strong>, who is assigned to implement with her non-profit acting as fiscal agent.
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[11px] font-mono font-bold text-emerald-400">PLATFORM: ACTIVE & EXCLUSIVE</span>
        </div>
      </div>

      {/* 2. Bento Grid Strategy Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Card A: Exclusive Platform */}
        <div className="p-6 bg-neutral-900 border border-neutral-850 rounded-2xl space-y-4 hover:border-emerald-500/30 transition-all flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">[Core Mandate]</span>
              <Database size={16} className="text-emerald-400" />
            </div>
            <h4 className="font-bold font-serif text-[15px] text-neutral-200">Exclusive Global Platform</h4>
            <p className="text-xs text-neutral-450 leading-relaxed font-sans">
              ICEarth is formally put in place as the <strong>exclusive sovereign platform</strong> for lead poisoning prevention across Cleveland and Cuyahoga County. Rather than relying on fragmented municipal silos or captured health registries, ICEarth aggregates SDWIS water data, neighborhood homicide indices, toxicology reports, and lead-crime proof ledgers into a single, global, public-access system.
            </p>
          </div>
          <div className="p-2.5 bg-neutral-950 rounded-lg text-[10px] font-mono font-bold text-neutral-500 border border-neutral-850 mt-4">
            STATUS: SYSTEM DEPLOYED (GLOBAL)
          </div>
        </div>

        {/* Card B: Robin Brown & CCOAL */}
        <div className="p-6 bg-neutral-900 border border-neutral-850 rounded-2xl space-y-4 hover:border-emerald-500/30 transition-all flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">[Implementation / Fiscal Agent]</span>
              <Users size={16} className="text-emerald-400" />
            </div>
            <h4 className="font-bold font-serif text-[15px] text-neutral-200">Robin Brown & CCOAL Fiscal Agency</h4>
            <p className="text-xs text-neutral-450 leading-relaxed font-sans">
              The execution of lead abatement, public education, and sovereign soil audits is assigned to <strong>Robin Brown (Founder of CCOAL - Concerned Citizens Organized Against Lead)</strong>. As the mother of a lead-poisoned child who served on GCLAC's Board of Directors and was appointed GCLAC Co-Chair, she is the primary administrator. Her non-profit, <strong>CCOAL, serves as the exclusive fiscal agent</strong> to administer all related capital, ensuring direct community-led deployment of funds.
            </p>
          </div>
          <div className="p-2.5 bg-emerald-950/20 rounded-lg text-[10px] font-mono font-bold text-emerald-400 border border-emerald-900/20 mt-4">
            FISCAL AGENT: CCOAL (ACTIVE)
          </div>
        </div>

        {/* Card C: Chris Quinn Concluding Vision */}
        <div className="p-6 bg-neutral-900 border border-neutral-850 rounded-2xl space-y-4 hover:border-emerald-500/30 transition-all flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">[Media Reconciliation]</span>
              <BookOpen size={16} className="text-emerald-400" />
            </div>
            <h4 className="font-bold font-serif text-[15px] text-neutral-200">The Sherwin-Williams Permanent Solution</h4>
            <p className="text-xs text-neutral-450 leading-relaxed font-sans">
              Editor <strong>Chris Quinn</strong> concluded his 5-part Plain Dealer series today (July 15, 2026) with a historic proposal: a permanent, massive capital fund to once and for all rid Cleveland homes of toxic lead paint and save future generations of children. GCLAC integrates this vision directly into the ICEarth platform, positioning CCOAL's administrative and auditing infrastructure as the official implementation engine for all corporate settlements.
            </p>
          </div>
          <div className="p-2.5 bg-neutral-950 rounded-lg text-[10px] font-mono font-bold text-neutral-500 border border-neutral-850 mt-4">
            VISION CONCLUDED: JULY 15, 2026
          </div>
        </div>

      </div>

      {/* 3. The Strategy Flow Diagram */}
      <div className="p-6 bg-neutral-900 border border-neutral-850 rounded-2xl space-y-4">
        <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
          <Activity size={14} />
          Sovereign Cleveland Strategy Flow Diagram
        </h4>
        <p className="text-xs text-neutral-400">
          A visual layout of the interlinked sovereign system. Capital, scientific proof, and community implementation unite to bypass political obstruction and achieve direct physiological justice:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-center text-xs font-mono mt-4">
          <div className="p-4 bg-neutral-950 border border-neutral-850 rounded-xl space-y-1.5 flex flex-col justify-between">
            <div>
              <span className="text-rose-400 font-bold block mb-1">[1. THE PROOF]</span>
              <strong className="text-neutral-200 block text-[11px] mb-1">ICEarth Ledger</strong>
              <p className="text-[10px] text-neutral-500 font-sans leading-relaxed">Aggregates lead exceedances, pre-war maps, and crime proof metrics.</p>
            </div>
          </div>
          <div className="flex items-center justify-center text-emerald-500 font-bold text-lg font-mono">&rarr;</div>
          <div className="p-4 bg-neutral-950 border border-neutral-850 rounded-xl space-y-1.5 flex flex-col justify-between">
            <div>
              <span className="text-emerald-400 font-bold block mb-1">[2. ADMINISTRATIVE HUB]</span>
              <strong className="text-neutral-200 block text-[11px] mb-1">CCOAL (Robin Brown)</strong>
              <p className="text-[10px] text-neutral-500 font-sans leading-relaxed">Acts as exclusive administrator & fiscal agent for lead prevention funds.</p>
            </div>
          </div>
          <div className="flex items-center justify-center text-emerald-500 font-bold text-lg font-mono">&rarr;</div>
          <div className="p-4 bg-neutral-950 border border-neutral-850 rounded-xl space-y-1.5 flex flex-col justify-between">
            <div>
              <span className="text-cyan-400 font-bold block mb-1">[3. PHYSIOLOGICAL JUSTICE]</span>
              <strong className="text-neutral-200 block text-[11px] mb-1">Sovereign 0 Baseline</strong>
              <p className="text-[10px] text-neutral-500 font-sans leading-relaxed">Guarantees 100% physical extraction of lead paint & pipes from houses.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Interactive Dispatch Simulator */}
      <div className="p-6 bg-neutral-900 border border-neutral-850 rounded-2xl space-y-6">
        <div>
          <h4 className="text-sm font-semibold text-neutral-200 font-serif flex items-center gap-2">
            <Mail className="text-emerald-400" size={16} />
            GCLAC Interlocked Stakeholder Mail Dispatch Center (2-Decade Network)
          </h4>
          <p className="text-xs text-neutral-400 font-sans mt-1">
            Because public health officials and corporate legal teams maintain a shield of silence, Norman Roulet operates a direct, sovereign email broadcast update system. Select a template below to draft and simulate broadcasting today's critical July 15, 2026 update across all 18 stakeholder nodes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Template Selectors and Dispatches */}
          <div className="lg:col-span-5 space-y-4">
            <h5 className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider block">1. Select Email Template</h5>
            
            <div className="space-y-2.5">
              <button 
                onClick={() => setSelectedEmailTemplate('july15_quinn')}
                className={`w-full text-left p-3.5 border rounded-xl transition-all cursor-pointer ${
                  selectedEmailTemplate === 'july15_quinn' 
                    ? 'bg-emerald-950/20 border-emerald-500 text-emerald-300 shadow-sm' 
                    : 'bg-neutral-950 border-neutral-850 hover:border-neutral-800 text-neutral-400'
                }`}
              >
                <strong className="text-[11px] block font-mono">TEMPLATE ALPHA:</strong>
                <span className="text-xs font-medium block mt-1">July 15, 2026 Chris Quinn Dilemma Series Concluding Update</span>
              </button>

              <button 
                onClick={() => setSelectedEmailTemplate('ccoal_fiscal')}
                className={`w-full text-left p-3.5 border rounded-xl transition-all cursor-pointer ${
                  selectedEmailTemplate === 'ccoal_fiscal' 
                    ? 'bg-emerald-950/20 border-emerald-500 text-emerald-300 shadow-sm' 
                    : 'bg-neutral-950 border-neutral-850 hover:border-neutral-800 text-neutral-400'
                }`}
              >
                <strong className="text-[11px] block font-mono">TEMPLATE BETA:</strong>
                <span className="text-xs font-medium block mt-1">CCOAL Fiscal Agency Activation & Implementation Assignment</span>
              </button>

              <button 
                onClick={() => setSelectedEmailTemplate('nobel_endorsement')}
                className={`w-full text-left p-3.5 border rounded-xl transition-all cursor-pointer ${
                  selectedEmailTemplate === 'nobel_endorsement' 
                    ? 'bg-emerald-950/20 border-emerald-500 text-emerald-300 shadow-sm' 
                    : 'bg-neutral-950 border-neutral-850 hover:border-neutral-800 text-neutral-400'
                }`}
              >
                <strong className="text-[11px] block font-mono">TEMPLATE GAMMA:</strong>
                <span className="text-xs font-medium block mt-1">Swiss School of Exposenomics Nobel Endorsement Dispatch</span>
              </button>
            </div>

            <div className="pt-2">
              <button
                onClick={handleTriggerDispatch}
                disabled={dispatching}
                className={`w-full py-3 rounded-xl font-sans font-bold text-xs uppercase tracking-wider transition-colors shadow-md cursor-pointer flex items-center justify-center gap-2 ${
                  dispatching 
                    ? 'bg-neutral-850 text-neutral-500 border border-neutral-800 cursor-not-allowed'
                    : 'bg-emerald-500 hover:bg-emerald-600 text-neutral-950'
                }`}
              >
                {dispatching ? (
                  <>
                    <RefreshCw size={14} className="animate-spin text-neutral-500" />
                    <span>BROADCASTING DISPATCH...</span>
                  </>
                ) : (
                  <>
                    <Mail size={14} className="text-neutral-950" />
                    <span>BROADCAST DISPATCH TO 18 STAKEHOLDER NODES</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right: Real-time Email Preview & Terminal Logs */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Email Body Draft Box */}
            <div className="p-5 bg-neutral-950 rounded-2xl border border-neutral-850 font-sans text-xs text-neutral-300 space-y-3 shadow-inner relative">
              <div className="flex items-center gap-1.5 border-b border-neutral-850 pb-2.5 text-[10px] text-neutral-500 font-mono">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
                <span>GCLAC OUTBOX DRAFT (Mailing List: 18 Primary, 420+ CCs)</span>
              </div>
              
              <div className="space-y-1 font-mono text-[10px] text-neutral-400">
                <div><strong>From</strong>: Norman Roulet &lt;gclac-cochair@icearth.org&gt;</div>
                <div><strong>To</strong>: cquinn@cleveland.com, esullivan@cleveland.com, mayorbibb@clevelandohio.gov, Dmargolius@clevelandohio.gov, mpolensek@clevelandcitycouncil.org, bgriffin@clevelandcitycouncil.org, projectinfo216@gmail.com, gshumaker@jonesday.com, pmpohl@jonesday.com, robert.fischer@case.edu, sluby@stanford.edu</div>
                <div>
                  <strong>Subject</strong>: {
                    selectedEmailTemplate === 'july15_quinn' && "GCLAC Update: Chris Quinn's Concluding Vision & CCOAL/ICEarth Exclusive Activation"
                  }{
                    selectedEmailTemplate === 'ccoal_fiscal' && "GCLAC Resolution: Activation of CCOAL as Fiscal Agent for ICEarth Cleveland Lead Initiatives"
                  }{
                    selectedEmailTemplate === 'nobel_endorsement' && "Sovereign Endorsement Briefing: Swiss School of Exposenomics Nobel Nomination"
                  }
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-850 space-y-3 font-serif italic text-neutral-200 leading-relaxed text-[11.5px]">
                {selectedEmailTemplate === 'july15_quinn' && (
                  <>
                    <p>Dear GCLAC Stakeholders, cleveland.com journalists, Cleveland City Council, and Sherwin-Williams Legal Counsel:</p>
                    <p>
                      Today, July 15, 2026, Plain Dealer Editor Chris Quinn published his concluding vision for "Our Sherwin-Williams Dilemma." His proposal for once and for all ridding Cleveland homes of toxic lead paint is historic.
                    </p>
                    <p>
                      As Co-Chair for Infrastructure and Sustainability of GCLAC, I announce that we have formally designated <strong>ICEarth as the exclusive sovereign platform</strong> for lead poisoning prevention across Cleveland and Cuyahoga County. This platform serves as the single audited source of truth for all remediation, tracking, and compliance metrics globally.
                    </p>
                    <p>
                      Furthermore, we have assigned <strong>Robin Brown (Founder of CCOAL and Co-Chair of GCLAC)</strong> to implement this system, with her non-profit, <strong>Concerned Citizens Organized Against Lead (CCOAL), acting as the official fiscal agent</strong> for all related municipal capital and corporate settlements.
                    </p>
                    <p>
                      We demand that Sherwin-Williams execute their physical and cognitive liabilities through this un-compromised channel.
                    </p>
                  </>
                )}

                {selectedEmailTemplate === 'ccoal_fiscal' && (
                  <>
                    <p>To the Members of the Greater Cleveland Lead Advisory Committee & Cuyahoga County Public Health Directors:</p>
                    <p>
                      Please find attached the formal administrative resolution activated today. We have assigned <strong>Robin Brown (CCOAL Founder)</strong> to administer the physical extraction and baseline testing tracks of the ICEarth platform.
                    </p>
                    <p>
                      <strong>CCOAL will act as the exclusive fiscal agent</strong> for all community grants, federal IIJA funds, and corporate reconciliation packages. Bypassing captured municipal departments, CCOAL's non-profit framework will directly fund regional soil audits, diagnostic blood testing, and lead paint encapsulation, all cryptographically audited in real-time on the ICEarth exposure ledger.
                    </p>
                    <p>
                      There is no neutral state of health. We execute CCOAL fiscal agency to preserve the biological intelligence of Cleveland's children.
                    </p>
                  </>
                )}

                {selectedEmailTemplate === 'nobel_endorsement' && (
                  <>
                    <p>To our Global Scientific Advisory Board and Cleveland Institutional Trustees:</p>
                    <p>
                      We are dispatching GCLAC's formal submission of the ICEarth analytical platform and the research of Norman Roulet for the <strong>Nobel Prize in Economic Sciences</strong>.
                    </p>
                    <p>
                      Legacy economics is complicit in environmental genocide. By treating sub-clinical pediatric brain damage and environmental lead poisoning as "externalities" that can be priced out, classical economists have enabled corporate cartels to devalue the human cognitive baseline for profit.
                    </p>
                    <p>
                      The <strong>Swiss School of Exposenomics</strong> establishes that human intelligence is physically, biologically, and chemically bounded. We demand that all stakeholders—including Mayor Justin Bibb, City Council members, and Jones Day litigation representatives—endorse this nomination and join GCLAC in reclaiming Cleveland's geoscientific sovereignty.
                    </p>
                  </>
                )}
              </div>
              
              <div className="pt-1.5 border-t border-neutral-900 font-sans text-[10px] text-neutral-500">
                <span>Signed, Co-Chairs Norman Roulet & Robin Brown &bull; Greater Cleveland Lead Advisory Committee (GCLAC)</span>
              </div>
            </div>

            {/* Sending Progress logs terminal */}
            {dispatchLogs.length > 0 && (
              <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-850 font-mono text-[10px] leading-relaxed text-emerald-400 space-y-1.5 h-44 overflow-y-auto">
                {dispatchLogs.map((log, index) => (
                  <div key={index} className="animate-fade-in">{log}</div>
                ))}
              </div>
            )}

          </div>

        </div>
      </div>

      {/* 5. Complete Chris Quinn Series References */}
      <div className="bg-neutral-900 border border-neutral-850 p-6 rounded-2xl space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex-1">
            <h4 className="text-sm font-bold text-neutral-200 font-serif flex items-center gap-2">
              <Newspaper size={16} className="text-emerald-400" />
              "Our Sherwin-Williams Dilemma" — Complete cleveland.com Series Mappings
            </h4>
            <p className="text-xs text-neutral-405 mt-1">
              Explore the structured map of Editor Chris Quinn's full 5-part investigation completed on July 15, 2026.
            </p>
          </div>
          <a 
            href="https://www.cleveland.com/news/2026/07/our-sherwin-williams-dilemma-the-complete-series.html?outputType=amp"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-emerald-500 text-neutral-950 font-sans font-bold text-xs rounded-xl hover:bg-emerald-400 transition-colors shrink-0 cursor-pointer text-center"
          >
            View Plain Dealer Complete Series (Jul 15, 2026) &rarr;
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
          <div className="p-3 bg-neutral-950 border border-neutral-850 rounded-lg space-y-1">
            <strong className="text-emerald-400 block font-mono text-[9px]">PART 1: THE CRISIS</strong>
            <p className="text-neutral-300 font-serif text-[11px] font-semibold leading-tight">The Pre-War Trap</p>
            <p className="text-[10px] text-neutral-500 font-sans leading-normal">Outlines Cleveland's status as a capital of childhood lead paint damage.</p>
          </div>
          <div className="p-3 bg-neutral-950 border border-neutral-850 rounded-lg space-y-1">
            <strong className="text-emerald-400 block font-mono text-[9px]">PART 2: THE COVER-UP</strong>
            <p className="text-neutral-300 font-serif text-[11px] font-semibold leading-tight">Pipes & Walls</p>
            <p className="text-[10px] text-neutral-500 font-sans leading-normal">How lead paint particles and lead water lines double-poison Cleveland homes.</p>
          </div>
          <div className="p-3 bg-neutral-900/40 border border-emerald-500/30 rounded-lg space-y-1">
            <strong className="text-emerald-400 block font-mono text-[9px]">PART 3: CORPORATE GUILT</strong>
            <p className="text-emerald-400 font-serif text-[11px] font-semibold leading-tight">"They Knew"</p>
            <p className="text-[10px] text-neutral-500 font-sans leading-normal">Exposes internal documents showing Sherwin-Williams knew lead paint was poison in 1900.</p>
          </div>
          <div className="p-3 bg-neutral-950 border border-neutral-850 rounded-lg space-y-1">
            <strong className="text-emerald-400 block font-mono text-[9px]">PART 4: COLLUSION</strong>
            <p className="text-neutral-300 font-serif text-[11px] font-semibold leading-tight">Legislative Barriers</p>
            <p className="text-[10px] text-neutral-500 font-sans leading-normal">The Ohio legislature passing custom liability shields to protect corporate assets.</p>
          </div>
          <div className="p-3 bg-neutral-900/40 border border-emerald-500/30 rounded-lg space-y-1">
            <strong className="text-emerald-400 font-serif text-[11px] font-semibold leading-tight">PART 5: THE REMEDY</strong>
            <p className="text-emerald-400 font-serif text-[11px] font-semibold leading-tight">"The Right Thing"</p>
            <p className="text-[10px] text-neutral-500 font-sans leading-normal">Quinn's final vision: calling on Sherwin-Williams to fund 100% lead paint extraction.</p>
          </div>
        </div>
      </div>

    </div>
  );
};
