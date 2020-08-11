import PostPage from "../pages/post";
import ProfilePage from "../pages/profile";
import EditProfilePage from "../pages/editProfile";
import SuggedtedPage from "../pages/seeAll";

import { PROFILE, POST, EDIT_PROFILE, SUGGEDTED } from "./routes.json";

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
  },
  {
    path: SUGGEDTED,
    component: SuggedtedPage,
  },
];
