import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Touchable, TouchableOpacity, View } from "react-native";
import { DataTable, Text } from "react-native-paper";
import api from "../services/api";
import { ImovelDto } from "../types/types";
import { ModalCadImovel, ModalDelImovel, ModalEditImovel } from "../components/modals"
import Lista from "./ListaImoveis";

export default function Impostos() {
    const [dados, setDados] = useState<ImovelDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [idImovel, setId] = useState<number | null>(null);
    const [totAluguel, setTotA] = useState<number>(0);
    let a = 0
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
            let a = 0;
            for (let index = 0; index < dados.length; index++) {
                if (dados[index].statusImovel === "Alugado") {
                    a += Number(dados[index].valorAluguelImovel);
                }
            }
            setTotA(a);
            console.log("Total de aluguel:", a);
        }
    }, [dados]);

    if (loading) {
        return (
            <View>

            </View>
        );
    }




    return (
        <ScrollView style={{padding: 20}}>
            <ScrollView style={{ alignSelf: 'center' }}>
                <View style={{ padding: 20, width: 1300 }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
                        |Despesas|
                    </Text>

                    <DataTable style={{ backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden' }}>
                            <DataTable.Row>
                                <DataTable.Cell style={{ flex: 1 }}>
                                    <Text style={{fontWeight: "bold", fontSize: 25}}>IR: sobre R${totAluguel.toLocaleString('pt-BR')}:  R${totAluguel > 0? Math.round((totAluguel - 1000) * 0.275): 0}</Text>
                                </DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row>
                                <DataTable.Cell style={{ flex: 1 }}>
                                    <Text style={{fontWeight: "bold", fontSize: 25}}>IPTU: </Text>
                                </DataTable.Cell>
                            </DataTable.Row>
                       
                    </DataTable>
                </View>
            </ScrollView>
        </ScrollView>
    );
}

export {Impostos}
