import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, AlertCircle, Eye, EyeOff, ArrowLeft, ShieldCheck } from 'lucide-react';
import { API_BASE_URL } from '../../utils/api';

export const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // If token exists, verify or navigate directly to dashboard
    const token = localStorage.getItem('adminToken');
    if (token) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError('Please enter both username and password');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed. Please check your credentials.');
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
    <div className="min-h-screen bg-[#F8F3EC] flex flex-col items-center justify-center p-4 sm:p-6 font-['Roboto',sans-serif] selection:bg-[#D7A65B] selection:text-white relative">
      {/* Background Decorative Gradient Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-[#D7A65B]/10 blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-[#6E1E18]/10 blur-3xl"></div>
      </div>

      {/* Back to Live Website Link */}
      <div className="w-full max-w-md mb-4 flex justify-between items-center relative z-10">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6E1E18] hover:text-[#4A0D0D] transition-colors px-3 py-1.5 rounded-full bg-white/60 hover:bg-white border border-[#E8D8C5] shadow-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Website</span>
        </Link>
        
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#8A5B1D] bg-[#F3D18A]/30 px-2.5 py-1 rounded-full border border-[#D7A65B]/30">
          <ShieldCheck className="w-3.5 h-3.5 text-[#C48B3C]" />
          <span>Secure Admin Portal</span>
        </span>
      </div>

      {/* Decorative top header element */}
      <div className="flex flex-col items-center mb-6 relative z-10">
        <div className="w-20 h-20 bg-white rounded-full p-2 flex items-center justify-center border-2 border-[#D7A65B] shadow-lg mb-3 ring-4 ring-[#D7A65B]/15">
          <img src="/logo.png" alt="Pheta By Nihar" className="w-full h-full object-contain mix-blend-multiply" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-wide text-[#6E1E18] text-center font-serif">
          Pheta By Nihar
        </h1>
        <p className="text-[11px] sm:text-xs text-[#C48B3C] font-semibold tracking-[0.2em] uppercase mt-1 text-center">
          Royal Maharashtrian Administration
        </p>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-[#FFFDFB] rounded-[24px] sm:rounded-[28px] border border-[#E8D8C5] shadow-2xl p-6 sm:p-8 relative overflow-hidden z-10">
        
        {/* Subtle royal top accent line */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#4A0D0D] via-[#D7A65B] to-[#4A0D0D]"></div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5 mt-1">
          <div className="text-center mb-1">
            <h2 className="text-xl sm:text-2xl font-bold text-[#4D2D22] font-serif">Welcome Back</h2>
            <p className="text-xs text-[#666666] mt-1">Sign in with your admin credentials to manage the portal</p>
          </div>

          {error && (
            <div className="flex items-start gap-2.5 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Username */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#4D2D22] uppercase tracking-wider">
              Admin Username
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#D7A65B]">
                <User className="w-4 h-4" />
              </span>
              <input
                type="text"
                autoComplete="username"
                placeholder="e.g. admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#F8F3EC]/70 border border-[#E8D8C5] rounded-xl text-sm focus:outline-none focus:border-[#6E1E18] focus:bg-white text-[#4D2D22] font-medium transition-colors"
                disabled={loading}
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#4D2D22] uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#D7A65B]">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-11 py-3 bg-[#F8F3EC]/70 border border-[#E8D8C5] rounded-xl text-sm focus:outline-none focus:border-[#6E1E18] focus:bg-white text-[#4D2D22] font-medium transition-colors"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#888888] hover:text-[#4D2D22] transition-colors cursor-pointer"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3.5 sm:py-4 mt-2 bg-gradient-to-r from-[#6E1E18] to-[#8A2B24] text-[#F3D18A] hover:text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-full shadow-lg hover:shadow-xl active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer border border-[#D7A65B]/40"
            disabled={loading}
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-[#F3D18A]/30 border-t-[#F3D18A] rounded-full animate-spin"></span>
            ) : (
              <span>Sign In to Dashboard</span>
            )}
          </button>
        </form>
      </div>

      <div className="mt-6 text-center text-[10px] text-[#999999] font-medium uppercase tracking-widest relative z-10">
        &copy; {new Date().getFullYear()} Pheta By Nihar &bull; All Rights Reserved
      </div>
    </div>
  );
};
