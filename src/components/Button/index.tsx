import React from "react";
import { ActivityIndicator } from "react-native";
import { RectButtonProps } from "react-native-gesture-handler";
import { useTheme } from "styled-components";

import * as S from "./styles";

interface Props extends RectButtonProps {
  title: string;
  color?: string;
  enabled?: boolean;
  loading?: boolean;
}

export function Button({
  title,
  color,
  enabled = true,
  loading = false,
  ...rest
}: Props) {
  const theme = useTheme();

  return (
    <S.Container color={color} enabled={enabled} loading={loading} {...rest}>
      {loading ? (
        <ActivityIndicator size="small" color={theme.colors.shape} />
      ) : (
        <S.Title>{title}</S.Title>
      )}
    </S.Container>
  );
}
