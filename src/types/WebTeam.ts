export interface WebTeamMember {
  id: string;
  name: string;
  initials: string;
  year: string;
  role: string;
  bio: string;
  contributions: string;
  linkedInHref?: string;
  portfolioHref?: string;
  emailHref?: string;
  gradientStart?: string;
  gradientEnd?: string;
}

export interface WebTeamStaffMember {
  id: string;
  name: string;
  initials: string;
  badgeLabel: string;
  badgeVariant?: 'primary' | 'muted';
  title: string;
  bio: string;
  awards: string[];
  emailHref?: string;
  phoneHref?: string;
  linkedInHref?: string;
  portfolioHref?: string;
  gradientStart?: string;
  gradientEnd?: string;
}

export interface WebTeamTrait {
  number: string;
  title: string;
  description: string;
  icon: string;
  why: string;
}
