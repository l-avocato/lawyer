import React, { useState,useMemo,useEffect } from "react";
import { Calendar } from "react-native-calendars";
import config from './ipv'

import { View, StyleSheet, Image, TouchableOpacity, ScrollView, Text, SafeAreaView, Button } from "react-native";
import axios from "axios";
const Appointment = ({navigation ,route}) => {
  const minDate = "2023-01-01";
  const maxDate = "2024-12-31";
  const {item}=route.params;
  const initDate = '2023-11-08';
  const [selected, setSelected] = useState(initDate);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] =  useState(new Date().toISOString().split('T')[0]);;
  const [unavailableTimes, setUnavailableTimes] = useState([]);
  const [bookedTime, setBookedTime] = useState(null);

console.log("this the a time",item.id);
const customStyles = {
  selected: {
    backgroundColor: '#D5B278',
    borderRadius: 10,
  },
  unavailable: {
    backgroundColor: 'grey',
  },
};




  const dayPressHandler = date => {
    setSelected(date.dateString);
    console.log("Selected Date:", date);
  };

  const timePressHandler = time => {
    setSelectedTime(time);
    setBookedTime(null); 


    console.log("Selected Time:", time);
  };

  const fetchUnavailableTimes = async () => {
    try {
      const response = await axios.get(
        `http://${config}:1128/api/availability/unavaibleTime/${item.id}/${selected}`
      );
      setUnavailableTimes(response.data);
    } catch (error) {
      console.error("Error fetching unavailable times:", error);
    }
  };
  useEffect(() => {
  

    fetchUnavailableTimes();
  }, [ selected,item.lawyerId]);



  // const markedDates = {
  //   [selectedDate]: { selected: true, selectedColor: customStyles.selected.backgroundColor },
  // };

  const marked = useMemo(() => ({
    [selected]: {
      selected: true,
      selectedColor: '#D5B278',
      selectedTextColor: 'white',
      backgroundColor: '#D5B278',
    }
  }), [selected]);

  const timeSlots = [
    "10:00:00", "11:00:00", "12:00:00", "01:00:00", "02:00:00", "03:00:00", "04:00:00", "05:00:00",
  ];

  return (
    <View>
      <View>
      </View>
      <View>
        <Calendar
          style={{ borderRadius: 10, margin: 30, marginTop: 60 }}
          // minDate={minDate}
          // maxDate={maxDate}
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            dayTextColor: '#2d4150',
          }}
          onDayPress={dayPressHandler}
          markedDates={marked}
        />
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Available Time Slots</Text>
      </View>
      <ScrollView horizontal style={{ marginTop: 10 }}>
      {/* {timeSlots.map((time, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.timeSlot,
              selectedTime === time ? { backgroundColor: customStyles.selected.backgroundColor } : {},
              unavailableTimes.includes(time) ? customStyles.unavailable : {},
            ]}
            onPress={() => timePressHandler(time)}
            disabled={unavailableTimes.includes(time)}
          >
            <Text style={styles.timeSlotText}>{time}</Text>
          </TouchableOpacity>
        ))} */}
        {timeSlots.map((time, index) => (
  <TouchableOpacity
    key={index}
    style={[
      styles.timeSlot,
      selectedTime === time ? { backgroundColor: customStyles.selected.backgroundColor } : {},
      unavailableTimes.includes(time) ? customStyles.unavailable : {},
      bookedTime === time ?  disabled=true  : {},
    ]}
    onPress={() => timePressHandler(time)}
    disabled={unavailableTimes.includes(time)}
  >
    <Text style={styles.timeSlotText}>{time}</Text>
  </TouchableOpacity>
))}
      </ScrollView>
      <TouchableOpacity
        // style={styles.bookButton}
        // onPress={() => {
        //   if (!unavailableTimes.includes(selectedTime.slice(0, 5))) {
        //     navigation.navigate("reviewSummary", {
        //       item,
        //       selected,
        //       selectedTime,
        //     });
        //   } else {
        //     console.warn("Selected time is unavailable.");
        //   }
        // }}
        // style={
        //   unavailableTimes.includes(selectedTime)
        //     ? { backgroundColor: 'red' }
        //     : styles.bookButton
        // }
        onPress={() => {
          if (!unavailableTimes.includes(selectedTime.slice(0, 5))) {
            setBookedTime(selectedTime);
            navigation.navigate("reviewSummary", {
              item,
              selected,
              selectedTime,
            });
          } else {
            console.warn("Selected time is unavailable.");
          }
        }}
        
        // disabled={unavailableTimes.includes(selectedTime)}
      >
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
    backgroundColor: "black",
    width: 390,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 50,
    borderRadius: 10,
  },
  bookButtonText: {
    fontSize: 20,
    color: "white",
  },
});

export default Appointment;
