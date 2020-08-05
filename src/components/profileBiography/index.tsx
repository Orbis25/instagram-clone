import React, { useEffect, useState } from "react";
import { Grid, Typography, Button, Avatar } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "../../redux/reducers/";
import { useStyles } from "./style";
import { IUserEntity, IUser, ICurrentUser } from "../../models/UserModel";
import UserService from "../../services/userService";
import routes from "../../router/routes.json";

const ProfileBiography = () => {
  const [userEntity, setUserEntity] = useState<IUserEntity | null>(null);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const { userName } = useParams();
  const classes = useStyles();
  const service = new UserService();

  const currentUser: ICurrentUser = useSelector(
    (state: RootState) => state.AuthReducer.user
  );

  //console.log(userEntity);

  useEffect(() => {
    if (userName) {
      getUserProfile();
    }

    if (userEntity?.docId !== null && currentUser) {
      imFollowing();
    }

    // eslint-disable-next-line
  }, [userName, userEntity?.docId, currentUser]);

  const getUserProfile = () => {
    service.getUserDetail(userName).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const result = doc.data() as IUser;
        setUserEntity({
          docId: doc.id,
          user: result,
        });
      });
    });
  };

  const follow = () => {
    if (userEntity?.user !== undefined) {
      service.followUser(currentUser.uid, userEntity.user.uidUser).then(() => {
        setIsFollowing(true);
      });
    }
  };

  const unFollow = () => {
    if (userEntity?.user !== undefined) {
      service.unFollowUser(currentUser.uid, userEntity.user.uidUser).then(() => {
        setIsFollowing(false);
      });
    }
  };

  const imFollowing = async () => {
    if (userEntity?.user.uidUser !== undefined) {
      const result = await service.imFollow(
        currentUser.uid,
        userEntity.user.uidUser
      );
      if (result.empty) {
        setIsFollowing(false);
      } else {
        setIsFollowing(true);
      }
    }
  };

  const _renderFollowButtons = () => {
    if (isFollowing) {
      return (
        <Button
          onClick={unFollow}
          variant="contained"
          size="small"
        >
          Unfollow
        </Button>
      );
    } else {
      return (
        <Button onClick={follow} className="btn-primary" size="small">
          Follow
        </Button>
      );
    }
  };

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={12} md={4} xl={4} lg={4}>
        {userEntity && (
          <Avatar
            className={classes.avatar}
            alt="profile"
            src={userEntity.user.photoURL}
          />
        )}
      </Grid>
      <Grid item xs={12} sm={12} md={8} xl={8} lg={8}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography>
              {userEntity ? (
                <span>
                  <span className={classes.userName}>
                    {userEntity.user.userName}
                  </span>
                  {userEntity.user.email === currentUser.email ? (
                    <Link
                      className="no-text-decoration"
                      to={routes.EDIT_PROFILE}
                    >
                      <Button
                        className={classes.btnEdit}
                        size="small"
                        variant="outlined"
                      >
                        Edit profile
                      </Button>
                    </Link>
                  ) : (
                    _renderFollowButtons()
                  )}
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
          <Grid item xs={12} className={classes.biograpyContainer}>
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
