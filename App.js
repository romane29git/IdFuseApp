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

  // Fonction pour stocker le token dans le stockage local
  const storeAccessToken = async (token) => {
    try {
      await AsyncStorage.setItem("accessToken", token);
      setAccessToken(token);
    } catch (error) {
      console.log("Erreur de stockage du token :", error);
    }
  };

  // Fonction pour supprimer le token du stockage local
  const removeAccessToken = async () => {
    try {
      await AsyncStorage.removeItem("accessToken");
      setAccessToken(null);
    } catch (error) {
      console.log("Erreur lors de la suppression du token :", error);
    }
  };

  // Fonction pour se connecter et obtenir le token depuis l'API
  // const login = async () => {
  //   try {
  //     // Effectuer une requête à l'API pour obtenir le token
  //     const response = await fetch(
  //       "https://app.idfuse.fr/api/sso?api_token=ac781e5381ea80907e7f3b0aa5156cbc8eebf82957bf69c939829d9ee619ca78&sso_user=democlients",
  //       {
  //         method: "GET",
  //       }
  //     );

  //     const data = await response.json();

  //     if (data.success === 1) {
  //       const accessToken = data.sso_token;
  //       storeAccessToken(accessToken);
  //     } else {
  //       console.log("Échec de la connexion :", data.result_message);
  //       setAccessToken(null);
  //     }
  //   } catch (error) {
  //     console.log("Erreur lors de la connexion :", error);
  //   }
  // };

  // Fonction pour effectuer une action lorsque l'utilisateur est connecté
  // const performActionWhenLoggedIn = () => {
  //   // Effectuer l'action souhaitée lorsque l'utilisateur est connecté
  //   console.log("Utilisateur connecté. Effectuer l'action souhaitée ici.");
  // };

  if (isLoading) {
    // Afficher un indicateur de chargement pendant la vérification du jeton d'accès
    return (
      <View style={styles.container}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  // fonction pour effectuer une requête authentifiée à l'API en utilisant le token --> pas nécessaire
  // const fetchData = async () => {
  //   try {
  //     const storedAccessToken = await AsyncStorage.getItem("accessToken");

  //     if (storedAccessToken) {
  //       const response = await fetch(
  //         "https://app.idfuse.fr/api/sso?api_token=ac781e5381ea80907e7f3b0aa5156cbc8eebf82957bf69c939829d9ee619ca78&sso_user=democlients",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${storedAccessToken}`,
  //           },
  //         }
  //       );

  //       const data = await response.json();

  //       console.log("Données récupérées :", data);
  //     } else {
  //       console.log("Aucun token trouvé. L'utilisateur n'est pas connecté.");
  //     }
  //   } catch (error) {
  //     console.log("Erreur lors de la récupération des données :", error);
  //   }
  // };

  // L'utilisateur est connecté, afficher la page d'accueil
  // if (accessToken) {
  //   return (
  //     <View style={styles.container}>
  //       <RootTabNavigator />
  //       <Button title="Déconnexion" onPress={removeAccessToken} />
  //     </View>
  //   );
  // } else {
  //   return (
  //     <View style={styles.container}>
  //       <Button title="Se connecter" onPress={login} />
  //       {/* <LoginScreen /> */}
  //     </View>
  //   );
  // }

  return (
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
  );
}


