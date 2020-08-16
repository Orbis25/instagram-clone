import React, { useEffect, useState } from "react";
import { Grid, Container , Hidden } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";

import { RootState } from "../../redux/reducers";
import Post from "../../components/post";
import { useStyles } from "./style";
import { ICurrentUser, IUser } from "../../models/UserModel";
import UserService from "../../services/userService";
import Suggestions from "../../components/homeSuggestions";
import PostService from "../../services/postService";
import { IPost } from "../../models/PostModel";
import { getCurrentUser } from "../../redux/actions/users/auth";
import NoFeed from "../../components/noFeed";

const HomePage = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [users, setUsers] = useState<IUser[]>([]);
  const [post, setPost] = useState<IPost[]>([]);
  const [usersFollowingId, setUsersFollowingId] = useState<string[]>([]);
  const service = new UserService();
  const postService = new PostService();
  const classes = useStyles();
  const dispach = useDispatch();

  const currentUser: ICurrentUser = useSelector(
    (state: RootState) => state.AuthReducer.user
  );

  useEffect(() => {
    dispach(getCurrentUser());
    if (currentUser) {
      getUserDetail();
      getAllUsers();
      findFollows();
    }
    // eslint-disable-next-line
  }, [currentUser]);

  const getUserDetail = () => {
    service.getUserDetailByUid(currentUser.uid).then((result) => {
      result.docs.forEach((data) => {
        setUser(data.data() as IUser);
      });
    });
  };

  const getAllUsers = () => {
    setUsers([]);
    service.getAllSuggestions().then((result) => {
      result.docs.forEach((values) => {
        const result = values.data() as IUser;
        if (result.uidUser !== currentUser.uid) {
          setUsers((x) => [...x, result]);
        }
      });
    });
  };

  const findFollows = () => {
    getPosts(currentUser.uid);
    setUsersFollowingId([]);
    postService.getUsersFollowing(currentUser.uid).then((response) => {
      response.docs.forEach((value) => {
        const { uid } = value.data();
        setUsersFollowingId((x) => [...x, uid]);
        getPosts(uid);
      });
    });
  };

  const getPosts = (uid: string) => {
    postService.getAll(uid).then((queryResult) => {
      queryResult.docs.forEach((result) => {
        const post = result.data() as IPost;
        post.firebaseId = result.id;
        setPost((x) => [...x, post]);
      });
    });
  };

  const _renderPosts = () => {
    return post.length ? (
      post.map((value, index) => <Post post={value} key={index} />)
    ) : (
      <NoFeed />
    );
  };
  return (
    <Container className={classes.container}>
      <Grid container justify="center" spacing={4}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          {_renderPosts()}
        </Grid>
        <Grid item xs={3}>
          <Hidden xsDown smDown >
            {currentUser && user && users ? (
              <Suggestions
                user={{
                  displayName: currentUser.displayName,
                  email: currentUser.email,
                  phoneNumber: currentUser.phoneNumber,
                  photoURL: currentUser.photoURL,
                  uid: currentUser.uid,
                  emailVerified: currentUser.emailVerified,
                }}
                fullName={user.fullName}
                usersSuggestions={users}
                usersFollowing={usersFollowingId}
              />
            ) : (
              <Skeleton variant="rect" height={118} />
            )}
          </Hidden>
        </Grid>
      </Grid>
    </Container>
  );
};
export default HomePage;
