import React, { useState, useCallback, useRef } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import { useAgenda } from "../agendaContext";
import Sidebar from "../Sidebar";
import { TASKS, TYPE_COLORS } from "../tasks";

const MAP_IMAGE_W = 2025;
const MAP_IMAGE_H = 2700;

export default function MapScreen() {
  const { agenda, addTask } = useAgenda();
  const zoomableViewRef = useRef(null);
  
  const [selectedTask, setSelectedTask] = useState(null);
  const [sidebarMode, setSidebarMode] = useState("agenda");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [dragging, setDragging] = useState(false);
  const [dragTask, setDragTask] = useState(null);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const [imgLayout, setImgLayout] = useState({ w: 0, h: 0, vW: 0 });

  const updateUI = useCallback((task) => {
    if (task) {
      setSelectedTask(task);
      setSidebarMode("task");
    } else {
      setSelectedTask(null);
      setSidebarMode("agenda");
    }
  }, []);

  const onLayout = useCallback((e) => {
    const { width, height } = e.nativeEvent.layout;
    if (width === 0 || height === 0) return;

    const imgAspect = MAP_IMAGE_W / MAP_IMAGE_H;
    const viewAspect = width / height;
    let fitW, fitH;

    if (imgAspect > viewAspect) {
      fitW = width;
      fitH = width / imgAspect;
    } else {
      fitH = height;
      fitW = height * imgAspect;
    }

    setImgLayout({ w: fitW, h: fitH, vW: width });
  }, []);

  const getPOIFromEvent = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    const pctX = (locationX / imgLayout.w) * 100;
    const pctY = (locationY / imgLayout.h) * 100;

    let found = null;
    let closest = 5; 
    for (const task of TASKS) {
      const d = Math.sqrt(Math.pow(task.x - pctX, 2) + Math.pow(task.y - pctY, 2));
      if (d < closest) { found = task; closest = d; }
    }
    return found;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0f172a" }} edges={["top"]}>
      <View 
        style={{ flex: 1 }}
        onStartShouldSetResponder={() => dragging}
        onMoveShouldSetResponder={() => dragging}
        onTouchMove={(e) => {
          if (dragging) setDragPos({ x: e.nativeEvent.pageX, y: e.nativeEvent.pageY });
        }}
        onTouchEnd={(e) => {
          if (dragging && dragTask) {
            const screenWidth = Dimensions.get('window').width;
            // Dropping on the right third of the screen adds to agenda
            if (e.nativeEvent.pageX > screenWidth * 0.65) {
              addTask(dragTask);
            }
          }
          setDragging(false);
          setDragTask(null);
        }}
      >
        {/* MAP BACKGROUND */}
        <View style={StyleSheet.absoluteFill} onLayout={onLayout}>
          <ReactNativeZoomableView
            ref={zoomableViewRef}
            maxZoom={5}
            minZoom={1}
            bindToBorders={true}
            panEnabled={!dragging}
            pinchEnabled={!dragging}
            onSingleTap={(event) => {
              const found = getPOIFromEvent(event);
              updateUI(found);
            }}
            onLongPress={(event) => {
              const found = getPOIFromEvent(event);
              if (found) {
                setDragTask(found);
                setDragPos({ x: event.nativeEvent.pageX, y: event.nativeEvent.pageY });
                setDragging(true);
                setSidebarMode("agenda");
              }
            }}
          >
            {imgLayout.w > 0 && (
              <View style={{ width: imgLayout.w, height: imgLayout.h }}>
                <Image
                  source={require("../../assets/images/map-newport.png")}
                  style={styles.mapImage}
                  contentFit="fill"
                />
                {TASKS.map((task) => (
                  <View 
                    key={task.id} 
                    pointerEvents="none" 
                    style={[
                      styles.poi, 
                      { 
                        left: `${task.x}%`, 
                        top: `${task.y}%`,
                        opacity: selectedTask?.id === task.id ? 1 : 0.6,
                        backgroundColor: agenda.some(a => a.id === task.id) 
                          ? '#9ca3af' 
                          : selectedTask?.id === task.id ? 'white' : TYPE_COLORS[task.type],
                        borderColor: selectedTask?.id === task.id ? TYPE_COLORS[task.type] : 'rgba(255,255,255,0.8)'
                      }
                    ]} 
                  />
                ))}
              </View>
            )}
          </ReactNativeZoomableView>
        </View>

        {/* FLOATING SIDEBAR */}
        <View style={styles.floatingSidebarContainer} pointerEvents="box-none">
           <View style={[styles.sidebarCard, { width: sidebarCollapsed ? 60 : '100%' }]}>
            <Sidebar 
              mode={sidebarMode} 
              selectedTask={selectedTask} 
              onCollapseChange={setSidebarCollapsed} 
            />
          </View>
        </View>

        {/* DRAG GHOST */}
        {dragging && dragTask && (
          <View pointerEvents="none" style={[styles.ghost, { left: dragPos.x - 50, top: dragPos.y - 40 }]}>
            <View style={[styles.ghostIcon, { backgroundColor: TYPE_COLORS[dragTask.type] }]} />
            <Text style={styles.ghostText}>{dragTask.title}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mapImage: { width: '100%', height: '100%' },
  floatingSidebarContainer: {
    position: 'absolute',
    right: 12,
    top: 12,
    bottom: 12,
    width: '38%', // Max width allowed for the sidebar
    alignItems: 'flex-end',
  },
  sidebarCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    borderRadius: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    // Ensures internal Sidebar content can expand the height
    minHeight: 60,
    maxHeight: '90%', 
    overflow: 'hidden',
  },
  poi: {
    position: "absolute",
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1.5,
    transform: [{ translateX: -7 }, { translateY: -7 }]
  },
  ghost: { position: "absolute", zIndex: 1000, alignItems: "center", width: 100 },
  ghostIcon: { width: 30, height: 30, borderRadius: 15, borderWidth: 2, borderColor: "white", elevation: 8 },
  ghostText: { color: "white", fontSize: 11, fontWeight: "bold", marginTop: 6, textAlign: 'center', textShadowColor: 'black', textShadowRadius: 2 }
});