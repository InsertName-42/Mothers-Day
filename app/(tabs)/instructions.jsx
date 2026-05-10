import React from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
    <View style={{ backgroundColor: s.bg, paddingHorizontal: 9, paddingVertical: 3, borderRadius: 4, alignSelf: "flex-start" }}>
      <Text style={{ color: s.text, fontSize: 11, fontWeight: "600" }}>{s.label}</Text>
    </View>
  );
}

const EVENT_TYPES = [
  { type: "single", desc: "Complete once — no competition required." },
  { type: "time", desc: "Must be completed during open hours." },
  { type: "head", desc: "Compete directly against another player." },
  { type: "judge", desc: "Scored and judged on quality." },
  { type: "special", desc: "Requires paid or ticketed entry." },
];

export default function InstructionsScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "#f8f7f4" }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>Newport, Oregon</Text>
          <Text style={styles.title}>Scavenger{"\n"}Hunt</Text>
          <View style={styles.divider} />
          <Text style={styles.subtitle}>Explore the Oregon coast — find tide pools, art, wildlife, and hidden corners of Newport.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Event Types</Text>
          <View style={{ gap: 10 }}>
            {EVENT_TYPES.map(({ type, desc }) => (
              <View key={type} style={styles.typeRow}>
                <TypeBadge type={type} />
                <Text style={styles.typeDesc}>{desc}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { backgroundColor: "#1a3a4a", padding: 24, paddingTop: 40 },
  eyebrow: { fontSize: 10, fontWeight: "700", letterSpacing: 2.5, color: "#7ecfbd", textTransform: "uppercase", marginBottom: 10 },
  title: { fontSize: 30, fontWeight: "800", color: "#ffffff", lineHeight: 36, marginBottom: 10 },
  divider: { width: 40, height: 2, backgroundColor: "#7ecfbd", marginBottom: 12 },
  subtitle: { fontSize: 13, color: "#94adb8", lineHeight: 20, maxWidth: 280 },
  section: { padding: 24 },
  sectionLabel: { fontSize: 10, fontWeight: "700", letterSpacing: 2, color: "#534AB7", textTransform: "uppercase", marginBottom: 16 },
  typeRow: { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: "#ffffff", borderRadius: 10, padding: 12, borderWidth: 1, borderColor: "#ede9e2" },
  typeDesc: { flex: 1, fontSize: 12, color: "#6b7280", lineHeight: 17 }
});