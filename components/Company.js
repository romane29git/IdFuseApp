import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import { Modal } from "react-native";
import Map from "../components/Map";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";
import CompanyApi from "../api/companyApi";

const companyApi = new CompanyApi();
const Tab = createMaterialTopTabNavigator();

const Company = ({ route }) => {
  const [company, setCompany] = useState(null);
  const companyId = route.params.id;
  const navigation = useNavigation();
  const [isMapVisible, setIsMapVisible] = useState(false);

  useEffect(() => {
    async function fetchCompanyData() {
      try {
        const fetchedCompany = await companyApi.getCompanyById(companyId);
        setCompany(fetchedCompany);
      } catch (error) {
        console.log("Error fetching company data:", error);
      }
    }

    fetchCompanyData();
  }, [companyId]);

  const handlePress = (contact) => {
    navigation.navigate("Contact", { id: contact.contactId });
  };

  const handleAddress = (address) => {
    setIsMapVisible(true);
  };

  const handleEdit = (company) => {
    navigation.navigate("EditCompany", { id: company.id });
  };

  const BubbleIcon = ({ iconName }) => {
    return (
      <View style={styles.bubble}>
        <Icon name={iconName} size={18} color="#fff" />
      </View>
    );
  };

  const ContactTab = () => {
    const contacts = company ? company.contacts : [];

    return (
      <ScrollView style={styles.tabContainer}>
        {contacts.length > 0 ? (
          contacts.map((contact, index) => (
            <TouchableOpacity key={index} onPress={() => handlePress(contact)}>
              <View style={styles.contactContainer}>
                <Text style={styles.contactText}>
                  Prénom : {contact.firstName}
                </Text>
                <Text style={styles.contactText}>Nom : {contact.lastName}</Text>
                <Text style={styles.contactText}>Email : {contact.email}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text>Aucun contact disponible</Text>
        )}
      </ScrollView>
    );
  };

  const EventTab = () => {
    const events = company ? company.events : [];

    return (
      <ScrollView style={styles.tabContainer}>
        {events.length > 0 ? (
          events.map((event, index) => (
            <View key={index} style={styles.contactContainer}>
              <Text style={styles.contactText}>Event : {event.event_name}</Text>
              <Text style={styles.contactText}>
                Date de début : {event.event_date_start}
              </Text>
              <Text style={styles.contactText}>
                Date de fin : {event.event_date_end}
              </Text>
              <Text style={styles.contactText}>Type : {event.event_type}</Text>
            </View>
          ))
        ) : (
          <Text>Aucun événement disponible</Text>
        )}
      </ScrollView>
    );
  };

  const InvoiceTab = () => {
    const invoices = company ? company.invoices : [];

    return (
      <ScrollView style={styles.tabContainer}>
        {invoices.length > 0 ? (
          invoices.map((invoice, index) => (
            <View key={index} style={styles.contactContainer}>
              <Text style={styles.contactText}>Numéro : {invoice.number}</Text>
              <Text style={styles.contactText}>Statut : {invoice.status}</Text>
              <Text style={styles.contactText}>
                Date : {invoice.invoice_date}
              </Text>
              <Text style={styles.contactText}>
                Montant : {invoice.amount}€
              </Text>
              <TouchableOpacity>
                <Icon name={"file-pdf"} size={28} color={"red"} />
              </TouchableOpacity>
              <View style={styles.paid}>
                <Icon
                  name={invoice.paid === 1 ? "check-circle" : "times-circle"}
                  size={18}
                  color={invoice.paid === 1 ? "#6bf350" : "#f35050"}
                />
                <Text>{invoice.paid === 1 ? " Payée" : " Non payée"}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text>Aucune facture disponible</Text>
        )}
      </ScrollView>
    );
  };

  const TimelineTab = () => {
    const timeline = company ? company.timeline : [];

    return (
      <ScrollView style={styles.tabContainer}>
        {timeline.length > 0 ? (
          timeline.map((timeline, index) => (
            <View key={index} style={styles.contactContainer}>
              <View style={styles.titleContainer}>
                <BubbleIcon
                  iconName={
                    timeline.type_event === "call"
                      ? "phone"
                      : timeline.type_event === "meeting"
                      ? "users"
                      : "comments"
                  }
                />
                <Text style={styles.title}>
                  {timeline.firstName} {timeline.lastName} Name
                </Text>
              </View>

              <Text style={styles.legende}>
                created at : {timeline.createdat}
              </Text>
              <Text style={styles.contactText}>
                Durée : {timeline.duration} minutes
              </Text>
              <Text style={styles.contactText}>
                Type : {timeline.type_event}
              </Text>
              <Text style={styles.contactText}>
                Date : {timeline.date_start}
              </Text>
              <Text style={styles.contactText}>{timeline.name}</Text>
              <Text style={styles.contactText}>
                Commentaire : {timeline.comments_note}
              </Text>
            </View>
          ))
        ) : (
          <Text>Aucune facture disponible</Text>
        )}
      </ScrollView>
    );
  };

  const getTabBarIcon = (route, focused) => {
    let iconName;
    let notificationCount = 0;

    switch (route.name) {
      case "Contacts":
        iconName = "users";
        notificationCount = company?.contacts?.length || 0;
        break;
      case "Events":
        iconName = "calendar";
        notificationCount = company?.events?.length || 0;
        break;
      case "Factures":
        iconName = "euro-sign";
        notificationCount = company?.invoices?.length || 0;
        break;
      case "Timeline":
        iconName = "calendar-check";
        notificationCount = company?.timeline?.length || 0;
        break;
    }

    return (
      <View>
        <Icon name={iconName} size={22} color={focused ? "#5fabfe" : "#888"} />
        {notificationCount > 0 && (
          <View style={styles.iconBadge}>
            <Text style={styles.iconBadgeText}>{notificationCount}</Text>
          </View>
        )}
      </View>
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
      {company ? (
        <>
          <Text style={styles.sectionTitle}>{company.name}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleEdit(company)}
          >
            <Text style={styles.buttonText}>Modifier</Text>
          </TouchableOpacity>
          <Text style={styles.text}>
            {company.status === "customer" ? (
              <View style={styles.customer}>
                <Text style={styles.statut}>customer</Text>
              </View>
            ) : (
              <View style={styles.prospect}>
                <Text style={styles.statut}>cold prospect</Text>
              </View>
            )}
          </Text>
          <Text style={styles.text}>SIREN : {company.siren}</Text>
          <Text style={styles.text}>
            Numéro de compte : {company.account_number}
          </Text>
          {company && (company.address || company.address2) && (
            <TouchableOpacity onPress={() => handleAddress(company.address)}>
              <Text style={styles.text}>
                Adresse : {company.address ? company.address : company.address2}
              </Text>
            </TouchableOpacity>
          )}
        </>
      ) : (
        <Text>Loading company data...</Text>
      )}

      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => getTabBarIcon(route, focused),
          tabBarLabel: () => null,
        })}
      >
        <Tab.Screen name="Contacts" component={ContactTab} />
        <Tab.Screen name="Events" component={EventTab} />
        <Tab.Screen name="Factures" component={InvoiceTab} />
        <Tab.Screen name="Timeline" component={TimelineTab} />
      </Tab.Navigator>

      <Modal
        visible={isMapVisible}
        transparent={true}
        onRequestClose={() => setIsMapVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsMapVisible(false)}
          >
            <Text style={styles.closeButtonText}>Fermer</Text>
          </TouchableOpacity>
          <View style={styles.mapContainer}>
            {company && company.address && <Map address={company.address} />}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Company;

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
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#FFF",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 4,
  },
  legende: {
    fontSize: 12,
    color: "#888888",
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    marginBottom: 4,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
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
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "#ccc",
    borderRadius: 20,
    padding: 8,
    zIndex: 1,
    elevation: 5,
  },
  closeButtonText: {
    color: "#333",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  mapContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 0,
  },
  tabContainer: {
    flex: 1,
    padding: 16,
  },
  tabBar: {
    backgroundColor: "#fff",
  },
  tabIndicator: {
    backgroundColor: "#333",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  tabText: {
    fontSize: 16,
    color: "#333",
  },
  activeTabText: {
    fontSize: 16,
    color: "#fff",
  },
  notificationBadge: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  iconBadge: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  iconBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  bubble: {
    width: 35,
    height: 35,
    backgroundColor: "#5fabfe",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  paid: {
    justifyContent: "flex-end",
    flexDirection: "row",
  },
});
