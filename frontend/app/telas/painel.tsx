import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Touchable, TouchableOpacity, View } from "react-native";
import { DataTable, Text } from "react-native-paper";
import api from "../services/api";
import { ImovelDto } from "../types/types";
import { ModalCadImovel, ModalDelImovel, ModalEditImovel } from "../components/modals"
import Lista from "./ListaImoveis";
import Despesas from "./Despesas";
import Pagamentos from "./pagamentos";

export default function Painel() {

    return (
        <ScrollView>
            <View>
            <ScrollView>
                <Lista />
            </ScrollView>
            </View>
            <View>
            <ScrollView>
                <Pagamentos />
            </ScrollView>
            </View>
            <ScrollView >
                <Despesas />
            </ScrollView>
        </ScrollView>

    );
}
