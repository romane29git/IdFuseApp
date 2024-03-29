import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Contact, editContactApi } from "../api/editContactApi";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import { ScrollView } from "react-native";
import LanguageContext from "../LanguageContext";

const EditContact = ({ route }) => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [mail, setMail] = useState("");
  const { t, setLanguage } = useContext(LanguageContext);

  const [contact, setContact] = useState({});
  const navigation = useNavigation();
  const idContact = 13;

  const handleSubmit = async () => {
    const updatedContact = new Contact(idContact, first_name, last_name, mail);
    updatedContact.emails[0].mail = mail;

    try {
      await editContactApi({
        id: idContact,
        first_name: updatedContact.first_name,
        last_name: updatedContact.last_name,
        mail: updatedContact.emails[0].mail,
      });
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la modification de l'entreprise :",
        error
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={require("../assets/arrow_back.png")}
          style={styles.backArrow}
        />
      </TouchableOpacity>
      <Text>{t("udpateContact")}</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>{t("lastname")} :</Text>
        <TextInput
          value={last_name}
          onChangeText={setLastName}
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>{t("firstname")} :</Text>
        <TextInput
          value={first_name}
          onChangeText={setFirstName}
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>{t("email")} :</Text>
        <TextInput value={mail} onChangeText={setMail} style={styles.input} />
      </View>

      <Button title={t("lastname")} onPress={handleSubmit} />
    </ScrollView>
  );
};

export default EditContact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  backArrow: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 8,
    fontSize: 16,
  },
});
