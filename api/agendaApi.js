const API_URL = `https://app.idfuse.fr/api/crm/calendar/campaign?api_token=${global.accessToken}`;

export const fetchEvents = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Erreur lors de la récupération des événements :", error);
    return [];
  }
};

class AgendaApi {
  async getAllEvents() {
    try {
      const events = await fetchEvents();
      return events;
    } catch (error) {
      console.error("Erreur lors de la récupération des événements :", error);
      return [];
    }
  }

  createEvent(event) {
    const createdEvent = {
      title: event.title,
      date_start: event.start,
      date_end: event.end,
    };
    return createdEvent;
  }
}

export default AgendaApi;
