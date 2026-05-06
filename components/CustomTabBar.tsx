import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";

export default function CustomTabBar({
  state,
  navigation,
}: BottomTabBarProps) {
  const currentRoute = state.routes[state.index].name;

  if (currentRoute === "camera") {
    return null;
  }

  const isActive = (routeName: string) => currentRoute === routeName;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("index")}>
        <View
          style={[
            styles.iconWrapper,
            isActive("index") && styles.activeIconWrapper,
          ]}
        >
          {isActive("index") ? <ActiveHomeIcon /> : <InactiveHomeIcon />}
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("gallery")}>
        <View
          style={[
            styles.iconWrapper,
            isActive("gallery") && styles.activeIconWrapper,
          ]}
        >
          {isActive("gallery") ? <ActiveFolderIcon /> : <InactiveFolderIcon />}
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("profile")}>
        <View
          style={[
            styles.iconWrapper,
            isActive("profile") && styles.activeIconWrapper,
          ]}
        >
          {isActive("profile") ? <ActiveProfileIcon /> : <InactiveProfileIcon />}
        </View>
      </TouchableOpacity>
    </View>
  );
}

function ActiveHomeIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Path
        d="M17.9813 8.47461L16.3501 6.84448V2.84961C16.3501 2.23086 15.8438 1.72461 15.2251 1.72461H14.1001C13.4813 1.72461 12.9751 2.23086 12.9751 2.84961V3.47173L10.7251 1.22398C10.418 0.933734 10.1367 0.599609 9.6001 0.599609C9.06347 0.599609 8.78222 0.933734 8.4751 1.22398L1.21885 8.47461C0.867848 8.84023 0.600098 9.10686 0.600098 9.59961C0.600098 10.233 1.0861 10.7246 1.7251 10.7246H2.8501V17.4746C2.8501 18.0934 3.35635 18.5996 3.9751 18.5996H6.2251C6.84642 18.5996 7.3501 18.0959 7.3501 17.4746V12.9746C7.3501 12.3559 7.85635 11.8496 8.4751 11.8496H10.7251C11.3438 11.8496 11.8501 12.3559 11.8501 12.9746V17.4746C11.8501 18.0959 11.7913 18.5996 12.4126 18.5996H15.2251C15.8438 18.5996 16.3501 18.0934 16.3501 17.4746V10.7246H17.4751C18.1141 10.7246 18.6001 10.233 18.6001 9.59961C18.6001 9.10686 18.3323 8.84023 17.9813 8.47461Z"
        fill="#000000"
        stroke="#000000"
        strokeWidth={1.2}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function InactiveHomeIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Path
        d="M17.9813 8.47461L16.3501 6.84448V2.84961C16.3501 2.23086 15.8438 1.72461 15.2251 1.72461H14.1001C13.4813 1.72461 12.9751 2.23086 12.9751 2.84961V3.47173L10.7251 1.22398C10.418 0.933734 10.1367 0.599609 9.6001 0.599609C9.06347 0.599609 8.78222 0.933734 8.4751 1.22398L1.21885 8.47461C0.867848 8.84023 0.600098 9.10686 0.600098 9.59961C0.600098 10.233 1.0861 10.7246 1.7251 10.7246H2.8501V17.4746C2.8501 18.0934 3.35635 18.5996 3.9751 18.5996H6.2251C6.84642 18.5996 7.3501 18.0959 7.3501 17.4746V12.9746C7.3501 12.3559 7.85635 11.8496 8.4751 11.8496H10.7251C11.3438 11.8496 11.8501 12.3559 11.8501 12.9746V17.4746C11.8501 18.0959 11.7913 18.5996 12.4126 18.5996H15.2251C15.8438 18.5996 16.3501 18.0934 16.3501 17.4746V10.7246H17.4751C18.1141 10.7246 18.6001 10.233 18.6001 9.59961C18.6001 9.10686 18.3323 8.84023 17.9813 8.47461Z"
        stroke="#FFFFFF"
        strokeWidth={1.2}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function InactiveFolderIcon() {
  return (
    <Svg width={21} height={21} viewBox="0 0 21 21" fill="none">
      <Path
        d="M3.59969 3.59961V1.79961C3.59969 1.13687 4.13695 0.599609 4.79969 0.599609H16.1997C16.8624 0.599609 17.3997 1.13687 17.3997 1.79961V6.59961M0.600633 17.5406L0.600723 8.41629C0.600729 7.50237 0.600389 6.20064 0.600098 5.25809C0.599893 4.59517 1.13723 4.0584 1.80014 4.0584H7.51836L10.2834 7.01204H18.5997C19.2624 7.01204 19.7997 7.54932 19.7997 8.21207L19.7994 17.5407C19.7993 18.8662 18.7248 19.9407 17.3994 19.9407L3.00063 19.9406C1.67514 19.9406 0.60062 18.8661 0.600633 17.5406Z"
        stroke="#FFFFFF"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function ActiveFolderIcon() {
  return (
    <Svg width={21} height={21} viewBox="0 0 21 21" fill="none">
      <Path
        d="M0.600723 8.41629L0.600633 17.5406C0.60062 18.8661 1.67514 19.9406 3.00063 19.9406L17.3994 19.9407C18.7248 19.9407 19.7993 18.8662 19.7994 17.5407L19.7997 8.21207C19.7997 7.54932 19.2624 7.01204 18.5997 7.01204H10.2834L7.51836 4.0584H1.80014C1.13723 4.0584 0.599893 4.59517 0.600098 5.25809C0.600389 6.20064 0.600729 7.50237 0.600723 8.41629Z"
        fill="#000000"
      />
      <Path
        d="M3.59969 3.59961V1.79961C3.59969 1.13687 4.13695 0.599609 4.79969 0.599609H16.1997C16.8624 0.599609 17.3997 1.13687 17.3997 1.79961V6.59961M0.600633 17.5406L0.600723 8.41629C0.600729 7.50237 0.600389 6.20064 0.600098 5.25809C0.599893 4.59517 1.13723 4.0584 1.80014 4.0584H7.51836L10.2834 7.01204H18.5997C19.2624 7.01204 19.7997 7.54932 19.7997 8.21207L19.7994 17.5407C19.7993 18.8662 18.7248 19.9407 17.3994 19.9407L3.00063 19.9406C1.67514 19.9406 0.60062 18.8661 0.600633 17.5406Z"
        stroke="#000000"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function InactiveProfileIcon() {
  return (
    <Svg width={21} height={21} viewBox="0 0 21 21" fill="none">
      <Path
        d="M0.599976 18.712C0.599976 14.9365 3.75426 11.8758 10.2 11.8758C16.6457 11.8758 19.8 14.9365 19.8 18.712C19.8 19.3127 19.3617 19.7996 18.8212 19.7996H1.5788C1.03821 19.7996 0.599976 19.3127 0.599976 18.712Z"
        stroke="#FFFFFF"
        strokeWidth={1.2}
      />
      <Path
        d="M13.8 4.19961C13.8 6.18783 12.1882 7.79961 10.2 7.79961C8.21175 7.79961 6.59997 6.18783 6.59997 4.19961C6.59997 2.21138 8.21175 0.599609 10.2 0.599609C12.1882 0.599609 13.8 2.21138 13.8 4.19961Z"
        stroke="#FFFFFF"
        strokeWidth={1.2}
      />
    </Svg>
  );
}

function ActiveProfileIcon() {
  return (
    <Svg width={21} height={21} viewBox="0 0 21 21" fill="none">
      <Path
        d="M0.599976 18.712C0.599976 14.9365 3.75426 11.8758 10.2 11.8758C16.6457 11.8758 19.8 14.9365 19.8 18.712C19.8 19.3127 19.3617 19.7996 18.8212 19.7996H1.5788C1.03821 19.7996 0.599976 19.3127 0.599976 18.712Z"
        fill="#000000"
      />
      <Path
        d="M13.8 4.19961C13.8 6.18783 12.1882 7.79961 10.2 7.79961C8.21175 7.79961 6.59997 6.18783 6.59997 4.19961C6.59997 2.21138 8.21175 0.599609 10.2 0.599609C12.1882 0.599609 13.8 2.21138 13.8 4.19961Z"
        fill="#000000"
      />
      <Path
        d="M0.599976 18.712C0.599976 14.9365 3.75426 11.8758 10.2 11.8758C16.6457 11.8758 19.8 14.9365 19.8 18.712C19.8 19.3127 19.3617 19.7996 18.8212 19.7996H1.5788C1.03821 19.7996 0.599976 19.3127 0.599976 18.712Z"
        stroke="#000000"
        strokeWidth={1.2}
      />
      <Path
        d="M13.8 4.19961C13.8 6.18783 12.1882 7.79961 10.2 7.79961C8.21175 7.79961 6.59997 6.18783 6.59997 4.19961C6.59997 2.21138 8.21175 0.599609 10.2 0.599609C12.1882 0.599609 13.8 2.21138 13.8 4.19961Z"
        stroke="#000000"
        strokeWidth={1.2}
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    width: 146,
    height: 50,
    flexDirection: "row",
    backgroundColor: "#000000",
    borderRadius: 46.383,
    paddingHorizontal: 4,
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 42,
    justifyContent: "center",
    alignItems: "center",
  },
  activeIconWrapper: {
    backgroundColor: "#FFFFFF",
  },
});