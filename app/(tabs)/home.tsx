import { router } from "expo-router";
import React from "react";
import {
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

const CHECK_IN_STATS = [
  { label: "Days Active", value: "14" },
  { label: "SOS Alerts", value: "0" },
  { label: "Contacts", value: "3" },
] as const;

const RECENT_ACTIVITY = [
  "✅ Daily check-in completed — Today 8:02 AM",
  "📍 Location saved — Yesterday 11:45 PM",
  "🔔 Reminder sent to emergency contact",
] as const;

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const palette = Colors[colorScheme];
  const { width } = useWindowDimensions();
  const isCompact = width < 420;
  const isDark = colorScheme === "dark";

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 48,
        gap: 20,
        backgroundColor: palette.background,
      }}
    >
      {/* Hero greeting */}
      <View
        style={{
          borderRadius: 28,
          borderCurve: "continuous",
          padding: 22,
          gap: 10,
          backgroundColor: isDark ? "#1A1D1F" : "#F5F8FA",
          boxShadow: isDark
            ? "0 8px 20px rgba(0,0,0,0.35)"
            : "0 10px 24px rgba(17,24,28,0.08)",
        }}
      >
        <Text
          selectable
          style={{
            color: "#E53935",
            fontSize: 13,
            textTransform: "uppercase",
            letterSpacing: 1.2,
            fontWeight: "600",
          }}
        >
          RuOK · Ban Co On Khong?
        </Text>
        <Text
          selectable
          style={{
            color: palette.text,
            fontSize: 30,
            lineHeight: 36,
            fontWeight: "800",
          }}
        >
          Stay Safe,{"\n"}Stay Connected 🛡️
        </Text>
        <Text
          selectable
          style={{
            color: palette.icon,
            fontSize: 15,
            lineHeight: 23,
            maxWidth: "95%",
          }}
        >
          Passive daily check-ins, one-tap SOS, and privacy-first emergency
          response — all designed for students and night-shift workers.
        </Text>
      </View>

      {/* Stats */}
      <View style={{ gap: 10 }}>
        <Text
          selectable
          style={{ color: palette.text, fontSize: 17, fontWeight: "700" }}
        >
          Safety Snapshot
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
          {CHECK_IN_STATS.map((stat) => (
            <View
              key={stat.label}
              style={{
                width: isCompact ? "100%" : "31%",
                minHeight: 88,
                borderRadius: 18,
                borderCurve: "continuous",
                padding: 14,
                justifyContent: "space-between",
                backgroundColor: isDark ? "#202427" : "#FFFFFF",
                borderWidth: 1,
                borderColor: isDark ? "#2D353A" : "#E8EDF1",
                boxShadow: isDark
                  ? "0 2px 8px rgba(0,0,0,0.2)"
                  : "0 2px 6px rgba(17,24,28,0.05)",
              }}
            >
              <Text selectable style={{ color: palette.icon, fontSize: 12 }}>
                {stat.label}
              </Text>
              <Text
                selectable
                style={{
                  color: palette.text,
                  fontSize: 28,
                  lineHeight: 30,
                  fontWeight: "700",
                  fontVariant: ["tabular-nums"],
                }}
              >
                {stat.value}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* ── Emergency Tools ── */}
      <View
        style={{
          borderRadius: 24,
          borderCurve: "continuous",
          padding: 20,
          gap: 14,
          backgroundColor: isDark ? "#200D0D" : "#FFF5F5",
          borderWidth: 1.5,
          borderColor: isDark ? "#5C1A1A" : "#FFCDD2",
          boxShadow: isDark
            ? "0 6px 18px rgba(229,57,53,0.25)"
            : "0 6px 18px rgba(229,57,53,0.10)",
        }}
      >
        <View style={{ gap: 4 }}>
          <Text
            style={{
              color: "#E53935",
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: 1.2,
              fontWeight: "700",
            }}
          >
            🚨 Emergency Tools
          </Text>
          <Text
            style={{
              color: palette.text,
              fontSize: 18,
              fontWeight: "700",
            }}
          >
            SOS & Emergency Settings
          </Text>
          <Text
            style={{
              color: palette.icon,
              fontSize: 13,
              lineHeight: 19,
            }}
          >
            Configure your SOS mode, verify your contacts, and review what data
            is captured during an emergency.
          </Text>
        </View>

        {/* Open SOS Details button */}
        <Pressable
          onPress={() => router.push("/sos-detail?mode=quick")}
          style={({ pressed }) => ({
            minHeight: 52,
            borderRadius: 16,
            borderCurve: "continuous",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            gap: 8,
            backgroundColor: "#E53935",
            opacity: pressed ? 0.82 : 1,
            boxShadow: "0 4px 14px rgba(229,57,53,0.35)",
          })}
        >
          <Text style={{ fontSize: 18 }}>⚡</Text>
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 16,
              fontWeight: "700",
              letterSpacing: 0.2,
            }}
          >
            Open SOS Details
          </Text>
        </Pressable>
      </View>

      {/* Recent activity */}
      <View style={{ gap: 10 }}>
        <Text
          selectable
          style={{ color: palette.text, fontSize: 17, fontWeight: "700" }}
        >
          Recent Activity
        </Text>
        {RECENT_ACTIVITY.map((item) => (
          <View
            key={item}
            style={{
              borderRadius: 14,
              borderCurve: "continuous",
              paddingHorizontal: 14,
              paddingVertical: 12,
              backgroundColor: isDark ? "#1C2023" : "#FFFFFF",
              borderWidth: 1,
              borderColor: isDark ? "#2B3338" : "#E9EEF3",
            }}
          >
            <Text
              selectable
              style={{ color: palette.text, fontSize: 14, lineHeight: 21 }}
            >
              {item}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
