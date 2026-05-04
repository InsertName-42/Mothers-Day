import "../global.css";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AgendaProvider } from "./agendaContext";
 
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      {/* AgendaProvider wraps everything so all tabs share the same agenda state */}
      <AgendaProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </AgendaProvider>
    </SafeAreaProvider>
  );
}