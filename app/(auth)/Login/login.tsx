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
import { styles } from "./login.styles";

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async () => {
    setErrorMessage(null);
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      setErrorMessage("Merci de renseigner tous les champs.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          throw new Error("Email ou mot de passe incorrect.");
        }
        throw error;
      }

      router.replace("/(tabs)");
    } catch (err: any) {
      setErrorMessage(err.message || "Erreur de connexion.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      Alert.alert(
        "Mot de passe oublié",
        "Renseigne ton adresse email pour recevoir un lien de réinitialisation."
      );
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail);
      if (error) throw error;
      Alert.alert(
        "Lien envoyé",
        "Si cette adresse existe, un email vient d'être envoyé."
      );
    } catch (err: any) {
      Alert.alert("Erreur", err.message);
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
                source={require("../../assets/images/logo.png")}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>

            <Text style={styles.appName}>Healis</Text>
            <Text style={styles.appSubtitle}>
              Votre espace de soin et de bien-être
            </Text>
          </View>

          {/* Formulaire */}
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Connexion</Text>
            <Text style={styles.formSubtitle}>
              Renseignez vos identifiants pour continuer
            </Text>

            {/* Erreur */}
            {errorMessage ? (
              <View style={styles.errorBanner}>
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            ) : null}

            {/* Email */}
            <Input
              label="Adresse email"
              value={email}
              onChangeText={(text: string) => {
                setEmail(text);
                if (errorMessage) setErrorMessage(null);
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="nom@exemple.fr"
              containerStyle={styles.inputSpacing}
            />

            <Input
              label="Mot de passe"
              value={password}
              onChangeText={(text: string) => {
                setPassword(text);
                if (errorMessage) setErrorMessage(null);
              }}
              secureTextEntry
              placeholder="••••••••"
              containerStyle={styles.inputSpacing}
            />

            {/* Mot de passe oublié */}
            <TouchableOpacity
              onPress={handleForgotPassword}
              style={styles.forgotPasswordButton}
              activeOpacity={0.7}
            >
              <Text style={styles.forgotPasswordText}>
                Mot de passe oublié ?
              </Text>
            </TouchableOpacity>

            {/* Bouton de validation */}
            <Button
              title="Se connecter"
              variant="primary"
              loading={loading}
              onPress={handleLogin}
              style={styles.submitButton}
            />

            {/* Lien Inscription */}
            <TouchableOpacity
              onPress={() => router.push("/(auth)/register")}
              style={styles.switchAuthButton}
              activeOpacity={0.7}
            >
              <Text style={styles.switchAuthText}>
                Pas encore de compte ?{" "}
                <Text style={styles.switchAuthHighlight}>
                  Créer un compte
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}