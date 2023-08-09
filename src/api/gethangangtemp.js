import axios from "axios";

export const getHangangTempApi = async () => {
  try {
    const response = await axios.get("http://hangang.dkserver.wo.tc");
    return response.data;
  } catch (error) {
    throw error;
  }
};
