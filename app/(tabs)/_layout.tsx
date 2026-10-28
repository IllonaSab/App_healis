import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#C46851",
        tabBarInactiveTintColor: "#9B8A85",
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Accueil",
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.activeIndicator : styles.inactiveIndicator} />
          ),
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          title: "Journal",
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.activeIndicator : styles.inactiveIndicator} />
          ),
        }}
      />
      <Tabs.Screen
        name="tools"
        options={{
          title: "Outils",
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.activeIndicator : styles.inactiveIndicator} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.activeIndicator : styles.inactiveIndicator} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#FAF5EF",
    borderTopColor: "#EADBCE",
    borderTopWidth: 1,
    elevation: 0,
    height: 64,
    paddingBottom: 14,
    paddingTop: 8,
    paddingHorizontal: 12,
  },
  tabBarLabel: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: -0.2,
  },
  activeIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#C46851",
    marginTop: 4,
  },
  inactiveIndicator: {
    width: 6,
    height: 6,
    marginTop: 4,
  },
});