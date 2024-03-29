const rootEndpoint =
  `https://app.idfuse.fr/api/crm/contact/edit/{id}?api_token=${global.accessToken}`;

export class Contact {
  constructor(id, first_name, last_name, mail) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;

    this.emails = [
      {
        mail: mail,
      },
    ];
  }
}

export async function editContactApi({ id, first_name, last_name, mail }) {
  const endpoint = rootEndpoint.replace("{id}", id);

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      first_name,
      last_name,
      emails: [
        {
          mail,
        },
      ],
    }),
  });
  if (!response.ok) {
    throw new Error("La modification de l'entreprise a échoué.");
  }
}
