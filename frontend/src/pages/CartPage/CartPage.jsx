import cartApi from "@/apis/cartApi";
import { AuthContext } from "@/components/authProvider/AuthProvider";
import { Checkbox } from "@/components/ui/checkbox";
import { formatCurrency } from "@/lib/utils";
import React, { useContext, useState } from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Dialog from "./Dialog";

export default function CartPage() {
  const { carts, setCarts } = useContext(AuthContext);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteSelect, setShowDeleteSelect] = useState(false);
  const handleAddQuantity = async (orderId) => {
    setCarts((prevCarts) =>
      prevCarts.map((cartItem) =>
        cartItem.orderId === orderId ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      )
    );
    await cartApi.addQuantity(orderId);
  };

  const handleSubQuantity = async (orderId) => {
    setCarts((prevCarts) =>
      prevCarts.map((cartItem) =>
        cartItem.orderId === orderId && cartItem.quantity > 1
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      )
    );
    await cartApi.subQuantity(orderId);
  };
  const handleDeleteProd = async (orderId) => {
    setCarts((prevCarts) => prevCarts.filter((cartItem) => cartItem.orderId !== orderId));
    const response = await cartApi.deleteCart(orderId);

    if (response?.status === "success") {
      alert("Food deleted successfully");
    }
  };
  return (
    <div className="px-24 bg-gray-100 pb-24 mt-14">
      <h2 className="pt-6 text-xl mb-4">{`GIỎ HÀNG (${carts.length} sản phẩm)`}</h2>
      <div className="flex gap-4">
        <div className="basis-[70%]">
          <div className="flex justify-between px-4  rounded-lg py-3  items-center bg-white">
            <div className="basis-[60%] flex text-sm font-semibold items-center gap-2 ">
              <Checkbox
                onCheckedChange={(checked) => {
                  console.log(checked);
                }}
              ></Checkbox>
              <p>{`Chọn tất cả (${carts.length} sản phẩm)`}</p>
            </div>
            <div className="basis-[40%] flex items-center">
              <p className=" basis-[45%] text-center">Số lượng</p>
              <p className=" basis-[45%]  text-center">Thành tiền</p>
              <p className=" basis-[10%]  text-center"></p>
            </div>
          </div>
          <div className="mt-4 rounded-lg overflow-hidden ">
            {carts?.map((cartItem, idx) => {
              return (
                <div key={idx}>
                  <div className={`flex px-4 py-6 bg-white `}>
                    <div className="basis-[60%] flex gap-4 items-center">
                      <Checkbox className="" />
                      <div
                        style={{
                          backgroundImage: `url(${cartItem.foodDetails.image1})`,
                        }}
                        className="min-w-[120px] h-[120px] bg-no-repeat bg-cover rounded-md"
                      ></div>
                      <div className="flex flex-col justify-between">
                        <Link to={`/detail/${cartItem.foodId}`} className=" line-clamp-3">
                          {cartItem.foodDetails.name}
                        </Link>
                        <div className="flex items-end gap-1">
                          <p className="font-bold">{formatCurrency(cartItem.foodDetails.price)}</p>
                          <p className="text-xs mb-1 line-through text-gray-500">
                            {formatCurrency(cartItem.foodDetails.price + 10000)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="basis-[40%] flex items-center">
                      <div className=" basis-[45%] flex justify-center">
                        <div className=" border-[1px] rounded-md text-center items-center justify-center inline-flex">
                          <div className="px-2 py-2">
                            <FaMinus
                              onClick={() => {
                                if (cartItem.quantity === 1) {
                                  return;
                                }
                                handleSubQuantity(cartItem.orderId);
                              }}
                              className=" text-gray-500 hover:text-gray-700 cursor-pointer"
                            />
                          </div>
                          <p className="font-bold text-gray-700 px-2 select-none">{cartItem.quantity}</p>
                          <div className="px-2 py-2">
                            <FaPlus
                              onClick={() => {
                                handleAddQuantity(cartItem.orderId);
                              }}
                              className=" text-gray-500 hover:text-gray-700 cursor-pointer"
                            />
                          </div>
                        </div>
                      </div>
                      <p className=" basis-[45%]  text-center select-none text-primary-color font-bold">
                        {formatCurrency(cartItem.foodDetails.price)}
                      </p>
                      <div className="basis-[10%]">
                        <FaTrash
                          onClick={() => {
                            setShowDeleteSelect(true);
                            setDeleteId(cartItem.orderId);
                          }}
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
            {carts.length === 0 && (
              <div className="w-full text-center text-lg mt-4">Currently no items in your cart</div>
            )}
          </div>
        </div>
        <div className="basis-[30%] flex flex-col gap-5">
          <div className="px-4  py-4 bg-white rounded-lg">
            <form className="space-y-4 p-4 bg-gray-100 rounded-lg shadow-md">
              <div>
                <label className="block font-medium">House Number</label>
                <input
                  type="text"
                  name="houseNumber"
                  // value={formData.houseNumber}
                  // onChange={handleChange}
                  placeholder="Enter house number"
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-medium">Ward</label>
                <input
                  type="text"
                  name="ward"
                  // value={formData.ward}
                  // onChange={handleChange}
                  placeholder="Enter ward"
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-medium">District</label>
                <input
                  type="text"
                  name="district"
                  // value={formData.district}
                  // onChange={handleChange}
                  placeholder="Enter district"
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-medium">City</label>
                <input
                  type="text"
                  name="city"
                  // value={formData.city}
                  // onChange={handleChange}
                  placeholder="Enter city"
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-medium">Country</label>
                <input
                  type="text"
                  name="country"
                  // value={formData.country}
                  placeholder="Enter country"
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg bg-gray-200 cursor-not-allowed"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all"
              >
                Submit Address
              </button>
            </form>
          </div>
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
      {showDeleteSelect && (
        <Dialog
          onClose={() => {
            setDeleteId(null);
            setShowDeleteSelect(false);
          }}
          onYes={() => {
            handleDeleteProd(deleteId);
            setShowDeleteSelect(false);
          }}
          buttonContent={"Xóa"}
          message={"Bạn có chắc muốn xóa cuốn sách này"}
          content={"Sách sẽ được xóa khỏi giỏ hàng của bạn!!"}
        />
      )}
    </div>
  );
}
