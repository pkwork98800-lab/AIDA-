
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle, UserPlus, HeartPulse } from 'lucide-react';

export const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 mt-12">
      <div className="bg-blue-600 px-6 py-10 text-white text-center">
        <HeartPulse className="w-16 h-16 mx-auto mb-4 animate-pulse" />
        <h2 className="text-3xl font-bold">AI Doctor</h2>
        <p className="text-blue-100 mt-2 text-lg">Your personal health assistant</p>
      </div>
      
      <div className="p-8 space-y-4">
        <p className="text-slate-500 text-center mb-6">Choose how you'd like to continue</p>
        
        <button 
          onClick={() => navigate('/login')}
          className="w-full flex items-center justify-between bg-white border-2 border-slate-100 p-5 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <UserCircle size={24} />
            </div>
            <div className="text-left">
              <div className="font-bold text-slate-800">Existing User</div>
              <div className="text-xs text-slate-500">Sign in to your account</div>
            </div>
          </div>
          <div className="text-slate-300 group-hover:text-blue-500">→</div>
        </button>

        <button 
          onClick={() => navigate('/register')}
          className="w-full flex items-center justify-between bg-white border-2 border-slate-100 p-5 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 text-green-600 rounded-xl group-hover:bg-green-600 group-hover:text-white transition-colors">
              <UserPlus size={24} />
            </div>
            <div className="text-left">
              <div className="font-bold text-slate-800">New User</div>
              <div className="text-xs text-slate-500">Create a health profile</div>
            </div>
          </div>
          <div className="text-slate-300 group-hover:text-blue-500">→</div>
        </button>
      </div>
      
      <div className="p-6 bg-slate-50 border-t border-slate-100 text-center">
        <p className="text-xs text-slate-400">By continuing, you agree to our terms of service.</p>
      </div>
    </div>
  );
};
