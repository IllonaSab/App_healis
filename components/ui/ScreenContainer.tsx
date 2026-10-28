import React, { PropsWithChildren } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  staticContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
});