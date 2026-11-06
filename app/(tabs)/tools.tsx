import { BreathingCircle } from "@/components/ui/BreathingCircle/BreathingCircle";
import { Button } from "@/components/ui/Button/Button";
import { Card } from "@/components/ui/Card/Card";
import { ContactCard } from "@/components/ui/ContactCard/ContactCard";
import { ScreenContainer } from "@/components/ui/ScreenContainer/ScreenContainer";
import { SectionHeader } from "@/components/ui/SectionHeader/SectionHeader";
import { StepItem } from "@/components/ui/StepItem/StepItem";
import * as Haptics from "expo-haptics";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Linking,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";

type BreathPhase = "idle" | "inspire" | "hold" | "expire";

const PHASES: Record<
  BreathPhase,
  { label: string; duration: number; targetScale: number; color: string }
> = {
  idle: { label: "Prêt(e) ?", duration: 0, targetScale: 1, color: "#EFE8E1" },
  inspire: { label: "Inspirez", duration: 4, targetScale: 1.45, color: "#E3B89B" },
  hold: { label: "Bloquez", duration: 4, targetScale: 1.45, color: "#A3483E" },
  expire: { label: "Expirez", duration: 4, targetScale: 1, color: "#C46851" },
};

export default function ToolsScreen() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<BreathPhase>("idle");
  const [countdown, setCountdown] = useState<number>(4);

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const timerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const triggerHaptic = () => {
    if (Platform.OS !== "web") {
      try {
        Haptics.selectionAsync();
      } catch {}
    }
  };

  const startPhase = (nextPhase: BreathPhase) => {
    setPhase(nextPhase);
    triggerHaptic();

    const config = PHASES[nextPhase];
    setCountdown(config.duration);

    Animated.timing(scaleAnim, {
      toValue: config.targetScale,
      duration: config.duration * 1000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();

    let remaining = config.duration;
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

    timerIntervalRef.current = setInterval(() => {
      remaining -= 1;
      if (remaining > 0) {
        setCountdown(remaining);
      } else {
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
        if (nextPhase === "inspire") startPhase("hold");
        else if (nextPhase === "hold") startPhase("expire");
        else if (nextPhase === "expire") startPhase("inspire");
      }
    }, 1000);
  };

  const handleStart = () => {
    setIsActive(true);
    startPhase("inspire");
  };

  const handleStop = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setIsActive(false);
    setPhase("idle");
    setCountdown(4);

    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleCall = (phoneNumber: string) => {
    const cleanNumber = phoneNumber.replace(/\s+/g, "");
    Linking.openURL(`tel:${cleanNumber}`);
  };

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  const currentConfig = PHASES[phase];

  return (
    <ScreenContainer scrollable>
      <SectionHeader
        surtitle="Outils & Respiration"
        title="Cohérence & Calme"
        description="Prenez un temps pour réguler votre souffle et calmer la tension corporelle."
      />

      {/* 1. EXERCICE DE RESPIRATION AVEC BreathingCircle */}
      <Card style={styles.card}>
        <BreathingCircle
          label={currentConfig.label}
          color={currentConfig.color}
          scaleAnim={scaleAnim}
          countdown={countdown}
          isActive={isActive}
        />

        <View style={styles.actionWrap}>
          {isActive ? (
            <Button
              title="Terminer la session"
              variant="outline"
              onPress={handleStop}
            />
          ) : (
            <Button
              title="Commencer la respiration"
              variant="primary"
              onPress={handleStart}
            />
          )}
        </View>
      </Card>

      {/* 2. ÉTAPES DU PROTOCOLE AVEC StepItem */}
      <Text style={styles.sectionTitle}>Étapes d'ancrage corporel</Text>
      <Card style={styles.cardPadding}>
        <StepItem
          stepNumber={1}
          label="Inspiration ventrale"
          detail="Gonflez le bas de votre ventre sans lever les épaules (4s)."
          isCompleted={phase === "hold" || phase === "expire"}
        />
        <StepItem
          stepNumber={2}
          label="Suspension paisible"
          detail="L'air repose en vous, relâchez vos mâchoires (4s)."
          isCompleted={phase === "expire"}
        />
        <StepItem
          stepNumber={3}
          label="Expiration complète"
          detail="Videz l'air doucement par la bouche comme à travers une paille (4s)."
          isCompleted={false}
        />
      </Card>

      {/* 3. LIGNES D'ÉCOUTE AVEC ContactCard */}
      <Text style={styles.sectionTitle}>Besoin de parler ? (SOS)</Text>
      <Card style={styles.cardPadding}>
        <ContactCard
          name="Ligne Écoute Anorexie Boulimie"
          role="Permanence spécialisée TCA"
          phone="0810 037 037"
          onCall={() => handleCall("0810037037")}
        />
        <ContactCard
          name="Numéro National Prévention Suicide"
          role="Écoute bienveillante 24/7 gratuite"
          phone="3114"
          onCall={() => handleCall("3114")}
          isLast
        />
      </Card>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  cardPadding: {
    padding: 16,
    marginBottom: 20,
  },
  actionWrap: {
    width: "100%",
    paddingHorizontal: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#8C7A6B",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 10,
    marginLeft: 4,
  },
});