import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { supabase } from "@/lib/supabase";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Linking, Text, View } from "react-native";

export default function ProfileScreen() {
  const [userEmail, setUserEmail] = useState<string>("utilisateur@healis.app");
  const [newPassword, setNewPassword] = useState("");
  const [loadingPass, setLoadingPass] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user?.email) setUserEmail(data.user.email);
    });
  }, []);

  const handleUpdatePassword = async () => {
    if (newPassword.length < 6) {
      Alert.alert("Erreur", "Minimum 6 caractères.");
      return;
    }
    setLoadingPass(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      Alert.alert("Succès", "Mot de passe mis à jour.");
      setNewPassword("");
    } catch (err: any) {
      Alert.alert("Erreur", err.message);
    } finally {
      setLoadingPass(false);
    }
  };

  const handleStripe = () => {
    Linking.openURL("https://billing.stripe.com/p/login/test_healis").catch(() =>
      Alert.alert("Erreur", "Lien indisponible")
    );
  };

  return (
    <ScreenContainer>
      <SectionHeader
        surtitle="Mon Espace"
        title="Profil"
        description="Gère ton compte et ton abonnement."
      />

      {/* Identité & Mot de passe */}
      <Card>
        <Text className="text-xs font-semibold text-earth-muted uppercase mb-1">Email</Text>
        <Text className="text-sm font-bold text-earth-heading mb-4">{userEmail}</Text>

        <Input
          label="Nouveau mot de passe"
          secureTextEntry
          placeholder="Au moins 6 caractères"
          value={newPassword}
          onChangeText={setNewPassword}
        />

        {loadingPass ? (
          <ActivityIndicator color="#C46851" className="py-2" />
        ) : (
          <Button
            title="Mettre à jour le mot de passe"
            variant="secondary"
            onPress={handleUpdatePassword}
          />
        )}
      </Card>

      {/* Abonnement */}
      <Card variant="highlight">
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-sm font-bold text-earth-heading">Pass Sérénité</Text>
          <Text className="text-xs font-bold text-terracotta-700">ACTIF</Text>
        </View>
        <Button
          title="Gérer l'abonnement (Stripe)"
          variant="outline"
          onPress={handleStripe}
        />
      </Card>

      {/* Déconnexion */}
      <Button
        title="Se déconnecter"
        variant="secondary"
        className="mt-2 mb-8 border-transparent bg-transparent"
        onPress={() => supabase.auth.signOut()}
      />
    </ScreenContainer>
  );
}