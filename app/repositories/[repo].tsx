import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';

function Repository() {
  const { repo } = useLocalSearchParams();
  return (
    <>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Image
          source={{}}
          style={{ height: 20, width: 20, borderRadius: 50 }}
        />
        <Text style={{ color: "gray", fontSize: 13 }}>Username</Text>
      </View>
      <Text style={{ fontSize: 20, fontWeight: "700" }}>Project</Text>
      <Text style={{ color: "gray", fontSize: 15 }}>Description</Text>
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
          Link
        </Text>
      </View>

      <View style={{ display: "flex", flexDirection: "row", gap: 30 }}>
        <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
          <Feather name="star" size={24} color="black" />
          <Text style={{ color: "gray" }}>6 Stars</Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
          <Octicons name="repo-forked" size={24} color="black" />
          <Text style={{ color: "gray" }}>0 Forks</Text>
        </View>
      </View>

      <View>
        <FontAwesome name="star" size={24} color="yellow" />
        <View style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',width:200,gap:10}}> 
        <Feather name="plus" size={24} color="black" />
        <Text>ADD TO LIST</Text>
        </View>
        <Ionicons name="notifications-outline" size={24} color="black" />
      </View>
    </>
  );
}

export default Repository;
