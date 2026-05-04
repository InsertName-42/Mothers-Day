import { Tabs } from "expo-router";
import { Image, Text } from "react-native";

// Tab bar icon using a local image
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
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 0.5,
          borderTopColor: "#e5e7eb",
          height: 60,
          paddingBottom: 6,
          paddingTop: 6,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              source={require("../../assets/images/icon-instructions.png")} // placeholder
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
              source={require("../../assets/images/icon-map.png")} // placeholder
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
              source={require("../../assets/images/icon-punchbowl.png")} // placeholder
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
              source={require("../../assets/images/icon-sealrock.png")} // placeholder
              label="Seal Rock"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}