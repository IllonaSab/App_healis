import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "../../../components/ui/Button/Button";
import { Input } from "../../../components/ui/Input/Input";
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
          "Un lien de confirmation vient de vous être envoyé par email.",
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
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardContainer}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          bounces={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* En-tête immersif */}
          <View style={styles.header}>
            <View style={styles.logoBadge}>
              <Image
                source={require("../../../assets/images/logo.png")}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>

            <Text style={styles.appName}>Healis</Text>
            <Text style={styles.appSubtitle}>
              Créer votre espace de soin et de bien-être
            </Text>
          </View>

          {/* Feuille de formulaire */}
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Inscription</Text>
            <Text style={styles.formSubtitle}>
              Rejoignez le programme d'accompagnement
            </Text>

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
              placeholder="Répétez votre mot de passe"
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
              style={styles.switchAuthButton}
              activeOpacity={0.7}
            >
              <Text style={styles.switchAuthText}>
                Déjà un compte ?{" "}
                <Text style={styles.switchAuthHighlight}>Se connecter</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}