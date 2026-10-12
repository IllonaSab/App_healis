import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: "primary" | "sos" | "secondary" | "outline";
  loading?: boolean;
}

export function Button({
  title,
  variant = "primary",
  loading = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = "py-4 px-6 rounded-2xl items-center flex-row justify-center";
  
  const variants = {
    primary: "bg-terracotta-500 active:bg-terracotta-700",
    sos: "bg-terracotta-700 active:bg-terracotta-700/90",
    secondary: "bg-cream-100 active:bg-cream-200",
    outline: "border border-terracotta-500 bg-transparent",
  };

  const textVariants = {
    primary: "text-white font-semibold text-base",
    sos: "text-white font-bold text-base",
    secondary: "text-earth-heading font-semibold text-base",
    outline: "text-terracotta-500 font-semibold text-base",
  };

  return (
    <TouchableOpacity
      className={`${baseStyles} ${variants[variant]} ${disabled ? "opacity-50" : ""} ${className}`}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === "secondary" ? "#2C1E1B" : "#FFFFFF"} />
      ) : (
        <Text className={textVariants[variant]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}