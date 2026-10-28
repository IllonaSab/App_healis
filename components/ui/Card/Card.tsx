import React, { ReactNode } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { styles } from "./Card.styles";

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