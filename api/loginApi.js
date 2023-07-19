import axios from "axios";

const API_URL = "https://app.idfuse.fr/api/login";

export const loginApi = async (username, password) => {
  try {
    const response = await axios.get(API_URL, {
      params: { username, password },
    });
    return response.data; // Renvoie les données de la réponse de l'API
  } catch (error) {
    console.error("Erreur lors de la connexion (api):", error);
    throw error; // Lance l'erreur pour être gérée au niveau supérieur
  }
};
