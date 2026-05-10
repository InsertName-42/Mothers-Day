import React, { useState, useCallback, useRef } from "react";
import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import { useSegments } from "expo-router";
import { useAgenda } from "../agendaContext";
import Sidebar from "../Sidebar";
import { TASKS, TYPE_COLORS } from "../tasks";

const MAP_IMAGE_W = 2025;
const MAP_IMAGE_H = 2700;

export default function MapScreen() {
  const { agenda, addTask, removeTask, moveTask } = useAgenda();
  const segments = useSegments();
  const zoomableViewRef = useRef(null);
  const activeTab = segments[segments.length - 1] === "(tabs)" ? "map" : segments[segments.length - 1];

  const [selectedTask, setSelectedTask] = useState(null);
  const [sidebarMode, setSidebarMode] = useState("agenda");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Drag State
  const [dragging, setDragging] = useState(false);
  const [dragTask, setDragTask] = useState(null);
  const [dragSource, setDragSource] = useState(null); 
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const [imgLayout, setImgLayout] = useState({ w: 0, h: 0, vW: 0 });

  const onLayout = useCallback((e) => {
    const { width } = e.nativeEvent.layout;
    if (width === 0) return;
    const imgAspect = MAP_IMAGE_W / MAP_IMAGE_H;
    setImgLayout({ w: width, h: width / imgAspect, vW: width });
  }, []);

  const findClosestPOI = (pctX, pctY) => {
    const currentPOI = activeTab === 'punchbowl' ? 9 : (activeTab === 'sealrock' ? 11 : null);
    const tasksToSearch = activeTab === 'map' ? TASKS : TASKS.filter(t => t.id === currentPOI);
    let closest = null;
    let minDistance = 8; 
    tasksToSearch.forEach(t => {
      const d = Math.sqrt(Math.pow(t.x - pctX, 2) + Math.pow(t.y - pctY, 2));
      if (d < minDistance) { minDistance = d; closest = t; }
    });
    return closest;
  };

  const handleTouchEnd = (e) => {
    if (!dragging || !dragTask) return;
    const { pageX, pageY } = e.nativeEvent;
    const isOverSidebar = pageX > imgLayout.vW * 0.6;

    if (dragSource === 'map' && isOverSidebar) {
      const dropY = pageY - 80;
      const index = Math.max(0, Math.floor(dropY / 75));
      addTask(dragTask, index);
    } else if (dragSource === 'sidebar') {
      if (!isOverSidebar) {
        removeTask(dragTask.id);
      } else {
        const dropY = pageY - 80;
        const index = Math.max(0, Math.floor(dropY / 75));
        moveTask(agenda.findIndex(t => t.id === dragTask.id), index);
      }
    }
    setDragging(false); setDragTask(null); setDragSource(null);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0f172a" }} edges={['top']}>
      <View style={{ flex: 1 }} 
        // THIS IS THE FIX: Hijack touch responder from ZoomableView when dragging
        onStartShouldSetResponder={() => dragging}
        onMoveShouldSetResponder={() => dragging}
        onTouchMove={(e) => { 
          if (dragging) setDragPos({ x: e.nativeEvent.pageX, y: e.nativeEvent.pageY }); 
        }}
        onTouchEnd={handleTouchEnd}
      >
        <View style={styles.viewerContainer} onLayout={onLayout}>
          <ReactNativeZoomableView
            ref={zoomableViewRef}
            maxZoom={5} minZoom={1} bindToBorders={true}
            panEnabled={!dragging} pinchEnabled={!dragging}
            onSingleTap={(e) => {
              const pctX = (e.nativeEvent.locationX / imgLayout.w) * 100;
              const pctY = (e.nativeEvent.locationY / imgLayout.h) * 100;
              const found = findClosestPOI(pctX, pctY);
              if (found) { setSelectedTask(found); setSidebarMode("task"); setSidebarCollapsed(false); }
              else { setSelectedTask(null); setSidebarMode("agenda"); }
            }}
            onLongPress={(e) => {
              const pctX = (e.nativeEvent.locationX / imgLayout.w) * 100;
              const pctY = (e.nativeEvent.locationY / imgLayout.h) * 100;
              const found = findClosestPOI(pctX, pctY);
              if (found) {
                setDragTask(found); setDragSource('map');
                setDragPos({ x: e.nativeEvent.pageX, y: e.nativeEvent.pageY });
                setDragging(true); setSidebarMode("agenda"); setSidebarCollapsed(false);
              }
            }}
          >
            <View style={{ width: imgLayout.w, height: imgLayout.h }}>
              <Image 
                source={
                  activeTab === 'punchbowl' ? require("../../assets/images/postcard-punchbowl.png") :
                  activeTab === 'sealrock' ? require("../../assets/images/postcard-sealrock.png") :
                  require("../../assets/images/map-newport.png")
                } 
                style={StyleSheet.absoluteFill} 
                contentFit={activeTab === 'map' ? "contain" : "cover"} 
              />
              {TASKS.map((t) => {
                // 1. Define which IDs belong to which postcard tab
                const punchbowlIDs = [9]; 
                const sealRockIDs = [11, 19]; // Added 19 as an exception here

                // 2. Visibility Logic
                let shouldShow = false;

                if (activeTab === 'map') {
                  // Hide postcard-specific tasks from the main overview map
                  if (!punchbowlIDs.includes(t.id) && !sealRockIDs.includes(t.id)) {
                    shouldShow = true;
                  }
                } else if (activeTab === 'punchbowl') {
                  if (punchbowlIDs.includes(t.id)) shouldShow = true;
                } else if (activeTab === 'sealrock') {
                  if (sealRockIDs.includes(t.id)) shouldShow = true;
                }

                if (!shouldShow) return null;

                // 3. Render POI
                return (
                  <View key={t.id} pointerEvents="none" style={[styles.poiContainer, {
                    left: `${t.x}%`, 
                    top: `${t.y}%` 
                  }]}>
                    <Image 
                      source={t.image} 
                      style={[
                        styles.poiImage, 
                        { 
                          opacity: agenda.some(a => a.id === t.id) ? 0.4 : 1,
                          borderColor: selectedTask?.id === t.id ? 'white' : 'transparent',
                          borderWidth: selectedTask?.id === t.id ? 2 : 0,
                        }
                      ]} 
                    />
                  </View>
                );
              })}
            </View>
          </ReactNativeZoomableView>
        </View>

        <View style={styles.sidebarWrapper} pointerEvents="box-none">
          <View style={[styles.sidebarCard, { width: sidebarCollapsed ? 44 : 200 }]}>
            <Pressable onPress={() => setSidebarCollapsed(!sidebarCollapsed)} style={styles.toggle}>
              <Text style={{ color: '#64748b', fontSize: 18 }}>{sidebarCollapsed ? "◀" : "▶"}</Text>
            </Pressable>
            {!sidebarCollapsed && (
              <Sidebar 
                mode={sidebarMode} 
                selectedTask={selectedTask}
                onItemSelect={(t) => { setSelectedTask(t); setSidebarMode(t ? "task" : "agenda"); }}
                onDragStart={(task, x, y) => {
                  setDragTask(task); setDragSource('sidebar');
                  setDragPos({ x, y }); setDragging(true);
                }}
              />
            )}
          </View>
        </View>

        {dragging && dragTask && (
      <View 
        pointerEvents="none" 
        style={[
          styles.ghost, 
          { 
            // Adjusted offsets to keep the smaller icon under the finger
            left: dragPos.x - 40, 
            top: dragPos.y - 20 
          }
        ]}
      >
        <Image 
          source={dragTask.image} 
          style={{ width: 24, height: 24, borderRadius: 12 }} 
        />
        <Text style={styles.ghostText} numberOfLines={1}>
          {dragTask.title}
        </Text>
      </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  viewerContainer: { flex: 1 },
  sidebarWrapper: { position: 'absolute', right: 12, top: 12, alignItems: 'flex-end', zIndex: 10 },
  sidebarCard: { backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: 20, elevation: 10, alignSelf: 'flex-start', maxHeight: Dimensions.get('window').height * 0.75, overflow: 'hidden' },
  toggle: { height: 44, width: 44, alignItems: 'center', justifyContent: 'center' },
  poiContainer: {
    position: "absolute",
    width: 24,  // Reduced from 40
    height: 24, // Reduced from 40
    // Half of 24 is 12, so we move it back by 12 to center it
    transform: [{ translateX: -12 }, { translateY: -12 }], 
    shadowColor: "#fff",
    shadowRadius: 6,
    shadowOpacity: 0.8,
  },
  poiImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12, // Half of 24 for a perfect circle
    backgroundColor: 'white',
    borderWidth: 1, // Thinner border for smaller icon
  },
  ghost: { position: "absolute", zIndex: 9999, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 10, borderRadius: 20, elevation: 15 },
  ghostText: { marginLeft: 8, fontSize: 11, fontWeight: 'bold', color: '#334155' }
});