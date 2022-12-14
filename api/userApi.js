import axiosClient from "./axiosClient";

const userApi = {
  getAllUsers: async () => {
    return axiosClient.get("/user/getAllUsers");
  },
};

export default userApi;
