import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { screenOptions } from "../theme/styles";
import Activities from "../components/Activities";
import SettingsScreen from "../screens/SettingsScreen";

const ActiStack = createStackNavigator();

const ActiStackNavigator = () => {
  return (
    <ActiStack.Navigator initialRouteName="Acti" screenOptions={screenOptions}>
      <ActiStack.Screen
        name="Activities"
        component={Activities}
        options={{ title: "Activities", headerShown: false }}
      />
      <ActiStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: "SettingsScreen", headerShown: false }}
      />
    </ActiStack.Navigator>
  );
};

export default ActiStackNavigator;
