
import FoodPage  from "@/pages/ProductMangement/FoodPage";
import FoodDetailPgae from "@/pages/ProductMangement/FoodDetailPage";
import AddFoodPage from "@/pages/ProductMangement/AddFoodPage";
import TypePage from "@/pages/ProductMangement/TypePage";
import DashboardPage from "@/pages/DashboardAdmin/DashboardPage";
const adminRoutes = [
  { path: "/admin", component: DashboardPage },
  { path: "/admin/food", component: FoodPage },
  { path: "/admin/food/add", component: AddFoodPage },
  { path: "/admin/type", component: TypePage },
  { path: "admin/food/detail", component: FoodDetailPgae  },
 
];
export {adminRoutes};
