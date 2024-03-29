const rootEndpoint = `http://app.idfuse.fr/api/crm/contact/add?api_token=${global.accessToken}`;

export class Contact {
  constructor(
    id,
    first_name,
    last_name,
    company_id,
    opportunity_name,
    contact_first_name,
    contact_last_name,
    email
  ) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.company_id = company_id;
    this.companies = [
      {
        id: company_id,
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
        email: email,
      },
    ];
  }
}

export default async function addContact(newContact) {
  try {
    const response = await fetch(rootEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newContact),
    });

    if (response.ok) {
      console.log("Contact ajouté avec succès");
    } else {
      throw new Error(
        "Erreur lors de l'ajout du contact. Statut de la réponse : " +
          response.status
      );
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout du contact :", error);
    throw error;
  }
}

class AddContactApi {
  //récupère les contacts de l'API
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
      console.error("Erreur lors de la récupération des contacts :", error);
      throw error;
    }
  }

  createContact(contact) {
    return new Contact(
      contact.id,
      contact.first_name,
      contact.last_name,
      contact.company_id,
      contact.opportunity_name,
      contact.contact_first_name,
      contact.contact_last_name,
      contact.email
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
