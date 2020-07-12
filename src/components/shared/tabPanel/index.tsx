import React from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

export default function TabPanel(props: TabPanelProps) {
  const { value, index, children } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      style={{ width: "90%" }}
    >
      {value === index && <div style={{ width: "100%" }}> {children}</div>}
    </div>
  );
}
