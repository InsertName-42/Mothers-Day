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
    const punchbowlIDs = [9]; 
    const sealRockIDs = [11, 19]; 

    let tasksToSearch = [];
    if (activeTab === 'map') {
      tasksToSearch = TASKS.filter(t => !punchbowlIDs.includes(t.id) && !sealRockIDs.includes(t.id));
    } else if (activeTab === 'punchbowl') {
      tasksToSearch = TASKS.filter(t => punchbowlIDs.includes(t.id));
    } else if (activeTab === 'sealrock') {
      tasksToSearch = TASKS.filter(t => sealRockIDs.includes(t.id));
    }

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
        const oldIdx = agenda.findIndex(t => t.id === dragTask.id);
        if (oldIdx !== -1) moveTask(oldIdx, index);
      }
    }
    setDragging(false); setDragTask(null); setDragSource(null);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0f172a" }} edges={['top']}>
      <View style={{ flex: 1 }} 
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
                  activeTab === 'punchbowl' ? require("../../assets/images/postcardPunchbowl.png") :
                  activeTab === 'sealrock' ? require("../../assets/images/postcardSealrock.png") :
                  require("../../assets/images/mapNewport.png")
                } 
                style={StyleSheet.absoluteFill} 
                contentFit={activeTab === 'map' ? "contain" : "cover"} 
              />
              {TASKS.map((t) => {
                const punchbowlIDs = [9]; 
                const sealRockIDs = [11, 19]; 
                let shouldShow = false;

                if (activeTab === 'map') {
                  if (!punchbowlIDs.includes(t.id) && !sealRockIDs.includes(t.id)) shouldShow = true;
                } else if (activeTab === 'punchbowl') {
                  if (punchbowlIDs.includes(t.id)) shouldShow = true;
                } else if (activeTab === 'sealrock') {
                  if (sealRockIDs.includes(t.id)) shouldShow = true;
                }

                if (!shouldShow) return null;
  const isSelected = selectedTask?.id === t.id;

      return (
      <View
        key={t.id}
        pointerEvents="none"
        style={[styles.poiContainer, { left: `${t.x}%`, top: `${t.y}%` }]}
      >
        <View style={[styles.poiGlowWrapper, t.glow && styles.poiGlow]}>
          <View style={styles.poiImageClip}>
            <Image
              source={t.image}
              style={[styles.poiImage, { opacity: agenda.some(a => a.id === t.id) ? 0.4 : 1 }]}
            />
          </View>
        </View>
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
          <View pointerEvents="none" style={[styles.ghost, { left: dragPos.x - 30, top: dragPos.y - 20 }]}>
            <Image source={dragTask.image} style={{ width: 24, height: 24, borderRadius: 12 }} />
            <Text style={styles.ghostText} numberOfLines={1}>{dragTask.title}</Text>
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
  poiContainer: { position: "absolute", width: 52, height: 52, transform: [{ translateX: -26 }, { translateY: -26 }], alignItems: 'center', justifyContent: 'center' },
  poiImageWrapper: { width: 24, height: 24, borderRadius: 12, overflow: 'hidden' },
  poiImage: { width: 24, height: 24 },
  poiSelected: { borderColor: 'white', borderWidth: 2 },
  poiGlowWrapper: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  poiImageClip: { width: 24, height: 24, borderRadius: 12, overflow: 'hidden' },
  poiGlow: { backgroundColor: 'rgba(255, 217, 0, 0.22)', shadowColor: '#ffd700', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 1, shadowRadius: 20, elevation: 20 },  ghost: { position: "absolute", zIndex: 9999, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 10, borderRadius: 20, elevation: 15 },
  ghostText: { marginLeft: 8, fontSize: 11, fontWeight: 'bold', color: '#334155' },
});