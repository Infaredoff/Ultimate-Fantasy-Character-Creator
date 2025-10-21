import React, { useState } from 'react';
import { BeastInput } from '../types';
import { BEAST_AFFINITY, BEAST_ENVIRONMENT, BEAST_TAXONOMY } from '../constants/beasts';
import { DiceIcon } from './icons';

interface BeastInputFormProps {
    onGenerate: (input: BeastInput) => void;
    isLoading: boolean;
}

const BeastInputForm: React.FC<BeastInputFormProps> = ({ onGenerate, isLoading }) => {
    const [description, setDescription] = useState('');
    const [taxonomy, setTaxonomy] = useState('');
    const [affinity, setAffinity] = useState('');
    const [environment, setEnvironment] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onGenerate({ description, taxonomy, affinity, environment });
    };

    const isButtonDisabled = isLoading;

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-6 bg-gray-900/50 p-8 rounded-xl border border-teal-500/20 glow-border">
            <div>
                <label htmlFor="description" className="block text-lg font-cinzel text-teal-300 mb-2 text-glow">
                    Beast Description
                </label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your beast concept, or leave blank for a complete surprise. e.g., 'A creature made of living glass that hums with stored lightning.'"
                    rows={4}
                    className="w-full bg-gray-800 border border-teal-800 rounded-md py-2 px-4 text-gray-200 focus:ring-2 focus:ring-teal-500 focus:outline-none transition"
                    disabled={isLoading}
                />
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
                <div>
                    <label htmlFor="taxonomy" className="block text-sm font-medium text-gray-300 mb-1">Taxonomy (Optional)</label>
                    <select id="taxonomy" value={taxonomy} onChange={(e) => setTaxonomy(e.target.value)} className="w-full bg-gray-800 border border-teal-800 rounded-md py-2 px-4 text-gray-200 focus:ring-2 focus:ring-teal-500 focus:outline-none transition" disabled={isLoading}>
                        <option value="">Any</option>
                        {BEAST_TAXONOMY.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>
                 <div>
                    <label htmlFor="affinity" className="block text-sm font-medium text-gray-300 mb-1">Affinity (Optional)</label>
                    <select id="affinity" value={affinity} onChange={(e) => setAffinity(e.target.value)} className="w-full bg-gray-800 border border-teal-800 rounded-md py-2 px-4 text-gray-200 focus:ring-2 focus:ring-teal-500 focus:outline-none transition" disabled={isLoading}>
                        <option value="">Any</option>
                        {BEAST_AFFINITY.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                </div>
                 <div>
                    <label htmlFor="environment" className="block text-sm font-medium text-gray-300 mb-1">Environment (Optional)</label>
                    <select id="environment" value={environment} onChange={(e) => setEnvironment(e.target.value)} className="w-full bg-gray-800 border border-teal-800 rounded-md py-2 px-4 text-gray-200 focus:ring-2 focus:ring-teal-500 focus:outline-none transition" disabled={isLoading}>
                        <option value="">Any</option>
                        {BEAST_ENVIRONMENT.map(e => <option key={e} value={e}>{e}</option>)}
                    </select>
                </div>
            </div>

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
                        <DiceIcon className="animate-roll-dice -ml-1 mr-3 h-5 w-5 text-white" />
                        Summoning Beast...
                    </>
                ) : (
                    'Generate Beast'
                )}
            </button>
        </form>
    );
};

export default BeastInputForm;
