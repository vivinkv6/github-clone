import RepoCard from "@/components/home/RepoCard";
import { RepoType } from "@/types/repo.type";
import { languageColor } from "@/utils/languageColor";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from "react-native";

function repositories() {
  const [organizations, setOrganizations] = useState<OrgType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchOrgs = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://api.github.com/users/vivinkv6/orgs"
      );
      if (!response?.ok) {
        return;
      }
      const data = await response.json();
      console.log(data.length);
      setOrganizations(data);
      setLoading(false);
    } catch (err) {
      setError("SomeThing Went Wrong Please Try again Later");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrgs();
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
        data={organizations}
        renderItem={({ item }) => {
          return (
            <>
              <View
                key={item.id}
                style={{
                  gap: 10,
                  // backgroundColor: "#e3e3e3",
                  padding: 10,
                  borderRadius: 10,
                  width: "100%",
                  height: "auto",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: "black",
                }}
              >
                <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
                  <Image
                    source={{ uri: item?.avatar_url }}
                    style={{
                      height: 50,
                      width: 50,
                      borderRadius: 10,
                      backgroundColor: "red",
                    }}
                  />
                  {/* <Text style={{ color: "gray" }}>{item?.}</Text> */}
                </View>
                <Text style={{ fontSize: 20, fontWeight: "600" }}>
                  {item?.login}
                </Text>
                <Text
                  style={{ fontSize: 14, fontWeight: "400", color: "gray" }}
                >
                  {item?.description}
                </Text>
              </View>
            </>
          );
        }}
        ItemSeparatorComponent={() => {
          return <View style={{ height: 10 }} />;
        }}
      />
    </SafeAreaView>
  );
}

export default repositories;
