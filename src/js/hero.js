// Функції для перевірки та коригування кольору
function isColorTooLight(hex) {
    const num = parseInt(hex.slice(1), 16);
    const red = num >> 16 & 255;
    const green = num >> 8 & 255;
    const blue = num & 255;
    const brightness = Math.sqrt(.299 * red * red + .587 * green * green + .114 * blue * blue);
    return brightness > 200;
}

function isColorTooGray(hex) {
    const num = parseInt(hex.slice(1), 16);
    const red = num >> 16 & 255;
    const green = num >> 8 & 255;
    const blue = num & 255;
    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);
    return max - min < 15;
}

// Оновлена функція adjustColor, яка перевіряє, чи колір не є занадто світлим або сірим
function adjustColor(hex) {
    if (isColorTooLight(hex) || isColorTooGray(hex)) {
        const num = parseInt(hex.slice(1), 16);
        let red = (num >> 16 & 255) * .8;
        let green = (num >> 8 & 255) * .8;
        let blue = (num & 255) * .8;
        red = Math.round(red).toString(16).padStart(2, "0");
        green = Math.round(green).toString(16).padStart(2, "0");
        blue = Math.round(blue).toString(16).padStart(2, "0");
        return `#${red}${green}${blue}`;
    }
    return hex;
}

// Функції для плавної зміни кольору
function lerp(start, end, amt) {
    return start + (end - start) * amt;
}

function lerpColor(startHex, endHex, amt) {
    const startNum = parseInt(startHex.slice(1), 16);
    const endNum = parseInt(endHex.slice(1), 16);
    const startRed = startNum >> 16 & 255;
    const startGreen = startNum >> 8 & 255;
    const startBlue = startNum & 255;
    const endRed = endNum >> 16 & 255;
    const endGreen = endNum >> 8 & 255;
    const endBlue = endNum & 255;
    const red = Math.round(lerp(startRed, endRed, amt));
    const green = Math.round(lerp(startGreen, endGreen, amt));
    const blue = Math.round(lerp(startBlue, endBlue, amt));
    return `rgb(${red}, ${green}, ${blue})`;
}

// Основна функція для оновлення градієнта
let animationFrameId; // ID для контролю анімації
let currentGradient; // Зберігання поточного градієнта

function updateGradient() {
    const now = Date.now();
    const interval = (now - lastUpdateTime) / 50; // Плавніше оновлення
    if (interval >= totalInterval) {
        lastUpdateTime = now;
        currentColorIndex = nextColorIndex;
        nextColorIndex = (nextColorIndex + 1) % colors.length;
        lerpPercentage = 0;
    } else {
        lerpPercentage = interval / totalInterval; // Плавне збільшення відсотка
    }
    const wrapper = document.querySelector('.background-wrapper');
    wrapper.style.background = lerpColor(colors[currentColorIndex], colors[nextColorIndex], lerpPercentage);
    currentGradient = wrapper.style.background; // Оновлення поточного градієнта
    animationFrameId = requestAnimationFrame(updateGradient);
}

// Ініціалізація масиву кольорів для градієнта з викликом adjustColor
const colors = ['#ED3B44', '#C6E327', '#0041E8'].map(color => adjustColor(color));

// Встановлення початкового градієнта для .background-wrapper
const wrapper = document.querySelector('.background-wrapper');
wrapper.style.background = lerpColor(colors[0], colors[1], 0);
let currentColorIndex = 0;
let nextColorIndex = 1;
let lerpPercentage = 0;
const totalInterval = 15;
let lastUpdateTime = Date.now();


// Додавання обробників подій для секції "hero"
const heroSection = document.querySelector('.hero');
heroSection.addEventListener('mouseenter', () => {
    // Відновлення анімації з поточного стану
    if (!animationFrameId) {
        lastUpdateTime = Date.now() - totalInterval * lerpPercentage * 50;
        animationFrameId = requestAnimationFrame(updateGradient);
    }
});

heroSection.addEventListener('mouseleave', () => {
    // Зупинка анімації та збереження поточного стану
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
});

