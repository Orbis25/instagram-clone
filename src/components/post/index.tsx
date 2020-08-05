import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Avatar,
  CardHeader,
  Divider,
  CardMedia,
  CardActions,
  Typography,
  TextField,
  Grid,
  Button,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import TelegramIcon from "@material-ui/icons/Telegram";
import TurnedInNotIcon from "@material-ui/icons/TurnedInNot";
import Carousel from "react-material-ui-carousel";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "../../redux/reducers";
import { useStyles } from "./style";
import { IPost } from "../../models/PostModel";
import { GO_PROFILE } from "../../router/routes.json";
import { ICurrentUser, IUser } from "../../models/UserModel";
import { IComment } from "../../models/PostModel";
import PostService from "../../services/postService";
import UserService from "../../services/userService";

type Props = {
  post: IPost;
};

const Post: React.FC<Props> = ({ post }) => {
  const { user, text, images, firebaseId } = post;
  const [comments, setComments] = useState<IComment[]>([]);
  const [comment, setComment] = useState<string | null>(null);
  const [userLogged, setUserLogged] = useState<IUser | null>(null);

  const service = new PostService();
  const userService = new UserService();
  const classes = useStyles();

  const currentUser: ICurrentUser = useSelector(
    (state: RootState) => state.AuthReducer.user
  );

  useEffect(() => {
    if (firebaseId) {
      getComments(firebaseId);
    }

    if (currentUser?.uid) {
      getUserLogged(currentUser.uid);
    }
    // eslint-disable-next-line
  }, [firebaseId, currentUser.uid]);

  const getUserLogged = (uid: string) => {
    userService.getUserDetailByUid(uid).then((result) => {
      result.forEach((value) => {
        setUserLogged(value.data() as IUser);
      });
    });
  };

  const getComments = (postId: string) => {
    service.getComments(postId).then((results) => {
      let cms: IComment[] = [];
      results.forEach((value) => {
        cms.push(value.data() as IComment);
      });
      setComments(cms);
    });
  };

  const handleSubmitComment = () => {
    if (comment && userLogged !== null && firebaseId) {
      const commentPost: IComment = {
        postId: firebaseId,
        comment: comment,
        userName: userLogged.userName,
        createdAt: new Date(),
      };
      service
        .addComment(commentPost)
        .then(() => {
          setComment("");
          getComments(firebaseId);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const _renderComments = () => {
    return comments.map(({ userName, comment }, index) => (
      <Typography key={index} className={classes.textPost}>
        <Link
          className="no-text-decoration"
          style={{ color: "black", marginRight: 8 }}
          to={`${GO_PROFILE}/${userName}`}
        >
          <b>{userName}</b>
        </Link>

        {comment}
      </Typography>
    ));
  };

  return (
    <Card className={`${classes.cardContainer} custom-card`}>
      <CardHeader
        avatar={
          <Avatar
            className={classes.avatar}
            aria-label="recipe"
            src={user?.photoURL ? user.photoURL : ""}
            alt={`profile-${user.displayName}`}
          />
        }
        title={
          <Link
            to={`${GO_PROFILE}/${user.displayName}`}
            className="no-text-decoration"
            style={{ color: "black" }}
          >
            <b>{user.displayName}</b>
          </Link>
        }
        action={
          <IconButton aria-label="options">
            <MoreVertIcon />
          </IconButton>
        }
      ></CardHeader>
      <Divider />

      {images.length <= 1 ? (
        <CardMedia
          className={classes.imagePost}
          image={images[0]}
          title="Paella dish"
        />
      ) : (
        <Carousel autoPlay={false}>
          {images.map((value: string, index) => (
            <img
              style={{ width: "100%" }}
              className={classes.imagePost}
              src={value}
              alt={`post-img-${index}`}
            />
          ))}
        </Carousel>
      )}

      <CardActions disableSpacing>
        <IconButton>
          <FavoriteBorderIcon />
        </IconButton>
        <IconButton>
          <ChatBubbleOutlineIcon />
        </IconButton>
        <IconButton>
          <TelegramIcon />
        </IconButton>
        <IconButton className={classes.iconSave}>
          <TurnedInNotIcon />
        </IconButton>
      </CardActions>
      <CardContent>
        <div className={classes.textPost}>
          <Typography className={classes.textPost}>
            <Link
              className="no-text-decoration"
              style={{ color: "black", marginRight: 8 }}
              to={`${GO_PROFILE}/${user.displayName}`}
            >
              <b>{user.displayName} </b>
            </Link>
            {text}
          </Typography>
          <p>
            <b className="text-muted-primary">See all comments</b>
          </p>
        </div>
        <div className={classes.textPost}>{_renderComments()}</div>
        <Divider />
        <Grid container className={classes.inputCommentContainer}>
          <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
            <TextField
              size="small"
              variant="outlined"
              multiline
              fullWidth
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="Add comment"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
            <Button
              disabled={comment ? false : true}
              fullWidth
              onClick={handleSubmitComment}
              className={classes.btnComment}
            >
              Public
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Post;
