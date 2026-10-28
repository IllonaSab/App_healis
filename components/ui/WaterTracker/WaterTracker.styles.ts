import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 13,
    fontWeight: "700",
    color: "#38231E",
    letterSpacing: -0.1,
  },
  count: {
    fontSize: 12,
    fontWeight: "600",
    color: "#7DA0B5",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  pill: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: "#FAF6F0",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#EDE5DB",
  },
  pillFilled: {
    backgroundColor: "#EEF5F8",
    borderColor: "#B8D5E5",
  },
  pillText: {
    fontSize: 12.5,
    fontWeight: "600",
    color: "#8C7A6B",
  },
  pillTextFilled: {
    color: "#356B88",
    fontWeight: "700",
  },
});
