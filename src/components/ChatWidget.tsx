'use client';

import { useState, useEffect, useRef } from 'react';
import { conversationFlow, firstStepId, type ChatStep } from '@/lib/conversationFlow';
import { trackEvent } from '@/lib/analytics';

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentStepId, setCurrentStepId] = useState<string | null>(null);
  const [history, setHistory] = useState<{ question: string; answer: string }[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show widget after 4 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Auto-open on desktop? Let's keep it minimized but visible first
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history, currentStepId]);

  const handleOpen = () => {
    setIsOpen(true);
    if (!currentStepId) {
      setCurrentStepId(firstStepId);
      trackEvent('chat_opened');
    }
  };

  const handleAnswer = async (answer: string, step: ChatStep) => {
    const newHistory = [...history, { question: step.question, answer }];
    setHistory(newHistory);
    setAnswers(prev => ({ ...prev, [step.question]: answer }));

    if (step.id === 'step-5' && answer.toLowerCase().includes('no')) {
      setIsCompleted(true);
      trackEvent('chat_completed', { success: false, reason: 'user_declined_lawyer' });
      return;
    }

    if (step.id === 'step-5' && answer.toLowerCase().includes('yes')) {
      setCurrentStepId('contact-info');
      return;
    }

    if (step.nextStepId) {
      setCurrentStepId(step.nextStepId);
    } else if (step.id !== 'contact-info') {
      setIsCompleted(true);
      trackEvent('chat_completed', { success: true });
    }
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          answers,
          source: 'chat',
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        setIsCompleted(true);
        trackEvent('chat_completed', { success: true });
      } else {
        alert('Something went wrong. Please try again or call us.');
      }
    } catch (err) {
      console.error('Chat Lead Error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col items-end">
      {isOpen ? (
        <div className="bg-white rounded-2xl shadow-2xl w-[90vw] sm:w-[400px] max-h-[600px] flex flex-col overflow-hidden border border-gray-100 transition-all duration-300 transform scale-100">
          {/* Header */}
          <div className="bg-primary p-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center font-bold text-primary">RA</div>
              <span className="text-white font-bold">Rig Accident Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 min-h-[300px]">
            {/* Initial Greeting */}
            <div className="flex items-start space-x-2">
              <div className="w-6 h-6 bg-accent/20 text-accent rounded-full flex items-center justify-center text-[10px] font-bold">RA</div>
              <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-gray-800 border border-gray-100">
                Hi — were you involved in a truck accident?<br /><br />
                I can help determine if you may qualify for a free case review.
              </div>
            </div>

            {/* History */}
            {history.map((item, idx) => (
              <div key={idx} className="space-y-4">
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 bg-accent/20 text-accent rounded-full flex items-center justify-center text-[10px] font-bold">RA</div>
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-gray-800 border border-gray-100">
                    {item.question}
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-primary text-white p-3 rounded-2xl rounded-tr-none shadow-sm text-sm">
                    {item.answer}
                  </div>
                </div>
              </div>
            ))}

            {/* Current Step */}
            {!isCompleted && currentStepId && (
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 bg-accent/20 text-accent rounded-full flex items-center justify-center text-[10px] font-bold">RA</div>
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-gray-800 border border-gray-100">
                    {conversationFlow[currentStepId].question}
                  </div>
                </div>

                {/* Choices */}
                {conversationFlow[currentStepId].type === 'choice' && (
                  <div className="grid grid-cols-1 gap-2 pl-8">
                    {conversationFlow[currentStepId].options?.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleAnswer(option, conversationFlow[currentStepId])}
                        className="text-left bg-white hover:bg-accent/10 border border-gray-200 hover:border-accent p-3 rounded-xl text-sm font-medium transition-all"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}

                {/* Text Input */}
                {conversationFlow[currentStepId].type === 'text' && (
                  <div className="pl-8">
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        const val = (e.currentTarget.elements.namedItem('textInput') as HTMLInputElement).value;
                        if (val) handleAnswer(val, conversationFlow[currentStepId]);
                      }}
                      className="flex space-x-2"
                    >
                      <input 
                        name="textInput"
                        required
                        className="flex-1 border border-black rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-black placeholder:text-black"
                        placeholder="Please type your answer here..."
                      />
                      <button className="bg-primary text-white p-3 rounded-xl hover:bg-primary/90 transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                    </form>
                  </div>
                )}

                {/* Contact Form */}
                {conversationFlow[currentStepId].type === 'contact' && (
                  <div className="pl-8">
                    <form onSubmit={handleContactSubmit} className="space-y-2">
                      <input name="name" required placeholder="Please enter your full name" className="w-full border border-black rounded-xl p-3 text-sm text-black placeholder:text-black" />
                      <input name="phone" required type="tel" placeholder="Please enter your phone number" className="w-full border border-black rounded-xl p-3 text-sm text-black placeholder:text-black" />
                      <input name="email" type="email" placeholder="Please enter your email address (Optional)" className="w-full border border-black rounded-xl p-3 text-sm text-black placeholder:text-black" />
                      <button 
                        disabled={isSubmitting}
                        className="w-full bg-accent text-primary font-bold p-3 rounded-xl hover:bg-accent/90 transition-colors disabled:opacity-50"
                      >
                        {isSubmitting ? 'Sending...' : 'Get My Free Case Review'}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            )}

            {/* Completion Message */}
            {isCompleted && (
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 bg-accent/20 text-accent rounded-full flex items-center justify-center text-[10px] font-bold">RA</div>
                <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-gray-800 border border-gray-100">
                  {history.some(h => h.answer.toLowerCase().includes('yes')) 
                    ? "Thank you! Our system is matching you with an experienced truck accident lawyer. They will contact you shortly for your free and confidential consultation."
                    : "Thank you for your time. If you change your mind, we're here to help."}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      ) : (
        <button
          onClick={handleOpen}
          aria-label="Open chat"
          className="group relative bg-primary text-white shadow-2xl hover:scale-105 transition-transform border border-[#CCCCCC] flex items-center justify-center rounded-full w-14 h-14 sm:h-16 sm:w-auto sm:px-5"
          style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
        >
          {/* Slower pulse with no pointer events */}
          <span className="pointer-events-none absolute inset-0 rounded-full bg-primary/50 animate-[ping_3.5s_cubic-bezier(0,0,0.2,1)_infinite]" aria-hidden="true"></span>
          <span className="pointer-events-none absolute inset-0 rounded-full bg-primary" aria-hidden="true"></span>

          {/* Icon circle - always visible; left-aligned in pill on desktop */}
          <span className="relative z-10 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-accent text-primary font-bold">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </span>

          {/* Desktop-only label to form oval/pill; hidden on mobile */}
          <span className="hidden sm:flex relative z-10 items-center ml-3 text-left">
            <span className="flex flex-col leading-tight">
              <span className="text-xs text-white/70 font-medium">Have questions?</span>
              <span className="font-bold">Start Case Review</span>
            </span>
          </span>
        </button>
      )}
    </div>
  );
};

export default ChatWidget;
