import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Link href="/about">À propos</Link>
      <Link href={{ pathname: '/pokemon/[id]', params: { id: 3 } }}>Pokemon 2</Link>

      {/* Utilisation correcte de pathname et params */}
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FF0000',
    
  },
});
