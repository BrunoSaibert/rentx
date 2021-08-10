import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Accessory } from "../../components/Accessory";
import { Button } from "../../components/Button";

import { getAccessoryIcon } from "../../utils/getAccessoryIcon";

import { CarDTO } from "../../dtos/CarDTO";

import * as S from "./styles";

interface Params {
  car: CarDTO;
}

export function CarDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { car } = route.params as Params;

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [180, 86],
        Extrapolate.CLAMP
      ),
    };
  });

  const sliderCasStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [20, 100], [1, 0], Extrapolate.CLAMP),
    };
  });

  function handleConfirmRental() {
    navigation.navigate("Scheduling", { car });
  }

  return (
    <S.Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <Animated.View style={[headerStyleAnimation]}>
        <S.Header>
          <BackButton />
        </S.Header>

        <Animated.View style={[sliderCasStyleAnimation]}>
          <S.CarImages>
            <ImageSlider imagesUrl={car.photos} />
          </S.CarImages>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          padding: 24,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
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

        <S.About>{car.about}</S.About>
        <S.About>{car.about}</S.About>
      </Animated.ScrollView>

      <S.Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={handleConfirmRental}
        />
      </S.Footer>
    </S.Container>
  );
}
