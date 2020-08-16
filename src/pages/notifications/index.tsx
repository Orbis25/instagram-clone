import React, { useEffect, useState } from "react";
import {
  Grid,
  Container,
  List,
  Card,
  CardHeader,
  Divider,
  Typography,
} from "@material-ui/core";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import NotificationItem from "../../components/notificationItem";
import { useStyles } from "./style";
import NotificationService from "../../services/notificationService";
import { RootState } from "../../redux/reducers/index";
import { ICurrentUser } from "../../models/UserModel";
import { INotification } from "../../models/NotificationModels";
import { GO_POST } from "../../router/routes.json";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const classes = useStyles();

  const user: ICurrentUser = useSelector(
    (state: RootState) => state.AuthReducer.user
  );

  useEffect(() => {
    if (user?.uid) {
      getNotifications();
      setViewMyNotification();
    }
    // eslint-disable-next-line
  }, [user?.uid]);

  const getNotifications = () => {
    new NotificationService()
      .getNotifications(user?.uid)
      .onSnapshot((results) => {
        setNotifications([]);
        results.forEach((val) => {
          const _notification = val.data() as INotification;
          setNotifications((x) => [...x, _notification]);
        });
      });
  };

  const _renderNotifications = () => {
    return notifications.map((notification, index) => (
      <Link
        className="no-text-decoration text-link"
        to={`${GO_POST}/${notification.PostId}/${notification.userIdOwnerPost}`}
      >
        <NotificationItem key={index} notification={notification} />
      </Link>
    ));
  };

  const setViewMyNotification = () => {
    new NotificationService().setViewMyNotification(user?.uid).then(() => {});
  };

  return (
    <Container className={classes.container}>
      <Grid container justify="center">
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Card className={`custom-card`}>
            <CardHeader title="Notifications"></CardHeader>
            <Divider />
            {notifications.length ? (
              <List>{_renderNotifications()}</List>
            ) : (
              <Typography align="center">No have notifications</Typography>
            )}
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NotificationPage;
