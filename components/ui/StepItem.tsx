import { Text, View } from "react-native";

interface StepItemProps {
  badge: string | number;
  label: string;
  className?: string;
}

export function StepItem({ badge, label, className = "" }: StepItemProps) {
  return (
    <View className={`flex-row items-center bg-white/70 p-2.5 rounded-xl border border-cream-200 mb-2 ${className}`}>
      <View className="w-7 h-7 rounded-full bg-terracotta-500 items-center justify-center mr-3">
        <Text className="text-white font-bold text-xs">{badge}</Text>
      </View>
      <Text className="text-xs text-earth-heading font-medium flex-1">
        {label}
      </Text>
    </View>
  );
}