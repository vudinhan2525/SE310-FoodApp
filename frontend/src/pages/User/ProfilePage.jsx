import { Button } from "@/components/ui/button";
import UserHeading from "./UserHeading";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/components/authProvider/AuthProvider";
import userApi from "@/apis/userApi";
import UserReview from "./MidContent";
import MidContent from "./MidContent";
import { Breadcrumb } from "antd";

export default function ProfilePage() {
  const {userData} = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  // console.log("user:",userData);
  useEffect(() => {
    if (userData) {
      const names = userData.username.split(" ");
      const lastName = names.length > 1 ? names.slice(1).join(" ") : "";
      setFirstName(names[0]);
      setLastName(lastName);
      setEmail(userData.email);
      setAddress(userData.address);
    }
  }, [userData]);
  useEffect(() => {
    const UpdateFoodsCount = async () => {
        try {
            const response = await userApi.getAllFoodSaved(userData.userId);
            const foods = response.data; 
            setFavoriteCount(foods.length); 
            // console.log("Food items:", foods);
            // console.log("Count:", foods.length); 
        } catch (error) {
            console.error("Failed to fetch favorite foods:", error);
        }
    };
    if (userData && userData.userId) {
      UpdateFoodsCount();
    }
}, [userData]);

  const handleSave = () => {
    // Logic to handle save (e.g., update the user data)
    console.log({
      firstName,
      lastName,
      email,
      address,
    });
  };
  const breadcrumbItems = [
    { title: 'Home', href: '/' },
    { title: 'Profile', href: '#' }, // Using a hash for the current book
  ];
  return (
  <section className="bg-orange-200 rounded-xl mx-12 h-full">
        <UserHeading />
        <div className="px-16 flex justify-center ">
          <Breadcrumb
            className="font-semibold text-black text-xl"
            items={breadcrumbItems.map((item) => ({
                title: item.href ? <a href={item.href}>{item.title}</a> : item.title,
            }))}
          />
        </div>
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
              <div
                  className="bg-cover w-32 h-32 sm:w-40 sm:h-40 rounded-full ring-2 ring-indigo-300"
                  style={{ backgroundImage: `url(${userData.avatar})` }}
              ></div>
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
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="bg-indigo-50 border border-indigo-300 text-sm rounded-lg w-full p-2.5"
                  />
                </div>
                <div className="w-full">
                  <label className="block mb-2 text-sm font-medium text-indigo-900">Your last name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="bg-indigo-50 border border-indigo-300 text-sm rounded-lg w-full p-2.5"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-indigo-900">Your email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-indigo-50 border border-indigo-300 text-sm rounded-lg w-full p-2.5"
                />
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-indigo-900">Your address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="bg-indigo-50 border border-indigo-300 text-sm rounded-lg w-full p-2.5"
                />
              </div>
              <div className="flex justify-end mt-5">
                <Button onClick={handleSave} className="text-white bg-indigo-700 hover:bg-indigo-800 rounded-lg px-5 py-2.5">Save</Button>
              </div>
            </div>
          </div>
          </div>
          {/* Review Block*/}
        <div className="reviewBlock basis-full lg:basis-1/2 rounded-xl bg-white text-center h-64 lg:h-full">
          <MidContent setReviewCount={setReviewCount}/>
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
              <Link to="/favorite" className="flex-grow">
                <h1 className="text-base sm:text-lg font-semibold text-gray-700">Favorites Food</h1>
              </Link>
              <div className="bg-orange-400 rounded-full w-[40px] h-[40px] flex items-center justify-center">
                <span className="text-white font-bold">{favoriteCount}</span>
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
                <span className="text-white font-bold">{reviewCount}</span>
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
