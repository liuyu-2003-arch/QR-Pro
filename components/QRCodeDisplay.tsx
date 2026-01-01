
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
      <div className="flex flex-col items-center justify-center min-h-[360px] w-full border-2 border-dashed border-slate-200 rounded-[2rem] bg-slate-50/50 p-12 text-center group">
        <div className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
          <div className="w-10 h-10 border-4 border-slate-100 border-t-slate-200 rounded-full animate-spin"></div>
        </div>
        <h3 className="text-sm font-extrabold text-slate-400 uppercase tracking-widest mb-2">Stage Ready</h3>
        <p className="text-slate-400 font-medium text-xs max-w-[200px] leading-relaxed">Awaiting input content to render your high-fidelity code</p>
      </div>
    );
  }

  const shadowStyle = config.shadowEnabled 
    ? { boxShadow: `0 ${config.shadowAmount}px ${config.shadowAmount * 2}px rgba(0,0,0,${config.shadowAmount / 200})` }
    : {};

  return (
    <div className="flex flex-col items-center gap-8 w-full animate-in fade-in duration-700">
      <div 
        ref={canvasRef}
        className="relative group p-6 sm:p-8 transition-all duration-500 hover:scale-[1.03] border border-white shadow-sm overflow-hidden"
        style={{ 
          borderRadius: `${config.borderRadius}px`,
          backgroundColor: config.bgColor,
          ...shadowStyle
        }}
      >
        <QRCodeCanvas
          value={config.value}
          size={config.size}
          fgColor={config.fgColor}
          bgColor={config.bgColor}
          level={config.level}
          includeMargin={config.includeMargin}
          className="w-full h-full max-w-full"
          style={{ borderRadius: `${Math.max(0, config.borderRadius - 32)}px` }}
        />
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-slate-200/20 rounded-tl-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-slate-200/20 rounded-br-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
        <button
          onClick={downloadQR}
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-[10px] sm:text-[11px] uppercase tracking-widest py-4 px-4 rounded-2xl transition-all shadow-xl shadow-indigo-500/20 active:scale-95 whitespace-nowrap overflow-hidden"
        >
          <FileDown className="w-4 h-4 flex-shrink-0" />
          <span>Export PNG</span>
        </button>
        <button
          onClick={copyToClipboard}
          className={`flex items-center justify-center gap-2 border-2 font-black text-[10px] sm:text-[11px] uppercase tracking-widest py-4 px-4 rounded-2xl transition-all active:scale-95 whitespace-nowrap overflow-hidden ${copied ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-100 hover:border-slate-200'}`}
        >
          {copied ? <Check className="w-4 h-4 flex-shrink-0 animate-in zoom-in duration-300" /> : <Copy className="w-4 h-4 flex-shrink-0" />}
          <span>{copied ? 'Success' : 'Clipboard'}</span>
        </button>
      </div>
    </div>
  );
};

export default QRCodeDisplay;
