import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  animationArea: {
    width: 240,
    height: 240,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 36,
  },
  outerCircle: {
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 5,
    backgroundColor: "#FAF6F1",
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#5C3636",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  phaseTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  countdownNumber: {
    fontSize: 26,
    fontWeight: "800",
    color: "#38231E",
  },
  subtitleHint: {
    fontSize: 12,
    color: "#8C7A6B",
    fontWeight: "500",
  },
});
