import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { companiesApiInstance, fetchCompanies } from "../api/addCompaniesApi";
import addCompany from "../api/addCompaniesApi";
import Button from "./Button";
import Checkbox from "expo-checkbox";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

const AddCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [newCompany, setNewCompany] = useState({
    name: "",
    street_number: "",
    street: "",
    city: "",
    postal_code: "",
    country: "",
    customer_address: "",
    registration_number: "",
  });
  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      const fetchedCompanies = await companiesApiInstance.fetchCompanies(); // Utiliser la méthode fetchCompanies de l'instance
      setCompanies(fetchedCompanies);
    } catch (error) {
      console.error("Erreur lors de la récupération des entreprises :", error);
    }
  };

  const handleReinit = () => {
    setNewCompany({
      name: "",
      street_number: "",
      street: "",
      city: "",
      postal_code: "",
      country: "",
      customer_address: "",
      registration_number: "",
    });

    setChecked(false);
  };

  const handleAddCompany = async () => {
    try {
      const {
        name,
        street_number,
        street,
        city,
        postal_code,
        country,
        registration_number,
      } = newCompany;

      const companyData = {
        name: name,
        addresses: [
          {
            street_number: street_number,
            street: street,
            city: city,
            postal_code: postal_code,
            country: country,
            customer_address: street_number + " " + street + ", " + city,
          },
        ],
        registration_number: registration_number,
      };

      console.log("Données de l'entreprise :", companyData);

      // Appeler la méthode pour ajouter une entreprise
      await addCompany(companyData);

      setNewCompany({
        name: "",
        street_number: "",
        street: "",
        city: "",
        postal_code: "",
        country: "",
        customer_address: "",
        registration_number: "",
      });

      setChecked(false);

      // Rafraîchir la liste des entreprises
      fetchData();
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'entreprise :", error);
    }
  };

  //search contact

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={require("../assets/arrow_back.png")}
          style={styles.backArrow}
        />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Nom de l'entreprise"
        value={newCompany.name}
        onChangeText={(text) =>
          setNewCompany({
            ...newCompany,
            name: text,
          })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Numéro de rue"
        value={newCompany.street_number}
        onChangeText={(text) =>
          setNewCompany({
            ...newCompany,
            street_number: text,
          })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Rue"
        value={newCompany.street}
        onChangeText={(text) =>
          setNewCompany({
            ...newCompany,
            street: text,
          })
        }
      />

      <TextInput
        style={styles.input}
        placeholder="Ville"
        value={newCompany.city}
        onChangeText={(text) =>
          setNewCompany({
            ...newCompany,
            city: text,
          })
        }
      />

      <TextInput
        style={styles.input}
        placeholder="Code postal"
        value={newCompany.postal_code}
        onChangeText={(text) =>
          setNewCompany({
            ...newCompany,
            postal_code: text,
          })
        }
      />

      <TextInput
        style={styles.input}
        placeholder="Pays"
        value={newCompany.country}
        onChangeText={(text) =>
          setNewCompany({
            ...newCompany,
            country: text,
          })
        }
      />

      <TextInput
        style={styles.input}
        placeholder="N° SIREN"
        value={newCompany.registration_number}
        onChangeText={(text) =>
          setNewCompany({
            ...newCompany,
            registration_number: text,
          })
        }
      />

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

      <Button mode="outlined" onPress={handleAddCompany}>
        Ajouter
      </Button>
    </View>
  );
};

export default AddCompanies;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  backArrow: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    fontSize: 16,
    borderRadius: 4,
    color: "#333",
  },
});
