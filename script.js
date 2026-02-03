let currentSection = 'welcome';
const answers = {};
 
function nextSection(sectionId) {
    const current = document.getElementById(currentSection);
    const next = document.getElementById(sectionId);
    
    if (current) {
        current.classList.remove('active');
    }
    
    if (next) {
        next.classList.add('active');
        currentSection = sectionId;
    }
}
 
function selectOption(questionId, value) {
    answers[questionId] = value;
    
    const section = document.getElementById(questionId);
    const cards = section.querySelectorAll('.option-card');
    
    cards.forEach(card => {
        card.classList.remove('selected');
    });
    
    event.target.closest('.option-card').classList.add('selected');
    
    createSparkles(event.target.closest('.option-card'));
    
    setTimeout(() => {
        const nextSections = {
            'question1': 'question2',
            'question2': 'question3',
            'question3': 'question4',
            'question4': 'question5',
            'question5': 'final-question'
        };
        
        if (nextSections[questionId]) {
            nextSection(nextSections[questionId]);
        }
    }, 800);
}
 
function createSparkles(element) {
    const rect = element.getBoundingClientRect();
    const sparkleEmojis = ['✨', '💫', '⭐', '💖', '💕'];
    
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
        sparkle.style.left = (rect.left + rect.width / 2) + 'px';
        sparkle.style.top = (rect.top + rect.height / 2) + 'px';
        sparkle.style.setProperty('--x', `${(Math.random() - 0.5) * 200}px`);
        sparkle.style.setProperty('--y', `${-Math.random() * 100}px`);
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 1000);
    }
}
 
const noButton = document.getElementById('no-button');
const yesButton = document.getElementById('yes-button');
 
let noButtonPosition = { x: 0, y: 0 };
let isNoButtonMoving = false;
 
function setupNoButton() {
    if (!noButton) return;
    
    const container = noButton.parentElement;
    const containerRect = container.getBoundingClientRect();
    
    noButton.addEventListener('mouseenter', moveNoButton);
    noButton.addEventListener('touchstart', moveNoButton);
    
    noButton.addEventListener('click', (e) => {
        e.preventDefault();
        moveNoButton();
    });
}
 
function moveNoButton() {
    if (isNoButtonMoving) return;
    isNoButtonMoving = true;
    
    const container = noButton.parentElement;
    const containerRect = container.getBoundingClientRect();
    const buttonRect = noButton.getBoundingClientRect();
    
    const maxX = containerRect.width - buttonRect.width - 40;
    const maxY = 100;
    
    let newX, newY;
    let attempts = 0;
    
    do {
        newX = Math.random() * maxX - maxX / 2;
        newY = (Math.random() - 0.5) * maxY;
        attempts++;
    } while (
        attempts < 10 && 
        Math.abs(newX - noButtonPosition.x) < 50 && 
        Math.abs(newY - noButtonPosition.y) < 50
    );
    
    noButtonPosition = { x: newX, y: newY };
    
    noButton.style.transform = `translate(${newX}px, ${newY}px)`;
    noButton.style.transition = 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    
    const sadEmojis = ['😢', '😭', '💔', '🥺'];
    const randomEmoji = sadEmojis[Math.floor(Math.random() * sadEmojis.length)];
    
    const emoji = document.createElement('div');
    emoji.textContent = randomEmoji;
    emoji.style.position = 'absolute';
    emoji.style.left = (buttonRect.left + buttonRect.width / 2) + 'px';
    emoji.style.top = (buttonRect.top + buttonRect.height / 2) + 'px';
    emoji.style.fontSize = '2rem';
    emoji.style.pointerEvents = 'none';
    emoji.style.animation = 'floatHeart 1s ease-out forwards';
    emoji.style.zIndex = '100';
    
    document.body.appendChild(emoji);
    setTimeout(() => emoji.remove(), 1000);
    
    setTimeout(() => {
        isNoButtonMoving = false;
    }, 300);
}
 
