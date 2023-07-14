import axios from 'axios';

const API_URL = 'https://app.idfuse.fr/api/sso?api_token=ac781e5381ea80907e7f3b0aa5156cbc8eebf82957bf69c939829d9ee619ca78&sso_user=democlients'; 

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data; // Renvoie les données de la réponse de l'API
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    throw error; // Lance l'erreur pour être gérée au niveau supérieur
  }
};
