import * as Haptics from "expo-haptics";
import React from "react";
import {
    Platform,
    StyleProp,
    Text,
    TouchableOpacity,
    ViewStyle,
} from "react-native";
import { styles } from "./JournalCard.styles";

export interface JournalCardProps {
  label: string;
  emoji?: string;
  isSelected?: boolean;
  activeColor?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  aspectSquare?: boolean;
}

export function JournalCard({
  label,
  emoji,
  isSelected = false,
  activeColor = "#C46851",
  onPress,
  style,
  aspectSquare = false,
}: JournalCardProps) {
  const handlePress = () => {
    if (Platform.OS !== "web") {
      try {
        Haptics.selectionAsync();
      } catch {}
    }
    onPress?.();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={handlePress}
      style={[
        styles.base,
        aspectSquare && styles.square,
        isSelected && [
          styles.selected,
          {
            borderColor: activeColor,
            shadowColor: activeColor,
          },
        ],
        style,
      ]}
    >
      {emoji ? (
        <Text style={aspectSquare ? styles.emojiBig : styles.emojiSmall}>
          {emoji}
        </Text>
      ) : null}

      <Text
        numberOfLines={2}
        style={[
          styles.labelText,
          isSelected && [styles.labelTextSelected, { color: activeColor }],
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}