import { useRouter } from "expo-router"; // 1. Import cái này
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol.ios";
import { Image } from "expo-image";
import { Pressable } from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme"; // 2. Để lấy isDark

export default function NotFoundScreen() {
  const router = useRouter(); // 3. Khởi tạo router
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      // Nếu không back được nữa thì ép nó về trang Onboarding hoặc Home
      // Thay "/" bằng path trang chính của mày
      router.replace("/"); 
    }
  };

  return (
    <ThemedView className="flex-1 items-center justify-center px-4">
      <Image
        source={require("@assets/images/react-logo.png")}
        alt="Not Found"
        className="mb-4 h-40 w-40 object-contain"
        // Nếu muốn xoay thì dùng animation của tailwind hoặc style riêng nhé
      />
      
      <Pressable
        onPress={handleBack} // 4. Dùng hàm handleBack đã check canGoBack
        style={({ pressed }) => ({
          flexDirection: "row",
          alignItems: "center",
          gap: 6,
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 20,
          backgroundColor: isDark ? "#1E2326" : "#EEF1F4",
          opacity: pressed ? 0.6 : 1,
          marginBottom: 20,
        })}
      >
        <IconSymbol name="arrow.left" size={20} color={isDark ? "white" : "black"} />
        <ThemedText className="font-medium">Quay lại trang chủ</ThemedText>
      </Pressable>

      <ThemedText className="text-2xl font-bold">
        Ơ kìa, lạc đường rồi!
      </ThemedText>
      <ThemedText className="mt-2 text-center">
        Mày chưa tạo file trong folder app cho cái route này nên nó mới nhảy vào đây đấy.
      </ThemedText>
    </ThemedView>
  );
}