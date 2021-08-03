import React from "react";
import { useWindowDimensions } from "react-native";

import { ConfirmButton } from "../../components/ConfirmButton";

import BrandSVG from "../../assets/logo_background_gray.svg";
import DoneSVG from "../../assets/done.svg";

import * as S from "./styles";

export function SchedulingComplete() {
  const { width } = useWindowDimensions();

  return (
    <S.Container>
      <BrandSVG width={width} />

      <S.Content>
        <DoneSVG width={80} height={80} />

        <S.Title>Carro alugado!</S.Title>
        <S.Message>
          Agora você só precisa ir{"\n"}
          até a concessionária da RENTX{"\n"}
          pegar o seu automóvel.
        </S.Message>
      </S.Content>

      <S.Footer>
        <ConfirmButton title="OK" />
      </S.Footer>
    </S.Container>
  );
}
