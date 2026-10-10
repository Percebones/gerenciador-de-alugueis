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

export default function Pagamentos() {
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
                "Erro ao buscar imóveis para pagamentos:",
                erro
            );

            const mensagem =
                erro instanceof Error
                    ? erro.message
                    : "Não foi possível buscar os pagamentos.";

            Alert.alert("Erro", mensagem);
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        buscarImoveis();
    }, []);

    const imoveisAlugados = useMemo(() => {
        return imoveis.filter(
            (imovel) =>
                imovel.statusImovel?.toUpperCase() ===
                "ALUGADO"
        );
    }, [imoveis]);

    const totalRecebido = useMemo(() => {
        return imoveisAlugados.reduce(
            (totalAtual, imovel) =>
                totalAtual +
                Number(imovel.valorAluguelImovel),
            0
        );
    }, [imoveisAlugados]);

    const formatarMoeda = (
        valor: number | string
    ): string => {
        return Number(valor).toLocaleString("pt-BR", {
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
                    Carregando pagamentos...
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>
                Pagamentos do mês atual
            </Text>

            <Text style={styles.total}>
                Total recebido:{" "}
                {formatarMoeda(totalRecebido)}
            </Text>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator
                contentContainerStyle={styles.conteudoScroll}
            >
                <View style={styles.tabelaContainer}>
                    <DataTable style={styles.tabela}>
                        <DataTable.Header style={styles.cabecalho}>
                            <DataTable.Title
                                style={styles.colunaMes}
                            >
                                MÊS
                            </DataTable.Title>

                            <DataTable.Title
                                style={styles.colunaImovel}
                            >
                                IMÓVEL
                            </DataTable.Title>

                            <DataTable.Title
                                numeric
                                style={styles.colunaValor}
                            >
                                VALOR RECEBIDO
                            </DataTable.Title>

                            <DataTable.Title
                                style={styles.colunaData}
                            >
                                DATA DE PAGAMENTO
                            </DataTable.Title>
                        </DataTable.Header>

                        {imoveisAlugados.map((imovel) => (
                            <DataTable.Row
                                key={imovel.idImovel}
                                style={styles.linha}
                            >
                                <DataTable.Cell
                                    style={styles.colunaMes}
                                >
                                    <Text numberOfLines={1}>
                                        Janeiro
                                    </Text>
                                </DataTable.Cell>

                                <DataTable.Cell
                                    style={styles.colunaImovel}
                                >
                                    <Text
                                        style={styles.nomeImovel}
                                        numberOfLines={1}
                                    >
                                        {imovel.nomeImovel}
                                    </Text>
                                </DataTable.Cell>

                                <DataTable.Cell
                                    numeric
                                    style={styles.colunaValor}
                                >
                                    <Text
                                        style={styles.valorRecebido}
                                        numberOfLines={1}
                                    >
                                        {formatarMoeda(
                                            imovel.valorAluguelImovel
                                        )}
                                    </Text>
                                </DataTable.Cell>

                                <DataTable.Cell
                                    style={styles.colunaData}
                                >
                                    <Text numberOfLines={1}>
                                        25/12/2025
                                    </Text>
                                </DataTable.Cell>
                            </DataTable.Row>
                        ))}
                    </DataTable>

                    {imoveisAlugados.length === 0 && (
                        <Text style={styles.listaVazia}>
                            Nenhum pagamento encontrado.
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
        fontSize: 24,
        fontWeight: "bold",
        color: "#0F172A",
    },

    total: {
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
        minWidth: 900,
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

    colunaMes: {
        flex: 2,
        paddingHorizontal: 20,
    },

    colunaImovel: {
        flex: 4,
        paddingHorizontal: 20,
    },

    colunaValor: {
        flex: 3,
        paddingHorizontal: 20,
    },

    colunaData: {
        flex: 3,
        paddingHorizontal: 20,
    },

    nomeImovel: {
        fontWeight: "700",
        color: "#0F172A",
    },

    valorRecebido: {
        color: "#0066CC",
        fontWeight: "700",
    },

    listaVazia: {
        width: "100%",
        paddingVertical: 28,
        color: "#64748B",
        textAlign: "center",
    },
});