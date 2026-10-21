import React from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
  containerClassName?: string;
}

export function Input({
  label,
  error,
  containerClassName = "mb-4",
  className = "",
  ...props
}: InputProps) {
  return (
    <View className={containerClassName}>
      <Text className="text-xs font-semibold text-earth-body mb-1.5">
        {label}
      </Text>
      <TextInput
        placeholderTextColor="#9B8A85"
        className={`bg-cream-50 rounded-xl px-3.5 py-2.5 text-sm border text-earth-heading ${
          error ? "border-red-400" : "border-cream-200"
        } ${className}`}
        {...props}
      />
      {error ? (
        <Text className="text-[11px] text-red-500 mt-1">{error}</Text>
      ) : null}
    </View>
  );
}