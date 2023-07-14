import axios from "axios";

const rootEndpoint =
  "https://app.idfuse.fr/api/crm/company/all?api_token=ac781e5381ea80907e7f3b0aa5156cbc8eebf82957bf69c939829d9ee619ca78&api=1";

export class Company {
  constructor(id, name, city, postal_code, produit, effectif, secteur, statut) {
    this.id = id;
    this.name = name;
    this.city = city;
    this.postal_code = postal_code;
    this.produit = produit;
    this.effectif = effectif;
    this.secteur = secteur;
    this.statut = statut;
  }
}

export async function addCompany(newCompany) {
  try {
    const response = await axios.post(
      "https://app.idfuse.fr/api/crm/company?api_token=ac781e5381ea80907e7f3b0aa5156cbc8eebf82957bf69c939829d9ee619ca78",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
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

class companiesApi {
  async fetchCompanies() {
    const response = await this.fetchFromApi(rootEndpoint);
    if (response && typeof response === "object") {
      const companies = response.companies;
      return this.createCompanies(companies);
    } else {
      console.error("Invalid API response:", response);
      return [];
    }
  }

  async getCompanyById(id) {
    const company = await this.fetchFromApi(
      `https://app.idfuse.fr/api/crm/company/${id}?api_token=ac781e5381ea80907e7f3b0aa5156cbc8eebf82957bf69c939829d9ee619ca78`
    );

    return this.createCompany(company);
  }

  async fetchFromApi(query) {
    console.log(`Fetching API with query ${query}`);
    try {
      const response = await axios.get(query);
      return response.data;
    } catch (e) {
      console.error(e);
    }
  }

  createCompany(company) {
    return new Company(
      company.id,
      company.name,
      company.city,
      company.postal_code,
      company.Produits,
      company["Effectif entreprise"],
      company["Secteur activite"],
      company.company_status
    );
  }

  createCompanies(companies) {
    if (!Array.isArray(companies)) {
      console.error("Invalid companies data");
      return [];
    }

    return companies.map((company) => this.createCompany(company));
  }
}

export async function getCompanyById(id) {
  const api = new companiesApi();
  const company = await api.getCompanyById(id);
  return company;
}

export default new companiesApi();
