import styled from 'styled-components';
import { Header, OfficeHours } from 'modules';
import { FluidContainer, Image } from 'components';
import { useBreakpoint } from 'hooks';
import { Spaces } from 'theme';
import { HeroHeaderProps } from './props';

const HeaderContainer = styled.div``;

const HeaderLeftContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${Spaces.xl};
`;

export const defaultProps: HeroHeaderProps = {
  subtleBackground: 'subtle-background-1',
  title: 'A Place for Students',
  description:
    'Your home away from home. Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum inventore sint ratione quas consequuntur debitis. Totam, soluta perspiciatis, nobis voluptas debitis illo eum, asperiores numquam provident consequatur sint dolore accusamus.',
  primaryButtonHref: '#',
  primaryButtonText: 'Button Text',
  address: '5154 State University Dr, Los Angeles, CA 90032',
  phoneNumber: '(323) 343-5110',
  hours: [
    {
      title: 'Office Hours',
      times: [
        'Monday - Thursday: 8:30 AM - 7:00 PM',
        'Friday: 8:30 AM - 4:00 PM',
      ],
    },
  ],
};

export const Component = ({
  subtleBackground,
  title,
  description,
  primaryButtonText,
  primaryButtonHref,
  address,
  phoneNumber,
  hours,
}: HeroHeaderProps) => {
  const { isDesktop } = useBreakpoint();
  return (
    <HeaderContainer
      style={{
        background: subtleBackground
          ? `url(/backgrounds/${subtleBackground}.jpg) no-repeat`
          : 'unset',
      }}
    >
      <HeaderLeftContainer>
        <Header
          title={title}
          buttons={[
            {
              text: primaryButtonText!,
              href: primaryButtonHref!,
            },
          ]}
        >
          {isDesktop && (
            <Image
              src="/departments/ccc/apisrc/apisrc-sticker-2.svg"
              alt="students"
              width="100%"
              height="300px"
              margin={`${Spaces.md} auto`}
            ></Image> /* Replace with uploaded image */
          )}
          {description}
        </Header>
        {!isDesktop && (
          <Image
            src="/departments/ccc/apisrc/apisrc-sticker-2.svg"
            alt="students"
            width={400}
            height={500}
          ></Image>
        )}
      </HeaderLeftContainer>
      <FluidContainer backgroundColor="transparent">
        <OfficeHours {...{ address, phoneNumber, hours }}></OfficeHours>
      </FluidContainer>
    </HeaderContainer>
  );
};
