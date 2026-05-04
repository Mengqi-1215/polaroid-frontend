import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Profile() {
  const router = useRouter();
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  const handlePickAvatar = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission needed",
        "Please allow photo library access to upload a profile image."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.9,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.hiText}>Hi</Text>
            <Text style={styles.nameText}>Emma</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handlePickAvatar}
            style={styles.avatarOuter}
          >
            {avatarUri ? (
              <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatarPlaceholder} />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.accountSection}>
          <SectionTitle title="Account" />

          <View style={styles.itemList}>
            <Text style={styles.itemText}>Signed in as Emma</Text>
            <TouchableOpacity activeOpacity={0.75}>
              <Text style={styles.itemText}>Sign Out</Text>
            </TouchableOpacity>
            <Text style={styles.itemText}>Cloud Backup (v2.0)</Text>
          </View>
        </View>

        <View style={styles.preferenceSection}>
          <SectionTitle title="Preferences" />

          <View style={styles.itemList}>
            <SettingRow
              title="Scan Preferences"
              showArrow
              onPress={() => router.push("/scan-presetting")}
            />
            <SettingRow title="Language" showArrow />
            <SettingRow title="Date Format" />
          </View>
        </View>
      </View>
    </View>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <View style={styles.sectionTitleRow}>
      <View style={styles.redBar} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

function SettingRow({
  title,
  showArrow = false,
  onPress,
}: {
  title: string;
  showArrow?: boolean;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={showArrow ? 0.75 : 1}
      onPress={onPress}
      style={styles.settingRow}
    >
      <Text style={styles.itemText}>{title}</Text>
      {showArrow ? <Text style={styles.arrow}>›</Text> : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  hiText: {
    color: "#202026",
    fontSize: 32,
    fontWeight: "800",
    lineHeight: 36,
    letterSpacing: -1,
  },
  nameText: {
    color: "#202026",
    fontSize: 32,
    fontWeight: "200",
    lineHeight: 40,
    letterSpacing: -1,
  },
  avatarOuter: {
    width: 60,
    height: 60,
    borderRadius: 60,
    borderWidth: 0.5,
    borderColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -1,
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#000000",
  },
  accountSection: {
    marginTop: 58,
  },
  preferenceSection: {
    marginTop: 54,
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  redBar: {
    width: 4,
    height: 22,
    borderRadius: 2,
    backgroundColor: "#E13232",
    marginRight: 8,
  },
  sectionTitle: {
    color: "#050505",
    fontSize: 23,
    fontWeight: "800",
    letterSpacing: -0.8,
  },
  itemList: {
    marginTop: 14,
    paddingLeft: 15,
  },
  itemText: {
    color: "#171717",
    fontSize: 18,
    fontWeight: "300",
    lineHeight: 44,
  },
  settingRow: {
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  arrow: {
    color: "#111827",
    fontSize: 32,
    fontWeight: "200",
    lineHeight: 38,
    marginRight: 38,
  },
});