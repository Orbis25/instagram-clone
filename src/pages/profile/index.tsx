import React, { useState, useEffect } from "react";
import { Grid, Container } from "@material-ui/core";
import { RouteProps, RouteComponentProps } from "react-router-dom";

import { useStyles } from "./style";
import ProfileBiography from "../../components/profileBiography";
import ProfileGalery from "../../components/profileTab";

import UserService from "../../services/userService";
import { IUser } from "../../models/UserModel";

const ProfilePage: React.FC<RouteProps & RouteComponentProps> = ({ match }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const { userName } = match.params as { userName: string };
  const classes = useStyles();

  useEffect(() => {
    if (userName) {
      getUser();
    }
    // eslint-disable-next-line
  }, [userName]);

  const getUser = () => {
    new UserService().getUserByUserName(userName).then((response) => {
      response.forEach((result) => {
        const usr = result.data() as IUser;
        setUser(usr);
      });
    });
  };

  return (
    <Container className={classes.container}>
      <Grid container justify="center" spacing={5}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <ProfileBiography />
        </Grid>
        <Grid item xs={12} sm={10} md={10} lg={10} xl={10}>
          <ProfileGalery userId={user?.uidUser ?? ""} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;
