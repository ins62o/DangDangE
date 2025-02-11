import React, { useEffect, useState } from "react";
import Splash from "./Splash";
import Tabs from "../components/Tabs";
import { useUserData } from "../hooks/useUserData";
import { userType } from "../types/userType";
import Welcome from "./Welcome";

export default function Main() {
  const [isShowSplash, setIsShowSplash] = useState(true);
  const [data, setData] = useState<userType | null>();

  useEffect(() => {
    const getData = async () => {
      const userdata = await useUserData();
      setData(userdata);

      setTimeout(() => {
        setIsShowSplash(false);
      }, 2000);
    };

    getData();
  }, []);

  return (
    <>
      {isShowSplash ? (
        <Splash />
      ) : data?.hasOwnProperty("type") !== null ? (
        <Tabs />
      ) : (
        <Welcome />
      )}
    </>
  );
}
