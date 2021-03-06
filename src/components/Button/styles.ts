import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(RectButton)<{
  color?: string;
  enabled?: boolean;
  loading?: boolean;
}>`
  width: 100%;

  padding: 19px;

  align-items: center;
  justify-content: center;

  background-color: ${({ theme, color }) =>
    color ? color : theme.colors.main};

  opacity: ${({ enabled, loading }) =>
    enabled === false || loading === true ? 0.5 : 1};
`;

export const Title = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_500};
  color: ${({ theme }) => theme.colors.shape};
`;
