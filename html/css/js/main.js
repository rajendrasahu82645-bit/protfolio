// =========================================================
// CHANDAN DASH - PORTFOLIO INTERACTION ENGINE (main.js)
// Clean, Lightweight & Fully Functional
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

    // ============================
    // 1. MOBILE NAVBAR TOGGLE
    // ============================
    const menuBtn = document.querySelector(".menu-btn");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-menu a");

    if (menuBtn && navMenu) {
        menuBtn.addEventListener("click", function () {
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

    // Close mobile menu when a nav link is clicked
    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            if (navMenu) navMenu.classList.remove("active");
            if (menuBtn) {
                const icon = menuBtn.querySelector("i");
                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            }
        });
    });


    // ============================
    // 2. HEADER SHADOW ON SCROLL
    // ============================
    const header = document.querySelector(".header");

    window.addEventListener("scroll", function () {
        if (header) {
            if (window.scrollY > 40) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        }
    });


    // ============================
    // 3. ACTIVE NAV LINK ON SCROLL
    // ============================
    const sections = document.querySelectorAll("section[id]");

    window.addEventListener("scroll", function () {
        const scrollY = window.pageYOffset;

        sections.forEach(function (current) {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute("id");

            const activeLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);
            if (activeLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    activeLink.classList.add("active");
                } else {
                    activeLink.classList.remove("active");
                }
            }
        });
    });


    // ============================
    // 4. TYPEWRITER EFFECT
    // ============================
    const typingText = document.getElementById("typing-text");

    if (typingText) {
        const words = [
            "Frontend Developer",
            "Web Designer",
            "Web Developer"
        ];

        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentWord = words[wordIndex];

            if (!isDeleting) {
                typingText.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;

                if (charIndex === currentWord.length) {
                    isDeleting = true;
                    setTimeout(typeEffect, 1500);
                    return;
                }
            } else {
                typingText.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;

                if (charIndex === 0) {
                    isDeleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                }
            }

            setTimeout(typeEffect, isDeleting ? 60 : 110);
        }

        typeEffect();
    }


    // ============================
    // 5. CONTACT FORM HANDLING
    // ============================
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn ? submitBtn.textContent : "Send Message";

            if (submitBtn) {
                submitBtn.textContent = "Sending...";
                submitBtn.disabled = true;
            }

            setTimeout(function () {
                if (submitBtn) {
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                }

                if (formStatus) {
                    formStatus.textContent = "Thank you! Your message has been received successfully.";
                    formStatus.className = "form-status success";

                    setTimeout(function () {
                        formStatus.textContent = "";
                    }, 5000);
                }

                contactForm.reset();
            }, 600);
        });
    }

});
