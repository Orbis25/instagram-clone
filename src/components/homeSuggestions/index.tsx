import React, { useState, useRef, useEffect } from "react";
import {
  Avatar,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  InputBase,
  DialogActions,
  IconButton,
  Button,
  GridList,
  CircularProgress,
} from "@material-ui/core";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import { Link } from "react-router-dom";

import { GO_PROFILE, SUGGEDTED } from "../../router/routes.json";
import { useStyles } from "./style";
import { SuggestionsProps } from "./types";
import PostService from "../../services/postService";
import UserService from "../../services/userService";
import { IPost } from "../../models/PostModel";
import { IUser } from "../../models/UserModel";

const Suggestions: React.FC<SuggestionsProps> = ({
  user,
  fullName,
  usersSuggestions,
  usersFollowing,
}) => {
  const classes = useStyles();

  const filter = (userList: IUser[]) => {
    usersFollowing.forEach((id) => {
      userList = userList.filter((x) => x.uidUser !== id);
    });
    return userList;
  };

  //internal component
  const NewPublication = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [publicationComment, setPublicationComment] = useState<string>("");
    const [fontSizeComment, setFontSizeComment] = useState<number>(40);
    const [images, setImages] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [userToPublication, setUserToPublication] = useState<IUser | null>(
      null
    );
    const [errorMessage, setErrorMessage] = useState<string>("");

    const inputFile = useRef<any>(null);

    useEffect(() => {
      if (user.uid) {
        getUser(user.uid);
      }
      // eslint-disable-next-line
    }, [user.uid]);

    const getUser = (id: string) => {
      new UserService().getUserDetailByUid(id).then((response) => {
        response.docs.forEach((result) => {
          const model = result.data() as IUser;
          setUserToPublication(model);
        });
      });
    };

    const handlePublicComment = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPublicationComment(e.target.value);
      if (publicationComment.length >= 25) {
        setFontSizeComment(18);
      } else {
        setFontSizeComment(40);
      }
    };

    const readImage = () => {
      inputFile.current.click();
    };

    const handleUploadPics = (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsLoading(true);
      const service = new PostService();
      if (e.target.files?.length && userToPublication?.userName) {
        service
          .uploadImage(e.target.files[0], userToPublication?.userName)
          .then((result: string) => {
            setImages((oldArray) => [...oldArray, result]);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => setIsLoading(false));
      } else {
        setIsLoading(false);
      }
    };

    const handleSubmit = () => {
      setIsLoading(true);
      const service = new PostService();
      if (userToPublication !== null) {
        const model: IPost = {
          postId: `${Date.now()}-${user.uid}`,
          firebaseId: null,
          createdAt: new Date(),
          images: images,
          text: publicationComment,
          user: {
            email: user.email,
            displayName: userToPublication?.userName,
            uid: user.uid,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified,
            phoneNumber: user.phoneNumber,
          },
        };

        if (images.length) {
          setErrorMessage("");
          service
            .create(model)
            .then(() => {
              setIsOpen(false);
              setImages([]);
              setPublicationComment("");
              window.location.reload();
            })
            .finally(() => setIsLoading(false));
        } else {
          setIsLoading(false);
          setErrorMessage("Remenber upload a pic to public a post!")
        }
      }
    };

    const handleClose = () => {
      setIsOpen(false);
      handleClear();
    };

    const handleClear = () => {
      setImages([]);
      setPublicationComment("");
      setErrorMessage("")
    };

    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography className={classes.followText}>
            <b onClick={() => setIsOpen(true)}>New publication</b>
          </Typography>
        </Grid>
        <Grid item>
          <Dialog
            onClose={handleClose}
            aria-labelledby="simple-dialog-title"
            open={isOpen}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle id="simple-dialog-title">New Publication</DialogTitle>
            <DialogContent>
              <Grid container>
                <Grid item xs={12}>
                  <InputBase
                    fullWidth
                    margin="dense"
                    style={{ fontSize: fontSizeComment }}
                    onChange={handlePublicComment}
                    multiline
                    value={publicationComment}
                    className={classes.inputPost}
                    placeholder="What are you thinking?"
                  />
                </Grid>
                <Grid item xs={12} className={classes.rootGridList}>
                  <GridList
                    cellHeight={100}
                    cols={5}
                    className={classes.gridList}
                  >
                    {images.map((value, index) => (
                      <img
                        width={40}
                        src={value}
                        key={index}
                        alt={`publication-${index}`}
                      />
                    ))}
                  </GridList>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <div>
                  <Typography style={{ color: "#ED4956" }}>
                    {errorMessage}
                  </Typography>
                  <IconButton onClick={readImage}>
                    <PhotoCameraIcon />
                  </IconButton>
                  <input
                    type="file"
                    id="file"
                    ref={inputFile}
                    onChange={handleUploadPics}
                    accept="image/x-png,image/jpeg"
                    style={{ display: "none" }}
                    multiple
                  />
                  <Button
                    style={{ marginRight: 10 }}
                    onClick={handleSubmit}
                    className="btn-primary"
                    variant="contained"
                  >
                    Share
                  </Button>
                  <Button onClick={handleClear} variant="contained">
                    Clear
                  </Button>
                </div>
              )}
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    );
  };

  return (
    <Grid container spacing={4}>
      <Grid item md={3}>
        <Avatar
          alt="avatar"
          src={user.photoURL ? user.photoURL : ""}
          className={classes.avatarProfile}
        />
      </Grid>
      <Grid item md={8}>
        <Typography>
          <b>{fullName}</b>
        </Typography>
        <Typography className="text-muted-primary">
          {user.displayName}
        </Typography>
        <NewPublication />
      </Grid>
      <Grid item md={12}>
        <Grid container>
          <Grid item xs={9}>
            <Typography>
              <b className={`${classes.suggestionText} text-muted-primary `}>
                Suggenstions for you
              </b>
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>
              <Link className="no-text-decoration text-link" to={SUGGEDTED}>
                <b className={classes.suggestionText}>See all</b>
              </Link>
            </Typography>
          </Grid>
        </Grid>
        <List>
          {filter(usersSuggestions).map((value, index) => (
            <ListItem key={index} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt={`avatar-${index}`}
                  src={value?.photoURL ? value.photoURL : ""}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Link
                    className="no-text-decoration"
                    style={{ color: "black" }}
                    to={`${GO_PROFILE}/${value.userName}`}
                  >
                    <b className={classes.seeAllSuggesstions}>
                      {value.userName}
                    </b>
                  </Link>
                }
              />
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default Suggestions;
