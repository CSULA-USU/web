import { Typography } from 'components';
import { getBackofficePolicyParts } from 'lib/backoffice/formatters';
import styled from 'styled-components';
import { Colors } from 'theme';

const PolicyGroups = styled.div`
  display: grid;
  gap: 0.75rem;
`;

const PolicyGroup = styled.div`
  display: grid;
  gap: 0.35rem;
`;

const PolicyBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
`;

const PolicyBadge = styled.span`
  display: inline-flex;
  padding: 0.25rem 0.5rem;
  border: 1px solid ${Colors.grey};
  border-radius: 999px;
`;

export function PolicyList({
  policies,
  emptyMessage = 'No permissions assigned',
}: {
  policies: string[];
  emptyMessage?: string;
}) {
  if (policies.length === 0) {
    return (
      <Typography as="span" variant="label" size="sm" weight="600">
        {emptyMessage}
      </Typography>
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
    <PolicyGroups>
      {Object.entries(groupedPolicies).map(([resourceLabel, labels]) => (
        <PolicyGroup key={resourceLabel}>
          <Typography as="p" variant="label" size="sm" weight="700">
            {resourceLabel}
          </Typography>

          <PolicyBadges>
            {labels.map((label, i) => (
              <PolicyBadge key={`${label}-${i}`}>
                <Typography as="span" variant="label" size="sm" weight="600">
                  {label}
                </Typography>
              </PolicyBadge>
            ))}
          </PolicyBadges>
        </PolicyGroup>
      ))}
    </PolicyGroups>
  );
}
