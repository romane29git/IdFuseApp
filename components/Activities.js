import { Text, View, FlatList, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import activitiesApi from "../api/activitiesApi";
import Icon from "react-native-vector-icons/FontAwesome5";
import Checkbox from "expo-checkbox";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import SettingsIcon from "./SettingsIcon";

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchData() {
      const fetchedActivities = await activitiesApi.fetchActivities();
      const updatedActivities = fetchedActivities.map((activity) => ({
        ...activity,
        isChecked: false,
      }));
      setActivities(updatedActivities);
    }

    fetchData();
  }, []);

  const BubbleIcon = ({ iconName }) => {
    return (
      <View style={styles.bubble}>
        <Icon name={iconName} size={18} color="#5fabfe" />
      </View>
    );
  };
  const renderItem = ({ item }) => {
    const handleCheckboxChange = (isChecked) => {
      const index = activities.findIndex((activity) => activity.id === item.id);
      if (index !== -1) {
        const updatedActivities = [...activities];
        updatedActivities[index].isChecked = isChecked;
        setActivities(updatedActivities);
      }
    };
    return (
      <View style={styles.itemContainer}>
        <View style={styles.checkboxContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Checkbox
            style={styles.checkbox}
            value={item.isChecked}
            onValueChange={handleCheckboxChange}
          />
        </View>

        <View style={styles.titleContainer}>
          <BubbleIcon
            iconName={
              item.type_event === "call"
                ? "phone"
                : item.type_event === "meeting"
                ? "users"
                : item.type_event === "mail"
                ? "envelope"
                : "tasks"
            }
          />
          <Text style={styles.city}> {item.type_event}</Text>
        </View>
        <Text style={styles.info}>Durée : {item.duration} minutes</Text>
        <Text style={styles.info}>Date : {item.date_start}</Text>
        <Text style={styles.info}>
          {item.companyName ? `Organisation : ${item.companyName}` : null}
        </Text>
        <Text style={styles.info}>
          {item.contactName ? `Contact : ${item.contactName}` : null}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SettingsIcon />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Liste des activités</Text>
      </View>
      <FlatList
        data={activities}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      ></FlatList>
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
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
