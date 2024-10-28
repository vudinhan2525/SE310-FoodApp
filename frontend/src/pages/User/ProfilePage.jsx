import { Button } from "@/components/ui/button";
import UserHeading from "./UserHeading";

export default function ProfilePage() {
  return (
    //Whole section
<section className="bg-orange-200 rounded-xl mx-32 h-full">
      <UserHeading />
       {/* Lower Profile */}
      <div className="lowerProfile px-4 sm:px-8 py-8 rounded-xl flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
        {/* Left Setting - chua co chuc nang*/}
        <div className="leftSetting bg-white px-5 basis-full lg:basis-1/4 rounded-xl">
          <h1 className="text-2xl font-bold sm:text-xl text-center py-5 border-b-blue-500 border-b">
          Public profile
          </h1>
          {/* Avatar*/}
          <div className="grid max-w-2xl mx-auto mt-8">
            <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
              <div className="bg-[url('picture/userAvt.jpg')] w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-cover ring-2 ring-indigo-300"></div>
              <div className="flex flex-col space-y-5 sm:ml-8">
              <Button className="font-medium hover:bg-slate-800">Change avatar</Button>
              <Button className="font-medium bg-white text-black hover:bg-slate-300">Delete avatar</Button>
            </div>
          </div>
          {/* Update Info*/}
          <div className="mt-8 sm:mt-14 text-[#202142]">
            <div className="flex flex-col sm:flex-row sm:space-x-4 sm:space-y-0 space-y-2">
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-indigo-900">Your first name</label>
                <input type="text" className="bg-indigo-50 border border-indigo-300 text-sm rounded-lg w-full p-2.5" />
              </div>
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium text-indigo-900">Your last name</label>
                <input type="text" className="bg-indigo-50 border border-indigo-300 text-sm rounded-lg w-full p-2.5" />
              </div>
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-indigo-900">Your email</label>
              <input type="email" className="bg-indigo-50 border border-indigo-300 text-sm rounded-lg w-full p-2.5" />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-indigo-900">Your address</label>
              <input type="text" className="bg-indigo-50 border border-indigo-300 text-sm rounded-lg w-full p-2.5" />
            </div>
            <div className="flex justify-end mt-5">
              <Button className="text-white bg-indigo-700 hover:bg-indigo-800 rounded-lg px-5 py-2.5">Save</Button>
            </div>
          </div>
        </div>
        </div>
        {/* Review Block*/}
      <div className="reviewBlock basis-full lg:basis-1/2 rounded-xl bg-white text-center h-64 lg:h-[800px]">
        Review
        </div>
         {/* Order */}
      <div className="rightOnline basis-full lg:basis-1/4 flex flex-col justify-between h-full gap-8 px-4 lg:px-0">
        {/* Top Section - Online Order */}
        <div className="top-right flex-grow rounded-xl bg-white shadow-sm">
          <h1 className="text-xl font-bold text-center py-5 border-b border-b-blue-500">
            Online Order
          </h1>
          {/* Review Sections */}
          <div className="flex justify-between items-center py-4 border-b border-b-orange-200 px-5 hover:shadow-lg cursor-pointer transition-all duration-200">
            <h1 className="text-base sm:text-lg font-semibold text-gray-700">Dineline Reviews</h1>
            <div className="bg-orange-400 rounded-full w-[40px] h-[40px] flex items-center justify-center">
              <span className="text-white font-bold">1</span>
            </div>
          </div>
          <div className="flex justify-between items-center py-4 border-b border-b-orange-200 px-5 hover:shadow-lg cursor-pointer transition-all duration-200">
            <h1 className="text-base sm:text-lg font-semibold text-gray-700">Dineline</h1>
            <div className="bg-orange-400 rounded-full w-[40px] h-[40px] flex items-center justify-center">
              <span className="text-white font-bold">1</span>
            </div>
          </div>
          <div className="flex justify-between items-center py-4 border-b border-b-orange-200 px-5 hover:shadow-lg cursor-pointer transition-all duration-200">
            <h1 className="text-base sm:text-lg font-semibold text-gray-700">Reviews</h1>
            <div className="bg-orange-400 rounded-full w-[40px] h-[40px] flex items-center justify-center">
              <span className="text-white font-bold">1</span>
            </div>
          </div>
          <div className="flex justify-between items-center py-4 border-b border-b-orange-200 px-5 hover:shadow-lg cursor-pointer transition-all duration-200">
            <h1 className="text-base sm:text-lg font-semibold text-gray-700">Photos</h1>
            <div className="bg-orange-400 rounded-full w-[40px] h-[40px] flex items-center justify-center">
              <span className="text-white font-bold">1</span>
            </div>
          </div>
        </div>

        {/* Bottom Section - Order History */}
        <div className="bottom-right flex-grow rounded-xl bg-white shadow-sm">
          <h1 className="text-xl font-bold text-center py-5 border-b border-b-blue-500">
            Order History
          </h1>
          <div className="flex justify-between items-center py-4 border-b border-b-orange-200 px-5 hover:shadow-lg cursor-pointer transition-all duration-200">
            <h1 className="text-base sm:text-lg font-semibold text-gray-700">Favorite Order</h1>
          </div>
          <div className="flex justify-between items-center py-4 border-b border-b-orange-200 px-5 hover:shadow-lg cursor-pointer transition-all duration-200">
            <h1 className="text-base sm:text-lg font-semibold text-gray-700">Order History</h1>
          </div>
          <div className="flex justify-between items-center py-4 border-b border-b-orange-200 px-5 hover:shadow-lg cursor-pointer transition-all duration-200">
            <h1 className="text-base sm:text-lg font-semibold text-gray-700">My Address</h1>
          </div>
        </div>
      </div>


      </div>
</section>
  )
}
