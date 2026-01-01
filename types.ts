
export enum ErrorCorrectionLevel {
  L = 'L',
  M = 'M',
  Q = 'Q',
  H = 'H'
}

export interface QRConfig {
  value: string;
  size: number;
  fgColor: string;
  bgColor: string;
  level: ErrorCorrectionLevel;
  includeMargin: boolean;
  borderRadius: number;
  shadowEnabled: boolean;
  shadowAmount: number;
}

export interface HistoryItem extends QRConfig {
  id: string;
  timestamp: number;
  title: string;
}

/**
 * Interface for AI-generated analysis of QR code content
 */
export interface AIAnalysis {
  optimizedValue: string;
  suggestedTitle: string;
  summary: string;
}
