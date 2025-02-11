import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function SkTextCard() {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <TouchableOpacity style={styles.container}>
      <LinearGradient
        colors={["#e0e0e0", "#f5f5f5", "#e0e0e0"]}
        style={styles.shimmer}
      />
      <View style={styles.textContainer}>
        <Animated.View style={[styles.shimmerBox, { opacity: shimmerAnim }]} />
        <Animated.View
          style={[styles.iconPlaceholder, { opacity: shimmerAnim }]}
        />
      </View>
      <View style={styles.textViewContainer}>
        {Array.from({ length: 4 }).map((_, index) => (
          <Animated.View
            key={index}
            style={[styles.shimmerLine, { opacity: shimmerAnim }]}
          />
        ))}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "100%",
    height: 300,
    borderRadius: 8,
    padding: 10,
    marginBottom: 30,
    overflow: "hidden",
  },

  shimmer: {
    ...StyleSheet.absoluteFillObject,
  },

  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  shimmerBox: {
    width: 80,
    height: 20,
    backgroundColor: "#d9d9d9",
    borderRadius: 4,
  },

  iconPlaceholder: {
    width: 24,
    height: 24,
    backgroundColor: "#d9d9d9",
    borderRadius: 12,
    marginLeft: 10,
  },

  textViewContainer: {
    flex: 1,
    justifyContent: "space-around",
  },

  shimmerLine: {
    width: "90%",
    height: 16,
    backgroundColor: "#d9d9d9",
    borderRadius: 4,
    marginBottom: 8,
  },
});
