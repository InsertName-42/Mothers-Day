// app/PostcardScreen.jsx
export default function PostcardScreen({ image, task, notecardText }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#475569" }}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ flex: 1, padding: 16 }}>
          <Image source={image} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
          {/* Notecard UI... */}
        </View>
        <Sidebar mode="agenda" /> 
      </View>
    </SafeAreaView>
  );
}