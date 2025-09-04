import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

export default function Categories() {
  const router = useRouter();
  const categories = [
    { id: "1", name: "Vehicles" },
    { id: "2", name: "Property" },
    { id: "3", name: "Electronics" },
    { id: "4", name: "Jobs" },
    { id: "5", name: "Services" },
  ];

  const handleCategoryPress = (category: string) => {
    // Add navigation or filtering logic here if needed
    console.log(`Selected category: ${category}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Browse Categories</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryItem}
            onPress={() => handleCategoryPress(item.name)}
          >
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
    paddingBottom: 60, // Match footer height
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E8B57",
    marginBottom: 20,
    textAlign: "center",
  },
  categoryItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryText: {
    fontSize: 16,
    color: "#333",
  },
});
