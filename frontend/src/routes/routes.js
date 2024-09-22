import HomePage from "../pages/HomePage/HomePage";
import ProfilePage from "../pages/User/ProfilePage";

const publicRoutes = [
  { path: "/", component: HomePage },
  { path: "/profile", component: ProfilePage },
];
export { publicRoutes };
