document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".treatment__inner");
    if (!slider) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener("mousedown", (e) => {
        if (window.innerWidth > 480) return;
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        slider.style.scrollSnapType = 'none';
        slider.style.scrollBehavior = 'auto';
    });

    slider.addEventListener("mouseleave", () => {
        if (isDown) {
            isDown = false;
            slider.style.scrollSnapType = 'x mandatory';
            slider.style.scrollBehavior = 'smooth';
        }
    });

    slider.addEventListener("mouseup", () => {
        if (isDown) {
            isDown = false;
            slider.style.scrollSnapType = 'x mandatory';
            slider.style.scrollBehavior = 'smooth';
        }
    });

    slider.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.5; // Scroll speed
        slider.scrollLeft = scrollLeft - walk;
    });
});
