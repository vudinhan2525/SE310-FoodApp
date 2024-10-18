import { authRequest } from "./request";

const authApi = {
  register: async (data) => {
    const response = await authRequest.post(`/user`, data);
    return response.data;
  },
  isLoggedIn: async () => {
    const response = await authRequest.get(`/user/checkjwt`);
    return response.data;
  },
};
export default authApi;
