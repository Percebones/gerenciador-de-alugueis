import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { DataTable, IconButton, Text } from "react-native-paper";

import {
  ModalCadImovel,
  ModalDelImovel,
  ModalEditImovel,
} from "../components/modals";

import { gerenciadorService } from "../services/gerenciadorService";
import { ImovelDto } from "../types/types";

/**
 * Representa os formatos possíveis retornados pelo serviço.
 *
 * A API pode retornar:
 * 1. Diretamente um array de imóveis;
 * 2. Um objeto Axios contendo o array em "data";
 * 3. Um objeto contendo o array na propriedade "imoveis".
 */
type RespostaImoveis = {
  data?: unknown;
  imoveis?: unknown;
};

/**
 * Extrai e valida a lista de imóveis recebida do serviço.
 *
 * Essa função evita que valores que não sejam arrays sejam
 * armazenados no estado da tela.
 */
function extrairListaImoveis(resposta: unknown): ImovelDto[] {
  if (Array.isArray(resposta)) {
    return resposta as ImovelDto[];
  }

  if (resposta !== null && typeof resposta === "object") {
    const respostaObjeto = resposta as RespostaImoveis;

    if (Array.isArray(respostaObjeto.data)) {
      return respostaObjeto.data as ImovelDto[];
    }

    if (Array.isArray(respostaObjeto.imoveis)) {
      return respostaObjeto.imoveis as ImovelDto[];
    }

    if (
      respostaObjeto.data !== null &&
      typeof respostaObjeto.data === "object"
    ) {
      const conteudoData = respostaObjeto.data as RespostaImoveis;

      if (Array.isArray(conteudoData.imoveis)) {
        return conteudoData.imoveis as ImovelDto[];
      }
    }
  }

  throw new Error("A API não retornou uma lista válida de imóveis.");
}

/**
 * Converte um valor numérico recebido da API.
 *
 * Caso o valor seja nulo, indefinido ou inválido,
 * retorna zero para evitar NaN nos cálculos e na interface.
 */
function converterParaNumero(valor: unknown): number {
  const numeroConvertido = Number(valor);

  return Number.isFinite(numeroConvertido)
    ? numeroConvertido
    : 0;
}

/**
 * Formata valores monetários no padrão brasileiro.
 */
