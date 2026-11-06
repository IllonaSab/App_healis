import React, { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export interface JournalCardProps {
  label: string;
  isSelected?: boolean;
  activeColor?: string;
  onPress?: () => void | Promise<void>;
  aspectSquare?: boolean;
  children?: ReactNode; // <-- Vérifier la prop
}

export function JournalCard({
  label,
  isSelected = false,
  activeColor = "#C46851",
  onPress,
  aspectSquare = false,
  children, // <-- Récupérer children
}: JournalCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.card,
        aspectSquare && styles.square,
        isSelected && {
          borderColor: activeColor,
          backgroundColor: `${activeColor}15`,
        },
      ]}
    >
     {children}

      <Text
        style={[
          styles.label,
          isSelected && { color: activeColor, fontWeight: "700" },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FDFCFA",
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#EFE8E1",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 6,
  },
  square: {
    aspectRatio: 0.85,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#5C3636",
    textAlign: "center",
    marginTop: 4,
  },
});