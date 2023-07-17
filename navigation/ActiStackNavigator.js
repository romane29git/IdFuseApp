import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { screenOptions } from "../theme/styles";
import Activities from "../components/Activities";

const ActiStack = createStackNavigator();

const ActiStackNavigator = () => {
  return (
    <ActiStack.Navigator
      initialRouteName="Acti"
      screenOptions={screenOptions}
    >
      <ActiStack.Screen
        name="Activities"
        component={Activities}
        options={{ title: "Activities", headerShown: false }}
      />
    </ActiStack.Navigator>
  );
};

export default ActiStackNavigator;