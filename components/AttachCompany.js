import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import attachContactApi from "../api/attachContactApi";
import { Picker } from "@react-native-picker/picker";
import companiesApi from "../api/companiesApi";
import Button from "./Button";
import LanguageContext from "../LanguageContext";

const AttachCompany = ({ route }) => {
  const idContact = route.params.id;
  const navigation = useNavigation();
  const { t, setLanguage } = useContext(LanguageContext);

  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companiesData = await companiesApi.fetchCompanies();
        setCompanies(companiesData);
      } catch (error) {
        console.error("Erreur lors du chargement des entreprises :", error);
      }
    };

    fetchData();
  }, []);

  const handleClick = async () => {
    try {
      await attachContactApi(idContact, selectedCompanyId);
      navigation.goBack();
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la modification de l'entreprise :",
        error
      );
    }
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
      <Text>{t("add_company_to_contact")}</Text>

      <Picker
        selectedValue={selectedCompanyId}
        style={{ height: 50, width: 250 }}
        mode={"dialog"}
        onValueChange={(itemValue) => setSelectedCompanyId(itemValue)}
      >
        {companies &&
          companies.map((company) => (
            <Picker.Item
              key={company.id}
              label={company.name}
              value={company.id}
            />
          ))}
      </Picker>
      <Button mode="outlined" onPress={handleClick}>
        {t("add")}
      </Button>
    </View>
  );
};

export default AttachCompany;

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
