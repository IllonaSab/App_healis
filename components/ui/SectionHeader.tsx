import { Text, View } from "react-native";

interface SectionHeaderProps {
  surtitle?: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeader({
  surtitle,
  title,
  description,
  className = "",
}: SectionHeaderProps) {
  return (
    <View className={`mb-4 ${className}`}>
      {surtitle ? (
        <Text className="text-xs font-semibold text-terracotta-500 uppercase tracking-wider">
          {surtitle}
        </Text>
      ) : null}
      <Text className="text-2xl font-bold text-earth-heading mt-0.5">
        {title}
      </Text>
      {description ? (
        <Text className="text-sm text-earth-muted mt-1 leading-relaxed">
          {description}
        </Text>
      ) : null}
    </View>
  );
}