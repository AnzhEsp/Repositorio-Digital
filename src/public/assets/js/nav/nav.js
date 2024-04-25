import { fetchApi } from '../middlewares/fetchApi.js'
const menuContainer = document.querySelector('.menu__container')
const iconMenu = document.querySelector('.icon-menu')

iconMenu.addEventListener('click', () => {
  menuContainer.classList.toggle('mostrar-menu')
  menuContainer.classList.toggle('menu__container')
})

