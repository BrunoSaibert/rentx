import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Alert, StatusBar } from "react-native";
import { useTheme } from "styled-components";
import { format } from "date-fns";

import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";
import {
  Calendar,
  MarkedDateProps,
  DayProps,
  generateInterval,
} from "../../components/Calendar";

import { getPlataformDate } from "../../utils/getPlataformDate";

import { CarDTO } from "../../dtos/CarDTO";

import ArrowSVG from "../../assets/arrow.svg";

import * as S from "./styles";

interface RentalPeriod {
  start: number;
  startFormated: string;
  end: number;
  endFormated: string;
}

interface Params {
  car: CarDTO;
}

export function Scheduling() {
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>(
    {} as DayProps
  );
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>(
    {} as MarkedDateProps
  );
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );

  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { car } = route.params as Params;

  function handleConfirmRental() {
    if (!rentalPeriod.start || !rentalPeriod.end) {
      Alert.alert("Selecione o intervalo para alugar");
    } else {
      navigation.navigate("SchedulingDetails", {
        car,
        dates: Object.keys(markedDates),
      });
    }
  }

  function handleChangeDay(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const lastDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      start: start.timestamp,
      end: end.timestamp,
      startFormated: format(
        getPlataformDate(new Date(firstDate)),
        "dd/MM/yyyy"
      ),
      endFormated: format(getPlataformDate(new Date(lastDate)), "dd/MM/yyyy"),
    });
  }

  return (
    <S.Container>
      <S.Header>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <BackButton color={theme.colors.shape} />

        <S.Title>
          Escolha uma{"\n"}
          data de início e{"\n"}
          fim do aluguel
        </S.Title>

        <S.RentalPeriod>
          <S.DateInfo>
            <S.DateTitle>DE</S.DateTitle>
            <S.DateValue selected={!!rentalPeriod.startFormated}>
              {rentalPeriod.startFormated}
            </S.DateValue>
          </S.DateInfo>
          <ArrowSVG />
          <S.DateInfo>
            <S.DateTitle>ATÉ</S.DateTitle>
            <S.DateValue selected={!!rentalPeriod.endFormated}>
              {rentalPeriod.endFormated}
            </S.DateValue>
          </S.DateInfo>
        </S.RentalPeriod>
      </S.Header>

      <S.Content>
        <Calendar markedDates={markedDates} onDayPress={handleChangeDay} />
      </S.Content>

      <S.Footer>
        <Button title="Confirmar" onPress={handleConfirmRental} />
      </S.Footer>
    </S.Container>
  );
}
