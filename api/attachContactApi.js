export default async function attachContactApi(idContact, idCompany) {
  const rootEndpoint = `https://app.idfuse.fr/api/crm/contact/${idContact}/attach/company/${idCompany}?api_token=${global.accessToken}`;

  const endpoint = rootEndpoint.replace("{idContact}", idContact);
  const endPoint = endpoint.replace("{idCompany}", idCompany);

  const response = await fetch(endPoint, {
    method: "PUT",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
  });

  if (response.ok) {
    console.log("Contact ajouté avec succès");
  } else {
    throw new Error(
      "Erreur lors de l'ajout du contact. Statut de la réponse : " +
        response.status
    );
  }
}
