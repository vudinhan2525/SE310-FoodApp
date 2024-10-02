import React from 'react'
import { FaStar,FaStarHalfStroke,FaRegStar } from "react-icons/fa6";

export default function RatingLayout(props) {
    const color='#EA6A12'
    const star=()=>{
        if(!props.rating)
        {
            props.rating=0;
        }
        const list=[];
        for(let i=0;i<Math.floor(props.rating);i++)
        {
          list.push(<FaStar fill={color}/>);
        }
        if((props.rating)-Math.floor(props.rating)>=0.5)
        {
          list.push(<FaStarHalfStroke fill={color} />);
        }
        for(let i=0;i<(5-list.length);i++)
        {
            list.push(<FaRegStar fill={color}/>)
        }
        return list;
  
      }
  return (
    <div className=' h-full flex items-center'>
        <div className='flex h-full  mr-1 items-center'>
            {star()} 
        </div>
        <div className='text-[#EA6A12] '>({props.rating})</div>
    </div>
  )
}
