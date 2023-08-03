import axios from "axios";

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

class companiesApi {
  async fetchCompanies() {

    const response = await this.fetchFromApi(
      `https://app.idfuse.fr/api/crm/company/all?api_token=${global.accessToken}&api=1`
    );
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
      `https://app.idfuse.fr/api/crm/company/${id}?api_token=${global.accessToken}`
    );

    return this.createCompany(company);
  }

  async fetchFromApi(query) {
    console.log(`Fetching API with query ${query}`);
    try {
      const response = await axios.get(query, {
        headers: {
          Authorization: `Bearer ${global.accessToken}`,
        },
      });
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
