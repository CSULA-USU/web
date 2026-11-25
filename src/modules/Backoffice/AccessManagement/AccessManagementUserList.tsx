import styled from 'styled-components';
import { BiChevronRight } from 'react-icons/bi';
import { Expandable, Table, Typography, VisuallyHidden } from 'components';
import { Colors, FontSizes, media, Radii, Spaces } from 'theme';
import type { TableData, TableRow } from 'types';
import type { V2UserRow } from './types';
import {
  emailLocalPart,
  groupByInitial,
  NON_LETTER_INITIAL,
} from './userFilters';

interface AccessManagementUserListProps {
  /**
   * The same definition the desktop table renders. On narrow screens the
   * first column (email) becomes the row's name and its letter section, and
   * every other column is a labeled field inside the opened row — one
   * definition, so the two views cannot drift apart. `data.id` prefixes the
   * section anchors, so it must differ between lists on the same page.
   */
  data: TableData<V2UserRow>;
  emptyMessage: string;
}

/* Switches at `tablet`, the same width the shared Table drops to stacked
   cards. Matching it means no width ever shows those cards: a full card per
   user is the long scroll this list replaces. Both views stay in the DOM and
   CSS picks one, so nothing shifts on hydration. */
const DesktopView = styled.div`
  ${media('tablet')`
    display: none;
  `}
`;

const MobileView = styled.div`
  display: none;
  flex-direction: column;
  gap: ${Spaces.lg};
  ${media('tablet')`
    display: flex;
  `}
`;

/* Only letters that have users get a link, so no tap ever lands nowhere. */
const LetterNav = styled.nav`
  ul {
    display: flex;
    flex-wrap: wrap;
    gap: ${Spaces.xs};
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

/* A finger needs a 44px target; the letters are the whole point of the row
   on a phone, so they get it at every pointer type rather than only coarse. */
const LetterLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;
  border-radius: ${Radii.control};
  color: ${Colors.black};
  font-size: ${FontSizes.sm};
  font-weight: 700;
  text-decoration: none;
  background-color: ${Colors.greyLightest};
  transition: background-color 0.2s ease, color 0.2s ease;

  @media (hover: hover) {
    &:hover {
      background-color: ${Colors.primary};
    }
  }

  &:focus-visible {
    outline: 3px solid ${Colors.black};
    outline-offset: 2px;
  }
`;

/* Keeps a jumped-to heading clear of the screen's top edge. */
const Group = styled.section`
  scroll-margin-top: ${Spaces.md};
`;

const GroupHeading = styled.h2`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: ${Spaces.sm};
  margin: 0 0 ${Spaces.xs};
  padding-bottom: ${Spaces.xs};
  border-bottom: 2px solid ${Colors.black};
`;

const Rows = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Row = styled.li`
  border-bottom: 1px solid ${Colors.greyLighter};
`;

/* The local part can be a long unbroken string, and an overflowing name
   would push the chevron off a phone screen. */
const Name = styled.span`
  min-width: 0;
  overflow-wrap: anywhere;
`;

const Fields = styled.dl`
  display: flex;
  flex-direction: column;
  gap: ${Spaces.md};
  margin: ${Spaces.sm} 0 0;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Spaces.xs};

  dd {
    margin: 0;
  }
`;

const getUser = (row: TableRow<V2UserRow>): V2UserRow => {
  if (!row.original) throw new Error('Table row is missing original data.');
  return row.original;
};

export const AccessManagementUserList = ({
  data,
  emptyMessage,
}: AccessManagementUserListProps) => {
  if (data.rows.length === 0) {
    return (
      <Typography as="p" variant="copy" color="greyDark">
        {emptyMessage}
      </Typography>
    );
  }

  const [, ...detailColumns] = data.columns;
  const groups = groupByInitial(data.rows, (row) => getUser(row).email);
  const sectionId = (initial: string) =>
    `${data.id}-${initial === NON_LETTER_INITIAL ? 'other' : initial}`;

  return (
    <>
      <DesktopView>
        <Table data={data} />
      </DesktopView>

      <MobileView aria-label={data.ariaLabel} role="region">
        <LetterNav aria-label={`Jump to letter (${data.caption})`}>
          <ul>
            {groups.map((group) => (
              <li key={group.initial}>
                <LetterLink href={`#${sectionId(group.initial)}`}>
                  {group.initial}
                </LetterLink>
              </li>
            ))}
          </ul>
        </LetterNav>

        {groups.map((group) => (
          <Group key={group.initial} id={sectionId(group.initial)}>
            <GroupHeading>
              <Typography as="span" variant="labelTitle" size="sm">
                {group.initial}
              </Typography>
              <Typography as="span" variant="label" size="xs" color="greyDark">
                {group.items.length}
                <VisuallyHidden as="span"> users</VisuallyHidden>
              </Typography>
            </GroupHeading>

            <Rows>
              {group.items.map((row) => (
                <Row key={row.id}>
                  <Expandable
                    headingLevel={3}
                    hoverEffect="highlight"
                    indicator={<BiChevronRight size={24} />}
                    header={
                      <Typography
                        as="span"
                        variant="label"
                        size="sm"
                        weight="400"
                        margin={`${Spaces.md} 0`}
                      >
                        <Name>{emailLocalPart(getUser(row).email)}</Name>
                      </Typography>
                    }
                  >
                    <Fields>
                      {detailColumns.map((column) => (
                        <Field key={column.id}>
                          <dt>
                            <Typography
                              as="span"
                              variant="labelTitleSmall"
                              color="greyDark"
                            >
                              {column.label}
                            </Typography>
                          </dt>
                          <dd>
                            {column.render ? (
                              column.render(row)
                            ) : (
                              <Typography as="span" variant="copy">
                                {row.values[column.id] ?? '—'}
                              </Typography>
                            )}
                          </dd>
                        </Field>
                      ))}
                    </Fields>
                  </Expandable>
                </Row>
              ))}
            </Rows>
          </Group>
        ))}
      </MobileView>
    </>
  );
};
