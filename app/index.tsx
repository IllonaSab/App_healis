import { supabase } from "@/lib/supabase";
import { Redirect } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [hasSession, setHasSession] = useState<boolean | null>(null);

  useEffect(() => {
    let isMounted = true;

    // 1. Vérification de la session stockée au démarrage
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (isMounted) {
        setHasSession(!!session);
        setLoading(false);
      }
    });

    // 2. Écoute dynamique : réagit instantanément aux logins, logouts et suppressions
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (isMounted) {
        setHasSession(!!session);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (loading || hasSession === null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#C46851" />
      </View>
    );
  }

  // Si connecté -> Accueil (tabs), sinon -> Login
  return hasSession ? (
    <Redirect href="/(tabs)" />
  ) : (
    <Redirect href="/(auth)/login" />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAF5EF",
  },
});