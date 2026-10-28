import * as Haptics from "expo-haptics";
import React from "react";
import {
  Platform,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";

interface SettingRowProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  value: boolean;
  onValueChange: (val: boolean) => void;
  isLast?: boolean;
}

export function SettingRow({
  title,
  subtitle,
  icon,
  value,
  onValueChange,
  isLast = false,
}: SettingRowProps) {
  const handleChange = (newVal: boolean) => {
    if (Platform.OS !== "web") {
      Haptics.selectionAsync();
    }
    onValueChange(newVal);
  };

  return (
    <View style={[styles.container, !isLast && styles.separator]}>
      {icon ? <View style={styles.iconWrapper}>{icon}</View> : null}

      <View style={styles.textWrapper}>
        <Text style={styles.titleText}>{title}</Text>
        {subtitle ? (
          <Text style={styles.subtitleText}>{subtitle}</Text>
        ) : null}
      </View>

      <Switch
        value={value}
        onValueChange={handleChange}
        trackColor={{ false: "#E8E0D7", true: "#C46851" }}
        thumbColor={Platform.OS === "android" ? (value ? "#FFFFFF" : "#F4EFEA") : "#FFFFFF"}
        ios_backgroundColor="#E8E0D7"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#F2EDE4",
  },
  iconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: "#F7F2EC",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  textWrapper: {
    flex: 1,
    paddingRight: 14,
  },
  titleText: {
    fontSize: 14.5,
    fontWeight: "600",
    color: "#38231E",
    letterSpacing: -0.2,
  },
  subtitleText: {
    fontSize: 12,
    color: "#8C7A6B",
    marginTop: 3,
    lineHeight: 16,
  },
});