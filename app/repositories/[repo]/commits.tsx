import { CommitType } from "@/types/commits.type";
import { FileType } from "@/types/files.type";
import { AntDesign, Octicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Text,
  View,
} from "react-native";
import { formatDistance, subDays } from "date-fns";

function commits() {
  const { repo } = useLocalSearchParams();
  const [commits, setCommits] = useState<CommitType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchCommits = async () => {
    try {
      console.log(repo);

      setLoading(true);
      const response = await fetch(
        `https://api.github.com/repos/vivinkv6/${repo}/commits`
      );
      if (!response?.ok) {
        return;
      }

      const data = await response.json();

      console.log(data);
      console.log(data.length);
      setCommits(data);

      setLoading(false);
    } catch (err) {
      setError("SomeThing Went Wrong Please Try again Later");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommits();
  }, []);

  if (loading) {
    return <ActivityIndicator color="black" />;
  }
  if (error) {
    Alert.alert("Error", error);
  }
  return (
    <>
      <FlatList
        data={commits}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10,
              }}
            >
              <View
                style={{ display: "flex", flexDirection: "column", gap: 5 }}
              >
                <Text style={{ fontSize: 18, fontWeight: "600" }}>
                  {item?.commit?.message.length > 30
                    ? item?.commit?.message.slice(0, 30) + "..."
                    : item?.commit?.message}
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Image
                    source={{ uri: item?.author?.avatar_url }}
                    style={{
                      height: 20,
                      width: 20,
                      borderRadius: 50,
                      backgroundColor: "red",
                    }}
                  />
                  <Text style={{ fontWeight: "500", fontSize: 13 }}>
                    {item?.author?.login}
                  </Text>
                  <Text style={{ color: "#a2a5a6", fontSize: 13 }}>
                    authored
                  </Text>
                </View>
              </View>
              <Text style={{ color: "#a2a5a6" }}>
                {formatDistance(
                  subDays(new Date(), 3),
                  item?.commit?.author?.date,
                  { addSuffix: true }
                )}
              </Text>
            </View>
          );
        }}
        ItemSeparatorComponent={() => {
          return <View style={{ height: 20 }} />;
        }}
      />
    </>
  );
}

export default commits;
