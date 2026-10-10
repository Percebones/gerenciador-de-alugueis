import { useState } from "react";
import { StyleSheet, View } from "react-native";

import Home from "./telas/home";
import Login from "./telas/login";

type TelaAtual = "login" | "home";

export default function App() {
  const [telaAtual, setTelaAtual] =
    useState<TelaAtual>("login");

  const abrirHome = (): void => {
    setTelaAtual("home");
  };

  const sair = (): void => {
    setTelaAtual("login");
  };

  return (
    <View style={styles.container}>
      {telaAtual === "login" ? (
        <Login onLoginRealizado={abrirHome} />
      ) : (
        <Home onSair={sair} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // Centralização vertical
    justifyContent: "center",

    // Centralização horizontal
    alignItems: "center",

    backgroundColor: "#FFFFFF",
  },
});