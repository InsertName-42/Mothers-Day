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
    <View
      style={{
        backgroundColor: s.bg,
        paddingHorizontal: 9,
        paddingVertical: 3,
        borderRadius: 4,
        alignSelf: "flex-start",
      }}
    >
      <Text style={{ color: s.text, fontSize: 11, fontWeight: "600", letterSpacing: 0.2 }}>
        {s.label}
      </Text>
    </View>
  );
}

const EVENT_TYPES = [
  { type: "single", icon: "◎", desc: "Complete once — no competition required." },
  { type: "time",   icon: "◷", desc: "Must be completed during open hours." },
  { type: "head",   icon: "⇄", desc: "Compete directly against another player." },
  { type: "judge",  icon: "★", desc: "Scored and judged on quality." },
  { type: "special",icon: "◈", desc: "Requires paid or ticketed entry." },
];

const HOW_TO_STEPS = [
  { step: "01", text: "Open the Map tab to explore Newport." },
  { step: "02", text: "Tap a glowing point of interest to see its task." },
  { step: "03", text: "Hold & drag a point onto the sidebar to add it to your agenda." },
  { step: "04", text: "Tap any open area of the map to view your agenda." },
  { step: "05", text: "Use the Punchbowl and Seal Rock tabs to visit featured locations." },
];

export default function InstructionsScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f7f4" }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >

        {/* ── Hero header ── */}
        <View
          style={{
            backgroundColor: "#1a3a4a",
            paddingHorizontal: 24,
            paddingTop: 36,
            paddingBottom: 32,
          }}
        >
          {/* Eyebrow */}
          <Text
            style={{
              fontSize: 10,
              fontWeight: "700",
              letterSpacing: 2.5,
              color: "#7ecfbd",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Newport, Oregon
          </Text>

          {/* Title */}
          <Text
            style={{
              fontSize: 30,
              fontWeight: "800",
              color: "#ffffff",
              lineHeight: 36,
              marginBottom: 10,
            }}
          >
            Scavenger{"\n"}Hunt
          </Text>

          {/* Divider */}
          <View
            style={{
              width: 40,
              height: 2,
              backgroundColor: "#7ecfbd",
              marginBottom: 12,
            }}
          />

          {/* Subtitle */}
          <Text
            style={{
              fontSize: 13,
              color: "#94adb8",
              lineHeight: 20,
              maxWidth: 280,
            }}
          >
            Explore the Oregon coast — find tide pools, art, wildlife, and hidden corners of Newport.
          </Text>
        </View>

        {/* ── How to play ── */}
        <View style={{ paddingHorizontal: 24, paddingTop: 28, paddingBottom: 8 }}>
          <Text
            style={{
              fontSize: 10,
              fontWeight: "700",
              letterSpacing: 2,
              color: "#534AB7",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            How to play
          </Text>

          <View style={{ gap: 14 }}>
            {HOW_TO_STEPS.map(({ step, text }) => (
              <View key={step} style={{ flexDirection: "row", alignItems: "flex-start", gap: 14 }}>
                {/* Step number */}
                <View
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    backgroundColor: "#1a3a4a",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: "800",
                      color: "#7ecfbd",
                      letterSpacing: 0.5,
                    }}
                  >
                    {step}
                  </Text>
                </View>

                {/* Description */}
                <View style={{ flex: 1, paddingTop: 7 }}>
                  <Text style={{ fontSize: 13, color: "#374151", lineHeight: 19 }}>
                    {text}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Divider */}
        <View
          style={{
            marginHorizontal: 24,
            marginVertical: 24,
            height: 1,
            backgroundColor: "#e5e2db",
          }}
        />

        {/* ── Event types ── */}
        <View style={{ paddingHorizontal: 24 }}>
          <Text
            style={{
              fontSize: 10,
              fontWeight: "700",
              letterSpacing: 2,
              color: "#534AB7",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Event types
          </Text>

          <View style={{ gap: 10 }}>
            {EVENT_TYPES.map(({ type, icon, desc }) => (
              <View
                key={type}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  backgroundColor: "#ffffff",
                  borderRadius: 10,
                  paddingVertical: 12,
                  paddingHorizontal: 14,
                  borderWidth: 1,
                  borderColor: "#ede9e2",
                }}
              >
                {/* Badge */}
                <TypeBadge type={type} />

                {/* Description */}
                <Text
                  style={{
                    flex: 1,
                    fontSize: 12,
                    color: "#6b7280",
                    lineHeight: 17,
                  }}
                >
                  {desc}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── Footer note ── */}
        <View
          style={{
            marginHorizontal: 24,
            marginTop: 28,
            padding: 14,
            backgroundColor: "#eeedfe",
            borderRadius: 10,
            borderLeftWidth: 3,
            borderLeftColor: "#534AB7",
          }}
        >
          <Text style={{ fontSize: 12, color: "#3C3489", lineHeight: 18 }}>
            <Text style={{ fontWeight: "700" }}>Tip: </Text>
            Add tasks to your agenda before heading out — you can check them off as you go from any screen.
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}