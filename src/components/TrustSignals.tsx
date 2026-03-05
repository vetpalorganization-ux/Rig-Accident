export default function TrustSignals() {
  const signals = [
    { text: "No Fee Unless You Win", icon: "✓" },
    { text: "100% Free Case Review", icon: "✓" },
    { text: "Confidential Consultation", icon: "✓" },
    { text: "Attorneys Nationwide", icon: "✓" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {signals.map((signal, index) => (
        <div 
          key={index} 
          className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 p-3 rounded shadow-sm"
        >
          <span className="text-accent font-black text-lg leading-none">{signal.icon}</span>
          <span className="text-white text-[10px] md:text-xs font-bold uppercase tracking-wide leading-tight">
            {signal.text}
          </span>
        </div>
      ))}
    </div>
  );
}
