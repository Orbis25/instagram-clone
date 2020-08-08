import React, { useEffect, useState } from "react";
import { Grid, Avatar, Typography } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { Link } from "react-router-dom";

import { useStyles } from "./style";
import { IComment } from "../../models/PostModel";
import { IUser } from "../../models/UserModel";
import UserService from "../../services/userService";
import { GO_PROFILE } from "../../router/routes.json";

type props = {
  cmt: IComment;
};

const CommentPost: React.FC<props> = ({ cmt }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const { comment, userId } = cmt;
  const userSvc = new UserService();

  useEffect(() => {
    if (userId) {
      getUser(userId);
    }
    // eslint-disable-next-line
  }, [userId]);

  const getUser = (id: string) => {
    userSvc.getUserDetailByUid(id).then((result) => {
      result.forEach((value) => {
        setUser(value.data() as IUser);
      });
    });
  };

  const classes = useStyles();
  return (
    <Grid container spacing={1}>
      <Grid item xs={3}>
        {user ? (
          <Avatar
            src={user?.photoURL !== null ? user.photoURL : ""}
            alt="avatar"
          />
        ) : (
          <Skeleton variant="circle" />
        )}
      </Grid>
      <Grid item xs={9}>
        <Typography className={classes.userName}>
          <Link
            to={`${GO_PROFILE}/${user?.userName}`}
            className="no-text-decoration"
            style={{ color: "black" }}
          >
            {user ? <b>{user?.userName}</b> : <Skeleton variant="text" />}
          </Link>
          <span> {comment} </span>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default CommentPost;
