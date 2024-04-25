
const $ = selector => document.querySelector(selector)

const subMenuPerfil = $('.container__submenu')
const subMenuListar = $('.container__submenu_listar')
const btnListar = $('.item__listar')
const btnPerfil = $('.item__perfil')

// Menu de listar
btnListar.addEventListener('click', (e) => {
  e.stopPropagation()
  subMenuListar.classList.toggle('meno-desplegable-active')
})
// Menu de Usuario
btnPerfil.addEventListener('click', (e) => {
  e.stopPropagation()
  subMenuPerfil.classList.toggle('meno-desplegable-active')
})
