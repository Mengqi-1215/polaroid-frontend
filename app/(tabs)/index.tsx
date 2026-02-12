import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

/* =========================
   Dot Grid Background
========================= */

interface DotGridProps {
  width: number;
  height: number;
  top?: number;
  left?: number;
}

function DotGridBg({ width, height, top = 0, left = 0 }: DotGridProps) {
  const spacing = 10;
  const dotSize = 5;
  const cols = Math.ceil(width / spacing);
  const rows = Math.ceil(height / spacing);
  const dots: React.ReactElement[] = [];

  for (let i = 0; i <= rows; i++) {
    for (let j = 0; j <= cols; j++) {
      dots.push(
        <View
          key={`${i}-${j}`}
          style={{
            position: "absolute",
            left: j * spacing,
            top: i * spacing,
            width: dotSize,
            height: dotSize,
            borderRadius: dotSize / 2,
            backgroundColor: "rgba(239,239,239,1)",
          }}
        />
      );
    }
  }

  return (
    <View
      pointerEvents="none"
      style={{
        position: "absolute",
        width,
        height,
        top,
        left,
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      {dots}
    </View>
  );
}

/* =========================
   Header
========================= */

function Header() {
  const avatarDiameter = 44;

  return (
    <View style={styles.header}>
      <View
        style={{
          width: avatarDiameter,
          height: avatarDiameter,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.avatarCircle}>
          <Feather name="eye" size={24} color="#181818" />
        </View>
      </View>

      <TouchableOpacity style={styles.settingBtn}>
        <Text style={styles.settingText}>Setting</Text>
      </TouchableOpacity>
    </View>
  );
}

/* =========================
   Hero Polaroids
========================= */

function PolaroidStack() {
  return (
    <View style={styles.polaroidContainer}>
      <View style={[styles.polaroid, styles.polaroidLeft]}>
        <View style={styles.polaroidInner} />
      </View>
      <View style={[styles.polaroid, styles.polaroidRight]}>
        <View style={styles.polaroidInner} />
      </View>
    </View>
  );
}

function WelcomeSection() {
  return (
    <View style={styles.heroSection}>
      <PolaroidStack />
      <View style={{ marginTop: 32, alignItems: "center" }}>
        <Text style={styles.greetingGray}>Hi Emma</Text>
        <Text style={styles.greetingBold}>Welcome</Text>
      </View>
    </View>
  );
}

function ActionArea() {
  return (
    <View style={styles.actionArea}>
      <TouchableOpacity style={styles.scanBtn}>
        <MaterialCommunityIcons
          name="camera-iris"
          size={30}
          color="#fff"
          style={{ marginBottom: 4 }}
        />
        <Text style={styles.scanBtnText}>Scan</Text>
      </TouchableOpacity>

      <View style={styles.actionStack}>
        <TouchableOpacity style={styles.importBtn}>
          <Text style={styles.importBtnText}>Import</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.editBtn}>
          <Text style={styles.editBtnText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* =========================
   Main Page
========================= */

export default function HomePage() {
  const { width, height } = Dimensions.get("window");

  const gridHeight = height / 2;
  const gridTop = height / 4;

  return (
    <View style={styles.root}>
      <DotGridBg width={width} height={gridHeight} top={gridTop} />

      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.pageContent}>
          <Header />
          <View style={{ flex: 1, justifyContent: "center" }}>
            <WelcomeSection />
            <ActionArea />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

/* =========================
   Styles
========================= */

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  pageContent: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 10,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  avatarCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1A1A1A",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  settingBtn: {
    borderWidth: 1,
    borderColor: "#181818",
    borderRadius: 22,
    paddingHorizontal: 26,
    paddingVertical: 8,
    backgroundColor: "#fff",
  },
  settingText: {
    fontSize: 20,
    color: "#181818",
    fontWeight: "600",
    letterSpacing: 0.4,
  },

  heroSection: {
    alignItems: "center",
    marginBottom: 36,
  },
  polaroidContainer: {
    width: 200,
    height: 156,
    alignItems: "center",
    justifyContent: "center",
  },
  polaroid: {
    position: "absolute",
    width: 122,
    height: 141,
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "flex-end",
    alignItems: "center",
    elevation: 6,
  },
  polaroidLeft: {
    left: 17,
    transform: [{ rotate: "-8deg" }],
  },
  polaroidRight: {
    left: 56,
    transform: [{ rotate: "11deg" }],
  },
  polaroidInner: {
    width: 106,
    height: 96,
    backgroundColor: "#F4F6F8",
    borderRadius: 7,
    marginBottom: 15,
  },

  greetingGray: {
    color: "#737373",
    fontSize: 18,
    marginBottom: 4,
  },
  greetingBold: {
    color: "#181818",
    fontSize: 28,
    fontWeight: "700",
  },

  actionArea: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 38,
  },
  scanBtn: {
    backgroundColor: "#181818",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 17,
    paddingHorizontal: 30,
    minWidth: 96,
    minHeight: 96,
  },
  scanBtnText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  actionStack: {
    marginLeft: 16,
    justifyContent: "space-between",
  },
  importBtn: {
    borderWidth: 1.6,
    borderColor: "#181818",
    borderRadius: 15,
    paddingVertical: 13,
    alignItems: "center",
    minWidth: 104,
  },
  importBtnText: {
    color: "#181818",
    fontWeight: "700",
  },
  editBtn: {
    borderRadius: 15,
    backgroundColor: "#ECECEC",
    paddingVertical: 13,
    alignItems: "center",
    minWidth: 104,
  },
  editBtnText: {
    color: "#181818",
    fontWeight: "700",
  },
});