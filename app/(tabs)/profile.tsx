import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { supabase } from "@/lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Linking,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  // Préférences
  const [gentleReminders, setGentleReminders] = useState(true);
  const [appLock, setAppLock] = useState(false);

  // État utilisateur Supabase
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // Gestion changement de mot de passe
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Statut Abonnement (simulation prête pour Stripe Customer Portal)
  const [isPremium, setIsPremium] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoadingUser(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user?.email) {
        setUserEmail(user.email);
      } else {
        setUserEmail("utilisateur@healis.app");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingUser(false);
    }
  };

  // Appel téléphonique natif
  const handleCall = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`).catch(() => {
      Alert.alert("Erreur", "Impossible de composer ce numéro depuis cet appareil.");
    });
  };

  // Mise à jour mot de passe avec Supabase Auth
  const handleUpdatePassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      Alert.alert("Erreur", "Le mot de passe doit comporter au moins 6 caractères.");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas.");
      return;
    }

    setPasswordLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      Alert.alert("Succès", "Ton mot de passe a bien été mis à jour.");
      setNewPassword("");
      setConfirmPassword("");
      setIsChangingPassword(false);
    } catch (err: any) {
      Alert.alert("Erreur", err.message || "Impossible de mettre à jour le mot de passe.");
    } finally {
      setPasswordLoading(false);
    }
  };

  // Gestion Abonnement Stripe
  const handleManageSubscription = () => {
    // Redirection vers le portail client Stripe ou page d'abonnement
    Alert.alert(
      "Abonnement Stripe",
      "Redirection vers ton portail de facturation sécurisé Stripe...",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Ouvrir",
          onPress: () => {
            // Remplacer par ton lien Stripe Customer Portal ou Stripe Checkout
            Linking.openURL("https://billing.stripe.com/p/login/test_healis").catch(
              () => Alert.alert("Erreur", "Lien indisponible pour le moment.")
            );
          },
        },
      ]
    );
  };

  // Déconnexion
  const handleSignOut = async () => {
    Alert.alert("Déconnexion", "Es-tu sûr(e) de vouloir te déconnecter ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Me déconnecter",
        style: "destructive",
        onPress: async () => {
          await supabase.auth.signOut();
          Alert.alert("Déconnecté(e)", "À très bientôt sur Healis.");
        },
      },
    ]);
  };

  return (
    <ScreenContainer>
      {/* En-tête */}
      <SectionHeader
        surtitle="Mon Espace"
        title="Profil"
        description="Gère tes accès, ton abonnement et ton réseau"
      />

      {/* 1. Carte Identité & Compte */}
      <Card>
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row items-center gap-3">
            <View className="w-12 h-12 rounded-full bg-terracotta-100 items-center justify-center border border-terracotta-200">
              <Ionicons name="person" size={24} color="#C46851" />
            </View>
            <View>
              <Text className="text-sm font-bold text-earth-heading">
                {loadingUser ? "Chargement..." : userEmail}
              </Text>
            </View>
          </View>
        </View>

        {/* Bouton pour déplier le changement de mot de passe */}
        <TouchableOpacity
          onPress={() => setIsChangingPassword(!isChangingPassword)}
          className="flex-row items-center justify-between py-2.5 border-t border-cream-200 mt-1"
        >
          <View className="flex-row items-center gap-2">
            <Ionicons name="key-outline" size={18} color="#C46851" />
            <Text className="text-xs font-semibold text-earth-heading">
              Modifier mon mot de passe
            </Text>
          </View>
          <Ionicons
            name={isChangingPassword ? "chevron-up" : "chevron-down"}
            size={18}
            color="#9B8A85"
          />
        </TouchableOpacity>

        {/* Formulaire Mot de passe (Accordéon) */}
        {isChangingPassword ? (
          <View className="bg-cream-100/60 p-3.5 rounded-2xl border border-cream-200 mt-2 space-y-2.5">
            <View>
              <Text className="text-[11px] font-semibold text-earth-body mb-1">
                Nouveau mot de passe
              </Text>
              <TextInput
                secureTextEntry
                placeholder="Au moins 6 caractères"
                placeholderTextColor="#9B8A85"
                value={newPassword}
                onChangeText={setNewPassword}
                className="bg-white border border-cream-200 rounded-xl px-3 py-2 text-xs text-earth-heading"
              />
            </View>

            <View className="mt-2">
              <Text className="text-[11px] font-semibold text-earth-body mb-1">
                Confirmer le nouveau mot de passe
              </Text>
              <TextInput
                secureTextEntry
                placeholder="Répète ton mot de passe"
                placeholderTextColor="#9B8A85"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                className="bg-white border border-cream-200 rounded-xl px-3 py-2 text-xs text-earth-heading"
              />
            </View>

            {passwordLoading ? (
              <ActivityIndicator size="small" color="#C46851" className="mt-2" />
            ) : (
              <Button
                title="Mettre à jour le mot de passe"
                variant="primary"
                className="py-2.5 mt-2"
                onPress={handleUpdatePassword}
              />
            )}
          </View>
        ) : null}
      </Card>

      {/* 2. Carte Abonnement Healis / Stripe */}
      <Card variant={isPremium ? "highlight" : "default"}>
        <View className="flex-row items-center justify-between mb-2">
          <View>
            <View className="flex-row items-center gap-1.5">
              <Text className="text-xs font-bold text-terracotta-700 uppercase tracking-wider">
                Abonnement HEALIS
              </Text>
            </View>
            <Text className="text-base font-bold text-earth-heading mt-0.5">
              {isPremium ? "Pass Sérénité Illimité" : "Formule Découverte"}
            </Text>
          </View>
          <View className="bg-terracotta-500/10 px-2.5 py-1 rounded-full border border-terracotta-500/20">
            <Text className="text-[10px] font-bold text-terracotta-700">
              {isPremium ? "ACTIF" : "GRATUIT"}
            </Text>
          </View>
        </View>
        <Button
          title={isPremium ? "Gérer mon abonnement (Factures / Carte)" : "Débloquer Healis Sérénité"}
          variant="outline"
          className="py-2.5 rounded-xl border-terracotta-500"
          onPress={handleManageSubscription}
        />
      </Card>

      {/* 3. Cercle de soutien / Contacts d'urgence */}
      <Card>
        <View className="flex-row items-center justify-between mb-3">
          <View>
            <Text className="text-base font-semibold text-earth-heading">
              Cercle de soutien
            </Text>
            <Text className="text-xs text-earth-muted">
              Tes repères à joindre directement en cas de crise
            </Text>
          </View>
          <Ionicons name="shield-checkmark-outline" size={22} color="#C46851" />
        </View>

        {/* Contact Soignant */}
        <View className="flex-row items-center justify-between py-2.5 border-b border-cream-200">
          <View>
            <Text className="text-sm font-semibold text-earth-heading">
              Dr. Martin (Thérapeute)
            </Text>
            <Text className="text-xs text-earth-muted">Suivi psychologique</Text>
          </View>
          <TouchableOpacity
            onPress={() => handleCall("0123456789")}
            className="bg-cream-100 p-2 rounded-xl active:bg-cream-200"
          >
            <Ionicons name="call-outline" size={18} color="#C46851" />
          </TouchableOpacity>
        </View>

        {/* Contact Proche */}
        <View className="flex-row items-center justify-between py-2.5 mb-3">
          <View>
            <Text className="text-sm font-semibold text-earth-heading">
              Camille (Personne de confiance)
            </Text>
            <Text className="text-xs text-earth-muted">Ancrage et écoute</Text>
          </View>
          <TouchableOpacity
            onPress={() => handleCall("0600000000")}
            className="bg-cream-100 p-2 rounded-xl active:bg-cream-200"
          >
            <Ionicons name="call-outline" size={18} color="#C46851" />
          </TouchableOpacity>
        </View>

        <Button
          title="+ Ajouter un contact ressource"
          variant="secondary"
          className="py-2.5 rounded-xl"
          onPress={() => Alert.alert("Contact", "Fonctionnalité d'ajout bientôt connectée à la base.")}
        />
      </Card>

      {/* 4. Préférences de sérénité */}
      <Card>
        <Text className="text-base font-semibold text-earth-heading mb-3">
          Préférences & Bienveillance
        </Text>

        <View className="flex-row items-center justify-between py-2.5 border-b border-cream-200">
          <View className="flex-1 pr-3">
            <Text className="text-sm font-semibold text-earth-heading">
              Rappels bienveillants
            </Text>
            <Text className="text-xs text-earth-muted">
              Notifications douces sans injonction ni culpabilité
            </Text>
          </View>
          <Switch
            value={gentleReminders}
            onValueChange={setGentleReminders}
            trackColor={{ false: "#EADBCE", true: "#C46851" }}
            thumbColor="#FAF5EF"
          />
        </View>

        <View className="flex-row items-center justify-between py-2.5">
          <View className="flex-1 pr-3">
            <Text className="text-sm font-semibold text-earth-heading">
              Verrouillage de l'application
            </Text>
            <Text className="text-xs text-earth-muted">
              Code PIN ou FaceID à l'ouverture
            </Text>
          </View>
          <Switch
            value={appLock}
            onValueChange={setAppLock}
            trackColor={{ false: "#EADBCE", true: "#C46851" }}
            thumbColor="#FAF5EF"
          />
        </View>
      </Card>

      {/* 5. Ligne d'aide officielle */}
      <Card variant="soft">
        <Text className="text-xs font-bold text-terracotta-700 uppercase tracking-wider mb-1">
          Ligne d'écoute TCA (Anorexie Boulimie Info Écoute)
        </Text>
        <TouchableOpacity
          onPress={() => handleCall("0810037037")}
          className="flex-row items-center justify-between py-1"
        >
          <Text className="text-base font-bold text-earth-heading">
            0810 037 037
          </Text>
          <View className="flex-row items-center gap-1 bg-white/80 px-2 py-1 rounded-lg border border-cream-200">
            <Ionicons name="call" size={12} color="#C46851" />
            <Text className="text-xs font-bold text-terracotta-500">Appeler</Text>
          </View>
        </TouchableOpacity>
        <Text className="text-xs text-earth-body mt-1">
          Permanence d'écoute spécialisée, anonyme et bienveillante.
        </Text>
      </Card>

      {/* Déconnexion */}
      <TouchableOpacity
        onPress={handleSignOut}
        className="flex-row items-center justify-center gap-2 py-3 mb-8"
      >
        <Ionicons name="log-out-outline" size={18} color="#9B8A85" />
        <Text className="text-xs font-semibold text-earth-muted">
          Se déconnecter de Healis
        </Text>
      </TouchableOpacity>
    </ScreenContainer>
  );
}