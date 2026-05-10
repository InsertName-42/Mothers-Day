import React from "react";
import { ScrollView, Text, View, Pressable, StyleSheet } from "react-native";
import { useAgenda } from "./agendaContext";

export default function Sidebar({ mode, selectedTask, onItemSelect, onDragStart }) {
  const { agenda, toggleChecked } = useAgenda();

  return (
    <View style={styles.container}>
      <ScrollView style={{ flexShrink: 1 }} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={true} alwaysBounceVertical={false}>
        {mode === "task" && selectedTask ? (
          <View style={styles.detailView}>
            <View style={styles.badgeRow}>
              <View style={styles.scoreBadge}><Text style={styles.scoreText}>{selectedTask.score} PTS</Text></View>
            </View>
            <Text style={styles.taskTitle}>{selectedTask.title}</Text>
            {selectedTask.minutes && (
              <View style={styles.timeRow}>
                <Text style={styles.timeLabel}>⏱ Time: </Text><Text style={styles.timeValue}>{selectedTask.minutes} mins</Text>
              </View>
            )}
            <Text style={styles.taskDesc}>{selectedTask.desc}</Text>
            <Pressable onPress={() => onItemSelect(null)} style={styles.backButton}><Text style={styles.backButtonText}>← BACK</Text></Pressable>
          </View>
        ) : (
          <View>
            <Text style={styles.header}>AGENDA</Text>
            {agenda.length === 0 ? <Text style={styles.emptyText}>Drag items here</Text> : agenda.map((task, index) => (
              <Pressable key={`${task.id}-${index}`} onPress={() => onItemSelect(task)} onLongPress={(e) => onDragStart(task, e.nativeEvent.pageX, e.nativeEvent.pageY)} delayLongPress={200} style={styles.agendaItem}>
                <View style={styles.row}>
                  <Pressable onPress={() => toggleChecked(task.id)} style={[styles.checkbox, task.checked && styles.checkboxChecked]}>{task.checked && <Text style={styles.checkMark}>✓</Text>}</Pressable>
                  <Text numberOfLines={2} style={[styles.itemText, task.checked && styles.textChecked]}>{task.title}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%' }, scrollContent: { padding: 12, paddingBottom: 24 },
  badgeRow: { flexDirection: 'row', gap: 8, alignItems: 'center', marginBottom: 4 },
  scoreBadge: { backgroundColor: '#fef3c7', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4, borderWidth: 1, borderColor: '#f59e0b' },
  scoreText: { fontSize: 10, fontWeight: '800', color: '#b45309' },
  timeRow: { flexDirection: 'row', marginBottom: 10, alignItems: 'center' },
  timeLabel: { fontSize: 11, color: '#64748b', fontWeight: '600' },
  timeValue: { fontSize: 11, color: '#534AB7', fontWeight: '700' },
  header: { fontSize: 10, fontWeight: "900", color: "#94a3b8", letterSpacing: 1, marginBottom: 15, textAlign: 'center' },
  taskTitle: { fontWeight: "700", fontSize: 16, marginTop: 10, marginBottom: 6, color: "#1e293b" },
  taskDesc: { fontSize: 12, color: "#64748b", lineHeight: 18, marginBottom: 20 },
  backButton: { padding: 10, backgroundColor: "#f1f5f9", borderRadius: 10, alignItems: "center" },
  backButtonText: { fontSize: 10, fontWeight: "800", color: "#64748b" },
  agendaItem: { backgroundColor: "white", padding: 12, borderRadius: 12, borderWidth: 1, borderColor: "#f1f5f9", marginBottom: 8, elevation: 1 },
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  checkbox: { width: 18, height: 18, borderRadius: 6, borderWidth: 2, borderColor: "#cbd5e1", alignItems: "center", justifyContent: "center" },
  checkboxChecked: { backgroundColor: "#6366f1", borderColor: "#6366f1" },
  checkMark: { color: "white", fontSize: 10, fontWeight: "bold" },
  itemText: { flex: 1, fontSize: 12, fontWeight: "600", color: "#334155" },
  textChecked: { color: "#94a3b8", textDecorationLine: "line-through" },
  emptyText: { fontSize: 11, color: "#94a3b8", textAlign: "center", marginTop: 40 }
});