class ContactApi {
  async fetchContactById(id) {
    try {
      const response = await fetch(
        `https://app.idfuse.fr/api/crm/contact/${id}?api_token=ac781e5381ea80907e7f3b0aa5156cbc8eebf82957bf69c939829d9ee619ca78`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error fetching contact data: ${error}`);
    }
  }

  async getContactById(id) {
    const contactData = await this.fetchContactById(id);
    return this.createContact(contactData);
  }

  createContact(contactData) {
    const contact = {
      id: contactData.contact.id,
      first_name: contactData.contact.first_name,
      last_name: contactData.contact.last_name,

      companies: contactData.contact.companies
        ? contactData.contact.companies.map((company) => {
            return {
              company_name: company.name,
              company_id: company.id,
            };
          })
        : [],

      opportunities: contactData.contact.opportunities
        ? contactData.contact.opportunities.map((opportunity) => {
            return {
              opportunity_name: opportunity.name,
              opportunity_id: opportunity.id,
            };
          })
        : [],

      contacts: contactData.contact.contacts
        ? contactData.contact.contacts.map((contact) => {
            return {
              contact_first_name: contact.first_name,
              contact_last_name: contact.last_name,
              contact_id: contact.id,
            };
          })
        : [],

      mail:
        contactData.contact.emails && contactData.contact.emails.length > 0
          ? contactData.contact.emails[0].mail
          : "",
    };
    return contact;
  }
}

export default ContactApi;
