import React from "react";

import * as S from "./styles";

interface Props {
  title: string;
}

export function ConfirmButton({ title, ...rest }: Props) {
  return (
    <S.Container {...rest}>
      <S.Title>{title}</S.Title>
    </S.Container>
  );
}
