// Aprendí sobre el uso de los bool en funciones y también el uso de identar clases que tienen ciertos parámetros por predeterminado en vez de modificar los datos a otros (como 'hide')
// También aprendí sobre el uso de listas para cambiar de vistas o entre 'index'

// Siempre añadir esto primero que nada, para así evitar cualquier error de funciones
window.onload=function(){
  const startButton = document.getElementById('start-btn')
  const nextButton = document.getElementById('next-btn')
  const questionContainerElement = document.getElementById('question-container')
  const questionElement = document.getElementById('question')
  const answerButtonsElement = document.getElementById('answer-buttons')
    
  // Este se define como "let" y no como "const", porque son elementos que se redefinen
  let shuffledQuestions, currentQuestionIndex

  startButton.addEventListener('click', startGame)
  nextButton.addEventListener('click', () => {
      currentQuestionIndex++
      setNextQuestion()
  })

  // Esconder el botón Iniciar, mostrar pregunta y respuestas 
  // El question-container tiene ".hide{" por default (o sea, display:none), 
  // al quitarle esto y ponerselo al startButton, es como si se transicionara al quiz
  function startGame() {
    startButton.classList.add('hide')
    // Ordenar las questions al azar, usando Math.random(), que nos dá un número random entre 1 o 0, sea positivo y negativo, con probabilidad de 50% para cada uno (- .5)
    // Se puede definir que si el número que ordena es positivo, este X elemento va en X orden, pero si es negativo entonces ir a X orden
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    // Ponerlo a 0 es como ponerlo como default, un valor predeterminado
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
  }

  // Al sumarle 1 al index cada vez que le damos a "Siguiente" entonces nos pasa la siguiente pregunta, porque 'question' está conectado con el [] de 'answers'
  function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
  }

  // Reemplaza el texto de "Pregunta" al string denominado en la const questions
  function showQuestion(question) {
    questionElement.innerText = question.question
    // Para cada "answer", asignarles un botón
    question.answers.forEach(answer => {
      const button = document.createElement('button')
      // Se le añade el texto string denominado en la variable de 'answers' que se saca en "question.answers.forEach"
      button.innerText = answer.text
      // Se le pone el mismo diseño que los otros botones
      button.classList.add('btn')
      if (answer.correct) {
          button.dataset.correct = answer.correct
      }
      button.addEventListener('click', selectAnswer)
      // Se añade un botón al div que contiene los botones de respuestas
      answerButtonsElement.appendChild(button)
    })
  }

  function resetState() {
    // Reinicia el estado en que estaba el "body", o sea su color, porque cambia de acuerdo al bool de 'correct'
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    // Si hay herencia primogénita, o sea todo elemento dentro de 'answer-buttons' que no ha sido añadido, sino que está ahí desde antes, entonces lo elimina
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
    }
  }

  function selectAnswer(e) {
    // Lo que sea que clickeemos
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    // Si es correcto o no, lo determinará al body, por lo que cambiará los colores
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    // Si tenemos más preguntas indentadas a la lista de 'shuffledQuestions' que números en Index, ejecutar esto
    // O sea, si tenemos preguntas restantes, seguir ejecutando
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        // Muestra el botón de "Siguiente", porque le quita la propiedad de "display: none"
        nextButton.classList.remove('hide') 
    }
    // Pero, si ya es la última pregunta, o ya no quedan más, mostrar el botón de "Iniciar" pero esta vez su texto cambia a "Reiniciar", volviendo a la primera pregunta
    else {
        startButton.innerText = 'Reiniciar'
        startButton.classList.remove('hide')
    }
  }

  function setStatusClass(element, correct) {
    // Resetea eliminando las clases de 'element' en caso que se esté repitiendo el proceso
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
  }
  
  function clearStatusClass(element) {
      element.classList.remove('correct')
      element.classList.remove('wrong')
  }

  // Se crea una const que tiene variables string dentro, a estas se les asigna el texto y si son correctas o no, usando bools
  const questions = [
    {
        question: '¿En qué país está ubicado el Volcán de Atitlán?',
        answers: [
          {text: 'Guatemala', correct: true},
          {text: 'Nicaragua', correct: false},
          {text: 'El Salvador', correct: false},
          {text: 'Costa Rica', correct: false},
        ]
    },  
    {
      question: '¿Cuándo fue declarada la Jora de Cerén como Patrimonio de la Humanidad?',
      answers: [
        {text: '1947', correct: false},
        {text: '1872', correct: false},
        {text: '1993', correct: true},
        {text: '1825', correct: false},
      ]
    },
    {
        question: '¿Qué país hispanoamericano tiene comida típica considerada Patrimonio de la Humanidad?',
        answers: [
          {text: 'Panamá', correct: false},
          {text: 'Honduras', correct: false},
          {text: 'El Salvador', correct: false},
          {text: 'México', correct: true},
        ]
    },
    {
        question: 'País de América del Sur que tiene como idioma oficiales el castellano y su lengua indígena local:',
        answers: [
          {text: 'Paraguay', correct: true},
          {text: 'Brasil', correct: false},
          {text: 'Chile', correct: false},
          {text: 'Argentina', correct: false},
        ]
    },
]
}


