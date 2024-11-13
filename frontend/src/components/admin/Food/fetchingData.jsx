import React, { useMemo } from 'react';
import foodApi from '@/apis/foodApi';
const imageLinks = [
  "https://www.pizzaexpress.vn/wp-content/uploads/2018/08/shutterstock_657998458-780x490.jpg",
  "https://i.ytimg.com/vi/JEPtJvykQkI/maxresdefault.jpg",
  "https://www.allrecipes.com/thmb/5JVfA7MxfTUPfRerQMdF-nGKsLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg",
  "https://annajones.imgix.net/recipes/the-really-hungry-burger/Really_hungry_burger_for_web.jpg?w=3072&h=3994",
];

// Hàm chọn 3 hình ảnh ngẫu nhiên và trả về dưới dạng các thuộc tính Image1, Image2, Image3
function getRandomImages() {
  const shuffled = [...imageLinks].sort(() => 0.5 - Math.random());
  return {
    Image1: shuffled[0],
    Image2: shuffled[1],
    Image3: shuffled[2],
  };
}
export const fetchFoods=async()=>{
  const response= await foodApi.getAllFood(1,1000,null);
  if(response.status=='success')
  {
    const data= response.data;
    return data
  }
  return null
}
export const fetchTypes= async()=>{
  const response= await foodApi.getAllFoodTypes()
  if(response.status=='success')
    {
      const data= response.data;
      return data
    }
    return null
}
export const fetchFood= async(id)=>{
  const response= await foodApi.getFoodbyId(id)
  if(response.status=='success')
    {
      const data= response.data;
      return data
    }
    return null
}
  export const reviews = [
    { FoodId: 1, Content: 'Delicious and fresh!', RatingValue: 4.5, Reply: 'Thank you!', User:{Username:"hahaha"} },
    { FoodId: 2, Content: 'Not too great', RatingValue: 3.0, Reply: 'Sorry to hear that.', User:{Username:"hahaha"} },
    { FoodId: 3, Content: 'Will order again', RatingValue: 5.0, Reply: 'Looking forward to it!', User:{Username:"hahaha"} },
    { FoodId: 1, Content: 'Delicious and fresh!', RatingValue: 4.5, Reply: 'Thank you!' , User:{Username:"hahaha"}},
    { FoodId: 2, Content: 'Not too great', RatingValue: 3.0, Reply: 'Sorry to hear that.' , User:{Username:"hahaha"}},
    { FoodId: 3, Content: 'Will order again', RatingValue: 5.0, Reply: 'Looking forward to it!' , User:{Username:"hahaha"}},
    { FoodId: 1, Content: 'Delicious and fresh!', RatingValue: 4.5, Reply: 'Thank you!' , User:{Username:"hahaha"}},
    { FoodId: 2, Content: 'Not too great', RatingValue: 3.0, Reply: 'Sorry to hear that.' , User:{Username:"hahaha"}},
    { FoodId: 3, Content: 'Will order again', RatingValue: 5.0, Reply: 'Looking forward to it!', User:{Username:"hahaha"} },
    { FoodId: 1, Content: 'Delicious and fresh!', RatingValue: 4.5, Reply: 'Thank you!', User:{Username:"hahaha"}},
    { FoodId: 2, Content: 'Not too great', RatingValue: 3.0, Reply: 'Sorry to hear that.' , User:{Username:"hahaha"}},
    { FoodId: 3, Content: 'Will order again', RatingValue: 5.0, Reply: 'Looking forward to it!' , User:{Username:"hahaha"}},
    // Thêm các dòng dữ liệu khác nếu cần
  ];