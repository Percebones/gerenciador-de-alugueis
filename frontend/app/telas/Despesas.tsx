import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { DataTable, Text } from "react-native-paper";

import { gerenciadorService } from "../services/gerenciadorService";
import { ImovelDto } from "../types/types";

export default function Despesas() {
  const [imoveis, setImoveis] = useState<ImovelDto[]>([]);
  const [carregando, setCarregando] = useState(true);

  const buscarImoveis = async (): Promise<void> => {
    try {
      setCarregando(true);

      const imoveisEncontrados =
        await gerenciadorService.buscarTodosImoveis();

      setImoveis(imoveisEncontrados);
    } catch (erro: unknown) {
      console.error(
        "Erro ao buscar imóveis para calcular despesas:",
        erro
      );

      const mensagem =
        erro instanceof Error
          ? erro.message
          : "Não foi possível carregar as despesas.";

      Alert.alert("Erro", mensagem);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarImoveis();
  }, []);

  const totais = useMemo(() => {
    return imoveis.reduce(
      (acumulador, imovel) => {
        const imovelEstaAlugado =
          imovel.statusImovel?.toUpperCase() ===
          "ALUGADO";

        if (imovelEstaAlugado) {
          acumulador.totalAlugueis += Number(
            imovel.valorAluguelImovel
          );
        }

        /*
         * Mantive "despesa" porque esse era o campo usado
         * no seu componente original.
         */
        acumulador.totalIptu += Number(
          imovel.despesa?.iptuImovel ?? 0
        );

        acumulador.totalCondominio += Number(
          imovel.despesa?.condominio ?? 0
        );

        return acumulador;
      },
      {
        totalAlugueis: 0,
        totalIptu: 0,
        totalCondominio: 0,
      }
    );
  }, [imoveis]);

  const impostoDeRenda = useMemo(() => {
    if (totais.totalAlugueis <= 1000) {
      return 0;
    }

    return Math.round(
      (totais.totalAlugueis - 1000) * 0.275
    );
  }, [totais.totalAlugueis]);

  const formatarMoeda = (valor: number): string => {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  if (carregando) {
    return (
      <View style={styles.carregamento}>
        <ActivityIndicator
          size="large"
          color="#2563EB"
        />

        <Text style={styles.textoCarregamento}>
          Carregando despesas...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Despesas Totais
      </Text>

      <Text style={styles.subtitulo}>
        Resumo financeiro dos imóveis cadastrados
      </Text>

      <ScrollView
        horizontal
        style={styles.scrollTabela}
        contentContainerStyle={styles.conteudoScroll}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.tabelaContainer}>
          <DataTable style={styles.tabela}>
            <DataTable.Header style={styles.cabecalho}>
              <DataTable.Title
                style={styles.colunaDescricao}
              >
                DESCRIÇÃO
              </DataTable.Title>

              <DataTable.Title
                numeric
                style={styles.colunaValor}
              >
                VALOR
              </DataTable.Title>
            </DataTable.Header>

            <DataTable.Row style={styles.linha}>
              <DataTable.Cell
                style={styles.colunaDescricao}
              >
                <Text style={styles.descricao}>
                  Receita total de aluguéis
                </Text>
              </DataTable.Cell>

              <DataTable.Cell
                numeric
                style={styles.colunaValor}
              >
                <Text style={styles.valorReceita}>
                  {formatarMoeda(
                    totais.totalAlugueis
                  )}
                </Text>
              </DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row style={styles.linha}>
              <DataTable.Cell
                style={styles.colunaDescricao}
              >
                <Text style={styles.descricao}>
                  Estimativa de Imposto de Renda
                </Text>
              </DataTable.Cell>

              <DataTable.Cell
                numeric
                style={styles.colunaValor}
              >
                <Text style={styles.valorDespesa}>
                  {formatarMoeda(impostoDeRenda)}
                </Text>
              </DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row style={styles.linha}>
              <DataTable.Cell
                style={styles.colunaDescricao}
              >
                <Text style={styles.descricao}>
                  Total de IPTU
                </Text>
              </DataTable.Cell>

              <DataTable.Cell
                numeric
                style={styles.colunaValor}
              >
                <Text style={styles.valorDespesa}>
                  {formatarMoeda(totais.totalIptu)}
                </Text>
              </DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row style={styles.linha}>
              <DataTable.Cell
                style={styles.colunaDescricao}
              >
                <Text style={styles.descricao}>
                  Total de condomínio
                </Text>
              </DataTable.Cell>

              <DataTable.Cell
                numeric
                style={styles.colunaValor}
              >
                <Text style={styles.valorDespesa}>
                  {formatarMoeda(
                    totais.totalCondominio
                  )}
                </Text>
              </DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row style={styles.linhaTotal}>
              <DataTable.Cell
                style={styles.colunaDescricao}
              >
                <Text style={styles.descricaoTotal}>
                  Total estimado de despesas
                </Text>
              </DataTable.Cell>

              <DataTable.Cell
                numeric
                style={styles.colunaValor}
              >
                <Text style={styles.valorTotal}>
                  {formatarMoeda(
                    impostoDeRenda +
                      totais.totalIptu +
                      totais.totalCondominio
                  )}
                </Text>
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#0F172A",
  },

  subtitulo: {
    marginTop: 6,
    marginBottom: 20,
    fontSize: 16,
    color: "#475569",
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
    minWidth: 700,
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

  linhaTotal: {
    width: "100%",
    minHeight: 68,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
  },

  colunaDescricao: {
    flex: 4,
    paddingHorizontal: 20,
  },

  colunaValor: {
    flex: 2,
    paddingHorizontal: 20,
  },

  descricao: {
    color: "#334155",
    fontSize: 16,
    fontWeight: "600",
  },

  descricaoTotal: {
    color: "#0F172A",
    fontSize: 16,
    fontWeight: "bold",
  },

  valorReceita: {
    color: "#166534",
    fontSize: 16,
    fontWeight: "bold",
  },

  valorDespesa: {
    color: "#B91C1C",
    fontSize: 16,
    fontWeight: "bold",
  },

  valorTotal: {
    color: "#991B1B",
    fontSize: 17,
    fontWeight: "bold",
  },
});

export { Despesas };