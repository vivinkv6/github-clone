import React from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";

type RepoNameProp = {
  name: string | undefined;
};
function Project({ name }: RepoNameProp) {
  return (
    <View
      style={{ padding: 20, display: "flex", flexDirection: "column", gap: 10 }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
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
          <Ionicons name="git-branch-outline" size={24} color="gray" />
          <Text style={{ color: "gray" }}>master</Text>
        </View>
        <Text style={{ fontWeight: "500", color: "#104cad" }}>
          CHANGE BRANCH
        </Text>
      </View>
      <Pressable onPress={() => router.navigate(`/repositories/${name}/files`)}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 10,
          }}
        >
          <FontAwesome
            name="file-code-o"
            size={30}
            color="black"
            style={{ backgroundColor: "#d7d7d9", padding: 7, borderRadius: 7 }}
          />
          <Text style={{ fontWeight: "400", fontSize: 18 }}>Code</Text>
        </View>
      </Pressable>
      <Pressable
        onPress={() => router.navigate(`/repositories/${name}/commits`)}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Ionicons
            name="git-commit-outline"
            size={30}
            color="black"
            style={{ backgroundColor: "#d7d7d9", padding: 7, borderRadius: 7 }}
          />
          <Text style={{ fontWeight: "400", fontSize: 18 }}>Commits</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default Project;
