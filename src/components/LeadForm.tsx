"use client";

import { useState } from "react";

export default function LeadForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    state: "",
    accident_type: "",
    description: "",
    agreed: false,
    // Multi-step additions
    accident_location: "",
    accident_date: "",
    is_injured: "",
    role: "",
    is_commercial: "",
    emergency_services: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    
    setStatus("loading");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: "rigaccident.com",
        }),
      });

      if (response.ok) {
        setStatus("success");
        // Track form completion
        console.log("form_completed");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
    
    // Track form start on first interaction
    if (step === 1 && !formData.accident_location) {
        console.log("form_started");
    }
  };

  const setRadioValue = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (status === "success") {
    return (
      <div className="bg-white p-8 rounded-lg shadow-xl text-center border-t-4 border-accent">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-headline text-primary mb-4">Request Received!</h3>
        <p className="text-gray-600 mb-6">Your case review is being prioritized. An attorney will contact you shortly at <strong>{formData.phone}</strong>.</p>
        <div className="text-sm text-gray-400 italic">Keep your phone nearby for a 100% free consultation.</div>
      </div>
    );
  }

  return (
    <div id="lead-form" className="bg-white rounded-lg shadow-2xl overflow-hidden border-t-4 border-accent">
      {/* Progress Bar */}
      <div className="bg-gray-100 h-2 w-full flex">
        <div 
          className="bg-accent h-full transition-all duration-500 ease-out" 
          style={{ width: `${(step / 3) * 100}%` }} 
        />
      </div>

      <div className="p-8">
        <div className="mb-6">
            <h3 className="text-2xl font-headline text-primary mb-2">Get Your Free Case Evaluation</h3>
            <p className="text-sm text-gray-500">Step {step} of 3</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Where did the accident happen? (State)</label>
                <input
                  required
                  type="text"
                  name="accident_location"
                  value={formData.accident_location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-accent focus:border-accent outline-none"
                  placeholder="e.g. Texas, Louisiana, etc."
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">When did the accident occur?</label>
                <select
                  required
                  name="accident_date"
                  value={formData.accident_date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-accent focus:border-accent outline-none"
                >
                  <option value="">Select time period...</option>
                  <option value="last-24-hours">Within last 24 hours</option>
                  <option value="last-week">Within last week</option>
                  <option value="last-month">Within last month</option>
                  <option value="last-year">Within last year</option>
                  <option value="more-than-year">More than a year ago</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Were you or a loved one injured?</label>
                <div className="grid grid-cols-2 gap-4">
                  {['Yes', 'No'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setRadioValue('is_injured', option)}
                      className={`py-3 px-4 rounded-md border font-bold transition ${
                        formData.is_injured === option 
                        ? 'bg-primary text-white border-primary' 
                        : 'bg-white text-gray-700 border-gray-300 hover:border-accent'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Were you the driver or passenger?</label>
                <div className="grid grid-cols-2 gap-4">
                  {['Driver', 'Passenger'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setRadioValue('role', option)}
                      className={`py-3 px-4 rounded-md border font-bold transition ${
                        formData.role === option 
                        ? 'bg-primary text-white border-primary' 
                        : 'bg-white text-gray-700 border-gray-300 hover:border-accent'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Was a commercial truck/rig involved?</label>
                <div className="grid grid-cols-2 gap-4">
                  {['Yes', 'No'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setRadioValue('is_commercial', option)}
                      className={`py-3 px-4 rounded-md border font-bold transition ${
                        formData.is_commercial === option 
                        ? 'bg-primary text-white border-primary' 
                        : 'bg-white text-gray-700 border-gray-300 hover:border-accent'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Were emergency services called?</label>
                <div className="grid grid-cols-2 gap-4">
                  {['Yes', 'No'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setRadioValue('emergency_services', option)}
                      className={`py-3 px-4 rounded-md border font-bold transition ${
                        formData.emergency_services === option 
                        ? 'bg-primary text-white border-primary' 
                        : 'bg-white text-gray-700 border-gray-300 hover:border-accent'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                <input
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-accent focus:border-accent outline-none"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number</label>
                <input
                  required
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-accent focus:border-accent outline-none"
                  placeholder="(555) 000-0000"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Email (Optional)</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-accent focus:border-accent outline-none"
                  placeholder="john@example.com"
                />
              </div>
              <div className="flex items-start">
                <input
                  required
                  type="checkbox"
                  id="agreed"
                  name="agreed"
                  checked={formData.agreed}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 text-accent border-gray-300 rounded"
                />
                <label htmlFor="agreed" className="ml-2 block text-[10px] text-gray-500 leading-tight">
                  By clicking below, I agree to be contacted by a legal professional regarding my case.
                </label>
              </div>
            </div>
          )}

          <div className="flex gap-4">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="w-1/3 border border-gray-300 text-gray-600 font-bold py-4 rounded-md hover:bg-gray-50 transition"
              >
                Back
              </button>
            )}
            <button
              disabled={status === "loading"}
              type="submit"
              className={`${step === 1 ? 'w-full' : 'flex-1'} bg-accent hover:bg-opacity-90 text-primary font-bold py-4 rounded-md transition duration-300 uppercase tracking-wider text-lg shadow-lg`}
            >
              {status === "loading" ? "Processing..." : step < 3 ? "Continue" : "Get My Free Case Review"}
            </button>
          </div>

          {status === "error" && (
            <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>
          )}

          {/* Time Sensitivity Warning below form */}
          {step === 3 && (
            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-md flex items-start space-x-3">
                <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-xs text-amber-800">
                    <p className="font-bold mb-1 uppercase tracking-wide">Time Sensitivity Warning</p>
                    <p>Truck accident claims have strict legal deadlines. Speak with an attorney as soon as possible to protect your rights.</p>
                </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
