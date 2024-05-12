import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { Text, View } from "@/components/Themed";
import NavBar from "@/components/home/NavBar";
import Profile from "@/components/home/Profile";
import Repo from "@/components/home/Repo";
import Organizations from "@/components/home/Organizations";
import { useEffect, useState } from "react";
import { ProfileType } from "@/types/profile.type";

export default function TabOneScreen() {
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

  if (loading) {
    return <ActivityIndicator color="black" />;
  }
  if (error) {
    Alert.alert("Error", error);
  }

  return (
    <ScrollView showsVerticalScrollIndicator style={styles.container}>
      <NavBar />
      <Profile profile={profile}/>
      <Repo />
      <Organizations profile={profile} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
