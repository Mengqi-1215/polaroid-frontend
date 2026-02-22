import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const PLACEHOLDER_IMAGES = [
  "https://pub-c1e4e5b151e64a3ca4a4f9001123221f.r2.dev/public%3Awelcome%3A1.jpg",
  "https://pub-c1e4e5b151e64a3ca4a4f9001123221f.r2.dev/public%3Awelcome%3A2.jpg",
  "https://pub-c1e4e5b151e64a3ca4a4f9001123221f.r2.dev/public%3Awelcome%3A3.jpg",
];

const FILM_SIZES = [
  {
    width: 108,   // instax mini (54x86 x2)
    height: 172,
    imageWidth: 92,
    imageHeight: 124,
  },
  {
    width: 144,   // instax square (72x86 x2 outer)
    height: 172,
    imageWidth: 124, // 62x62 x2
    imageHeight: 124,
  },
  {
    width: 216,   // instax wide (108x86 x2 outer)
    height: 172,
    imageWidth: 198,  // 99x62 x2
    imageHeight: 124,
  },
];

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
  const rows = Math.ceil(height / spacing) + 5;
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
   Welcome Page
========================= */

export default function Welcome() {
  const router = useRouter();
  const { width, height } = Dimensions.get("window");

  const gridHeight = height / 3 + 50;
  const gridTop = height / 3; // centered vertically (1/3 top, 1/3 grid, 1/3 bottom)

  const handleStart = () => {
    router.push("/login");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <DotGridBg width={width} height={gridHeight} top={gridTop} />

      {/* TITLE */}
      <View
        style={{
          position: "absolute",
          top: height * 0.20,  // moved downward
          left: 36,
        }}
      >
        <Text
          style={{
            color: "#181818",
            fontSize: 38,
            fontWeight: "200",
            marginBottom: -8,
          }}
        >
          Welcome to
        </Text>
        <Text
          style={{
            color: "#181818",
            fontSize: 38,
            fontWeight: "400",
          }}
        >
          Polaroid
        </Text>
      </View>

      {/* POLAROID STACK */}
      <View
        style={{
          position: "absolute",
          top: gridTop + gridHeight / 2 - FILM_SIZES[0].height / 2,
          width: "100%",
          height: FILM_SIZES[0].height,
          alignItems: "center",
        }}
      >
        {/* MINI - CENTER */}
        <View
          style={{
            position: "absolute",
            shadowColor: "#000",
            shadowOpacity: 0.25,
            shadowRadius: 0.66,
            shadowOffset: { width: 0, height: 0.66 },
            elevation: 2,
            transform: [{ rotate: "-7.6deg" }],
            zIndex: 2,
          }}
        >
          <View
            style={{
              width: FILM_SIZES[0].width,
              height: FILM_SIZES[0].height,
              backgroundColor: "#FFFFFF",
              borderRadius: 2,
              paddingTop: 14,
              paddingHorizontal: 8,
              paddingBottom: 30,
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: PLACEHOLDER_IMAGES[0] }}
              style={{
                width: FILM_SIZES[0].imageWidth,
                height: FILM_SIZES[0].imageHeight,
                borderRadius: 2,
                backgroundColor: "#E5E5E5",
              }}
            />
          </View>
        </View>

        {/* SQUARE - LEFT */}
        <View
          style={{
            position: "absolute",
            left: width / 2 - FILM_SIZES[0].width / 2 - FILM_SIZES[1].width * 1.3,
            shadowColor: "#000",
            shadowOpacity: 0.25,
            shadowRadius: 0.66,
            shadowOffset: { width: 0, height: 0.66 },
            elevation: 2,
            transform: [{ scale: 1.15 }, { rotate: "4.18deg" }],
            zIndex: 1,
          }}
        >
          <View
            style={{
              width: FILM_SIZES[1].width,
              height: FILM_SIZES[1].height,
              backgroundColor: "#FFFFFF",
              borderRadius: 2,
              paddingTop: 14,
              paddingHorizontal: 8,
              paddingBottom: 30,
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: PLACEHOLDER_IMAGES[1] }}
              style={{
                width: FILM_SIZES[1].imageWidth,
                height: FILM_SIZES[1].imageHeight,
                borderRadius: 2,
                backgroundColor: "#E5E5E5",
              }}
            />
          </View>
        </View>

        {/* WIDE - RIGHT */}
        <View
          style={{
            position: "absolute",
            right: -(FILM_SIZES[2].width * 0.4),
            shadowColor: "#000",
            shadowOpacity: 0.25,
            shadowRadius: 0.66,
            shadowOffset: { width: 0, height: 0.66 },
            elevation: 2,
            transform: [{ rotate: "6.2deg" }],
            zIndex: 1,
          }}
        >
          <View
            style={{
              width: FILM_SIZES[2].width * 0.9,
              height: FILM_SIZES[0].height,
              backgroundColor: "#FFFFFF",
              borderRadius: 2,
              paddingTop: 14,
              paddingHorizontal: 8,
              paddingBottom: 30,
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: PLACEHOLDER_IMAGES[2] }}
              style={{
                width: FILM_SIZES[2].imageWidth * 0.9,
                height: FILM_SIZES[2].imageHeight * 0.9,
                borderRadius: 2,
                backgroundColor: "#E5E5E5",
              }}
            />
          </View>
        </View>
      </View>

      {/* START BUTTON */}
      <View
        style={{
          position: "absolute",
          bottom: height * 0.18,
          alignSelf: "flex-end",
          right: 16,
        }}
      >
        <TouchableOpacity
          onPress={handleStart}
          activeOpacity={0.85}
          style={{
            borderRadius: 24,
            backgroundColor: "#FFFFFF",
            paddingHorizontal: 40,
            paddingVertical: 14,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "300",
              letterSpacing: 0.4,
              marginRight: 12,
              color: "#181818",
            }}
          >
            Start
          </Text>
          <View
            style={{
              width: 34,
              height: 34,
              borderRadius: 17,
              borderWidth: 1,
              borderColor: "#181818",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Feather name="arrow-right" size={18} color="#181818" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}