import { Typography, FluidContainer } from 'components';

interface DepartmentHeaderProps {
  title: string;
  backgroundImage?: string;
  children: React.ReactNode;
}

export const DepartmentHeader = ({
  title,
  children,
  backgroundImage,
}: DepartmentHeaderProps) => (
  <FluidContainer backgroundImage={backgroundImage}>
    <Typography>{title}</Typography>
    <div>{children}</div>
  </FluidContainer>
);
