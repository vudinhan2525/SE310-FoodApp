import React from 'react'
import ShowImage from '@/components/detailFood/ShowImage'
import { FaStar,FaStarHalfStroke,FaRegStar } from "react-icons/fa6";
import RatingLayout from '@/components/ui/ratingLayout';
import { TbCurrencyDong } from "react-icons/tb";
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function DetailFoodPage() {
  const [count,setCount]= useState(1);
    const listImage=[
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa9Qq1rV_svdydH5u3O8r5ZmT8udMBnSuKeA&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMqxblUCytv_3FcErsPcP8oQe_0iK9kezGHw&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5sT5zC4y0-6mPucxnXLg4ATqCxjVN7bAttQ&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa9Qq1rV_svdydH5u3O8r5ZmT8udMBnSuKeA&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMqxblUCytv_3FcErsPcP8oQe_0iK9kezGHw&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5sT5zC4y0-6mPucxnXLg4ATqCxjVN7bAttQ&s'
    ]
    const food={
      name:"Burger bò phô mai",
      price:35000,
      rating:3.5,
      description:"Burger bò phô mai – Sự kết hợp hoàn hảo giữa miếng thịt bò tươi ngon, được nướng chín tới, và lớp phô mai cheddar tan chảy thơm béo. Bánh mì mềm mịn, kẹp cùng rau tươi giòn như xà lách, cà chua và dưa chuột muối, tạo nên một món ăn đầy hấp dẫn. Hương vị đậm đà, quyện giữa vị ngọt tự nhiên của thịt bò và sự béo ngậy của phô mai, đảm bảo làm hài lòng cả những thực khách khó tính nhất. Đây là lựa chọn lý tưởng cho những bữa ăn nhanh gọn mà vẫn bổ dưỡng!",
      inStock:1
    };
    const handleChange = (e) => {
      const inputValue = e.target.value;
  
      // Kiểm tra xem người dùng có nhập số nguyên hay không
      if (inputValue === '' || /^[0-9]+$/.test(inputValue)) {
        if(inputValue>999)
        {
          setCount(999);
        }else{
          setCount(inputValue);
        }
      }
    };
  return (
    <section className=' h-screen relative top-20  mx-[3%]'>
         <div className='flex h-[65%] '>
            <div className='basis-[43%]'>
                   <ShowImage listImage={listImage} />
            </div>
            
            <div className='basis-[58%] pl-[4%] mt-4 '>
              <div className='flex'>
                <h2 className='font-extrabold text-4xl/[45px] mr-[4%] '>{food.name}
                </h2>
                <div>
                 <RatingLayout rating={food.rating}/>
                </div>
              </div>
              <div className='flex items-center mt-1 ml-[2px]'>
                <p className='font-bold text-primary-color text-2xl'>{food.price.toLocaleString('en-US')}</p>
                <TbCurrencyDong size={'29px'} color='rgb(234 106 18)'/>
              </div>
              <p className='mr-[20%] mt-6'>
                 {food.description}
              </p>
              <div>
                <Input type='number' 
                placeholder='1' 
                className='w-20' 
                value={count}
                onChange={handleChange}
                min={1} max={999} step={1} 
                onKeyDown={(e) => {
                  if (e.key === '.' || e.key === ',') {
                    e.preventDefault(); // Ngăn không cho nhập dấu chấm và dấu phẩy
                  }
                }}/>
              </div>
              
            </div>
         </div>
         <div>

         </div>
    </section>
   
  )
}
