import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#F2EDE4",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: "#F4EDE6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  avatarText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#C46851",
    letterSpacing: 0.5,
  },
  infoCol: {
    flex: 1,
    paddingRight: 12,
  },
  nameText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#38231E",
    letterSpacing: -0.2,
  },
  roleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },
  roleText: {
    fontSize: 12.5,
    color: "#8C7A6B",
    fontWeight: "500",
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: "#C9BEB5",
    marginHorizontal: 6,
  },
  phoneText: {
    fontSize: 12,
    color: "#A89A8F",
    fontWeight: "400",
  },
  callButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: "#C46851",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#C46851",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  callButtonText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.2,
  },
});
