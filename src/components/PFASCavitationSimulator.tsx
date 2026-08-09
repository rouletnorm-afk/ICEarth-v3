import React, { useState } from 'react';
import { Activity, Sliders, Sparkles, Shield, Droplet, Flame, BarChart3, TrendingUp, ExternalLink, Award, UserCheck, X, Milestone } from 'lucide-react';
import nanoSpire20YearsImg from '../assets/images/NanoSpire20Years.jpg';
import nanoSpireRoadmapImg from '../assets/images/NanoSpireRoadmap.jpg';

interface PFASCavitationSimulatorProps {
  pfasSimState: {
    cavitationFrequency: number;
    pressureAmplitude: number;
    processingVolume: number;
    nmLaboratoriesCooperation: number;
  };
  setPfasSimState: React.Dispatch<React.SetStateAction<{
    cavitationFrequency: number;
    pressureAmplitude: number;
    processingVolume: number;
    nmLaboratoriesCooperation: number;
  }>>;
  pfasOutputs: {
    destructionRate: number;
    energyEfficiency: number;
    fluorineMineralization: number;
    remediationRoi: number;
  };
}

export const PFASCavitationSimulator: React.FC<PFASCavitationSimulatorProps> = ({
  pfasSimState,
  setPfasSimState,
  pfasOutputs,
}) => {
  const [activeModalImg, setActiveModalImg] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState<string>('');

  const openImageModal = (imgSrc: string, title: string) => {
    setActiveModalImg(imgSrc);
    setModalTitle(title);
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row overflow-y-auto relative">
      
      {/* CONTROLS SIDEBAR - PFAS TRACK */}
      <div className="w-full md:w-96 border-r border-[#E5E5E5] bg-white p-6 space-y-8 shrink-0">
        <div>
          <h2 className="text-xs font-mono text-cyan-600 mb-1 uppercase tracking-widest">[NANOSPIRE_QUANTUM_REMEDIATOR]</h2>
          <h3 className="text-xl font-serif font-light text-neutral-800">Quantum Cavitation Sim</h3>
          <p className="text-xs text-[#666] mt-2 font-sans leading-relaxed">
            Adjust NanoSpire's patented acoustic and hydrodynamic parameters below. Instantly simulate bubble-collapse thermodynamics, Carbon-Fluorine (C-F) mineralization rates, and regional New Mexico economic development ROI.
          </p>
        </div>

        {/* SLIDER 1: CAVITATION FREQUENCY */}
        <div className="space-y-2.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-[#1A1A1A] flex items-center gap-1.5 font-sans">
              ⚡ Ultrasonic Frequency
            </span>
            <span className="font-mono text-[11px] font-bold px-2 py-0.5 bg-cyan-50 text-cyan-600 rounded">
              {pfasSimState.cavitationFrequency} kHz
            </span>
          </div>
          <input
            type="range"
            min="15"
            max="60"
            step="1"
            value={pfasSimState.cavitationFrequency}
            onChange={(e) => setPfasSimState(prev => ({ ...prev, cavitationFrequency: Number(e.target.value) }))}
            className="w-full accent-cyan-600 h-1.5 bg-gray-100 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[9px] text-[#888] font-mono">
            <span>15 kHz (Coarse)</span>
            <span>28 kHz (Optimum)</span>
            <span>60 kHz (Fine Shear)</span>
          </div>
        </div>

        {/* SLIDER 2: PRESSURE AMPLITUDE */}
        <div className="space-y-2.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-[#1A1A1A] flex items-center gap-1.5 font-sans">
              🔥 Acoustic Pressure (bubble collapse)
            </span>
            <span className="font-mono text-[11px] font-bold px-2 py-0.5 bg-blue-50 text-blue-600 rounded">
              {pfasSimState.pressureAmplitude} GPa
            </span>
          </div>
          <input
            type="range"
            min="1.0"
            max="10.0"
            step="0.1"
            value={pfasSimState.pressureAmplitude}
            onChange={(e) => setPfasSimState(prev => ({ ...prev, pressureAmplitude: Number(e.target.value) }))}
            className="w-full accent-blue-600 h-1.5 bg-gray-100 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[9px] text-[#888] font-mono">
            <span>1.0 GPa (Low Shear)</span>
            <span>4.5 GPa (C-F Dissociation)</span>
            <span>10.0 GPa (Solar Core)</span>
          </div>
        </div>

        {/* SLIDER 3: PROCESSING VOLUME */}
        <div className="space-y-2.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-[#1A1A1A] flex items-center gap-1.5 font-sans">
              💧 Aquifer Flow Processing Volume
            </span>
            <span className="font-mono text-[11px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded">
              {pfasSimState.processingVolume} k gal/hr
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="500"
            step="10"
            value={pfasSimState.processingVolume}
            onChange={(e) => setPfasSimState(prev => ({ ...prev, processingVolume: Number(e.target.value) }))}
            className="w-full accent-emerald-600 h-1.5 bg-gray-100 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[9px] text-[#888] font-mono">
            <span>10 k gal (Pilot Site)</span>
            <span>250 k gal (Town Supply)</span>
            <span>500 k gal (Max Aquifer)</span>
          </div>
        </div>

        {/* SLIDER 4: COOPERATION PERCENTAGE */}
        <div className="space-y-2.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-[#1A1A1A] flex items-center gap-1.5 font-sans">
              🤝 LANL & State Cooperation
            </span>
            <span className="font-mono text-[11px] font-bold px-2 py-0.5 bg-amber-50 text-amber-600 rounded">
              {pfasSimState.nmLaboratoriesCooperation}%
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            step="5"
            value={pfasSimState.nmLaboratoriesCooperation}
            onChange={(e) => setPfasSimState(prev => ({ ...prev, nmLaboratoriesCooperation: Number(e.target.value) }))}
            className="w-full accent-amber-600 h-1.5 bg-gray-100 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[9px] text-[#888] font-mono">
            <span>10% Gridlock</span>
            <span>50% Joint Research</span>
            <span>100% Los Alamos Integration</span>
          </div>
        </div>

        {/* FORMULA RECAP */}
        <div className="p-4 bg-[#FAFAFA] border border-[#E5E5E5] rounded-xl space-y-2">
          <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400">Cavitation Energy Dissociation</h4>
          <div className="text-sm font-mono text-center font-bold text-cyan-800">
            E_cav = T_core ({Math.round(pfasSimState.pressureAmplitude * 2200)}K) → C-F Cleavage
          </div>
          <p className="text-[10px] text-gray-500 text-center leading-relaxed font-sans">
            At {pfasSimState.cavitationFrequency} kHz, ultrasonic high-shear fields force total mineralization of PFAS, releasing harmless, inert fluoride salts.
          </p>
        </div>
      </div>

      {/* SIMULATION VISUALIZATIONS - PFAS TRACK */}
      <div className="flex-1 p-8 space-y-8 bg-white overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* METRIC 1 */}
          <div className="p-5 border border-[#E5E5E5] bg-white rounded-xl shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-[#999] uppercase tracking-wider block">PFAS Destruction Rate</span>
              <span className="text-2xl font-serif font-light text-black block mt-2">{pfasOutputs.destructionRate}%</span>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[10px] text-gray-400">Molecular Mineralization</span>
              <span className={`text-[10px] font-mono font-medium ${pfasOutputs.destructionRate < 95 ? 'text-red-500 animate-pulse' : 'text-emerald-500'}`}>
                {pfasOutputs.destructionRate < 95 ? 'Incomplete' : 'Optimal'}
              </span>
            </div>
          </div>

          {/* METRIC 2 */}
          <div className="p-5 border border-[#E5E5E5] bg-white rounded-xl shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-[#999] uppercase tracking-wider block">Core Bubble Collapse Temp</span>
              <span className="text-2xl font-serif font-light text-cyan-600 block mt-2">
                {Math.round(pfasSimState.pressureAmplitude * 2200).toLocaleString()} K
              </span>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[10px] text-gray-400">Sub-Microscopic Core</span>
              <span className="text-[10px] font-mono font-medium text-emerald-500">Exceeds Solar Surf.</span>
            </div>
          </div>

          {/* METRIC 3 */}
          <div className="p-5 border border-[#E5E5E5] bg-white rounded-xl shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-[#999] uppercase tracking-wider block">Fluorine Atom Trapping</span>
              <span className="text-2xl font-serif font-light text-black block mt-2">{pfasOutputs.fluorineMineralization}%</span>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[10px] text-gray-400">Neutralized Precipitate</span>
              <span className="text-[10px] font-mono font-medium text-emerald-500">Fully Stable</span>
            </div>
          </div>

          {/* METRIC 4 */}
          <div className="p-5 border border-[#E5E5E5] bg-white rounded-xl shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-[#999] uppercase tracking-wider block">Remediation ROI (NM Savings)</span>
              <span className="text-2xl font-serif font-light text-emerald-600 block mt-2">
                ${pfasOutputs.remediationRoi}M
              </span>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[10px] text-gray-400">State Economic Factor</span>
              <span className="text-[10px] font-mono font-bold text-emerald-600">Superfund Offset</span>
            </div>
          </div>

        </div>

        {/* INTERACTIVE QUANTUM BUBBLE CAVITATION CANVAS */}
        <div className="p-6 border border-[#E5E5E5] bg-[#FCFCFC] rounded-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <div>
              <h4 className="text-sm font-semibold tracking-tight uppercase flex items-center gap-2">
                <Activity size={16} className="text-cyan-500" />
                Exhibit 2: NanoSpire Acoustic Cavitation & Cleavage Visualizer
              </h4>
              <p className="text-xs text-[#666] font-sans mt-0.5">
                High-fidelity dynamic schematic showcasing the sub-microsecond acoustic bubble growth, collapse shockwave, and Carbon-Fluorine bond shearing.
              </p>
            </div>
            <div className="flex items-center gap-4 text-[11px] font-mono text-[#444]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                <span>Water Molecule</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                <span>Fluorine Atom</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-800"></span>
                <span>Carbon Core</span>
              </div>
            </div>
          </div>

          <div className="relative w-full h-80 bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden p-6 font-mono text-white">
            {/* Grid Lines */}
            <div className="absolute inset-0 grid grid-cols-5 grid-rows-5 pointer-events-none opacity-15">
              {Array.from({ length: 25 }).map((_, i) => (
                <div key={i} className="border-t border-l border-cyan-400 border-dashed" />
              ))}
            </div>

            <div className="relative w-full h-full flex flex-col md:flex-row items-center justify-around gap-6 z-10">
              {/* Dynamic Collapse Bubble Graphic */}
              <div className="flex flex-col items-center">
                <span className="text-[9px] text-cyan-400 uppercase tracking-widest font-bold mb-2">directed cavitation bubble</span>
                <svg width="220" height="180" className="overflow-visible">
                  <defs>
                    <radialGradient id="bubbleGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
                      <stop offset="70%" stopColor="#0284c7" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#0369a1" stopOpacity="0.0" />
                    </radialGradient>
                    <radialGradient id="sparkGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#fbbf24" stopOpacity="1" />
                      <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Outer Sonic Wave Fields */}
                  <circle cx="110" cy="90" r="85" fill="none" stroke="#0891b2" strokeWidth="1" strokeDasharray="3 3" className="animate-spin" style={{ animationDuration: '15s' }} />
                  <circle cx="110" cy="90" r="70" fill="none" stroke="#1d4ed8" strokeWidth="1" strokeDasharray="5 5" className="animate-spin" style={{ animationDuration: '8s', animationDirection: 'reverse' }} />

                  {/* Collapsing Core Bubble (Radius shrinks as pressure slider goes up) */}
                  {(() => {
                    const maxRad = 55;
                    const currentRad = Math.max(12, maxRad - (pfasSimState.pressureAmplitude * 4));
                    return (
                      <g>
                        {/* Bubble Aura */}
                        <circle cx="110" cy="90" r={currentRad * 1.5} fill="url(#bubbleGrad)" />
                        {/* Core Shock Boundary */}
                        <circle cx="110" cy="90" r={currentRad} fill="#0f172a" stroke="#22d3ee" strokeWidth={pfasSimState.pressureAmplitude > 5 ? 3 : 1.5} className="transition-all duration-300" />
                        {/* High Temperature Sparks (Only shown under high pressure) */}
                        {pfasSimState.pressureAmplitude > 3.5 && (
                          <g>
                            <circle cx="110" cy="90" r={currentRad * 0.7} fill="url(#sparkGrad)" className="animate-pulse" />
                            <line x1="110" y1="90" x2={String(110 - currentRad)} y2={String(90 - currentRad)} stroke="#f59e0b" strokeWidth="1.5" />
                            <line x1="110" y1="90" x2={String(110 + currentRad)} y2={String(90 + currentRad)} stroke="#f59e0b" strokeWidth="1.5" />
                            <line x1="110" y1="90" x2={String(110 - currentRad)} y2={String(90 + currentRad)} stroke="#f59e0b" strokeWidth="1.5" />
                            <line x1="110" y1="90" x2={String(110 + currentRad)} y2={String(90 - currentRad)} stroke="#f59e0b" strokeWidth="1.5" />
                          </g>
                        )}
                        <text x="110" y="94" className="text-[10px] fill-cyan-300 font-bold" textAnchor="middle">
                          {Math.round(pfasSimState.pressureAmplitude * 2200)} K
                        </text>
                      </g>
                    );
                  })()}
                </svg>
                <span className="text-[9px] text-gray-400 mt-1">Transient pressure: {pfasSimState.pressureAmplitude} GPa</span>
              </div>

              {/* Sheared Molecular Zone Diagram */}
              <div className="flex-1 max-w-sm flex flex-col justify-center">
                <span className="text-[9px] text-emerald-400 uppercase tracking-widest font-bold mb-3">Molecular Shearing Zone</span>
                
                <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl space-y-4 text-left">
                  {/* PFOA Chain BEFORE / AFTER */}
                  <div>
                    <div className="flex justify-between items-center text-[10px] mb-1">
                      <span className="text-gray-400">Carbon-Fluorine Chain Status:</span>
                      <span className={`font-bold ${pfasOutputs.destructionRate > 98 ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {pfasOutputs.destructionRate > 98 ? '100% Cleaved' : 'Partially Sheared'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 h-10 bg-neutral-950 px-3 rounded border border-neutral-800 justify-center">
                      {pfasSimState.pressureAmplitude <= 4.0 ? (
                        /* Intact PFOA Chain */
                        <div className="flex items-center gap-1">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-400" title="Fluorine"></span>
                          <span className="text-gray-600 font-bold">-</span>
                          <span className="w-3.5 h-3.5 rounded-full bg-neutral-700 flex items-center justify-center text-[8px] text-white font-bold">C</span>
                          <span className="text-gray-600 font-bold">-</span>
                          <span className="w-2.5 h-2.5 rounded-full bg-red-400" title="Fluorine"></span>
                          <span className="text-[9px] text-[#888] font-mono ml-2 font-bold">Intact CF2 Matrix</span>
                        </div>
                      ) : (
                        /* Sheared Atoms */
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-400" title="Neutral Fluoride"></span>
                            <span className="text-[9px] text-emerald-400 font-bold">F- Salts</span>
                          </div>
                          <span className="text-gray-600 font-bold">|</span>
                          <div className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-[#FCFCFC]" title="Inert Carbon"></span>
                            <span className="text-[9px] text-gray-200 font-bold">C (Mineralized)</span>
                          </div>
                          <span className="text-[8px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-1 rounded font-bold animate-pulse">CLEAVED</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* New Mexico State Priority Vector Metrics */}
                  <div className="space-y-2 pt-2 border-t border-neutral-800">
                    <span className="text-[8px] text-[#888] uppercase block">NM Tri-Cabinet State Priority Solvers:</span>
                    
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-neutral-300">1. Produced Fracking Brine:</span>
                      <span className="font-mono text-emerald-400 font-bold flex items-center gap-1">
                        {pfasSimState.pressureAmplitude > 4.5 ? '⚡ 100% Homogenized' : '⚙️ Processing...'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-neutral-300">2. Methane Dispersion Control:</span>
                      <span className="font-mono text-cyan-400 font-bold">
                        {pfasSimState.cavitationFrequency >= 28 ? '✓ Sonic Field Peak' : '▲ Low Frequency'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-neutral-300">3. LANL Radioactive Separation:</span>
                      <span className="font-mono text-blue-400 font-bold">
                        {pfasSimState.nmLaboratoriesCooperation >= 75 ? '⚙️ Active Acoustic Escrow' : '▲ Localized Runoff'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-[10px] text-[#666] text-left">
            <div className="bg-white p-3 rounded-lg border border-gray-100">
              <span className="font-bold text-black block mb-0.5">Cavitation Bubbles</span>
              Sound waves force high-frequency vapor bubbles to compress. Under GPa-scale acoustic forces, bubble collapse is immediate.
            </div>
            <div className="bg-white p-3 rounded-lg border border-gray-100">
              <span className="font-bold text-black block mb-0.5">Quantum Temperatures</span>
              Transient collapse points exceed 10,000 Kelvin—higher than the Sun's surface—supplying the energy required to break Carbon-Fluorine.
            </div>
            <div className="bg-white p-3 rounded-lg border border-gray-100">
              <span className="font-bold text-black block mb-0.5">Produced Brine Optimization</span>
              New Mexico's high priority produced fracking water and toxic waste is sterilized and separated, recycling groundwater for farmers.
            </div>
            <div className="bg-white p-3 rounded-lg border border-gray-100">
              <span className="font-bold text-black block mb-0.5">Sovereign Performance Release</span>
              Escrow allocations are verified and released automatically upon empirical proof of full C-F molecular destruction.
            </div>
          </div>
        </div>

        {/* NEW SECTION: HERITAGE, ROADMAP & SOVEREIGN PRIORITIES */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6 border-t border-gray-200">
          
          {/* LEFT COLUMN: HERITAGE & PATENTED CAPABILITIES */}
          <div className="space-y-6">
            <div className="p-6 border border-gray-200 rounded-2xl bg-[#FCFCFC] space-y-4">
              <div className="flex items-center gap-2">
                <Award className="text-amber-500 w-5 h-5" />
                <h4 className="text-base font-serif font-semibold text-neutral-800">Sovereign Leadership & Patented Science</h4>
              </div>
              
              <div className="space-y-3 font-sans text-xs text-[#444] leading-relaxed">
                <p>
                  <strong className="text-black font-semibold">NanoSpire, Inc.</strong> was founded in December, 2001 to commercialize a new generation of cavitation reentrant jet-based high shear nanotechnology tools and processes.
                </p>
                <p>
                  Our technology does not merely filter contaminants. It is a unique, patented molecular solution engineered to systematically address high-priority state vectors.
                </p>
              </div>

              {/* CEO CARD */}
              <div className="p-4 border border-gray-150 bg-white rounded-xl space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-black">Mark L. LeClair</h5>
                    <span className="text-[10px] font-mono text-cyan-600 block">CEO & Founder, NanoSpire, Inc.</span>
                  </div>
                </div>
                <p className="text-[11px] text-[#666] leading-relaxed font-sans">
                  Mark is the inventor of NanoSpire's core technology and has over 30 years of deep expertise in fluid dynamics and cavitation. He is a former <strong className="text-black font-semibold">Trident II underwater launch hydrodynamicist</strong> at Lockheed Missiles & Space Co. 
                </p>
                <div className="pt-2 border-t border-gray-100 flex flex-wrap gap-1.5 text-[9px] font-mono">
                  <span className="px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded">Worcester Polytechnic (WPI) MSME 1988</span>
                  <span className="px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded">BSME Honors 1983</span>
                  <span className="px-2 py-0.5 bg-cyan-50 text-cyan-700 rounded font-semibold">Thermodynamics, CFD & Physics</span>
                </div>
              </div>
            </div>

            {/* THE SOCRATIC-GERMAN-EXPOSENOMICS UNIFICATION FRAMEWORK */}
            <div id="socratic-german-exposenomics-framework" className="p-6 border border-amber-200 rounded-2xl bg-amber-50/10 space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="text-amber-500 w-5 h-5" />
                <h4 className="text-base font-serif font-semibold text-neutral-800">The Socratic-German-Exposenomics Unification</h4>
              </div>
              <p className="text-xs text-[#555] leading-relaxed font-sans">
                This simulator is governed by an unyielding philosophical, economic, and physical integration that rejects the simulated, safe routines of mainstream systems:
              </p>
              
              <div className="space-y-3 font-sans text-xs">
                <div className="p-3 bg-white rounded-lg border border-amber-100 flex gap-3">
                  <span className="font-mono text-xs font-bold text-amber-600 shrink-0 mt-0.5">I</span>
                  <div>
                    <strong className="text-black font-bold block mb-0.5">Socratic Epistemology: Dismantling the Cave</strong>
                    <p className="text-[11px] text-[#666] leading-relaxed">
                      Socratic inquiry is defined by the courage to face physical, lived reality, rejecting comfortable, superficial, or fictional routines. Like the philosopher in the Allegory of the Cave, the Swiss School of Exposenomics dismantles the convenient "shadows" of corporate malpractice, academic collusion, and regulatory compliance.
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-amber-100 flex gap-3">
                  <span className="font-mono text-xs font-bold text-amber-600 shrink-0 mt-0.5">II</span>
                  <div>
                    <strong className="text-black font-bold block mb-0.5">The German Historical School of Economics</strong>
                    <p className="text-[11px] text-[#666] leading-relaxed">
                      Eschewing abstract, universal models that treat economic actors as mathematical points, this school holds that economics is culturally-specific, historically bounded, and cannot be generalized over space and time. Economic matters are inseparable from the local culture, soil, and biological context.
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-amber-100 flex gap-3">
                  <span className="font-mono text-xs font-bold text-amber-600 shrink-0 mt-0.5">III</span>
                  <div>
                    <strong className="text-black font-bold block mb-0.5">Swiss Exposenomics & Molecular Transmutation</strong>
                    <p className="text-[11px] text-[#666] leading-relaxed">
                      By integrating the physical, bio-accumulative heavy-metal exposome with localized historical context, we prove that human developmental, behavioral, and cognitive baselines are culture-specific material realities. 
                    </p>
                    <p className="text-[11px] text-cyan-700 leading-relaxed mt-1">
                      Our consultative research on <strong>molecular transmutation via hydrodynamic and acoustic cavitation (pioneered by NanoSpire, Inc.)</strong> proves that physical heavy-metal and carbon-fluorine bonds can be sheared and neutralized, paving the sovereign path to human cognitive restoration.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* NEW MEXICO STATE PRIORITIES FRAMEWORK */}
            <div className="p-6 border border-gray-200 rounded-2xl bg-[#FCFCFC] space-y-4">
              <div className="flex items-center gap-2">
                <Shield className="text-emerald-600 w-5 h-5" />
                <h4 className="text-base font-serif font-semibold text-neutral-800">NM Tri-Cabinet Solutions</h4>
              </div>
              <p className="text-xs text-[#555] leading-relaxed font-sans">
                We address New Mexico's core tri-cabinet priorities with our unique, patented high-shear cavitation processes. Our team are the preeminent experts in our field, backed by decades of experimental success.
              </p>
              
              <div className="space-y-3 font-sans text-xs">
                <div className="p-3 bg-white rounded-lg border border-gray-150 flex gap-3">
                  <span className="font-mono text-xs font-bold text-emerald-600 shrink-0 mt-0.5">01</span>
                  <div>
                    <strong className="text-black font-bold block mb-0.5">Produced Fracking Water</strong>
                    <p className="text-[11px] text-[#666] leading-relaxed">
                      Acoustic field homogenization and hydrocarbon destruction to reclaim massive volumes of Permian Basin wastewater.
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-gray-150 flex gap-3">
                  <span className="font-mono text-xs font-bold text-cyan-600 shrink-0 mt-0.5">02</span>
                  <div>
                    <strong className="text-black font-bold block mb-0.5">Methane Emission Suppression</strong>
                    <p className="text-[11px] text-[#666] leading-relaxed">
                      Suppressing and trapping fugitive greenhouse gases utilizing high-frequency sonic shear fields.
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-gray-150 flex gap-3">
                  <span className="font-mono text-xs font-bold text-blue-600 shrink-0 mt-0.5">03</span>
                  <div>
                    <strong className="text-black font-bold block mb-0.5">LANL Radioactive Particulate Separation</strong>
                    <p className="text-[11px] text-[#666] leading-relaxed">
                      Directed acoustic separation of heavy suspended actinide radioactive particulates to prevent downstream toxic plume migration.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: ROADMAP & HERITAGE VISUAL EVIDENCE */}
          <div className="space-y-6">
            <div className="p-6 border border-gray-200 rounded-2xl bg-white space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Milestone className="text-cyan-600 w-5 h-5" />
                  <h4 className="text-base font-serif font-semibold text-neutral-800">Commercialization & Timeline Exhibits</h4>
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400 bg-gray-50 px-2.5 py-1 rounded border border-gray-150">
                  PATENTED IP
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* EXHIBIT A: 20 YEARS RETROSPECTIVE */}
                <div 
                  className="group relative border border-gray-200 rounded-xl overflow-hidden cursor-pointer bg-neutral-50 hover:border-cyan-500 transition-all duration-300"
                  onClick={() => openImageModal(nanoSpire20YearsImg, "Exhibit A: NanoSpire 20 Years Retrospective")}
                >
                  <div className="aspect-[4/3] w-full relative overflow-hidden bg-black flex items-center justify-center">
                    <img 
                      src={nanoSpire20YearsImg} 
                      alt="NanoSpire 20 Years" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs text-white font-mono font-bold tracking-wider">
                      <span>CLICK TO EXPAND 🔍</span>
                    </div>
                  </div>
                  <div className="p-3 bg-white border-t border-gray-150">
                    <h5 className="text-[11px] font-bold text-neutral-800 mb-1">Exhibit A: NanoSpire 20 Years</h5>
                    <p className="text-[9px] text-gray-500 leading-relaxed font-sans">
                      Documenting two decades of high-shear nanotechnology commercialization and design history.
                    </p>
                  </div>
                </div>

                {/* EXHIBIT B: ROADMAP */}
                <div 
                  className="group relative border border-gray-200 rounded-xl overflow-hidden cursor-pointer bg-neutral-50 hover:border-cyan-500 transition-all duration-300"
                  onClick={() => openImageModal(nanoSpireRoadmapImg, "Exhibit B: Integration & Deployment Roadmap")}
                >
                  <div className="aspect-[4/3] w-full relative overflow-hidden bg-black flex items-center justify-center">
                    <img 
                      src={nanoSpireRoadmapImg} 
                      alt="NanoSpire Roadmap" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs text-white font-mono font-bold tracking-wider">
                      <span>CLICK TO EXPAND 🔍</span>
                    </div>
                  </div>
                  <div className="p-3 bg-white border-t border-gray-150">
                    <h5 className="text-[11px] font-bold text-neutral-800 mb-1">Exhibit B: Deployment Roadmap</h5>
                    <p className="text-[9px] text-gray-500 leading-relaxed font-sans">
                      Strategic blueprint for scaling quantum reentrant jet tools across regional and federal facilities.
                    </p>
                  </div>
                </div>

              </div>

              {/* OUTBOUND TRUST LINK */}
              <div className="p-4 bg-cyan-50/50 rounded-xl border border-cyan-100 space-y-3">
                <p className="text-[11px] text-cyan-900 leading-relaxed font-sans">
                  We supply comprehensive in-depth scientific test results, molecular degradation analytics, and complete patented engineering diagrams directly on our official site.
                </p>
                <a 
                  href="https://nanospire.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-700 hover:text-cyan-800 hover:underline transition-colors"
                >
                  Explore Official NanoSpire Site (https://nanospire.com/)
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* FULLSCREEN OVERLAY MODAL */}
      {activeModalImg && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-4">
          <button 
            onClick={() => setActiveModalImg(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700 transition-all cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="max-w-4xl w-full flex flex-col items-center space-y-4">
            <h3 className="text-white font-serif text-lg text-center font-semibold">{modalTitle}</h3>
            
            <div className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden p-2 flex items-center justify-center max-h-[75vh]">
              <img 
                src={activeModalImg} 
                alt={modalTitle} 
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <p className="text-neutral-400 text-xs text-center font-sans max-w-xl">
              Authentic original photographic archive submitted as verified performance evidence for the NanoSpire integration program. Visit <a href="https://nanospire.com/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">nanospire.com</a> for full schematics.
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
