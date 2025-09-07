import {data} from "../assets/data/data.js";
import {renderElement} from "../utils/helper.js";

export const navbar = () => {
    const containerNavbar = document.querySelector('nav');
    const toggleBtn = document.querySelector('.menu-toggle');
    const backdrop = document.querySelector('.backdrop');

    const listItemNavbar = (data) => (
        ` <a href=${data.path}>
            <i class="${data.icon}"></i>
            <span>${data.teks}</span>
        </a>`
    );

    renderElement(data.navbar, containerNavbar, listItemNavbar);

    // Hide on scroll down, show on scroll up (disabled when sidebar open on mobile)
    let lastScrollY = window.scrollY;
    document.addEventListener('scroll', () => {
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        const isOpen = containerNavbar.classList.contains('active');
        if (isMobile && isOpen) return; // don't auto-hide while sidebar is open

        const currentScrollY = window.scrollY;
        if (currentScrollY < lastScrollY) {
            containerNavbar.classList.remove('scroll');
        } else {
            containerNavbar.classList.add('scroll');
        }
        lastScrollY = currentScrollY;
    });

    // Toggle sidebar on mobile
    const openSidebar = () => {
        containerNavbar.classList.remove('scroll');
        containerNavbar.classList.add('active');
        backdrop.classList.add('show');
    };
    const closeSidebar = () => {
        containerNavbar.classList.remove('active');
        backdrop.classList.remove('show');
    };

    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (containerNavbar.classList.contains('active')) closeSidebar(); else openSidebar();
    });
    backdrop.addEventListener('click', closeSidebar);
    containerNavbar.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') closeSidebar();
    });

    // Close on hash navigation (e.g., when navigating to other sections)
    window.addEventListener('hashchange', closeSidebar);
}
