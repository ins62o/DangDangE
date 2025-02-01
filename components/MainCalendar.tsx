import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { colors } from "../common";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../types/stackType";

export default function MainCalendar() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [date, setDate] = useState("");
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  useEffect(() => {
    setDate(
      `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
        2,
        "0"
      )}`
    );
  }, []);

  return (
    <Calendar
      monthFormat={"yyyy년 M월"}
      current={`${year}-${month}`}
      onDayPress={(day: any) => navigation.navigate("RecordBlood", { day })}
      style={styles.calendar}
      theme={{
        selectedDayBackgroundColor: colors.Main,
        selectedDayTextColor: "#fff",
        arrowColor: colors.Main,
        "stylesheet.calendar.header": {
          dayTextAtIndex0: {
            color: "red",
          },
          dayTextAtIndex1: {
            color: "black",
          },
          dayTextAtIndex2: {
            color: "black",
          },
          dayTextAtIndex3: {
            color: "black",
          },
          dayTextAtIndex4: {
            color: "black",
          },
          dayTextAtIndex5: {
            color: "black",
          },
          dayTextAtIndex6: {
            color: "blue",
          },
        },
      }}
      markedDates={{
        [date]: { selected: true, selectedColor: colors.Main },
        // "2025-01-20": { marked: true },
        // "2025-01-15": { marked: true, dotColor: "red", activeOpacity: 0 },
        // "2025-01-12": { disabled: true, disableTouchEvent: true },
      }}
    />
  );
}

LocaleConfig.locales["ko"] = {
  monthNames: [
    "01월",
    "02월",
    "03월",
    "04월",
    "05월",
    "06월",
    "07월",
    "08월",
    "09월",
    "10월",
    "11월",
    "12월",
  ],
  monthNamesShort: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  dayNames: [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ],
  dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
  today: "오늘",
};
LocaleConfig.defaultLocale = "ko";

const styles = StyleSheet.create({
  calendar: {
    borderRadius: 8,
  },
});
