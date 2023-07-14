import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { screenOptions } from "../theme/styles";
import Agenda from "../components/Agenda";

const ActiStack = createStackNavigator();

const ActiStackNavigator = () => {
  return (
    <ActiStack.Navigator
      initialRouteName="Acti"
      screenOptions={screenOptions}
    >
      <ActiStack.Screen
        name="Agenda"
        component={Agenda}
        options={{ title: "Agenda", headerShown: false }}
      />
    </ActiStack.Navigator>
  );
};

export default ActiStackNavigator;