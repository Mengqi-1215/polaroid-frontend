import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function CustomTabBar({
  state,
  navigation,
}: BottomTabBarProps) {
  const isFocused = (index: number) => state.index === index;

  return (
    <View style={styles.container}>
      {/* Home */}
      <TouchableOpacity onPress={() => navigation.navigate("index")}>
        <View
          style={[
            styles.iconWrapper,
            isFocused(0) && styles.activeIconWrapper,
          ]}
        >
          <Ionicons
            name="home-outline"
            size={24}
            color={isFocused(0) ? "#000" : "#FFF"}
          />
        </View>
      </TouchableOpacity>

      {/* Camera */}
      <TouchableOpacity onPress={() => navigation.navigate("camera")}>
        <View
          style={[
            styles.iconWrapper,
            isFocused(1) && styles.activeIconWrapper,
          ]}
        >
          <Feather
            name="camera"
            size={24}
            color={isFocused(1) ? "#000" : "#FFF"}
          />
        </View>
      </TouchableOpacity>

      {/* Gallery */}
      <TouchableOpacity onPress={() => navigation.navigate("gallery")}>
        <View
          style={[
            styles.iconWrapper,
            isFocused(2) && styles.activeIconWrapper,
          ]}
        >
          <Feather
            name="folder"
            size={20}
            color={isFocused(2) ? "#000" : "#FFF"}
          />
        </View>
      </TouchableOpacity>

      {/* Profile */}
      <TouchableOpacity onPress={() => navigation.navigate("profile")}>
        <View
          style={[
            styles.iconWrapper,
            isFocused(3) && styles.activeIconWrapper,
          ]}
        >
          <FontAwesome
            name="user-o"
            size={22}
            color={isFocused(3) ? "#000" : "#FFF"}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: "#1A1A1A",
    borderRadius: 42,
    paddingHorizontal: 35,
    paddingVertical: 14,
    width: "55%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
  },
  activeIconWrapper: {
    backgroundColor: "#FFFFFF",
  },
});