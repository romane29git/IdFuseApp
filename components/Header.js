import React, { useContext } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import LanguageContext from "../LanguageContext";

const Header = () => {
  const { t, setLanguage } = useContext(LanguageContext);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>{t("welcome")}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
});

export default Header;
