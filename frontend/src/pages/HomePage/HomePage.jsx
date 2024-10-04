import Banner from "./Banner";
import Banner2 from "./Banner2";
import MenuCategory from "./MenuCategory";
import TrendingFood from "./TrendingFood";

export default function HomePage() {
  return (
    <div className="mt-[60px] w-full h-[2000px] bg-[#fffaf7]">
      <div className="px-24">
        <Banner />
        <MenuCategory />
        <TrendingFood />
      </div>
      <Banner2></Banner2>
    </div>
  );
}
