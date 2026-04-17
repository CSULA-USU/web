import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { BiChevronRight } from 'react-icons/bi';
import {
  Button,
  Divider,
  FluidContainer,
  Image,
  StyledLink,
  Typography,
} from 'components';
import { Spaces, Colors } from 'theme';
import { GenericModal, ContactsBar } from 'modules';
import { useBreakpoint } from 'hooks';
import dynamic from 'next/dynamic';

const CircleImageButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:focus-visible {
    outline: 2px solid ${Colors.primary};
    outline-offset: 4px;
  }
`;

const CircleImageWrapper = styled.div`
  width: 100%;
  max-width: 350px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  margin: 0 auto;
`;

const TitleLinkButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: ${Colors.black};
  text-decoration: underline;

  &:hover,
  &:focus {
    text-decoration: none;
  }
`;

const SectionWrapper = styled(FluidContainer)`
  width: 100%;
  padding: ${Spaces.lg};
  border-radius: 16px;
`;

const DescriptionSection = styled(SectionWrapper)`
  align-items: flex-start;
`;

const ContentList = styled.ul`
  margin: 0;
  padding-left: 1.25rem;
  color: white;
  text-align: left;

  li {
    color: white;
    text-align: left;
  }
`;

const NestedList = styled.ul`
  margin: ${Spaces.xs} 0 0;
  padding-left: 1.25rem;
  color: white;
  text-align: left;

  li {
    color: white;
    text-align: left;
  }
`;

