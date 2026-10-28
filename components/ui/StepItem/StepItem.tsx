import React from "react";
import { Text, View } from "react-native";
import { styles } from "./StepItem.styles";

export interface StepItemProps {
  stepNumber: number;
  label: string;
  detail?: string;
  isCompleted?: boolean;
}

export function StepItem({
  stepNumber,
  label,
  detail,
  isCompleted = false,
}: StepItemProps) {
  return (
    <View style={[styles.container, isCompleted && styles.containerCompleted]}>
      <View style={[styles.badge, isCompleted && styles.badgeCompleted]}>
        <Text style={isCompleted ? styles.checkmarkText : styles.badgeText}>
          {isCompleted ? "✓" : stepNumber}
        </Text>
      </View>

      <View style={styles.textContainer}>
        <Text style={[styles.label, isCompleted && styles.labelCompleted]}>
          {label}
        </Text>
        {detail ? <Text style={styles.detail}>{detail}</Text> : null}
      </View>
    </View>
  );
}