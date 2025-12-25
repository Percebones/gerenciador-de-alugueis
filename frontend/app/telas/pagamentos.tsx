import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Touchable, TouchableOpacity, View } from "react-native";
import { DataTable, Text } from "react-native-paper";
import api from "../services/api";
import { ImovelDto } from "../types/types";
import { ModalCadImovel, ModalDelImovel, ModalEditImovel } from "../components/modals"
import Lista from "./ListaImoveis";

export default function Pagamentos() {
    const [dados, setDados] = useState<ImovelDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [idImovel, setId] = useState<number | null>(null);
    const [totAluguel, setTotA] = useState<number>(0);
    const [iptu, setIptu] = useState<number>(0);


    let TotAluguel = 0
    let TotIptu = 0
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
                if (dados[index].statusImovel === "Alugado") {
                    TotAluguel += Number(dados[index].valorAluguelImovel);
                }
            }
            setTotA(TotAluguel);
            setIptu(TotIptu)
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
                        |Pagamentos Mes Atual|
                    </Text>

                    <DataTable style={{ backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', borderWidth: 1 }}>
                        <DataTable.Header style={{ backgroundColor: '#f0f0f0', height: 56 }}>
                            <DataTable.Title style={{ flex: 1 }}>MES</DataTable.Title>
                            <DataTable.Title style={{ flex: 1 }}>IMOVEL</DataTable.Title>
                            <DataTable.Title style={{ flex: 1 }}>VALOR RECEBIDO</DataTable.Title>
                            <DataTable.Title style={{ flex: 1 }}>DATA DE PAGAMENTO</DataTable.Title>


                        </DataTable.Header>
                        {dados.map((item) => (
                            <DataTable.Row
                                key={item.idImovel}
                                style={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#eee',
                                }}
                            >
                                <DataTable.Cell style={{ flex: 1 }}>
                                    <Text style={{ fontWeight: '600' }}>Janeiro</Text>
                                </DataTable.Cell>
                                <DataTable.Cell style={{ flex: 1 }}>
                                    <Text style={{ fontWeight: '600' }}>{item.nomeImovel}</Text>
                                </DataTable.Cell>
                                <DataTable.Cell style={{ flex: 1 }}>R$ {Number(item.valorAluguelImovel).toLocaleString('pt-BR')}</DataTable.Cell>
                                                                <DataTable.Cell style={{ flex: 1 }}>25/12/2025</DataTable.Cell>

                            </DataTable.Row>
                        ))}

                    </DataTable>
                </View>
            </ScrollView>
        </ScrollView>
    );
}

export { Pagamentos }
