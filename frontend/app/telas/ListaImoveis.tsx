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

  if (loading) {
    return (
      <View style={{ padding: 20 }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView>
      {openCad && (
        <ModalCadImovel onClose={() => setCad(false)} />
      )}

      {openEdit && (
        <ModalEditImovel onClose={() => setEdit(false)} />
      )}

      {openDel && (
        <ModalDelImovel onClose={() => setDel(false)} />
      )}

      <ScrollView style={{ alignSelf: 'center' }}>
        <View style={{ padding: 20, width: 1300 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
            Lista de Imóveis
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
                <DataTable.Cell style={{ flex: 4 }}>{item.cepImovel}</DataTable.Cell>
                <DataTable.Cell style={{ flex: 8 }}>{item.ruaImovel}</DataTable.Cell>
                <DataTable.Cell style={{ flex: 4 }}>{item.bairroImovel}</DataTable.Cell>
                <DataTable.Cell style={{ flex: 4 }}>{item.cidadeImovel}</DataTable.Cell>
                <DataTable.Cell style={{ flex: 3.4 }}>{item.estadoImovel}</DataTable.Cell>
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
                  <TouchableOpacity onPress={() => setEdit(true)}>✎</TouchableOpacity>
                </DataTable.Cell>

                <DataTable.Cell>
                 <TouchableOpacity onPress={() => setDel(true)}>✖</TouchableOpacity>
                </DataTable.Cell>

              </DataTable.Row>
            ))}
          </DataTable>
        </View>
      </ScrollView>
    </ScrollView>
  );
}
