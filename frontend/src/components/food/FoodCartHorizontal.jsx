const FoodCardHorizontal = ({ img, title, rating, description, price }) => {
    return (
      <div className="flex h-[75px] shadow-lg transition-all duration-500 hover:shadow-xl dark:bg-slate-950 dark:text-white cursor-pointer border border-gray-300 rounded-xl">
        <div className="flex-shrink-0 overflow-hidden w-[40%] rounded-l-xl">
          <img
            src={img}
            alt="No image"
            className="h-full w-full object-cover transition duration-700 hover:skew-x-2"
          />
        </div>
        <div className="flex justify-between p-4 w-[60%] space-y-2 items-center">
          <div>
            <h1 className="line-clamp-1 font-bold text-xl">{title}</h1>
            <div className="flex items-center gap-2 opacity-70">
              <span>{rating}</span>
            </div>
          </div>
          <div className="pt-3 mt-3">
                <p className="text-2xl font-bold text-red-400">${price}</p>
            </div>
          
        </div>
      </div>
    );
  };
  
  export default FoodCardHorizontal;
  