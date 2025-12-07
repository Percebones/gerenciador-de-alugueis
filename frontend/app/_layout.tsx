// app/_layout.tsx
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Todas as telas que você tem na pasta app/ */}
        <Stack.Screen name="index" />
        <Stack.Screen name="cadastro" />
        <Stack.Screen name="login" />
        <Stack.Screen name="explore" />
        <Stack.Screen name="teste" />
        {/* Se criar mais telas, só adicionar aqui ou deixar automático */}
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}