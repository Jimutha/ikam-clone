import { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { useRouter } from "expo-router";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Navigate to a search results page (implement /search.jsx separately)
      router.push(`/search?query=${encodeURIComponent(searchQuery)}` as any);
    }
  };

  return (
    <View style={styles.header}>
      <Text style={styles.logo}>ikman.lk</Text>
      <TextInput
        style={styles.search}
        placeholder="Search in ikman.lk"
        placeholderTextColor="#777"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#2E8B57",
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 10,
  },
  search: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 36,
  },
});
