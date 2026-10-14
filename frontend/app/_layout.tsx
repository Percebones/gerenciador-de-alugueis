// app/_layout.tsx
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Platform } from "react-native";


export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        {}
        <Stack.Screen
          name="index"
          options={{ title: "Gerenciador de Aluguéis" }}
        />

        <Stack.Screen
          name="cadastro"
          options={{ title: "Cadastro | Gerenciador de Aluguéis" }}
        />

        <Stack.Screen
          name="login"
          options={{ title: "Login | Gerenciador de Aluguéis" }}
        />

        {}
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}