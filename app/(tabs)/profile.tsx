import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "../../components/ui/Button/Button";
import { Card } from "../../components/ui/Card/Card";
import { ScreenContainer } from "../../components/ui/ScreenContainer/ScreenContainer";
import { SectionHeader } from "../../components/ui/SectionHeader/SectionHeader";
import { SettingRow } from "../../components/ui/SettingRow/SettingRow";

const WEATHER_STATES = ["Sereine", "En chemin", "Brouillard", "Apaisée"];

export default function ProfileScreen() {
  const [weatherIdx, setWeatherIdx] = useState(0);

  const cycleWeather = () => {
    if (Platform.OS !== "web") {
      try {
        Haptics.selectionAsync();
      } catch {}
    }
    setWeatherIdx((prev) => (prev + 1) % WEATHER_STATES.length);
  };

  const confirmLogout = () => {
    Alert.alert(
      "Déconnexion",
      "Souhaitez-vous fermer votre session sur cet appareil ?",
      [
        { text: "Annuler", style: "cancel" },
        { text: "Se déconnecter", style: "destructive", onPress: () => {} },
      ]
    );
  };

  const confirmDelete = () => {
    Alert.alert(
      "Zone critique",
      "Cette action supprimera définitivement votre compte et tout votre historique thérapeutique.",
      [
        { text: "Conserver mon compte", style: "cancel" },
        { text: "Supprimer définitivement", style: "destructive", onPress: () => {} },
      ]
    );
  };

  return (
    <ScreenContainer scrollable>
      <SectionHeader
        surtitle="Espace sécurisé"
        title="Profil & Repères"
        description="Gérez votre compte et vos accès en toute sérénité."
      />

      {/* 1. IDENTITÉ VISUELLE & PHRASE D'ANCRAGE */}
      <Card style={styles.card}>
        <View style={styles.userRow}>
          <View style={styles.natureBadge}>
            <Text style={styles.natureInitial}>C</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.userName}>Camille Durand</Text>
            <TouchableOpacity
              onPress={cycleWeather}
              activeOpacity={0.7}
              style={styles.weatherButton}
            >
              <Text style={styles.weatherTag}>Météo d'ancrage</Text>
              <Text style={styles.weatherValue}>{WEATHER_STATES[weatherIdx]} ▾</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Card variant="warm" style={styles.anchorQuoteBox}>
          <Text style={styles.anchorQuote}>
            « Chaque petit pas vers la paix alimentaire compte. »
          </Text>
        </Card>
      </Card>

      {/* 2. SÉCURITÉ & PARAMÈTRES DU COMPTE */}
      <Card style={styles.card}>
        <Text style={styles.cardTitle}>Paramètres du compte</Text>
        <Text style={styles.cardDesc}>
          Informations de connexion et accompagnement en cours.
        </Text>

        <SettingRow
          title="Adresse e-mail"
          value="camille.durand@email.com"
          actionLabel="Modifier"
          onPress={() => {}}
        />

        <SettingRow
          title="Mot de passe"
          value="••••••••••••"
          actionLabel="Changer"
          onPress={() => {}}
        />

        <SettingRow
          title="Langue"
          value="Français (FR)"
          actionLabel="Changer"
          onPress={() => {}}
        />

        <SettingRow
          title="Notifications"
          value="Rappels bienveillants & hydratation"
          actionLabel="Gérer"
          onPress={() => {}}
        />

        <SettingRow
          title="Abonnement"
          value="Accompagnement Premium (12/12/2026)"
          actionLabel="Gérer"
          onPress={() => {}}
          isLast
        />
      </Card>

      {/* 3. DÉCONNEXION & SUPPRESSION */}
      <Card style={[styles.card, { marginBottom: 32 }]}>
        <Text style={styles.cardTitle}>Gestion de session</Text>
        <Text style={styles.cardDesc}>
          Contrôlez vos accès ou supprimez définitivement vos données.
        </Text>

        <View style={styles.actionsContainer}>
          <Button
            title="Se déconnecter"
            variant="outline"
            onPress={confirmLogout}
          />

          <Button
            title="Supprimer mon compte"
            variant="danger"
            onPress={confirmDelete}
          />
        </View>
      </Card>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  natureBadge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#FAF6F1",
    borderWidth: 1.5,
    borderColor: "#E3B89B",
    alignItems: "center",
    justifyContent: "center",
  },
  natureInitial: {
    fontSize: 20,
    fontWeight: "700",
    color: "#C46851",
  },
  userName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#38231E",
    marginBottom: 3,
  },
  weatherButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  weatherTag: {
    fontSize: 11.5,
    color: "#8C7A6B",
  },
  weatherValue: {
    fontSize: 12,
    fontWeight: "700",
    color: "#C46851",
  },
  anchorQuoteBox: {
    marginTop: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderLeftWidth: 3,
    borderLeftColor: "#C46851",
  },
  anchorQuote: {
    fontSize: 13,
    fontStyle: "italic",
    color: "#5C3636",
    lineHeight: 18,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#38231E",
  },
  cardDesc: {
    fontSize: 12.5,
    color: "#6B584C",
    lineHeight: 17,
    marginTop: 4,
    marginBottom: 16,
  },
  actionsContainer: {
    gap: 12,
    marginTop: 4,
  },
});