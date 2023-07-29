export type CallToActionProps = {
  variant: 'gold' | 'black';
  backgroundImage?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  primaryButtonText: string;
  primaryButtonHref: string;
};
