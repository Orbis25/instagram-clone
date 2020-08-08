import React, { useEffect, useState } from "react";
import {
  Card,
  Avatar,
  Divider,
  Typography,
  TextField,
  Grid,
  Button,
  Container,
  CircularProgress,
  CardMedia,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Skeleton from "@material-ui/lab/Skeleton";
import Carousel from "react-material-ui-carousel";
import { useSelector } from "react-redux";

import { RootState } from "../../redux/reducers";
import CommentPost from "../../components/commentPostList";
import { IPost, IComment } from "../../models/PostModel";
import { useStyles } from "./style";
import PostService from "../../services/postService";
import UserService from "../../services/userService";
import { IUser, ICurrentUser } from "../../models/UserModel";
import { formatDate } from "../../helpers/dateTimeHelper";

const PostPage = () => {
  const [post, setPost] = useState<IPost | null>(null);
  const [comments, setComments] = useState<IComment[]>([]);
  const [comment, setComment] = useState<string>("");
  const [isLoadingComment, setIsLoadingComment] = useState<boolean>(false);
  const [userNamePost, setUserNamePost] = useState<string>("");
  const classes = useStyles();
  const { id, userId } = useParams();
  const postService = new PostService();

  const currentUser: ICurrentUser = useSelector(
    (state: RootState) => state.AuthReducer.user
  );

  useEffect(() => {
    if (id && userId) {
      getPost(id, userId);
      getPostComments(id);
      getUserNamePosted();
    }
    // eslint-disable-next-line
  }, [id, userId]);

  const getPost = (id: string, uid: string) => {
    postService.getPost(id, uid).then((result) => {
      result.forEach((value) => {
        const pst = value.data() as IPost;
        setPost(pst);
      });
    });
  };

  const getPostComments = (id: string) => {
    postService.getAllComments(id).then((results) => {
      let cms: IComment[] = [];
      results.forEach((value) => {
        cms.push(value.data() as IComment);
      });
      setComments(cms);
    });
  };

  const handleAddNewComment = () => {
    setIsLoadingComment(true);
    const cm: IComment = {
      comment: comment,
      createdAt: new Date(),
      userId: currentUser.uid,
      postId: id,
    };
    new PostService()
      .addComment(cm)
      .then(() => {
        getPostComments(id);
        setComment("");
      })
      .finally(() => {
        setIsLoadingComment(false);
      });
  };

  const getUserNamePosted = () => {
    new UserService().getUserDetailByUid(userId).then((result) => {
      result.forEach((value) => {
        const { userName } = value.data() as IUser;
        setUserNamePost(userName);
      });
    });
  };

  return (
    <Grid container justify="center">
      <Grid item xs={10} sm={10} md={10} lg={9} xl={9}>
        <Card className={`${classes.card} custom-card`}>
          <Grid container>
            <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
              {post ? (
                post.images.length === 1 ? (
                  <CardMedia
                    className={`image-post ${classes.cardImage}`}
                    image={post?.images[0]}
                    title="Paella dish"
                  />
                ) : (
                  <Carousel autoPlay={false}>
                    {post.images.map((value: string, index) => (
                      <CardMedia
                        className={`image-post ${classes.cardImage}`}
                        key={index}
                        image={value}
                        title="Paella dish"
                      />
                    ))}
                  </Carousel>
                )
              ) : (
                <Skeleton variant="rect" height={600} />
              )}
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
              <Container>
                <Grid className={classes.userPoted} container spacing={4}>
                  <Grid item xs={2}>
                    {post && (
                      <Avatar
                        src={post.user?.photoURL ? post.user.photoURL : ""}
                        alt="avatar"
                      />
                    )}
                  </Grid>
                  <Grid item xs={7}>
                    {post ? (
                      <Typography className={classes.userNamePosted}>
                        <b>{userNamePost}</b> <br />
                        <span className="text-muted-primary">
                          {formatDate(post.createdAt)}
                        </span>
                      </Typography>
                    ) : (
                      <Skeleton variant="text" />
                    )}
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton>
                      <MoreVertIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Container>
              <Divider />
              <Container className={classes.commentsContainer}>
                {post && <p>{post.text} </p>}
                <Grid container>
                  <Grid item>
                    {comments.map((comment, index) => (
                      <CommentPost cmt={comment} key={index} />
                    ))}
                  </Grid>
                </Grid>
              </Container>
              <Container>
                <Grid container>
                  <Grid item xs={10}>
                    <TextField
                      fullWidth
                      multiline
                      variant="outlined"
                      placeholder="Add comment..."
                      size="small"
                      value={comment}
                      onChange={(event) => setComment(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={2} className="text-center">
                    {isLoadingComment ? (
                      <CircularProgress size={30} />
                    ) : (
                      <Button
                        onClick={handleAddNewComment}
                        disabled={!comment ? true : false}
                        className="text-primary"
                      >
                        Post
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Container>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PostPage;
