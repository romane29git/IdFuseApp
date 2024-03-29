import React, { useEffect, useState, useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import AgendaApi from "../api/agendaApi";
import LanguageContext from "../LanguageContext";

const agendaApi = new AgendaApi();

const Agenda = () => {
  const [todayEvents, setTodayEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const { t, setLanguage } = useContext(LanguageContext);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const allEvents = await agendaApi.getAllEvents();

        const todayEvents = allEvents.filter((event) => {
          const eventDate = new Date(event.date_start);
          const today = new Date();
          return (
            eventDate.getDate() === today.getDate() &&
            eventDate.getMonth() === today.getMonth() &&
            eventDate.getFullYear() === today.getFullYear()
          );
        });

        const pastEvents = allEvents.filter((event) => {
          const eventDate = new Date(event.end);
          const today = new Date();
          return eventDate < today;
        });

        const upcomingEvents = allEvents.filter((event) => {
          const eventDate = new Date(event.end);
          const today = new Date();
          return eventDate > today;
        });

        setPastEvents(pastEvents);
        setTodayEvents(todayEvents);
        setUpcomingEvents(upcomingEvents);
      } catch (error) {
        console.log("Error fetching events:", error);
      }
    }

    fetchEvents();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("agenda")}</Text>
      <Text style={styles.sectionTitle}>{t("event_today")}</Text>
      {todayEvents.length > 0 ? (
        todayEvents.map((event, index) => (
          <View style={styles.eventContainer} key={index}>
            <Text style={styles.eventName}>
              {t("event_name")}: {event.title}
            </Text>
          </View>
        ))
      ) : (
        <Text>{t("no_event_today")}</Text>
      )}

      <Text style={styles.sectionTitle}>{t("event_upcoming")}</Text>
      {upcomingEvents.length > 0 ? (
        upcomingEvents.map((event, index) => (
          <View style={styles.eventContainer} key={index}>
            <Text style={styles.eventName}>
              {t("event_name")} : {event.title}
            </Text>
          </View>
        ))
      ) : (
        <Text>{t("no_event_upcoming")}</Text>
      )}

      <Text style={styles.sectionTitle}>{t("event_past")}</Text>
      {pastEvents.length > 0 ? (
        pastEvents.map((event, index) => (
          <View style={styles.eventContainer} key={index}>
            <Text style={styles.eventName}>
              {t("event_name")} : {event.title}
            </Text>
          </View>
        ))
      ) : (
        <Text>{t("no_event_past")} </Text>
      )}
    </View>
  );
};

export default Agenda;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  eventContainer: {
    marginBottom: 10,
  },
  eventName: {
    fontSize: 16,
  },
  input: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 5,
  },
});
