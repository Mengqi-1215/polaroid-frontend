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
            name={isFocused(0) ? "home" : "home-outline"}
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
    width: "50%",
    flexDirection: "row",
    backgroundColor: "#1A1A1A",
    borderRadius: 42,
    height: 50,
    paddingHorizontal: 22,
    justifyContent: "center",
    alignItems: "center",
    gap: 11,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  activeIconWrapper: {
    backgroundColor: "#FFFFFF",
  },
});