import { ScreenContainer } from "@/components/ui/ScreenContainer";
import * as Haptics from "expo-haptics";
import React, { useMemo, useState } from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface FeelingOption {
  id: string;
  emoji: string;
  text: string;
  color: string;
  note: string;
}

const MEALS = [
  { id: "breakfast", label: "Matin", emoji: "🥐" },
  { id: "lunch", label: "Midi", emoji: "🥗" },
  { id: "snack", label: "Pause", emoji: "🍎" },
  { id: "dinner", label: "Soir", emoji: "🍲" },
];

const FEELINGS: FeelingOption[] = [
  {
    id: "peaceful",
    emoji: "😌",
    text: "Serein",
    color: "#6A8D73",
    note: "Un instant de calme précieux. Savourez cette clarté.",
  },
  {
    id: "fine",
    emoji: "🙂",
    text: "Bien",
    color: "#8C7A6B",
    note: "Votre équilibre se construit pas à pas, continuez à votre rythme.",
  },
  {
    id: "full",
    emoji: "😮‍💨",
    text: "Lourd",
    color: "#D98E73",
    note: "Prenez quelques respirations lentes. Votre corps fait son travail.",
  },
  {
    id: "discomfort",
    emoji: "😣",
    text: "Tendu",
    color: "#C46851",
    note: "Relâchez vos épaules et votre mâchoire. Vous êtes en sécurité ici.",
  },
];

