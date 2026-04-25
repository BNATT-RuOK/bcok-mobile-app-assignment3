import { useRouter } from "expo-router";
import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

// Nội dung chuẩn theo thiết kế mày đưa
const ONBOARDING_STEPS = [
  {
    title: "Hi buddy, Welcome\nto RuOK!",
    description:
      "Explore the app, your 24/7 safety net away from home. One tap for peace of mind, easing every worry!",
    bgColor: "#A5A6FF", // Màu tím nhạt màn 1
  },
  {
    title: "2 Ways We Keep You Safe",
    description:
      "Enjoy your independence. Combining routine updates with instant emergency alerts.",
    bgColor: "#FFFFFF",
    features: [
      {
        title: "Check-in daily",
        desc: "Let your family know you're safe with just one tap. No more nagging phone calls!",
        color: "#C6F6D5", // Xanh lá nhạt
        emoji: "☀️",
      },
      {
        title: "SOS",
        desc: "Get immediate help. Instantly share your live location and surroundings with trusted contacts.",
        color: "#FED7D7", // Đỏ nhạt
        emoji: "🔔",
      },
    ],
  },
  {
    title: "Your Privacy,\nOur Priority",
    description:
      "Just a few quick steps before we start! RuOK needs access to your Location and Media to work perfectly in emergencies.",
    bgColor: "#FFFFFF",
  },
] as const;

export default function OnboardingScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? "light";
  const palette = Colors[colorScheme];
  const { width } = useWindowDimensions();

  const [currentStepIndex, setCurrentStepIndex] = React.useState(0);
  const currentStep = ONBOARDING_STEPS[currentStepIndex];
  const isLastStep = currentStepIndex === ONBOARDING_STEPS.length - 1;

  const goToNextStep = () => {
    if (isLastStep) {
      router.replace("/home");
    } else {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: currentStep.bgColor }]}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Phần nội dung Text */}
        <View style={styles.textContent}>
          <Text style={[styles.title, { color: currentStepIndex === 0 ? "white" : "#1A1C1E" }]}>
            {currentStep.title}
          </Text>
          <Text style={[styles.description, { color: currentStepIndex === 0 ? "white" : "#6B7280" }]}>
            {currentStep.description}
          </Text>
        </View>

        {/* Layout đặc biệt cho Step 2 (2 cái Card) */}
        {currentStepIndex === 1 && (
          <View style={styles.featureContainer}>
            {currentStep.features?.map((f, i) => (
              <View key={i} style={[styles.featureCard, { backgroundColor: f.color }]}>
                <Text style={{ fontSize: 32, marginBottom: 8 }}>{f.emoji}</Text>
                <Text style={styles.featureTitle}>{f.title}</Text>
                <Text style={styles.featureDesc}>{f.desc}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Chỗ này mày bảo bỏ qua con meerkat nên tao để trống để mày nhét Image sau */}
        <View style={styles.imagePlaceholder} />

      </ScrollView>

      {/* Footer chứa Indicators và Buttons */}
      <View style={styles.footer}>
        {/* Page Indicators */}
        <View style={styles.indicatorContainer}>
          {ONBOARDING_STEPS.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                { 
                  backgroundColor: index === currentStepIndex ? "#1A1C1E" : "#D1D5DB",
                  width: index === currentStepIndex ? 12 : 8 
                },
              ]}
            />
          ))}
        </View>

        {/* Buttons */}
        <View style={styles.buttonWrapper}>
          <Pressable 
            onPress={goToNextStep} 
            style={[styles.primaryButton, { backgroundColor: "#2E236C" }]}
          >
            <Text style={styles.primaryButtonText}>
              {isLastStep ? "Get Started" : "Next"}
            </Text>
          </Pressable>

          {isLastStep && (
            <Pressable 
              onPress={() => router.replace("/login")} 
              style={styles.secondaryButton}
            >
              <Text style={styles.secondaryButtonText}>Log In</Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 30,
    paddingTop: 80,
    paddingBottom: 150, // Chừa chỗ cho footer
  },
  textContent: {
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    lineHeight: 42,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.9,
  },
  featureContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 40,
  },
  featureCard: {
    flex: 1,
    padding: 16,
    borderRadius: 20,
    minHeight: 180,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 6,
    color: "#1A1C1E",
  },
  featureDesc: {
    fontSize: 11,
    lineHeight: 16,
    color: "#4B5563",
  },
  imagePlaceholder: {
    height: 250, // Chỗ này sau mày nhét con Meerkat vào
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  indicatorContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 25,
  },
  indicator: {
    height: 8,
    borderRadius: 4,
  },
  buttonWrapper: {
    width: '100%',
    gap: 12,
  },
  primaryButton: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: "700",
  },
  secondaryButton: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "#1A1C1E",
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: "#1A1C1E",
    fontSize: 16,
    fontWeight: "600",
  },
});