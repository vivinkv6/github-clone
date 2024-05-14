import React from "react";
import { View, Image, Text, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { RepoType } from "@/types/repo.type";
import { languageColor } from "@/utils/languageColor";
import { router } from "expo-router";
type RepoProp = {
  repo: RepoType | null;
};
function RepoCard({ repo }: RepoProp) {
  return (
    <Pressable onPress={()=>router.navigate(`/repositories/${repo?.name}`)}>
    <View
      style={{
        gap: 10,
        // backgroundColor: "#e3e3e3",
        padding: 10,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 10,
        width: 280,
        height: "auto",
      }}
    >
      <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
        <Image
          source={{ uri: repo?.owner.avatar_url }}
          style={{
            height: 20,
            width: 20,
            borderRadius: 50,
            backgroundColor: "red",
          }}
        />
        <Text style={{ color: "gray" }}>{repo?.owner.login}</Text>
      </View>
      <Text style={{ fontSize: 20, fontWeight: "600" }}>{repo?.name}</Text>
      <Text style={{ fontSize: 14, fontWeight: "400" }}>
        {repo?.description?.length > 30
          ? repo?.description?.slice(0, 30) + "..."
          : repo?.description}
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
            {repo?.stargazers_count}
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
            color={languageColor(repo?.language)}
          />
          <Text
            style={{
              fontWeight: "500",
              color: "gray",
              fontSize: 17,
              textAlignVertical: "center",
            }}
          >
            {repo?.language == null ? "README" : repo?.language}
          </Text>
        </View>
      </View>
    </View>
    </Pressable>
  );
}

export default RepoCard;
