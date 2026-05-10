import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function TabIcon({ source, label, focused }) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Image
        source={source}
        style={{ width: 22, height: 22, opacity: focused ? 1 : 0.5 }}
      />
      <Text style={{ 
        fontSize: 10, 
        color: focused ? "#534AB7" : "#888", 
        marginTop: 4,
        fontWeight: focused ? '600' : '400' 
      }}>
        {label}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 0.5,
          borderTopColor: "#e5e7eb",
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slight transparency to match sidebar
        },
      }}
    >
      {/* 1. Info / Instructions */}
      <Tabs.Screen 
        name="index" 
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon source={require("../../assets/images/iconInstructions.png")} label="Info" focused={focused} />
          )
        }} 
      />

      {/* 2. Main Map */}
      <Tabs.Screen 
        name="map" 
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon source={require("../../assets/images/iconMap.png")} label="Map" focused={focused} />
          )
        }} 
      />

      {/* 3. Devil's Punchbowl */}
      <Tabs.Screen 
        name="punchbowl" 
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon source={require("../../assets/images/iconPunchbowl.png")} label="Punchbowl" focused={focused} />
          )
        }} 
      />

      {/* 4. Seal Rock */}
      <Tabs.Screen 
        name="sealrock" 
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon source={require("../../assets/images/iconSealrock.png")} label="Seal Rock" focused={focused} />
          )
        }} 
      />
      <Tabs.Screen
        name="instructions"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}