import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const MEALS = [
  { id: "breakfast", label: "Petit-déj", emoji: "🥐" },
  { id: "lunch", label: "Déjeuner", emoji: "🥗" },
  { id: "snack", label: "Goûter", emoji: "🍎" },
  { id: "dinner", label: "Dîner", emoji: "🍲" },
];

const FEELINGS = [
  { id: "peaceful", label: "Serein", emoji: "✨", color: "#6A8D73" },
  { id: "neutral", label: "Neutre", emoji: "🌱", color: "#8C7A6B" },
  { id: "heavy", label: "Trop lourd", emoji: "☁️", color: "#D98E73" },
  { id: "stressed", label: "Stressé", emoji: "⚡", color: "#C46851" },
];

export default function SimpleLogScreen() {
  const [selectedMeal, setSelectedMeal] = useState("lunch");
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSelectMeal = (id: string) => {
    if (Platform.OS !== "web") Haptics.selectionAsync();
    setSelectedMeal(id);
    setSavedSuccess(false);
  };

  const handleSelectFeeling = (id: string) => {
    if (Platform.OS !== "web") Haptics.selectionAsync();
    setSelectedFeeling(id);
    setSavedSuccess(false);
  };

  const handleSave = () => {
    if (!selectedFeeling) return;

    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    setSavedSuccess(true);
    setTimeout(() => {
      setSelectedFeeling(null);
      setSavedSuccess(false);
    }, 2000);
  };

  return (
    <ScreenContainer>
      <SectionHeader
        surtitle="Mon instant"
        title="Un point sur le moment"
        description="Deux choix simples pour ancrer votre ressenti sans prise de tête."
      />

      {/* 1. Quel repas ? */}
      <Text style={styles.sectionLabel}>C'était pour...</Text>
      <View style={styles.row}>
        {MEALS.map((meal) => {
          const active = selectedMeal === meal.id;
          return (
            <TouchableOpacity
              key={meal.id}
              onPress={() => handleSelectMeal(meal.id)}
              style={[styles.chip, active && styles.chipActive]}
              activeOpacity={0.7}
            >
              <Text style={styles.chipEmoji}>{meal.emoji}</Text>
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {meal.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* 2. Le ressenti global */}
      <Text style={[styles.sectionLabel, { marginTop: 24 }]}>
        Comment vous sentez-vous après ?
      </Text>
      <View style={styles.feelingsGrid}>
        {FEELINGS.map((f) => {
          const active = selectedFeeling === f.id;
          return (
            <TouchableOpacity
              key={f.id}
              onPress={() => handleSelectFeeling(f.id)}
              style={[
                styles.feelingCard,
                active && { borderColor: f.color, backgroundColor: "#FFFFFF" },
              ]}
              activeOpacity={0.7}
            >
              <Text style={styles.feelingEmoji}>{f.emoji}</Text>
              <Text style={[styles.feelingText, active && { color: f.color, fontWeight: "700" }]}>
                {f.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Message de confirmation ou bouton */}
      {savedSuccess ? (
        <Card variant="warm" style={styles.successCard}>
          <Text style={styles.successText}>C'est noté avec douceur ✨</Text>
        </Card>
      ) : (
        <Button
          title="Valider en un clic"
          variant="primary"
          disabled={!selectedFeeling}
          onPress={handleSave}
          style={{ marginTop: 28 }}
        />
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  sectionLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#5C3636",
    marginBottom: 12,
    marginLeft: 2,
  },
  row: {
    flexDirection: "row",
    gap: 8,
  },
  chip: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F4EFEA",
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  chipActive: {
    backgroundColor: "#FFFFFF",
    borderColor: "#C46851",
    shadowColor: "#C46851",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
  },
  chipEmoji: {
    fontSize: 18,
    marginBottom: 4,
  },
  chipText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#8C7A6B",
  },
  chipTextActive: {
    color: "#C46851",
    fontWeight: "700",
  },
  feelingsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  feelingCard: {
    width: "48%",
    backgroundColor: "#FAF6F0",
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#EFE8DC",
  },
  feelingEmoji: {
    fontSize: 26,
    marginBottom: 6,
  },
  feelingText: {
    fontSize: 13,
    color: "#5C4638",
    fontWeight: "600",
  },
  successCard: {
    alignItems: "center",
    paddingVertical: 16,
    marginTop: 24,
  },
  successText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#6A8D73",
  },
});