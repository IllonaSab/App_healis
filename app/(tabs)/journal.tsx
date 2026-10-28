import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { JournalCard } from "../../components/ui//JournalCard/JournalCard";
import { Card } from "../../components/ui/Card/Card";
import { ScreenContainer } from "../../components/ui/ScreenContainer/ScreenContainer";
import { SectionHeader } from "../../components/ui/SectionHeader/SectionHeader";
import { WaterTracker } from "../../components/ui/WaterTracker/WaterTracker";

interface Meal {
  id: string;
  label: string;
  shortLabel: string;
}

interface Feeling {
  id: string;
  label: string;
  color: string;
  note: string;
}

const MEALS: Meal[] = [
  { id: "matin", label: "Matin", shortLabel: "M" },
  { id: "midi", label: "Midi", shortLabel: "M" },
  { id: "pause", label: "Pause", shortLabel: "P" },
  { id: "soir", label: "Soir", shortLabel: "S" },
];

const FEELINGS: Feeling[] = [
  { id: "serein", label: "Serein", color: "#6A8D73", note: "Savourez cette légèreté." },
  { id: "bien", label: "Bien", color: "#8C7A6B", note: "Continuez à votre rythme." },
  { id: "lourd", label: "Lourd", color: "#D98E73", note: "Respirez lentement, le corps digère." },
  { id: "tendu", label: "Tendu", color: "#C46851", note: "Relâchez vos épaules, tout va bien." },
];

export default function JournalScreen() {
  const [meal, setMeal] = useState<string>("midi");
  const [feeling, setFeeling] = useState<string | null>(null);
  const [log, setLog] = useState<Record<string, string>>({ matin: "serein" });
  const [water, setWater] = useState<number>(2);

  const activeObj = FEELINGS.find((f) => f.id === feeling);

  const selectFeeling = (item: Feeling) => {
    setFeeling(item.id);
    setLog((prev) => ({ ...prev, [meal]: item.id }));
  };

  const getFeelingColor = (feelingId?: string) => {
    return FEELINGS.find((f) => f.id === feelingId)?.color;
  };

  return (
    <ScreenContainer scrollable>
      <SectionHeader
        surtitle="Journal de présence"
        title="Comment va votre corps ?"
      />

      {/* 1. Ruban des repas (100 % typographique) */}
      <View style={styles.ribbon}>
        {MEALS.map((m) => {
          const isActive = meal === m.id;
          return (
            <TouchableOpacity
              key={m.id}
              onPress={() => setMeal(m.id)}
              style={[styles.ribbonTab, isActive && styles.ribbonActive]}
              activeOpacity={0.7}
            >
              <Text style={[styles.ribbonText, isActive && styles.boldText]}>
                {m.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* 2. Galets de sensation réutilisant JournalCard */}
      <View style={styles.grid}>
        {FEELINGS.map((f) => (
          <View key={f.id} style={styles.feelingCol}>
            <JournalCard
              label={f.label}
              isSelected={feeling === f.id}
              activeColor={f.color}
              onPress={() => selectFeeling(f)}
              aspectSquare
            />
          </View>
        ))}
      </View>

      {/* 3. Note d'écoute bienveillante */}
      <Card
        style={[
          styles.noteCard,
          {
            borderLeftColor: activeObj?.color || "#E8E0D7",
            borderLeftWidth: 4,
          },
        ]}
      >
        <Text style={styles.noteText}>
          {activeObj ? activeObj.note : "Touchez un ressenti pour écouter votre sensation."}
        </Text>
      </Card>

      {/* 4. Frise du jour épurée sans émojis */}
      <Card style={styles.timelineCard}>
        <View style={styles.timelineRow}>
          {MEALS.map((m) => {
            const loggedFeelingId = log[m.id];
            const color = getFeelingColor(loggedFeelingId);

            return (
              <View key={m.id} style={styles.timelineItem}>
                <View
                  style={[
                    styles.badge,
                    loggedFeelingId && styles.badgeActive,
                    color ? { borderColor: color } : null,
                  ]}
                >
                  <Text
                    style={[
                      styles.badgeText,
                      color ? { color, fontWeight: "700" } : null,
                    ]}
                  >
                    {loggedFeelingId ? "✓" : "·"}
                  </Text>
                </View>
                <Text style={styles.timelineLabel}>{m.label}</Text>
              </View>
            );
          })}
        </View>
      </Card>

      {/* 5. Tracker eau modulaire */}
      <WaterTracker glasses={water} onChange={setWater} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  ribbon: {
    flexDirection: "row",
    backgroundColor: "#F2ECE4",
    padding: 4,
    borderRadius: 16,
    marginVertical: 16,
    gap: 4,
  },
  ribbonTab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 12,
  },
  ribbonActive: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#C46851",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  ribbonText: {
    fontSize: 12.5,
    color: "#8C7A6B",
    fontWeight: "600",
  },
  boldText: {
    color: "#38231E",
    fontWeight: "700",
  },
  grid: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  feelingCol: {
    flex: 1,
  },
  noteCard: {
    padding: 14,
    marginBottom: 16,
  },
  noteText: {
    fontSize: 13,
    color: "#5C4638",
    lineHeight: 19,
  },
  timelineCard: {
    padding: 14,
    marginBottom: 16,
  },
  timelineRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timelineItem: {
    alignItems: "center",
    flex: 1,
  },
  badge: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: "#F7F2EC",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  badgeActive: {
    backgroundColor: "#FFFFFF",
  },
  badgeText: {
    fontSize: 13,
    color: "#A89A8F",
    fontWeight: "600",
  },
  timelineLabel: {
    fontSize: 11,
    color: "#8C7A6B",
    fontWeight: "500",
  },
});