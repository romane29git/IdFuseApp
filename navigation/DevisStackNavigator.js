import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { screenOptions } from "../theme/styles";
import AddContact from "../components/AddContact";

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
    </DevisStack.Navigator>
  );
};

export default DevisStackNavigator;
