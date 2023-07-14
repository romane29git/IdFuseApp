class CompanyApi {
  async fetchCompanyById(id) {
    try {
      const response = await fetch(
        `https://app.idfuse.fr/api/crm/company/${id}?api_token=ac781e5381ea80907e7f3b0aa5156cbc8eebf82957bf69c939829d9ee619ca78`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error fetching company data: ${error}`);
    }
  }

  async getCompanyById(id) {
    const companyData = await this.fetchCompanyById(id);
    return this.createCompany(companyData);
  }

  createCompany(companyData) {
    const company = {
      id: companyData.company.id,
      name: companyData.company.name,
      status: companyData.company.company_status,
      siren: companyData.company.registration_number,
      account_number: companyData.company.account_number,
      city:
        companyData.company.addresses &&
        companyData.company.addresses.length > 0
          ? companyData.company.addresses[0].city
          : "",
      postal_code:
        companyData.company.addresses &&
        companyData.company.addresses.length > 0
          ? companyData.company.addresses[0].postal_code
          : "",
      address:
        companyData.company.addresses &&
        companyData.company.addresses.length > 0
          ? companyData.company.addresses[0].customer_address
          : "",
      idAddress:
        companyData.company.addresses &&
        companyData.company.addresses.length > 0
          ? companyData.company.addresses[0].id
          : "",
      street_number:
        companyData.company.addresses &&
        companyData.company.addresses.length > 0
          ? companyData.company.addresses[0].street_number
          : "",
      street:
        companyData.company.addresses &&
        companyData.company.addresses.length > 0
          ? companyData.company.addresses[0].street
          : "",
      country:
        companyData.company.addresses &&
        companyData.company.addresses.length > 0
          ? companyData.company.addresses[0].country
          : "",
      nb_contacts: companyData.company.cntContacts || 0,
      contacts: companyData.company.contacts
        ? companyData.company.contacts.map((contact) => {
            return {
              contactId: contact.id,
              firstName: contact.first_name,
              lastName: contact.last_name,
              email: contact.email,
            };
          })
        : [],
      events: companyData.company.events
        ? companyData.company.events.map((event) => {
            return {
              event_name: event.name,
              event_date_start: event.date_start,
              event_date_end: event.date_end,
              event_type: event.type_event,
            };
          })
        : [],
      invoices: companyData.company.invoices
        ? companyData.company.invoices.map((invoice) => {
            return {
              status: invoice.status,
              invoice_date: invoice.invoice_date,
              number: invoice.number,
              amount: invoice.amount,
              paid: invoice.paid,
            };
          })
        : [],
      timeline: companyData.company.timeline
        ? companyData.company.timeline.map((timeline) => {
            return {
              name: timeline.name,
              duration: timeline.duration,
              type_event: timeline.type_event,
              event_type: timeline.event_type,
              first_name: timeline.first_name,
              last_name: timeline.last_name,
              date_start: timeline.date_start,
              createdat: timeline.createdat,
              comments_note: timeline.comments_note,
            };
          })
        : [],
    };
    return company;
  }
}

export default CompanyApi;
