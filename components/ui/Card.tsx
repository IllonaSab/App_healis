import React, { ReactNode } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

export interface CardProps {
  children: ReactNode;
  variant?: "default" | "warm" | "subtle";
  style?: StyleProp<ViewStyle>;
}

export function Card({ children, variant = "default", style }: CardProps) {
  return (
    <View style={[styles.base, styles[variant], style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EFE8DC",
    padding: 16, // Padding par défaut pour éviter d'avoir à le réécrire à chaque appel
    overflow: "hidden", // Assure que les bordures gauches colorées épousent l'arrondi du container
  },
  default: {
    backgroundColor: "#FFFFFF",
  },
  warm: {
    backgroundColor: "#FAF6F1",
  },
  subtle: {
    backgroundColor: "#FDFBF9",
  },
});