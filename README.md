# Quotes API

API đơn giản để lấy các trích dẫn ngẫu nhiên bằng nhiều ngôn ngữ khác nhau.

## Endpoints

### GET /quote

Trả về một trích dẫn ngẫu nhiên dựa trên ngôn ngữ được chỉ định.

**Query Parameters:**

- `lang` (tùy chọn): Mã ngôn ngữ để lấy trích dẫn. Các giá trị hợp lệ: `en` (tiếng Anh), `vi` (tiếng Việt), `cn_zh` (tiếng Trung giản thể), `cn_tw` (tiếng Trung phồn thể). Mặc định là `en`.

**Ví dụ:**

```
GET /quote?lang=vi
```

**Phản hồi:**

```json
{
  "language": "vi",
  "quote": "Cách duy nhất để làm việc tuyệt vời là yêu thích những gì bạn làm.",
  "author": "Steve Jobs"
}
```

### GET /

Trả về thông tin về API và các ngôn ngữ có sẵn.

## Triển khai

API này được thiết kế để triển khai trên Vercel.

1. Clone repository
2. Cài đặt dependencies: `npm install`
3. Chạy ở local: `npm run dev`
4. Triển khai lên Vercel: `vercel`
