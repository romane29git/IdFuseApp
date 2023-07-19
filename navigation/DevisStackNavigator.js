import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { screenOptions } from "../theme/styles";
import AddContact from "../components/AddContact";
import SettingsScreen from "../screens/SettingsScreen";

const DevisStack = createStackNavigator();

const DevisStackNavigator = () => {
  return (
    <DevisStack.Navigator
      initialRouteName="Devis"
      screenOptions={screenOptions}
    >
      <DevisStack.Screen
        name="AddContact"
        component={AddContact}
        options={{ title: "AddContact", headerShown: false }}
      />
      <DevisStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: "SettingsScreen", headerShown: false }}
      />
    </DevisStack.Navigator>
  );
};

export default DevisStackNavigator;
