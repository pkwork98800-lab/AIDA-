
import React, { useState, useEffect } from 'react';
import { Consultation, Message } from '../../types';
import { db } from '../../services/db';
import { medicalBot } from '../../services/medicalBot';
import { Send, History, PlusCircle, MessageCircle, Calendar, ChevronRight, HeartPulse } from 'lucide-react';

export const PatientApp: React.FC = () => {
  const user = db.getCurrentUser();
  const [consultation, setConsultation] = useState<Consultation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<Consultation[]>([]);

  useEffect(() => {
    if (user) {
      setHistory(db.getConsultationsByUser(user.id));
    }
  }, [user, consultation]);

  const startConsultation = () => {
    if (!user) return;
    const newConsult = db.startConsultation(user.id);
    setConsultation(newConsult);
    
    // Bot greeting
    const greeting = `Hello ${user.name}! I'm Dr. AI. I'm here to help you understand your symptoms. What's bothering you today?`;
    db.addMessage(newConsult.id, 'bot', greeting);
    setMessages(db.getMessages(newConsult.id));
  };

  const viewConsultation = (c: Consultation) => {
    setConsultation(c);
    setMessages(db.getMessages(c.id));
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !consultation || loading) return;

    const userMsg = input;
    setInput('');
    setLoading(true);

    await medicalBot.processMessage(consultation.id, userMsg);
    
    setMessages(db.getMessages(consultation.id));
    setConsultation(db.getConsultation(consultation.id) || null);
    setLoading(false);
  };

  if (!user) {
    return <div className="text-center p-10">Please log in to continue.</div>;
  }

  if (!consultation) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 py-6">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-10 rounded-3xl shadow-xl text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold">Hello, {user.name}!</h2>
            <p className="text-blue-100 mt-2 text-lg max-w-md">How are you feeling today? You can start a new consultation or review your history below.</p>
            <button 
              onClick={startConsultation}
              className="mt-8 bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg transition-all transform hover:scale-105 flex items-center gap-2"
            >
              <PlusCircle size={22} />
              Start New Consultation
            </button>
          </div>
          <HeartPulse className="absolute -right-10 -bottom-10 w-64 h-64 text-white/10 rotate-12" />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <History className="text-blue-600" size={24} />
              Consultation History
            </h3>
            <span className="text-sm text-slate-500 font-medium">{history.length} Previous Sessions</span>
          </div>

          {history.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {history.map((c) => (
                <button
                  key={c.id}
                  onClick={() => viewConsultation(c)}
                  className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all text-left group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="bg-blue-50 p-2 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <MessageCircle size={20} />
                    </div>
                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${
                      c.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {c.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-800 line-clamp-1">
                    {c.diagnosis || c.chiefComplaint || 'New Consultation'}
                  </h4>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-400 text-xs">
                      <Calendar size={14} />
                      {new Date(c.timestamp).toLocaleDateString()}
                    </div>
                    <div className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronRight size={20} />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-3xl border border-dashed border-slate-300 text-center space-y-4">
              <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <History size={32} />
              </div>
              <div>
                <p className="text-slate-800 font-bold">No history yet</p>
                <p className="text-slate-500 text-sm">Your medical consultations will appear here.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-12rem)] flex flex-col bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
      <header className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">DR</div>
          <div>
            <h3 className="font-bold text-slate-800">Dr. AI Assistant</h3>
            {consultation.status === 'active' ? (
              <span className="text-xs text-green-500 font-medium flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Active Assessment
              </span>
            ) : (
              <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                <span className="w-2 h-2 bg-slate-300 rounded-full"></span>
                Session Completed
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={startConsultation} 
            title="Start New Conversation"
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-all"
          >
            <PlusCircle size={22} />
          </button>
          <button 
            onClick={() => setConsultation(null)} 
            title="Go Back"
            className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-all"
          >
            <History size={22} />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
              m.type === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-white border border-slate-100 text-slate-800 rounded-tl-none'
            }`}>
              <div className="whitespace-pre-wrap leading-relaxed">{m.content}</div>
              <div className={`text-[10px] mt-1 opacity-50 ${m.type === 'user' ? 'text-right' : 'text-left'}`}>
                {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex gap-1">
              <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce delay-75"></span>
              <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce delay-150"></span>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-100">
        <div className="relative flex items-center gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={consultation.status === 'completed'}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
            placeholder={consultation.status === 'completed' ? "Consultation completed" : "Describe your symptoms or answer the doctor..."}
            className="w-full px-4 py-3 bg-slate-100 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none resize-none disabled:opacity-50"
            rows={2}
          />
          <button 
            type="submit" 
            disabled={!input.trim() || consultation.status === 'completed' || loading}
            className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-all shadow-lg shadow-blue-100"
          >
            <Send size={24} />
          </button>
        </div>
      </form>
    </div>
  );
};
