import { Checkbox } from "@/components/ui/checkbox";
import React from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function CartPage() {
  return (
    <div className="px-24 bg-gray-100 pb-24 mt-14">
      <h2 className="pt-6 text-xl mb-4">GIỎ HÀNG (0 sản phẩm)</h2>
      <div className="flex gap-4">
        <div className="basis-[70%]">
          <div className="flex justify-between px-4  rounded-lg py-3  items-center bg-white">
            <div className="basis-[60%] flex text-sm font-semibold items-center gap-2 ">
              <Checkbox
                onCheckedChange={(checked) => {
                  console.log(checked);
                }}
              ></Checkbox>
              <p>Chọn tất cả (0 sản phẩm)</p>
            </div>
            <div className="basis-[40%] flex items-center">
              <p className=" basis-[45%] text-center">Số lượng</p>
              <p className=" basis-[45%]  text-center">Thành tiền</p>
              <p className=" basis-[10%]  text-center"></p>
            </div>
          </div>
          <div className="mt-4 rounded-lg overflow-hidden ">
            {[1, 2, 3]?.map((cartItem, idx) => {
              return (
                <div key={idx}>
                  <div className={`flex px-4 py-6 bg-white `}>
                    <div className="basis-[60%] flex gap-4 items-center">
                      <Checkbox className="" />
                      <div
                        style={{
                          backgroundImage: `url(https://fps.cdnpk.net/images/home/subhome-ai.webp?w=649&h=649)`,
                        }}
                        className="min-w-[120px] h-[120px] bg-no-repeat bg-cover rounded-md"
                      ></div>
                      <div className="flex flex-col justify-between">
                        <Link to={`/books/${cartItem.book_name}`} className=" line-clamp-3">
                          Food name
                        </Link>
                        <div className="flex items-end gap-1">
                          <p className="font-bold">32.000</p>
                          <p className="text-xs mb-1 line-through text-gray-500">{12000}</p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-[40%] flex items-center">
                      <div className=" basis-[45%] flex justify-center">
                        <div className=" border-[1px] rounded-md text-center items-center justify-center inline-flex">
                          <div className="px-2 py-2">
                            <FaMinus onClick={() => {}} className=" text-gray-500 hover:text-gray-700 cursor-pointer" />
                          </div>
                          <p className="font-bold text-gray-700 px-2 select-none">2</p>
                          <div className="px-2 py-2">
                            <FaPlus onClick={() => {}} className=" text-gray-500 hover:text-gray-700 cursor-pointer" />
                          </div>
                        </div>
                      </div>
                      <p className=" basis-[45%]  text-center select-none text-primary-color font-bold">{32000}</p>
                      <div className="basis-[10%]">
                        <FaTrash
                          onClick={() => {}}
                          className=" text-gray-400 cursor-pointer hover:text-gray-700 transition-all"
                        />
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
                <h1>Phí vận chuyển 22000</h1>
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
