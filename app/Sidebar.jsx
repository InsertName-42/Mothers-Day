import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useAgenda } from "./agendaContext";
import { TypeBadge } from "./(tabs)/index";

// mode: "task" shows a task detail; "agenda" shows the agenda list
export default function Sidebar({ mode, selectedTask, onClose }) {
  const { agenda, removeTask, toggleChecked } = useAgenda();
  const [collapsed, setCollapsed] = useState(false);

  if (collapsed) {
    return (
      <Pressable
        onPress={() => setCollapsed(false)}
        style={{
          width: 28,
          borderLeftWidth: 0.5,
          borderLeftColor: "#e5e7eb",
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 12, color: "#888" }}>▶</Text>
      </Pressable>
    );
  }

  return (
    <View style={{ width: 200, borderLeftWidth: 0.5, borderLeftColor: "#e5e7eb", backgroundColor: "white" }}>
      {/* Collapse toggle */}
      <Pressable
        onPress={() => setCollapsed(true)}
        style={{ height: 32, alignItems: "center", justifyContent: "center", borderBottomWidth: 0.5, borderBottomColor: "#e5e7eb" }}
      >
        <Text style={{ fontSize: 12, color: "#888" }}>◀</Text>
      </Pressable>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 10, gap: 8 }}>

        {/* Task detail mode */}
        {mode === "task" && selectedTask && (
          <View>
            <TypeBadge type={selectedTask.type} />
            <Text style={{ fontWeight: "600", fontSize: 13, marginTop: 6, marginBottom: 4, color: "#1f2937" }}>
              #{selectedTask.id} — {selectedTask.title}
            </Text>
            <Text style={{ fontSize: 12, color: "#6b7280", lineHeight: 18 }}>
              {selectedTask.desc}
            </Text>
            <Text style={{ fontSize: 10, color: "#9ca3af", marginTop: 10, textAlign: "center" }}>
              Hold & drag on map to add to agenda
            </Text>
          </View>
        )}

        {/* Agenda mode */}
        {mode === "agenda" && (
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 11, fontWeight: "500", color: "#9ca3af", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 2 }}>
              My Agenda
            </Text>

            {agenda.length === 0 && (
              <Text style={{ fontSize: 11, color: "#d1d5db", textAlign: "center", paddingVertical: 16 }}>
                Hold & drag a point{"\n"}to add it here
              </Text>
            )}

            {agenda.map((task) => (
              <View
                key={task.id}
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  gap: 6,
                  backgroundColor: "white",
                  borderWidth: 0.5,
                  borderColor: "#e5e7eb",
                  borderRadius: 8,
                  padding: 7,
                }}
              >
                {/* Checkbox */}
                <Pressable onPress={() => toggleChecked(task.id)}>
                  <View
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: 3,
                      borderWidth: 1.5,
                      borderColor: task.checked ? "#534AB7" : "#d1d5db",
                      backgroundColor: task.checked ? "#534AB7" : "transparent",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 1,
                    }}
                  >
                    {task.checked && <Text style={{ color: "white", fontSize: 9 }}>✓</Text>}
                  </View>
                </Pressable>

                {/* Title */}
                <Text
                  style={{
                    flex: 1,
                    fontSize: 11,
                    color: task.checked ? "#9ca3af" : "#1f2937",
                    textDecorationLine: task.checked ? "line-through" : "none",
                    lineHeight: 16,
                  }}
                >
                  #{task.id} {task.title}
                </Text>

                {/* Remove */}
                <Pressable onPress={() => removeTask(task.id)}>
                  <Text style={{ color: "#d1d5db", fontSize: 16, lineHeight: 16 }}>×</Text>
                </Pressable>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}