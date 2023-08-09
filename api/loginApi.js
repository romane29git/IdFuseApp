import axios from "axios";

const API_URL = "https://app.idfuse.fr/api/login";

export const loginApi = async (username, password) => {
  try {
    const response = await axios.get(API_URL, {
      params: { username, password },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    throw error; 
  }
};
