import { ScrollView, Text, View, Pressable } from "react-native";
import { useAgenda } from "./agendaContext";
import { TypeBadge } from "./(tabs)/instructions";

export default function Sidebar({ mode, selectedTask }) {
  const { agenda, removeTask, toggleChecked } = useAgenda();

  return (
    <View style={{ backgroundColor: "transparent" }}>
      <ScrollView 
        contentContainerStyle={{ padding: 12, gap: 10 }}
        showsVerticalScrollIndicator={false}
      >
        {mode === "task" && selectedTask && (
          <View style={{ alignSelf: 'stretch' }}>
            <TypeBadge type={selectedTask.type} />
            <Text style={{ fontWeight: "700", fontSize: 15, marginTop: 8, marginBottom: 4, color: "#1e293b" }}>
              {selectedTask.title}
            </Text>
            <Text style={{ fontSize: 13, color: "#64748b", lineHeight: 20 }}>
              {selectedTask.desc}
            </Text>
            <View style={{ marginTop: 15, padding: 8, backgroundColor: '#f1f5f9', borderRadius: 8 }}>
               <Text style={{ fontSize: 10, color: "#94a3b8", textAlign: "center", fontWeight: '700' }}>
                DRAG TO ADD
              </Text>
            </View>
          </View>
        )}

        {mode === "agenda" && (
          <View style={{ gap: 8, alignSelf: 'stretch' }}>
            <Text style={{ fontSize: 11, fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: 1 }}>
              My Agenda
            </Text>

            {agenda.length === 0 && (
              <Text style={{ fontSize: 12, color: "#94a3b8", textAlign: "center", paddingVertical: 15 }}>
                Empty
              </Text>
            )}

            {agenda.map((task) => (
              <View
                key={task.id}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                  backgroundColor: "rgba(255,255,255,0.7)",
                  borderWidth: 1,
                  borderColor: "#f1f5f9",
                  borderRadius: 10,
                  padding: 8,
                }}
              >
                <Pressable onPress={() => toggleChecked(task.id)}>
                  <View style={{
                    width: 16, height: 16, borderRadius: 4, borderWidth: 2,
                    borderColor: task.checked ? "#6366f1" : "#cbd5e1",
                    backgroundColor: task.checked ? "#6366f1" : "transparent",
                    alignItems: "center", justifyContent: "center"
                  }}>
                    {task.checked && <Text style={{ color: "white", fontSize: 9 }}>✓</Text>}
                  </View>
                </Pressable>

                <Text numberOfLines={2} style={{
                  flex: 1, fontSize: 11, fontWeight: '500',
                  color: task.checked ? "#94a3b8" : "#1e293b",
                  textDecorationLine: task.checked ? "line-through" : "none"
                }}>
                  {task.title}
                </Text>

                <Pressable onPress={() => removeTask(task.id)}>
                  <Text style={{ color: "#ef4444", fontSize: 16 }}>×</Text>
                </Pressable>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}