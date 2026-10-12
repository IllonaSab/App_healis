import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { JournalEntryCard } from "@/components/ui/JournalEntryCard";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

interface JournalEntry {
  id: string;
  meal_type: string;
  emotion: string;
  hunger_level: number;
  satiety_level: number;
  reflection: string | null;
  created_at: string;
}

const MEAL_TYPES = [
  { id: "breakfast", label: "Petit-déjeuner" },
  { id: "lunch", label: "Déjeuner" },
  { id: "snack", label: "Collation" },
  { id: "dinner", label: "Dîner" },
  { id: "moment", label: "Moment libre" },
];

const EMOTIONS = [
  { id: "serene", label: "Serein(e)", emoji: "🌿" },
  { id: "anxious", label: "Anxieux(se)", emoji: "⚡" },
  { id: "guilty", label: "Culpabilité", emoji: "🌧️" },
  { id: "proud", label: "Fier(e)", emoji: "🌱" },
  { id: "neutral", label: "Neutre", emoji: "☁️" },
];

export default function JournalScreen() {
  const [selectedType, setSelectedType] = useState("lunch");
  const [hungerLevel, setHungerLevel] = useState<number>(5);
  const [satietyLevel, setSatietyLevel] = useState<number>(5);
  const [selectedEmotion, setSelectedEmotion] = useState("serene");
  const [reflection, setReflection] = useState("");
  const [loading, setLoading] = useState(false);
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loadingEntries, setLoadingEntries] = useState(true);

  const fetchEntries = async () => {
    try {
      setLoadingEntries(true);
      const { data, error } = await supabase
        .from("journal_entries")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) throw error;
      setEntries(data || []);
    } catch (err: any) {
      console.error("Erreur chargement entrées:", err.message);
    } finally {
      setLoadingEntries(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.from("journal_entries").insert({
        meal_type: selectedType,
        emotion: selectedEmotion,
        hunger_level: hungerLevel,
        satiety_level: satietyLevel,
        reflection: reflection.trim() || null,
      });

      if (error) throw error;

      Alert.alert("Enregistré", "Ta note a été déposée avec bienveillance.");
      setReflection("");
      fetchEntries();
    } catch (err: any) {
      Alert.alert("Erreur", err.message || "Impossible d'enregistrer la note.");
    } finally {
      setLoading(false);
    }
  };

  const getEmotionEmoji = (id: string) =>
    EMOTIONS.find((e) => e.id === id)?.emoji || "✨";

  const getMealLabel = (id: string) =>
    MEAL_TYPES.find((m) => m.id === id)?.label || id;

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <ScreenContainer>
      {/* En-tête principal via SectionHeader */}
      <SectionHeader
        surtitle="Espace d'écoute"
        title="Journal de bord"
        description="Dépose ici tes ressentis, sans jugement ni pression."
      />

      {/* Type de moment */}
      <Card>
        <Text className="text-base font-semibold text-earth-heading mb-3">
          Quel est ce moment ?
        </Text>
        <View className="flex-row flex-wrap gap-2">
          {MEAL_TYPES.map((type) => {
            const isSelected = selectedType === type.id;
            return (
              <TouchableOpacity
                key={type.id}
                onPress={() => setSelectedType(type.id)}
                className={`px-3.5 py-2 rounded-xl border ${
                  isSelected
                    ? "bg-terracotta-500 border-terracotta-500"
                    : "bg-cream-100 border-cream-200"
                }`}
              >
                <Text
                  className={`text-xs font-semibold ${
                    isSelected ? "text-white" : "text-earth-body"
                  }`}
                >
                  {type.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Card>

      {/* Météo intérieure */}
      <Card>
        <Text className="text-base font-semibold text-earth-heading mb-1">
          Météo intérieure
        </Text>
        <Text className="text-xs text-earth-muted mb-3">
          Quelle émotion est la plus présente en ce moment ?
        </Text>
        <View className="flex-row justify-between">
          {EMOTIONS.map((emo) => {
            const isSelected = selectedEmotion === emo.id;
            return (
              <TouchableOpacity
                key={emo.id}
                onPress={() => setSelectedEmotion(emo.id)}
                className={`items-center p-2.5 rounded-2xl w-[18%] border ${
                  isSelected
                    ? "bg-terracotta-300/40 border-terracotta-500"
                    : "bg-cream-100 border-cream-200"
                }`}
              >
                <Text className="text-xl mb-1">{emo.emoji}</Text>
                <Text
                  className="text-[10px] font-medium text-earth-heading text-center"
                  numberOfLines={1}
                >
                  {emo.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Card>

      {/* Sensations corporelles */}
      <Card>
        <Text className="text-base font-semibold text-earth-heading mb-1">
          Sensations physiques
        </Text>
        <Text className="text-xs text-earth-muted mb-4">
          Évalue tes signaux corporels avant et après.
        </Text>

        {/* Faim */}
        <View className="mb-4">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-xs font-semibold text-earth-body">
              Niveau de faim (avant)
            </Text>
            <Text className="text-xs font-bold text-terracotta-500">
              {hungerLevel} / 10
            </Text>
          </View>
          <View className="flex-row justify-between">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <TouchableOpacity
                key={num}
                onPress={() => setHungerLevel(num)}
                className={`w-7 h-7 rounded-lg items-center justify-center border ${
                  hungerLevel === num
                    ? "bg-terracotta-500 border-terracotta-500"
                    : "bg-cream-100 border-cream-200"
                }`}
              >
                <Text
                  className={`text-xs font-semibold ${
                    hungerLevel === num ? "text-white" : "text-earth-muted"
                  }`}
                >
                  {num}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Satiété */}
        <View>
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-xs font-semibold text-earth-body">
              Niveau de satiété (après)
            </Text>
            <Text className="text-xs font-bold text-terracotta-500">
              {satietyLevel} / 10
            </Text>
          </View>
          <View className="flex-row justify-between">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <TouchableOpacity
                key={num}
                onPress={() => setSatietyLevel(num)}
                className={`w-7 h-7 rounded-lg items-center justify-center border ${
                  satietyLevel === num
                    ? "bg-terracotta-500 border-terracotta-500"
                    : "bg-cream-100 border-cream-200"
                }`}
              >
                <Text
                  className={`text-xs font-semibold ${
                    satietyLevel === num ? "text-white" : "text-earth-muted"
                  }`}
                >
                  {num}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Card>

      {/* Pensées libres */}
      <Card>
        <Text className="text-base font-semibold text-earth-heading mb-1">
          Pensées & Contexte
        </Text>
        <TextInput
          multiline
          numberOfLines={4}
          value={reflection}
          onChangeText={setReflection}
          placeholder="Écris librement ici ce qui te traverse l'esprit..."
          placeholderTextColor="#9B8A85"
          className="bg-cream-50 border border-cream-200 rounded-2xl p-3.5 text-sm text-earth-heading min-h-[90px]"
          textAlignVertical="top"
        />
      </Card>

      {/* Bouton d'action réutilisable */}
      {loading ? (
        <ActivityIndicator size="small" color="#C46851" className="my-6" />
      ) : (
        <Button
          title="Enregistrer cette note"
          variant="primary"
          className="mt-1 mb-8"
          onPress={handleSave}
        />
      )}

      {/* Section historique avec SectionHeader */}
      <SectionHeader
        surtitle="Passage en revue"
        title="Tes notes précédentes"
      />

      {loadingEntries ? (
        <ActivityIndicator size="small" color="#C46851" className="my-4" />
      ) : entries.length === 0 ? (
        <Card variant="soft">
          <Text className="text-sm text-earth-muted text-center py-2">
            Aucune note pour le moment. Prends ton temps.
          </Text>
        </Card>
      ) : (
        entries.map((item) => (
          <JournalEntryCard
            key={item.id}
            emoji={getEmotionEmoji(item.emotion)}
            mealLabel={getMealLabel(item.meal_type)}
            dateStr={formatDate(item.created_at)}
            hungerLevel={item.hunger_level}
            satietyLevel={item.satiety_level}
            reflection={item.reflection}
          />
        ))
      )}

      <View className="h-10" />
    </ScreenContainer>
  );
}