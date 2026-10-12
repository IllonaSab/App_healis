import { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
    Easing,
    cancelAnimation,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from "react-native-reanimated";

interface BreathingCircleProps {
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
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.4);

  useEffect(() => {
    if (isActive) {
      scale.value = withRepeat(
        withSequence(
          withTiming(1.5, { duration: inhaleDuration, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: exhaleDuration, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      );

      opacity.value = withRepeat(
        withSequence(
          withTiming(0.8, { duration: inhaleDuration, easing: Easing.inOut(Easing.ease) }),
          withTiming(0.3, { duration: exhaleDuration, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      );
    } else {
      cancelAnimation(scale);
      cancelAnimation(opacity);
      scale.value = withTiming(1, { duration: 400 });
      opacity.value = withTiming(0.4, { duration: 400 });
    }
  }, [isActive, inhaleDuration, exhaleDuration]);

  const animatedCircleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <View className="items-center justify-center my-6 h-40">
      <Animated.View
        className="absolute w-28 h-28 rounded-full bg-terracotta-300"
        style={animatedCircleStyle}
      />
      <View className="w-24 h-24 rounded-full bg-terracotta-500 items-center justify-center shadow-md">
        <Text className="text-white text-xs font-bold text-center px-2">
          {instruction}
        </Text>
      </View>
    </View>
  );
}