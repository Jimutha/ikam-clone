import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { User, Ad } from "./types";

export default function PostAd() {
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [currency, setCurrency] = useState<string>("Rs.");
  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<string | null>(null); // New state for thumbnail
  const [images, setImages] = useState<string[]>([]); // Detailed images (up to 4)
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async (): Promise<void> => {
      const userData = await AsyncStorage.getItem("currentUser");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    };
    loadUser();
  }, []);

  const pickThumbnail = async (): Promise<void> => {
    if (thumbnail) {
      Alert.alert("Error", "Only one thumbnail image allowed.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      setThumbnail(result.assets[0].uri);
    }
  };

  const pickDetailedImages = async (): Promise<void> => {
    if (images.length >= 4) {
      Alert.alert("Error", "Maximum 4 detailed images allowed.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      const newImages = result.assets.map((asset) => asset.uri);
      setImages([...images, ...newImages.slice(0, 4 - images.length)]);
    }
  };

  const handleSubmit = async (): Promise<void> => {
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
        "Please fill all fields, add a thumbnail, and at least one detailed image."
      );
      return;
    }

    if (!user) {
      Alert.alert("Error", "Please log in to post an ad.");
      return;
    }

    try {
      const adData: Ad = {
        title,
        category,
        price,
        currency,
        description,
        location,
        thumbnail,
        images,
        userId: user.email,
        timestamp: new Date().toISOString(),
      };
      const adsData = await AsyncStorage.getItem("ads");
      const ads: Ad[] = adsData ? (JSON.parse(adsData) as Ad[]) : [];
      ads.push(adData);
      await AsyncStorage.setItem("ads", JSON.stringify(ads));
      Alert.alert("Ad Posted", "Your ad has been submitted successfully!");
      setTitle("");
      setCategory("");
      setPrice("");
      setCurrency("Rs.");
      setDescription("");
      setLocation("");
      setThumbnail(null);
      setImages([]);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Post ad error:", error.message);
      } else {
        console.error("Post ad error:", error);
      }
      Alert.alert("Error", "Failed to post ad.");
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.warningText}>
            ⚠️ You must be logged in to post an ad.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/login")}
          >
            <Text style={styles.buttonText}>Go to Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Post Your Ad</Text>

        <TextInput
          placeholder="Ad Title"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />

        <Picker
          selectedValue={category}
          onValueChange={(itemValue: string) => setCategory(itemValue)}
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
            onValueChange={(itemValue: string) => setCurrency(itemValue)}
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
          onValueChange={(itemValue: string) => setLocation(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Country" value="" />
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

        <Text style={styles.subHeading}>Main Image</Text>
        <TouchableOpacity style={styles.button} onPress={pickThumbnail}>
          <Text style={styles.buttonText}>📷 Upload Thumbnail (Max 1)</Text>
        </TouchableOpacity>
        {thumbnail && (
          <Image source={{ uri: thumbnail }} style={styles.thumbnailImage} />
        )}

        <Text style={styles.subHeading}>Detailed Images</Text>
        <TouchableOpacity style={styles.button} onPress={pickDetailedImages}>
          <Text style={styles.buttonText}>
            📷 Upload Detailed Images (Max 4)
          </Text>
        </TouchableOpacity>

        <ScrollView horizontal style={styles.imageScroll}>
          {images.map((img, idx) => (
            <Image key={idx} source={{ uri: img }} style={styles.image} />
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit Ad</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F5F5F5",
    paddingBottom: 60,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E8B57",
    marginBottom: 20,
    textAlign: "center",
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
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
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  thumbnailImage: {
    width: 150,
    height: 150,
    marginBottom: 15,
    borderRadius: 8,
    alignSelf: "center",
  },
  imageScroll: {
    marginBottom: 15,
    maxHeight: 120,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  submitButton: {
    backgroundColor: "#006400",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  warningText: {
    fontSize: 18,
    color: "#D32F2F",
    textAlign: "center",
    marginBottom: 20,
  },
});
