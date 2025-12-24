import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Touchable, TouchableOpacity, View } from "react-native";
import { DataTable, Text } from "react-native-paper";
import api from "../services/api";
import { ImovelDto } from "../types/types";
import { ModalCadImovel, ModalDelImovel, ModalEditImovel } from "../components/modals"

export default function Lista() {
  const [dados, setDados] = useState<ImovelDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [openCad, setCad] = useState(false);
  const [openDel, setDel] = useState(false);
  const [openEdit, setEdit] = useState(false);
  const [idImovel, setId] = useState<number | null>(null);
  const [totAluguel, setTotA] = useState<number>(0);
  let TotAluguel = 0
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
        if (dados[index].statusImovel === "Alugado") {
          TotAluguel += Number(dados[index].valorAluguelImovel);
        }
      }
      setTotA(TotAluguel);
      console.log("Total de aluguel:", TotAluguel);
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
    <ScrollView style={{padding: 20}}>
      {openCad && (
        <ModalCadImovel onClose={() => setCad(false)} />
      )}

      {openEdit && (
        <ModalEditImovel idImovel={idImovel} onClose={() => setEdit(false)} />
      )}

      {openDel && (
        <ModalDelImovel idImovel={idImovel} onClose={() => setDel(false)} />
      )}

      <ScrollView style={{ alignSelf: 'center' }}>
        <View style={{ padding: 20, width: 1300 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
            |Lista de Imóveis | Soma dos Alugueis: R${totAluguel.toLocaleString('pt-BR')}|
          </Text>

          <DataTable style={{ backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden' }}>
            <DataTable.Header style={{ backgroundColor: '#f0f0f0', height: 56 }}>
              <DataTable.Title style={{ flex: 8 }}>NOME</DataTable.Title>
              <DataTable.Title style={{ flex: 4 }}>CEP</DataTable.Title>
              <DataTable.Title style={{ flex: 8 }}>RUA</DataTable.Title>
              <DataTable.Title style={{ flex: 4 }}>BAIRRO</DataTable.Title>
              <DataTable.Title style={{ flex: 4 }}>CIDADE</DataTable.Title>
              <DataTable.Title style={{ flex: 4 }}>ESTADO</DataTable.Title>
              <DataTable.Title numeric style={{ flex: 2 }}>ALUGUEL</DataTable.Title>
              <DataTable.Title numeric style={{ flex: 5 }}>VALOR IMÓVEL</DataTable.Title>
              <DataTable.Title style={{ flex: 3, paddingLeft: 50 }}>STATUS</DataTable.Title>
              <DataTable.Title style={{ flex: 2 }}> </DataTable.Title>
              <DataTable.Title style={{ flex: 2 }}><TouchableOpacity onPress={() => setCad(true)}>📑</TouchableOpacity></DataTable.Title>
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
                <DataTable.Cell style={{ flex: 4 }}>{item.endereco.cepImovel}</DataTable.Cell>
                <DataTable.Cell style={{ flex: 8 }}>{item.endereco.ruaImovel}</DataTable.Cell>
                <DataTable.Cell style={{ flex: 4 }}>{item.endereco.bairroImovel}</DataTable.Cell>
                <DataTable.Cell style={{ flex: 4 }}>{item.endereco.cidadeImovel}</DataTable.Cell>
                <DataTable.Cell style={{ flex: 3.4 }}>{item.endereco.estadoImovel}</DataTable.Cell>
                <DataTable.Cell numeric style={{ flex: 3 }}>
                  <Text style={{ fontWeight: 'bold', color: '#0066cc' }}>
                    R$ {Number(item.valorAluguelImovel).toLocaleString('pt-BR')}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell numeric style={{ flex: 4 }}>
                  <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                    R$ {Number(item.valor_imovel).toLocaleString('pt-BR')}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={{ flex: 4, paddingLeft: 70 }}>
                  <Text style={{
                    color: item.statusImovel === 'Alugado' ? '#006400' : '#c62828',
                    padding: 2,
                    borderWidth: 2,
                    borderRadius: 10,
                    fontWeight: '600',
                  }}>
                    {item.statusImovel?.toUpperCase()}
                  </Text>
                </DataTable.Cell>

                <DataTable.Cell style={{ flex: 2 }}>
                  <TouchableOpacity onPress={() => { setEdit(true); setId(item.idImovel); }}>✎</TouchableOpacity>
                </DataTable.Cell>

                <DataTable.Cell>
                  <TouchableOpacity onPress={() => { setDel(true); setId(item.idImovel); }}>✖</TouchableOpacity>
                </DataTable.Cell>

              </DataTable.Row>
            ))}
          </DataTable>
        </View>
      </ScrollView>
    </ScrollView>
  );
}

export {Lista}
