import React, { useState } from "react";
import { Calendar } from "react-native-calendars";

import { View, StyleSheet, Image, TouchableOpacity, ScrollView, Text, SafeAreaView, Button } from "react-native";

const Appointment = ({navigation ,route}) => {
  const minDate = "2023-01-01";
  const maxDate = "2024-12-31";
  const {item}=route.params;
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const customStyles = {
    selected: {
      backgroundColor: '#D5B278',
      borderRadius: 10,
    },
    highlighted: {
      backgroundColor: 'red', 
      borderRadius: 10,
    },
  };

  const dayPressHandler = date => {
    setSelectedDate(date);

    console.log("Selected Date:", date);
  };

  const timePressHandler = time => {
    setSelectedTime(time);

    console.log("Selected Time:", time);
  };

  const markedDates = {
    [selectedDate]: { selected: true, selectedColor: customStyles.selected.backgroundColor },
  };

  const timeSlots = [
    "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
  ];

  return (
    <View>
      <View>
      </View>
      <View>
        <Calendar
          style={{ borderRadius: 10, margin: 30, marginTop: 60 }}
          minDate={minDate}
          maxDate={maxDate}
          theme={{
            selectedDayBackgroundColor: customStyles.selected.backgroundColor,
            selectedDayBorderRadius: customStyles.selected.borderRadius,
          }}
          onDayPress={dayPressHandler}
          markedDates={{
            ...markedDates,
            [selectedDate]: { selected: true, customStyles: customStyles.highlighted },
          }}
        />
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Available Time Slots</Text>
      </View>
      <ScrollView horizontal style={{ marginTop: 10 }}>
        {timeSlots.map((time, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.timeSlot,
              selectedTime === time ? { backgroundColor: customStyles.selected.backgroundColor } : {},
            ]}
            onPress={() => timePressHandler(time)}
          >
            <Text style={styles.timeSlotText}>{time}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.bookButton}
      onPress={()=>{navigation.navigate("reviewSummary",{item,selectedDate,selectedTime})}}>
        <Text style={styles.bookButtonText}>Set Appointment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  timeSlot: {
    width: 120,
    height: 50,
    margin: 10,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  timeSlotText: {
    fontSize: 16,
  },
  bookButton: {
    backgroundColor: "#D5B278",
    width: 390,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 50,
    borderRadius: 15,
  },
  bookButtonText: {
    fontSize: 20,
    color: "black",
  },
});

export default Appointment;
