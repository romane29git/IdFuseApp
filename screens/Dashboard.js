import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import { Card } from "react-native-elements";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import moment from "moment";
import "moment/locale/fr";
import companiesApi from "../api/companiesApi";

export default function Dashboard({ navigation }) {
  const [companyCount, setCompanyCount] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    fetchCompanyData();
    const interval = setInterval(fetchCompanyData, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchCompanyData = async () => {
    try {
      const companies = await companiesApi.fetchCompanies();
      setCompanyCount(companies.length);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Erreur lors de la récupération des entreprises :", error);
    }
  };

  const formatLastUpdated = () => {
    if (lastUpdated) {
      moment.locale("fr");
      return moment(lastUpdated).fromNow();
    }
    return "";
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Card>
          <View style={styles.cardView}>
            <Text style={styles.cardTitle}>Nombre d'entreprises</Text>
            <Text style={styles.cardSubtitle}>{formatLastUpdated()}</Text>
          </View>
          <Card.Divider />
          <Text>{companyCount}</Text>
        </Card>

        <Card>
          <View style={styles.cardView}>
            <Text style={styles.cardTitle}>Nombre de factures</Text>
            <Text style={styles.cardSubtitle}>{formatLastUpdated()}</Text>
          </View>
          <Card.Divider />
          <Text>nb factures</Text>
        </Card>

        <Card>
          <View style={styles.cardView}>
            <Text style={styles.cardTitle}>Nombre de factures</Text>
            <Text style={styles.cardSubtitle}>{formatLastUpdated()}</Text>
          </View>
          <Card.Divider />
          <Text>nb factures</Text>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginBottom: 30,
  },
  cardView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "gray",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
});
