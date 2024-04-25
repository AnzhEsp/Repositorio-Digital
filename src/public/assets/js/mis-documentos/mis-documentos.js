const buttonModal = document.querySelector('.button-modal')
const nuevoEnvioModal = document.querySelector('.nuevo__envio-modal')
const selectComunidades = document.querySelector('.comunidades')
const selectColeccion = document.querySelector('.coleccion')
const btnComenzar = document.querySelector('.btn-comenzar')

let data = {}

// MODAL
buttonModal.addEventListener('click', () => {
  nuevoEnvioModal.classList.toggle('model-open')
})
nuevoEnvioModal.addEventListener('click', (e) => {
  if (e.target.classList.contains('nuevo__envio-modal') || e.target.classList.contains('model-close')) {
    nuevoEnvioModal.classList.toggle('model-open')
  }
  e.stopPropagation()
})
const templateSelectColecciones = (data) => {
  const template = data.map(coleccion => {
    return (
      `<option data-id="${coleccion.id_coleccion}"  value="${coleccion.nombre}">${coleccion.nombre}</option>`
    )
  })
  selectColeccion.innerHTML = template
}
const getComunidades = async (e) => {
  const id = e.target.options[e.target.selectedIndex].dataset.id

  const res = await fetch(`/colecciones/${id}`)
  if (res.status !== 200) {
    const json = await res.json()

    selectColeccion.innerHTML = `<option value="s/n">${json.msg}</option>`
    return
  }
  const json = await res.json()
  console.log(json)
  templateSelectColecciones(json)
}
const setColecciones = async (e) => {
  await getComunidades(e)
}

const getFetch = async (url) => {
  const res = await fetch(url)
  return res
}
const guardarInfo = async () => {
  const id = selectColeccion.options[selectColeccion.selectedIndex].dataset.id
  if (selectComunidades.value !== 's/n' && selectColeccion.value !== 's/n') {
    data = {
      coleccion: id
    }
    const res = await getFetch(`/colecciones/coleccion/${id}`)
    if (res.status === 200) {
      localStorage.setItem('json', JSON.stringify(data))
      window.location.href = '/nuevo-envio/describir-documento'
    }
  }
}

btnComenzar.addEventListener('click', guardarInfo)
selectComunidades.addEventListener('change', setColecciones)
