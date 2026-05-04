import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
 
// Badge component reused across the app
export function TypeBadge({ type }) {
  const styles = {
    single:  { bg: "#E1F5EE", text: "#0F6E56", label: "Single Instance" },
    time:    { bg: "#EEEDFE", text: "#3C3489", label: "Time Based" },
    head:    { bg: "#FAEEDA", text: "#633806", label: "Head to Head" },
    judge:   { bg: "#FAECE7", text: "#712B13", label: "Judged" },
    special: { bg: "#E6F1FB", text: "#0C447C", label: "Special" },
  };
  const s = styles[type] || styles.single;
  return (
    <View style={{ backgroundColor: s.bg, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, alignSelf: "flex-start" }}>
      <Text style={{ color: s.text, fontSize: 11 }}>{s.label}</Text>
    </View>
  );
}
 
export default function InstructionsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6 py-6">
 
        <Text className="text-2xl font-bold text-gray-800 mb-2">Newport Scavenger Hunt</Text>
        <Text className="text-gray-500 mb-6">Explore Newport, Oregon and complete challenges across the coast.</Text>
 
        {/* How to play */}
        <Text className="text-base font-bold text-gray-800 mb-3">How to play</Text>
        <View className="gap-2 mb-6">
          {[
            "Open the Map tab to explore Newport.",
            "Tap a glowing point of interest to see the task.",
            "Hold & drag a point onto the sidebar to add it to your agenda.",
            "Tap any open area of the map to view your agenda.",
            "Use the Postcard tabs to visit featured locations.",
          ].map((step, i) => (
            <View key={i} className="flex-row gap-3">
              <Text className="text-violet-600 font-bold">{i + 1}.</Text>
              <Text className="text-gray-600 flex-1">{step}</Text>
            </View>
          ))}
        </View>
 
        {/* Event types */}
        <Text className="text-base font-bold text-gray-800 mb-3">Event types</Text>
        <View className="gap-3 mb-8">
          {[
            { type: "single", desc: "Complete once — no competition." },
            { type: "time",   desc: "Must be done during open hours." },
            { type: "head",   desc: "Compete directly against others." },
            { type: "judge",  desc: "Scored by a judge." },
            { type: "special",desc: "Ticketed or paid entry." },
          ].map((item) => (
            <View key={item.type} className="flex-row items-center gap-3">
              <TypeBadge type={item.type} />
              <Text className="text-gray-600 text-sm flex-1">{item.desc}</Text>
            </View>
          ))}
        </View>
 
      </ScrollView>
    </SafeAreaView>
  );
}