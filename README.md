[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=BNATT-RuOK_bcok-mobile-app-assignment3&metric=coverage)](https://sonarcloud.io/summary/new_code?id=BNATT-RuOK_bcok-mobile-app-assignment3)


# RuOK - Personal Safety Mobile App

**RuOK** là ứng dụng di động hỗ trợ an toàn cá nhân 24/7, giúp người dùng giữ kết nối với người thân thông qua các tính năng Check-in định kỳ và cảnh báo SOS khẩn cấp

---

## 👥 Đội ngũ thực hiện (BNATT-RuOK)

* **Phan Thị Cẩm Vân** - 2313873
* **Nguyễn Văn Trung** - 2213705
* **Kim Nhật Tuấn** - 2213771
* **Đặng Minh Tuấn** - 2213765
* **Đinh Ngọc Khánh** - 2311501

---

## 🛠 Hướng dẫn chạy dự án locally

### 1. Cài đặt môi trường
Đảm bảo máy bạn đã cài Node.js (v20+) và Expo CLI

```bash
# Cài đặt dependencies
npm install --legacy-peer-deps
```

### 2. Chạy ứng dụng
```bash
npx expo start
```

---

## 🧪 Hướng dẫn chạy Unit Test (Local)


* **Chạy tất cả các test cases:**
  ```bash
  npm test
  # hoặc
  npx jest
  ```
* **Chạy test và xem báo cáo Coverage chi tiết:**
  ```bash
  npx jest --coverage
  ```
* **Xem báo cáo HTML:** Sau khi chạy lệnh coverage, mở file `./coverage/lcov-report/index.html` bằng trình duyệt

---

## 📊 Phân tích chất lượng Code (SonarCloud)
Dự án được tích hợp tự động với SonarCloud để theo dõi các chỉ số Metrics

* **Các chỉ số cam kết:**
    * **Coverage:** $\ge 70\%$ (Hiện tại đạt ~74.5%).
    * **Quality Gate:** Passed
    * **Reliability/Security:** Rating A

---

## 🤖 CI/CD Pipeline
Hệ thống sử dụng **GitHub Actions** để tự động hóa quy trình kiểm thử:
1. **Trigger:** Tự động chạy khi có code mới được `push` hoặc `pull request` vào nhánh `main`.
2. **Workflow:** * Cài đặt môi trường Node.js.
    * Chạy Jest Unit Test & sinh báo cáo Coverage.
    * Gửi dữ liệu phân tích lên SonarCloud.
    * Upload Artifact `test-report` để lưu trữ báo cáo.

---
