import { Card } from "@/components/ui/Card/Card";
import React, { ReactNode } from "react";
import { StyleProp, Text, ViewStyle } from "react-native";
import { styles } from "./TipCard.styles";

export interface TipCardProps {
  title: string;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function TipCard({ title, children, style }: TipCardProps) {
  return (
    <Card variant="warm" style={[styles.card, style]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{children}</Text>
    </Card>
  );
}