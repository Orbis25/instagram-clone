import React, { useState, useEffect } from "react";
import {
  Grid,
  Container,
  Typography,
  Avatar,
  TextField,
  Button,
  TextareaAutosize,
  Select,
  MenuItem,
  CircularProgress,
  Dialog,
  DialogTitle,
  Paper,
} from "@material-ui/core";
import { Formik } from "formik";
import { useSelector } from "react-redux";

import { RootState } from "../../../redux/reducers";
import { useStyles } from "../style";
import { validationSchema } from "./util";
import { IUser, ICurrentUser, IUserEntity } from "../../../models/UserModel";
import SnackBar from "../../shared/snackbars";
import UserService from "../../../services/userService";

const EditProfile = () => {
  const classes = useStyles();
  const service = new UserService();
  const [isSuccessUpdate, setIsSuccessUpdate] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [openUploadPicDialog, setOpenUploadPicDialog] = useState<boolean>(
    false
  );
  const [user, setUser] = useState<IUserEntity>({
    docId: "",
    user: {
      email: "",
      fullName: "",
      userName: "",
      biography: "",
      phoneNumber: "",
      website: "",
      gender: "Male",
    },
  });

  const currentUser: ICurrentUser = useSelector(
    (state: RootState) => state.AuthReducer.user
  );

  useEffect(() => {
    if (currentUser) {
      getUserProfile();
    }
    // eslint-disable-next-line
  }, [currentUser]);

  const getUserProfile = () => {
    service.getUserDetailByUid(currentUser.uid).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const result = doc.data() as IUser;
        setEmail(result.email);
        setUser({
          docId: doc.id,
          user: result,
        });
      });
    });
  };

  const handleUpdate = (model: IUser) => {
    if (model.email !== email && password.length) {
      service
        .update(user.docId, model, { email, password })
        .then(() => {
          setIsSuccessUpdate(true);
          getUserProfile();
        })
        .catch((e) => {
          console.log(e);
        });
      setPasswordError(false);
    } else if (model.email === email) {
      service
        .update(user.docId, model, { email, password })
        .then(() => {
          setIsSuccessUpdate(true);
          getUserProfile();
        })
        .catch((e) => {
          console.log(e);
        });
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const UploadImage = () => {
    const [avatar, setAvatar] = useState<any>("");
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const handleChange = (e: any) => {
      setAvatar(e.target.files[0]);
    };

    const uploadAvatar = () => {
      setIsUploading(true);
      service
        .uploadImage(avatar, currentUser.uid, user.docId)
        ?.then(() => {
          getUserProfile();
          setOpenUploadPicDialog(false);
        })
        .catch((err) => {
          console.log(err);
          setOpenUploadPicDialog(false);
        })
        .finally(() => {
          setIsUploading(false);
        });
    };
    return (
      <Dialog
        onClose={() => setOpenUploadPicDialog(false)}
        open={openUploadPicDialog}
        aria-labelledby="simple-dialog-title"
      >
        <Paper style={{ height: 400, width: 400 }}>
          <DialogTitle id="simple-dialog-title">Upload Avatar</DialogTitle>
          <Grid container justify="center">
            {!isUploading ? (
              <Grid item>
                <input
                  onChange={(e) => handleChange(e)}
                  className={classes.textFields}
                  type="file"
                />
                <Button onClick={uploadAvatar} className="btn-primary">
                  Upload
                </Button>
              </Grid>
            ) : (
              <Grid item>
                <CircularProgress size={100} />
              </Grid>
            )}
          </Grid>
        </Paper>
      </Dialog>
    );
  };

  return (
    <Container className={classes.editProfileContent}>
      <SnackBar
        isOpen={isSuccessUpdate}
        setOpen={setIsSuccessUpdate}
        message="Profile Updated!"
        horizontal="right"
        vertical="bottom"
      />
      {user.docId.length ? (
        <Grid container justify="center">
          <Grid item xs={12}>
            <Grid container justify="center">
              <Grid item xs={12} sm={2} md={1} lg={1} xl={1}>
                <Avatar
                  alt="profile"
                  src={
                    currentUser.photoURL !== null
                      ? `${currentUser.photoURL}?t=${Date.now()}`
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <Typography className={classes.userNameText}>
                  {user.user.userName}
                </Typography>
                <span>
                  <b
                    onClick={() => setOpenUploadPicDialog(true)}
                    className={classes.changeProfilePhotoText}
                  >
                    <UploadImage />
                    Change Profile Photo
                  </b>
                </span>
              </Grid>
            </Grid>
            <Grid
              container
              justify="center"
              className={classes.editProfileForm}
            >
              <Grid item xs={12} sm={12} xl={8} md={8} lg={8}>
                <Formik
                  enableReinitialize
                  initialValues={user.user}
                  validationSchema={validationSchema}
                  onSubmit={(values) => handleUpdate(values)}
                >
                  {({
                    values,
                    handleBlur,
                    handleSubmit,
                    handleChange,
                    errors,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <Grid container>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            placeholder="Fullname"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={errors.fullName ? true : false}
                            helperText={
                              errors.fullName
                                ? errors.fullName
                                : "Help people discover your account by using the name you're known by: either your full name, nickname, or business name."
                            }
                            variant="outlined"
                            size="small"
                            className={classes.textFields}
                            value={values.fullName}
                            name="fullName"
                          />
                          <TextField
                            fullWidth
                            placeholder="Username"
                            variant="outlined"
                            size="small"
                            className={classes.textFields}
                            name="userName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.userName}
                            error={errors.userName ? true : false}
                            helperText={errors.userName}
                          />
                          <TextField
                            fullWidth
                            placeholder="Website"
                            variant="outlined"
                            size="small"
                            className={classes.textFields}
                            name="website"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.website}
                          />
                          <TextareaAutosize
                            placeholder="Bio"
                            className={classes.textFields}
                            name="biography"
                            rowsMax={4}
                            style={{ width: "100%", height: 40 }}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.biography}
                          />
                          <TextField
                            fullWidth
                            placeholder="Email"
                            variant="outlined"
                            size="small"
                            className={classes.textFields}
                            name="email"
                            onChange={(e) => {
                              handleChange(e);
                            }}
                            onBlur={handleBlur}
                            value={values.email}
                            error={errors.email ? true : false}
                            helperText={errors.email}
                          />

                          {values.email !== email && (
                            <TextField
                              fullWidth
                              size="small"
                              placeholder="password"
                              helperText="is required if you changed the email"
                              className={classes.textFields}
                              variant="outlined"
                              name="password"
                              type="password"
                              error={passwordError}
                              value={password}
                              onChange={(event) =>
                                setPassword(event.target.value)
                              }
                            />
                          )}

                          <TextField
                            fullWidth
                            placeholder="Phone Number"
                            variant="outlined"
                            size="small"
                            className={classes.textFields}
                            name="phoneNumber"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.phoneNumber}
                            error={errors.phoneNumber ? true : false}
                            helperText={errors.phoneNumber}
                          />
                          <Select
                            fullWidth
                            name="gender"
                            variant="outlined"
                            style={{ height: 40 }}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.gender}
                            className={classes.textFields}
                          >
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                          </Select>
                          <Button
                            type="submit"
                            className="btn-primary"
                            size="small"
                            variant="contained"
                          >
                            Submit
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                  )}
                </Formik>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid container justify="center">
          <Grid item>
            <CircularProgress size={100} />
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default EditProfile;
