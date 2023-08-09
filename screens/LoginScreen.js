import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, View, SafeAreaView } from "react-native";
import { Text } from "react-native-paper";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/LoginHeader";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RootTabNavigator from "../navigation/RootTabNavigator";
import { loginApi } from "../api/loginApi";

export default function LoginScreen({ navigation }) {
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [passwordOk, setPasswordOk] = useState(true);
  global.accessToken = accessToken;

  // Fonction pour vérifier si l'utilisateur est connecté au chargement de l'application
  useEffect(() => {
    checkAccessToken();
    setIsLoading(false);
  }, [accessToken]);

  // Fonction pour vérifier si l'utilisateur a un token dans le stockage local
  const checkAccessToken = async () => {
    try {
      const storedAccessToken = await AsyncStorage.getItem("accessToken");
      
      if (storedAccessToken) {
        setAccessToken(storedAccessToken);
        setIsLoggedIn(true);
        console.log("Utilisateur connecté");
      } else {
        setIsLoggedIn(false);
        console.log("Utilisateur non connecté");
      }
    } catch (error) {
      console.log("Erreur lors de la vérification du token :", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour stocker le token dans le stockage local (connexion)
  const storeAccessToken = async (token) => {
    try {
      if (token) {
        await AsyncStorage.setItem("accessToken", token);
        setAccessToken(token);
      } else {
        console.log("Le token est null ou undefined");
      }
    } catch (error) {
      console.log("Erreur de stockage du token :", error);
    }
  };

  // Fonction pour supprimer le token du stockage local (déconnexion)
  const removeAccessToken = async () => {
    try {
      await AsyncStorage.removeItem("accessToken");
      setAccessToken(null);
    } catch (error) {
      console.log("Erreur lors de la suppression du token :", error);
    }
  };

  // Fonction pour se connecter et obtenir le token depuis l'API
  const login = async () => {
    try {
      const response = await loginApi(email, password);
      console.log(response);
      const apiToken = response.api_token;
      if (apiToken) {
        storeAccessToken(apiToken);
        setIsLoggedIn(true);
        setLoginError(false);
        setPasswordOk(true);
      } else {
        // Échec de la connexion
        setAccessToken(null);
        setIsLoggedIn(false);
        setLoginError(true);
        setPasswordOk(false);
      }
    } catch (error) {
      console.log("Erreur lors de la connexion (login):", error);
    }
  };

  if (isLoading) {
    // Afficher un indicateur de chargement pendant la vérification du token
    return (
      <View style={styles.container}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  if (isLoggedIn) {
    // Utilisateur connecté, affiche l'interface principale de l'application
    return <RootTabNavigator accessToken={accessToken} />;
  } else {
    // L'utilisateur n'est pas connecté, affiche l'interface de connexion
    return (
      <Background>
        <BackButton goBack={() => navigation.goBack()} />
        <Logo />
        <Header>Welcome back.</Header>
        <TextInput
          label="Email"
          returnKeyType="next"
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <TextInput
          label="Password"
          returnKeyType="done"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        {!passwordOk && (
          <Text style={styles.errorText}>Mot de passe ou login incorrect</Text>
        )}
        <View style={styles.forgotPassword}>
          <Text
            style={styles.forgot}
            onPress={() => navigation.navigate("ResetPasswordScreen")}
          >
            Forgot your password?
          </Text>
        </View>
        <Button mode="contained" onPress={login}>
          <Text>Login</Text>
        </Button>
        <View style={styles.row}>
          <Text>Don’t have an account? </Text>
          <TouchableOpacity
            onPress={() => navigation.replace("RegisterScreen")}
          >
            <Text style={styles.link}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    marginBottom: 30,
  },
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 50,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});
