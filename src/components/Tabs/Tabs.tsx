import { useState } from 'react';
import styled from 'styled-components';
import { Colors, Spaces } from 'theme';

interface TabProps {
  title: string;
  children: React.ReactNode;
}

interface TabsStyle {
  minHeight?: string;
}

interface TabsProps extends TabsStyle {
  items: TabProps[];
}
const TabsContainer = styled.div<TabsStyle>`
  ${(p) => p.minHeight && `min-height: ${p.minHeight}`}
`;

const TabTitles = styled.div`
  display: flex;
  padding-bottom: ${Spaces.sm};
  border-bottom: 1px solid ${Colors.black};
  margin-bottom: ${Spaces.md};
  > *:not(:last-child) {
    margin-right: ${Spaces.md};
  }
`;
const Tab = styled.div<{ active?: boolean }>`
  transition: 0.4s ease;
  color: ${(p) => (p.active ? Colors.black : Colors.grey)};
  :hover {
    color: ${Colors.black};
  }
  cursor: pointer;
`;

export const Tabs = ({ items, ...props }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <TabsContainer {...props}>
      <TabTitles>
        {items.map((tab, i) => (
          <Tab
            key={tab.title}
            active={i === activeTab}
            onClick={() => setActiveTab(i)}
          >
            {tab.title}
          </Tab>
        ))}
      </TabTitles>
      {items[activeTab].children}
    </TabsContainer>
  );
};
