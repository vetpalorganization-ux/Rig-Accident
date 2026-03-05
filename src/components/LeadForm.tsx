"use client";

import { useState } from "react";

export default function LeadForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    state: "",
    accident_type: "",
    description: "",
    agreed: false,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        setFormData({
          name: "",
          phone: "",
          email: "",
          state: "",
          accident_type: "",
          description: "",
          agreed: false,
        });
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
  };

  if (status === "success") {
    return (
      <div className="bg-white p-8 rounded-lg shadow-xl text-center">
        <h3 className="text-2xl font-headline text-primary mb-4">Thank You!</h3>
        <p className="text-gray-600">Your case review request has been submitted. An attorney will contact you shortly.</p>
      </div>
    );
  }

  return (
    <div id="lead-form" className="bg-white p-8 rounded-lg shadow-xl">
      <h3 className="text-2xl font-headline text-primary mb-6 text-center">Get Your Free Case Evaluation</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            required
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent outline-none"
            placeholder="John Doe"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              required
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent outline-none"
              placeholder="(555) 000-0000"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              required
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent outline-none"
              placeholder="john@example.com"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
            <input
              required
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent outline-none"
              placeholder="TX"
            />
          </div>
          <div>
            <label htmlFor="accident_type" className="block text-sm font-medium text-gray-700 mb-1">Accident Type</label>
            <select
              required
              id="accident_type"
              name="accident_type"
              value={formData.accident_type}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent outline-none"
            >
              <option value="">Select type...</option>
              <option value="Oil Rig">Oil Rig</option>
              <option value="Drilling Rig">Drilling Rig</option>
              <option value="Oilfield Explosion">Oilfield Explosion</option>
              <option value="Offshore Rig">Offshore Rig</option>
              <option value="18-Wheeler / Trucking">18-Wheeler / Trucking</option>
              <option value="Refinery">Refinery</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Brief Description</label>
          <textarea
            required
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent outline-none"
            placeholder="Tell us what happened..."
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
          <label htmlFor="agreed" className="ml-2 block text-xs text-gray-500">
            I agree to be contacted by a legal professional regarding my case.
          </label>
        </div>
        <button
          disabled={status === "loading"}
          type="submit"
          className="w-full bg-accent hover:bg-opacity-90 text-primary font-bold py-3 rounded-md transition duration-300 uppercase tracking-wider"
        >
          {status === "loading" ? "Submitting..." : "Submit Case Review"}
        </button>
        {status === "error" && (
          <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>
        )}
      </form>
    </div>
  );
}
