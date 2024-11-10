import React, { useEffect, useState } from 'react';
import Food from '@/components/food/Food';
import SortNFilter from '@/components/ui/PageDashboard/SortNFilter';
import { useLocation } from 'react-router-dom';
import foodApi from '@/apis/foodApi';

function SearchPage() {
  const [selectedFoodType, setSelectedFoodType] = useState(null);
  const [sliderValue, setSliderValue] = useState([]);
  const location = useLocation();
  const [foods, setFoods] = useState([]); 
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [searchQuery, setSearchQuery] = useState('');

  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    return params.get('query') || ''; // Get the 'query' parameter
  };
  const fetchSearchedFoods = async () => {
    const query = searchQuery || getQueryParams();
    console.log("query:",query);
    if (query) {
      try {
        setLoading(true);
        const response = await foodApi.getSearchedFood(1, 10, query); // Adjust limit as necessary
        if (response.status === "success") {
          setFoods(response.data);
          setError(null);
        } else {
          setFoods([]);
          setError('No results found');
        }
      } catch (err) {
        setError('Failed to fetch foods');
      } finally {
        setLoading(false);
      }
    }
    else{
      setFoods([]);
      setError(null);
    }
  };
  useEffect(() => {
    const query = getQueryParams();
    setSearchQuery(query);
    fetchSearchedFoods();
  }, [location.search])

  return (
    <section className='rounded-xl mx-5 h-full mt-20 min-w-md'>
      <div className="shopInfo">
        <div className="relative bg-center w-full bg-cover h-[500px] bg-[url('https://t3.ftcdn.net/jpg/02/05/03/96/360_F_205039646_r2ddysNHjVE5HFJUQnMS6UcgqYgjQ0H8.jpg')] rounded-xl flex lg:pl-24 md:pl-8 sm:pl-0">
          <div className="w-fit flex flex-col items-center py-40 sm:mx-5">
            {/* Shop Info */}
            <div className="userInfo flex flex-col md:flex-row px-8 items-center bg-white rounded-xl">
              <div className="profilePic bg-[url('https://thietkelogo.mondial.vn/wp-content/uploads/2024/03/burger-king-vector.jpg')] lg:w-[150px] lg:h-[150px] w-[100px] h-[100px] bg-cover rounded-full"></div>
              <div className="information px-8 text-center md:text-left">
                <h1 className="text-orange-600 font-semibold">IT Basement Restaurant</h1>
                <h2>Tran Phu, Ho Chi Minh City</h2>
              </div>
              <div className="jobs text-center md:text-left px-8">
                <h2>itbasement@gmail.com</h2>
                <h2>email</h2>
              </div>
            </div>
            {/* Navigation back */}
            <div className="flex space-x-2 mt-4">
              <h1 className='text-primary-color'>Home <span>/</span></h1>
              <h1 className='text-red-600'>Shop</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="shopItemSection mt-10 bg-theme-color rounded-lg h-full ">
        <div className="shopItemList flex justify-between gap-5">
          <SortNFilter setSelectedFoodType={setSelectedFoodType} setMaxPrice={setSliderValue} setSearchQuery={setSearchQuery} />
          <div className="rightItemsList bg-white p-5 m-5 w-full h-full border border-gray-300 shadow-lg">
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && <Food selectedFoodType={selectedFoodType} sliderValue={sliderValue} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>} {/* Pass fetched foods */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SearchPage;
