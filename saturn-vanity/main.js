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
  
