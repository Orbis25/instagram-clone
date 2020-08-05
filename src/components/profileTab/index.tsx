import React, { useState } from "react";
import { Grid, Tab, Tabs, Container } from "@material-ui/core";
import TabPanel from "../shared/tabPanel";

import { a11yProps } from "./util";

const ProfileTab = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Grid container justify="center">
        <Grid item xs={12} style={{ flexGrow: 1 }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            variant="fullWidth"
            
          >
            <Tab label="PUBLICATIONS" {...a11yProps(0)} />
            <Tab label="SAVED" {...a11yProps(1)} />
            <Tab label="TAGGED" {...a11yProps(2)} />
          </Tabs>
        </Grid>
        <Grid item xs={12}>
          <TabPanel value={value} index={0}>
            1
          </TabPanel>
          <TabPanel value={value} index={1}>
            2
          </TabPanel>
          <TabPanel value={value} index={2}>
            3
          </TabPanel>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfileTab;
