import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const palette = Colors[colorScheme];
  const isDark = colorScheme === "dark";

  // Mock data theo cái hình mày gửi
  const CONTACT_CHECKINS = [
    {
      id: 1,
      name: "Khanh Dinh",
      time: "12:00 PM",
      date: "Today",
      status: "safe",
    },
    {
      id: 2,
      name: "Dang Tuan",
      time: "13:05 PM",
      date: "Today",
      status: "warning",
    },
    { id: 3, name: "Cam Van", time: "06:00 AM", date: "Today", status: "safe" },
    {
      id: 4,
      name: "Khanh Dinh",
      time: "12:00 PM",
      date: "Today",
      status: "danger",
    },
  ];

  const YOUR_CHECKINS = [
    { id: 1, type: "Daily safe checkin", time: "12:00 PM", date: "Today" },
    { id: 2, type: "Daily safe checking", time: "07:00 PM", date: "Yesterday" },
  ];

  return (
    <ScrollView
      style={{ backgroundColor: isDark ? "#121212" : "#F8F9FA" }}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* --- HEADER --- */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.avatarPlaceholder}>
            <Ionicons name="person" size={24} color="#6366F1" />
          </View>
          <View>
            <Text style={[styles.greeting, { color: palette.text }]}>
              Hello, Van!
            </Text>
            <Text style={styles.subGreeting}>How are you today?</Text>
          </View>
        </View>
        <View style={styles.headerIcons}>
          <Pressable style={styles.iconButton}>
            <Ionicons
              name="notifications-outline"
              size={24}
              color={palette.text}
            />
          </Pressable>
          <Pressable style={styles.iconButton}>
            <Ionicons name="settings-outline" size={24} color={palette.text} />
          </Pressable>
        </View>
      </View>

      {/* --- SAFETY CARD --- */}
      <View
        style={[
          styles.safetyCard,
          { backgroundColor: isDark ? "#1E2923" : "#ECF9F1" },
        ]}
      >
        <View style={styles.safetyStatus}>
          <View>
            <View style={styles.statusRow}>
              <Ionicons
                name="checkmark-circle-outline"
                size={24}
                color="#4CAF50"
              />
              <Text style={styles.statusTitle}>You are safe</Text>
            </View>
            <Text style={styles.statusSub}>Everything looks good</Text>
          </View>
          <Image
            source={{
              uri: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
            }}
            style={styles.illustration}
          />
        </View>

        <View style={styles.nextCheckinBox}>
          <Ionicons name="time-outline" size={20} color="#5C5C5C" />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.nextLabel}>Next check-in</Text>
            <Text style={styles.nextTime}>8:00 PM</Text>
          </View>
        </View>

        <Pressable style={styles.checkinButton}>
          <Text style={styles.checkinButtonText}>Check-in now</Text>
        </Pressable>
      </View>

      {/* --- EMERGENCY SOS --- */}
      <Pressable
        onPress={() => router.push("/sos-detail?mode=quick")}
        style={({ pressed }) => [
          styles.sosCardContainer,
          {
            opacity: pressed ? 0.9 : 1,
            backgroundColor: isDark ? "#2D1616" : "#FFF1F1",
          },
        ]}
      >
        {/* Nhóm Icon và Text bên trái */}
        <View style={styles.sosLeftGroup}>
          <View style={styles.sosIconCircle}>
            <Ionicons name="location" size={22} color="white" />
          </View>
          <View style={styles.sosTextContent}>
            <Text style={styles.sosTitle}>Emergency SOS</Text>
            <Text style={styles.sosSub}>Quick access to help</Text>
          </View>
        </View>

        {/* Mũi tên bên phải */}
        <Ionicons name="chevron-forward" size={24} color="#D32F2F" />
      </Pressable>
      {/* --- CONTACT'S CHECKINS --- */}
      <Text style={[styles.sectionTitle, { color: palette.text }]}>
        Contact's recent Check-ins
      </Text>
      {CONTACT_CHECKINS.map((item) => (
        <View
          key={item.id}
          style={[
            styles.listItem,
            { backgroundColor: getStatusBg(item.status, isDark) },
          ]}
        >
          <View style={styles.listLeft}>
            <View style={[styles.listIconCircle, { backgroundColor: "white" }]}>
              {renderStatusIcon(item.status)}
            </View>
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDate}>{item.date}</Text>
            </View>
          </View>
          <Text style={styles.itemTime}>{item.time}</Text>
        </View>
      ))}

      {/* --- YOUR CHECKINS --- */}
      <Text
        style={[styles.sectionTitle, { color: palette.text, marginTop: 20 }]}
      >
        Your recent Check-ins
      </Text>
      {YOUR_CHECKINS.map((item) => (
        <View
          key={item.id}
          style={[
            styles.listItem,
            { backgroundColor: isDark ? "#1E1E1E" : "#F1F8F5" },
          ]}
        >
          <View style={styles.listLeft}>
            <View style={[styles.listIconCircle, { backgroundColor: "white" }]}>
              <Ionicons name="checkmark-outline" size={18} color="#4CAF50" />
            </View>
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.itemName}>{item.type}</Text>
              <Text style={styles.itemDate}>{item.date}</Text>
            </View>
          </View>
          <Text style={styles.itemTime}>{item.time}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

// Helper functions cho UI
const getStatusBg = (status: string, isDark: boolean) => {
  if (isDark) {
    if (status === "warning") return "#2D2816";
    if (status === "danger") return "#2D1616";
    return "#1A1D1B";
  }
  if (status === "warning") return "#FFF9EB";
  if (status === "danger") return "#FFF1F1";
  return "#F1F8F5";
};

const renderStatusIcon = (status: string) => {
  if (status === "warning")
    return <Ionicons name="shield-outline" size={18} color="#FFA000" />;
  if (status === "danger")
    return <Ionicons name="alert-outline" size={18} color="#D32F2F" />;
  return <Ionicons name="checkmark-outline" size={18} color="#4CAF50" />;
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarPlaceholder: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "#E0E7FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  greeting: {
    fontSize: 20,
    fontWeight: "800",
  },
  subGreeting: {
    fontSize: 14,
    color: "#8E8E93",
  },
  headerIcons: {
    flexDirection: "row",
    gap: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  safetyCard: {
    borderRadius: 28,
    padding: 24,
    marginBottom: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  safetyStatus: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statusTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1A1C1E",
  },
  statusSub: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
  illustration: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  nextCheckinBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.6)",
    padding: 12,
    borderRadius: 16,
    marginTop: 20,
  },
  nextLabel: {
    fontSize: 12,
    color: "#6B7280",
  },
  nextTime: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2E236C",
  },
  checkinButton: {
    backgroundColor: "#2E236C",
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 20,
  },
  checkinButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  sosCardContainer: {
    flexDirection: "row", // Ép nằm ngang
    justifyContent: "space-between", // Đẩy text sang trái, mũi tên sang phải
    alignItems: "center", // Căn giữa theo chiều dọc
    padding: 16,
    borderRadius: 20,
    marginBottom: 25,
    marginTop: 25,
    // Đổ bóng nhẹ cho giống ảnh
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  sosLeftGroup: {
    flexDirection: "row", // Icon và Text cũng nằm ngang với nhau
    alignItems: "center",
  },
  sosIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#EF4444",
    justifyContent: "center",
    alignItems: "center",
  },
  sosTextContent: {
    marginLeft: 12, // Khoảng cách giữa icon và chữ
  },
  sosTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#D32F2F",
  },
  sosSub: {
    fontSize: 14,
    color: "#D32F2F",
    opacity: 0.7,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 15,
    paddingLeft: 4,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 18,
    marginBottom: 10,
  },
  listLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  listIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  itemName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1C1E",
  },
  itemDate: {
    fontSize: 12,
    color: "#8E8E93",
  },
  itemTime: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1A1C1E",
  },
});
