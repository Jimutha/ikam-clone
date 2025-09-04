import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import { Ad } from "../types";

export default function PostDetail() {
  const { id } = useLocalSearchParams();
  const [post, setPost] = useState<Ad | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      const storedPosts = await AsyncStorage.getItem("ads");
      if (storedPosts) {
        const parsedPosts: Ad[] = JSON.parse(storedPosts);
        const foundPost = parsedPosts.find((p) => p.timestamp === id);
        if (foundPost) {
          setPost(foundPost);
        }
      }
    };
    loadPost();
  }, [id]);

  const handleContactSeller = () => {
    if (post?.userId) {
      Alert.alert(
        "Contact Seller",
        `Contact: ${post.userId} (Email or Phone)\nPlease reach out to discuss this ad.`,
        [{ text: "OK", onPress: () => console.log("Contact attempt logged") }]
      );
    } else {
      Alert.alert("Error", "Seller information not available.");
    }
  };

  if (!post) {
    return (
      <View style={styles.container}>
        <Text style={styles.noPostText}>Post not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>{post.title}</Text>
      <Image
        source={{ uri: post.thumbnail || "https://via.placeholder.com/200" }}
        style={styles.thumbnail}
      />
      <Text style={styles.detail}>Category: {post.category}</Text>
      <Text style={styles.detail}>
        Price: {post.currency} {post.price}
      </Text>
      <Text style={styles.detail}>Location: {post.location}</Text>
      <Text style={styles.detail}>Description: {post.description}</Text>
      <Text style={styles.subHeading}>Detailed Images</Text>
      <ScrollView horizontal style={styles.imageScroll}>
        {post.images.map((img, idx) => (
          <Image key={idx} source={{ uri: img }} style={styles.detailedImage} />
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.contactButton}
        onPress={handleContactSeller}
      >
        <Text style={styles.contactText}>Contact Seller</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
    paddingBottom: 60, // Match footer height
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E8B57",
    marginBottom: 15,
    textAlign: "center",
  },
  thumbnail: {
    width: 200,
    height: 200,
    borderRadius: 8,
    alignSelf: "center",
    marginBottom: 15,
  },
  detail: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    marginBottom: 10,
  },
  imageScroll: {
    maxHeight: 200,
  },
  detailedImage: {
    width: 150,
    height: 150,
    marginRight: 10,
    borderRadius: 8,
  },
  noPostText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
  contactButton: {
    backgroundColor: "#2E8B57",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  contactText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
