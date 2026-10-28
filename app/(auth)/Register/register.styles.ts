import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 24,
  },
  header: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 16,
    paddingBottom: 16,
  },
  logoImage: {
    width: 180,
    height: 90,
    alignSelf: "center",
  },
  subtitle: {
    textAlign: "center",
    color: "#8C7A6B",
    fontSize: 13,
    marginTop: 8,
  },
  errorBanner: {
    backgroundColor: "#FEF2F2",
    borderColor: "#FECACA",
    borderWidth: 1,
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  errorText: {
    color: "#DC2626",
    textAlign: "center",
    fontSize: 12,
    fontWeight: "600",
  },
  inputSpacing: {
    marginBottom: 14,
  },
  submitButton: {
    marginTop: 8,
    marginBottom: 12,
  },
  loginLinkButton: {
    paddingVertical: 10,
    alignItems: "center",
  },
  loginLinkText: {
    fontSize: 12,
    color: "#8C7A6B",
  },
  loginLinkHighlight: {
    color: "#C46851",
    fontWeight: "700",
  },
});
