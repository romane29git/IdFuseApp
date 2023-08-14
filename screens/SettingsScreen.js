import React, { useEffect, useState, useContext } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/LoginHeader";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Button from "../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LanguageContext from '../LanguageContext';


export default function SettingsScreen({ navigation }) {
  const [accessToken, setAccessToken] = useState(null);
  const { t, setLanguage } = useContext(LanguageContext);


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
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Text style={styles.closeButtonText}>Fermer</Text>
      </TouchableOpacity>
      <Text>
        {t('title')}
      </Text>
      <Logo />
      <Header>Paramètres</Header>
      <Button onPress={removeAccessToken}>Déconnexion</Button>
      <Button onPress={() => setLanguage('en')}>English</Button>
      <Button onPress={() => setLanguage('fr')}>Français</Button>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    marginBottom: 30,
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "#ccc",
    borderRadius: 20,
    padding: 8,
    zIndex: 1,
    elevation: 5,
  },
  closeButtonText: {
    color: "#333",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
