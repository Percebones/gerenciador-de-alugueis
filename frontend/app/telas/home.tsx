import {
  ScrollView,
  StyleSheet,
} from "react-native";

import Painel from "./painel";

interface HomeProps {
  onSair?: () => void;
}

export default function Home({ onSair }: HomeProps) {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Painel onSair={onSair} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: "#F8FAFC",
  },
});