import StorePage from "@/pages/Store/StorePage";
import HomePage from "../pages/HomePage/HomePage";
import ProfilePage from "../pages/User/ProfilePage";
import DetailFoodPage from "@/pages/DetailPage/DetailFoodPage";
import AboutPage from "@/pages/AboutPage/AboutPage";

const publicRoutes = [
  { path: "/", component: HomePage },
  { path: "/profile", component: ProfilePage },
  { path: "/store", component: StorePage },
  { path: "/detail", component: DetailFoodPage },
  { path: "/about", component: AboutPage },
];
export { publicRoutes };
