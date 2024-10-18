import request from "./request";

const authApi = {
  register: async (data) => {
    const response = await request.post(`/user`, data);
    return response.data;
  },
};
export default authApi;
