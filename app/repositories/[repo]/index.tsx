import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Project from "@/components/home/Project";
import { RepoType } from "@/types/repo.type";
function Repository() {
  const { repo } = useLocalSearchParams();
  const [repository, setRepository] = useState<RepoType| null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchRepository = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.github.com/repos/vivinkv6/${repo}`
      );
      if (!response?.ok) {
        return;
      }
      const data = await response.json();
      console.log(data.length);
      setRepository(data);
      setLoading(false);
    } catch (err) {
      setError("SomeThing Went Wrong Please Try again Later");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepository();
  }, []);

  if (loading) {
    return <ActivityIndicator color="black" />;
  }
  if (error) {
    Alert.alert("Error", error);
  }
  return (
    <>
    <View style={{backgroundColor:'#ededed',padding:10,display:'flex',flexDirection:'column',gap:10}}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Image
          source={{uri:repository?.owner?.avatar_url}}
          style={{ height: 20, width: 20, borderRadius: 50 }}
        />
        <Text style={{ color: "gray", fontSize: 13 }}>{repository?.owner?.login}</Text>
      </View>
      <Text style={{ fontSize: 20, fontWeight: "700" }}>{repository?.full_name}</Text>
      <Text style={{ color: "gray", fontSize: 15 }}>{repository?.description?.length>50 ? repository?.description.slice(0,50)+'...' :repository?.description}</Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Entypo name="link" size={24} color="black" />
        <Text
          style={{
            fontWeight: "500",
            fontSize: 15,
            textDecorationLine: "underline",
            textDecorationStyle: "dashed",
          }}
        >
          {repository?.homepage}
        </Text>
      </View>

      <View style={{ display: "flex", flexDirection: "row",alignItems:'center', gap: 30 }}>
        <View style={{ display: "flex", flexDirection: "row",alignItems:'center', gap: 10 }}>
          <Feather name="star" size={24} color="black" />
          <Text style={{ color: "gray" }}>{repository?.stargazers_count} Stars</Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row",alignItems:'center', gap: 10 }}>
          <Octicons name="repo-forked" size={24} color="black" />
          <Text style={{ color: "gray" }}>{repository?.forks_count} Forks</Text>
        </View>
      </View>

      <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
        <FontAwesome name="star" size={24} color="#fcd00d" />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: 300,
            gap: 10,
            backgroundColor:'#e3e3e3',
            borderRadius:7,
            padding:10
          }}
        >
          <Feather name="plus" size={24} color="black" />
          <Text style={{color:'black',fontWeight:'500'}}>ADD TO LIST</Text>
        </View>
        <Ionicons name="notifications-outline" size={24} color="black" />
      </View>
      </View>

      <View style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding:10
          }}
        >
          <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <FontAwesome5 name="dot-circle" size={24} color="black" />
            <Text>Issues</Text>
          </View>
          <Text>{repository?.open_issues_count}</Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <Octicons name="git-pull-request" size={24} color="black" />
            <Text>Pull Requests</Text>
          </View>
          <Text>0</Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <AntDesign name="playcircleo" size={24} color="black" />
            <Text>Actions</Text>
          </View>
          <Text>0</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <Ionicons name="people" size={24} color="black" />
            <Text>Contributors</Text>
          </View>
          <Text>1</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <Ionicons name="eye-outline" size={24} color="black" />
            <Text>Watchers</Text>
          </View>
          <Text>{repository?.watchers_count}</Text>
        </View>
      </View>
      <Project />
    </>
  );
}

export default Repository;
