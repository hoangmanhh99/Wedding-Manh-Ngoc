export const data = {
    bride: {
        L: {
            id: 1,
            name: 'Hoàng Văn Mạnh',
            child: 'Trưởng nam',
            father: 'Hoàng Văn Nhàn',
            mother: 'Trịnh Thị Hằng',
            image: './src/assets/images/10.jpg'
        },
        P: {
            id: 2,
            name: 'Phạm Nguyễn Minh Ngọc',
            child: 'Trưởng nữ',
            father: 'Phạm Văn Nho',
            mother: 'Nguyễn Thị Đông Mai',
            image: './src/assets/images/4.jpg'
        },

        couple: './src/assets/images/7.jpg'
    },

    time: {
        marriage: {
            year: '2025',
            month: 'Tháng 11',
            date: '29',
            day: 'Thứ Bảy',
            hours: {
                start: '17:00',
                finish: 'Hoàn thành'
            },
            lunar: 'TỨC NGÀY 10 THÁNG 10 NĂM ẤT TỴ'
        },
        // reception: {
        //     year: '2025',
        //     month: 'Tháng 12',
        //     date: '13',
        //     day: 'Thứ 7',
        //     hours: {
        //         start: '11.00',
        //         finish: 'Hoàn thành'
        //     }
        // },
        address: 'Trung Tâm Tiệc Cưới 133, 105 Lý Sơn, Ngọc Thụy, Long Biên, Hà Nội'
    },

    link: {
        calendar: 'https://calendar.app.google/C3H55oeF2W4pJGMB8',
        map: 'https://maps.app.goo.gl/XapfMUeNVvm2aYCm7',
    },

    galery: [
        {
            id: 1,
            image: './src/assets/images/1.png'
        },
        {
            id: 2,
            image: './src/assets/images/2.png'
        },
        {
            id: 3,
            image: './src/assets/images/3.png'
        },
        {
            id: 4,
            image: './src/assets/images/4.png'
        },
        {
            id: 5,
            image: './src/assets/images/5.png'
        }
    ],

    bank: [
        {
            id: 1,
            name: 'HOANG VAN MANH',
            icon: './src/assets/images/bca.png',
            rekening: '12345678',
            qrCode: './src/assets/images/qr-groom.png'
        },
        {
            id: 2,
            name: 'PHAM NGUYEN MINH NGOC',
            icon: './src/assets/images/bri.png',
            rekening: '12345678',
            qrCode: './src/assets/images/qr-bride.png'
        },
    ],

    audio: './src/assets/audio/wedding.mp3',
    
    // Playlist nhạc
    playlist: [
        {
            id: 1,
            title: 'I do',
            artist: '911',
            src: './src/assets/audio/I-do-911.m4a',
            cover: './src/assets/images/couple.png'
        },
        {
            id: 2,
            title: 'A Thousand Years',
            artist: 'Chiristin Perri', 
            src: './src/assets/audio/A-thousand-years.m4a', // Bạn có thể thay đổi đường dẫn file nhạc khác
            cover: './src/assets/images/7.jpg'
        },
        {
            id: 3,
            title: 'Dancing in the Dark',
            artist: 'SOOBIN',
            src: './src/assets/audio/Dancing-in-the-dark.m4a', // Bạn có thể thay đổi đường dẫn file nhạc khác
            cover: './src/assets/images/4.jpg'
        },
        {
            id: 4,
            title: 'Một đời',
            artist: 'Buitruonglinh',
            src: './src/assets/audio/Mot-doi.m4a', // Bạn có thể thay đổi đường dẫn file nhạc khác
            cover: './src/assets/images/4.jpg'
        },
        {
            id: 5,
            title: 'Người và ta',
            artist: 'Rhymastic & Thanh Huyền',
            src: './src/assets/audio/Nguoi-va-ta.m4a', // Bạn có thể thay đổi đường dẫn file nhạc khác
            cover: './src/assets/images/4.jpg'
        },
        {
            id: 6,
            title: 'Yêu 5',
            artist: 'Rhymastic',
            src: './src/assets/audio/Yeu-5.m4a', // Bạn có thể thay đổi đường dẫn file nhạc khác
            cover: './src/assets/images/4.jpg'
        },
    ],

    api: 'https://script.google.com/macros/s/AKfycbxkvUep5UAAoNbQtP7tsv8W4Sb6lNBGC38U8CYMDi2FRAJfwY6jXlNKCgKN_RGKgXpVDQ/exec',

    navbar: [
        {
            id: 1,
            teks: 'Home',
            icon: 'bx bxs-home-heart',
            path: '#home',
        },
        {
            id: 2,
            teks: 'Tiệc cưới',
            icon: 'bx bxs-group',
            path: '#bride',
        },
        {
            id: 3,
            teks: 'Chương trình',
            icon: 'bx bxs-calendar-check',
            path: '#time',
        },
        {
            id: 4,
            teks: 'Galery',
            icon: 'bx bxs-photo-album',
            path: '#galery',
        },
        {
            id: 5,
            teks: 'Lời chúc',
            icon: 'bx bxs-message-rounded-dots',
            path: '#wishes',
        },
    ],
}
