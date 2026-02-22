import { Feather } from "@expo/vector-icons";
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

function WelcomeSection() {
  return (
    <View style={styles.heroSection}>
      <View style={{ alignItems: "center" }}>
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
        <Text style={styles.scanBtnText}>Scan</Text>
        <View style={styles.scanCornerCircle} />
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
          <View style={{ flex: 1 }}>
            <WelcomeSection />

            {/* 16:9 Rectangle */}
            <View style={styles.previewWrapper}>
              <View style={styles.previewBoxBack} />
              <View style={styles.previewBox} />
            </View>

            <View style={styles.buttonWrapper}>
              <ActionArea />
            </View>
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
    fontWeight: "300",
    letterSpacing: 0.4,
  },

  heroSection: {
    alignItems: "center",
    marginTop: 180,   // controls vertical position of Hi Emma / Welcome
    marginBottom: 60,
    zIndex: 2,
  },

  greetingGray: {
    color: "#181818",
    fontSize: 50,
    marginBottom: -8,
    fontWeight: "300",
  },
  greetingBold: {
    color: "#181818",
    fontSize: 46,
    fontWeight: "700",
  },

  actionArea: {
    flexDirection: "row",
    justifyContent: "center",
  },
  scanBtn: {
    backgroundColor: "#181818",
    borderRadius: 18,
    width: 175,
    height: 137,
    paddingTop: 14,
    paddingLeft: 16,
    alignItems: "flex-start",
  },
  scanBtnText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "400",
  },
  scanCornerCircle: {
    position: "absolute",
    right: 12,
    bottom: 12,
    width: 80,
    height: 77,
    borderRadius: 80,
    borderWidth: 26,
    borderColor: "#FFFFFF",
  },
  actionStack: {
    marginLeft: 16,
    justifyContent: "space-between",
  },
  importBtn: {
    borderWidth: 1.6,
    borderColor: "#181818",
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    width: 175,
    height: 72,
    paddingTop: 10,
    paddingLeft: 14,
  },
  importBtnText: {
    color: "#181818",
    fontWeight: "400",
    fontSize: 28,
  },
  editBtn: {
    borderRadius: 15,
    backgroundColor: "#ECECEC",
    borderWidth: 1.6,
    borderColor: "#181818",
    width: 175,
    height: 53,
    paddingTop: 8,
    paddingLeft: 14,
    alignItems: "flex-start",
  },
  editBtnText: {
    color: "#181818",
    fontWeight: "400",
    fontSize: 28,
  },

  previewWrapper: {
    position: "absolute",
    top: 20,          // move slightly higher
    right: 15,         // closer to edge
    zIndex: 0,
  },

  previewBoxBack: {
    position: "absolute",
    left: -190,              // move to left side
    bottom: -345,           // move downward
    width: 144,
    aspectRatio: 5 / 8,
    backgroundColor: "#F3F3F3",
    borderRadius: 2,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    transform: [{ rotate: "187deg" }],
  },

  previewBox: {
    width: 130,                 // 180 × 0.8
    aspectRatio: 5 / 8,
    backgroundColor: "#F3F3F3",
    borderRadius: 2,           // 12 × 0.8 ≈ 10
    borderWidth: 1,
    borderColor: "#E5E5E5",
    transform: [{ rotate: "-7.15deg" }],
  },

  buttonWrapper: {
    position: "absolute",
    bottom: 80,   // FIXED position of buttons
    alignSelf: "center",
  },
});