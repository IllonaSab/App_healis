import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
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
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center", paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* En-tête Logo + Titre */}
          <View
            className="w-full items-center justify-center pt-4 pb-4"
            style={{ width: "100%", alignItems: "center", justifyContent: "center" }}
          >
            <Image
              source={require("../../assets/images/logo.png")}
              style={{ width: 180, height: 90, alignSelf: "center" }}
              resizeMode="contain"
            />
            <Text
              className="text-xs text-earth-muted mt-2 text-center"
              style={{ textAlign: "center", color: "#8C7A6B", fontSize: 13, marginTop: 8 }}
            >
              Inscription
            </Text>
          </View>

          {/* Formulaire dans la Card */}
          <Card>
            {errorMessage ? (
              <View
                className="bg-red-50 border border-red-200 p-3 rounded-xl mb-4"
                style={{
                  backgroundColor: "#FEF2F2",
                  borderColor: "#FECACA",
                  borderWidth: 1,
                  padding: 12,
                  borderRadius: 12,
                  marginBottom: 16,
                }}
              >
                <Text
                  className="text-xs font-semibold text-red-600 text-center"
                  style={{ color: "#DC2626", textAlign: "center", fontSize: 12, fontWeight: "600" }}
                >
                  {errorMessage}
                </Text>
              </View>
            ) : null}

            <Input
              label="Adresse email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errorMessage) setErrorMessage(null);
              }}
              placeholder="nom@exemple.fr"
            />

            <Input
              label="Mot de passe"
              secureTextEntry
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errorMessage) setErrorMessage(null);
              }}
              placeholder="Au moins 6 caractères"
            />

            <Input
              label="Confirmation du mot de passe"
              secureTextEntry
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                if (errorMessage) setErrorMessage(null);
              }}
              placeholder="Répète ton mot de passe"
            />

            {loading ? (
              <ActivityIndicator color="#C46851" style={{ paddingVertical: 12 }} />
            ) : (
              <Button
                title="Créer un compte"
                variant="primary"
                onPress={handleRegister}
                className="mt-2 mb-3"
              />
            )}

            <TouchableOpacity
              onPress={() => router.back()}
              style={{ paddingVertical: 10, alignItems: "center" }}
            >
              <Text
                className="text-xs text-earth-muted"
                style={{ fontSize: 12, color: "#8C7A6B" }}
              >
                Déjà inscrite ?{" "}
                <Text
                  className="font-bold text-terracotta-500"
                  style={{ color: "#C46851", fontWeight: "bold" }}
                >
                  Se connecter
                </Text>
              </Text>
            </TouchableOpacity>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}