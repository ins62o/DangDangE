import { Dispatch, SetStateAction } from "react";

type ErrorTexts = {
  id: string;
  pw: string;
  pwCheck: string;
  nickname: string;
};

type IsError = {
  id: boolean;
  pw: boolean;
  pwCheck: boolean;
  nickname: boolean;
};

// 닉네임 유효성 검사
export const checknickname = (
  nickname: string,
  setErrorTexts: Dispatch<SetStateAction<ErrorTexts>>,
  setIsError: Dispatch<SetStateAction<IsError>>
) => {
  const isChecked = nickname.length < 2;

  setErrorTexts((prev) => ({
    ...prev,
    nickname: isChecked ? "닉네임을 2자 이상으로 해주세요." : "",
  }));

  setIsError((prev) => ({ ...prev, nickname: isChecked }));
};

// 아이디 유효성 검사
export const checkId = (
  id: string,
  setErrorTexts: Dispatch<SetStateAction<ErrorTexts>>,
  setIsError: Dispatch<SetStateAction<IsError>>
) => {
  const IdRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isChecked = !IdRegex.test(id);

  setErrorTexts((prev) => ({
    ...prev,
    id: isChecked ? "이메일 형식에 맞게 입력해주세요." : "",
  }));

  setIsError((prev) => ({ ...prev, id: isChecked }));
};

// 비밀번호 유효성 검사
export const checkPw = (
  pw: string,
  setErrorTexts: Dispatch<SetStateAction<ErrorTexts>>,
  setIsError: Dispatch<SetStateAction<IsError>>
) => {
  const isChecked = pw.length < 6;

  setErrorTexts((prev) => ({
    ...prev,
    pw: isChecked ? "비밀번호의 길이를 6자 이상으로 해주세요." : "",
  }));

  setIsError((prev) => ({ ...prev, pw: isChecked }));
};

// 비밀번호 일치 여부 검사
export const checkSamePw = (
  samePw: string,
  pw: string,
  setErrorTexts: Dispatch<SetStateAction<ErrorTexts>>,
  setIsError: Dispatch<SetStateAction<IsError>>
) => {
  const isChecked = samePw !== pw;

  setErrorTexts((prev) => ({
    ...prev,
    pwCheck: isChecked ? "패스워드가 일치하지 않습니다." : "",
  }));

  setIsError((prev) => ({ ...prev, pwCheck: isChecked }));
};
