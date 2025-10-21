import React from 'react';

const ContactPage: React.FC = () => {
    return (
        <main className="container mx-auto px-4 py-16 flex flex-col items-center">
            <div className="w-full max-w-2xl text-center">
                <h1 className="font-cinzel text-5xl font-bold text-teal-200 text-glow mb-8">
                    Contact Us
                </h1>
                <div className="bg-gray-900/50 p-8 rounded-xl border border-teal-500/20 glow-border space-y-4 text-lg text-gray-300">
                    <p>
                        Have questions, feedback, or a brilliant idea? We'd love to hear from you.
                    </p>
                    <p>
                        The best way to reach out is by email. Click the link below to open your email client.
                    </p>
                    <a 
                        href="mailto:infaredofficially@gmail.com"
                        className="inline-block mt-4 font-cinzel text-xl py-3 px-8 rounded-lg bg-teal-600 text-white hover:bg-teal-500 hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-300"
                    >
                        infaredofficially@gmail.com
                    </a>
                </div>
            </div>
        </main>
    );
};

export default ContactPage;
