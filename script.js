// Initialize GSAP and ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);
// Loading screen animation
const mainContent = document.querySelector('.main-content');

// Initial loading animation

// Progress bar animation

function initMainContent() {
    // Mouse tracking variables
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    // Custom cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;

    document.addEventListener('mousemove', (e) => {
        let mouseX = e.clientX;
        let mouseY = e.clientY;

        gsap.ticker.add(() => {
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;

            gsap.set(cursor, {
                x: cursorX - 10,
                y: cursorY - 10
            });
            gsap.set(cursorFollower, {
                x: followerX - 20,
                y: followerY - 20
            });
        });
    });

    // Mouse-following text effect
    const textSection = document.querySelector('.text-section');
    const enWrapper = document.querySelector('.text-wrapper.en');
    const frWrapper = document.querySelector('.text-wrapper.fr');
    let activeWrapper = enWrapper;
    let followText = activeWrapper.querySelector('.main-text-follow');

    textSection.addEventListener('mousemove', (e) => {
        const rect = textSection.getBoundingClientRect();
        mouseX = e.clientX - rect.left - rect.width / 2;
        mouseY = e.clientY - rect.top - rect.height / 2;
    });

    function animate() {
        // Smooth follow with easing (increased speed)
        const easeFactor = 0.2;
        currentX += (mouseX - currentX) * easeFactor;
        currentY += (mouseY - currentY) * easeFactor;

        // Apply transform to both language texts
        if (followText) {
            followText.style.transform = `translate(${currentX * 0.5}px, ${currentY * 0.5}px)`;
        }

        requestAnimationFrame(animate);
    }

    animate();

    // Language switch functionality
    const langButtons = document.querySelectorAll('.lang-btn');

    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            langButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const tl = gsap.timeline();
            
            if (btn.dataset.lang === 'fr') {
                tl.to(enWrapper, {
                    opacity: 0,
                    y: -20,
                    duration: 0.5,
                    onComplete: () => {
                        enWrapper.style.display = 'none';
                        frWrapper.style.display = 'flex';
                        // Update active wrapper and follow text
                        activeWrapper = frWrapper;
                        followText = activeWrapper.querySelector('.main-text-follow');
                        // Reset position for new text
                        followText.style.transform = `translate(${currentX * 0.5}px, ${currentY * 0.5}px)`;
                    }
                })
                .fromTo(frWrapper, 
                    {
                        opacity: 0,
                        y: 20
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: 'power2.out'
                    }
                );
            } else {
                tl.to(frWrapper, {
                    opacity: 0,
                    y: -20,
                    duration: 0.5,
                    onComplete: () => {
                        frWrapper.style.display = 'none';
                        enWrapper.style.display = 'flex';
                        // Update active wrapper and follow text
                        activeWrapper = enWrapper;
                        followText = activeWrapper.querySelector('.main-text-follow');
                        // Reset position for new text
                        followText.style.transform = `translate(${currentX * 0.5}px, ${currentY * 0.5}px)`;
                    }
                })
                .fromTo(enWrapper, 
                    {
                        opacity: 0,
                        y: 20
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: 'power2.out'
                    }
                );
            }
        });
    });

    // Navbar hover animations
    const navLinks = document.querySelectorAll('.nav-link');
    const logo = document.querySelector('.logo h1');

    // Magnetic effect for logo
    logo.addEventListener('mousemove', (e) => {
        const rect = logo.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(logo, {
            x: x * 0.2,
            y: y * 0.2,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    logo.addEventListener('mouseleave', () => {
        gsap.to(logo, {
            x: 0,
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    // Hover effect for nav links
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(link, {
                scale: 1.1,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            // Add glowing effect
            const glow = document.createElement('div');
            glow.className = 'nav-link-glow';
            link.appendChild(glow);
            
            gsap.fromTo(glow, 
                {
                    opacity: 0,
                    scale: 0.5
                },
                {
                    opacity: 0.2,
                    scale: 1.5,
                    duration: 0.5,
                    ease: 'power2.out',
                    onComplete: () => glow.remove()
                }
            );
        });
        
        link.addEventListener('mouseleave', () => {
            gsap.to(link, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Image hover animations with GSAP
    const imageContainers = document.querySelectorAll('.image-container');

    function setupImageHoverEffects(container) {
        const img = container.querySelector('img');
        const title = container.querySelector('.image-title');
        const titleText = title.childNodes[0];
        const titleSpan = title.querySelector('span');
        
        container.addEventListener('mouseenter', (e) => {
            // Create a timeline for hover animation
            const tl = gsap.timeline();
            
            // Image and container animations
            tl.to(img, {
                scale: 1.1,
                rotation: 2,
                filter: 'brightness(1.2)',
                duration: 0.5,
                ease: 'power2.out'
            })
            .to(container, {
                y: -5,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                duration: 0.3,
                ease: 'power2.out'
            }, 0);

            // Title animations
            gsap.to(title, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: 'power3.out'
            });

            // Split text animation for main title
            const chars = titleText.textContent.trim().split('');
            titleText.textContent = '';
            chars.forEach((char, i) => {
                const span = document.createElement('span');
                span.textContent = char;
                span.style.opacity = '0';
                span.style.display = 'inline-block';
                titleText.appendChild(span);
                
                gsap.to(span, {
                    opacity: 1,
                    y: 0,
                    rotation: 0,
                    duration: 0.3,
                    delay: i * 0.03,
                    ease: 'power2.out'
                });
            });

            // Subtitle animation
            gsap.to(titleSpan, {
                opacity: 0.9,
                y: 0,
                duration: 0.5,
                delay: 0.2,
                ease: 'power2.out'
            });

            // Corner decorations animation
            gsap.to([title.querySelector('::before'), title.querySelector('::after')], {
                opacity: 1,
                scale: 1,
                duration: 0.4,
                ease: 'power2.out'
            });

            // Dim other images
            imageContainers.forEach(other => {
                if (other !== container) {
                    gsap.to(other, {
                        opacity: 0.3,
                        scale: 0.95,
                        filter: 'brightness(0.5)',
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });
        });
        
        container.addEventListener('mouseleave', (e) => {
            const tl = gsap.timeline();
            
            // Reset image and container
            tl.to(img, {
                scale: 1,
                rotation: 0,
                filter: 'brightness(0.8)',
                duration: 0.5,
                ease: 'power2.out'
            })
            .to(container, {
                y: 0,
                boxShadow: 'none',
                duration: 0.3,
                ease: 'power2.out'
            }, 0);

            // Reset title
            gsap.to(title, {
                opacity: 0,
                y: 20,
                duration: 0.3,
                ease: 'power2.in'
            });

            // Reset subtitle
            gsap.to(titleSpan, {
                opacity: 0,
                y: 10,
                duration: 0.3,
                ease: 'power2.in'
            });

            // Reset corner decorations
            gsap.to([title.querySelector('::before'), title.querySelector('::after')], {
                opacity: 0,
                scale: 0.8,
                duration: 0.3,
                ease: 'power2.in'
            });

            // Restore other images
            imageContainers.forEach(other => {
                if (other !== container) {
                    gsap.to(other, {
                        opacity: 1,
                        scale: 1,
                        filter: 'brightness(0.8)',
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });
        });
    }

    imageContainers.forEach(setupImageHoverEffects);

    // Section swapping functionality
    const imageSection = document.querySelector('.image-section');
    let isSwapped = false;

    function swapSections() {
        isSwapped = !isSwapped;
        
        // Create a timeline for the swap animation
        const tl = gsap.timeline();
        
        // Fade out both sections
        tl.to([textSection, imageSection], {
            opacity: 0,
            scale: 0.95,
            duration: 0.5,
            ease: 'power2.inOut'
        });
        
        // Swap positions
        tl.add(() => {
            if (isSwapped) {
                textSection.classList.add('right');
                imageSection.classList.add('left');
            } else {
                textSection.classList.remove('right');
                imageSection.classList.remove('left');
            }
        });
        
        // Fade in both sections
        tl.to([textSection, imageSection], {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: 'power2.inOut'
        });
    }

    textSection.addEventListener('click', swapSections);
    imageSection.addEventListener('click', swapSections);

    // Page entrance animation
    window.addEventListener('load', () => {
        // Initial page transition
        gsap.to('.page-transition', {
            scaleY: 0,
            duration: 1.2,
            ease: 'power4.inOut',
            transformOrigin: 'top',
        });

        // Animate navigation items
        gsap.to('.nav-link', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 0.5
        });

        gsap.to('.lang-btn', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 0.7
        });

        // Animate main text
        gsap.to(['.main-text-bg', '.main-text-follow'], {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power4.out',
            delay: 0.8
        });

        // Animate image containers
        gsap.to('.image-container', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 1
        });
    });
}
initMainContent();