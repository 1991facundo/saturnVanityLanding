// Función para cargar las traducciones desde el archivo JSON
const loadTranslations = async (lang) => {
  try {
    const response = await fetch(`/locales/${lang}.json`);
    const translations = await response.json();
    updateTextContent(translations);
  } catch (error) {
    console.error("Error cargando las traducciones", error);
  }
};

// Función para actualizar el contenido del texto en la página
const updateTextContent = (translations) => {
  // Navbar
  const quienesSomosLink = document.querySelector('.nav-link[href="#quienes-somos"]');
  if (quienesSomosLink) quienesSomosLink.innerText = translations.navbar.quienes_somos;

  const contactanosLink = document.querySelector('.nav-link[href="#contact-section"]');
  if (contactanosLink) contactanosLink.innerText = translations.navbar.contactanos;

  // Hero Section
  const header1 = document.querySelector('.textHero h3:nth-of-type(1)');
  if (header1) header1.innerText = translations.hero_section.header1;

  const header2 = document.querySelector('.textHero h3:nth-of-type(2)');
  if (header2) header2.innerText = translations.hero_section.header2;

  const subheader = document.querySelector('.textHero h4');
  if (subheader) subheader.innerText = translations.hero_section.subheader;

  const offerButton = document.querySelector('#offer-button p');
  if (offerButton) offerButton.innerText = translations.hero_section.button;

  // Sección de marcas (solo título)
  const brandsTitle = document.querySelector('#brands-section h2');
  if (brandsTitle) brandsTitle.innerText = translations.brands_section.title;

  // Quiénes Somos
  const quienesSomosTitle = document.querySelector('#quienes-somos h2');
  if (quienesSomosTitle) quienesSomosTitle.innerText = translations.about_us.title;

  const quienesSomosDesc = document.querySelector('#quienes-somos p');
  if (quienesSomosDesc) quienesSomosDesc.innerText = translations.about_us.description;

  // Formulario de contacto
  const fullNameLabel = document.querySelector('label[for="fullName"]');
  if (fullNameLabel) fullNameLabel.innerText = translations.contact_form.name_label;

  const companyLabel = document.querySelector('label[for="company"]');
  if (companyLabel) companyLabel.innerText = translations.contact_form.company_label;

  const emailLabel = document.querySelector('label[for="email"]');
  if (emailLabel) emailLabel.innerText = translations.contact_form.email_label;

  const messageLabel = document.querySelector('label[for="message"]');
  if (messageLabel) messageLabel.innerText = translations.contact_form.message_label;

  const submitButton = document.querySelector('button[type="submit"]');
  if (submitButton) submitButton.innerText = translations.contact_form.submit_button;

  // CONTÁCTANOS
  const contactanosTitle = document.querySelector('#contact-section h2');
  if (contactanosTitle) contactanosTitle.innerText = translations.contact_form.contactanos;

  // Footer
  const officeTitle = document.querySelector('.footer .office h5');
  if (officeTitle) officeTitle.innerText = translations.footer.office;

  const contactDetails = document.querySelector('.footer .office p');
  if (contactDetails) contactDetails.innerText = translations.footer.contact;

  const warehouseTitle = document.querySelector('.footer .warehouse h5');
  if (warehouseTitle) warehouseTitle.innerText = translations.footer.warehouse;

  const socialMediaTitle = document.querySelector('.footer .social_media h5');
  if (socialMediaTitle) socialMediaTitle.innerText = translations.footer.social_media;
};

// Detectar el idioma del navegador
const userLang = navigator.language || 'es';
let lang = userLang.split('-')[0]; // Nos quedamos con 'es', 'en', etc.

// Lista de idiomas soportados
const supportedLanguages = ['es', 'en', 'it', 'de', 'fr', 'pt', 'el', 'pl'];

// Si el idioma detectado no está soportado, usar inglés como predeterminado
if (!supportedLanguages.includes(lang)) {
  lang = 'en';
}

// Seleccionamos el idioma detectado en el selector
const languageSelector = document.getElementById('language-selector');
languageSelector.value = lang;

// Cargar las traducciones en función del idioma detectado
loadTranslations(lang);

// Funcionalidad para cambiar el idioma desde un selector
languageSelector.addEventListener('change', (event) => {
  const selectedLang = event.target.value;
  loadTranslations(selectedLang);
  console.log(`Cambiando idioma a: ${selectedLang}`);
});



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
        if (window.innerWidth <= 550 && currentAnimation !== 'mobile') {
            app.load(mobileAnimationUrl); // Cargar animación móvil
            currentAnimation = 'mobile'; // Actualizar el estado actual
        } else if (window.innerWidth > 550 && currentAnimation !== 'desktop') {
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

// Manejar el botón de ofertas

const offerButton = document.getElementById('offer-button');

if (offerButton) {
  offerButton.addEventListener('click', function() {
    window.open('https://docs.google.com/spreadsheets/d/1Ejo7MZBtnpe8HZCA6Csqjxla1hVbd21RIN3IsW8U7zA/edit?usp=sharing', '_blank');
  });
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
