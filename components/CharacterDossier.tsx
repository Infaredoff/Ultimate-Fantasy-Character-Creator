// Fix: Created the CharacterDossier component to display generated character data.
import React, { useState } from 'react';
import { Character, RerollableSection } from '../types';
import { toMarkdown, toJson } from '../utils/exportUtils';

interface CharacterDossierProps {
    character: Character;
    onReroll: (section: RerollableSection) => void;
    onGenerateVariant: () => void;
    onDelete: () => void;
    isLoadingReroll: RerollableSection | null;
    isLoggedIn: boolean;
    onSaveToProfile: () => void;
}

const RerollButton: React.FC<{ onClick: () => void, isLoading: boolean }> = ({ onClick, isLoading }) => (
    <button onClick={onClick} disabled={isLoading} className="ml-2 text-xs text-teal-400 hover:text-teal-200 disabled:text-gray-500 transition">
        {isLoading ? '...' : 'Reroll'}
    </button>
);

const CharacterDossier: React.FC<CharacterDossierProps> = ({ character, onReroll, onGenerateVariant, onDelete, isLoadingReroll, isLoggedIn, onSaveToProfile }) => {
    const [copyText, setCopyText] = useState('Copy');
    
    const downloadFile = (content: string, fileName: string, mimeType: string) => {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(toMarkdown(character));
        setCopyText('Copied!');
        setTimeout(() => setCopyText('Copy'), 2000);
    };
    
    return (
        <div className="bg-gray-800/50 p-6 md:p-8 rounded-xl border border-teal-500/30 glow-border-soft animate-fade-in">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h2 className="font-cinzel text-3xl md:text-4xl text-teal-200 text-glow">{character.name}</h2>
                    <p className="text-gray-400 italic">{character.race} {character.characterClass} ({character.archetype})</p>
                </div>
                <div className="flex flex-wrap gap-2 justify-end">
                    <button onClick={handleCopy} className="text-xs bg-gray-700 hover:bg-gray-600 text-white font-semibold px-3 py-1 rounded">{copyText}</button>
                    <button onClick={() => downloadFile(toMarkdown(character), `${character.name}.md`, 'text/markdown')} className="text-xs bg-gray-700 hover:bg-gray-600 text-white font-semibold px-3 py-1 rounded">MD</button>
                    <button onClick={() => downloadFile(toJson(character), `${character.name}.json`, 'application/json')} className="text-xs bg-gray-700 hover:bg-gray-600 text-white font-semibold px-3 py-1 rounded">JSON</button>
                    {isLoggedIn && (
                        <button onClick={onSaveToProfile} className="text-xs bg-teal-700 hover:bg-teal-600 text-white font-semibold px-3 py-1 rounded">Save to Profile</button>
                    )}
                    <button onClick={onDelete} className="text-xs bg-red-800 hover:bg-red-700 text-white font-semibold px-3 py-1 rounded">Delete</button>
                </div>
            </div>

            <p className="border-l-4 border-teal-500 pl-4 italic text-gray-300 my-4">"{character.quote}"</p>

            <div className="space-y-6">
                <section>
                    <h3 className="font-cinzel text-xl text-teal-300 mb-2 border-b border-teal-500/20 pb-1">
                        Appearance
                        <RerollButton onClick={() => onReroll('appearance')} isLoading={isLoadingReroll === 'appearance'} />
                    </h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                        <li><strong>Height:</strong> {character.appearance.height}</li>
                        <li><strong>Build:</strong> {character.appearance.build}</li>
                        <li><strong>Hair:</strong> {character.appearance.hair}</li>
                        <li><strong>Eyes:</strong> {character.appearance.eyes}</li>
                        <li><strong>Features:</strong> {character.appearance.distinguishingFeatures}</li>
                    </ul>
                </section>

                <section>
                    <h3 className="font-cinzel text-xl text-teal-300 mb-2 border-b border-teal-500/20 pb-1">
                        Personality
                        <RerollButton onClick={() => onReroll('personality')} isLoading={isLoadingReroll === 'personality'} />
                    </h3>
                     <ul className="list-disc list-inside text-gray-300 space-y-1">
                        <li><strong>Traits:</strong> {character.personality.traits.join(', ')}</li>
                        <li><strong>Quirks:</strong> {character.personality.quirks.join(', ')}</li>
                        <li><strong>Fears:</strong> {character.personality.fears.join(', ')}</li>
                        <li><strong>Motivations:</strong> {character.personality.motivations}</li>
                        <li><strong>Goals:</strong> {character.personality.goals}</li>
                    </ul>
                </section>

                <section>
                    <h3 className="font-cinzel text-xl text-teal-300 mb-2 border-b border-teal-500/20 pb-1">
                        Backstory
                        <RerollButton onClick={() => onReroll('backstory')} isLoading={isLoadingReroll === 'backstory'} />
                    </h3>
                    <p className="text-gray-300 whitespace-pre-wrap">{character.backstory}</p>
                </section>

                 <section>
                    <h3 className="font-cinzel text-xl text-teal-300 mb-2 border-b border-teal-500/20 pb-1">
                        Abilities & Skills
                        <RerollButton onClick={() => onReroll('abilities')} isLoading={isLoadingReroll === 'abilities'} />
                    </h3>
                    <div className="space-y-2">
                        {character.abilities.map(ability => (
                            <div key={ability.name}>
                                <strong className="text-teal-400">{ability.name}</strong> ({ability.type}, {ability.rarity})
                                <p className="text-sm text-gray-400 ml-2">{ability.effect}</p>
                            </div>
                        ))}
                    </div>
                </section>
                
                 <section>
                    <h3 className="font-cinzel text-xl text-teal-300 mb-2 border-b border-teal-500/20 pb-1">
                        Equipment
                        <RerollButton onClick={() => onReroll('equipment')} isLoading={isLoadingReroll === 'equipment'} />
                    </h3>
                    <p className="text-gray-300">{character.equipment.join(', ')}</p>
                </section>

                <section>
                    <h3 className="font-cinzel text-xl text-teal-300 mb-2 border-b border-teal-500/20 pb-1">
                        Relationships
                        <RerollButton onClick={() => onReroll('relationships')} isLoading={isLoadingReroll === 'relationships'} />
                    </h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                       {character.relationships.map(r => <li key={r.name}><strong>{r.name} ({r.role}):</strong> {r.description}</li>)}
                    </ul>
                </section>
                
                <section>
                    <h3 className="font-cinzel text-xl text-teal-300 mb-2 border-b border-teal-500/20 pb-1">
                        Plot Hooks
                         <RerollButton onClick={() => onReroll('plotHooks')} isLoading={isLoadingReroll === 'plotHooks'} />
                    </h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                       {character.plotHooks.map(hook => <li key={hook}>{hook}</li>)}
                    </ul>
                </section>

                <section>
                    <h3 className="font-cinzel text-xl text-teal-300 mb-2 border-b border-teal-500/20 pb-1">RPG Stats (d20)</h3>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-2 text-center">
                        {Object.entries(character.export.rpgStats).map(([stat, value]) => (
                             <div key={stat} className="bg-gray-700 p-2 rounded">
                                <p className="font-bold text-teal-400">{stat}</p>
                                <p className="text-xl">{value as unknown as string}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h3 className="font-cinzel text-xl text-teal-300 mb-2 border-b border-teal-500/20 pb-1">Image Prompt</h3>
                    <p className="text-sm text-gray-400 bg-gray-900 p-2 rounded font-mono">{character.export.imagePrompt}</p>
                </section>
            </div>

            <div className="mt-8 pt-4 border-t border-teal-500/20 text-center">
                <button onClick={onGenerateVariant} className="font-cinzel text-lg py-2 px-6 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-all duration-300">
                    Generate Variant
                </button>
            </div>
        </div>
    );
};

export default CharacterDossier;