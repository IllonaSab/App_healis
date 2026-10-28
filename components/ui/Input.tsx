import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export function Input({
  label,
  error,
  style,
  onFocus,
  onBlur,
  ...rest
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
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
          style={[styles.input, style]}
          {...rest}
        />
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}


export const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: "100%",
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#5C3636",
    marginBottom: 6,
    marginLeft: 2,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FDFBF9",
    borderWidth: 1.5,
    borderColor: "#EADFD3",
    borderRadius: 16,
    paddingHorizontal: 14,
    minHeight: 52,
  },
  inputFocused: {
    borderColor: "#C46851",
    backgroundColor: "#FFFFFF",
    shadowColor: "#C46851",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
  },
  inputError: {
    borderColor: "#D9534F",
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#38231E",
    paddingVertical: 10,
  },
  errorText: {
    fontSize: 12,
    color: "#D9534F",
    marginTop: 4,
    marginLeft: 4,
  },
});
