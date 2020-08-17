import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Avatar,
  CardHeader,
  Divider,
  CardMedia,
  Typography,
  TextField,
  Grid,
  Button,
  CircularProgress,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Carousel from "react-material-ui-carousel";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "../../redux/reducers";
import { useStyles } from "./style";
import { IPost } from "../../models/PostModel";
import { GO_PROFILE, GO_POST } from "../../router/routes.json";
import { ICurrentUser, IUser } from "../../models/UserModel";
import { IComment } from "../../models/PostModel";
import PostService from "../../services/postService";
import UserService from "../../services/userService";
import { formatDate } from "../../helpers/dateTimeHelper";
import CommentList from "./commentList";
import PostActions from "../postActions";
import OptionsPost from "./optionsPost";
import NotificationService from "../../services/notificationService";
import {
  INotification,
  NotificationType,
} from "../../models/NotificationModels";

type Props = {
  post: IPost;
};

const Post: React.FC<Props> = ({ post }) => {
  const { user, text, images, postId, createdAt } = post;
  const [comments, setComments] = useState<IComment[]>([]);
  const [comment, setComment] = useState<string>("");
  const [userLogged, setUserLogged] = useState<IUser | null>(null);
  const [userPosted, setUserPosted] = useState<IUser | null>(null);
  const [isLoadingComment, setIsLoadingComment] = useState<boolean>(false);
  const [isOpenOptions, setIsOpenOptions] = useState<boolean>(false);

  const service = new PostService();
  const userService = new UserService();
  const classes = useStyles();

  const currentUser: ICurrentUser = useSelector(
    (state: RootState) => state.AuthReducer.user
  );

  useEffect(() => {
    if (postId) {
      getComments(postId);
    }

    if (currentUser?.uid) {
      getUserLogged(currentUser.uid);
    }

    if (user) {
      getUserNamePosted();
    }
    // eslint-disable-next-line
  }, [postId, currentUser.uid, user]);

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
    if (
      comment &&
      userLogged !== null &&
      postId &&
      userLogged?.uidUser !== undefined &&
      userLogged?.uidUser !== null
    ) {
      setIsLoadingComment(true);

      const commentPost: IComment = {
        userId: userLogged.uidUser,
        postId: post.postId,
        comment: comment,
        createdAt: new Date(),
      };

      const _notification: INotification = {
        PostId: post.postId,
        type: NotificationType.Commnet,
        userIdOwnerPost: post.user.uid,
        userIdNotification: userLogged?.uidUser,
      };

      if (post.user.uid !== userLogged?.uidUser) {
        new NotificationService().create(_notification).then(() => {});
        service
          .addComment(commentPost)
          .then(() => {
            setComment("");
            getComments(postId);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setIsLoadingComment(false);
          });
      } else {
        service
          .addComment(commentPost)
          .then(() => {
            setComment("");
            getComments(postId);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setIsLoadingComment(false);
          });
      }
    }
  };

  const getUserNamePosted = () => {
    userService.getUserDetailByUid(user.uid).then((result) => {
      result.forEach((value) => {
        const result = value.data() as IUser;
        setUserPosted(result);
      });
    });
  };

  const handleOpenOptions = () => {
    setIsOpenOptions(true);
  };

  return (
    <Card className={`${classes.cardContainer} custom-card`}>
      <CardHeader
        avatar={
          <Avatar
            className={classes.avatar}
            aria-label="recipe"
            src={userPosted?.photoURL ? userPosted.photoURL : ""}
            alt={`profile-${user.displayName}`}
          />
        }
        title={
          <Link
            to={`${GO_PROFILE}/${user.displayName}`}
            className="no-text-decoration"
            style={{ color: "black" }}
          >
            <b>{userPosted?.userName}</b>
          </Link>
        }
        action={
          <IconButton onClick={handleOpenOptions} aria-label="options">
            <MoreVertIcon />
          </IconButton>
        }
      ></CardHeader>
      <OptionsPost
        postId={postId}
        userId={user.uid}
        isOpen={isOpenOptions}
        handleCloseOptions={setIsOpenOptions}
      />
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
              key={index}
              style={{ width: "100%" }}
              className={classes.imagePost}
              src={value}
              alt={`post-img-${index}`}
            />
          ))}
        </Carousel>
      )}
      <PostActions
        postId={postId}
        userId={currentUser?.uid ?? ""}
        userPostedId={user.uid}
      />
      <CardContent>
        <div className={classes.textPost}>
          <Typography className={classes.textPost}>
            <Link
              className="no-text-decoration"
              style={{ color: "black", marginRight: 8 }}
              to={`${GO_PROFILE}/${userPosted?.userName}`}
            >
              <b>{userPosted?.userName} </b>
            </Link>
            {text}
          </Typography>
          <Link
            className="no-text-decoration"
            style={{ color: "black", marginRight: 8 }}
            to={`${GO_POST}/${postId}/${user.uid}`}
          >
            <p>
              <b className="text-muted-primary">See all comments</b>
            </p>
          </Link>
        </div>
        <div className={classes.textPost}>
          {comments.map((value, index) => (
            <CommentList
              userId={value.userId}
              key={index}
              comment={value.comment}
            />
          ))}
          <br />
          <span className="text-muted-primary">{formatDate(createdAt)}</span>
        </div>
        <br />
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
          <Grid
            item
            xs={12}
            sm={12}
            md={2}
            lg={2}
            xl={2}
            className="text-center"
          >
            {isLoadingComment ? (
              <CircularProgress size={30} />
            ) : (
              <Button
                disabled={comment ? false : true}
                fullWidth
                onClick={handleSubmitComment}
                className={classes.btnComment}
              >
                Public
              </Button>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Post;
