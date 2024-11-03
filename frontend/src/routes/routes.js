import StorePage from "@/pages/Store/StorePage";
import HomePage from "../pages/HomePage/HomePage";
import ProfilePage from "../pages/User/ProfilePage";
import CartPage from "@/pages/CartPage/CartPage";
import DetailFoodPage from "@/pages/DetailPage/DetailFoodPage";
import AboutPage from "@/pages/AboutPage/AboutPage";
import FavoritePage from "@/pages/User/FavoritePage";
import BillPage from "@/pages/BillPage/BillPage";
import CategoryPage from "@/pages/CategoryPage/CategoryPage";
import SearchPage from "@/pages/SearchPage/SearchPage";

const publicRoutes = [
  { path: "/", component: HomePage },
  { path: "/profile", component: ProfilePage },
  { path: "/store", component: StorePage },
  { path: "/cart", component: CartPage },
  { path: "/detail/:id", component: DetailFoodPage },
  { path: "/about", component: AboutPage },
  { path: "/favorite", component: FavoritePage },
  { path: "/bill", component: BillPage },
  { path: "/category", component: CategoryPage },
  { path: "/search", component: SearchPage }
];
export { publicRoutes };
