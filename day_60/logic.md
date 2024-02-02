-> Hàm findOrCreate \_ tìm thấy sẽ lấy thông tin,k thấy tạo mới.

# Xây dựng chức năng quên mật khẩu

## Xây dựng form quên mật khẩu (Forgot Password)

- Nhận email từ client
- Kiểm tra email có tồn tại trong Database hay không?
- Tạo token (không nên dùng jwt). md5(Math.random() + new Date().getTime())

* Cập nhật token vào trong table users (feild: reset_token) và thời gian hết hạn (feild: expired_token)

* Gửi email cho user (Trong email có link để đặt lại mật khẩu)

Cấu trúc link: http://tenmiencuaban/reset-password?token=abc

## Xây dựng form đặt lại mật khẩu (Reser Password)

- Kiểm tra token có khớp với database hay không? (kiểm tra cả expired)
- Nếu hợp lệ --> Lấy thông tin user theo token --> Hiển thị form đặt lại mật khẩu

* Mật khẩu mới
* Nhập lại mật khẩu mới

- xử lý cập nhật mật khẩu cho user.
- xóa token khỏi database.
- Gửi email thông báo cho user.
