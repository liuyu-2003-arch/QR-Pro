
import React, { useState } from 'react';
import { Scan, Info, Settings2, Github, ExternalLink, Globe, BookOpen, Cpu, Zap, Wand2 } from 'lucide-react';
import { QRConfig, ErrorCorrectionLevel } from './types';
import QRCodeDisplay from './components/QRCodeDisplay';
import SettingsPanel from './components/SettingsPanel';

const MAIN_DOMAIN = '324893.xyz';
const APP_URL = 'qr.324893.xyz';

const App: React.FC = () => {
  const [config, setConfig] = useState<QRConfig>({
    value: '',
    size: 256,
    fgColor: '#000000',
    bgColor: '#ffffff',
    level: ErrorCorrectionLevel.M,
    includeMargin: true,
    borderRadius: 16,
    shadowEnabled: true,
    shadowAmount: 15
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Background Decor */}
      <div className="fixed top-[-5%] right-[-5%] w-[40%] h-[40%] bg-indigo-200/20 blur-[100px] rounded-full -z-10"></div>
      <div className="fixed bottom-[-5%] left-[-5%] w-[30%] h-[30%] bg-blue-200/20 blur-[100px] rounded-full -z-10"></div>

      <header className="sticky top-0 z-50 glass-card px-4 sm:px-6 py-4 shadow-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.location.reload()}>
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500 blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform">
                <Scan className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="hidden xs:block">
              <h1 className="text-lg font-extrabold text-slate-900 tracking-tight leading-none">QR PRO</h1>
              <p className="text-[9px] text-indigo-600 font-bold uppercase tracking-widest mt-0.5 opacity-80">{APP_URL}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-6">
            <nav className="hidden md:flex items-center gap-6 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <a href={`https://${MAIN_DOMAIN}`} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">Hub</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">API</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Docs</a>
            </nav>
            <div className="flex items-center gap-2">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-slate-400 hover:text-slate-900 transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href={`https://${MAIN_DOMAIN}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-[12px] font-bold rounded-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 group"
              >
                Go Hub
                <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full p-4 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Input & Customization Column */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8">
          {/* Main Input */}
          <section className="glass-card rounded-3xl shadow-xl shadow-indigo-500/5 p-6 sm:p-8 border border-white/40">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                <Wand2 className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-slate-800 tracking-tight">Source Material</h2>
                <p className="text-[11px] text-slate-500 font-medium">Text or URLs to encode</p>
              </div>
            </div>
            
            <div className="relative group">
              <textarea
                value={config.value}
                onChange={(e) => setConfig({ ...config, value: e.target.value })}
                placeholder="Paste or type your content here..."
                className="w-full min-h-[160px] p-6 text-base font-medium bg-white/40 border border-slate-200/50 rounded-2xl focus:ring-0 focus:border-indigo-500/40 transition-all resize-none placeholder:text-slate-300 custom-scrollbar shadow-inner"
              />
              <div className="absolute bottom-4 right-6 flex items-center gap-2 text-[10px] font-bold text-slate-400">
                <Zap className="w-3 h-3 text-yellow-500" />
                {config.value.length} CHARS
              </div>
            </div>
          </section>

          {/* Settings */}
          <section className="glass-card rounded-3xl shadow-lg shadow-slate-500/5 p-6 sm:p-8 border border-white/40">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center">
                <Settings2 className="w-4 h-4 text-slate-600" />
              </div>
              <h3 className="text-md font-extrabold text-slate-800 tracking-tight">Appearance</h3>
            </div>
            <SettingsPanel config={config} onChange={setConfig} />
          </section>
        </div>

        {/* Live Preview Column */}
        <div className="lg:col-span-5 lg:sticky lg:top-[100px] self-start">
          <section className="glass-card rounded-3xl shadow-2xl shadow-indigo-500/10 border-2 border-white p-6 sm:p-10 flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-8 px-1">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></div>
                <span className="text-[10px] font-extrabold text-indigo-500 tracking-widest uppercase">Live View</span>
              </div>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-slate-100"></div>
                <div className="w-2 h-2 rounded-full bg-slate-100"></div>
              </div>
            </div>
            
            <div className="w-full flex justify-center py-4 sm:py-6">
              <QRCodeDisplay config={config} />
            </div>
            
            <div className="mt-8 w-full p-4 bg-slate-50/50 rounded-xl border border-slate-100">
              <div className="flex gap-3">
                <Info className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">
                  Standard static QR code generation. Safe, secure, and permanent.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200/60 bg-white/40 backdrop-blur-md py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
              <Scan className="w-4 h-4 text-white" />
            </div>
            <span className="text-md font-black tracking-tight text-slate-900 uppercase">QR PRO</span>
          </div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center md:text-left">
            © 2024 BY <a href={`https://${MAIN_DOMAIN}`} className="text-slate-500 hover:text-indigo-600 transition-colors">{MAIN_DOMAIN}</a>
          </div>
          <div className="flex gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <a href="#" className="hover:text-indigo-600">Privacy</a>
            <a href="#" className="hover:text-indigo-600">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
