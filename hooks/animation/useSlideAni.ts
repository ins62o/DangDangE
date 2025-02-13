import { useEffect, useRef } from "react";
import { Animated } from "react-native";

export const useSlideAni = (initialValue = 600, duration = 800) => {
  const slide = useRef(new Animated.Value(initialValue)).current;

  const slideTo = (toValue: number) => {
    Animated.timing(slide, {
      toValue,
      duration,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    slideTo(0);
  }, []);

  return { slide, slideTo };
};
