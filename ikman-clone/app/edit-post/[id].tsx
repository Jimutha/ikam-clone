import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ad } from "../types";

export default function EditPost() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [post, setPost] = useState<Ad | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("Rs.");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const loadPost = async () => {
      const storedPosts = await AsyncStorage.getItem("ads");
      if (storedPosts) {
        const parsedPosts: Ad[] = JSON.parse(storedPosts);
        const foundPost = parsedPosts.find((p) => p.timestamp === id);
        if (foundPost) {
          setPost(foundPost);
          setTitle(foundPost.title);
          setCategory(foundPost.category);
          setPrice(foundPost.price);
          setCurrency(foundPost.currency);
          setDescription(foundPost.description);
          setLocation(foundPost.location);
          setThumbnail(foundPost.thumbnail);
          setImages(foundPost.images);
        }
      }
    };
    loadPost();
  }, [id]);

  const handleSave = async () => {
    if (
      !title ||
      !category ||
      !price ||
      !description ||
      !location ||
      !thumbnail ||
      images.length === 0
    ) {
      Alert.alert(
        "Error",
        "Please fill all fields and provide a thumbnail and at least one image."
      );
      return;
    }
    try {
      const storedPosts = await AsyncStorage.getItem("ads");
      if (storedPosts) {
        const parsedPosts: Ad[] = JSON.parse(storedPosts);
        const updatedPosts = parsedPosts.map((post) =>
          post.timestamp === id
            ? {
                ...post,
                title,
                category,
                price,
                currency,
                description,
                location,
                thumbnail,
                images,
              }
            : post
        );
        await AsyncStorage.setItem("ads", JSON.stringify(updatedPosts));
        Alert.alert("Success", "Post updated successfully!");
        router.push("/my-posts");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to update post.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Edit Post</Text>
      <TextInput
        placeholder="Ad Title"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <Picker
        selectedValue={category}
        onValueChange={setCategory}
        style={styles.picker}
      >
        <Picker.Item label="Select Category" value="" />
        <Picker.Item label="Vehicles" value="vehicles" />
        <Picker.Item label="Property" value="property" />
        <Picker.Item label="Electronics" value="electronics" />
        <Picker.Item label="Jobs" value="jobs" />
        <Picker.Item label="Services" value="services" />
      </Picker>
      <View style={styles.currencyContainer}>
        <Picker
          selectedValue={currency}
          onValueChange={setCurrency}
          style={styles.currencyPicker}
        >
          <Picker.Item label="Rs." value="Rs." />
          <Picker.Item label="$" value="$" />
        </Picker>
        <TextInput
          placeholder="Price"
          style={styles.priceInput}
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
      </View>
      <TextInput
        placeholder="Description"
        style={[styles.input, { height: 120 }]}
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Picker
        selectedValue={location}
        onValueChange={setLocation}
        style={styles.picker}
      >
        <Picker.Item label="Select Country" value="" />
        {/* Add country list similar to post-ad.tsx */}
      </Picker>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Upload Thumbnail</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Upload Detailed Images</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.submitButton} onPress={handleSave}>
        <Text style={styles.submitText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#F5F5F5", paddingBottom: 60 },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E8B57",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#FAFAFA",
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#FAFAFA",
  },
  currencyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  currencyPicker: {
    width: 80,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: "#FAFAFA",
  },
  priceInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#FAFAFA",
  },
  button: {
    backgroundColor: "#2E8B57",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  submitButton: {
    backgroundColor: "#006400",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  submitText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
