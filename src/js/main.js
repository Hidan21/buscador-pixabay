const galeria = document.querySelector('.galeria');
const formularuio = document.querySelector('#formulario');
const formularuio2 = document.querySelector('.formulario2');

document.addEventListener('DOMContentLoaded', () => {
  cargarPrincipal();
  formularuio.addEventListener('submit', validarFormulario);
  formularuio2.addEventListener('submit', validarFormulario2);
});

//***************  CARGAR PAGINA PRINCIPAL  ***************** */
function cargarPrincipal() {
  const key = '29059004-7d06cef4471347b63bbb6573b';
  const url = `https://pixabay.com/api/?key=${key}&image_type=photo&pretty=true&per_page=45`;
  fetch(url)
    .then((res) => res.json())
    .then((resultado) => {
      mostrarImagen(resultado.hits);
      console.log(resultado.hits);
    });
}

//***************  VALIDAR FORMULARIO  ***************** */
function validarFormulario(e) {
  e.preventDefault();
  const buscador = document.querySelector('#buscador').value;
  if (buscador === '') {
    mostrtarAlerta('el campo no puede ir vacio');
    return;
  }
  consultarAPI(buscador);
  formularuio.reset();
}
function validarFormulario2(e) {
  e.preventDefault();
  const buscador2 = document.querySelector('.buscador2').value;
  if (buscador2 === '') {
    mostrtarAlerta('el campo no puede ir vacio');
    return;
  }
  consultarAPI(buscador2);
  formularuio2.reset();
}

//***************  CONSULTAR API DESDE EL BUSCADOR  ***************** */
function consultarAPI(imagen) {
  const key = '29059004-7d06cef4471347b63bbb6573b';
  const url = `https://pixabay.com/api/?key=${key}&q=${imagen}&image_type=photo&pretty=true&per_page=45`;
  fetch(url)
    .then((res) => res.json())
    .then((resultado) => {
      mostrarImagen(resultado.hits);
      if (resultado.hits <= 0) {
        mostrtarAlerta('no se consiguieron imagenes');
        return;
      }
    });
}

//***************  MENJSAJE DE ERROR  ***************** */
function mostrtarAlerta(mensaje) {
  const errores = document.querySelector('.alerta');
  const erroresMensaje = document.querySelector('.errores');
  if (!erroresMensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.classList.add('errores');
    mensajeError.innerHTML = `<p>${mensaje}</p>`;
    errores.appendChild(mensajeError);

    setTimeout(() => {
      mensajeError.remove();
      cargarPrincipal();
    }, 2000);
  }
}

//***************  MOSTRAR EN EL HTML  ***************** */
function mostrarImagen(imagen) {
  while (galeria.firstChild) {
    galeria.removeChild(galeria.firstChild);
  }
  imagen.forEach((imagen) => {
    const { previewURL, largeImageURL } = imagen;

    galeria.innerHTML += `
    <div class="div__galeria">
      <img src="${previewURL}">
      <a href="${largeImageURL}" target="_blank">ver imagen</a>
    </div>
    `;
  });
}
