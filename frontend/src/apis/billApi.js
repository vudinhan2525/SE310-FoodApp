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
};

export default billApi;
