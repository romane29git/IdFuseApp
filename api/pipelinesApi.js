const rootEndpoint =
  "https://app.idfuse.fr/api/crm/opportunity/pipeline?api_token=ac781e5381ea80907e7f3b0aa5156cbc8eebf82957bf69c939829d9ee619ca78";

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

//   async addPipeline(newPipeline) {
//     try {
//       const response = await fetch("https://app.idfuse.fr/api/crm/company?api_token=ac781e5381ea80907e7f3b0aa5156cbc8eebf82957bf69c939829d9ee619ca78", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newPipeline),
//       });
  
//       if (response.ok) {
//         console.log("Pipeline ajoutée avec succès");
//       } else {
//         throw new Error("Erreur lors de l'ajout de l'entreprise. Statut de la réponse : " + response.status);
//       }
//     } catch (error) {
//       console.error("Erreur lors de l'ajout de l'entreprise :", error);
//       throw error;
//     }
//   }
  

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
