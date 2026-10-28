import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "../../../components/ui/Button/Button";
import { Card } from "../../../components/ui/Card/Card";
import { Input } from "../../../components/ui/Input/Input";
import { ScreenContainer } from "../../../components/ui/ScreenContainer/ScreenContainer";
import { styles } from "./register.styles";

export default function RegisterScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRegister = async () => {
    setErrorMessage(null);
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password || !confirmPassword) {
      setErrorMessage("Merci de renseigner tous les champs.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Le mot de passe doit comporter au moins 6 caractères.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
      });

      if (error) throw error;

      if (data.user && !data.session) {
        Alert.alert(
          "Vérification requise",
          "Un lien de confirmation vient de t'être envoyé par email.",
          [{ text: "Compris", onPress: () => router.replace("/(auth)/login") }]
        );
      } else {
        router.replace("/(tabs)");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Erreur lors de la création du compte.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardContainer}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* En-tête Logo + Titre */}
          <View style={styles.header}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.logoImage}
              resizeMode="contain"
            />
            <Text style={styles.subtitle}>Inscription</Text>
          </View>

          {/* Formulaire dans la Card */}
          <Card>
            {errorMessage ? (
              <View style={styles.errorBanner}>
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            ) : null}

            <Input
              label="Adresse email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={(text: string) => {
                setEmail(text);
                if (errorMessage) setErrorMessage(null);
              }}
              placeholder="nom@exemple.fr"
              containerStyle={styles.inputSpacing}
            />

            <Input
              label="Mot de passe"
              secureTextEntry
              value={password}
              onChangeText={(text: string) => {
                setPassword(text);
                if (errorMessage) setErrorMessage(null);
              }}
              placeholder="Au moins 6 caractères"
              containerStyle={styles.inputSpacing}
            />

            <Input
              label="Confirmation du mot de passe"
              secureTextEntry
              value={confirmPassword}
              onChangeText={(text: string) => {
                setConfirmPassword(text);
                if (errorMessage) setErrorMessage(null);
              }}
              placeholder="Répète ton mot de passe"
              containerStyle={styles.inputSpacing}
            />

            <Button
              title="Créer un compte"
              variant="primary"
              loading={loading}
              onPress={handleRegister}
              style={styles.submitButton}
            />

            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.loginLinkButton}
              activeOpacity={0.7}
            >
              <Text style={styles.loginLinkText}>
                Déjà inscrite ?{" "}
                <Text style={styles.loginLinkHighlight}>Se connecter</Text>
              </Text>
            </TouchableOpacity>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}