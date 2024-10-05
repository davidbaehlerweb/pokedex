import { Image,Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Card } from "@/components/Card";
import { FlatList } from "react-native";
import { PokemonCard } from "@/components/pokemon/PokemonCard";
import { useFetchQuery, useInfiniteFetchQuery } from "@/hooks/useFetchQuery";
import { getPokemonId } from "@/functions/pokemon";
import { useInfiniteQuery } from "@tanstack/react-query";
import { SearchBar } from "@/components/SearchBar";
import { useState } from "react";
import { Row } from "@/components/Row";
import { Sortbutton } from "@/components/Sortbutton";
import { RootView } from "@/components/RootView";

export default function Index() {
  const colors=useThemeColors();
  const {data, isFetching,fetchNextPage}=useInfiniteFetchQuery('/pokemon?limit=21')
  const [search,setSearch]=useState('')
  const[sortKey,setSortKey]=useState<"id"|"name">("id")
  const pokemons=data?.pages.flatMap(page=>page.results.map(r=>({name:r.name,id:getPokemonId(r.url)}))) ?? [];
  const filteredPokemons=[...(search ? pokemons.filter(p=>p.name.includes(search.toLowerCase())||p.id.toString()==search):pokemons).sort(
    (a,b)=>(a[sortKey]<b[sortKey]?-1:1)
  )]

  return (
    <RootView>
      <Row style={styles.header}>
        <Image source={require("@/app/assets/images/Pokeball.png")} width={24} height={24}/>
        <ThemedText variant="headline" color="grayLight">Pokédex</ThemedText>
      </Row>
      <Row gap={16} style={styles.form} >
        <SearchBar value={search} onChange={setSearch}/>
        <Sortbutton value={sortKey} onChange={setSortKey}/>
      </Row>
      <Card style={styles.body}>
        <FlatList 
            data={filteredPokemons} 
            numColumns={3}
            contentContainerStyle={[styles.gridGap, styles.list]}
            columnWrapperStyle={styles.gridGap}
            ListFooterComponent={
              isFetching ? <ActivityIndicator color={colors.tint}/>:null
            }
            onEndReached={search ? undefined : ()=>fetchNextPage()}
            renderItem={({item})=><PokemonCard id={item.id} name={item.name} style={{flex:1/3}}/>} 
            keyExtractor={(item)=>item.id.toString()}/>
      </Card>
      

      {/* Utilisation correcte de pathname et params */}
      
    </RootView>
  );
}

const styles = StyleSheet.create({
  
  header:{
    
    gap:16,
    paddingHorizontal:12,
    paddingBottom:8
  },
  body:{
    flex:1,
    marginTop:16
  },
  gridGap:{
    gap:8,
  },
  list:{
    padding:12,
  },
  form:{
    paddingHorizontal:12
  }
  
});
