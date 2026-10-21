import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Alert, View } from "react-native";

export default function AuthScreen() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert("Attention", "Merci de renseigner ton email et ton mot de passe.");
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
        });
        if (error) throw error;
        Alert.alert(
          "Compte créé",
          "Vérifie ta boîte mail si la confirmation est activée, ou connecte-toi dès maintenant."
        );
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (error) throw error;
        router.replace("/(tabs)");
      }
    } catch (err: any) {
      Alert.alert("Erreur d'authentification", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <SectionHeader
        surtitle="Espace personnel"
        title={isSignUp ? "Créer un compte" : "Bon retour"}
        description={
          isSignUp
            ? "Rejoins Healis pour conserver tes réflexions en toute sécurité."
            : "Connecte-toi pour retrouver ton journal et tes repères."
        }
      />

      <Card>
        <Input
          label="Adresse email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          placeholder="ex: contact@exemple.fr"
        />

        <Input
          label="Mot de passe"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholder="Au moins 6 caractères"
        />

        <View className="mt-2 mb-3">
          {loading ? (
            <ActivityIndicator color="#C46851" className="py-2" />
          ) : (
            <Button
              title={isSignUp ? "Créer mon espace" : "Me connecter"}
              variant="primary"
              onPress={handleAuth}
            />
          )}
        </View>

        <Button
          title={
            isSignUp
              ? "Déjà inscrite ? Se connecter"
              : "Pas encore de compte ? S'inscrire"
          }
          variant="secondary"
          onPress={() => setIsSignUp(!isSignUp)}
        />
      </Card>
    </ScreenContainer>
  );
}