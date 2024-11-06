import React from 'react'

const BillContent = ({bill}) => {
  return (
    <div className="">
    {/* {isShowed && ( */}
    <div className="flex bg-orange-50 rounded-xl">
        <div className="basis-[70%] my-3 px-5">
        <div className="flex flex-col ">
            <div className="flex justify-between px-4  rounded-lg py-3  items-center bg-white border border-orange-300">
                <div className="basis-[50%] flex text-sm font-semibold items-center gap-2 ">
                <p>Sản phẩm(0 sản phẩm)</p>
                </div>
                <div className="basis-[50%] flex items-center">
                <p className=" basis-[45%] text-center">Số lượng</p>
                <p className=" basis-[45%] text-center">Đơn giá</p>
                <p className=" basis-[45%]  text-center">Thành tiền</p>
                <p className=" basis-[45%]  text-center">Tình trạng</p>
                <p className=" basis-[10%]  text-center"></p>
                </div>
            </div>
        
            
            <div className="mt-4 rounded-lg overflow-hidden border border-orange-300">
            {[1, 2, 3]?.map((cartItem, idx) => {
                return (
                <div key={idx}>
                    <div className={`flex px-5 pr-8 py-6 bg-white `}>
                    <div className="basis-[50%] flex gap-4 items-center">
                        <div className="flex flex-col justify-between">
                            Food name
                        <div className="flex items-end gap-1">
                            <p className="font-bold">32.000</p>
                            <p className="text-xs mb-1 line-through text-gray-500">{12000}</p>
                        </div>
                        </div>
                    </div>
                    <div className="basis-[50%] flex items-center">
                        <div className="quantity basis-[45%] flex justify-center">
                        <div className="rounded-md text-center items-center justify-center inline-flex">
                            <div className="px-2 py-2">
                            7
                            </div>
                        </div>
                        </div>
                        <div className="price basis-[45%] flex justify-center">
                        <div className="rounded-md text-center items-center justify-center inline-flex">
                            <div className="px-2 py-2">
                            7
                            </div>
                        </div>
                        </div>
                        <p className=" basis-[45%]  text-center select-none text-primary-color font-bold">{32000}</p>
                        <div className="total basis-[45%] flex justify-center">
                        <div className="rounded-md text-center items-center justify-center inline-flex">
                            <div className="px-2 py-2">
                            Đang giao hàng
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    {idx !== 2 && (
                    <div className="bg-white w-[100%] h-[1px]">
                        <div className="h-[1px] w-[90%] mx-auto bg-gray-200"></div>
                    </div>
                    )}
                </div>
                );
            })}
            </div>
        </div>
        </div>
        <div className="basis-[30%] flex flex-col gap-5 px-5 h-full">
            <div className="px-4 my-3 py-4 bg-white rounded-lg border border-orange-300">
                <form className="space-y-4 p-4 bg-gray-100 rounded-lg shadow-md">
                <label className="block font-medium text-2xl text-center">Bill no. {bill.id}</label>
                <div>
                    <label className="block font-medium">Address</label>
                    <div
                    type="text"
                    name="houseNumber"
                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg"
                    >{bill.address}</div>
                </div>
                <div className="date">
                    <label className="block font-medium">Date</label>
                    <div className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg ">
                    {bill.paymentDate}
                    </div>
                </div>
                <div className="status">
                    <label className="block font-medium">Status</label>
                    <div className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg ">
                        {bill.status}
                    </div>
                </div>

                </form>

                </div>
            </div>
        </div>
        {/* )} */}
    </div>
  )
}

export default BillContent