
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { PatientApp } from './components/patient/PatientApp';
import { AdminApp } from './components/admin/AdminApp';
import { Welcome } from './components/auth/Welcome';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { AdminLogin } from './components/auth/AdminLogin';
import { db } from './services/db';
import { Activity, LogOut, ShieldCheck } from 'lucide-react';
import { User } from './types';

function AppContent() {
  const [user, setUser] = useState<User | null>(db.getCurrentUser());
  const [isAdmin, setIsAdmin] = useState(sessionStorage.getItem('isAdmin') === 'true');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is logged in from session
    setIsAdmin(sessionStorage.getItem('isAdmin') === 'true');
  }, []);

  const handleLogout = () => {
    db.setCurrentUser(null);
    setUser(null);
    navigate('/');
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem('isAdmin');
    setIsAdmin(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Dynamic Navigation */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="bg-blue-600 p-2 rounded-lg">
            <Activity className="text-white w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">AI Doctor</h1>
        </div>
        
        <div className="flex items-center gap-4">
          {user && (
            <div className="flex items-center gap-4">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-sm font-bold text-slate-800">{user.name}</span>
                <span className="text-xs text-slate-500">{user.email}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-red-600 hover:bg-red-50 transition-all font-medium"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          )}
          {isAdmin && (
            <button 
              onClick={handleAdminLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-all font-medium"
            >
              <ShieldCheck size={18} />
              Admin Panel Logout
            </button>
          )}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-4 md:p-8">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={user ? <Navigate to="/app" /> : <Welcome />} />
          <Route path="/login" element={<Login onLogin={(u) => { db.setCurrentUser(u.id); setUser(u); navigate('/app'); }} />} />
          <Route path="/register" element={<Register onRegister={(u) => { db.setCurrentUser(u.id); setUser(u); navigate('/app'); }} />} />
          
          {/* Protected Patient Routes */}
          <Route path="/app" element={user ? <PatientApp /> : <Navigate to="/" />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={isAdmin ? <AdminApp /> : <AdminLogin onLogin={() => { setIsAdmin(true); navigate('/admin'); }} />} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      <footer className="py-8 text-center text-slate-400 text-sm border-t border-slate-200 mt-auto">
        <p>&copy; 2024 AI Doctor Bot. Medical Information for Educational Purposes Only.</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
