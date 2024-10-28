import { Link } from 'lucide-react';
import React from 'react'
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa6";

function BillPage() {
    return (
        <div className="px-24 bg-gray-100 pb-24 mt-14">
          <h2 className="pt-6 text-xl mb-4">Thanh toán</h2>
          <div className="flex gap-4">
            <div className="basis-[70%]">
              <div className="flex justify-between px-4  rounded-lg py-3  items-center bg-white">
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
              <div className="mt-4 rounded-lg overflow-hidden ">
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
            <div className="basis-[30%]">
              <div className="px-4  py-4 bg-white rounded-lg">
                <div className="flex pb-3 justify-between">
                  <h1>Thành tiền</h1>
                  <h1>{24000}</h1>
                </div>
                {[2, 23].length > 0 && (
                  <div className="flex pb-3 justify-between gap-2">
                    <h1>Phí vận chuyển</h1>
                    <h1>12000</h1>
                  </div>
                )}
                <div className="bg-gray-200 h-[1px] w-full mx-auto"></div>
                <div className="flex justify-between py-4 items-center">
                  <h1 className="font-bold">Tổng số tiền (gồm VAT)</h1>
                  <h1 className="text-xl text-primary-color font-bold">{320000}</h1>
                </div>
                <div
                  className="w-full py-2 bg-primary-color text-white uppercase font-bold text-center rounded-md cursor-pointer transition-all hover:bg-red-700 select-none"
                  onClick={() => {}}
                >
                  Thanh toán
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}

export default BillPage