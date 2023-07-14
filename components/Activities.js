import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import activitiesApi from "../api/activitiesApi";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Activities = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const fetchedActivities = await activitiesApi.fetchActivities();

      setActivities(fetchedActivities);
    }

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.city}>{item.type_event}</Text>
      <Text style={styles.info}>Durée : {item.duration} minutes</Text>
      <Text style={styles.info}>Date : {item.date_start}</Text>
      <Text style={styles.info}>Contact : {item.contactName}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Liste des activités</Text>
        <View style={styles.buttonContainer}>
          {/* <TouchableOpacity style={styles.button} onPress={() => handleAdd()}>
              <Text style={styles.buttonText}>Ajouter</Text>
            </TouchableOpacity> */}
        </View>
      </View>

      {/* <View style={styles.filterContainer}>
          <TouchableOpacity>
            <View style={styles.filterItem}>
              <Text style={styles.filterText}>Nom</Text>
              <View style={styles.arrowContainer}>
                <TouchableOpacity onPress={handleAlphaAscFilter}>
                  <MaterialCommunityIcons
                    name="arrow-up"
                    style={styles.arrowIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleAlphaDescFilter}>
                  <MaterialCommunityIcons
                    name="arrow-down"
                    style={styles.arrowIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
  
          <TouchableOpacity>
            <View style={styles.filterItem}>
              <Text style={styles.filterText}>Statut</Text>
              <View style={styles.arrowContainer}>
                <TouchableOpacity onPress={handleStatutAscFilter}>
                  <MaterialCommunityIcons
                    name="arrow-up"
                    style={styles.arrowIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleStatutDescFilter}>
                  <MaterialCommunityIcons
                    name="arrow-down"
                    style={styles.arrowIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
  
          <TouchableOpacity>
            <View style={styles.filterItem}>
              <Text style={styles.filterText}>Ville</Text>
              <View style={styles.arrowContainer}>
                <TouchableOpacity onPress={handleCityAscFilter}>
                  <MaterialCommunityIcons
                    name="arrow-up"
                    style={styles.arrowIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCityDescFilter}>
                  <MaterialCommunityIcons
                    name="arrow-down"
                    style={styles.arrowIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </View> */}

      <View>
        <FlatList
          data={activities}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        ></FlatList>
      </View>
    </View>
  );
};

export default Activities;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    marginBottom: 30,
  },
  itemContainer: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  city: {
    fontSize: 16,
    marginBottom: 4,
  },
  info: {
    fontSize: 14,
    marginBottom: 4,
    fontStyle: "italic",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  customer: {
    backgroundColor: "#1ccf60",
    borderRadius: 15,
  },
  prospect: {
    backgroundColor: "#68bae8",
    borderRadius: 15,
  },
  statut: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
    margin: 6,
  },

  backArrow: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  filterItem: {
    flexDirection: "column",
    alignItems: "center",
  },
  filterText: {
    fontSize: 16,
    marginRight: 5,
    fontWeight: "bold",
  },
  arrowContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  arrowIcon: {
    fontSize: 25,
    marginLeft: 5,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonContainer: {
    marginLeft: "auto",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
});
