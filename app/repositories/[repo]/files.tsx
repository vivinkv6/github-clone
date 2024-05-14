import { FileType } from '@/types/files.type';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Text, View } from 'react-native'

function files() {
    const { repo } = useLocalSearchParams();
  const [files, setFiles] = useState<FileType[]| null>(null);
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
      let folders=data?.filter((value:FileType)=>value?.type=='dir');
      let file=data?.filter((value:FileType)=>value?.type=='file')

      console.log(data.length);
      setFiles([...folders,...file]);
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
    <View>
      <Text>Files</Text>
    </View>
  )
}

export default files
