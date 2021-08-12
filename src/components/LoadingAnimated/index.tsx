import React from "react";
import LottieView from "lottie-react-native";

import loadingCar from "../../assets/loading-car.json";

import * as S from "./styles";

export function LoadingAnimated() {
  return (
    <S.Container>
      <LottieView
        source={loadingCar}
        style={{ height: 150 }}
        resizeMode="contain"
        autoPlay
        loop
      />
    </S.Container>
  );
}
