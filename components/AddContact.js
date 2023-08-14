import { Text, View, TextInput } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import addContact from "../api/addContactApi";
import styles from "../theme/styles";
import Button from "./Button";
import Icon from "react-native-vector-icons/FontAwesome5";
import companiesApi from "../api/companiesApi";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import LanguageContext from "../LanguageContext";

const Tab = createMaterialTopTabNavigator();

const AddContacts = () => {
  const [newContact, setNewContact] = useState({
    id: "",
    first_name: "",
    last_name: "",
    company_id: "",
    opportunity_name: "",
    contact_first_name: "",
    contact_last_name: "",
    email: "",
  });
  const [companies, setCompanies] = useState([{ id: "", name: "Aucune" }]);
  const { t, setLanguage } = useContext(LanguageContext);

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
        company_id: company_id,

        companies: [
          {
            id: company_id,
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

      await addContact(contactData);

      setNewContact({
        first_name: "",
        last_name: "",
        email: "",
      });

      //remettre liste à vide
    } catch (error) {
      console.error("Erreur lors de l'ajout du contact :", error);
    }
  };

  useEffect(() => {
    // Chargez les données des entreprises ici
    const fetchData = async () => {
      try {
        const companiesData = await companiesApi.fetchCompanies();
        const companiesWithNone = [
          { id: "", name: "Aucune" },
          ...companiesData,
        ];
        setCompanies(companiesWithNone);
      } catch (error) {
        console.error("Erreur lors du chargement des entreprises :", error);
      }
    };

    fetchData(); // Appelez la fonction pour charger les entreprises
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("add_contact")}</Text>
      <TextInput
        value={newContact.first_name}
        onChangeText={(text) =>
          setNewContact((prevContact) => ({
            ...prevContact,
            first_name: text,
          }))
        }
        placeholder={t("firstname")}
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
        placeholder={t("lastname")}
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
        placeholder={t("email")}
        style={styles.input}
      />

      <Button mode="outlined" onPress={handleReinit}>
        <Icon name="sync-alt" size={18} color="#5fabfe" />
      </Button>
      <Button mode="outlined" onPress={handleAddContact}>
        {t("add")}
      </Button>
    </View>
  );
};

export default AddContacts;
