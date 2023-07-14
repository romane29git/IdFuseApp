import React from "react";
import { StatusBar } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TodayStackNavigator from "./TodayStackNavigator";
import DevisStackNavigator from "./DevisStackNavigator";
import ActiStackNavigator from "./ActiStackNavigator";
import ContactsStackNavigator from "./ContactsStackNavigator";


const Tab = createBottomTabNavigator();

const RootTabNavigator = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#5fabfe" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Today") {
              iconName = focused ? "today" : "today-outline";
            } else if (route.name === "Devis") {
              iconName = focused ? "document" : "document-outline";
            } else if (route.name === "Activités") {
              iconName = focused ? "business" : "business-outline";
            } else if (route.name === "Contacts") {
              iconName = focused ? "call" : "call-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#5fabfe",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
        })}
      >
        <Tab.Screen name="Today" component={TodayStackNavigator} />
        <Tab.Screen name="Devis" component={DevisStackNavigator} />
        <Tab.Screen name="Activités" component={ActiStackNavigator} />
        <Tab.Screen name="Contacts" component={ContactsStackNavigator} />
      </Tab.Navigator>
    </>
  );
};

export default RootTabNavigator;
