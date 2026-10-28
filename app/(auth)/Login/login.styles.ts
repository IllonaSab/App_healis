import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C46851",
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingTop: Platform.OS === "ios" ? 64 : 40,
    paddingBottom: 36,
    paddingHorizontal: 28,
    alignItems: "center",
  },
  logoBadge: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },
  logoImage: {
    width: 80,
    height: 80,
  },
  appName: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -0.5,
  },
  appSubtitle: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.85)",
    marginTop: 4,
    letterSpacing: 0.2,
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#FAF7F2",
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 28,
    paddingTop: 32,
    paddingBottom: 40,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#38231E",
    letterSpacing: -0.3,
  },
  formSubtitle: {
    fontSize: 13,
    color: "#8C7A6B",
    marginTop: 4,
    marginBottom: 24,
  },
  errorBanner: {
    backgroundColor: "#FDF2F0",
    borderColor: "#F7D4CF",
    borderWidth: 1,
    padding: 12,
    borderRadius: 14,
    marginBottom: 16,
  },
  errorText: {
    color: "#C44335",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  inputSpacing: {
    marginBottom: 16,
  },
  forgotPasswordButton: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#C46851",
  },
  submitButton: {
    marginBottom: 20,
  },
  switchAuthButton: {
    alignItems: "center",
    paddingVertical: 8,
  },
  switchAuthText: {
    fontSize: 13,
    color: "#8C7A6B",
  },
  switchAuthHighlight: {
    fontWeight: "700",
    color: "#C46851",
  },
});
