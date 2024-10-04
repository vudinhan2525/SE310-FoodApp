import FoodCard from "@/components/food/FoodCard";
import { useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
const types = ["Main dish", "Side dish", "Dessert", "Drink", "Fast food"];
export default function MenuCategory() {
  const [typeSlt, setTypeSlt] = useState(0);
  return (
    <div className="mt-12">
      <div className="flex justify-between items-center">
        <header className="font-serif text-4xl font-medium my-4 text-blue-950">
          Menu category
        </header>
        <div className="group flex items-center gap-4 cursor-pointer">
          <p className="font-semibold group-hover:underline transition-all">
            View all
          </p>
          <div className="px-2 py-2 rounded-full cursor-pointer group-hover:bg-orange-600 transition-all bg-primary-color text-white">
            <FaAngleRight className="text-lg" />
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        {types.map((el, idx) => {
          return (
            <div
              key={idx}
              onClick={() => setTypeSlt(idx)}
              className={`${
                idx === typeSlt
                  ? "bg-primary-color text-white transition-all border-primary-color"
                  : "hover:bg-primary-color hover:text-white transition-all hover:border-primary-color"
              } px-4 py-2 rounded-full border-[1px] cursor-pointer `}
            >
              {el}
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-4 space-x-4 mt-4">
        {[1, 2, 3, 4].map((el, idx) => {
          return (
            <FoodCard
              key={idx}
              img={
                "https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg"
              }
              title={"Burger King"}
              description={"Burger King"}
              price={5.6}
            />
          );
        })}
      </div>
    </div>
  );
}
