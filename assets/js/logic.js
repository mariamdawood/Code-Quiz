document.addEventListener("DOMContentLoaded", function () {
  const intro = document.getElementById('intro')
  const startButton = document.getElementById('start-button')
  const quiz = document.getElementById('quiz')
  const feedback = document.getElementById('feedback')
  const timer = document.getElementById('time')
  const originalTime = 75
  const finalScore = document.getElementById('score')
  const initialsContainer = document.getElementById('initials-container')
  const saveScoreButton = document.getElementById('save-score')

  let currentQuestionIndex = 0
  let timeLeft = originalTime
  let timerInterval
  let score = 0

  startButton.addEventListener('click', function () {
    intro.style.display = 'none'
    quiz.style.display = 'block'
    feedback.textContent = ''
    showQuestion(currentQuestionIndex)
    resetTimer()
    startTimer()
  })

  function resetTimer() {
    timeLeft = originalTime
    timer.textContent = `${originalTime}`
  }

  function startTimer() {
    timerInterval = setInterval(function () {
      if (timeLeft <= 0) {
        clearInterval(timerInterval)
        timer.textContent = '0'
        endQuiz()
      } else {
        timeLeft--
        timer.textContent = `${timeLeft}`
      }
    }, 1000)
  }


  function showQuestion(index) {
    const questionText = document.getElementById('question-text')
    const answerButtons = document.getElementById('answer-buttons')
    const currentQuestion = questions[index]

    questionText.textContent = currentQuestion.question

    answerButtons.innerHTML = ''

    currentQuestion.answers.forEach(answer => {
      const button = document.createElement('button')
      button.textContent = answer.text
      button.classList.add('btn')
      button.addEventListener('click', () => {
        if (answer.correct) {
          answerButtons.childNodes.forEach((element) => element.setAttribute('disabled', ''))
          feedback.textContent = 'Correct!'
          feedback.style.color = 'green'
          score += 5
        } else {
          answerButtons.childNodes.forEach((element) => element.setAttribute('disabled', ''))
          feedback.textContent = 'Incorrect!'
          feedback.style.color = 'red'
          timeLeft -= 15
        }
        if (currentQuestionIndex < questions.length - 1) {
          currentQuestionIndex++
          setTimeout(() => {
            feedback.textContent = ''
            showQuestion(currentQuestionIndex)
          }, 1000)
        } else {
          clearInterval(timerInterval)
          timer.textContent = '0'
          setTimeout(() => {
            feedback.textContent = ''
            endQuiz()
          }, 1000)
        }
      })
      answerButtons.appendChild(button)
    })
  }

  function endQuiz() {
    quiz.style.display = 'none'
    finalScore.style.display = 'block'
    finalScore.textContent = `Your final score is: ${score}`
    currentQuestionIndex = 0
    resetTimer()
    initialsContainer.style.display = 'block'
  }

  saveScoreButton.addEventListener('click', function () {
    const userInitials = initialsInput.value.trim()
    const error = document.getElementById('error-message')

    if (userInitials) {
      let newhighscore = { initials: userInitials, score: score }
      const highscoreArray = JSON.parse(localStorage.getItem('highscores')) || []
      highscoreArray.push(newhighscore)
      localStorage.setItem('highscores', JSON.stringify(highscoreArray))
      window.location.href = 'highscores.html'
    } else {
      error.textContent = 'Error: Please enter your initials.'
      error.style.color = 'red'
    }
  })

})
