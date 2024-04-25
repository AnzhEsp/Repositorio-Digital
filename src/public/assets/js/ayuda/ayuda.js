const respuestas=document.querySelectorAll('.respuestas');
const preguntasText=document.querySelectorAll('.preguntas-text');

preguntasText.forEach(btn=>{
  btn.addEventListener('click',(e)=>{
    btn.nextElementSibling.classList.toggle('respuesta-view')
  })
})