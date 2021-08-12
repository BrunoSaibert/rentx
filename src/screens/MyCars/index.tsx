import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";
import { useTheme } from "styled-components";
import { AntDesign } from "@expo/vector-icons";

import { BackButton } from "../../components/BackButton";
import { LoadingAnimated } from "../../components/LoadingAnimated";
import { Car } from "../../components/Car";

import { api } from "../../services/api";

import { CarDTO } from "../../dtos/CarDTO";

import * as S from "./styles";

interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
}

export function MyCars() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get(`/schedules_byuser?user_id=1`);
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);

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
          Seus agendamentos,{"\n"}
          estão aqui.
        </S.Title>

        <S.Description>Conforto, segurança e praticidade.</S.Description>
      </S.Header>

      {loading ? (
        <LoadingAnimated />
      ) : (
        <S.Content>
          <S.Appointments>
            <S.AppointmentsTitle>Agendamentos feitos</S.AppointmentsTitle>
            <S.AppointmentsQuantity>{cars.length}</S.AppointmentsQuantity>
          </S.Appointments>

          <S.CarList
            data={cars}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <S.CarWrapper>
                <Car data={item.car} onPress={() => {}} />

                <S.CarFooter>
                  <S.CarFooterTitle>Período</S.CarFooterTitle>
                  <S.CarFooterPeriod>
                    <S.CarFooterDate>{item.startDate}</S.CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <S.CarFooterDate>{item.endDate}</S.CarFooterDate>
                  </S.CarFooterPeriod>
                </S.CarFooter>
              </S.CarWrapper>
            )}
          />
        </S.Content>
      )}
    </S.Container>
  );
}
