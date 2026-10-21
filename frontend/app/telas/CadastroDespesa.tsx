import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { gerenciadorService } from "../services/gerenciadorService";
import { DespesaDto, ImovelDto } from "../types/types";

interface ModalCadDespesaProps {
  visivel: boolean;
  imoveis: ImovelDto[];
  onClose: () => void;
  onSuccess?: () => void;
}

const formatarNumeroComoMoeda = (valor: number): string => {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

const aplicarMascaraMoeda = (texto: string): string => {
  const somenteNumeros = texto.replace(/\D/g, "");

  if (!somenteNumeros) {
    return "";
  }

  return formatarNumeroComoMoeda(Number(somenteNumeros) / 100);
};

const converterMoedaParaNumero = (valorFormatado: string): number => {
  const somenteNumeros = valorFormatado.replace(/\D/g, "");

  if (!somenteNumeros) {
    return 0;
  }

  return Number(somenteNumeros) / 100;
};

export default function ModalCadDespesa({
  visivel,
  imoveis,
  onClose,
  onSuccess,
}: ModalCadDespesaProps) {
  const [nomeDespesa, setNomeDespesa] = useState("");
  const [valorDespesa, setValorDespesa] = useState("");
  const [idImovel, setIdImovel] = useState<number | null>(null);
  const [cadastrando, setCadastrando] = useState(false);

  const limparFormulario = (): void => {
    setNomeDespesa("");
    setValorDespesa("");
    setIdImovel(null);
  };

  const fechar = (): void => {
    limparFormulario();
    onClose();
  };

  const enviar = async (): Promise<void> => {
    if (!nomeDespesa.trim()) {
      Alert.alert("Campo obrigatório", "Informe o nome da despesa.");
      return;
    }

    if (!valorDespesa) {
      Alert.alert("Campo obrigatório", "Informe o valor da despesa.");
      return;
    }

    if (converterMoedaParaNumero(valorDespesa) <= 0) {
      Alert.alert("Valor inválido", "Informe um valor maior que zero.");
      return;
    }

    if (idImovel === null) {
      Alert.alert("Campo obrigatório", "Selecione um imóvel.");
      return;
    }

    try {
      setCadastrando(true);

      const novaDespesa: DespesaDto = {
        nomeDespesa: nomeDespesa.trim(),
        valorDespesa: converterMoedaParaNumero(valorDespesa),
        idImovel,
      };

      const mensagem =
        await gerenciadorService.cadastrarDespesa(novaDespesa);

      Alert.alert(
        "Sucesso",
        mensagem || "Despesa cadastrada com sucesso."
      );

      limparFormulario();
      onSuccess?.();
      onClose();
    } catch (erro: unknown) {
      const mensagem =
        erro instanceof Error
          ? erro.message
          : "Não foi possível cadastrar a despesa.";

      Alert.alert("Erro", mensagem);
    } finally {
      setCadastrando(false);
    }
  };

  return (
    <Modal
      visible={visivel}
      transparent
      animationType="fade"
      onRequestClose={fechar}
    >
      <View style={styles.fundoModal}>
        <View style={styles.modal}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <Text style={styles.titulo}>Cadastrar despesa</Text>

            <Text style={styles.rotulo}>Imóvel *</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={idImovel}
                enabled={!cadastrando}
                onValueChange={(novoId) =>
                  setIdImovel(
                    novoId === null ? null : Number(novoId)
                  )
                }
              >
                <Picker.Item
                  label="Selecione um imóvel"
                  value={null}
                />

                {imoveis.map((imovel) => (
                  <Picker.Item
                    key={imovel.idImovel}
                    label={imovel.nomeImovel}
                    value={imovel.idImovel}
                  />
                ))}
              </Picker>
            </View>

            <Text style={styles.rotulo}>Nome da despesa *</Text>
            <TextInput
              style={styles.campo}
              value={nomeDespesa}
              onChangeText={setNomeDespesa}
              placeholder="Ex.: IPTU, Condomínio ou Manutenção"
              editable={!cadastrando}
            />

            <Text style={styles.rotulo}>Valor da despesa *</Text>
            <TextInput
              style={styles.campo}
              value={valorDespesa}
              onChangeText={(texto) =>
                setValorDespesa(aplicarMascaraMoeda(texto))
              }
              placeholder="R$ 0,00"
              keyboardType="numeric"
              editable={!cadastrando}
            />

            {cadastrando ? (
              <View style={styles.carregamento}>
                <ActivityIndicator size="large" color="#2563EB" />
                <Text style={styles.textoCarregamento}>
                  Cadastrando despesa...
                </Text>
              </View>
            ) : (
              <View style={styles.botoes}>
                <View style={styles.botao}>
                  <Button title="Cancelar" color="#64748B" onPress={fechar} />
                </View>

                <View style={styles.botao}>
                  <Button title="Cadastrar" onPress={enviar} />
                </View>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fundoModal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    width: "100%",
    maxWidth: 520,
    maxHeight: "90%",
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
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
  botoes: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  botao: {
    flex: 1,
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
