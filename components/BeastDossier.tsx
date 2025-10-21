// Fix: Created the BeastDossier component to display generated beast data.
import React, { useState } from 'react';
import { Beast } from '../types';
import { toBeastMarkdown } from '../utils/exportUtils';

interface BeastDossierProps {
    beast: Beast;
    onDelete: () => void;
    isLoggedIn: boolean;
    onSaveToProfile: () => void;
}

const BeastDossier: React.FC<BeastDossierProps> = ({ beast, onDelete, isLoggedIn, onSaveToProfile }) => {
    const [copyText, setCopyText] = useState('Copy');

    const handleCopy = () => {
        navigator.clipboard.writeText(toBeastMarkdown(beast));
        setCopyText('Copied!');
        setTimeout(() => setCopyText('Copy'), 2000);
    };

    return (
        <div className="bg-gray-800/50 p-6 md:p-8 rounded-xl border border-teal-500/30 glow-border-soft animate-fade-in">
             <div className="flex justify-between items-start mb-4">
                <div>
                    <h2 className="font-cinzel text-3xl md:text-4xl text-teal-200 text-glow">{beast.display_name}</h2>
                    <p className="text-gray-400 italic">{beast.taxonomy} ({beast.archetype})</p>
                </div>
                <div className="flex flex-wrap gap-2 justify-end">
                    <button onClick={handleCopy} className="text-xs bg-gray-700 hover:bg-gray-600 text-white font-semibold px-3 py-1 rounded">{copyText}</button>
                    {isLoggedIn && (
                        <button onClick={onSaveToProfile} className="text-xs bg-teal-700 hover:bg-teal-600 text-white font-semibold px-3 py-1 rounded">Save to Profile</button>
                    )}
                    <button onClick={onDelete} className="text-xs bg-red-800 hover:bg-red-700 text-white font-semibold px-3 py-1 rounded">Delete</button>
                </div>
            </div>
            
            <p className="border-l-4 border-teal-500 pl-4 text-gray-300 my-4">{beast.appearance_description}</p>
            
            <div className="space-y-6">
                <section>
                    <h3 className="font-cinzel text-xl text-teal-300 mb-2 border-b border-teal-500/20 pb-1">Core Info</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-300">
                        <div><strong>Size:</strong> {beast.size_class}</div>
                        <div><strong>Rarity:</strong> {beast.rarity}</div>
                        <div><strong>Intelligence:</strong> {beast.intelligence_level}</div>
                        <div><strong>Affinities:</strong> {beast.affinity.join(', ')}</div>
                        <div><strong>Environments:</strong> {beast.environment.join(', ')}</div>
                        <div><strong>Aggression:</strong> {beast.aggression}</div>
                    </div>
                </section>
                
                <section>
                    <h3 className="font-cinzel text-xl text-teal-300 mb-2 border-b border-teal-500/20 pb-1">Key Features</h3>
                    <ul className="list-disc list-inside text-gray-300">
                        {beast.key_features.map((feature, i) => <li key={i}>{feature}</li>)}
                    </ul>
                </section>
                
                <section>
                    <h3 className="font-cinzel text-xl text-teal-300 mb-2 border-b border-teal-500/20 pb-1">Abilities</h3>
                    {beast.abilities.map((ability, i) => (
                        <div key={i} className="mb-2">
                            <strong className="text-teal-400">{ability.name}</strong> ({ability.type})
                            <p className="text-sm text-gray-400 ml-2">{ability.effect_summary}</p>
                        </div>
                    ))}
                </section>

                <section>
                    <h3 className="font-cinzel text-xl text-teal-300 mb-2 border-b border-teal-500/20 pb-1">Combat & Weaknesses</h3>
                     <ul className="list-disc list-inside text-gray-300 space-y-1">
                        <li><strong>Style:</strong> {beast.combat_style.join(', ')}</li>
                        <li><strong>Durability:</strong> {beast.durability}</li>
                        <li><strong>Weaknesses:</strong> {beast.weaknesses.join(', ')}</li>
                        <li><strong>Behavioral Flaw:</strong> {beast.flaw}</li>
                    </ul>
                </section>

                 <section>
                    <h3 className="font-cinzel text-xl text-teal-300 mb-2 border-b border-teal-500/20 pb-1">Ecology & Lore</h3>
                     <ul className="list-disc list-inside text-gray-300 space-y-1">
                        <li><strong>Ecological Role:</strong> {beast.ecological_role}</li>
                        <li><strong>Social Structure:</strong> {beast.social_structure}</li>
                        <li><strong>Mythos/Rumor:</strong> {beast.mythos_rumor}</li>
                    </ul>
                </section>
                
                <section>
                    <h3 className="font-cinzel text-xl text-teal-300 mb-2 border-b border-teal-500/20 pb-1">Image Prompt</h3>
                    <p className="text-sm text-gray-400 bg-gray-900 p-2 rounded font-mono">{beast.image_prompt}</p>
                </section>
            </div>
        </div>
    );
};

export default BeastDossier;