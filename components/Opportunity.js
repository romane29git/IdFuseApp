import {
  Text,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import OpportunityApi from "../api/opportunityApi";
import axios from "axios";

const Opportunity = () => {
  const [opportunity, setOpportunity] = useState(null);
  const route = useRoute();
  const id = route.params.id;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchOpportunity = async () => {
      try {
        const response = await axios.get(
          `https://app.idfuse.fr/api/crm/opportunity/${id}?api_token=ac781e5381ea80907e7f3b0aa5156cbc8eebf82957bf69c939829d9ee619ca78`
        );
        const fetchedOpportunity = response.data;
        console.log("fetchedOpportunity:", fetchedOpportunity);
        setOpportunity(fetchedOpportunity);
      } catch (error) {
        console.error("Error fetching Opportunity:", error);
      }
    };
    fetchOpportunity();
  }, [id]);

  const handlePressCompany = (company_id) => {
    navigation.navigate("Company", { id: company_id });
  };

  const handlePressContact = (contact_id) => {
    navigation.navigate("Contact", { id: contact_id });
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
      {opportunity ? (
        <>
          <Text style={styles.sectionTitle}>{opportunity.pipeline.name}</Text>
          <Text style={styles.subtitle}>{opportunity.pipeline.status}</Text>
          <Text style={styles.text}>
            Date : {opportunity.pipeline.created_at}
          </Text>
          <Text style={styles.text}>
            Montant : {opportunity.pipeline.amount} €
          </Text>
          <Text style={styles.text}>
            Date de clôture : {opportunity.pipeline.closed_at}
          </Text>

          <Text style={styles.title}>Entreprise</Text>
          <TouchableOpacity
            onPress={() => handlePressCompany(opportunity.pipeline.company_id)}
          >
            <View style={styles.contactContainer}>
              <Text style={styles.contactText}>
                {opportunity.pipeline.companyName}
              </Text>
            </View>
          </TouchableOpacity>

          <Text style={styles.title}>Contact</Text>
          <TouchableOpacity
            onPress={() => handlePressContact(opportunity.pipeline.contact_id)}
          >
            <View style={styles.contactContainer}>
              <Text style={styles.contactText}>
                {opportunity.pipeline.first_name}{" "}
                {opportunity.pipeline.last_name}
              </Text>
            </View>
          </TouchableOpacity>
        </>
      ) : (
        <Text>Loading opportunity data...</Text>
      )}
    </ScrollView>
  );
};

export default Opportunity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
    fontStyle: "italic",
    textAlign: "center",
  },
  contactContainer: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
  },
  contactText: {
    fontSize: 14,
    marginBottom: 4,
    color: "#333",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
    textAlign: "center",
  },
  title: {
    fontSize: 19,
    marginBottom: 8,
    color: "#333",
    fontWeight: "bold",
  },
  statut: {
    fontSize: 13,
    color: "white",
    fontWeight: "bold",
    margin: 6,
  },
  buttonContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backArrow: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
});
