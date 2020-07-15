import React from "react";
import { Tab, Tabs } from "@material-ui/core";

import TabPanel from "../shared/tabPanel";
import { useStyles } from "./style";
import { TabsContent, a11yProps } from "./util";
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";

const ProfileSettings = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {TabsContent.map((content, key) => (
          <Tab key={key} label={content.label} {...a11yProps(content.index)} />
        ))}
      </Tabs>

      <TabPanel value={value} index={0}>
        <EditProfile />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ChangePassword />
      </TabPanel>
    </div>
  );
};

export default ProfileSettings;
