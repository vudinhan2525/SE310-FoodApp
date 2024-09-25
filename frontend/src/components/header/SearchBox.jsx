import { FaMagnifyingGlass } from "react-icons/fa6";

export default function SearchBox() {
  return (
    <div className="w-[400px] bg-gray-100 rounded-full h-[50px] flex items-center relative">
      <input
        placeholder="Search for food..."
        className="w-full bg-transparent outline-none px-6 py-3 "
      ></input>
      <div className="w-[60px] flex items-center justify-center h-full text-gray-400 hover:text-gray-600 rounded-r-full rounded-br-full cursor-pointer transition-all hover:bg-gray-200">
        <FaMagnifyingGlass />
      </div>
    </div>
  );
}
