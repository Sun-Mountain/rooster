"use client";

import { ReactNode, SyntheticEvent, useState } from "react";
import { Tabs as TabUI } from '@mui/material';
import Tab from '@mui/material/Tab';


interface TabsProps {
  tabs: {
    label: ReactNode;
    name: string;
  }[];
}

function a11yProps(name: string) {
  const index = name.split("-").pop() || "0";
  return {
    id: `${index}-tab`,
    'aria-controls': `${index}-tabpanel`,
  };
}

export const Tabs = ({ tabs }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_: SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <>
      <TabUI value={activeTab} onChange={handleTabChange} className="tabs-container">
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            className="tab-label" {...a11yProps(tab.name)} />
        ))}
      </TabUI>
    </>
  );
}