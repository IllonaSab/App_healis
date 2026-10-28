import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { Redirect } from "expo-router";
import { supabase } from "@/lib/supabase";


export default function Index() {
  const [loading, setLoading] = useState(true);
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setHasSession(!!session);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FAF7F2",
        }}
      >
        <ActivityIndicator size="large" color="#C46851" />
      </View>
    );
  }

  if (hasSession) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/(auth)/login" />;
}