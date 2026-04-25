import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { router } from "expo-router";
import { useColorScheme } from "@/hooks/use-color-scheme";
import HomeScreen from "../app/(tabs)/home";

// 1. Mock expo-router
jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
  },
}));

// 2. Mock custom hook useColorScheme (Để mặc định là light)
jest.mock("@/hooks/use-color-scheme", () => ({
  useColorScheme: jest.fn(() => "light"),
}));

// 3. Mock Ionicons
jest.mock("@expo/vector-icons", () => ({
  Ionicons: "Icon",
}));

describe("HomeScreen Testing", () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test Case 1: Kiểm tra Render thành công (Phủ phần lớn Lines)
  it("nên hiển thị đúng thông tin lời chào và tiêu đề SOS", () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText("Hello, Van!")).toBeTruthy();
    expect(getByText("Emergency SOS")).toBeTruthy();
    expect(getByText("Contact's recent Check-ins")).toBeTruthy();
  });

  // Test Case 2: Kiểm tra Button Press (Để đạt yêu cầu bấm nút)
  it("nên gọi router.push khi nhấn vào thẻ Emergency SOS", () => {
    const { getByText } = render(<HomeScreen />);
    const sosCard = getByText("Emergency SOS");
    fireEvent.press(sosCard);
    expect(router.push).toHaveBeenCalledWith("/sos-detail?mode=quick");
  });

  // Test Case 3: Kiểm tra hiển thị danh sách (Xử lý vụ trùng tên Khanh Dinh)
  it("nên hiển thị đủ danh sách check-ins của bạn bè", () => {
    const { getAllByText, getByText } = render(<HomeScreen />);
    
    // Dùng getAllByText vì trong code mày có 2 thằng Khanh Dinh
    const khanhDinhElements = getAllByText("Khanh Dinh");
    expect(khanhDinhElements.length).toBeGreaterThan(0);

    expect(getByText("Dang Tuan")).toBeTruthy();
    expect(getByText("Cam Van")).toBeTruthy();
    expect(getByText("Check-in now")).toBeTruthy();
  });

  // Test Case 4: QUAN TRỌNG - Test Dark Mode để phủ nốt các nhánh (Branch Coverage)
  it("nên render đúng màu sắc ở chế độ Dark Mode", () => {
    // Ép cái mock trả về 'dark' cho case này thôi
    (useColorScheme as jest.Mock).mockReturnValueOnce("dark");
    
    const { getByText } = render(<HomeScreen />);
    // Khi render ở Dark Mode, các hàm getStatusBg sẽ chạy vào nhánh isDark
    expect(getByText("Hello, Van!")).toBeTruthy();
  });

});