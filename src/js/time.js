import { data } from "../assets/data/data.js";

export const time = () => {
    const section = document.querySelector('.time');
    const card = section.querySelector('.time-card');
    const coupleNames = card.querySelector('.couple-names');
    const subtitle = card.querySelector('.time-subtitle');
    const timeline = card.querySelector('.timeline');
    const mapAnchor = card.querySelector('.map-link');

    const { bride, time: timeData, link } = data;

    // Header: Couple names and date/location
    coupleNames.textContent = `${bride.P.name.split(' ').slice(-2).join(' ')} & ${bride.L.name.split(' ').slice(-2).join(' ')}`;
    subtitle.textContent = `${String(timeData.marriage.date).padStart(2,'0')}.${String(timeData.marriage.month).replace(/\D/g,'').padStart(2,'0')}.${timeData.marriage.year} | ${data.time.address.split(',').slice(0,1).join('')}`;

    // Program items
    const program = [
        { time: '16:00', label: 'ĐÓN KHÁCH', icon: './src/assets/images/Icon-01.png' },
        { time: '16:30', label: 'CHỤP ẢNH', icon: './src/assets/images/Icon-02.png' },
        { time: '17:00', label: 'HÔN LỄ', icon: './src/assets/images/Icon-03.png' },
        { time: '17:30', label: 'KHAI TIỆC', icon: './src/assets/images/Icon-04.png' },
    ];

    timeline.innerHTML = program.map(item => `
        <li class="timeline-item">
            <img src="${item.icon}" alt="${item.label}" class="timeline-icon" />
            <div class="timeline-time">${item.time}</div>
            <div class="timeline-label">${item.label}</div>
        </li>
    `).join('');

    // Map link
    mapAnchor.href = link.map;
};
