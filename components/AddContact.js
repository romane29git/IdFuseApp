import { Text, View, TextInput, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import addContact from "../api/addContactApi";
import styles from "../theme/styles";
import Button from "./Button";

const AddContacts = () => {
  const [newContact, setNewContact] = useState({
    id: "",
    first_name: "",
    last_name: "",
    company_name: "",
    company_id: "",
    opportunity_name: "",
    contact_first_name: "",
    contact_last_name: "",
    emails: [
      {
        mail: "",
      },
    ],
  });

  const handleAddContact = async () => {
    try {
      const {
        id,
        first_name,
        last_name,
        company_name,
        company_id,
        opportunity_name,
        contact_first_name,
        contact_last_name,
        mail,
      } = newContact;

      const contactData = {
        id: id,
        first_name: first_name,
        last_name: last_name,

        companies: [
          {
            company_id: company_id,
            company_name: company_name,
          },
        ],
        opportunities: [
          {
            opportunity_name: opportunity_name,
          },
        ],
        contacts: [
          {
            contact_first_name: contact_first_name,
            contact_last_name: contact_last_name,
          },
        ],
        emails: [
          {
            mail: newContact.emails[0].mail,
          },
        ],
      };

      console.log("Données du contact :", contactData);

      await addContact(contactData);
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'entreprise :", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        value={newContact.first_name}
        onChangeText={(text) =>
          setNewContact((prevContact) => ({
            ...prevContact,
            first_name: text,
          }))
        }
        placeholder="Prénom"
        style={styles.input}
      />
      <TextInput
        value={newContact.last_name}
        onChangeText={(text) =>
          setNewContact((prevContact) => ({
            ...prevContact,
            last_name: text,
          }))
        }
        placeholder="Nom"
        style={styles.input}
      />

      <TextInput
        value={newContact.mail}
        onChangeText={(text) =>
          setNewContact((prevContact) => ({
            ...prevContact,
            mail: text,
          }))
        }
        placeholder="Email"
        style={styles.input}
      />
      <Button mode="outlined" onPress={handleAddContact}>
        Ajouter
      </Button>
    </ScrollView>
  );
};

export default AddContacts;
