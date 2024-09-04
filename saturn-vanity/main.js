// ANIMACION

import { Application } from '@splinetool/runtime';

const canvas = document.getElementById('canvas3d'); 
if (canvas) {
  const app = new Application(canvas);
  app.load('https://prod.spline.design/35tJvHXnJye50ulQ/scene.splinecode');
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
      })
      .catch(error => {
        console.error('Hubo un problema al cargar brands.html:', error);
      });
  });
  
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
