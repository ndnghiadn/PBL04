import axiosClient from "./axiosClient";

const bunkerApi = {
  createBunker: async (data) => {
    return axiosClient.post("/bunker", data);
  },

  getAllBunkers: async () => {
    return axiosClient.get("/bunker");
  },

  addQuestions: async (bunkerId, data) => {
    return axiosClient.post(`/bunker/${bunkerId}/addQuestions`, { data });
  },
};

export default bunkerApi;
