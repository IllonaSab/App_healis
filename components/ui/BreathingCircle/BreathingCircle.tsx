import React from "react";
import { Animated, Text, View } from "react-native";
import { styles } from "./BreathingCircle.styles";

export interface BreathingCircleProps {
  label: string;
  color: string;
  scaleAnim: Animated.Value;
  countdown?: number;
  isActive: boolean;
  hint?: string;
}

export function BreathingCircle({
  label,
  color,
  scaleAnim,
  countdown,
  isActive,
  hint = "4-4-4",
}: BreathingCircleProps) {
  return (
    <View style={styles.animationArea}>
      <Animated.View
        style={[
          styles.outerCircle,
          {
            borderColor: color,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.innerCircle}>
          <Text
            style={[
              styles.phaseTitle,
              { color: isActive ? color : "#5C3636" },
            ]}
          >
            {label}
          </Text>

          {isActive && countdown !== undefined ? (
            <Text style={styles.countdownNumber}>{countdown}s</Text>
          ) : (
            <Text style={styles.subtitleHint}>{hint}</Text>
          )}
        </View>
      </Animated.View>
    </View>
  );
}