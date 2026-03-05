'use client';

import { useState } from 'react';
import { trackEvent } from '@/lib/analytics';

export default function LeadForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    state: '',
    accident_type: 'Truck/18-Wheeler',
    description: '',
    honeypot: '', // Anti-spam
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check honeypot
    if (formData.honeypot) {
      console.warn('Bot detected via honeypot');
      return;
    }

    if (step < 2) {
      setStep(step + 1);
      return;
    }
    
    setStatus('loading');

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: 'form',
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
      <div className="bg-primary p-6 text-white">
        <h3 className="text-2xl font-bold mb-2">Get Matched with a Truck Accident Lawyer</h3>
        <p className="text-white/70 text-sm">Our system connects accident victims with experienced truck accident attorneys. Your consultation is free and confidential.</p>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-100 h-1.5 w-full flex">
        <div 
          className="bg-accent h-full transition-all duration-500 ease-out" 
          style={{ width: `${(step / 2) * 100}%` }} 
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

        {step === 1 ? (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
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
            <div>
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
          </div>
        ) : (
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
            disabled={status === 'loading'}
            className="w-full bg-accent text-primary font-bold py-5 rounded-xl hover:bg-accent/90 transition-all text-xl shadow-lg disabled:opacity-50 uppercase tracking-widest"
          >
            {status === 'loading' ? 'Processing...' : step === 1 ? 'Next Step' : 'Get Matched with a Lawyer'}
          </button>
          
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2 text-gray-400 text-xs font-bold uppercase tracking-widest">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Secure & Confidential</span>
            </div>
            
            <div className="w-full pt-4 border-t border-gray-100">
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center space-x-2 text-xs font-bold text-gray-500 uppercase tracking-tighter">
                  <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>No Fee Unless You Win</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-bold text-gray-500 uppercase tracking-tighter">
                  <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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
