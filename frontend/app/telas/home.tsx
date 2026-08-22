import { router } from "expo-router";
import { Button, ScrollView, Text, View } from "react-native";
import Painel from "./painel";

export default function Home() {

  return (
    <ScrollView>
        <Painel></Painel> 
    </ScrollView>
  );
}

