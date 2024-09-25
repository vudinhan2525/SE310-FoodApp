import { useContext } from "react";
import { AuthContext } from "../authProvider/AuthProvider";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox";
import { FaBell } from "react-icons/fa6";

export default function Header() {
  const { setShowLoginModal, isLoggedIn } = useContext(AuthContext);
  return (
    <div className="flex fixed bg-white/95 z-[99] left-0 right-0 top-0 items-center px-24 justify-between">
      <Link
        to={"/"}
        style={{
          backgroundImage: `url(https://www.foody.vn/style/images/logo/foody-vn.png)`,
        }}
        className="h-[60px] w-[100px] bg-no-repeat bg-contain bg-center"
      ></Link>
      <SearchBox />
      <div className="flex items-center gap-4">
        <div className="px-3 py-3 hover:bg-gray-100 text-gray-400 hover:text-gray-600 rounded-full cursor-pointer transition-all">
          <FaBell className=" " />
        </div>
        <div
          className="bg-primary-color hover:bg-orange-700 transition-all text-white px-6 py-2 rounded-full cursor-pointer"
          onClick={() => {
            if (!isLoggedIn) {
              setShowLoginModal(true);
            }
          }}
        >
          Login
        </div>
      </div>
    </div>
  );
}
