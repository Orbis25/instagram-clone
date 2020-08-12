import React from "react";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

import { useStyles } from "./style";
import { IPostItemProfile } from "../types";
import { GO_POST } from "../../../router/routes.json";

type Props = {
  xs?: 1 | 2 | "auto" | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | undefined;
  sm?: 1 | 2 | "auto" | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | undefined;
  md?: 1 | 2 | "auto" | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | undefined;
  lg?: 1 | 2 | "auto" | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | undefined;
  xl?: 1 | 2 | "auto" | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | undefined;
  posts: IPostItemProfile[];
};

const GridList: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { posts, xs, sm, md, lg, xl } = props;

  return (
    <Grid style={{ marginTop: 20 }} container spacing={2}>
      {posts.map((value, index) => (
        <Grid
          className={classes.item}
          item
          key={index}
          xs={xs ?? 12}
          sm={sm ?? 12}
          md={md ?? 4}
          lg={lg ?? 4}
          xl={xl ?? 4}
        >
          <Link to={`${GO_POST}/${value.postId}/${value.postedUserId}`}>
            <img
              src={value.image}
              className={classes.images}
              alt={`post-${index}`}
            />
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default GridList;
