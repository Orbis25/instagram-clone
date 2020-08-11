import React, { useEffect, useState } from "react";
import { CardActions } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import TurnedInNotIcon from "@material-ui/icons/TurnedInNot";
import TurnedInIcon from "@material-ui/icons/TurnedIn";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Link } from "react-router-dom";

import { GO_POST } from "../../router/routes.json";
import PostService from "../../services/postService";
import { useStyles } from "./style";
import { ILikePost, ISavedPost } from "../../models/PostModel";

type Props = {
  postId: string;
  userId: string;
};

const PostAction: React.FC<Props> = (props) => {
  const { postId, userId } = props;
  const [isNoLiked, setisnoLiked] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const classes = useStyles();

  useEffect(() => {
    if (postId && userId) {
      handleCheckLike();
      checkSaved();
    }
    // eslint-disable-next-line
  }, [postId, userId]);

  const handleCheckLike = () => {
    const model: ILikePost = {
      postId,
      userId,
    };
    new PostService().checkLike(model).then((result) => {
      setisnoLiked(result);
    });
  };

  const checkSaved = () => {
    const model: ISavedPost = {
      postId,
      userId,
    };
    new PostService().checkPostsaved(model).then((result) => {
      setIsSaved(result);
    });
  };

  const handleLike = () => {
    const model: ILikePost = {
      postId,
      userId,
    };
    new PostService().addLike(model).then(() => {
      setisnoLiked(false);
    });
  };

  const handleRemoveLike = () => {
    const model: ILikePost = {
      postId,
      userId,
    };
    new PostService()
      .removeLike(model)
      .then(() => {
        setisnoLiked(true);
      })
      .catch(() => setisnoLiked(false));
  };

  const handleSavePost = () => {
    const model: ISavedPost = {
      postId,
      userId,
    };
    new PostService()
      .savePost(model)
      .then(() => {
        setIsSaved(true);
      })
      .catch(() => {
        setIsSaved(false);
      });
  };

  const handleRemoveSavedPost = () => {
    const model: ISavedPost = {
      postId,
      userId,
    };
    new PostService()
      .removeSavedPost(model)
      .then(() => {
        setIsSaved(false);
      })
      .catch(() => setIsSaved(true));
  };

  return (
    <CardActions disableSpacing>
      {isNoLiked ? (
        <IconButton onClick={handleLike}>
          <FavoriteBorderIcon />
        </IconButton>
      ) : (
        <IconButton onClick={handleRemoveLike}>
          <FavoriteIcon className={classes.liked} />
        </IconButton>
      )}
      <Link
        className="text-muted-primary no-text-decoration"
        to={`${GO_POST}/${postId}/${userId}`}
      >
        <IconButton>
          <ChatBubbleOutlineIcon />
        </IconButton>
      </Link>

      {isSaved ? (
        <IconButton
          onClick={handleRemoveSavedPost}
          className={classes.iconSave}
        >
          <TurnedInIcon />
        </IconButton>
      ) : (
        <IconButton onClick={handleSavePost} className={classes.iconSave}>
          <TurnedInNotIcon />
        </IconButton>
      )}
    </CardActions>
  );
};

export default PostAction;
