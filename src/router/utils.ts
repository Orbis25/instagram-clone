import PostPage from "../pages/post";
import ProfilePage from "../pages/profile";
import EditProfilePage from "../pages/editProfile";
import SuggedtedPage from "../pages/seeAll";
import ExplorePage from "../pages/explore";
import NotificationPage from "../pages/notifications/index";
import {
  PROFILE,
  POST,
  EDIT_PROFILE,
  SUGGEDTED,
  EXPLORE,
  NOTIFICATIONS,
} from "./routes.json";

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
  {
    path: EXPLORE,
    component: ExplorePage,
  },
  {
    path: NOTIFICATIONS,
    component: NotificationPage,
  },
];
