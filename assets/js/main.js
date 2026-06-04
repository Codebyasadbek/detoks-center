document.addEventListener("DOMContentLoaded", () => {
    // --- Treatment Slider ---
    const treatmentSlider = document.querySelector(".treatment__inner");
    if (treatmentSlider) {
        let isDown = false;
        let startX;
        let scrollLeft;

        treatmentSlider.addEventListener("mousedown", (e) => {
            if (window.innerWidth > 480) return;
            isDown = true;
            startX = e.pageX - treatmentSlider.offsetLeft;
            scrollLeft = treatmentSlider.scrollLeft;
            treatmentSlider.style.scrollSnapType = 'none';
            treatmentSlider.style.scrollBehavior = 'auto';
        });

        treatmentSlider.addEventListener("mouseleave", () => {
            if (isDown) {
                isDown = false;
                treatmentSlider.style.scrollSnapType = 'x mandatory';
                treatmentSlider.style.scrollBehavior = 'smooth';
            }
        });

        treatmentSlider.addEventListener("mouseup", () => {
            if (isDown) {
                isDown = false;
                treatmentSlider.style.scrollSnapType = 'x mandatory';
                treatmentSlider.style.scrollBehavior = 'smooth';
            }
        });

        treatmentSlider.addEventListener("mousemove", (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - treatmentSlider.offsetLeft;
            const walk = (x - startX) * 1.5; // Scroll speed
            treatmentSlider.scrollLeft = scrollLeft - walk;
        });
    }

    // --- Feedbacks Slider ---
    const feedbacksSlider = document.querySelector(".feedbacks_blocks");
    const prevBtn = document.querySelector(".feedbacks__btn--prev");
    const nextBtn = document.querySelector(".feedbacks__btn--next");

    if (feedbacksSlider && prevBtn && nextBtn) {
        // Function to update the button active/inactive states
        const updateButtons = () => {
            if (window.innerWidth > 480) return;
            const scrollLeft = feedbacksSlider.scrollLeft;
            const maxScrollLeft = feedbacksSlider.scrollWidth - feedbacksSlider.clientWidth;
            
            // On mobile, if we are at the beginning (scrollLeft near 0)
            if (scrollLeft <= 10) {
                prevBtn.classList.remove("feedbacks__btn--active");
                prevBtn.classList.add("feedbacks__btn--disabled");
                nextBtn.classList.add("feedbacks__btn--active");
                nextBtn.classList.remove("feedbacks__btn--disabled");
            } 
            // If we are at the end (scrollLeft near maxScrollLeft)
            else if (scrollLeft >= maxScrollLeft - 10) {
                prevBtn.classList.add("feedbacks__btn--active");
                prevBtn.classList.remove("feedbacks__btn--disabled");
                nextBtn.classList.remove("feedbacks__btn--active");
                nextBtn.classList.add("feedbacks__btn--disabled");
            } 
            // Somewhere in the middle
            else {
                prevBtn.classList.add("feedbacks__btn--active");
                prevBtn.classList.remove("feedbacks__btn--disabled");
                nextBtn.classList.add("feedbacks__btn--active");
                nextBtn.classList.remove("feedbacks__btn--disabled");
            }
        };

        // Click handlers for buttons
        prevBtn.addEventListener("click", () => {
            if (window.innerWidth > 480) return;
            const blockWidth = feedbacksSlider.querySelector(".block").clientWidth;
            feedbacksSlider.scrollBy({
                left: -blockWidth,
                behavior: "smooth"
            });
        });

        nextBtn.addEventListener("click", () => {
            if (window.innerWidth > 480) return;
            const blockWidth = feedbacksSlider.querySelector(".block").clientWidth;
            feedbacksSlider.scrollBy({
                left: blockWidth,
                behavior: "smooth"
            });
        });

        // Listen to scroll to update button states dynamically
        feedbacksSlider.addEventListener("scroll", () => {
            updateButtons();
        });

        // Listen to resize to handle window changing
        window.addEventListener("resize", () => {
            if (window.innerWidth <= 480) {
                updateButtons();
            } else {
                // Clear any mobile active/disabled classes on desktop
                prevBtn.classList.remove("feedbacks__btn--active", "feedbacks__btn--disabled");
                nextBtn.classList.remove("feedbacks__btn--active", "feedbacks__btn--disabled");
            }
        });

        // Mouse drag support for feedbacks
        let feedbacksIsDown = false;
        let feedbacksStartX;
        let feedbacksScrollLeft;

        feedbacksSlider.addEventListener("mousedown", (e) => {
            if (window.innerWidth > 480) return;
            feedbacksIsDown = true;
            feedbacksStartX = e.pageX - feedbacksSlider.offsetLeft;
            feedbacksScrollLeft = feedbacksSlider.scrollLeft;
            feedbacksSlider.style.scrollSnapType = 'none';
            feedbacksSlider.style.scrollBehavior = 'auto';
        });

        feedbacksSlider.addEventListener("mouseleave", () => {
            if (feedbacksIsDown) {
                feedbacksIsDown = false;
                feedbacksSlider.style.scrollSnapType = 'x mandatory';
                feedbacksSlider.style.scrollBehavior = 'smooth';
            }
        });

        feedbacksSlider.addEventListener("mouseup", () => {
            if (feedbacksIsDown) {
                feedbacksIsDown = false;
                feedbacksSlider.style.scrollSnapType = 'x mandatory';
                feedbacksSlider.style.scrollBehavior = 'smooth';
            }
        });

        feedbacksSlider.addEventListener("mousemove", (e) => {
            if (!feedbacksIsDown) return;
            e.preventDefault();
            const x = e.pageX - feedbacksSlider.offsetLeft;
            const walk = (x - feedbacksStartX) * 1.5; // Scroll speed
            feedbacksSlider.scrollLeft = feedbacksScrollLeft - walk;
        });

        // Initialize state on load
        updateButtons();
    }
});
