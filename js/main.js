const carModels = {
    urus: {
        name: "Urus",
        engine: "4.0 л V8 Twin-Turbo",
        power: "650 л.с. @ 6,000 об/мин",
        acceleration: "3.6 сек",
        topSpeed: "305 км/ч",
        price: "₽20,000,000",
        description: "Первый в мире Super SUV, идеально подходящий для ежедневных поездок и экстремальных приключений на бездорожье."
    },
    aventador: {
        name: "Aventador",
        engine: "6.5 л V12",
        power: "770 л.с. @ 8,500 об/мин",
        acceleration: "2.9 сек",
        topSpeed: "350 км/ч",
        price: "₽35,000,000",
        description: "Суперкар с культовыми дверями-ножницами, создан для тех, кто жаждет максимальной скорости и внимания."
    },
    huracan: {
        name: "Huracán",
        engine: "5.2 л V10",
        power: "640 л.с. @ 8,000 об/мин",
        acceleration: "3.1 сек",
        topSpeed: "325 км/ч",
        price: "₽25,000,000",
        description: "Идеальный баланс между трековыми характеристиками и комфортом для городских дорог."
    },
    sian: {
        name: "Sián",
        engine: "6.5 л V12 + гибрид",
        power: "819 л.с.",
        acceleration: "2.8 сек",
        topSpeed: "350 км/ч",
        price: "₽50,000,000",
        description: "Первый гибридный Lamborghini, сочетающий мощь V12 с передовыми электрическими технологиями."
    },
    revuelto: {
        name: "Revuelto",
        engine: "6.5 л V12 + 3 электромотора",
        power: "1,015 л.с.",
        acceleration: "2.5 сек",
        topSpeed: "350+ км/ч",
        price: "₽60,000,000",
        description: "Будущее суперкаров: мощный гибрид с невероятной динамикой и футуристическим дизайном."
    }
};

window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 2000);
});

window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
        if (window.innerWidth <= 768) {
            document.querySelector('.main-nav').classList.remove('active');
        }
    });
});

document.querySelectorAll('.model-btn').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.model-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        this.classList.add('active');
        const modelId = this.getAttribute('data-model');
        const modelData = carModels[modelId];
        updateModelDisplay(modelData);
    });
});

function updateModelDisplay(modelData) {
    const modelNameElement = document.querySelector('.model-name');
    const specsListElement = document.querySelector('.specs-list');
    const modelViewerElement = document.querySelector('model-viewer');
    const modelViewerContainer = document.querySelector('.model-viewer');
    const modelDescriptionElement = document.querySelector('.model-description');
    if (modelNameElement && specsListElement && modelViewerElement && modelData) {
        modelViewerContainer.style.opacity = '0';
        setTimeout(() => {
            modelNameElement.textContent = modelData.name;
            specsListElement.innerHTML = `
                <li><span>Двигатель:</span> ${modelData.engine}</li>
                <li><span>Мощность:</span> ${modelData.power}</li>
                <li><span>Разгон 0-100 км/ч:</span> ${modelData.acceleration}</li>
                <li><span>Макс. скорость:</span> ${modelData.topSpeed}</li>
                <li><span>Цена от:</span> ${modelData.price}</li>
            `;
            modelDescriptionElement.textContent = modelData.description;
            let modelNameForFile = modelData.name.toLowerCase();
            modelNameForFile = modelNameForFile
                .replace('á', 'a')
                .replace('é', 'e');
            if (modelNameForFile === "revuelto") {
                modelNameForFile = "Revuelto";
            }
            const modelPath = `assets/models/lamborghini_${modelNameForFile}.glb`;
            modelViewerElement.setAttribute('src', modelPath);
            modelViewerElement.setAttribute('alt', `${modelData.name} 3D Model`);
            modelViewerContainer.style.transition = 'opacity 0.5s ease';
            modelViewerContainer.style.opacity = '1';
        }, 300);
    }
}

const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    heroTitle.addEventListener('mouseenter', function() {
        this.style.animationPlayState = 'running';
    });
    heroTitle.addEventListener('mouseleave', function() {
        this.style.animationPlayState = 'paused';
    });
}

const scrollDownBtn = document.querySelector('.scroll-down');
if (scrollDownBtn) {
    scrollDownBtn.addEventListener('click', function() {
        window.scrollTo({
            top: document.querySelector('#models').offsetTop - 80,
            behavior: 'smooth'
        });
    });
}

AOS.init({
    duration: 1000,
    once: true,
});

const scrollToTopBtn = document.getElementById('scroll-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

const burgerMenu = document.querySelector('.burger-menu');
const mainNav = document.querySelector('.main-nav');
burgerMenu.addEventListener('click', () => {
    mainNav.classList.toggle('active');
});