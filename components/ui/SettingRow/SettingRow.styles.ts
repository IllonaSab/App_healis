import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#F2EDE4",
  },
  iconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: "#F7F2EC",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  textWrapper: {
    flex: 1,
    paddingRight: 14,
  },
  titleText: {
    fontSize: 14.5,
    fontWeight: "600",
    color: "#38231E",
    letterSpacing: -0.2,
  },
  subtitleText: {
    fontSize: 12,
    color: "#8C7A6B",
    marginTop: 3,
    lineHeight: 16,
  },
  valueText: {
    fontSize: 13,
    color: "#8C7A6B",
    marginTop: 2,
  },
  actionPill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: "#FAF6F1",
    borderWidth: 1,
    borderColor: "#EDE5DB",
  },
  actionText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#C46851",
  },
});
