import axiosClient from "./axiosClient";

const resultApi = {
  getResultByContestId: async (contestId) => {
    return axiosClient.get(`/result/${contestId}`);
  },
};

export default resultApi;
