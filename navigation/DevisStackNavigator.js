import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { screenOptions } from "../theme/styles";
import EditContact from "../components/EditContact";

const DevisStack = createStackNavigator();

const DevisStackNavigator = () => {
  return (
    <DevisStack.Navigator
      initialRouteName="Devis"
      screenOptions={screenOptions}
    >
      <DevisStack.Screen
        name="EditContact"
        component={EditContact}
        options={{ title: "EditContact", headerShown: false }}
      />
    </DevisStack.Navigator>
  );
};

export default DevisStackNavigator;
