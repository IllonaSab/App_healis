import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
    Animated,
    Easing,
    Text,
    Vibration,
    View,
} from "react-native";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { ScreenContainer } from "../../components/ui/ScreenContainer";
import { SectionHeader } from "../../components/ui/SectionHeader";

export default function ToolsScreen() {
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState<"Inspirer" | "Expirer">("Inspirer");
  const [countdown, setCountdown] = useState(4);
  const breathAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isBreathing) {
      const isInspiring = breathPhase === "Inspirer";
      const duration = isInspiring ? 4000 : 6000;
      const targetValue = isInspiring ? 1 : 0;

      // Animation du cercle
      Animated.timing(breathAnim, {
        toValue: targetValue,
        duration,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      }).start();

      // Compte à rebours seconde par seconde
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            Vibration.vibrate(35);
            setBreathPhase((current) => (current === "Inspirer" ? "Expirer" : "Inspirer"));
            return isInspiring ? 6 : 4;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      breathAnim.stopAnimation();
      breathAnim.setValue(0);
      setBreathPhase("Inspirer");
      setCountdown(4);
    }

    return () => clearInterval(interval);
  }, [isBreathing, breathPhase]);

  const scale = breathAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.45],
  });

  const opacity = breathAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 0.85],
  });

  return (
    <ScreenContainer>
      <SectionHeader
        surtitle="Régulation nerveuse"
        title="Cohérence 4-6"
        description="Une respiration rythmée pour activer le nerf vague, réduire la pression interne et retrouver le calme."
      />

      <Card>
        <Text className="text-base font-bold text-earth-heading mb-1">
          Apaisement cardiaque
        </Text>
        <Text className="text-xs text-earth-muted leading-relaxed mb-4">
          Inspire 4 secondes par le nez en relâchant le ventre, puis expire 6 secondes par la bouche comme dans une paille.
        </Text>

        {/* Cercle animé */}
        <View className="items-center justify-center my-8 h-56">
          {/* Halo d'expansion */}
          <Animated.View
            style={[
              {
                transform: [{ scale }],
                opacity,
              },
            ]}
            className="w-36 h-36 rounded-full bg-terracotta-100 items-center justify-center border border-terracotta-300"
          >
            <View className="w-24 h-24 rounded-full bg-terracotta-500/20 items-center justify-center">
              <Ionicons name="heart" size={30} color="#C46851" />
            </View>
          </Animated.View>

          {/* Affichage central de la phase et du compte à rebours */}
          <View className="absolute items-center">
            <Text className="text-sm font-bold text-earth-heading">
              {isBreathing ? breathPhase : "Prêt(e) ?"}
            </Text>
            {isBreathing && (
              <Text className="text-2xl font-extrabold text-terracotta-500 mt-1">
                {countdown}s
              </Text>
            )}
          </View>
        </View>

        {/* Repères visuels */}
        <View className="flex-row justify-around bg-cream-50 p-3 rounded-xl border border-cream-200 mb-6">
          <View className="items-center">
            <Text className="text-[11px] font-semibold text-earth-muted">Inspiration</Text>
            <Text className="text-xs font-bold text-earth-heading mt-0.5">4 secondes</Text>
          </View>
          <View className="w-px bg-cream-200" />
          <View className="items-center">
            <Text className="text-[11px] font-semibold text-earth-muted">Expiration</Text>
            <Text className="text-xs font-bold text-earth-heading mt-0.5">6 secondes</Text>
          </View>
        </View>

        <Button
          title={isBreathing ? "Interrompre la session" : "Démarrer la respiration"}
          variant={isBreathing ? "outline" : "primary"}
          onPress={() => setIsBreathing(!isBreathing)}
        />
      </Card>

      {/* Conseils doux avec le composant Card */}
      <Card variant="soft" className="mt-4">
        <Text className="text-xs font-bold text-terracotta-700 uppercase tracking-wider mb-1">
          Rappel pour la pratique
        </Text>
        <Text className="text-xs text-earth-body leading-relaxed">
          Ne cherche pas à bloquer ta respiration entre les deux phases. Enchaîne l'inspiration et l'expiration en un seul mouvement fluide, sans tension dans les épaules.
        </Text>
      </Card>
    </ScreenContainer>
  );
}