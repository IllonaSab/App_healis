import { supabase } from "@/lib/supabase";

export interface DailyLog {
  id?: string;
  user_id?: string;
  date: string;
  mood?: string | null;
  meals: Record<string, string>;
  water_glasses: number;
}

const getTodayDateString = () => new Date().toISOString().split("T")[0];

export const journalService = {
  // Récupérer le journal du jour
  async getTodayLog(): Promise<DailyLog | null> {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    // Si pas de session active, on renvoie null sans déclencher d'erreur critique
    if (userError || !user) {
      return null;
    }

    const today = getTodayDateString();
    const { data, error } = await supabase
      .from("daily_logs")
      .select("*")
      .eq("user_id", user.id)
      .eq("date", today)
      .maybeSingle();

    if (error) {
      console.warn("Erreur requête Supabase:", error.message);
      return null;
    }

    return data;
  },

  // Sauvegarder les modifications
  async saveTodayLog(updates: Partial<DailyLog>): Promise<DailyLog | null> {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.warn("Impossible de sauvegarder : utilisateur non connecté.");
      return null;
    }

    const today = getTodayDateString();
    const payload = {
      user_id: user.id,
      date: today,
      ...updates,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("daily_logs")
      .upsert(payload, { onConflict: "user_id,date" })
      .select()
      .single();

    if (error) {
      console.error("Erreur upsert daily_logs:", error.message);
      throw error;
    }

    return data;
  },
};
