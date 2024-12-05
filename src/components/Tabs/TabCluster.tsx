import { useState } from 'react';
import { Tab, Tabs, TabList } from 'react-tabs';
import { FluidContainer, Typography, Button } from 'components';

interface TabClusterProps {
  tabItems: string[];
  data?: Array<Record<string, any>>;
  children?: React.ReactNode;
}

export const TabCluster = (props: TabClusterProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <FluidContainer flex justifyContent="space-evenly" flexWrap="wrap">
      <Tabs defaultIndex={0} onSelect={(index) => setSelectedIndex(index)}>
        <TabList
          style={{
            listStyleType: 'none',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {props.tabItems.map((item, index) => (
            <Tab key={item}>
              <Button margin="5px" variant="black">
                <Typography
                  lineHeight="1"
                  variant="cta"
                  color={selectedIndex === index ? 'primary' : 'white'}
                  size="xs"
                >
                  {item}
                </Typography>
              </Button>
            </Tab>
          ))}
        </TabList>
        {props.children}
      </Tabs>
    </FluidContainer>
  );
};
