import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { screenOptions } from "../theme/styles";
import Companies from "../components/Companies";
import Company from "../components/Company";
import Contact from "../components/Contact";
import Opportunity from "../components/Opportunity";
import Map from "../components/Map";
import EditCompany from "../components/EditCompany";
import EditContact from "../components/EditContact";
import AddCompanies from "../components/AddCompanies";
import SettingsScreen from "../screens/SettingsScreen";
import AttachContact from "../components/AttachContact";
import AttachCompany from "../components/AttachCompany";

const ContactsStack = createStackNavigator();

const ContactsStackNavigator = () => {
  return (
    <ContactsStack.Navigator
      initialRouteName="Contacts"
      screenOptions={screenOptions}
    >
      <ContactsStack.Screen
        name="Companies"
        component={Companies}
        options={{ title: "Companies", headerShown: false }}
      />
      <ContactsStack.Screen
        name="Company"
        component={Company}
        options={{ title: "Company", headerShown: false }}
      />
      <ContactsStack.Screen
        name="Contact"
        component={Contact}
        options={{ title: "Contact", headerShown: false }}
      />
      <ContactsStack.Screen
        name="Opportunity"
        component={Opportunity}
        options={{ title: "Opportunity", headerShown: false }}
      />
      <ContactsStack.Screen
        name="Map"
        component={Map}
        options={{ title: "Map", headerShown: false }}
      />
      <ContactsStack.Screen
        name="EditCompany"
        component={EditCompany}
        options={{ title: "EditCompany", headerShown: false }}
      />
      <ContactsStack.Screen
        name="EditContact"
        component={EditContact}
        options={{ title: "EditContact", headerShown: false }}
      />
      <ContactsStack.Screen
        name="AddCompanies"
        component={AddCompanies}
        options={{ title: "AddCompanies", headerShown: false }}
      />
      <ContactsStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: "SettingsScreen", headerShown: false }}
      />
      <ContactsStack.Screen
        name="AttachContact"
        component={AttachContact}
        options={{ title: "AttachContact", headerShown: false }}
      />
      <ContactsStack.Screen
        name="AttachCompany"
        component={AttachCompany}
        options={{ title: "AttachCompany", headerShown: false }}
      />
    </ContactsStack.Navigator>
  );
};

export default ContactsStackNavigator;
