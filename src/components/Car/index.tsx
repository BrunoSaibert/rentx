import React from "react";

import GasolineSVG from "../../assets/gasoline.svg";

import * as S from "./styles";

interface CarData {
  brand: string;
  name: string;
  rent: {
    period: string;
    price: number;
  };
  thumbnail: string;
}
interface Props {
  data: CarData;
}

export function Car({ data }: Props) {
  return (
    <S.Container>
      <S.Details>
        <S.Brand>{data.brand}</S.Brand>
        <S.Name>{data.name}</S.Name>

        <S.About>
          <S.Rent>
            <S.Period>{data.rent.period}</S.Period>
            <S.Price>R$ {data.rent.price}</S.Price>
          </S.Rent>

          <S.Type>
            <GasolineSVG />
          </S.Type>
        </S.About>
      </S.Details>

      <S.CarImage
        source={{
          uri: data.thumbnail,
        }}
        resizeMode="contain"
      />
    </S.Container>
  );
}
