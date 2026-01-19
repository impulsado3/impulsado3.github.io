// TBT Boxing - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Inicializar Twitch y Video
    initializeTwitchStream();
    
    // Smooth scroll para los links de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Navbar transparente al hacer scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(0, 0, 0, 0.9)';
            } else {
                navbar.style.background = 'transparent';
            }
        });
    }
});

// Función para inicializar el stream de Twitch o wallpaper
async function initializeTwitchStream() {
    const twitchEmbed = document.getElementById('twitch-embed');
    const heroBackground = document.getElementById('hero-background');
    const channelName = 'impulsado';

    // Verificar si el canal está en directo
    async function checkIfLive() {
        try {
            const response = await fetch(`https://decapi.me/twitch/uptime/${channelName}`);
            const data = await response.text();
            
            // Si el canal está offline, la API devuelve un mensaje de error
            const isOffline = data.includes('offline') || data.includes('error');
            
            if (isOffline) {
                // Canal offline - mostrar wallpaper
                showBackground();
            } else {
                // Canal en directo - mostrar stream
                showStream();
            }
        } catch (error) {
            // En caso de error, mostrar el wallpaper por defecto
            console.error('Error verificando estado del stream:', error);
            showBackground();
        }
    }

    // Mostrar wallpaper de fondo
    function showBackground() {
        if (heroBackground) {
            heroBackground.style.display = 'block';
        }
        if (twitchEmbed) {
            twitchEmbed.style.display = 'none';
        }
    }

    // Mostrar stream de Twitch
    function showStream() {
        if (heroBackground) {
            heroBackground.style.display = 'none';
        }
        if (twitchEmbed) {
            twitchEmbed.style.display = 'block';
            
            // Inicializar embed de Twitch si existe la librería
            if (typeof Twitch !== 'undefined' && !twitchEmbed.querySelector('iframe')) {
                new Twitch.Embed('twitch-embed', {
                    width: '100%',
                    height: '100%',
                    channel: channelName,
                    layout: 'video',
                    autoplay: true,
                    muted: true,
                    parent: ['impulsado.github.io', 'localhost']
                });
            }
        }
    }

    // Verificar estado del stream al cargar
    await checkIfLive();
    
    // Verificar cada 2 minutos si el estado cambió
    setInterval(checkIfLive, 120000);
}