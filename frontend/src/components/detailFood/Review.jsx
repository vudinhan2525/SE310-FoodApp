import React, { useState, useEffect } from 'react'
import RatingLayout from '../ui/ratingLayout';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"

export default function Review(props) {
    const listReview = [{ name: 'Minh Đức', rating: 4, date: '15/05/2004', content: "đồ ăn rất ngon, hi vọng sẽ càng ngày càng nhiều món ngon hơn", avatar: 'https://nhachannuoi.vn/wp-content/uploads/2024/07/meo.jpg', reply: 'Shop cảm ơn bạn đã ủng hộ' },
    { name: 'Minh Đức', rating: 4, date: '15/05/2004', content: "đồ ăn rất ngon, hi vọng sẽ càng ngày càng nhiều món ngon hơn", avatar: 'https://nhachannuoi.vn/wp-content/uploads/2024/07/meo.jpg', reply: 'Shop cảm ơn bạn đã ủng hộ Shop cảm ơn bạn đã ủng hộ Shop cảm ơn bạn đã ủng hộ' },
    { name: 'Minh Đức', rating: 4, date: '15/05/2004', content: "đồ ăn rất ngon, hi vọng sẽ càng ngày càng nhiều món ngon hơn", avatar: 'https://nhachannuoi.vn/wp-content/uploads/2024/07/meo.jpg', reply: 'Shop cảm ơn bạn đã ủng hộ' },
    { name: 'Minh Đức', rating: 4, date: '15/05/2004', content: "đồ ăn rất ngon, hi vọng sẽ càng ngày càng nhiều món ngon hơn", avatar: 'https://nhachannuoi.vn/wp-content/uploads/2024/07/meo.jpg',  },
    { name: 'Minh Đức', rating: 4, date: '15/05/2004', content: "đồ ăn rất ngon, hi vọng sẽ càng ngày càng nhiều món ngon hơn", avatar: 'https://nhachannuoi.vn/wp-content/uploads/2024/07/meo.jpg',  },
    { name: 'Minh Đức', rating: 4, date: '15/05/2004', content: "đồ ăn rất ngon, hi vọng sẽ càng ngày càng nhiều món ngon hơn", avatar: 'https://nhachannuoi.vn/wp-content/uploads/2024/07/meo.jpg', reply: 'Shop cảm ơn bạn đã ủng hộ Shop cảm ơn bạn đã ủng hộ Shop cảm ơn bạn đã ủng hộ' },
    { name: 'Minh Đức', rating: 4, date: '15/05/2004', content: "đồ ăn rất ngon, hi vọng sẽ càng ngày càng nhiều món ngon hơn", avatar: 'https://nhachannuoi.vn/wp-content/uploads/2024/07/meo.jpg', reply: 'Shop cảm ơn bạn đã ủng hộ' },
    { name: 'Minh Đức', rating: 4, date: '15/05/2004', content: "đồ ăn rất ngon, hi vọng sẽ càng ngày càng nhiều món ngon hơn", avatar: 'https://nhachannuoi.vn/wp-content/uploads/2024/07/meo.jpg', reply: 'Shop cảm ơn bạn đã ủng hộ Shop cảm ơn bạn đã ủng hộ Shop cảm ơn bạn đã ủng hộ' },
    { name: 'Minh Đức', rating: 4, date: '15/05/2004', content: "đồ ăn rất ngon, hi vọng sẽ càng ngày càng nhiều món ngon hơn", avatar: 'https://nhachannuoi.vn/wp-content/uploads/2024/07/meo.jpg', reply: 'Shop cảm ơn bạn đã ủng hộ' },
    { name: 'Minh Đức', rating: 4, date: '15/05/2004', content: "đồ ăn rất ngon, hi vọng sẽ càng ngày càng nhiều món ngon hơn", avatar: 'https://nhachannuoi.vn/wp-content/uploads/2024/07/meo.jpg', reply: 'Shop cảm ơn bạn đã ủng hộ Shop cảm ơn bạn đã ủng hộ Shop cảm ơn bạn đã ủng hộ' },
    { name: 'Minh Đức', rating: 4, date: '15/05/2004', content: "đồ ăn rất ngon, hi vọng sẽ càng ngày càng nhiều món ngon hơn", avatar: 'https://nhachannuoi.vn/wp-content/uploads/2024/07/meo.jpg', reply: 'Shop cảm ơn bạn đã ủng hộ' },
    { name: 'Minh Đức', rating: 4, date: '15/05/2004', content: "đồ ăn rất ngon, hi vọng sẽ càng ngày càng nhiều món ngon hơn", avatar: 'https://nhachannuoi.vn/wp-content/uploads/2024/07/meo.jpg', reply: 'Shop cảm ơn bạn đã ủng hộ Shop cảm ơn bạn đã ủng hộ Shop cảm ơn bạn đã ủng hộ' },
    { name: 'Minh Đức', rating: 4, date: '15/05/2004', content: "đồ ăn rất ngon, hi vọng sẽ càng ngày càng nhiều món ngon hơn", avatar: 'https://nhachannuoi.vn/wp-content/uploads/2024/07/meo.jpg', reply: 'Shop cảm ơn bạn đã ủng hộ' },
    { name: 'Minh Đức', rating: 4, date: '15/05/2004', content: "đồ ăn rất ngon, hi vọng sẽ càng ngày càng nhiều món ngon hơn", avatar: 'https://nhachannuoi.vn/wp-content/uploads/2024/07/meo.jpg', reply: 'Shop cảm ơn bạn đã ủng hộ Shop cảm ơn bạn đã ủng hộ Shop cảm ơn bạn đã ủng hộ' },
    { name: 'Minh Đức', rating: 4, date: '15/05/2004', content: "đồ ăn rất ngon, hi vọng sẽ càng ngày càng nhiều món ngon hơn", avatar: 'https://nhachannuoi.vn/wp-content/uploads/2024/07/meo.jpg', reply: 'Shop cảm ơn bạn đã ủng hộ' },
    { name: 'Minh Đức', rating: 4, date: '15/05/2004', content: "đồ ăn rất ngon, hi vọng sẽ càng ngày càng nhiều món ngon hơn", avatar: 'https://nhachannuoi.vn/wp-content/uploads/2024/07/meo.jpg', reply: 'Shop cảm ơn bạn đã ủng hộ Shop cảm ơn bạn đã ủng hộ Shop cảm ơn bạn đã ủng hộ' },
    { name: 'Minh Đức', rating: 4, date: '15/05/2004', content: "đồ ăn rất ngon, hi vọng sẽ càng ngày càng nhiều món ngon hơn", avatar: 'https://nhachannuoi.vn/wp-content/uploads/2024/07/meo.jpg', reply: 'Shop cảm ơn bạn đã ủng hộ' },
    { name: 'Minh Đức', rating: 4, date: '15/05/2004', content: "đồ ăn rất ngon, hi vọng sẽ càng ngày càng nhiều món ngon hơn", avatar: 'https://nhachannuoi.vn/wp-content/uploads/2024/07/meo.jpg', reply: 'Shop cảm ơn bạn đã ủng hộ Shop cảm ơn bạn đã ủng hộ Shop cảm ơn bạn đã ủng hộ' },
    ]
    const [list, setList] = useState([])
    const [page, setPage] = useState(1);
    useEffect(() => {
        if (listReview.length <= page * 10) {
            setList(listReview.slice(10 * (page - 1), listReview.length))
        }
        else {
            setList(listReview.slice(10 * (page - 1), 10 * page))
        }
    }, [page])

    const next=()=>{
        
        if(listReview.length%(page*10)>0 && listReview.length%(page*10)<=10)
        {
            setPage(page+1);
        }
    }
    const previous=()=>{
        if(page>1)
        {
            setPage(page-1)
        }
        
    }
    return (
        <div>
            <div>
                {list.map((item) => {
                    return <>
                        <div className='flex max-w-full border-b-[1px] pb-4 mt-5'>
                            <img className='rounded-full w-10 h-10 object-cover' src={item.avatar} />
                            <div className='items-center ml-3'>
                                <div className='mb-3'>
                                    <div className='flex items-center'>
                                        <p className='text-[18px] mr-2'>{item.name}</p>
                                        <RatingLayout rating={item.rating} no={true} style="w-4 h-4" />
                                    </div>
                                    <p className='text-xs mt-[-4px]'>{item.date}</p>
                                </div>
                                <p className='text-[18px]'>{item.content}</p>
                                {item.reply?( <div className=' mt-3  border-[1px] w-fit p-2 border-orange-200'>
                                    <a href='' className='flex items-center mb-2 w-fit'>
                                        <img className='rounded-full w-7 h-7 object-cover border-slate-200 border-[0.2px]' src={props.store.avatar} />
                                        <h3 className='text-[16px] ml-2 font-semibold text-gray-500'>{props.store.name}</h3>
                                    </a>
                                    <p className='ml-9 text-[18px]'>{item.reply}</p>
                                </div>):(<div/>)}
                               
                            </div>
                        </div>
                    </>
                })}
            </div>
            <Pagination className={"pt-2 pb-3"}>
        <PaginationContent>
            {page>1?(<PaginationItem>
            <PaginationPrevious className={'cursor-pointer'} onClick={previous}/>
          </PaginationItem>):(<div/>)}
          
          <PaginationItem>
           <PaginationLink className={"font-semibold bg-gray-200 h-7"}   >{page}</PaginationLink>
          </PaginationItem>
          {(listReview.length-page*10)>0?(
            <PaginationItem>
            <PaginationNext className={'cursor-pointer'}
              onClick={next} />
          </PaginationItem>
          ):(<div/>)}
          
        </PaginationContent>
      </Pagination>
            
        </div>
    )
}
