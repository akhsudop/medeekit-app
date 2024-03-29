import axios from "axios";

const drugsApi = axios.create({
  baseURL: "http://localhost:3500/",
});

export const getDrugs = async (searchVal) => {
  const response = await drugsApi.get(
    `/drugs?name_like=${searchVal.toLowerCase().trim()}`
  );

  return response.data;
};
