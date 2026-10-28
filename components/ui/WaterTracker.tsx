import { Card } from "@/components/ui/Card";
import * as Haptics from "expo-haptics";
import React from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface WaterTrackerProps {
  glasses: number;
  maxGlasses?: number;
  onChange: (count: number) => void;
}

export function WaterTracker({
  glasses,
  maxGlasses = 6,
  onChange,
}: WaterTrackerProps) {
  const handleToggle = (num: number) => {
    if (Platform.OS !== "web") {
      try {
        Haptics.selectionAsync();
      } catch {}
    }
    onChange(num === glasses ? num - 1 : num);
  };

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Hydratation douce</Text>
        <Text style={styles.count}>{glasses} / {maxGlasses} verres</Text>
      </View>

      <View style={styles.row}>
        {Array.from({ length: maxGlasses }, (_, i) => i + 1).map((num) => {
          const isFilled = num <= glasses;
          return (
            <TouchableOpacity
              key={num}
              onPress={() => handleToggle(num)}
              style={[styles.pill, isFilled && styles.pillFilled]}
              activeOpacity={0.7}
            >
              <Text style={{ fontSize: 18 }}>{isFilled ? "💧" : "🫧"}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 13,
    fontWeight: "700",
    color: "#38231E",
  },
  count: {
    fontSize: 12,
    fontWeight: "600",
    color: "#7DA0B5",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  pill: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: "#FAF6F0",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#EDE5DB",
  },
  pillFilled: {
    backgroundColor: "#EEF5F8",
    borderColor: "#B8D5E5",
  },
});