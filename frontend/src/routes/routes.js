import StorePage from "@/pages/Store/StorePage";
import HomePage from "../pages/HomePage/HomePage";
import ProfilePage from "../pages/User/ProfilePage";
import DetailFoodPage from "@/pages/Store/DetailFoodPage";

const publicRoutes = [
  { path: "/", component: HomePage },
  { path: "/profile", component: ProfilePage },
  { path: "/store", component: StorePage },
  { path: "/detail", component: DetailFoodPage },
];
export { publicRoutes };
