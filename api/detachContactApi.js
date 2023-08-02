export default async function detachContactApi(idContact, idCompany) {
    const rootEndpoint = `https://app.idfuse.fr/api/crm/contact/${idContact}/detach/company/${idCompany}?api_token=ac781e5381ea80907e7f3b0aa5156cbc8eebf82957bf69c939829d9ee619ca78`;
  
    const endpoint = rootEndpoint.replace("{idContact}", idContact);
    const endPoint = endpoint.replace("{idCompany}", idCompany);
  
    console.log(endPoint);
  
    const response = await fetch(endPoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    });
  
    if (response.ok) {
      console.log("Contact supprimé avec succès");
    } else {
      throw new Error(
        "Erreur lors de la suppression du contact. Statut de la réponse : " +
          response.status
      );
    }
  }
  