import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Ad } from "./types";

export default function Home() {
  const router = useRouter();
  const [posts, setPosts] = useState<Ad[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [filteredPosts, setFilteredPosts] = useState<Ad[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      const storedPosts = await AsyncStorage.getItem("ads");
      if (storedPosts) {
        const parsedPosts: Ad[] = JSON.parse(storedPosts);
        // Sort posts by timestamp in descending order (latest first)
        const sortedPosts = parsedPosts.sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        setPosts(sortedPosts);
        setFilteredPosts(sortedPosts);
      }
    };
    loadPosts();
  }, []);

  const handleFilter = (location: string) => {
    setSelectedLocation(location);
    if (location === "") {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter((post) => post.location === location));
    }
  };

  const renderPost = ({ item }: { item: Ad }) => (
    <TouchableOpacity
      style={styles.postItem}
      onPress={() => router.push(`/post/${item.timestamp}` as any)} // Use timestamp as unique ID
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

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to ikman.lk Clone</Text>

      {/* Location Filter */}
      <Picker
        selectedValue={selectedLocation}
        onValueChange={handleFilter}
        style={styles.picker}
      >
        <Picker.Item label="All Locations" value="" />
        <Picker.Item label="Sri Lanka" value="Sri Lanka" />
        <Picker.Item label="India" value="India" />
        <Picker.Item label="United States" value="United States" />
        <Picker.Item label="United Kingdom" value="United Kingdom" />
        <Picker.Item label="Australia" value="Australia" />
        <Picker.Item label="Canada" value="Canada" />
        <Picker.Item label="Germany" value="Germany" />
        <Picker.Item label="France" value="France" />
        <Picker.Item label="Japan" value="Japan" />
        <Picker.Item label="China" value="China" />
        <Picker.Item label="Brazil" value="Brazil" />
        <Picker.Item label="Russia" value="Russia" />
        <Picker.Item label="South Africa" value="South Africa" />
        <Picker.Item label="Mexico" value="Mexico" />
        <Picker.Item label="Italy" value="Italy" />
        <Picker.Item label="Spain" value="Spain" />
        <Picker.Item label="Netherlands" value="Netherlands" />
        <Picker.Item label="Sweden" value="Sweden" />
        <Picker.Item label="Norway" value="Norway" />
        <Picker.Item label="Denmark" value="Denmark" />
        <Picker.Item label="Finland" value="Finland" />
        <Picker.Item label="Switzerland" value="Switzerland" />
        <Picker.Item label="Austria" value="Austria" />
        <Picker.Item label="Belgium" value="Belgium" />
        <Picker.Item label="Poland" value="Poland" />
        <Picker.Item label="Ukraine" value="Ukraine" />
        <Picker.Item label="Turkey" value="Turkey" />
        <Picker.Item label="Egypt" value="Egypt" />
        <Picker.Item label="Nigeria" value="Nigeria" />
        <Picker.Item label="Kenya" value="Kenya" />
        <Picker.Item label="South Korea" value="South Korea" />
        <Picker.Item label="Thailand" value="Thailand" />
        <Picker.Item label="Vietnam" value="Vietnam" />
        <Picker.Item label="Indonesia" value="Indonesia" />
        <Picker.Item label="Malaysia" value="Malaysia" />
        <Picker.Item label="Singapore" value="Singapore" />
        <Picker.Item label="Philippines" value="Philippines" />
        <Picker.Item label="New Zealand" value="New Zealand" />
        <Picker.Item label="Argentina" value="Argentina" />
        <Picker.Item label="Chile" value="Chile" />
        <Picker.Item label="Colombia" value="Colombia" />
        <Picker.Item label="Peru" value="Peru" />
        <Picker.Item label="Saudi Arabia" value="Saudi Arabia" />
        <Picker.Item
          label="United Arab Emirates"
          value="United Arab Emirates"
        />
        <Picker.Item label="Qatar" value="Qatar" />
        <Picker.Item label="Pakistan" value="Pakistan" />
        <Picker.Item label="Bangladesh" value="Bangladesh" />
        <Picker.Item label="Afghanistan" value="Afghanistan" />
        <Picker.Item label="Iraq" value="Iraq" />
        <Picker.Item label="Iran" value="Iran" />
        <Picker.Item label="Israel" value="Israel" />
        <Picker.Item label="Portugal" value="Portugal" />
      </Picker>

      {/* Recent Posts */}
      <Text style={styles.recentPostsHeading}>Recent Posts</Text>
      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.timestamp}
        renderItem={renderPost}
        contentContainerStyle={styles.postsList}
        ListEmptyComponent={
          <Text style={styles.noPostsText}>No posts available.</Text>
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
    paddingBottom: 60, // Match footer height
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E8B57",
    marginBottom: 20,
    textAlign: "center",
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#FAFAFA",
    padding: 10,
  },
  recentPostsHeading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
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