function celebrate() {
    nextSection('celebration');
    createBalloons();
    createConfetti();
    createFloatingHearts('celebration');
}
 
function createBalloons() {
    const container = document.querySelector('.balloons-container');
    const balloonEmojis = ['🎈', '🎉', '🎊', '💖', '💕', '🎁'];
    
    for (let i = 0; i < 20; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.textContent = balloonEmojis[Math.floor(Math.random() * balloonEmojis.length)];
        balloon.style.left = Math.random() * 100 + '%';
        balloon.style.setProperty('--drift', (Math.random() - 0.5) * 200 + 'px');
        balloon.style.setProperty('--rotate', (Math.random() - 0.5) * 360 + 'deg');
        balloon.style.animationDelay = Math.random() * 2 + 's';
        balloon.style.animationDuration = (3 + Math.random() * 3) + 's';
        
        container.appendChild(balloon);
    }
}
 
function createConfetti() {
    const container = document.querySelector('.confetti-container');
    const colors = ['#ff6b9d', '#c44569', '#ffc1e0', '#ff0844', '#a855f7', '#ec4899'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.setProperty('--drift', (Math.random() - 0.5) * 400 + 'px');
        confetti.style.animationDelay = Math.random() * 1 + 's';
        confetti.style.animationDuration = (2 + Math.random() * 2) + 's';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        
        container.appendChild(confetti);
    }
}
 
function createFloatingHearts(section) {
    const container = section === 'celebration' 
        ? document.querySelector('.floating-hearts-celebration')
        : document.querySelector('.floating-hearts-final');
    
    const heartEmojis = ['💕', '💖', '💗', '💝', '💘', '❤️', '💓'];
    
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 4 + 's';
        heart.style.animationDuration = (3 + Math.random() * 2) + 's';
        
        container.appendChild(heart);
    }
}
 
function showFinalMessage() {
    nextSection('final-message');
    createFloatingHearts('final');
}
 
function createBackgroundHearts() {
    const heartEmojis = ['💕', '💖', '💗', '💝', '💘', '❤️'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'background-heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (10 + Math.random() * 10) + 's';
        
        document.querySelector('.hearts-background').appendChild(heart);
        
        setTimeout(() => heart.remove(), 20000);
    }, 2000);
}
 
window.addEventListener('load', () => {
    setupNoButton();
    createBackgroundHearts();
    
    const yesBtn = document.getElementById('yes-button');
    if (yesBtn) {
        yesBtn.addEventListener('mouseenter', () => {
            createHeartBurst(yesBtn);
        });
    }
});
 
function createHeartBurst(element) {
    const rect = element.getBoundingClientRect();
    const hearts = ['💕', '💖', '💗'];
    
    for (let i = 0; i < 3; i++) {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'fixed';
        heart.style.left = (rect.left + rect.width / 2) + 'px';
        heart.style.top = (rect.top + rect.height / 2) + 'px';
        heart.style.fontSize = '1.5rem';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        heart.style.animation = 'floatHeart 2s ease-out forwards';
        heart.style.animationDelay = (i * 0.1) + 's';
        
        const angle = (Math.random() * 360) * Math.PI / 180;
        const distance = 50 + Math.random() * 50;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        heart.style.setProperty('--tx', tx + 'px');
        heart.style.setProperty('--ty', ty + 'px');
        
        document.body.appendChild(heart);
        
        setTimeout(() => heart.remove(), 2000);
    }
}
 
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.97) {
        createTrailHeart(e.clientX, e.clientY);
    }
});
 
function createTrailHeart(x, y) {
    const heart = document.createElement('div');
    heart.textContent = '💕';
    heart.style.position = 'fixed';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.fontSize = '1rem';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '0';
    heart.style.opacity = '0.5';
    heart.style.animation = 'floatHeart 2s ease-out forwards';
    
    document.body.appendChild(heart);
    
    setTimeout(() => heart.remove(), 2000);
}