import React from 'react'
import FoodCard from './FoodCard'

const FoodData = [
    {
      img: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Big_Mac.png',
      title: "Big Mac",
      rating: "4",
      description: "Double cheese double patty",
      price: 7,
      
    },
    {
      img: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Big_Mac.png',
      title: "Big Mac",
      rating: "4",
      description: "Double cheese double patty",
      price: 7,
    },
    {
        img: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Big_Mac.png',
        title: "Big Mac",
        rating: "4",
        description: "Double cheese double patty",
        price: 7,
      },
      {
        img: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Big_Mac.png',
        title: "Big Mac",
        rating: "4",
        description: "Double cheese double patty",
        price: 7,
      },
      {
        img: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Big_Mac.png',
        title: "Big Mac",
        rating: "4",
        description: "Double cheese double patty",
        price: 7,
      },
      {
        img: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Big_Mac.png',
        title: "Big Mac",
        rating: "4",
        description: "Double cheese double patty",
        price: 7,
      },
      {
        img: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Big_Mac.png',
        title: "Big Mac",
        rating: "4",
        description: "Double cheese double patty",
        price: 7,
      }
]
const Food = () => {
  return (
    <div className="dark:bg-gray-900 dark:text-white bg-gray-50 py-10">
        <section data-aos="fade-up" className="container ">
        <h1 className=" my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-bold">
            Best Food
        </h1>
        
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {FoodData.map((item, index) => (
              <FoodCard
                key={index}
                {...item}
              />
            ))}
          </div>
        </section>
    </div>
  )
}

export default Food