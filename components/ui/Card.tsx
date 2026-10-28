import { StyleSheet, View } from "react-native";

interface CardProps {
  children: React.ReactNode;
  variant?: "default" | "white" | "soft" | "highlight";
  className?: string;
}

export function Card({ children, variant = "default", className = "" }: CardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "highlight":
        return "bg-terracotta-100/50 border-terracotta-300";
      case "soft":
        return "bg-cream-100/60 border-cream-200";
      case "white":
      case "default":
      default:
        return "bg-white border-cream-200";
    }
  };

  return (
    <View className={`rounded-2xl p-4 border mb-4 ${getVariantStyles()} ${className}`}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 28, // Arrondi généreux et organique
    padding: 22,
    marginBottom: 16,
  },
});

const variantStyles = StyleSheet.create({
  // Carte standard : blanc cassé doux, ombre diffuse chaude, sans bordure noire agressive
  default: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F0ECE6",
    shadowColor: "#7A6358",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 3,
  },

  // Carte cocon / warm : fond beige lin très léger, parfaite pour les blocs d'exercices ou résumés
  warm: {
    backgroundColor: "#F9F6F0",
    borderWidth: 1,
    borderColor: "#EFE8DC",
  },

  // Carte mise en avant : halo terracotta discret pour les alertes douces ou rendez-vous importants
  accent: {
    backgroundColor: "#FCF5F3",
    borderWidth: 1.5,
    borderColor: "#F2D8D0",
    shadowColor: "#C46851",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 2,
  },

  // Carte épurée sans ombre : pour s'intégrer discrètement dans des listes
  flat: {
    backgroundColor: "#F4F0E8",
    borderWidth: 0,
  },
});
