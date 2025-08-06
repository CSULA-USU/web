// src/components/Tabs/TabClusterControlled.tsx
import { FluidContainer, Typography, Button } from 'components';
import styled from 'styled-components';

interface TabClusterControlledProps {
  tabItems: string[];
  selectedTabKey: string;
  onSelectTab: (key: string) => void;
}

const TabButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin: 24px 0;
`;

export const TabClusterControlled = ({
  tabItems,
  selectedTabKey,
  onSelectTab,
}: TabClusterControlledProps) => {
  return (
    <FluidContainer padding="0" flex flexDirection="column">
      <TabButtonGroup>
        {tabItems.map((key) => (
          <Button
            key={key}
            onClick={() => onSelectTab(key)}
            variant="black"
            margin="4px"
          >
            <Typography
              lineHeight="1"
              variant="cta"
              color={selectedTabKey === key ? 'primary' : 'white'}
              size="xs"
            >
              {key}
            </Typography>
          </Button>
        ))}
      </TabButtonGroup>
    </FluidContainer>
  );
};
