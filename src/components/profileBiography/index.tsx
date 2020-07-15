import React, { useEffect, useState } from "react";
import { Grid, Typography, Button, Avatar } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { useStyles } from "./style";
import { ICurrentUser, IUserEntity, IUser } from "../../models/UserModel";
import { RootState } from "../../redux/reducers";
import UserService from "../../services/userService";
import routes from "../../router/routes.json";

const ProfileBiography = () => {
  const classes = useStyles();
  const service = new UserService();

  const [userEntity, setUserEntity] = useState<IUserEntity | null>(null);

  const currentUser: ICurrentUser = useSelector(
    (state: RootState) => state.AuthReducer.user
  );

  useEffect(() => {
    if (currentUser) {
      getUserProfile();
    }
    // eslint-disable-next-line
  }, [currentUser]);

  const getUserProfile = () => {
    service.getUserDetail(currentUser.uid).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const result = doc.data() as IUser;
        setUserEntity({
          docId: doc.id,
          user: result,
        });
      });
    });
  };

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={12} md={4} xl={4} lg={4}>
        {currentUser && (
          <Avatar
            className={classes.avatar}
            alt="profile"
            src={currentUser.photoURL !== null ? currentUser.photoURL : ""}
          />
        )}
      </Grid>
      <Grid item xs={12} sm={12} md={8} xl={8} lg={8}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography className={classes.userName}>
              {userEntity ? (
                <span>
                  {userEntity.user.userName}
                  <Link className="no-text-decoration" to={routes.EDIT_PROFILE}>
                    <Button
                      className={classes.btnEdit}
                      size="small"
                      variant="outlined"
                    >
                      Edit profile
                    </Button>
                  </Link>
                </span>
              ) : (
                <Skeleton animation="wave" variant="text" />
              )}
            </Typography>
          </Grid>
          <Grid className={classes.quantitySectionContainer} item xs={12}>
            <span className={classes.quantitySection}>
              <b>100</b> posts
            </span>
            <span className={classes.quantitySection}>
              <b>100</b> followers
            </span>
            <span>
              <b>100</b> following
            </span>
          </Grid>
        </Grid>
        <Grid container>
          <Grid
            item
            xs={12}
            className={classes.biograpyContainer}
          >
            <Typography>
              <b>{userEntity && userEntity.user.fullName}</b>
            </Typography>
            <Typography>{userEntity && userEntity.user.biography}</Typography>
            {userEntity && (
              <a
                href={userEntity.user.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {userEntity.user.website}
              </a>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProfileBiography;
