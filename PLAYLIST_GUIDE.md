# Hướng dẫn thêm nhạc vào Playlist

## Cách thêm nhạc mới vào playlist

### 1. Thêm file nhạc
- Đặt file nhạc vào thư mục `src/assets/audio/`
- Hỗ trợ định dạng: `.mp3`, `.wav`, `.ogg`

### 2. Cập nhật playlist trong `src/assets/data/data.js`

Mở file `src/assets/data/data.js` và tìm phần `playlist`:

```javascript
playlist: [
    {
        id: 1,
        title: 'Wedding Song',
        artist: 'Artist 1',
        src: './src/assets/audio/wedding.mp3',
        cover: './src/assets/images/couple.png'
    },
    {
        id: 2,
        title: 'Love Theme',
        artist: 'Artist 2', 
        src: './src/assets/audio/your-new-song.mp3', // Đường dẫn file nhạc mới
        cover: './src/assets/images/7.jpg' // Ảnh bìa bài hát
    },
    // Thêm bài hát mới ở đây...
]
```

### 3. Cấu trúc object bài hát

Mỗi bài hát cần có các thuộc tính:

- `id`: Số thứ tự duy nhất (tăng dần)
- `title`: Tên bài hát
- `artist`: Tên nghệ sĩ
- `src`: Đường dẫn đến file nhạc
- `cover`: Đường dẫn đến ảnh bìa (có thể dùng ảnh có sẵn)

### 4. Ví dụ thêm bài hát mới

```javascript
{
    id: 4,
    title: 'Bài hát cưới mới',
    artist: 'Ca sĩ nổi tiếng',
    src: './src/assets/audio/bai-hat-moi.mp3',
    cover: './src/assets/images/4.jpg'
}
```

### 5. Tính năng playlist

- **Play/Pause**: Nút ở giữa để phát/tạm dừng
- **Previous**: Nút bên trái để chuyển bài trước
- **Next**: Nút bên phải để chuyển bài tiếp theo
- **Auto Next**: Tự động chuyển bài khi bài hiện tại kết thúc
- **Song Info**: Hiển thị tên bài hát, nghệ sĩ và ảnh bìa

### 6. Lưu ý

- Đảm bảo file nhạc có kích thước hợp lý để tải nhanh
- Ảnh bìa nên có tỷ lệ vuông (1:1) để hiển thị đẹp
- Tên file không nên có ký tự đặc biệt hoặc dấu cách
