import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { User } from "./types";

export default function Account() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async (): Promise<void> => {
      const userData = await AsyncStorage.getItem("currentUser");
      if (userData) {
        setUser(JSON.parse(userData));
      }
      setIsLoading(false);
    };
    loadUser();
  }, []);

  const handleLogout = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem("currentUser");
      Alert.alert("Logged Out", "You have been logged out successfully", [
        { text: "OK", onPress: () => router.push("/login") },
      ]);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Logout error:", error.message);
      } else {
        console.error("Logout error:", error);
      }
      Alert.alert("Error", "Failed to log out.");
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#2E8B57" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.infoText}>No account found. Please log in.</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.buttonText}>Go to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.profileWrapper}>
          <Image
            source={
              user.profilePic
                ? { uri: user.profilePic }
                : { uri: "https://via.placeholder.com/120" }
            }
            style={styles.profilePic}
            resizeMode="cover"
          />
          <Text style={styles.name}>{user.name}</Text>
        </View>

        <View style={styles.detailsBox}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user.email}</Text>

          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>{user.phone}</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#F5F5F5",
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
  profileWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#2E8B57",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
    color: "#2E8B57",
  },
  detailsBox: {
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#FAFAFA",
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginTop: 5,
  },
  button: {
    backgroundColor: "#D32F2F",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  infoText: {
    fontSize: 16,
    marginBottom: 20,
    color: "#555",
    textAlign: "center",
  },
});
