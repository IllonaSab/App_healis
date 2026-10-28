import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  sectionLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#5C3636",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 10,
    marginLeft: 2,
  },
  mealsRow: {
    flexDirection: "row",
    gap: 8,
  },
  chip: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F4EFEA",
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  chipActive: {
    backgroundColor: "#FFFFFF",
    borderColor: "#C46851",
    shadowColor: "#C46851",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
  },
  chipText: {
    fontSize: 12.5,
    fontWeight: "600",
    color: "#8C7A6B",
    textAlign: "center",
  },
  chipTextActive: {
    color: "#C46851",
    fontWeight: "700",
  },
  feelingsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  feelingItemWrapper: {
    width: "48%",
  },
  successCard: {
    alignItems: "center",
    paddingVertical: 16,
    marginTop: 24,
  },
  successText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#6A8D73",
  },
  submitButton: {
    marginTop: 28,
  },
});
