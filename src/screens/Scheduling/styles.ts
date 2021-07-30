import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const Header = styled.View`
  width: 100%;
  height: 325px;
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

export const RentalPeriod = styled.View`
  width: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const DateInfo = styled.View`
  width: 30%;
`;

export const DateTitle = styled.Text`
  font-size: ${RFValue(10)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  color: ${({ theme }) => theme.colors.shape};
`;

export const DateValue = styled.Text<{ selected: boolean }>`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme }) => theme.colors.shape};

  ${({ theme, selected }) =>
    !selected &&
    css`
      border-bottom-width: 1px;
      border-bottom-color: ${theme.colors.text};
      padding-bottom: 5px;
    `}
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 0,
  },
  showsVerticalScrollIndicator: false,
})``;

export const Footer = styled.View`
  width: 100%;

  padding: 24px 24px ${getBottomSpace() + 24}px;
`;
