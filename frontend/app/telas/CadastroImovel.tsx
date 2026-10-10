import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { gerenciadorService } from "../services/gerenciadorService";
import { ImovelDto } from "../types/types";

interface CadastrarImovelProps {
  onSuccess?: () => void;
}

const formatarNumeroComoMoeda = (
  valor: number
): string => {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

const aplicarMascaraMoeda = (
  texto: string
): string => {
  const somenteNumeros = texto.replace(/\D/g, "");

  if (!somenteNumeros) {
    return "";
  }

  const valorNumerico =
    Number(somenteNumeros) / 100;

  return formatarNumeroComoMoeda(valorNumerico);
};

const converterMoedaParaNumero = (
  valorFormatado: string
): number => {
  const somenteNumeros =
    valorFormatado.replace(/\D/g, "");

  if (!somenteNumeros) {
    return 0;
  }

  return Number(somenteNumeros) / 100;
};

export function CadastrarImovel({
  onSuccess,
}: CadastrarImovelProps) {
  const [nome, setNome] = useState("");
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("Parana");

  const [aluguel, setAluguel] = useState("");
  const [valorImovel, setValorImovel] =
    useState("");

  const [status, setStatus] = useState("Vago");
  const [cadastrando, setCadastrando] =
    useState(false);

  const formularioEstaValido = (): boolean => {
    if (!nome.trim()) {
      Alert.alert(
        "Campo obrigatório",
        "Informe o nome do imóvel."
      );

      return false;
    }

    if (!cep.trim()) {
      Alert.alert(
        "Campo obrigatório",
        "Informe o CEP do imóvel."
      );

      return false;
    }

    if (cep.trim().length !== 8) {
      Alert.alert(
        "CEP inválido",
        "O CEP deve possuir 8 números."
      );

      return false;
    }

    if (!rua.trim()) {
      Alert.alert(
        "Campo obrigatório",
        "Informe a rua do imóvel."
      );

      return false;
    }

    if (!estado) {
      Alert.alert(
        "Campo obrigatório",
        "Informe o estado do imóvel."
      );

      return false;
    }

    if (!status) {
      Alert.alert(
        "Campo obrigatório",
        "Informe o status do imóvel."
      );

      return false;
    }

    if (!aluguel) {
      Alert.alert(
        "Campo obrigatório",
        "Informe o valor do aluguel."
      );

      return false;
    }

    if (!valorImovel) {
      Alert.alert(
        "Campo obrigatório",
        "Informe o valor do imóvel."
      );

      return false;
    }

    const aluguelConvertido =
      converterMoedaParaNumero(aluguel);

    const valorImovelConvertido =
      converterMoedaParaNumero(valorImovel);

    if (aluguelConvertido < 0) {
      Alert.alert(
        "Valor inválido",
        "Informe um valor de aluguel válido."
      );

      return false;
    }

    if (valorImovelConvertido <= 0) {
      Alert.alert(
        "Valor inválido",
        "Informe um valor de imóvel maior que zero."
      );

      return false;
    }

    return true;
  };

  const limparFormulario = (): void => {
    setNome("");
    setCep("");
    setRua("");
    setBairro("");
    setCidade("");
    setEstado("Parana");
    setAluguel("");
    setValorImovel("");
    setStatus("Vago");
  };

  const enviar = async (): Promise<void> => {
    if (!formularioEstaValido()) {
      return;
    }

    const novoImovel = {
      nomeImovel: nome.trim(),

      endereco: {
        cepImovel: cep.trim(),
        ruaImovel: rua.trim(),
        bairroImovel: bairro.trim(),
        cidadeImovel: cidade.trim(),
        estadoImovel: estado,
      },

      statusImovel: status,

      valorAluguelImovel:
        converterMoedaParaNumero(aluguel),

      valor_imovel:
        converterMoedaParaNumero(valorImovel),

      listaDespesas: [],
    } as Omit<ImovelDto, "idImovel">;

    try {
      setCadastrando(true);

      const mensagem =
        await gerenciadorService.cadastrarImovel(
          novoImovel
        );

      Alert.alert(
        "Sucesso",
        mensagem || "Imóvel cadastrado com sucesso."
      );

      limparFormulario();
      onSuccess?.();
    } catch (erro: unknown) {
      console.error(
        "Erro ao cadastrar imóvel:",
        erro
      );

      const mensagem =
        erro instanceof Error
          ? erro.message
          : "Não foi possível cadastrar o imóvel.";

      Alert.alert("Erro", mensagem);
    } finally {
      setCadastrando(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.titulo}>
        Cadastrar imóvel
      </Text>

      <Text style={styles.rotulo}>Nome *</Text>

      <TextInput
        style={styles.campo}
        value={nome}
        onChangeText={setNome}
        placeholder="Nome do imóvel"
        editable={!cadastrando}
      />

      <Text style={styles.rotulo}>CEP *</Text>

      <TextInput
        style={styles.campo}
        value={cep}
        onChangeText={(texto) =>
          setCep(texto.replace(/\D/g, ""))
        }
        placeholder="Somente números"
        maxLength={8}
        keyboardType="numeric"
        editable={!cadastrando}
      />

      <Text style={styles.rotulo}>Rua *</Text>

      <TextInput
        style={styles.campo}
        value={rua}
        onChangeText={setRua}
        placeholder="Rua"
        editable={!cadastrando}
      />

      <Text style={styles.rotulo}>Bairro</Text>

      <TextInput
        style={styles.campo}
        value={bairro}
        onChangeText={setBairro}
        placeholder="Bairro"
        editable={!cadastrando}
      />

      <Text style={styles.rotulo}>Cidade</Text>

      <TextInput
        style={styles.campo}
        value={cidade}
        onChangeText={setCidade}
        placeholder="Cidade"
        editable={!cadastrando}
      />

      <Text style={styles.rotulo}>Estado</Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={estado}
          enabled={!cadastrando}
          onValueChange={(novoEstado) =>
            setEstado(String(novoEstado))
          }
        >
          <Picker.Item
            label="Paraná"
            value="Parana"
          />

          <Picker.Item
            label="São Paulo"
            value="SaoPaulo"
          />
        </Picker>
      </View>

      <Text style={styles.rotulo}>
        Valor do aluguel *
      </Text>

      <TextInput
        style={styles.campo}
        value={aluguel}
        onChangeText={(texto) =>
          setAluguel(aplicarMascaraMoeda(texto))
        }
        placeholder="R$ 0,00"
        keyboardType="numeric"
        editable={!cadastrando}
      />

      <Text style={styles.rotulo}>
        Valor do imóvel *
      </Text>

      <TextInput
        style={styles.campo}
        value={valorImovel}
        onChangeText={(texto) =>
          setValorImovel(
            aplicarMascaraMoeda(texto)
          )
        }
        placeholder="R$ 0,00"
        keyboardType="numeric"
        editable={!cadastrando}
      />

      <Text style={styles.rotulo}>Status</Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={status}
          enabled={!cadastrando}
          onValueChange={(novoStatus) =>
            setStatus(String(novoStatus))
          }
        >
          <Picker.Item
            label="Vago"
            value="Vago"
          />

          <Picker.Item
            label="Alugado"
            value="Alugado"
          />
        </Picker>
      </View>

      {cadastrando ? (
        <View style={styles.carregamento}>
          <ActivityIndicator
            size="large"
            color="#2563EB"
          />

          <Text style={styles.textoCarregamento}>
            Cadastrando imóvel...
          </Text>
        </View>
      ) : (
        <Button
          title="Cadastrar"
          onPress={enviar}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  conteudo: {
    padding: 20,
    paddingBottom: 32,
  },

  titulo: {
    marginBottom: 20,
    color: "#0F172A",
    fontSize: 22,
    fontWeight: "bold",
  },

  rotulo: {
    marginBottom: 6,
    color: "#334155",
    fontSize: 14,
    fontWeight: "600",
  },

  campo: {
    minHeight: 46,
    marginBottom: 14,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 3,
    backgroundColor: "#FFFFFF",
    color: "#0F172A",
  },

  pickerContainer: {
    marginBottom: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 3,
    backgroundColor: "#FFFFFF",
  },

  carregamento: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },

  textoCarregamento: {
    marginTop: 10,
    color: "#475569",
  },
});