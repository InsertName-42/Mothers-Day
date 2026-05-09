import "../global.css";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AgendaProvider } from "./agendaContext";

export default function RootLayout() {
  return (
    // GestureHandlerRootView must wrap the entire app for RNGH to work correctly
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AgendaProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
          </Stack>
        </AgendaProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}