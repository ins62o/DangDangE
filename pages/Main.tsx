import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Splash from "./Splash";
import Tabs from "../components/Element/Tabs";

export default function Main() {
  const [isStatus, setIsStatus] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsStatus(true);
    }, 2000);
  }, []);
  return (
    <View style={styles.container}>{isStatus ? <Tabs /> : <Splash />}</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
