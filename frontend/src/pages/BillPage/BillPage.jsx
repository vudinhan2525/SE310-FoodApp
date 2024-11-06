import { Button } from 'antd';
import { Link } from 'lucide-react';
import React from 'react'
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa6";

function BillPage() {
    return (
        <div className="px-24 bg-gray-100 pb-24 mt-14">
          <h2 className="pt-6 text-xl mb-4">Lịch sử thanh toán</h2>
          <div className="status flex justify-between bg-white p-3 rounded-xl my-3">
            <div className="title">
              <p>Tình trạng đơn hàng</p>
            </div>
            <div className="status-controller flex gap-5">
              <Button variant='orange'>Đang xử lý</Button>
              <Button>Đang giao hàng</Button>
              <Button>Thành công</Button>
              <Button>Thất bại</Button>
            </div>
          </div>
          <div className="flex gap-4">
            {/* Table */}
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
          </div>
        </div>
      );
}

export default BillPage