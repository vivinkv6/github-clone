import React from "react";
import { View, Image, Text } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { RepoType } from "@/types/repo.type";
type RepoProp={
    repo:RepoType|null
}
function RepoCard({repo}:RepoProp) {
  return (
    <View
      style={{
        gap: 10,
        backgroundColor: "#e3e3e3",
        padding: 10,
        borderRadius: 10,
        width: 280,
        height:'auto'
      }}
    >
      <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
        <Image
          source={{uri:repo?.owner.avatar_url}}
          style={{
            height: 20,
            width: 20,
            borderRadius: 50,
            backgroundColor: "red",
          }}
        />
        <Text style={{ color: "gray" }}>{repo?.owner.login}</Text>
      </View>
      <Text>{repo?.name}</Text>
      <Text>{repo?.description}</Text>
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
            {Math.floor(Math.random()*8)}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Entypo name="dot-single" size={40} color={"#f5db16"} />
          <Text
            style={{
              fontWeight: "500",
              color: "gray",
              fontSize: 17,
              textAlignVertical: "center",
            }}
          >
            {repo?.language}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default RepoCard;
