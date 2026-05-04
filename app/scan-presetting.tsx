import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const SAMPLE_PHOTO_URI =
  "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?q=80&w=1200&auto=format&fit=crop";

export default function ScanPresettingScreen() {
  const router = useRouter();
  const [processStep, setProcessStep] = useState<1 | 2>(1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (processStep !== 2) return;

    setProgress(0);

    const timer = setInterval(() => {
      setProgress((current) => {
        if (current >= 100) {
          clearInterval(timer);
          return 100;
        }

        return current + 1;
      });
    }, 60);

    return () => clearInterval(timer);
  }, [processStep]);

  const handleBack = () => {
    if (processStep === 2) {
      setProgress(0);
      setProcessStep(1);
      return;
    }

    router.back();
  };

  return (
    <View style={styles.safeArea}>

      <View style={styles.screenContent}>

        <View style={styles.topActions}>
          <TouchableOpacity
            activeOpacity={0.78}
            style={styles.backButton}
            onPress={handleBack}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.78} style={styles.exportButton}>
            <Text style={styles.exportButtonText}>Export</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.previewArea}>
          <PolaroidPreview />
        </View>

        {processStep === 1 ? (
          <View style={styles.bottomActionsRow}>
            <TouchableOpacity
              activeOpacity={0.86}
              style={styles.autoCard}
              onPress={() => {
                setProgress(0);
                setProcessStep(2);
              }}
            >
              <View style={styles.redDivider} />

              <View style={styles.autoTextGroup}>
                <Text style={styles.autoTitle}>Auto</Text>
                <Text style={styles.autoSubtitle}>Process</Text>
              </View>

              <View style={styles.arrowCircle}>
                <Text style={styles.arrowText}>→</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.86} style={styles.editCard}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.processPanel}>
            <View style={styles.processPanelTop}>
              <View style={styles.redDivider} />

              <View style={styles.autoTextGroup}>
                <Text style={styles.autoTitle}>Auto</Text>
                <Text style={styles.autoSubtitle}>Process</Text>
              </View>

              <Text style={styles.progressText}>{progress}%</Text>
            </View>

            <View style={styles.processTabs}>
              <View style={[styles.tabProgressFill, { width: `${progress}%` }]} />
              <TouchableOpacity activeOpacity={0.85} style={styles.tabActive}>
                <Text style={styles.tabActiveText}>Size</Text>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.85} style={styles.tabItem}>
                <Text style={styles.tabText}>Color</Text>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.85} style={styles.tabItem}>
                <Text style={styles.tabText}>Mode</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

      </View>
    </View>
  );
}

function PolaroidPreview() {
  return (
    <View style={styles.polaroidWrap}>
      <View style={[styles.paperShadow, styles.paperShadowBack, styles.paperShadowThird]} />
      <View style={[styles.paperShadow, styles.paperShadowMiddle]} />

      <View style={styles.polaroidPaper}>
        <Image source={{ uri: SAMPLE_PHOTO_URI }} style={styles.polaroidImage} />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0A0708",
  },
  screenContent: {
    flex: 1,
    position: "relative",
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  topActions: {
    position: "absolute",
    top: 65,
    left: 24,
    right: 24,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    width: 77,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#000000",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonText: {
    color: "#171717",
    fontSize: 16,
    fontWeight: "300",
    letterSpacing: 0.2,
  },
  exportButton: {
    width: 91,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#000000",
    backgroundColor: "#CB2F2F",
    alignItems: "center",
    justifyContent: "center",
  },
  exportButtonText: {
    color: "#171717",
    fontSize: 16,
    fontWeight: "300",
    letterSpacing: 0.2,
  },
  previewArea: {
    position: "absolute",
    top: 103,
    left: 0,
    right: 0,
    bottom: 132,
    alignItems: "center",
    justifyContent: "center",
  },
  polaroidWrap: {
    width: 328.366,
    height: 551.225,
    position: "relative",
    alignItems: "center",
  },
  paperShadow: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#DFDFDB",
    opacity: 0.95,
  },
  paperShadowBack: {
    width: 306.541,
    height: 550.981,
    top: -18,
    left: (328.366 - 306.541) / 2,
  },
  paperShadowThird: {
    backgroundColor: "#B0B0B0",
  },
  paperShadowMiddle: {
    width: 321.741,
    height: 550.981,
    top: -9,
    left: (328.366 - 321.741) / 2,
  },
  polaroidPaper: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F3F3F3",
    paddingTop: 38.17,
    paddingHorizontal: 20.13,
    paddingBottom: 126.52,
  },
  polaroidImage: {
    width: 288.04,
    height: 386.535,
    resizeMode: "cover",
  },
  bottomActionsRow: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 70,
    height: 72,
    flexDirection: "row",
    gap: 10,
  },
  autoCard: {
    width: 211,
    height: 72,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },
  redDivider: {
    width: 3,
    height: 42,
    borderRadius: 2,
    backgroundColor: "#E13232",
    marginRight: 10,
  },
  autoTextGroup: {
    flex: 1,
  },
  autoTitle: {
    color: "#050505",
    fontSize: 23,
    fontWeight: "700",
    lineHeight: 24,
  },
  autoSubtitle: {
    color: "#333333",
    fontSize: 22,
    fontWeight: "200",
    lineHeight: 23,
  },
  arrowCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#222222",
    alignItems: "center",
    justifyContent: "center",
  },
  arrowText: {
    color: "#151515",
    fontSize: 25,
    fontWeight: "200",
    marginTop: -2,
  },
  editCard: {
    width: 129,
    height: 72,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    backgroundColor: "rgba(0, 0, 0, 0.28)",
    alignItems: "center",
    justifyContent: "center",
  },
  editText: {
    color: "#FFFFFF",
    fontSize: 29,
    fontWeight: "200",
  },
  processPanel: {
    position: "absolute",
    left: 24,
    bottom: 46,
    width: 350,
    height: 96,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
  },
  processPanelTop: {
    width: 350,
    height: 72,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 14,
    paddingRight: 20,
  },
  progressText: {
    color: "#050505",
    fontSize: 39,
    fontWeight: "200",
    letterSpacing: -1.2,
  },
  processTabs: {
    width: 350,
    height: 24,
    position: "relative",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopWidth: 0.744,
    borderTopColor: "#000000",
    backgroundColor: "#F0EFF3",
    flexDirection: "row",
    overflow: "hidden",
  },
  tabProgressFill: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#CB2F2F",
    zIndex: 0,
  },
  tabActive: {
    width: 350 / 3,
    height: 24,
    borderBottomLeftRadius: 12,
    backgroundColor: "transparent",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 10,
    zIndex: 1,
  },
  tabActiveText: {
    color: "#444444",
    fontSize: 16,
    fontWeight: "200",
  },
  tabItem: {
    width: 350 / 3,
    height: 24,
    backgroundColor: "transparent",
    borderLeftWidth: 0.744,
    borderColor: "#181818",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 10,
    zIndex: 1,
  },
  tabText: {
    color: "#444444",
    fontSize: 16,
    fontWeight: "200",
  },
});