import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Company, editCompanyApi } from "../api/editCompanyApi";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import CompanyApi from "../api/companyApi";
import { ScrollView } from "react-native";

const companyApi = new CompanyApi();

const EditCompany = ({ route }) => {
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [street_number, setStreetNumber] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [status, setStatus] = useState("");
  const [company, setCompany] = useState({});
  const navigation = useNavigation();
  const idCompany = route.params.id;

  useEffect(() => {
    async function fetchCompanyDetails() {
      try {
        const fetchedCompany = await companyApi.getCompanyById(idCompany);
        setCompany(fetchedCompany);

        setName(fetchedCompany.name);
        setStreet(fetchedCompany.street);
        setStreetNumber(fetchedCompany.street_number);
        setCity(fetchedCompany.city);
        setCountry(fetchedCompany.country);
        setStatus(fetchedCompany.status);
      } catch (error) {
        console.log("Error fetching company data:", error);
      }
    }

    fetchCompanyDetails();
  }, [idCompany]);

  const handleSubmit = async () => {
    try {
      await editCompanyApi({
        id: idCompany,
        name,
        street_number,
        street,
        city,
        country,
        idAddress: company.idAddress,
        status,
      });
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la modification de l'entreprise :",
        error
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={require("../assets/arrow_back.png")}
          style={styles.backArrow}
        />
      </TouchableOpacity>
      <Text>Modifier l'entreprise</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nom :</Text>
        <TextInput value={name} onChangeText={setName} style={styles.input} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Statut :</Text>
        <TextInput
          value={status}
          onChangeText={setStatus}
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Numéro de rue :</Text>
        <TextInput
          value={street_number}
          onChangeText={setStreetNumber}
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Rue :</Text>
        <TextInput
          value={street}
          onChangeText={setStreet}
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Ville :</Text>
        <TextInput value={city} onChangeText={setCity} style={styles.input} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pays :</Text>
        <TextInput
          value={country}
          onChangeText={setCountry}
          style={styles.input}
        />
      </View>

      <Button title="Modifier" onPress={handleSubmit} />
    </ScrollView>
  );
};

export default EditCompany;

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
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 8,
    fontSize: 16,
  },
});
