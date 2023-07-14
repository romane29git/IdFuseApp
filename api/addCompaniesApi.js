const rootEndpoint =
  "https://app.idfuse.fr/api/crm/company?api_token=ac781e5381ea80907e7f3b0aa5156cbc8eebf82957bf69c939829d9ee619ca78";

export class Company {
  constructor(
    id,
    name,
    street,
    city,
    postal_code,
    country,
    customer_address,
    effectif,
    secteur,
    company_status,
    produit,
    registration_number, 
    solution_crm
  ) {
    this.id = id;
    this.name = name;
    this.addresses = [
      {
        street: street,
        city: city,
        postal_code: postal_code,
        country: country,
        customer_address: customer_address,
      },
    ];
    this.produit = produit;
    this.effectif = effectif;
    this.company_status = company_status;
    this.secteur = secteur;
    this.registration_number = registration_number;
    this.solution_crm = solution_crm;
  }
}

export default async function addCompany(newCompany) {
  try {
    console.log("Données de l'entreprise à ajouter :", newCompany);

    const response = await fetch(rootEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newCompany),
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

class AddCompaniesApi {
  async fetchCompanies() {
    const companies = await this.fetchFromApi(rootEndpoint);

    if (companies && Array.isArray(companies)) {
      return this.createCompanies(companies);
    } else {
      console.error("Invalid API response:", companies);
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

  createCompany(company) {
    return new Company(
      company.id,
      company.name,
      company.street,
      company.city,
      company.postal_code,
      company.country,
      company.customer_address,
      company.Produits,
      company["Effectif entreprise"],
      company["Secteur activite"],
      company.company_status,
      company.registration_number,
      company['Solution CRM actuelle'],
    );
  }

  createCompanies(companies) {
    if (!Array.isArray(companies)) {
      console.error("Invalid companies data");
      return [];
    }

    return companies.map((company) => this.createCompany(company));
  }

  async getCompanyById(id) {
    const endpoint = `${rootEndpoint}&id=${id}`;
    const company = await this.fetchFromApi(endpoint);
    if (company) {
      return this.createCompany(company);
    } else {
      console.error("Invalid API response:", company);
      return null;
    }
  }

  async updateCompany(id, updatedCompany) {
    const endpoint =
      "https://app.idfuse.fr/api/crm/company/${id}?api_token=ac781e5381ea80907e7f3b0aa5156cbc8eebf82957bf69c939829d9ee619ca78";
    try {
      console.log(`Mise à jour de l'entreprise avec l'identifiant ${id}`);
      const response = await this.fetchFromApi(endpoint, "PUT", updatedCompany);

      if (response.ok) {
        console.log("Entreprise mise à jour avec succès");
      } else {
        throw new Error(
          "Erreur lors de la mise à jour de l'entreprise. Statut de la réponse : " +
            response.status
        );
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'entreprise :", error);
      throw error;
    }
  }
}

export const companiesApiInstance = new AddCompaniesApi();
