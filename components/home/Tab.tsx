import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { ProfileType } from "@/types/profile.type";
function Tab() {
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://api.github.com/users/vivinkv6");
      if (!response?.ok) {
        return;
      }
      const data = await response.json();
      console.log(data);
      setProfile(data);
      setLoading(false);
    } catch (err) {
      setError("SomeThing Went Wrong Please Try again Later");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <View style={styles.tabContainer}>
      <View style={styles.tab}>
        <Feather name="home" size={24} color="gray" />
        <Text style={{ color: "gray", fontSize: 12 }}>Home</Text>
      </View>
      <View style={styles.tab}>
        <Ionicons name="notifications-outline" size={24} color="gray" />
        <Text style={{ color: "gray", fontSize: 12 }}>Notification</Text>
      </View>
      <View style={styles.tab}>
        <Octicons name="telescope" size={24} color="gray" />
        <Text style={{ color: "gray", fontSize: 12 }}>Explore</Text>
      </View>
      <View style={styles.tab}>
        <Image
          source={{ uri: profile?.avatar_url }}
          style={{ height: 30, width: 30, borderRadius: 50 }}
        />
        <Text style={{ color: "gray", fontSize: 12 }}>Profile</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    marginTop: 20,
    height: 200,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  tab: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
});

export default Tab;
