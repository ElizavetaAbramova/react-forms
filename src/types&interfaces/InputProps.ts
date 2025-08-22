import type { ReactNode } from 'react';

export interface InputProps {
  value: string;
  onChange: (value: string) => void;
  children?: ReactNode;
}
