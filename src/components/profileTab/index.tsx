import React, { useState, useEffect } from "react";
import { Grid, Tab, Tabs, Container } from "@material-ui/core";
import TabPanel from "../shared/tabPanel";
import Skeleton from "@material-ui/lab/Skeleton";
import { useSelector } from "react-redux";

import { RootState } from "../../redux/reducers";
import { a11yProps } from "./util";
import { ProfileTabProps, IPostItemProfile } from "./types";
import { IPost, ISavedPost } from "../../models/PostModel";
import PostService from "../../services/postService";
import GridList from "./gridList";
import { ICurrentUser } from "../../models/UserModel";

const ProfileTab: React.FC<ProfileTabProps> = ({ userId }) => {
  const [value, setValue] = useState(0);
  const [myposts, setMyposts] = useState<IPostItemProfile[]>([]);
  const [savedPost, setSavedPost] = useState<IPostItemProfile[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const currentUser: ICurrentUser = useSelector(
    (state: RootState) => state.AuthReducer.user
  );

  useEffect(() => {
    if (userId) {
      getPosts();
      getSavedPost();
    }
    // eslint-disable-next-line
  }, [userId]);

  const getPosts = () => {
    setMyposts([]);
    setIsLoading(true);
    new PostService()
      .getMyPosts(userId)
      .then((response) => {
        response.forEach((result) => {
          const { images, postId, user } = result.data() as IPost;
          const _postItem: IPostItemProfile = {
            image: images[0],
            postId: postId,
            postedUserId: user.uid,
          };
          setMyposts((x) => [...x, _postItem]);
        });
      })
      .finally(() => setIsLoading(false));
  };

  const getSavedPost = () => {
    setSavedPost([]);
    new PostService().getPostSaved(userId).then((response) => {
      response.forEach((result) => {
        const { postId, userPostedId } = result.data() as ISavedPost;
        new PostService().getPost(postId, userPostedId).then((res) => {
          res.forEach((val) => {
            const { images, postId, user } = val.data() as IPost;
            const _postItem: IPostItemProfile = {
              image: images[0],
              postId: postId,
              postedUserId: user.uid,
            };
            setSavedPost((x) => [...x, _postItem]);
          });
        });
      });
    });
  };

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Grid container justify="center">
        <Grid item xs={12} style={{ flexGrow: 1 }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            variant="fullWidth"
          >
            <Tab label="PUBLICATIONS" {...a11yProps(0)} />
            {currentUser?.uid === userId && (
              <Tab label="SAVED" {...a11yProps(1)} />
            )}
          </Tabs>
        </Grid>
        <Grid item xs={12}>
          {isLoading ? (
            <Skeleton variant="rect" width={"100%"} height={500} />
          ) : (
            <TabPanel value={value} index={0}>
              <GridList posts={myposts} />
            </TabPanel>
          )}
        </Grid>
        {currentUser?.uid === userId && (
          <Grid item xs={12}>
            <TabPanel value={value} index={1}>
              <GridList posts={savedPost} />
            </TabPanel>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default ProfileTab;
