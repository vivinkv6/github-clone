import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { ProfileType } from "@/types/profile.type";
import { router } from "expo-router";

type ProfileProp={
    profile:ProfileType|null
}
function MoreInfo({profile}:ProfileProp) {
  return (
    <View style={{ gap: 10 }}>
      <Text style={styles.bio}>{profile?.bio}</Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 20,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <Octicons name="organization" size={24} color="black" />
          <Text style={{ fontSize: 15, fontWeight: "500" }}>
            {profile?.company}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <Ionicons name="location-sharp" size={24} color="black" />
          <Text style={{ color: "gray", fontSize: 15, fontWeight: "400" }}>
            {profile?.location}
          </Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
        }}
      >
        <Entypo name="link" size={24} color="black" />
        <Text style={{ fontWeight: "600",textDecorationStyle:'solid',textDecorationLine:'underline' }}>{profile?.blog}</Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
        }}
      >
        <Entypo name="linkedin" size={20} color="black" />
        <Text style={{ fontWeight: "600",textDecorationStyle:'solid',textDecorationLine:'underline' }}>https://in.linkedin.com/in/vivin-k-v-8816ba291</Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
        }}
      >
        <Entypo name="instagram" size={24} color="black" />
        <Text style={{ fontWeight: "600",textDecorationLine:'underline',textDecorationStyle:'solid' }}>https://www.instagram.com/vivin_k.v_2002/</Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
        }}
      >
        <FontAwesome6 name="microchip" size={24} color="black" />
        <Text style={{ fontWeight: "500", color: "gray", fontSize: 16 }}>
          Developer Program Member
        </Text>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Pressable onPress={()=>router.navigate('/followers')}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <Ionicons name="person-outline" size={24} color="black" />
          <Text style={{ fontSize: 15, fontWeight: "700" }}>
            {profile?.followers}{" "}
            <Text style={{ fontWeight: "600", color: "gray" }}>followers</Text>
          </Text>
        </View>
        </Pressable>
        <Pressable onPress={()=>router.navigate('/following')}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
          }}
        >
          <Entypo name="dot-single" size={24} color="black" />
          <Text style={{ fontSize: 15, fontWeight: "700" }}>
            {profile?.following}{" "}
            <Text style={{ fontWeight: "600", color: "gray" }}>following</Text>
          </Text>
        </View>
        </Pressable>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          gap: 10,
          borderRadius: 6,
          padding: 7,
          borderWidth: 2,
          borderColor: "gray",
        }}
      >
        <Ionicons
          name="checkmark"
          size={30}
          style={{ fontWeight: "700" }}
          color="green"
        />
        <Text
          style={{
            fontSize: 20,
            textTransform: "uppercase",
            fontWeight: "500",
            color: "gray",
          }}
        >
          Following
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  bio: {
    fontSize: 16,
    fontWeight: "400",
  },
});

export default MoreInfo;
