import { Feather } from "@expo/vector-icons";
import React from "react";
import { Animated, Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

const { width } = Dimensions.get("window");

const TAGS = [
  { key: "recent", label: "Recent Saved" },
  { key: "az", label: "A → Z" },
  { key: "tag", label: "Tag" },
  { key: "most", label: "Most Photos" },
];

const ALBUMS = [
  {
    title: "Summer Trip",
    quote: "Saving warm summer days, wandering moments, and soft memories.",
    date: "05-18/2025-Now",
  },
  {
    title: "Winter Mood",
    quote: "Cold air, warm lights, and quiet nights captured forever.",
    date: "12-02/2024-02-18/2025",
  },
  {
    title: "City Walk",
    quote: "Concrete lines, passing strangers, and golden hour shadows.",
    date: "03-10/2025-04-01/2025",
  },
];

const FONT_FAMILY = Platform.select({
  ios: "Inter",
  android: "Inter",
  default: "Helvetica"
});

export default function Gallery() {
  const activeTag = "recent";
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [phase, setPhase] = React.useState(0);

  const isFirstAlbum = currentIndex === 0;

  const slideAnim = React.useRef(new Animated.Value(0)).current;

  // 2️⃣ Add slight scale interpolation to mainAlbumCard during slide.
  const scaleAnim = slideAnim.interpolate({
    inputRange: [-width, 0, width],
    outputRange: [0.96, 1, 0.96],
  });

  // 1️⃣ Improve animation easing and duration.
  const handleNext = () => {
    Animated.timing(slideAnim, {
      toValue: -width,
      duration: 340,
      easing: require("react-native").Easing.bezier(0.22, 1, 0.36, 1),
      useNativeDriver: true,
    }).start(() => {
      slideAnim.setValue(width);
      setCurrentIndex((prev) => (prev + 1) % ALBUMS.length);
      setPhase((prev) => (prev === 0 ? 1 : 0));

      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 340,
        easing: require("react-native").Easing.bezier(0.22, 1, 0.36, 1),
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF", paddingTop: 40 }}>
      {/* Main Title & Subtitle */}
      <View style={styles.titleBlock}>
        <Text style={styles.title}>Library</Text>

        <TouchableOpacity style={styles.svgButtonInline}>
          <Svg width={30} height={30} viewBox="0 0 30 30">
            <Circle
              cx="15"
              cy="15"
              r="14.6"
              fill="#CB2F2F"
              stroke="#000000"
              strokeWidth="0.8"
            />
            <Path
              d="M8.75 15.1211H21.5"
              stroke="#000000"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <Path
              d="M15.1289 8.74609L15.1289 21.4961"
              stroke="#000000"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </Svg>
        </TouchableOpacity>

        <Text style={styles.subtitle}>Your Digital Photo Book</Text>
      </View>

      {/* Filter Tabs - horizontal, minimal, red dot for active */}
      <View style={styles.tabRow}>
        {TAGS.map((tag) => (
          <TouchableOpacity
            key={tag.key}
            style={styles.tagWrap}
            activeOpacity={0.7}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {tag.key === activeTag && <View style={styles.activeDot} />}
              <Text
                style={[
                  styles.tabText,
                  tag.key === activeTag && styles.tabTextActive
                ]}
              >
                {tag.label}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Stacked Album Card */}
      <View style={styles.albumContainer}>
        {/* Back Album Card 2 (furthest back) */}
        <View style={styles.backAlbumCardTwo}>
          <View style={styles.topBar} />
        </View>

        {/* Back Album Card 1 */}
        <View
          style={[
            styles.backAlbumCardOne,
            phase === 1 && styles.promotedCard
          ]}
        >
          <View style={styles.topBar} />
        </View>

        {/* Main Album Card */}
        <Animated.View
          style={[
            styles.mainAlbumCard,
            {
              transform: [
                { translateX: slideAnim },
                { scale: scaleAnim },
              ],
            },
            phase === 1 && styles.demotedCard
          ]}
        >
          <View style={styles.topBar}>
            <View style={styles.topBorderDateWrap}>
              <Text style={styles.topBorderDateText}>
                {ALBUMS[currentIndex]?.date ?? ""}
              </Text>
            </View>
          </View>
        </Animated.View>

        <View style={styles.bottomSection}>
          <View style={styles.albumRowWrap}>
            <View style={styles.albumTitleRow}>
              <View style={styles.titleAccent} />
              <Text style={styles.albumCardTitle}>
                {ALBUMS[currentIndex]?.title ?? ""}
              </Text>
            </View>
            <Text style={styles.albumQuote} numberOfLines={2}>
              “{ALBUMS[currentIndex]?.quote ?? ""}”
            </Text>
          </View>
        </View>
      </View>

      {/* Footer Nav: Left/Right Arrows */}
      <View style={styles.footerNav}>
        <TouchableOpacity
          style={[
            styles.arrowCircle,
            isFirstAlbum && styles.arrowCircleInactive
          ]}
          disabled={isFirstAlbum}
        >
          <Feather name="arrow-left" size={18} color={isFirstAlbum ? "#A0A0A0" : "#000000"} />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <TouchableOpacity style={styles.arrowCircle} onPress={handleNext}>
          <Feather name="arrow-right" size={18} color="#000000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  svgButton: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
  },
  title: {
    fontSize: 32,
    color: "#242428",
    fontWeight: "500",
    fontFamily: "SF Pro",
    lineHeight: 36,
    letterSpacing: 0,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#1A1A1A",
    fontFamily: "SF Pro",
    fontWeight: "300",
    marginTop: 0,
    lineHeight: 16,
  },
  tabRow: {
    flexDirection: "row",
    marginTop: 25,
    marginLeft: 24,
    marginBottom: 18,
    gap: 18,
  },
  tagWrap: {
    flexDirection: "row",
    alignItems: "center",
    minWidth: 30,
    marginRight: 16,
  },
  tabText: {
    fontSize: 16,
    color: "#000",
    fontFamily: "SF Pro",
    fontWeight: "300",
    lineHeight: 23,
    letterSpacing: -1,
    opacity: 0.6,
  },
  tabTextActive: {
    color: "#000",
    fontWeight: "500",
    opacity: 1,
    letterSpacing: -0.3,
  },
  activeDot: {
    width: 8,
    height: 8,
    backgroundColor: "#CB2F2F",
    borderRadius: 4,
    marginRight: 6,
  },
  albumContainer: {
    marginTop: 32,
    alignSelf: "center",
    width: width - 58,
    height: 427.087,
    position: "relative",
  },
  backAlbumCardTwo: {
    position: "absolute",
    top: -48,
    alignSelf: "center",
    width: "84%",
    height: 400,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 6,
    opacity: 0.5,
    transform: [{ scale: 0.88 }],
    zIndex: 0,
  },
  backAlbumCardOne: {
    position: "absolute",
    top: -28,
    alignSelf: "center",
    width: "92%",
    height: 400,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 6,
    opacity: 0.8,
    transform: [{ scale: 0.94 }],
    zIndex: 1,
  },
  mainAlbumCard: {
    width: "100%",
    height: 400,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 6,
    position: "relative",
    zIndex: 2,
  },
  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: 30,
    backgroundColor: "#000000",
  },
  topBorderDateWrap: {
    position: "absolute",
    right: 12,
    height: 30,
    justifyContent: "center",
  },
  topBorderDateText: {
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: "400",
    fontFamily: FONT_FAMILY,
    letterSpacing: 0,
  },
  albumRowWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  albumTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 0,
    marginRight: 8,
    minHeight: 34,
  },
  titleAccent: {
    width: 4,
    height: 28,
    borderRadius: 3,
    backgroundColor: "#CB2F2F",
    marginRight: 11,
  },
  albumCardTitle: {
    fontSize: 22,
    color: "#000",
    fontWeight: "bold",
    fontFamily: FONT_FAMILY,
    letterSpacing: 0.17,
  },
  albumQuote: {
    flex: 1,
    textAlign: "left",
    marginLeft: 12,
    marginTop: 6,
    fontSize: 14,
    color: "#232323",
    fontFamily: FONT_FAMILY,
    fontStyle: "italic",
    fontWeight: "400",
    opacity: 0.76,
    lineHeight: 20,
  },
  footerNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: width - 48,
    alignSelf: "center",
    position: "absolute",
    bottom: 113,
  },
  arrowCircle: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  arrowCircleInactive: {
    borderColor: "#D0D0D0",
    shadowOpacity: 0,
  },
  titleBlock: {
    marginTop: 36,
    marginLeft: 24,
    marginRight: 24,
    position: "relative"
  },

  svgButtonInline: {
    position: "absolute",
    right: 0,
    top: 6,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  bottomSection: {
    marginTop: 18,
  },
  promotedCard: {
    backgroundColor: "#FFFFFF",
    transform: [{ scale: 1 }],
    opacity: 1,
    zIndex: 2,
  },

  demotedCard: {
    backgroundColor: "rgba(0,0,0,0.8)",
    transform: [{ scale: 0.94 }],
    opacity: 0.8,
    zIndex: 1,
  },
});