Với Docker:  
1)	Tải và cài đặt Docker Desktop, chuẩn bị môi trường WSL2 và Hyper-V tùy theo yêu cầu của phần mềm.  
2)	Clone repo github về.  
3)	Mở CMD, chạy lệnh cd [đường dẫn thư mục image_captioning].  
4)	Chạy lệnh docker compose up.  
5)	Mở Chrome/Firefox/Edge, vào link localhost:3000.  

Không có Docker:  
1)	Tải và cài đặt Python 3.11 và Node.Js và PostgreSQL.  
2)	Khởi tạo cơ sở dữ liệu PostgreSQL với tên “image_captioning” và mật khẩu “19112002”.  
3)	Chạy lệnh cd vào thư mục server_mvc rồi “pip install –r requirements.txt”, sau đó chạy file start.bat để chạy server backend.  
4)	Chạy lệnh cd vào thư mục web rồi “npm install”, sau đó “npm start run” để chạy server node.js frontend.  
5)	Mở Chrome/Firefox/Edge, vào link localhost:3000  
