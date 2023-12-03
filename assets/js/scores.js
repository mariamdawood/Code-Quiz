document.addEventListener("DOMContentLoaded", function () {
    const highscoreArray = JSON.parse(localStorage.getItem('highscores')) || []
    const backButton = document.getElementById('go-back')
    const highscoreList = document.getElementById('highscore-list')
    const clearButton = document.getElementById('clear-highscores')

    highscoreArray.forEach(element => {
        const listItem = document.createElement('li')
        listItem.textContent = `${element.initials} : ${element.score}`
        highscoreList.appendChild(listItem)
    });

    backButton.addEventListener('click', function () {
        window.location.href = "index.html"
    })

    clearButton.addEventListener('click', function () {
        highscoreList.innerHTML = '';
        localStorage.clear()
    })
})