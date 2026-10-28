import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: "100%",
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#5C3636",
    marginBottom: 6,
    marginLeft: 2,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FDFBF9",
    borderWidth: 1.5,
    borderColor: "#EADFD3",
    borderRadius: 16,
    paddingHorizontal: 14,
    minHeight: 52,
  },
  inputFocused: {
    borderColor: "#C46851",
    backgroundColor: "#FFFFFF",
    shadowColor: "#C46851",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
  },
  inputError: {
    borderColor: "#D9534F",
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#38231E",
    paddingVertical: 10,
  },
  errorText: {
    fontSize: 12,
    color: "#D9534F",
    marginTop: 4,
    marginLeft: 4,
  },
});
