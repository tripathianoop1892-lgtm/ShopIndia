import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { deactivateAccount, getAccountDeactivationCheck } from "../services/api";

const resetToLogin = (navigation) => {
  const rootNavigation = navigation.getParent?.()?.getParent?.()
    || navigation.getParent?.()
    || navigation;
  rootNavigation.reset({ index: 0, routes: [{ name: "Login" }] });
};

export const startAccountDeactivation = async (navigation) => {
  try {
    const check = await getAccountDeactivationCheck();
    if (!check?.success || !check?.canDeactivate) {
      Alert.alert(
        "Account cannot be deactivated",
        check?.message || "Complete all pending work before deactivating your account."
      );
      return;
    }

    Alert.alert(
      "Deactivate Account",
      "You will be signed out immediately. Contact support if you want to reactivate this account later.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Deactivate",
          style: "destructive",
          onPress: async () => {
            try {
              const response = await deactivateAccount();
              if (!response?.success) {
                Alert.alert("Unable to deactivate", response?.message || "Please try again.");
                return;
              }
              await AsyncStorage.multiRemove(["token", "user", "userData"]);
              resetToLogin(navigation);
            } catch (error) {
              console.error("ACCOUNT DEACTIVATION ERROR:", error);
              Alert.alert("Unable to deactivate", "Please try again later.");
            }
          },
        },
      ]
    );
  } catch (error) {
    console.error("ACCOUNT DEACTIVATION CHECK ERROR:", error);
    Alert.alert("Unable to check account", "Please try again later.");
  }
};
