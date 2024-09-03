document.addEventListener("DOMContentLoaded", function() {
    const carouselWrapper = document.getElementById('carousel-wrapper');
    const carouselItems = Array.from(carouselWrapper.children);

    // Clonar los elementos para un desplazamiento continuo
    carouselItems.forEach(item => {
        carouselWrapper.appendChild(item.cloneNode(true));
    });
});