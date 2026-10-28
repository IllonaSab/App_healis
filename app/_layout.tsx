import { Stack } from "expo-router";
import "../global.css"; // ou le chemin vers ton fichier Tailwind CSS

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}