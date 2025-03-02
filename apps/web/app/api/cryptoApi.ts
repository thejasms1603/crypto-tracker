import axios from "axios";
import { Crypto } from "@/types/crypto";

const API_URL = "https://api.coingecko.com/api/v3";

export const fetchCryptos = async (): Promise<Crypto[]> => {
  try {
    const response = await axios.get(`${API_URL}/coins/markets`, {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 10,
        page: 1,
        sparkline: false,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    throw error;
  }
};
