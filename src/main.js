import {home} from "./js/home.js";
import {bride} from "./js/bride.js";
import {time} from "./js/time.js";
import {galery} from "./js/galery.js";
import {wishes} from "./js/wishes.js";
import {navbar} from "./js/navbar.js";
import {welcome} from "./js/welcome.js";
import {gift} from "./js/gift.js";

// load content
document.addEventListener('DOMContentLoaded', () => {
    AOS.init();

    welcome();
    navbar();
    home();
    bride()
    time();
    galery();
    wishes();
    gift();
});