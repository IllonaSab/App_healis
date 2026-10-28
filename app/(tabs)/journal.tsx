import { Card } from "@/components/ui/Card";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { WaterTracker } from "@/components/ui/WaterTracker";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const MEALS = [
  { id: "matin", label: "Matin", emoji: "🥐" },
  { id: "midi", label: "Midi", emoji: "🥗" },
  { id: "pause", label: "Pause", emoji: "🍎" },
  { id: "soir", label: "Soir", emoji: "🍲" },
];

const FEELINGS = [
  { id: "serein", label: "Serein", emoji: "😌", color: "#6A8D73", note: "Savourez cette légèreté." },
  { id: "bien", label: "Bien", emoji: "🙂", color: "#8C7A6B", note: "Continuez à votre rythme." },
  { id: "lourd", label: "Lourd", emoji: "😮‍💨", color: "#D98E73", note: "Respirez lentement, le corps digère." },
  { id: "tendu", label: "Tendu", emoji: "😣", color: "#C46851", note: "Relâchez vos épaules, tout va bien." },
];

export default function JournalScreen() {
  const [meal, setMeal] = useState("midi");
  const [feeling, setFeeling] = useState<string | null>(null);
  const [log, setLog] = useState<Record<string, string>>({ matin: "😌" });
  const [water, setWater] = useState(2);

  const activeObj = FEELINGS.find((f) => f.id === feeling);

  const selectFeeling = (item: (typeof FEELINGS)[0]) => {
    setFeeling(item.id);
    setLog((prev) => ({ ...prev, [meal]: item.emoji }));
  };

  return (
    <ScreenContainer scrollable>
      <SectionHeader
        surtitle="Journal de présence"
        title="Comment va votre corps ?"
      />

      {/* 1. Ruban des repas */}
      <View style={styles.ribbon}>
        {MEALS.map((m) => (
          <TouchableOpacity
            key={m.id}
            onPress={() => setMeal(m.id)}
            style={[styles.ribbonTab, meal === m.id && styles.ribbonActive]}
          >
            <Text style={{ fontSize: 13 }}>{m.emoji}</Text>
            <Text style={[styles.ribbonText, meal === m.id && styles.boldText]}>
              {m.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 2. Galets de sensation */}
      <View style={styles.grid}>
        {FEELINGS.map((f) => {
          const isSelected = feeling === f.id;
          return (
            <TouchableOpacity
              key={f.id}
              onPress={() => selectFeeling(f)}
              style={[
                styles.pebble,
                isSelected && {
                  borderColor: f.color,
                  backgroundColor: "#FFFFFF",
                  borderWidth: 2,
                },
              ]}
            >
              <Text style={{ fontSize: 28 }}>{f.emoji}</Text>
              <Text
                style={[
                  styles.pebbleLabel,
                  isSelected && { color: f.color, fontWeight: "700" },
                ]}
              >
                {f.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* 3. Note bienveillante épurée */}
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

      {/* 4. Frise du jour épurée */}
      <Card style={styles.timelineCard}>
        <View style={styles.timelineRow}>
          {MEALS.map((m) => (
            <View key={m.id} style={styles.timelineItem}>
              <View style={[styles.badge, log[m.id] && styles.badgeActive]}>
                <Text style={{ fontSize: 16 }}>{log[m.id] || "·"}</Text>
              </View>
              <Text style={styles.timelineLabel}>{m.label}</Text>
            </View>
          ))}
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
  },
  ribbonTab: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 12,
    gap: 4,
  },
  ribbonActive: {
    backgroundColor: "#FFFFFF",
  },
  ribbonText: {
    fontSize: 12,
    color: "#8C7A6B",
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
  pebble: {
    flex: 1,
    aspectRatio: 0.9,
    backgroundColor: "#FAF6F0",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#EFE8DC",
  },
  pebbleLabel: {
    fontSize: 11.5,
    fontWeight: "600",
    color: "#5C3636",
    marginTop: 4,
  },
  noteCard: {
    padding: 14,
    marginBottom: 16,
  },
  noteText: {
    fontSize: 12.5,
    color: "#5C4638",
    lineHeight: 18,
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
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: "#F7F2EC",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  badgeActive: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#C46851",
  },
  timelineLabel: {
    fontSize: 11,
    color: "#8C7A6B",
    fontWeight: "500",
  },
});