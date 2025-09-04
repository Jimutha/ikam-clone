import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// ✅ Define a type so TS knows icons are valid Ionicon names
type Category = {
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
};

export default function Search() {
  const categories: Category[] = [
    { name: "Vehicles", icon: "car" },
    { name: "Property", icon: "home" },
    { name: "Electronics", icon: "phone-portrait" },
    { name: "Jobs", icon: "briefcase" },
    { name: "Services", icon: "build" },
  ];

  const handleCategoryPress = (category: string) => {
    console.log(`Selected category: ${category}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Search Listings</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#666"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by title..."
          autoCapitalize="none"
        />
      </View>

      {/* Category Buttons */}
      <View style={styles.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.name}
            style={styles.categoryButton}
            onPress={() => handleCategoryPress(category.name)}
          >
            <Ionicons name={category.icon} size={24} color="#666" />
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
    paddingBottom: 60,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E8B57",
    marginBottom: 20,
    textAlign: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#333",
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  categoryButton: {
    width: "48%",
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryText: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
    textAlign: "center",
  },
});
