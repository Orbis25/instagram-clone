import { RouteType } from "./types";

import PostPage from "../pages/post";
import ProfilePage from "../pages/profile";
import RegisterPage from "../pages/register";
import LoginPage from "../pages/login";

import { PROFILE, POST, REGISTER, LOGIN } from "./routes.json";

export const routes: RouteType[] = [
  {
    path: PROFILE,
    component: ProfilePage,
  },
  {
    path: POST,
    component: PostPage,
  },
  {
    path: REGISTER,
    component: RegisterPage,
  },
  {
    path: LOGIN,
    component: LoginPage,
  },
];
