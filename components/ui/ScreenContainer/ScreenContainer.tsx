import React, { PropsWithChildren } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleProp,
    View,
    ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./ScreenContainer.styles";

export interface ScreenContainerProps extends PropsWithChildren {
  scrollable?: boolean;
  backgroundColor?: string;
  withKeyboardAvoid?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
}

export function ScreenContainer({
  children,
  scrollable = true,
  backgroundColor = "#FAF7F2",
  withKeyboardAvoid = true,
  contentContainerStyle,
  style,
}: ScreenContainerProps) {
  const content = scrollable ? (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.staticContent, contentContainerStyle]}>{children}</View>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }, style]}>
      {withKeyboardAvoid ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          {content}
        </KeyboardAvoidingView>
      ) : (
        content
      )}
    </SafeAreaView>
  );
}