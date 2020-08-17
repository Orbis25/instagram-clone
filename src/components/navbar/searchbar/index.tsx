import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import {
  InputBase,
  Avatar,
  List,
  ListItemAvatar,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";

import { GO_PROFILE } from "../../../router/routes.json";
import { useStyles } from "./style";
import UserService from "../../../services/userService";
import { IUser } from "../../../models/UserModel";

type UserItemProps = {
  photoUrl: string;
  userName: string;
  fullName: string;
};

const SearchBar = () => {
  const [search, setSearch] = useState<string>("");
  const [users, setUsers] = useState<IUser[]>([]);
  const classes = useStyles();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (e.target.value) {
      new UserService().findUserByUserName(e.target.value).then((result) => {
        setUsers([]);
        result.forEach((value) => {
          setUsers((x) => [...x, value as IUser]);
        });
      });
    }
  };

  const UserItem: React.FC<UserItemProps> = ({
    photoUrl,
    userName,
    fullName,
  }) => {
    return (
      <ListItem>
        <ListItemAvatar>
          <Avatar src={photoUrl} alt={`${userName}-profile`} />
        </ListItemAvatar>
        <ListItemText
          style={{ color: "#000" }}
          primary={fullName}
          secondary={userName}
        />
      </ListItem>
    );
  };

  const _renderResults = () => {
    return users.length ? (
      users.map(({ photoURL, userName, fullName }, index) => (
        <Link
          className="no-text-decoration text-link"
          key={index}
          to={`${GO_PROFILE}/${userName}`}
        >
          <UserItem
            photoUrl={photoURL ?? ""}
            userName={userName}
            fullName={fullName}
          />
        </Link>
      ))
    ) : (
      <Typography style={{ color: "#000000" }} align="center">
        Not Found
      </Typography>
    );
  };

  return (
    <div>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          onChange={handleChange}
          placeholder="Search…"
          value={search}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div>
      <div className={classes.dropdownContainer}>
        {search && (
          <div className={classes.dropdown}>
            <List>{_renderResults()}</List>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
