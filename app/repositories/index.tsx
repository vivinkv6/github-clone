import RepoCard from "@/components/home/RepoCard";
import { RepoType } from "@/types/repo.type";
import { languageColor } from "@/utils/languageColor";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from "react-native";

function repositories() {
  const [repositories, setRepositories] = useState<RepoType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchRepo = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://api.github.com/users/vivinkv6/repos"
      );
      if (!response?.ok) {
        return;
      }
      const data = await response.json();
      console.log(data.length);
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
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <FlatList
        showsVerticalScrollIndicator
        data={repositories}
        renderItem={({ item }) => {
          return (
            <Pressable onPress={()=>router.navigate(`/repositories/${item?.name}`)}>
              <View
                style={{
                  gap: 10,
                  // backgroundColor: "#e3e3e3",
                  padding: 10,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "black",
                  width: "100%",
                  height: "auto",
                }}
              >
                <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
                  <Image
                    source={{ uri: item?.owner.avatar_url }}
                    style={{
                      height: 20,
                      width: 20,
                      borderRadius: 50,
                      backgroundColor: "red",
                    }}
                  />
                  <Text style={{ color: "gray" }}>{item?.owner.login}</Text>
                </View>
                <Text style={{ fontSize: 20, fontWeight: "600" }}>
                  {item?.name}
                </Text>
                <Text
                  style={{ fontSize: 14, fontWeight: "400", color: "gray" }}
                >
                  {item?.description}
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    gap: 10,
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <FontAwesome name="star" size={24} color="#f5db16" />
                    <Text
                      style={{
                        fontWeight: "500",
                        color: "gray",
                        fontSize: 17,
                        textAlignVertical: "center",
                      }}
                    >
                      {item?.stargazers_count}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Entypo
                      name="dot-single"
                      size={40}
                      color={languageColor(item?.language)}
                    />
                    <Text
                      style={{
                        fontWeight: "500",
                        color: "gray",
                        fontSize: 17,
                        textAlignVertical: "center",
                      }}
                    >
                      {item?.language == null ? "README" : item?.language}
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
          );
        }}
        ItemSeparatorComponent={() => {
          return <View style={{ height: 20 }} />;
        }}
      />
    </SafeAreaView>
  );
}

export default repositories;
