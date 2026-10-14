import { ScrollView, View } from "react-native";

import Lista from "./ListaImoveis";
import Despesas from "./Despesas";
import Pagamentos from "./pagamentos";

interface PainelProps {
  onSair?: () => void;
}

export default function Painel({ onSair }: PainelProps) {
  return (
    <ScrollView>
      <View>
        <Lista />
      </View>
      <View>
        <Pagamentos />
      </View>
      <ScrollView>
        <Despesas />
      </ScrollView>
    </ScrollView>
  );
}
