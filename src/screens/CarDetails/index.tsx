import React from "react";
import { useNavigation } from "@react-navigation/native";

import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Accessory } from "../../components/Accessory";
import { Button } from "../../components/Button";

import SpeedSVG from "../../assets/speed.svg";
import AccelerationSVG from "../../assets/acceleration.svg";
import ForceSVG from "../../assets/force.svg";
import GasolineSVG from "../../assets/gasoline.svg";
import ExchangeSVG from "../../assets/exchange.svg";
import PeopleSVG from "../../assets/people.svg";

import * as S from "./styles";

export function CarDetails() {
  const navigation = useNavigation();

  function handleConfirmRental() {
    navigation.navigate("Scheduling");
  }

  return (
    <S.Container>
      <S.Header>
        <BackButton />
      </S.Header>

      <S.CarImages>
        <ImageSlider
          imagesUrl={[
            "https://www.motortrend.com/uploads/sites/10/2018/05/2018-audi-rs5-4wd-coupe-angular-front.png",
          ]}
        />
      </S.CarImages>

      <S.Content>
        <S.Details>
          <S.Description>
            <S.Brand>Lamborghini</S.Brand>
            <S.Name>Huracan</S.Name>
          </S.Description>

          <S.Rent>
            <S.Period>Ao dia</S.Period>
            <S.Price>R$ 580</S.Price>
          </S.Rent>
        </S.Details>

        <S.Accessories>
          <Accessory name="380Km/h" icon={SpeedSVG} />
          <Accessory name="3.2s" icon={AccelerationSVG} />
          <Accessory name="800 HP" icon={ForceSVG} />
          <Accessory name="Gasolina" icon={GasolineSVG} />
          <Accessory name="Auto" icon={ExchangeSVG} />
          <Accessory name="2 pessoas" icon={PeopleSVG} />
        </S.Accessories>

        <S.About>
          Este é automóvel desportivo. Surgiu do lendário touro de lide
          indultado na praça Real Maestranza de Sevilla. É um belíssimo carro
          para quem gosta de acelerar.
        </S.About>
      </S.Content>

      <S.Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={handleConfirmRental}
        />
      </S.Footer>
    </S.Container>
  );
}
