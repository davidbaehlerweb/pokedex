import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function Pokemon() {
  const params = useLocalSearchParams(); // récupère l'ID de l'URL
  return (
    <View>
      <Text>Pokemon {params.id}</Text>
    </View>
  );
}
