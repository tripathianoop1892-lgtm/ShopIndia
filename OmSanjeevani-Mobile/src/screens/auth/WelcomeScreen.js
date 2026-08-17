import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";

import styles from "./WelcomeScreenStyles";

export default function WelcomeScreen({ navigation }) {
  return (
    <>
      <StatusBar
        backgroundColor="#FFFFFF"
        barStyle="dark-content"
      />

      <SafeAreaView style={styles.container}>

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/omsanjeevani.png")}
            style={styles.logo}
          />
        </View>

        {/* Welcome Text */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            Welcome to
          </Text>

          <Text style={styles.appName}>
            Om Sanjeevani
          </Text>

          <Text style={styles.subtitle}>
            Your Health, Our Priority
          </Text>

          <Text style={styles.description}>
            Order medicines easily, connect with your trusted shopkeeper, and manage your healthcare from one place.
          </Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.loginButtonText}>
              Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.registerButtonText}>
              Create Account
            </Text>
          </TouchableOpacity>

        </View>

      </SafeAreaView>
    </>
  );
}