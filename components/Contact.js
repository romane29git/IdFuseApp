import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { Linking } from "react-native";

const Contact = () => {
  const [contact, setContact] = useState(null);
  const route = useRoute();
  const id = route.params.id;
  const navigation = useNavigation();

  const updateContactId = (newId) => {
    navigation.setParams({ id: newId });
  };

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get(
          `https://app.idfuse.fr/api/crm/contact/${id}?api_token=ac781e5381ea80907e7f3b0aa5156cbc8eebf82957bf69c939829d9ee619ca78`
        );
        const fetchedContact = response.data;
        setContact(fetchedContact);
      } catch (error) {
        console.error("Error fetching contact:", error);
      }
    };
    fetchContact();
  }, [id]);

  const handlePress = (newId) => {
    updateContactId(newId);
  };

  const handlePressCompany = (company) => {
    navigation.navigate("Company", { id: company.id, name: company.name });
  };

  const handlePressOpp = (opportunity) => {
    navigation.navigate("Opportunity", { id: opportunity.id });
    console.log(opportunity);
  };

  //envoi mail
  const sendEmail = (emailAddress) => {
    Linking.openURL(`mailto:${emailAddress}`);
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
      {contact ? (
        <>
          <Text style={styles.sectionTitle}>
            {contact.contact.first_name} {contact.contact.last_name}
          </Text>
          {contact.contact.emails && contact.contact.emails.length > 0 && (
            <>
              <Text style={styles.title}>Mail</Text>
              {contact.contact.emails.map((contact, index) => (
                <View key={index} style={styles.contactContainer}>
                  <TouchableOpacity
                    onPress={() => sendEmail(contact.mail)}
                  >
                  <Text style={styles.contactText}>{contact.mail}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </>
          )}

          {contact.contact.companies &&
            contact.contact.companies.length > 0 && (
              <>
                <Text style={styles.title}>Entreprises</Text>
                {contact.contact.companies.map((company, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handlePressCompany(company)}
                  >
                    <View key={index} style={styles.contactContainer}>
                      <Text style={styles.contactText}>{company.name}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </>
            )}

          {contact.contact.contacts && contact.contact.contacts.length > 0 && (
            <>
              <Text style={styles.title}>Contacts</Text>
              {contact.contact.contacts.map((contact, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handlePress(contact.id)}
                >
                  <View key={index} style={styles.contactContainer}>
                    <Text style={styles.contactText}>
                      {contact.first_name} {contact.last_name}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </>
          )}

          {contact.contact.opportunities &&
            contact.contact.opportunities.length > 0 && (
              <>
                <Text style={styles.title}>Opportunités</Text>
                {contact.contact.opportunities.map((opportunity, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handlePressOpp(opportunity)}
                  >
                    <View key={index} style={styles.contactContainer}>
                      <Text style={styles.contactText}>{opportunity.name}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </>
            )}
        </>
      ) : (
        <Text>Loading contact data...</Text>
      )}
    </ScrollView>
  );
};

export default Contact;

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
  customer: {
    backgroundColor: "#1ccf60",
    borderRadius: 15,
  },
  prospect: {
    backgroundColor: "#68bae8",
    borderRadius: 15,
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
    flexDirection: "row",
    alignItems: "center",
  },
  backArrow: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
});
