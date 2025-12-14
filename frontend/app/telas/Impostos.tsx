import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Touchable, TouchableOpacity, View } from "react-native";
import { DataTable, Text } from "react-native-paper";
import api from "../services/api";
import { ImovelDto } from "../types/types";
import { ModalCadImovel, ModalDelImovel, ModalEditImovel } from "../components/modals"

export default function impostos() {
  const [dados, setDados] = useState<ImovelDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [openCad, setCad] = useState(false);
  const [openDel, setDel] = useState(false);
  const [openEdit, setEdit] = useState(false);
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
      <View style={{ padding: 20 }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }




  return (
    <ScrollView>
      <ScrollView style={{ alignSelf: 'center' }}>
        <View style={{ padding: 20, width: 1300 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
            Impostos Imóveis 
          </Text>

          <DataTable style={{ backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden' }}>
            <DataTable.Header style={{ backgroundColor: '#f0f0f0', height: 56 }}>
              <DataTable.Title style={{ flex: 8 }}>NOME</DataTable.Title>
            </DataTable.Header>


            {dados.map((item) => (
              <DataTable.Row
                key={item.idImovel}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#eee',
                }}
              >
                <DataTable.Cell style={{ flex: 8 }}>
                  <Text style={{ fontWeight: '600' }}>{item.nomeImovel}</Text>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </View>
      </ScrollView>
    </ScrollView>
  );
}
