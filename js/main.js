document.addEventListener('DOMContentLoaded', () => {
    // Funcionalidad de copiar código
    document.querySelectorAll('.code-container').forEach(container => {
        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.textContent = 'Copiar';
        container.appendChild(button);

        button.addEventListener('click', async () => {
            const code = container.querySelector('code').innerText;
            try {
                await navigator.clipboard.writeText(code);
                button.textContent = '¡Copiado!';
                button.classList.add('copied');
                setTimeout(() => {
                    button.textContent = 'Copiar';
                    button.classList.remove('copied');
                }, 2000);
            } catch (err) {
                console.error('Error al copiar el texto: ', err);
                button.textContent = 'Error';
            }
        });
    });

    // Marcar el enlace activo según la página actual
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href && (href.includes(currentPage) || (currentPage === '' && href === 'index.html'))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Toggle de menú móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const aside = document.querySelector('aside');
    const overlay = document.querySelector('.overlay');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            aside.classList.toggle('active');
            overlay.classList.toggle('active');
        });
    }

    if (overlay) {
        overlay.addEventListener('click', () => {
            aside.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

    // Cerrar menú al hacer clic en un enlace (móvil)
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                aside.classList.remove('active');
                overlay.classList.remove('active');
            }
        });
    });

    // Toggle submenu navigation
    document.querySelectorAll('.parent-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const parent = link.closest('.nav-item-parent');
            const submenu = parent.querySelector('.nav-submenu');
            
            if (submenu) {
                e.preventDefault();
                parent.classList.toggle('open');
                submenu.classList.toggle('active');
            }
        });
    });

    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Cerrar menú móvil si está abierto
                if (window.innerWidth <= 768) {
                    document.querySelector('aside')?.classList.remove('active');
                    document.querySelector('.overlay')?.classList.remove('active');
                }
            }
        });
    });

    // Scroll Spy mejorado para sidebar y TOC
    const sections = document.querySelectorAll('section[id]');
    const sidebarLinks = document.querySelectorAll('.nav-submenu a');
    const tocLinks = document.querySelectorAll('.toc a');

    function highlightActiveSection() {
        let current = '';
        const scrollPosition = window.pageYOffset + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        // Update sidebar submenu
        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });

        // Update TOC
        tocLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    if (sections.length > 0) {
        window.addEventListener('scroll', highlightActiveSection);
        highlightActiveSection(); // Ejecutar al cargar
    }
});
