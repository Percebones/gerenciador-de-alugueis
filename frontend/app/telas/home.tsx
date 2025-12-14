import { router } from "expo-router";
import { Button, ScrollView, Text, View } from "react-native";

export default function Home() {

  return (
    <ScrollView>
      <View style={{ padding: 5, width: 200 }}>
        <Text style={{ fontSize: 20, marginBottom: 10 }}>TESTES</Text>
        <Button
          title="Clique Para ListaImoveis"
          onPress={() => router.push("/telas/ListaImoveis")}
        />
      </View>
      <View style={{ padding: 5, width: 200 }}>
        <Button
          title="Clique Para Calculos impostos"
          onPress={() => router.push("/telas/Impostos")}
        />
      </View>
      <View style={{ padding: 5, width: 200 }}>
        <Button
          title="Login"
          onPress={() => router.push("/telas/login")}
        />
      </View>
    </ScrollView>
  );
}

