import { Card } from "@/components/ui/Card/Card";
import { ScreenContainer } from "@/components/ui/ScreenContainer/ScreenContainer";
import { SectionHeader } from "@/components/ui/SectionHeader/SectionHeader";
import { DailyLog, journalService } from "@/services/journalService";
import * as Haptics from "expo-haptics";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface MoodOption {
  id: string;
  label: string;
  color: string;
  image: any;
}

const MOODS: MoodOption[] = [
  { id: "calme", label: "Calme", color: "#6A8D73", image: require("../../assets/images/serein.png") },
  { id: "bien", label: "Bien", color: "#8C7A6B", image: require("../../assets/images/bien.png") },
  { id: "lourd", label: "Lourd", color: "#D98E73", image: require("../../assets/images/lourd.png") },
  { id: "anxieux", label: "Tendu", color: "#C46851", image: require("../../assets/images/tendu.png") },
];

export default function HomeScreen() {
  const router = useRouter();
  const [todayLog, setTodayLog] = useState<DailyLog | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Recharge les données du jour chaque fois que l'écran d'accueil reprend le focus
  useFocusEffect(
    useCallback(() => {
      let isMounted = true;

      async function fetchData() {
        try {
          const log = await journalService.getTodayLog();
          if (isMounted && log) {
            setTodayLog(log);
            if (log.mood) setSelectedMood(log.mood);
          }
        } catch (err) {
          console.warn("Erreur chargement accueil:", err);
        } finally {
          if (isMounted) setLoading(false);
        }
      }

      fetchData();

      return () => {
        isMounted = false;
      };
    }, [])
  );

  const handleSelectMood = async (mood: MoodOption) => {
    if (Platform.OS !== "web") {
      try {
        Haptics.selectionAsync();
      } catch {}
    }

    setSelectedMood(mood.id);

    try {
      const updated = await journalService.saveTodayLog({ mood: mood.id });
      if (updated) setTodayLog(updated);
    } catch (err) {
      Alert.alert("Erreur", "Impossible d'enregistrer votre état.");
    }
  };

  const loggedMealsCount = todayLog?.meals ? Object.keys(todayLog.meals).length : 0;
  const waterCount = todayLog?.water_glasses ?? 0;

  if (loading) {
    return (
      <ScreenContainer>
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#C46851" />
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer scrollable>
      <SectionHeader
        surtitle="Aujourd'hui"
        title="Prenez un souffle"
        description="Comment vous sentez-vous dans votre corps en ce moment ?"
      />

      {/* 1. SÉLECTION DE LA MÉTO DU JOUR */}
      <View style={styles.moodGrid}>
        {MOODS.map((m) => {
          const isSelected = selectedMood === m.id;
          return (
            <TouchableOpacity
              key={m.id}
              activeOpacity={0.8}
              onPress={() => handleSelectMood(m)}
              style={[
                styles.moodCard,
                isSelected && {
                  borderColor: m.color,
                  backgroundColor: `${m.color}15`,
                },
              ]}
            >
              <Image source={m.image} style={styles.moodImage} resizeMode="contain" />
              <Text
                style={[
                  styles.moodLabel,
                  isSelected && { color: m.color, fontWeight: "700" },
                ]}
              >
                {m.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* 2. RÉSUMÉ DE VOTRE JOURNÉE (CONNECTÉ SUPABASE) */}
      <Text style={styles.sectionSubtitle}>Votre journée Healis</Text>
      <Card style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>{loggedMealsCount} / 4</Text>
            <Text style={styles.summaryLabel}>Repas notés</Text>
          </View>

          <View style={styles.verticalDivider} />

          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>{waterCount} 💧</Text>
            <Text style={styles.summaryLabel}>Verres d'eau</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.journalLinkButton}
          onPress={() => router.push("/journal")}
          activeOpacity={0.7}
        >
          <Text style={styles.journalLinkText}>Ouvrir mon journal complet →</Text>
        </TouchableOpacity>
      </Card>

      {/* 3. ENCART D'URGENCE / APAISEMENT RAPIDE */}
      <Card variant="warm" style={styles.sosCard}>
        <View style={styles.sosHeader}>
          <Text style={styles.sosTitle}>Besoin d'un temps d'arrêt ?</Text>
          <Text style={styles.sosDesc}>
            Une vague d'inconfort ou d'anxiété ? Accédez aux exercices de respiration et d'ancrage.
          </Text>
        </View>
        <TouchableOpacity
          style={styles.sosButton}
          onPress={() => router.push("/tools")}
          activeOpacity={0.85}
        >
          <Text style={styles.sosButtonText}>Espace apaisement (SOS)</Text>
        </TouchableOpacity>
      </Card>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    minHeight: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  moodGrid: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 18,
  },
  moodCard: {
    flex: 1,
    aspectRatio: 0.9,
    backgroundColor: "#FDFCFA",
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#EFE8E1",
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
  },
  moodImage: {
    width: 38,
    height: 38,
    marginBottom: 6,
  },
  moodLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#5C3636",
    textAlign: "center",
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#8C7A6B",
    textTransform: "uppercase",
    letterSpacing: 0.7,
    marginTop: 6,
    marginBottom: 10,
    marginLeft: 4,
  },
  summaryCard: {
    padding: 16,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 8,
  },
  summaryItem: {
    alignItems: "center",
    flex: 1,
  },
  summaryValue: {
    fontSize: 22,
    fontWeight: "700",
    color: "#C46851",
    marginBottom: 2,
  },
  summaryLabel: {
    fontSize: 12,
    color: "#8C7A6B",
    fontWeight: "500",
  },
  verticalDivider: {
    width: 1,
    height: 36,
    backgroundColor: "#F2ECE4",
  },
  journalLinkButton: {
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F2ECE4",
    alignItems: "center",
  },
  journalLinkText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#C46851",
  },
  sosCard: {
    padding: 16,
    marginBottom: 28,
  },
  sosHeader: {
    marginBottom: 12,
  },
  sosTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#5C3636",
    marginBottom: 4,
  },
  sosDesc: {
    fontSize: 12.5,
    color: "#6B584C",
    lineHeight: 18,
  },
  sosButton: {
    backgroundColor: "#C46851",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  sosButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 13,
  },
});