import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";

import { api } from "../../services/api";

import LogoSVG from "../../assets/logo.svg";

import { Car } from "../../components/Car";
import { Loading } from "../../components/Loading";

import { CarDTO } from "../../dtos/CarDTO";

import * as S from "./styles";

export function Home() {
  const [carData, setCarData] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  const theme = useTheme();

  useEffect(() => {
    async function fetchCars() {
      try {
        const { data } = await api.get("/cars");

        setCarData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);

  function handleCarDetails(car: CarDTO) {
    navigation.navigate("CarDetails", { car });
  }

  function handleOpenMyCars() {
    navigation.navigate("MyCars");
  }

  return (
    <S.Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <S.Header>
        <S.HeaderContent>
          <LogoSVG width={RFValue(108)} height={RFValue(12)} />
          <S.TotalCars>Total de {carData.length} carros</S.TotalCars>
        </S.HeaderContent>
      </S.Header>

      {loading ? (
        <Loading />
      ) : (
        <S.CarList
          data={carData}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}

      <S.MyCarsButton onPress={handleOpenMyCars}>
        <Ionicons name="ios-car-sport" size={32} color={theme.colors.shape} />
      </S.MyCarsButton>
    </S.Container>
  );
}
