import {
  Text,
  View,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import addContact from "../api/addContactApi";
import styles from "../theme/styles";
import Button from "./Button";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Picker } from "@react-native-picker/picker";
import companiesApi from "../api/companiesApi";
import { useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

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

      console.log("Données du contact :", contactData);

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

  //search contact

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigation = useNavigation();

  const handleSearch = async (value) => {
    setSearchTerm(value);

    if (value.length > 2) {
      try {
        const response = await fetch(
          `https://app.idfuse.fr/api/search?q=${value}&api_token=ac781e5381ea80907e7f3b0aa5156cbc8eebf82957bf69c939829d9ee619ca78`
        );
        const data = await response.json();

        const filteredResults = data.result.filter((item) =>
          item.name?.toLowerCase().includes(value.toLowerCase())
        );
        setSearchResults(filteredResults);
      } catch (error) {
        console.error("Erreur lors de la recherche :", error);
      }
    }
  };

  const handleClick = (item) => {
    if (item.type === "contact") {
      console.log("id : ", item.id, " name : ", item.name);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleClick(item)}>
        <Text style={styles.item}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
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
        selectedValue={newContact.company_id}
        style={{ height: 50, width: 250 }}
        mode={"dialog"}
        onValueChange={(itemValue) =>
          setNewContact((prevContact) => ({
            ...prevContact,
            company_id: itemValue,
          }))
        }
      >
        {
          companies &&
            companies.map((company) => (
              <Picker.Item
                key={company.id}
                label={company.name}
                value={company.id}
              />
            ))
          // .slice(0, 20) // Utilisez la méthode slice pour n'afficher que les 20 premières entreprises
        }
      </Picker>

      <TextInput
        style={styles.input}
        type="text"
        value={searchTerm}
        onChangeText={(value) => handleSearch(value)}
      />
      {searchResults.length > 0 && searchTerm.length >= 1 ? (
        <Tab.Navigator>
          <Tab.Screen name="Choisir un contact">
            {() => (
              <FlatList
                data={searchResults.filter((item) => item.type === "contact")}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
              />
            )}
          </Tab.Screen>
        </Tab.Navigator>
      ) : (
        <Text>Aucun résultat trouvé.</Text>
      )}

      <Button mode="outlined" onPress={handleReinit}>
        <Icon name="sync-alt" size={18} color="#5fabfe" />
      </Button>
      <Button mode="outlined" onPress={handleAddContact}>
        Ajouter
      </Button>
    </View>
  );
};

export default AddContacts;
