'use client';

type FeatureModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  image: string;
  longDescription: string;
};

export const FeatureModal = ({ isOpen, onClose, title, description, image, longDescription }: FeatureModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[11000] flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-primary/80 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl animate-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-lg hover:bg-white transition-colors text-primary"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative h-48 sm:h-64 overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <h2 className="text-3xl font-bold">{title}</h2>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <p className="text-xl font-medium text-primary leading-relaxed">{description}</p>
          <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed">
            {longDescription.split('\n\n').map((para, i) => (
              <p key={i} className="mb-4">{para}</p>
            ))}
          </div>
          <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
            <a 
              href="#lead-form" 
              onClick={onClose}
              className="flex-1 bg-accent text-primary font-bold py-4 rounded-xl text-center hover:bg-accent/90 transition-all shadow-lg uppercase tracking-widest"
            >
              Get My Free Case Review
            </a>
            <button 
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 font-bold py-4 rounded-xl text-center hover:bg-gray-200 transition-all uppercase tracking-widest"
            >
              Back to Site
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureModal;
