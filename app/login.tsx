import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Dimensions, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
import DotGridBg from "../components/DotGridBg";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const emailTrimmed = email.trim();
  const passwordTrimmed = password.trim();
  const emailLooksOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed);
  const canSubmit = emailTrimmed.length > 0 && passwordTrimmed.length > 0 && emailLooksOk && !submitting;

  // iOS Simulator / Web: usually 127.0.0.1 works.
  // Physical phone (Expo Go): must use your computer LAN IP.
  const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || "http://127.0.0.1:3001";

  const { width, height } = Dimensions.get("window");
  const gridHeight = height / 3 + 50;
  const gridTop = height / 3;

  const handleLogin = async () => {
    console.log("[Login] DEV MODE – skipping backend");

    // 🔴 临时跳过后端验证
    login(); // 保持现有 AuthContext 流程
    router.replace("/(tabs)");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <DotGridBg width={width} height={gridHeight} top={gridTop} />

      {/* CENTER TEXT INPUT */}
      <View
        style={{
          position: "absolute",
          zIndex: 5,
          elevation: 5,
          top: gridTop + gridHeight / 2 - 130,
          alignSelf: "center",
          width: 332,
          height: 40,
          paddingHorizontal: 33,
          borderRadius: 44,
          borderWidth: 1,
          borderColor: "#000000",
          backgroundColor: "#FFFFFF",
          justifyContent: "center",
        }}
      >
        <TextInput
          placeholder="Full Name"
          placeholderTextColor="#939295"
          value={fullName}
          onChangeText={setFullName}
          autoCapitalize="words"
          style={{
            fontSize: 18,
            fontWeight: "200",
            color: "#181818",
            padding: 0,
            margin: 0,
          }}
        />
      </View>

      <View
        style={{
          position: "absolute",
          zIndex: 5,
          elevation: 5,
          top: gridTop + gridHeight / 2 - 78,
          alignSelf: "center",
          width: 332,
          height: 40,
          paddingHorizontal: 33,
          borderRadius: 44,
          borderWidth: 1,
          borderColor: loginError ? "#CB2F2F" : "#000000",
          backgroundColor: "#FFFFFF",
          justifyContent: "center",
        }}
      >
        <TextInput
          placeholder="Email"
          placeholderTextColor="#939295"
          value={email}
          onChangeText={(text) => {
            setLoginError(false);
            setEmail(text);
          }}
          autoCapitalize="none"
          keyboardType="email-address"
          style={{
            fontSize: 18,
            fontWeight: "200",
            color: "#181818",
            padding: 0,
            margin: 0,
          }}
        />
      </View>

      <View
        style={{
          position: "absolute",
          zIndex: 5,
          elevation: 5,
          top: gridTop + gridHeight / 2 - 26,
          alignSelf: "center",
          width: 332,
          height: 40,
          paddingHorizontal: 33,
          borderRadius: 44,
          borderWidth: 1,
          borderColor: loginError ? "#CB2F2F" : "#000000",
          backgroundColor: "#FFFFFF",
          justifyContent: "center",
        }}
      >
        <TextInput
          placeholder="Password"
          placeholderTextColor="#939295"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => {
            setLoginError(false);
            setPassword(text);
          }}
          autoCapitalize="none"
          style={{
            fontSize: 18,
            fontWeight: "200",
            color: "#181818",
            padding: 0,
            margin: 0,
          }}
        />
      </View>

      {/* KEEP SIGNED IN */}
      <View
        style={{
          position: "absolute",
          top: gridTop + gridHeight / 2 + 24,
          width: 332,
          alignSelf: "center",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Pressable
          onPress={() => setKeepSignedIn(!keepSignedIn)}
          style={{
            width: 14,
            height: 14,
            marginRight: 8,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: 14,
              height: 14,
              borderRadius: 7,
              backgroundColor: keepSignedIn ? "#CB2F2F" : "transparent",
              borderWidth: 1,
              borderColor: "#CB2F2F",
            }}
          />
        </Pressable>

        <Text
          style={{
            color: "#1A1A1A",
            fontSize: 18,
            fontWeight: "200",
            lineHeight: 22,
          }}
        >
          Keep me signed in
        </Text>
      </View>

      {/* TITLE */}
      <View
        style={{
          position: "absolute",
          top: height * 0.2 + 20,
          left: 36,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 3,
            height: 38,
            backgroundColor: "#CB2F2F",
            borderRadius: 1.5,
            marginRight: 12,
          }}
        />
        <Text
          style={{
            color: "#181818",
            fontSize: 38,
            fontWeight: "400",
          }}
        >
          Log in
        </Text>
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
          onPress={() => {
            // DEV MODE: always allow navigation
            handleLogin();
          }}
          disabled={false}
          activeOpacity={0.85}
          style={{
            borderRadius: 24,
            backgroundColor: "#FFFFFF",
            paddingHorizontal: 40,
            paddingVertical: 14,
            flexDirection: "row",
            alignItems: "center",
            opacity: 1,
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
            {submitting ? <ActivityIndicator size="small" /> : <Feather name="arrow-right" size={18} color="#181818" />}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}