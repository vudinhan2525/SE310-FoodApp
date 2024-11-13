import { request } from "./request";

const billApi = {
  addBill: async (body) => {
    try {
      const response = await request.post(
        `/Bill/addBill`,
        JSON.stringify(body), // Send the body as a JSON string
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  getBills: async (paging,limit,userId) => {
    try {
      const response = await request.get(
        `/Bill?page=${paging}&limit=${limit}&userId=${userId}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  getAllBill:async()=>{
    try {
      const response = await request.get(
        `/Bill/getAll`
      );
      return response.data;
    } catch (error) {
      return false
    }
  }
};

export default billApi;
