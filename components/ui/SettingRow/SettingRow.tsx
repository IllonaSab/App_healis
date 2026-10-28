import * as Haptics from "expo-haptics";
import React from "react";
import {
    Platform,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { styles } from "./SettingRow.styles";

export interface SettingRowProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  /**
   * Booléen pour un interrupteur Switch,
   * ou chaîne de caractères pour une donnée textuelle.
   */
  value?: boolean | string;
  onValueChange?: (val: boolean) => void;
  actionLabel?: string;
  onPress?: () => void;
  isLast?: boolean;
}

export function SettingRow({
  title,
  subtitle,
  icon,
  value,
  onValueChange,
  actionLabel,
  onPress,
  isLast = false,
}: SettingRowProps) {
  const isSwitch = typeof value === "boolean";

  const handleSwitchChange = (newVal: boolean) => {
    if (Platform.OS !== "web") {
      try {
        Haptics.selectionAsync();
      } catch {}
    }
    onValueChange?.(newVal);
  };

  const handleActionPress = () => {
    if (Platform.OS !== "web") {
      try {
        Haptics.selectionAsync();
      } catch {}
    }
    onPress?.();
  };

  return (
    <View style={[styles.container, !isLast && styles.separator]}>
      {icon ? <View style={styles.iconWrapper}>{icon}</View> : null}

      <View style={styles.textWrapper}>
        <Text style={styles.titleText}>{title}</Text>
        {subtitle ? (
          <Text style={styles.subtitleText}>{subtitle}</Text>
        ) : null}
        {!isSwitch && typeof value === "string" ? (
          <Text style={styles.valueText}>{value}</Text>
        ) : null}
      </View>

      {isSwitch ? (
        <Switch
          value={value}
          onValueChange={handleSwitchChange}
          trackColor={{ false: "#E8E0D7", true: "#C46851" }}
          thumbColor={
            Platform.OS === "android"
              ? value
                ? "#FFFFFF"
                : "#F4EFEA"
              : "#FFFFFF"
          }
          ios_backgroundColor="#E8E0D7"
        />
      ) : actionLabel || onPress ? (
        <TouchableOpacity
          onPress={handleActionPress}
          activeOpacity={0.7}
          style={styles.actionPill}
        >
          <Text style={styles.actionText}>{actionLabel ?? "Modifier"}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}