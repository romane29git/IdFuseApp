import React, { useEffect, useState } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/LoginHeader";
import { View, Text, StyleSheet } from "react-native";
import Button from "../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingsScreen({ navigation }) {
  const [accessToken, setAccessToken] = useState(null);

  const removeAccessToken = async () => {
    try {
      await AsyncStorage.removeItem("accessToken");
      setAccessToken(null);
      navigation.reset({
        index: 0,
        routes: [{ name: "StartScreen" }],
      });
    } catch (error) {
      console.log("Erreur lors de la suppression du token :", error);
    }
  };

  return (
    <Background>
      <Logo />
      <Header>Paramètres</Header>
      <Button onPress={removeAccessToken}>Déconnexion</Button>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    marginBottom: 30,
  },
});
