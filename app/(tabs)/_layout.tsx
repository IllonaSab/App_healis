import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#FAF5EF",
          borderTopColor: "#EDE5DB",
        },
        tabBarActiveTintColor: "#C46851",
        tabBarInactiveTintColor: "#8C7A6B",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Accueil",
          // tabBarIcon: ...
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          title: "Journal",
          // tabBarIcon: ...
        }}
      />
      <Tabs.Screen
        name="tools"
        options={{
          title: "Outils",
          // tabBarIcon: ...
        }}
      />
      
      {/* Vérifie que cet écran est bien présent ici : */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          // tabBarIcon: ...
        }}
      />

      {/* IMPORTANT : Si Expo Router essaie d'afficher les fichiers .styles comme des onglets */}
      <Tabs.Screen
        name="profile.styles"
        options={{
          href: null, // Masque le fichier de style s'il est détecté comme route
        }}
      />
    </Tabs>
  );
}