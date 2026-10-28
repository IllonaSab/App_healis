import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { JournalCard } from "../../components/ui//JournalCard/JournalCard";
import { Button } from "../../components/ui/Button/Button";
import { Card } from "../../components/ui/Card/Card";
import { ScreenContainer } from "../../components/ui/ScreenContainer/ScreenContainer";
import { SectionHeader } from "../../components/ui/SectionHeader/SectionHeader";

const MOODS = [
  { id: "calm", label: "Calme", color: "#6A8D73" },
  { id: "anxious", label: "Anxieux", color: "#C46851" },
  { id: "soothed", label: "Apaisé", color: "#D98E73" },
  { id: "tired", label: "Fatigué", color: "#8C7A6B" },
];

export default function HomeScreen() {
  const router = useRouter();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const handleOpenSOS = () => {
    router.push("/(tabs)/tools");
  };

  return (
    <ScreenContainer>
      <SectionHeader
        surtitle="Healis"
        title="Comment vas-tu aujourd'hui ?"
      />

      <Card style={styles.card}>
        <Text style={styles.cardTitle}>Ton pouls émotionnel</Text>
        <Text style={styles.cardDescription}>
          Sélectionne ton état d'esprit du moment.
        </Text>

        <View style={styles.moodsRow}>
          {MOODS.map((mood) => (
            <View key={mood.id} style={styles.moodItemWrapper}>
              <JournalCard
                label={mood.label}
                isSelected={selectedMood === mood.id}
                activeColor={mood.color}
                onPress={() => setSelectedMood(mood.id)}
                aspectSquare
              />
            </View>
          ))}
        </View>
      </Card>

      <Button
        variant="sos"
        title="Besoin d'apaisement ? (Mode SOS)"
        style={styles.sosButton}
        onPress={handleOpenSOS}
      />

      <Card variant="warm" style={styles.card}>
        <Text style={styles.quoteText}>
          « Le progrès n'est pas linéaire. Prends soin de toi, un pas après l'autre. »
        </Text>
      </Card>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#38231E",
  },
  cardDescription: {
    fontSize: 13,
    color: "#8C7A6B",
    marginTop: 4,
    marginBottom: 16,
    lineHeight: 18,
  },
  moodsRow: {
    flexDirection: "row",
    gap: 8,
  },
  moodItemWrapper: {
    flex: 1,
  },
  sosButton: {
    marginBottom: 16,
  },
  quoteText: {
    fontSize: 13.5,
    fontStyle: "italic",
    color: "#5C3636",
    lineHeight: 20,
    textAlign: "center",
  },
});