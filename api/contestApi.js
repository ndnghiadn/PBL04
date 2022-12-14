import axiosClient from "./axiosClient";

const contestApi = {
  createContest: async (data) => {
    return axiosClient.post("/contest", data);
  },
  assignParticipants: async (contestId, data) => {
    return axiosClient.post(`/contest/${contestId}/assignParticipants`, data);
  },
  startContest: async (contestId) => {
    return axiosClient.get(`/contest/${contestId}`);
  },
  finishContest: async (contestId, data) => {
    return axiosClient.post(`/contest/${contestId}/finishContest`, data);
  },
  getAllContests: async () => {
    return axiosClient.get("/contest");
  },
  getContestById: async (contestId) => {
    return axiosClient.get(`/contest/getContestById/${contestId}`);
  }
};

export default contestApi;
