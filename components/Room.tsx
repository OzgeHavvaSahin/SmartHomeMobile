import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

interface RoomProps {
  name: string;
  onAddDevice: () => void;
}

const Room: React.FC<RoomProps> = ({ name, onAddDevice }) => {
  return (
    <View style={styles.container}>
      {/* Oda Başlığı */}
      <Text style={styles.title}>{name}</Text>

      {/* Buraya cihaz bileşenleri eklenecek */}

      {/* Cihaz Ekle Butonu */}
      <Button title="Cihaz Ekle" onPress={onAddDevice} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    elevation: 3, // Android gölge efekti
    shadowColor: "#000", // iOS gölge efekti
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default Room;
