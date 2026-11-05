import { Tabs } from "expo-router";
import React from "react";
import { Image, StyleSheet } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: "#C46851",
        tabBarInactiveTintColor: "#8C7A6B",
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Accueil",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/images/accueil.png")}
              style={[
                styles.tabIcon,
                { opacity: focused ? 1 : 0.4 },
              ]}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="journal"
        options={{
          title: "Journal",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/images/journal.png")}
              style={[
                styles.tabIcon,
                { opacity: focused ? 1 : 0.4 },
              ]}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="tools"
        options={{
          title: "Outils",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/images/outils.png")}
              style={[
                styles.tabIcon,
                { opacity: focused ? 1 : 0.4 },
              ]}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/images/profil.png")}
              style={[
                styles.tabIcon,
                { opacity: focused ? 1 : 0.4 },
              ]}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    borderTopColor: "#EDE5DB",
    borderTopWidth: 1,
    height: 65,
    paddingTop: 2,
    paddingBottom: 8,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: "500",
    marginTop: 2,
  },
  tabIcon: {
    width: 35,
    height: 35,
  },
});