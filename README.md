# 🧪 BaseCamp NFT Checker

Một dự án đơn giản bằng TypeScript + Parcel dùng để kiểm tra xem một địa chỉ ví EVM (trên mạng Base) có từng "enlist" hay không thông qua subgraph trên The Graph.

## 🚀 Yêu cầu cài đặt

- Node.js >= 16
- npm
- Trình duyệt Chrome / Firefox

## 📦 Cài đặt dự án

```bash
git clone <repo_url> # hoặc giải nén thư mục này nếu bạn tải từ ZIP
cd basecamp-nft-checker
npm install
```

## 🛠️ Biên dịch TypeScript

```bash
npx tsc
```

## ▶️ Chạy giao diện web

```bash
npx parcel index.html --open
```

> Nếu bạn gặp lỗi liên quan đến `"main"` trong `package.json`, hãy xóa dòng `"main": "index.js",`.

## 🧠 Cách sử dụng

1. Mở giao diện web.
2. Nhập địa chỉ ví EVM hợp lệ (ví dụ: `0x1234...`).
3. Bấm "Kiểm tra".
4. Kết quả sẽ hiển thị số lần ví đã enlist và transaction hash.

## 🌐 Subgraph sử dụng

Subgraph của BaseCamp trên The Graph Studio:
```
https://api.studio.thegraph.com/query/72520/basecamp-nft/version/latest
```

## 🧩 Mô tả kỹ thuật

- Giao diện HTML/CSS thuần với Tailwind CDN.
- Apollo Client để gọi GraphQL.
- Truy vấn `CheckEnlisted($account: Bytes!)` để lấy các lần ví đã enlist.

## ✅ Ví dụ địa chỉ ví hợp lệ để test

```
0x13aaf692bb3f4dd15aeb9192821a5fdbd546e799
```

## 📚 Học thêm

- The Graph là hệ thống giúp dễ dàng truy vấn dữ liệu blockchain.
- Ví EVM giống như tài khoản ngân hàng blockchain, định danh bằng địa chỉ `0x...`.
- NFT là token độc nhất đại diện cho vật phẩm số.

---

🛠️ Dự án này phù hợp cho học sinh trung học học về blockchain và TypeScript.