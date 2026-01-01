
import React, { useState } from 'react';
import { Scan, Info, LayoutGrid, Settings2, Github, ExternalLink, Globe, BookOpen, Cpu, Zap, Wand2, Loader2 } from 'lucide-react';
import { QRConfig, ErrorCorrectionLevel } from './types';
import QRCodeDisplay from './components/QRCodeDisplay';
import SettingsPanel from './components/SettingsPanel';
import { analyzeContent } from './services/geminiService';

const MAIN_DOMAIN = '324893.xyz';
const APP_URL = 'qr.324893.xyz';

const App: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [config, setConfig] = useState<QRConfig>({
    value: '',
    size: 256,
    fgColor: '#000000',
    bgColor: '#ffffff',
    level: ErrorCorrectionLevel.M,
    includeMargin: true,
    borderRadius: 0,
    shadowEnabled: false,
    shadowAmount: 10
  });

  // Function to call Gemini for content optimization
  const handleAIHelp = async () => {
    if (!config.value || isAnalyzing) return;
    setIsAnalyzing(true);
    try {
      const result = await analyzeContent(config.value);
      setConfig(prev => ({
        ...prev,
        value: result.optimizedValue
      }));
    } catch (error) {
      console.error("AI Analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Dynamic Background Element */}
      <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-200/20 blur-[120px] rounded-full -z-10 animate-pulse"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-200/20 blur-[120px] rounded-full -z-10 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <header className="sticky top-0 z-50 glass-card px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.location.reload()}>
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500 blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
              <div className="relative w-11 h-11 bg-slate-900 rounded-2xl flex items-center justify-center shadow-2xl group-hover:rotate-6 transition-transform">
                <Scan className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight leading-none">QR PRO</h1>
              <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest mt-1 opacity-80">{APP_URL}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-6">
            <nav className="hidden lg:flex items-center gap-8 text-[13px] font-bold text-slate-500 uppercase tracking-wider">
              <a href={`https://${MAIN_DOMAIN}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-indigo-600 transition-colors">
                <Globe className="w-4 h-4" /> Hub
              </a>
              <a href="#" className="flex items-center gap-2 hover:text-indigo-600 transition-colors">
                <Cpu className="w-4 h-4" /> API
              </a>
              <a href="#" className="flex items-center gap-2 hover:text-indigo-600 transition-colors">
                <BookOpen className="w-4 h-4" /> Docs
              </a>
            </nav>
            <div className="hidden sm:block h-6 w-[1px] bg-slate-200/60 mx-2"></div>
            <div className="flex items-center gap-2">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2.5 text-slate-400 hover:text-slate-900 glass-card rounded-xl transition-all hover:scale-110"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href={`https://${MAIN_DOMAIN}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-[13px] font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 group"
              >
                Go Hub
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Workspace Area */}
        <div className="lg:col-span-8 space-y-8">
          {/* Main Input Card */}
          <section className="glass-card rounded-[2.5rem] shadow-xl shadow-indigo-500/5 p-6 md:p-10 transition-all hover:shadow-2xl hover:shadow-indigo-500/10">
            <div className="flex items-center gap-4 mb-8">
              <button 
                onClick={handleAIHelp}
                disabled={!config.value || isAnalyzing}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isAnalyzing ? 'bg-indigo-100 animate-pulse' : 'bg-indigo-50 hover:bg-indigo-100 active:scale-95 shadow-lg shadow-indigo-500/10'} disabled:opacity-50 disabled:cursor-not-allowed group/wand`}
                title="AI Magic Fix"
              >
                {isAnalyzing ? (
                  <Loader2 className="w-6 h-6 text-indigo-600 animate-spin" />
                ) : (
                  <Wand2 className="w-6 h-6 text-indigo-600 group-hover/wand:rotate-12 transition-transform" />
                )}
              </button>
              <div>
                <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">Source Material</h2>
                <p className="text-xs text-slate-500 font-medium">Text, URLs, or any content to encode</p>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur opacity-0 group-focus-within:opacity-10 transition duration-500"></div>
              <textarea
                value={config.value}
                onChange={(e) => setConfig({ ...config, value: e.target.value })}
                placeholder="Paste or type your content here..."
                className="relative w-full min-h-[180px] p-8 text-lg font-medium bg-white/50 border border-slate-200/60 rounded-[2rem] focus:ring-0 focus:border-indigo-500/50 transition-all resize-none placeholder:text-slate-300 custom-scrollbar shadow-inner"
              />
              <div className="absolute bottom-6 right-8 flex items-center gap-2 text-[11px] font-bold text-slate-400">
                <Zap className={`w-3 h-3 ${isAnalyzing ? 'text-indigo-500 animate-bounce' : 'text-yellow-500'}`} />
                {config.value.length} CHARS
              </div>
            </div>
          </section>

          {/* Customize Section */}
          <section className="glass-card rounded-[2.5rem] shadow-lg shadow-slate-500/5 p-8 border border-white">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center">
                <Settings2 className="w-5 h-5 text-slate-600" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-800 tracking-tight">Customize Appearance</h3>
            </div>
            <SettingsPanel config={config} onChange={setConfig} />
          </section>
        </div>

        {/* Studio Preview Column */}
        <div className="lg:col-span-4 lg:sticky lg:top-[100px] self-start space-y-6">
          <section className="glass-card rounded-[2.5rem] shadow-2xl shadow-indigo-500/10 border-2 border-white p-6 sm:p-10 flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-10 px-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                <span className="text-[11px] font-extrabold text-indigo-500 tracking-widest uppercase">Live View</span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-100"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-slate-100"></div>
              </div>
            </div>
            
            {/* The QR Stage */}
            <div className="relative group w-full flex justify-center py-6">
              <div className="absolute inset-0 bg-slate-50/50 rounded-3xl -z-10 opacity-40 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none border border-slate-200/30 rounded-3xl"></div>
              <QRCodeDisplay config={config} />
            </div>
            
            <div className="mt-10 w-full p-5 bg-slate-50/50 rounded-2xl border border-slate-100">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Info className="w-4 h-4 text-indigo-600" />
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
                  Supports High Density (V40). Static generation ensures 100% offline compatibility.
                </p>
              </div>
            </div>
          </section>
          
          <div className="px-6 py-4 glass-card rounded-2xl border border-white/50 flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">System Status</span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-emerald-500">OPTIMAL</span>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
            </div>
          </div>
        </div>
      </main>

      {/* Modern Footer */}
      <footer className="mt-20 border-t border-slate-200/60 bg-white/40 backdrop-blur-md py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
                  <Scan className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-black tracking-tight text-slate-900">QR PRO</span>
              </div>
              <p className="text-slate-500 text-sm max-w-sm leading-relaxed font-medium">
                Designing the future of content sharing. Part of the <a href={`https://${MAIN_DOMAIN}`} className="text-indigo-600 font-bold hover:underline">{MAIN_DOMAIN}</a> ecosystem for high-utility web applications.
              </p>
              <div className="flex gap-4 mt-8">
                <a href="#" className="w-10 h-10 glass-card rounded-xl flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:scale-110 transition-all"><Github className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 glass-card rounded-xl flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:scale-110 transition-all"><Globe className="w-5 h-5" /></a>
              </div>
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 mb-6 text-xs uppercase tracking-widest">Platform</h4>
              <ul className="space-y-4 text-sm text-slate-500 font-bold">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Tools Directory</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Standard QR</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Privacy First</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 mb-6 text-xs uppercase tracking-widest">Resources</h4>
              <ul className="space-y-4 text-sm text-slate-500 font-bold">
                <li><a href={`https://${MAIN_DOMAIN}`} className="hover:text-indigo-600 transition-colors">Hub Home</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">System Status</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-10 border-t border-slate-100/50 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <span>© 2024 QR PRO</span>
              <span className="opacity-30">•</span>
              <span>ENGINEERED BY <a href={`https://${MAIN_DOMAIN}`} className="text-slate-500 hover:text-indigo-600">{MAIN_DOMAIN.toUpperCase()}</a></span>
            </div>
            <div className="flex gap-10 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              <a href="#" className="hover:text-indigo-600">Privacy</a>
              <a href="#" className="hover:text-indigo-600">Terms</a>
              <a href="#" className="hover:text-indigo-600">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
