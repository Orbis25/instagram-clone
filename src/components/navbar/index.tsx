import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Container,
  Grid,
  MenuItem,
  Popper,
  Paper,
  ClickAwayListener,
  Grow,
  MenuList,
  Divider,
  Hidden,
  Typography,
} from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Avatar from "@material-ui/core/Avatar";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import { RouteProps } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SettingsIcon from "@material-ui/icons/Settings";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import { useStyles } from "./styles";
import {
  LOGIN,
  REGISTER,
  RESET_PASSWORD,
  GO_PROFILE,
  EDIT_PROFILE,
  HOME,
  NOTIFICATIONS,
} from "../../router/routes.json";
import { RootState } from "../../redux/reducers";
import { getCurrentUser } from "../../redux/actions/users/auth";
import { ICurrentUser, IUser } from "../../models/UserModel";
import AuthService from "../../services/authService";
import UserService from "../../services/userService";
import NotificationService from "../../services/notificationService";

import {
  INotification,
  NotificationState,
} from "../../models/NotificationModels";

import SearchBar from "./searchbar/index";

const Navbar: React.FC<RouteProps & RouteComponentProps> = ({ location }) => {
  const [userCurrent, setUserCurrent] = React.useState<IUser | null>(null);

  const [haveNewNotification, setHaveNewNotification] = React.useState<boolean>(
    false
  );

  const service = new AuthService();
  const classes = useStyles();
  const dispach = useDispatch();

  const user: ICurrentUser = useSelector(
    (state: RootState) => state.AuthReducer.user
  );

  useEffect(() => {
    dispach(getCurrentUser());
    if (user?.uid) {
      getUser();
      getNotifications();
    }
    // eslint-disable-next-line
  }, [dispach, user?.uid]);

  const getNotifications = () => {
    setHaveNewNotification(false);
    new NotificationService()
      .getNotifications(user?.uid)
      .onSnapshot((results) => {
        setHaveNewNotification(false);
        results.forEach((val) => {
          const _notification = val.data() as INotification;
          if (_notification.state === NotificationState.Active) {
            setHaveNewNotification(true);
          }
        });
      });
  };

  const getUser = () => {
    new UserService().getUserDetailByUid(user.uid).then((result) => {
      result.forEach((val) => {
        setUserCurrent(val.data() as IUser);
      });
    });
  };

  //internal component
  function ProfileAvatar() {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: React.MouseEvent<EventTarget>) => {
      if (
        anchorRef.current &&
        anchorRef.current.contains(event.target as HTMLElement)
      ) {
        return;
      }

      setOpen(false);
    };

    function handleListKeyDown(event: React.KeyboardEvent) {
      if (event.key === "Tab") {
        event.preventDefault();
        setOpen(false);
      }
    }

    const logout = () => {
      service.logout();
    };

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
      if (prevOpen.current === true && open === false) {
        anchorRef.current!.focus();
      }

      prevOpen.current = open;
    }, [open]);

    return (
      <div>
        <span
          className={classes.toggleMenu}
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          {user?.photoURL !== undefined && (
            <Avatar
              className={classes.smallAvatar}
              alt="logo.png"
              src={`${user?.photoURL}?t=${Date.now()}`}
            />
          )}
        </span>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem className={classes.links} onClick={handleClose}>
                      <AccountCircleIcon className={classes.iconsMenu} />
                      <Link
                        className="no-text-decoration text-muted-primary"
                        to={`${GO_PROFILE}/${userCurrent?.userName}`}
                      >
                        Profile
                      </Link>
                    </MenuItem>
                    <MenuItem className={classes.links} onClick={handleClose}>
                      <SettingsIcon className={classes.iconsMenu} />
                      <Link
                        className="no-text-decoration  text-muted-primary"
                        to={EDIT_PROFILE}
                      >
                        Configuration
                      </Link>
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      className={classes.links}
                      onClick={(event) => {
                        handleClose(event);
                        logout();
                      }}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    );
  }

  const _renderIcons = () => {
    return (
      <Grid className={classes.appSectionIcons} item xs={4}>
        <Link to={HOME}>
          <HomeOutlinedIcon className={classes.iconColor} />
        </Link>
        <Link to={NOTIFICATIONS}>
          {haveNewNotification ? (
            <FavoriteIcon
              className={`${classes.hasNotification} ${classes.inconleft}`}
            />
          ) : (
            <FavoriteBorderIcon
              className={`${classes.iconColor} ${classes.inconleft}`}
            />
          )}
        </Link>

        <ProfileAvatar />
      </Grid>
    );
  };

  const Header = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const menuRoutes = [
      { text: "Home", route: HOME },
      { text: "Notifications", route: NOTIFICATIONS },
      { text: "Profile", route: `${GO_PROFILE}/${userCurrent?.userName}` },
    ];

    const _renderMenu = () => {
      return menuRoutes.map((value, index) => (
        <li key={index} className={classes.textMenuIten}>
          <Link className="no-text-decoration text-link" to={value.route}>
            <Typography>{value.text}</Typography>
          </Link>
        </li>
      ));
    };

    const handleLogout = () => {
      new AuthService().logout();
    };

    const handleMenuShowOrHide = () => {
      setIsOpen(!isOpen);
    };

    return (
      <div style={{ flexGrow: 1, marginBottom: 80 }}>
        <AppBar position="fixed" className={classes.appBar}>
          <Container>
            <Grid container spacing={10}>
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                <Toolbar>
                  <Hidden only={["md", "lg", "xl"]}>
                    <IconButton
                      className={classes.iconsMenu}
                      onClick={handleMenuShowOrHide}
                    >
                      <MenuIcon />
                    </IconButton>
                  </Hidden>
                  <Link to={HOME} className="no-text-decoration">
                    <img src="/images/logo.png" alt="logo.png" />
                  </Link>
                </Toolbar>
              </Grid>
              <Hidden xsDown smDown>
                <Grid
                  className={classes.appSection}
                  item
                  xs={12}
                  sm={4}
                  md={4}
                  lg={4}
                  xl={4}
                >
                  <SearchBar />
                </Grid>
              </Hidden>

              <Hidden xsDown smDown>
                {_renderIcons()}
              </Hidden>
            </Grid>
          </Container>

          {isOpen && (
            <ul>
              {_renderMenu()}
              <li onClick={handleLogout} className={classes.textMenuIten}>
                <Typography>Logout</Typography>
              </li>
            </ul>
          )}
        </AppBar>
      </div>
    );
  };

  const _renderAppBar = () => {
    const { pathname } = location;
    switch (pathname) {
      case REGISTER:
        return null;
      case LOGIN:
        return null;
      case RESET_PASSWORD:
        return null;
      default:
        return <Header />;
    }
  };

  return _renderAppBar();
};

export default withRouter(Navbar);
