import { Tabs } from "expo-router";
import { Image, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function TabIcon({ source, label, focused }) {
  return (
    <>
      <Image
        source={source}
        style={{ width: 22, height: 22, opacity: focused ? 1 : 0.5 }}
      />
      <Text style={{ fontSize: 10, color: focused ? "#534AB7" : "#888", marginTop: 2 }}>
        {label}
      </Text>
    </>
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
          // Height = icon area + bottom safe area (home indicator / nav buttons)
          height: 56 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 6,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              source={require("../../assets/images/icon-instructions.png")}
              label="Info"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              source={require("../../assets/images/icon-map.png")}
              label="Map"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="punchbowl"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              source={require("../../assets/images/icon-punchbowl.png")}
              label="Punchbowl"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="sealrock"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              source={require("../../assets/images/icon-sealrock.png")}
              label="Seal Rock"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}