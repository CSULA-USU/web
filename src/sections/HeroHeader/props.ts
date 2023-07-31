import { Departments } from '../../types';

export interface HeroHeaderProps {
  subtleBackground?:
    | 'subtle-background-1'
    | 'subtle-background-2'
    | 'subtle-background-3'
    | 'subtle-background-4';
  title: string;
  description?: string;
  department?: Departments;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  address?: string;
  phoneNumber?: string;
  hours?: { title: string; times: string[] }[];
}
