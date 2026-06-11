import { Typography } from 'components';
import { getBackofficePolicyParts } from 'lib/backoffice/formatters';
import styled from 'styled-components';
import { Colors, Spaces } from 'theme';

const PolicyGroups = styled.div<{ $align: 'center' | 'left' }>`
  display: grid;
  gap: ${Spaces.md};
  width: ${({ $align }) => ($align === 'left' ? '100%' : 'fit-content')};
  margin: ${({ $align }) => ($align === 'left' ? '0' : '0 auto')};
  text-align: left;
`;

const PolicyGroup = styled.div`
  display: grid;
  gap: ${Spaces.xs};
  padding-left: ${Spaces.sm};
  border-left: 3px solid ${Colors.grey};
`;

const PolicyItems = styled.ul`
  display: grid;
  gap: ${Spaces.xs};
  padding-left: ${Spaces.md};
  margin: 0;
`;

const PolicyItem = styled.li`
  color: ${Colors.black};
`;

export function PolicyList({
  policies,
  emptyMessage = 'No permissions assigned',
  align = 'center',
}: {
  policies: string[];
  emptyMessage?: string;
  align?: 'center' | 'left';
}) {
  if (policies.length === 0) {
    return (
      <PolicyGroups $align={align}>
        <Typography as="span" variant="label" size="sm" weight="400">
          {emptyMessage}
        </Typography>
      </PolicyGroups>
    );
  }

  const groupedPolicies: Record<string, string[]> = {};

  policies.forEach((policy) => {
    const { resourceLabel, permissionLabel } = getBackofficePolicyParts(policy);

    if (!groupedPolicies[resourceLabel]) {
      groupedPolicies[resourceLabel] = [];
    }

    groupedPolicies[resourceLabel].push(permissionLabel);
  });

  return (
    <PolicyGroups $align={align}>
      {Object.entries(groupedPolicies).map(([resourceLabel, labels]) => (
        <PolicyGroup key={resourceLabel}>
          <Typography as="p" variant="label" size="sm" weight="600">
            {resourceLabel}
          </Typography>

          <Typography as="p" variant="label" size="sm" weight="400">
            Allowed operations:
          </Typography>

          <PolicyItems>
            {labels.map((label, i) => (
              <PolicyItem key={`${label}-${i}`}>
                <Typography as="span" variant="label" size="sm" weight="400">
                  {label}
                </Typography>
              </PolicyItem>
            ))}
          </PolicyItems>
        </PolicyGroup>
      ))}
    </PolicyGroups>
  );
}
