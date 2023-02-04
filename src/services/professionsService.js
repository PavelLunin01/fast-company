import httpService from "./httpService";

const professionsEndPoint = "profession/";

const professionsService = {
  fetchAll: async () => {
    const { data } = await httpService.get(professionsEndPoint);
    return data;
  }
};

export default professionsService;
