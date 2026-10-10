import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { gerenciadorService } from "../services/gerenciadorService";

interface LoginProps {
  onLoginRealizado: () => void;
}

export default function Login({
  onLoginRealizado,
}: LoginProps) {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

  const realizarLogin = async (): Promise<void> => {
    if (!login.trim()) {
      console.log("Login vazio:", login);

      Alert.alert(
        "Atenção",
        "Digite seu nome ou e-mail."
      );

      return;
    }

    if (!senha) {
      console.log("Senha vazia");

      Alert.alert(
        "Atenção",
        "Digite sua senha."
      );

      return;
    }

    try {
      setCarregando(true);

      const resultado = await gerenciadorService.login(
        login,
        senha
      );

      if (!resultado.sucesso) {
        Alert.alert(
          "Login inválido",
          resultado.mensagem
        );

        return;
      }

      Alert.alert(
        "Sucesso",
        resultado.mensagem
      );

      onLoginRealizado();
    } catch (erro: unknown) {
      console.error("Erro ao realizar login:", erro);

      Alert.alert(
        "Erro",
        "Não foi possível conectar ao servidor."
      );
    } finally {
      setCarregando(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Gerenciador de Aluguéis
      </Text>

      <TextInput
        style={styles.campo}
        placeholder="Nome ou e-mail"
        value={login}
        onChangeText={setLogin}
        autoCapitalize="none"
        editable={!carregando}
      />

      <TextInput
        style={styles.campo}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        editable={!carregando}
        onSubmitEditing={realizarLogin}
      />

      {carregando ? (
        <ActivityIndicator
          size="large"
          color="#2563EB"
        />
      ) : (
        <Button
          title="Entrar"
          onPress={realizarLogin}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#FFFFFF",
  },

  titulo: {
    marginBottom: 32,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },

  campo: {
    height: 50,
    marginBottom: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#AAAAAA",
    borderRadius: 8,
  },
});