import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";


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
    <View style={{ flex: 1, backgroundColor: "#C46851" }}>
      <StatusBar />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          bounces={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* En-tête immersif */}
          <View
            style={{
              paddingTop: Platform.OS === "ios" ? 64 : 40,
              paddingBottom: 36,
              paddingHorizontal: 28,
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 72,
                height: 72,
                borderRadius: 24,
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 14,
              }}
            >
              <Image
                source={require("../../assets/images/logo.png")}
                style={{ width: 80, height: 80 }}
                resizeMode="contain"
              />
            </View>

            <Text
              style={{
                fontSize: 28,
                fontWeight: "700",
                color: "#FFFFFF",
                letterSpacing: -0.5,
              }}
            >
              Healis
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: "rgba(255, 255, 255, 0.85)",
                marginTop: 4,
                letterSpacing: 0.2,
              }}
            >
              Votre espace de soin et de bien-être
            </Text>
          </View>

          {/* Feuille de formulaire blanche / crème */}
          <View
            style={{
              flex: 1,
              backgroundColor: "#FAF7F2",
              borderTopLeftRadius: 36,
              borderTopRightRadius: 36,
              paddingHorizontal: 28,
              paddingTop: 32,
              paddingBottom: 40,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                color: "#38231E",
                letterSpacing: -0.3,
              }}
            >
              Connexion
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: "#8C7A6B",
                marginTop: 4,
                marginBottom: 24,
              }}
            >
              Renseignez vos identifiants pour continuer
            </Text>

            {/* Message d'erreur */}
            {errorMessage && (
              <View
                style={{
                  backgroundColor: "#FDF2F0",
                  borderColor: "#F7D4CF",
                  borderWidth: 1,
                  padding: 12,
                  borderRadius: 14,
                  marginBottom: 16,
                }}
              >
                <Text
                  style={{
                    color: "#C44335",
                    fontSize: 12,
                    fontWeight: "600",
                    textAlign: "center",
                  }}
                >
                  {errorMessage}
                </Text>
              </View>
            )}

            {/* Champ Email */}
            <View style={{ marginBottom: 16 }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "600",
                  color: "#5C3636",
                  marginBottom: 6,
                  marginLeft: 4,
                }}
              >
                Adresse email
              </Text>
              <TextInput
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (errorMessage) setErrorMessage(null);
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="nom@exemple.fr"
                placeholderTextColor="#A89A8F"
                style={{
                  backgroundColor: "#F3EFEA",
                  borderRadius: 16,
                  paddingHorizontal: 18,
                  paddingVertical: 14,
                  fontSize: 15,
                  color: "#38231E",
                }}
              />
            </View>

            {/* Champ Mot de passe */}
            <View style={{ marginBottom: 12 }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "600",
                  color: "#5C3636",
                  marginBottom: 6,
                  marginLeft: 4,
                }}
              >
                Mot de passe
              </Text>
              <TextInput
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (errorMessage) setErrorMessage(null);
                }}
                secureTextEntry
                placeholder="••••••••"
                placeholderTextColor="#A89A8F"
                style={{
                  backgroundColor: "#F3EFEA",
                  borderRadius: 16,
                  paddingHorizontal: 18,
                  paddingVertical: 14,
                  fontSize: 15,
                  color: "#38231E",
                }}
              />
            </View>

            {/* Mot de passe oublié */}
            <TouchableOpacity
              onPress={handleForgotPassword}
              style={{ alignSelf: "flex-end", marginBottom: 28 }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "600",
                  color: "#C46851",
                }}
              >
                Mot de passe oublié ?
              </Text>
            </TouchableOpacity>

            {/* Bouton de validation principal */}
            {loading ? (
              <ActivityIndicator
                color="#C46851"
                style={{ paddingVertical: 16 }}
              />
            ) : (
              <TouchableOpacity
                onPress={handleLogin}
                activeOpacity={0.85}
                style={{
                  backgroundColor: "#C46851",
                  borderRadius: 18,
                  height: 52,
                  justifyContent: "center",
                  alignItems: "center",
                  shadowColor: "#C46851",
                  shadowOffset: { width: 0, height: 6 },
                  shadowOpacity: 0.28,
                  shadowRadius: 10,
                  elevation: 5,
                  marginBottom: 20,
                }}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 15,
                    fontWeight: "700",
                    letterSpacing: 0.2,
                  }}
                >
                  Se connecter
                </Text>
              </TouchableOpacity>
            )}

            {/* Lien Inscription */}
            <TouchableOpacity
              onPress={() => router.push("/(auth)/register")}
              style={{ alignItems: "center", paddingVertical: 8 }}
            >
              <Text style={{ fontSize: 13, color: "#8C7A6B" }}>
                Pas encore de compte ?{" "}
                <Text style={{ fontWeight: "700", color: "#C46851" }}>
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