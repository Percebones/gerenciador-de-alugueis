import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Touchable, TouchableOpacity, View } from "react-native";
import { DataTable, Text } from "react-native-paper";
import api from "../services/api";
import { ImovelDto } from "../types/types";
import { ModalCadImovel, ModalDelImovel, ModalEditImovel } from "../components/modals"
import Lista from "./ListaImoveis";

export default function Despesas() {
    const [dados, setDados] = useState<ImovelDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [idImovel, setId] = useState<number | null>(null);
    const [totAluguel, setTotA] = useState<number>(0);
    const [iptu, setIptu] = useState<number>(0);
    const [condominio, setCondominio] = useState<number>(0);

    let TotAluguel = 0
    let TotIptu = 0
    let TotCondomino = 0
    useEffect(() => {
        api.get("/api/imoveis/busca")
            .then((res) => {
                console.log("DADOS:", res.data);
                setDados(res.data);
            })
            .catch((err) => {
                console.log("ERRO API:", err);
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (dados.length > 0) {
            let TotAluguel = 0;
            for (let index = 0; index < dados.length; index++) {
                TotIptu += Number(dados[index].despesa.iptuImovel)
                TotCondomino += Number(dados[index].despesa.condominio)
                if (dados[index].statusImovel === "Alugado") {
                    TotAluguel += Number(dados[index].valorAluguelImovel);
                }
            }
            setTotA(TotAluguel);
            setIptu(TotIptu);
            setCondominio(TotCondomino);
            console.log("Total de aluguel:", TotAluguel);
        }
    }, [dados]);

    if (loading) {
        return (
            <View>

            </View>
        );
    }




    return (
        <ScrollView style={{ padding: 20 }}>
            <ScrollView style={{ alignSelf: 'center' }}>
                <View style={{ padding: 20, width: 1300 }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
                        |Despesas Totais|
                    </Text>

                    <DataTable style={{ backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', borderWidth: 1 }}>
                        <DataTable.Row>
                            <DataTable.Cell style={{ flex: 1 }}>
                                <Text style={{ fontWeight: "bold", fontSize: 25 }}>TOTAL EM IR SOBRE: R${totAluguel.toLocaleString('pt-BR')}:  R${totAluguel > 0 ? Math.round((totAluguel - 1000) * 0.275) : 0}</Text>
                            </DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell style={{ flex: 1 }}>
                                <Text style={{ fontWeight: "bold", fontSize: 25 }}>TOTAL EM IPTU: {iptu}</Text>
                            </DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell style={{ flex: 1 }}>
                                <Text style={{ fontWeight: "bold", fontSize: 25 }}>TOTAL EM CONDOMINIO: {condominio}</Text>
                            </DataTable.Cell>
                        </DataTable.Row>

                    </DataTable>
                </View>
            </ScrollView>
        </ScrollView>
    );
}

export { Despesas }
