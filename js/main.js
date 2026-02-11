document.addEventListener('DOMContentLoaded', () => {
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
        if (link.getAttribute('href').includes(currentPage)) {
            link.classList.add('active');
        }
    });
});
