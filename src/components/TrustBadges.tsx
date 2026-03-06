// components/TrustBadges.tsx

export const TrustBadges = () => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/10 opacity-100 text-white">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#001f3f] border-2 border-accent rounded-full flex items-center justify-center shrink-0">
            <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-sm font-bold uppercase tracking-wide">No Fee Unless You Win</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#001f3f] border-2 border-accent rounded-full flex items-center justify-center shrink-0">
            <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <span className="text-sm font-bold uppercase tracking-wide">100% Confidential</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#001f3f] border-2 border-accent rounded-full flex items-center justify-center shrink-0">
            <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-sm font-bold uppercase tracking-wide">Free Consultation</span>
        </div>
      </div>
      <p className="text-center text-white/70 mt-6 text-sm italic">
        Thousands of accident victims have used our matching system to connect with experienced truck accident attorneys.
      </p>
    </div>
  );
};

export default TrustBadges;
