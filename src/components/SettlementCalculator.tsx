'use client';

import { useState } from 'react';
import { trackEvent } from '@/lib/analytics';
import { calculateSettlement, formatCurrency, InjurySeverity } from '@/lib/settlement-algorithm';

export const SettlementCalculator = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    state: '',
    isCommercialTruck: true,
    severity: 'minor' as InjurySeverity,
    medicalBills: 0,
    lostWages: 0,
  });
  const [estimate, setEstimate] = useState<ReturnType<typeof calculateSettlement> | null>(null);

  const calculate = () => {
    const result = calculateSettlement(formData);
    setEstimate(result);
    trackEvent('calculator_used', { 
      ...formData, 
      estimate_min: result.min, 
      estimate_max: result.max,
      fair_offer: result.fairOfferBenchmark
    });
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else calculate();
  };

  const reset = () => {
    setStep(1);
    setEstimate(null);
  };

  return (
    <div id="calculator-tool" className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 max-w-lg mx-auto">
      <div className="bg-primary p-6 text-white text-center">
        <h3 className="text-2xl font-bold italic">Fair Offer Calculator</h3>
        <p className="text-white/70 text-sm mt-2 uppercase tracking-widest font-bold">Truck Accident Edition</p>
      </div>

      <div className="p-8">
        {!estimate ? (
          <div className="space-y-6">
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">What state did the accident happen in?</label>
                <input 
                  type="text" 
                  className="w-full border border-black rounded-xl p-4 focus:border-primary focus:ring-0 transition-colors text-black placeholder:text-black"
                  placeholder="e.g., Texas, Florida, California"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">Did the accident involve a commercial truck?</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setFormData({ ...formData, isCommercialTruck: true })}
                    className={`p-4 rounded-xl border-2 text-center font-bold transition-all ${
                      formData.isCommercialTruck ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setFormData({ ...formData, isCommercialTruck: false })}
                    className={`p-4 rounded-xl border-2 text-center font-bold transition-all ${
                      !formData.isCommercialTruck ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">Injury Severity</label>
                <div className="grid grid-cols-1 gap-3">
                  {(['minor', 'moderate', 'severe', 'catastrophic'] as InjurySeverity[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => setFormData({ ...formData, severity: s })}
                      className={`p-4 rounded-xl border-2 text-left capitalize font-medium transition-all ${
                        formData.severity === s ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      <div className="font-bold">{s}</div>
                      <div className="text-xs opacity-70">
                        {s === 'minor' && 'Whiplash, soft tissue, minor cuts'}
                        {s === 'moderate' && 'Broken bones, surgery required'}
                        {s === 'severe' && 'TBI, spinal injury, organ damage'}
                        {s === 'catastrophic' && 'Permanent disability, paralysis'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Estimated Medical Bills ($)</label>
                  <input 
                    type="number" 
                    min="0"
                    className="w-full border border-black rounded-xl p-4 focus:border-primary focus:ring-0 transition-colors text-black"
                    value={formData.medicalBills || ''}
                    onChange={(e) => setFormData({ ...formData, medicalBills: parseInt(e.target.value) || 0 })}
                    placeholder="Enter amount"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Estimated Lost Wages ($)</label>
                  <input 
                    type="number" 
                    min="0"
                    className="w-full border border-black rounded-xl p-4 focus:border-primary focus:ring-0 transition-colors text-black"
                    value={formData.lostWages || ''}
                    onChange={(e) => setFormData({ ...formData, lostWages: parseInt(e.target.value) || 0 })}
                    placeholder="Enter amount"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between items-center pt-4">
              <div className="flex space-x-1">
                {[1, 2, 3, 4].map((s) => (
                  <div key={s} className={`w-2 h-2 rounded-full ${s === step ? 'bg-primary' : 'bg-gray-200'}`} />
                ))}
              </div>
              <button
                onClick={handleNext}
                disabled={step === 1 && !formData.state}
                className="bg-accent text-primary font-bold px-8 py-3 rounded-xl hover:bg-accent/90 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 min-h-[48px] min-w-[120px]"
              >
                {step === 4 ? 'Calculate Fair Offer' : 'Next Step'}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in zoom-in duration-300">
            <div className="text-center space-y-2">
              <h4 className="text-gray-500 font-bold uppercase tracking-widest text-xs">Potential Case Value</h4>
              <div className="text-4xl font-bold text-primary">
                {formatCurrency(estimate.min)} — {formatCurrency(estimate.max)}
              </div>
            </div>

            <div className="bg-primary text-white p-6 rounded-2xl space-y-4 shadow-inner">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-sm font-medium">Standard Insurance Offer*</span>
                <span className="text-lg font-bold text-gray-400 line-through">{formatCurrency(formData.isCommercialTruck ? 30416 : estimate.min * 0.4)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold uppercase tracking-wider text-accent block">Fair Settlement Benchmark</span>
                  <span className="text-xs text-white/60 italic">Based on commercial truck liability</span>
                </div>
                <span className="text-2xl font-black text-white">{formatCurrency(estimate.fairOfferBenchmark)}</span>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-2 bg-green-50 p-3 rounded-xl border border-green-100">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-bold text-green-800">Case Strength: {estimate.caseStrength}</span>
            </div>
            
            <p className="text-[10px] text-gray-400 text-center leading-tight">
              *Comparison based on average passenger car accident settlements vs. commercial vehicle policy limits. 
              Actual values vary based on liability, state laws, and specific case details.
            </p>

            <div className="space-y-4 pt-2">
              <a 
                href="#lead-form"
                onClick={() => trackEvent('calculator_cta_click', { estimate_min: estimate.min, estimate_max: estimate.max })}
                className="block w-full bg-accent text-primary font-bold py-5 rounded-xl hover:bg-accent/90 transition-all text-xl text-center shadow-xl animate-bounce-subtle"
              >
                Get My Free Case Review
              </a>
              <button 
                onClick={reset}
                className="block w-full text-gray-400 hover:text-gray-600 text-sm font-medium underline underline-offset-4 text-center"
              >
                Start Over
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettlementCalculator;
