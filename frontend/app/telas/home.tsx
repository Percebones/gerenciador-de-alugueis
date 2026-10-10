import {
  ScrollView,
  StyleSheet,
} from "react-native";

import Painel from "./painel";

export default function Home() {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Painel />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});