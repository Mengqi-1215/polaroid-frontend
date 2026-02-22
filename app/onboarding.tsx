import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

const NUM_DOTS = 13;
const RADIUS = 42;
const DOT_SIZE = 13;

export default function Onboarding() {
  const router = useRouter();
  const progress = useRef(new Animated.Value(0)).current;

  // Navigate to welcome after animation
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/welcome");
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  // Smooth looping animation
  useEffect(() => {
    Animated.loop(
      Animated.timing(progress, {
        toValue: 1,
        duration: 3000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      })
    ).start();
  }, []);

  const dots = [];

  for (let i = 0; i < NUM_DOTS; i++) {
    const angle = (2 * Math.PI * i) / NUM_DOTS - Math.PI / 2;
    const x = RADIUS * Math.cos(angle);
    const y = RADIUS * Math.sin(angle);

    const activeIndex = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, NUM_DOTS],
    });

    const distance = Animated.subtract(activeIndex, i);

    const opacity = distance.interpolate({
      inputRange: [-2, -1, 0, 1],
      outputRange: [0.15, 0.35, 1, 0.15],
      extrapolate: "clamp",
    });

    const backgroundColor = distance.interpolate({
      inputRange: [-0.5, 0, 0.5],
      outputRange: ["#000", "#CB2F2F", "#000"],
      extrapolate: "clamp",
    });

    dots.push(
      <Animated.View
        key={i}
        style={[
          styles.dot,
          {
            left: x + RADIUS - DOT_SIZE / 2,
            top: y + RADIUS - DOT_SIZE / 2,
            opacity,
            backgroundColor,
          },
        ]}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.circle}>{dots}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: RADIUS * 2,
    height: RADIUS * 2,
    position: "relative",
  },
  dot: {
    position: "absolute",
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
  },
});