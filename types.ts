
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
