import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const moods = [
    { label: "Calme", emoji: "🌿" },
    { label: "Anxieux", emoji: "⚡" },
    { label: "Apaisé", emoji: "☀️" },
    { label: "Fatigué", emoji: "🌙" },
  ];

  return (
    <ScreenContainer>
      <View className="mb-6">
        <Text className="text-sm font-semibold text-terracotta-500 uppercase tracking-wider">
          Healis
        </Text>
        <Text className="text-3xl font-bold text-earth-heading mt-1">
          Comment vas-tu aujourd'hui ?
        </Text>
      </View>

      <Card>
        <Text className="text-lg font-bold text-earth-heading">Ton pouls émotionnel</Text>
        <Text className="text-sm text-earth-body mt-1 mb-4">
          Sélectionne ton état d'esprit du moment.
        </Text>
        <View className="flex-row justify-between">
          {moods.map((item, idx) => (
            <TouchableOpacity key={idx} className="items-center bg-cream-100 p-3 rounded-2xl w-[22%]">
              <Text className="text-2xl mb-1">{item.emoji}</Text>
              <Text className="text-xs font-semibold text-earth-body">{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Card>

      <Button
        variant="sos"
        title="Besoin d'apaisement ? (Mode SOS)"
        className="mb-4"
        onPress={() => console.log("Ouvrir SOS")}
      />

      <Card variant="highlight">
        <Text className="text-sm text-earth-heading italic leading-relaxed">
          « Le progrès n'est pas linéaire. Prends soin de toi, un pas après l'autre. »
        </Text>
      </Card>
    </ScreenContainer>
  );
}