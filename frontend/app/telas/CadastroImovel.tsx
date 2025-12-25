import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Alert, Button, ScrollView, Text, TextInput } from 'react-native';
import api from '../services/api';

function CadastrarImovel() {
  const [nome, setNome] = useState('');
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('Parana'); // Valor inicial
  const [aluguel, setAluguel] = useState('');
  const [valor, setValor] = useState('');
  const [status, setStatus] = useState('Vago'); // Valor inicial

  const enviar = () => {
    const dados = {
      nomeImovel: nome,
      endereco: {
        cepImovel: cep,
        ruaImovel: rua,
        bairroImovel: bairro,
        cidadeImovel: cidade,
        estadoImovel: estado,
      },
      valorAluguelImovel: Number(aluguel),
      valor_imovel: Number(valor),
      statusImovel: status,
      despesa: {
          iptuImovel: 0
      }

    };
    if (dados.nomeImovel === "") {
      alert("Nome do imovel não pode ser vazio")
    } else if (dados.endereco.cepImovel === "") {
      alert("CEP do imovel não pode ser vazio")
    } else if (dados.endereco.ruaImovel === "") {
      alert("Rua do imovel não pode ser vazio")
    } else if (dados.endereco.estadoImovel === "") {
      alert("Estado do imovel não pode ser vazio")
    } else if (dados.statusImovel === "") {
      alert("Status do imovel não pode ser vazio")
    } else {
      api.post("/api/imoveis/cria", dados)
        .then(() => {
          Alert.alert("Sucesso", "Imóvel cadastrado!");
          alert("Imovel cadastrado com Sucesso")
          window.location.reload();
        })
        .catch((err) => {
          console.log("ERRO API:", err.response?.data);
          const mensagem = err.response?.data;
          alert(mensagem);
        });
    }

  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Cadastrar Imóvel</Text>

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

      <Button title="Enviar" onPress={enviar} />
    </ScrollView>
  );
}

export { CadastrarImovel }
