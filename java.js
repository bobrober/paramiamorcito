const envelope = document.getElementById('envelope');
        const letterContainer = document.getElementById('letterContainer');
        const closeBtn = document.getElementById('closeBtn');
        const responseArea = document.getElementById('responseArea');
        const moodButtons = document.querySelectorAll('.mood-btn');
        const currentDate = document.getElementById('currentDate');
        const floatingHearts = document.getElementById('floatingHearts');
        const matrixHearts = document.getElementById('matrixHearts');

        // Crear efecto Matrix de corazones
        function createMatrixHearts() {
            const screenWidth = window.innerWidth;
            const columnWidth = 25;
            const numColumns = Math.floor(screenWidth / columnWidth);
            
            // Limpiar columnas existentes
            matrixHearts.innerHTML = '';
            
            for (let i = 0; i < numColumns; i++) {
                const column = document.createElement('div');
                column.className = 'heart-column';
                column.style.left = i * columnWidth + 'px';
                column.style.animationDuration = (Math.random() * 3 + 2) + 's';
                column.style.animationDelay = Math.random() * 2 + 's';
                
                // Solo UN corazón por columna
                const heartTypes = ['💖', '💕', '💗', '💓', '💝', '❤️', '🧡', '💛', '💚', '💙', '💜'];
                const heart = document.createElement('span');
                heart.className = 'matrix-heart';
                heart.textContent = heartTypes[Math.floor(Math.random() * heartTypes.length)];
                heart.style.opacity = Math.random() * 0.4 + 0.8;
                column.appendChild(heart);
                
                matrixHearts.appendChild(column);
            }
        }

        // Reiniciar columnas cuando termine la animación
        function restartMatrixEffect() {
            const columns = document.querySelectorAll('.heart-column');
            columns.forEach(column => {
                column.addEventListener('animationend', () => {
                    // Reiniciar la animación
                    column.style.animation = 'none';
                    setTimeout(() => {
                        column.style.animationDuration = (Math.random() * 3 + 2) + 's';
                        column.style.animationDelay = Math.random() * 2 + 's';
                        column.style.animation = 'heartFall linear infinite';
                    }, 10);
                });
            });
        }

        // Establecer fecha actual
        const today = new Date();
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            weekday: 'long'
        };
        currentDate.textContent = today.toLocaleDateString('es-ES', options);

        // Respuestas personalizadas según el estado de ánimo
        const moodResponses = {
            feliz: "¡Mi amor! Saber que te hago feliz es como si el mismo cielo se abriera para mí. Tu felicidad es mi razón de vivir, mi amorcito hermoso. Cada sonrisa tuya vale más que todo el oro del mundo. Sigamos llenando nuestros días de esa alegría que solo nosotros sabemos crear juntos. Te amo infinito. 💫🌟",
            agradecida: "Mi reina linda, tu gratitud me llega hasta el alma, pero déjame decirte que soy yo quien vive eternamente agradecido por tenerte. Tú eres el regalo más hermoso que la vida me pudo dar, mi amor. Gracias a ti por existir, por amarme, por ser mi todo. Te adoro con locura. 💝",
            emocionada: "¡Amor mío! Esa emoción tuya me contagia y hace que mi corazón lata aún más fuerte por ti. Me encanta ver cómo esto que tenemos te llena de ilusión, porque a mí me tiene viviendo en las nubes. Estos meses juntos son apenas el inicio de toda una vida a tu lado, mi princesa hermosa. 🌟💕",
            bendecida: "Mi amor divino, yo también me siento bendecido cada segundo de mi vida por tenerte. Dios sabía exactamente lo que hacía cuando te puso en mi camino, amorcito. Eres mi mayor bendición, mi milagro, mi todo. Gracias a Dios por regalarte a mí. Te amo con toda mi alma. 🙏✨",
            especial: "¡Porque ERES especial, mi amor! Eres única en este mundo, irreemplazable, perfecta a mis ojos. No existe nadie como tú, mi reina hermosa. Nunca olvides lo especial que eres para mí, lo mucho que vales y lo inmensamente que te amo. Eres mi princesa, mi todo, mi vida entera. 👑💖"
        };

        // Abrir carta
        envelope.addEventListener('click', () => {
            envelope.classList.add('open');
            setTimeout(() => {
                letterContainer.classList.add('show');
                createFloatingHearts();
            }, 400);
        });

        // Cerrar carta
        closeBtn.addEventListener('click', () => {
            letterContainer.classList.remove('show');
            setTimeout(() => {
                envelope.classList.remove('open');
            }, 300);
        });

        // Cerrar carta haciendo click fuera
        letterContainer.addEventListener('click', (e) => {
            if (e.target === letterContainer) {
                closeBtn.click();
            }
        });

        // Selector de estado de ánimo
        moodButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remover clase active de todos los botones
                moodButtons.forEach(btn => btn.classList.remove('active'));
                
                // Agregar clase active al botón seleccionado
                button.classList.add('active');
                
                // Mostrar respuesta personalizada
                const mood = button.getAttribute('data-mood');
                responseArea.textContent = moodResponses[mood];
                responseArea.classList.add('has-content');
                
                // Efecto de corazones flotantes
                createFloatingHearts();
                
                // Efecto de vibración sutil
                button.style.animation = 'none';
                setTimeout(() => {
                    button.style.animation = 'pulse 0.5s ease';
                }, 10);
            });
        });

        // Crear corazones flotantes
        function createFloatingHearts() {
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const heart = document.createElement('div');
                    heart.className = 'heart';
                    heart.textContent = '💖';
                    heart.style.left = Math.random() * 100 + 'vw';
                    heart.style.animationDelay = Math.random() * 2 + 's';
                    floatingHearts.appendChild(heart);
                    
                    // Remover corazón después de la animación
                    setTimeout(() => {
                        heart.remove();
                    }, 3000);
                }, i * 200);
            }
        }

        // Efecto de partículas al mover el mouse
        document.addEventListener('mousemove', (e) => {
            if (Math.random() > 0.98) {
                const sparkle = document.createElement('div');
                sparkle.style.position = 'fixed';
                sparkle.style.left = e.clientX + 'px';
                sparkle.style.top = e.clientY + 'px';
                sparkle.style.width = '4px';
                sparkle.style.height = '4px';
                sparkle.style.background = '#667eea';
                sparkle.style.borderRadius = '50%';
                sparkle.style.pointerEvents = 'none';
                sparkle.style.animation = 'fadeInUp 1s ease forwards';
                sparkle.style.zIndex = '999';
                document.body.appendChild(sparkle);
                
                setTimeout(() => {
                    sparkle.remove();
                }, 1000);
            }
        });

        // Efecto de sonido (simulado con vibración en dispositivos móviles)
        function playInteractionEffect() {
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
        }

        // Agregar efecto de sonido a los botones
        moodButtons.forEach(button => {
            button.addEventListener('click', playInteractionEffect);
        });

        envelope.addEventListener('click', playInteractionEffect);
        closeBtn.addEventListener('click', playInteractionEffect);

        // Inicializar efecto Matrix
        createMatrixHearts();
        setTimeout(() => {
            restartMatrixEffect();
        }, 100);

        // Recrear Matrix en cambio de tamaño de ventana
        window.addEventListener('resize', () => {
            createMatrixHearts();
            restartMatrixEffect();
        });