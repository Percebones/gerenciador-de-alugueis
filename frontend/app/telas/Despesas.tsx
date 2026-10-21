import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { DataTable, IconButton, Text } from "react-native-paper";

import { gerenciadorService } from "../services/gerenciadorService";
import { ImovelDto } from "../types/types";
import ModalCadDespesa from "./CadastroDespesa";

interface DespesaConsolidadaPorImovel {
  idImovel: number;
  nomeImovel: string;
  totalIptu: number;
  totalCondominio: number;
  totalOutrasDespesas: number;
  totalDespesas: number;
}

interface Props {
  atualizacao: number;
  atualizarTodos: () => void;
}

interface TotaisGerais {
  totalIptu: number;
  totalCondominio: number;
  totalOutrasDespesas: number;
  totalDespesas: number;
}

const converterParaNumero = (
  valor: number | string | null | undefined
): number => {
  const numeroConvertido = Number(valor ?? 0);

  return Number.isFinite(numeroConvertido) ? numeroConvertido : 0;
};

const formatarMoeda = (valor: number): string => {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

const normalizarNomeDespesa = (
  nomeDespesa: string | null | undefined
): string => {
  return (nomeDespesa ?? "")
    .trim()
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

export default function Despesas({
  atualizacao,
  atualizarTodos,
}: Props) {
  const [imoveis, setImoveis] = useState<ImovelDto[]>([]);
  const [modalCadastroAberto, setModalCadastroAberto] = useState(false);
  const [carregando, setCarregando] = useState(true);

  const buscarImoveis = useCallback(async (): Promise<void> => {
    try {
      setCarregando(true);

      const imoveisEncontrados =
        await gerenciadorService.buscarTodosImoveis();

      if (!Array.isArray(imoveisEncontrados)) {
        throw new Error(
          "O servidor não retornou uma lista válida de imóveis."
        );
      }

      setImoveis(imoveisEncontrados);
    } catch (erro: unknown) {
      console.error(
        "Erro ao buscar os imóveis e suas despesas:",
        erro
      );

      setImoveis([]);

      const mensagem =
        erro instanceof Error
          ? erro.message
          : "Não foi possível carregar as despesas.";

      Alert.alert("Erro", mensagem);
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    void buscarImoveis();
  }, [buscarImoveis, atualizacao]);

  const despesasPorImovel = useMemo<
    DespesaConsolidadaPorImovel[]
  >(() => {
    return imoveis.map((imovel) => {
      const despesasDoImovel = Array.isArray(imovel.listaDespesas)
        ? imovel.listaDespesas
        : [];

      const totaisDoImovel = despesasDoImovel.reduce(
        (totaisAcumulados, despesa) => {
          const nomeDespesaNormalizado = normalizarNomeDespesa(
            despesa.nomeDespesa
          );

          const valorDespesa = converterParaNumero(
            despesa.valorDespesa
          );

          if (nomeDespesaNormalizado === "IPTU") {
            totaisAcumulados.totalIptu += valorDespesa;
          } else if (nomeDespesaNormalizado === "CONDOMINIO") {
            totaisAcumulados.totalCondominio += valorDespesa;
          } else {
            totaisAcumulados.totalOutrasDespesas += valorDespesa;
          }

          totaisAcumulados.totalDespesas += valorDespesa;

          return totaisAcumulados;
        },
        {
          totalIptu: 0,
          totalCondominio: 0,
          totalOutrasDespesas: 0,
          totalDespesas: 0,
        }
      );

      return {
        idImovel: imovel.idImovel,
        nomeImovel: imovel.nomeImovel?.trim() || "Imóvel sem nome",
        totalIptu: totaisDoImovel.totalIptu,
        totalCondominio: totaisDoImovel.totalCondominio,
        totalOutrasDespesas: totaisDoImovel.totalOutrasDespesas,
        totalDespesas: totaisDoImovel.totalDespesas,
      };
    });
  }, [imoveis]);

  const totaisGerais = useMemo<TotaisGerais>(() => {
    return despesasPorImovel.reduce<TotaisGerais>(
      (totaisAcumulados, despesasDoImovel) => ({
        totalIptu:
          totaisAcumulados.totalIptu + despesasDoImovel.totalIptu,
        totalCondominio:
          totaisAcumulados.totalCondominio +
          despesasDoImovel.totalCondominio,
        totalOutrasDespesas:
          totaisAcumulados.totalOutrasDespesas +
          despesasDoImovel.totalOutrasDespesas,
        totalDespesas:
          totaisAcumulados.totalDespesas +
          despesasDoImovel.totalDespesas,
      }),
      {
        totalIptu: 0,
        totalCondominio: 0,
        totalOutrasDespesas: 0,
        totalDespesas: 0,
      }
    );
  }, [despesasPorImovel]);

  const abrirCadastroDespesa = (): void => {
    setModalCadastroAberto(true);
  };

  const fecharModalCadastro = (): void => {
    setModalCadastroAberto(false);
  };

  const despesaCadastrada = async (): Promise<void> => {
  setModalCadastroAberto(false);
  await buscarImoveis();
  atualizarTodos();
};

  if (carregando) {
    return (
      <View style={styles.carregamento}>
        <ActivityIndicator size="large" color="#2563EB" />

        <Text style={styles.textoCarregamento}>
          Carregando despesas...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ModalCadDespesa
        visivel={modalCadastroAberto}
        imoveis={imoveis}
        onClose={fecharModalCadastro}
        onSuccess={despesaCadastrada}
      />

      <Text style={styles.titulo}>Despesas dos Imóveis</Text>

      <Text style={styles.subtitulo}>
        Total de despesas:{" "}
        <Text style={styles.valorTotalSubtitulo}>
          {formatarMoeda(totaisGerais.totalDespesas)}
        </Text>
      </Text>

      <ScrollView
        horizontal
        style={styles.scrollTabela}
        contentContainerStyle={styles.conteudoScroll}
        showsHorizontalScrollIndicator
      >
        <View style={styles.tabelaContainer}>
          <DataTable style={styles.tabela}>
            <DataTable.Header style={styles.cabecalho}>
              <DataTable.Title
                style={styles.colunaImovel}
                textStyle={styles.textoCabecalho}
              >
                IMÓVEL
              </DataTable.Title>

              <DataTable.Title
                numeric
                style={styles.colunaValor}
                textStyle={styles.textoCabecalho}
              >
                IPTU
              </DataTable.Title>

              <DataTable.Title
                numeric
                style={styles.colunaValor}
                textStyle={styles.textoCabecalho}
              >
                CONDOMÍNIO
              </DataTable.Title>

              <DataTable.Title
                numeric
                style={styles.colunaValor}
                textStyle={styles.textoCabecalho}
              >
                OUTRAS
              </DataTable.Title>

              <DataTable.Title
                numeric
                style={styles.colunaValor}
                textStyle={styles.textoCabecalho}
              >
                TOTAL
              </DataTable.Title>

              <View style={styles.colunaAcaoCabecalho}>
                <IconButton
                  icon="plus-circle-outline"
                  size={26}
                  iconColor="#2563EB"
                  style={styles.botaoCadastrar}
                  onPress={abrirCadastroDespesa}
                  accessibilityLabel="Cadastrar nova despesa"
                />
              </View>
            </DataTable.Header>

            {despesasPorImovel.map((despesasDoImovel) => (
              <DataTable.Row
                key={despesasDoImovel.idImovel}
                style={styles.linha}
              >
                <DataTable.Cell style={styles.colunaImovel}>
                  <Text style={styles.nomeImovel} numberOfLines={1}>
                    {despesasDoImovel.nomeImovel}
                  </Text>
                </DataTable.Cell>

                <DataTable.Cell numeric style={styles.colunaValor}>
                  <Text
                    style={
                      despesasDoImovel.totalIptu > 0
                        ? styles.valorDespesa
                        : styles.valorZerado
                    }
                    numberOfLines={1}
                  >
                    {formatarMoeda(despesasDoImovel.totalIptu)}
                  </Text>
                </DataTable.Cell>

                <DataTable.Cell numeric style={styles.colunaValor}>
                  <Text
                    style={
                      despesasDoImovel.totalCondominio > 0
                        ? styles.valorDespesa
                        : styles.valorZerado
                    }
                    numberOfLines={1}
                  >
                    {formatarMoeda(
                      despesasDoImovel.totalCondominio
                    )}
                  </Text>
                </DataTable.Cell>

                <DataTable.Cell numeric style={styles.colunaValor}>
                  <Text
                    style={
                      despesasDoImovel.totalOutrasDespesas > 0
                        ? styles.valorDespesa
                        : styles.valorZerado
                    }
                    numberOfLines={1}
                  >
                    {formatarMoeda(
                      despesasDoImovel.totalOutrasDespesas
                    )}
                  </Text>
                </DataTable.Cell>

                <DataTable.Cell numeric style={styles.colunaValor}>
                  <Text
                    style={
                      despesasDoImovel.totalDespesas > 0
                        ? styles.valorTotalImovel
                        : styles.valorZerado
                    }
                    numberOfLines={1}
                  >
                    {formatarMoeda(despesasDoImovel.totalDespesas)}
                  </Text>
                </DataTable.Cell>

                <DataTable.Cell style={styles.colunaAcao} />
              </DataTable.Row>
            ))}

            {despesasPorImovel.length > 0 && (
              <DataTable.Row style={styles.linhaTotal}>
                <DataTable.Cell style={styles.colunaImovel}>
                  <Text style={styles.descricaoTotal}>TOTAL GERAL</Text>
                </DataTable.Cell>

                <DataTable.Cell numeric style={styles.colunaValor}>
                  <Text style={styles.valorTotal} numberOfLines={1}>
                    {formatarMoeda(totaisGerais.totalIptu)}
                  </Text>
                </DataTable.Cell>

                <DataTable.Cell numeric style={styles.colunaValor}>
                  <Text style={styles.valorTotal} numberOfLines={1}>
                    {formatarMoeda(totaisGerais.totalCondominio)}
                  </Text>
                </DataTable.Cell>

                <DataTable.Cell numeric style={styles.colunaValor}>
                  <Text style={styles.valorTotal} numberOfLines={1}>
                    {formatarMoeda(
                      totaisGerais.totalOutrasDespesas
                    )}
                  </Text>
                </DataTable.Cell>

                <DataTable.Cell numeric style={styles.colunaValor}>
                  <Text
                    style={styles.valorTotalGeral}
                    numberOfLines={1}
                  >
                    {formatarMoeda(totaisGerais.totalDespesas)}
                  </Text>
                </DataTable.Cell>

                <DataTable.Cell style={styles.colunaAcao} />
              </DataTable.Row>
            )}
          </DataTable>

          {despesasPorImovel.length === 0 && (
            <View style={styles.estadoVazio}>
              <Text style={styles.tituloEstadoVazio}>
                Nenhum imóvel cadastrado
              </Text>

              <Text style={styles.descricaoEstadoVazio}>
                Cadastre um imóvel para visualizar suas despesas.
              </Text>
            </View>
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
    backgroundColor: "#F8FAFC",
  },
  textoCarregamento: {
    marginTop: 12,
    color: "#475569",
    fontSize: 16,
  },
  titulo: {
    color: "#0F172A",
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitulo: {
    marginTop: 6,
    marginBottom: 20,
    color: "#475569",
    fontSize: 16,
  },
  valorTotalSubtitulo: {
    color: "#B91C1C",
    fontWeight: "700",
  },
  scrollTabela: {
    width: "100%",
  },
  conteudoScroll: {
    flexGrow: 1,
    width: "100%",
    paddingBottom: 16,
  },
  tabelaContainer: {
    width: "100%",
    minWidth: 900,
  },
  tabela: {
    width: "100%",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#525252",
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
  textoCabecalho: {
    color: "#64748B",
    fontSize: 13,
    fontWeight: "600",
  },
  linha: {
    width: "100%",
    minHeight: 64,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  linhaTotal: {
    width: "100%",
    minHeight: 68,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
  },
  colunaImovel: {
    flex: 3,
    paddingHorizontal: 20,
  },
  colunaValor: {
    flex: 2,
    paddingHorizontal: 20,
  },
  colunaAcao: {
    flex: 1,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
  },
  colunaAcaoCabecalho: {
    flex: 1,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
  },
  botaoCadastrar: {
    margin: 0,
  },
  nomeImovel: {
    color: "#0F172A",
    fontSize: 16,
    fontWeight: "bold",
  },
  valorDespesa: {
    color: "#B91C1C",
    fontSize: 16,
    fontWeight: "600",
  },
  valorZerado: {
    color: "#64748B",
    fontSize: 16,
    fontWeight: "500",
  },
  valorTotalImovel: {
    color: "#0F172A",
    fontSize: 16,
    fontWeight: "bold",
  },
  descricaoTotal: {
    color: "#0F172A",
    fontSize: 16,
    fontWeight: "bold",
  },
  valorTotal: {
    color: "#0F172A",
    fontSize: 16,
    fontWeight: "bold",
  },
  valorTotalGeral: {
    color: "#B91C1C",
    fontSize: 17,
    fontWeight: "bold",
  },
  estadoVazio: {
    minHeight: 150,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  tituloEstadoVazio: {
    color: "#0F172A",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  descricaoEstadoVazio: {
    marginTop: 8,
    color: "#64748B",
    fontSize: 15,
    textAlign: "center",
  },
});
