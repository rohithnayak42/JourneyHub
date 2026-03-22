import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, UserPlus, AlertCircle, Phone } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    setLoading(true);
    const { confirmPassword, ...dataToSend } = formData;
    const result = await registerUser(dataToSend);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f2f5f7] px-4 py-12">
      <div className="auth-form-container w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-secondary tracking-tight mb-2 italic">UTB</h1>
          <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
          <p className="text-gray-500 mt-1">Join the ultimate travel platform</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
            <AlertCircle size={20} />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Full Name</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                <User size={18} />
              </span>
              <input
                type="text"
                name="name"
                required
                className="input-field pl-11"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Email Address</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                <Mail size={18} />
              </span>
              <input
                type="email"
                name="email"
                required
                className="input-field pl-11"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Phone Number</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                <Phone size={18} />
              </span>
              <input
                type="tel"
                name="phone"
                required
                className="input-field pl-11"
                placeholder="+91 9876543210"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-400 mb-1.5 ml-1 text-gray-700">Password</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock size={18} />
              </span>
              <input
                type="password"
                name="password"
                required
                className="input-field pl-11"
                placeholder="Must be 6+ chars"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-400 mb-1.5 ml-1 text-gray-700">Confirm Password</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock size={18} />
              </span>
              <input
                type="password"
                name="confirmPassword"
                required
                className="input-field pl-11"
                placeholder="Repeat password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-primary hover:bg-secondary text-white font-bold py-3.5 rounded-lg transition-all shadow-xl shadow-primary/20 flex items-center justify-center space-x-2 mt-6 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <UserPlus size={20} />
                <span>Create Account</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-gray-500 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-bold hover:underline">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
