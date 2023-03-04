import { ButtonProps, Divider, FluidContainer, Typography } from 'components';
import { DownloadSection } from 'modules';
import { Spaces } from 'theme';

export interface FormSectionProps {
  forms: Form[];
  sectionTitle?: string;
}

export interface Form {
  title?: string;
  children?: React.ReactNode;
  button?: ButtonProps;
}

export const FormsSection = ({ forms, sectionTitle }: FormSectionProps) => (
  <FluidContainer>
    <Typography variant="title" as="h2">
      {sectionTitle}
    </Typography>
    <Divider color="grey" margin={`${Spaces.xl} 0`} />
    {forms.map((d) => (
      <DownloadSection key={d.title} {...d} />
    ))}
  </FluidContainer>
);
