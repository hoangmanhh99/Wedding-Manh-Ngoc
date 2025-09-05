import { data } from "../assets/data/data.js";
import { addClassElement, getQueryParameter, removeClassElement } from "../utils/helper.js";

export const welcome = () => {
    let hasScrolled = false;
    let audioInitialized = false;
    let currentSongIndex = 0;
    let isPlaying = false;
    
    const welcomeElement = document.querySelector('.welcome');
    const homeElement = document.querySelector('.home');
    const navbarElement = document.querySelector('header nav');

    const [_, figureElement, weddingToElement, openWeddingButton] = welcomeElement.children;
    const audioSection = document.querySelector('.audio');
    const [audioMusic, playlistControls, songInfo] = audioSection.children;
    const [prevBtn, playPauseBtn, nextBtn] = playlistControls.children;
    const [iconButton] = playPauseBtn.children;
    const [songCover, songDetails] = songInfo.children;
    const [coverImage] = songCover.children;
    const [songTitle, songArtist] = songDetails.children;

    // Function để load bài hát hiện tại
    const loadCurrentSong = () => {
        const currentSong = data.playlist[currentSongIndex];
        console.log("Loading song:", currentSong.title, "from:", currentSong.src);
        
        // Cập nhật thông tin bài hát
        coverImage.src = currentSong.cover;
        songTitle.textContent = currentSong.title;
        songArtist.textContent = currentSong.artist;
        
        // Cập nhật source và load audio
        audioMusic.innerHTML = `<source src="${currentSong.src}" type="audio/mp4"/>`;
        audioMusic.load(); // Quan trọng: load lại audio element
        
        console.log("Song loaded successfully");
    };

    // Function để phát nhạc
    const playMusic = () => {
        console.log("Attempting to play music...");
        audioMusic.play().then(() => {
            console.log("Music started playing successfully");
            audioInitialized = true;
            isPlaying = true;
            removeClassElement(playPauseBtn, 'active');
            removeClassElement(iconButton, 'bx-play-circle');
            addClassElement(iconButton, 'bx-pause-circle');
        }).catch(error => {
            console.log('Audio play failed:', error);
            // Thử load lại và play
            audioMusic.load();
            setTimeout(() => {
                audioMusic.play().catch(err => {
                    console.log('Retry play also failed:', err);
                });
            }, 200);
        });
    };

    // Function để tạm dừng nhạc
    const pauseMusic = () => {
        audioMusic.pause();
        isPlaying = false;
        addClassElement(playPauseBtn, 'active');
        removeClassElement(iconButton, 'bx-pause-circle');
        addClassElement(iconButton, 'bx-play-circle');
    };

    // Function để chuyển bài hát
    const changeSong = (direction) => {
        console.log("Changing song - current index:", currentSongIndex, "total songs:", data.playlist.length);
        
        if (direction === 'next') {
            currentSongIndex = (currentSongIndex + 1) % data.playlist.length;
            console.log("Next song - new index:", currentSongIndex);
        } else if (direction === 'prev') {
            currentSongIndex = currentSongIndex === 0 ? data.playlist.length - 1 : currentSongIndex - 1;
            console.log("Previous song - new index:", currentSongIndex);
        }
        
        // Load bài hát mới
        loadCurrentSong();
        
        // Nếu đang phát nhạc, phát bài mới sau khi load xong
        if (isPlaying) {
            // Đợi một chút để audio load xong rồi mới play
            setTimeout(() => {
                playMusic();
            }, 100);
        }
    };

    // Function để xử lý audio một cách thống nhất
    const handleAudioPlay = (isUserInteraction = false) => {
        if (isUserInteraction) {
            // Nếu là user interaction (click button), thử phát nhạc
            playMusic();
        } else {
            // Nếu không phải user interaction (scroll), chỉ thử phát nhạc nếu đã được khởi tạo trước đó
            if (audioInitialized) {
                playMusic();
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
        // Load bài hát đầu tiên
        loadCurrentSong();

        // Event listener cho nút play/pause
        playPauseBtn.addEventListener('click', () => {
            if (isPlaying) {
                pauseMusic();
            } else {
                playMusic();
            }
        });

        // Event listener cho nút next
        nextBtn.addEventListener('click', () => {
            changeSong('next');
        });

        // Event listener cho nút previous
        prevBtn.addEventListener('click', () => {
            changeSong('prev');
        });

        // Event listener khi bài hát kết thúc, tự động chuyển bài tiếp theo
        audioMusic.addEventListener('ended', () => {
            changeSong('next');
        });
    };

    openWeddingButton.addEventListener('click', () => {
        addClassElement(document.body, 'active');
        addClassElement(welcomeElement, 'hide');

        setTimeout(() => {
            addClassElement(homeElement, 'active');
            addClassElement(navbarElement, 'active');
            addClassElement(playlistControls, 'show');
            addClassElement(songInfo, 'show');
            removeClassElement(iconButton, 'bx-play-circle');
            addClassElement(iconButton, 'bx-pause-circle');
            
            // Click button được coi là user interaction
            handleAudioPlay(true);
        }, 1500);

        setTimeout(() => {
            addClassElement(playPauseBtn, 'active');
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
                addClassElement(playlistControls, 'show');
                addClassElement(songInfo, 'show');
                removeClassElement(iconButton, 'bx-play-circle');
                addClassElement(iconButton, 'bx-pause-circle');
                
                // Scroll không được coi là user interaction
                handleAudioPlay(false);
            }, 1500);

            setTimeout(() => {
                addClassElement(playPauseBtn, 'active');
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
                    addClassElement(playlistControls, 'show');
                    addClassElement(songInfo, 'show');
                    removeClassElement(iconButton, 'bx-play-circle');
                    addClassElement(iconButton, 'bx-pause-circle');
                    
                    // Touch không được coi là user interaction cho audio
                    handleAudioPlay(false);
                }, 1500);

                setTimeout(() => {
                    addClassElement(playPauseBtn, 'active');
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