const AnswerContentWrapper = styled.div`
  width: 100%;
  text-align: left;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

type FAQAnswerObject = {
  [key: string]: string | string[] | FAQAnswerObject;
};

type FAQItem = {
  question: string;
  answer: string | string[] | FAQAnswerObject;
};

type GuidelineItem = {
  text: string;
};

export type ServiceItem = {
  title: string;
  children: string;
  imgSrc: string;
  imgAlt: string;
  imageOnRight?: boolean;
  hoursOfOperation?: string;
  phoneNumber?: string;
  location?: string;
  faq?: FAQItem[];
  guidelines?: GuidelineItem[];
  secondaryImgSrcs?: string[];
  secondaryImgAlts?: string[];
};

type CircleImageAndTitleProps = ServiceItem;

export const DynamicExpandable = dynamic(
  () => import('components/Expandable').then((mod) => mod.Expandable),
  { ssr: false },
);

const formatLabel = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1).replace(/([A-Z])/g, ' $1');

const renderAnswerContent = (
  answer: string | string[] | FAQAnswerObject,
): ReactNode => {
  if (typeof answer === 'string') {
    return (
      <Typography color="white" as="p">
        {answer}
      </Typography>
    );
  }

  if (Array.isArray(answer)) {
    return (
      <ContentList>
        {answer.map((item, index) => (
          <li key={`${item}-${index}`}>
            <Typography color="white" as="span">
              {item}
            </Typography>
          </li>
        ))}
      </ContentList>
    );
  }

  return (
    <ContentList>
      {Object.entries(answer).map(([key, value]) => (
        <li key={key}>
          <Typography color="white" as="span">
            <strong>{formatLabel(key)}:</strong>
          </Typography>

          {typeof value === 'string' ? (
            <Typography color="white" as="p" margin={`${Spaces.xs} 0 0`}>
              {value}
            </Typography>
          ) : Array.isArray(value) ? (
            <NestedList>
              {value.map((item, index) => (
                <li key={`${key}-${item}-${index}`}>
                  <Typography color="white" as="span">
                    {item}
                  </Typography>
                </li>
              ))}
            </NestedList>
          ) : (
            <NestedList>
              <li>{renderAnswerContent(value)}</li>
            </NestedList>
          )}
        </li>
      ))}
    </ContentList>
  );
};

const hasContactInfo = (service: ServiceItem) =>
  Boolean(service.location || service.phoneNumber || service.hoursOfOperation);

const normalizePhoneHref = (phoneNumber: string) =>
  `tel:${phoneNumber.replace(/[^\d+]/g, '')}`;

export const CircleImageAndTitle = ({
  title,
  children,
  imgSrc,
  imgAlt,
  hoursOfOperation,
  phoneNumber,
  location,
  faq,
  guidelines,
  secondaryImgSrcs,
  secondaryImgAlts,
}: CircleImageAndTitleProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  const imageNode = (
    <CircleImageButton
      type="button"
      onClick={() => setIsOpen(true)}
      aria-label={`Open details for ${title}`}
    >
      <CircleImageWrapper>
        <Image src={imgSrc} alt={imgAlt} width="100%" height="100%" lazy />
      </CircleImageWrapper>
    </CircleImageButton>
  );

  const titleNode = (
    <TitleLinkButton type="button" onClick={() => setIsOpen(true)}>
      <Typography as="h2" variant="eventTitle" color="black" size="md">
        {title}
      </Typography>
    </TitleLinkButton>
  );

  return (
    <>
      <FluidContainer flex flexDirection="column" gap={Spaces.lg}>
        {titleNode}
        {imageNode}
        <Button variant="primary" onClick={() => setIsOpen(true)}>
          View
        </Button>
      </FluidContainer>

      <GenericModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        width={isTablet ? '100%' : '1440px'}
      >
        <FluidContainer
          flex
          flexDirection="column"
          gap={Spaces.lg}
          width="100%"
          padding="0"
        >
          <Typography variant="title" size={isMobile ? 'lg' : '2xl'}>
            {title}
          </Typography>

          <CircleImageWrapper>
            <Image src={imgSrc} alt={imgAlt} width="100%" height="100%" lazy />
          </CircleImageWrapper>

          {hasContactInfo({
            title,
            children,
            imgSrc,
            imgAlt,
            hoursOfOperation,
            phoneNumber,
            location,
            faq,
            guidelines,
            secondaryImgSrcs,
            secondaryImgAlts,
          }) && (
            <ContactsBar isMobile={isMobile} isDesktop={isDesktop} width="100%">
              {location && (
                <li>
                  <Image
                    alt="Location icon."
                    src="/departments/recreation/game-room/icons/flag.svg"
                    height="18px"
                    width="18px"
                  />
                  <Typography variant="cta" color="black">
                    {location}
                  </Typography>
                </li>
              )}

              {phoneNumber && (
                <li>
                  <Image
                    alt="Phone icon."
                    src="/departments/recreation/game-room/icons/phone.svg"
                    height="18px"
                    width="18px"
                  />
                  <StyledLink href={normalizePhoneHref(phoneNumber)}>
                    <Typography variant="cta" color="black">
                      {phoneNumber}
                    </Typography>
                  </StyledLink>
                </li>
              )}

              {hoursOfOperation && (
                <li>
                  <Image
                    alt="Calendar icon."
                    src="/departments/recreation/game-room/icons/calendar.svg"
                    height="18px"
                    width="18px"
                  />
                  <Typography
                    variant="cta"
                    color="black"
                    style={{ whiteSpace: 'pre-line' }}
                  >
                    {hoursOfOperation}
                  </Typography>
                </li>
              )}
            </ContactsBar>
          )}

          <DescriptionSection
            backgroundColor="black"
            flex
            flexDirection="column"
            width="100%"
            alignItems="flex-start"
          >
            <Typography
              as="h2"
              variant="title"
              size={isMobile ? 'lg' : '2xl'}
              color="primary"
            >
              Description
            </Typography>
            <Typography color="white" as="p">
              {children}
            </Typography>
          </DescriptionSection>

          {guidelines && guidelines.length > 0 && (
            <SectionWrapper
              backgroundColor="black"
              flex
              flexDirection="column"
              alignItems="flex-start"
              width="100%"
            >
              <Typography
                as="h2"
                variant="title"
                size={isMobile ? 'lg' : '2xl'}
                color="primary"
                margin={`0 0 ${Spaces.md}`}
              >
                Guidelines
              </Typography>

              <ContentList>
                {guidelines.map((item, index) => (
                  <li key={`${item.text}-${index}`}>
                    <Typography color="white" as="span">
                      {item.text}
                    </Typography>
                  </li>
                ))}
              </ContentList>
            </SectionWrapper>
          )}

          {faq && faq.length > 0 && (
            <SectionWrapper
              backgroundColor="black"
              alignItems="flex-start"
              flex
              flexDirection="column"
              width="100%"
            >
              <Typography
                as="h2"
                variant="title"
                size={isMobile ? 'lg' : '2xl'}
                color="primary"
                margin={`0 0 ${Spaces.md}`}
              >
                Frequently Asked Questions
              </Typography>

              {faq.map((item, index) => (
                <React.Fragment key={`${item.question}-${index}`}>
                  <DynamicExpandable
                    indicator={<BiChevronRight color="white" size={48} />}
                    header={
                      <Typography
                        variant="label"
                        size={isMobile ? 'md' : 'lg'}
                        color="white"
                        as="h3"
                        margin={`${Spaces.sm} 0`}
                      >
                        {item.question}
                      </Typography>
                    }
                  >
                    <FluidContainer padding={`${Spaces.sm} 0`} width="100%">
                      <AnswerContentWrapper>
                        {renderAnswerContent(item.answer)}
                      </AnswerContentWrapper>
                    </FluidContainer>
                  </DynamicExpandable>

                  {index < faq.length - 1 && <Divider color="gold" />}
                </React.Fragment>
              ))}
            </SectionWrapper>
          )}

          {secondaryImgSrcs &&
            secondaryImgSrcs.length > 0 &&
            secondaryImgAlts &&
            secondaryImgAlts.length > 0 && (
              <FluidContainer
                flex
                flexWrap="wrap"
                justifyContent="center"
                gap={Spaces.md}
                width="100%"
                padding="0"
              >
                {secondaryImgSrcs.map((src, index) => {
                  let width = '100%';

                  if (!isMobile) {
                    if (index === 0 || index === 1) {
                      width = '49%'; // first two images side-by-side
                    } else {
                      width = '100%'; // third image full width
                    }
                  }

                  return (
                    <FluidContainer
                      key={`${src}-${index}`}
                      width={width}
                      padding="0"
                    >
                      <Image
                        src={src}
                        alt={
                          secondaryImgAlts[index] ||
                          `${title} image ${index + 1}`
                        }
                        width="100%"
                        height="auto"
                        lazy
                      />
                    </FluidContainer>
                  );
                })}
              </FluidContainer>
            )}
        </FluidContainer>
      </GenericModal>
    </>
  );
};
