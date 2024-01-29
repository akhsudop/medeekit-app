import axios from "axios";

const drugsApi = axios.create({
  baseURL: "http://localhost:3500/",
});

export const getDrugs = async (searchVal) => {
  const response = await drugsApi.get(
    `/drugs?name_like=${searchVal.toLowerCase().trim()}`
  ); //`/drugs?name_like=${searchVal.toLowerCase().trim()}`
  console.log(response.data);
  return response.data;
};
