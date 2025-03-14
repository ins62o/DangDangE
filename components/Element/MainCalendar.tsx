import { useEffect, useState } from "react";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { colors } from "../../common";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../types/stackType";
import { dateType } from "../../types/dateType";
import { useRecoilState, useSetRecoilState } from "recoil";
import { homeData, MarkedDate } from "../../atoms/homeData";
import { getBloodData } from "../../utils/firebase/getBloodData";
import { getTodayDate } from "../../utils/dateFn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ModalData } from "../../atoms/modalData";

type CalendarProp = {
  setIsOneModal?: React.Dispatch<React.SetStateAction<boolean>>;
  nickname?: string;
};

export default function MainCalendar({
  setIsOneModal,
  nickname,
}: CalendarProp) {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [date, setDate] = useState("");
  const [home, setHome] = useRecoilState(homeData);
  const setModal = useSetRecoilState(ModalData);
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const todayDate = getTodayDate();

  useEffect(() => {
    // 1. 오늘 날짜를 date에 저장
    setDate(todayDate);

    const fetchUserBloodData = async () => {
      const id = await AsyncStorage.getItem("id");
      if (!id) return;

      // 1. blood 컬렉션에서 id를 가지고 있는 문서들을 가져옴
      const bloodData = await getBloodData(id);

      // 2. 데이터가 존재하는 날짜들을 찾아서 배열 형태로 만듬
      const keys = Object.keys(bloodData).filter((ele) => ele !== "id");

      // 3. 캘린더 마킹데이터를 만듬 (캘린더 라이브러리와 데이터 형식 일치)
      const markingData: Record<string, MarkedDate> = {};

      keys.forEach((data) => {
        markingData[data] = { marked: true, dotColor: colors.Main };

        // 3-1. 오늘 날짜라면 dotColor 변경
        if (data === todayDate) {
          markingData[data] = {
            ...markingData[data],
            selected: true,
            selectedColor: colors.Main,
            dotColor: colors.Sub2,
          };
        }
      });

      // 4. 캘린더 마킹데이터를 Recoil Atom에 저장
      setHome((prev) => ({ ...prev, markingData }));
    };

    fetchUserBloodData();
  }, []);

  const checkGuestAccess = (day: dateType) => {
    if (nickname === "게스트" && setIsOneModal) {
      setIsOneModal(true);
      setModal((prev) => ({
        ...prev,
        icon: "warning",
        title: "로그인이 필요합니다.",
        action: () => setIsOneModal(false),
      }));
      setIsOneModal(true);
    } else {
      navigation.navigate("RecordBlood", { day });
    }
  };

  return (
    <Calendar
      monthFormat={"yyyy년 M월"}
      current={`${year}-${month}`}
      onDayPress={(day: dateType) => checkGuestAccess(day)}
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
        ...home.markingData,
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
