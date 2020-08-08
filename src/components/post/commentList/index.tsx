import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Typography } from "@material-ui/core";

import UserService from "../../../services/userService";
import { IUser } from "../../../models/UserModel";
import { GO_PROFILE } from "../../../router/routes.json";

type Props = {
  comment: string;
  userId: string;
};

const CommentList: React.FC<Props> = (props) => {
  const [userName, setUserName] = useState<string>("");

  const { userId, comment } = props;
  useEffect(() => {
    if (userId) {
      getUserComment(userId);
    }
  }, [userId]);

  const getUserComment = (uid: string) => {
    new UserService().getUserDetailByUid(uid).then((result) => {
      result.forEach((value) => {
        const { userName } = value.data() as IUser;
        setUserName(userName);
      });
    });
  };

  return (
    <Typography style={{ fontSize: 14 }}>
      <Link
        className="no-text-decoration"
        style={{ color: "black", marginRight: 8 }}
        to={`${GO_PROFILE}/${userName}`}
      >
        <b>{userName}</b>
      </Link>

      {comment}
    </Typography>
  );
};

export default CommentList;
