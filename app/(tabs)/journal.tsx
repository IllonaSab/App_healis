import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Card } from "../../components/ui/Card/Card";
import { JournalCard } from "../../components/ui/JournalCard/JournalCard";
import { ScreenContainer } from "../../components/ui/ScreenContainer/ScreenContainer";
import { SectionHeader } from "../../components/ui/SectionHeader/SectionHeader";
import { WaterTracker } from "../../components/ui/WaterTracker/WaterTracker";
import { journalService } from "../../services/journalService";

interface Meal {
  id: string;
  label: string;
  image: any;
}

interface Feeling {
  id: string;
  label: string;
  color: string;
  note: string;
  image: any;
}

const MEALS: Meal[] = [
  { id: "matin", label: "Matin", image: require("../../assets/images/matin.png") },
  { id: "midi", label: "Midi", image: require("../../assets/images/midi.png") },
  { id: "pause", label: "Pause", image: require("../../assets/images/pause.png") },
  { id: "soir", label: "Soir", image: require("../../assets/images/soir.png") },
];

const FEELINGS: Feeling[] = [
  { id: "serein", label: "Serein", color: "#6A8D73", note: "Savourez cette légèreté.", image: require("../../assets/images/serein.png") },
  { id: "bien", label: "Bien", color: "#8C7A6B", note: "Continuez à votre rythme.", image: require("../../assets/images/bien.png") },
  { id: "lourd", label: "Lourd", color: "#D98E73", note: "Respirez lentement, le corps digère.", image: require("../../assets/images/lourd.png") },
  { id: "tendu", label: "Tendu", color: "#C46851", note: "Relâchez vos épaules, tout va bien.", image: require("../../assets/images/tendu.png") },
];

export default function JournalScreen() {
  const [meal, setMeal] = useState<string>("midi");
  const [log, setLog] = useState<Record<string, string>>({});
  const [water, setWater] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const currentFeelingId = log[meal] || null;
  const activeObj = FEELINGS.find((f) => f.id === currentFeelingId);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const todayData = await journalService.getTodayLog();
        if (todayData) {
          if (todayData.meals) setLog(todayData.meals);
          if (typeof todayData.water_glasses === "number") setWater(todayData.water_glasses);
        }
      } catch (err: any) {
        console.error("Erreur chargement journal:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const selectFeeling = async (item: Feeling) => {
    const updatedMeals = { ...log, [meal]: item.id };
    setLog(updatedMeals);

    try {
      await journalService.saveTodayLog({ meals: updatedMeals });
    } catch (err: any) {
      Alert.alert("Erreur", "Impossible de sauvegarder votre sensation.");
    }
  };

  const handleWaterChange = async (count: number) => {
    setWater(count);
    try {
      await journalService.saveTodayLog({ water_glasses: count });
    } catch (err: any) {
      Alert.alert("Erreur", "Impossible de sauvegarder l'hydratation.");
    }
  };

  const getFeelingColor = (feelingId?: string) => {
    return FEELINGS.find((f) => f.id === feelingId)?.color;
  };

  if (loading) {
    return (
      <ScreenContainer>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#C46851" />
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer scrollable>
      <SectionHeader
        surtitle="Journal de présence"
        title="Comment va votre corps ?"
      />

      {/* 1. Ruban illustré des repas */}
      <View style={styles.ribbon}>
        {MEALS.map((m) => {
          const isActive = meal === m.id;
          return (
            <TouchableOpacity
              key={m.id}
              onPress={() => setMeal(m.id)}
              style={[styles.ribbonTab, isActive && styles.ribbonActive]}
              activeOpacity={0.7}
            >
              <View style={styles.mealImageContainer}>
                <Image
                  source={m.image}
                  style={styles.mealImage}
                  resizeMode="contain"
                />
              </View>
              <Text style={[styles.ribbonText, isActive && styles.boldText]}>
                {m.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* 2. Galets de sensation réutilisant JournalCard */}
      <View style={styles.grid}>
        {FEELINGS.map((f) => (
          <View key={f.id} style={styles.feelingCol}>
            <JournalCard
              label={f.label}
              isSelected={currentFeelingId === f.id}
              activeColor={f.color}
              onPress={() => selectFeeling(f)}
              aspectSquare
            >
              <Image
                source={f.image}
                style={styles.cardImage}
                resizeMode="contain"
              />
            </JournalCard>
          </View>
        ))}
      </View>

      {/* 3. Note d'écoute */}
      <Card
        style={[
          styles.noteCard,
          {
            borderLeftColor: activeObj?.color || "#E8E0D7",
            borderLeftWidth: 4,
          },
        ]}
      >
        <Text style={styles.noteText}>
          {activeObj
            ? activeObj.note
            : "Touchez un ressenti pour écouter votre sensation."}
        </Text>
      </Card>

      {/* 4. Frise du jour */}
      <Card style={styles.timelineCard}>
        <View style={styles.timelineRow}>
          {MEALS.map((m) => {
            const loggedFeelingId = log[m.id];
            const color = getFeelingColor(loggedFeelingId);

            return (
              <View key={m.id} style={styles.timelineItem}>
                <View
                  style={[
                    styles.badge,
                    loggedFeelingId && styles.badgeActive,
                    color ? { borderColor: color } : null,
                  ]}
                >
                  <Text
                    style={[
                      styles.badgeText,
                      color ? { color, fontWeight: "700" } : null,
                    ]}
                  >
                    {loggedFeelingId ? "✓" : "·"}
                  </Text>
                </View>
                <Text style={styles.timelineLabel}>{m.label}</Text>
              </View>
            );
          })}
        </View>
      </Card>

      {/* 5. Tracker eau */}
      <WaterTracker glasses={water} onChange={handleWaterChange} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 300,
  },
  ribbon: {
    flexDirection: "row",
    backgroundColor: "#F2ECE4",
    padding: 6,
    borderRadius: 20,
    marginVertical: 16,
    gap: 6,
  },
  ribbonTab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 14,
  },
  ribbonActive: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#C46851",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  mealImageContainer: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  mealImage: {
    width: "100%",
    height: "100%",
  },
  ribbonText: {
    fontSize: 12,
    color: "#8C7A6B",
    fontWeight: "600",
  },
  boldText: {
    color: "#C46851",
    fontWeight: "700",
  },
  grid: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  feelingCol: {
    flex: 1,
  },
  cardImage: {
    width: 40,
    height: 40,
    marginBottom: 6,
    alignSelf: "center",
  },
  noteCard: {
    padding: 14,
    marginBottom: 16,
  },
  noteText: {
    fontSize: 13,
    color: "#5C4638",
    lineHeight: 19,
  },
  timelineCard: {
    padding: 14,
    marginBottom: 16,
  },
  timelineRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timelineItem: {
    alignItems: "center",
    flex: 1,
  },
  badge: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: "#F7F2EC",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  badgeActive: {
    backgroundColor: "#FFFFFF",
  },
  badgeText: {
    fontSize: 13,
    color: "#A89A8F",
    fontWeight: "600",
  },
  timelineLabel: {
    fontSize: 11,
    color: "#8C7A6B",
    fontWeight: "500",
  },
});