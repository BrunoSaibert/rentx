import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { format } from "date-fns";

import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Accessory } from "../../components/Accessory";
import { Button } from "../../components/Button";

import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import { getPlataformDate } from "../../utils/getPlataformDate";

import { api } from "../../services/api";

import { CarDTO } from "../../dtos/CarDTO";

import * as S from "./styles";

interface Params {
  car: CarDTO;
  dates: string[];
}

interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

export function SchedulingDetails() {
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { car, dates } = route.params as Params;

  const rentTotal = Number(dates.length * car.rent.price);

  async function handleConfirmRental() {
    setLoading(true);
    const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);

    const unavailable_dates = [
      ...schedulesByCar.data.unavailable_dates,
      ...dates,
    ];

    await api.post("schedules_byuser", {
      user_id: 1,
      car,
      startDate: format(getPlataformDate(new Date(dates[0])), "dd/MM/yyyy"),
      endDate: format(
        getPlataformDate(new Date(dates[dates.length - 1])),
        "dd/MM/yyyy"
      ),
    });

    api
      .put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates,
      })
      .then(() => {
        navigation.navigate("SchedulingComplete");
      })
      .catch(() => {
        Alert.alert("Não foi possível confirmar o agendamento.");
        setLoading(false);
      });
  }

  useEffect(() => {
    setRentalPeriod({
      startFormatted: format(
        getPlataformDate(new Date(dates[0])),
        "dd/MM/yyyy"
      ),
      endFormatted: format(
        getPlataformDate(new Date(dates[dates.length - 1])),
        "dd/MM/yyyy"
      ),
    });
  }, []);

  return (
    <S.Container>
      <S.Header>
        <BackButton />
      </S.Header>

      <S.CarImages>
        <ImageSlider imagesUrl={car.photos} />
      </S.CarImages>

      <S.Content>
        <S.Details>
          <S.Description>
            <S.Brand>{car.brand}</S.Brand>
            <S.Name>{car.name}</S.Name>
          </S.Description>

          <S.Rent>
            <S.Period>{car.rent.period}</S.Period>
            <S.Price>R$ {car.rent.price}</S.Price>
          </S.Rent>
        </S.Details>

        <S.Accessories>
          {car.accessories.map((accessory) => (
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
            />
          ))}
        </S.Accessories>

        <S.RentalPeriod>
          <S.CalendarIcon>
            <Feather name="calendar" size={24} color={theme.colors.shape} />
          </S.CalendarIcon>

          <S.DateInfo>
            <S.DateTitle>DE</S.DateTitle>
            <S.DateValue>{rentalPeriod.startFormatted}</S.DateValue>
          </S.DateInfo>

          <Feather name="chevron-right" size={10} color={theme.colors.text} />

          <S.DateInfo>
            <S.DateTitle>ATÉ</S.DateTitle>
            <S.DateValue>{rentalPeriod.endFormatted}</S.DateValue>
          </S.DateInfo>
        </S.RentalPeriod>

        <S.RentalPrice>
          <S.RentalPriceLabel>TOTAL</S.RentalPriceLabel>
          <S.RentalPriceDetails>
            <S.RentalPriceQuota>
              R$ {car.rent.price} x{dates.length} diárias
            </S.RentalPriceQuota>

            <S.RentalPriceTotal>R$ {rentTotal}</S.RentalPriceTotal>
          </S.RentalPriceDetails>
        </S.RentalPrice>
      </S.Content>

      <S.Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleConfirmRental}
          enabled={!loading}
          loading={loading}
        />
      </S.Footer>
    </S.Container>
  );
}
