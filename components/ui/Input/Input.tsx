import React, { useState } from "react";
import {
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import { styles } from "./Input.styles";

export interface InputProps extends Omit<TextInputProps, "onChangeText"> {
  label?: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
  onChangeText?: (text: string) => void;
}

export function Input({
  label,
  error,
  style,
  containerStyle,
  onFocus,
  onBlur,
  onChangeText,
  ...rest
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View
        style={[
          styles.inputWrapper,
          isFocused && styles.inputFocused,
          !!error && styles.inputError,
        ]}
      >
        <TextInput
          placeholderTextColor="#A89A8F"
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          onChangeText={onChangeText}
          style={[styles.input, style]}
          {...rest}
        />
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}