import * as Haptics from "expo-haptics";
import React from "react";
import {
    Platform,
    StyleProp,
    StyleSheet,
    Text,
    TouchableOpacity,
    ViewStyle,
} from "react-native";

export interface JournalCardProps {
  emoji: string;
  label: string;
  isSelected?: boolean;
  activeColor?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  aspectSquare?: boolean;
}

export function JournalCard({
  emoji,
  label,
  isSelected = false,
  activeColor = "#C46851",
  onPress,
  style,
  aspectSquare = false,
}: JournalCardProps) {
  const handlePress = () => {
    if (Platform.OS !== "web") {
      Haptics.selectionAsync();
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
        isSelected && {
          borderColor: activeColor,
          backgroundColor: "#FFFFFF",
          shadowColor: activeColor,
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.18,
          shadowRadius: 8,
          elevation: 3,
          transform: [{ scale: 1.03 }],
        },
        style,
      ]}
    >
      <Text style={aspectSquare ? styles.emojiBig : styles.emojiSmall}>
        {emoji}
      </Text>
      <Text
        numberOfLines={1}
        style={[
          styles.labelText,
          isSelected && { color: activeColor, fontWeight: "700" },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FAF6F0",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderWidth: 1.5,
    borderColor: "#EFE8DC",
  },
  square: {
    aspectRatio: 0.9,
    paddingVertical: 10,
  },
  emojiSmall: {
    fontSize: 20,
    marginBottom: 4,
  },
  emojiBig: {
    fontSize: 28,
    marginBottom: 6,
  },
  labelText: {
    fontSize: 11.5,
    fontWeight: "600",
    color: "#8C7A6B",
    textAlign: "center",
    letterSpacing: -0.1,
  },
});