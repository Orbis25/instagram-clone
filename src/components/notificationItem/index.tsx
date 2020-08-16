import React, { useEffect, useState } from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Avatar,
} from "@material-ui/core";

import {
  INotification,
  NotificationType,
  NotificationState,
} from "../../models/NotificationModels";
import { IUser } from "../../models/UserModel";
import UserService from "../../services/userService";
import { formatDate } from "../../helpers/dateTimeHelper";
import { useStyles } from "./style";

type Props = {
  notification: INotification;
};

const NotificationItem: React.FC<Props> = ({ notification }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const classes = useStyles();
  useEffect(() => {
    if (notification) {
      getUser();
    }
    // eslint-disable-next-line
  }, [notification]);

  const getUser = () => {
    new UserService()
      .getUserDetailByUid(notification.userIdNotification)
      .then((response) => {
        response.forEach((result) => {
          const _user = result.data() as IUser;
          setUser(_user);
        });
      });
  };

  const _renderNotficationType = () => {
    return notification.type === NotificationType.Commnet
      ? "Has commented your post"
      : "Has liked your post";
  };

  const _renderColorItem = () => {
    return notification.state === NotificationState.View
      ? classes.isView
      : classes.noRead;
  };

  return (
    <ListItem className={_renderColorItem()} alignItems="flex-start">
      <ListItemAvatar>
        <Avatar src={user?.photoURL} alt={user?.fullName} />
      </ListItemAvatar>
      <ListItemText
        primary={<b>{user?.fullName}</b>}
        secondary={
          <React.Fragment>
            <Typography
              className="text-muted-primary"
              component="span"
              variant="body2"
              color="textPrimary"
            >
              {_renderNotficationType()}
            </Typography>
          </React.Fragment>
        }
      />
      <ListItemAvatar>
        <Typography
          className="text-muted-primary"
          component="span"
          variant="body2"
          color="textPrimary"
        >
          {formatDate(notification.createdAt ?? new Date())}
        </Typography>
      </ListItemAvatar>
    </ListItem>
  );
};

export default NotificationItem;
