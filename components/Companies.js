import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect,useContext } from "react";
import companiesApi from "../api/companiesApi";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SettingsIcon from "./SettingsIcon";
import LanguageContext from '../LanguageContext';

const Companies = () => {
  const [companies, setCompanies] = useState(null);
  const navigation = useNavigation();
  const [filter, setFilter] = useState(null);
  const { t, setLanguage } = useContext(LanguageContext);

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
        <Text style={styles.info}>{t("product")} : {item.produit}</Text>
        <Text style={styles.info}>
          {t('employees_nb')} : {item.effectif}
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

  const handleAdd = (item) => {
    navigation.navigate("AddCompanies");
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
      <SettingsIcon />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{t("companies_list")}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => handleAdd()}>
            <Text style={styles.buttonText}>{t("add")}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity>
          <View style={styles.filterItem}>
            <Text style={styles.filterText}>{t("name")}</Text>
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
            <Text style={styles.filterText}>{t("status")}</Text>
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
            <Text style={styles.filterText}>{t("city")}</Text>
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
    marginTop: 30
  },
  buttonContainer: {
    marginLeft: "auto",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
});
