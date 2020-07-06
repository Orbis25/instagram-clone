import React from "react";
import { AppBar, Toolbar, Container, InputBase, Grid } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Avatar from "@material-ui/core/Avatar";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import { useStyles } from "./styles";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { RouteProps } from "react-router";
import { LOGIN, REGISTER, RESET_PASSWORD } from "../../router/routes.json";

const Navbar: React.FC<RouteProps & RouteComponentProps> = ({ location }) => {
  const classes = useStyles();

  const _renderIcons = () => {
    return (
      <Grid className={classes.appSectionIcons} item xs={4}>
        <HomeOutlinedIcon className={classes.iconColor} />
        <FavoriteBorderIcon
          className={`${classes.iconColor} ${classes.inconleft}`}
        />
        <Avatar
          className={classes.smallAvatar}
          alt="logo.png"
          src="/images/logo.png"
        />
      </Grid>
    );
  };

  const _renderSearchBar = () => {
    return (
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div>
    );
  };

  const Header = () => {
    return (
      <div style={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ background: "#fff" }}>
          <Container>
            <Grid container spacing={10}>
              <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                <Toolbar>
                  <img src="/images/logo.png" alt="logo.png" />
                </Toolbar>
              </Grid>
              <Grid
                className={classes.appSection}
                item
                xs={12}
                sm={4}
                md={4}
                lg={4}
                xl={4}
              >
                {_renderSearchBar()}
              </Grid>
              {_renderIcons()}
            </Grid>
          </Container>
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
