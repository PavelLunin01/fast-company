import httpService from "./httpService";

const qualitiesEndPoint = "quality/";

const qualitiesService = {
  get: async () => {
    const { data } = await httpService.get(qualitiesEndPoint);
    return data;
  }
};

export default qualitiesService;
