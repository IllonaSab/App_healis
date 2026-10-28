import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { WaterTracker } from "@/components/ui/WaterTracker"; // 1. L'IMPORT EN HAUT
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

  // 2. LA VARIABLE D'ÉTAT DANS LE COMPOSANT
  const [water, setWater] = useState(2);

  const activeObj = FEELINGS.find((f) => f.id === feeling);

  const selectFeeling = (item: typeof FEELINGS[0]) => {
    setFeeling(item.id);
    setLog((prev) => ({ ...prev, [meal]: item.emoji }));
  };

  return (
    <ScreenContainer scrollable>
      <Text style={styles.title}>Comment va votre corps ?</Text>

      {/* Ruban des repas */}
      <View style={styles.ribbon}>
        {MEALS.map((m) => (
          <TouchableOpacity
            key={m.id}
            onPress={() => setMeal(m.id)}
            style={[styles.ribbonTab, meal === m.id && styles.ribbonActive]}
          >
            <Text style={{ fontSize: 13 }}>{m.emoji}</Text>
            <Text style={[styles.ribbonText, meal === m.id && styles.boldText]}>{m.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Galets de ressenti */}
      <View style={styles.grid}>
        {FEELINGS.map((f) => {
          const isSelected = feeling === f.id;
          return (
            <TouchableOpacity
              key={f.id}
              onPress={() => selectFeeling(f)}
              style={[
                styles.pebble,
                isSelected && { borderColor: f.color, backgroundColor: "#FFF", borderWidth: 2 },
              ]}
            >
              <Text style={{ fontSize: 28 }}>{f.emoji}</Text>
              <Text style={[styles.pebbleLabel, isSelected && { color: f.color, fontWeight: "700" }]}>
                {f.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Note d'écoute sans étoiles */}
      <View style={[styles.card, { borderLeftColor: activeObj?.color || "#E8E0D7" }]}>
        <Text style={styles.noteText}>
          {activeObj ? activeObj.note : "Touchez un ressenti pour écouter votre sensation."}
        </Text>
      </View>

    

      {/* Frise du jour */}
      <View style={styles.timeline}>
        {MEALS.map((m) => (
          <View key={m.id} style={styles.timelineItem}>
            <View style={[styles.badge, log[m.id] && styles.badgeActive]}>
              <Text style={{ fontSize: 16 }}>{log[m.id] || "·"}</Text>
            </View>
            <Text style={styles.timelineLabel}>{m.label}</Text>
          </View>
        ))}
      </View>
        {/* 3. LE TRACKER D'EAU PLACÉ ICI DANS LE RENDU */}
      <WaterTracker glasses={water} onChange={setWater} />
    </ScreenContainer>
    
  );
}

const styles = StyleSheet.create({
  title:
  {
    fontSize: 22,
    fontWeight: "700",
    color: "#38231E",
    marginVertical: 14
  },
  ribbon: {
    flexDirection: "row",
    backgroundColor: "#F2ECE4",
    padding: 4,
    borderRadius: 16,
    marginBottom: 20
  },
  ribbonTab: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 12,
    gap: 4
  },
  ribbonActive: {
    backgroundColor: "#FFF"
  },
  ribbonText: {
    fontSize: 12,
    color: "#8C7A6B"
  },
  boldText: {
    color: "#38231E",
    fontWeight: "700"
  },
  grid: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20
  },
  pebble: {
    flex: 1,
    aspectRatio: 0.9,
    backgroundColor: "#FAF6F0",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#EFE8DC"
  },
  pebbleLabel: {
    fontSize: 11.5,
    fontWeight: "600",
    color: "#5C3636",
    marginTop: 4
  },
  card: {
    backgroundColor: "#FFF",
    padding: 14,
    borderRadius: 16,
    borderLeftWidth: 4,
    marginBottom: 20,
    elevation: 1
  },
  noteText: {
    fontSize: 12.5,
    color: "#5C4638",
    lineHeight: 18
  },
  timeline: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#EFE8DC",
    marginBottom: 20,
  },
  timelineItem: {
    alignItems: "center",
    flex: 1
  },
  badge: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: "#F7F2EC",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4
  },
  badgeActive: {
    backgroundColor: "#FFF",
    borderWidth: 1.5,
    borderColor: "#C46851"
  },
  timelineLabel: {
    fontSize: 11,
    color: "#8C7A6B",
    fontWeight: "500"
  },
}
);