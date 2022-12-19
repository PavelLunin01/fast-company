import httpService from "./httpService";

const professionsEndPoint = "profession/";

const professionsService = {
  get: async () => {
    const { data } = await httpService.get(professionsEndPoint);
    return data;
  }
};

export default professionsService;
