class OpportunityApi {
  async fetchOpportunityById(id) {
    try {
      const response = await fetch(
        `https://app.idfuse.fr/api/crm/opportunity/${id}?api_token=${global.accessToken}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error fetching company data: ${error}`);
    }
  }

  async getOpportunityById(id) {
    const opportunityData = await this.fetchOpportunityById(id);
    return this.createOpportunity(opportunityData);
  }

  createOpportunity(opportunityData) {
    const opportunity = {
      id: opportunityData.pipeline.id,
      name: opportunityData.pipeline.name,
      status: opportunityData.pipeline.status,
      amount: opportunityData.pipeline.amount,
      created_at: opportunityData.pipeline.created_at,
      closed_at: opportunityData.pipeline.closed_at,
      companyName: opportunityData.pipeline.companyName,
      company_id : opportunityData.pipeline.company_id,
      first_name: opportunityData.pipeline.first_name,
      last_name: opportunityData.pipeline.last_name,
    };
    return opportunity;
  }
}

export default OpportunityApi;
