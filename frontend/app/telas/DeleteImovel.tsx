import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { Alert, Button, ScrollView, Text, TextInput, View } from 'react-native';
import api from '../services/api';
import { ImovelDto } from '../types/types';
import { router } from 'expo-router';

type Props = {
    idImovel: number;
}

function DeletarImovel({ idImovel }: Props) {
    const [dados, setDados] = useState<ImovelDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [nome, setNome] = useState('');
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('Parana');
    const [aluguel, setAluguel] = useState('');
    const [valor, setValor] = useState('');
    const [status, setStatus] = useState('Vago');

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
        setCep(dados.cepImovel);
        setRua(dados.ruaImovel);
        setBairro(dados.bairroImovel);
        setCidade(dados.cidadeImovel);
        setEstado(dados.estadoImovel);
        setStatus(dados.statusImovel);
        setAluguel(String(dados.valorAluguelImovel));
        setValor(String(dados.valor_imovel));
    }, [dados]);

    const enviar = () => {
        api.delete(`/api/imoveis/del/${idImovel}`)
            .then(() => {
                Alert.alert("Sucesso", "Imóvel Deletado!");
                alert("Imóvel Deletado com Sucesso")
                window.location.reload();

            })
            .catch((err) => {
                console.log("ERRO API:", err.response?.data);
                const mensagem = err.response?.data;
                alert(mensagem);
            });
    };

    return (
        <ScrollView style={{ padding: 20}}>
            <Text style={{ fontSize: 20, marginBottom: 20 }}>Gostaria de deletar esse Imovel?</Text>
            <Text style={{ fontSize: 20, marginBottom: 20 }}>Nome Imovel: {nome}</Text>
            <Text style={{ fontSize: 20, marginBottom: 20 }}>CEP Imovel: {cep}</Text>

            <View style={{ justifyContent: "center"  }}>
               
                    <Button title="Deletar" onPress={enviar} />
               
               
            </View>


        </ScrollView>
    );
}

export { DeletarImovel }
