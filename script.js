document.addEventListener('DOMContentLoaded', () => {
    // قائمة الإيميلات المؤهلة للعلامة الزرقاء
    const VERIFIED_EMAILS = [
        'ioam3r@gmail.com',
        'legaendamory@gmail.com',
        'amorylegaend@gmail.com'
    ];

    // قاموس الترجمات للغات متعددة
    const translations = {
        ar: {
            your_story: "قصتك",
            settings: "الإعدادات",
            font_family: "نوع الخط:",
            font_size: "حجم الخط:",
            logout: "تسجيل الخروج",
            login: "تسجيل الدخول",
            likes: "تسجيل إعجاب",
            comment: "تعليق..."
        },
        en: {
            your_story: "Your Story",
            settings: "Settings",
            font_family: "Font Family:",
            font_size: "Font Size:",
            logout: "Log Out",
            login: "Log In",
            likes: "likes",
            comment: "Add a comment..."
        },
        es: {
            your_story: "Tu historia",
            settings: "Configuración",
            font_family: "Fuente:",
            font_size: "Tamaño:",
            logout: "Cerrar sesión",
            login: "Iniciar sesión",
            likes: "Me gusta",
            comment: "Añade un comentario..."
        },
        fr: {
            your_story: "Votre story",
            settings: "Paramètres",
            font_family: "Police:",
            font_size: "Taille:",
            logout: "Déconnexion",
            login: "Connexion",
            likes: "J'aime",
            comment: "Ajouter un commentaire..."
        }
    };

    // عناصر الصفحة
    const loginPage = document.getElementById('login-page');
    const signupPage = document.getElementById('signup-page');
    const mainPage = document.getElementById('main-page');
    const showSignup = document.getElementById('show-signup');
    const showLogin = document.getElementById('show-login');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const feedContainer = document.getElementById('feed-container');
    const themeToggle = document.getElementById('theme-toggle');
    const openSettings = document.getElementById('open-settings');
    const settingsModal = document.getElementById('settings-modal');
    const closeModal = document.querySelector('.close-modal');
    const logoutBtn = document.getElementById('logout-btn');
    const langSelect = document.getElementById('lang-select');
    const fontFamilySelect = document.getElementById('font-family-select');
    const fontSizeSelect = document.getElementById('font-size-select');

    let currentUser = null;

    // التنقل بين تسجيل الدخول والإنشاء
    showSignup.addEventListener('click', (e) => {
        e.preventDefault();
        loginPage.classList.remove('active');
        signupPage.classList.add('active');
    });

    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        signupPage.classList.remove('active');
        loginPage.classList.add('active');
    });

    // تسجيل الدخول
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value.toLowerCase().trim();
        const username = email.split('@')[0];
        handleLogin(email, username);
    });

    // إنشاء حساب
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('signup-email').value.toLowerCase().trim();
        const username = document.getElementById('signup-username').value.trim();
        handleLogin(email, username);
    });

    function handleLogin(email, username) {
        const isVerified = VERIFIED_EMAILS.includes(email);
        currentUser = { email, username, isVerified };

        loginPage.classList.remove('active');
        signupPage.classList.remove('active');
        mainPage.classList.add('active');

        loadFeed();
    }

    // تسجيل الخروج
    logoutBtn.addEventListener('click', () => {
        currentUser = null;
        settingsModal.style.display = 'none';
        mainPage.classList.remove('active');
        loginPage.classList.add('active');
    });

    // الوضع المظلم
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });

    // الإعدادات
    openSettings.addEventListener('click', () => {
        settingsModal.style.display = 'flex';
    });

    closeModal.addEventListener('click', () => {
        settingsModal.style.display = 'none';
    });

    // تغيير اللغات
    langSelect.addEventListener('change', (e) => {
        const lang = e.target.value;
        document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;

        document.querySelectorAll('[data-i18n]').forEach(elem => {
            const key = elem.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                elem.textContent = translations[lang][key];
            }
        });
    });

    // إعدادات الخطوط
    fontFamilySelect.addEventListener('change', (e) => {
        document.documentElement.style.setProperty('--font-family', e.target.value);
    });

    fontSizeSelect.addEventListener('change', (e) => {
        document.documentElement.style.setProperty('--font-size', e.target.value);
    });

    // تحميل التغذية (Posts)
    function loadFeed() {
        feedContainer.innerHTML = '';

        // منشور المستخدم الحالي
        const userPost = {
            username: currentUser.username,
            isVerified: currentUser.isVerified,
            avatar: 'https://picsum.photos/100/100?random=1',
            image: 'https://picsum.photos/600/600?random=10',
            likes: 125,
            caption: 'أهلاً بكم في تطبيقي الجديد المطور بكل الحب! ❤️🚀'
        };

        // منشورات تجريبية أخرى
        const defaultPosts = [
            userPost,
            {
                username: 'legaendamory',
                isVerified: VERIFIED_EMAILS.includes('legaendamory@gmail.com'),
                avatar: 'https://picsum.photos/100/100?random=5',
                image: 'https://picsum.photos/600/600?random=11',
                likes: 892,
                caption: 'تصميم واجهة مستخدم جديدة مستوحاة من انستغرام ✨'
            },
            {
                username: 'tech_lover',
                isVerified: false,
                avatar: 'https://picsum.photos/100/100?random=6',
                image: 'https://picsum.photos/600/600?random=12',
                likes: 45,
                caption: 'يوم جميل للبرمجة والتعلم! 💻'
            }
        ];

        defaultPosts.forEach(post => {
            feedContainer.appendChild(createPostElement(post));
        });
    }

    function createPostElement(post) {
        const card = document.createElement('div');
        card.className = 'post-card';

        const verifiedBadgeHtml = post.isVerified 
            ? '<i class="fas fa-check-circle verified-badge" title="حساب موثق"></i>' 
            : '';

        card.innerHTML = `
            <div class="post-header">
                <img src="${post.avatar}" class="post-avatar" alt="${post.username}">
                <div class="post-user-info">
                    <span class="post-username">${post.username}</span>
                    ${verifiedBadgeHtml}
                </div>
            </div>
            <img src="${post.image}" class="post-image" alt="منشور">
            <div class="post-actions">
                <div class="post-actions-left">
                    <i class="far fa-heart like-btn"></i>
                    <i class="far fa-comment"></i>
                    <i class="far fa-paper-plane"></i>
                </div>
                <i class="far fa-bookmark"></i>
            </div>
            <div class="post-likes"><span class="like-count">${post.likes}</span> <span data-i18n="likes">تسجيل إعجاب</span></div>
            <div class="post-caption">
                <strong>${post.username}</strong> ${post.caption}
            </div>
        `;

        // إمكانية الإعجاب
        const likeBtn = card.querySelector('.like-btn');
        const likeCount = card.querySelector('.like-count');
        let isLiked = false;

        likeBtn.addEventListener('click', () => {
            isLiked = !isLiked;
            if (isLiked) {
                likeBtn.className = 'fas fa-heart like-btn';
                likeBtn.style.color = '#ed4956';
                likeCount.textContent = parseInt(likeCount.textContent) + 1;
            } else {
                likeBtn.className = 'far fa-heart like-btn';
                likeBtn.style.color = '';
                likeCount.textContent = parseInt(likeCount.textContent) - 1;
            }
        });

        return card;
    }
});
