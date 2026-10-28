import * as Haptics from "expo-haptics";
import React from "react";
import {
    Platform,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { styles } from "./ContactCard.styles";

export interface ContactCardProps {
  name: string;
  role: string;
  phone?: string;
  onCall?: () => void;
  isLast?: boolean;
}

export function ContactCard({
  name,
  role,
  phone,
  onCall,
  isLast = false,
}: ContactCardProps) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleCall = () => {
    if (Platform.OS !== "web") {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      } catch {}
    }
    onCall?.();
  };

  return (
    <View style={[styles.container, !isLast && styles.separator]}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>

      <View style={styles.infoCol}>
        <Text style={styles.nameText} numberOfLines={1}>
          {name}
        </Text>
        <View style={styles.roleRow}>
          <Text style={styles.roleText} numberOfLines={1}>
            {role}
          </Text>
          {phone ? (
            <>
              <View style={styles.dot} />
              <Text style={styles.phoneText}>{phone}</Text>
            </>
          ) : null}
        </View>
      </View>

      {onCall ? (
        <TouchableOpacity
          onPress={handleCall}
          activeOpacity={0.75}
          style={styles.callButton}
          accessibilityLabel={`Appeler ${name}`}
        >
          <Text style={styles.callButtonText}>Appeler</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}