import { request } from "./request";

const foodApi = {
  getAllFood: async (paging,limit,type) => {
    let query = `/Food?page=${paging}&limit=${limit}`
    if(type && type != "All"){
        query += `&type=${type}`
    }
    const response = await request.get(query);
    return response.data;
  },
  getNewestFood: async (paging,limit) => {
    let query = `/Food/Newest?page=${paging}&limit=${limit}`
    const response = await request.get(query);
    return response.data;
  },
  getSearchedFood: async (paging,limit,kw) => {
    let query = `/Food/Search?page=${paging}&limit=${limit}`
    if(kw){
      query += `&kw=${kw}`
    }
    const response = await request.get(query);
    return response.data;
  },
  getFoodbyId: async (foodId) => {
    let query = `/Food/getfood?id=${foodId}`
    const response = await request.get(query);
    return response.data;
  },
  getAllFoodTypes: async () => {
    let query = `/Category/getAllFoodTypes`;
    const response = await request.get(query);
    return response.data;
  },
  getFoodType: async (typeId) => {
    let query = `/Category/getFoodTypeById?id-${typeId}`;
    const response = await request.get(query);
    return response.data;
  }
}
export default foodApi;
