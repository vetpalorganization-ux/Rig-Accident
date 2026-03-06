'use client';

import { useState } from 'react';
import { trackEvent } from '@/lib/analytics';

export default function LeadForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    injured: '',
    commercial_truck: '',
    state: '',
    description: '',
    name: '',
    phone: '',
    email: '',
    honeypot: '', // Anti-spam
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const totalSteps = 5;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step < totalSteps) {
      handleNext();
      return;
    }
    
    // Check honeypot
    if (formData.honeypot) {
      console.warn('Bot detected via honeypot');
      return;
    }
    
    setStatus('loading');

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          timestamp: new Date().toISOString(),
          source: 'form',
          answers: {
            'Injured': formData.injured,
            'Commercial Truck': formData.commercial_truck,
            'State': formData.state,
            'Description': formData.description
          }
        }),
      });

      if (response.ok) {
        setStatus('success');
        trackEvent('form_submitted');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOptionClick = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTimeout(() => handleNext(), 300);
  };

  if (status === 'success') {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-2xl text-center border border-gray-100">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-3xl font-bold text-primary mb-4">Request Received!</h3>
        <p className="text-gray-600 mb-6 text-lg">Our system is matching you with an experienced truck accident lawyer. They will contact you shortly for your 100% free and confidential consultation.</p>
        <div className="text-sm text-gray-400 italic font-medium uppercase tracking-wider">Keep your phone nearby.</div>
      </div>
    );
  }

  return (
    <div id="lead-form" className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="bg-primary p-6 text-white text-center">
        <h3 className="text-2xl font-bold mb-2">Free Case Evaluation</h3>
        <p className="text-white/70 text-sm uppercase tracking-widest font-bold">Secure & Confidential</p>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-100 h-1.5 w-full flex">
        <div 
          className="bg-accent h-full transition-all duration-500 ease-out" 
          style={{ width: `${(step / totalSteps) * 100}%` }} 
        />
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        {/* Honeypot Field (Hidden) */}
        <div className="hidden">
          <input 
            type="text" 
            name="honeypot" 
            value={formData.honeypot} 
            onChange={handleChange} 
            tabIndex={-1} 
            autoComplete="off" 
          />
        </div>

        {step === 1 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300 text-center">
            <label className="block text-lg font-bold text-gray-800">Were you injured in the accident?</label>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <button type="button" onClick={() => handleOptionClick('injured', 'yes')} className="p-4 rounded-xl border-2 text-center font-bold transition-all border-gray-200 hover:border-primary">Yes</button>
              <button type="button" onClick={() => handleOptionClick('injured', 'no')} className="p-4 rounded-xl border-2 text-center font-bold transition-all border-gray-200 hover:border-primary">No</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300 text-center">
            <label className="block text-lg font-bold text-gray-800">Did the accident involve a commercial truck or 18-wheeler?</label>
            <div className="grid grid-cols-1 gap-3 pt-4">
              <button type="button" onClick={() => handleOptionClick('commercial_truck', 'yes')} className="p-4 rounded-xl border-2 text-center font-bold transition-all border-gray-200 hover:border-primary">Yes</button>
              <button type="button" onClick={() => handleOptionClick('commercial_truck', 'no')} className="p-4 rounded-xl border-2 text-center font-bold transition-all border-gray-200 hover:border-primary">No</button>
              <button type="button" onClick={() => handleOptionClick('commercial_truck', 'not_sure')} className="p-4 rounded-xl border-2 text-center font-bold transition-all border-gray-200 hover:border-primary">Not Sure</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">What state did the accident happen in?</label>
            <input 
              required
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Please enter the state (e.g., Texas, Florida)"
              className="w-full border border-black rounded-xl p-4 focus:border-primary focus:ring-0 transition-colors text-black placeholder:text-black"
            />
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Briefly describe the accident</label>
            <textarea 
              required
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Please provide a brief description of what happened during the accident."
              rows={3}
              className="w-full border border-black rounded-xl p-4 focus:border-primary focus:ring-0 transition-colors text-black placeholder:text-black"
            />
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Full Name</label>
              <input 
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Please enter your full legal name"
                className="w-full border border-black rounded-xl p-4 focus:border-primary focus:ring-0 transition-colors text-black placeholder:text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Phone Number</label>
              <input 
                required
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Please enter your primary phone number"
                className="w-full border border-black rounded-xl p-4 focus:border-primary focus:ring-0 transition-colors text-black placeholder:text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Email Address (Optional)</label>
              <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Please enter your email address for correspondence"
                className="w-full border border-black rounded-xl p-4 focus:border-primary focus:ring-0 transition-colors text-black placeholder:text-black"
              />
            </div>
          </div>
        )}

        <div className="pt-4 space-y-6">
          <button 
            type="submit"
            disabled={status === 'loading' || (step === 3 && !formData.state) || (step === 4 && !formData.description)}
            className="w-full bg-accent text-primary font-bold py-5 rounded-xl hover:bg-accent/90 transition-all text-xl shadow-lg disabled:opacity-50 uppercase tracking-widest"
          >
            {status === 'loading' ? 'Processing...' : step === totalSteps ? 'Get Matched with a Lawyer' : 'Next Step'}
          </button>
          
          <div className="flex flex-col items-center space-y-4">
            <div className="text-center text-[10px] text-gray-400 max-w-sm mx-auto leading-tight">
              <p className="font-bold mb-1">RigAccident.com is a lawyer matching service.</p>
              <p>We connect accident victims with independent attorneys. Consultations are free and confidential. We are not a law firm and do not provide legal advice.</p>
            </div>

            <div className="w-full pt-4 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-2 text-[10px] font-bold text-gray-500 uppercase tracking-tighter">
                  <svg className="w-3 h-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>No Fee Unless You Win</span>
                </div>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-gray-500 uppercase tracking-tighter">
                  <svg className="w-3 h-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Free Case Review</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
