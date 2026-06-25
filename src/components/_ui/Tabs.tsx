"use client";

import { ReactNode, SyntheticEvent, useState } from "react";
import { Tabs as TabUI } from '@mui/material';
import Tab from '@mui/material/Tab';


interface TabsProps {
  tabs: {
    label: ReactNode;
    name: string;
    tabContent: {
      children: ReactNode;
    };
  }[];
}
interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function a11yProps(name: string) {
  const index = name.split("-").pop() || "0";
  return {
    id: `${index}-tab`,
    'aria-controls': `${index}-tabpanel`,
  };
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

export const Tabs = ({ tabs }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_: SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <>
      <TabUI
        className="tabs-container"
        onChange={handleTabChange}
        value={activeTab}
        variant="scrollable"
        scrollButtons="auto"
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            className="tab-label" {...a11yProps(tab.name)} />
        ))}
      </TabUI>
      {tabs.map((tab, index) => (
        <TabPanel key={index} value={activeTab} index={index}>
          {tab.tabContent.children}
        </TabPanel>
      ))}
    </>
  );
}