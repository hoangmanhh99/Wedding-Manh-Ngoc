export const data = {
    bride: {
        L: {
            id: 1,
            name: 'Hoàng Văn Mạnh',
            child: 'Putra ke lorem',
            father: 'Lorem',
            mother: 'Ipsum',
            image: './src/assets/images/10.jpg'
        },
        P: {
            id: 2,
            name: 'Phạm Nguyễn Minh Ngọc',
            child: 'Putri ke lorem',
            father: 'Lorem',
            mother: 'Ipsum',
            image: './src/assets/images/4.jpg'
        },

        couple: './src/assets/images/7.jpg'
    },

    time: {
        marriage: {
            year: '2025',
            month: 'November',
            date: '29',
            day: 'Thứ 7',
            hours: {
                start: '17.00',
                finish: 'Hoàn thành'
            }
        },
        reception: {
            year: '2024',
            month: 'November',
            date: '14',
            day: 'Kamis',
            hours: {
                start: '11.00',
                finish: 'Hoàn thành'
            }
        },
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
            teks: 'Thời gian & Địa điểm',
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
