import React from "react";
import { StyleProp, Text, View, ViewStyle } from "react-native";
import { styles } from "./SectionHeader.styles";

export interface SectionHeaderProps {
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