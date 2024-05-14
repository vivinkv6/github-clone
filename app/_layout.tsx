import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { useColorScheme } from "@/components/useColorScheme";
import { Image, View } from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="repositories/index"
          options={{
            title: "vivinkv6/repositories",
          }}
        />
        <Stack.Screen
          name="repositories/[repo]/index"
          options={{
            title: "",
            headerRight: () => {
              return (
                <View
                  style={{ display: "flex", flexDirection: "row", gap: 20 }}
                >
                  <AntDesign name="pluscircleo" size={24} color="#0e48cf" />
                  <Entypo
                    name="dots-three-vertical"
                    size={24}
                    color="#0e48cf"
                  />
                </View>
              );
            },
          }}
        />
          <Stack.Screen
          name="repositories/[repo]/files"
          options={{
            title: "Files",
          }}
        />
        <Stack.Screen
          name="organizations"
          options={{ title: "vivinkv6/Organizations" }}
        />
        <Stack.Screen name="starred" options={{ title: "vivinkv6/Starred" }} />
        <Stack.Screen
          name="followers"
          options={{ title: "vivinkv6/Followers" }}
        />
        <Stack.Screen
          name="following"
          options={{ title: "vivinkv6/Following" }}
        />
      </Stack>
    </ThemeProvider>
  );
}
