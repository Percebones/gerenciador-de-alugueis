import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { Alert, Button, ScrollView, Text, TextInput, View } from 'react-native';
import api from '../services/api';
import { ImovelDto } from '../types/types';
import { router } from 'expo-router';
type Props = { idImovel: number; onSuccess: () => void | Promise<void>; };

function DeletarImovel({ idImovel, onSuccess }: Props) {
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
        api.get(`/api/v1/imovel/buscaByIdImovel/${idImovel}`)
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

    const enviar = async (): Promise<void> => { 
        try { 
            await api.delete(`/api/v1/imovel/deleteImovel/${idImovel}`); 
            Alert.alert("Sucesso", "Imóvel deletado com sucesso."); 
            await onSuccess(); 
        } catch (erro: any) { 
            console.error("ERRO API:", erro.response?.data); 
            Alert.alert("Erro", erro.response?.data ?? "Não foi possível deletar o imóvel."); 
        } 
    };

    return (
        <ScrollView style={{ padding: 20 }}>
            <Text style={{ fontSize: 20, marginBottom: 20 }}>Gostaria de deletar esse Imovel?</Text>
            <Text style={{ fontSize: 20, marginBottom: 20 }}>Nome Imovel: {nome}</Text>
            <Text style={{ fontSize: 20, marginBottom: 20 }}>CEP Imovel: {cep}</Text>

            <View style={{ justifyContent: "center" }}>
                <Button title="Deletar" onPress={enviar} />
            </View>
        </ScrollView>
    );
}

export { DeletarImovel }
