import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#EFE8DC",
    marginBottom: 10,
    shadowColor: "#7A6358",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  containerCompleted: {
    backgroundColor: "#F9F6F1",
    borderColor: "#E8E0D5",
  },
  badge: {
    width: 30,
    height: 30,
    borderRadius: 11,
    backgroundColor: "#C46851",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 13,
  },
  badgeCompleted: {
    backgroundColor: "#8C7A6B",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 12.5,
    fontWeight: "700",
  },
  checkmarkText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 13.5,
    fontWeight: "600",
    color: "#38231E",
    letterSpacing: -0.1,
  },
  labelCompleted: {
    color: "#8C7A6B",
  },
  detail: {
    fontSize: 11.5,
    color: "#8C7A6B",
    marginTop: 2,
    lineHeight: 16,
  },
});
