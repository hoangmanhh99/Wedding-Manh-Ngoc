import { data } from "../assets/data/data.js";
import { addClassElement, getQueryParameter, removeClassElement } from "../utils/helper.js";

export const welcome = () => {
    let hasScrolled = false;
    let audioInitialized = false;
    const welcomeElement = document.querySelector('.welcome');
    const homeElement = document.querySelector('.home');
    const navbarElement = document.querySelector('header nav');

    const [_, figureElement, weddingToElement, openWeddingButton] = welcomeElement.children;
    const [audioMusic, audioButton] = document.querySelector('.audio').children;
    const [iconButton] = audioButton.children;

    // Function để xử lý audio một cách thống nhất
    const handleAudioPlay = (isUserInteraction = false) => {
        if (isUserInteraction) {
            // Nếu là user interaction (click button), thử phát nhạc
            audioMusic.play().then(() => {
                audioInitialized = true;
            }).catch(error => {
                console.log('Audio play failed:', error);
            });
        } else {
            // Nếu không phải user interaction (scroll), chỉ thử phát nhạc nếu đã được khởi tạo trước đó
            if (audioInitialized) {
                audioMusic.play().catch(error => {
                    console.log('Audio autoplay was prevented:', error);
                });
            }
        }
    };

    const generateFigureContent = (bride) => {
        const { L: { name: brideLName }, P: { name: bridePName }, couple: coupleImage } = bride;
        return `
            <img src="${coupleImage}" alt="couple animation">
            <figcaption>
                ${bridePName.split(' ')[2]} ${bridePName.split(' ')[3]} & ${brideLName.split(' ')[1]} ${brideLName.split(' ')[2]}
            </figcaption>`;
    };

    const generateParameterContent = () => {
        const name = document.querySelector('#name');
        const params = getQueryParameter('to');

        if (params) {
            weddingToElement.innerHTML = `Kính mời<br><span>${params}</span>`;
            name.value = params;
        } else {
            weddingToElement.innerHTML = `Kính mời<br><span>Bạn và người thương</span>`;
        }
    }

    const initialAudio = () => {
        let isPlaying = false;

        audioMusic.innerHTML = `<source src=${data.audio} type="audio/mp3"/>`;

        audioButton.addEventListener('click', () => {

            if (isPlaying) {
                addClassElement(audioButton, 'active');
                removeClassElement(iconButton, 'bx-play-circle');
                addClassElement(iconButton, 'bx-pause-circle');
                audioMusic.play();
            } else {
                removeClassElement(audioButton, 'active');
                removeClassElement(iconButton, 'bx-pause-circle');
                addClassElement(iconButton, 'bx-play-circle');
                audioMusic.pause();
            }
            isPlaying = !isPlaying;
        });
    };

    openWeddingButton.addEventListener('click', () => {
        addClassElement(document.body, 'active');
        addClassElement(welcomeElement, 'hide');

        setTimeout(() => {
            addClassElement(homeElement, 'active');
            addClassElement(navbarElement, 'active');
            addClassElement(audioButton, 'show');
            removeClassElement(iconButton, 'bx-play-circle');
            addClassElement(iconButton, 'bx-pause-circle');
            
            // Click button được coi là user interaction
            handleAudioPlay(true);
        }, 1500);

        setTimeout(() => {
            addClassElement(audioButton, 'active');
        }, 3000);
    });
    window.addEventListener('wheel', (event) => {
        if (!hasScrolled && event.deltaY > 0) { // Điều kiện scroll xuống
            hasScrolled = true;
            addClassElement(document.body, 'active');
            addClassElement(welcomeElement, 'hide');

            setTimeout(() => {
                addClassElement(homeElement, 'active');
                addClassElement(navbarElement, 'active');
                addClassElement(audioButton, 'show');
                removeClassElement(iconButton, 'bx-play-circle');
                addClassElement(iconButton, 'bx-pause-circle');
                
                // Scroll không được coi là user interaction
                handleAudioPlay(false);
            }, 1500);

            setTimeout(() => {
                addClassElement(audioButton, 'active');
            }, 3000);
        }
    });

    // Thêm sự kiện scroll cho touch devices
    let touchStartY = 0;
    window.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    });

    window.addEventListener('touchmove', (e) => {
        if (!hasScrolled) {
            const touchCurrentY = e.touches[0].clientY;
            const touchDiff = touchStartY - touchCurrentY;
            
            if (touchDiff > 50) { // Swipe up
                hasScrolled = true;
                addClassElement(document.body, 'active');
                addClassElement(welcomeElement, 'hide');

                setTimeout(() => {
                    addClassElement(homeElement, 'active');
                    addClassElement(navbarElement, 'active');
                    addClassElement(audioButton, 'show');
                    removeClassElement(iconButton, 'bx-play-circle');
                    addClassElement(iconButton, 'bx-pause-circle');
                    
                    // Touch không được coi là user interaction cho audio
                    handleAudioPlay(false);
                }, 1500);

                setTimeout(() => {
                    addClassElement(audioButton, 'active');
                }, 3000);
            }
        }
    });

    const initializeWelcome = () => {
        figureElement.innerHTML = generateFigureContent(data.bride);
        generateParameterContent();
        addClassElement(welcomeElement, 'active');
    }

    initializeWelcome();
    initialAudio();
}