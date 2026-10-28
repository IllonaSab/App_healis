import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BreathingCircle } from "../../components/ui/BreathingCircle/BreathingCircle";
import { Card } from "../../components/ui/Card/Card";
import { ScreenContainer } from "../../components/ui/ScreenContainer/ScreenContainer";
import { SectionHeader } from "../../components/ui/SectionHeader/SectionHeader";
import { StepItem } from "../../components/ui/StepItem/StepItem";

interface ToolTab {
  id: "breath" | "grounding" | "relax";
  title: string;
}

const TOOLS: ToolTab[] = [
  { id: "breath", title: "Respiration" },
  { id: "grounding", title: "Ancrage" },
  { id: "relax", title: "Relâchement" },
];

const GROUNDING_STEPS = [
  { step: 3, label: "Vue", detail: "Remarquez 3 éléments visibles autour de vous." },
  { step: 2, label: "Ouïe", detail: "Identifiez 2 sons ambiants ou discrets." },
  { step: 1, label: "Toucher", detail: "Ressentez le contact physique de vos pieds sur le sol." },
];

const RELAX_STEPS = [
  { step: 1, label: "Mâchoire", detail: "Desserrer les dents et laisser reposer la langue au palais." },
  { step: 2, label: "Épaules", detail: "Abaisser les épaules loin des oreilles sur une expiration lente." },
  { step: 3, label: "Ventre", detail: "Détendre le ventre en le laissant respirer à son rythme naturel." },
];

export default function ToolsScreen() {
  const [activeTab, setActiveTab] = useState<ToolTab["id"]>("breath");
  const [isBreathing, setIsBreathing] = useState(false);

  const toggleBreathing = () => {
    if (Platform.OS !== "web") {
      try {
        Haptics.selectionAsync();
      } catch {}
    }
    setIsBreathing((prev) => !prev);
  };

  const handleTabChange = (id: ToolTab["id"]) => {
    if (Platform.OS !== "web") {
      try {
        Haptics.selectionAsync();
      } catch {}
    }
    setIsBreathing(false);
    setActiveTab(id);
  };

  return (
    <ScreenContainer scrollable>
      <SectionHeader
        surtitle="Reconnexion avec son corps"
        title="Trois gestes simples"
        description="Ces outils sont là pour vous accueillir, à votre rythme et sans jugement."
      />

      {/* Ruban textuel de navigation */}
      <View style={styles.ribbon}>
        {TOOLS.map((t) => {
          const active = activeTab === t.id;
          return (
            <TouchableOpacity
              key={t.id}
              onPress={() => handleTabChange(t.id)}
              style={[styles.tab, active && styles.tabActive]}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, active && styles.tabTextActive]}>
                {t.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* 1. Respiration avec BreathingCircle */}
      {activeTab === "breath" && (
        <Card style={styles.contentCard}>
          <Text style={styles.cardDesc}>
            Rythme apaisant (4s inspire - 6s expire) pour réguler le système nerveux.
          </Text>

          <TouchableOpacity onPress={toggleBreathing} activeOpacity={0.9}>
            <BreathingCircle
              isActive={isBreathing}
              instruction={
                isBreathing
                  ? "Suivez le flux du cercle"
                  : "Touchez pour démarrer"
              }
              inhaleDuration={4000}
              exhaleDuration={6000}
            />
          </TouchableOpacity>
        </Card>
      )}

      {/* 2. Ancrage avec StepItem */}
      {activeTab === "grounding" && (
        <Card style={styles.contentCard}>
          <Text style={styles.sectionSubtitle}>La technique 3-2-1</Text>
          <Text style={styles.cardDesc}>
            Revenez dans l'instant présent pour couper le flux mental :
          </Text>

          {GROUNDING_STEPS.map((item) => (
            <StepItem
              key={item.step}
              stepNumber={item.step}
              label={item.label}
              detail={item.detail}
            />
          ))}
        </Card>
      )}

      {/* 3. Relâchement avec StepItem */}
      {activeTab === "relax" && (
        <Card style={styles.contentCard}>
          <Text style={styles.sectionSubtitle}>Scan doux des tensions</Text>
          <Text style={styles.cardDesc}>
            Parcourez trois points clés sans forcer la détente :
          </Text>

          {RELAX_STEPS.map((item) => (
            <StepItem
              key={item.step}
              stepNumber={item.step}
              label={item.label}
              detail={item.detail}
            />
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
    marginBottom: 24,
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
});