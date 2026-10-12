import { Card } from "@/components/ui/Card";
import { Text, View } from "react-native";

interface JournalEntryCardProps {
  emoji: string;
  mealLabel: string;
  dateStr: string;
  hungerLevel: number;
  satietyLevel: number;
  reflection?: string | null;
}

export function JournalEntryCard({
  emoji,
  mealLabel,
  dateStr,
  hungerLevel,
  satietyLevel,
  reflection,
}: JournalEntryCardProps) {
  return (
    <Card className="mb-3">
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center gap-2">
          <Text className="text-lg">{emoji}</Text>
          <Text className="text-sm font-bold text-earth-heading">
            {mealLabel}
          </Text>
        </View>
        <Text className="text-[11px] text-earth-muted">{dateStr}</Text>
      </View>

      <View className="flex-row gap-4 mb-2">
        <Text className="text-xs text-earth-body">
          Faim :{" "}
          <Text className="font-semibold text-terracotta-500">
            {hungerLevel}/10
          </Text>
        </Text>
        <Text className="text-xs text-earth-body">
          Satiété :{" "}
          <Text className="font-semibold text-terracotta-500">
            {satietyLevel}/10
          </Text>
        </Text>
      </View>

      {reflection ? (
        <View className="bg-cream-100/70 p-2.5 rounded-xl border border-cream-200/50 mt-1">
          <Text className="text-xs text-earth-heading italic leading-relaxed">
            « {reflection} »
          </Text>
        </View>
      ) : null}
    </Card>
  );
}