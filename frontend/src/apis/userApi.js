import { request } from "./request";

const userApi = {
  addFoodSaved: async ({ userId, foodId }) => {
    const response = await request.post("/User/addFoodSaved", { userId, foodId });
    return response.data;
  },
  removeFoodSaved: async ({ userId, foodId }) => {
    const response = await request.post("/User/removeFoodSaved", { userId, foodId });
    return response.data;
  },
};
export default userApi;
