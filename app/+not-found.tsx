import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "../components/ui/Button/Button";
import { ScreenContainer } from "../components/ui/ScreenContainer/ScreenContainer";
import { SectionHeader } from "../components/ui/SectionHeader/SectionHeader";

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <SectionHeader
          surtitle="Page introuvable"
          title="Ce chemin n'existe pas"
          description="L'écran demandé est inaccessible ou a été déplacé."
        />

        <Button
          title="Retourner à l'accueil"
          variant="primary"
          onPress={() => router.replace("/(tabs)")}
          style={styles.button}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: 40,
  },
  button: {
    marginTop: 24,
  },
});