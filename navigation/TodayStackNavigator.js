import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { screenOptions } from "../theme/styles";
import Search from "../components/Search";
import Company from "../components/Company";
import Contact from "../components/Contact";
import Campaign from "../components/Campaign";
import List from "../components/List";

const TodayStack = createStackNavigator();

const TodayStackNavigator = () => {
  return (
    <TodayStack.Navigator initialRouteName="Today" screenOptions={screenOptions}>
      <TodayStack.Screen
        name="Search"
        component={Search}
        options={{ title: "Search" , headerShown: false}}
      />
      <TodayStack.Screen
        name="Company"
        component={Company}
        options={{ title: "Company" , headerShown: false}}
      />
      <TodayStack.Screen
        name="Contact"
        component={Contact}
        options={{ title: "Contact" , headerShown: false}}
      />
      <TodayStack.Screen
        name="Campaign"
        component={Campaign}
        options={{ title: "Campaign" , headerShown: false}}
      />
       <TodayStack.Screen
        name="List"
        component={List}
        options={{ title: "List" , headerShown: false}}
      />
    </TodayStack.Navigator>
  );
};

export default TodayStackNavigator;