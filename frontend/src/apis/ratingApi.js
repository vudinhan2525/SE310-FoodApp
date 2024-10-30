import { request } from "./request";

const ratingApi = {
  getRatingByFoodId: async (paging,limit,foodId) => {
    let query = `/Rating?page=${paging}&limit=${limit}&foodId=${foodId}`
    const response = await request.get(query);
    return response.data;
  },
  addRating: async (userId, foodId, content, ratingValue) => {
    const data = {
      userId: userId,
      foodId: foodId,
      content: content,
      ratingValue: ratingValue
    };
    const response = await request.post('/Rating', data);
    return response.data;
  },
  deleteRating: async (ratingId) => {
    const query = `/Rating?ratingId=${ratingId}`;
    const response = await request.delete(query);
    return response.data;
  },
  updateRating: async (ratingId, content, ratingValue) => {
    const data = {
      ratingId: ratingId,
      content: content,
      ratingValue: ratingValue
    };
    const response = await request.post('/update', data);
    return response.data;
  }

}
export default ratingApi;
