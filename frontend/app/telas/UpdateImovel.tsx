import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { Alert, Button, ScrollView, Text, TextInput } from 'react-native';
import api from '../services/api';
import { ImovelDto } from '../types/types';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';


type Props = {
  idImovel: number;
}

function UpdateImovel({ idImovel }: Props) {
  const [dados, setDados] = useState<ImovelDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [nome, setNome] = useState('');
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('Parana'); // Valor inicial
  const [aluguel, setAluguel] = useState('');
  const [valor, setValor] = useState('');
  const [status, setStatus] = useState('Vago'); // Valor inicial

  useEffect(() => {
    if (!idImovel) return;

    setLoading(true);

    api.get(`/api/imoveis/porID/${idImovel}`)
      .then((res) => {
        setDados(res.data);
      })
      .catch((err) => {
        console.log("ERRO API:", err);
      })
      .finally(() => setLoading(false));
  }, [idImovel]);

  useEffect(() => {
    if (!dados) return;

    setNome(dados.nomeImovel);
    setCep(dados.endereco.cepImovel);
    setRua(dados.endereco.ruaImovel);
    setBairro(dados.endereco.bairroImovel);
    setCidade(dados.endereco.cidadeImovel);
    setEstado(dados.endereco.estadoImovel);
    setStatus(dados.statusImovel);
    setAluguel(String(dados.valorAluguelImovel));
    setValor(String(dados.valor_imovel));
  }, [dados]);

  const enviar = () => {
    const carga = {
      idImovel: idImovel,
      nomeImovel: nome,
      endereco: {
        cepImovel: cep,
        ruaImovel: rua,
        bairroImovel: bairro,
        cidadeImovel: cidade,
        estadoImovel: estado,
      },
      statusImovel: status,
      valorAluguelImovel: Number(aluguel),
      valor_imovel: Number(valor),
    };
    api.post("/api/imoveis/update", carga)
      .then(() => {
        Alert.alert("Sucesso", "Imóvel Atualizado!");
        alert("Imovel Atualizado com Sucesso")
        window.location.reload();

      })
      .catch((err) => {
        console.log("ERRO API:", err.response?.data);
        const mensagem = err.response?.data;
        alert(mensagem);
      });
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Atualizar Imóvel</Text>

      <Text>Nome *</Text>
      <TextInput style={{ borderWidth: 1, marginBottom: 10, padding: 5 }} value={nome} onChangeText={setNome} />

      <Text>CEP *</Text>
      <TextInput maxLength={8} style={{ borderWidth: 1, marginBottom: 10, padding: 5 }} value={cep} onChangeText={setCep} />

      <Text>Rua *</Text>
      <TextInput style={{ borderWidth: 1, marginBottom: 10, padding: 5 }} value={rua} onChangeText={setRua} />

      <Text>Bairro</Text>
      <TextInput style={{ borderWidth: 1, marginBottom: 10, padding: 5 }} value={bairro} onChangeText={setBairro} />

      <Text>Cidade</Text>
      <TextInput style={{ borderWidth: 1, marginBottom: 10, padding: 5 }} value={cidade} onChangeText={setCidade} />

      <Text>Estado</Text>
      <Picker
        selectedValue={estado}
        onValueChange={(itemValue) => setEstado(itemValue)}
        style={{ borderWidth: 1, marginBottom: 10 }}
      >
        <Picker.Item label="Paraná" value="Parana" />
        <Picker.Item label="São Paulo" value="SaoPaulo" />
      </Picker>

      <Text>Aluguel</Text>
      <TextInput style={{ borderWidth: 1, marginBottom: 10, padding: 5 }} value={aluguel} onChangeText={setAluguel} keyboardType="numeric" />

      <Text>Valor do imóvel</Text>
      <TextInput style={{ borderWidth: 1, marginBottom: 10, padding: 5 }} value={valor} onChangeText={setValor} keyboardType="numeric" />

      <Text>Status</Text>
      <Picker
        selectedValue={status}
        onValueChange={(itemValue) => setStatus(itemValue)}
        style={{ borderWidth: 1, marginBottom: 20 }}
      >
        <Picker.Item label="Vago" value="Vago" />
        <Picker.Item label="Alugado" value="Alugado" />
      </Picker>

      <Button title="Atualizar" onPress={enviar} />
    </ScrollView>
  );
}

export { UpdateImovel }
