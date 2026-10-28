import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ContactCardProps {
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
  // Génère les initiales pour un avatar chaleureux (ex: Marie Curie -> MC)
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleCall = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    onCall?.();
  };

  return (
    <View style={[styles.container, !isLast && styles.separator]}>
      {/* Avatar avec initiales et tonalité chaude */}
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>

      {/* Détails du contact */}
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

      {/* Bouton d'appel tactile terracotta */}
      {onCall ? (
        <TouchableOpacity
          onPress={handleCall}
          activeOpacity={0.75}
          style={styles.callButton}
          accessibilityLabel={`Appeler ${name}`}
        >
          <Ionicons name="call" size={17} color="#FFFFFF" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#F2EDE4",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: "#F4EDE6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  avatarText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#C46851",
    letterSpacing: 0.5,
  },
  infoCol: {
    flex: 1,
    paddingRight: 12,
  },
  nameText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#38231E",
    letterSpacing: -0.2,
  },
  roleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },
  roleText: {
    fontSize: 12.5,
    color: "#8C7A6B",
    fontWeight: "500",
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: "#C9BEB5",
    marginHorizontal: 6,
  },
  phoneText: {
    fontSize: 12,
    color: "#A89A8F",
    fontWeight: "400",
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: "#C46851",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#C46851",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 8,
    elevation: 3,
  },
});