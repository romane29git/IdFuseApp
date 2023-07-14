import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import companiesApi from "../api/companiesApi";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Companies = () => {
  const [companies, setCompanies] = useState(null);
  const navigation = useNavigation();
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const fetchedCompanies = await companiesApi.fetchCompanies();
      let sortedCompanies = [...fetchedCompanies];

      if (filter === "alphaasc") {
        sortedCompanies.sort((a, b) => a.name.localeCompare(b.name));
      } else if (filter === "alphadesc") {
        sortedCompanies.sort((a, b) => b.name.localeCompare(a.name));
      } else if (filter === "statutasc") {
        sortedCompanies.sort((a, b) => {
          const statutOrderA = a.statut === "customer" ? 1 : 0;
          const statutOrderB = b.statut === "customer" ? 1 : 0;
          return statutOrderB - statutOrderA;
        });
      } else if (filter === "statutdesc") {
        sortedCompanies.sort((a, b) => {
          const statutOrderA = a.statut === "customer" ? 1 : 0;
          const statutOrderB = b.statut === "customer" ? 1 : 0;
          return statutOrderA - statutOrderB;
        });
      } else if (filter === "cityasc") {
        sortedCompanies.sort((a, b) => {
          if (a.city && b.city) {
            return a.city.localeCompare(b.city);
          } else if (a.city) {
            return -1;
          } else if (b.city) {
            return 1;
          }
          return 0;
        });
      } else if (filter === "citydesc") {
        sortedCompanies.sort((a, b) => {
          if (a.city && b.city) {
            return b.city.localeCompare(a.city);
          } else if (a.city) {
            return -1;
          } else if (b.city) {
            return 1;
          }
          return 0;
        });
      }

      setCompanies(sortedCompanies);
    }

    fetchData();
  }, [filter]);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item)}>
      <View style={styles.itemContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.city}>
          {item.postal_code} - {item.city}
        </Text>
        <Text style={styles.info}>Produits : {item.produit}</Text>
        <Text style={styles.info}>
          Effectif de l'entreprise : {item.effectif}
        </Text>
        <Text style={styles.info}>
          {item.statut === "customer" ? (
            <View style={styles.customer}>
              <Text style={styles.statut}>{item.statut}</Text>
            </View>
          ) : (
            <View style={styles.prospect}>
              <Text style={styles.statut}>{item.statut}</Text>
            </View>
          )}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const handlePress = (item) => {
    navigation.navigate("Company", { id: item.id, name: item.name });
  };

  const handleAlphaAscFilter = () => {
    setFilter("alphaasc");
  };

  const handleAlphaDescFilter = () => {
    setFilter("alphadesc");
  };

  const handleStatutAscFilter = () => {
    setFilter("statutasc");
  };

  const handleStatutDescFilter = () => {
    setFilter("statutdesc");
  };

  const handleCityAscFilter = () => {
    setFilter("cityasc");
  };

  const handleCityDescFilter = () => {
    setFilter("citydesc");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des entreprises</Text>
      <View style={styles.filterContainer}>
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
      </View>

      <View>
        <FlatList
          data={companies}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        ></FlatList>
      </View>
    </View>
  );
};

export default Companies;

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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
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
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  filterItem: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  filterText: {
    fontSize : 16,
    marginRight: 5,
    fontWeight: 'bold',
  },
  arrowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowIcon: {
    fontSize : 25,
    marginLeft: 5,
  },
});


