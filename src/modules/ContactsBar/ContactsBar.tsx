import { ReactNode } from 'react';
import styled from 'styled-components';
import { FluidContainer } from 'components';
import { Colors, media, Spaces } from 'theme';

const ContactsBarList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: ${Spaces.md};
  padding: 0.5rem 0;
  margin: 0;
  width: 100%;
  flex-wrap: wrap;

  li {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    white-space: nowrap;
  }

  ${() =>
    media('desktop')(`
      li {
        justify-content: center;
        flex: 1 1 30%;
      }
    `)}

  ${() =>
    media('tablet')(`
      li {
        justify-content: flex-start;
        flex: 1 1 100%;
      }
    `)}

  ${() =>
    media('mobile')(`
      li {
        justify-content: flex-start;
        flex: 1 1 100%;
      }
    `)}
`;

export interface ContactsBarProps {
  children: ReactNode;
  isMobile?: boolean;
  isDesktop?: boolean;
  backgroundColor?: keyof typeof Colors;
  width?: string;
  borderRadius?: string;
  padding?: string;
  className?: string;
}

export const ContactsBar = ({
  children,
  isMobile,
  isDesktop,
  backgroundColor = 'primary',
  width = '100%',
  padding,
}: ContactsBarProps) => {
  const resolvedPadding =
    padding || (isMobile ? '0 16px' : isDesktop ? '0 36px' : '12px 72px');

  return (
    <FluidContainer
      backgroundColor={backgroundColor}
      padding={resolvedPadding}
      width={width}
    >
      <ContactsBarList>{children}</ContactsBarList>
    </FluidContainer>
  );
};

export default ContactsBar;
