const rootEndpoint =
  `https://app.idfuse.fr/api/crm/opportunity/pipeline?api_token=${global.accessToken}`;

export class Pipelines {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

class pipelinesApi {
  async fetchpipelines() {
    const response = await this.fetchFromApi(rootEndpoint);
    if (response && typeof response === "object") {
      const pipelines = response.pipelines;
      return this.createPipelines(pipelines);
    } else {
      console.error("Invalid API response:", response);
      return [];
    }
  }

  async findPipelineById(id) {
    const pipelines = await this.fetchFromApi(`${rootEndpoint}/${id}`);

    return this.createPipeline(pipelines[0]);
  }

  async fetchFromApi(query) {
    console.log(`Fetching API with query ${query}`);
    try {
      const response = await fetch(query);
      const content = await response.json();
      return content;
    } catch (e) {
      console.error(e);
    }
  }

  createPipeline(pipeline) {
    return new Pipeline(
      pipeline.id,
      pipeline.name,
    );
  }

  createPipelines(pipelines) {
    if (!Array.isArray(pipelines)) {
      console.error("Invalid pipelines data");
      return [];
    }

    return pipelines.map((pipeline) => this.createPipeline(pipeline));
  }
}

export default new pipelinesApi();
