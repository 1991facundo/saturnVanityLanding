// HERO SECTION

import { Application } from '@splinetool/runtime';

const canvas = document.getElementById('canvas3d'); 
const mobileAnimationUrl = 'https://prod.spline.design/AUsDzex240CPllC9/scene.splinecode'; // URL para mobile
const desktopAnimationUrl = 'https://prod.spline.design/35tJvHXnJye50ulQ/scene.splinecode'; // URL para desktop

if (canvas) {
    const app = new Application(canvas);
    let currentAnimation = null; 

    // Función para cargar la animación adecuada según el tamaño de la pantalla
    function loadCanvasAnimation() {
        if (window.innerWidth <= 450 && currentAnimation !== 'mobile') {
            app.load(mobileAnimationUrl); // Cargar animación móvil
            currentAnimation = 'mobile'; // Actualizar el estado actual
        } else if (window.innerWidth > 450 && currentAnimation !== 'desktop') {
            app.load(desktopAnimationUrl); // Cargar animación desktop
            currentAnimation = 'desktop'; // Actualizar el estado actual
        }
    }

    // Cargar la animación correcta al cargar la página
    loadCanvasAnimation();

    // Cargar la animación correcta solo si es necesario cuando la ventana cambie de tamaño
    window.addEventListener('resize', loadCanvasAnimation);
} else {
    console.error("No se pudo encontrar el elemento canvas con el ID 'canvas3d'");
}


// CARROUSEL DE IMAGENES CON LAS MARCAS

document.addEventListener("DOMContentLoaded", function () {
  // Selecciona el div donde se va a cargar la sección de marcas
  const brandsSection = document.getElementById('brands-section');

  // Cargar el contenido de brands.html dinámicamente
  fetch('/components/brands.html')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al cargar el archivo brands.html');
      }
      return response.text();
    })
    .then(data => {
      brandsSection.innerHTML = data;

      // Después de cargar la sección de marcas, clona las tarjetas para crear un loop infinito
      const carouselWrapper = document.querySelector('.carousel-wrapper');
      const carouselItems = carouselWrapper.querySelectorAll('.carousel-item');

      // Clona los elementos para que el carrusel sea fluido
      carouselItems.forEach(item => {
        const clone = item.cloneNode(true);
        carouselWrapper.appendChild(clone);
      });
    })
    .catch(error => {
      console.error('Hubo un problema al cargar brands.html:', error);
    });
});


// QUIENES SOMOS

// Función para manejar la animación de parallax al hacer scroll
function handleParallaxScroll() {
  const parallaxItems = document.querySelectorAll('.parallax-item');
  const imgContactForm = document.querySelector('.imgContactForm');

  if (window.innerWidth >= 992) { // Solo en pantallas grandes
    parallaxItems.forEach(item => {
      const itemPosition = item.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      // Si el elemento está dentro de la ventana visible
      if (itemPosition < windowHeight - 100) {
        item.classList.add('show');
      }
    });

    // Agregar parallax al imgContactForm
    const imgContactPosition = imgContactForm.getBoundingClientRect().top;
    if (imgContactPosition < window.innerHeight - 100) {
      imgContactForm.classList.add('show');
    }
  } else {
    // Deshabilitar el parallax en pantallas pequeñas
    parallaxItems.forEach(item => {
      item.classList.remove('show');
    });
    imgContactForm.classList.remove('show');
  }
}

// Llamar a la función cuando se hace scroll
window.addEventListener('scroll', handleParallaxScroll);

// Llamar a la función por si hay elementos visibles al cargar la página
document.addEventListener('DOMContentLoaded', handleParallaxScroll);


// FORMULARIO

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById('contactForm');
  const fullName = document.getElementById('fullName');
  const email = document.getElementById('email');

  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    let isValid = true;

    // Validación del nombre completo (no debe contener números)
    if (/\d/.test(fullName.value)) {
      fullName.classList.add('is-invalid');
      alert("El nombre no puede contener números.");
      isValid = false;
    } else {
      fullName.classList.remove('is-invalid');
    }

    // Validación del formato de correo (debe contener '@')
    if (!/@/.test(email.value)) {
      email.classList.add('is-invalid');
      alert("El correo electrónico debe contener un '@'.");
      isValid = false;
    } else {
      email.classList.remove('is-invalid');
    }

    // Si las validaciones son correctas, enviar los datos con AJAX
    if (isValid) {
      const formData = new FormData(form);

      // Hacer la solicitud AJAX usando fetch
      fetch('/components/send-email.php', {
        method: 'POST',
        body: formData,
      })
      .then(response => response.text())
      .then(data => {
        // Mostrar un mensaje de éxito (alerta)
        alert("Correo enviado con éxito.");
        form.reset(); // Resetear el formulario
      })
      .catch(error => {
        console.error('Error al enviar el formulario:', error);
        alert("Hubo un error al enviar el correo.");
      });
    }
  });
});
