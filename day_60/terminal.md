# Các bước làm việc với Sequelize CLI

- Cài đặt sequelize: _npm i sequelize_

- Cài đặt sequelize-cli: _npm i --save-dev sequelize-cli_

- Khởi tạo: _npx sequelize-cli init_

File: config/config.json -> Config database theo các môi trường khác nhau

## Migration là gì?

- File xây dựng cấu trúc của các table trong Database
- Khi làm việc với Database -> Không thao tác trực tiếp trên CSDL mà sẽ thông qua các file migration
- Tác dụng:

* Bảo mật
* Quản lý phiên bản Database (rollback)
* Chia sẻ CSDL giữa các thành viên trong Team

## Tạo Model bằng CLI

npx sequelize-cli model:generate --name TenModel --attributes tenfield1:kieudulieu, tenfield2:kieudulieu,tenfield3:kieudulieu

Ví dụ:

npx sequelize-cli model:generate --name Customer --attributes id:number,name:string

## Tạo riêng Migration (Áp dụng khi sửa cấu trúc bảng)

_npx sequelize migration:generate --name=tenMigration_

Lưu ý: Tên migration viết tường minh

## Chạy Migrate

_npx sequelize-cli db:migrate_

## Undo Migrate

Khôi phục phiên bản trước của Database

_npx sequelize-cli db:migrate:undo_

_npx sequelize-cli db:migrate:undo:all_ -> Reset Database về trạng thái chưa có bảng nào

## Seeder là gì?

- Tạo ra các dữ liệu mẫu để test

## Tạo file Seeder

_npx sequelize-cli seed:generate --name=tenfileseed_

Lưu ý: Tường minh

## Chạy Seeder

_npx sequelize-cli db:seed:all_

## Undo Seeder

_npx sequelize-cli db:seed:undo:all_

# Thông tin SMTP

- HOST: smtp.gmail.com
- Username: hoangan@fullstack.edu.vn
- Password: xawy cdle xyzo cyio
- Port: 465 hoặc 587
- Secure: ssl hoặc tls -> ssl nếu port là 465, tls nếu port là 587
