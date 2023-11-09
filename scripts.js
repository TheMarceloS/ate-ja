
const messages = [
    "Olá a todos, mais uma vez ",
    "Chegou a minha vez de dizer adeus à casa da praia ",
    "Antes de ir ",
    "gostaria de compartilhar o quão incrível foi a minha jornada aqui ao lado de muitos de vocês ",
    "Tivemos vários momentos ",
    "desafios ",
    "gargalhadas ",
    "e ficam várias histórias para contar ",
    "Aprendi muito ",
    "e também partilhei ",
    "pois 'a vida é muito isto' ",
    "Agradeço sinceramente por toda a aprendizagem ",
    "companheirismo ",
    "e diversão ",
    "que compartilhámos ao longo destes ",
    "... ",
    "quase 3 anos ",
    "Em especial à equipa fantástica que me acolheu desde os primeiros instantes e me integrou da maneira que só eles sabem ",
    "Muito ",
    "obrigado! ",
    "Embora esteja a embarcar em novas aventuras, levo comigo memórias e amizades que aqui fiz ",
    "Obrigado por serem uma parte tão divertida e especial da minha jornada aqui na empresa ",
    "Para terminar... ",
    "Obrigado por clicarem no link. ",
    "Até já ",
    "PS: Para quem quiser e puder, amanhã vos aguardarei no Parque Oceano aka Borges! 😊",
    "Malware Instalado. Obrigado",
];

const easterMessages = [
    "São a melhor equipa! Obrigado por tudo! Obrigado do fundo do coração a cada um de vocês! 😊",
    "Obrigado Rui!",
    "Obrigado Abel!",
    "Obrigado Carlos!",
    "Obrigado Madalena!",
    "Obrigado Hugo!",
    "Obrigado Oscar!",
    "Obrigado Pingu!",
    "Obrigado Ricky!",
    "Obrigado Pacheco!",
    "Obrigado Lucas!",
    "Obrigado Rodrigues!",
    "Obrigado Raul!",
    "Obrigado Rodrigues!",
    "Obrigado André!",
    "Obrigado Liliana!",
    "Obrigado Mafalda!",
    "Obrigado Joana!",
    "Obrigado Adão!",
    "Obrigado Nilson!",
    "Obrigado Ricardo!",
    "Obrigado João!",
    "Obrigado Bruno!",
];

let messageIndex = 0;
let charIndex = 0;
let typingInterval = null;
let typingSpeed = 75;
const message = document.querySelector('.message');
const easterEgg = document.querySelector('.easter-egg');

function updateMessage() {
    if (charIndex < messages[messageIndex].length) {
        message.textContent += messages[messageIndex][charIndex];
        charIndex++;
    } else {
        clearInterval(typingInterval);
        if (messageIndex < messages.length - 1) {
            setTimeout(() => {
                switchToNextMessage();
            }, 750);
        } else {
            setTimeout(turnOffPage, 2000);
        }
    }
}

setTimeout(() => {
    startTyping();
}, 500);

function startTyping() {
    typingInterval = setInterval(updateMessage, typingSpeed);
}

function switchToNextMessage() {
    charIndex = 0;
    messageIndex = (messageIndex + 1) % messages.length;
    message.textContent = '';
    startTyping();
}

function turnOffPage() {
    document.body.innerHTML = '';
    document.body.style.backgroundColor = '#000';
    setTimeout(() => {
        window.close();
    }, 1000);
}

const cardContainer = document.querySelector('body');

    function getRandomColorWithGoodContrast() {
        const contrastThreshold = 32;

        const randomColor = () => Math.floor(Math.random() * 256);

        let color;
        do {
            color = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
        } while (luminance(color) < contrastThreshold);

        return color;
    }

    function luminance(color) {
        const rgb = color.match(/\d+/g);
        const r = rgb[0] / 255;
        const g = rgb[1] / 255;
        const b = rgb[2] / 255;

        const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

        return luminance * 255;
    }

function createCard(message) {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.left = Math.random() * (window.innerWidth - 200) + 'px';
    card.style.top = Math.random() * (window.innerHeight - 100) + 'px';
    card.textContent = message;
    card.style.backgroundColor = getRandomColorWithGoodContrast();

    card.addEventListener('click', () => {
        card.remove();
    });

    cardContainer.appendChild(card);
}

function showEasterEgg(messages) {
    let index = 0;
    const interval = setInterval(() => {
        if (index < messages.length) {
            createCard(messages[index]);
            index++;
        } else {
            clearInterval(interval);
        }
    }, 1000);
}


document.addEventListener('click', () => {
    if(document.querySelectorAll('.card').length >= easterMessages.length) {
        for (const card of document.querySelectorAll('.card')) {
            card.remove();
        }
    }
});

easterEgg.addEventListener("click", event => {
    for (const card of document.querySelectorAll('.card')) {
        card.remove();
    }
    showEasterEgg(easterMessages);
}, {once: true});
