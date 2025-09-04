import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Ad } from "./types";
import { Ionicons } from "@expo/vector-icons";

export default function Search() {
  const router = useRouter();
  const [posts, setPosts] = useState<Ad[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredPosts, setFilteredPosts] = useState<Ad[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      const storedPosts = await AsyncStorage.getItem("ads");
      if (storedPosts) {
        const parsedPosts: Ad[] = JSON.parse(storedPosts);
        setPosts(
          parsedPosts.sort(
            (a, b) =>
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          )
        );
        setFilteredPosts(parsedPosts);
      }
    };
    loadPosts();
  }, []);

  const handleSearch = () => {
    let updatedPosts = posts;
    if (searchQuery) {
      updatedPosts = updatedPosts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedCategory) {
      updatedPosts = updatedPosts.filter(
        (post) => post.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    setFilteredPosts(updatedPosts);
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery, selectedCategory, posts]);

  const handleCategoryPress = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const renderPost = ({ item }: { item: Ad }) => (
    <TouchableOpacity
      style={styles.postItem}
      onPress={() => router.push(`/post/${item.timestamp}`)}
    >
      <Image
        source={{ uri: item.thumbnail || "https://via.placeholder.com/100" }}
        style={styles.postImage}
      />
      <View style={styles.postDetails}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.postCategory}>{item.category}</Text>
        <Text style={styles.postPrice}>
          {item.currency} {item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const categories = [
    { name: "Vehicles", icon: "car" },
    { name: "Property", icon: "home" },
    { name: "Electronics", icon: "phone-portrait" },
    { name: "Jobs", icon: "briefcase" },
    { name: "Services", icon: "build" },
  ];

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
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
          onSubmitEditing={handleSearch}
        />
      </View>

      {/* Category Buttons */}
      <View style={styles.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.name}
            style={[
              styles.categoryButton,
              selectedCategory === category.name.toLowerCase() &&
                styles.selectedCategory,
            ]}
            onPress={() => handleCategoryPress(category.name.toLowerCase())}
          >
            <Ionicons name={category.icon} size={24} color="#666" />
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Search Results */}
      <Text style={styles.resultsHeading}>Results</Text>
      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.timestamp}
        renderItem={renderPost}
        contentContainerStyle={styles.postsList}
        ListEmptyComponent={
          <Text style={styles.noPostsText}>No results found.</Text>
        }
      />
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
  selectedCategory: {
    borderWidth: 2,
    borderColor: "#2E8B57",
  },
  categoryText: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
    textAlign: "center",
  },
  resultsHeading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    marginTop: 10,
    textAlign: "center",
  },
  postsList: {
    paddingBottom: 20,
  },
  postItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  postImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  postDetails: {
    flex: 1,
    justifyContent: "center",
  },
  postTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  postCategory: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  postPrice: {
    fontSize: 14,
    color: "#2E8B57",
    fontWeight: "bold",
    marginTop: 5,
  },
  noPostsText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
});
