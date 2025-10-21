import React, { useState, useEffect } from 'react';
import { UserInput } from '../types';
import { SWORD_TYPES } from '../constants/swords';
import { CHARACTER_TYPES } from '../constants/characters';

interface InputFormProps {
    onGenerate: (input: UserInput) => void;
    isLoading: boolean;
    initialData?: UserInput;
}

const InputForm: React.FC<InputFormProps> = ({ onGenerate, isLoading, initialData }) => {
    const [role, setRole] = useState(initialData?.role || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [archetype, setArchetype] = useState(initialData?.archetype || '');
    const [goals, setGoals] = useState(initialData?.goals || '');
    const [tags, setTags] = useState(initialData?.tags || '');
    const [swordType, setSwordType] = useState(initialData?.swordType || '');
    const [storySummary, setStorySummary] = useState(initialData?.storySummary || '');
    const [characterRelationships, setCharacterRelationships] = useState(initialData?.characterRelationships || '');
    const [gender, setGender] = useState(initialData?.gender || '');
    const [race, setRace] = useState(initialData?.race || '');
    const [characterType, setCharacterType] = useState(initialData?.characterType || '');

    useEffect(() => {
        if (initialData) {
            setRole(initialData.role || '');
            setDescription(initialData.description || '');
            setArchetype(initialData.archetype || '');
            setGoals(initialData.goals || '');
            setTags(initialData.tags || '');
            setSwordType(initialData.swordType || '');
            setStorySummary(initialData.storySummary || '');
            setCharacterRelationships(initialData.characterRelationships || '');
            setGender(initialData.gender || '');
            setRace(initialData.race || '');
            setCharacterType(initialData.characterType || '');
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (role && description) {
            onGenerate({ role, description, archetype, goals, tags, swordType, storySummary, characterRelationships, gender, race, characterType });
        }
    };
    
    const isButtonDisabled = !role || !description || isLoading;

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-6 bg-gray-900/50 p-8 rounded-xl border border-teal-500/20 glow-border">
            <div>
                <label htmlFor="role" className="block text-lg font-cinzel text-teal-300 mb-2 text-glow">
                    Character Role / Class
                </label>
                <input
                    id="role"
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g., Cursed Knight, Arcane Trickster, Dragon Rider"
                    className="w-full bg-gray-800 border border-teal-800 rounded-md py-2 px-4 text-gray-200 focus:ring-2 focus:ring-teal-500 focus:outline-none transition"
                    disabled={isLoading}
                />
            </div>
            <div>
                <label htmlFor="description" className="block text-lg font-cinzel text-teal-300 mb-2 text-glow">
                    Brief Description
                </label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g., A disgraced noble seeking to reclaim their honor."
                    rows={3}
                    className="w-full bg-gray-800 border border-teal-800 rounded-md py-2 px-4 text-gray-200 focus:ring-2 focus:ring-teal-500 focus:outline-none transition"
                    disabled={isLoading}
                />
            </div>
            
            <details className="group" open={!!initialData}>
                <summary className="cursor-pointer text-md font-cinzel text-teal-400 list-none flex justify-between items-center">
                    Advanced Details (Optional)
                    <span className="transform transition-transform duration-200 group-open:rotate-90">&gt;</span>
                </summary>
                <div className="mt-4 space-y-4 border-t border-teal-500/20 pt-4">
                    <div className="grid md:grid-cols-2 gap-4">
                         <div>
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-300 mb-1">Gender</label>
                            <input id="gender" type="text" value={gender} onChange={(e) => setGender(e.target.value)} placeholder="e.g., Male, Female, Non-binary" className="w-full bg-gray-800 border border-teal-800 rounded-md py-2 px-4 text-gray-200 focus:ring-2 focus:ring-teal-500 focus:outline-none transition" disabled={isLoading} />
                        </div>
                         <div>
                            <label htmlFor="race" className="block text-sm font-medium text-gray-300 mb-1">Race</label>
                            <input id="race" type="text" value={race} onChange={(e) => setRace(e.target.value)} placeholder="e.g., Elf, Dwarf, Human" className="w-full bg-gray-800 border border-teal-800 rounded-md py-2 px-4 text-gray-200 focus:ring-2 focus:ring-teal-500 focus:outline-none transition" disabled={isLoading} />
                        </div>
                    </div>
                     <div>
                        <label htmlFor="characterType" className="block text-sm font-medium text-gray-300 mb-1">Character Type</label>
                        <select id="characterType" value={characterType} onChange={(e) => setCharacterType(e.target.value)} className="w-full bg-gray-800 border border-teal-800 rounded-md py-2 px-4 text-gray-200 focus:ring-2 focus:ring-teal-500 focus:outline-none transition" disabled={isLoading}>
                            <option value="">Any</option>
                            {CHARACTER_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                        </select>
                    </div>
                     <div>
                        <label htmlFor="archetype" className="block text-sm font-medium text-gray-300 mb-1">Archetype/Trope Variant</label>
                        <input id="archetype" type="text" value={archetype} onChange={(e) => setArchetype(e.target.value)} placeholder="e.g., Reluctant Redeemer, Jaded Healer" className="w-full bg-gray-800 border border-teal-800 rounded-md py-2 px-4 text-gray-200 focus:ring-2 focus:ring-teal-500 focus:outline-none transition" disabled={isLoading} />
                    </div>
                     <div>
                        <label htmlFor="goals" className="block text-sm font-medium text-gray-300 mb-1">Goals & Long-term Drives</label>
                        <input id="goals" type="text" value={goals} onChange={(e) => setGoals(e.target.value)} placeholder="e.g., To find a cure for a magical plague." className="w-full bg-gray-800 border border-teal-800 rounded-md py-2 px-4 text-gray-200 focus:ring-2 focus:ring-teal-500 focus:outline-none transition" disabled={isLoading} />
                    </div>
                    <div>
                        <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-1">Tags / Tones</label>
                        <input id="tags" type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="e.g., witty, brooding, tragic, optimistic" className="w-full bg-gray-800 border border-teal-800 rounded-md py-2 px-4 text-gray-200 focus:ring-2 focus:ring-teal-500 focus:outline-none transition" disabled={isLoading} />
                    </div>
                    <div>
                        <label htmlFor="swordType" className="block text-sm font-medium text-gray-300 mb-1">Preferred Sword Type</label>
                        <select id="swordType" value={swordType} onChange={(e) => setSwordType(e.target.value)} className="w-full bg-gray-800 border border-teal-800 rounded-md py-2 px-4 text-gray-200 focus:ring-2 focus:ring-teal-500 focus:outline-none transition" disabled={isLoading}>
                            <option value="">None specified</option>
                            {SWORD_TYPES.map(sword => <option key={sword} value={sword}>{sword}</option>)}
                        </select>
                    </div>
                     <div>
                        <label htmlFor="storySummary" className="block text-sm font-medium text-gray-300 mb-1">Story Summary</label>
                        <textarea id="storySummary" value={storySummary} onChange={(e) => setStorySummary(e.target.value)} placeholder="e.g., In a world where magic is fading..." rows={3} className="w-full bg-gray-800 border border-teal-800 rounded-md py-2 px-4 text-gray-200 focus:ring-2 focus:ring-teal-500 focus:outline-none transition" disabled={isLoading}/>
                    </div>
                     <div>
                        <label htmlFor="characterRelationships" className="block text-sm font-medium text-gray-300 mb-1">Character Relationships</label>
                        <textarea id="characterRelationships" value={characterRelationships} onChange={(e) => setCharacterRelationships(e.target.value)} placeholder="e.g., Mentor is the old wizard Elara." rows={3} className="w-full bg-gray-800 border border-teal-800 rounded-md py-2 px-4 text-gray-200 focus:ring-2 focus:ring-teal-500 focus:outline-none transition" disabled={isLoading}/>
                    </div>
                </div>
            </details>

            <button
                type="submit"
                disabled={isButtonDisabled}
                className={`w-full font-cinzel text-lg py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center
                    ${isButtonDisabled 
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                        : 'bg-teal-600 text-white hover:bg-teal-500 hover:shadow-lg hover:shadow-teal-500/30'}`}
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Forging Legend...
                    </>
                ) : (
                    initialData ? 'Regenerate Character' : 'Generate Character'
                )}
            </button>
        </form>
    );
};

export default InputForm;