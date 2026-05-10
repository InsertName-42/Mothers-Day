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
    group:   { bg: "#E8F0FE", text: "#185FA5", label: "Group" }
  };

  
  const s = styles[type] || styles.single;
  return (
    <View style={{ backgroundColor: s.bg, paddingHorizontal: 9, paddingVertical: 3, borderRadius: 4, alignSelf: "flex-start" }}>
      <Text style={{ color: s.text, fontSize: 11, fontWeight: "600" }}>{s.label}</Text>
    </View>
  );
}

const EVENT_TYPES = [
  { type: "single", desc: "Complete once — get your points." },
  { type: "time", desc: "Completed when enjoyed for the indicated amount of time." },
  { type: "head", desc: "Compete to outdo the other team." },
  { type: "judge", desc: "Scored and judged by our special guest judge." },
  { type: "group", desc: "Completed with all players present. Participation is required." }
];

const SCHEDULE = [
  { time: "10:00am", title: "Kickoff Challenge - Nye Beach" },
  { time: "12:30pm", title: "Lunch - Georgie's Beachside Grill" },
  { time: "1:30pm", title: "Ocean to Bay Trail - Challenge + Bonus Reveal" },
  { time: "6:30pm", title: "Dinner, Debrief, and a Final Word From Our Special Guest Judge" },
  { time: "7:30pm", title: "The Final Challenge, Sunset Pictionary - Nye Beach (10pts/ea)" },
];

function TimelineItem({ time, title, isLast }) {
  return (
    <View style={styles.timelineRow}>
      <View style={styles.timelineLeft}>
        <Text style={styles.timelineTimeText}>{time}</Text>
        <View style={styles.timelinePoint} />
        {!isLast && <View style={styles.timelineLine} />}
      </View>
      <View style={styles.timelineCard}>
        <Text style={styles.timelineTitle}>{title}</Text>
      </View>
    </View>
  );
}
export default function InstructionsScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "#f8f7f4" }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>Newport, Oregon</Text>
          <Text style={styles.title}>The Ultimate Battle{"\n"}of the Moms</Text>
          <View style={styles.divider} />
          <Text style={styles.subtitle}>Discover, build, taste, and learn as you uncover the hidden corners of Newport.</Text>
        </View>

        {/* APP GUIDE SECTION ─── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>How to use the App</Text>
          <View style={styles.cardStack}>
            <View style={styles.guideItem}>
              <Text style={styles.guideEmoji}>📍</Text>
              <View style={{flex: 1}}>
                <Text style={styles.guideTitle}>Explore the Map</Text>
                <Text style={styles.guideText}>Pinch or double click to zoom and drag to pan. Tap task icons to see details and point values.</Text>
              </View>
            </View>
            <View style={styles.guideItem}>
              <Text style={styles.guideEmoji}>📝</Text>
              <View style={{flex: 1}}>
                <Text style={styles.guideTitle}>Plan your Agenda</Text>
                <Text style={styles.guideText}>Long-press a task icon to "pick it up," then drag it into the sidebar to add it to your agenda. Click anywhere empty to open the agenda.</Text>
              </View>
            </View>
            <View style={styles.guideItem}>
              <Text style={styles.guideEmoji}>🔄</Text>
              <View style={{flex: 1}}>
                <Text style={styles.guideTitle}>Organize & Remove</Text>
                <Text style={styles.guideText}>In the sidebar, drag items up or down to reorder. Drag an item out left onto the map to remove it.</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ─── GAME RULES SECTION ─── */}
        <View style={[styles.section, { backgroundColor: '#fef3c7', marginHorizontal: 24, borderRadius: 15, marginTop: 10 }]}>
          <Text style={[styles.sectionLabel, { color: '#92400e' }]}>The Rules of War</Text>
          <View style={{ gap: 12 }}>
            <Text style={styles.ruleText}>1. <Text style={{fontWeight: '700'}}>Point System:</Text> Each task has a designated point value.</Text>
            <Text style={styles.ruleText}>2. <Text style={{fontWeight: '700'}}>Proof Required:</Text> Every completed task must be documented via photo or video.</Text>
            <Text style={styles.ruleText}>3. <Text style={{fontWeight: '700'}}>The Judge's Word:</Text> The Guest Judge's decision is final and non-negotiable.</Text>
            <Text style={styles.ruleText}>3. <Text style={{fontWeight: '700'}}>Dinner Council:</Text> Meet at 6:30 for dinner, debrief, and the Final Word from the Guest Judge.</Text>
          </View>
        </View>
                {/* SCHEDULE SECTION ─── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>The Schedule</Text>
          <View style={styles.timelineContainer}>
            {SCHEDULE.map((item, index) => (
              <TimelineItem
                key={index}
                time={item.time}
                title={item.title}
                isLast={index === SCHEDULE.length - 1}
              />
            ))}
          </View>
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
  hero: { backgroundColor: "#1a3a4a", padding: 24, paddingTop: 60, paddingBottom: 40 },
  eyebrow: { fontSize: 10, fontWeight: "700", letterSpacing: 2.5, color: "#7ecfbd", textTransform: "uppercase", marginBottom: 10 },
  title: { fontSize: 30, fontWeight: "800", color: "#ffffff", lineHeight: 36, marginBottom: 10 },
  divider: { width: 40, height: 2, backgroundColor: "#7ecfbd", marginBottom: 12 },
  subtitle: { fontSize: 13, color: "#94adb8", lineHeight: 20, maxWidth: 280 },
  section: { padding: 24 },
  sectionLabel: { fontSize: 10, fontWeight: "900", color: "#534AB7", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 },
  cardStack: { gap: 12 },
  guideItem: { flexDirection: 'row', gap: 15, alignItems: 'center' },
  guideEmoji: { fontSize: 24 },
  guideTitle: { fontSize: 14, fontWeight: '700', color: '#1e293b', marginBottom: 2 },
  guideText: { fontSize: 12, color: '#64748b', lineHeight: 18 },
  ruleText: { fontSize: 13, color: '#92400e', lineHeight: 20 },
  typeRow: { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: "#ffffff", borderRadius: 10, padding: 12, borderWidth: 1, borderColor: "#ede9e2" },
  typeDesc: { flex: 1, fontSize: 12, color: "#6b7280", lineHeight: 17 },
  // Timeline Styles
  timelineContainer: { paddingLeft: 8 },
  timelineRow: { flexDirection: 'row', minHeight: 60 },
  timelineLeft: { width: 70, alignItems: 'center', position: 'relative' },
  timelineTimeText: { fontSize: 10, fontWeight: '700', color: '#64748b', textAlign: 'right', width: 60, marginRight: 20, marginTop: 2 },
  timelinePoint: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#7ecfbd', position: 'absolute', right: -5, top: 4, zIndex: 2, borderWidth: 2, borderColor: '#f8f7f4' },
  timelineLine: { width: 2, position: 'absolute', right: -1, top: 4, bottom: -10, backgroundColor: '#e2e8f0', zIndex: 1 },
  timelineCard: { flex: 1, marginLeft: 25, backgroundColor: 'white', padding: 12, borderRadius: 10, marginBottom: 12, borderWidth: 1, borderColor: '#ede9e2', elevation: 1, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2, shadowOffset: { width: 0, height: 2 } },
  timelineTitle: { fontSize: 13, fontWeight: '600', color: '#1e293b' },

});