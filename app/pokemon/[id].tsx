import { Card } from "@/components/Card";
import { RootView } from "@/components/RootView";
import { Row } from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { getPokemonArtWork } from "@/functions/pokemon";
import { useFetchQuery } from "@/hooks/useFetchQuery";
import { useThemeColors } from "@/hooks/useThemeColors";
import { router, useLocalSearchParams } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function Pokemon() {
  const colors=useThemeColors()
  const params = useLocalSearchParams() as {id:string}; // récupère l'ID de l'URL
  const {data:pokemon}=useFetchQuery("/pokemon/[id]",{id:params.id})
  const mainType=pokemon?.types?.[0].type.name
  const colorType=mainType?Colors.type[mainType]:colors.tint
  const pokemonId = parseInt(params.id, 10);
  return (
    <RootView style={{backgroundColor:colorType}}>
     <View>
     <Image style={styles.pokeball} source={require('@/app/assets/images/pokebal_big.png')} width={208} height={208}/>
      <Row style={styles.header}>
        <Pressable onPress={router.back}>
        <Row gap={8}>
        <Image 
        source={require("@/app/assets/images/back.png")}
        width={32}
        height={32}/>

        <ThemedText color="grayWhite" variant="headline">{pokemon?.name}</ThemedText>
        </Row>
        </Pressable>
        <ThemedText color="grayWhite" variant="subtitle2">#{params.id.padStart(3,'0')}</ThemedText>
      </Row>
      <View style={styles.body}>
      <Image 
      style={styles.artwork}
      source={{
        uri:getPokemonArtWork(params.id),
      }}
      width={200}
      height={200}
      />
      <Card style={styles.card}>
      
        <ThemedText>Bonjour les gens</ThemedText>
      </Card>
      </View>
      <Text>Pokemon {params.id}</Text>
     </View>
    </RootView>
  );
}

const styles=StyleSheet.create({
  header:{
    margin:20,
    justifyContent:'space-between'
  },
  pokeball:{
    opacity:.1,
    position:'absolute',
    right:8,
    top:8
  },
  artwork:{
    alignSelf:'center',
    position:'absolute',
    top:-140,
    zIndex:2
  },
  body:{
    marginTop:144,
  },
  card:{
    paddingHorizontal:20,
    paddingTop:60
  }

})
