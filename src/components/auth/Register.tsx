
import React, { useState } from 'react';
import { db } from '../../services/db';
import { User } from '../../types';
import { UserPlus, Mail, Lock, User as UserIcon, Calendar, HeartPulse } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RegisterProps {
  onRegister: (user: User) => void;
}

export const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    gender: 'Male',
    allergies: '',
    medications: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user already exists
    if (db.getUserByEmail(formData.email)) {
      alert('Email already registered');
      return;
    }

    const newUser = db.addUser({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      age: parseInt(formData.age),
      gender: formData.gender,
      allergies: formData.allergies.split(',').map(s => s.trim()).filter(Boolean),
      medications: formData.medications.split(',').map(s => s.trim()).filter(Boolean),
    });

    onRegister(newUser);
  };

  return (
    <div className="max-w-xl mx-auto mt-6">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        <div className="bg-blue-600 p-6 text-white text-center">
          <HeartPulse className="w-10 h-10 mx-auto mb-2" />
          <h2 className="text-2xl font-bold">Create Health Profile</h2>
          <p className="text-blue-100 text-sm">Join Dr. AI for personalized consultations</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input name="name" required className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="John Doe" onChange={handleChange} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input name="email" type="email" required className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="john@example.com" onChange={handleChange} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input name="password" type="password" required className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="••••••••" onChange={handleChange} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Age</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input name="age" type="number" required className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="30" onChange={handleChange} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
              <select name="gender" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none" onChange={handleChange}>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Allergies (comma separated)</label>
            <input name="allergies" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Peanuts, Penicillin" onChange={handleChange} />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Current Medications</label>
            <input name="medications" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Aspirin, Vitamin D" onChange={handleChange} />
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2 mt-4">
            <UserPlus size={20} />
            Create Account
          </button>
        </form>

        <div className="p-6 bg-slate-50 border-t border-slate-100 text-center">
          <p className="text-slate-500 text-sm">
            Already have an account?{' '}
            <button onClick={() => navigate('/login')} className="text-blue-600 font-bold hover:underline">Sign In</button>
          </p>
        </div>
      </div>
    </div>
  );
};
