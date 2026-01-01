
import React from 'react';
import { QRConfig, ErrorCorrectionLevel } from '../types';
import { Palette, Maximize, ShieldCheck, Square, CornerUpLeft, Cloud, Check } from 'lucide-react';

interface Props {
  config: QRConfig;
  onChange: (config: QRConfig) => void;
}

const SettingsPanel: React.FC<Props> = ({ config, onChange }) => {
  const handleChange = (key: keyof QRConfig, value: any) => {
    onChange({ ...config, [key]: value });
  };

  return (
    <div className="space-y-8">
      {/* Colors Section */}
      <div className="space-y-4">
        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Colors & Palette</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[13px] font-bold text-slate-700">
              <Palette className="w-3.5 h-3.5 text-indigo-500" />
              Dots
            </label>
            <div className="flex items-center gap-3 p-2 bg-slate-50 border border-slate-200/60 rounded-xl transition-all hover:border-indigo-200">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-slate-200">
                <input
                  type="color"
                  value={config.fgColor}
                  onChange={(e) => handleChange('fgColor', e.target.value)}
                  className="absolute inset-0 w-[200%] h-[200%] translate-x-[-25%] translate-y-[-25%] cursor-pointer border-none bg-transparent"
                />
              </div>
              <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider">{config.fgColor}</span>
            </div>
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[13px] font-bold text-slate-700">
              <Square className="w-3.5 h-3.5 text-indigo-500" />
              Base
            </label>
            <div className="flex items-center gap-3 p-2 bg-slate-50 border border-slate-200/60 rounded-xl transition-all hover:border-indigo-200">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-slate-200">
                <input
                  type="color"
                  value={config.bgColor}
                  onChange={(e) => handleChange('bgColor', e.target.value)}
                  className="absolute inset-0 w-[200%] h-[200%] translate-x-[-25%] translate-y-[-25%] cursor-pointer border-none bg-transparent"
                />
              </div>
              <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider">{config.bgColor}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Geometry Section */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Structure</h4>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="flex items-center gap-2 text-[13px] font-bold text-slate-700">
              <Maximize className="w-3.5 h-3.5 text-indigo-500" />
              Scale
            </label>
            <span className="text-[10px] font-extrabold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{config.size}PX</span>
          </div>
          <input
            type="range"
            min="128"
            max="512"
            step="8"
            value={config.size}
            onChange={(e) => handleChange('size', parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="flex items-center gap-2 text-[13px] font-bold text-slate-700">
              <CornerUpLeft className="w-3.5 h-3.5 text-indigo-500" />
              Roundness
            </label>
            <span className="text-[10px] font-extrabold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{config.borderRadius}PX</span>
          </div>
          <input
            type="range"
            min="0"
            max="48"
            step="1"
            value={config.borderRadius}
            onChange={(e) => handleChange('borderRadius', parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>
      </div>

      {/* Effects Section */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Visual Effects</h4>
        
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 transition-all hover:bg-slate-100/50">
          <label className="flex items-center gap-3 text-[13px] font-bold text-slate-700 cursor-pointer">
            <Cloud className="w-4 h-4 text-indigo-500" />
            Elevation Shadow
          </label>
          <div className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={config.shadowEnabled}
              onChange={(e) => handleChange('shadowEnabled', e.target.checked)}
            />
            <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </div>
        </div>

        {config.shadowEnabled && (
          <div className="px-4 py-2 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Intensity</span>
              <span className="text-[10px] font-extrabold text-indigo-600">{config.shadowAmount}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="1"
              value={config.shadowAmount}
              onChange={(e) => handleChange('shadowAmount', parseInt(e.target.value))}
              className="w-full h-1.5 bg-indigo-50 rounded-lg appearance-none cursor-pointer accent-indigo-400"
            />
          </div>
        )}
      </div>

      {/* Advanced Section */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Scanning Engine</h4>
        
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-[13px] font-bold text-slate-700">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
            ECC Level
          </label>
          <div className="grid grid-cols-4 gap-2">
            {Object.values(ErrorCorrectionLevel).map((level) => (
              <button
                key={level}
                onClick={() => handleChange('level', level)}
                className={`py-2 px-1 rounded-xl text-[11px] font-black transition-all border-2 ${
                  config.level === level
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-100'
                    : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <label className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 transition-all hover:bg-slate-100/50 cursor-pointer">
          <span className="text-[13px] font-bold text-slate-700">Padding Margin</span>
          <div className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={config.includeMargin}
              onChange={(e) => handleChange('includeMargin', e.target.checked)}
            />
            <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default SettingsPanel;
