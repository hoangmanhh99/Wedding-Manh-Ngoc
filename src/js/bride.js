import {data} from "../assets/data/data.js";

// Function to get URL parameter
const getQueryParameter = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
};

export const bride = () => {
    const section = document.querySelector('.bride');
    const card = section.querySelector('.invite-card');
    const guestElement = card.querySelector('.invite-guest');
    const timeBox = card.querySelector('.invite-time');
    const venueBox = card.querySelector('.invite-venue');
    const mapLink = card.querySelector('.invite-map');
    const families = card.querySelector('.invite-families');

    const {time, link, bride: brideData} = data;

    // Get guest name from URL parameter
    const guestName = getQueryParameter('to');
    if (guestName) {
        guestElement.textContent = guestName;
    }

    // Time
    const {year, month, date, day, hours, lunar} = time.marriage;
    timeBox.innerHTML = `
        <div class="invite-time-row">
            <div class="time-day">${hours.start} / ${day.toUpperCase()} / ${date} ${month.toUpperCase()} ${year}</div>
            <div class="time-hour">${lunar}</div>

        </div>`;

    // Venue
    venueBox.textContent = data.time.address;
    mapLink.href = link.map;

    // Families
    const groom = brideData.L;
    const bride = brideData.P;
    families.innerHTML = `
        <div class="families">
            <div class="family">
                <div class="family-title">Nhà gái</div>
                <div class="family-names">${bride.father.toUpperCase()} <br> ${bride.mother.toUpperCase()}</div>
            </div>
            <div class="family">
                <div class="family-title">Nhà trai</div>
                <div class="family-names">${groom.father.toUpperCase()} <br> ${groom.mother.toUpperCase()}</div>
            </div>
        </div>`;
}