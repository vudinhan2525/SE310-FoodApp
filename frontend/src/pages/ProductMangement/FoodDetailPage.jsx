import FoodDetail from "@/components/admin/Food/FoodDetail";
import { reviews } from "@/components/admin/Food/fetchingData";
import ReviewTable from "@/components/admin/Food/ReviewTable";
import { useLocation } from "react-router-dom";
export default function FoodDetailPgae() {
    const location = useLocation();
    const { food, types } = location.state
    return (
        <div>
            <FoodDetail food={food} types={types} />
            <ReviewTable   data={reviews} />
        </div>

    )
}