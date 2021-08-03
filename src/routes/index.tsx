import React from "react";

import { NavigationContainer } from "@react-navigation/native";

import { StacRoutes } from "./stack.routes";

export function Routes() {
  return (
    <NavigationContainer>
      <StacRoutes />
    </NavigationContainer>
  );
}
