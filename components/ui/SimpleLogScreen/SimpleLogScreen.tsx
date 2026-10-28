import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "../Button/Button";
import { Card } from "../Card/Card";
import { JournalCard } from "../JournalCard/JournalCard";
import { ScreenContainer } from "../ScreenContainer/ScreenContainer";
import { SectionHeader } from "../SectionHeader/SectionHeader";
import { styles } from "./SimpleLogScreen.styles";

const MEALS = [
  { id: "breakfast", label: "Petit-déj" },
  { id: "lunch", label: "Déjeuner" },
  { id: "snack", label: "Goûter" },
  { id: "dinner", label: "Dîner" },
];

const FEELINGS = [
  { id: "peaceful", label: "Serein", color: "#6A8D73" },
  { id: "neutral", label: "Neutre", color: "#8C7A6B" },
  { id: "heavy", label: "Trop lourd", color: "#D98E73" },
  { id: "stressed", label: "Stressé", color: "#C46851" },
];

export default function SimpleLogScreen() {
  const [selectedMeal, setSelectedMeal] = useState("lunch");
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSelectMeal = (id: string) => {
    if (Platform.OS !== "web") {
      try {
        Haptics.selectionAsync();
      } catch {}
    }
    setSelectedMeal(id);
    setSavedSuccess(false);
  };

  const handleSelectFeeling = (id: string) => {
    if (Platform.OS !== "web") {
      try {
        Haptics.selectionAsync();
      } catch {}
    }
    setSelectedFeeling(id);
    setSavedSuccess(false);
  };

  const handleSave = () => {
    if (!selectedFeeling) return;

    if (Platform.OS !== "web") {
      try {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } catch {}
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
        description="Deux choix simples pour ancrer votre ressenti sans pression."
      />

      {/* 1. Quel moment / repas ? */}
      <Text style={styles.sectionLabel}>C'était pour...</Text>
      <View style={styles.mealsRow}>
        {MEALS.map((meal) => {
          const active = selectedMeal === meal.id;
          return (
            <TouchableOpacity
              key={meal.id}
              onPress={() => handleSelectMeal(meal.id)}
              style={[styles.chip, active && styles.chipActive]}
              activeOpacity={0.7}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {meal.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* 2. Le ressenti global avec JournalCard */}
      <Text style={[styles.sectionLabel, { marginTop: 24 }]}>
        Comment vous sentez-vous après ?
      </Text>
      <View style={styles.feelingsGrid}>
        {FEELINGS.map((f) => (
          <View key={f.id} style={styles.feelingItemWrapper}>
            <JournalCard
              label={f.label}
              isSelected={selectedFeeling === f.id}
              activeColor={f.color}
              onPress={() => handleSelectFeeling(f.id)}
              aspectSquare
            />
          </View>
        ))}
      </View>

      {/* 3. Confirmation ou validation */}
      {savedSuccess ? (
        <Card variant="warm" style={styles.successCard}>
          <Text style={styles.successText}>Enregistré avec douceur</Text>
        </Card>
      ) : (
        <Button
          title="Valider en un clic"
          variant="primary"
          disabled={!selectedFeeling}
          onPress={handleSave}
          style={styles.submitButton}
        />
      )}
    </ScreenContainer>
  );
}