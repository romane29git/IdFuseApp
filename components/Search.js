import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";

const CompanyIcon = ({ color }) => (
  <Icon name="building" size={20} color={color} />
);

const OpportunityIcon = ({ color }) => (
  <Icon name="handshake" size={20} color={color} />
);

const ContactIcon = ({ color }) => (
  <Icon name="users" color={color} size={20} />
);

const ListIcon = ({ color }) => <Icon name="list" color={color} size={20} />;

const EmailListIcon = ({ color }) => (
  <Icon name="envelope" color={color} size={20} />
);

const CampaignIcon = ({ color }) => (
  <Icon name="mail-bulk" color={color} size={20} />
);

const Tab = createMaterialTopTabNavigator();

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigation = useNavigation();

  const handleSearch = async (value) => {
    setSearchTerm(value);

    if (value.length > 2) {
      try {
        const response = await fetch(
          `https://app.idfuse.fr/api/search?q=${value}&api_token=ac781e5381ea80907e7f3b0aa5156cbc8eebf82957bf69c939829d9ee619ca78`
        );
        const data = await response.json();

        const filteredResults = data.result.filter((item) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        );
        setSearchResults(filteredResults);
      } catch (error) {
        console.error("Erreur lors de la recherche :", error);
      }
    }
  };

  const handleClick = (item) => {
    if (item.type === "company") {
      navigation.navigate("Company", { id: item.id, name: item.name });
    } else if (item.type === "contact") {
      navigation.navigate("Contact", { id: item.id, name: item.name });
    } else if (item.type === "campaign") {
      navigation.navigate("Campaign", { id: item.id, name: item.name });
    } else if (item.type === "list") {
      navigation.navigate("List", { id: item.id, name: item.name });
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
      <TextInput
        style={styles.input}
        type="text"
        value={searchTerm}
        onChangeText={(value) => handleSearch(value)}
      />
      {searchResults.length > 0 && searchTerm.length >= 3 ? (
        <Tab.Navigator>
          <Tab.Screen name="ALL">
            {() => (
              <FlatList
                data={searchResults}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                style={{ flex: 1 }}
              />
            )}
          </Tab.Screen>
          <Tab.Screen
            name="Entreprises"
            options={{
              tabBarIcon: CompanyIcon,
              tabBarLabel: () => null,
            }}
          >
            {() => (
              <FlatList
                data={searchResults.filter((item) => item.type === "company")}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                style={{ flex: 1 }}
              />
            )}
          </Tab.Screen>

          <Tab.Screen
            name="Opportunités"
            options={{
              tabBarIcon: OpportunityIcon,
              tabBarLabel: () => null,
            }}
          >
            {() => (
              <FlatList
                data={searchResults.filter((item) => item.type === "opportunity")}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                style={{ flex: 1 }}
              />
            )}
          </Tab.Screen>

          <Tab.Screen
            name="Listes"
            options={{
              tabBarIcon: ListIcon,
              tabBarLabel: () => null,
            }}
          >
            {() => (
              <FlatList
                data={searchResults.filter((item) => item.type === "list")}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
              />
            )}
          </Tab.Screen>

          <Tab.Screen
            name="Liste d'email"
            options={{
              tabBarIcon: EmailListIcon,
              tabBarLabel: () => null,
            }}
          >
            {() => (
              <FlatList
                data={searchResults.filter(
                  (item) => item.type === "email_list"
                )}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
              />
            )}
          </Tab.Screen>

          <Tab.Screen
            name="Contact"
            options={{
              tabBarIcon: ContactIcon,
              tabBarLabel: () => null,
            }}
          >
            {() => (
              <FlatList
                data={searchResults.filter((item) => item.type === "contact")}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
              />
            )}
          </Tab.Screen>

          <Tab.Screen
            name="Campagnes"
            options={{
              tabBarIcon: CampaignIcon,
              tabBarLabel: () => null,
            }}
          >
            {() => (
              <FlatList
                data={searchResults.filter((item) => item.type === "campaign")}
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

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginBottom: 300,
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  item: {
    fontSize: 16,
    marginBottom: 8,
  },
});
