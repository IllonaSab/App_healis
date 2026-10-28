import * as Haptics from "expo-haptics";
import React from "react";
import {
  ActivityIndicator,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle
} from "react-native";


export type ButtonVariant = "primary" | "sos" | "secondary" | "outline" | "ghost";

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ButtonVariant;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Button({
  title,
  variant = "primary",
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  style,
  onPress,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const handlePress = (e: any) => {
    if (isDisabled) return;

    // Retour haptique subtil à l'appui
    if (Platform.OS !== "web") {
      if (variant === "sos") {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      } else {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    }

    onPress?.(e);
  };

  // Couleurs du loader selon la variante
  const loaderColor =
    variant === "secondary" || variant === "outline" || variant === "ghost"
      ? "#C46851"
      : "#FFFFFF";

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={handlePress}
      disabled={isDisabled}
      style={[
        styles.base,
        variantStyles[variant],
        isDisabled && styles.disabled,
        style as StyleProp<ViewStyle>,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={loaderColor} size="small" />
      ) : (
        <>
          {leftIcon ? <React.Fragment>{leftIcon}</React.Fragment> : null}
          <Text
            style={[
              textBaseStyles,
              textVariantStyles[variant],
              leftIcon ? { marginLeft: 8 } : null,
              rightIcon ? { marginRight: 8 } : null,
            ]}
          >
            {title}
          </Text>
          {rightIcon ? <React.Fragment>{rightIcon}</React.Fragment> : null}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 54,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  disabled: {
    opacity: 0.55,
  },
});

const textBaseStyles: TextStyle = {
  fontSize: 15,
  letterSpacing: -0.1,
  textAlign: "center",
};

const variantStyles = StyleSheet.create({
  primary: {
    backgroundColor: "#C46851",
    shadowColor: "#C46851",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 10,
    elevation: 4,
  },
  sos: {
    backgroundColor: "#A3483E",
    borderWidth: 1.5,
    borderColor: "#E3B89B",
    shadowColor: "#A3483E",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  secondary: {
    backgroundColor: "#F3EFEA",
    borderWidth: 1,
    borderColor: "#E8E2D9",
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "#C46851",
  },
  ghost: {
    backgroundColor: "transparent",
  },
});

const textVariantStyles = StyleSheet.create({
  primary: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  sos: {
    color: "#FFFFFF",
    fontWeight: "800",
    letterSpacing: 0.2,
  },
  secondary: {
    color: "#38231E",
    fontWeight: "600",
  },
  outline: {
    color: "#C46851",
    fontWeight: "600",
  },
  ghost: {
    color: "#8C7A6B",
    fontWeight: "500",
  },
});
