import { FileType } from "@/types/files.type";
import { AntDesign, Octicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Text, View } from "react-native";

function files() {
  const { repo } = useLocalSearchParams();
  const [files, setFiles] = useState<FileType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.github.com/repos/vivinkv6/${repo}/contents/`
      );
      if (!response?.ok) {
        return;
      }
      const data = await response.json();
      let folders = data?.filter((value: FileType) => value?.type == "dir");
      let file = data?.filter((value: FileType) => value?.type == "file");

      console.log(data.length);
      setFiles([...folders, ...file]);
      console.log(files);
      
      setLoading(false);
    } catch (err) {
      setError("SomeThing Went Wrong Please Try again Later");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  if (loading) {
    return <ActivityIndicator color="black" />;
  }
  if (error) {
    Alert.alert("Error", error);
  }
  return (
    <View style={{padding:20}}>
      <FlatList
        data={files}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
               gap: 10,
               
              }}
            >
              {item?.type == "dir" ? (
                <Octicons name="file-directory" size={24} color="#24a0e3" />
              ) : (
                <AntDesign name="file1" size={24} color="#aaacad" />
              )}
              <Text
                style={{ fontSize: 18, fontWeight: "400", color: "#1a1a1a" }}
              >
                {item?.name}
              </Text>
            </View>
          );
        }}
        ItemSeparatorComponent={()=>{
          return(
            <View style={{height:20}}/>
          )
        }}
      />
    </View>
  );
}

export default files;
