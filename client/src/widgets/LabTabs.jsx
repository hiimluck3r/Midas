import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import BaseLine from '../pages/BaseLine';
import DiscountMatrix from '../pages/DiscountMatrix';
import Storage from '../pages/Storage';

export default function LabTabs() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="BaseLine matrix" value="1" />
            <Tab label="Discount matrix" value="2" />
            <Tab label="Storage" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1"><BaseLine /> </TabPanel>
        <TabPanel value="2"><DiscountMatrix /></TabPanel>
        <TabPanel value="3"><Storage /></TabPanel>
      </TabContext>
    </Box>
  );
}