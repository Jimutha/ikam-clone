import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Ad } from "./types";

export default function MyPosts() {
  const router = useRouter();
  const [posts, setPosts] = useState<Ad[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      const storedPosts = await AsyncStorage.getItem("ads");
      if (storedPosts) {
        const parsedPosts: Ad[] = JSON.parse(storedPosts);
        const currentUser = await AsyncStorage.getItem("currentUser");
        if (currentUser) {
          const user = JSON.parse(currentUser);
          const userPosts = parsedPosts.filter(
            (post) => post.userId === user.email
          );
          setPosts(
            userPosts.sort(
              (a, b) =>
                new Date(b.timestamp).getTime() -
                new Date(a.timestamp).getTime()
            )
          );
        }
      }
    };
    loadPosts();
  }, []);

  const handleDelete = async (timestamp: string) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this post?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const storedPosts = await AsyncStorage.getItem("ads");
              if (storedPosts) {
                const parsedPosts: Ad[] = JSON.parse(storedPosts);
                const updatedPosts = parsedPosts.filter(
                  (post) => post.timestamp !== timestamp
                );
                await AsyncStorage.setItem("ads", JSON.stringify(updatedPosts));
                const currentUser = await AsyncStorage.getItem("currentUser");
                let userEmail = "";
                if (currentUser) {
                  const user = JSON.parse(currentUser);
                  userEmail = user.email;
                }
                setPosts(
                  updatedPosts.filter((post) => post.userId === userEmail)
                );
                Alert.alert("Success", "Post deleted successfully.");
              }
            } catch (error) {
              if (error instanceof Error) {
                console.error("Delete error:", error.message);
              } else {
                console.error("Delete error:", error);
              }
              Alert.alert("Error", "Failed to delete post.");
            }
          },
        },
      ]
    );
  };

  const handleEdit = (timestamp: string) => {
    router.push(`/edit-post/${timestamp}` as any); // Placeholder for edit page
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => handleEdit(item.timestamp)}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.timestamp)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Posts</Text>
      <FlatList
        data={posts}
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
    paddingBottom: 60,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E8B57",
    marginBottom: 20,
    textAlign: "center",
  },
  postItem: {
    flexDirection: "row",
    alignItems: "center",
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
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginLeft: 10,
  },
  editButton: {
    backgroundColor: "#2E8B57",
    padding: 5,
    borderRadius: 4,
    marginBottom: 5,
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#D32F2F",
    padding: 5,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  postsList: {
    paddingBottom: 20,
  },
  noPostsText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
});
