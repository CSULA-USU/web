import {
  Divider,
  FluidContainer,
  NonBreakingSpan,
  Typography,
} from 'components';
import {
  DocumentLinkContainer,
  DownloadSection,
  DownloadSectionProps,
} from 'modules';
import { Spaces } from 'theme';

const downloads: DownloadSectionProps[] = [
  {
    title: 'Tax Exemption Application (Form 1023)',
    children: <Typography>Can be provided upon written request.</Typography>,
    button: {
      children: <NonBreakingSpan>Request Access</NonBreakingSpan>,
      disabled: true,
    },
  },
  {
    title: 'Form 990 & 199',
    children: (
      <DocumentLinkContainer
        links={[
          { href: '#', children: 'FY 18-19' },
          { href: '#', children: 'FY 17-18' },
          { href: '#', children: 'FY 16-17' },
          { href: '#', children: 'FY 15-16' },
          { href: '#', children: 'FY 14-15' },
          { href: '#', children: 'FY 13-14' },
        ]}
      />
    ),
    button: {
      children: <NonBreakingSpan>Download PDF</NonBreakingSpan>,
      href: '#',
      variant: 'black',
    },
  },
];
export const StudentOrganizationCategories = () => (
  <FluidContainer>
    <Typography variant="titleSmall" as="h2">
      Student Organization Categories
    </Typography>
    <Divider color="grey" margin={`${Spaces.xl} 0`} />
    {downloads.map((d) => (
      <DownloadSection key={d.title} {...d} />
    ))}
  </FluidContainer>
);
