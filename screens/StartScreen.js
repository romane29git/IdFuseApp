import React, { useContext } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/LoginHeader";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";
import LanguageContext from '../LanguageContext';

export default function StartScreen({ navigation }) {
  const { t, setLanguage } = useContext(LanguageContext);

  return (
    <Background>
      <Logo />
      <Header>Login Template</Header>
      <Paragraph>
        The easiest way to start with your amazing application.
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("LoginScreen")}
      >
        {t('login')}
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate("RegisterScreen")}
      >
        {t('signup')}
      </Button>
    </Background>
  );
}