export default function OrganicJournalScreen() {
  const defaultMealId = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 11) return "breakfast";
    if (hour < 15) return "lunch";
    if (hour < 18) return "snack";
    return "dinner";
  }, []);

  const [selectedMeal, setSelectedMeal] = useState(defaultMealId);
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  // Historique fictif pour peupler le résumé de la journée
  const [dayHistory, setDayHistory] = useState<Record<string, string>>({
    breakfast: "😌",
  });

  const activeFeelingObj = FEELINGS.find((f) => f.id === selectedFeeling);

  const handleSelectFeeling = (id: string) => {
    if (Platform.OS !== "web") {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } catch {}
    }
    setSelectedFeeling(id);
    setIsSaved(true);

    const match = FEELINGS.find((f) => f.id === id);
    if (match) {
      setDayHistory((prev) => ({ ...prev, [selectedMeal]: match.emoji }));
    }
  };

  return (
    <ScreenContainer scrollable>
      
      {/* 2. Titre et ruban du repas */}
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Déposer un instant</Text>
        <Text style={styles.sectionSubtitle}>Choisissez le moment</Text>
      </View>

      <View style={styles.ribbonContainer}>
        {MEALS.map((meal) => {
          const active = selectedMeal === meal.id;
          const loggedEmoji = dayHistory[meal.id];

          return (
            <TouchableOpacity
              key={meal.id}
              onPress={() => {
                if (Platform.OS !== "web") {
                  try {
                    Haptics.selectionAsync();
                  } catch {}
                }
                setSelectedMeal(meal.id);
                setIsSaved(false);
              }}
              style={[styles.ribbonItem, active && styles.ribbonItemActive]}
              activeOpacity={0.8}
            >
              <Text style={styles.ribbonEmoji}>{meal.emoji}</Text>
              <Text style={[styles.ribbonText, active && styles.ribbonTextActive]}>
                {meal.label}
              </Text>
              {loggedEmoji ? (
                <View style={styles.loggedDot}>
                  <Text style={{ fontSize: 9 }}>{loggedEmoji}</Text>
                </View>
              ) : null}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* 3. Les galets de sensation */}
      <Text style={styles.promptLabel}>Votre sensation corporelle</Text>
      <View style={styles.pebblesGrid}>
        {FEELINGS.map((item) => {
          const isSelected = selectedFeeling === item.id;
          return (
            <Pressable
              key={item.id}
              onPress={() => handleSelectFeeling(item.id)}
              style={({ pressed }) => [
                styles.pebble,
                isSelected && {
                  backgroundColor: "#FFFFFF",
                  borderColor: item.color,
                  borderWidth: 2,
                  shadowColor: item.color,
                  shadowOffset: { width: 0, height: 6 },
                  shadowOpacity: 0.2,
                  shadowRadius: 10,
                  elevation: 3,
                  transform: [{ scale: 1.04 }],
                },
                pressed && { transform: [{ scale: 0.97 }] },
              ]}
            >
              <Text style={styles.pebbleEmoji}>{item.emoji}</Text>
              <Text
                style={[
                  styles.pebbleText,
                  isSelected && { color: item.color, fontWeight: "700" },
                ]}
              >
                {item.text}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* 4. Réaction immédiate ou invite */}
      <View style={styles.feedbackContainer}>
        {activeFeelingObj ? (
          <View
            style={[
              styles.whisperCard,
              { borderLeftColor: activeFeelingObj.color },
            ]}
          >
            <View style={styles.whisperHeader}>
              <Text style={styles.whisperTitle}>Écoute bienveillante</Text>
            </View>
            <Text style={styles.whisperText}>{activeFeelingObj.note}</Text>
            {isSaved ? (
              <View style={styles.savedPill}>
                <Text style={styles.savedText}>✓ Enregistré dans votre journée</Text>
              </View>
            ) : null}
          </View>
        ) : (
          <View style={styles.idleCard}>
            <Text style={styles.idleText}>
              Touchez une pastille pour écouter votre corps sans obligation de justification.
            </Text>
          </View>
        )}
      </View>

      {/* 5. Le fil d'Ariane de la journée (évite le vide en bas) */}
      <View style={styles.daySummaryBox}>
        <Text style={styles.summaryTitle}>Votre fil de présence aujourd'hui</Text>
        <View style={styles.timelineRow}>
          {MEALS.map((m) => {
            const hasEntry = !!dayHistory[m.id];
            return (
              <View key={m.id} style={styles.timelineItem}>
                <View
                  style={[
                    styles.timelineBadge,
                    hasEntry && styles.timelineBadgeDone,
                  ]}
                >
                  <Text style={styles.timelineEmoji}>
                    {dayHistory[m.id] || "·"}
                  </Text>
                </View>
                <Text style={styles.timelineLabel}>{m.label}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  sectionHeaderRow: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#38231E",
    letterSpacing: -0.3,
  },
  sectionSubtitle: {
    fontSize: 12.5,
    color: "#8C7A6B",
    marginTop: 2,
  },
  ribbonContainer: {
    flexDirection: "row",
    backgroundColor: "#F2ECE4",
    padding: 4,
    borderRadius: 20,
    marginBottom: 22,
  },
  ribbonItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 9,
    borderRadius: 16,
    gap: 5,
    position: "relative",
  },
  ribbonItemActive: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#38231E",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 2,
  },
  ribbonEmoji: {
    fontSize: 13,
  },
  ribbonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#8C7A6B",
  },
  ribbonTextActive: {
    color: "#38231E",
    fontWeight: "700",
  },
  loggedDot: {
    position: "absolute",
    top: 3,
    right: 4,
  },
  promptLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#5C3636",
    marginBottom: 10,
    marginLeft: 2,
  },
  pebblesGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 18,
  },
  pebble: {
    flex: 1,
    aspectRatio: 0.95,
    backgroundColor: "#FDFBF9",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#EDE5DB",
    paddingVertical: 8,
  },
  pebbleEmoji: {
    fontSize: 26,
    marginBottom: 4,
  },
  pebbleText: {
    fontSize: 11.5,
    fontWeight: "600",
    color: "#5C3636",
    letterSpacing: -0.1,
  },
  feedbackContainer: {
    marginBottom: 20,
  },
  whisperCard: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 18,
    borderLeftWidth: 4,
    shadowColor: "#38231E",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  whisperHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  sparkleIcon: {
    fontSize: 13,
  },
  whisperTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#38231E",
  },
  whisperText: {
    fontSize: 12.5,
    color: "#5C4638",
    lineHeight: 18,
  },
  savedPill: {
    alignSelf: "flex-start",
    backgroundColor: "#EFF6F0",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginTop: 8,
  },
  savedText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#5B8365",
  },
  idleCard: {
    backgroundColor: "#F9F6F1",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#EFE8DC",
    alignItems: "center",
  },
  idleText: {
    fontSize: 12,
    color: "#A89A8F",
    fontStyle: "italic",
    textAlign: "center",
    lineHeight: 17,
  },
  daySummaryBox: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#EFE8DC",
    marginBottom: 24,
  },
  summaryTitle: {
    fontSize: 12.5,
    fontWeight: "700",
    color: "#38231E",
    marginBottom: 14,
  },
  timelineRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timelineItem: {
    alignItems: "center",
    flex: 1,
  },
  timelineBadge: {
    width: 36,
    height: 36,
    borderRadius: 14,
    backgroundColor: "#F7F2EC",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
    borderWidth: 1,
    borderColor: "#EADBCE",
  },
  timelineBadgeDone: {
    backgroundColor: "#FFFFFF",
    borderColor: "#C46851",
  },
  timelineEmoji: {
    fontSize: 16,
    color: "#A89A8F",
  },
  timelineLabel: {
    fontSize: 11,
    color: "#8C7A6B",
    fontWeight: "600",
  },
});