import * as Haptics from "expo-haptics";
import React from "react";
import {
    ActivityIndicator,
    GestureResponderEvent,
    Platform,
    StyleProp,
    Text,
    TouchableOpacity,
    TouchableOpacityProps,
    ViewStyle,
} from "react-native";
import {
    styles,
    textBaseStyles,
    textVariantStyles,
    variantStyles,
} from "./Button.styles";

export type ButtonVariant =
  | "primary"
  | "sos"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger";

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

  const handlePress = (e: GestureResponderEvent) => {
    if (isDisabled) return;

    if (Platform.OS !== "web") {
      try {
        if (variant === "sos" || variant === "danger") {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        } else {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
      } catch {}
    }

    onPress?.(e);
  };

  const loaderColor =
    variant === "secondary" ||
    variant === "outline" ||
    variant === "ghost" ||
    variant === "danger"
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