async function fetchApi (url, metodo, datos) {
  try {
    const response = await fetch(url, {
      method: metodo.toUpperCase(),
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export { fetchApi }
