'use client';

import { useState } from 'react';
import { trackEvent } from '@/lib/analytics';

export const SettlementCalculator = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    state: '',
    severity: 'minor',
    hospital: 'no',
    missedDays: 0,
  });
  const [estimate, setEstimate] = useState<{ min: number; max: number } | null>(null);

  const calculateEstimate = () => {
    let base = 20000;
    
    if (formData.severity === 'severe') base += 150000;
    else if (formData.severity === 'moderate') base += 60000;
    
    if (formData.hospital === 'yes') base += 50000;
    
    if (formData.missedDays > 7) base += 25000;
    else if (formData.missedDays > 0) base += 5000;

    // Add some variance for the range
    const min = Math.round(base * 0.85 / 1000) * 1000;
    const max = Math.round(base * 1.35 / 1000) * 1000;
    
    setEstimate({ min, max });
    trackEvent('calculator_used', { ...formData, estimate_min: min, estimate_max: max });
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else calculateEstimate();
  };

  const reset = () => {
    setStep(1);
    setEstimate(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 max-w-lg mx-auto">
      <div className="bg-primary p-6 text-white text-center">
        <h3 className="text-2xl font-bold">Truck Accident Settlement Estimate</h3>
        <p className="text-white/70 text-sm mt-2">See what your case could be worth</p>
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
                  placeholder="Please enter the state where the accident occurred"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">How severe were the injuries?</label>
                <div className="grid grid-cols-1 gap-3">
                  {['minor', 'moderate', 'severe'].map((s) => (
                    <button
                      key={s}
                      onClick={() => setFormData({ ...formData, severity: s })}
                      className={`p-4 rounded-xl border-2 text-left capitalize font-medium transition-all ${
                        formData.severity === s ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">Did you visit the hospital?</label>
                <div className="grid grid-cols-2 gap-4">
                  {['yes', 'no'].map((h) => (
                    <button
                      key={h}
                      onClick={() => setFormData({ ...formData, hospital: h })}
                      className={`p-4 rounded-xl border-2 text-center capitalize font-medium transition-all ${
                        formData.hospital === h ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">How many days of work did you miss?</label>
                <input 
                  type="number" 
                  min="0"
                  className="w-full border-2 border-gray-200 rounded-xl p-4 focus:border-primary focus:ring-0 transition-colors"
                  value={formData.missedDays}
                  onChange={(e) => setFormData({ ...formData, missedDays: parseInt(e.target.value) || 0 })}
                />
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
                {step === 4 ? 'Calculate Now' : 'Next Step'}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-6 animate-in zoom-in duration-300">
            <div className="space-y-2">
              <h4 className="text-gray-500 font-bold uppercase tracking-widest text-sm">Estimated Claim Value</h4>
              <div className="text-4xl md:text-5xl font-bold text-primary">
                ${estimate.min.toLocaleString()} — ${estimate.max.toLocaleString()}
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-xl text-sm text-yellow-800 border border-yellow-100">
              Note: This is an estimate based on average truck accident settlements. Actual values vary based on specific case details.
            </div>

            <div className="space-y-4">
              <a 
                href="#lead-form"
                className="block w-full bg-accent text-primary font-bold py-4 rounded-xl hover:bg-accent/90 transition-all text-lg shadow-lg"
              >
                Get My Free Case Review
              </a>
              <button 
                onClick={reset}
                className="text-gray-400 hover:text-gray-600 text-sm font-medium underline underline-offset-4"
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
