import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import Svg, { Line } from "react-native-svg";

const PREVIEW_WIDTH = 356;
const PREVIEW_HEIGHT = 616;

export default function CameraCapturePage() {
  const router = useRouter();

  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraReady, setIsCameraReady] = useState(false);

  const handleCapture = async () => {
    if (!permission?.granted) {
      const permissionResult = await requestPermission();

      if (!permissionResult.granted) {
        return;
      }

      return;
    }

    if (!isCameraReady || !cameraRef.current) {
      return;
    }

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.9,
        skipProcessing: false,
      });

      if (!photo?.uri) {
        return;
      }

      router.push({
        pathname: "/scan-presetting",
        params: {
          photoUri: photo.uri,
        },
      });
    } catch (error) {
      console.warn("Failed to capture photo", error);
    }
  };

  const handleOpenCamera = async () => {
    if (!permission?.granted) {
      await requestPermission();
    }
  };

  return (
    <View style={styles.screen}>
      <TouchableOpacity
        activeOpacity={0.75}
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <View style={styles.scanPreview}>
        {permission?.granted ? (
          <CameraView
            ref={cameraRef}
            style={styles.cameraView}
            facing="back"
            onCameraReady={() => setIsCameraReady(true)}
          />
        ) : null}

        <View style={[styles.scanCorner, styles.cornerTopLeft]} />
        <View style={[styles.scanCorner, styles.cornerTopRight]} />
        <View style={[styles.scanCorner, styles.cornerBottomLeft]} />
        <View style={[styles.scanCorner, styles.cornerBottomRight]} />

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.plusButton}
          onPress={handleOpenCamera}
        >
          <Svg width={46} height={46} viewBox="0 0 46 46">
            <Line x1="23" y1="8" x2="23" y2="38" stroke="#000000" strokeWidth={3} />
            <Line x1="8" y1="23" x2="38" y2="23" stroke="#000000" strokeWidth={3} />
          </Svg>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomControls}>
        <TouchableOpacity activeOpacity={0.8} style={styles.thumbnailButton}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=300&q=80",
            }}
            style={styles.thumbnailImage}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.shutterOuter}
          onPress={handleCapture}
        >
          <View style={styles.shutterInner} />
        </TouchableOpacity>

        <View style={styles.controlSpacer} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#000000",
    paddingTop: 65,
  },
  backButton: {
    width: 77,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#000000",
    backgroundColor: "#FFFFFF",
    marginLeft: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  backText: {
    color: "#111111",
    fontSize: 16,
    fontWeight: "300",
    lineHeight: 19,
  },
  scanPreview: {
    width: PREVIEW_WIDTH,
    height: PREVIEW_HEIGHT,
    alignSelf: "center",
    marginTop: 28,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#000000",
    shadowColor: "#8DB3C9",
    shadowOpacity: 0.95,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 0 },
  },
  cameraView: {
    ...StyleSheet.absoluteFillObject,
  },
  scanCorner: {
    position: "absolute",
    width: 34,
    height: 34,
    borderColor: "#000000",
  },
  cornerTopLeft: {
    top: 90,
    left: 15,
    borderTopWidth: 3,
    borderLeftWidth: 3,
  },
  cornerTopRight: {
    top: 90,
    right: 15,
    borderTopWidth: 3,
    borderRightWidth: 3,
  },
  cornerBottomLeft: {
    bottom: 90,
    left: 15,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
  },
  cornerBottomRight: {
    bottom: 90,
    right: 15,
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },
  plusButton: {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: 92.373,
    height: 94.069,
    marginLeft: -46.1865,
    marginTop: -47.0345,
    borderRadius: 47,
    borderWidth: 3,
    borderColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomControls: {
    marginTop: 22,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  thumbnailButton: {
    width: 75,
    height: 72,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#1E1E1E",
  },
  thumbnailImage: {
    width: "100%",
    height: "100%",
  },
  shutterOuter: {
    width: 72,
    height: 72,
    borderRadius: 44,
    borderWidth: 4,
    borderColor: "#939295",
    backgroundColor: "#F0EFF3",
    alignItems: "center",
    justifyContent: "center",
  },
  shutterInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#F0EFF3",
  },
  controlSpacer: {
    width: 75,
    height: 72,
  },
});