import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import LanguageContext from "../LanguageContext";

const List = () => {
  const [list, setList] = useState(null);
  const route = useRoute();
  const id = route.params.id;
  const name = route.params.name;
  const navigation = useNavigation();
  const { t, setLanguage } = useContext(LanguageContext);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await axios.get(
          `https://app.idfuse.fr/api/list/view/${id}?api_token=${global.accessToken}`
        );
        const fetchedList = response.data;
        setList(fetchedList);
      } catch (error) {
        console.error("Error fetching list:", error);
      }
    };
    fetchList();
  }, [id]);

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
      <Text style={styles.sectionTitle}>{name}</Text>
      {list &&
        list.fields &&
        Object.values(list.fields).map((field, index) => {
          return (
            <View key={index}>
              <Text style={styles.contactText}>
                {t("title")} : {field.title}
              </Text>
              <Text style={styles.contactText}>Type : {field.type}</Text>
              <Text style={styles.fieldText}>Tag : {field.tag}</Text>
            </View>
          );
        })}
    </ScrollView>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
    textAlign: "center",
  },
  backArrow: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
});
