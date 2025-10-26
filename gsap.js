
        // Ensure content is visible if GSAP fails to load
        document.querySelectorAll('.skill-card, .reel-item').forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'none';
        });

        document.addEventListener('DOMContentLoaded', () => {
            // Register GSAP plugins
            gsap.registerPlugin(ScrollTrigger);

            // Animate hero content
            gsap.from('.hero-content h1', {
                y: 30,
                opacity: 0,
                duration: 1,
                delay: 0.5
            });

            gsap.from('.hero-content h2', {
                y: 30,
                opacity: 0,
                duration: 1,
                delay: 0.7
            });

            gsap.from('.hero-content p', {
                y: 30,
                opacity: 0,
                duration: 1,
                delay: 0.9
            });

            // Animate portrait
            gsap.from('.portrait-container', {
                x: -50,
                opacity: 0,
                duration: 1,
                delay: 0.3
            });

            // About section animations
            gsap.from('.about-content h2', {
                y: 50,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: '.about-content',
                    start: 'top 80%',
                }
            });

            gsap.from('.about-content p', {
                y: 30,
                opacity: 0,
                duration: 1,
                delay: 0.2,
                scrollTrigger: {
                    trigger: '.about-content',
                    start: 'top 80%',
                }
            });

            gsap.from('.skill-card', {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: '.expertise-section',
                    start: 'top 80%',
                    once: true,
                  
                }
            });

            gsap.from('.skill-icon', {
                scale: 0.5,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                delay: 0.3,
                scrollTrigger: {
                    trigger: '.skills-grid',
                    start: 'top 80%',
                }
            });

            // Animate reel items on scroll
            gsap.from('.reel-item', {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: '.reel-showcase',
                    start: 'top 80%',
                    end: 'top 20%',
                    toggleActions: 'play none none reverse',
                    once: true
                }
            });

            // Video functionality for reel items
            const videoModal = document.querySelector('.video-modal');
            const modalVideo = videoModal.querySelector('video');
            const closeVideo = document.querySelector('.close-video');
            const reelItems = document.querySelectorAll('.reel-item');

            // Function to close video modal
            function closeVideoModal() {
                videoModal.classList.remove('active');
                document.body.style.overflow = '';
                setTimeout(() => {
                    modalVideo.pause();
                    modalVideo.removeAttribute('src');
                }, 500);
            }

            // Function to open video modal
            function openVideoModal(videoUrl) {
                modalVideo.src = videoUrl;
                document.body.style.overflow = 'hidden';
                videoModal.classList.add('active');
                modalVideo.play().catch(err => console.log('Auto-play prevented'));
            }

            reelItems.forEach(item => {
                const videoUrl = item.dataset.video;
                
                item.addEventListener('click', () => {
                    openVideoModal(videoUrl);
                });

                // Add loading animation
                const img = item.querySelector('img');
                if (img) {
                    img.addEventListener('load', () => {
                        item.classList.add('loaded');
                    });
                }
            });

            // Close modal when clicking the close button
            closeVideo.addEventListener('click', closeVideoModal);

            // Close modal when clicking outside the video
            videoModal.addEventListener('click', (e) => {
                if (e.target === videoModal) {
                    closeVideoModal();
                }
            });

            // Close modal with Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && videoModal.classList.contains('active')) {
                    closeVideoModal();
                }
            });

            // Smooth scroll for navigation
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    const navHeight = document.querySelector('.nav').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                });
            });
        });
