import React, { useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StatusBar,
} from "react-native";

import styles from "./SplashScreenStyles";

export default function SplashScreen({ navigation }) {

  useEffect(() => {

    const timer = setTimeout(() => {
      navigation.replace("Welcome");
    }, 2500);

    return () => clearTimeout(timer);

  }, [navigation]);

  return (
    <>
      <StatusBar
        backgroundColor="#FFFFFF"
        barStyle="dark-content"
      />

      <SafeAreaView style={styles.container}>

        <View style={styles.logoContainer}>

          <Image
            source={require("../../assets/omsanjeevani.png")}
            style={styles.logo}
          />

        </View>

        <View style={styles.textContainer}>

          <Text style={styles.title}>
            Om Sanjeevani
          </Text>

          <Text style={styles.tagline}>
            Your Health, Our Priority
          </Text>

        </View>

      </SafeAreaView>
    </>
  );
}