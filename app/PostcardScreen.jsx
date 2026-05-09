import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Sidebar from "./Sidebar";

// Reusable postcard screen — used for Devil's Punchbowl and Seal Rock
// props:
//   image        — require("../../assets/your-image.png")
//   task         — { id, title, type, desc }
//   notecardText — short blurb pinned on the postcard
export default function PostcardScreen({ image, task, notecardText }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#475569" }}>
      <View style={{ flex: 1, flexDirection: "row" }}>

        {/* Postcard area — fills available space */}
        <View style={{ flex: 1, padding: 16, justifyContent: "center" }}>
          <View
            style={{
              flex: 1,
              borderRadius: 10,
              overflow: "hidden",
              elevation: 6,
              shadowColor: "#000",
              shadowOpacity: 0.3,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 3 },
            }}
          >
            {/* Postcard image — fills entire card */}
            <Image
              source={image}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />

            {/* Center POI dot */}
            <View
              pointerEvents="none"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: [{ translateX: -9 }, { translateY: -9 }],
              }}
            >
              <View
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 9,
                  borderWidth: 2,
                  borderColor: "#E24B4A",
                  position: "absolute",
                  opacity: 0.5,
                }}
              />
              <View
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: "#E24B4A",
                  borderWidth: 2,
                  borderColor: "white",
                  margin: 3,
                }}
              />
            </View>

            {/* Notecard pinned to bottom-right */}
            <View
              style={{
                position: "absolute",
                bottom: 12,
                right: 12,
                backgroundColor: "#fffdf0",
                borderRadius: 4,
                padding: 8,
                maxWidth: 160,
                transform: [{ rotate: "1.5deg" }],
                shadowColor: "#000",
                shadowOpacity: 0.15,
                shadowRadius: 4,
              }}
            >
              {/* Pin dot */}
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#E24B4A",
                  position: "absolute",
                  top: -4,
                  right: 12,
                }}
              />
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 11,
                  marginBottom: 3,
                  color: "#1f2937",
                }}
              >
                {task.title}
              </Text>
              <Text
                style={{ fontSize: 10, color: "#6b7280", lineHeight: 14 }}
              >
                {notecardText}
              </Text>
            </View>
          </View>
        </View>

        {/* Sidebar always shows agenda on postcard tabs */}
        <Sidebar mode="agenda" />
      </View>
    </SafeAreaView>
  );
}