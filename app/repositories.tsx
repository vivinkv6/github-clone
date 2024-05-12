import RepoCard from "@/components/home/RepoCard";
import { RepoType } from "@/types/repo.type";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
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
    <>
      <FlatList
        showsVerticalScrollIndicator
        data={repositories}
        renderItem={({ item }) => <RepoCard repo={item} />}
        ItemSeparatorComponent={() => {
          return <View style={{ height: 20 }} />;
        }}
      />
    </>
  );
}

export default repositories;
