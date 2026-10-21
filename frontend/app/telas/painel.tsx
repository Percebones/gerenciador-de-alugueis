import { ScrollView, View } from "react-native";
import { useState } from "react";

import Lista from "./ListaImoveis";
import Despesas from "./Despesas";
import Pagamentos from "./pagamentos";

interface PainelProps {
  onSair?: () => void;
}

export default function Painel({ onSair }: PainelProps) {
  const [atualizacao, setAtualizacao] = useState(0);

  const atualizarTodos = (): void => {
    setAtualizacao(valorAtual => valorAtual + 1);
  };

  return (
    <ScrollView>
      <View>
        <Lista
          atualizacao={atualizacao}
          atualizarTodos={atualizarTodos}
        />
      </View>

      <View>
        <Pagamentos
          atualizacao={atualizacao}
        />
      </View>

      <View>
        <Despesas
          atualizacao={atualizacao}
          atualizarTodos={atualizarTodos}
        />
      </View>
    </ScrollView>
  );
}