import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

const PRIVACY_POINTS = [
  {
    icon: "📍",
    title: "Location",
    desc: "GPS coordinates captured only when SOS is triggered — never in background.",
  },
  {
    icon: "📸",
    title: "Photo",
    desc: "Front-facing snapshot taken silently and encrypted on-device before upload.",
  },
  {
    icon: "🎙️",
    title: "Audio",
    desc: "10-second ambient clip recorded to provide context to your emergency contact.",
  },
];

export default function SosDetailScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const palette = Colors[colorScheme];
  const { mode } = useLocalSearchParams<{ mode: "quick" | "scheduled" }>();

  const isDark = colorScheme === "dark";

  const modeLabel =
    mode === "quick"
      ? "⚡ Quick SOS mode activated"
      : mode === "scheduled"
      ? "🗓️ Scheduled safety check-in detail"
      : "— No mode specified —";

  const modeColor =
    mode === "quick"
      ? "#E53935"
      : mode === "scheduled"
      ? "#0288D1"
      : palette.icon;

  const modeBg =
    mode === "quick"
      ? isDark
        ? "#3B1212"
        : "#FDECEA"
      : mode === "scheduled"
      ? isDark
        ? "#0D2137"
        : "#E1F0FA"
      : isDark
      ? "#1C2023"
      : "#F5F5F5";

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 48,
        gap: 20,
        backgroundColor: palette.background,
      }}
    >
      {/* Back button */}
      <Pressable
        onPress={() => router.back()}
        style={({ pressed }) => ({
          alignSelf: "flex-start",
          flexDirection: "row",
          alignItems: "center",
          gap: 6,
          paddingVertical: 8,
          paddingHorizontal: 14,
          borderRadius: 20,
          borderCurve: "continuous",
          backgroundColor: isDark ? "#1E2326" : "#EEF1F4",
          opacity: pressed ? 0.6 : 1,
        })}
      >
        <Text style={{ fontSize: 16 }}>‹</Text>
        <Text
          style={{
            color: palette.tint,
            fontSize: 15,
            fontWeight: "600",
          }}
        >
          Back
        </Text>
      </Pressable>

      {/* Hero card */}
      <View
        style={{
          borderRadius: 28,
          borderCurve: "continuous",
          padding: 22,
          gap: 10,
          backgroundColor: isDark ? "#1A1D1F" : "#F5F8FA",
          boxShadow: isDark
            ? "0 8px 24px rgba(0,0,0,0.4)"
            : "0 10px 28px rgba(17,24,28,0.09)",
        }}
      >
        <Text
          style={{
            color: "#E53935",
            fontSize: 13,
            textTransform: "uppercase",
            letterSpacing: 1.2,
            fontWeight: "600",
          }}
        >
          RuOK · Emergency Details
        </Text>
        <Text
          style={{
            color: palette.text,
            fontSize: 30,
            lineHeight: 36,
            fontWeight: "800",
          }}
        >
          SOS Emergency Details
        </Text>
        <Text
          style={{
            color: palette.icon,
            fontSize: 15,
            lineHeight: 22,
          }}
        >
          During a real emergency, RuOK captures a brief snapshot of your
          surroundings — location, photo, and audio — to help your trusted
          contacts or responders understand your situation instantly. Data is
          end-to-end encrypted and automatically deleted after 48 hours.
        </Text>
      </View>

      {/* Mode badge */}
      <View
        style={{
          borderRadius: 18,
          borderCurve: "continuous",
          paddingVertical: 16,
          paddingHorizontal: 20,
          backgroundColor: modeBg,
          borderWidth: 1.5,
          borderColor: modeColor + "55",
        }}
      >
        <Text
          selectable
          style={{
            color: modeColor,
            fontSize: 17,
            fontWeight: "700",
            letterSpacing: 0.2,
          }}
        >
          {modeLabel}
        </Text>
        <Text
          style={{
            color: palette.icon,
            fontSize: 13,
            marginTop: 4,
          }}
        >
          Route param: <Text style={{ fontWeight: "600" }}>mode = "{mode}"</Text>
        </Text>
      </View>

      {/* Privacy data capture breakdown */}
      <View style={{ gap: 8 }}>
        <Text
          style={{
            color: palette.text,
            fontSize: 17,
            fontWeight: "700",
            marginBottom: 2,
          }}
        >
          What gets captured
        </Text>
        {PRIVACY_POINTS.map((p) => (
          <View
            key={p.title}
            style={{
              flexDirection: "row",
              gap: 14,
              alignItems: "flex-start",
              borderRadius: 16,
              borderCurve: "continuous",
              padding: 14,
              backgroundColor: isDark ? "#1C2023" : "#FFFFFF",
              borderWidth: 1,
              borderColor: isDark ? "#2B3338" : "#E9EEF3",
              boxShadow: isDark
                ? "0 2px 8px rgba(0,0,0,0.2)"
                : "0 2px 6px rgba(17,24,28,0.05)",
            }}
          >
            <Text style={{ fontSize: 24, lineHeight: 28 }}>{p.icon}</Text>
            <View style={{ flex: 1, gap: 2 }}>
              <Text
                style={{
                  color: palette.text,
                  fontSize: 15,
                  fontWeight: "700",
                }}
              >
                {p.title}
              </Text>
              <Text
                style={{
                  color: palette.icon,
                  fontSize: 13,
                  lineHeight: 19,
                }}
              >
                {p.desc}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Privacy notice */}
      <View
        style={{
          borderRadius: 16,
          borderCurve: "continuous",
          padding: 16,
          gap: 4,
          backgroundColor: isDark ? "#0D2137" : "#E3F2FD",
          borderWidth: 1,
          borderColor: isDark ? "#1565C0" : "#90CAF9",
        }}
      >
        <Text
          style={{
            color: isDark ? "#90CAF9" : "#1565C0",
            fontSize: 13,
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: 0.8,
          }}
        >
          🔒 Privacy by Design
        </Text>
        <Text
          style={{
            color: isDark ? "#BBDEFB" : "#1E3A5F",
            fontSize: 13,
            lineHeight: 19,
          }}
        >
          No data is ever stored or transmitted without explicit SOS activation.
          Your privacy is protected at every step.
        </Text>
      </View>
    </ScrollView>
  );
}
