import React, { useRef, useState } from "react";

import {
  Dialog,
  ListItem,
  ListItemText,
  List,
  Divider,
  Typography,
} from "@material-ui/core";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { useStyles } from "./style";
import { RootState } from "../../../redux/reducers";
import { ICurrentUser } from "../../../models/UserModel";
import UserService from "../../../services/userService";
import { GO_POST } from "../../../router/routes.json";
import SnackBar from "../../shared/snackbars";
import PostService from "../../../services/postService";

type Props = {
  isOpen: boolean;
  userId: string;
  postId: string;
  handleCloseOptions: (value: boolean) => void;
};

const OptionsPost: React.FC<Props> = ({
  isOpen,
  userId,
  postId,
  handleCloseOptions,
}) => {
  const [isSuccessCopy, setIsSuccessCopy] = useState<boolean>(false);
  const inputLinkRef = useRef<HTMLInputElement>(null);
  const classes = useStyles();

  const currentUser: ICurrentUser = useSelector(
    (state: RootState) => state.AuthReducer.user
  );

  const copySharedLink = () => {
    inputLinkRef.current?.select();
    inputLinkRef.current?.setSelectionRange(0, 99999);
    document.execCommand("copy");
    setIsSuccessCopy(true);
    setTimeout(() => {
      setIsSuccessCopy(false);
    }, 2000);
  };

  const handleClose = () => {
    handleCloseOptions(false);
  };

  const handleUnfollow = () => {
    new UserService().unFollowUser(currentUser.uid, userId).then(() => {
      window.location.reload();
    });
  };

  const handleRemove = () => {
    new PostService().removePost(postId, userId).then(() => {
      window.location.reload();
    });
  };

  return (
    <div>
      <Dialog
        className={classes.dialog}
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <SnackBar
          isOpen={isSuccessCopy}
          setOpen={setIsSuccessCopy}
          message="Copied to clipboard!"
          horizontal="center"
          vertical="bottom"
        />
        <List className={classes.listItem}>
          {userId !== currentUser?.uid ? (
            <ListItem className="text-center" alignItems="center" button>
              <ListItemText
                onClick={handleUnfollow}
                primary={
                  <Typography className={classes.unfollowText}>
                    <b>Unfollow</b>
                  </Typography>
                }
              />
            </ListItem>
          ) : (
            <ListItem className="text-center" alignItems="center" button>
              <ListItemText
                onClick={handleRemove}
                primary={
                  <Typography className={classes.unfollowText}>
                    <b>Remove</b>
                  </Typography>
                }
              />
            </ListItem>
          )}

          <Divider />
          <ListItem className="text-center" alignItems="center" button>
            <ListItemText
              primary={
                <Link
                  className="no-text-decoration text-center text-link"
                  to={`${GO_POST}/${postId}/${userId}`}
                >
                  <Typography>Go to post</Typography>
                </Link>
              }
            />
          </ListItem>
          <Divider />

          <ListItem className="text-center" alignItems="center" button>
            <input
              ref={inputLinkRef}
              aria-hidden="true"
              style={{ position: "absolute", left: "-999em" }}
              defaultValue={`${window.location.href}${GO_POST}/${postId}/${userId}`}
            />

            <ListItemText
              onClick={copySharedLink}
              primary={<Typography>Copy link</Typography>}
            />
          </ListItem>
          <Divider />

          <ListItem className="text-center" alignItems="center" button>
            <ListItemText
              onClick={handleClose}
              primary={<Typography>Cancel</Typography>}
            />
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
};

export default OptionsPost;
