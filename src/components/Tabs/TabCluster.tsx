// import { useState } from 'react';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import {
//   FluidContainer,
//   Typography,
//   Button,
//   StaffCardWithModal,
// } from 'components';
// import { Spaces } from 'theme';

// interface TabClusterProps {
//   tabItems: string[];
//   children?: React.ReactNode;
// }

export const TabCluster = () => {
  // const [selectedIndex, setSelectedIndex] = useState(0);
  // const StaffTabs = () => {
  //   return (
  //     <FluidContainer flex justifyContent="space-evenly" flexWrap="wrap">
  //       <Tabs defaultIndex={0} onSelect={(index) => setSelectedIndex(index)}>
  //         <TabList
  //           style={{
  //             listStyleType: 'none',
  //             display: 'flex',
  //             flexWrap: 'wrap',
  //             justifyContent: 'center',
  //           }}
  //         >
  //           {TabItems.map((item, index) => (
  //             <Tab key={item}>
  //               <Button margin="5px" variant="black">
  //                 <Typography
  //                   lineHeight="1"
  //                   variant="cta"
  //                   color={selectedIndex === index ? 'primary' : 'white'}
  //                   size="xs"
  //                 >
  //                   {item}
  //                 </Typography>
  //               </Button>
  //             </Tab>
  //           ))}
  //         </TabList>
  //         {TabItems.map((item) => (
  //           <TabPanel key={item}>
  //             <FluidContainer flex flexWrap="wrap" justifyContent="center">
  //               {staff.map(
  //                 (s) =>
  //                   (item === 'All' || s.tags.includes(item)) && (
  //                     <StaffCardWithModal
  //                       key={s.name}
  //                       name={s.name}
  //                       title={s.title}
  //                       src={s.src}
  //                       alt={s.alt}
  //                       tags={s.tags}
  //                       margin={`${Spaces.sm}`}
  //                       pronouns={s.pronouns}
  //                       email={s.email}
  //                       phone={s.phone}
  //                       bio={s.bio}
  //                       rounded
  //                     >
  //                       <Typography size="xs" as="p">
  //                         {s.department}
  //                       </Typography>
  //                       <Typography size="xs" as="p">
  //                         {s.email}
  //                       </Typography>
  //                     </StaffCardWithModal>
  //                   ),
  //               )}
  //             </FluidContainer>
  //           </TabPanel>
  //         ))}
  //       </Tabs>
  //     </FluidContainer>
  //   );
  // };

  return (
    <h1>hw</h1>
    // <FluidContainer flex justifyContent="space-evenly" flexWrap="wrap">
    //   <Tabs defaultIndex={0} onSelect={(index) => setSelectedIndex(index)}>
    //     <TabList
    //       style={{
    //         listStyleType: 'none',
    //         display: 'flex',
    //         flexWrap: 'wrap',
    //         justifyContent: 'center',
    //       }}
    //     >
    //       {TabItems.map((item, index) => (
    //         <Tab key={item}>
    //           <Button margin="5px" variant="black">
    //             <Typography
    //               lineHeight="1"
    //               variant="cta"
    //               color={selectedIndex === index ? 'primary' : 'white'}
    //               size="xs"
    //             >
    //               {item}
    //             </Typography>
    //           </Button>
    //         </Tab>
    //       ))}
    //     </TabList>
    //     {TabItems.map((item) => (
    //       <TabPanel key={item}>
    //         <FluidContainer flex flexWrap="wrap" justifyContent="center">
    //           {staff.map(
    //             (s) =>
    //               (item === 'All' || s.tags.includes(item)) && (
    //                 <StaffCardWithModal
    //                   key={s.name}
    //                   name={s.name}
    //                   title={s.title}
    //                   src={s.src}
    //                   alt={s.alt}
    //                   tags={s.tags}
    //                   margin={`${Spaces.sm}`}
    //                   pronouns={s.pronouns}
    //                   email={s.email}
    //                   phone={s.phone}
    //                   bio={s.bio}
    //                   rounded
    //                 >
    //                   <Typography size="xs" as="p">
    //                     {s.department}
    //                   </Typography>
    //                   <Typography size="xs" as="p">
    //                     {s.email}
    //                   </Typography>
    //                 </StaffCardWithModal>
    //               ),
    //           )}
    //         </FluidContainer>
    //       </TabPanel>
    //     ))}
    //   </Tabs>
    // </FluidContainer>
  );
};
