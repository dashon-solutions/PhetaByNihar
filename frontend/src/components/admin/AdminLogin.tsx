import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Crown, AlertCircle } from 'lucide-react';
import { API_BASE_URL } from '../../utils/api';

export const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // If token exists, check verify or navigate directly to dashboard
    const token = localStorage.getItem('adminToken');
    if (token) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminUser', JSON.stringify(data.admin));
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to authenticate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F3EC] flex flex-col items-center justify-center p-4 selection:bg-[#D7A65B] selection:text-white">
      
      {/* Decorative top header element */}
      <div className="flex flex-col items-center mb-8 relative z-10">
        <div className="w-16 h-16 bg-[#6E1E18] rounded-full flex items-center justify-center border-2 border-[#D7A65B] shadow-lg mb-4">
          <Crown className="w-8 h-8 text-[#D7A65B]" />
        </div>
        <h1 className="font-serif text-3xl font-bold tracking-wide text-[#6E1E18] text-center">
          Pheta By Nihar
        </h1>
        <p className="font-sans text-xs text-[#C48B3C] font-semibold tracking-[0.2em] uppercase mt-1">
          Administration Portal
        </p>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-[#FFFDFB] rounded-[24px] border border-[#E8D8C5] shadow-2xl p-8 relative overflow-hidden">
        
        {/* Subtle royal divider pattern top of card */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#6E1E18]"></div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="text-center mb-2">
            <h2 className="font-serif text-xl font-bold text-[#4D2D22]">Welcome Back</h2>
            <p className="font-sans text-xs text-[#666666] mt-1">Sign in with client dashboard credentials</p>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-sans font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          {/* Username */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">
              Username
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#999999]">
                <User className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B] focus:ring-1 focus:ring-[#D7A65B] text-text-gray font-medium transition-colors"
                disabled={loading}
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-sans font-bold text-[#4D2D22] uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#999999]">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#F8F3EC] border border-[#E8D8C5] rounded-xl font-sans text-sm focus:outline-none focus:border-[#D7A65B] focus:ring-1 focus:ring-[#D7A65B] text-text-gray font-medium transition-colors"
                disabled={loading}
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3.5 mt-2 bg-[#6E1E18] text-[#FFFDFB] font-sans font-bold text-sm uppercase tracking-wider rounded-xl shadow-md hover:bg-[#7D201D] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <span>Access Dashboard</span>
            )}
          </button>
        </form>
      </div>

      <div className="mt-8 text-center text-[10px] text-[#999999] font-sans font-medium uppercase tracking-widest">
        &copy; {new Date().getFullYear()} Pheta By Nihar. All Rights Reserved.
      </div>
    </div>
  );
};
