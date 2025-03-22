import React from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import Room from "../../components/Room";

const HomeScreen = () => {
  // Oda listesi (bunu daha sonra dinamik hale getirebiliriz)
  const rooms = ["Salon", "Mutfak", "Yatak Odası"];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {rooms.map((room, index) => (
        <Room key={index} name={room} onAddDevice={() => Alert.alert(`${room} odasına cihaz ekle`)} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default HomeScreen;
