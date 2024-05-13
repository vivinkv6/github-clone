import Users from '@/components/home/Users';
import { UserType } from '@/types/user.type';
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, FlatList, SafeAreaView, View } from 'react-native'

function following() {
    const [following, setFollowing] = useState<UserType[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
  
    const fetchFollowing = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://api.github.com/users/vivinkv6/following"
        );
        if (!response?.ok) {
          return;
        }
        const data = await response.json();
        console.log(data.length);
        setFollowing(data);
        setLoading(false);
      } catch (err) {
        setError("SomeThing Went Wrong Please Try again Later");
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchFollowing();
    }, []);
  
    if (loading) {
      return <ActivityIndicator color="black" />;
    }
    if (error) {
      Alert.alert("Error", error);
    }
  
    return (
      <SafeAreaView style={{flex:1,padding:20}} >
        <FlatList
          showsVerticalScrollIndicator
          data={following}
          renderItem={({ item }) => {
            return(
              <>
             <Users user={item}/>
              </>
            )
          }}
          ItemSeparatorComponent={() => {
            return <View style={{ height: 20 }} />;
          }}
        />
      </SafeAreaView>
    );
  }


export default following
