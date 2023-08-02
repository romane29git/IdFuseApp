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
import { useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import attachContactApi from "../api/attachContactApi";

const Tab = createMaterialTopTabNavigator();

const AttachContact = ({ route }) => {
  const idCompany = route.params.id;
  const navigation = useNavigation();
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

  const handleClick = async (item) => {
    if (item.type === "contact") {
      console.log("id : ", item.id, " name : ", item.name);
      console.log("id company :", idCompany);
    }
    try {
      await attachContactApi(item.id,idCompany);
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la modification de l'entreprise :",
        error
      );
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
      <Text>Ajouter un contact à l'entreprise</Text>

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
    </View>
  );
};

export default AttachContact;

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
