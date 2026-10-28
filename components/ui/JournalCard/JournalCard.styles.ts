import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  base: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FAF6F0",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderWidth: 1.5,
    borderColor: "#EFE8DC",
  },
  square: {
    aspectRatio: 0.9,
    paddingVertical: 10,
  },
  selected: {
    backgroundColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 3,
    transform: [{ scale: 1.03 }],
  },
  emojiSmall: {
    fontSize: 20,
    marginBottom: 4,
  },
  emojiBig: {
    fontSize: 28,
    marginBottom: 6,
  },
  labelText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#8C7A6B",
    textAlign: "center",
    letterSpacing: -0.1,
  },
  labelTextSelected: {
    fontWeight: "700",
  },
});
