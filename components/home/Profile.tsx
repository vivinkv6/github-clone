import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import MoreInfo from "./MoreInfo";
import { ProfileType } from "@/types/profile.type";

type ProfileProp={
    profile:ProfileType|null
}

function Profile({profile}:ProfileProp) {
  return (
    <View style={styles.profileContainer}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
        }}
      >
        <Image
          source={{uri:profile?.avatar_url}}
          style={styles.profile}
        />
        <View>
          <Text style={styles.realname}>{profile?.name}</Text>
          <Text style={styles.username}>{profile?.login}</Text>
        </View>
      </View>
      <MoreInfo profile={profile}/>
    </View>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 20,
    color: "white",
  },
  profile: {
    borderRadius: 50,
    width: 80,
    height: 80,
    backgroundColor: "red",
  },
  realname: {
    fontWeight: "800",
    fontSize: 25,
  },
  username: {
    color: "gray",
    fontSize: 16,
    fontWeight: "400",
  },
});

export default Profile;
