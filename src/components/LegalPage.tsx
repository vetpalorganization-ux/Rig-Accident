import React from 'react';

type LegalPageProps = {
  title: string;
  lastUpdated: string;
  content: React.ReactNode;
};

const LegalPage = ({ title, lastUpdated, content }: LegalPageProps) => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <div className="bg-primary py-20 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          <p className="text-white/60">Last Updated: {lastUpdated}</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto prose prose-blue prose-lg">
          {content}
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
