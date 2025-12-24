import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Touchable, TouchableOpacity, View } from "react-native";
import { DataTable, Text } from "react-native-paper";
import api from "../services/api";
import { ImovelDto } from "../types/types";
import { ModalCadImovel, ModalDelImovel, ModalEditImovel } from "../components/modals"
import Lista from "./ListaImoveis";
import Impostos from "./Impostos";

export default function Painel() {

    return (
        <ScrollView>
           <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Lista/>
           </ScrollView>
           <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Impostos/>
           </ScrollView>
        </ScrollView>
    );
}
