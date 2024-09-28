import Food from '@/components/food/Food';
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import React, { useState } from 'react'


function StorePage() {
    const [sliderValue, setSliderValue] = useState([20,100]);
  return (
    <section className='rounded-xl mx-5 h-full mt-20 min-w-md'>
        <div className="shopInfo">
            <div className="relative bg-center w-full bg-cover h-[500px] bg-[url('https://t3.ftcdn.net/jpg/02/05/03/96/360_F_205039646_r2ddysNHjVE5HFJUQnMS6UcgqYgjQ0H8.jpg')] rounded-xl flex lg:pl-24 md:pl-8 sm:pl-0">
                <div className="w-fit flex flex-col items-center py-40 sm:mx-5">
                    {/* Shop Info */}
                    <div className="userInfo flex flex-col md:flex-row px-8 items-center bg-white rounded-xl">
                    <div className="profilePic bg-[url('https://thietkelogo.mondial.vn/wp-content/uploads/2024/03/burger-king-vector.jpg')] lg:w-[150px] lg:h-[150px] w-[100px] h-[100px] bg-cover rounded-full"></div>
                    <div className="information px-8 text-center md:text-left">
                        <h1 className="text-orange-600 font-semibold">Burger King</h1>
                        <h2>Tran Phu, Ho Chi Minh City</h2>
                    </div>
                    <div className="jobs text-center md:text-left px-8">
                        <h1>Ui/Ux Designer</h1>
                        <h2>hello@gmail.com</h2>
                        <h2>email</h2>
                    </div>
                    </div>
                    {/* Navigation back */}
                    <div className="flex space-x-2 mt-4">
                    <h1 className='text-primary-color'>Home <span>/</span></h1>
                    <h1 className='text-red-600'>Shop</h1>
                    </div>
                </div>
            </div>
        </div>
        <div className="shopItemSection mt-10 bg-theme-color rounded-lg h-full ">
            <div className="shopItemList flex justify-between gap-5">
                <div className="leftUtils w-1/4 flex flex-col gap-3 h-full ml-5">
                    {/* Search By Type Section */}
                    <div className="searchByType text-center w-full bg-white mt-5 items-center rounded-md">
                        <h1 className="mt-2 border-b-red-700 border-b-2 w-full text-center">Search</h1>
                        <div className="search-grid grid grid-cols-2 md:grid-cols-3 grid-rows-2 gap-4 p-4">
                            <Button className="bg-light-them-color hover:bg-orange-300 text-black hover:scale-105">Type</Button>
                            <Button className="bg-light-them-color hover:bg-orange-300 text-black hover:scale-105">Pizza</Button>
                            <Button className="bg-light-them-color hover:bg-orange-300 text-black hover:scale-105">Type</Button>
                            <Button className="bg-light-them-color hover:bg-orange-300 text-black hover:scale-105">Type</Button>
                            <Button className="bg-light-them-color hover:bg-orange-300 text-black hover:scale-105">Type</Button>
                            <Button className="bg-light-them-color hover:bg-orange-300 text-black hover:scale-105">Type</Button>
                        </div>
                    </div>

                    {/* Filter by Price Section */}
                    <div className="filterByPrice text-center w-full bg-white mt-5 items-center rounded-md pb-5">
                        <h1 className="mt-2 border-b-red-700 border-b-2 w-full text-center">Filter by price</h1>
                        <div className="priceSlider">
                            <Slider className="progress py-2 px-2 text-black" defaultValue={[33]} max={100} step={1} onValueChange={setSliderValue} />
                        </div>
                        <div className="flex justify-between mt-2 px-5">
                            <span>From: $0</span>
                            <span>To: ${sliderValue[0]}</span>
                        </div>
                    </div>
                    <div className="trending text-center w-full bg-white mt-5 items-center rounded-md h-full">
                        <h1 className="mt-2 border-b-red-700 border-b-2 w-full text-center">Popular dishes</h1>
                        <div className="item-container flex flex-col  mt-3 gap-1 pb-5">
                            <div className="item flex border border-orange-400 mx-3 rounded-xl gap-3 p-2 lg:flex-row lg:justify-between lg:px-5 md:flex-col md:items-center">
                                <div className="pic bg-[url('https://upload.wikimedia.org/wikipedia/commons/4/4d/Big_Mac.png')] w-[100px] h-[90px] bg-cover mx-2">
                                </div>
                                <div className="content flex flex-col justify-center gap-2">
                                    <div className="info  flex gap-5">
                                        <h1 className=' font-semibold'>Big mac</h1>
                                        <h1 className='price text-red-500'>$2</h1>
                                    </div>
                                    <Button>Add to cart</Button>
                                </div>
                            </div>
                            <div className="item flex border border-orange-400 mx-3 rounded-xl gap-3 p-2 lg:flex-row lg:justify-between lg:px-5 md:flex-col md:items-center">
                                <div className="pic bg-[url('https://upload.wikimedia.org/wikipedia/commons/4/4d/Big_Mac.png')] w-[100px] h-[90px] bg-cover mx-2">
                                </div>
                                <div className="content flex flex-col justify-center gap-2">
                                    <div className="info  flex gap-5">
                                        <h1 className=' font-semibold'>Big mac</h1>
                                        <h1 className='price text-red-500'>$2</h1>
                                    </div>
                                    <Button>Add to cart</Button>
                                </div>
                            </div>
                            <div className="item flex border border-orange-400 mx-3 rounded-xl gap-3 p-2 lg:flex-row lg:justify-between lg:px-5 md:flex-col md:items-center">
                                <div className="pic bg-[url('https://upload.wikimedia.org/wikipedia/commons/4/4d/Big_Mac.png')] w-[100px] h-[90px] bg-cover mx-2">
                                </div>
                                <div className="content flex flex-col justify-center gap-2">
                                    <div className="info  flex gap-5">
                                        <h1 className=' font-semibold'>Big mac</h1>
                                        <h1 className='price text-red-500'>$2</h1>
                                    </div>
                                    <Button>Add to cart</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rightItemsList bg-white p-5 m-5 w-full h-full border border-gray-300 shadow-lg">
                    <Food/>
                </div>
            </div>
        </div>
    </section>
  )
}

export default StorePage