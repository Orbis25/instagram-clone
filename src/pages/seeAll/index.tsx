import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

import { useSelector } from "react-redux";

import { useStyle } from "./style";
import { ICurrentUser, IUser } from "../../models/UserModel";
import { RootState } from "../../redux/reducers";
import UserService from "../../services/userService";
import PostService from "../../services/postService";

const SeeAllPage = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [usersFollowing, setUserFollowing] = useState<string[]>([]);
  const classes = useStyle();
  const currentUser: ICurrentUser = useSelector(
    (state: RootState) => state.AuthReducer.user
  );

  useEffect(() => {
    if (currentUser?.uid) {
      getSuggestionsList();
    }
    // eslint-disable-next-line
  }, [currentUser?.uid]);

  const getSuggestionsList = () => {
    setUsers([]);
    setIsLoading(true);
    new UserService()
      .getSuggestions()
      .then((result) => {
        result.forEach((value) => {
          const usr = value.data() as IUser;
          if (usr.uidUser !== currentUser?.uid) {
            setUsers((x) => [...x, usr]);
          }
        });
      })
      .finally(() => {
        findFollows();
      });
  };

  const findFollows = () => {
    setUserFollowing([]);
    new PostService()
      .getUsersFollowing(currentUser.uid)
      .then((response) => {
        response.docs.forEach((value) => {
          const { uid } = value.data();
          setUserFollowing((x) => [...x, uid]);
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const filter = (userList: IUser[]) => {
    usersFollowing.forEach((id) => {
      userList = userList.filter((x) => x.uidUser !== id);
    });
    return userList;
  };

  return (
    <Container className={classes.container}>
      <Grid container justify="center">
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Typography>
            <b>Suggested</b>
          </Typography>
          <Card className={`custom-card`}>
            <List>
              {!isLoading ? (
                users.length ? (
                  filter(users).map((value, index) => (
                    <SuggestionItem
                      user={value}
                      key={index}
                      currentUserId={currentUser?.uid}
                      getSuggestions={getSuggestionsList}
                    />
                  ))
                ) : (
                  <Typography align="center">Not have suggestions</Typography>
                )
              ) : (
                <Skeleton variant="rect" height={200} />
              )}
            </List>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

type SuggestionProps = {
  user: IUser;
  currentUserId: string;
  getSuggestions: () => void;
};

const SuggestionItem: React.FC<SuggestionProps> = ({
  user,
  currentUserId,
  getSuggestions,
}) => {
  const handleFollow = () => {
    new UserService().followUser(currentUserId, user.uidUser ?? "").then(() => {
      getSuggestions();
    });
  };

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src={user?.photoURL ? user.photoURL : ""} />
      </ListItemAvatar>
      <ListItemText
        primary={<b>{user.userName}</b>}
        secondary={
          <React.Fragment>
            <Typography component="span" variant="body2" color="textPrimary">
              {user.fullName}
            </Typography>
          </React.Fragment>
        }
      />
      <ListItemAvatar>
        <Button onClick={handleFollow} className="btn-primary" size="small">
          Follow
        </Button>
      </ListItemAvatar>
    </ListItem>
  );
};

export default SeeAllPage;
