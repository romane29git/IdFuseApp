import React, { useEffect, useState } from "react";
import { View, Button, Text } from "react-native";
import styles from "./theme/styles";
import RootTabNavigator from "./navigation/RootTabNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StartScreen from "./screens/StartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { LanguageProvider } from './LanguageProvider';

const Stack = createStackNavigator();

export default function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fonction pour vérifier si l'utilisateur est connecté au chargement de l'application
  useEffect(() => {
    checkAccessToken();
  }, []);

  // Fonction pour vérifier si l'utilisateur a un token dans le stockage local
  const checkAccessToken = async () => {
    try {
      const storedAccessToken = await AsyncStorage.getItem("accessToken");

      if (storedAccessToken) {
        // setAccessToken(storedAccessToken);
      }
    } catch (error) {
      console.log("Erreur lors de la vérification du token :", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    // Afficher un indicateur de chargement pendant la vérification du jeton d'accès
    return (
      <View style={styles.container}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <LanguageProvider>

      <NavigationContainer>
        {accessToken ? (
          <Stack.Navigator>
            <Stack.Screen
              name="Root"
              component={RootTabNavigator}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="StartScreen"
              component={StartScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RegisterScreen"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ResetPasswordScreen"
              component={ResetPasswordScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </LanguageProvider>
  );
}


