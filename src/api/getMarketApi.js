import axios from "axios";

export const getMarketApi = async () => {
  try {
    const response = await axios.get("https://api.upbit.com/v1/market/all");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMarketDetailApi = async (markets) => {
  try {
    const response = await axios.get(
      `https://api.upbit.com/v1/ticker?markets=${markets.join(",")}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
