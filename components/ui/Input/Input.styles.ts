import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#5C3636",
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FDFCFA",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#EFE8E1",
    paddingHorizontal: 14,
  },
  inputWrapperError: {
    borderColor: "#C46851",
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 14,
    color: "#38231E",
  },
  eyeButton: {
    paddingLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  eyeImage: {
    width: 22,
    height: 22,
  },
  errorText: {
    fontSize: 11.5,
    color: "#C46851",
    marginTop: 4,
    fontWeight: "500",
  },
});
