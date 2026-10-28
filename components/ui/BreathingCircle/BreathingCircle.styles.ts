import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 24,
  },
  circleZone: {
    width: 220,
    height: 220,
    alignItems: "center",
    justifyContent: "center",
  },
  outerWave: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#E3B89B",
  },
  innerWave: {
    position: "absolute",
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#C46851",
  },
  coreCircle: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: "#A3483E",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#C46851",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 8,
  },
  coreGleam: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.18)",
  },
  textContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  instructionText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#38231E",
    letterSpacing: -0.2,
  },
  subHint: {
    fontSize: 12,
    color: "#8C7A6B",
    marginTop: 4,
  },
});
