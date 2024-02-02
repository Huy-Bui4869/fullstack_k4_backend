# cấu hình cho dự án

# 1_tạo cấu trúc folder

_npm i -g express-generator_
_express --view=ejs_
_npm install_

# 2_tạo folder: controllers và models

_mkdir controllers_
_mkdir models_

# 3_Cài các package cần thiết

- dotenv
- nodemon
- express-session
- connect-flash
- express-ejs-layouts
- bcrypt => băm mật khẩu
<!-- - yup_dùng để validate. -->
- postgres

npm i dotenv nodemon express-session connect-flash express-ejs-layouts postgres

# 4_setup

- tại file package.json

++ thay đổi `node` thành `nodemon`
==> "start": "node ./bin/www" ==> "start": "nodemon ./bin/www"

<!--
"type": "module" => đổi từ require() sang imporrt
"dev": "nodemon app" => chạy thông qua nodemon, không qua nodejs nữa => tự động restart mỗi khi thay đổi.
-->

- tạo file views/layout.js

- tại file app.js
  import các gói { dotenv, express-session, connect-flash, express-ejs-layouts }

# 5_Các bước làm việc với Sequelize CLI

- Cài đặt sequelize: _npm i sequelize_
  _npm install --save pg pg-hstore_
- Cài đặt sequelize-cli: _npm i --save-dev sequelize-cli_
- Khởi tạo: _npx sequelize-cli init_ =>> sinh ra 1 loạt các folder (config, migrations, seeders).

File: config/config.json -> Config database theo các môi trường khác nhau
cài gói hỗ trợ:

# 6_Tạo môt số file

.env \_ tạo biến môi trường
.gitignore => Có thể hiểu đơn giản là git sẽ bỏ qua file hoặc một tập các file trong project của chúng ta khi commit và push lên repository.

# 7_Thiết lập để sử dụng biến môi trường

<!-- npm i dotenv -->

- Thêm vào file app.js để sử dụng nhiều chỗ.
  `require("dotenv").config();`

- Tại file config.json
  ++ chuyển đuôi file `config.json` thành `.js`
  <!-- mặc dù file app đã gọi env file config vẫn phải gọi-->

  ++ gọi env: `require("dotenv").config();`

- Để sequelize nhận file config.js cần chỉnh sửa thêm.
  ++ tại file models/index.js

trước:
const config = require(**dirname + '/../config/config.json')[env];
sau:
const config = require(**dirname + '/../config/config.js')[env];

++ Tạo file .sequelizerc
_https://sequelize.org/docs/v6/other-topics/migrations/_

# 8_Tạo Database

## Cấu trúc yêu cầu.

Table providers => Hình thức đăng nhập

- id
- name

Table users => thông tin user đăng nhập

- id
- name
- email
- password
- provider*id*đang sử dụng provider nào.

## 8.1_Tạo database trống

- có 2 cách:
  ++ tạo trên pgAdmin
  ++ dùng câu lệnh: _npx sequelize db:create_ => Tự động tạo database.

=> có 1 table được tạo tự động trong pgAdmin.

## 8.2_Tạo table thông qua migrations.

- sử dụng các câu lệnh trong file terminal.md
  ==> video*64*--:25:00

## 8.3_Tạo các dữ liệu mẫu

- sử dụng các câu lệnh trong file terminal.md
  ==> video_64_02:01:00

# 9_Tạo model bằng CLI, có sẵn template code:

_npx sequelize-cli model:generate --name Mail --attributes id:integer_

<!--
- Giải thích: Mail_Tên model
- Tên model có 1 số nguyên tắc sau: 'Viết hoa' + 'danh từ' + 'số ít'. -->

==> Tạo và cấu hình models.

- tạo model User và Provider

npm i passport passport-local passport-google-oauth20
