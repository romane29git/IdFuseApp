const API_URL = "https://app.idfuse.fr/api/crm/calendar/campaign?api_token=ac781e5381ea80907e7f3b0aa5156cbc8eebf82957bf69c939829d9ee619ca78";

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
