import disoneBlood from "./assets/image/disoneBlood.png";
import oneBlood from "./assets/image/oneBlood.png";
import distwoBlood from "./assets/image/distwoBlood.png";
import twoBlood from "./assets/image/twoBlood.png";
import disthreeBlood from "./assets/image/disthreeBlood.png";
import threeBlood from "./assets/image/threeBlood.png";
import disfourBlood from "./assets/image/disfourBlood.png";
import fourBlood from "./assets/image/fourBlood.png";

export const BloodData = [
  {
    id: "1",
    title: "1형 당뇨",
    info: "우리나라 당뇨병의 2% 미만을 차지하며 30세 전에 진단되는 경우가 많지만 성인에서도 나타날 수 있습니다.",
    offimage: disoneBlood,
    onimage: oneBlood,
  },
  {
    id: "2",
    title: "2형 당뇨",
    info: "한국인 당뇨병의 대부분이 2형 당뇨이며, 보통 40세 이상에서 발생하지만 최근에는 30세 이하의 젊은 환자가 늘고 있습니다.",
    offimage: distwoBlood,
    onimage: twoBlood,
  },
  {
    id: "3",
    title: "기타 당뇨",
    info: "유전자 결함, 유전질환, 약물, 감염에 의해 발생하는 당뇨병입니다.",
    offimage: disthreeBlood,
    onimage: threeBlood,
  },
  {
    id: "4",
    title: "임신 당뇨",
    info: "임신 중에 발견된 당뇨병을 지칭합니다. 임신 기간은 물론, 출산 후에도 장기적으로 당뇨병 예방 조치를 취해야 합니다.",
    offimage: disfourBlood,
    onimage: fourBlood,
  },
];
