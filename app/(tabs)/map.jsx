import { useRef, useState } from "react";
import { Dimensions, GestureResponderEvent, Image, PanResponder, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAgenda } from "../agendaContext";
import Sidebar from "../Sidebar";
import { TASKS, TYPE_COLORS } from "../tasks";

const SCREEN_WIDTH = Dimensions.get("window").width;
const MAP_IMAGE = require("../../assets/images/map-newport.png");
const MAP_ASPECT = 1.2; // adjust to match your image's aspect ratio (height / width)

export default function MapScreen() {
  const { agenda, addTask } = useAgenda();

  // Which task is selected (tap) vs being dragged
  const [selectedTask, setSelectedTask] = useState(null);
  const [sidebarMode, setSidebarMode] = useState("agenda"); // "task" | "agenda"

  // Drag state
  const [dragging, setDragging] = useState(false);
  const [dragTask, setDragTask] = useState(null);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });

  // Long-press timer ref
  const longPressTimer = useRef(null);
  const sidebarRef = useRef(null);
  const [sidebarLayout, setSidebarLayout] = useState(null);

  // Map layout (for converting tap coords to % positions)
  const mapWidth = SCREEN_WIDTH - 200; // sidebar is 200px
  const mapHeight = mapWidth * MAP_ASPECT;

  function handlePOITap(task) {
    setSelectedTask(task);
    setSidebarMode("task");
  }

  function handleMapTap() {
    setSidebarMode("agenda");
    setSelectedTask(null);
  }

  function handlePOILongPressStart(task, e) {
    const { pageX, pageY } = e.nativeEvent;
    longPressTimer.current = setTimeout(() => {
      setDragTask(task);
      setDragPos({ x: pageX, y: pageY });
      setDragging(true);
      setSidebarMode("agenda");
    }, 400);
  }

  function handlePOILongPressEnd() {
    clearTimeout(longPressTimer.current);
  }

  // PanResponder tracks finger movement while dragging
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => dragging,
      onMoveShouldSetPanResponder: () => dragging,
      onPanResponderMove: (e) => {
        if (!dragging) return;
        setDragPos({ x: e.nativeEvent.pageX, y: e.nativeEvent.pageY });
      },
      onPanResponderRelease: (e) => {
        if (!dragging || !dragTask || !sidebarLayout) return;
        const { pageX, pageY } = e.nativeEvent;
        const { x, y, width, height } = sidebarLayout;
        // If finger released inside sidebar, add to agenda
        if (pageX >= x && pageX <= x + width && pageY >= y && pageY <= y + height) {
          addTask(dragTask);
        }
        setDragging(false);
        setDragTask(null);
      },
    })
  ).current;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View style={{ flex: 1, flexDirection: "row" }}>

        {/* Map area */}
        <Pressable style={{ flex: 1 }} onPress={handleMapTap} {...panResponder.panHandlers}>
          <View style={{ flex: 1, overflow: "hidden" }}>
            {/* Map image */}
            <Image
              source={MAP_IMAGE}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />

            {/* POI markers overlaid on map */}
            {TASKS.map((task) => {
              const inAgenda = !!agenda.find((a) => a.id === task.id);
              const color = TYPE_COLORS[task.type];
              return (
                <Pressable
                  key={task.id}
                  onPress={(e) => { e.stopPropagation(); handlePOITap(task); }}
                  onLongPress={() => {}} // handled via PressIn timer below
                  onPressIn={(e) => handlePOILongPressStart(task, e)}
                  onPressOut={handlePOILongPressEnd}
                  style={{
                    position: "absolute",
                    left: `${task.x}%`,
                    top: `${task.y}%`,
                    transform: [{ translateX: -11 }, { translateY: -11 }],
                  }}
                >
                  {/* Outer glow ring */}
                  <View
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 11,
                      backgroundColor: color,
                      opacity: 0.2,
                      position: "absolute",
                    }}
                  />
                  {/* Inner dot */}
                  <View
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: 7,
                      backgroundColor: inAgenda ? "#9ca3af" : color,
                      borderWidth: 2,
                      borderColor: "white",
                      margin: 4,
                    }}
                  />
                </Pressable>
              );
            })}

            {/* Drag ghost — follows finger */}
            {dragging && dragTask && (
              <View
                pointerEvents="none"
                style={{
                  position: "absolute",
                  left: dragPos.x - 80,
                  top: dragPos.y - 20,
                  backgroundColor: "#534AB7",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 8,
                  maxWidth: 160,
                }}
              >
                <Text style={{ color: "white", fontSize: 11 }}>{dragTask.title}</Text>
              </View>
            )}
          </View>
        </Pressable>

        {/* Sidebar */}
        <View
          onLayout={(e) => setSidebarLayout(e.nativeEvent.layout)}
          ref={sidebarRef}
          style={{ zIndex: 10 }}
        >
          <Sidebar mode={sidebarMode} selectedTask={selectedTask} />
        </View>

      </View>
    </SafeAreaView>
  );
}