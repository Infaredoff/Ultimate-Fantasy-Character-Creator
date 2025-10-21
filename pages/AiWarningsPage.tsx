// Fix: Created the AiWarningsPage component.
import React from 'react';

const AiWarningsPage: React.FC = () => {
    return (
        <main className="container mx-auto px-4 py-16">
            <div className="w-full max-w-3xl mx-auto">
                 <h1 className="font-cinzel text-5xl font-bold text-teal-200 text-glow mb-8 text-center">
                    AI Content Warnings
                </h1>
                <div className="bg-gray-900/50 p-8 rounded-xl border border-teal-500/20 glow-border space-y-4 text-lg text-gray-300">
                    <p>Please be aware of the following when using this generative AI tool:</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>Inaccuracy:</strong> The AI can make mistakes and generate information that is factually incorrect or nonsensical within a fantasy context. Always review and edit generated content.</li>
                        <li><strong>Repetition:</strong> The model may occasionally repeat phrases or ideas. If this happens, try re-rolling a section or generating a new variant.</li>
                        <li><strong>Bias:</strong> Like all large language models, the AI has been trained on a vast amount of text from the internet and may reflect societal biases.</li>
                        <li><strong>Not a Substitute for Creativity:</strong> This tool is best used as a source of inspiration, a way to break creative blocks, or a method for rapidly prototyping ideas. The best results come from a collaboration between you and the AI.</li>
                    </ul>
                </div>
            </div>
        </main>
    );
};

export default AiWarningsPage;
