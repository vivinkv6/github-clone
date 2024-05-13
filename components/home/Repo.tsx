import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Image, ScrollView, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import RepoCard from "./RepoCard";
import { ProfileType } from "@/types/profile.type";
import { RepoType } from "@/types/repo.type";



function Repo() {

  const [repositories,setRepositories]=useState<RepoType[]|null>(null)
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchRepo = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://api.github.com/users/vivinkv6/subscriptions");
      if (!response?.ok) {
        return;
      }
      const data = await response.json();
      console.log(data);
      setRepositories(data);
      setLoading(false);
    } catch (err) {
      setError("SomeThing Went Wrong Please Try again Later");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepo();
  }, []);

  if (loading) {
    return <ActivityIndicator color="black" />;
  }
  if (error) {
    Alert.alert("Error", error);
  }

  return (
    <ScrollView showsVerticalScrollIndicator  style={{ marginTop: 20 }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          gap: 10,
          marginBottom: 20,
        }}
      >
        <FontAwesome name="star-o" size={24} color="gray" />
        <Text style={{ fontWeight: "600", fontSize: 16 }}>Popular</Text>
      </View>
      <View>
        <View
          style={{
            gap: 20,
            display: "flex",
            flexDirection: "row",
            overflow: "scroll",
          }}
        >
          <FlatList
          data={repositories}
          horizontal
          renderItem={({item})=><RepoCard repo={item}/>}
          ItemSeparatorComponent={()=>{
            return(
              <View style={{width:10}}/>
            )
          }}
          />
          
        </View>
      </View>
    </ScrollView>
  );
}

export default Repo;
