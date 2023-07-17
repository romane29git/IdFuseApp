import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

const Campaign = () => {
  const [campaign, setCampaign] = useState(null);
  const route = useRoute();
  const id = route.params.id;
  const name = route.params.name;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await axios.get(
          `https://app.idfuse.fr/api/campaign/report/total/${id}?api_token=ac781e5381ea80907e7f3b0aa5156cbc8eebf82957bf69c939829d9ee619ca78`
        );
        const fetchedCampaign = response.data;
        setCampaign(fetchedCampaign);
      } catch (error) {
        console.error("Error fetching campaign:", error);
      }
    };
    fetchCampaign();
  }, [id]);

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
      {campaign && (
        <>
          <Text style={styles.sectionTitle}>{name}</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Statut:</Text>
            <Text
              style={campaign.status === 1 ? styles.scheduled : styles.draft}
            >
              {campaign.status === 1 ? "Scheduled" : "Draft"}
            </Text>
          </View>
          <Text style={styles.text}>Total Amount: {campaign.total_amt}</Text>
          <Text style={styles.text}>Send Amount: {campaign.send_amt}</Text>
          <Text style={styles.text}>Opens: {campaign.opens}</Text>
          <Text style={styles.text}>Link Clicks: {campaign.linkclicks}</Text>
          <Text style={styles.text}>
            Subscriber Clicks: {campaign.subscriberclicks}
          </Text>
          <Text style={styles.text}>Unsubscribes: {campaign.unsubscribes}</Text>
          <Text style={styles.text}>
            Total Bounces: {campaign.totalbounces}
          </Text>
          <Text style={styles.text}>Soft Bounces: {campaign.softbounces}</Text>
          <Text style={styles.text}>Hard Bounces: {campaign.hardbounces}</Text>
        </>
      )}
    </ScrollView>
  );
};

export default Campaign;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
    textAlign: "center",
  },
  backArrow: {
    width: 20,
    height: 20,
    marginRight: 5,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontWeight: "bold",
    marginRight: 8,
  },
  scheduled: {
    color: "#00C853",
  },
  draft: {
    color: "#FF5722",
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
});
