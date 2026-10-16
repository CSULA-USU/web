import styled from 'styled-components';
import { MdExpandMore } from 'react-icons/md';

import { Table } from 'components/Table';
import { Typography } from 'components/Typography';
import type { GraffixRequest, TableColumn, TableData } from 'types';
import { Colors, FontSizes, Radii, Spaces } from 'theme';
import { formatDate } from 'utils/dates';

const Group = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${Spaces.md};
`;

const GroupHeading = styled.h2`
  margin: 0;
`;

// Hover fills the whole bar with primary (the site's hover language) rather
// than recoloring the label, so the bar reads as one control.
const ToggleButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px ${Spaces.md};
  border: 0;
  border-radius: ${Radii.control};
  background-color: ${Colors.greyLightest};
  color: ${Colors.black};
  font-size: ${FontSizes.md};
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

  &:hover {
    background-color: ${Colors.primary};
  }

  &:focus-visible {
    outline: 2px solid ${Colors.black};
    outline-offset: 2px;
  }
`;

const Chevron = styled(MdExpandMore)<{ $open: boolean }>`
  flex: none;
  transform: rotate(${({ $open }) => ($open ? '0deg' : '-90deg')});
  transition: transform 0.2s ease-in-out;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

// The status name always sits beside the dot, so color is never the only
// thing telling one status from another.
const StatusDot = styled.span<{ $color: string }>`
  flex: none;
  width: 10px;
  height: 10px;
  border-radius: ${Radii.circle};
  background-color: ${({ $color }) => $color};
`;

// White on both the grey bar and its primary hover, so the count stays
// legible in either state.
const Count = styled.span`
  padding: 2px 10px;
  border-radius: ${Radii.pill};
  background-color: ${Colors.white};
  font-size: ${FontSizes.xs};
  font-weight: 600;
`;

const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
`;

// Requesters are often email addresses, which have no spaces to wrap at and
// otherwise run on over the next column. The full value shows on hover.
const TruncatedText = styled.span`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

// Titles wrap, since they are words, but stop at two lines so one long title
// cannot make its row three or four times the height of the rest. Clamped by
// line rather than by character count, because what fits depends on the
// column's width and the letters in it. Visual only: the button's accessible
// name, the hover title, and the detail panel all keep the full title.
const ClampedTitle = styled.span`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
`;

const TitleButton = styled.button`
  padding: 0;
  border: 0;
  background: none;
  color: ${Colors.black};
  font-size: ${FontSizes.sm};
  font-weight: 600;
  text-align: inherit;
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;

  &:hover {
    text-decoration-color: ${Colors.primary};
    text-decoration-thickness: 3px;
  }

  &:focus-visible {
    outline: 2px solid ${Colors.black};
    outline-offset: 2px;
  }
`;

type Props = {
  title: string;
  color: string;
  requests: GraffixRequest[];
  isOpen: boolean;
  onToggle: () => void;
  onSelectRequest: (id: string) => void;
};

const toId = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

export const ContentBoardGroup = ({
  title,
  color,
  requests,
  isOpen,
  onToggle,
  onSelectRequest,
}: Props) => {
  const panelId = `graffix-status-${toId(title)}`;

  const renderTitle = (request?: GraffixRequest) =>
    request ? (
      <TitleButton
        type="button"
        title={request.title}
        onClick={() => onSelectRequest(request.id)}
      >
        <ClampedTitle>{request.title}</ClampedTitle>
      </TitleButton>
    ) : null;

  const dateColumn = (
    id: keyof GraffixRequest,
    label: string,
  ): TableColumn<GraffixRequest> => ({
    id,
    label,
    backgroundColor: 'white',
    textColor: 'black',
    minWidth: '160px',
    render: (row) => formatDate(row.original?.[id]),
  });

  // Every column has a width and none is `auto`. Table renders minWidth as a
  // fixed-layout width and spreads spare room across columns in proportion,
  // so these set the ratio, not the size: Title stays widest without taking
  // all the slack, which made it dwarf the rest. (DocumentManager makes the
  // opposite choice, one `auto` column, because only its URL can use slack.)
  const columns: TableColumn<GraffixRequest>[] = [
    {
      id: 'title',
      label: 'Title',
      backgroundColor: 'white',
      textColor: 'black',
      minWidth: '360px',
      render: (row) => renderTitle(row.original),
      renderRowHeader: (row) => renderTitle(row.original),
    },
    {
      id: 'requestorName',
      label: 'Requester',
      backgroundColor: 'white',
      textColor: 'black',
      minWidth: '280px',
      render: (row) =>
        row.original?.requestorName ? (
          <TruncatedText title={row.original.requestorName}>
            {row.original.requestorName}
          </TruncatedText>
        ) : (
          '—'
        ),
    },
    dateColumn('eventDate', 'Event Date'),
    dateColumn('digitalDeliveryDate', 'Digital Delivery'),
    dateColumn('printDeliveryDate', 'Print Delivery'),
  ];

  const tableData: TableData<GraffixRequest> = {
    id: panelId,
    ariaLabel: `${title} requests`,
    caption: `${title} requests`,
    headerColors: { backgroundColor: 'greyLightest', textColor: 'black' },
    columns,
    rows: requests.map((request) => ({
      id: request.id,
      values: {
        title: request.title,
        requestorName: request.requestorName || '—',
      },
      original: request,
    })),
  };

  return (
    <Group aria-labelledby={`${panelId}-toggle`}>
      <GroupHeading>
        <ToggleButton
          id={`${panelId}-toggle`}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <Chevron $open={isOpen} size={24} aria-hidden="true" />
          <StatusDot $color={color} aria-hidden="true" />
          <span>{title}</span>
          <Count>
            {requests.length}
            <VisuallyHidden> requests</VisuallyHidden>
          </Count>
        </ToggleButton>
      </GroupHeading>

      {/* Rows render only while open. Unlike the public pages (see "Rendering
          & SEO" in CLAUDE.md), the backoffice is behind sign-in and never
          crawled, so there is no reason to build a closed section's rows. */}
      <div id={panelId}>
        {isOpen ? (
          requests.length > 0 ? (
            <Table data={tableData} />
          ) : (
            <Typography as="p" variant="span" size="sm" color="greyDark">
              No requests.
            </Typography>
          )
        ) : null}
      </div>
    </Group>
  );
};
