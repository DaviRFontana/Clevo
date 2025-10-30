function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (!themeToggle) {
        return;
    }
    
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        themeToggle.checked = true;
        document.body.classList.add('dark-theme');
        setBackgroundVideo('dark');
    } else if (savedTheme === 'light') {
        themeToggle.checked = false;
        document.body.classList.remove('dark-theme');
        setBackgroundVideo('light');
    } else {
        const currentTheme = themeToggle.checked ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
        if (currentTheme === 'dark') {
            document.body.classList.add('dark-theme');
        }
        setBackgroundVideo(currentTheme);
    }
}

function saveTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (!themeToggle) {
        return;
    }
    
    const theme = themeToggle.checked ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }

    setBackgroundVideo(theme);
}

document.addEventListener('DOMContentLoaded', initTheme);

document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('change', saveTheme);
    }
});

function getBackgroundVideoUrl(theme) {
    const lightId = 'Y1BmjPeatI4';
    const darkId = '9vntypeV5QU';
    const videoId = theme === 'dark' ? darkId : lightId;
    const params = new URLSearchParams({
        autoplay: '1',
        mute: '1',
        controls: '0',
        loop: '1',
        playlist: videoId,
        modestbranding: '1',
        rel: '0',
        playsinline: '1'
    });
    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

function setBackgroundVideo(theme) {
    const iframe = document.querySelector('.main-content-video-container iframe');
    if (!iframe) {
        return;
    }
    const newSrc = getBackgroundVideoUrl(theme);
    if (iframe.src !== newSrc) {
        iframe.src = newSrc;
    }
    iframe.style.animation = 'none';
    iframe.offsetHeight;
    iframe.style.animation = 'opacityAnimation 5s ease-in-out forwards';
}

document.addEventListener('DOMContentLoaded', function () {
    const languageToggle = document.querySelector('.language-toggle-input');
    const languageMenu = document.querySelector('.main-language-menu');
    const languageOptions = document.querySelectorAll('.language-menu-input');
    const languageToggleContainer = document.querySelector('.language-toggle');

    if (!languageToggle || !languageMenu) {
        return;
    }

    if (languageToggleContainer) {
        languageToggleContainer.addEventListener('click', function (e) {
            if (e.target === languageToggle) {
                return;
            }
            languageToggle.checked = !languageToggle.checked;
        });
    }

    languageOptions.forEach(function (opt) {
        opt.addEventListener('change', function () {
            languageToggle.checked = false;
        });
        opt.addEventListener('click', function () {
            languageToggle.checked = false;
        });
    });

    document.addEventListener('click', function (e) {
        if (!languageToggle.checked) {
            return;
        }
        const isInsideToggle = languageToggleContainer && languageToggleContainer.contains(e.target);
        const isInsideMenu = languageMenu.contains(e.target);
        if (!isInsideToggle && !isInsideMenu) {
            languageToggle.checked = false;
        }
    });
});

function rotateHighlightWords() {
    const words = ['extraordinary', 'exceptional', 'different', 'professional', 'excellent'];
    const highlightElement = document.querySelector('#main-content-title-highlight');
    
    if (!highlightElement) {
        console.error('Element #main-content-title-highlight not found');
        return;
    }
    
    let currentIndex = 0;
    
    function updateWord() {
        highlightElement.textContent = words[currentIndex];
        currentIndex = (currentIndex + 1) % words.length;
    }
    
    updateWord();
    
    const intervalId = setInterval(updateWord, 2000);
    
    setTimeout(() => {
        clearInterval(intervalId);
        console.log('Word rotation cycle completed');
    }, 10000);
}

function startContinuousRotation() {
    rotateHighlightWords();
    setInterval(rotateHighlightWords, 10000);
}

startContinuousRotation();

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
