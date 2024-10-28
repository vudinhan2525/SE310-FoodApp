import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import FoodCardHorizontal from "../food/FoodCartHorizontal";
// Adjust the import path as needed

// Sample data for food items
const foodItems = [
  { id: 1, img: "https://www.foodandwine.com/thmb/DI29Houjc_ccAtFKly0BbVsusHc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/crispy-comte-cheesburgers-FT-RECIPE0921-6166c6552b7148e8a8561f7765ddf20b.jpg", title: "Burger", rating: 4.5, description: "Delicious beef burger", price: 10 },
  { id: 2, img: "", title: "Burger2", rating: 4.7, description: "Cheesy pizza with toppings", price: 12 },
  // Add more food items as needed
];

export default function SearchBox() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFoods, setFilteredFoods] = useState([]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter food items based on search query
    const results = foodItems.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredFoods(results);
  };

  return (
    <div className="w-[400px] relative">
      <div className="bg-gray-100 rounded-full h-[50px] flex items-center">
        <input
          type="text"
          placeholder="Search for food..."
          className="w-full bg-transparent outline-none px-6 py-3"
          value={searchQuery}
          onChange={handleSearch}
        />
        <div className="w-[60px] flex items-center justify-center h-full text-gray-400 hover:text-gray-600 rounded-r-full cursor-pointer transition-all hover:bg-gray-200">
          <FaMagnifyingGlass />
        </div>
      </div>

      {/* Show filtered FoodCardHorizontal components */}
      {searchQuery && (
        <div className="absolute top-[60px] left-0 right-0 bg-white shadow-lg rounded-lg p-4 max-h-[200px] flex flex-col gap-3 overflow-y-auto">
          {filteredFoods.length > 0 ? (
            filteredFoods.map((item) => (
              <FoodCardHorizontal
                key={item.id}
                img={item.img}
                title={item.title}
                rating={item.rating}
                description={item.description}
                price={item.price}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center">No results found</p>
          )}
        </div>
      )}
    </div>
  );
}