function formatarMoeda(valor: unknown): string {
  return converterParaNumero(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function Lista() {
  const [imoveis, setImoveis] = useState<ImovelDto[]>([]);
  const [carregando, setCarregando] = useState(true);

  const [modalCadastroAberto, setModalCadastroAberto] =
    useState(false);

  const [modalEdicaoAberto, setModalEdicaoAberto] =
    useState(false);

  const [modalExclusaoAberto, setModalExclusaoAberto] =
    useState(false);

  const [imovelSelecionado, setImovelSelecionado] =
    useState<ImovelDto | null>(null);

  const [idImovelSelecionado, setIdImovelSelecionado] =
    useState<number | null>(null);

  const buscarImoveis = async (): Promise<void> => {
    try {
      setCarregando(true);

      const resposta =
        await gerenciadorService.buscarTodosImoveis();

      const listaImoveis = extrairListaImoveis(resposta);

      setImoveis(listaImoveis);
    } catch (erro: unknown) {
      console.error("Erro ao buscar imóveis:", erro);

      setImoveis([]);

      const mensagem =
        erro instanceof Error
          ? erro.message
          : "Não foi possível buscar os imóveis.";

      Alert.alert("Erro", mensagem);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    void buscarImoveis();
  }, []);

  const totalAlugueis = useMemo(() => {
    return imoveis.reduce((totalAtual, imovel) => {
      const statusNormalizado =
        imovel.statusImovel?.trim().toUpperCase();

      if (statusNormalizado !== "ALUGADO") {
        return totalAtual;
      }

      const valorAluguel = converterParaNumero(
        imovel.valorAluguelImovel
      );

      return totalAtual + valorAluguel;
    }, 0);
  }, [imoveis]);

  const fecharModalCadastro = async (): Promise<void> => {
    setModalCadastroAberto(false);
    await buscarImoveis();
  };

  const fecharModalEdicao = async (): Promise<void> => {
    setModalEdicaoAberto(false);
    setImovelSelecionado(null);

    await buscarImoveis();
  };

  const fecharModalExclusao = async (): Promise<void> => {
    setModalExclusaoAberto(false);
    setIdImovelSelecionado(null);

    await buscarImoveis();
  };

  if (carregando) {
    return (
      <View style={styles.carregamento}>
        <ActivityIndicator
          size="large"
          color="#2563EB"
        />

        <Text style={styles.textoCarregamento}>
          Carregando imóveis...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {modalCadastroAberto && (
        <ModalCadImovel
          onClose={fecharModalCadastro}
        />
      )}

      {modalEdicaoAberto &&
        imovelSelecionado !== null && (
          <ModalEditImovel
            imovel={imovelSelecionado}
            onClose={fecharModalEdicao}
          />
        )}

      {modalExclusaoAberto &&
        idImovelSelecionado !== null && (
          <ModalDelImovel
            idImovel={idImovelSelecionado}
            onClose={fecharModalExclusao}
          />
        )}

      <Text style={styles.titulo}>
        Lista de Imóveis
      </Text>

      <Text style={styles.total}>
        Soma dos aluguéis: {formatarMoeda(totalAlugueis)}
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator
        contentContainerStyle={styles.conteudoScroll}
      >
        <View style={styles.tabelaContainer}>
          <DataTable style={styles.tabela}>
            <DataTable.Header style={styles.cabecalho}>
              <DataTable.Title style={styles.colunaImovel}>
                IMÓVEL
              </DataTable.Title>

              <DataTable.Title style={styles.colunaCep}>
                CEP
              </DataTable.Title>

              <DataTable.Title style={styles.colunaRua}>
                RUA
              </DataTable.Title>

              <DataTable.Title style={styles.colunaBairro}>
                BAIRRO
              </DataTable.Title>

              <DataTable.Title style={styles.colunaCidade}>
                CIDADE
              </DataTable.Title>

              <DataTable.Title style={styles.colunaEstado}>
                ESTADO
              </DataTable.Title>

              <DataTable.Title
                numeric
                style={styles.colunaAluguel}
              >
                ALUGUEL
              </DataTable.Title>

              <DataTable.Title
                numeric
                style={styles.colunaValorImovel}
              >
                VALOR DO IMÓVEL
              </DataTable.Title>

              <DataTable.Title style={styles.colunaStatus}>
                STATUS
              </DataTable.Title>

              <DataTable.Title style={styles.colunaAcao}>
                EDITAR
              </DataTable.Title>

              <DataTable.Title style={styles.colunaAcao}>
                <IconButton
                  icon="plus-circle-outline"
                  size={26}
                  iconColor="#2563EB"
                  style={styles.botaoIconeCadastrar}
                  onPress={() =>
                    setModalCadastroAberto(true)
                  }
                  accessibilityLabel="Cadastrar novo imóvel"
                />
              </DataTable.Title>
            </DataTable.Header>

            {imoveis.map((imovel) => {
              const statusNormalizado =
                imovel.statusImovel
                  ?.trim()
                  .toUpperCase() ?? "VAGO";

              const imovelEstaAlugado =
                statusNormalizado === "ALUGADO";

              return (
                <DataTable.Row
                  key={imovel.idImovel}
                  style={styles.linha}
                >
                  <DataTable.Cell style={styles.colunaImovel}>
                    <Text
                      style={styles.nomeImovel}
                      numberOfLines={1}
                    >
                      {imovel.nomeImovel}
                    </Text>
                  </DataTable.Cell>

                  <DataTable.Cell style={styles.colunaCep}>
                    <Text numberOfLines={1}>
                      {imovel.endereco?.cepImovel ?? "-"}
                    </Text>
                  </DataTable.Cell>

                  <DataTable.Cell style={styles.colunaRua}>
                    <Text numberOfLines={1}>
                      {imovel.endereco?.ruaImovel ?? "-"}
                    </Text>
                  </DataTable.Cell>

                  <DataTable.Cell style={styles.colunaBairro}>
                    <Text numberOfLines={1}>
                      {imovel.endereco?.bairroImovel ?? "-"}
                    </Text>
                  </DataTable.Cell>

                  <DataTable.Cell style={styles.colunaCidade}>
                    <Text numberOfLines={1}>
                      {imovel.endereco?.cidadeImovel ?? "-"}
                    </Text>
                  </DataTable.Cell>

                  <DataTable.Cell style={styles.colunaEstado}>
                    <Text numberOfLines={1}>
                      {imovel.endereco?.estadoImovel ?? "-"}
                    </Text>
                  </DataTable.Cell>

                  <DataTable.Cell
                    numeric
                    style={styles.colunaAluguel}
                  >
                    <Text
                      style={styles.valorAluguel}
                      numberOfLines={1}
                    >
                      {formatarMoeda(
                        imovel.valorAluguelImovel
                      )}
                    </Text>
                  </DataTable.Cell>

                  <DataTable.Cell
                    numeric
                    style={styles.colunaValorImovel}
                  >
                    <Text
                      style={styles.valorImovel}
                      numberOfLines={1}
                    >
                      {formatarMoeda(imovel.valor_imovel)}
                    </Text>
                  </DataTable.Cell>

                  <DataTable.Cell style={styles.colunaStatus}>
                    <Text
                      style={[
                        styles.status,
                        imovelEstaAlugado
                          ? styles.statusAlugado
                          : styles.statusVago,
                      ]}
                    >
                      {statusNormalizado}
                    </Text>
                  </DataTable.Cell>

                  <DataTable.Cell style={styles.colunaAcao}>
                    <TouchableOpacity
                      style={styles.botaoAcao}
                      onPress={() => {
                        setImovelSelecionado(imovel);
                        setModalEdicaoAberto(true);
                      }}
                      accessibilityRole="button"
                      accessibilityLabel={`Editar ${imovel.nomeImovel}`}
                    >
                      <Text style={styles.iconeEditar}>
                        ✎
                      </Text>
                    </TouchableOpacity>
                  </DataTable.Cell>

                  <DataTable.Cell style={styles.colunaAcao}>
                    <TouchableOpacity
                      style={styles.botaoAcao}
                      onPress={() => {
                        setIdImovelSelecionado(
                          imovel.idImovel
                        );

                        setModalExclusaoAberto(true);
                      }}
                      accessibilityRole="button"
                      accessibilityLabel={`Excluir ${imovel.nomeImovel}`}
                    >
                      <Text style={styles.iconeExcluir}>
                        ✖
                      </Text>
                    </TouchableOpacity>
                  </DataTable.Cell>
                </DataTable.Row>
              );
            })}
          </DataTable>

          {imoveis.length === 0 && (
            <Text style={styles.listaVazia}>
              Nenhum imóvel encontrado.
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 20,
    backgroundColor: "#F8FAFC",
  },

  carregamento: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  textoCarregamento: {
    marginTop: 12,
    color: "#475569",
  },

  titulo: {
    color: "#0F172A",
    fontSize: 24,
    fontWeight: "bold",
  },

  total: {
    marginTop: 6,
    marginBottom: 20,
    color: "#475569",
    fontSize: 16,
  },

  conteudoScroll: {
    paddingBottom: 16,
  },

  tabelaContainer: {
    width: 1650,
  },

  tabela: {
    width: "100%",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
  },

  cabecalho: {
    width: "100%",
    minHeight: 64,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    borderBottomWidth: 1,
    borderBottomColor: "#CBD5E1",
  },

  linha: {
    width: "100%",
    minHeight: 64,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },

  colunaImovel: {
    flex: 8,
    paddingHorizontal: 16,
  },

  colunaCep: {
    flex: 4,
    paddingHorizontal: 12,
  },

  colunaRua: {
    flex: 8,
    paddingHorizontal: 12,
  },

  colunaBairro: {
    flex: 4,
    paddingHorizontal: 12,
  },

  colunaCidade: {
    flex: 4,
    paddingHorizontal: 12,
  },

  colunaEstado: {
    flex: 4,
    paddingHorizontal: 12,
  },

  colunaAluguel: {
    flex: 5,
    paddingHorizontal: 12,
  },

  colunaValorImovel: {
    flex: 6,
    paddingHorizontal: 12,
  },

  colunaStatus: {
    flex: 4,
    paddingHorizontal: 12,
  },

  colunaAcao: {
    flex: 2,
    paddingHorizontal: 8,
  },

  nomeImovel: {
    color: "#0F172A",
    fontWeight: "600",
  },

  valorAluguel: {
    color: "#0066CC",
    fontWeight: "bold",
  },

  valorImovel: {
    color: "#0F172A",
    fontWeight: "bold",
  },

  status: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    overflow: "hidden",
    borderWidth: 1,
    borderRadius: 8,
    fontWeight: "700",
    textAlign: "center",
  },

  statusAlugado: {
    color: "#166534",
    backgroundColor: "#DCFCE7",
    borderColor: "#86EFAC",
  },

  statusVago: {
    color: "#991B1B",
    backgroundColor: "#FEE2E2",
    borderColor: "#FCA5A5",
  },

  botaoAcao: {
    width: "100%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },

  botaoIconeCadastrar: {
    margin: 0,
    alignSelf: "center",
    transform: [{ translateY: -7 }],
  },

  iconeEditar: {
    color: "#2563EB",
    fontSize: 22,
    fontWeight: "bold",
  },

  iconeExcluir: {
    color: "#DC2626",
    fontSize: 18,
    fontWeight: "bold",
  },

  listaVazia: {
    padding: 24,
    color: "#64748B",
    textAlign: "center",
  },
});