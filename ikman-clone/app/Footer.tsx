import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter, useSegments } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Footer() {
  const router = useRouter();
  const segments = useSegments();
  const currentRoute = "/" + segments.join("/");

  const navigateTo = (route: string) => {
    router.push(route as any);
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={[styles.tab, currentRoute === "/" && styles.activeTab]}
        onPress={() => navigateTo("/")}
      >
        <Ionicons
          name="home"
          size={20}
          color={currentRoute === "/" ? "#2E8B57" : "#666"}
        />
        <Text
          style={[styles.tabText, currentRoute === "/" && styles.activeText]}
        >
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, currentRoute === "/search" && styles.activeTab]}
        onPress={() => navigateTo("/search")}
      >
        <Ionicons
          name="search"
          size={20}
          color={currentRoute === "/search" ? "#2E8B57" : "#666"}
        />
        <Text
          style={[
            styles.tabText,
            currentRoute === "/search" && styles.activeText,
          ]}
        >
          Search
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, currentRoute === "/post-ad" && styles.activeTab]}
        onPress={() => navigateTo("/post-ad")}
      >
        <Ionicons
          name="add-circle"
          size={20}
          color={currentRoute === "/post-ad" ? "#2E8B57" : "#666"}
        />
        <Text
          style={[
            styles.tabText,
            currentRoute === "/post-ad" && styles.activeText,
          ]}
        >
          Post Ad
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, currentRoute === "/categories" && styles.activeTab]}
        onPress={() => navigateTo("/categories")}
      >
        <Ionicons
          name="grid"
          size={20}
          color={currentRoute === "/categories" ? "#2E8B57" : "#666"}
        />
        <Text
          style={[
            styles.tabText,
            currentRoute === "/categories" && styles.activeText,
          ]}
        >
          Categories
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, currentRoute === "/account" && styles.activeTab]}
        onPress={() => navigateTo("/account")}
      >
        <Ionicons
          name="person"
          size={20}
          color={currentRoute === "/account" ? "#2E8B57" : "#666"}
        />
        <Text
          style={[
            styles.tabText,
            currentRoute === "/account" && styles.activeText,
          ]}
        >
          Account
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  tab: {
    alignItems: "center",
  },
  activeTab: {
    borderTopWidth: 2,
    borderTopColor: "#2E8B57",
  },
  tabText: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  activeText: {
    color: "#2E8B57",
    fontWeight: "bold",
  },
});
