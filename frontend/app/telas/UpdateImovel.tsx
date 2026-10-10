import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
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

interface UpdateImovelProps {
  imovel: ImovelDto;
  onSuccess?: () => void;
}

export function UpdateImovel({
  imovel,
  onSuccess,
}: UpdateImovelProps) {
  const [nome, setNome] = useState("");
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("Parana");

  const [aluguel, setAluguel] = useState("");
  const [valorImovel, setValorImovel] = useState("");
  const [status, setStatus] = useState("Vago");

  const [atualizando, setAtualizando] =
    useState(false);

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

    return Number(somenteNumeros) / 100;
  };

  useEffect(() => {
    setNome(imovel.nomeImovel ?? "");

    setCep(
      imovel.endereco?.cepImovel ?? ""
    );

    setRua(
      imovel.endereco?.ruaImovel ?? ""
    );

    setBairro(
      imovel.endereco?.bairroImovel ?? ""
    );

    setCidade(
      imovel.endereco?.cidadeImovel ?? ""
    );

    setEstado(
      imovel.endereco?.estadoImovel ?? "Parana"
    );

    setStatus(
      imovel.statusImovel ?? "Vago"
    );

    setAluguel(
      formatarNumeroComoMoeda(Number(imovel.valorAluguelImovel ?? 0)
      )
    );

    setValorImovel(formatarNumeroComoMoeda(
      Number(imovel.valor_imovel ?? 0)
    )
    );
    ``
  }, [imovel]);

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
        "Informe o CEP."
      );

      return false;
    }

    if (!rua.trim()) {
      Alert.alert(
        "Campo obrigatório",
        "Informe a rua."
      );

      return false;
    }

    if (!aluguel.trim()) {
      Alert.alert(
        "Campo obrigatório",
        "Informe o valor do aluguel."
      );

      return false;
    }

    if (!valorImovel.trim()) {
      Alert.alert(
        "Campo obrigatório",
        "Informe o valor do imóvel."
      );

      return false;
    }

    const aluguelConvertido = converterMoedaParaNumero(aluguel);
    const valorConvertido = converterMoedaParaNumero(valorImovel);

    if (
      Number.isNaN(aluguelConvertido) ||
      aluguelConvertido < 0
    ) {
      Alert.alert(
        "Valor inválido",
        "Informe um valor de aluguel válido."
      );

      return false;
    }

    if (
      Number.isNaN(valorConvertido) ||
      valorConvertido < 0
    ) {
      Alert.alert(
        "Valor inválido",
        "Informe um valor de imóvel válido."
      );

      return false;
    }

    return true;
  };

  const enviar = async (): Promise<void> => {
    if (!formularioEstaValido()) {
      return;
    }

    const imovelAtualizado: ImovelDto = {
      ...imovel,

      idImovel: imovel.idImovel,

      nomeImovel: nome.trim(),

      endereco: {
        idEndereco:
          imovel.endereco?.idEndereco,

        cepImovel: cep.trim(),
        ruaImovel: rua.trim(),
        bairroImovel: bairro.trim(),
        cidadeImovel: cidade.trim(),
        estadoImovel: estado,
      },

      statusImovel: status,

      valorAluguelImovel: converterMoedaParaNumero(aluguel),

      valor_imovel: converterMoedaParaNumero(valorImovel),

      listaDespesas:
        imovel.listaDespesas ?? [],
    };

    try {
      setAtualizando(true);

      const mensagem =
        await gerenciadorService.atualizarImovel(
          imovelAtualizado
        );

      Alert.alert(
        "Sucesso",
        mensagem || "Imóvel atualizado com sucesso."
      );

      onSuccess?.();
    } catch (erro: unknown) {
      console.error(
        "Erro ao atualizar imóvel:",
        erro
      );

      const mensagem =
        erro instanceof Error
          ? erro.message
          : "Não foi possível atualizar o imóvel.";

      Alert.alert("Erro", mensagem);
    } finally {
      setAtualizando(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.titulo}>
        Atualizar imóvel
      </Text>

      <Text style={styles.rotulo}>
        ID do imóvel
      </Text>

      <TextInput
        style={[
          styles.campo,
          styles.campoDesabilitado,
        ]}
        value={String(imovel.idImovel)}
        editable={false}
      />

      <Text style={styles.rotulo}>Nome *</Text>

      <TextInput
        style={styles.campo}
        value={nome}
        onChangeText={setNome}
        placeholder="Nome do imóvel"
        editable={!atualizando}
      />

      <Text style={styles.rotulo}>CEP *</Text>

      <TextInput
        style={styles.campo}
        value={cep}
        onChangeText={setCep}
        placeholder="CEP"
        maxLength={8}
        keyboardType="numeric"
        editable={!atualizando}
      />

      <Text style={styles.rotulo}>Rua *</Text>

      <TextInput
        style={styles.campo}
        value={rua}
        onChangeText={setRua}
        placeholder="Rua"
        editable={!atualizando}
      />

      <Text style={styles.rotulo}>Bairro</Text>

      <TextInput
        style={styles.campo}
        value={bairro}
        onChangeText={setBairro}
        placeholder="Bairro"
        editable={!atualizando}
      />

      <Text style={styles.rotulo}>Cidade</Text>

      <TextInput
        style={styles.campo}
        value={cidade}
        onChangeText={setCidade}
        placeholder="Cidade"
        editable={!atualizando}
      />

      <Text style={styles.rotulo}>Estado</Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={estado}
          enabled={!atualizando}
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
        Valor do aluguel
      </Text>

      <TextInput
        style={styles.campo}
        value={aluguel}
        onChangeText={setAluguel}
        placeholder="Valor do aluguel"
        keyboardType="numeric"
        editable={!atualizando}
      />

      <Text style={styles.rotulo}>
        Valor do imóvel
      </Text>

      <TextInput
        style={styles.campo}
        value={valorImovel}
        onChangeText={setValorImovel}
        placeholder="Valor do imóvel"
        keyboardType="numeric"
        editable={!atualizando}
      />

      <Text style={styles.rotulo}>Status</Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={status}
          enabled={!atualizando}
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

      {atualizando ? (
        <View style={styles.atualizando}>
          <ActivityIndicator
            size="large"
            color="#2563EB"
          />

          <Text style={styles.textoAtualizando}>
            Atualizando imóvel...
          </Text>
        </View>
      ) : (
        <Button
          title="Atualizar"
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

  campoDesabilitado: {
    backgroundColor: "#E2E8F0",
    color: "#64748B",
  },

  pickerContainer: {
    marginBottom: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 3,
    backgroundColor: "#FFFFFF",
  },

  atualizando: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },

  textoAtualizando: {
    marginTop: 10,
    color: "#475569",
  },
});