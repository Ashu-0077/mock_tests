import { useState } from 'react';
import { Lock, Mail } from 'lucide-react';

interface LoginProps {
  onLogin: (email: string) => void;
}

// Allowed users - update this list with your students' emails
const ALLOWED_USERS = [
  'student1@gmail.com',
  'student2@gmail.com',
  'student3@gmail.com',
  // Add more emails here
];

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Simple validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Check if email is allowed
    if (!ALLOWED_USERS.includes(email)) {
      setError('Email not registered. Contact admin.');
      return;
    }

    // Check password (use a real backend for production!)
    if (password !== 'UPSC2024') {
      setError('Incorrect password');
      return;
    }

    // Store login info
    localStorage.setItem('mock_tests_user', JSON.stringify({
      email,
      loginTime: new Date().toISOString(),
    }));

    onLogin(email);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4">
            <Lock className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Mock Tests</h1>
          <p className="text-blue-100">UPSC Prelims 2021 CBT Simulator</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="bg-white rounded-lg shadow-xl p-8">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Email Input */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin(e as any)}
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
          >
            Sign In
          </button>

          {/* Demo Note */}
          <p className="mt-4 text-center text-gray-600 text-sm">
            Demo: student1@gmail.com / UPSC2024
          </p>
        </form>

        {/* Footer */}
        <p className="text-center text-blue-100 mt-6 text-sm">
          © 2024 UPSC Mock Tests. All rights reserved.
        </p>
      </div>
    </div>
  );
}
