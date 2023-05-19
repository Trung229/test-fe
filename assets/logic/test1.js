
window.addEventListener('load', function () {
    const carousel = document.querySelector('.carousel');
    const carouselItems = document.querySelector('.carousel-items');
    const carouselDots = Array.from(document.querySelectorAll('.carousel-dot'));

    let isDragging = false;
    let startPosition = 0;
    let currentTranslate = 0;
    let previousTranslate = 0;
    let activeDotIndex = 0;
    function setCarouselPosition() {
        carouselItems.style.transform = `translateX(${currentTranslate}px)`;
    }
    function updateDotState() {
        carouselDots.forEach((dot, index) => {
            if (index === activeDotIndex) {
                dot.classList.add('active-dot');
            } else {
                dot.classList.remove('active-dot');
            }
        });
    }
    carouselItems.addEventListener('mousedown', function (e) {
        e.preventDefault();
        isDragging = true;
        startPosition = e.pageX;
        carouselItems.classList.add('grabbing');
    });
    carouselItems.addEventListener('mousemove', function (e) {
        if (isDragging) {
            const currentPosition = e.pageX - startPosition;
            const maxTranslate = carouselItems.offsetWidth - carousel.offsetWidth;
            currentTranslate = previousTranslate + currentPosition;

            if (currentTranslate > 0) {
                currentTranslate = 0;
            }

            if (currentTranslate < -maxTranslate) {
                currentTranslate = -maxTranslate;
            }

            setCarouselPosition();
            updateDotState();
        }
    });
    carouselItems.addEventListener('mouseup', function () {
        if (isDragging) {
            isDragging = false;
            carouselItems.classList.remove('grabbing');
            previousTranslate = currentTranslate;
        }
    });

    carouselItems.addEventListener('mouseleave', function () {
        if (isDragging) {
            isDragging = false;
            carouselItems.classList.remove('grabbing');
            previousTranslate = currentTranslate;
        }
    });
    carouselItems.addEventListener('touchstart', function (e) {
        startPosition = e.touches[0].clientX;
    });

    carouselItems.addEventListener('touchmove', function (e) {
        const currentPosition = e.touches[0].clientX - startPosition;
        const maxTranslate = carouselItems.offsetWidth - carousel.offsetWidth;
        currentTranslate = previousTranslate + currentPosition;

        if (currentTranslate > 0) {
            currentTranslate = 0;
        }

        if (currentTranslate < -maxTranslate) {
            currentTranslate = -maxTranslate;
        }

        setCarouselPosition();
        updateDotState();
    });

    carouselItems.addEventListener('touchend', function () {
        previousTranslate = currentTranslate;
    });
    carousel.addEventListener('wheel', function (e) {
        e.preventDefault();
        const scrollAmount = e.deltaY;
        const maxTranslate = carouselItems.offsetWidth - carousel.offsetWidth;
        currentTranslate += scrollAmount;

        if (currentTranslate > 0) {
            currentTranslate = 0;
        }

        if (currentTranslate < -maxTranslate) {
            currentTranslate = -maxTranslate;
        }

        previousTranslate = currentTranslate;
        setCarouselPosition();
        updateDotState();
    });
    window.addEventListener('resize', function () {
        const maxTranslate = carouselItems.offsetWidth - carousel.offsetWidth;
        currentTranslate = Math.max(currentTranslate, -maxTranslate);
        previousTranslate = currentTranslate;
        setCarouselPosition();
        updateDotState();
    });
    carouselDots.forEach((dot, index) => {
        dot.addEventListener('click', function () {
            activeDotIndex = index;
            currentTranslate = -index * (carousel.offsetWidth / 2.5);
            previousTranslate = currentTranslate;
            setCarouselPosition();
            updateDotState();
        });
    });
    setCarouselPosition();
    updateDotState();
});
