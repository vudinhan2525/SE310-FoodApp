import { types } from "@/components/admin/Food/fetchingData"
import TypeTable from "@/components/admin/FoodType/TypeTable"
import AddType from "@/components/admin/FoodType/AddType";
export default function TypePage(){
    const editType = types.map((type) => ({
        ...type,          // Sao chép các thuộc tính khác của đối tượng `type`
        Foods: type.Foods.length // Gán lại `Foods` thành độ dài của mảng `Foods`
    }));
    return(
        <div className="flex">
            <div className="basis-2/6 mr-4">
                 <AddType types={types}/>
            </div>
            <div className="h-[530px] ml-4 flex-1">
                 <TypeTable types={editType}/>
            </div>
           
           
        </div>
    )
}