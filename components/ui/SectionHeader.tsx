import React from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

interface SectionHeaderProps {
  surtitle?: string;
  title: string;
  description?: string;
  style?: StyleProp<ViewStyle>;
  action?: React.ReactNode;
}

export function SectionHeader({
  surtitle,
  title,
  description,
  style,
  action,
}: SectionHeaderProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.headerRow}>
        <View style={styles.textColumn}>
          {surtitle ? (
            <View style={styles.surtitleBadge}>
              <Text style={styles.surtitleText}>{surtitle}</Text>
            </View>
          ) : null}

          <Text style={styles.titleText}>{title}</Text>
        </View>

        {action ? <View style={styles.actionContainer}>{action}</View> : null}
      </View>

      {description ? (
        <Text style={styles.descriptionText}>{description}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    marginTop: 6,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  textColumn: {
    flex: 1,
    paddingRight: 10,
  },
  surtitleBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#F4ECE5",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginBottom: 8,
  },
  surtitleText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#C46851",
    letterSpacing: 0.3,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#38231E",
    letterSpacing: -0.4,
    lineHeight: 30,
  },
  descriptionText: {
    fontSize: 13.5,
    color: "#8C7A6B",
    marginTop: 6,
    lineHeight: 20,
    letterSpacing: -0.1,
  },
  actionContainer: {
    paddingBottom: 4,
  },
});