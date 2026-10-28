import * as Haptics from "expo-haptics";
import React from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { Card } from "../Card/Card";
import { styles } from "./WaterTracker.styles";

export interface WaterTrackerProps {
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
        <Text style={styles.count}>
          {glasses} / {maxGlasses} verres
        </Text>
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
              accessibilityLabel={`Verre d'eau numéro ${num}`}
            >
              <Text
                style={[
                  styles.pillText,
                  isFilled && styles.pillTextFilled,
                ]}
              >
                {num}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </Card>
  );
}