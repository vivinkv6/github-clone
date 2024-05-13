import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { ProfileType } from "@/types/profile.type";
import { router } from "expo-router";

type ProfileProp={
    profile:ProfileType|null
}


function Organizations({profile}:ProfileProp) {

  const [organization,setOrganization]=useState<number|null>(null);
  const [star,setStar]=useState<number|null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchOrganizationCount = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://api.github.com/users/vivinkv6/orgs");
      if (!response?.ok) {
        return;
      }
      const data = await response.json();
      console.log(data);
      setOrganization(data?.length)
      setLoading(false);
    } catch (err) {
      setError("SomeThing Went Wrong Please Try again Later");
    } finally {
      setLoading(false);
    }
  };
  const fetchStarsCount = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://api.github.com/users/vivinkv6/starred");
      if (!response?.ok) {
        return;
      }
      const data = await response.json();
      console.log(data);
      setStar(data?.length)
      setLoading(false);
    } catch (err) {
      setError("SomeThing Went Wrong Please Try again Later");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchOrganizationCount();
    fetchStarsCount();
  }, [organization,star]);

  if (loading) {
    return <ActivityIndicator color="black" />;
  }
  if (error) {
    Alert.alert("Error", error);
  }


  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: 20,
        gap: 30,
        marginBottom: 50,
      }}
    >
         <Pressable onPress={()=>router.navigate('repositories')}>
      <View
        style={styles.container}
      >
        <View
          style={styles.subContainer}
        >
          <Octicons
            name="repo"
            size={30}
            color="white"
            style={{
              width: 40,
              height: 40,
              borderRadius: 5,
              padding: 5,
              backgroundColor: "#4d4d4d",
            }}
          />
         
          <Text style={{fontWeight:'400',fontSize:15}}>Repositories</Text>
          
        </View>
        <Text>{profile?.public_repos}</Text>
      </View>
      </Pressable>
      <Pressable onPress={()=>router.navigate('/organizations')}>
      <View
        style={styles.container}
      >
        <View
          style={styles.subContainer}
        >
          <Octicons
            name="organization"
            size={28}
            color="white"
            style={{
              width: 40,
              height: 40,
              borderRadius: 5,
              padding: 5,
              backgroundColor: "#ed8115",
            }}
          />
          <Text>Organization</Text>
        </View>
        <Text>{organization}</Text>
      </View>
      </Pressable>
      <Pressable onPress={()=>router.navigate('/starred')}>
      <View
        style={styles.container}
      >
        <View
          style={styles.subContainer}
        >
          <FontAwesome
            name="star-o"
            size={30}
            color="white"
            style={{
              width: 40,
              height: 40,
              borderRadius: 5,
              padding: 5,
              backgroundColor: "#ffcb2e",
            }}
          />
          <Text>Starred</Text>
        </View>
        <Text>{star}</Text>
      </View>
      </Pressable>
    </View>
  );
}

const styles=StyleSheet.create({
    container:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
    },
    subContainer:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 10,
    }
})

export default Organizations;
