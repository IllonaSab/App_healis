import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";

export default function ModalScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-cream-50 p-4">
      <Text className="text-lg font-bold text-earth-heading">Fenêtre d'information</Text>
      <StatusBar style="auto" />
    </View>
  );
}