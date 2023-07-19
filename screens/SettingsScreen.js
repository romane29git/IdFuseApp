import React from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/LoginHeader";

export default function SettingsScreen({ navigation }) {
  return (
    <Background>
      <Logo />
      <Header>Paramètres</Header>
    </Background>
  );
}
