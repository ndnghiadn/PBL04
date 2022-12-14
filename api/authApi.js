import axiosClient from "./axiosClient";

const authApi = {
  login: async (data) => {
    return axiosClient.post("/auth/signin", data);
  },
};

export default authApi;
