import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "../../components/ui/Button/Button";
import { Card } from "../../components/ui/Card/Card";
import { ScreenContainer } from "../../components/ui/ScreenContainer/ScreenContainer";
import { SectionHeader } from "../../components/ui/SectionHeader/SectionHeader";

const MOODS = [
  {
    id: "calm",
    label: "Calme",
    color: "#6A8D73",
    image: require("../../assets/images/calme.png"),
  },
  {
    id: "anxious",
    label: "Anxieux",
    color: "#C46851",
    image: require("../../assets/images/anxieux.png"),
  },
  {
    id: "soothed",
    label: "Apaisé",
    color: "#D98E73",
    image: require("../../assets/images/apaisé.png"),
  },
  {
    id: "tired",
    label: "Fatigué",
    color: "#8C7A6B",
    image: require("../../assets/images/fatigué.png"),
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const handleOpenSOS = () => {
    router.push("/(tabs)/tools");
  };

  return (
    <ScreenContainer scrollable>
      {/* En-tête standard */}
      <SectionHeader
        surtitle="Healis"
        title="Comment vas-tu aujourd'hui ?"
        description="Prends un instant pour écouter ton ressenti."
      />

      {/* Cartes d'humeur avec illustrations intégrées */}
      <Card style={styles.card}>
        <Text style={styles.cardTitle}>Ton pouls émotionnel</Text>
        <Text style={styles.cardDescription}>
          Sélectionne ton état d'esprit du moment.
        </Text>

        <View style={styles.moodsRow}>
          {MOODS.map((mood) => {
            const isSelected = selectedMood === mood.id;
            return (
              <TouchableOpacity
                key={mood.id}
                activeOpacity={0.8}
                onPress={() => setSelectedMood(mood.id)}
                style={[
                  styles.moodCard,
                  isSelected && {
                    borderColor: mood.color,
                    backgroundColor: `${mood.color}15`,
                  },
                ]}
              >
                <View style={styles.imageContainer}>
                  <Image
                    source={mood.image}
                    style={styles.moodImage}
                    resizeMode="contain"
                  />
                </View>

                <Text
                  style={[
                    styles.moodLabel,
                    isSelected && { color: mood.color, fontWeight: "700" },
                  ]}
                >
                  {mood.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Card>

      {/* Mode SOS */}
      <Button
        variant="sos"
        title="Besoin d'apaisement ? (Mode SOS)"
        style={styles.sosButton}
        onPress={handleOpenSOS}
      />

      {/* Citation bienveillante */}
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
  moodCard: {
    flex: 1,
    aspectRatio: 0.85,
    backgroundColor: "#FDFCFA",
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#EFE8E1",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  imageContainer: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  moodImage: {
    width: "100%",
    height: "100%",
  },
  moodLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#5C3636",
    textAlign: "center",
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