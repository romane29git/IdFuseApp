import axios from "axios";

export class Activity {
  constructor(
    id,
    name,
    type_event,
    duration,
    date_start,
    contactName,
    companyName
  ) {
    this.id = id;
    this.name = name;
    this.type_event = type_event;
    this.duration = duration;
    this.date_start = date_start;
    this.contactName = contactName;
    this.companyName = companyName;
  }
}

class activitiesApi {
  //fonction asynchrone qui récupère les données des activités
  async fetchActivities() {
    const response = await this.fetchFromApi(
      `https://app.idfuse.fr/api/activities?api_token=${global.accessToken}`
    );
    if (response && typeof response === "object") {
      const activitiesData = response.activities;
      const activities = this.createActivities(activitiesData);
      return activities;
    } else {
      console.error("Invalid API response:", response);
      return [];
    }
  }

  //renvoie données de la réponse à la requête GET
  async fetchFromApi(query) {
    console.log(`Fetching API with query ${query}`);
    try {
      const response = await axios.get(query);
      return response.data;
    } catch (e) {
      console.error(e);
    }
  }

  //création nouvelle activité
  createActivity(activity) {
    return new Activity(
      activity.id,
      activity.name,
      activity.type_event,
      activity.duration,
      activity.date_start,
      activity.contactName,
      activity.companyName
    );
  }

  //création d'un nouveau tableau d'activités 
  createActivities(activities) {
    if (!Array.isArray(activities)) {
      console.error("Invalid activities data");
      return [];
    }

    return activities.map((activity) => this.createActivity(activity));
  }
}

export default new activitiesApi();
