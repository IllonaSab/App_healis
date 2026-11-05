import React, { useState } from "react";
import {
  Image,
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { styles } from "./Input.styles";

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

export function Input({
  label,
  error,
  containerStyle,
  secureTextEntry,
  style,
  ...props
}: InputProps) {
  const [isPasswordHidden, setIsPasswordHidden] = useState(Boolean(secureTextEntry));

  const togglePasswordVisibility = () => {
    setIsPasswordHidden((prev) => !prev);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View style={[styles.inputWrapper, error ? styles.inputWrapperError : null]}>
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor="#A89A8F"
          secureTextEntry={secureTextEntry ? isPasswordHidden : false}
          {...props}
        />

        {secureTextEntry ? (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            activeOpacity={0.7}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            style={styles.eyeButton}
          >
            <Image
              source={
                isPasswordHidden
                  ? require("../../../assets/images/ferme.png")
                  : require("../../../assets/images/ouvert.png")
              }
              style={styles.eyeImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : null}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}