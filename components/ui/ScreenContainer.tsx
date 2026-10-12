import { ReactNode } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ScreenContainerProps {
  children: ReactNode;
  scrollable?: boolean;
}

export function ScreenContainer({ children, scrollable = true }: ScreenContainerProps) {
  return (
    <SafeAreaView className="flex-1 bg-cream-50">
      {scrollable ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 32 }}
        >
          {children}
        </ScrollView>
      ) : (
        <View className="flex-1 px-5 pt-4 pb-8">{children}</View>
      )}
    </SafeAreaView>
  );
}