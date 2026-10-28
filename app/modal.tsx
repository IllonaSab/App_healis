import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Button } from "../components/ui/Button/Button";
import { Card } from "../components/ui/Card/Card";
import { ScreenContainer } from "../components/ui/ScreenContainer/ScreenContainer";
import { SectionHeader } from "../components/ui/SectionHeader/SectionHeader";

export default function ModalScreen() {
  const router = useRouter();

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <SectionHeader
          surtitle="Information"
          title="Espace ressource"
          description="Prenez ce moment pour respirer et vous recentrer."
        />

        <Card variant="warm" style={styles.card}>
          <Text style={styles.message}>
            Cette modale peut accueillir une note d'écoute, une précision sur l'accompagnement ou un guide rapide d'utilisation.
          </Text>
        </Card>

        <Button
          title="Fermer"
          variant="outline"
          onPress={() => router.back()}
          style={styles.closeButton}
        />
      </View>

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: 24,
  },
  card: {
    marginVertical: 20,
    padding: 16,
  },
  message: {
    fontSize: 13.5,
    color: "#5C4638",
    lineHeight: 20,
    textAlign: "center",
  },
  closeButton: {
    marginTop: 8,
  },
});