import { Switch, Text, View } from "react-native";

interface SettingRowProps {
  title: string;
  subtitle?: string;
  value: boolean;
  onValueChange: (val: boolean) => void;
  isLast?: boolean;
}

export function SettingRow({
  title,
  subtitle,
  value,
  onValueChange,
  isLast = false,
}: SettingRowProps) {
  return (
    <View
      className={`flex-row items-center justify-between py-2.5 ${
        !isLast ? "border-b border-cream-200" : ""
      }`}
    >
      <View className="flex-1 pr-3">
        <Text className="text-sm font-semibold text-earth-heading">{title}</Text>
        {subtitle ? (
          <Text className="text-xs text-earth-muted mt-0.5">{subtitle}</Text>
        ) : null}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#EADBCE", true: "#C46851" }}
        thumbColor="#FAF5EF"
      />
    </View>
  );
}