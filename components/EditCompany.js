import React, { useEffect, useState, useContext } from "react";
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
import LanguageContext from "../LanguageContext";

const companyApi = new CompanyApi();

const EditCompany = ({ route }) => {
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [street_number, setStreetNumber] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [company, setCompany] = useState({});
  const navigation = useNavigation();
  const idCompany = route.params.id;
  const { t, setLanguage } = useContext(LanguageContext);

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
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>
          {t("update")}
          {company.name}
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{t("name")}:</Text>
        <TextInput value={name} onChangeText={setName} style={styles.input} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{t("street_no")} :</Text>
        <TextInput
          value={street_number}
          onChangeText={setStreetNumber}
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{t("street")}:</Text>
        <TextInput
          value={street}
          onChangeText={setStreet}
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{t("city")}:</Text>
        <TextInput value={city} onChangeText={setCity} style={styles.input} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{t("country")}:</Text>
        <TextInput
          value={country}
          onChangeText={setCountry}
          style={styles.input}
        />
      </View>
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>{t("update")}</Text>
      </TouchableOpacity>
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
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    fontSize: 16,
    borderRadius: 4,
    color: "#333",
  },
  button: {
    backgroundColor: "#5fabfe",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    width: "30%",
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  headingContainer: {
    marginBottom: 24,
  },
  headingText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});
