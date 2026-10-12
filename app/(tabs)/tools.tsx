import { BreathingCircle } from "@/components/ui/BreathingCircle";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StepItem } from "@/components/ui/StepItem";
import { useEffect, useState } from "react";

export default function ToolsScreen() {
  const [isBreathing, setIsBreathing] = useState(false);
  const [instruction, setInstruction] = useState("Prêt(e) ?");

  useEffect(() => {
    if (!isBreathing) {
      setInstruction("Prêt(e) ?");
      return;
    }
    setInstruction("Inspire lentement...");
    const interval = setInterval(() => {
      setInstruction((prev) =>
        prev === "Inspire lentement..." ? "Expire doucement..." : "Inspire lentement..."
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [isBreathing]);

  return (
    <ScreenContainer>
      <SectionHeader
        surtitle="Régulation nerveuse"
        title="Boîte à outils"
        description="Routines simples pour désamorcer l'anxiété et retrouver son ancrage."
      />

      <Card>
        <SectionHeader
          title="Respiration apaisante (4-6)"
          description="Allonge l'expiration pour stimuler le système parasympathique."
        />
        <BreathingCircle isActive={isBreathing} instruction={instruction} />
        <Button
          title={isBreathing ? "Terminer l'exercice" : "Commencer la session"}
          variant={isBreathing ? "outline" : "primary"}
          onPress={() => setIsBreathing(!isBreathing)}
        />
      </Card>

      <Card variant="soft">
        <SectionHeader
          title="Technique d'ancrage 5-4-3-2-1"
          description="Pour interrompre une boucle de pensées ou une compulsion."
        />
        <StepItem badge="5" label="choses que tu vois autour de toi" />
        <StepItem badge="4" label="textures ou objets à toucher" />
        <StepItem badge="3" label="sons que tu perçois au loin" />
        <StepItem badge="2" label="odeurs identifiables" />
        <StepItem badge="1" label="sensation corporelle apaisante" />
      </Card>
    </ScreenContainer>
  );
}