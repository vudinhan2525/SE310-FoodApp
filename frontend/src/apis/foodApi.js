import { request } from "./request";

const foodApi = {
  getAllFood: async (paging,limit,type) => {
    let query = `/Food?page=${paging}&limit=${limit}`
    if(type && type != "All"){
        query += `&type=${type}`
    }
    const response = await request.get(query);
    return response.data;
  }
};
export default foodApi;
