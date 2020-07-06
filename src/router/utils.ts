import { RouteType } from "./types";

import PostPage from "../pages/post";
import ProfilePage from "../pages/profile";

import { PROFILE, POST } from "./routes.json";

export const routes: RouteType[] = [
  {
    path: PROFILE,
    component: ProfilePage,
  },
  {
    path: POST,
    component: PostPage,
  },
];
