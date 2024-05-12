import React from "react";
import { View, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
function NavBar() {
  return (
    <View style={styles.container}>
     
        <Entypo name="share" size={24} color="black" />
        <Feather name="settings" size={24} color="black" />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
    gap:20,
  },

});

export default NavBar;
