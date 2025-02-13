import { useEffect, useRef } from "react";
import { Animated } from "react-native";

export const useOpacityAni = (duration = 2500) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.timing(opacity, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    });

    animation.start();

    return () => {
      animation.stop();
    };
  }, [duration]);

  return opacity;
};
