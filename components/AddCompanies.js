import { Text, View, TextInput, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { companiesApiInstance, fetchCompanies } from "../api/addCompaniesApi";
import addCompany from "../api/addCompaniesApi";
import styles from "../theme/styles";
import Button from "./Button";
import Checkbox from "expo-checkbox";

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
    company_status: "",
    registration_number: "",
  });
  const [isChecked, setChecked] = useState(false);

  const fetchData = async () => {
    try {
      const fetchedCompanies = await companiesApiInstance.fetchCompanies(); // Utiliser la méthode fetchCompanies de l'instance
      setCompanies(fetchedCompanies);
    } catch (error) {
      console.error("Erreur lors de la récupération des entreprises :", error);
    }
  };

  const handleCheckboxChange = () => {
    if (isChecked == true) {
      setChecked(false);
    } else {
      setChecked(true);
    }
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
        company_status: isChecked ? "customer" : "cold prospect",
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
        company_status: "",
        registration_number: "",
      });

      setChecked(false);

      // Rafraîchir la liste des entreprises
      fetchData();
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'entreprise :", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
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

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={handleCheckboxChange}
          color={isChecked ? "#E9F" : undefined}
        />
        <Text>Client</Text>
      </View>

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

      <Button mode="outlined" onPress={handleAddCompany}>
        Ajouter
      </Button>

      <View>
        {companies.map((company) => (
          <Text key={company.id}>{company.name}</Text>
        ))}
      </View>
    </ScrollView>
  );
};

export default AddCompanies;
