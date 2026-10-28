import { StyleSheet, TextStyle } from "react-native";

export const styles = StyleSheet.create({
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

export const textBaseStyles: TextStyle = {
  fontSize: 15,
  letterSpacing: -0.1,
  textAlign: "center",
};

export const variantStyles = StyleSheet.create({
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
  danger: {
    backgroundColor: "#FAF0ED",
    borderWidth: 1.5,
    borderColor: "#F0C8BC",
  },
});

export const textVariantStyles = StyleSheet.create({
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
  danger: {
    color: "#C46851",
    fontWeight: "700",
  },
});
