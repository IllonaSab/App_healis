import { Card } from "@/components/ui/Card";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import * as Haptics from "expo-haptics";
import React, { useEffect, useState } from "react";
import {
  Animated,
  Easing,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ToolTab {
  id: "breath" | "grounding" | "relax";
  title: string;
}

const TOOLS: ToolTab[] = [
  { id: "breath", title: "Respiration" },
  { id: "grounding", title: "Ancrage" },
  { id: "relax", title: "Relâchement" },
];

export default function ToolsScreen() {
  const [activeTab, setActiveTab] = useState<ToolTab["id"]>("breath");
  const [isBreathing, setIsBreathing] = useState(false);
  const [phase, setPhase] = useState("Touchez le cercle pour débuter");
  const [scaleAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    if (isBreathing) {
      const runCycle = () => {
        setPhase("Inspirez doucement...");
        if (Platform.OS !== "web") {
          try {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          } catch {}
        }

        Animated.timing(scaleAnim, {
          toValue: 1.35,
          duration: 4000,
          easing: Easing.bezier(0.4, 0, 0.2, 1),
          useNativeDriver: true,
        }).start(({ finished }) => {
          if (!finished) return;

          setPhase("Expirez longuement...");
          if (Platform.OS !== "web") {
            try {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            } catch {}
          }

          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 6000,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            useNativeDriver: true,
          }).start(({ finished: f2 }) => {
            if (f2) runCycle();
          });
        });
      };

      runCycle();
    } else {
      scaleAnim.stopAnimation();
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
      setPhase("Touchez le cercle pour débuter");
    }

    return () => scaleAnim.stopAnimation();
  }, [isBreathing]);

  const toggleBreathing = () => {
    if (Platform.OS !== "web") {
      try {
        Haptics.selectionAsync();
      } catch {}
    }
    setIsBreathing((prev) => !prev);
  };

  return (
    <ScreenContainer scrollable>
      <SectionHeader
        surtitle="Reconnexion avec son corps"
        title="Trois gestes simple"
        description="Ces outils sont là pour vous accueillir, à votre rythme et sans jugement.  "
        />

      {/* Ruban textuel épuré */}
      <View style={styles.ribbon}>
        {TOOLS.map((t) => {
          const active = activeTab === t.id;
          return (
            <TouchableOpacity
              key={t.id}
              onPress={() => {
                if (Platform.OS !== "web") {
                  try {
                    Haptics.selectionAsync();
                  } catch {}
                }
                setIsBreathing(false);
                setActiveTab(t.id);
              }}
              style={[styles.tab, active && styles.tabActive]}
            >
              <Text style={[styles.tabText, active && styles.tabTextActive]}>
                {t.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* 1. Respiration */}
      {activeTab === "breath" && (
        <Card style={styles.contentCard}>
          <Text style={styles.cardDesc}>
            Rythme apaisant (4s inspire - 6s expire) pour réguler le système nerveux.
          </Text>

          <View style={styles.pebbleZone}>
            <Animated.View
              style={[styles.pebble, { transform: [{ scale: scaleAnim }] }]}
            >
              <TouchableOpacity
                onPress={toggleBreathing}
                activeOpacity={0.85}
                style={styles.pebbleTouch}
              >
                <Text style={styles.pebbleText}>
                  {isBreathing ? "Pause" : "Départ"}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>

          <Text style={styles.phaseText}>{phase}</Text>
        </Card>
      )}

      {/* 2. Ancrage */}
      {activeTab === "grounding" && (
        <Card style={styles.contentCard}>
          <Text style={styles.sectionSubtitle}>La technique 3-2-1</Text>
          <Text style={styles.cardDesc}>
            Revenez dans l'instant présent pour couper le flux mental :
          </Text>

          {[
            { n: "3", t: "Remarquez 3 éléments visibles autour de vous." },
            { n: "2", t: "Identifiez 2 sons ambiants ou discrets." },
            { n: "1", t: "Ressentez le contact physique de vos pieds sur le sol." },
          ].map((step) => (
            <View key={step.n} style={styles.stepRow}>
              <Text style={styles.stepBadge}>{step.n}</Text>
              <Text style={styles.stepText}>{step.t}</Text>
            </View>
          ))}
        </Card>
      )}

      {/* 3. Relâchement (même structure et style que l'ancrage) */}
      {activeTab === "relax" && (
        <Card style={styles.contentCard}>
          <Text style={styles.sectionSubtitle}>Scan doux des tensions</Text>
          <Text style={styles.cardDesc}>
            Parcourez trois points clés sans chercher à forcer la détente :
          </Text>

          {[
            { n: "1", t: "Desserrer la mâchoire et laisser la langue reposer au fond du palais." },
            { n: "2", t: "Abaisser les épaules loin des oreilles sur une expiration lente." },
            { n: "3", t: "Détendre le ventre en le laissant respirer à son rythme naturel." },
          ].map((step) => (
            <View key={step.n} style={styles.stepRow}>
              <Text style={styles.stepBadge}>{step.n}</Text>
              <Text style={styles.stepText}>{step.t}</Text>
            </View>
          ))}
        </Card>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  ribbon: {
    flexDirection: "row",
    backgroundColor: "#F2ECE4",
    padding: 4,
    borderRadius: 16,
    marginVertical: 16,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 12,
  },
  tabActive: {
    backgroundColor: "#FFFFFF",
    elevation: 2,
    shadowColor: "#38231E",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },
  tabText: {
    fontSize: 12.5,
    fontWeight: "600",
    color: "#8C7A6B",
  },
  tabTextActive: {
    color: "#38231E",
    fontWeight: "700",
  },
  contentCard: {
    marginBottom: 16,
  },
  sectionSubtitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#38231E",
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 12.5,
    color: "#6B584C",
    lineHeight: 18,
    marginBottom: 16,
  },
  pebbleZone: {
    height: 160,
    alignItems: "center",
    justifyContent: "center",
  },
  pebble: {
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: "#FAF6F1",
    borderWidth: 2,
    borderColor: "#E3B89B",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  pebbleTouch: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  pebbleText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#C46851",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  phaseText: {
    textAlign: "center",
    fontSize: 13.5,
    fontWeight: "600",
    color: "#5C3636",
    marginTop: 14,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FDFBF9",
    padding: 12,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#EDE5DB",
    gap: 12,
  },
  stepBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#EEDBCE",
    textAlign: "center",
    lineHeight: 26,
    fontWeight: "700",
    color: "#C46851",
    fontSize: 12,
  },
  stepText: {
    flex: 1,
    fontSize: 12.5,
    color: "#5C4638",
    lineHeight: 17,
  },
  relaxRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 14,
  },
  relaxBadge: {
    fontSize: 11,
    fontWeight: "700",
    color: "#C46851",
    backgroundColor: "#FAF6F1",
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
    marginTop: 2,
  },
  relaxTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#38231E",
    marginBottom: 2,
  },
  relaxDesc: {
    fontSize: 11.5,
    color: "#8C7A6B",
    lineHeight: 16,
  },
  footerCard: {
    alignItems: "center",
    marginBottom: 24,
  },
  footerText: {
    fontSize: 11.5,
    color: "#8C7A6B",
    fontStyle: "italic",
    textAlign: "center",
    lineHeight: 16,
  },
});