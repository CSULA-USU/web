import styled from 'styled-components';
import { Button, Typography } from 'components';
import { GenericModal } from 'modules/GenericModal';
import { Colors, FontSizes, Spaces, media } from 'theme';
import { AoaJobListing } from 'types';
import { formatDate } from 'utils/dates';

interface FullTimeJobModalProps {
  /** `null` while nothing is selected; the modal stays closed. */
  job: AoaJobListing | null;
  isOpen: boolean;
  onRequestClose: () => void;
  /** The U-SU's own application PDF, owned by the page so both it and the
      Applications section below spend the same URL. */
  applicationFormHref: string;
}

/**
 * GenericModal centers its children, which suits the short confirmations it was
 * built for but not a full job posting. The top padding also matters: without
 * it the title sits flush against the close button's divider rule.
 *
 * Horizontal padding drops to zero on mobile because three insets already
 * stack there — react-modal's own 20px default, GenericModal's 4px `Main`
 * margin, and this. Adding a fourth left a job posting reading in about 257px
 * of a 375px screen.
 */
const Content = styled.div`
  text-align: left;
  padding: ${Spaces.lg} ${Spaces.lg} ${Spaces.xl};

  ${media('tablet')(`
    padding: ${Spaces.md} 0 ${Spaces.lg};
  `)}
`;

/**
 * `restorePostingStructure` in lib/aoaJobFeed turns AOA's Word-wrapped text
 * into real h3/p/ul markup, so the spacing lives here rather than in preserved
 * whitespace. Never reintroduce `white-space: pre-line` — it reproduces Word's
 * hard line breaks at our width, stranding single words on their own lines.
 */
const Description = styled.div`
  margin-top: ${Spaces.lg};

  h3 {
    font-size: ${FontSizes.md};
    font-weight: 700;
    margin: ${Spaces.lg} 0 ${Spaces.sm};
  }

  p {
    margin: 0 0 ${Spaces.md};
  }

  ul {
    margin: 0 0 ${Spaces.md};
    padding-left: ${Spaces.lg};
  }

  li {
    margin-bottom: ${Spaces.sm};
  }

  > *:first-child {
    margin-top: 0;
  }

  > *:last-child {
    margin-bottom: 0;
  }
`;

/**
 * Above the description rather than after it: the posting runs to several
 * hundred words, and someone who already knows they want the application form
 * should not have to scroll the whole job description to reach it.
 */
const Actions = styled.div`
  display: flex;
  gap: ${Spaces.md};
  margin-top: ${Spaces.lg};
  padding-bottom: ${Spaces.lg};
  border-bottom: 1px solid ${Colors.greyLightest};
  ${media('tablet')(`
    flex-direction: column;
  `)}
`;

export const FullTimeJobModal = ({
  job,
  isOpen,
  onRequestClose,
  applicationFormHref,
}: FullTimeJobModalProps) => {
  if (!job) return null;

  return (
    <GenericModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={job.title}
      width="720px"
    >
      <Content>
        {/* Typography defaults to margin 0, so the gaps here are deliberate:
            the title and its posted date are one unit and stay tight, while
            everything below them is separated by a full step. */}
        <Typography as="h2" variant="titleSmall" margin={`0 0 ${Spaces.xs}`}>
          {job.title}
        </Typography>
        <Typography as="p" variant="span" color="greyDarker">
          Posted {formatDate(job.postedAt)}
        </Typography>
        <Actions>
          <Button
            href={applicationFormHref}
            isExternalLink
            variant="primary"
            aria-label={`Open the Full-Time Professional Appointment application form for ${job.title} in a new tab`}
          >
            Application
          </Button>
          <Button
            href={job.link}
            isExternalLink
            variant="outline"
            aria-label={`View the ${job.title} posting on the AOA job board in a new tab`}
          >
            AOA Listing
          </Button>
        </Actions>
        <Description>
          <Typography
            variant="prose"
            as="div"
            dangerouslySetInnerHTML={{ __html: job.descriptionHtml }}
          />
        </Description>
      </Content>
    </GenericModal>
  );
};
