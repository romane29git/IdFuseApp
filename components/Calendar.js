import React from "react";
import { View, Text, StyleSheet } from "react-native";

function Calendar() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Générer un tableau de jours du mois en cours
  const getDaysInMonth = (year, month) => {
    const numDays = new Date(year, month + 1, 0).getDate();
    const days = [];
    for (let day = 1; day <= numDays; day++) {
      days.push(day);
    }
    return days;
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);

  return (
    <View style={styles.calendarContainer}>
      <Text style={styles.calendarHeader}>
        Calendrier {currentMonth + 1}/{currentYear}
      </Text>
      <View style={styles.calendarGrid}>
        {daysInMonth.map((day, index) => (
          <View key={index} style={styles.calendarDay}>
            <Text style={styles.calendarDayText}>{day}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    calendarContainer: {
      marginVertical: 20,
      paddingHorizontal: 20,
    },
    calendarHeader: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
    },
    calendarGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    calendarDay: {
      width: "14.28%", 
      aspectRatio: 1, 
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "gray",
    },
    calendarDayText: {
      fontSize: 16,
    },
  });

export default Calendar;
