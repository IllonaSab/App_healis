import { View } from "react-native";

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