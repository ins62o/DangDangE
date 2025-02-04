import Toast from "react-native-toast-message";

export const showToast = () => {
  Toast.show({
    type: "success",
    text1: "회원가입을 축하합니다.",
    text2: "당당이와 함께 Let`s Go",
    position: "bottom",
  });
};
