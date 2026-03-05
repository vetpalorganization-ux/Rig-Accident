'use client';

import { useState, useEffect } from 'react';

type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: true,
    marketing: true,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    saveConsent({ necessary: true, analytics: true, marketing: true });
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
  };

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify(prefs));
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setIsVisible(false);
    // In a real app, you would trigger/disable tracking here
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[10000] max-w-sm w-full animate-in slide-in-from-bottom-10 duration-500">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6">
        {!showSettings ? (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-primary">Cookie Preferences</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
            </p>
            <div className="flex space-x-3 pt-2">
              <button
                onClick={handleAcceptAll}
                className="flex-1 bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 transition-colors text-sm"
              >
                Accept All
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="flex-1 bg-gray-100 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors text-sm"
              >
                Settings
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-primary">Manage Cookies</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Necessary</span>
                <input type="checkbox" checked disabled className="rounded text-primary" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Analytics</span>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                  className="rounded text-primary"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Marketing</span>
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                  className="rounded text-primary"
                />
              </div>
            </div>
            <div className="flex space-x-3 pt-2">
              <button
                onClick={handleSavePreferences}
                className="flex-1 bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 transition-colors text-sm"
              >
                Save
              </button>
              <button
                onClick={() => setShowSettings(false)}
                className="flex-1 bg-gray-100 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors text-sm"
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieConsent;
