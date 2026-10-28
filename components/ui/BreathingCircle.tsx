import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export interface BreathingCircleProps {
  isActive: boolean;
  instruction: string;
  inhaleDuration?: number;
  exhaleDuration?: number;
}

export function BreathingCircle({
  isActive,
  instruction,
  inhaleDuration = 4000,
  exhaleDuration = 6000,
}: BreathingCircleProps) {
  const breathAnim = useSharedValue(0);

  const smoothEase = Easing.bezier(0.37, 0, 0.63, 1);

  useEffect(() => {
    if (isActive) {
      breathAnim.value = withRepeat(
        withSequence(
          withTiming(1, { duration: inhaleDuration, easing: smoothEase }),
          withTiming(0, { duration: exhaleDuration, easing: smoothEase })
        ),
        -1,
        false
      );
    } else {
      cancelAnimation(breathAnim);
      breathAnim.value = withTiming(0, { duration: 600, easing: smoothEase });
    }
  }, [isActive, inhaleDuration, exhaleDuration]);

  const outerWaveStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + breathAnim.value * 0.7 }],
    opacity: 0.15 + breathAnim.value * 0.25,
  }));

  const innerWaveStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + breathAnim.value * 0.4 }],
    opacity: 0.25 + breathAnim.value * 0.35,
  }));

  const coreStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 0.92 + breathAnim.value * 0.16 }],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.circleZone}>
        <Animated.View style={[styles.outerWave, outerWaveStyle]} />
        <Animated.View style={[styles.innerWave, innerWaveStyle]} />
        <Animated.View style={[styles.coreCircle, coreStyle]}>
          <View style={styles.coreGleam} />
        </Animated.View>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.instructionText}>{instruction}</Text>
        <Text style={styles.subHint}>
          {isActive ? "Laissez votre souffle guider le mouvement" : "Touchez pour débuter"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 24,
  },
  circleZone: {
    width: 220,
    height: 220,
    alignItems: "center",
    justifyContent: "center",
  },
  outerWave: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#E3B89B",
  },
  innerWave: {
    position: "absolute",
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#C46851",
  },
  coreCircle: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: "#A3483E",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#C46851",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 8,
  },
  coreGleam: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.18)",
  },
  textContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  instructionText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#38231E",
    letterSpacing: -0.2,
  },
  subHint: {
    fontSize: 12,
    color: "#8C7A6B",
    marginTop: 4,
  },
});
