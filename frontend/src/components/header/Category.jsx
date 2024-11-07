import React, { useEffect, useState } from 'react';
import foodApi from '@/apis/foodApi';

const Category = () => {
  const [foodTypes, setFoodTypes] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchFoodTypes = async () => {
      try {
        const response = await foodApi.getAllFoodTypes();
        setFoodTypes(response.data);
      } catch (error) {
        console.error("Error fetching food types:", error);
      }
    };
    fetchFoodTypes();
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setTimeout(() => { setIsHovered(false) }, 1500)}
    >
      <div className="cursor-pointer font-bold">Categories</div>
      {isHovered && (
        <div
          className="absolute top-full mt-2 bg-white shadow-lg rounded-md p-3 w-[300px] z-10 grid grid-cols-3 gap-2"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setTimeout(() => { setIsHovered(false) }, 1500)}
        >
          {foodTypes.slice(0, 6).map((foodType) => ( // Limit to 6 items for 3x2 grid
            <div key={foodType.typeId} className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-center">
              {foodType.nameType}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;
