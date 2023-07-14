import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { screenOptions } from "../theme/styles";
import Activities from "../components/Activities";

const DevisStack = createStackNavigator();

const DevisStackNavigator = () => {
  return (
    <DevisStack.Navigator
      initialRouteName="Devis"
      screenOptions={screenOptions}
    >
      <DevisStack.Screen
        name="Activities"
        component={Activities}
        options={{ title: "Activities", headerShown: false }}
      />
    </DevisStack.Navigator>
  );
};

export default DevisStackNavigator;
