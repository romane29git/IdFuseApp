import { Text, View, TextInput, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import addContact from "../api/addContactApi";
import styles from "../theme/styles";
import Button from "./Button";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Picker } from "@react-native-picker/picker";

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
    email: "",
  });
  const [enable, setEnable] = useState("courses");

  const handleReinit = () => {
    setNewContact({
      first_name: "",
      last_name: "",
      email: "",
    });
  };

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
        email,
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
            email: email,
          },
        ],
      };

      console.log("Données du contact :", contactData);

      await addContact(contactData);

      setNewContact({
        first_name: "",
        last_name: "",
        email: "",
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout du contact :", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Ajouter un contact</Text>
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
        value={newContact.email}
        onChangeText={(text) =>
          setNewContact((prevContact) => ({
            ...prevContact,
            email: text,
          }))
        }
        placeholder="Email"
        style={styles.input}
      />

      <Picker
        selectedValue={enable}
        style={{ height: 50, width: 250 }}
        mode={"dialog"}
        onValueChange={(itemValue) => setEnable(itemValue)}
      >
        <Picker.Item label="Courses" value="courses" />
        <Picker.Item label="Data-Structures" value="DSA" />
        <Picker.Item label="ReactJs" value="react" />
        <Picker.Item label="C++" value="cpp" />
        <Picker.Item label="Python" value="py" />
        <Picker.Item label="Java" value="java" />
      </Picker>

      <Button mode="outlined" onPress={handleReinit}>
        <Icon name="sync-alt" size={18} color="#5fabfe" />
      </Button>
      <Button mode="outlined" onPress={handleAddContact}>
        Ajouter
      </Button>
    </ScrollView>
  );
};

export default AddContacts;
