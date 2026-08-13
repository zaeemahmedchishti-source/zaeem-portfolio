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

});


// Animated counters (About section + Hero experience counter)
const counters = document.querySelectorAll('.counter, #experience');

const animateCounter = (el) => {
    const target = +el.getAttribute('data-target');
    const duration = 1500; // ms
    const startTime = performance.now();

    const update = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const value = Math.floor(progress * target);
        el.textContent = value;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.textContent = target; // ensure it lands exactly on target
        }
    };

    requestAnimationFrame(update);
};

const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target); // run once
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));


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


document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter, #experience');

    const animateCounter = (el) => {
        const target = +el.getAttribute('data-target');
        const duration = 1800;
        let startTime = null;

        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
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