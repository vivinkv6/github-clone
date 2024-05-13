import { UserType } from "@/types/user.type";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

type UserProp = {
  user: UserType;
};
function Users({ user }: UserProp) {
  return (
    <View style={styles.userContainer} key={user?.id}>
      <Image
        source={{ uri: user?.avatar_url }}
        style={{
          height: 70,
          width: 70,
          borderRadius: 50,
          backgroundColor: "red",
        }}
      />
      <Text style={{ fontSize: 20, fontWeight: "600" }}>{user?.login}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  userContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 20,
    padding: 10,
    borderRadius: 10,
  },
});

export default Users;
