import styled from "styled-components/native";
import { FlatList } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { CarDTO } from "../../dtos/CarDTO";

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  height: 275px;
  background-color: ${({ theme }) => theme.colors.header};

  justify-content: center;
  justify-content: space-between;

  padding: ${getStatusBarHeight() + 30}px 25px 30px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(30)}px;
  line-height: ${RFValue(34)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  color: ${({ theme }) => theme.colors.shape};
`;

export const Description = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_400};
  color: ${({ theme }) => theme.colors.shape};
`;

export const Content = styled.View`
  flex: 1;

  width: 100%;
  padding: 0 16px;
`;

export const Appointments = styled.View`
  width: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 24px 0;
`;

export const AppointmentsTitle = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text};
`;

export const AppointmentsQuantity = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme }) => theme.colors.title};
`;

export const CarList = styled(FlatList as new () => FlatList<CarDTO>).attrs({
  contentContainerStyle: {},
  showsVerticalScrollIndicator: false,
})``;

export const CarWrapper = styled.View`
  margin-bottom: 16px;
`;

export const CarFooter = styled.View`
  width: 100%;

  background-color: ${({ theme }) => theme.colors.background_secondary};
  padding: 12px;

  margin-top: -12px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CarFooterTitle = styled.Text`
  text-transform: uppercase;

  font-size: ${RFValue(10)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  color: ${({ theme }) => theme.colors.text_detail};
`;

export const CarFooterPeriod = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CarFooterDate = styled.Text`
  font-size: ${RFValue(13)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.title};
`;
