import React, { useState } from 'react';
import { User } from '../types';

interface LoginPageProps {
    onLogin: (user: User) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock login: In a real app, you'd verify credentials.
        // We'll derive an author name from the email for this mock.
        const authorName = email.split('@')[0] || 'Fantasy Writer';
        onLogin({ email, authorName });
    };

    const handleGoogleLogin = () => {
        // Mock Google login
        onLogin({ email: 'authormail@google.com', authorName: 'GoogleAuthor' });
    };


    return (
        <main className="container mx-auto px-4 py-16 flex flex-col items-center">
            <div className="w-full max-w-md">
                <h1 className="font-cinzel text-4xl text-center text-teal-200 text-glow mb-8">Login to Your Account</h1>
                
                <div className="bg-gray-900/50 p-8 rounded-xl border border-teal-500/20 glow-border">
                    <form onSubmit={handleEmailLogin} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 w-full bg-gray-800 border border-teal-800 rounded-md py-2 px-4 text-gray-200 focus:ring-2 focus:ring-teal-500 focus:outline-none transition"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password"className="block text-sm font-medium text-gray-300">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 w-full bg-gray-800 border border-teal-800 rounded-md py-2 px-4 text-gray-200 focus:ring-2 focus:ring-teal-500 focus:outline-none transition"
                                required
                            />
                        </div>
                        <button type="submit" className="w-full font-cinzel text-lg py-2 px-6 rounded-lg bg-teal-600 text-white hover:bg-teal-500 transition-all duration-300">
                            Login
                        </button>
                    </form>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-600"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
                        </div>
                    </div>

                    <div>
                        <button onClick={handleGoogleLogin} className="w-full flex justify-center items-center py-2 px-4 border border-gray-600 rounded-md shadow-sm bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /><path d="M1 1h22v22H1z" fill="none" />
                            </svg>
                            <span>Sign in with Google</span>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default LoginPage;
