import PostPage from "../pages/post";
import ProfilePage from "../pages/profile";
import EditProfilePage from "../pages/editProfile";

import { PROFILE, POST, EDIT_PROFILE } from "./routes.json";

interface RouteType {
  path: string;
  component: any; //is a component JSX.ELEMENT
}

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
    path: EDIT_PROFILE,
    component: EditProfilePage,
  }
];
