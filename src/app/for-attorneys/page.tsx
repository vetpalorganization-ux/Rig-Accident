 'use client';

 import { useState } from 'react';
 
 export default function ForAttorneysPage() {
   const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
   const [form, setForm] = useState({
     firm: '',
     contact: '',
     email: '',
     phone: '',
     states: '',
     practice: '',
     website: '',
     honeypot: '',
   });
 
   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
     const { name, value } = e.target;
     setForm((prev) => ({ ...prev, [name]: value }));
   };
 
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     if (status === 'loading') return;
     setStatus('loading');
     try {
       const timestamp = new Date().toISOString();
       const res = await fetch('/api/lead', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
           name: `${form.contact} (${form.firm})`,
           phone: form.phone,
           email: form.email,
           timestamp,
           source: 'attorney',
           honeypot: form.honeypot,
           answers: {
             'Firm Name': form.firm,
             'States': form.states,
             'Practice Areas': form.practice,
             'Website': form.website,
             'Inquiry Type': 'Attorney Network',
           },
         }),
       });
       const data = await res.json();
       if (res.ok && data.success) setStatus('success');
       else setStatus('error');
     } catch {
       setStatus('error');
     }
   };
 
   return (
     <main className="min-h-screen bg-white">
       <section className="bg-primary text-white py-16">
         <div className="container mx-auto px-4 text-center">
           <h1 className="text-3xl md:text-5xl font-bold mb-3">Join the RigAccident Attorney Network</h1>
           <p className="text-white/70 max-w-2xl mx-auto">
             Qualified truck-accident firms can receive pre-screened inquiries in their licensed states.
           </p>
         </div>
       </section>
 
       <section className="py-12">
         <div className="container mx-auto px-4">
           {status === 'success' ? (
             <div className="max-w-2xl mx-auto bg-green-50 border border-green-100 p-8 rounded-2xl text-center">
               <h2 className="text-2xl font-bold text-green-800 mb-2">Thank you!</h2>
               <p className="text-green-800">Our team will contact you shortly to complete onboarding.</p>
             </div>
           ) : (
             <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm p-8 space-y-6">
               <div>
                 <label className="block text-sm font-bold uppercase tracking-wider mb-2">Firm Name</label>
                 <input name="firm" required value={form.firm} onChange={handleChange} className="w-full border border-black rounded-xl p-4 text-black placeholder:text-black" placeholder="Your firm" />
               </div>
               <div className="grid md:grid-cols-2 gap-6">
                 <div>
                   <label className="block text-sm font-bold uppercase tracking-wider mb-2">Contact Name</label>
                   <input name="contact" required value={form.contact} onChange={handleChange} className="w-full border border-black rounded-xl p-4 text-black placeholder:text-black" placeholder="Jane Doe" />
                 </div>
                 <div>
                   <label className="block text-sm font-bold uppercase tracking-wider mb-2">Phone</label>
                   <input name="phone" required value={form.phone} onChange={handleChange} className="w-full border border-black rounded-xl p-4 text-black placeholder:text-black" placeholder="(555) 123-4567" />
                 </div>
               </div>
               <div className="grid md:grid-cols-2 gap-6">
                 <div>
                   <label className="block text-sm font-bold uppercase tracking-wider mb-2">Email</label>
                   <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full border border-black rounded-xl p-4 text-black placeholder:text-black" placeholder="contact@firm.com" />
                 </div>
                 <div>
                   <label className="block text-sm font-bold uppercase tracking-wider mb-2">Website</label>
                   <input name="website" value={form.website} onChange={handleChange} className="w-full border border-black rounded-xl p-4 text-black placeholder:text-black" placeholder="https://" />
                 </div>
               </div>
               <div>
                 <label className="block text-sm font-bold uppercase tracking-wider mb-2">Licensed States</label>
                 <input name="states" required value={form.states} onChange={handleChange} className="w-full border border-black rounded-xl p-4 text-black placeholder:text-black" placeholder="e.g., TX, FL, CA" />
               </div>
               <div>
                 <label className="block text-sm font-bold uppercase tracking-wider mb-2">Practice Areas</label>
                 <input name="practice" required value={form.practice} onChange={handleChange} className="w-full border border-black rounded-xl p-4 text-black placeholder:text-black" placeholder="Truck accidents, wrongful death, catastrophic injury" />
               </div>
               <input type="text" name="honeypot" value={form.honeypot} onChange={handleChange} className="hidden" tabIndex={-1} autoComplete="off" />
               
               <button 
                 disabled={status === 'loading'}
                 className="w-full bg-accent text-primary font-bold py-4 rounded-xl hover:bg-accent/90 transition-colors text-lg"
               >
                 {status === 'loading' ? 'Submitting...' : 'Request Network Access'}
               </button>
               {status === 'error' && <div className="text-sm text-red-600">Submission failed. Please try again.</div>}
             </form>
           )}
         </div>
       </section>
     </main>
   );
 }
