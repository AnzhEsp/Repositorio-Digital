const Handlebars = require('handlebars')

const compararCadenas = (arg1, arg2, options) => {
  if (arg1 === arg2) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
}
const templateMenuUser = (condicion) => {
  if (condicion) {
    return new Handlebars.SafeString(`
    <h4 href="#" class="item__perfil nav__item">${condicion}</h4>
          <div class="container__submenu" hidden>
            <li class='menu_despegable_perfil'>
              <ul><a class="nav__item_menu" href="/mi-perfil">Mi perfil</a> </ul>
              <ul><a class="nav__item_menu" href="/mis-documentos">Mis Documentos</a></ul>
              <ul><a class="nav__item_menu" href="/usuario/cerrar-sesion">Cerrar Sesion</a></ul>
            </li>
          </div>
    `)
  } else {
    return new Handlebars.SafeString(`
    <a href="/login" class="item__perfil nav__item">Iniciar sesion</a>
    `)
  }
}

const firstWordUppercase = (palabra) => {
  return palabra.charAt(0).toUpperCase() + palabra.slice(1)
}
const templateDocumentos = (documentos) => {
  if (!documentos.length) {
    return new Handlebars.SafeString(`
    <div class="contenido-completo">
    <h1>Sin documentos</h1>
    </div>
    `)
  }

  let template = ''
  documentos.forEach((doc, index) => {
    template += `
 <div class="contenido-completo">
        <div class="title">
          <p for="" clas="title__doc">${firstWordUppercase(doc.titulo)}</p>
        </div>
        <div class="collection">
          <p for="">${firstWordUppercase(documentos[index].coleccion.nombre)}</p>
        </div>
        <div class="fecha-aceptacion">
          <p for="">02/06/2022</p>
        </div>
        <div class="doc-icon">
        <a href="/documentos/ver/${doc.id_documento}">
        <img src="/assets/img/vision.png"/>
        </a>
        <a href="/documentos/editar/${doc.id_documento}">
        <img src="/assets/img/edit.svg"/>
        </a>
        </div>
      </div>
`
  })
  return new Handlebars.SafeString(template)
}

const viewDocumento = (documento) => {
  const autores = documento.autores.map(autor => ` ${firstWordUppercase(autor.nombre)} ${firstWordUppercase(autor.apellido_paterno)} ${firstWordUppercase(autor.apellido_materno)} `)
  const palabrasClaves = documento.palabrasClaves.map(palabraClave => ` ${firstWordUppercase(palabraClave.nombre)} `)
  const template = ` <div class="datos-archivo">
                            <div class="datos-archivo-2">
                                <article>Título: ${firstWordUppercase(documento.titulo)} <br><br> </article>
                                <article>Autor(es): ${autores}<br><br></article>
                                <article class="desc">Resumen: ${firstWordUppercase(documento.resumen)}<br><br> </article>
                                <article>Fecha de emisión: ${documento.fecha_publicacion}<br><br></article>
                                <article>Palabras Claves: ${palabrasClaves}<br><br></article>
                                <article></article>
                            </div>
                        </div>`

  return new Handlebars.SafeString(template)
}

const HomeBusquedasRelacionadas = (documentos, colecciones, autores) => {
  let templateDocumentos = ''
  documentos.forEach(documento => {
    templateDocumentos += `<tr>
            <td><a href="">${documento.fecha_publicacion}</a></td>
          </tr>`
  })
  let templateColecciones = ''
  colecciones.forEach(coleccion => {
    templateColecciones += `<tr>
            <td><a href="/colecciones/documentos/${coleccion.id_coleccion}">${coleccion.nombre}</a></td>
          </tr>`
  })
  let templateTitulo = ''
  documentos.forEach(documento => {
    templateTitulo += `<tr>
            <td><a href="/documentos/ver/${documento.id_documento}">${firstWordUppercase(documento.titulo)}</a></td>
          </tr>`
  })

  let templateAutores = ''
  autores.forEach(autor => {
    const array = autor.nombre.split(',')
    const palabra = array.join(' ')
    const formatNombre = palabra.substring(1, palabra.length - 1)
    templateAutores += `<tr>
            <td><a href="/documentos/ver/${autor.id_autor}">${firstWordUppercase(formatNombre)}</a></td>
          </tr>`
  })

  const template = ` <div class="container3">
      <div class="busq__fecha">
        <p>Fecha de publicación</p>
        <table class="busq__fecha__table">
          ${templateDocumentos}
        </table>
      </div>

      <div class="busq__autor">
        <p>Autor</p>
        <table class="busq__autor__table">
         ${templateAutores}
        </table>
      </div>

      <div class="busq__titulo">
        <p>Titulo</p>
        <table class="busq__titulo__table">
        ${templateTitulo}
        </table>
      </div>

      <div class="busq__materia">
        <p>Colecciones</p>
        <table class="busq__materia__table">
          ${templateColecciones}
        </table>
      </div>
    </div>`
  return new Handlebars.SafeString(template)
}

const parseBuffer = (buffer) => {
  const base64 = JSON.parse(buffer)
  const pdfbase64 = Buffer.from(base64.data, 'base64')
  return new Handlebars.SafeString(`
<object data="data:application/pdf;base64,${pdfbase64}" width="90vw" height="100vh">
</object>
  `)
}

const comunidades = (arrayComunidades) => {
  let templateComplete = ''
  arrayComunidades.forEach(comunidad => {
    let templateColecciones = ''
    comunidad.colecciones.forEach(coleccion => {
      templateColecciones += `<div class="sub-contenedor">
                            <a href="">${coleccion.nombre}</a>
                        </div>`
    })
    templateComplete += `<div class="contenedor__comunidades__full">
                        <div class="contenedor-img-titulo">
                        <img class="img-logo" src="/assets/img/${comunidad.nombre}.svg" alt="logo">
                        <a href="">
                            <p>${comunidad.nombre}</p>
                        </a>
                        </div>
                        ${templateColecciones}
                    </div>`
  })
  return new Handlebars.SafeString(templateComplete)
}

module.exports = { compararCadenas, templateMenuUser, templateDocumentos, viewDocumento, HomeBusquedasRelacionadas, parseBuffer, comunidades }
