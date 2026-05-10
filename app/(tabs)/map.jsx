import React, { useState, useCallback, useRef } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
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
  const { agenda, addTask } = useAgenda();
  const segments = useSegments();
  const zoomableViewRef = useRef(null);
  
  // Detect current tab from the URL segments
  // segments will look like ["(tabs)", "punchbowl"] or ["(tabs)", "map"]
  const activeTab = segments[segments.length - 1];

  const [selectedTask, setSelectedTask] = useState(null);
  const [sidebarMode, setSidebarMode] = useState("agenda");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [dragging, setDragging] = useState(false);
  const [dragTask, setDragTask] = useState(null);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const [imgLayout, setImgLayout] = useState({ w: 0, h: 0, vW: 0 });

  const onLayout = useCallback((e) => {
    const { width } = e.nativeEvent.layout;
    if (width === 0) return;
    const imgAspect = MAP_IMAGE_W / MAP_IMAGE_H;
    setImgLayout({ w: width, h: width / imgAspect, vW: width });
  }, []);

  const handleMapTap = (event) => {
    if (activeTab !== 'map') {
      setSidebarMode("agenda");
      return;
    }
    const { locationX, locationY } = event.nativeEvent;
    const pctX = (locationX / imgLayout.w) * 100;
    const pctY = (locationY / imgLayout.h) * 100;

    const found = TASKS.find(t => Math.sqrt(Math.pow(t.x - pctX, 2) + Math.pow(t.y - pctY, 2)) < 5);
    if (found) {
      setSelectedTask(found);
      setSidebarMode("task");
      setSidebarCollapsed(false);
    } else {
      setSelectedTask(null);
      setSidebarMode("agenda");
    }
  };

  const renderContent = () => {
    if (activeTab === 'punchbowl') {
      const task = TASKS.find(t => t.id === 15);
      return (
        <View style={styles.postcardContainer}>
          <Image source={require("../../assets/images/postcard-punchbowl.png")} style={styles.postcardImage} contentFit="contain" />
          <View style={styles.notecard}>
            <Text style={styles.notecardTitle}>{task?.title}</Text>
            <Text style={styles.notecardText}>Watch waves crash into this dramatic collapsed sea cave bowl.</Text>
          </View>
        </View>
      );
    }

    if (activeTab === 'sealrock') {
      const task = TASKS.find(t => t.id === 11);
      return (
        <View style={styles.postcardContainer}>
          <Image source={require("../../assets/images/postcard-sealrock.png")} style={styles.postcardImage} contentFit="contain" />
          <View style={styles.notecard}>
            <Text style={styles.notecardTitle}>{task?.title}</Text>
            <Text style={styles.notecardText}>Spot seals basking on the rocks during low tide.</Text>
          </View>
        </View>
      );
    }

    return (
      <ReactNativeZoomableView
        ref={zoomableViewRef}
        maxZoom={5} minZoom={1} bindToBorders={true}
        panEnabled={!dragging} pinchEnabled={!dragging}
        onSingleTap={handleMapTap}
        onLongPress={(e) => {
          if (activeTab !== 'map') return;
          const { locationX, locationY, pageX, pageY } = e.nativeEvent;
          const pctX = (locationX / imgLayout.w) * 100;
          const pctY = (locationY / imgLayout.h) * 100;
          const found = TASKS.find(t => Math.sqrt(Math.pow(t.x - pctX, 2) + Math.pow(t.y - pctY, 2)) < 5);
          if (found) {
            setDragTask(found);
            setDragPos({ x: pageX, y: pageY });
            setDragging(true);
            setSidebarMode("agenda");
            setSidebarCollapsed(false);
          }
        }}
      >
        <View style={{ width: imgLayout.w, height: imgLayout.h }}>
          <Image source={require("../../assets/images/map-newport.png")} style={StyleSheet.absoluteFill} contentFit="contain" />
          {TASKS.map((t) => (
            <View key={t.id} pointerEvents="none" style={[styles.poi, {
              left: `${t.x}%`, top: `${t.y}%`,
              opacity: selectedTask?.id === t.id ? 1 : 0.7,
              backgroundColor: agenda.some(a => a.id === t.id) ? '#94a3b8' : selectedTask?.id === t.id ? 'white' : TYPE_COLORS[t.type],
              borderColor: selectedTask?.id === t.id ? TYPE_COLORS[t.type] : 'rgba(255,255,255,0.8)',
            }]} />
          ))}
        </View>
      </ReactNativeZoomableView>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0f172a" }} edges={['top']}>
      <View style={{ flex: 1 }} 
        onStartShouldSetResponder={() => dragging}
        onMoveShouldSetResponder={() => dragging}
        onTouchMove={(e) => { if (dragging) setDragPos({ x: e.nativeEvent.pageX, y: e.nativeEvent.pageY }); }}
        onTouchEnd={(e) => {
          if (dragging && dragTask && e.nativeEvent.pageX > imgLayout.vW * 0.6) addTask(dragTask);
          setDragging(false); setDragTask(null);
        }}
      >
        <View style={styles.viewerContainer} onLayout={onLayout}>
          {renderContent()}
        </View>

        <View style={styles.sidebarWrapper} pointerEvents="box-none">
          <View style={[styles.sidebarCard, { width: sidebarCollapsed ? 44 : 180 }]}>
            <Pressable onPress={() => setSidebarCollapsed(!sidebarCollapsed)} style={styles.toggle}>
              <Text style={{ color: '#64748b', fontSize: 18 }}>{sidebarCollapsed ? "◀" : "▶"}</Text>
            </Pressable>
            {!sidebarCollapsed && <Sidebar mode={activeTab !== 'map' ? 'agenda' : sidebarMode} selectedTask={selectedTask} />}
          </View>
        </View>

        {dragging && dragTask && (
          <View pointerEvents="none" style={[styles.ghost, { left: dragPos.x - 20, top: dragPos.y - 20 }]}>
            <View style={[styles.ghostIcon, { backgroundColor: TYPE_COLORS[dragTask.type] }]} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  viewerContainer: { flex: 1 },
  sidebarWrapper: { position: 'absolute', right: 12, top: 12, bottom: 20, alignItems: 'flex-end' },
  sidebarCard: { backgroundColor: 'rgba(255, 255, 255, 0.96)', borderRadius: 20, overflow: 'hidden', elevation: 10, maxHeight: '90%' },
  toggle: { height: 44, width: 44, alignItems: 'center', justifyContent: 'center' },
  poi: { position: "absolute", width: 14, height: 14, borderRadius: 7, borderWidth: 1.5, transform: [{ translateX: -7 }, { translateY: -7 }] },
  postcardContainer: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  postcardImage: { width: '100%', height: '80%' },
  notecard: { position: 'absolute', bottom: '15%', backgroundColor: '#fef3c7', padding: 15, borderRadius: 4, width: '65%', elevation: 5, transform: [{ rotate: '-1deg' }] },
  notecardTitle: { fontWeight: 'bold', fontSize: 16, color: '#92400e', marginBottom: 4 },
  notecardText: { fontSize: 13, color: '#b45309', fontStyle: 'italic' },
  ghost: { position: "absolute", zIndex: 1000 },
  ghostIcon: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: 'white' }
});