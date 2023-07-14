const rootEndpoint =
  "http://app.idfuse.fr/api/crm/contact/add?api_token=ac781e5381ea80907e7f3b0aa5156cbc8eebf82957bf69c939829d9ee619ca78";

export class Contact {
  constructor(
    id,
    first_name,
    last_name,
    company_name,
    company_id,
    opportunity_name,
    contact_first_name,
    contact_last_name,
    mail
  ) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.companies = [
      {
        company_id: company_id,
        company_name: company_name,
      },
    ];
    this.opportunities = [
      {
        opportunity_id: opportunity_id,
        opportunity_name: opportunity_name,
      },
    ];
    this.contacts = [
      {
        contact_first_name: contact_first_name,
        contact_last_name: contact_last_name,
      },
    ];
    this.emails = [
      {
        mail: mail,
      },
    ];
  }
}

export default async function addContact(newContact) {
  try {
    console.log("Données de l'entreprise à ajouter :", newContact);

    const response = await fetch(rootEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newContact),
    });

    if (response.ok) {
      console.log("Entreprise ajoutée avec succès");
    } else {
      throw new Error(
        "Erreur lors de l'ajout de l'entreprise. Statut de la réponse : " +
          response.status
      );
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'entreprise :", error);
    throw error;
  }
}

class AddContactApi {
  async fetchContact() {
    const contact = await this.fetchFromApi(rootEndpoint);

    if (contact && Array.isArray(contact)) {
      return this.createContact(contact);
    } else {
      console.error("Invalid API response:", contact);
      return [];
    }
  }

  async fetchFromApi(endpoint, method = "POST", body = null) {
    console.log(`Fetching API endpoint: ${endpoint}`);
    try {
      const options = {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: body ? JSON.stringify(body) : null,
      };

      const response = await fetch(endpoint, options);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erreur lors de la récupération des entreprises :", error);
      throw error;
    }
  }

  createContact(contact) {
    return new Contact(
      contact.id,
      contact.first_name,
      contact.last_name,
      contact.company_name,
      contact.company_id,
      contact.opportunity_name,
      contact.contact_first_name,
      contact.contact_last_name,
      contact.mail
    );
  }

  createContacts(contacts) {
    if (!Array.isArray(contacts)) {
      console.error("Invalid contacts data");
      return [];
    }

    return contacts.map((contact) => this.createContact(contact));
  }

  async getContactById(id) {
    const endpoint = `${rootEndpoint}&id=${id}`;
    const contact = await this.fetchFromApi(endpoint);
    if (contact) {
      return this.createContact(contact);
    } else {
      console.error("Invalid API response:", contact);
      return null;
    }
  }
}

export const contactApiInstance = new AddContactApi();
