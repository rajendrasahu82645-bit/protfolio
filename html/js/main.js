// =========================================================
// RAJENDRA - PORTFOLIO INTERACTION ENGINE (main.js)
// Production-Ready, Smooth Typing, Precise Scroll & Interactions
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

    // =========================================================
    // 1. MOBILE NAVBAR TOGGLE & OUTSIDE CLICK CLOSE
    // =========================================================
    const menuBtn = document.querySelector(".menu-btn");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-menu a");

    function closeMobileMenu() {
        if (navMenu && navMenu.classList.contains("active")) {
            navMenu.classList.remove("active");
            if (menuBtn) {
                const icon = menuBtn.querySelector("i");
                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            }
        }
    }

    if (menuBtn && navMenu) {
        menuBtn.addEventListener("click", function (event) {
            event.stopPropagation();
            navMenu.classList.toggle("active");
            const icon = menuBtn.querySelector("i");
            if (icon) {
                if (navMenu.classList.contains("active")) {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");
                } else {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            }
        });
    }

    // Close when a nav link is clicked
    navLinks.forEach(function (link) {
        link.addEventListener("click", closeMobileMenu);
    });

    // Close when clicking outside of menu
    document.addEventListener("click", function (event) {
        if (navMenu && navMenu.classList.contains("active")) {
            if (!navMenu.contains(event.target) && !menuBtn.contains(event.target)) {
                closeMobileMenu();
            }
        }
    });


    // =========================================================
    // 2. HEADER SHADOW & BACK TO TOP BUTTON ON SCROLL
    // =========================================================
    const header = document.querySelector(".header");
    const backToTopBtn = document.getElementById("back-to-top");

    function handleScrollEffects() {
        const scrollY = window.scrollY;

        // Header shadow
        if (header) {
            if (scrollY > 40) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        }

        // Back to top button visibility
        if (backToTopBtn) {
            if (scrollY > 400) {
                backToTopBtn.classList.add("visible");
            } else {
                backToTopBtn.classList.remove("visible");
            }
        }
    }

    window.addEventListener("scroll", handleScrollEffects, { passive: true });
    handleScrollEffects();

    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }


    // =========================================================
    // 3. ACCURATE ACTIVE NAV LINK TRACKING
    // =========================================================
    const sections = document.querySelectorAll("section[id]");

    function updateActiveNavLink() {
        let currentId = "";
        const scrollPosition = window.scrollY + 140;
        const isPageBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 60);

        if (isPageBottom) {
            currentId = "contact";
        } else {
            sections.forEach(function (section) {
                const sectionTop = section.getBoundingClientRect().top + window.scrollY;
                const sectionHeight = section.offsetHeight;
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentId = section.getAttribute("id");
                }
            });
        }

        if (!currentId && sections.length > 0) {
            currentId = sections[0].getAttribute("id");
        }

        navLinks.forEach(function (link) {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentId}`) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", updateActiveNavLink, { passive: true });
    updateActiveNavLink();


    // =========================================================
    // 4. SMOOTH TYPEWRITER EFFECT (NO FLICKER ON LOAD)
    // =========================================================
    const typingText = document.getElementById("typing-text");

    if (typingText) {
        const roles = [
            "Full Stack Developer",
            "MERN Stack Specialist",
            "Backend & API Developer",
            "Frontend Engineer"
        ];

        // Start with the initial role displayed, wait before deleting
        typingText.textContent = roles[0];
        let roleIndex = 0;
        let charIndex = roles[0].length;
        let isDeleting = true;

        function typeLoop() {
            const currentRole = roles[roleIndex];

            if (!isDeleting) {
                typingText.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;

                if (charIndex === currentRole.length) {
                    isDeleting = true;
                    setTimeout(typeLoop, 2200);
                    return;
                }
            } else {
                typingText.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;

                if (charIndex === 0) {
                    isDeleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                    setTimeout(typeLoop, 350);
                    return;
                }
            }

            setTimeout(typeLoop, isDeleting ? 45 : 85);
        }

        // Wait 2.2 seconds before starting first delete cycle
        setTimeout(typeLoop, 2200);
    }


    // =========================================================
    // 5. ANIMATE SKILL PROGRESS BARS ON SCROLL (SMOOTH GROW)
    // =========================================================
    const progressBars = document.querySelectorAll(".progress-bar");

    if ("IntersectionObserver" in window && progressBars.length > 0) {
        progressBars.forEach(function (bar) {
            const initialWidth = bar.getAttribute("data-width") || bar.style.width || "0%";
            bar.setAttribute("data-width", initialWidth);
            bar.style.width = "0%";
        });

        const progressObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const targetWidth = bar.getAttribute("data-width");
                    setTimeout(function () {
                        bar.style.width = targetWidth;
                    }, 80);
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.25 });

        progressBars.forEach(function (bar) {
            progressObserver.observe(bar);
        });
    }


    // =========================================================
    // 6. INTERACTIVE CONTACT FORM WITH VALIDATION
    // =========================================================
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const nameInput = document.getElementById("contact-name");
            const emailInput = document.getElementById("contact-email");
            const messageInput = document.getElementById("contact-message");

            const name = nameInput ? nameInput.value.trim() : "";
            const email = emailInput ? emailInput.value.trim() : "";
            const message = messageInput ? messageInput.value.trim() : "";

            if (!name || !email || !message) {
                if (formStatus) {
                    formStatus.textContent = "Please fill in all required fields.";
                    formStatus.className = "form-status error";
                }
                return;
            }

            // Simple email format check
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                if (formStatus) {
                    formStatus.textContent = "Please enter a valid email address.";
                    formStatus.className = "form-status error";
                }
                return;
            }

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.innerHTML : "Send Message";

            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
            }

            setTimeout(function () {
                if (submitBtn) {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }

                if (formStatus) {
                    formStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been sent successfully.';
                    formStatus.className = "form-status success";

                    setTimeout(function () {
                        formStatus.textContent = "";
                        formStatus.className = "form-status";
                    }, 5000);
                }

                contactForm.reset();
            }, 700);
        });
    }

});
