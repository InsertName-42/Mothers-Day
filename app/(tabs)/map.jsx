import React, { useRef, useState, useCallback } from "react";
import { Text, View } from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
} from "react-native-reanimated";
import { useAgenda } from "../agendaContext";
import Sidebar from "../Sidebar";
import { TASKS, TYPE_COLORS } from "../tasks";

const MAP_IMAGE_W = 1000;
const MAP_IMAGE_H = 1200;
const MIN_SCALE = 1.0;
const MAX_SCALE = 5.0;

// Helper Component to avoid "Reading value during render" error
const AnimatedMarker = ({ task, layout, isSelected }) => {
  const animatedStyle = useAnimatedStyle(() => {
    const l = layout.value;
    if (l.w === 0) return { opacity: 0 };
    return {
      position: "absolute",
      left: l.offsetX + (task.x / 100) * l.w - 10,
      top: l.offsetY + (task.y / 100) * l.h - 10,
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: isSelected ? 'white' : TYPE_COLORS[task.type],
      borderWidth: 2,
      borderColor: 'rgba(0,0,0,0.2)',
      opacity: 1,
    };
  });

  return <Animated.View style={animatedStyle} />;
};

export default function MapScreen() {
  const { agenda } = useAgenda();
  const [selectedTask, setSelectedTask] = useState(null);
  const [sidebarMode, setSidebarMode] = useState("agenda");
  
  const layout = useSharedValue({ w: 0, h: 0, offsetX: 0, offsetY: 0, vW: 0, vH: 0 });
  const [hasLayout, setHasLayout] = useState(false);

  const scale = useSharedValue(1);
  const tx = useSharedValue(0);
  const ty = useSharedValue(0);
  const savedScale = useSharedValue(1);
  const savedTx = useSharedValue(0);
  const savedTy = useSharedValue(0);

  const updateUI = (task) => {
    if (task) {
      setSelectedTask(task);
      setSidebarMode("task");
    } else {
      setSelectedTask(null);
      setSidebarMode("agenda");
    }
  };

  const handleTap = (localX, localY) => {
    "worklet";
    const l = layout.value;
    if (l.w === 0) return;

    const sc = scale.value;
    const vCx = l.vW / 2;
    const vCy = l.vH / 2;

    const viewX = (localX - vCx - tx.value) / sc + vCx;
    const viewY = (localY - vCy - ty.value) / sc + vCy;

    const inImgX = viewX - l.offsetX;
    const inImgY = viewY - l.offsetY;
    
    const pctX = (inImgX / l.w) * 100;
    const pctY = (inImgY / l.h) * 100;

    let found = null;
    let closest = 6; 

    for (const task of TASKS) {
      const d = Math.sqrt(Math.pow(task.x - pctX, 2) + Math.pow(task.y - pctY, 2));
      if (d < closest) {
        found = task;
        closest = d;
      }
    }
    runOnJS(updateUI)(found);
  };

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      "worklet";
      const l = layout.value;
      const ox = Math.max(0, l.vW * scale.value - l.vW) / 2;
      const oy = Math.max(0, l.vH * scale.value - l.vH) / 2;
      tx.value = Math.min(Math.max(savedTx.value + e.translationX, -ox), ox);
      ty.value = Math.min(Math.max(savedTy.value + e.translationY, -oy), oy);
    })
    .onEnd(() => {
      "worklet";
      savedTx.value = tx.value;
      savedTy.value = ty.value;
    });

  const pinchGesture = Gesture.Pinch()
    .onStart(() => { "worklet"; savedScale.value = scale.value; })
    .onUpdate((e) => {
      "worklet";
      scale.value = Math.min(Math.max(savedScale.value * e.scale, MIN_SCALE), MAX_SCALE);
    });

  const tapGesture = Gesture.Tap().onEnd((e) => {
    "worklet";
    handleTap(e.x, e.y);
  });

  const animatedMapStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: tx.value },
      { translateY: ty.value },
      { scale: scale.value }
    ],
  }));

  const onLayout = useCallback((e) => {
    const { width, height } = e.nativeEvent.layout;
    if (width === 0) return;

    const imgAspect = MAP_IMAGE_W / MAP_IMAGE_H;
    const viewAspect = width / height;
    let fitW, fitH;

    if (imgAspect > viewAspect) {
      fitW = width; fitH = width / imgAspect;
    } else {
      fitH = height; fitW = height * imgAspect;
    }

    layout.value = {
      w: fitW, h: fitH,
      offsetX: (width - fitW) / 2,
      offsetY: (height - fitH) / 2,
      vW: width, vH: height,
    };
    setHasLayout(true);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#0f172a" }} edges={["top"]}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          
          <View style={{ flex: 1, overflow: "hidden" }} onLayout={onLayout}>
            <GestureDetector gesture={Gesture.Simultaneous(tapGesture, panGesture, pinchGesture)}>
              <Animated.View style={[{ flex: 1 }, animatedMapStyle]}>
                {hasLayout && (
                  <>
                    {/* Background Image logic: Styled via SharedValues to avoid render access */}
                    <Image
                      source={require("../../assets/images/map-newport.png")}
                      style={{
                        position: "absolute",
                        left: layout.value.offsetX,
                        top: layout.value.offsetY,
                        width: layout.value.w,
                        height: layout.value.h
                      }}
                      contentFit="fill"
                    />

                    {TASKS.map((task) => (
                      <AnimatedMarker 
                        key={task.id} 
                        task={task} 
                        layout={layout} 
                        isSelected={selectedTask?.id === task.id} 
                      />
                    ))}
                  </>
                )}
              </Animated.View>
            </GestureDetector>
          </View>

          <Sidebar mode={sidebarMode} selectedTask={selectedTask} />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}