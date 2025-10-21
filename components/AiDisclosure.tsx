// Fix: Created the AiDisclosure component.
import React from 'react';

const AiDisclosure: React.FC = () => {
    return (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-gray-300 text-xs px-3 py-1 rounded-full shadow-lg border border-teal-500/20">
            Powered by Google Gemini
        </div>
    );
};

export default AiDisclosure;
