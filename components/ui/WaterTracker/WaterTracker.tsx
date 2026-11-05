import * as Haptics from "expo-haptics";
import React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Card } from "../Card/Card";

interface WaterTrackerProps {
  glasses: number;
  maxGlasses?: number;
  onChange: (count: number) => void;
}

export function WaterTracker({
  glasses,
  maxGlasses = 6,
  onChange,
}: WaterTrackerProps) {
  const handleToggle = (index: number) => {
    if (Platform.OS !== "web") {
      try {
        Haptics.selectionAsync();
      } catch {}
    }
    // Si on clique sur le niveau actuel, on redescend d'un cran
    if (glasses === index + 1) {
      onChange(index);
    } else {
      onChange(index + 1);
    }
  };

  return (
    <Card style={styles.card}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Hydratation du corps</Text>
          <Text style={styles.subtitle}>
            {glasses} sur {maxGlasses} repères atteints aujourd'hui
          </Text>
        </View>
        <Text style={styles.counterBadge}>
          {Math.round((glasses / maxGlasses) * 100)}%
        </Text>
      </View>

      <View style={styles.dropsRow}>
        {Array.from({ length: maxGlasses }).map((_, index) => {
          const isFilled = index < glasses;
          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.7}
              onPress={() => handleToggle(index)}
              style={[
                styles.dropButton,
                isFilled && styles.dropButtonActive,
              ]}
            >
              {/* Utilise TOUJOURS la même image goutte.png */}
              <Image
                source={require("@/assets/images/goutte.png")}
                style={[
                  styles.dropImage,
                  !isFilled && styles.dropImageInactive,
                ]}
                resizeMode="contain"
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#38231E",
  },
  subtitle: {
    fontSize: 12.5,
    color: "#8C7A6B",
    marginTop: 2,
  },
  counterBadge: {
    fontSize: 13,
    fontWeight: "700",
    color: "#C46851",
    backgroundColor: "#FAF0EC",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  dropsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 2,
  },
  dropButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#F7F2EC",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#EFE8E1",
  },
  dropButtonActive: {
    backgroundColor: "#FAF0EC",
    borderColor: "#C46851",
  },
  dropImage: {
    width: 24,
    height: 24,
    opacity: 1,
  },
  dropImageInactive: {
    opacity: 0.22, // Même illustration, simplement semi-transparente
  },
});