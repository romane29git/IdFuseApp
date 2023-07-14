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
    street: "",
    city: "",
    postal_code: "",
    country: "",
    customer_address: "",
    company_status: "",
    registration_number: "",
    solution_crm: "",
    effectif: "",
    secteur: "",
    produit: "",
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
        street,
        city,
        postal_code,
        country,
        registration_number,
        solution_crm,
        effectif,
        secteur,
        produit,
      } = newCompany;

      const companyData = {
        name: name,
        addresses: [
          {
            street: street,
            city: city,
            postal_code: postal_code,
            country: country,
            customer_address: street + ", " + city,
          },
        ],
        company_status: isChecked ? "customer" : "cold prospect",
        registration_number: registration_number,
        solution_crm: solution_crm,
        effectif: effectif,
        secteur: secteur,
        produit: produit,
      };

      console.log("Données de l'entreprise :", companyData);

      // Appeler la méthode pour ajouter une entreprise
      await addCompany(companyData);

      // // Réinitialiser les valeurs des champs de saisie
      // setNewCompany({
      //   name: "",
      //   street: "",
      //   city: "",
      //   postal_code: "",
      //   country: "",
      // });

      // Rafrtaîchir la liste des entreprises
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

      <TextInput
        style={styles.input}
        placeholder="Effectif de l'entreprise"
        value={newCompany.effectif}
        onChangeText={(text) =>
          setNewCompany({
            ...newCompany,
            effectif: text,
          })
        }
      />

      <TextInput
        style={styles.input}
        placeholder="Produits"
        value={newCompany.produit}
        onChangeText={(text) =>
          setNewCompany({
            ...newCompany,
            produit: text,
          })
        }
      />

      <TextInput
        style={styles.input}
        placeholder="Secteur d'acticité"
        value={newCompany.secteur}
        onChangeText={(text) =>
          setNewCompany({
            ...newCompany,
            secteur: text,
          })
        }
      />

      <TextInput
        style={styles.input}
        placeholder="Solution CRM actuelle"
        value={newCompany.solution_crm}
        onChangeText={(text) =>
          setNewCompany({
            ...newCompany,
            solution_crm: text,
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
