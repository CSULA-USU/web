import { ButtonProps, Divider, FluidContainer, Typography } from 'components';
import { DownloadSection } from 'modules';
import { Spaces } from 'theme';
import { useBreakpoint } from 'hooks';
import styled from 'styled-components';

export interface FormSectionProps {
  forms: Form[];
  sectionTitle?: string;
}

export interface Form {
  title?: string;
  children?: React.ReactNode;
  button?: ButtonProps;
}

const TextCenter = styled.div`
  text-align: center;
`;

export const FormsSection = ({ forms, sectionTitle }: FormSectionProps) => {
  const { isTablet } = useBreakpoint();
  return (
    <FluidContainer>
      {isTablet ? (
        <TextCenter>
          <Typography variant="titleSmall" as="h2" margin={`${Spaces.md} 0 0`}>
            {sectionTitle}
          </Typography>
        </TextCenter>
      ) : (
        <Typography variant="titleSmall" as="h2">
          {sectionTitle}
        </Typography>
      )}
      <Divider color="grey" margin={`${Spaces.xl} 0`} />
      {forms.map((d) => (
        <DownloadSection key={d.title} {...d} />
      ))}
    </FluidContainer>
  );
};
