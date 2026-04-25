import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useRouter } from 'expo-router';
import OnboardingScreen from '../app/(tabs)/onboarding'; // Mày check lại path này cho chuẩn nhé

// 1. Mock cái useRouter của expo-router để kiểm tra vụ chuyển trang cuối
const mockReplace = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
}));

// 2. Mock useColorScheme để tránh lỗi render linh tinh
jest.mock('@/hooks/use-color-scheme', () => ({
  useColorScheme: jest.fn(() => 'light'),
}));

describe('OnboardingScreen Testing', () => {
  
  beforeEach(() => {
    mockReplace.mockClear(); // Xóa lịch sử gọi hàm trước mỗi lần test
  });

  // Test Case 1: Kiểm tra xem màn hình đầu tiên có hiện đúng không
  it('nên render bước 1 với lời chào Welcome', () => {
    const { getByText } = render(<OnboardingScreen />);
    
    // Check tiêu đề màn 1
    expect(getByText(/Hi buddy, Welcome/i)).toBeTruthy();
    // Check nút Next có hiện không
    expect(getByText('Next')).toBeTruthy();
  });

  // Test Case 2: Kiểm tra logic bấm nút Next để chuyển Step
  it('nên chuyển sang bước 2 khi nhấn nút Next', () => {
    const { getByText } = render(<OnboardingScreen />);
    
    const nextButton = getByText('Next');
    fireEvent.press(nextButton);

    // Sau khi bấm Next 1 lần, nó phải hiện nội dung của Step 2
    expect(getByText('2 Ways We Keep You Safe')).toBeTruthy();
    expect(getByText('Check-in daily')).toBeTruthy();
    expect(getByText('SOS')).toBeTruthy();
  });

  // Test Case 3: Kiểm tra bước cuối cùng và chuyển hướng về Home
  it('nên hiện nút Get Started ở bước cuối và gọi router.replace("/home")', () => {
    const { getByText } = render(<OnboardingScreen />);
    
    const nextButton = getByText('Next');
    
    // Bấm Next 2 lần để tới bước cuối (màn hình có 3 bước)
    fireEvent.press(nextButton); // Lên bước 2
    fireEvent.press(nextButton); // Lên bước 3

    // Ở bước cuối, nút phải đổi text thành "Get Started"
    const getStartedButton = getByText('Get Started');
    expect(getStartedButton).toBeTruthy();

    // Bấm Get Started
    fireEvent.press(getStartedButton);

    // Kiểm tra xem nó có gọi lệnh chuyển sang màn hình Home không
    expect(mockReplace).toHaveBeenCalledWith('/home');
  });

});