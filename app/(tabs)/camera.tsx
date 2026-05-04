// import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Circle, Path, Text as SvgText } from "react-native-svg";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const PREVIEW_RATIO = 1.27; // 高度/宽度
const GALLERY_CELL_MARGIN = 2;
const GRID_COLS = 3;
const PREVIEW_PADDING = 14;

const WOOD_BG_URI =
  "https://your-image-url-here.com/your-image.jpg"; // ← Replace with your own image URL

const galleryData = Array(12)
  .fill(0)
  .map((_, i) => ({ id: i + 1 }));

export default function Camera() {
  const [selected, setSelected] = useState<number[]>([]);
  const [bgUri, setBgUri] = useState(WOOD_BG_URI);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const parent = navigation.getParent();
      parent?.setOptions({ tabBarStyle: { display: "none" } });
    });

    const unsubscribeBlur = navigation.addListener("blur", () => {
      const parent = navigation.getParent();
      parent?.setOptions({ tabBarStyle: undefined });
    });

    return () => {
      unsubscribe();
      unsubscribeBlur();
    };
  }, [navigation]);

  // 响应式单元格尺寸
  const cellSize =
    (SCREEN_WIDTH - GALLERY_CELL_MARGIN * 2 * (GRID_COLS - 1)) /
    GRID_COLS;

  const handleImportImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setBgUri(result.assets[0].uri);
    }
  };

  const renderGalleryItem = ({ item, index }: { item: any; index: number }) => {
    const isSelected = selected.includes(index);
    return (
      <TouchableOpacity
        activeOpacity={0.82}
        onPress={() => {
          setSelected(prev =>
            prev.includes(index)
              ? prev.filter(i => i !== index) // deselect if already selected
              : [...prev, index] // add to selection
          );
        }}
        style={[
          styles.galleryItem,
          {
            width: cellSize,
            height: cellSize,
            margin: GALLERY_CELL_MARGIN,
            backgroundColor: isSelected ? "#222325" : "#ededed",
            borderTopLeftRadius: index === 0 ? 25 : 0,
            borderTopRightRadius: index === GRID_COLS - 1 ? 25 : 0,
          },
        ]}
      >
        {/* 右下角小圆圈 */}
        <View style={styles.galleryItemCircleWrap}>
          <View
            style={[
              styles.galleryItemCircle,
              isSelected
                ? styles.galleryItemCircleSelected
                : styles.galleryItemCircleUnselected,
            ]}
          >
            {isSelected ? (
              <Text style={styles.galleryCircleNumber}>
                {selected.indexOf(index) + 1}
              </Text>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* 上部预览区 */}
      <View style={styles.previewSectionOuter}>
        <ImageBackground
          source={{ uri: bgUri }}
          style={styles.woodBg}
          imageStyle={styles.woodBgImage}
          resizeMode="cover"
        >
          {/* 左上角 Back 按钮 */}
          <TouchableOpacity
            style={[styles.backButton, { top: insets.top + 24 }]}
            activeOpacity={0.7}
            onPress={() => router.replace("/")}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          {/* 左下角步进器 */}
          <View style={styles.stepperContainer}>
            <View style={styles.stepperGroup}>
              <Svg width={124.68} height={40.89} viewBox="0 0 125 41">
                <Path
                  d="
M104.236 0
C115.529 0 124.683 9.15484 124.683 20.4473
C124.683 31.7397 115.529 40.8936 104.236 40.8936
C97.0968 40.8936 90.8127 37.234 87.1558 31.6887
C86.285 30.3682 84.8708 29.4473 83.2891 29.4473
C81.7073 29.4473 80.2931 30.3682 79.4224 31.6887
C75.7655 37.2341 69.4813 40.8934 62.3418 40.8936
C55.2022 40.8936 48.9181 37.234 45.2612 31.6887
C44.3905 30.3682 42.9763 29.4473 41.3946 29.4473
C39.8128 29.4473 38.3986 30.3682 37.5278 31.6887
C33.871 37.2341 27.5868 40.8934 20.4473 40.8936
C9.15484 40.8936 0 31.7397 0 20.4473
C0 9.15473 9.15473 0 20.4473 0
C27.587 0 33.8712 3.66005 37.5279 9.20578
C38.3986 10.5263 39.8128 11.4473 41.3946 11.4473
C42.9763 11.4473 44.3904 10.5263 45.2611 9.20582
C48.9179 3.66008 55.202 0 62.3418 0
C69.4815 0 75.7657 3.66005 79.4224 9.20578
C80.2932 10.5263 81.7074 11.4473 83.2891 11.4473
C84.8708 11.4473 86.285 10.5263 87.1557 9.20582
C90.8125 3.66008 97.0965 0 104.236 0
Z
                  "
                  fill="#FFF"
                  stroke="#000"
                  strokeWidth="1"
                />
                <Circle
                  cx="62.3418"
                  cy="20.4473"
                  r="17"
                  fill="#000"
                />
                <SvgText
                  x="20.4473"
                  y="20.4473"
                  dy="1"
                  fontSize="17"
                  fontWeight="200"
                  fill="#000"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                >
                  1
                </SvgText>
                <SvgText
                  x="62.3418"
                  y="20.4473"
                  dy="1"
                  fontSize="17"
                  fontWeight="200"
                  fill="#FFF"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                >
                  2
                </SvgText>
                <SvgText
                  x="104.236"
                  y="20.4473"
                  dy="1"
                  fontSize="17"
                  fontWeight="200"
                  fill="#000"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                >
                  3
                </SvgText>
              </Svg>
            </View>
          </View>
          {/* 右下角 Import 按钮 */}
          <TouchableOpacity
            style={[styles.importButton, { bottom: 24 }]}
            activeOpacity={0.8}
            onPress={handleImportImage}
          >
            <Text style={styles.importButtonText}>Import</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
      {/* 下部网格选择区 */}
      <View style={styles.gallerySection}>
        <FlatList
          data={galleryData}
          renderItem={renderGalleryItem}
          keyExtractor={item => item.id.toString()}
          numColumns={GRID_COLS}
          scrollEnabled={false}
          contentContainerStyle={styles.galleryContainer}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingTop: 0,
  },

  // 上部预览区
  previewSectionOuter: {
    width: SCREEN_WIDTH,
    aspectRatio: 45 / 61,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
    overflow: "hidden",
    marginBottom: 22,
  },
  woodBg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    width: "100%",
    height: "100%",
  },
  woodBgImage: {
    width: "100%",
    height: "100%",
    opacity: 0.91,
  },

  // 胶囊 Back 按钮 (左上角)
  backButton: {
    position: "absolute",
    left: 24,

    width: 77,
    height: 28,

    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#000",

    backgroundColor: "#FFF",

    alignItems: "center",
    justifyContent: "center",

    zIndex: 10,
  },
  backButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "300",
    letterSpacing: 0.2,
  },


  // 步进器 (左下角) 连接胶囊式
  stepperContainer: {
    position: "absolute",
    left: 24,
    bottom: 24,
    zIndex: 8,
  },

  stepperGroup: {
    width: 124.68,
    height: 40.89,
    alignItems: "center",
    justifyContent: "center",
  },

  // Import 按钮 (右下角红色)
  importButton: {
    position: "absolute",
    bottom: 24,
    right: 24,

    width: 119,
    height: 40.162,

    borderRadius: 17.85,
    backgroundColor: "#CB2F2F",

    alignItems: "center",
    justifyContent: "center",
  },
  importButtonText: {
    color: "#fff",
    fontSize: 27,
    fontWeight: "300",
    letterSpacing: 0.2,
    textAlign: "center",
    includeFontPadding: false,
    textAlignVertical: "center",
  },

  // 下部 Gallery Grid 选择区
  gallerySection: {
    flex: 1,
    backgroundColor: "#181818",
    borderRadius: 0,
    marginTop: 0,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  galleryContainer: {
    justifyContent: "flex-start",
    alignItems: "stretch",
    flexGrow: 1,
    paddingBottom: 0,
  },
  galleryItem: {
    borderRadius: 0,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    overflow: "hidden",
    position: "relative",
  },
  galleryItemCircleWrap: {
    position: "absolute",
    bottom: 8,
    right: 8,
  },
  galleryItemCircle: {
    width: 21,
    height: 21,
    borderRadius: 11.5,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.3,
  },
  galleryItemCircleUnselected: {
    borderColor: "#181818",
    backgroundColor: "transparent",
  },
  galleryItemCircleSelected: {
    borderColor: "#fff",
    backgroundColor: "#fff",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.07,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 1.5,
      },
      android: {},
    }),
  },
  galleryCircleNumber: {
    color: "#1c1c1c",
    fontWeight: "200",
    fontSize: 13,
  },
});