document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       EXPERIENCE COUNTER
    ========================================= */

    const counter = document.getElementById("experience");

    if (counter) {

        let count = 0;
        const target = 5;
        const speed = 400; // milliseconds

        const timer = setInterval(() => {

            count++;
            counter.textContent = count;

            if (count >= target) {
                clearInterval(timer);
            }

        }, speed);

    }

    /* =========================================
       SCROLL REVEAL (skills cards etc.)
    ========================================= */

    const reveals = document.querySelectorAll(".reveal");

    function checkReveals() {

        const windowHeight = window.innerHeight;

        reveals.forEach((item) => {

            const top = item.getBoundingClientRect().top;

            if (top < windowHeight - 100) {
                item.classList.add("active");
            }

        });

    }

    window.addEventListener("scroll", checkReveals);
    checkReveals(); // run once on load in case items are already in view


    /* =========================================
       LOAD MORE PROJECTS
    ========================================= */

    const loadMoreButton = document.getElementById("loadMoreProjects");
    const hiddenProjects = document.querySelectorAll(".hidden-project");

    if (loadMoreButton) {

        loadMoreButton.addEventListener("click", function () {

            hiddenProjects.forEach(function (project) {
                project.classList.add("show");
            });

            /* Hide button after loading all hidden projects */
            loadMoreButton.style.display = "none";

        });

    }


    /* =========================================
       LIGHTBOX
    ========================================= */

    const lightbox = document.getElementById("projectLightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxClose = document.getElementById("lightboxClose");

    if (lightbox && lightboxImage && lightboxClose) {

        /* Open image */
        document.querySelectorAll(".project-preview").forEach(function (preview) {

            preview.addEventListener("click", function () {

                const image = this.querySelector("img");

                if (image) {
                    lightboxImage.src = image.src;
                }

                lightbox.classList.add("active");
                document.body.style.overflow = "hidden";

            });

        });

        /* Close button */
        lightboxClose.addEventListener("click", function () {
            lightbox.classList.remove("active");
            document.body.style.overflow = "";
        });

        /* Click outside image */
        lightbox.addEventListener("click", function (event) {

            if (event.target === lightbox) {
                lightbox.classList.remove("active");
                document.body.style.overflow = "";
            }

        });

        /* ESC key */
        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {
                lightbox.classList.remove("active");
                document.body.style.overflow = "";
            }

        });

    }


    /* =========================================
       MOBILE MENU TOGGLE (was missing — this is
       why the hamburger button did nothing)
    ========================================= */

    const navToggle = document.getElementById("navToggle");
    const navLinks = document.querySelector(".nav-links");
    const navToggleIcon = navToggle ? navToggle.querySelector("i") : null;

    if (navToggle && navLinks) {

        navToggle.addEventListener("click", function () {

            const isOpen = navLinks.classList.toggle("active");

            /* swap bars icon <-> close icon */
            if (navToggleIcon) {
                navToggleIcon.classList.toggle("fa-bars", !isOpen);
                navToggleIcon.classList.toggle("fa-xmark", isOpen);
            }

        });

        /* Close the menu after tapping a link */
        navLinks.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {
                navLinks.classList.remove("active");

                if (navToggleIcon) {
                    navToggleIcon.classList.remove("fa-xmark");
                    navToggleIcon.classList.add("fa-bars");
                }

            });

        });

        /* Close the menu on outside click */
        document.addEventListener("click", function (event) {

            const clickedInsideMenu = navLinks.contains(event.target);
            const clickedToggle = navToggle.contains(event.target);

            if (!clickedInsideMenu && !clickedToggle && navLinks.classList.contains("active")) {
                navLinks.classList.remove("active");

                if (navToggleIcon) {
                    navToggleIcon.classList.remove("fa-xmark");
                    navToggleIcon.classList.add("fa-bars");
                }
            }

        });

    }

});


// Animated counters (About section + Hero experience counter)
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter, #experience');

    const animateCounter = (el) => {
        const target = +el.getAttribute('data-target');
        const duration = 1800;
        let startTime = null;

        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // easeOutCubic for a smoother finish instead of linear
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target);

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target;
            }
        };

        requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.6 });

    counters.forEach(counter => observer.observe(counter));
});
