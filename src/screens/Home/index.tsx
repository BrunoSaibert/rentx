import React, { useEffect, useState } from "react";
import { StatusBar, BackHandler } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { RectButton, PanGestureHandler } from "react-native-gesture-handler";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";

import { api } from "../../services/api";

import LogoSVG from "../../assets/logo.svg";

import { Car } from "../../components/Car";
import { LoadingAnimated } from "../../components/LoadingAnimated";

import { CarDTO } from "../../dtos/CarDTO";

import * as S from "./styles";

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

export function Home() {
  const [carData, setCarData] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ],
    };
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any) {
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },
    onEnd() {
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    },
  });

  const navigation: NavigationProp<any> = useNavigation();
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

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      return true;
    });
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
          {!loading && (
            <S.TotalCars>Total de {carData.length} carros</S.TotalCars>
          )}
        </S.HeaderContent>
      </S.Header>

      {loading ? (
        <LoadingAnimated />
      ) : (
        <S.CarList
          data={carData}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            myCarsButtonStyle,
            {
              position: "absolute",
              bottom: 13,
              right: 22,
            },
          ]}
        >
          <S.MyCarsButton>
            <ButtonAnimated onPress={handleOpenMyCars}>
              <Ionicons
                name="ios-car-sport"
                size={32}
                color={theme.colors.shape}
              />
            </ButtonAnimated>
          </S.MyCarsButton>
        </Animated.View>
      </PanGestureHandler>
    </S.Container>
  );
}
