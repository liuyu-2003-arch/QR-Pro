
import React, { useRef, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Copy, Check, FileDown } from 'lucide-react';
import { QRConfig } from '../types';

interface Props {
  config: QRConfig;
}

const QRCodeDisplay: React.FC<Props> = ({ config }) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const downloadQR = () => {
    const canvas = canvasRef.current?.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = `qr-pro-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const copyToClipboard = async () => {
    const canvas = canvasRef.current?.querySelector('canvas');
    if (canvas) {
      canvas.toBlob(async (blob) => {
        if (blob) {
          try {
            await navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob })
            ]);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          } catch (err) {
            console.error('Failed to copy image', err);
          }
        }
      });
    }
  };

  if (!config.value) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] w-full border-2 border-dashed border-slate-200 rounded-[2rem] bg-slate-50/50 p-8 text-center group">
        <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
          <div className="w-8 h-8 border-2 border-slate-100 border-t-indigo-500 rounded-full animate-spin"></div>
        </div>
        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Ready to render</p>
      </div>
    );
  }

  const shadowStyle = config.shadowEnabled 
    ? { boxShadow: `0 ${config.shadowAmount}px ${config.shadowAmount * 2}px rgba(0,0,0,${config.shadowAmount / 300})` }
    : {};

  return (
    <div className="flex flex-col items-center gap-8 w-full animate-in fade-in duration-500">
      <div 
        ref={canvasRef}
        className="relative group p-4 sm:p-6 transition-all duration-300 border border-white shadow-sm overflow-hidden"
        style={{ 
          borderRadius: `${config.borderRadius}px`,
          backgroundColor: config.bgColor,
          ...shadowStyle
        }}
      >
        <QRCodeCanvas
          value={config.value}
          size={Math.min(config.size, 300)}
          fgColor={config.fgColor}
          bgColor={config.bgColor}
          level={config.level}
          includeMargin={config.includeMargin}
          className="w-full h-full max-w-[280px] sm:max-w-none"
          style={{ borderRadius: `${Math.max(0, config.borderRadius - 20)}px` }}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-[320px]">
        <button
          onClick={downloadQR}
          className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-[10px] uppercase tracking-widest py-3 px-4 rounded-xl transition-all shadow-lg shadow-indigo-200 active:scale-95"
        >
          <FileDown className="w-3.5 h-3.5 flex-shrink-0" />
          <span>Save PNG</span>
        </button>
        <button
          onClick={copyToClipboard}
          className={`flex-1 flex items-center justify-center gap-2 border-2 font-black text-[10px] uppercase tracking-widest py-3 px-4 rounded-xl transition-all active:scale-95 ${copied ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-100'}`}
        >
          {copied ? <Check className="w-3.5 h-3.5 flex-shrink-0" /> : <Copy className="w-3.5 h-3.5 flex-shrink-0" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
    </div>
  );
};

export default QRCodeDisplay;
