import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

interface ContactCardProps {
  name: string;
  role: string;
  onCall?: () => void;
  isLast?: boolean;
}

export function ContactCard({ name, role, onCall, isLast = false }: ContactCardProps) {
  return (
    <View
      className={`flex-row items-center justify-between py-2.5 ${
        !isLast ? "border-b border-cream-200" : ""
      }`}
    >
      <View className="flex-1 pr-3">
        <Text className="text-sm font-semibold text-earth-heading">{name}</Text>
        <Text className="text-xs text-earth-muted">{role}</Text>
      </View>
      {onCall ? (
        <TouchableOpacity
          onPress={onCall}
          className="bg-cream-100 active:bg-cream-200 p-2 rounded-xl"
        >
          <Ionicons name="call-outline" size={18} color="#C46851" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}