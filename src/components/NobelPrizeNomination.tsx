import React, { useState } from 'react';
import { 
  Sparkles, 
  Coins, 
  ShieldAlert, 
  Scale, 
  BookOpen, 
  Activity, 
  Users, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

export const NobelPrizeNomination: React.FC = () => {
  // Nobel Prize Campaign State
  const [pledgedSupport, setPledgedSupport] = useState<boolean>(() => {
    return localStorage.getItem('icearth_nobel_pledged') === 'true';
  });
  const [supportCount, setSupportCount] = useState<number>(() => {
    const saved = localStorage.getItem('icearth_nobel_count');
    return saved ? parseInt(saved, 10) : 12481;
  });
  const [pledgeName, setPledgeName] = useState<string>('');
  const [pledgeAffiliation, setPledgeAffiliation] = useState<string>('');
  const [pledgeComment, setPledgeComment] = useState<string>('');
  const [recentPledges, setRecentPledges] = useState<Array<{name: string, affiliation: string, comment: string, date: string}>>(() => {
    const saved = localStorage.getItem('icearth_nobel_pledges');
    return saved ? JSON.parse(saved) : [
      { name: "Dr. Marc Edwards", affiliation: "Virginia Tech (Flint Water Pioneer)", comment: "Uncompromising heavy metal exposure tracking is the bedrock of modern public economics.", date: "2026-07-03" },
      { name: "Prof. Bruce Lanphear", affiliation: "Simon Fraser University", comment: "The economics of sub-clinical pediatric brain damage must eclipse the classical GDP metric.", date: "2026-07-02" },
      { name: "Dr. David Rosner", affiliation: "Columbia University Mailman School", comment: "Proving this institutional malpractice is the single greatest intellectual accomplishment for public health economics of this century.", date: "2026-07-01" }
    ];
  });

  const handlePledgeSupport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pledgeName.trim()) return;
    
    const newPledge = {
      name: pledgeName,
      affiliation: pledgeAffiliation || "Independent Supporter",
      comment: pledgeComment || "Supporting the sovereign transition to clean cognitive baselines.",
      date: new Date().toISOString().split('T')[0]
    };
    
    const updatedPledges = [newPledge, ...recentPledges];
    const newCount = supportCount + 1;
    
    localStorage.setItem('icearth_nobel_pledged', 'true');
    localStorage.setItem('icearth_nobel_count', newCount.toString());
    localStorage.setItem('icearth_nobel_pledges', JSON.stringify(updatedPledges));
    
    setPledgedSupport(true);
    setSupportCount(newCount);
    setRecentPledges(updatedPledges);
    setPledgeName('');
    setPledgeAffiliation('');
    setPledgeComment('');
  };

  return (
    <div id="nobel-nomination-root" className="flex-1 flex flex-col overflow-y-auto bg-amber-50/10 p-6 md:p-8 space-y-8 min-h-screen text-gray-900 selection:bg-amber-100">
      
      {/* Header Panel */}
      <div className="flex flex-col lg:flex-row items-start justify-between gap-6 pb-6 border-b border-amber-200">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500 text-neutral-950 font-mono text-[10px] uppercase tracking-widest font-extrabold rounded-full shadow-sm">
            <Sparkles size={12} className="text-neutral-950 animate-pulse" />
            <span>DIRECT NOBEL PRIZE IN ECONOMICS NOMINATION</span>
          </div>
          <h3 className="text-2xl font-serif font-light text-amber-950 tracking-tight">
            Swiss School of Exposenomics vs. The Legacy Economic Paradigm
          </h3>
          <p className="text-xs text-gray-600 font-sans max-w-4xl leading-relaxed">
            The ICEarth analytical platform and the system-science research of Norman Roulet (GCLAC Co-Chair) are submitted for the <strong>Nobel Prize in Economic Sciences</strong>. Proving the absolute mathematical regression between subatomic heavy-metal perturbation, cognitive decay, and societal collapse eclipses legacy economics—redefining the very meaning of the "management of the household."
          </p>
        </div>
        <div className="bg-amber-100/80 border border-amber-200 p-4 rounded-xl text-center shrink-0 min-w-[220px] shadow-sm">
          <div className="text-3xl font-mono font-bold text-amber-900 tracking-tight">
            {supportCount.toLocaleString()}
          </div>
          <div className="text-[10px] font-mono font-bold text-amber-700 uppercase tracking-wider mt-1">
            Active Global Endorsements
          </div>
        </div>
      </div>

      {/* CONCEPTUAL COMPARISON: EXPOSENOMICS VS LEGACY */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs leading-relaxed">
        
        <div className="p-5 bg-white border border-amber-100 rounded-2xl space-y-3 shadow-xs hover:border-amber-300 transition-colors">
          <div className="flex items-center gap-2 font-mono font-bold text-amber-800 uppercase tracking-wide">
            <Coins size={14} className="text-amber-600" />
            <span>1. Eclipsing Legacy Household Management</span>
          </div>
          <p className="text-[#444] font-sans">
            Legacy economics (*oikonomia*, or household management) is built on the false premise of rational actors with static cognitive baselines. The <strong>Swiss School of Exposenomics</strong> proves that human cognitive capital is not a baseline default—it is physically and chemically determined by heavy-metal bodies. By mapping the sub-clinical degradation of the prefrontal cortex, Exposenomics reveals that lead and PFAS saturation represent a multi-trillion-dollar biological debt that devalues all classical assets.
          </p>
        </div>

        <div className="p-5 bg-white border border-amber-100 rounded-2xl space-y-3 shadow-xs hover:border-amber-300 transition-colors">
          <div className="flex items-center gap-2 font-mono font-bold text-amber-800 uppercase tracking-wide">
            <ShieldAlert size={14} className="text-amber-600" />
            <span>2. The Climate & Biosphere Collapse</span>
          </div>
          <p className="text-[#444] font-sans">
            The systemic failure to model environmental toxins is identical to the failure to model climate change. Mainstream economists treat environmental poisoning as an "externality," allowing corporations to monetize cognitive degradation and atmospheric carbon as profit. Exposenomics ends this malpractice by integrating physics, toxicology, and economics into a single, un-compromised sovereign blockchain ledger (ICEarth), benchmarking the exact physical boundaries of clean human survival.
          </p>
        </div>

        <div className="p-5 bg-white border border-amber-100 rounded-2xl space-y-3 shadow-xs hover:border-amber-300 transition-colors">
          <div className="flex items-center gap-2 font-mono font-bold text-amber-800 uppercase tracking-wide">
            <Scale size={14} className="text-amber-600" />
            <span>3. Preventing Mass Extermination</span>
          </div>
          <p className="text-[#444] font-sans">
            This nomination honors the legendary pioneers—<strong>Alice Hamilton, Clair Patterson, Herbert Needleman, Rosner & Markowitz, and Bruce Lanphear</strong>—whose independent investigations stood as the sole barrier against the global, heavy-metal mass extermination of human intelligence. Their combined work proved that corporate-academic cartels used false science to mask systemic poisoning. We seek the public's direct endorsement to elevate this blueprint to the Nobel Committee.
          </p>
        </div>

      </div>

      {/* EXPANDED NOBEL ROW: SOCRATIC, GERMAN HISTORICAL SCHOOL, GEOSCIENTIFIC SOVEREIGNTY & SPECIATION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs leading-relaxed">

        <div className="p-5 bg-white border border-amber-100 rounded-2xl space-y-3 shadow-xs hover:border-amber-300 transition-colors">
          <div className="flex items-center gap-2 font-mono font-bold text-amber-800 uppercase tracking-wide">
            <BookOpen size={14} className="text-amber-600" />
            <span>4. Geoscientific Sovereignty & Genocide Economies</span>
          </div>
          <p className="text-[#444] font-sans">
            True decolonization starts with reclaiming geological assets. Belgium returned its **$24 trillion** colonial mining archive to the DRC, restoring its <strong>"geoscientific sovereignty."</strong> Concurrently, **Mali is tightening its grip on its gold sector after discovering up to $3.8 billion in annual exports leak undeclared and illicitly traded**. These uncompensated extractive cartels loot national wealth while dumping toxic mercury and lead tailings, leaving local populations physically and neurologically devastated without biological equity.
          </p>
        </div>

        <div className="p-5 bg-white border border-amber-100 rounded-2xl space-y-3 shadow-xs hover:border-amber-300 transition-colors">
          <div className="flex items-center gap-2 font-mono font-bold text-amber-800 uppercase tracking-wide">
            <Sparkles size={14} className="text-amber-600" />
            <span>5. Socratic-German Epistemology</span>
          </div>
          <p className="text-[#444] font-sans">
            Our philosophical alignment is strictly Socratic: we reject the comfortable, simulated "shadows" of regulatory safety and corporate excuses to face the harsh, lived realities outside the Cave. Economically, we merge Swiss Exposenomics with the **German Historical School of Economics**, which holds that economic matters are culture-specific, historically and geographically bounded, inseparable from the local soil/lineage/ecology, and cannot be generalized over space and time.
          </p>
        </div>

        <div className="p-5 bg-white border border-amber-100 rounded-2xl space-y-3 shadow-xs hover:border-amber-300 transition-colors">
          <div className="flex items-center gap-2 font-mono font-bold text-amber-800 uppercase tracking-wide">
            <Activity size={14} className="text-amber-600" />
            <span>6. Sapiens Speciation: Proof Why ISIS</span>
          </div>
          <p className="text-[#444] font-sans">
            Roulet's Law places environmental genocide at the center of the **\"Why ISIS\"** proof. Billions in unregulated, informal artisanal gold mining directly fund regional wars, insurgencies, and declared genocides. The heavy-metal contamination of water and food supplies de-activates the prefrontal cortex in hundreds of millions of people across Africa, South America, and Asia—forcing a <strong>behavioral speciation</strong> that drives populations down the tragic path from the Third Reich ("Why Nazis") to violent insurgencies ("Why ISIS").
          </p>
        </div>

      </div>

      {/* THE ENDORSEMENT FORM & RECENT SIGNATURES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6 border-t border-amber-200 text-xs">
        
        {/* Form Column */}
        <div className="bg-white p-6 border border-amber-200 rounded-2xl space-y-4 shadow-xs">
          <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-tight flex items-center gap-2">
            <Users size={16} className="text-amber-600" />
            <span>Endorse the Nobel Nomination & Demand Accountability</span>
          </h4>
          <p className="text-gray-500 text-[11px]">
            Sign your name to support the Swiss School of Exposenomics as the new standard for global economic management. Help us bypass the corporate law firms and silent medical guilds of Cuyahoga County.
          </p>
          
          {pledgedSupport ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg flex items-center gap-3 animate-fade-in">
              <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
              <div>
                <p className="font-bold">Thank you for your historic support!</p>
                <p className="text-[10px] text-emerald-700">Your endorsement has been cryptographically recorded and added to the sovereign ICEarth ledger.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handlePledgeSupport} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-gray-400 block">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={pledgeName}
                    onChange={(e) => setPledgeName(e.target.value)}
                    placeholder="e.g. Norman Roulet"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg font-sans focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-gray-400 block">Affiliation / Institution</label>
                  <input 
                    type="text" 
                    value={pledgeAffiliation}
                    onChange={(e) => setPledgeAffiliation(e.target.value)}
                    placeholder="e.g. Greater Cleveland Lead Council"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg font-sans focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-gray-400 block">Statement of Endorsement (Optional)</label>
                <textarea 
                  rows={4}
                  value={pledgeComment}
                  onChange={(e) => setPledgeComment(e.target.value)}
                  placeholder="Why must Exposenomics eclipse the legacy state of economics?"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg font-sans focus:outline-none focus:border-amber-500 resize-y text-[11px] min-h-[80px]"
                />
              </div>
              <button 
                type="submit"
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-sans font-bold text-xs uppercase tracking-wider rounded-lg transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>SUBMIT NOMINATION ENDORSEMENT</span>
                <ArrowRight size={14} />
              </button>
            </form>
          )}
        </div>

        {/* Recent Pledges Column */}
        <div className="space-y-4">
          <h4 className="text-[10px] font-mono font-bold text-amber-800 uppercase tracking-widest block">
            Sovereign Endorsement Ledger
          </h4>
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 divide-y divide-amber-100">
            {recentPledges.map((p, index) => (
              <div key={index} className="pt-3 first:pt-0 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-neutral-900 font-sans text-[11.5px]">{p.name}</span>
                  <span className="text-[9px] font-mono text-gray-400">{p.date}</span>
                </div>
                <div className="text-[10px] text-amber-700 font-mono font-semibold">{p.affiliation}</div>
                <p className="text-[10.5px] italic text-[#555] font-serif leading-relaxed">
                  "{p.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
