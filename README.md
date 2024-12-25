<p align="center">
  <a href="https://www.uit.edu.vn/" title="Trường Đại học Công nghệ Thông tin" style="border: none;">
    <img src="https://i.imgur.com/WmMnSRt.png" alt="Trường Đại học Công nghệ Thông tin | University of Information Technology">
  </a>
</p>

<h1 align="center"><b>Công nghệ .NET - SE310</b></h1>

## GIỚI THIỆU MÔN HỌC

-   **Tên môn học:** Công nghệ .NET
-   **Mã môn học:** SE310
-   **Mã lớp:** SE310.P12
-   **Năm học:** HK1 (2024 - 2025)

## GIỚI THIỆU ĐỒ ÁN

-   **Đề tài:** Trang web bán đồ ăn trực tuyến
## CÁCH CÀI ĐẶT
# Yêu cầu
 - Cài đặt dotnet-cli, 
 - MySql local default port 
1. Clone repo 
```
git clone https://github.com/vudinhan2525/SE310-FoodApp.git
```
2. Cd vào folder backend
```
cd .\SE310-FoodApp\backend\
```
3. Trong file backend/appsettings.json
```
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=QUANLYBANDOAN;User=root;Password=<password>" // Đổi user name và password của mysql local
  },
```
4. Tạo database trong mysql
```
CREATE DATABASE quanlybandoan
```
5. Chạy migration
```
dotnet ef migrations add temp21321321sda
dotnet ef database update
```

7. Chạy server nếu đã cài dotnet cli hoặc chạy bằng visual studio
```
dotnet watch
```
8. Truy cập frontend url và sử dụng:
https://foodapp-five-xi.vercel.app/
