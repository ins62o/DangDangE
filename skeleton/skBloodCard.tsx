import React, { useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function SkBloodCard() {
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

      <View style={styles.titleContainer}>
        <Animated.View style={[styles.shimmerBox, { opacity: shimmerAnim }]} />
      </View>
      <View style={styles.tagContainer}>
        <Animated.View style={[styles.shimmerTag, { opacity: shimmerAnim }]} />
      </View>
      <View style={styles.iconContainer}>
        <Animated.View style={[styles.shimmerIcon, { opacity: shimmerAnim }]} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 70,
    backgroundColor: "#fff",
    borderRadius: 8,
    flexDirection: "row",
    marginBottom: 10,
    overflow: "hidden",
    position: "relative",
  },

  shimmer: {
    ...StyleSheet.absoluteFillObject,
  },

  shimmerBox: {
    width: 100,
    height: 20,
    backgroundColor: "#d9d9d9",
    borderRadius: 5,
  },

  shimmerTag: {
    width: 60,
    height: 20,
    backgroundColor: "#d9d9d9",
    borderRadius: 5,
  },

  shimmerIcon: {
    width: 24,
    height: 24,
    backgroundColor: "#d9d9d9",
    borderRadius: 12,
  },

  titleContainer: {
    flex: 0.55,
    justifyContent: "center",
    paddingLeft: 20,
  },

  tagContainer: {
    flex: 0.15,
    justifyContent: "center",
  },

  iconContainer: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
});
